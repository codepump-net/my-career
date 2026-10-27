# Project Documentation Audit — [PROJECT]

| 항목 | 값 |
| --- | --- |
| Audit ID | AUDIT-[YYYYMMDD-NN] |
| 모드 | AUDIT |
| 범위 / 제외 | [TBD] |
| 기준 시점 | [COMMIT / TAG / DATE] |
| 실행자 | [ACTOR] |
| 승인자 | [APPROVER] |
| 실행 일시 | [YYYY-MM-DD HH:mm TZ] |
| 최종 판정 | PASS / CONDITIONAL / FAIL / NOT_REVIEWED |

이 보고서는 자동 수정 결과가 아니라 확인된 사실과 잔여 위험의 스냅샷이다. 기준은 [`../HARNESS.md`](../HARNESS.md)를 따른다.

## 1. Outcome

[완료 / 조건부 완료 / 차단. 가장 중요한 결과와 사용자·프로젝트 영향을 3문장 이내로 작성]

## 2. 범위와 방법

- Included: [paths / features]
- Excluded: [paths / reason]
- Evidence cutoff: [commit / tag / date]
- Read/write policy: READ_ONLY
- Checks performed: [inventory scan, link check, code comparison, runtime test, data check]
- Checks not performed: [reason]

## 3. 커버리지

| 지표 | 분자 / 분모 | 결과 | 목표 | 판정 | 비고 |
| --- | --- | ---: | ---: | --- | --- |
| 문서 등록률 | 0 / 0 | 0% | 100% | [TBD] | |
| 문서 분류율 | 0 / 0 | 0% | 100% | [TBD] | |
| Feature Packet 커버리지 | 0 / 0 | 0% | [target] | [TBD] | |
| 현재 상태 검증률 | 0 / 0 | 0% | [target] | [TBD] | |
| 추적성 커버리지 | 0 / 0 | 0% | [target] | [TBD] | |
| Trace 가용률 | 0 / 0 | 0% | 보고값 | N/A | 과거 기록을 재생성하지 않음 |

## 4. 발견 사항

| Finding ID | 영역 | 발견 사실 | Evidence | 영향 | Severity | GAP / DEC | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FIND-001 | [TBD] | [TBD] | [path, command, test] | [TBD] | BLOCKER / HIGH / MEDIUM / LOW | GAP-[id] | [owner] |

## 5. GAP 요약

| 유형 | Blocker | High | Medium | Low | 합계 |
| --- | ---: | ---: | ---: | ---: | ---: |
| DOC-CODE | 0 | 0 | 0 | 0 | 0 |
| DOC-DOC | 0 | 0 | 0 | 0 | 0 |
| CODE-RUNTIME | 0 | 0 | 0 | 0 | 0 |
| INTENT-ASIS | 0 | 0 | 0 | 0 | 0 |
| MISSING-EVIDENCE | 0 | 0 | 0 | 0 | 0 |
| ORPHAN | 0 | 0 | 0 | 0 | 0 |
| DUPLICATE | 0 | 0 | 0 | 0 | 0 |

## 6. 검증 실행

| Check ID | 명령·절차 | 기대 | 실제 | Evidence | 결과 |
| --- | --- | --- | --- | --- | --- |
| CHECK-001 | [TBD] | [TBD] | [TBD] | [log/link] | PASS / FAIL / NOT_RUN |

## 7. Gate 판정

| Gate | 판정 | 근거 | 조건·잔여 조치 | 승인자 / 일시 |
| --- | --- | --- | --- | --- |
| [MG* or G*] | PASS / CONDITIONAL / FAIL / NOT_REVIEWED | [evidence] | [owner + due] | [TBD] |

## 8. 우선 조치

| 우선순위 | 조치 | 기대 효과 | Owner | Due | 후속 모드 |
| --- | --- | --- | --- | --- | --- |
| 1 | [TBD] | [TBD] | [owner] | [date] | MIGRATE / FEATURE / AUDIT |

## 9. 변경하지 않은 항목

- [승인 부족, 범위 제외, 근거 부족 등으로 보존한 파일·주장과 이유]

## 10. 최종 승인

- Verdict: `PASS / CONDITIONAL / FAIL / NOT_REVIEWED`
- Rationale: [TBD]
- Approver / timestamp: [TBD]
- Next audit trigger: [release, migration completion, date, major architecture change]

