/*
 * 이력서 — 연구·교육 지원용 (본보기)
 *
 * 주소: /cv/?v=research
 *
 * 기본판과 같은 사실을 쓰되 배치를 바꾼 예다. 새 버전을 만들 때 이 파일을 참고한다.
 *   - 논문과 강의를 경력보다 앞에 둔다
 *   - 경력은 연구·그래픽스 비중이 큰 곳만 고르고, 나머지는 세부 항목을 접어 분량을 줄인다
 *   - 학력을 위로 올린다
 *
 * 기본판이 아니므로 열람 시 자동으로 noindex 가 붙는다(paper.js). 메인 페이지에도
 * 링크하지 않는다 — 링크를 직접 받은 사람만 본다.
 *
 * TODO: 요약 문단은 아직 정본을 그대로 쓴다. 연구 지원용으로 다시 쓰려면 아래처럼
 *       content 를 넣어 덮어쓴다(정본 data.js 는 건드리지 않는다).
 *
 *   { type: 'text', title: { ko: '요약', en: 'Summary' },
 *     content: { ko: '연구 중심으로 다시 쓴 문단…', en: '…' } },
 */

window.DOC_VERSION = {
    id: 'research',

    title: { ko: '이력서(연구) | 오현석', en: 'CV (Research) | Hyunseok Oh' },

    head: {
        name: window.DOC_DATA.head.name,
        tagline: window.DOC_DATA.tagline,
        contact: window.DOC_DATA.head.contact
    },

    sections: [
        { type: 'text', key: 'summary', title: { ko: '요약', en: 'Summary' } },
        { type: 'cite', key: 'publication', title: { ko: '논문', en: 'Publication' } },
        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'list', key: 'lecture', title: { ko: '강의', en: 'Lectures' } },
        {
            type: 'experience',
            title: { ko: '연구 관련 경력', en: 'Research-related experience' },
            include: [
                // 시선 추적 연구와 그래픽스 엔진 경력을 앞세운다.
                { id: 'softpump', points: ['gaze', 'commando'] },
                { id: 'snow' },
                { id: '1m', points: ['ifland', 'metaverse'] },
                // 최근 이력은 맥락만 남기고 세부 항목은 접는다.
                { id: 'nnn', subs: false },
                { id: 'aico', subs: false }
            ]
        },
        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } }
    ]
};
