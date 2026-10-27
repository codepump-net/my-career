# Adapter Conformance — [ADAPTER-ID]

| 항목 | 값 |
| --- | --- |
| Source Agent / hash | [agent-id@version] / [hash] |
| Environment / hash | [environment-id@version] / [hash] |
| Target runtime / version | [TBD] / [TBD] |
| Adapter / generated artifact hash | [version] / [hash] |
| Reviewer / time | [TBD] / [ISO-8601] |

## Contract Matrix

| Contract | Source | Runtime projection | Enforcement point | Test | Verdict |
| --- | --- | --- | --- | --- | --- |
| Instructions and stop conditions | `instructions.md` | [TBD] | Runtime prompt | [CASE-*] | NOT_REVIEWED |
| Context scope and freshness | `context.md` | [TBD] | Retrieval/context loader | [CASE-*] | NOT_REVIEWED |
| Skill trigger and resources | `capabilities.skills` | [TBD] | Skill loader | [CASE-*] | NOT_REVIEWED |
| Tool allowlist and schemas | `tools.json` | [TBD] | Tool gateway | [CASE-*] | NOT_REVIEWED |
| Approval and side effects | policy + Tool contract | [TBD] | Approval gateway | [CASE-*] | NOT_REVIEWED |
| Output and failure schema | `agent.json` | [TBD] | Output validator | [CASE-*] | NOT_REVIEWED |
| Session and cost limits | Agent + environment | [TBD] | Runtime supervisor | [CASE-*] | NOT_REVIEWED |
| Trace and retention | data + environment | [TBD] | Telemetry pipeline | [CASE-*] | NOT_REVIEWED |

## Unsupported or Compensating Controls

| Contract | Platform gap | Compensating control | Residual risk | Approver |
| --- | --- | --- | --- | --- |
| [None or explicit item] | [TBD] | [TBD] | [TBD] | [TBD] |

## Drift Check

- Source-to-artifact generation is deterministic or differences are explained: [TBD]
- Runtime configuration equals generated artifact hashes: [TBD]
- Direct edits detected: [TBD]
- Same fixed Eval set passes through this adapter: [TBD]

Decision: VERIFIED / CONDITIONAL / FAIL / NOT_REVIEWED
