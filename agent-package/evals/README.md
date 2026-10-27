# Agent Evals

Eval은 Agent 변경 전후의 결과와 실행 경로를 같은 조건에서 비교하는 Release 계약이다.

## 데이터셋 분리

| Split | 목적 | 편집 규칙 |
| --- | --- | --- |
| `development` | 특정 실패를 재현하고 수정 | 개발자가 볼 수 있음 |
| `regression` | 이미 해결한 핵심 행위 유지 | 실패 발견 시 append-only 추가 |
| `holdout` | 과적합 없이 출시 후보 평가 | 제한된 검토자만 정답·Rubric 관리 |
| `safety` | 권한·보안·중단·공격 대응 | Critical은 100% 통과 |
| `production_failure` | 운영 실패의 비식별 재현 | 개인정보·비밀 제거 후 regression 승격 |

같은 case를 여러 split에 복제하지 않는다. 운영 자료는 최소화·익명화하고 자격 증명, 개인정보, 원문 민감 Trace를 커밋하지 않는다.

## 파일 형식

각 `cases/*.jsonl` 파일은 한 줄에 하나의 JSON 객체를 둔다. 형식은 [`case.schema.json`](case.schema.json), 예시는 [`cases/example.jsonl`](cases/example.jsonl)을 따른다.

필수 요소:

- 안정적인 `case_id`
- severity와 split
- 입력과 필요한 context reference
- 결과에 반드시 있거나 없어야 할 조건
- Tool 경로·부작용 기대
- 적용 Rubric
- 실행 환경·fixture·상태 초기화
- Grader ID·반복 수·case 합격 규칙
- 사례 출처와 추가 날짜

## 평가 순서

1. baseline과 candidate의 버전·모델·Tool·환경을 고정한다.
2. deterministic 검사부터 실행한다.
3. Rubric 기반 결과·Trace 평가를 실행한다.
4. critical 실패는 평균과 별도로 판정한다.
5. latency, 비용, tool call, retry, 사람 수정량을 함께 비교한다.
6. 표본을 사람이 검토해 grader drift와 애매한 정답을 찾는다.
7. 결과 artifact를 Release Record에 연결한다.

## Grader와 결과 계약

- Grader는 [`grader.schema.json`](grader.schema.json)에 따라 유형, output/trace 범위, Rubric, 보정 표본, disagreement 상한을 고정한다.
- 실행 결과는 [`eval-run.schema.json`](eval-run.schema.json)에 따라 baseline과 candidate의 전체 version tuple을 함께 기록한다.
- 모델 Grader 단독 판정을 승인으로 사용하지 않는다. Critical, 불일치, 경계 점수는 표본 사람 검토 또는 명시된 fail-closed 정책으로 처리한다.
- Runner는 같은 case 순서, 환경, 상태 초기화, 반복 수, 병렬성, randomness 기록을 재현해야 한다.

## 운영 단계

```text
Fixed Eval → Approved Replay → No-side-effect Shadow → Bounded Canary → Production
```

각 단계는 앞 단계의 증거와 사람 승인을 입구 조건으로 사용하며, 실패하면 트래픽을 확대하지 않는다.

Eval 통과는 운영 가치의 필요조건이지 충분조건이 아니다. `A5 Operate`에서 실제 제품·운영 지표를 다시 확인한다.
