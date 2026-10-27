# TPM Agent 기반 기능 개발 가이드

| 항목 | 값 |
| --- | --- |
| 목적 | 제품 문제를 검증 가능한 기능으로 바꾸고, Agent를 통제된 실행 수단으로 사용한다 |
| 적용 범위 | 게임, UGC 플랫폼, 웹·앱, 내부 도구, API, 콘텐츠 파이프라인의 개별 기능 |
| 기본 단위 | 기능 하나당 하나의 **Feature Packet** |
| 상태 | v1.0 |
| 최종 갱신 | 2026-08-30 |

이 문서는 특정 모델이나 프레임워크의 사용법이 아니라, TPM이 기능의 **문제 정의·대안·명세·실행·검증·학습**을 끝까지 연결하기 위한 운영 기준이다. OpenAI와 Anthropic의 공식 Agent 문서에서 공통으로 확인되는 원칙을 제품 개발 문서 체계로 변환했다.

> 핵심 명제: Agent가 코드를 생성했다는 사실은 완료 증거가 아니다. 사람이 목표와 위험 경계를 정하고, Agent의 실행 경로와 결과를 검증한 뒤, 제품 지표로 효과를 확인해야 기능 개발이 끝난다.

---

## 1. 적용 원칙

### 1.1 결과를 먼저 정의한다

기능 목록보다 먼저 해결할 사용자 문제와 기대 행동 변화를 적는다. 산출물 완료와 제품 성과를 구분한다.

- **Output:** 화면, API, 시스템, 콘텐츠처럼 만든 것
- **Outcome:** 완주율, 전환율, 작업 시간, 오류율처럼 달라져야 하는 것
- **Guardrail metric:** 핵심 지표를 높이는 과정에서 악화되면 안 되는 비용·품질·안전 지표

`출시했다`는 Output이고 `이탈률이 감소했다`는 Outcome이다. 후자는 비교 기간, 표본, 측정 정의가 있어야 성립한다.

### 1.2 Agent보다 제품 책임이 먼저다

Agent는 제품 책임자가 아니다. 다음 판단은 사람이 소유한다.

- 어떤 문제를 풀지, 지금 풀 가치가 있는지
- 어떤 사용자와 이해관계자를 우선할지
- 대안 중 무엇을 선택하고 무엇을 포기할지
- 금전·데이터·보안·배포 등 부작용이 있는 변경을 승인할지
- 품질 증거가 충분한지, 출시·중단·롤백할지

Agent는 조사, 대안 초안, 명세 구조화, 구현, 검사, 문서 갱신처럼 계약으로 제한할 수 있는 일을 수행한다.

### 1.3 한 Agent로 시작한다

기본값은 한 Agent다. 역할을 여러 Agent로 나누는 것은 다음 중 하나가 실제로 달라질 때뿐이다.

- 필요한 도구 또는 권한
- 전문 지식과 출력 계약
- 독립된 검증 관점
- 컨텍스트 격리 필요성
- 사용자 응답 또는 최종 결과의 소유권

단순히 단계가 여러 개라는 이유로 Multi-agent를 사용하지 않는다. 분할은 프롬프트, Trace, 승인 지점을 늘리므로 분리 이득을 문서로 설명할 수 있어야 한다.

### 1.4 추론과 강제를 분리한다

- Agent가 상황에 맞게 판단해야 하는 절차는 **Instruction 또는 Skill**로 둔다.
- 매번 동일하게 실행되어야 하는 포맷·테스트·금지 검사는 **결정적 코드 또는 Hook**으로 둔다.
- 외부 시스템 접근은 **Tool 또는 MCP**로 제공하고 입력·출력·오류·부작용을 계약으로 적는다.
- 위험한 Tool 호출은 실행 전에 멈추고 **사람 승인**을 받는다.

프롬프트의 “하지 마라”는 지침이지 강제가 아니다. 반드시 지켜야 하는 경계는 권한, Sandbox, Hook, 서버 검증 등 실행 계층에서 막는다.

### 1.5 완료 주장보다 증거를 남긴다

Agent의 “완료했습니다”를 수용하지 않는다. 최소한 다음 중 해당하는 증거를 남긴다.

- 실행한 명령과 종료 결과
- 테스트·정적 검사 출력
- 화면 캡처 또는 플레이 테스트 기록
- 변경 diff와 관련 commit
- API 응답 또는 로그
- 제품 지표의 기준값과 변경 후 값

검증 수단이 없으면 구현보다 먼저 검증 수단을 만든다. 자동화할 수 없는 재미·사용성 판단은 사람의 관찰 시나리오와 판정 기준을 명시한다.

### 1.6 결과와 실행 경로를 함께 평가한다

최종 결과가 맞아도 잘못된 Tool, 과도한 권한, 불필요한 재시도, 우연한 성공을 거쳤다면 좋은 Agent 실행이 아니다.

- **Output evaluation:** 산출물이 요구사항과 수용 기준을 만족했는가
- **Trace evaluation:** Tool 선택, 승인, 재시도, 중단 경로가 적절했는가
- **Product evaluation:** 사용자·사업 지표가 의도한 방향으로 변했는가
- **Efficiency evaluation:** 같은 품질에서 시간·비용·개입·재작업이 줄었는가

### 1.7 정본은 하나만 둔다

같은 요구사항을 여러 문서에 복사하지 않는다. Feature Packet의 `feature.md`가 목표·범위·요구사항·수용 기준의 유일한 정본이다. 다른 문서는 안정적인 ID로 참조한다.

```text
OBS-01 관찰
  → HYP-01 가설
  → FR-01 기능 요구사항
  → AC-01 수용 기준
  → TASK-01 실행 작업
  → RUN-01 Agent 실행
  → TEST-01 검증 결과
  → METRIC-01 제품 지표
  → DEC-01 유지·개선·롤백 결정
```

이 연결이 면접에서 “왜 만들었고, 어떻게 판단했고, 무엇으로 검증했는가”를 재구성하는 근거가 된다.

---

## 2. 공식 원칙을 산출물로 변환한 근거

| 공식 원칙 | 이 가이드의 적용 |
| --- | --- |
| OpenAI는 Agent를 instructions, tools, guardrails, handoffs, structured output이 결합된 실행 단위로 정의 | `execution.md`에 Agent Contract와 Tool Contract를 둔다 |
| OpenAI는 가능한 한 한 Agent로 시작하고 계약·권한·격리 이점이 있을 때만 specialist를 추가하도록 권고 | Multi-agent를 기본값으로 사용하지 않고 분리 근거를 요구한다 |
| OpenAI는 부작용 경계에서 Tool guardrail과 사람 승인을 적용하고 실행 결과를 기록하도록 안내 | 위험 등급, 승인 Gate, fail-closed, 실행 기록을 둔다 |
| OpenAI는 Trace로 모델·Tool·guardrail·handoff 경로를 보고, 반복 평가에는 dataset과 eval run을 사용 | `execution.md`의 Run Log와 `evaluation.md`의 Trace Eval·Regression Set으로 분리한다 |
| OpenAI Skills는 `SKILL.md`와 지원 파일로 반복 절차·규약을 버전화 | 여러 기능에서 검증된 절차만 Skill 후보로 승격한다 |
| Claude Code는 CLAUDE.md·Rules·Skills·MCP·Subagents·Hooks의 책임을 구분 | 상시 컨텍스트, 반복 절차, 외부 연결, 격리 작업, 결정적 검사를 구분해 설계한다 |
| Claude Code는 실행 가능한 pass/fail 검증과 결과 증거 제공을 강조 | 수용 기준마다 검증자·방법·증거 위치를 요구한다 |
| Claude Code 권한과 Sandbox는 서로 다른 방어 계층 | Tool allow/ask/deny와 OS 수준 실행 경계를 별도로 기록한다 |

이 문서는 공식 문서의 제품별 API 형식을 그대로 복제한 것이 아니라, 그 원칙을 TPM 기능 개발에 사용할 수 있도록 일반화한 운영 템플릿이다.

---

## 3. Feature Packet 구조

기능마다 다음 폴더를 복사해 사용한다.

```text
docs/features/<feature-id>/
├── feature.md       # 왜·무엇을 만드는가: 유일한 요구사항 정본
├── execution.md     # 누가·어떻게 실행하는가: Agent 계약, 계획, Run Log
├── evaluation.md    # 무엇으로 통과시키는가: 테스트, Eval, 지표, 출시 판정
├── decisions.md     # 왜 선택이 바뀌었는가: append-only 결정 기록
└── evidence/        # 필요한 경우 캡처·내보낸 로그 등 작은 증거 파일
```

복사 원본은 [`../templates/tpm-agent-feature/`](../templates/tpm-agent-feature/README.md)에 있다.

### 3.1 문서별 책임

| 문서 | 질문 | 생성 시점 | 완료 조건 |
| --- | --- | --- | --- |
| `feature.md` | 왜, 누구를 위해, 무엇을 만들며 성공은 무엇인가 | Intake 직후 | 범위·대안·요구사항·AC·지표가 승인됨 |
| `execution.md` | Agent와 사람이 어떤 권한·순서·검사로 실행하는가 | Build 승인 전 | Tool·Skill·승인·중단·검증 계획이 닫힘 |
| `evaluation.md` | 결과와 경로를 어떤 증거로 평가했는가 | AC 작성과 동시에 시작 | AC, 회귀, 위험, 제품 지표 판정이 기록됨 |
| `decisions.md` | 중요한 선택과 Trade-off가 왜 바뀌었는가 | 첫 대안 선택부터 | 각 결정에 근거·소유자·재검토 조건이 있음 |

### 3.2 기능 규모별 적용

템플릿은 하나만 유지하고 깊이만 조절한다.

| 등급 | 예시 | 적용 방식 |
| --- | --- | --- |
| Lite | 문구, 단순 UI 상태, 내부 설정 | 관련 없는 절을 `N/A — 이유`로 닫고 한 번의 Run·검증 기록 |
| Standard | 사용자 흐름, 게임 규칙, API 연동 | 전체 문서 사용, 정상·실패·경계 시나리오와 제품 지표 필요 |
| High-risk | 결제, 보상, 개인정보, 권한, 마이그레이션, 배포 | 독립 검토자, 명시적 승인, Rollback rehearsal, 보안·운영 Eval 추가 |

별도 “간단 기능 템플릿”을 만들지 않는다. 템플릿이 여러 벌이면 필드와 기준이 서로 어긋난다.

---

## 4. 기능 개발 생명주기와 Gate

### Phase 0. Intake — 요청을 문제가설로 바꾼다

입력은 기능 아이디어일 수 있지만, 산출물은 문제 정의여야 한다.

1. 요청자와 대상 사용자 확인
2. 관찰된 현상과 출처 기록
3. 사실, 해석, 가설 분리
4. 하지 않을 경우의 영향과 우선순위 작성
5. 기능이 아닌 더 작은 해결책 포함

**Gate G0 · Discovery 승인**

- 해결할 문제가 한 문장으로 설명되는가
- 사용자와 현재 행동이 관찰 근거에 연결되는가
- 성공 지표와 Guardrail 지표의 측정 방법이 존재하는가
- 단순 구현 요청을 그대로 문제 정의로 사용하지 않았는가

### Phase 1. Explore — 대안을 만든다

최소 두 가지 대안과 “만들지 않음”을 비교한다. Agent가 조사·대안 초안을 만들 수 있지만 최종 선택은 사람이 한다.

비교 기준 예시:

- 사용자 가치와 학습 가능성
- 기술 복잡도와 운영 비용
- 공정성·악용·보안 위험
- 플랫폼·API 제약
- 되돌릴 수 있는 정도
- 지표에 영향을 주는 예상 경로

중요한 선택은 `decisions.md`에 `DEC-*`로 남긴다.

### Phase 2. Specify — 구현 가능한 계약으로 만든다

`feature.md`에 다음을 확정한다.

- In scope / Out of scope / Non-goals
- 핵심 사용자 흐름과 UI 상태
- 상태·이벤트·전이·실패 경로
- 데이터·API·Tool 입력과 출력
- 기능 요구사항(FR)과 비기능 요구사항(NFR)
- 수용 기준(AC)과 검증 방법
- Rollout, Kill switch, Rollback 조건

**Gate G1 · Design 승인**

- 모든 요구사항에 안정적인 ID가 있는가
- 정상 경로뿐 아니라 빈 상태·오류·중단·권한·재시도 상태가 정의됐는가
- 서버·클라이언트·Agent·사람의 책임 경계가 분명한가
- 각 AC가 pass/fail로 판정되거나 사람 판정 기준을 갖는가
- 대안과 Trade-off를 설명할 수 있는가

### Phase 3. Design Execution — Agent 실행을 설계한다

`execution.md`에 Agent Contract를 작성한다.

| 필드 | 반드시 답할 질문 |
| --- | --- |
| 역할 | 이 Agent가 소유하는 하나의 결과는 무엇인가 |
| 입력 컨텍스트 | 어떤 정본 문서·코드·데이터만 신뢰하는가 |
| 출력 계약 | 어떤 형식, 파일, 근거를 반환해야 하는가 |
| Tool | 읽기·쓰기·외부 호출·부작용은 무엇인가 |
| Skill | 반복 가능한 어떤 절차를 불러오는가 |
| 권한 | allow / ask / deny와 Sandbox 경계는 무엇인가 |
| 승인 | 어느 변경 전에 누구에게 멈추는가 |
| 검증 | Agent가 직접 실행할 pass/fail 검사는 무엇인가 |
| 실패 | 재시도 횟수, timeout, fallback, rollback은 무엇인가 |
| 종료 | 성공·부분 성공·차단을 어떤 조건으로 선언하는가 |

**Gate G2 · Build 승인**

- Agent가 임의로 요구사항을 변경할 수 없게 되어 있는가
- 각 Tool의 입력·출력·오류·부작용이 식별됐는가
- 위험 변경이 실행 전에 사람에게 올라오는가
- 검증 명령 또는 사람 테스트 시나리오가 준비됐는가
- 실패 후 무한 재시도하지 않고 종료·Escalation하는가

### Phase 4. Execute — 작은 변경과 검증을 반복한다

권장 실행 루프:

```text
정본 읽기
→ 현재 상태 조사
→ 계획과 영향 범위 제시
→ 사람 승인
→ 최소 단위 구현
→ 결정적 검사
→ 실패 원인 분류·수정
→ 증거와 diff 제시
→ 다음 단위 진행 또는 중단
```

운영 규칙:

- 독립 작업만 병렬화한다.
- Side effect가 있는 Tool은 승인 전 호출하지 않는다.
- Agent가 만든 테스트만으로 자기 결과를 완전히 판정하지 않는다. High-risk 기능은 독립 리뷰를 추가한다.
- 계획에서 벗어난 변경이 필요하면 구현을 멈추고 `DEC-*`와 범위를 갱신한다.
- 모든 Run은 `RUN-*`로 목적, 사용 Tool·Skill, 결과, 검증, 사람 판단을 기록한다.

### Phase 5. Verify & Release — 증거로 출시를 판정한다

`evaluation.md`에서 다음 순서로 확인한다.

1. AC별 기능 검증
2. 회귀·성능·보안·접근성·운영 검증
3. Trace 평가: Tool 선택, 승인, 재시도, 금지 경계
4. Rollout과 관측 가능성 확인
5. 사람의 Release / Hold / Rollback 결정

**Gate G3 · Release 승인**

- 모든 필수 AC에 결과와 증거가 연결됐는가
- 미통과 항목의 영향과 예외 승인자가 기록됐는가
- 모니터링·Kill switch·Rollback 실행자가 정해졌는가
- 제품 지표 기준값이 확보됐는가
- 알려진 위험을 사용자가 감수 가능한가

### Phase 6. Measure & Learn — 결과를 방법론으로 환류한다

출시 후 사전에 정한 관찰 기간에 제품 지표를 확인한다.

- 기준값과 변경 후 값을 같은 정의·표본으로 비교
- 광고, 시즌성, 외부 노출 등 교란 요인 기록
- 성공, 실패, 불확실을 구분
- 유지, 개선, 확대, 롤백 중 하나를 `DEC-*`로 결정
- 반복된 성공 절차는 Skill 후보로, 반드시 지켜야 할 검사는 Hook·자동 테스트 후보로 승격

**Gate G4 · Learning 종료**

- Outcome과 Guardrail 지표가 판정됐는가
- 인과로 확인한 것과 상관관계만 관찰한 것을 구분했는가
- 실패가 다음 기능의 규칙·테스트·Skill에 반영됐는가
- 포트폴리오에 쓸 주장마다 원본 증거가 연결됐는가

---

## 5. Agent 구성 요소 선택 기준

| 필요 | OpenAI 관점 | Claude Code 구현 | 문서화 위치 |
| --- | --- | --- | --- |
| 항상 필요한 프로젝트 맥락 | Instructions | `CLAUDE.md`, `.claude/rules/` | Context Pack |
| 반복 절차·도메인 지식 | Skill | `.claude/skills/<name>/SKILL.md` | Skill Contract |
| 파일·CLI 등 실행 능력 | Tool | Built-in Tools | Tool Contract |
| 외부 서비스·데이터 연결 | Tool / MCP | `.mcp.json` | Tool Contract + 데이터 경계 |
| 격리된 전문 조사·검증 | Specialist agent | `.claude/agents/*.md` | Delegation Contract |
| 항상 실행할 검사·차단 | Guardrail | Hook | Guardrail 표 |
| 위험 작업의 판단 | Human review | Permission ask + 승인 | Approval Gate |
| 회귀 가능한 품질 측정 | Trace / Dataset / Eval | 로그·테스트·별도 evaluator | `evaluation.md` |

### Skill로 만들 조건

다음을 모두 만족할 때 기능별 절차를 Skill로 승격한다.

- 여러 기능에서 반복된다.
- 입력과 기대 출력이 안정적이다.
- 프로젝트 사실을 복사하지 않고 정본을 참조할 수 있다.
- 실패 사례와 사용하지 말아야 할 조건이 알려져 있다.
- 실행 후 검증 방법이 있다.

Skill은 능력과 절차를 제공하지만, 해당 기능의 제품 목표·정책·최신 상태를 소유하지 않는다.

### Subagent를 추가할 조건

다음과 같은 명확한 격리 이득이 있을 때만 사용한다.

- 구현자와 독립된 보안·성능·QA 검토가 필요하다.
- 대량 조사 컨텍스트가 주 작업 컨텍스트를 오염시킨다.
- 서로 다른 Tool 권한을 가져야 한다.
- 병렬 작업 간 파일·상태 충돌이 없다.

최종 요구사항과 출시 판정의 소유권은 Main Agent가 아니라 사람 TPM에게 남는다.

---

## 6. Tool·권한·위험 관리

### 6.1 Tool Contract 최소 필드

| 필드 | 내용 |
| --- | --- |
| Tool name | 사람이 식별할 수 있는 이름 |
| Purpose | 이 기능에서 필요한 이유 |
| Inputs / schema | 필수 필드, 타입, 허용 범위 |
| Outputs / schema | 성공 결과와 증거 필드 |
| Errors | timeout, 권한, 부분 실패, 잘못된 입력 |
| Side effects | 파일, 데이터, 결제, 배포, 외부 메시지 변경 여부 |
| Idempotency | 재시도 시 중복 부작용이 없는가 |
| Permission | allow / ask / deny |
| Validation | 호출 전후 검사 |
| Owner | 장애·승인 책임자 |

### 6.2 위험 등급

| 등급 | 예시 | 기본 통제 |
| --- | --- | --- |
| R0 Read-only | 검색, 문서·코드 읽기, 로그 조회 | 자동 허용, 민감정보 출력 검사 |
| R1 Reversible local | 로컬 코드·문서 수정, 임시 파일 | 범위 제한, diff와 테스트 필수 |
| R2 Shared state | 공용 데이터, 사용자 보상, 외부 API 쓰기 | 실행 전 사람 승인, idempotency, rollback |
| R3 Production / destructive | 배포, 결제, 삭제, 권한·보안 정책 변경 | 독립 검토, 명시 승인, fail-closed, 감사 로그 |

`allow` 목록을 넓게 만드는 대신 필요한 명령·경로·도메인을 좁게 지정한다. Timeout이나 승인 시스템 장애 시 위험 작업은 진행하지 않는 fail-closed가 기본이다.

---

## 7. 평가 체계

### 7.1 기능 수용 평가

각 `AC-*`에는 다음이 있어야 한다.

- Given / When / Then 또는 동등하게 명확한 조건
- 자동 / 사람 / 혼합 중 검증 주체
- 실행 방법
- 예상 결과
- 실제 결과
- 증거 링크
- Pass / Fail / Exception

### 7.2 Agent Trace 평가

대표 Run의 전체 경로를 다음 기준으로 채점한다.

| 기준 | 질문 |
| --- | --- |
| Context | 정본과 최신 상태를 먼저 읽었는가 |
| Planning | 범위·영향·검증 계획을 제시했는가 |
| Tool selection | 목적에 맞는 최소 Tool을 사용했는가 |
| Permission | Side effect 전에 승인을 받았는가 |
| Correctness | 요구사항과 AC를 충족했는가 |
| Verification | 실행 가능한 검사를 수행하고 증거를 남겼는가 |
| Recovery | 실패 원인을 분류하고 제한 내에서 복구했는가 |
| Stop | 성공·부분 성공·차단을 정확히 선언했는가 |
| Efficiency | 불필요한 호출·토큰·재작업을 줄였는가 |

### 7.3 Regression Set

반복 기능은 대표 입력을 누적해 같은 기준으로 재실행한다.

- 정상 사례
- 경계 사례
- 과거 실패 사례
- 권한 거부 사례
- Tool timeout·부분 실패 사례
- 모호한 요구사항과 Escalation 사례

프롬프트, 모델, Skill, Tool, 라우팅을 변경할 때 한 번에 하나의 요소만 바꾸고 동일한 Set으로 비교한다.

### 7.4 개발 생산성

속도는 품질을 통과한 경우에만 개선으로 센다.

| 지표 | 정의 예시 |
| --- | --- |
| Lead time | 승인된 명세부터 Release-ready까지의 시간 |
| Human intervention | Agent Run당 사람의 수정·재지시·승인 횟수 |
| Rework rate | 검증 실패로 다시 수정한 TASK 비율 |
| First-pass AC rate | 첫 구현에서 통과한 필수 AC 비율 |
| Escaped defect | 출시 후 발견된 기능 결함 수 |
| Agent cost | Run별 호출·토큰·도구 비용 |

서로 복잡도가 비슷한 기능끼리 비교하고, 표본이 작으면 방향성으로만 보고한다.

### 7.5 실패 분류

| 분류 | 예시 | 개선 위치 |
| --- | --- | --- |
| Context | 오래된 문서, 누락된 제약 | 정본·CLAUDE.md·Rules |
| Requirement | 모호한 AC, 범위 충돌 | `feature.md` |
| Planning | 영향 범위·의존성 누락 | `execution.md` |
| Tool | 잘못된 Tool, schema 오해, timeout | Tool Contract·MCP |
| Permission | 과도한 권한, 승인 누락 | Permission·Hook·Sandbox |
| Implementation | 로직·타입·성능 결함 | 코드 규칙·테스트 |
| Verification | 자기 주장만 있고 실행 증거 없음 | Hook·테스트·독립 evaluator |
| Product | 기능은 동작하지만 지표·사용자 가치 실패 | 가설·대안·제품 지표 |

---

## 8. Definition of Ready와 Definition of Done

### Definition of Ready

- [ ] 문제와 대상 사용자가 관찰 근거에 연결돼 있다.
- [ ] 성공 지표와 Guardrail 지표의 기준값·측정법이 있다.
- [ ] 최소 두 대안과 Do nothing을 비교했다.
- [ ] Scope, Non-goals, FR, NFR, AC가 승인됐다.
- [ ] UI 상태 또는 시스템 상태·실패 경로가 정의됐다.
- [ ] Agent·사람·Tool의 책임과 권한이 정해졌다.
- [ ] 테스트, Rollout, Rollback 방법이 준비됐다.

### Definition of Done

- [ ] 모든 필수 AC가 증거와 함께 통과했다.
- [ ] 회귀·성능·보안·운영 검증 중 해당 항목을 통과했다.
- [ ] 승인 없이 위험한 Side effect가 실행되지 않았다.
- [ ] 대표 Agent Trace와 실패·복구 기록이 남아 있다.
- [ ] 사람이 실제 사용 환경에서 확인했다.
- [ ] Rollout·모니터링·Rollback 담당자가 확인됐다.
- [ ] 정본 문서와 코드가 같은 변경 단위로 갱신됐다.
- [ ] 출시 후 제품 지표 관찰 시점과 책임자가 정해졌다.

`코드 작성 완료`, `Agent 완료 보고`, `테스트 시나리오 작성`만으로 Done 처리하지 않는다.

---

## 9. 문서 관리 규칙

1. **정본:** 목표·범위·요구사항·AC는 `feature.md`에만 쓴다.
2. **참조:** 다른 문서는 문장을 복사하지 않고 `FR-*`, `AC-*`, `DEC-*`를 참조한다.
3. **상태:** 기능 전체 상태는 `feature.md` 헤더 한 곳에서만 갱신한다.
4. **변경:** 범위·정책·AC 변경은 관련 `DEC-*`를 먼저 남긴다.
5. **증거:** 완료 주장에는 명령 출력, 캡처, 로그, diff, 지표 중 하나를 연결한다.
6. **날짜:** `최근`, `어제` 대신 `YYYY-MM-DD` 절대 날짜를 쓴다.
7. **미정:** 빈칸 대신 `TBD — 담당자 / 결정일` 또는 `N/A — 이유`를 쓴다.
8. **동시 갱신:** 기능 동작을 바꾼 코드와 문서는 같은 PR·commit 범위에서 갱신한다.
9. **보존:** 결정 기록은 지우지 않고 `Superseded by DEC-*`로 폐기 이유를 남긴다.
10. **Snapshot:** 출시별 문서를 복제하지 않고 Git commit·tag 링크로 당시 상태를 보존한다.
11. **대용량 자료:** 원본 영상·대용량 로그는 외부 저장소에 두고 접근 가능한 링크·요약·해시를 남긴다.
12. **종료:** 출시하지 않은 기능도 보류·폐기 결정과 학습을 남긴 뒤 상태를 닫는다.

### 권장 상태

```text
Discovery → Proposed → Approved → In Progress → Verifying
→ Released → Measuring → Closed
                     ↘ Hold / Rejected / Rolled Back
```

---

## 10. 포트폴리오와 면접 증거로 전환

Feature Packet 한 건에서 다음 네 장면을 추출할 수 있어야 한다.

1. **문제와 대안:** 데이터·관찰에서 어떤 대안을 만들었는가
2. **제품 판단:** 사람인 내가 무엇을 선택·거절하고 어떤 Trade-off를 감수했는가
3. **Agent 실행:** 어떤 Context·Skill·Tool·권한·검증 루프로 구현했는가
4. **결과와 학습:** 기능·Trace·제품 지표가 무엇을 증명했고 다음 규칙이 어떻게 바뀌었는가

면접에서 사용할 최소 증거 묶음:

- Feature flow 또는 상태도 1장
- Agent / Human / Tool 책임표 1장
- 실제 Run의 요청 → 계획 → diff → 검증 Trace 1건
- 실패와 추가한 규칙·검사 1건
- 출시 전후 제품 지표 또는, 아직 측정 중임을 보여 주는 계획

### 예시 · Round Design Agent

```text
OBS-01  고난도 장애물 구간에서 이탈이 집중됨
HYP-01  난이도별 레이스를 제공하면 완주·재참여가 증가할 것이다
DEC-01  단일 난이도 유지 대신 난이도별 레이스를 선택
FR-01   난이도 선택·타워 배정·순위·차등 보상을 제공
AC-01   각 난이도에서 정상·이탈·동점·재접속 결과가 정책대로 처리됨
RUN-01  Agent가 승인된 명세로 상태·API·UI·테스트를 구현
TEST-01 Studio 플레이 테스트와 코드 검증 통과
METRIC-01 난이도별 완주율·이탈률·재참여율 비교
```

Agent가 Analytics Tool로 직접 조회했다면 Tool Orchestration으로 기록한다. 사람이 분석 결과를 전달했다면 “사람이 제공한 데이터 요약을 Context로 사용했다”고 정확히 쓴다.

---

## 11. 피해야 할 패턴

- `Agent가 알아서 만들었다` — 목표·권한·판단 책임이 사라진다.
- `모든 API를 활용했다` — 범위와 완료 조건을 검증할 수 없다.
- `Multi-agent를 사용했다` — 분리 계약과 이득이 없으면 복잡성만 늘어난다.
- `바이럴 때문에 성장했다` — 유입·영상·추천 데이터를 분리하지 않으면 인과 주장이다.
- `테스트 완료` — 실제 명령·결과·캡처가 없으면 증거가 아니다.
- `난이도 때문에 이탈했다` — 실험 전에는 고난도 구간과 이탈의 상관관계로 표현한다.
- `문서를 최신화했다` — 정본 위치와 갱신 commit이 없으면 확인할 수 없다.
- `Round Agent` — 게임 런타임 `RoundService`와 개발 Agent를 구분하지 않으면 오해를 만든다.

---

## 12. 도입 순서

1. [`../templates/tpm-agent-feature/`](../templates/tpm-agent-feature/README.md)을 기능 폴더로 복사한다.
2. 기존 기능 하나를 선택해 `feature.md`의 문제·대안·AC를 먼저 복원한다.
3. 실제 Agent 세션 하나를 `execution.md`의 `RUN-*`로 연결한다.
4. `evaluation.md`에 검증 증거와 변경 전후 지표를 채운다.
5. 세 기능 이상에서 반복된 절차를 확인한 뒤 Skill·Hook 후보를 분리한다.
6. 과거 실패 사례를 Regression Set에 누적한다.

처음부터 완전한 자동화를 목표로 하지 않는다. 문서로 계약을 명확히 하고 사람이 Gate를 운영한 뒤, 반복성과 실패 데이터가 확보된 부분만 자동화한다.

---

## 13. 공식 참고 자료

확인일: 2026-08-30

### OpenAI Docs

- [Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents) — Agent의 instructions, tools, guardrails, handoffs, output contract
- [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) — Manager, handoff, specialist 분리 기준
- [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) — Tool 경계 검사와 사람 승인
- [Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals) — Trace, grader, dataset, eval run
- [Skills](https://developers.openai.com/api/docs/guides/tools-skills) — `SKILL.md` 기반 반복 절차의 패키징·버전 관리

### Claude Code Docs

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Context 관리, 실행 가능한 검증, 증거, 독립 검토
- [Extend Claude Code](https://code.claude.com/docs/en/features-overview) — CLAUDE.md, Rules, Skills, MCP, Subagents, Hooks의 책임 구분
- [Extend Claude with skills](https://code.claude.com/docs/en/slash-commands) — 프로젝트 Skill 구조와 호출 방식
- [Configure permissions](https://code.claude.com/docs/en/permissions) — allow·ask·deny, Hooks, Sandbox의 결합
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents) — 격리된 Context·Tool·Permission을 가진 전문 Agent

