/*
 * 메인 페이지 다국어 (KO / EN)
 *
 * 저장 키 'language' 는 슬라이드 덱(slides/shared/deck.js)과 공유한다.
 * 메인에서 고른 언어가 /cv, /coverletter, /portfolio 에서도 그대로 이어진다.
 *
 * 마크업 연결 방식
 *   data-key             → textContent 교체
 *   data-key-aria-label  → aria-label 속성 교체
 *   data-key-title       → title 속성 교체
 *
 * 문구를 추가할 때는 ko / en 양쪽에 같은 키를 넣는다. en 이 비면 ko 로 대체된다.
 */
(function () {
    'use strict';

    var LANGS = ['ko', 'en'];
    var STORE_KEY = 'language';

    // data-key-<접미사> → 교체할 속성 이름
    var ATTR_KEYS = {
        'data-key-aria-label': 'aria-label',
        'data-key-title': 'title'
    };

    var I18N = {
        ko: {
            page_title: 'Hyunseok Oh | 포트폴리오',

            nav_about: '소개',
            nav_cv: '이력서',
            nav_coverletter: '자기소개서',
            nav_portfolio: '포트폴리오',
            nav_contact: '연락처',
            nav_menu: '메뉴 열기',
            skip_link: '본문으로 건너뛰기',

            brand_role: 'PORTFOLIO',

            hero_eyebrow: '내용 준비 중',
            hero_title: '이력과 작업을 슬라이드로 정리하고, 그대로 PDF 로 내보냅니다.',
            hero_lead: '이 사이트는 이력서 · 자기소개서 · 포트폴리오를 웹에서 바로 열람할 수 있게 만든 개인 포트폴리오입니다. 이력서와 자기소개서는 A4 세로 문서로, 포트폴리오는 16:9 슬라이드로 구성되며, 어느 쪽이든 같은 화면을 PDF 로 저장해 제출용으로 쓸 수 있습니다.',
            hero_cta_primary: '이력서 보기',
            hero_cta_secondary: '포트폴리오 보기',

            versions_kicker: 'VERSIONS',
            versions_open: '열어 보기',
            versions_shared: '함께 쓰는 지원:',
            cv_list_page_title: '이력서 버전 | 오현석',
            cv_list_title: '이력서 버전',
            cv_list_lead: '지원 분야에 따라 강조할 곳이 달라집니다. 경력 사실은 한 벌만 두고 배치와 순서만 버전마다 다릅니다.',
            cl_list_page_title: '자기소개서 버전 | 오현석',
            cl_list_title: '자기소개서 버전',
            cl_list_lead: '자기소개서는 지원처마다 글이 통째로 달라집니다. 버전을 고르면 해당 지원용으로 쓴 글로 이동합니다.',
            pf_list_page_title: '포트폴리오 버전 | 오현석',
            pf_list_title: '포트폴리오 버전',
            pf_list_lead: '지원처에 따라 보여 줄 케이스와 순서를 달리 구성합니다.',

            apps_kicker: 'APPLICATIONS',
            apps_title: '지원 버전',
            apps_lead: '지원처에 맞춰 이력서와 자기소개서를 따로 씁니다. 경력 사실은 한 벌만 두고 배치와 강조만 버전마다 다릅니다. 어느 문서든 상단 PDF 버튼으로 전체를 내보냅니다.',

            about_kicker: 'ABOUT',
            about_title: '소개',
            about_pending_copy: '자기소개 문단이 들어갈 자리입니다. 어떤 일을 해 왔고 지금 무엇에 관심이 있는지, 세 문단 안으로 정리할 예정입니다.',

            contact_kicker: 'CONTACT',
            contact_title: '연락처',
            contact_lead: '연락 가능한 경로를 정리해 둘 자리입니다. 실제 값은 내용 작성 단계에서 채웁니다.',
            contact_email_label: 'EMAIL',
            contact_github_label: 'GITHUB',
            contact_etc_label: '그 외',
            contact_pending_value: '작성 예정',

            footer_note: '이 사이트는 GitHub Pages 로 배포됩니다.',
            footer_source: '소스 저장소',

            pending_label: 'CONTENT PENDING'
        },

        en: {
            page_title: 'Hyunseok Oh | Portfolio',

            nav_about: 'About',
            nav_cv: 'CV',
            nav_coverletter: 'Cover letter',
            nav_portfolio: 'Portfolio',
            nav_contact: 'Contact',
            nav_menu: 'Open menu',
            skip_link: 'Skip to content',

            brand_role: 'PORTFOLIO',

            hero_eyebrow: 'Content pending',
            hero_title: 'Career and work as slide decks — readable on the web, exportable as PDF.',
            hero_lead: 'A personal portfolio that puts the CV, cover letter, and project work on the web. The CV and cover letter are A4 portrait documents, the portfolio is a 16:9 deck, and either exports to PDF from the same source you read on screen.',
            hero_cta_primary: 'View CV',
            hero_cta_secondary: 'View portfolio',

            versions_kicker: 'VERSIONS',
            versions_open: 'Open',
            versions_shared: 'Shared with:',
            cv_list_page_title: 'CV versions | Hyunseok Oh',
            cv_list_title: 'CV versions',
            cv_list_lead: 'What to emphasise changes with the field applied to. The career facts are kept in one place; only the arrangement and order differ between versions.',
            cl_list_page_title: 'Cover letter versions | Hyunseok Oh',
            cl_list_title: 'Cover letter versions',
            cl_list_lead: 'A cover letter is rewritten in full for each employer. Pick a version to open the letter written for that application.',
            pf_list_page_title: 'Portfolio versions | Hyunseok Oh',
            pf_list_title: 'Portfolio versions',
            pf_list_lead: 'Which case studies to show, and in what order, changes with the employer.',

            apps_kicker: 'APPLICATIONS',
            apps_title: 'Applications',
            apps_lead: 'The CV and cover letter are rewritten for each employer. The career facts are kept in one place; only the arrangement and emphasis change between versions. Every document exports in full from the PDF button in the top bar.',

            about_kicker: 'ABOUT',
            about_title: 'About',
            about_pending_copy: 'The introduction goes here — what the work has been so far and where the current interest lies, in three paragraphs or fewer.',

            contact_kicker: 'CONTACT',
            contact_title: 'Contact',
            contact_lead: 'The place for ways to get in touch. Real values go in during the content pass.',
            contact_email_label: 'EMAIL',
            contact_github_label: 'GITHUB',
            contact_etc_label: 'OTHER',
            contact_pending_value: 'Pending',

            footer_note: 'Published with GitHub Pages.',
            footer_source: 'Source repository',

            pending_label: 'CONTENT PENDING'
        }
    };

    function readStore() {
        try {
            return window.localStorage.getItem(STORE_KEY);
        } catch (e) {
            return null;
        }
    }

    function writeStore(value) {
        try {
            window.localStorage.setItem(STORE_KEY, value);
        } catch (e) {
            /* 프라이빗 모드 등에서 저장이 막혀도 화면 동작에는 영향이 없다 */
        }
    }

    function resolveLang() {
        var query = new URLSearchParams(window.location.search).get('lang');
        if (LANGS.indexOf(query) !== -1) return query;

        var saved = readStore();
        if (LANGS.indexOf(saved) !== -1) return saved;

        return (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    }

    var lang = resolveLang();

    function t(key) {
        var dict = I18N[lang] || {};
        var value = dict[key];
        return value === undefined ? (I18N.ko[key] || '') : value;
    }

    function apply() {
        document.documentElement.lang = lang;

        // 페이지마다 제목 키가 다르다(메인은 page_title, 목록 페이지는 각자의 키).
        var titleKey = document.body.getAttribute('data-title-key') || 'page_title';
        document.title = t(titleKey);

        document.querySelectorAll('[data-key]').forEach(function (node) {
            node.textContent = t(node.getAttribute('data-key'));
        });

        Object.keys(ATTR_KEYS).forEach(function (source) {
            document.querySelectorAll('[' + source + ']').forEach(function (node) {
                node.setAttribute(ATTR_KEYS[source], t(node.getAttribute(source)));
            });
        });

        document.querySelectorAll('.lang-btn').forEach(function (button) {
            var active = button.getAttribute('data-lang') === lang;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        // 카드 문구는 applications.js 의 { ko, en } 값을 쓰므로 언어가 바뀌면 다시 그린다.
        if (window.renderApplications) window.renderApplications(lang, t);
        if (window.renderVersionList) window.renderVersionList(lang, t);
    }

    function setLang(next) {
        if (LANGS.indexOf(next) === -1 || next === lang) return;
        lang = next;
        writeStore(next);
        apply();
    }

    document.querySelectorAll('.lang-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            setLang(button.getAttribute('data-lang'));
        });
    });

    apply();
})();
