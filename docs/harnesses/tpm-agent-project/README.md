# TPM Agent 프로젝트 공용 하네스

이 디렉터리는 특정 기능을 학습하기 위한 설명서가 아니라, **어떤 프로젝트에서도 Agent가 같은 절차와 증거 기준으로 문서를 정리하고 기능을 개발하도록 만드는 실행 계약**이다.

- 원칙과 배경을 공부할 때: [`../../guides/tpm-agent-feature-development.md`](../../guides/tpm-agent-feature-development.md)
- 기능 하나를 문서화할 때: [`../../templates/tpm-agent-feature/`](../../templates/tpm-agent-feature/)
- 프로젝트 전체를 실제로 운영할 때: [`HARNESS.md`](HARNESS.md)
- Agent 자체를 개발·평가·릴리스할 때: [`../../../agent-package/`](../../../agent-package/)

하네스는 OpenAI·Claude 중 어느 제품을 쓰는지와 무관하게 적용한다. 프로젝트의 `AGENTS.md`, `CLAUDE.md`, 저장소 규칙은 이 하네스보다 우선한다.

## 무엇을 해결하는가

| 모드 | 사용하는 때 | 핵심 결과 |
| --- | --- | --- |
| `BOOTSTRAP` | 새 프로젝트에 문서 체계를 처음 만들 때 | 공용 문서 구조, Feature Registry, 운영 기준 |
| `MIGRATE` | 흩어진 기존 문서를 기능별로 재정리할 때 | 문서 인벤토리, 기능 매핑, 이관·충돌 기록 |
| `FEATURE` | 새 기능 또는 기존 기능 변경을 개발할 때 | 기능별 Feature Packet과 G0~G4 증거 |
| `AUDIT` | 문서 완전성·정합성·검증 수준을 점검할 때 | 정량 지표, GAP 목록, Gate 판정 |

## 설치

다른 프로젝트에서 사용할 때 아래 두 디렉터리를 함께 복사한다.

```text
<project-root>/
└── docs/
    ├── harnesses/tpm-agent-project/   # 이 디렉터리
    └── templates/tpm-agent-feature/   # 기능별 Feature Packet 복사 원본
```

복사 후 프로젝트의 `README.md`, `AGENTS.md` 또는 `CLAUDE.md`에서 `HARNESS.md`를 연결한다. 프로젝트 고유 명령·금지 경로·승인자는 저장소 규칙에 작성하고, 공통 하네스를 직접 변형하지 않는다.

## 시작 요청

Agent에게 아래 계약을 채워 전달한다. 쓰기 권한을 명시하지 않으면 `READ_ONLY`로 동작한다.

```yaml
PROJECT_ROOT: <absolute-or-repository-root>
MODE: BOOTSTRAP | MIGRATE | FEATURE | AUDIT
SCOPE: <대상 디렉터리, 문서 또는 기능>
FEATURE_ID: <FEATURE 모드에서 필수>
WRITE_POLICY: READ_ONLY | APPLY
EVIDENCE_CUTOFF: <검토 기준 commit, tag 또는 날짜>
APPROVER: <Gate와 이관을 승인할 역할 또는 사람>
```

예시:

```yaml
PROJECT_ROOT: C:/workspace/game-project
MODE: MIGRATE
SCOPE: docs/** 및 구현 코드 전체
WRITE_POLICY: READ_ONLY
EVIDENCE_CUTOFF: main@a1b2c3d
APPROVER: Project TPM
```

첫 실행은 `READ_ONLY`로 인벤토리와 제안만 만들고, 검토 후 `APPLY`로 전환하는 것을 기본으로 한다.

## 산출물

프로젝트 공용 산출물은 다음 템플릿을 사용한다.

- [`templates/feature-registry.md`](templates/feature-registry.md) — 기능 경계와 Feature Packet 현황의 정본
- [`templates/document-inventory.md`](templates/document-inventory.md) — 기존 문서의 위치·유형·처리 방침
- [`templates/migration-log.md`](templates/migration-log.md) — 원본→대상 매핑, 충돌, 승인, 이관 이력
- [`templates/audit-report.md`](templates/audit-report.md) — 범위·커버리지·GAP·최종 판정

기능별 산출물은 기존 [`TPM Agent Feature Packet`](../../templates/tpm-agent-feature/)을 그대로 사용한다. 같은 내용을 하네스 안에 복제하지 않는다.

## 완료의 의미

하네스 실행은 파일을 많이 만든 것으로 끝나지 않는다. 다음 세 조건이 함께 있어야 완료다.

1. **Artifact** — 정해진 위치에 산출물이 있다.
2. **Evidence** — 주장마다 문서·코드·실행·데이터 중 확인 가능한 근거가 연결된다.
3. **Gate** — 승인자와 판정 시점이 기록된다.

근거가 없으면 `Unknown` 또는 `Trace unavailable`로 남긴다. 과거 Agent 실행 기록, 대안, 요구사항, 테스트 결과를 기억에 의존해 새로 만들지 않는다.
