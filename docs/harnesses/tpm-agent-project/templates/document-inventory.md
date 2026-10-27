# Document Inventory — [PROJECT]

| 항목 | 값 |
| --- | --- |
| 조사 범위 | [INCLUDE / EXCLUDE] |
| 기준 시점 | [COMMIT / TAG / DATE] |
| 조사 방식 | [파일 규칙, 확장자, 제외 경로] |
| 작성자 | [ACTOR] |
| 최종 갱신 | [YYYY-MM-DD] |
| MG1 판정 | NOT_REVIEWED |

이 문서는 기존 문서의 위치와 처리 방침을 기록한다. `MG2 Mapping` 전에는 원본을 이동·분할·통합하지 않는다. 기준은 [`../HARNESS.md`](../HARNESS.md)를 따른다.

## 1. 집계

| 항목 | 수량 | 비고 |
| --- | ---: | --- |
| 발견한 대상 파일 | 0 | |
| 등록한 파일 | 0 | |
| 분류 완료 | 0 | `UNKNOWN` 제외 |
| 중복 후보 | 0 | |
| 충돌 후보 | 0 | |
| Orphan 후보 | 0 | |

## 2. 파일 인벤토리

| Doc ID | 현재 경로 | 제목·책임 | 유형 | 연결 Feature / Shared | Origin | 기준 시점 유효성 | 처리 방침 | 대상 정본 | GAP | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DOC-0001 | [relative/path.md] | [TBD] | PRODUCT / ARCHITECTURE / STANDARD / FEATURE / OPERATIONS / EVIDENCE / HISTORICAL / UNKNOWN | FEAT-[id] / SHARED-[id] / Unknown | CONTEMPORANEOUS / RECONSTRUCTED | Current / Stale / Unknown | KEEP / REFERENCE / SPLIT / MERGE / MIGRATE / ARCHIVE / REVIEW | [link or proposed path] | GAP-[id] / None | [owner] |

## 3. 혼합 문서의 절 단위 분류

파일 전체를 한 유형으로 분류할 수 없을 때만 작성한다.

| Doc ID | 절·앵커 | 현재 책임 | 유형 | 대상 Feature / Shared | 제안 | MAP ID |
| --- | --- | --- | --- | --- | --- | --- |
| DOC-[id] | [heading] | [TBD] | [type] | [id] | SPLIT / REFERENCE / REVIEW | MAP-[id] |

## 4. 미해결 분류

| GAP ID | Doc ID | 쟁점 | 가능한 분류 | 필요한 증거·결정 | Severity | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GAP-[id] | DOC-[id] | [TBD] | [TBD] | [TBD] | BLOCKER / HIGH / MEDIUM / LOW | [owner] | Open |

## 5. MG1 체크

- [ ] 범위 안의 문서 파일이 모두 `DOC-*`로 등록됐다.
- [ ] 제외 경로와 이유가 기록됐다.
- [ ] `UNKNOWN`과 혼합 문서가 숨겨지지 않았다.
- [ ] 중복·충돌·Orphan 후보에 GAP이 연결됐다.
- [ ] 원본 파일을 이동·삭제·덮어쓰지 않았다.
- [ ] 승인자가 인벤토리 범위를 확인했다.

판정: `PASS / CONDITIONAL / FAIL / NOT_REVIEWED`  
승인자 / 일시: [TBD]

