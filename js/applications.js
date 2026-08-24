/*
 * 메인 페이지의 지원 버전 목록 렌더러.
 *
 * applications.js 의 APPLICATIONS 배열로 카드를 그린다. 카드 하나가 지원 한 건이고,
 * 그 안에 이력서 · 자기소개서 · 포트폴리오 세 문서의 링크가 들어간다.
 * 각 링크는 그 지원이 쓰는 버전 폴더를 가리킨다. 예: cv/overdare/
 *
 * 문구 번역은 js/i18n.js 가 담당하지만, 지원처 이름처럼 목록에서 오는 값은
 * { ko, en } 을 여기서 직접 고른다. 그래서 언어가 바뀌면 다시 그린다.
 */
(function () {
    'use strict';

    var host = document.getElementById('applicationList');
    if (!host || !window.APPLICATIONS) return;

    var DOCS = [
        { key: 'cv', path: 'cv/', labelKey: 'nav_cv' },
        { key: 'coverletter', path: 'coverletter/', labelKey: 'nav_coverletter' },
        { key: 'portfolio', path: 'portfolio/', labelKey: 'nav_portfolio' }
    ];

    function pick(value, lang) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') return value;
        return value[lang] || value.ko || value.en || '';
    }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = text;
        return node;
    }

    /* 버전 하나가 폴더 하나다. 예: cv/ + overdare + / */
    function href(path, version) {
        return path + version + '/';
    }

    function render(lang, t) {
        host.textContent = '';

        window.APPLICATIONS.forEach(function (app) {
            var card = el('article', 'app-card');
            card.id = 'app-' + app.id;

            var head = el('div', 'app-card-head');
            head.appendChild(el('h3', 'app-card-title', pick(app.label, lang)));
            if (app.status) head.appendChild(el('span', 'app-card-status', pick(app.status, lang)));
            card.appendChild(head);

            if (app.role) card.appendChild(el('p', 'app-card-role', pick(app.role, lang)));
            if (app.note) card.appendChild(el('p', 'app-card-note', pick(app.note, lang)));

            var links = el('div', 'app-card-links');
            DOCS.forEach(function (doc) {
                var version = app[doc.key];
                if (!version) return;

                var link = el('a', 'app-link', t(doc.labelKey));
                link.href = href(doc.path, version);
                links.appendChild(link);
            });
            card.appendChild(links);

            host.appendChild(card);
        });
    }

    // js/i18n.js 가 언어를 정하고 이 함수를 부른다(최초 1회 + 전환할 때마다).
    window.renderApplications = render;
})();
