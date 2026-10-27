# Runtime Adapters

Agent 패키지의 정본을 실제 실행 환경에 투영하는 계층이다. 플랫폼별 파일을 Agent 정본과 별도로 관리해 OpenAI·Claude·로컬 실행 환경 사이의 공통 계약과 차이를 드러낸다.

Adapter는 단순 문서 변환기가 아니라 **compile + enforce + attest** 계약이다. [`adapter.schema.json`](adapter.schema.json)으로 생성 명세를, [`_template/conformance.md`](_template/conformance.md)로 의미 보존과 런타임 강제를 검토한다.

## 공통 규칙

- `agents/<agent-id>/`가 정본이고 adapter는 생성·동기화되는 배포본이다.
- adapter에는 `source agent id/version/hash`, 대상 runtime, 생성일, 검증 결과를 기록한다.
- 플랫폼이 지원하지 않는 계약은 조용히 생략하지 않고 `unsupported` 또는 별도 guardrail로 표시한다.
- adapter를 직접 고쳤다면 같은 변경을 정본에 반영하거나 배포를 중단한다.
- 모델 별칭보다 가능한 경우 검증한 snapshot·버전을 Release Record에 고정한다.
- 생성 결과의 hash와 실제 런타임 설정 hash를 비교하며 drift가 있으면 배포를 차단한다.

## 책임 매핑

| 공통 정본 | OpenAI 계열 예 | Claude Code 계열 예 |
| --- | --- | --- |
| `instructions.md` | Agent instructions, Codex `AGENTS.md` 투영 | `CLAUDE.md`, Agent/Skill prompt 투영 |
| `context.md` | input/context retrieval 정책 | 프로젝트 문서, Skill reference |
| `tools.json` | function tools, MCP, guardrail·approval | allowed tools, MCP, permission rules, hooks |
| `evals.json` | Agent evals, trace grading | 회귀 task, hook·Tool·결과 검증 |
| `runbook.md` | tracing, deployment, rollback | 실행 로그, CI, 배포·복구 절차 |
| `skills/<id>/SKILL.md` | Agent Skills 또는 런타임 Skill 투영 | Claude Skills 투영 |
| `environments/<id>.json` | runtime/sandbox/session 설정 | managed 또는 local environment 설정 |

플랫폼 기능이 다르더라도 `입력 / 출력 / Tool 범위 / 승인 / 중단 / 증거 / Eval` 계약은 동일하게 유지한다.

## 생성 인터페이스

```text
compile(agent, tools, context, skills, environment, policies, target)
  → generated artifacts + adapter.json + conformance input
```

생성기는 다음을 보장해야 한다.

1. 정본의 각 규칙을 한 번만 투영하고 중복·충돌을 보고한다.
2. Tool 입력·출력 schema, allowlist, approval, budget을 런타임 강제 지점에 연결한다.
3. 지원되지 않는 항목은 `unsupported_contracts`와 보완 통제로 남긴다.
4. source와 artifact의 hash를 기록해 재생성과 drift 검사를 가능하게 한다.
5. OpenAI와 Claude 모두 같은 Eval case·Rubric으로 검증한다.

## Adapter 검증 체크

- [ ] source Agent ID·version·hash가 기록됐다.
- [ ] 필수 지침이 한 번씩만 투영됐다.
- [ ] Tool allowlist와 side effect 승인이 런타임에서 강제된다.
- [ ] timeout·retry·turn·tool-call 제한이 적용됐다.
- [ ] 출력 schema와 구조화된 실패가 보존됐다.
- [ ] 같은 Eval set으로 adapter 동작을 회귀 검증했다.
- [ ] Release Record에 adapter 버전과 Rollback 조합이 기록됐다.
- [ ] `adapter.json`과 conformance report가 schema·참조 검사를 통과했다.
- [ ] 생성 artifact와 실제 배포 설정의 drift가 0이다.
