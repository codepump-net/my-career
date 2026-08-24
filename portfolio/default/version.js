/*
 * 포트폴리오 덱 — 기본판
 *
 * 주소: /portfolio/   (또는 /portfolio/?v=default)
 *
 * slides 배열의 **순서가 곧 슬라이드 순서**다. 마크업 순서는 보지 않는다.
 * 버전에 없는 id 는 DOM 에서 제거되어 화면에도 PDF 에도 나오지 않는다.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 지원처별 버전은 이 파일을 복사해 versions/<이름>.js 로 두고 id 를 바꾼다.
 *   예: versions/overdare.js  ->  /portfolio/?v=overdare
 * 케이스를 골라 보여 주려면 slides 에서 해당 항목만 남기거나 순서를 바꾼다.
 * 마크업(index.html)은 모든 슬라이드를 담고 있는 모음집이라 건드리지 않는다.
 *
 * 항목 옵션
 *   { id: 'case1' }                  마크업의 data-slide 와 짝을 이룬다
 *   { id: 'case1', enabled: false }  아직 공개하지 않을 장. ?preview=all 로 확인
 *   { id: 'appendix-links', appendix: true }  부록. 본편과 번호를 따로 센다
 * ───────────────────────────────────────────────────────────────────────── */

window.DECK_VERSION = {
    id: 'default',

    title: { ko: '포트폴리오 | 오현석', en: 'Portfolio | Hyunseok Oh' },

    slides: [
        { id: 'cover' },
        { id: 'overview' },
        { id: 'case1' },
        { id: 'case2' },
        { id: 'case3' },
        { id: 'process' },
        { id: 'closing' },

        // 부록은 본편과 번호를 따로 센다. 진행 바는 본편 마지막에서 이미 100% 가 된다.
        { id: 'appendix-links', appendix: true }
    ]
};
