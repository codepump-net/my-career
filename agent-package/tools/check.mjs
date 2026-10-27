import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const errors = [];
const notes = [];
const seenCases = new Map();
const jsonCache = new Map();

function fail(message) {
  errors.push(message);
}

function note(message) {
  notes.push(message);
}

function isInsidePackage(absolutePath) {
  const relative = path.relative(packageRoot, absolutePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function insidePackage(relativePath) {
  if (typeof relativePath !== "string" || !relativePath.trim()) {
    fail(`Invalid empty package path: ${String(relativePath)}`);
    return null;
  }
  const resolved = path.resolve(packageRoot, relativePath);
  if (!isInsidePackage(resolved)) {
    fail(`Path escapes agent-package: ${relativePath}`);
    return null;
  }
  return resolved;
}

function toPackagePath(absolutePath) {
  return path.relative(packageRoot, absolutePath).split(path.sep).join("/");
}

function readJsonAbsolute(filePath, label = toPackagePath(filePath)) {
  if (!isInsidePackage(filePath)) {
    fail(`JSON path escapes agent-package: ${label}`);
    return null;
  }
  if (jsonCache.has(filePath)) return jsonCache.get(filePath);
  if (!fs.existsSync(filePath)) {
    fail(`Required JSON missing: ${label}`);
    return null;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    jsonCache.set(filePath, parsed);
    return parsed;
  } catch (error) {
    fail(`JSON parse failed: ${label} (${error.message})`);
    return null;
  }
}

function readJson(relativePath) {
  const filePath = insidePackage(relativePath);
  return filePath ? readJsonAbsolute(filePath, relativePath) : null;
}

function requirePath(relativePath, type = "any") {
  const resolved = insidePackage(relativePath);
  if (!resolved || !fs.existsSync(resolved)) {
    fail(`Required path missing: ${relativePath}`);
    return null;
  }
  const stat = fs.statSync(resolved);
  if (type === "file" && !stat.isFile()) fail(`Expected a file: ${relativePath}`);
  if (type === "directory" && !stat.isDirectory()) fail(`Expected a directory: ${relativePath}`);
  return resolved;
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(item));
    else if (entry.isFile()) files.push(item);
  }
  return files;
}

function schemaTypeMatches(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === type;
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function resolveJsonPointer(document, pointer, source) {
  if (!pointer || pointer === "/") return document;
  let current = document;
  for (const rawPart of pointer.replace(/^\//, "").split("/")) {
    const part = rawPart.replace(/~1/g, "/").replace(/~0/g, "~");
    if (current === null || typeof current !== "object" || !(part in current)) {
      fail(`Unresolved schema pointer in ${source}: #/${pointer.replace(/^\//, "")}`);
      return null;
    }
    current = current[part];
  }
  return current;
}

function validateSchema(value, schema, source, schemaFile) {
  if (!schema || typeof schema !== "object") {
    fail(`${source}: invalid schema node in ${toPackagePath(schemaFile)}`);
    return;
  }

  if (schema.$ref) {
    const [referenceFile, fragment = ""] = schema.$ref.split("#");
    const resolvedSchemaFile = referenceFile ? path.resolve(path.dirname(schemaFile), referenceFile) : schemaFile;
    if (!isInsidePackage(resolvedSchemaFile)) {
      fail(`${source}: schema reference escapes package (${schema.$ref})`);
      return;
    }
    const referencedDocument = readJsonAbsolute(resolvedSchemaFile);
    if (!referencedDocument) return;
    const referencedSchema = fragment ? resolveJsonPointer(referencedDocument, fragment, schema.$ref) : referencedDocument;
    if (referencedSchema) validateSchema(value, referencedSchema, source, resolvedSchemaFile);
    return;
  }

  if ("const" in schema && !deepEqual(value, schema.const)) {
    fail(`${source}: expected constant ${JSON.stringify(schema.const)}`);
  }
  if (Array.isArray(schema.enum) && !schema.enum.some((item) => deepEqual(item, value))) {
    fail(`${source}: value ${JSON.stringify(value)} is not in enum`);
  }

  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((type) => schemaTypeMatches(value, type))) {
      const actual = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
      fail(`${source}: expected type ${types.join("|")}, got ${actual}`);
      return;
    }
  }

  if (typeof value === "string") {
    if (Number.isInteger(schema.minLength) && value.length < schema.minLength) fail(`${source}: string shorter than minLength ${schema.minLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) fail(`${source}: string does not match ${schema.pattern}`);
    if (schema.format === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(`${source}: invalid date format`);
    if (schema.format === "date-time" && (!/^\d{4}-\d{2}-\d{2}T/.test(value) || Number.isNaN(Date.parse(value)))) fail(`${source}: invalid date-time format`);
  }

  if (typeof value === "number") {
    if (typeof schema.minimum === "number" && value < schema.minimum) fail(`${source}: value below minimum ${schema.minimum}`);
    if (typeof schema.maximum === "number" && value > schema.maximum) fail(`${source}: value above maximum ${schema.maximum}`);
  }

  if (Array.isArray(value)) {
    if (Number.isInteger(schema.minItems) && value.length < schema.minItems) fail(`${source}: array has fewer than ${schema.minItems} item(s)`);
    if (schema.uniqueItems) {
      const serialized = value.map((item) => JSON.stringify(item));
      if (new Set(serialized).size !== serialized.length) fail(`${source}: array items must be unique`);
    }
    if (schema.items) value.forEach((item, index) => validateSchema(item, schema.items, `${source}[${index}]`, schemaFile));
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required || []) {
      if (!(required in value)) fail(`${source}: missing required property '${required}'`);
    }
    const properties = schema.properties || {};
    for (const [key, item] of Object.entries(value)) {
      if (properties[key]) validateSchema(item, properties[key], `${source}.${key}`, schemaFile);
      else if (schema.additionalProperties === false) fail(`${source}: unknown property '${key}'`);
      else if (schema.additionalProperties && typeof schema.additionalProperties === "object") validateSchema(item, schema.additionalProperties, `${source}.${key}`, schemaFile);
    }
  }
}

function validateJsonFile(dataPath, schemaPath) {
  const data = readJson(dataPath);
  const schema = readJson(schemaPath);
  const schemaFile = insidePackage(schemaPath);
  if (data && schema && schemaFile) validateSchema(data, schema, dataPath, schemaFile);
  return data;
}

function validateReferencedJson(relativePath, schemaPath) {
  requirePath(relativePath, "file");
  return validateJsonFile(relativePath, schemaPath);
}

function validateDataset(relativePath, owner) {
  const filePath = requirePath(relativePath, "file");
  const schema = readJson("evals/case.schema.json");
  const schemaFile = insidePackage("evals/case.schema.json");
  if (!filePath || !schema || !schemaFile) return { count: 0, cases: [] };
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter((line) => line.trim());
  const cases = [];
  lines.forEach((line, index) => {
    let item;
    const source = `${relativePath}:${index + 1}`;
    try {
      item = JSON.parse(line);
    } catch (error) {
      fail(`${source}: JSONL parse failed (${error.message})`);
      return;
    }
    validateSchema(item, schema, source, schemaFile);
    if (item.case_id) {
      const prior = seenCases.get(item.case_id);
      if (prior && prior !== source) fail(`Duplicate case_id '${item.case_id}': ${prior}, ${source}`);
      else if (!prior) seenCases.set(item.case_id, source);
    }
    cases.push(item);
  });
  return { count: lines.length, cases };
}

function extractRubricId(relativePath) {
  const filePath = requirePath(relativePath, "file");
  if (!filePath) return null;
  const firstHeading = fs.readFileSync(filePath, "utf8").match(/^#\s+(RUBRIC-[A-Z0-9-]+)/m);
  if (!firstHeading) fail(`${relativePath}: first heading must contain a RUBRIC-* ID`);
  return firstHeading?.[1] || null;
}

function findPlaceholders(value, location, output = []) {
  if (typeof value === "string" && (/\bTBD\b/i.test(value) || /before-(candidate|release)/i.test(value) || /after-generation/i.test(value))) {
    output.push(location);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => findPlaceholders(item, `${location}[${index}]`, output));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => findPlaceholders(item, `${location}.${key}`, output));
  }
  return output;
}

function validateSkill(relativePath, owner, enforceFolderName = true) {
  const directory = requirePath(relativePath, "directory");
  if (!directory) return;
  const skillFile = path.join(directory, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    fail(`${owner}: Skill missing SKILL.md (${relativePath})`);
    return;
  }
  const content = fs.readFileSync(skillFile, "utf8");
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    fail(`${owner}: Skill has no YAML frontmatter (${relativePath})`);
    return;
  }
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) fail(`${owner}: invalid Skill name (${relativePath})`);
  if (!description) fail(`${owner}: Skill description missing (${relativePath})`);
  if (enforceFolderName && name && path.basename(directory) !== name) fail(`${owner}: Skill folder/name mismatch (${relativePath}/${name})`);
  for (const heading of ["## Inputs", "## Procedure", "## Outputs", "## Safety and Stop Conditions", "## Validation"]) {
    if (!content.includes(heading)) fail(`${owner}: Skill missing '${heading}' (${relativePath})`);
  }
}

const requiredFiles = [
  "README.md",
  "DESIGN-BASIS.md",
  "GOVERNANCE.md",
  "CHANGELOG.md",
  "manifest.schema.json",
  "registry.schema.json",
  "agents/agent.schema.json",
  "agents/tool.schema.json",
  "agents/tools.schema.json",
  "agents/evals.schema.json",
  "agents/_template/instructions.md",
  "agents/_template/context.md",
  "agents/_template/runbook.md",
  "skills/README.md",
  "skills/_template/SKILL.md",
  "environments/environment.schema.json",
  "policies/approval-policy-template.md",
  "policies/data-governance-template.md",
  "evals/README.md",
  "evals/case.schema.json",
  "evals/grader.schema.json",
  "evals/eval-run.schema.json",
  "evals/rubrics/default.md",
  "runs/run.schema.json",
  "releases/release.schema.json",
  "releases/release-template.md",
  "adapters/adapter.schema.json",
  "adapters/_template/conformance.md"
];
requiredFiles.forEach((file) => requirePath(file, "file"));

// Parse every JSON artifact, including schemas that are not reached through an empty template array.
for (const jsonFile of walkFiles(packageRoot).filter((file) => file.endsWith(".json"))) readJsonAbsolute(jsonFile);

const manifest = validateJsonFile("manifest.json", "manifest.schema.json");
const registry = validateJsonFile("registry.json", "registry.schema.json");

validateJsonFile("agents/_template/agent.json", "agents/agent.schema.json");
validateJsonFile("agents/_template/tools.json", "agents/tools.schema.json");
validateJsonFile("agents/_template/evals.json", "agents/evals.schema.json");
validateJsonFile("environments/_template/environment.json", "environments/environment.schema.json");
validateJsonFile("adapters/_template/adapter.json", "adapters/adapter.schema.json");
validateJsonFile("evals/graders/default.json", "evals/grader.schema.json");
validateJsonFile("evals/eval-run-template.json", "evals/eval-run.schema.json");
validateJsonFile("runs/run-template.json", "runs/run.schema.json");
validateJsonFile("releases/release-template.json", "releases/release.schema.json");
validateSkill("skills/_template", "Skill template", false);

if (manifest) {
  for (const [name, relativePath] of Object.entries(manifest.paths || {})) requirePath(relativePath, name === "registry" ? "file" : "directory");
}

const agents = Array.isArray(registry?.agents) ? registry.agents : [];
if (strict && agents.length === 0) fail("strict: no registered Agent");
if (!strict && agents.length === 0) note("No Agent is registered. Copy agents/_template to start the first read-only pilot.");

const agentIds = new Set(agents.map((entry) => entry.id).filter(Boolean));
if (agentIds.size !== agents.length) fail("registry.json: duplicate or missing Agent ID");

const requiredInstructionHeadings = [
  "## Identity",
  "## Objective",
  "## Inputs",
  "## Outputs",
  "## Operating Procedure",
  "## Autonomy and Approval Boundaries",
  "## Delegation and Parallel Work",
  "## Tool and Permission Rules",
  "## Stop Conditions",
  "## Evidence and Completion"
];

for (const entry of agents) {
  if (!entry?.id || !entry?.path) continue;
  const directory = entry.path;
  requirePath(directory, "directory");
  for (const file of ["agent.json", "instructions.md", "context.md", "tools.json", "evals.json", "runbook.md", "CHANGELOG.md"]) requirePath(path.posix.join(directory, file), "file");

  const agent = validateJsonFile(path.posix.join(directory, "agent.json"), "agents/agent.schema.json");
  const tools = validateJsonFile(path.posix.join(directory, "tools.json"), "agents/tools.schema.json");
  const evals = validateJsonFile(path.posix.join(directory, "evals.json"), "agents/evals.schema.json");
  if (!agent || !tools || !evals) continue;

  if (agent.id !== entry.id) fail(`${entry.id}: registry/agent id mismatch`);
  if (agent.version !== entry.version) fail(`${entry.id}: registry/agent version mismatch`);
  if (agent.status !== entry.status) fail(`${entry.id}: registry/agent status mismatch`);
  if (tools.agent_id !== entry.id) fail(`${entry.id}: tools.json agent_id mismatch`);
  if (evals.agent_id !== entry.id) fail(`${entry.id}: evals.json agent_id mismatch`);
  if (evals.execution?.environment_profile !== agent.runtime?.environment_profile) fail(`${entry.id}: Agent and Eval environment_profile mismatch`);

  const environment = validateReferencedJson(agent.runtime.environment_profile, "environments/environment.schema.json");
  requirePath(agent.risk.approval_policy, "file");
  requirePath(agent.data.governance_policy, "file");

  for (const skill of agent.capabilities.skills || []) validateSkill(skill, entry.id);
  const delegation = agent.capabilities.delegation;
  if (delegation.enabled && (delegation.max_depth < 1 || delegation.allowed_agent_ids.length === 0)) fail(`${entry.id}: enabled delegation requires allowed_agent_ids and max_depth >= 1`);
  if (!delegation.enabled && (delegation.max_depth !== 0 || delegation.allowed_agent_ids.length !== 0)) fail(`${entry.id}: disabled delegation must have max_depth 0 and no allowed_agent_ids`);
  for (const delegateId of delegation.allowed_agent_ids || []) if (!agentIds.has(delegateId)) fail(`${entry.id}: unknown delegated Agent '${delegateId}'`);

  const toolIds = new Set();
  for (const tool of tools.tools || []) {
    if (toolIds.has(tool.id)) fail(`${entry.id}: duplicate Tool ID '${tool.id}'`);
    toolIds.add(tool.id);
    if (tool.effect !== "read" && tool.approval === "none") fail(`${entry.id}/${tool.id}: side-effect Tool requires approval`);
    if (["high", "critical"].includes(tool.risk) && tool.approval === "none") fail(`${entry.id}/${tool.id}: high-risk Tool requires approval`);
    if (tool.max_retries > 0 && !tool.retry_safe) fail(`${entry.id}/${tool.id}: retries require retry_safe=true`);
    if (tool.idempotency === "non_idempotent" && (tool.retry_safe || tool.max_retries > 0)) fail(`${entry.id}/${tool.id}: non-idempotent Tool cannot retry automatically`);
    if (tool.effect !== "read" && !tool.compensation) fail(`${entry.id}/${tool.id}: side-effect Tool requires an explicit compensation statement`);
  }

  const rubricIds = new Set((evals.rubrics || []).map(extractRubricId).filter(Boolean));
  const graderIds = new Set();
  for (const graderPath of evals.graders || []) {
    const grader = validateReferencedJson(graderPath, "evals/grader.schema.json");
    if (!grader) continue;
    if (graderIds.has(grader.id)) fail(`${entry.id}: duplicate Grader ID '${grader.id}'`);
    graderIds.add(grader.id);
    if (grader.rubric_ref) requirePath(grader.rubric_ref, "file");
  }

  let caseCount = 0;
  const agentCases = [];
  for (const dataset of evals.datasets || []) {
    const result = validateDataset(dataset, entry.id);
    caseCount += result.count;
    agentCases.push(...result.cases);
  }
  for (const evalCase of agentCases) {
    for (const rubricId of evalCase.expected?.rubric_ids || []) if (!rubricIds.has(rubricId)) fail(`${entry.id}/${evalCase.case_id}: unknown Rubric '${rubricId}'`);
    for (const graderId of evalCase.grading?.grader_ids || []) if (!graderIds.has(graderId)) fail(`${entry.id}/${evalCase.case_id}: unknown Grader '${graderId}'`);
    for (const toolId of [...(evalCase.expected?.allowed_tools || []), ...(evalCase.expected?.required_tools || [])]) if (!toolIds.has(toolId)) fail(`${entry.id}/${evalCase.case_id}: unknown Tool '${toolId}'`);
    if (evalCase.expected?.max_tool_calls > agent.runtime.max_tool_calls) fail(`${entry.id}/${evalCase.case_id}: case max_tool_calls exceeds Agent session limit`);
  }

  const adapterManifests = [];
  for (const adapterPath of agent.links.runtime_adapters || []) {
    const adapter = validateReferencedJson(adapterPath, "adapters/adapter.schema.json");
    if (!adapter) continue;
    adapterManifests.push({ adapter, adapterPath });
    if (adapter.source.agent_id !== entry.id || adapter.source.agent_version !== entry.version) fail(`${entry.id}: Adapter source tuple mismatch (${adapterPath})`);
    if (adapter.environment_profile !== agent.runtime.environment_profile) fail(`${entry.id}: Adapter environment mismatch (${adapterPath})`);
    if (agent.runtime.provider !== "unbound" && adapter.target.provider !== agent.runtime.provider) fail(`${entry.id}: Adapter provider mismatch (${adapterPath})`);
    for (const artifact of adapter.generated_artifacts || []) requirePath(artifact.path, "file");
    if (adapter.verification.eval_set_ref) requirePath(adapter.verification.eval_set_ref, "file");
    if (adapter.verification.conformance_report) requirePath(adapter.verification.conformance_report, "file");
  }

  const instructionsPath = insidePackage(path.posix.join(directory, "instructions.md"));
  if (instructionsPath && fs.existsSync(instructionsPath)) {
    const instructions = fs.readFileSync(instructionsPath, "utf8");
    for (const heading of requiredInstructionHeadings) if (!instructions.includes(heading)) fail(`${entry.id}: instructions.md missing '${heading}'`);
  }

  if (["candidate", "active"].includes(entry.status)) {
    if (agent.runtime.provider === "unbound") fail(`${entry.id}: Candidate/Active provider must be bound`);
    if (!agent.runtime.model || /TBD/i.test(agent.runtime.model)) fail(`${entry.id}: Candidate/Active model must be pinned`);
    if (agent.runtime.environment_profile.includes("/_template/")) fail(`${entry.id}: Candidate/Active cannot use the environment template`);
    if (!environment || !["candidate", "active"].includes(environment.status)) fail(`${entry.id}: environment must be Candidate or Active`);
    if (environment?.provider === "unbound") fail(`${entry.id}: environment provider must be bound`);
    if (environment && environment.provider !== agent.runtime.provider) fail(`${entry.id}: Agent and environment provider mismatch`);
    if (agent.risk.approval_policy.includes("template") || agent.data.governance_policy.includes("template")) fail(`${entry.id}: Candidate/Active requires finalized policy files`);
    for (const skill of agent.capabilities.skills || []) if (skill.includes("/_template")) fail(`${entry.id}: Candidate/Active cannot use a Skill template`);
    if (caseCount === 0) fail(`${entry.id}: Candidate/Active requires Eval cases`);
    if (!evals.latest_result_ref) fail(`${entry.id}: Candidate/Active requires latest_result_ref`);
    const evalResult = evals.latest_result_ref ? validateReferencedJson(evals.latest_result_ref, "evals/eval-run.schema.json") : null;
    if (evalResult && evalResult.decision !== "pass") fail(`${entry.id}: latest Eval result must pass`);
    if (evalResult && evalResult.candidate?.agent !== `${entry.id}@${entry.version}`) fail(`${entry.id}: Eval candidate tuple mismatch`);
    if (evalResult && entry.status === "candidate" && !["replay", "shadow", "canary"].includes(evalResult.stage)) fail(`${entry.id}: Candidate requires replay-or-later Eval evidence`);
    if (evalResult && entry.status === "active" && evalResult.stage !== "canary") fail(`${entry.id}: Active requires canary Eval evidence`);
    if (!evals.rollout.replay.enabled) fail(`${entry.id}: Candidate/Active requires approved replay configuration`);
    if (entry.status === "active" && (!evals.rollout.shadow.enabled || !evals.rollout.canary.enabled)) fail(`${entry.id}: Active requires shadow and canary configuration`);
    if (adapterManifests.length === 0) fail(`${entry.id}: Candidate/Active requires a runtime Adapter`);
    for (const { adapter, adapterPath } of adapterManifests) {
      if (adapter.status !== "verified") fail(`${entry.id}: Adapter must be verified (${adapterPath})`);
      if (adapter.generated_artifacts.length === 0) fail(`${entry.id}: Adapter must declare generated artifacts (${adapterPath})`);
      if (!adapter.verification.eval_set_ref || !adapter.verification.conformance_report || !adapter.verification.verified_at || !adapter.verification.verified_by) fail(`${entry.id}: Adapter verification evidence is incomplete (${adapterPath})`);
    }
    if (!entry.release_record) fail(`${entry.id}: Candidate/Active requires release_record`);
    const release = entry.release_record ? validateReferencedJson(entry.release_record, "releases/release.schema.json") : null;
    if (release) {
      if (release.agent_id !== entry.id || release.agent_version !== entry.version) fail(`${entry.id}: Release Agent tuple mismatch`);
      if (release.status !== entry.status) fail(`${entry.id}: Release status mismatch`);
      if (release.version_tuple.agent !== `${entry.id}@${entry.version}`) fail(`${entry.id}: Release version tuple mismatch`);
      if (release.version_tuple.model !== `${agent.runtime.provider}/${agent.runtime.model}`) fail(`${entry.id}: Release model tuple mismatch`);
      if (environment && !release.version_tuple.environment.startsWith(`${environment.id}@${environment.version}#`)) fail(`${entry.id}: Release environment tuple mismatch`);
      if (adapterManifests.length && !adapterManifests.some(({ adapter }) => release.version_tuple.adapter.startsWith(`${adapter.id}@${adapter.version}#`))) fail(`${entry.id}: Release Adapter tuple mismatch`);
      if (evalResult && !deepEqual(evalResult.candidate, release.version_tuple)) fail(`${entry.id}: Eval and Release version tuples differ`);
      if (entry.status === "candidate" && !["release", "conditional"].includes(release.decision.verdict)) fail(`${entry.id}: Candidate Release decision must allow promotion`);
      if (entry.status === "active" && release.decision.verdict !== "release") fail(`${entry.id}: Active Release decision must be 'release'`);
      const requiredGates = entry.status === "active" ? ["A1", "A2", "A3", "A4"] : ["A1", "A2", "A3"];
      for (const gate of requiredGates) if (release.gate_evidence?.[gate]?.verdict !== "PASS") fail(`${entry.id}: ${gate} must PASS for ${entry.status}`);
    }
    const promotionArtifacts = [
      [agent, `${directory}/agent.json`],
      [environment, agent.runtime.environment_profile],
      [evals, `${directory}/evals.json`],
      ...adapterManifests.map(({ adapter, adapterPath }) => [adapter, adapterPath]),
      ...(release ? [[release, entry.release_record]] : [])
    ];
    for (const [artifact, artifactPath] of promotionArtifacts) for (const location of findPlaceholders(artifact, artifactPath)) fail(`${entry.id}: unresolved placeholder at ${location}`);
  }
}

validateDataset("evals/cases/example.jsonl", "example");

for (const message of notes) console.log(`[note] ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`[error] ${message}`);
  console.error(`\nAgent package check failed: ${errors.length} error(s)`);
  process.exit(1);
}

console.log(`Agent package check passed: ${agents.length} registered agent(s), ${seenCases.size} eval case(s), mode=${strict ? "strict" : "default"}`);
