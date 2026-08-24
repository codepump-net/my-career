/*
 * 자기소개서 — 기본판
 *
 * 주소: /coverletter/   (또는 /coverletter/?v=default)
 *
 * 문장은 본인이 직접 쓴다. 이 파일에는 어디에 무엇을 쓰면 좋을지만 적혀 있다.
 * paragraphs 의 { guide: [...] } 를 { text: { ko: '…', en: '…' } } 로 바꾸면
 * 완성 문장으로 렌더된다. 남아 있는 안내 블록 수는 `node tools/check.js` 가 세어 준다.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 지원처별 버전은 이 파일을 복사해 versions/<회사>.js 로 두고 id 를 바꾼다.
 *   예: versions/nexon.js  ->  /coverletter/?v=nexon
 * 기본판이 아닌 버전은 열람 시 자동으로 noindex 가 붙는다(paper.js).
 *
 * 절 정의
 *   { type: 'prose',   title: {ko,en}, paragraphs: [ … ] }
 *   { type: 'closing', paragraphs: [ … ], sign: {ko,en} }   제목 없이 맺음말만
 * 절 번호(01, 02 …)는 제목이 있는 절에 자동으로 매겨진다.
 * ───────────────────────────────────────────────────────────────────────── */

window.DOC_VERSION = {
    id: 'default',

    title: { ko: '자기소개서 | 오현석', en: 'Cover letter | Hyunseok Oh' },

    head: {
        name: { ko: '자기소개서', en: 'Cover letter' },
        tagline: {
            ko: '지원 대상과 한 줄 메시지를 넣을 자리입니다.',
            en: 'Who this is addressed to, and the one-line message.'
        },
        contact: [
            { text: { ko: '지원 직무 — 작성 예정', en: 'Role applied for — pending' } },
            { text: window.DOC_DATA.head.name },
            { text: { ko: '작성일 — 작성 예정', en: 'Date — pending' } }
        ]
    },

    sections: [
        {
            type: 'prose',
            title: { ko: '지원 동기', en: 'Why this role' },
            paragraphs: [
                {
                    guide: [
                        '왜 이 회사, 왜 이 자리인지에 답한다. 일반론 대신 구체적인 근거가 필요하다.',
                        '그 회사가 지금 풀고 있는 문제를 하나 짚고, 내 경험이 어디서 그 문제와 만나는지 잇는다.',
                        '회사 소개를 되풀이하지 않는다. 읽는 사람이 더 잘 안다.'
                    ]
                }
            ]
        },
        {
            type: 'prose',
            title: { ko: '강점과 문제 해결', en: 'Strengths and problem solving' },
            paragraphs: [
                {
                    guide: [
                        '가장 어려웠던 문제 하나만 골라 깊게 쓴다. 여러 개를 얕게 쓰면 둘 다 남지 않는다.',
                        '상황 → 판단 → 행동 → 결과 순으로. 이 중 판단이 핵심이다. 무엇을 포기했고 왜 그 기준을 골랐는지가 없으면 작업 나열이 된다.',
                        '강점을 형용사로 주장하지 말고 사례로 보이게 한다.',
                        '숫자를 최소 하나 넣는다 — 팀 규모, 기간, 지표 중.'
                    ]
                }
            ]
        },
        {
            type: 'prose',
            title: { ko: '협업과 성장', en: 'Collaboration and growth' },
            paragraphs: [
                {
                    guide: [
                        '팀에서 맡았던 역할과, 혼자 일할 때와 무엇이 달라졌는지.',
                        '의견이 갈렸던 장면 하나. 누가 옳았는지가 아니라 어떻게 결론을 냈는지가 읽히는 부분이다.',
                        '실패에서 바꾼 습관 하나. 실패를 감추면 이 절 전체가 공허해진다.'
                    ]
                }
            ]
        },
        {
            type: 'prose',
            title: { ko: '입사 후 계획', en: 'After joining' },
            paragraphs: [
                {
                    guide: [
                        '3개월 / 1년으로 나눈다. 기간이 없으면 포부는 선언으로 읽힌다.',
                        '무엇을 만들겠다보다 무엇을 판단할 수 있게 만들겠다로 쓰면 구체적이다.',
                        '지원 전에 그 회사의 제품을 실제로 써 보고 쓴다.'
                    ]
                }
            ]
        },
        {
            type: 'closing',
            paragraphs: [
                {
                    guide: [
                        '한 문장으로 본인의 위치를 요약한다.',
                        '이력서·포트폴리오 링크를 남겨 읽는 쪽이 다음 장을 찾기 쉽게 한다.',
                        '두세 문장이면 충분하다.'
                    ]
                }
            ],
            sign: window.DOC_DATA.sign
        }
    ]
};
