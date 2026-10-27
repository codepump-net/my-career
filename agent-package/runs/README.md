# Agent Run Evidence

이 폴더에는 원문 대화나 전체 Tool 결과가 아니라 **버전과 결과를 재현·감사할 수 있는 비식별 인덱스**를 남긴다.

권장 경로:

```text
runs/<agent-id>/<YYYY-MM>/index.jsonl
```

권장 필드:

```json
{
  "schema_version": "1.0",
  "run_id": "RUN-AGENT-YYYYMMDD-NNN",
  "timestamp": "ISO-8601",
  "stage": "development|fixed_eval|replay|shadow|canary|production",
  "version_tuple": {
    "agent": "agent-id@x.y.z",
    "model": "provider/pinned-version",
    "adapter": "adapter@version#hash",
    "environment": "environment@version#hash",
    "instructions_hash": "...",
    "context_hash": "...",
    "skills_hash": "...",
    "tools_hash": "...",
    "orchestration_hash": "...",
    "policy_hash": "...",
    "eval_set_hash": "..."
  },
  "eval_or_request_ref": "...",
  "status": "success|failure|blocked|cancelled",
  "metrics": {
    "latency_ms": 0,
    "tool_calls": 0,
    "retries": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "cost_amount": 0,
    "cost_currency": "USD"
  },
  "approval_events": [],
  "failure_class": null,
  "evidence_uri": "approved-secure-location",
  "data_handling": {
    "contains_sensitive_data": false,
    "trace_level": "metadata",
    "retention_until": null,
    "redaction_verified": true
  }
}
```

JSONL 한 행은 [`run.schema.json`](run.schema.json), 복사 원본은 [`run-template.json`](run-template.json)을 따른다. Version tuple이 없으면 동일 실행을 재현하거나 Release·Rollback 조합을 확정할 수 없으므로 운영 Run으로 인정하지 않는다.

## 보존 규칙

- 비밀, 자격 증명, 개인정보, 사용자 원문을 Git에 커밋하지 않는다.
- 보안 저장소의 Trace는 접근 권한과 보존 기한을 적용한다.
- 재구성한 과거 실행을 실제 `RUN-*`으로 기록하지 않는다.
- Eval·Release에서 인용한 Run은 삭제보다 만료·접근 불가 상태를 명시한다.
- 실패 분류는 `prompt / model / context / tool / permission / orchestration / infrastructure / unknown` 중 하나를 기본으로 한다.
