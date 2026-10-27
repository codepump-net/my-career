# Data Governance Policy — [POLICY-ID]

| 항목 | 값 |
| --- | --- |
| Version / effective date | [x.y.z] / [YYYY-MM-DD] |
| Owner / approver | [TBD] / [TBD] |
| Applicable agents/environments | [TBD] |
| Residency | [TBD] |

## Classification and Use

| Class | Allowed purpose | Prohibited use | Redaction | Retention | Storage |
| --- | --- | --- | --- | --- | --- |
| Public | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| Internal | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |
| Confidential | Deny unless explicitly approved | [TBD] | Required | [TBD] | Approved secure store |
| Restricted | Default deny | Model or Tool input without explicit authority | Required | Minimum necessary | Approved secure store only |

## Controls

- Data minimization and purpose limitation: [TBD]
- Credential and personal-data detection: [TBD]
- Provider training-use control: [TBD]
- Deletion, legal hold, and evidence-expiry process: [TBD]
- Incident notification owner and SLA: [TBD]

## Trace Policy

- Git stores only non-sensitive metadata and approved evidence references.
- Raw input, model output, and Tool payload retention: [TBD]
- Redaction verification and sample audit: [TBD]
