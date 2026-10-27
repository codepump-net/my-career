# TPM Agent Project Harness

| 항목 | 값 |
| --- | --- |
| 하네스 버전 | 1.0 |
| 최종 갱신 | 2026-08-31 |
| 적용 범위 | 프로젝트 초기화, 기존 문서 이관, 기능 개발, 문서·증거 감사 |
| 기본 쓰기 정책 | `READ_ONLY` |
| 기능 개발 기준 | [`TPM Agent 기반 기능 개발 가이드`](../../guides/tpm-agent-feature-development.md) |

이 문서는 Agent가 프로젝트 문서와 기능 개발을 반복 가능한 방식으로 운영하기 위한 **실행 계약**이다. 설명이 필요하면 학습 가이드를 읽고, 실행할 때는 이 문서의 입력·순서·중단 조건·출력 형식을 따른다.

---

## 1. 역할과 우선순위

Agent의 역할은 요구를 임의로 완성하는 것이 아니라 다음 연결을 유지하는 것이다.

```text
문제·성과 → 기능 경계 → 요구사항·AC → 실행 계획 → 구현 → 검증 → 운영 결과 → 학습
```

규칙이 충돌하면 다음 순서로 따른다.

1. 사용자와 승인자가 이번 실행에 명시한 지시
2. 프로젝트의 `AGENTS.md`, `CLAUDE.md`, 보안·운영 정책
3. 승인된 제품·아키텍처·기능 정본
4. 이 하네스
5. 학습 가이드와 일반 관례

상위 규칙과 충돌하거나 필요한 권한이 없으면 추측해 진행하지 않고 `BLOCKED`로 보고한다.

## 2. 실행 입력 계약

모든 실행은 다음 입력을 먼저 확인한다.

| 필드 | 필수 | 허용값·설명 |
| --- | --- | --- |
| `PROJECT_ROOT` | 필수 | 대상 저장소의 확인된 루트 |
| `MODE` | 필수 | `BOOTSTRAP`, `MIGRATE`, `FEATURE`, `AUDIT` |
| `SCOPE` | 필수 | 포함 경로·기능과 제외 범위 |
| `FEATURE_ID` | 조건부 | `FEATURE` 모드에서 필수, kebab-case |
| `WRITE_POLICY` | 선택 | `READ_ONLY` 또는 `APPLY`; 누락 시 `READ_ONLY` |
| `EVIDENCE_CUTOFF` | 필수 | 검토 기준 commit, tag 또는 날짜 |
| `APPROVER` | 필수 | Gate를 판정할 역할 또는 사람 |

입력이 불완전해도 안전한 읽기 작업은 할 수 있다. 단, 범위나 승인자가 불분명한 상태에서 파일 생성·이동·보관·삭제는 하지 않는다.

### 실행 전 확인 출력

작업을 시작하기 전에 다음을 한 번 보고한다.

```text
Mode / Scope / Exclusions / Write Policy / Evidence Cutoff / Expected Outputs / Stop Conditions
```

## 3. 공통 문서 구조

프로젝트 규모에 맞게 이름은 조정할 수 있지만 각 책임은 유지한다.

```text
docs/
├── product/                    # 프로젝트 목표, 사용자, 제품 지표, 프로젝트 PRD
├── architecture/               # 공용 시스템 구조와 인터페이스
├── standards/                  # 코딩·UI·보안·운영 규칙
├── operations/                 # 배포, 관리자 매뉴얼, Runbook
├── features/
│   ├── index.md                # Feature Registry 정본
│   └── <feature-id>/
│       ├── feature.md          # 문제·목표·범위·요구사항·AC
│       ├── execution.md        # Agent·Tool·권한·Task·Run
│       ├── evaluation.md       # 테스트·Trace·지표·출시 판정
│       └── decisions.md        # append-only 결정 기록
├── migration/
│   ├── document-inventory.md   # 기존 문서 전수 목록
│   ├── migration-log.md        # 매핑·충돌·승인·이관 이력
│   └── audit-report.md         # 커버리지와 잔여 GAP
└── archive/                    # MG4 승인 후 보관한 과거 문서
```

제품·아키텍처·표준·운영 문서를 기능 폴더마다 복사하지 않는다. Feature Packet은 필요한 절·결정 ID 또는 링크만 참조한다.

## 4. ID와 연결 규칙

| 접두사 | 대상 | 예시 |
| --- | --- | --- |
| `FEAT-*` | 기능 | `FEAT-round-team-race` |
| `REQ-*` | 기능 요구사항 | `REQ-RACE-003` |
| `AC-*` | 수용 기준 | `AC-RACE-005` |
| `TASK-*` | 실행 작업 | `TASK-RACE-012` |
| `RUN-*` | 실제 Agent 실행 | `RUN-RACE-018` |
| `TEST-*` | 검증 | `TEST-RACE-021` |
| `DEC-*` | 결정 | `DEC-RACE-006` |
| `DOC-*` | 기존 문서 | `DOC-0042` |
| `MAP-*` | 문서 이관 단위 | `MAP-0027` |
| `GAP-*` | 충돌·누락·미검증 항목 | `GAP-0011` |

연결의 최소 조건은 `REQ → AC → TASK → RUN → TEST`다. 과거 실행에서 `RUN` 증거가 없으면 새 ID를 만들어 채우지 않고 `Trace unavailable`로 표시한다. 구현 코드는 별도의 `Implementation Evidence`로 연결할 수 있다.

## 5. 사실·의도·검증을 분리하는 증거 모델

레거시 문서를 정리할 때 한 개의 “신뢰도” 점수로 모든 상태를 섞지 않는다. 중요한 주장마다 아래 세 축을 기록한다.

### 5.1 Origin — 언제 기록되었는가

- `CONTEMPORANEOUS`: 당시 작업 과정에서 생성된 기록
- `RECONSTRUCTED`: 사후에 문서·코드·기억을 바탕으로 재구성한 기록

### 5.2 Intent — 무엇을 말하는가

- `HISTORICAL_INTENT`: 당시 의도·계획
- `AS_IS`: 기준 시점의 실제 구현·운영 상태
- `TO_BE`: 앞으로 변경할 목표 상태

### 5.3 Verification — 무엇으로 확인했는가

- `UNVERIFIED`: 근거를 아직 확인하지 않음
- `DOCUMENT_VERIFIED`: 다른 정본 문서와 대조
- `CODE_VERIFIED`: 기준 commit의 코드·설정과 대조
- `RUNTIME_VERIFIED`: 실행·테스트 결과와 대조
- `DATA_VERIFIED`: 분석·운영 데이터와 대조

예: “팀 레이스가 바이럴을 높이기 위해 기획되었다”와 “팀 레이스가 현재 서비스에서 동작한다”는 서로 다른 주장이다. 전자는 `HISTORICAL_INTENT`, 후자는 `AS_IS`이며 각각 별도 근거가 필요하다.

### 5.4 출처 표기 최소 형식

```text
Source: <repository-relative path>#<section-or-line> @ <commit/tag/date>
Origin: CONTEMPORANEOUS | RECONSTRUCTED
Intent: HISTORICAL_INTENT | AS_IS | TO_BE
Verification: <level>
Checked by / Checked at: <actor> / <date>
```

근거가 없거나 충돌하면 `Unknown`으로 두고 `GAP-*`를 만든다. “그랬을 것”을 확정 사실로 바꾸지 않는다.

## 6. 문서 분류와 기능 경계

### 6.1 문서 유형

| 유형 | 판단 기준 | 기본 목적지 |
| --- | --- | --- |
| `PRODUCT` | 프로젝트 목표·사용자·성과·전체 범위 | `docs/product/` |
| `ARCHITECTURE` | 여러 기능이 공유하는 구조·인터페이스 | `docs/architecture/` |
| `STANDARD` | 코딩·UI·보안·품질의 공통 규칙 | `docs/standards/` |
| `FEATURE` | 특정 사용자 역량의 요구·동작·검증 | `docs/features/<feature-id>/` |
| `OPERATIONS` | 배포·관리·장애·운영 절차 | `docs/operations/` |
| `EVIDENCE` | 테스트 결과·로그·분석·화면 증거 | Feature Packet 또는 증거 저장소 |
| `HISTORICAL` | 더는 정본이 아니지만 보존 가치가 있음 | `docs/archive/` |
| `UNKNOWN` | 근거 부족으로 분류하지 못함 | 원위치 유지 + `GAP-*` |

한 파일이 여러 유형을 포함하면 절 단위로 `SPLIT`을 제안하되, MG2 전에는 원본을 변경하지 않는다.

### 6.2 기능 경계 규칙

다음 조건을 모두 만족하면 독립 기능으로 본다.

- 사용자가 인지할 수 있는 하나의 역량 또는 결과가 있다.
- 독립적인 목표·정책·수용 기준을 정의할 수 있다.
- 독립적으로 출시·비활성화·성과 판정할 수 있다.

독립 결과 없이 부모 기능의 흐름만 구성하면 하위 요구사항 또는 sub-feature다. 세 기능 이상이 공유하거나 프로젝트 불변조건이면 기능 문서가 아니라 `ARCHITECTURE` 또는 `STANDARD`로 둔다. 배포·관리자 절차는 기능과 연결하되 `OPERATIONS`로 유지한다.

### 6.3 처리 방침

| 방침 | 의미 |
| --- | --- |
| `KEEP` | 현재 위치와 정본 책임을 유지 |
| `REFERENCE` | 공용 정본으로 유지하고 Feature Packet에서 참조 |
| `SPLIT` | 한 원본의 절을 여러 정본으로 분리 |
| `MERGE` | 중복 문서를 하나의 정본으로 통합 |
| `MIGRATE` | 내용을 새 구조로 옮김 |
| `ARCHIVE` | 정본 전환 후 읽기 전용 보관 |
| `REVIEW` | 충돌·불명확성 때문에 사람의 결정 필요 |

자동 `DELETE`는 허용하지 않는다. `ARCHIVE`도 원본→대상 매핑, 링크 점검, 승인 기록이 있어야 한다.

## 7. 모드별 실행 절차

### 7.1 `BOOTSTRAP` — 프로젝트 체계 초기화

1. 저장소 규칙, 제품 목표, 코드 구조, 테스트·배포 명령을 읽는다.
2. 기능 경계 후보와 프로젝트 공용 문서 후보를 제안한다.
3. [`feature-registry.md`](templates/feature-registry.md)를 생성한다.
4. 승인된 기능에만 Feature Packet을 만든다.
5. 정본 위치, ID, Gate, 검증 명령, 승인자를 프로젝트 규칙에 연결한다.
6. `AUDIT`를 실행해 링크 누락과 빈 필수 필드를 확인한다.

`BOOTSTRAP`은 기존 문서가 거의 없는 프로젝트를 위한 모드다. 기존 문서가 이미 많으면 `MIGRATE`를 사용한다.

### 7.2 `MIGRATE` — 기존 문서 기능별 재정리

#### M0 Scope

- 포함·제외 경로와 기준 commit을 고정한다.
- 생성 파일, 수정 가능 파일, 금지 경로를 확인한다.
- 출력: 범위 선언, `MG0` 판정.

#### M1 Inventory & Classification

- 문서 파일과 중요한 내부 절을 빠짐없이 `DOC-*`로 등록한다.
- 유형, 연결 기능, 중복 후보, 현재 정본 여부를 기록한다.
- 출력: [`document-inventory.md`](templates/document-inventory.md), `MG1` 판정.

#### M2 Feature Mapping

- 기능 경계를 정하고 `FEAT-*`를 부여한다.
- 각 `DOC-*` 또는 절을 대상 정본에 `MAP-*`로 연결한다.
- 중복·충돌·누락은 `GAP-*`로 기록한다.
- 출력: Feature Registry, Migration Log, `MG2` 판정.

#### M3 Reconstruction

- 승인된 매핑만 Feature Packet으로 옮긴다.
- `HISTORICAL_INTENT`, `AS_IS`, `TO_BE`를 별도 절 또는 행으로 분리한다.
- 과거 Agent Trace, 대안, AC, 테스트를 새로 지어내지 않는다.
- 출력: 재구성 Feature Packet과 source backlink.

#### M4 Verification

- 코드·설정·테스트·운영 데이터와 `AS_IS` 주장을 대조한다.
- 확인 수준을 갱신하고 불일치는 `GAP-*`로 남긴다.
- 출력: 검증 증거, 잔여 GAP, `MG3` 판정.

#### M5 Cutover & Archive

- 새 정본 링크가 유효하고 소비자가 새 위치를 참조하는지 확인한다.
- 승인 후에만 원본에 대체 안내를 남기거나 `archive/`로 이동한다.
- 삭제하지 않으며 Git 이력 또는 보존 위치를 기록한다.
- 출력: cutover 기록, Rollback 경로, `MG4` 판정.

#### M6 Coverage Audit

- 문서·기능·근거 커버리지를 계산하고 orphan과 미해결 GAP을 찾는다.
- 출력: [`audit-report.md`](templates/audit-report.md), `MG5` 판정.

### 7.3 `FEATURE` — 기능 개발

1. Feature Registry에서 기능 ID와 경계를 확인한다.
2. [`TPM Agent Feature Packet`](../../templates/tpm-agent-feature/)을 `docs/features/<feature-id>/`에 복사한다.
3. 학습 가이드의 Phase 0~6과 G0~G4를 따른다.
4. 구현 전 `G2 Build`, 출시 전 `G3 Release`, 결과 확인 후 `G4 Learning`을 기록한다.
5. Feature Registry의 상태·Gate·근거·GAP을 갱신한다.

현재 코드에서 발견한 동작을 기획 의도로 소급하지 않는다. 기존 기능을 처음 문서화하면 `RECONSTRUCTED`로 표시하고 `AS_IS`와 개선할 `TO_BE`를 분리한다.

### 7.4 `AUDIT` — 정합성·커버리지 점검

다음을 읽기 전용으로 확인한다.

- 등록되지 않은 문서와 Feature Packet 없는 기능
- `REQ → AC → TASK → RUN → TEST` 연결 누락
- 출처·기준 commit·검증 수준이 없는 핵심 주장
- 서로 다른 정본에서 충돌하는 요구사항
- 코드 또는 런타임과 다른 `AS_IS`
- 완료 표시가 있지만 증거 또는 Gate가 없는 항목
- 옛 문서를 계속 참조하는 링크와 orphan 문서
- 승인 없이 이동·보관된 원본

결과는 Audit Report에 기록한다. `AUDIT`는 문제를 자동 수정하지 않으며, 수정이 필요하면 별도 `MIGRATE` 또는 `FEATURE` 실행을 연다.

## 8. Gate 계약

### 8.1 프로젝트 이관 Gate

| Gate | 통과 조건 | 승인 전 금지 사항 |
| --- | --- | --- |
| `MG0 Scope` | 범위·기준 시점·쓰기 정책·승인자 확정 | 범위 밖 읽기·쓰기 |
| `MG1 Inventory` | 대상 문서가 카탈로그화되고 미분류 항목이 표시됨 | 원본 이동·분할 |
| `MG2 Mapping` | 기능 경계·대상 정본·처리 방침·충돌이 검토됨 | 실제 이관·통합 |
| `MG3 Verification` | 재구성 내용의 출처와 검증 수준이 기록됨 | 정본 전환 주장 |
| `MG4 Cutover` | 링크·소비자·Rollback 확인 및 승인 | 원본 보관 처리 |
| `MG5 Audit` | 커버리지와 잔여 위험이 보고되고 소유자가 정해짐 | “이관 완료” 선언 |

### 8.2 기능 개발 Gate

기능 개발은 기존 가이드의 `G0 Discovery`, `G1 Design`, `G2 Build`, `G3 Release`, `G4 Learning`을 사용한다. 프로젝트 Gate와 기능 Gate를 섞지 않는다.

### 8.3 판정값

- `PASS`: 필수 조건 충족
- `CONDITIONAL`: 잔여 조치·소유자·기한을 명시하고 제한적으로 진행
- `FAIL`: 다음 단계로 진행 불가
- `NOT_REVIEWED`: 아직 승인자가 판정하지 않음

Agent의 자체 점검은 승인자의 판정을 대신하지 않는다.

## 9. Agent·Tool 운영 규칙

### 9.1 기본 오케스트레이션

- 한 명의 주 Agent가 범위, 정본, Gate, 최종 보고를 소유한다.
- 병렬 작업은 경계가 겹치지 않는 읽기 전용 조사 또는 독립 검증에만 사용한다.
- 하위 Agent 결과는 제안이며, 주 Agent가 출처와 충돌을 검토한 뒤 반영한다.
- 같은 파일을 여러 Agent가 동시에 수정하지 않는다.

### 9.2 Tool 계약

도구를 쓰기 전에 목적, 허용 입력, 변경 범위, 성공 신호, 실패 처리, 승인 필요 여부를 확인한다. 삭제·배포·권한 변경·외부 메시지처럼 되돌리기 어렵거나 외부 효과가 있는 작업은 명시적 승인을 요구한다.

### 9.3 최소 변경 원칙

- 발견 단계는 읽기 전용으로 시작한다.
- 사용자 변경과 범위 밖 파일을 보존한다.
- 원본 문서를 바로 덮어쓰지 않는다.
- 대량 이동 전에는 정확한 대상 목록과 복구 방법을 제시한다.
- 정본 중복을 만들지 않고 기존 공용 문서에 링크한다.

## 10. GAP와 중단 조건

### 10.1 GAP 유형

| 유형 | 의미 |
| --- | --- |
| `DOC-CODE` | 문서와 코드가 다름 |
| `DOC-DOC` | 두 문서의 정본 주장이 충돌 |
| `CODE-RUNTIME` | 코드상 기대와 실제 실행이 다름 |
| `INTENT-ASIS` | 과거 의도와 현재 구현이 다름 |
| `MISSING-EVIDENCE` | 완료·성과 주장에 근거가 없음 |
| `ORPHAN` | 어떤 기능·공용 책임에도 연결되지 않음 |
| `DUPLICATE` | 같은 책임의 정본 후보가 둘 이상 |

각 `GAP-*`에는 심각도(`BLOCKER`, `HIGH`, `MEDIUM`, `LOW`), 영향, 필요한 결정, 소유자, 상태를 기록한다.

### 10.2 즉시 중단하고 보고할 때

- 프로젝트 루트나 쓰기 대상이 불명확하다.
- 저장소 규칙과 요청이 충돌한다.
- 승인되지 않은 삭제·배포·권한 변경이 필요하다.
- 두 정본의 충돌이 제품 동작을 바꿀 수 있다.
- 필요한 자격 증명·환경·외부 시스템 접근 권한이 없다.
- 검증할 수 없는 내용을 사실로 확정해야만 다음 단계로 갈 수 있다.

중단 보고에는 `현재까지 확인한 사실 / 차단 원인 / 영향 / 필요한 결정 / 안전하게 계속할 수 있는 일`을 포함한다.

## 11. 완료 보고 계약

각 실행의 최종 보고는 다음 순서를 따른다.

1. `Outcome` — 완료, 조건부 완료, 차단 중 하나
2. `Scope & Cutoff` — 실제 검토 범위와 기준 시점
3. `Artifacts` — 생성·수정한 정본 링크
4. `Evidence` — 실행한 검사와 핵심 결과
5. `Gates` — 판정과 승인자
6. `Open Gaps` — 심각도·소유자·다음 행동
7. `Changes Not Made` — 승인 부족 또는 범위 밖이라 보존한 항목

“완료”는 문서 생성 수가 아니라 Gate와 증거로 판단한다.

## 12. 감사 지표

최소한 다음 지표를 계산한다.

| 지표 | 계산 |
| --- | --- |
| 문서 등록률 | 등록된 대상 문서 / 발견한 대상 문서 |
| 문서 분류율 | `UNKNOWN`이 아닌 문서 / 등록 문서 |
| Feature Packet 커버리지 | Packet이 있는 기능 / 등록 기능 |
| 현재 상태 검증률 | 코드·런타임·데이터로 확인된 핵심 `AS_IS` 주장 / 전체 핵심 `AS_IS` 주장 |
| 추적성 커버리지 | 완전한 `REQ→AC→TASK→RUN→TEST` 연결 / 출시 대상 요구사항 |
| 잔여 GAP | 심각도별 열린 GAP 수 |
| Orphan 수 | 연결 기능·공용 책임이 없는 문서 수 |
| Trace 가용률 | 실제 `RUN-*` 증거가 있는 구현 / 조사한 구현 |

Trace 가용률이 낮아도 과거 Trace를 생성해 수치를 높이지 않는다. `Trace unavailable` 자체가 감사 결과다.

## 13. 품질 점검

적용 후 프로젝트에 맞는 검사 명령을 실행하고 결과를 Audit Report에 남긴다.

- Markdown 내부 상대 링크가 실제 파일을 가리킨다.
- Feature Registry의 Packet 링크와 문서 인벤토리의 대상 링크가 유효하다.
- 중복 ID가 없다.
- 필수 필드의 `[TBD]`가 Gate 조건과 충돌하지 않는다.
- 기준 commit 또는 날짜가 모든 감사·이관 산출물에 있다.
- Git diff에 범위 밖 변경이나 의도하지 않은 원본 삭제가 없다.
- 프로젝트 자체 테스트·lint·문서 검사가 통과한다.

## 14. 공식 원칙과의 대응

이 하네스는 다음 공통 원칙을 운영 산출물로 바꾼 것이다.

| 공통 원칙 | 하네스 적용 |
| --- | --- |
| 명확한 도구·권한·중단 조건 | 입력 계약, Tool 계약, `READ_ONLY` 기본값 |
| 단일 Agent로 시작하고 필요한 경우만 위임 | 주 Agent 소유권과 제한된 병렬 조사 |
| 작은 단계와 사람 승인 | G0~G4, MG0~MG5 |
| 결과와 실행 경로를 함께 평가 | 기능 Eval, Trace 가용성, 추적성 커버리지 |
| 지속 컨텍스트는 프로젝트 파일에 둠 | Registry, Packet, Inventory, Migration Log |
| 검증 가능한 완료 | Artifact + Evidence + Gate |

공식 참고:

- [OpenAI — Agent orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration)
- [OpenAI — Agent evals](https://developers.openai.com/api/docs/guides/agent-evals)
- [Claude Code — Best practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code — Permissions](https://code.claude.com/docs/en/permissions)
- [Claude Code — Subagents](https://code.claude.com/docs/en/sub-agents)

