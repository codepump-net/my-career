# Migration Log — [PROJECT]

| 항목 | 값 |
| --- | --- |
| 기준 시점 | [COMMIT / TAG / DATE] |
| Feature Registry | [link] |
| Document Inventory | [link] |
| 작성자 | [ACTOR] |
| 승인자 | [APPROVER] |
| 현재 Migration Gate | MG0 / MG1 / MG2 / MG3 / MG4 / MG5 |

이 문서는 원본과 새 정본 사이의 추적성, 충돌, 승인, 실제 이관 이력을 보존한다. 행을 덮어쓰기보다 상태 변경 이력을 추가한다. 기준은 [`../HARNESS.md`](../HARNESS.md)를 따른다.

## 1. Source → Target 매핑

| Map ID | Source Doc / Section | Source 책임 | Target 정본 / Section | Feature / Shared | 처리 | Origin | Intent | Verification | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MAP-0001 | DOC-[id]#[section] | [TBD] | [proposed link] | FEAT-[id] / SHARED-[id] | KEEP / REFERENCE / SPLIT / MERGE / MIGRATE / ARCHIVE / REVIEW | CONTEMPORANEOUS / RECONSTRUCTED | HISTORICAL_INTENT / AS_IS / TO_BE | [level] | Proposed / Approved / Applied / Verified / Rejected |

## 2. 주장별 출처와 검증

핵심 요구사항·동작·성과 주장만 기록한다. 단순 문구 이동은 1절 매핑으로 충분하다.

| Claim ID | 주장 | Source @ Cutoff | Origin | Intent | Verification | 확인 방법·결과 | Target ID | Checked by / at |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CLAIM-001 | [TBD] | [path#section @ commit/date] | [origin] | [intent] | [level] | [command, test, data or Unknown] | REQ-* / AC-* / DEC-* | [actor / date] |

## 3. GAP 기록

| Gap ID | 유형 | 충돌·누락 | 영향 | Severity | 필요한 결정·증거 | Owner | Due | Status | Resolution / DEC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GAP-0001 | DOC-CODE / DOC-DOC / CODE-RUNTIME / INTENT-ASIS / MISSING-EVIDENCE / ORPHAN / DUPLICATE | [TBD] | [TBD] | BLOCKER / HIGH / MEDIUM / LOW | [TBD] | [owner] | [date] | Open / Accepted / Resolved | [DEC-* or N/A] |

## 4. 실행 이력

| 날짜·시간 | Map / Gap | 수행 작업 | 변경 파일 | 검증 | 결과 | 수행자 |
| --- | --- | --- | --- | --- | --- | --- |
| [timestamp] | MAP-[id] | [TBD] | [paths] | [link / command] | Applied / Rolled back / Failed | [actor] |

## 5. Gate 기록

| Gate | 제출물 | 판정 | 조건·잔여 위험 | 승인자 | 일시 |
| --- | --- | --- | --- | --- | --- |
| MG0 Scope | [scope link] | NOT_REVIEWED | | | |
| MG1 Inventory | [inventory link] | NOT_REVIEWED | | | |
| MG2 Mapping | [registry + mappings] | NOT_REVIEWED | | | |
| MG3 Verification | [packets + evidence] | NOT_REVIEWED | | | |
| MG4 Cutover | [cutover + rollback] | NOT_REVIEWED | | | |
| MG5 Audit | [audit report] | NOT_REVIEWED | | | |

## 6. Cutover와 Rollback

| 대상 | 새 정본 | 기존 위치 처리 | 소비자 링크 갱신 | Rollback 방법 | MG4 승인 |
| --- | --- | --- | --- | --- | --- |
| [TBD] | [link] | 안내 유지 / ARCHIVE / 원위치 유지 | [links or N/A] | [git ref / restore path] | NOT_REVIEWED |

과거 Agent 실행 증거가 없으면 `Trace unavailable`로 기록한다. 사후 작성한 내용을 `RUN-*`으로 등록하지 않는다.

