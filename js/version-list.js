/*
 * 문서별 버전 목록 렌더러 — /cv/, /coverletter/, /portfolio/ 의 index 가 쓴다.
 *
 * 목록은 applications.js 의 APPLICATIONS 에서 끌어온다. 지원 목록이 유일한 출처이고,
 * 이 페이지는 그중 한 문서의 버전만 추려 보여 준다.
 *
 * 여러 지원이 같은 버전을 공유하면(예: 기본 자기소개서를 두 지원이 함께 씀) 한 번만
 * 나열하고, 어느 지원들이 쓰는지 함께 적는다.
 *
 * 컨테이너에 data-doc="cv" 처럼 문서 종류를 적어 둔다.
 */
(function () {
    'use strict';

    var host = document.getElementById('versionList');
    if (!host || !window.APPLICATIONS) return;

    var docKey = host.getAttribute('data-doc');
    if (!docKey) return;

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

    /* 이 문서에 존재하는 버전을 지원 목록에서 추린다. 등장 순서를 지킨다. */
    function collect() {
        var order = [];
        var byVersion = {};

        window.APPLICATIONS.forEach(function (app) {
            var version = app[docKey];
            if (!version) return;
            if (!byVersion[version]) {
                byVersion[version] = [];
                order.push(version);
            }
            byVersion[version].push(app);
        });

        return order.map(function (version) {
            var apps = byVersion[version];
            // 버전 이름과 같은 id 를 가진 지원이 있으면 그쪽 이름을 대표로 쓴다.
            var owner = apps.filter(function (app) { return app.id === version; })[0] || apps[0];
            return { id: version, owner: owner, apps: apps };
        });
    }

    function render(lang, t) {
        host.textContent = '';

        collect().forEach(function (entry) {
            var card = el('article', 'app-card');
            card.id = 'version-' + entry.id;

            var head = el('div', 'app-card-head');
            head.appendChild(el('h3', 'app-card-title', pick(entry.owner.label, lang)));
            if (entry.owner.status) {
                head.appendChild(el('span', 'app-card-status', pick(entry.owner.status, lang)));
            }
            card.appendChild(head);

            if (entry.owner.role) {
                card.appendChild(el('p', 'app-card-role', pick(entry.owner.role, lang)));
            }
            if (entry.owner.note) {
                card.appendChild(el('p', 'app-card-note', pick(entry.owner.note, lang)));
            }

            // 두 곳 이상이 같은 버전을 쓰면 그 사실을 적어 둔다.
            if (entry.apps.length > 1) {
                var names = entry.apps.map(function (app) { return pick(app.label, lang); }).join(', ');
                card.appendChild(el('p', 'app-card-shared', t('versions_shared') + ' ' + names));
            }

            var links = el('div', 'app-card-links');
            var open = el('a', 'app-link', t('versions_open'));
            open.href = entry.id + '/';
            links.appendChild(open);
            card.appendChild(links);

            host.appendChild(card);
        });
    }

    // js/i18n.js 가 언어를 정하고 이 함수를 부른다(최초 1회 + 전환할 때마다).
    window.renderVersionList = render;
})();
