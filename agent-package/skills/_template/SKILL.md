---
name: skill-name
description: Performs [one bounded capability] when [clear trigger]. Do not use for [confusable but unsupported task].
---

# [Skill title]

## Inputs

- Required: [input and validation rule]
- Optional: [input and default]
- Canonical references: [repository-relative paths]

## Procedure

1. Validate the trigger, input, scope, and evidence cutoff.
2. Load only the reference files needed for the current task.
3. Execute the bounded procedure within the caller Agent's Tool and approval policy.
4. Validate the output and return evidence or a structured blocker.

## Outputs

- Artifact: [shape and destination]
- Evidence: [checks, source references, or hashes]
- Failure: `code / message / blocker / safe_next_action`

## Safety and Stop Conditions

- The Skill never expands the caller Agent's Tool, data, network, or write permissions.
- Stop when authority, required context, or validation evidence is missing.
- Do not claim completion when a required check did not run.

## Validation

- [Deterministic check]
- [Representative eval case]
- [Boundary or failure eval case]
