# 1. Computer Graphics: 주요 학술지·학회와 Roblox 연계 연구동향

조사 기준일: **2026-09-19** · 조사 기간: **2025~2026년 공개 연구 중심** · 단계: **1차 문헌 지도**  
[세 분야 조사 안내](README.md) · [AI 활용](ai-applications.md) · [MIS](mis.md)

## 1. 분야의 범위와 핵심 판단

이 분야에서는 3D 형상·재질·애니메이션·물리·렌더링의 표현과 계산 방법을 연구한다. Roblox를 대상으로 하더라도 핵심 기여는 다른 3D 제작·실행 환경에서 설명 가능한 알고리즘, 표현 또는 평가 방법이어야 한다.

이번에 검토한 자료에서 주목할 흐름은 **전체 물체 생성에서 편집 가능한 부품 생성으로의 확장**, **정적 외형을 넘어 동작과 기하 특성을 고려하는 처리**, **게임 엔진과 생성형 영상의 결합**이다. 이는 선정 자료를 종합한 해석이며 분야 전체의 계량적 추세를 측정한 결과는 아니다.

우선 읽을 최고 수준의 대표 출판 경로는 **ACM TOG와 SIGGRAPH/SIGGRAPH Asia Technical Papers**로 설정한다. **Computer Graphics Forum·Eurographics**, **IEEE TVCG**, **SGP·SCA·HPG**는 주제에 따라 함께 읽을 주요 경로다. 아래 순서는 이번 연구의 조사 우선순위이며 공식 통합 순위가 아니다.

## 2. 주요 학술지

| 학술지 | 위상 판단·공식 근거 | Roblox 연계 시 읽을 주제 | 본 연구에서의 역할 |
| --- | --- | --- | --- |
| **ACM Transactions on Graphics — TOG** | SIGGRAPH Technical Papers의 저널 트랙 출판처. [공식 출판 설명](https://s2026.siggraph.org/program/technical-papers/) | 생성형 3D, 기하처리, 애니메이션, 물리, 렌더링 | 최우선 문헌 조사 및 장기 투고 지향점 |
| **Computer Graphics Forum — CGF** | Eurographics와 Wiley가 발행하는 공식 학술지. [학회 안내](https://www.eg.org/wp/eurographics-publications/cgf/) | 메시·형상 처리, 렌더링, 시뮬레이션 | 기하 최적화·실시간 실행 연구의 핵심 문헌 |
| **IEEE Transactions on Visualization and Computer Graphics — TVCG** | 그래픽스·시각화·VR/AR·상호작용을 포괄하는 저널. [IEEE 범위](https://www.computer.org/digital-library/journals/tg/cfp-ieee-transactions-on-visualization-computer-graphics) | 몰입형 상호작용, 아바타, 시각화, 시스템 평가 | Roblox 경험·상호작용을 포함하는 연구 후보 |

TOG 게재와 SIGGRAPH 발표를 동일 연구의 별도 두 실적으로 계산하지 않는다. 반대로 SIGGRAPH **Conference track** 논문을 모두 TOG 논문으로 표기해서도 안 된다. 2026년 공식 안내는 Journal track과 Conference track의 출판처를 구분한다. [SIGGRAPH 출판 체계](https://s2026.siggraph.org/program/technical-papers/).

## 3. 주요 학회와 전문 학술대회

| 학회·학술대회 | 조사 위치 | 중점 주제와 활용 | 출판 형태 확인 사항 |
| --- | --- | --- | --- |
| **SIGGRAPH / SIGGRAPH Asia Technical Papers** | 그래픽스 전반 최우선 | 형상·생성·물리·렌더링의 새 방법 | Journal/Conference 구분. [SIGGRAPH 2026](https://s2026.siggraph.org/program/technical-papers/), [SIGGRAPH Asia 2025 공식 안내](https://asia.siggraph.org/2025/images/pdfs/SA25-TPTCP.pdf) |
| **Eurographics** | 그래픽스 전반 핵심 | 기하·렌더링·애니메이션 | Full Papers와 Short Papers 구분. [2026 Full Papers 안내](https://eg2026.github.io/call_for_full_papers/) |
| **Symposium on Geometry Processing — SGP** | 기하처리 전문 우선 | 단순화, 재메싱, 변형, 신경 형상 표현, 데이터셋 | [2026 CFP](https://sgp26.org/submit/)와 실제 서지 확인 |
| **ACM SIGGRAPH/Eurographics Symposium on Computer Animation — SCA** | 애니메이션 전문 우선 | 캐릭터 제어·동작·시뮬레이션 | 기존 SCA 연구 경력과 연결. [공식 사이트](https://computeranimation.org/) |
| **High-Performance Graphics — HPG** | 성능 연구 전문 우선 | GPU 계산, 렌더링 시스템, 효율적 구현 | 병목 분석과 알고리즘·시스템 기여가 있을 때. [2026 공식 사이트](https://www.highperformancegraphics.org/) |
| **CVPR** | 인접 분야 최상위 문헌 | 3D 복원·생성·시각 표현 학습 | 그래픽스 학회와 별개인 비전 분야. [2026 범위](https://cvpr.thecvf.com/Conferences/2026/CallForPapers) |

SGP·SCA·HPG는 전문 분야 적합성 때문에 선정했으며 SIGGRAPH와 같은 범위의 종합 학술대회라는 뜻은 아니다. 학회명만으로 저널 게재 여부를 판단하지 않고 개별 DOI·프로시딩을 확인한다.

## 4. 최근 대표 연구와 연결 가능성

아래에서 **직접**은 Roblox의 연구·자료, **전이 후보**는 다른 환경에서 개발되어 Roblox 적용을 새로 검증해야 하는 연구를 뜻한다. 요약은 공개 초록·공식 설명 중심이며 원문 전체 실험 재검증은 후속 단계다.

| ID | 문헌·연도·상태 | 확인한 기여 | Roblox 연결 및 남은 질문 |
| --- | --- | --- | --- |
| CG-01 | **CubePart: An Open-Vocabulary Part-Controllable 3D Generator**, Zhu 외, 2026. [논문](https://arxiv.org/abs/2605.28763), [SIGGRAPH 2026 공식 서지](https://about.roblox.com/publications/cubepart-open-vocabulary-part-controllable-3d-generator) | 사용자 지정 부품 스키마에 맞는 3D 메시 생성과 엔진 활용을 제시 | **직접.** 부품 생성 이후 관절·접촉 기능을 검증하는 문제. 부품 제어 자체는 이미 선행 기여이므로 후속 연구의 신규성으로 재주장하지 않는다 |
| CG-02 | **Controlling Quadric Error Simplification with Line Quadrics**, Liu·Rahimzadeh·Zordan, 2025. CGF/SGP. [DOI](https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.70184), [공식 설명](https://about.roblox.com/publications/controlling-quadric-error-simplification-line-quadrics) | QEM 기반 단순화에서 정점 분포와 특징 보존 등 기하 특성을 제어 | **직접 관련.** 같은 삼각형 예산에서 부품 경계·관절 주변·접촉면을 얼마나 보존해야 하는가? |
| CG-03 | **Structured 3D Latents for Scalable and Versatile 3D Generation — TRELLIS**, Xiang 외, CVPR 2025. [공식 논문](https://openaccess.thecvf.com/content/CVPR2025/papers/Xiang_Structured_3D_Latents_for_Scalable_and_Versatile_3D_Generation_CVPR_2025_paper.pdf) | 구조화된 잠재 표현으로 여러 3D 출력 표현과 편집을 지원 | **전이 후보.** 출력이 보기 좋은가와 메시·재질·충돌·편집 가능성을 갖추는가는 별도 평가가 필요 |
| CG-04 | **OmniPart: Part-Aware 3D Generation with Semantic Decoupling and Structural Cohesion**, Yang 외, 2025. [저자 프로젝트](https://omnipart.github.io/), [SIGGRAPH Asia Conference Papers DOI](https://doi.org/10.1145/3757377.3763872) | 부품 구조 계획과 부품별 잠재 생성으로 제어 가능한 콘텐츠를 생성 | **전이 후보.** CubePart와 입력 조건·부품 수·주석 비용을 맞춘 기능 비교가 가능한가? |
| CG-05 | **Introducing the Roblox Hybrid Architecture: Democratizing Photorealistic, Multiplayer Gaming**, Roblox, 2026-04. [공식 기술 발표](https://about.roblox.com/newsroom/2026/04/roblox-reality-hybrid-architecture-democratizing-photorealistic-multiplayer-gaming) | 게임 엔진·클라우드와 영상 월드 모델을 결합하는 방향 제시 | **직접·산업 자료.** 상태 일관성과 영상 품질을 함께 평가하는 문제. 동료심사 논문이나 모든 기능의 일반 공개를 뜻하지 않는다 |

CG-04의 프로젝트 페이지는 arXiv 서지를 제공하고 출판사 검색 결과는 Conference Papers 서지를 제공한다. DOI 페이지의 본문 접근은 이번 조사에서 제한되었으므로 세부 실험과 최종 페이지 정보는 정독 단계에 보완한다. CG-05는 산업 연구 방향을 보여주는 자료로 사용하고 검증된 성능 수치의 근거로 사용하지 않는다.

## 5. 연구동향별 해석

### 5.1 생성 결과의 구조와 편집 가능성

CG-01·03·04를 함께 보면 연구 대상이 하나의 외형을 만드는 문제에서 부품과 출력 표현을 제어하는 문제로 확장되고 있다. 이로부터 **“생성 결과를 얼마나 적은 수정으로 동작 가능한 자산으로 바꿀 수 있는가?”**를 후속 질문으로 제안한다. 이는 Roblox에서의 효과가 입증된 결론이 아니다.

비교할 축은 외형 품질, 부품 스키마 준수, 연결 관계, 재질 유지, 가져오기 성공률, 수동 수정 시간이다. 생성 모델 간 입력 정보량과 계산 예산이 다르면 동일 조건 결과와 실제 사용 흐름의 결과를 나누어 보고한다.

### 5.2 기하 오차에서 기능 오차로 확장

CG-02는 단순화의 제어 범위를 넓히는 직접적인 출발점이다. 후속 연구에서는 표면 오차가 작아도 문이 걸리거나 바퀴가 관통하는 사례를 다룬다. 관절·접촉 제약을 추가하는 방법이 단순 경계 보존보다 유리한지를 검증해야 한다.

시각 메시와 충돌 대리 형상의 변경을 분리하고, 원본·QEM·Line Quadrics·기능 가중치 방법을 같은 예산에서 비교한다. Roblox 내 FPS만으로 기하 알고리즘의 성능을 설명하지 않고 외부 평가기의 기하·동작 지표를 함께 사용한다.

### 5.3 생성형 영상과 실행 상태의 결합

CG-05에서 착안한 질문은 **“동일한 게임 상태를 여러 시점·사용자에게 보여줄 때 시각 결과가 얼마나 일관적인가?”**이다. 객체 정체성, 가림 이후 복원, 동작 지연, 상태–영상 불일치 등을 측정할 수 있다. 다만 해당 아키텍처의 연구용 접근 가능성은 확인되지 않았으므로 지금의 박사 핵심 과제로 확정하지 않는다.

## 6. 초기 연구 후보

다음의 우선순위는 현재 경력과 기존 계획을 고려한 제안이다. 세 분야 전체의 최종 우선순위는 초기 파일럿 이후 결정한다.

| 후보 | 연구 질문·기여 후보 | 최소 비교와 지표 | 시작 조건·주요 한계 | 문헌·투고 분야 |
| --- | --- | --- | --- | --- |
| **CG-A · 우선 검토** | 기능 중요도를 반영한 단순화가 같은 예산에서 동작을 더 잘 보존하는가? | QEM·Line Quadrics·경계 보존 대비 기능 성공률, 표면 오차, 처리 시간 | 직접 제작 자산으로 시작 가능. 가중치 수작업·충돌 설정의 영향을 분리해야 함 | CG-02, SGP·CGF; 일반화가 강하면 TOG |
| **CG-B** | 생성 자산의 관절·접촉 실패를 최소 수정으로 보정할 수 있는가? | 고정 템플릿·규칙 보정 대비 성공률, 변경량, 개입 시간 | 생성 모델 접근·라이선스·주석 비용 확인 | CG-01·04, SCA·SIGGRAPH |
| **CG-C · 탐색** | 생성형 렌더링에서 게임 상태·사용자 시점 간 일관성을 어떻게 평가할 것인가? | 고정 시나리오의 상태–영상 오차, 시간 일관성, 지연 | 모델 접근이 없으면 재현 가능한 대체 환경으로 범위 변경 | CG-05, HPG·TVCG·SIGGRAPH |

CG-A와 CG-B는 [기존 연구 계획서](../research-plan.md)의 기능 검증·보정과 기능 보존 단순화를 재검토하는 데 활용한다. 높은 학회에 맞추기 위해 범위를 무리하게 넓히기보다 명확한 한 질문과 강한 비교 실험부터 확보한다.

## 7. 정독·추적 계획

1. **첫째 주:** CG-02의 비용 함수·비교군·특징 보존 방식 정독. CG-01의 부품 조건과 실제 동작 데모가 보장하는 범위 정리.
2. **둘째 주:** CG-03·04를 읽고 출력 표현·입력 조건·학습 데이터·공개 구현 차이를 표로 작성.
3. **셋째 주:** 문·바퀴·서랍 자산의 최소 실험을 설계하고 동작 실패가 일반 단순화에서 재현되는지 확인.
4. **넷째 주:** 최근 SIGGRAPH·SGP·SCA 문헌의 인용·피인용을 따라 신규성 비교표 작성. 원문 미확인 항목 보완.

검색어: `part-controllable 3D generation`, `articulated object generation`, `function-preserving mesh simplification`, `contact-aware geometry processing`, `real-time animation control`, `world model rendering consistency`.

추적 경로는 위의 공식 학술지·프로시딩과 [Roblox Publications](https://about.roblox.com/publications)이다. 매월 새 논문의 서지·발표 상태·공개 코드·실험 가능성을 갱신하고, 프로그램에만 나온 제목은 결과가 검증된 논문으로 취급하지 않는다.
