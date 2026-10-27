# [FEATURE-ID] Agent 실행 계획과 Run Log

| 항목 | 값 |
| --- | --- |
| 요구사항 정본 | [`feature.md`](feature.md) |
| 현재 Gate | `G2 Build / G3 Release` |
| 실행 책임자 | `[사람]` |
| Main Agent / 환경 | `[Codex, Claude Code, 기타 / 버전·설정]` |
| 계획 승인자·일자 | `[이름 / YYYY-MM-DD]` |

> 이 문서는 요구사항을 다시 쓰지 않는다. `FR-*`, `NFR-*`, `AC-*`를 참조해 실행과 증거만 기록한다.

---

## 1. Agent Contract

| 필드 | 정의 |
| --- | --- |
| 이름 | `[기능명] Development Agent` |
| 단일 책임 | `[승인된 요구사항을 어떤 Release-ready 결과로 바꾸는가]` |
| 입력 | `feature.md`, `[코드·API·데이터·디자인 경로]` |
| 신뢰하는 정본 | `[경로]` |
| 출력 계약 | `[변경 파일, 문서, 테스트 결과, 증거 형식]` |
| 금지 | `[요구사항 임의 변경, 금지 경로, 미승인 배포·삭제 등]` |
| 사람 승인 필요 | `[정책·데이터·결제·배포·범위 변경]` |
| 성공 종료 | `[필수 AC와 검증이 통과하고 증거가 연결됨]` |
| 부분 성공 | `[완료/미완료를 분리하고 남은 위험을 보고]` |
| 차단 종료 | `[필수 입력·권한·환경이 없어 안전하게 진행할 수 없음]` |
| 재시도 / Timeout | `[동일 오류 최대 N회, Tool별 제한]` |
| Escalation | `[누구에게 어떤 정보와 선택지를 전달하는가]` |

---

## 2. Context Pack

| 우선순위 | 자료 | 경로 / 링크 | 읽는 이유 | 최신성 확인 |
| --- | --- | --- | --- | --- |
| P0 | 요구사항 정본 | `feature.md` | Scope·FR·AC | `[날짜/commit]` |
| P0 | 프로젝트 규칙 | `[CLAUDE.md / AGENTS.md / rules]` | 구조·금지·검증 | `[TBD]` |
| P0 | 관련 코드·API | `[경로]` | 현재 구현·계약 | `[TBD]` |
| P1 | 디자인·데이터 | `[링크]` | UX·제품 근거 | `[TBD]` |
| P2 | 참고 자료 | `[링크]` | 비교·배경 | `[TBD]` |

Context에서 제외할 자료와 이유: `[오래된 문서, 비정본 복사본 등]`

---

## 3. Agent·Skill·Tool Orchestration

### 구성 선택

- 기본: `[Single Agent]`
- Specialist 사용 여부: `[N/A 또는 이름과 분리 근거]`
- Handoff / Manager 방식: `[N/A 또는 최종 결과 소유권]`
- 병렬화: `[독립 작업만 명시]`

### Skill Contract

| Skill | 역할 | 입력 | 출력 | 사용 조건 | 사용하지 않을 조건 | 버전 |
| --- | --- | --- | --- | --- | --- | --- |
| `[SKILL.md 이름 또는 N/A]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

### Tool Contract

| Tool | 목적 | 입력 / 출력 계약 | 오류·Timeout | Side effect | Idempotent | 권한 | 호출 전후 검증 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `[Read/Search]` | `[TBD]` | `[TBD]` | `[TBD]` | 없음 | 예 | allow | `[민감정보·범위]` |
| `[Edit/API/MCP]` | `[TBD]` | `[TBD]` | `[TBD]` | `[파일/외부 상태]` | `[예/아니오]` | `[allow/ask/deny]` | `[TBD]` |

### Claude Code 구성 매핑

| 책임 | 적용 파일·기능 | 이 기능에서의 내용 |
| --- | --- | --- |
| 항상 필요한 Context | `CLAUDE.md`, `.claude/rules/` | `[TBD]` |
| 반복 절차 | `.claude/skills/*/SKILL.md` | `[TBD 또는 N/A]` |
| 외부 Capability | Built-in Tool, `.mcp.json` | `[TBD 또는 N/A]` |
| 격리된 전문 작업 | `.claude/agents/*.md` | `[TBD 또는 N/A]` |
| 결정적 검사·차단 | Hook | `[TBD 또는 N/A]` |
| 실행 경계 | Permission, Sandbox | `[TBD]` |

---

## 4. Guardrail과 사람 승인

| ID | 경계 / 위험 | 등급 | 자동 검사 | 사람 승인 시점 | Timeout·실패 시 | 증거 |
| --- | --- | --- | --- | --- | --- | --- |
| GR-01 | `[금지 경로 수정]` | `R1` | `[PreToolUse/경로 검사]` | `[필요 시]` | `차단` | `[로그]` |
| GR-02 | `[공용 데이터·배포]` | `R2/R3` | `[schema/policy]` | `Tool 실행 전` | `fail-closed` | `[승인 기록]` |

권한 원칙:

- allow: `[읽기·검사처럼 자동 허용할 최소 범위]`
- ask: `[쓰기·외부 상태 변경처럼 사람 확인이 필요한 범위]`
- deny: `[비밀·배포·삭제 등 이 Agent가 절대 수행하지 않을 범위]`
- Sandbox 경계: `[filesystem / network / process]`

---

## 5. 작업 분해

| ID | 관련 요구·AC | 작업 | 담당 | 변경 예상 | 선행 작업 | 검증 | 상태 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TASK-01 | `FR-01 / AC-01` | `[TBD]` | `[사람/Agent]` | `[파일·API]` | `[TBD]` | `TEST-01` | `Pending` |
| TASK-02 | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `TASK-01` | `[TBD]` | `Pending` |

변경하지 않을 영역: `[경로·시스템과 이유]`

---

## 6. 실행 전 계획

1. `[현재 상태 조사와 확인할 가정]`
2. `[최소 구현 단위]`
3. `[검증 명령·시나리오]`
4. `[실패 시 수정 또는 Rollback]`
5. `[사람에게 제시할 증거]`

계획상 위험과 대응: `[TBD]`

---

## 7. Run Log

| Run ID | 일시 | 목표 / 관련 TASK | Agent·모델 | Skill·Tool | 결과 | 검증·증거 | 사람 판단 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RUN-001 | `YYYY-MM-DD HH:mm KST` | `TASK-01` | `[TBD]` | `[TBD]` | `[성공/부분/실패/차단]` | `[로그·diff·commit]` | `[승인/수정/거절]` |

### RUN-001 상세

- 입력 요청: `[원문 또는 세션 링크]`
- 읽은 Context: `[경로]`
- 선택한 계획과 이유: `[TBD]`
- 실제 Tool 호출 요약: `[순서·핵심 입력·결과]`
- 변경 요약: `[파일·동작]`
- 실행한 검증: `[명령·시나리오·결과]`
- 승인·중단 지점: `[TBD]`
- 예상과 달랐던 점: `[TBD]`
- 다음 행동: `[TBD]`

---

## 8. 실패·복구 기록

| ID | Run | 분류 | 현상 | 근본 원인 | 탐지 | 복구 | 재발 방지 | 재검증 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FAIL-01 | `RUN-001` | `[Context/Requirement/Planning/Tool/Permission/Implementation/Verification/Product]` | `[TBD]` | `[TBD]` | `[TBD]` | `[retry/fallback/rollback]` | `[문서/Skill/Hook/Test 변경]` | `[TEST-*]` |

---

## 9. 구현 완료 보고

- 완료 TASK: `[TASK-*]`
- 미완료·차단 TASK: `[TASK-* / 이유]`
- 변경 파일·API: `[링크]`
- 요구사항과 다른 변경: `[N/A 또는 DEC-*]`
- 테스트·정적 검사 결과: [`evaluation.md`](evaluation.md)
- 알려진 위험: `[RISK-*]`
- Release 권고: `[Ready / Hold / Rollback]`

