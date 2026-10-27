# RELEASE-[AGENT-ID]-[VERSION]

| 항목 | 값 |
| --- | --- |
| Agent / Version | [agent-id] / [x.y.z] |
| Change | [CHG-*] |
| Status | Candidate / Active / Rejected / Rolled Back |
| Release date | [YYYY-MM-DD] |
| Owner / Approver | [TBD] / [TBD] |

## Version Tuple

| Component | Version / Hash / Snapshot | Diff from previous |
| --- | --- | --- |
| Agent contract | [TBD] | [TBD] |
| Instructions | [commit/hash] | [TBD] |
| Context | [cutoff] | [TBD] |
| Shared Skills | [version/hash] | [TBD] |
| Model | [provider + pinned version] | [TBD] |
| Tools / permissions | [hash/version] | [TBD] |
| Orchestration | [version] | [TBD] |
| Runtime adapter | [version] | [TBD] |
| Execution environment | [ID/version/hash] | [TBD] |
| Data / approval policy | [version/hash] | [TBD] |
| Eval set | [version/hash] | [TBD] |

## Gate Evidence

| Gate | Verdict | Evidence | Approver / Time |
| --- | --- | --- | --- |
| A1 Contract | NOT_REVIEWED | | |
| A2 Baseline | NOT_REVIEWED | | |
| A3 Candidate | NOT_REVIEWED | | |
| A4 Release | NOT_REVIEWED | | |

## Eval Comparison

| Metric | Baseline | Candidate | Threshold | Verdict |
| --- | ---: | ---: | ---: | --- |
| Overall pass | [TBD] | [TBD] | [TBD] | |
| Critical pass | [TBD] | [TBD] | 100% | |
| Regressions | [TBD] | [TBD] | 0 | |
| p95 latency | [TBD] | [TBD] | [TBD] | |
| Cost / task | [TBD] | [TBD] | [TBD] | |
| Human correction | [TBD] | [TBD] | [TBD] | |

## Deployment and Monitoring

- Environment / traffic: [TBD]
- Session budget / retention: [TBD]
- Rollout stage: Fixed Eval / Replay / Shadow / Canary / Production
- Canary duration and success criteria: [TBD]
- Dashboard / run index: [TBD]
- Known risks and owner: [TBD]

## Rollback

- Last known good Release: [TBD]
- Trigger: [TBD]
- Disable / restore procedure: [TBD]
- Verification after rollback: [TBD]

## Final Decision

- Decision: Release / Conditional / Reject / Roll back / TBD
- Rationale: [TBD]
- Approver / timestamp: [TBD]
