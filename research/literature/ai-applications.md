# 2. AI 활용: 주요 학술지·학회와 Roblox 연계 연구동향

조사 기준일: **2026-09-19** · 조사 기간: **2025~2026년 공개 연구 중심** · 단계: **1차 문헌 지도**  
[세 분야 조사 안내](README.md) · [Computer Graphics](computer-graphics.md) · [MIS](mis.md)

## 1. 분야의 범위와 핵심 판단

AI 활용 분야는 Roblox 제작·코딩·테스트·NPC 상호작용에 AI를 적용하고 그 방법과 신뢰성을 검증하는 연구로 정의한다. 모델 호출이나 챗봇 연결 자체보다 **작업 성공, 오류 복구, 일반화, 사람의 통제, 비용**을 연구 대상으로 삼는다.

최고 수준의 AI 문헌을 읽는 경로와 실제 연구를 제출할 경로는 기여에 따라 달라진다. 학습·추론 방법의 기여는 NeurIPS·ICML·ICLR, 언어 에이전트는 ACL, 시각·3D 생성은 CVPR, 사람과 AI의 제작 상호작용은 CHI를 우선 탐색한다. 이는 연구 적합성에 대한 제안이며 모든 학회를 동일 분야의 단일 순위로 묶지 않는다.

## 2. 주요 학술지

| 학술지 | 조사 위치·공식 범위 | 적합한 기여와 Roblox 연결 |
| --- | --- | --- |
| **Journal of Machine Learning Research — JMLR** | ML 분야 핵심 대표 저널. [저널 소개](https://jmlr.org/), [편집 기준](https://www.jmlr.org/author-info.html) | 다양한 환경으로 일반화되는 학습·평가 방법. Roblox 한 플랫폼의 단순 응용만으로는 범위가 좁을 수 있음 |
| **Journal of Artificial Intelligence Research — JAIR** | AI 전반을 다루는 대표 저널. [공식 범위](https://www.jair.org/index.php/jair/about) | 계획·추론·에이전트·사람–AI 상호작용의 일반적 기여 |
| **Artificial Intelligence — AIJ** | AI 전반의 오랜 대표 저널. [공식 편집부 소개](https://aij.ijcai.org/about-the-artificial-intelligence-journal/) | 문제 해결·계획·추론의 새로운 방법과 응용 영역에서의 일반적 진전 |
| **IEEE Transactions on Pattern Analysis and Machine Intelligence — TPAMI** | 비전·패턴 인식·관련 ML 핵심 저널. [IEEE 범위](https://www.computer.org/digital-library/journals/tp/cfp-ieee-pattern-analysis-machine-intelligence) | 장면 이해, 멀티모달 인식, 3D 표현·생성 방법 |
| **Transactions on Machine Learning Research — TMLR** | JMLR을 보완하는 ML 연구 출판 경로. [공식 소개](https://jmlr.org/tmlr/), [편집 정책](https://www.jmlr.org/tmlr/editorial-policies.html) | 체계적인 ML 방법·분석·재현 연구. 최고 저널과의 고정 순위 관계나 대학 실적 인정 여부는 여기서 가정하지 않음 |

JMLR·JAIR·AIJ·TPAMI를 핵심 저널 조사 대상으로 삼고 TMLR은 추가 출판 경로로 관리한다. 사용자가 말한 ‘AI 활용’이 사람의 창작 과정에 초점을 두는 경우에는 아래 CHI와 [MIS 문서](mis.md)의 ISR 등도 함께 읽는다.

## 3. 주요 학회

| 학회 | 대표 영역·공식 근거 | Roblox 연구와의 접점 |
| --- | --- | --- |
| **NeurIPS** | ML·생성형 AI·강화학습 등. [2026 CFP](https://nips.cc/Conferences/2026/CallForPapers) | 검증 피드백을 이용한 에이전트 학습, 환경 일반화 |
| **ICML** | ML 방법과 분석. [2026 CFP](https://icml.cc/Conferences/2026/CallForPapers) | 적은 상호작용으로 학습·적응하는 정책, 비용 제약 학습 |
| **ICLR** | 표현학습·딥러닝. [2026 CFP](https://iclr.cc/Conferences/2026/CallForPapers) | 멀티모달·월드 모델·에이전트 표현 |
| **AAAI** | 폭넓은 AI와 사람–AI 연구. [2026 공식 프로시딩](https://ojs.aaai.org/index.php/AAAI) | 계획·추론·NPC·자동 테스트의 방법과 평가 |
| **ACL** | 자연어·언어모델·에이전트. [2026 CFP](https://2026.aclweb.org/calls/main_conference_papers/) | 자연어→Luau·도구 사용, 설명·상호작용 |
| **CVPR** | 컴퓨터 비전. [2026 CFP](https://cvpr.thecvf.com/Conferences/2026/CallForPapers) | 시각 기반 게임 조작, 장면 이해, 3D 생성 |
| **CHI** | HCI의 대표 학회. [2026 Papers 안내](https://chi2026.acm.org/authors/papers/) | 제작자의 통제권, AI 수정 인터페이스, 신뢰·사용 경험 |

NeurIPS 등의 워크숍을 본회의 실적으로 바꾸어 표기하지 않는다. ACL의 Main Conference와 Findings도 서지에서 구분한다. OpenReview의 ‘under review’ 원고는 채택 논문이 아니며, 데모·산업 발표 역시 연구 논문의 출판 상태와 별도로 관리한다.

## 4. 최근 대표 연구·산업 자료

| ID | 자료·발표 상태 | 확인한 내용 | Roblox 연결 및 구분 |
| --- | --- | --- | --- |
| AI-01 | **AgentGym: Evaluating and Training Large Language Model-based Agents across Diverse Environments**, Xi 외, ACL 2025 본회의. [공식 논문·코드 연결](https://aclanthology.org/2025.acl-long.1355/) | 여러 환경에서 LLM 에이전트를 평가·학습하는 체계 | **전이 후보.** Roblox 작업을 관찰·행동·성공 판정이 있는 환경으로 정의하고 미관찰 과제로 평가 |
| AI-02 | **SWE-smith: Scaling Data for Software Engineering Agents**, Yang 외, 2025. [공개 연구 원고](https://arxiv.org/abs/2504.21798) | 소프트웨어 에이전트 학습을 위한 작업·궤적 데이터 생성 방법과 산출물 공개 | **전이 후보.** Luau 오류 수정·실행 검증 데이터로 확장 가능성 탐색. 본 조사에서는 학회 게재를 확정하지 않음 |
| AI-03 | **Structured 3D Latents for Scalable and Versatile 3D Generation — TRELLIS**, Xiang 외, CVPR 2025. [공식 논문](https://openaccess.thecvf.com/content/CVPR2025/papers/Xiang_Structured_3D_Latents_for_Scalable_and_Versatile_3D_Generation_CVPR_2025_paper.pdf) | 여러 출력 표현을 지원하는 3D 생성 | **전이 후보.** AI 제작 도구 전체의 작업 완수·편집 비용 평가에 활용. 형상 알고리즘 자체는 그래픽스 축에서 다룸 |
| AI-04 | **Cube: A Roblox View of 3D Intelligence**, 2025. [기술 보고서](https://arxiv.org/abs/2503.15475), [공개 구현](https://github.com/Roblox/cube) | Roblox의 3D 지능·생성 방향과 공개 모델 | **직접.** 생성 모델을 제작 파이프라인의 한 구성요소로 사용. 전체 게임 생성·운영 자동화가 모두 검증된 것으로 해석하지 않음 |
| AI-05 | **Genie 3: A new frontier for world models**, Google DeepMind, 2025-08-05. [공식 연구 발표](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | 상호작용 가능한 환경을 생성하는 월드 모델 방향 | **전이 후보·산업 발표.** 행동에 따른 시각 변화와 긴 작업의 평가 문제. 편집 가능한 Roblox 프로젝트를 출력한다는 의미는 아님 |
| AI-06 | **Build Without Limits on Roblox**, Roblox, 2026-07-16. [공식 발표](https://about.roblox.com/newsroom/2026/07/build-without-limits-on-roblox) | 모바일 AI 제작과 제작 지원 에이전트 등 방향 소개 | **직접·제품 발표.** 생성·분석·수정 작업의 연구 배경. 기능별 공개 상태·계정 접근은 실험 전에 확인 |
| AI-07 | **CubePart: An Open-Vocabulary Part-Controllable 3D Generator**, Zhu 외, SIGGRAPH 2026. [공식 서지·초록](https://about.roblox.com/publications/cubepart-open-vocabulary-part-controllable-3d-generator) | 부품 스키마로 제어하는 생성 모델 | **직접·그래픽스와 공유 문헌.** AI 제작 흐름에서 스키마를 어떻게 정하고 실패 시 수정할지를 연구. 생성 알고리즘의 세부 조사는 그래픽스 문서에서 관리 |

AI-01~03은 Roblox에서 검증한 연구가 아니다. 이번 조사에서는 공식 초록·공개 설명과 서지를 확인했고, 전체 실험의 재현은 수행하지 않았다. AI-05·06의 기업 발표를 동료심사 성능 평가와 혼합하지 않는다.

## 5. 연구동향과 연구 질문

### 5.1 한 번의 생성에서 실행·검증·수정으로

AI-01·02를 종합하면 연구할 만한 방향은 결과물 하나를 생성하는 능력뿐 아니라 환경 피드백으로 작업을 끝내는 능력이다. Roblox에서는 코드가 문법적으로 맞아도 객체 계층, 이벤트 연결, 클라이언트–서버 실행 맥락 때문에 기능이 실패할 수 있다. 이를 체계적으로 평가할 작업 세트와 자동 판정기를 연구 후보로 둔다.

**후속 질문:** 동일 모델·동일 비용에서 문서 검색, 정적 검사, 실행 피드백을 결합하면 기능 성공률과 오류 복구가 얼마나 달라지는가? 단순히 더 많은 호출을 한 효과와 검증 구조의 효과를 분리해야 한다.

### 5.2 에이전트의 게임 조작과 자동 테스트

AI-01은 환경을 통일된 평가 체계로 다루는 출발점이다. Roblox의 테스트용 미니게임에서 목표 달성, 탐색, 객체 조작, 버그 유발을 과제로 만들 수 있다. 관찰을 이미지로 제공하는 경우와 구조화된 상태로 제공하는 경우는 서로 다른 난이도로 분리한다.

**후속 질문:** 사람이 작성한 테스트와 스크립트·무작위 탐색 기준선에 비해 언어 에이전트가 재현 가능한 버그를 더 많이 발견하는가? 발견 건수뿐 아니라 중복률, 오탐, 재현 성공률, 비용을 평가한다.

### 5.3 생성형 3D와 월드 모델의 제작 활용

AI-03~05는 형상 생성과 상호작용 환경 생성이라는 서로 다른 출력 경로를 보여준다. Roblox에서는 자산 생성, 동작 스크립트, 장면 구성, 플레이 테스트가 연결되어야 한다. 연구에서는 ‘영상으로 그럴듯함’과 ‘편집·실행 가능한 프로젝트’를 별도 산출물로 평가한다.

**후속 질문:** 생성 모듈을 연결했을 때 어떤 단계의 실패가 전체 작업을 막는가? 단계별 성공률과 전체 성공률, 수동 수정 시간을 함께 측정한다. 범용 월드 모델의 학습은 초기 연구 범위로 잡지 않는다.

### 5.4 자동화 수준과 사람의 통제

AI-06과 MIS의 창작 연구에서 착안해 제작자의 승인·수정·되돌리기 설계를 연구할 수 있다. AI가 자동 수정하는 방식과 수정 이유·영향을 보여주고 선택하게 하는 방식을 비교한다. 도구 성능·인터페이스 기여는 AI/HCI 축으로, 숙련도·창작 행동·장기 성과의 설명은 MIS 축으로 나눈다.

## 6. 초기 연구 후보

| 후보 | 질문·학술 기여 후보 | 비교 설계·평가 | 필요한 자료와 제한 | 우선 문헌·분야 |
| --- | --- | --- | --- | --- |
| **AI-A · 우선 검토** | Roblox 개발 과제에서 실행 피드백을 활용하는 에이전트가 오류를 안정적으로 고치는가? | 동일 모델의 단발 생성 / 문서 검색 / 정적 검사 / 실행 피드백 비교. 기능 성공률·회귀 오류·비용 | 직접 제작 Luau 과제와 보류 테스트. 문법 검사만으로 엔진 동작을 대체할 수 없음 | AI-01·02, ACL·AAAI; 학습 방법 기여가 있으면 ML 학회 |
| **AI-B** | 플레이 테스트 에이전트가 미관찰 장면에서도 재현 가능한 버그를 찾는가? | 무작위·스크립트·사람 테스트와 비교. 고유 버그·재현율·오탐·호출 비용 | 허가된 자체 게임, 의도적으로 심은 결함과 자연 발생 결함을 분리 | AI-01, AAAI·ACL |
| **AI-C** | 단계별 생성·검증 인터페이스가 제작자의 수정 비용을 줄이는가? | 자동 일괄 생성 / 단계별 검증 / 사람이 선택하는 수정안. 시간·품질·통제감 | 작동하는 제작 도구, 성인 참가자 파일럿 및 연구 절차 | AI-03·04·06, CHI |

AI-A의 첫 파일럿은 문·버튼·아이템 획득·간단한 동기화 등 **서로 다른 기능 20개 내외**를 작업 목표로 삼는다. 이는 충분한 표본 수가 확정되었다는 뜻이 아니다. 과제 원형 단위로 개발·평가 세트를 나누고 프롬프트나 수정 이력이 평가 정답을 누설하지 않도록 한다.

모델 버전, 입력 토큰·출력 토큰, 도구 호출 수, 시간 제한, 재시도 횟수, 문서 스냅샷, 실행 환경을 고정한다. AI가 작성한 테스트만으로 정답을 판정하지 않고 별도 기준 테스트와 실제 실행을 사용한다. 원격 모델의 변경·접근 제한이 있으면 재현 범위를 명시한다.

## 7. 정독·추적 계획

1. **첫째 주:** AgentGym의 환경 인터페이스·성공 판정·일반화 설계 정독.
2. **둘째 주:** SWE-smith의 작업 생성·검증·오염 방지 조건 정리. Luau로 옮길 수 있는 부분과 엔진이 필요한 부분 분리.
3. **셋째 주:** AI-A 최소 과제 세트와 네 비교 조건의 실행 예산 설계.
4. **넷째 주:** 오류 분류와 실행 로그를 검토해 새 방법 또는 벤치마크 기여가 있는지 판단. CHI용 사용자 연구는 도구 안정화 후 설계.

검색어: `execution-grounded code generation`, `software engineering agent verification`, `Luau code generation`, `LLM game testing`, `interactive environment benchmark`, `human AI co-creation`, `controllable world models`.

매월 공식 프로시딩·ACL Anthology·JMLR·JAIR와 Roblox 연구 발표를 확인한다. 2026년 행사명만 보고 아직 공개되지 않은 결과를 포함하지 않으며, 논문별 실제 공개일과 심사 상태를 기록한다.
