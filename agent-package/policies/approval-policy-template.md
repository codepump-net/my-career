# Approval Policy — [POLICY-ID]

| 항목 | 값 |
| --- | --- |
| Version / effective date | [x.y.z] / [YYYY-MM-DD] |
| Owner / approver | [TBD] / [TBD] |
| Scope | [agents, tools, environments] |
| Failure mode | Fail closed |

## Decision Matrix

| Action or data class | Risk | Required approver | Approval timing | Expiry | Evidence |
| --- | --- | --- | --- | --- | --- |
| Read approved non-sensitive source | Low | None | N/A | N/A | Run metadata |
| Shared write or external message | High | [TBD] | Before commit | [TBD] | Approval event ID |
| Destructive action or restricted data | Critical | [TBD] | Before call and before commit | [TBD] | Two-person or policy-defined record |

## Binding Rules

- Approval is scoped to the exact action, target, payload hash, Agent version, environment, and expiry.
- Missing, expired, mismatched, or unavailable approval blocks execution.
- Approval does not expand Tool, data, network, or filesystem allowlists.
- The Run index records approval event IDs but not sensitive approval payloads.

## Emergency Disable

- Kill switch owner and method: [TBD]
- Escalation and response target: [TBD]
- Post-disable verification: [TBD]
