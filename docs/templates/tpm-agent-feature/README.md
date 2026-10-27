# TPM Agent Feature Packet 템플릿

이 폴더는 기능 하나의 문제 정의부터 Agent 실행, 검증, 제품 학습까지 연결하는 복사 원본이다. 운영 기준은 [`../../guides/tpm-agent-feature-development.md`](../../guides/tpm-agent-feature-development.md)를 따른다.

## 사용법

1. 이 폴더를 프로젝트의 `docs/features/<feature-id>/`로 복사한다.
2. `<feature-id>`는 `영역-기능` 형태의 kebab-case로 정한다. 예: `round-team-race`.
3. 네 문서의 `[FEATURE-ID]`와 `[TBD]`를 채운다.
4. 관련 없는 항목은 삭제하지 말고 `N/A — 이유`로 닫는다.
5. `feature.md`를 요구사항 정본으로 사용하고 다른 문서에서는 ID만 참조한다.

```text
<feature-id>/
├── feature.md       # 문제·목표·범위·요구사항·수용 기준의 정본
├── execution.md     # Agent 계약·Tool·권한·실행 계획과 Run Log
├── evaluation.md    # 테스트·Trace Eval·제품 지표·출시 판정
├── decisions.md     # 중요한 선택과 Trade-off의 append-only 기록
└── evidence/        # 필요한 경우 작은 증거 파일. 대용량 원본은 외부 링크
```

## Gate 진행

| Gate | 승인 대상 | 필수 문서 |
| --- | --- | --- |
| G0 Discovery | 문제·사용자·지표를 조사할 가치가 있음 | `feature.md` 1~3절 |
| G1 Design | 대안·범위·흐름·요구사항·AC가 구현 가능 | `feature.md` 전체, `decisions.md` |
| G2 Build | Agent·Tool·권한·중단·검증 계획이 안전 | `execution.md` |
| G3 Release | AC·회귀·위험 검증과 Rollback이 준비됨 | `evaluation.md` |
| G4 Learning | 제품 결과와 다음 결정이 기록됨 | `evaluation.md`, `decisions.md` |

## 정본 규칙

- 목표·범위·요구사항·AC는 `feature.md`에만 작성한다.
- 실행 작업은 `TASK-*`, Agent 실행은 `RUN-*`, 검증은 `TEST-*`, 결정은 `DEC-*`로 연결한다.
- 요구사항이 바뀌면 먼저 `DEC-*`를 추가하고 `feature.md`를 갱신한다.
- 문서를 출시별로 복사하지 않는다. 당시 상태는 commit 또는 tag 링크로 보존한다.
- 완료 주장에는 테스트 출력, 화면 캡처, 로그, diff, 지표 중 하나를 연결한다.

## 기능 규모

- **Lite:** 관련 없는 절을 `N/A`로 닫고 Run·검증 기록 각 1건 이상
- **Standard:** 전체 흐름, 실패·경계 사례, 제품 지표 포함
- **High-risk:** 독립 검토, 명시 승인, 보안·운영 Eval, Rollback rehearsal 포함

