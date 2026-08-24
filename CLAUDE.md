# 작업 규칙 — cv-portfolio

개인 포트폴리오 정적 사이트. 상세 사양은 `docs/prd.md` 를 먼저 읽는다.

## 절대 규칙

- **`nnn-games-website/` 는 참고 전용이다. 어떤 이유로도 수정·추가·삭제하지 않는다.**
  별도 git 저장소이며 `.gitignore` 로 제외되어 이 사이트에 배포되지 않는다.
  구조를 참고할 일이 있으면 읽기만 하고, 필요한 것은 이 저장소 안에 새로 만든다.

## 지면 체계가 두 벌이다

| | A4 세로 문서 | 16:9 슬라이드 덱 |
| --- | --- | --- |
| 페이지 | `/cv`, `/coverletter` | `/portfolio` |
| 공용 코드 | `paper/shared/{paper.css, paper.js, render.js}` | `slides/shared/{deck.css, deck.js}` |
| 데이터 파일 | `<dir>/data.js` + `<dir>/<버전>/version.js` | `portfolio/data.js` + `portfolio/<버전>/version.js` |
| 본문 생성 | 렌더러가 데이터로 DOM 을 그린다 | 마크업은 모음집, 버전이 고르고 순서를 정한다 |
| **치수 단위** | **`px`** — 종이에 찍히는 크기 고정 | **`rem`** — 화면에 맞춰 배율 변동 |
| 안내 문서 | `paper/README.md` | `slides/README.md` |

**두 체계를 섞지 않는다.** 덱에 `px` 를 쓰면 인쇄에서 비율이 어긋나고, 문서에 `rem` 을 쓰면
종이 위 글자 크기가 화면에 따라 달라진다.

## 구조

```text
index.html + applications.js        메인 — 지원 버전 목록
css/site.css + js/                  메인 스타일·스크립트
paper/shared/ + cv/ + coverletter/  A4 세로 문서
slides/shared/ + portfolio/         16:9 슬라이드
tools/                              점검 스크립트 · 영상 렌더(tools/video/)
```

지원 한 건 = `applications.js` 의 항목 하나 = 이력서·자기소개서·포트폴리오 버전의 조합.

## 지켜야 할 것

- **빌드 도구가 없다.** 저장소의 파일이 곧 배포 파일이다. 전처리기·번들러를 도입하려면
  배포 방식까지 함께 바꿔야 하므로 먼저 확인을 받는다.
- **링크는 항상 상대 경로.** 프로젝트 페이지(`/cv-portfolio/`)로 배포되므로 절대 경로는
  깨진다.
- **문구는 `ko` / `en` 을 함께 채운다.** 문서는 `{ ko, en }` 객체로, 덱은 사전 키로 적는다.
- **문서의 사실은 `data.js` 에만 둔다.** 버전 파일(`versions/*.js`)은 고르고 배열하기만
  한다. 사실을 버전 파일에 복사하면 정본이 둘이 되어 갱신 누락이 생긴다.
- **버전 하나 = 폴더 하나.** `<문서>/<버전>/{index.html, version.js}` 이고, `version.js` 의
  `id` 는 폴더명과 같아야 한다. `id` 로 기본판 여부를 판단해 `noindex` 를 붙인다.
- **`<문서>/index.html` 은 버전 목록 페이지다.** 문서 내용을 여기에 넣지 않는다.
- **문서의 `@media print` 에서 글자 크기·여백을 바꾸지 않는다.** 화면과 인쇄가 다른
  밀도로 흐르면 화면 장수와 PDF 장수가 어긋난다.
- **렌더러가 새 블록을 만들면 `data-doc-block` 을 붙인다.** 이 속성이 화면 페이지 분할의
  단위다. 빠뜨리면 그 블록이 화면에서 누락된다. 뒤 블록과 떨어지면 안 되는 머리글에는
  `data-doc-keep` 을 함께 붙인다.
- **슬라이드를 추가하면 두 곳을 함께 고친다.** `index.html` 의 `data-slide` 와 버전 파일의
  `slides` id 가 맞아야 한다. 배열 순서가 곧 슬라이드 순서이며 PDF 순서다.
- **문장은 본인이 쓴다.** 버전 파일의 빈 자리에는 `{ guide: [...] }` 로 무엇을 쓰면 좋을지만
  남긴다. 완성 문장을 대신 지어 넣지 않는다.
- **지원을 추가하면 `applications.js` 에도 항목을 넣는다.** 메인 페이지가 이 목록으로 카드를
  그린다. 이 목록은 공개되므로 지원처끼리 서로의 문서가 보인다는 점을 전제한다.
- **공용 폴더 변경은 그 체계를 쓰는 모든 페이지에 적용된다.** 한 페이지에만 필요한 스타일은
  해당 폴더에 별도 CSS 를 두고 공용 CSS 다음에 링크한다.
- **문서의 화면 페이지 분할은 미리보기다.** 인쇄 결과가 기준이다. 둘이 어긋나면 화면 쪽을 고친다.

## 변경 후 확인

```bash
node tools/check.js                                            # 참조·id·i18n 키 정합성
powershell -ExecutionPolicy Bypass -File tools\print-pages.ps1  # 인쇄 CSS 를 건드렸을 때
```

`check.js` 는 사전 정의의 들여쓰기 규칙에 기대고 있다. 사전 구조를 바꾸면 이 스크립트도
함께 손본다.

## 참고

- 문서 작성 규칙: `paper/README.md`
- 슬라이드 작성 규칙: `slides/README.md`
- 배포 방법·기술 선택 근거·결정 기록: `docs/prd.md`
