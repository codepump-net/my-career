# Agent Package Changelog

이 파일은 패키지 구조와 공용 정책의 변경만 기록한다. 개별 Agent 행위 변화는 각 Agent의 `CHANGELOG.md`에 기록한다.

## 0.2.0 — 2026-08-31

- 패키지를 provider-neutral control plane으로 명시하고 OpenAI·Claude 런타임 산출물을 Adapter 투영본으로 분리
- Agent, Tool set, Eval config, Registry, Manifest의 JSON Schema와 실제 schema 검사를 추가
- Tool 계약에 입출력 schema, 데이터·자격 증명, 승인 시점, idempotency, 사전·사후 조건, rate·cost, 부분 실패·보상을 추가
- 공통 `SKILL.md` 템플릿과 progressive disclosure·권한 비확장 규칙 추가
- 실행 환경의 sandbox, network, filesystem, dependency, secret, session budget, state, telemetry, retention 계약 추가
- Adapter compile·enforce·attest manifest와 conformance·drift 템플릿 추가
- Grader, Eval Run, Run Evidence, Release Record의 기계 검증 schema와 version tuple 추가
- 출시 단계를 fixed Eval → replay → shadow → canary 순서로 고정
- Candidate·Active의 모델·환경·Adapter·Eval 결과·Release 승인·placeholder를 확인하는 strict Gate 강화

## 0.1.0 — 2026-08-31

- Agent 정의·Tool·Eval·Runbook 정본 템플릿 추가
- Agent 생명주기 A0~A5와 Release·Rollback 정책 추가
- Eval case schema, 기본 Rubric, 실행 증거 관리 규칙 추가
- 의존성 없는 `tools/check.mjs` 구조 검사 추가
