/* Roblox instructor evaluation. Based on the OVERDARE submission; career facts remain in cv/data.js. */

window.DOC_VERSION = {
    id: 'roblox',

    title: { ko: '로블록스 강사 평가용 이력서 | 오현석', en: 'Roblox Instructor CV | Hyunseok Oh' },

    head: {
        name: window.DOC_DATA.head.name,
        target: {
            ko: '로블록스 전문 교육 강사 평가용 · 이력 소개',
            en: 'Roblox instructor evaluation · Professional profile'
        },
        contact: window.DOC_DATA.head.contact
    },

    sections: [
        {
            type: 'text',
            variant: 'page-one',
            title: { ko: '요약', en: 'Summary' },
            content: {
                ko: '• ROBLOX에서 다수의 게임과 UGC 콘텐츠 제작, 운영\n• 시스템 및 라이브 콘텐츠 설계, 플레이 데이터 기반 개선으로 Tower Flood Race 누적 방문 1,144.9만 달성(2026.10.27 기준)\n• UI·전투 등 반복 개발 기능을 전용 AI Agent와 ROBLOX API 기반 공통 모듈로 설계\n• ROBLOX Studio·ZEPETO Studio 프로덕션 경험, UEFN·Meta Horizon 제작 환경 프로토타입 검증',
                en: '• Creation and operation of multiple games and UGC content on ROBLOX\n• Designed systems and live content and improved them using player data, reaching 11.4M visits for Tower Flood Race as of October 27, 2026\n• Designed dedicated AI agents and shared ROBLOX API modules for recurring development tasks such as UI and combat systems\n• Production experience with ROBLOX Studio and ZEPETO Studio; prototyped and evaluated creator workflows in UEFN and Meta Horizon'
            }
        },

        {
            type: 'experience',
            key: 'experienceBrief',
            title: { ko: '경력', en: 'Experience' },
            include: [
                { id: 'ajou', keepTogether: true },
                { id: 'nnn', keepTogether: true },
                { id: 'aico', keepTogether: true },
                { id: '1m', keepTogether: true },
                { id: 'woowa', keepTogether: true },
                { id: 'snow', keepTogether: true },
                { id: 'softpump', keepTogether: true },
                { id: 'spring', keepTogether: true }
            ]
        },

        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'list', key: 'platforms', variant: 'featured', title: { ko: 'UGC 플랫폼 실적', en: 'UGC Platform Track Record' } },
        { type: 'list', key: 'skills', title: { ko: '핵심 기술', en: 'Core Skills' } },
        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } },
        { type: 'list', key: 'lecture', variant: 'compact', title: { ko: '강의', en: 'Lectures' } },
        { type: 'cite', key: 'publication', variant: 'compact', title: { ko: '논문', en: 'Publication' } }
    ]
};
