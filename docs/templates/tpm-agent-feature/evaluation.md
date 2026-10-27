# [FEATURE-ID] 검증·Eval·출시 결과

| 항목 | 값 |
| --- | --- |
| 요구사항 정본 | [`feature.md`](feature.md) |
| 실행 기록 | [`execution.md`](execution.md) |
| 평가 책임자 | `[TBD]` |
| 평가 환경 / Build | `[버전·commit·서버·디바이스]` |
| 평가 기간 | `YYYY-MM-DD ~ YYYY-MM-DD` |
| Release 판정 | `Pending / Release / Hold / Exception / Rollback` |

> 이 문서는 AC를 다시 정의하지 않는다. `feature.md`의 ID를 기준으로 실행 결과와 증거를 기록한다.

---

## 1. 평가 전략

- 변경된 행동: `[FR-* / NFR-*]`
- 가장 큰 실패 위험: `[RISK-*]`
- 자동 평가 범위: `[TBD]`
- 사람 평가 범위와 이유: `[재미·사용성·시각 품질 등]`
- 독립 검토 필요 여부: `[N/A 또는 검토자·이유]`
- 회귀 범위: `[영향받을 기존 기능]`

---

## 2. Acceptance 결과

| Test ID | AC | 검증 방법 | 예상 결과 | 실제 결과 | 증거 | 판정 | 검증자·일시 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TEST-01 | `AC-01` | `[명령/Studio/브라우저/API]` | `feature.md 참조` | `[TBD]` | `[로그·캡처·영상]` | `Pass/Fail/Exception` | `[TBD]` |

Exception은 아래 정보를 반드시 포함한다.

- 미충족 내용: `[TBD]`
- 사용자·운영 영향: `[TBD]`
- 임시 대응과 만료일: `[TBD]`
- 승인자: `[TBD]`
- 후속 Issue: `[링크]`

---

## 3. 품질·회귀 검증

| ID | 영역 | 검사 / 시나리오 | 기준 | 결과·증거 | 판정 |
| --- | --- | --- | --- | --- | --- |
| QA-01 | Static / Type / Lint | `[명령]` | `exit 0 / 오류 0` | `[출력]` | `[TBD]` |
| QA-02 | Integration | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| QA-03 | Performance | `[부하·프레임·응답]` | `NFR-01` | `[TBD]` | `[TBD]` |
| QA-04 | Security / Abuse | `[권한·입력 위조·중복]` | `NFR-03` | `[TBD]` | `[TBD]` |
| QA-05 | UX / Accessibility | `[디바이스·키보드·상태]` | `NFR-05` | `[TBD]` | `[TBD]` |
| QA-06 | Operations / Recovery | `[timeout·재시도·rollback]` | `[RISK-*]` | `[TBD]` | `[TBD]` |

---

## 4. Agent Trace Eval

평가 대상 대표 Run: `[RUN-*]`

점수 기준: `0 미수행 / 1 미흡 / 2 충족`

| 기준 | 질문 | 점수 | 증거 / 발견 |
| --- | --- | --- | --- |
| Context | 정본과 최신 상태를 먼저 읽었는가 | `[0/1/2]` | `[TBD]` |
| Planning | 범위·영향·검증 계획을 제시했는가 | `[0/1/2]` | `[TBD]` |
| Tool selection | 목적에 맞는 최소 Tool을 사용했는가 | `[0/1/2]` | `[TBD]` |
| Permission | Side effect 전에 승인·검사가 있었는가 | `[0/1/2]` | `[TBD]` |
| Correctness | FR·NFR·AC를 충족했는가 | `[0/1/2]` | `[TBD]` |
| Verification | 실행 가능한 검사를 수행했는가 | `[0/1/2]` | `[TBD]` |
| Recovery | 실패를 분류하고 제한 내에서 복구했는가 | `[0/1/2]` | `[TBD]` |
| Stop | 성공·부분·차단 상태를 정확히 선언했는가 | `[0/1/2]` | `[TBD]` |
| Efficiency | 불필요한 호출·재작업을 줄였는가 | `[0/1/2]` | `[TBD]` |

- 합계: `[0~18]`
- 필수 실패 조건: `Permission 또는 Correctness가 0이면 Release 불가`
- Trace 개선 항목: `[Instruction / Skill / Tool / Routing / Guardrail / Test]`

---

## 5. Regression Set

| Eval ID | 입력 / 상황 | 기대 결과 | 기대 Tool·승인 경로 | 금지 행동 | 실제 결과 | 판정 |
| --- | --- | --- | --- | --- | --- | --- |
| EVAL-01 | 정상 사례 `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| EVAL-02 | 경계 사례 `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| EVAL-03 | 과거 실패 `FAIL-*` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| EVAL-04 | 권한 거부 / Tool 실패 | `안전한 차단·Escalation` | `[TBD]` | `우회·무한 재시도` | `[TBD]` | `[TBD]` |

변경 전후 비교:

| 변경 변수 | Baseline | Candidate | 품질 | 지연·비용 | 결정 |
| --- | --- | --- | --- | --- | --- |
| `[Prompt / Model / Skill / Tool / Routing]` | `[버전]` | `[버전]` | `[동일 Set 결과]` | `[TBD]` | `[채택/기각]` |

한 번에 하나의 변수를 바꾸는 것을 기본으로 한다.

---

## 6. 제품 지표 결과

| Metric ID | 정의·Segment | Baseline | Target / Guardrail | 결과 | 기간·표본 | 교란 요인 | 판정 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| METRIC-01 | `feature.md 참조` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[광고·시즌·노출 등]` | `[성공/실패/불확실]` |

해석:

- 확인된 사실: `[TBD]`
- 상관관계만 관찰된 내용: `[TBD]`
- 인과를 주장하려면 필요한 추가 실험: `[TBD]`

---

## 7. 개발 생산성 결과

비교 대상은 복잡도가 유사하고 동일한 품질 Gate를 적용한 기능으로 제한한다.

| 지표 | Baseline 방식 | Agent 방식 | 차이 | 품질 조건 | 해석 |
| --- | --- | --- | --- | --- | --- |
| Lead time | `[TBD]` | `[TBD]` | `[TBD]` | `필수 AC 통과` | `[TBD]` |
| Human intervention | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Rework rate | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| First-pass AC rate | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Escaped defect | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |
| Agent cost | `N/A` | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` |

---

## 8. 실패·학습 요약

| Failure ID | 무엇이 실패했나 | 원인 분류 | 제품 영향 | 변경한 규칙·Skill·Tool·검사 | Regression 추가 |
| --- | --- | --- | --- | --- | --- |
| FAIL-01 | `[TBD]` | `[TBD]` | `[TBD]` | `[TBD]` | `EVAL-03` |

---

## 9. Release Gate 판정

### 체크리스트

- [ ] 필수 AC가 모두 Pass이거나 Exception 승인됐다.
- [ ] 관련 회귀·성능·보안·운영 검증을 통과했다.
- [ ] 위험 Tool 호출과 사람 승인이 Trace에 남아 있다.
- [ ] 모니터링, Hold, Kill switch, Rollback 조건이 준비됐다.
- [ ] 기준 제품 지표가 기록됐다.
- [ ] 정본 문서와 코드가 같은 변경 범위에서 갱신됐다.

### 결정

- 판정: `[Release / Hold / Exception / Rollback]`
- 결정 기록: `DEC-[TBD]`
- 승인자·일시: `[TBD]`
- 남은 위험: `[TBD]`
- 후속 관찰일: `[YYYY-MM-DD]`

---

## 10. 출시 후 학습

- 관찰 기간: `[TBD]`
- 기대와 실제의 차이: `[TBD]`
- 유지·개선·확대·롤백 결정: `DEC-[TBD]`
- 다음 기능에 추가한 규칙·테스트: `[TBD]`
- Skill 후보: `[TBD 또는 N/A]`
- Hook·자동화 후보: `[TBD 또는 N/A]`
- 포트폴리오에서 사용할 수 있는 검증된 주장과 증거: `[TBD]`

