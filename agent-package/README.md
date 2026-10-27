# Agent Development Package

Agent를 프롬프트 한 장이 아니라 **버전·권한·환경·평가·운영 수명주기를 가진 제품**으로 개발하고 유지보수하기 위한 provider-neutral control plane이다. OpenAI·Claude 등 런타임 산출물은 여기서 생성되는 배포 투영본이며 정본이 아니다.

이 패키지가 Agent 자체의 정본을 관리한다면, [`docs/harnesses/tpm-agent-project/`](../docs/harnesses/tpm-agent-project/)는 프로젝트와 기능 개발 절차를, [`docs/templates/tpm-agent-feature/`](../docs/templates/tpm-agent-feature/)는 기능별 요구사항·실행·검증 증거를 관리한다.

## 빠른 시작

1. `agents/_template/`을 `agents/<agent-id>/`로 복사한다.
2. `<agent-id>`는 역할과 결과를 나타내는 kebab-case로 정한다. 예: `round-design-agent`.
3. 공통 Skill이 필요하면 `skills/_template/`으로 만들고 Agent에 연결한다.
4. Agent 폴더의 일곱 정본과 고정된 실행 환경·승인·데이터 정책을 채운다.
5. 대상 런타임 Adapter와 conformance 계약을 만든다.
6. `registry.json`에 Agent를 등록하고 대표·경계·실패 사례를 추가한다.
7. fixed eval → replay → shadow → canary 순서로 증거를 수집한다.
8. `node agent-package/tools/check.mjs`로 구조를 검사한다.
9. Candidate 또는 Active 전환 전에는 `node agent-package/tools/check.mjs --strict`와 기계 검증 가능한 [`releases/release-template.json`](releases/release-template.json)을 사용한다.

## 폴더 구조

```text
agent-package/
├── README.md                    # 사용 시작점
├── DESIGN-BASIS.md              # OpenAI·Claude 권고와 설계 결정 추적
├── GOVERNANCE.md                # 생명주기·Gate·변경·평가 정책
├── manifest.json                # 패키지 정체성과 기본 정책
├── manifest.schema.json         # 패키지 manifest 계약
├── registry.json                # 등록 Agent와 현재 배포 버전의 정본
├── registry.schema.json         # Registry 계약
├── CHANGELOG.md                 # 패키지 자체 변경 기록
├── agents/
│   ├── README.md                # Agent 폴더 책임
│   ├── agent.schema.json        # Agent 계약
│   ├── tool[s].schema.json      # Tool 하나와 Tool 집합 계약
│   ├── evals.schema.json        # Agent별 평가·rollout 계약
│   └── _template/               # Agent 하나의 복사 원본
├── skills/                      # 재사용 가능한 공통 Skill 정본
├── environments/                # Sandbox·network·budget·retention 계약
├── policies/                    # 승인·데이터 거버넌스 정책
├── evals/
│   ├── README.md                # Eval 운영 규칙
│   ├── case.schema.json         # JSONL 한 행의 계약
│   ├── grader.schema.json       # Grader·보정 계약
│   ├── eval-run.schema.json     # Baseline/candidate 결과 계약
│   ├── cases/example.jsonl      # 형식 예시
│   └── rubrics/default.md       # 공통 평가 Rubric
├── changes/change-request-template.md
├── decisions/ADR-template.md
├── releases/
│   ├── README.md
│   ├── release.schema.json
│   ├── release-template.json
│   └── release-template.md
├── runs/                        # Trace·실행 증거 schema와 보존 규칙
├── adapters/                    # Runtime compile·강제·conformance 계약
└── tools/check.mjs              # JSON Schema·참조 무결성 검사
```

## Agent 하나의 정본

| 파일 | 단일 책임 |
| --- | --- |
| `agent.json` | ID, 버전, 상태, 모델 정책, 입출력·위험 계약 |
| `instructions.md` | 역할, 작업 절차, 금지·중단·완료 조건 |
| `context.md` | 허용 정본, 제외 정보, 최신성 규칙 |
| `tools.json` | Tool별 입력 범위, 부작용, 승인·실패 계약 |
| `evals.json` | 데이터셋, Rubric, 임계값, Release Gate |
| `runbook.md` | 배포, 모니터링, 장애·Rollback 절차 |
| `CHANGELOG.md` | Agent 버전별 행위 변화와 근거 |

같은 규칙을 여러 파일에 복사하지 않는다. 런타임의 `AGENTS.md`, `CLAUDE.md`, Skill, SDK 설정은 [`adapters/`](adapters/)에서 생성·동기화하는 배포 투영본이며 Agent 폴더가 정본이다.

## 구현 선택 기준

```text
결정론적 코드로 충분한가? → 코드/자동화
반복 가능한 좁은 절차인가? → Shared Skill
불확실한 판단과 결과 책임이 필요한가? → Agent
독립 컨텍스트·병렬 분리가 평가로 유리한가? → 제한된 delegation
```

처음부터 다수 Agent를 만들지 않는다. 첫 Agent는 read-only 분석 또는 권고 역할로 시작해 품질·비용·지연·사람 수정률을 입증한 뒤 같은 control plane에서 확장한다.

## 변경 시작 계약

Agent 변경은 다음 정보를 먼저 고정한다.

```yaml
CHANGE_ID: CHG-YYYYMMDD-NN
AGENT_ID: <agent-id>
BASE_VERSION: <semver>
CHANGE_CLASS: PATCH | MINOR | MAJOR
PROBLEM: <실패 사례 또는 개선 목표>
SCOPE: <변경·제외 범위>
EVIDENCE_CUTOFF: <commit, tag 또는 날짜>
RISK: LOW | MEDIUM | HIGH | CRITICAL
APPROVER: <역할 또는 사람>
```

[`changes/change-request-template.md`](changes/change-request-template.md)에 기록한 뒤 기존 버전의 baseline Eval을 먼저 실행한다. 프롬프트·모델·Tool을 동시에 바꾸지 말고, 불가피하면 각 변경의 효과를 분리해 확인할 수 있는 실험을 남긴다.

## 기본 명령

```bash
node agent-package/tools/check.mjs
node agent-package/tools/check.mjs --strict
```

- 기본 검사: 모든 공통·template JSON을 실제 JSON Schema에 적용하고 경로·참조·ID·데이터셋 형식을 확인한다.
- `--strict`: 등록 Agent 존재 여부와 Candidate·Active Agent의 모델·환경·Adapter·Eval 결과·Release 승인 및 placeholder 제거까지 확인한다.

## 완료 기준

Agent 변경은 다음이 모두 연결되어야 완료다.

```text
Change Request → Agent/Tool/Skill/Environment diff → Adapter → Fixed Eval → Replay → Shadow → Canary → Approval/Release → Monitoring/Rollback
```

성능 향상 주장은 같은 데이터셋과 조건의 baseline·candidate 비교로 증명한다. 실행 Trace가 없으면 `Trace unavailable`로 기록하며 사후에 만들어내지 않는다.

설계 결정과 OpenAI·Claude 공식 자료의 연결은 [`DESIGN-BASIS.md`](DESIGN-BASIS.md)에 유지한다.
