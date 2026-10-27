# Agent Development Governance

| 항목 | 값 |
| --- | --- |
| 버전 | 1.1 |
| 최종 갱신 | 2026-08-31 |
| 승인 책임 | `manifest.json > owners.approval` |
| 기본 정책 | Read-only, 최소 Tool, 고위험 사람 승인 |

## 1. 정본과 책임

| 대상 | 정본 | 여기서 관리하지 않는 것 |
| --- | --- | --- |
| 프로젝트 문제·성과·기능 경계 | [`docs/harnesses/tpm-agent-project/`](../docs/harnesses/tpm-agent-project/) | Agent 프롬프트 상세 |
| 기능 요구사항·AC·개발 증거 | [`docs/templates/tpm-agent-feature/`](../docs/templates/tpm-agent-feature/)을 적용한 Feature Packet | Agent 공용 버전 |
| Agent 구성·권한·Eval·운영 | `agent-package/` | 제품 요구사항 원문 |
| 실제 플랫폼 설정 | `adapters/`가 만드는 배포 투영본 | 독립 정본 |
| 반복 가능한 공통 절차 | `skills/` | Agent의 최종 책임·권한 |
| Sandbox·network·budget·retention | `environments/` | 프롬프트 안내만으로 강제하는 정책 |
| 승인·데이터 처리 정책 | `policies/` | 비밀·사용자 원문 |

Agent 변경은 연결된 `FEAT-*`, `REQ-*`, `AC-*`, `CHG-*`를 참조한다. 기능 요구사항을 Agent 지침에 다시 서술해야 한다면 원문을 복제하기보다 안정적인 정책만 요약하고 정본 링크를 둔다.

## 2. 생명주기

```text
PROPOSED → EXPERIMENTAL → CANDIDATE → ACTIVE → DEPRECATED → RETIRED
                  ↘ REJECTED        ↘ ROLLED_BACK
```

| 상태 | 의미 | 허용 범위 |
| --- | --- | --- |
| `proposed` | 문제와 책임 경계를 검토 중 | 문서·설계만 |
| `experimental` | 개발 데이터로 탐색 중 | 격리 환경, 비운영 데이터 |
| `candidate` | 계약과 회귀 Eval을 통과한 배포 후보 | 제한된 canary·승인 대기 |
| `active` | 승인된 운영 버전 | 정해진 권한·관측 범위 |
| `deprecated` | 대체 계획이 있는 기존 버전 | 신규 소비자 연결 금지 |
| `retired` | 호출 중단, 기록만 보존 | 실행 금지 |
| `rejected` | 실험 결과 채택하지 않음 | 근거 보존 |
| `rolled_back` | 출시 후 이전 버전으로 복귀 | 원인·복구 증거 보존 |

## 3. Agent Release Gate

| Gate | 질문 | 필수 산출물 |
| --- | --- | --- |
| `A0 Proposal` | Agent가 필요한 문제인가, 결정론적 코드로 충분하지 않은가? | Change Request, 연결 Feature/Outcome |
| `A1 Contract` | 입출력·범위·Tool·Skill·권한·환경·중단 조건이 명확한가? | Agent 정본, environment, policies |
| `A2 Baseline` | 기존 버전 또는 수동 방식의 품질·비용·실패가 측정됐는가? | 고정 Eval set, baseline 결과 |
| `A3 Candidate` | 고정 Eval·replay가 대표·경계·실패·안전 기준을 통과했는가? | `evals.json`, Eval Run, 독립 검토 |
| `A4 Release` | Adapter conformance·shadow·canary·승인·Rollback이 준비됐는가? | Release JSON, version tuple, 승인 |
| `A5 Operate` | 실제 품질·비용·지연·실패를 감시하고 학습했는가? | Run index, 지표, 신규 회귀 사례 |

판정값은 `PASS`, `CONDITIONAL`, `FAIL`, `NOT_REVIEWED`다. Agent의 자체 평가는 승인자의 판정을 대체하지 않는다.

## 4. 변경 등급과 버전

Agent 버전은 SemVer를 사용한다. 프롬프트의 작은 수정도 행위에 영향을 줄 수 있으므로 등급은 변경 줄 수가 아니라 **계약과 위험 변화**로 정한다.

| 등급 | 기준 | 예시 |
| --- | --- | --- |
| `PATCH` | 입출력·권한·핵심 행위가 그대로이며 결함을 수정 | 모호한 문장 정리, Tool 설명 오류 수정 |
| `MINOR` | 기존 소비자와 호환되는 역량·Tool·Eval 추가 | 읽기 전용 분석 Tool 추가, 새 지원 입력 |
| `MAJOR` | 입출력·권한·자율성·고위험 행위가 달라짐 | 쓰기 권한 추가, handoff 구조 변경, 출력 schema 파괴 |

모델·프롬프트·Tool·오케스트레이션을 한 번에 바꾸면 원인 분석이 어려워진다. 기본적으로 하나씩 변경하고 같은 Eval로 비교한다. 함께 바꿔야 하면 `CHG-*`에 이유와 분리 검증 방법을 기록한다.

## 5. 변경 절차

1. 운영 실패, 사용자 요구 또는 지표 GAP을 `CHG-*`로 등록한다.
2. 수정 전 버전과 기준 환경을 고정하고 baseline을 실행한다.
3. 최소 범위로 Agent 계약·지침·Tool 또는 런타임 설정을 변경한다.
4. 변경 원인을 겨냥한 개발 사례를 통과시킨다.
5. 고정 regression·safety·holdout Eval을 실행한다.
6. 품질뿐 아니라 latency, token·도구 비용, tool call·retry 수를 비교한다.
7. `A3` 승인 후 candidate Adapter를 생성하고 conformance·drift 검사를 수행한다.
8. 승인된 운영 표본 replay와 부작용 없는 shadow를 통과한다.
9. Rollback을 연습하고 `A4` 승인 후 제한된 canary를 수행한다.
10. 운영 실패를 익명화해 새 regression case로 환류하고 `A5`를 갱신한다.

## 6. Eval 정책

- 결과 품질과 실행 경로를 함께 평가한다.
- 개발 중 본 사례와 최종 holdout을 분리한다.
- 정상 사례만이 아니라 경계, Tool 오류, 권한 거부, 프롬프트 공격, 불충분한 근거를 포함한다.
- 고위험 사례는 평균 점수로 상쇄하지 않고 100% 통과를 기본으로 한다.
- LLM grader는 사람이 정의한 Rubric과 표본 검토로 보정한다.
- 실제 사용자 데이터는 익명화·최소화하고 비밀정보를 저장소에 넣지 않는다.
- 실패를 수정한 사례는 재발 방지를 위해 regression set에 추가한다.

## 7. Tool·권한 정책

각 Tool은 `목적 / 입출력 schema / 허용 범위 / 데이터·자격 증명 / 부작용 / 승인 / idempotency / 사전·사후 조건 / 성공 신호 / 부분 실패·보상 / 오류 / retry / timeout / rate·cost limit`을 정의한다.

- 기본은 Tool 없음, 읽기 전용, 네트워크 차단이다.
- 삭제·배포·결제·권한 변경·외부 메시지·민감 데이터 접근은 고위험으로 분류한다.
- 의미 판단과 권한 강제를 프롬프트 하나에 맡기지 않는다. 실행 계층에서 allowlist, schema, timeout, 승인으로 강제한다.
- 동일 작업의 반복 호출과 무한 handoff를 막기 위해 호출·retry·turn 상한을 둔다.
- Tool 결과가 불완전하면 성공으로 추정하지 않고 구조화된 실패를 반환한다.

## 8. 운영·관측·Rollback

Release마다 Agent·프롬프트·컨텍스트·Skill·모델·Tool·orchestration·adapter·실행 환경·승인/데이터 정책·Eval set의 version/hash를 함께 기록한다. 최소 운영 지표는 다음과 같다.

- task success와 critical failure rate
- 사람 개입·수정률
- p50/p95 latency
- 요청당 token·Tool·금액 비용
- Tool failure·retry·timeout 비율
- guardrail·권한 거부 건수
- 사용자 취소·불만·재시도 신호

원문 Trace는 민감정보·용량 정책에 따라 외부 보안 저장소나 gitignored 위치에 두고, `runs/`에는 비식별 메타데이터와 증거 링크만 남긴다. Rollback은 코드만이 아니라 Agent 버전, model snapshot, prompt, Tool 설정, adapter를 이전 승인 조합으로 되돌린다.

## 9. 유지보수 주기

| 주기·트리거 | 수행 |
| --- | --- |
| Agent 변경마다 | targeted + regression Eval, changelog, package check |
| Release마다 | holdout·safety Eval, 권한 diff, rollback rehearsal |
| 주간·격주 | 실패 표본 검토, 신규 regression case 선정 |
| 월간 | 비용·지연·품질 추세, Tool·컨텍스트 stale 점검 |
| 모델·SDK·Tool 변경 | 별도 `CHG-*`, 전체 regression, adapter 재검증 |
| 심각 사고 | 즉시 비활성화·Rollback, incident 결정 기록, 재출시 Gate |

## 10. Definition of Done

- [ ] 변경 이유와 연결된 제품·운영 GAP이 있다.
- [ ] Agent 계약·지침·컨텍스트·Tool·Skill·환경·정책 diff가 검토됐다.
- [ ] baseline과 candidate가 같은 조건으로 비교됐다.
- [ ] critical·regression·holdout 기준을 통과했다.
- [ ] 비용·지연·사람 개입 변화가 보고됐다.
- [ ] 권한 확대가 명시 승인됐다.
- [ ] 전체 version tuple·adapter conformance·Release JSON·Rollback이 연결됐다.
- [ ] fixed Eval → replay → shadow → canary 단계의 입구·출구 증거가 있다.
- [ ] 운영 감시와 신규 실패 환류 담당자가 정해졌다.
