# Design Basis and Provider Traceability

최종 확인일: 2026-08-31

이 패키지는 어느 한 Provider의 설정 파일을 정본으로 삼지 않는다. 아래 공개 권고에서 공통으로 요구하는 계약을 provider-neutral control plane에 보존하고, 플랫폼별 기능은 Adapter에서 투영·검증한다.

| 설계 결정 | 패키지 반영 | 공개 근거 |
| --- | --- | --- |
| 결정론적 workflow와 Agent를 구분하고 필요한 복잡성만 도입 | `README.md > 구현 선택 기준`, `GOVERNANCE A0` | [OpenAI — Define agents](https://developers.openai.com/api/docs/guides/agents/define-agents), [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) |
| Outcome·제약·증거·성공 조건을 명시하고 지침 중복을 줄임 | `instructions.md`, Agent 입출력 schema | [OpenAI — Using GPT-5.4](https://developers.openai.com/api/docs/guides/latest-model) |
| Tool schema·최소 권한·승인·guardrail을 실행 계층에서 강제 | `tool.schema.json`, policies, environments, adapters | [OpenAI — Guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals), [Claude Code — Permissions](https://code.claude.com/docs/en/permissions), [Claude Code — Hooks](https://code.claude.com/docs/en/hooks-guide) |
| 반복 가능한 좁은 역량을 Skill로 분리하고 필요할 때만 자료 로드 | `skills/` | [OpenAI — Build skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code — Features overview](https://code.claude.com/docs/en/features-overview) |
| Baseline/candidate, 결과와 실행 경로, 자동·모델·사람 Grader를 평가 | `evals/`, `eval-run.schema.json` | [OpenAI — Agent evals](https://developers.openai.com/api/docs/guides/agent-evals), [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) |
| 병렬·delegation은 단계·Tool·출력·예산·중단 조건을 제한 | Agent capabilities와 instructions | [OpenAI — Agent orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration), [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) |
| Agent 구성뿐 아니라 환경·세션 예산·상태·보존을 Release tuple에 고정 | `environments/`, `runs/`, `releases/` | [Claude — Managed Agent overview](https://platform.claude.com/docs/en/managed-agents/overview), [Agent setup](https://platform.claude.com/docs/en/managed-agents/agent-setup), [Sessions](https://platform.claude.com/docs/en/managed-agents/sessions) |

Provider 문서는 변경될 수 있다. 모델·SDK·runtime 또는 permission 동작을 올릴 때는 이 표의 관련 근거를 다시 확인하고 별도 `CHG-*`, 전체 regression, Adapter conformance를 수행한다.
