# cv-portfolio

아주대학교 디지털미디어학과 교수 지원용 CV · 커버레터 · 포트폴리오를 웹에서 열람하고 PDF로 추출하는 정적 사이트. 특정 공고에 종속되지 않는 범용 기본판을 관리한다.

- 공개 주소: <https://codepump-net.github.io/cv-portfolio/>
- 상세 사양: [`docs/prd.md`](docs/prd.md)

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 메인 — 교수 지원 문서, 접힌 지원 아카이브, 소개, 연락처 |
| `/cv/` `/coverletter/` `/portfolio/` | 각 문서의 버전 목록 (링크만) |
| `/cv/default/` | 교수 지원 CV · A4 세로 문서 |
| `/cv/overdare/` | 종료된 OVERDARE 지원 CV 아카이브 |
| `/coverletter/default/` | 교수 지원 커버레터 · 작성 안내 |
| `/portfolio/default/` | 연구·교육·산업 포트폴리오 · 16:9 슬라이드 |

**버전 하나가 폴더 하나다.** `<문서>/index.html` 은 목록만 보여 주고, 실제 내용은
`<문서>/<버전>/` 에 있다.

제출용 문서 두 편은 내용 길이에 따라 브라우저가 페이지를 나누고, 포트폴리오는 슬라이드
1장이 PDF 1페이지가 된다. 세 페이지 모두 상단 PDF 버튼으로 전체를 내보낸다.

CV는 기존 사실을 학력·연구·강의 중심으로 재배치했다. 커버레터는 본인 작성을 위한 안내 5개 절,
포트폴리오는 기존 실적과 보완할 증빙·계획을 정리한 8장 초안이다.
[교수 지원 정리 및 남은 항목](docs/applications/ajou-faculty.md)을 참고한다.

박사 졸업과 향후 교수 지원을 위한 Roblox 기반 Computer Graphics·AI 활용·MIS 연구는
[`research/`](research/README.md)에서 관리한다. [연구 계획서](research/research-plan.md)에
핵심 과제, 실험 설계, 3년 일정과 논문 실적 관리 기준을 정리했다.
[세 분야 조사 문서](research/literature/README.md)에서 주요 학술지·학회와 최신 연구동향을 확인할 수 있다.

OVERDARE 지원은 **3차 면접 불합격으로 종료**했다. [아카이브 기록](docs/archive/overdare/README.md)에
준비 자료와 당시 데이터 스냅샷을 보존했다. 기존 문서 주소는 유지하고 웹 목록에서 접어 표시한다.

## 로컬에서 보기

빌드 단계가 없다. 정적 서버로 열고 새로고침하면 된다.

```bash
npx serve .          # 또는  python -m http.server 8000
```

## 점검

```bash
node tools/check.js                                            # 참조·슬라이드 id·i18n 키
powershell -ExecutionPolicy Bypass -File tools\print-pages.ps1  # PDF 용지·페이지 수
```

## 배포

`main` 브랜치에 push 하면 GitHub Pages 가 저장소 루트를 그대로 게시한다.
최초 설정과 커스텀 도메인은 [`docs/prd.md` 11절](docs/prd.md#11-배포) 참고.

## 구조

```text
index.html            메인 — 지원 버전 목록
applications.js       지원 목록 (한 건 = 이력서·자기소개서·포트폴리오 버전의 조합)
css/ js/              메인 페이지 스타일 · 스크립트
paper/shared/         A4 세로 문서 공용 셸        → paper/README.md
cv/ coverletter/        index.html(목록) + data.js(정본) + <버전>/(문서)
slides/shared/        16:9 슬라이드 공용 셸       → slides/README.md
portfolio/              index.html(목록) + data.js + <버전>/(덱)
tools/                점검 스크립트
docs/prd.md           제품 요구사항 문서
research/             박사 졸업·교수 지원을 위한 연구 계획과 기록
nnn-games-website/    참고용 원본 저장소 (수정 금지, 배포 제외)
```
