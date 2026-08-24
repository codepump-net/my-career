/*
 * 포트폴리오 덱 — 문구 정본 (KO/EN)
 *
 * 슬라이드 순서와 구성은 versions/*.js 가 정한다. 이 파일에는 문구만 둔다.
 * 마크업에는 텍스트를 직접 쓰지 않고 data-deck-key 로 연결한다.
 * en 이 비면 ko 로 대체된다. 셸 UI 문구는 slides/shared/deck.js 가 갖고 있다.
 */

window.DECK_I18N = {
    ko: {
        ui_page_title: '포트폴리오 | Hyunseok Oh',
        ui_deck_label: '포트폴리오 슬라이드',

        cover_kicker: 'PORTFOLIO',
        cover_title: '포트폴리오',
        cover_lead: '표지 문구를 작성할 자리입니다. 어떤 작업을 모았는지 한 줄로 소개합니다.',
        cover_meta: '분야 · 기간 · 최종 갱신일',
        cover_footnote: 'CONTENT PENDING — 내용 작성 예정',

        overview_kicker: '01 OVERVIEW',
        overview_title: '작업 개요',
        overview_ph_title: '전체 작업을 한눈에 보여 줄 자리',
        overview_ph_copy: '뒤이어 나올 케이스를 미리 요약합니다. 다룬 분야와 규모, 누적 지표를 함께 두면 읽는 쪽이 기준을 잡기 쉬워집니다.',

        case1_kicker: '02 CASE STUDY 01',
        case1_title: '케이스 01',
        case1_ph_title: '대표작 한 편을 자세히 풀어 놓을 자리',
        case1_ph_copy: '문제 · 접근 · 결과 세 덩어리로 씁니다. 오른쪽 영역은 스크린샷이나 지표 그래프 자리로 비워 두었습니다.',

        case2_kicker: '03 CASE STUDY 02',
        case2_title: '케이스 02',
        case2_ph_title: '두 번째 케이스 자리',
        case2_ph_copy: '앞 케이스와 다른 축을 보여 주는 작업을 고릅니다. 같은 종류를 반복하면 장수만 늘고 설득력은 늘지 않습니다.',

        case3_kicker: '04 CASE STUDY 03',
        case3_title: '케이스 03',
        case3_ph_title: '세 번째 케이스 자리',
        case3_ph_copy: '케이스가 더 필요하면 이 장을 복제하고 versions/ 의 slides 배열에 같은 id 를 추가합니다.',

        process_kicker: '05 PROCESS',
        process_title: '작업 방식',
        process_ph_title: '결과물이 아니라 과정을 설명할 자리',
        process_ph_copy: '기획에서 출시까지 어떤 순서로 일하는지, 어떤 도구를 쓰는지, 어디서 판단 근거를 얻는지 정리합니다.',

        closing_kicker: 'CONTACT',
        closing_title: '연락처를 넣을 자리',
        closing_lead: '작업 문의로 이어질 경로를 남깁니다. 이력서 덱 링크를 함께 두면 좋습니다.',
        closing_status: 'CONTENT PENDING',

        appendix_kicker: 'APPENDIX',
        appendix_title: '상세 자료',
        appendix_ph_title: '본편에 넣기엔 긴 자료를 둘 자리',
        appendix_ph_copy: '원본 링크, 상세 지표, 참고 문서를 모읍니다. 필요 없으면 slides.js 에서 이 항목을 지우거나 enabled: false 로 감춥니다.'
    },

    en: {
        ui_page_title: 'Portfolio | Hyunseok Oh',
        ui_deck_label: 'Portfolio slides',

        cover_kicker: 'PORTFOLIO',
        cover_title: 'Portfolio',
        cover_lead: 'Cover copy goes here — one line on what this collection covers.',
        cover_meta: 'Field · Period · Last updated',
        cover_footnote: 'CONTENT PENDING',

        overview_kicker: '01 OVERVIEW',
        overview_title: 'Overview',
        overview_ph_title: 'The whole body of work at a glance',
        overview_ph_copy: 'Summarise the case studies that follow. Pairing the fields and scale with cumulative numbers gives the reader a frame of reference.',

        case1_kicker: '02 CASE STUDY 01',
        case1_title: 'Case study 01',
        case1_ph_title: 'One flagship project, told in full',
        case1_ph_copy: 'Write it in three blocks: problem, approach, result. The right-hand area is reserved for a screenshot or a metrics chart.',

        case2_kicker: '03 CASE STUDY 02',
        case2_title: 'Case study 02',
        case2_ph_title: 'The second case',
        case2_ph_copy: 'Pick work that shows a different axis than the first case. Repeating the same kind of project adds slides, not credibility.',

        case3_kicker: '04 CASE STUDY 03',
        case3_title: 'Case study 03',
        case3_ph_title: 'The third case',
        case3_ph_copy: 'Need more cases? Duplicate this slide and add the same id to the slides array in versions/.',

        process_kicker: '05 PROCESS',
        process_title: 'How the work gets done',
        process_ph_title: 'Explain the process, not just the output',
        process_ph_copy: 'The order you work in from concept to launch, the tools you reach for, and where the evidence behind your decisions comes from.',

        closing_kicker: 'CONTACT',
        closing_title: 'Contact details go here',
        closing_lead: 'Leave the routes that lead to an enquiry. A link to the CV deck belongs here too.',
        closing_status: 'CONTENT PENDING',

        appendix_kicker: 'APPENDIX',
        appendix_title: 'Supporting material',
        appendix_ph_title: 'Material too long for the main deck',
        appendix_ph_copy: 'Source links, detailed metrics, reference documents. Remove the entry from slides.js or set enabled: false if you do not need it.'
    }
};;
