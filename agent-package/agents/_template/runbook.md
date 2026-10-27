# Agent Runbook — [AGENT-ID]

## Service Contract

- Consumers: [TBD]
- Runtime adapter: [TBD]
- Execution environment / hash: [TBD]
- Data / approval policy: [TBD]
- Session budget: [turn / tool / token / cost / duration]
- Availability / latency target: [TBD]
- Data classification: [TBD]
- Operational owner: [TBD]

## Deployment

1. Verify `agent.json` version and registry candidate version.
2. Run package check, regression, safety, and holdout Eval.
3. Review model, prompt, Tool, permission, and adapter diff.
4. Record approval and rollback version in the Release Record.
5. Run approved replay with anonymized production samples.
6. Run shadow traffic with all side effects disabled.
7. Rehearse rollback and deploy to a bounded canary.
8. Confirm success criteria before increasing traffic.

## Rollout Gates

| Stage | Entry | Side effects | Exit evidence | Abort / rollback trigger |
| --- | --- | --- | --- | --- |
| Fixed Eval | A2 baseline | None | Threshold comparison | Critical failure |
| Replay | Fixed Eval pass | None | Approved sample result | Privacy or regression failure |
| Shadow | Replay pass | Disabled | Quality/cost/latency trend | Any attempted side effect |
| Canary | A4 approval + rehearsal | Declared scope only | Duration + traffic criteria | Runbook threshold |

## Monitoring

| Signal | Target / Alert | Evidence location | Owner |
| --- | --- | --- | --- |
| Task success | [TBD] | [dashboard/run index] | [TBD] |
| Critical failure | [TBD] | [TBD] | [TBD] |
| p95 latency | [TBD] | [TBD] | [TBD] |
| Cost per task | [TBD] | [TBD] | [TBD] |
| Human correction | [TBD] | [TBD] | [TBD] |
| Tool error / retry | [TBD] | [TBD] | [TBD] |

## Incident Triage

1. Stop or reduce the affected traffic when user, data, or external-system harm is possible.
2. Preserve non-sensitive evidence and the exact deployed version tuple.
3. Classify prompt, model, Tool, context, orchestration, permission, or infrastructure failure.
4. Roll back when the release criteria or risk boundary is violated.
5. Add an anonymized regression case before re-release.

## Rollback

- Last known good Agent version: [TBD]
- Model / prompt / Tool / adapter versions: [TBD]
- Disable switch or command: [TBD]
- Data repair required: [TBD]
- Verification after rollback: [TBD]
- Approval and communication owner: [TBD]

## Known Failure Modes

| Failure | Detection | Immediate action | Permanent prevention |
| --- | --- | --- | --- |
| [TBD] | [TBD] | [TBD] | [Eval/guardrail/change] |
