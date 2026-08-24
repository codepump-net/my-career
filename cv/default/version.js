/*
 * 이력서 — 기본판
 *
 * 원본 PDF(cv/data/오현석_CV.pdf)의 절 구성을 그대로 따른다.
 * 메인 페이지에서 링크되는 유일한 버전이며, 검색에도 이 버전만 노출된다.
 *
 * 주소: /cv/          (또는 /cv/?v=default)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 새 버전을 만들려면 이 파일을 복사해 versions/<이름>.js 로 두고 id 를 바꾼다.
 * 사실은 여기에 적지 않는다 — data.js 에만 두고 여기서는 고르고 배열하기만 한다.
 *
 * 절 정의에 쓸 수 있는 것
 *   { type: 'text',       key: 'summary', title: {…} }        정본 문단
 *   { type: 'text',       content: {ko,en}, title: {…} }      버전 전용 문단(정본을 덮어씀)
 *   { type: 'experience', title: {…} }                        경력 전체
 *   { type: 'experience', title: {…}, include: [ … ] }        고른 경력만, 적은 순서대로
 *   { type: 'list',       key: 'education', title: {…} }
 *   { type: 'cite',       key: 'publication', title: {…} }
 *   { type: 'closing',    paragraphs: [ … ], sign: {…} }      제목 없이 맺음말만
 *
 * include 항목은 id 문자열이거나 다음 형태다.
 *   { id: '1m' }                       그 경력 전체
 *   { id: '1m', points: ['ifland'] }   고른 성과만
 *   { id: '1m', pointLimit: 2 }        앞에서 2건만
 *   { id: '1m', subs: false }          세부 항목 감춤 (분량을 줄일 때)
 *
 * 절 번호(01, 02 …)는 제목이 있는 절에 자동으로 매겨진다. 직접 적지 않는다.
 * ───────────────────────────────────────────────────────────────────────── */

window.DOC_VERSION = {
    id: 'default',

    title: { ko: '이력서 | 오현석', en: 'CV | Hyunseok Oh' },

    head: {
        name: window.DOC_DATA.head.name,
        tagline: window.DOC_DATA.tagline,
        contact: window.DOC_DATA.head.contact
    },

    sections: [
        { type: 'text', key: 'summary', title: { ko: '요약', en: 'Summary' } },
        { type: 'experience', title: { ko: '경력', en: 'Experience' } },
        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'list', key: 'lecture', title: { ko: '강의', en: 'Lectures' } },
        { type: 'cite', key: 'publication', title: { ko: '논문', en: 'Publication' } },
        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } }
    ]
};
