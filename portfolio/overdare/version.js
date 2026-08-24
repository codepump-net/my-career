/*
 * 포트폴리오 덱 — OVERDARE Technical Product Manager 지원용
 *
 * 주소: /portfolio/overdare/
 * 공고: cv/data/[OVERDARE] Technical Product Manager (TPM).txt
 * 검토: docs/applications/overdare-tpm.md 4.4절  ← 장 구성의 근거
 *
 * 장 순서가 곧 주장이다. 프로젝트 순이 아니라 논증 순 — 공고의 미션 순서를 따른다.
 *   01 Tower Flood Race (5장)  미션 ③ AI 와 사람의 협업 — 한눈에 → 숫자 → 파이프라인 → 지침 → 결정 → 라이브
 *   02 플랫폼 (5장)            미션 ① 제작 환경 — 같은 파이프라인이 다섯 툴체인에서
 *   03 툴 비교 (1장)           미션 ① + 필수 5 — 다섯을 다 써 본 사람만 만들 수 있는 표
 *   04 문서 (1장)              미션 ② + 필수 3·4 — 기획서·지침서 실물
 *   부록                       모바일 2종 — "AI 이전에도 출시했다" 이상은 아니다
 *
 * 읽는 쪽이 앞 7장만 보고 판단해도 되게 짰다. 01 이 전체의 1/3 이다.
 *
 * 각 장의 안내(작성 안내 블록)는 index.html 에 직접 적혀 있다 — 작성자용 메모라 번역하지 않는다.
 * 내용을 채울 때 temp-placeholder 블록을 실제 레이아웃으로 교체한다.
 * 영상은 portfolio/overdare/assets/ 에 두고 <video> 로 넣는다. 30–60초, 파이프라인 워크스루만 2–3분.
 */

window.DECK_VERSION = {
    id: 'overdare',

    title: { ko: '포트폴리오 | 오현석', en: 'Portfolio | Hyunseok Oh' },

    slides: [
        { id: 'cover' },
        { id: 'glance' },

        // 01 Tower Flood Race — 이 다섯 장이 포트폴리오의 절반이다
        { id: 'tfr-numbers' },
        { id: 'tfr-pipeline' },
        { id: 'tfr-rules' },
        { id: 'tfr-decisions' },
        { id: 'tfr-liveops' },

        // 02 플랫폼 — 같은 파이프라인, 다른 툴체인
        { id: 'roblox-more' },
        { id: 'zepeto' },
        { id: 'uefn' },
        { id: 'horizon' },
        { id: 'ifland' },

        // 03 · 04
        { id: 'compare' },
        { id: 'docs' },

        { id: 'closing' },

        // 부록은 본편과 번호를 따로 센다. 읽는 쪽이 안 봐도 손해 없게.
        { id: 'appendix-mobile', appendix: true }
    ]
};
