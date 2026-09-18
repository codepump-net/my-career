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

            hero_eyebrow: "아주대학교 디지털미디어학과 · 교수 지원",
            hero_title: "컴퓨터그래픽스와 게임 기술, 연구와 교육으로 연결합니다.",
            hero_lead: "학력·논문·강의와 산업 연구개발 경험을 모은 교수 지원용 범용 문서입니다. CV, 커버레터, 포트폴리오를 열람하고 PDF로 저장할 수 있습니다.",
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

            archive_title: '종료된 지원 아카이브',
            apps_kicker: 'APPLICATIONS',
            apps_title: "교수 지원 문서",
            apps_lead: "현재 기본판은 아주대학교 디지털미디어학과 교수 지원용입니다. 특정 공고에 맞추기 전의 범용 자료이며, 종료된 지원은 아래 아카이브에서 확인할 수 있습니다.",

            about_kicker: 'ABOUT',
            about_title: '소개',
            about_pending_copy: "컴퓨터그래픽스·게임 기술을 기반으로 연구, 강의, 산업 개발을 병행해 왔습니다. 학문적 배경과 대학 강의 이력, 그래픽스 엔진·실감콘텐츠 개발 경험을 문서 세트에 정리합니다.",

            contact_kicker: 'CONTACT',
            contact_title: '연락처',
            contact_lead: "연구·교육 및 지원 관련 연락처입니다.",
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

            hero_eyebrow: "Ajou University · Digital Media · Faculty application",
            hero_title: "Computer graphics and game technology, connected to research and teaching.",
            hero_lead: "General faculty application materials bringing together education, publication, teaching, and industry R&D. Read the CV, cover letter, and portfolio, or save them as PDFs.",
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

            archive_title: 'Archived applications',
            apps_kicker: 'APPLICATIONS',
            apps_title: "Faculty application materials",
            apps_lead: "The current base set is for a faculty application in Digital Media at Ajou University, before tailoring to a specific vacancy. Closed applications are available in the archive below.",

            about_kicker: 'ABOUT',
            about_title: 'About',
            about_pending_copy: "My work spans research, teaching, and industry development in computer graphics and game technology. These materials bring together academic background, university teaching, graphics engines, and immersive content.",

            contact_kicker: 'CONTACT',
            contact_title: 'Contact',
            contact_lead: "Contact for research, teaching, and application enquiries.",
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
