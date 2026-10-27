# Context Contract — [AGENT-ID]

## Canonical Sources

| Priority | Source | Responsibility | Version / Freshness | Required |
| ---: | --- | --- | --- | --- |
| 1 | [repository path or approved URI] | [TBD] | [commit/date/SLA] | Yes |

## Allowed Context

| Context | Why needed | Data classification | Loading rule |
| --- | --- | --- | --- |
| [TBD] | [TBD] | Public / Internal / Confidential / Restricted | Always / On demand |

## Retrieval and Provenance

| Source | Query/filter | Returned fields | Freshness check | Citation/evidence format |
| --- | --- | --- | --- | --- |
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |

## Exclusions

- [Data, directory, system, or inference the Agent must not use]

## Freshness and Conflict Rules

- Record the evidence cutoff before execution.
- Prefer higher-priority canonical sources; do not silently merge conflicts.
- Create a GAP or structured failure when two sources can change the outcome.
- Treat generated summaries as derived context, not a new source of truth.

## Context Budget

- Always-loaded context: [TBD]
- On-demand context: [TBD]
- Maximum or compaction policy: [TBD]
- Sensitive-data minimization: [TBD]
- Retention / deletion policy: [policy ID + duration]
- Context injection or untrusted-content handling: [TBD]
