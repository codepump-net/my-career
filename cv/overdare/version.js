/*
 * 이력서 — OVERDARE Technical Product Manager 지원용
 *
 * 주소: /cv/overdare/
 * 공고: cv/data/[OVERDARE] Technical Product Manager (TPM).txt
 * 검토: docs/applications/overdare-tpm.md  ← 요건 대조표, 세 가지 질문, 점검표
 *
 * 문장은 본인이 쓴다. guide 를 지우고 content: { ko, en } 으로 바꾸면 완성 문장으로 렌더된다.
 *
 * 절 순서 — 요약 → UGC 플랫폼 실적(신설) → 경력 → 수상 → 기술(신설) → 학력 → 강의 → 논문
 *   · 실적 절을 경력 앞에 둔다. 경력 14년 이력서에서 핵심 실적을 시간순 앞에 두는 것은 표준이다.
 *     이것이 이 이력서의 카드다 — ROBLOX·ZEPETO는 실제 성과 지표로, 나머지는 기타 플랫폼 제작·운영 경험으로 간략히 정리한다.
 *   · 경력은 시간순 그대로. 순서를 흔들면 신뢰를 잃는다.
 *   · 실적·기술 절은 data.js 에 platforms / skills 가 없어 지금은 안내만 렌더된다.
 *
 * 사실은 cv/data.js 에만 둔다. 이 파일에 사실을 적으면 정본이 둘이 된다.
 * 지금 이 지원의 가장 강한 사실(UGC 플랫폼 경험, AI 제작, 11M)은 data.js 에서 관리한다.
 */

window.DOC_VERSION = {
    id: 'overdare',

    title: { ko: '이력서 | 오현석', en: 'CV | Hyunseok Oh' },

    head: {
        name: window.DOC_DATA.head.name,
        tagline: {
            ko: 'UGC 플랫폼에서 게임을 기획·개발·운영하고 AI 기반 제작 시스템을 구축해 온 Technical Director',
            en: 'Technical Director who has planned, developed, and operated games on UGC platforms and built AI-powered production systems'
        },
        target: {
            ko: '지원 분야: Technical Product Manager',
            en: 'Position: Technical Product Manager'
        },
        contact: window.DOC_DATA.head.contact
    },

    sections: [
        {
            type: 'text',
            variant: 'page-one',
            title: { ko: '요약', en: 'Summary' },
            content: {
                ko: '• 여러 UGC 플랫폼에서 게임과 콘텐츠를 기획·개발·운영\n• 시스템 및 라이브 콘텐츠 설계, 플레이 데이터 기반 개선으로 출시 7개월 만에 누적 방문 1,100만+ 달성\n• UI·전투 등 반복 개발 기능을 전용 AI Agent와 ROBLOX API 기반 공통 모듈로 설계\n• ROBLOX Studio·ZEPETO Studio 프로덕션 경험, UEFN·Meta Horizon 제작 환경 프로토타입 검증',
                en: '• Planning, development, and live operations of games and content across multiple UGC platforms\n• Designed systems and live content and improved them using player data, reaching 11M+ visits within seven months of launch\n• Designed dedicated AI agents and shared ROBLOX API modules for recurring development tasks such as UI and combat systems\n• Production experience with ROBLOX Studio and ZEPETO Studio; prototyped and evaluated creator workflows in UEFN and Meta Horizon'
            }
        },

        { type: 'list', key: 'platforms', variant: 'featured', title: { ko: 'UGC 플랫폼 실적', en: 'UGC Platform Track Record' } },

        { type: 'list', key: 'skills', variant: 'page-one', title: { ko: '핵심 기술', en: 'Core Skills' } },

        {
            type: 'experience',
            pageBreak: true,
            title: { ko: '경력', en: 'Experience' },
            include: [
                // 최근순을 유지하되, 각 회사 안에서는 OVERDARE 직무 연관도가 높은 프로젝트부터 배치한다.
                { id: 'nnn', points: ['roblox', 'ai-pipeline', 'zepeto', 'ugc'], keepTogether: true },
                { id: 'aico', points: ['choreo'] },
                { id: '1m', points: ['ifland', 'homedance', 'studio', 'metaverse'] },
                { id: 'woowa', points: ['tiing'] },
                { id: 'snow', points: ['renderer'] },
                { id: 'softpump', points: ['commando', 'duffy', 'gaze'] },
                { id: 'spring', points: ['engine', 'greatstone'] }
            ]
        },

        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } },
        { type: 'list', key: 'lecture', variant: 'compact', title: { ko: '강의', en: 'Lectures' } },
        { type: 'cite', key: 'publication', variant: 'compact', title: { ko: '논문', en: 'Publication' } }
    ]
};
