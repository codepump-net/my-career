/* 교수 지원용 범용 CV. 경력 사실의 정본은 ../data.js. */
window.DOC_VERSION = {
    id: 'default',
    title: { ko: '교수 지원 CV | 오현석', en: 'Faculty CV | Hyunseok Oh' },
    head: {
        name: window.DOC_DATA.head.name,
        tagline: window.DOC_DATA.tagline,
        contact: window.DOC_DATA.head.contact
    },
    sections: [
        { type: 'text', key: 'summary', title: { ko: '연구 · 교육 개요', en: 'Research & teaching profile' } },
        { type: 'list', key: 'education', title: { ko: '학력', en: 'Education' } },
        { type: 'cite', key: 'publication', title: { ko: '논문', en: 'Publication' } },
        { type: 'list', key: 'lecture', title: { ko: '강의 경력', en: 'Teaching experience' } },
        { type: 'experience', title: { ko: '산업 및 연구개발 경력', en: 'Industry and R&D experience' } },
        { type: 'list', key: 'awards', title: { ko: '수상', en: 'Awards' } }
    ]
};
