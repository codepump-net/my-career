/*
 * 지원 버전 목록 — 메인 페이지가 이 배열로 카드를 그린다.
 *
 * 한 항목이 지원 한 건이다. 이력서 · 자기소개서 · 포트폴리오 세 문서의 버전을 묶어
 * 하나로 관리한다. 세 문서는 각자 독립된 버전 체계를 갖고 있으므로, 여기서는
 * "이 지원에서는 어느 버전을 쓰는가"만 가리킨다.
 *
 * 새 지원을 추가할 때
 *   1. cv/versions/<이름>.js, coverletter/versions/<이름>.js 를 만든다.
 *      (포트폴리오는 당분간 default 를 공유해도 된다)
 *   2. 아래 배열에 항목을 추가한다.
 *   3. `node tools/check.js` 가 가리키는 버전 파일이 실제로 있는지 확인해 준다.
 *
 * 항목 필드
 *   id            이 지원의 식별자 (카드 앵커로 쓰인다)
 *   label         지원처 또는 분야 이름
 *   role          지원 직무. 없으면 표시하지 않는다
 *   note          카드에 붙는 한 줄 설명
 *   status        상태 배지. 없으면 표시하지 않는다
 *   cv            cv/versions/ 의 파일명(확장자 제외)
 *   coverletter   coverletter/versions/ 의 파일명
 *   portfolio     portfolio/versions/ 의 파일명
 *
 * 주의 — 이 목록은 메인 페이지에 그대로 공개된다. 지원처끼리 서로의 문서를 볼 수 있다.
 * 특정 지원을 감추려면 항목을 빼고 링크만 직접 전달한다(문서 자체는 여전히 열린다).
 */

window.APPLICATIONS = [
    {
        id: 'default',
        label: { ko: '기본판', en: 'Default' },
        note: {
            ko: '지원처를 정하지 않은 표준 문서. 새 버전을 만들 때 출발점으로 쓴다.',
            en: 'The standard set, not aimed at any particular employer. The starting point for new versions.'
        },
        cv: 'default',
        coverletter: 'default',
        portfolio: 'default'
    },
    {
        id: 'overdare',
        label: { ko: 'OVERDARE', en: 'OVERDARE' },
        role: { ko: 'Technical Product Manager', en: 'Technical Product Manager' },
        status: { ko: '작성 중', en: 'Drafting' },
        note: {
            ko: '크래프톤·네이버제트 합작 UGC 플랫폼. ROBLOX·ZEPETO 라이브 실적, UEFN·Horizon 플랫폼 검증 프로토타입, AI 에이전트 제작 파이프라인을 앞세운다.',
            en: 'KRAFTON × NAVER Z UGC platform. Leads with live titles on ROBLOX and ZEPETO, platform-validation prototypes on UEFN and Horizon, and the AI-agent production pipeline.'
        },
        cv: 'overdare',
        coverletter: 'overdare',
        portfolio: 'overdare'
    },
    {
        id: 'research',
        label: { ko: '연구 · 교육', en: 'Research & teaching' },
        status: { ko: '본보기', en: 'Template' },
        note: {
            ko: '논문·강의·학력을 앞에 두고 경력을 연구 비중 순으로 고른 배치 예시.',
            en: 'An example arrangement: publication, lectures, and education first, with experience filtered by research relevance.'
        },
        cv: 'research',
        coverletter: 'default',
        portfolio: 'default'
    }
];
