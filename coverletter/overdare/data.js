/*
 * 자기소개서 공통 데이터
 *
 * 자기소개서는 지원처마다 글이 통째로 달라 공유할 문장이 거의 없다.
 * 그래서 여기에는 어느 버전에나 같은 값만 둔다 — 이름, 서명, 연락처.
 * 실제 내용(절 구성과 문단)은 versions/*.js 가 각자 갖는다.
 *
 * 이력서(cv/data.js)와는 역할이 다르다. 그쪽은 사실의 정본이고, 이쪽은 공통 껍데기다.
 */

window.DOC_DATA = {

    head: {
        name: { ko: '오현석', en: 'Hyunseok Oh' },
        contact: [
            { text: 'jeff.oh.hyunseok@gmail.com', href: 'mailto:jeff.oh.hyunseok@gmail.com' }
        ]
    },

    sign: { ko: '오현석', en: 'Hyunseok Oh' }
};
