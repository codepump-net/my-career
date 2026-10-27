# Agents

Agent 하나당 폴더 하나를 사용한다. `agents/_template/`을 복사하고 폴더명, `agent.json > id`, `registry.json > id`를 동일한 kebab-case로 맞춘다.

```text
agents/<agent-id>/
├── agent.json
├── instructions.md
├── context.md
├── tools.json
├── evals.json
├── runbook.md
└── CHANGELOG.md
```

## 분리 원칙

- 안정적인 역할·절차·금지는 `instructions.md`에 둔다.
- 자주 바뀌는 프로젝트 자료와 정본 링크는 `context.md`에 둔다.
- 재사용 절차는 `skills/`에 두되 Agent의 권한을 확장하지 않는다.
- 실행 가능한 권한은 `tools.json`, 환경, 승인 정책, 런타임 adapter에서 함께 강제한다.
- 합격 기준은 `evals.json`에 두고 프롬프트에 답을 복사하지 않는다.
- 배포·장애·Rollback은 `runbook.md`에 둔다.
- 버전별 변경 이유와 Eval 근거는 `CHANGELOG.md`에 둔다.

Candidate와 Active Agent는 `[TBD]`나 검증되지 않은 권한을 포함할 수 없다.

## Registry 항목

```json
{
  "id": "round-design-agent",
  "path": "agents/round-design-agent",
  "version": "1.2.0",
  "status": "active",
  "release_record": "releases/round-design-agent/1.2.0.json"
}
```

## Tool 항목

Tool이 필요할 때만 `tools.json > tools`에 추가한다. 계약은 [`tool.schema.json`](tool.schema.json)을 따르며 Tool 설명은 입력·출력 타입, 오류, 부작용을 런타임이 강제할 수 있을 만큼 구체적이어야 한다.

```json
{
  "id": "read-project-docs",
  "purpose": "승인된 프로젝트 문서를 읽는다.",
  "effect": "read",
  "risk": "low",
  "input_schema": {
    "type": "object",
    "required": ["path"],
    "properties": { "path": { "type": "string" } }
  },
  "output_schema": {
    "type": "object",
    "required": ["content", "source_hash"],
    "properties": {
      "content": { "type": "string" },
      "source_hash": { "type": "string" }
    }
  },
  "allowed_scopes": ["docs/**"],
  "forbidden": ["secrets/**", "범위 밖 경로"],
  "data_classifications": ["public", "internal"],
  "credential_refs": [],
  "approval": "none",
  "idempotency": "idempotent",
  "idempotency_key": null,
  "retry_safe": true,
  "preconditions": ["path가 allowed_scopes 안에 있음"],
  "postconditions": ["content와 source_hash가 모두 존재"],
  "success_signal": "파일 내용과 기준 commit을 반환",
  "timeout_seconds": 30,
  "max_retries": 1,
  "rate_limit": { "max_calls": 20, "window_seconds": 60 },
  "cost_limit": { "amount": 0, "currency": "USD" },
  "partial_failure_behavior": "부분 읽기를 성공으로 보고하지 않음",
  "compensation": null,
  "error_behavior": "읽기 실패를 구조화해 반환하고 다른 경로를 추측하지 않음"
}
```
