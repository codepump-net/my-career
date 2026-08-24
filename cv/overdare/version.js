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
 *     이것이 이 이력서의 카드다 — 4개 플랫폼 × (프로젝트 / 시기 / 지표 / AI 기반 여부).
 *   · 경력은 시간순 그대로. 순서를 흔들면 신뢰를 잃는다.
 *   · 실적·기술 절은 data.js 에 platforms / skills 가 없어 지금은 안내만 렌더된다.
 *
 * 사실은 cv/data.js 에만 둔다. 이 파일에 사실을 적으면 정본이 둘이 된다.
 * 지금 이 지원의 가장 강한 사실(4개 플랫폼, AI 제작, 11M)이 data.js 에 없다 — 먼저 넣는다.
 */

window.DOC_VERSION = {
    id: 'overdare',

    title: { ko: '이력서 | 오현석', en: 'CV | Hyunseok Oh' },

    head: {
        name: window.DOC_DATA.head.name,
        tagline: {
            guide: [
                '기본판의 "연구자이자 창업가" 는 연구직용이다. 이 자리에서 "연구자" 는 실무 안 하는 사람, "창업가" 는 지시 안 받는 사람으로 읽힐 수 있다.',
                '한 줄에 넷 — UGC 플랫폼 4개를 크리에이터로 써 본 사람(ROBLOX·ZEPETO 는 라이브, UEFN·Meta Horizon 은 검증), AI 에이전트로 제작 시스템을 설계한 사람, 엔진을 직접 만든 사람, 그래서 툴을 만들 사람. 이름 아래 한 줄이 "왜 TPM" 의 첫 답이다.',
                '"AI" 를 한 줄 소개의 첫 단어로 두지 않는다. 플랫폼 실적이 먼저, AI 는 방법으로 뒤에.'
            ]
        },
        contact: window.DOC_DATA.head.contact
    },

    sections: [
        {
            type: 'text',
            title: { ko: '요약', en: 'Summary' },
            guide: [
                '읽는 사람은 이 문단으로 나머지를 읽을지 정한다. 3~4문장. 형용사 없이 명사와 숫자만.',
                '첫 문장 — 숫자가 먼저. 3인 스튜디오, 8개월, ROBLOX 라이브 6종, 13.3M 방문, 그중 Tower Flood Race 7개월 11M. 이 숫자가 뒤에 올 "AI 기반 제작" 을 저품질이 아니라 생산성으로 읽게 만든다. 순서를 바꾸면 감점이다.',
                '두 번째 문장 — 방법. "에이전트가 X 를 만들고 사람이 Y 를 결정하는 제작 시스템을 설계해, 그것을 ROBLOX·ZEPETO 에서 라이브까지, UEFN·Meta Horizon 에서 검증 프로토타입까지 돌렸다." X 와 Y 가 구체적이어야 한다. "AI 로 만들었다" 가 아니라 "AI 가 만들게 하는 시스템을 만들었다" — 이것이 TPM 의 문장이다.',
                '세 번째 문장 — "왜 TPM". 네 플랫폼 모두 AI 가 설계에 없는 툴이라 우회를 만드는 데 시간의 절반이 갔다. 그 천장은 플랫폼 쪽에서만 올릴 수 있고, OVERDARE 는 AI 를 처음부터 설계에 넣은 첫 플랫폼이다. 스튜디오를 키우지 않고 TPM 으로 오는 이유가 이 문장에 있어야 한다.',
                '네 번째 문장(선택) — 만드는 쪽의 깊이. 자체 엔진 2종(HTML5 2D, AR 렌더링), 4~10인 팀 4회, LG·KT 이중 론칭. "AI 없이도 시스템을 설계할 줄 안다" 의 근거.',
                'OVERDARE 가 크래프톤·네이버제트 합작이라는 점과 ZEPETO·ROBLOX 를 같은 시기에 했다는 점은 요약이 아니라 자기소개서 지원 동기에 둔다. 요약은 실적과 방법과 이유, 셋이면 찬다.',
                '"언리얼" 이라는 단어를 요약에 쓰지 않는다. 실적 절과 기술 절에서 "UEFN" 으로 정확히 쓴다.'
            ]
        },

        {
            type: 'text',
            title: { ko: 'UGC 플랫폼 실적', en: 'UGC platform track record' },
            guide: [
                '이 절이 이력서의 카드다. 5개 플랫폼 × (프로젝트 / 시기 / 상태 / 지표 / 제작 방식) 한 줄씩. data.js 에 platforms 항목을 만들고 이 안내를 { type: "list", key: "platforms" } 로 바꾼다. 포트폴리오 2번 장(한눈에)과 같은 내용이어야 한다.',
                'ROBLOX — 라이브 6종 · 13.3M · 2026.01~. Tower Flood Race 는 따로 한 줄(2026.01 출시, 7개월 11M, 전 콘텐츠 AI 기반). 나머지 라이브 5종은 합쳐서 한 줄(토마토 1.1M, AFK 0.69M, RNG 0.27M, 스파 0.14M, 프루트 0.06M). 자체 제작 UGC 10종 · 커뮤니티 165K 는 아바타 아이템 측면으로 별도 한 줄.',
                'ZEPETO — Get Train(JR동일본 브랜드 월드 · 600K WAU · JRE WALLET 앱 연동 · World Jam Fall 2023 우승) · Nightmare Lab(시기·지표). 회사 소개 덱에 있는 숫자다.',
                'UEFN — Water Colosseum · 시기 · 플랫폼 검증 프로토타입 · Verse · 검증 결과 한 줄(무엇을 알아냈나). "UEFN(Unreal Editor for Fortnite)" 이라고 정확히 — "언리얼 엔진" 이라고 쓰지 않는다. UEFN 은 OVERDARE 가 만드는 것과 같은 범주(UE5 기반 크리에이터 툴)다.',
                'Meta Horizon — Slime Sanctum · 시기 · 플랫폼 검증 프로토타입 · VR · 검증 결과 한 줄.',
                'SKT ifland — 1MILLION Land · 2021 · 9인 팀 · KOCCA 과제. 크리에이터 툴이 아니라 커스텀 개발이었다면 그렇게 적는다 — 다섯 중 이것만 성격이 다르고, 그래서 "2021 년 9인 → 2026 년 3인" 의 대비가 된다.',
                '상태 열에 라이브 / 검증 프로토타입 / 파트너십을 구분한다. 지표 없는 칸은 비운다. "미출시" 라고 쓰지 않는다 — 출시하려다 못 한 게 아니라 검증하려고 만든 것이고, 그 표기가 더 정직하고 더 강하다. 프로토타입을 라이브처럼 보이게 하면 나머지 숫자도 의심받는다.',
                '각 줄 끝에 제작 방식 — "Claude Code 에이전트 기반". ROBLOX·ZEPETO·UEFN·Horizon 네 줄에 같은 방식이 붙고 ifland 만 이전이면, "같은 파이프라인을 네 툴체인에서 검증했고 둘은 라이브까지 갔다" 가 저절로 읽힌다. 이식성이 곧 "다섯 번째 플랫폼도 설계할 수 있다" 의 근거다.'
            ]
        },

        { type: 'experience', title: { ko: '경력', en: 'Experience' } },

        {
            type: 'text',
            guide: [
                '위 경력 절은 정본(cv/data.js) 그대로다. 아래는 정본에 보강할 사실이다 — 각색이 아니라 누락이다. 버전 파일이 아니라 data.js 에 넣는다.',
                '트리플엔게임즈 "2024.02–현재" 한 줄이 ZEPETO 시기(2024–25)와 ROBLOX 시기(2026)를 뭉뚱그린다. 두 항목으로 나눈다. 나누면 4개 플랫폼 서사가 경력 절에서도 보이고, "8개월에 6종" 의 속도가 드러난다.',
                'ROBLOX 시기 — 성과 한 줄이 "NNN UGC 사업 총괄" 뿐이다. 라이브 6종·13.3M 이 없다. "NNN UGC" 는 아바타 아이템 사업(개발 중, 커뮤니티 165K)이고 게임은 별개다 — 둘을 분리해 적는다.',
                '"총괄" 이 9회다. TPM 은 스펙을 쓰고 툴을 설계하는 자리라 "총괄" 은 관리 신호다. 각 총괄 뒤에 직접 한 것 한 줄 — 특히 AI 파이프라인에서 "무엇을 AI 에 맡기지 않기로 했는지" 가 가장 강한 직접 수행 진술이다.',
                '기획 문서 작성 사실이 없다(필수 4). 6종을 냈으면 기획서가 있다. 참고 저장소에 TFR 프로젝트 문서와 jumpstart 12개월 계획 덱이 있다. 대표 2~3건의 이름을 해당 경력에 넣고 포트폴리오에 발췌를 둔다.',
                '에이전트 지침 문서(스튜디오 저장소의 .ai/rule.md 같은 것)의 존재를 적는다. "툴 설계를 문서화했다"(필수 3)의 직접 증거다.',
                '에이코 "인공지능 안무 솔루션 R&D" — 무엇을 입력받아 무엇을 냈는지 한 줄. 지금 유일하게 AI 를 언급하는 항목인데 실체가 없다. 2016년 시선 추적(Caffe2)은 LLM 에이전트 질문에 답으로 내지 않는다.',
                '소프트펌프 항목에 Mine Sweeper 를 넣는다(시기·플랫폼·역할). 포트폴리오 부록 타임라인이 이력서와 어긋나면 안 된다. 2012 → 2026 의 14년이 "AI 붐에 올라탄 사람 아니냐" 에 대한 답이다 — 요약에서 한 번 짚어도 된다.'
            ]
        },

        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } },

        {
            type: 'text',
            title: { ko: '기술', en: 'Skills' },
            guide: [
                'TPM 채용에서 기술 절이 없는 이력서는 드물다. 엔진 · 플랫폼 · 언어 · AI 도구 네 묶음으로 한 줄씩. data.js 에 skills 항목을 추가하고 이 안내를 { type: "list", key: "skills" } 로 바꾼다.',
                '플랫폼 — Roblox Studio(라이브 6종), ZEPETO Studio(Unity 기반, 라이브), UEFN(UE5 기반, Verse, 검증 프로토타입), Meta Horizon(검증 프로토타입). 라이브와 검증을 괄호로 구분한다. 네 개가 한 줄에 있는 것 자체가 진술이다.',
                '엔진 — Unity(소프트펌프·우아한형제들·ZEPETO Studio), 자체 엔진 2종(HTML5 2D, AR 렌더링). 언리얼은 UEFN 으로만 적는다. 정통 UE5(C++·블루프린트) 경험이 없으면 없다고 두고, "UEFN 의 제약 범위 안에서" 라는 것을 아는 사람으로 보이게 한다.',
                'AI 도구 — Claude Code 는 공고가 이름을 부른 도구다. 용도와 함께 — "Claude Code 에이전트 — 게임 로직·라이브 콘텐츠·운영 스크립트 생성, 4개 플랫폼 공통". 다른 도구(이미지·3D 생성 등)도 실제로 쓴 것만 용도와 함께.',
                '언어 — Luau, Verse, C#, JavaScript 등 프로덕션에서 쓴 것.'
            ]
        },

        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'list', key: 'lecture', title: { ko: '강의', en: 'Lectures' } },
        { type: 'cite', key: 'publication', title: { ko: '논문', en: 'Publication' } }
    ]
};
