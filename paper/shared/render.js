/*
 * 문서 렌더러 — 정본 데이터(DOC_DATA)와 버전 정의(DOC_VERSION)로 문서 DOM 을 만든다.
 * /cv, /coverletter 가 함께 쓴다.
 *
 * 왜 렌더러를 두는가
 *   지원 분야에 따라 이력서 여러 벌이 필요한데, 경력 사실 자체는 한 벌이다.
 *   사실은 data.js 에 한 번만 적고, 버전 파일은 "어떤 절을, 어떤 순서로, 어떤 항목만"
 *   보일지를 정한다. 경력 한 줄을 고치면 모든 버전에 함께 반영된다.
 *
 * 이 파일이 만드는 DOM 은 paper.css 의 문서 요소와 1:1 로 대응한다.
 * 페이지 분할에 필요한 data-doc-block / data-doc-keep 도 여기서 붙인다.
 *
 * 다국어 값은 { ko: '…', en: '…' } 형태로 적는다. 문자열을 그대로 두면 번역하지 않는
 * 값(연도, 직함 등)으로 본다. en 이 비면 ko 로 대체된다.
 */
(function () {
    'use strict';

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

    /* 페이지 분할 단위 표시. keep 은 "뒤 블록과 떨어지지 말 것"을 뜻한다(paper.js). */
    function block(node, keep) {
        node.setAttribute('data-doc-block', '');
        if (keep) node.setAttribute('data-doc-keep', '');
        return node;
    }

    function pad(number) {
        return number < 10 ? '0' + number : String(number);
    }

    /* ------------------------------------------------------------ 머리 */

    function renderHead(parent, data, version, lang) {
        var source = version.head || data.head || {};
        var head = block(el('header', 'doc-head'));

        head.appendChild(el('h1', 'doc-name', pick(source.name, lang)));

        // 한 줄 소개도 아직 안 쓴 자리일 수 있다 — { guide: … } 면 안내 블록으로.
        if (source.tagline && source.tagline.guide !== undefined) {
            head.appendChild(guideNode(source.tagline.guide));
        } else {
            var tagline = pick(source.tagline, lang);
            if (tagline) head.appendChild(el('p', 'doc-tagline', tagline));
        }

        var items = source.contact || [];
        if (items.length) {
            var list = el('ul', 'doc-contact');
            items.forEach(function (item) {
                var li = el('li');
                var text = pick(item.text !== undefined ? item.text : item, lang);
                if (item.href) {
                    var link = el('a', null, text);
                    link.href = item.href;
                    li.appendChild(link);
                } else {
                    li.textContent = text;
                }
                list.appendChild(li);
            });
            head.appendChild(list);
        }

        parent.appendChild(head);
    }

    function renderHeading(parent, number, title, lang) {
        var node = block(el('h2', 'doc-heading'));
        var no = el('span', 'doc-heading-no', pad(number));
        no.setAttribute('aria-hidden', 'true');
        node.appendChild(no);
        node.appendChild(el('span', null, pick(title, lang)));
        parent.appendChild(node);
    }

    /* -------------------------------------------------------------- 경력 */

    /* 버전의 include 로 항목과 순서를 고른다. 없으면 정본 순서 그대로 전부. */
    function resolveEntries(section, all) {
        if (!section.include) {
            return all.map(function (entry) { return { entry: entry, spec: {} }; });
        }
        return section.include.map(function (item) {
            var spec = typeof item === 'string' ? { id: item } : item;
            var found = null;
            all.forEach(function (entry) { if (entry.id === spec.id) found = entry; });
            return found ? { entry: found, spec: spec } : null;
        }).filter(Boolean);
    }

    /* spec.points 로 성과를 고르고, spec.pointLimit 로 개수를 줄인다. */
    function resolvePoints(entry, spec) {
        var points = entry.points || [];
        if (spec.points) {
            points = spec.points.map(function (id) {
                var found = null;
                (entry.points || []).forEach(function (point) { if (point.id === id) found = point; });
                return found;
            }).filter(Boolean);
        }
        if (spec.pointLimit) points = points.slice(0, spec.pointLimit);
        return points;
    }

    function renderExperience(parent, section, data, lang) {
        resolveEntries(section, data[section.key || 'experience'] || []).forEach(function (item) {
            var entry = item.entry;
            var spec = item.spec;

            // 회사 머리글은 뒤따르는 성과와 떨어지면 안 된다.
            var head = block(el('div', 'doc-entry'), true);
            var row = el('div', 'doc-item-head');
            row.appendChild(el('p', 'doc-item-title', pick(entry.org, lang)));
            row.appendChild(el('p', 'doc-item-meta', pick(entry.period, lang)));
            head.appendChild(row);
            if (entry.role) head.appendChild(el('p', 'doc-item-role', pick(entry.role, lang)));
            parent.appendChild(head);

            resolvePoints(entry, spec).forEach(function (point) {
                var wrap = block(el('div', 'doc-point'));
                wrap.appendChild(el('p', 'doc-point-main', pick(point.text, lang)));

                var subs = point.sub || [];
                if (subs.length && spec.subs !== false) {
                    var list = el('ul', 'doc-sub');
                    subs.forEach(function (sub) { list.appendChild(el('li', null, pick(sub, lang))); });
                    wrap.appendChild(list);
                }
                parent.appendChild(wrap);
            });
        });
    }

    /* ------------------------------------------------------- 그 밖의 절 */

    function renderList(parent, section, data, lang) {
        var items = section.items || data[section.key] || [];
        if (!items.length) return;

        var list = block(el('ul', 'doc-list'));
        items.forEach(function (item) {
            var li = el('li');
            li.appendChild(el('span', 'doc-list-main', pick(item.text, lang)));
            if (item.meta) li.appendChild(el('span', 'doc-list-meta', pick(item.meta, lang)));
            list.appendChild(li);
        });
        parent.appendChild(list);
    }

    /* 서지 항목. 제목만 굵게 나오도록 before / title / after 로 나눠 적는다
     * (데이터에 HTML 을 넣지 않기 위해서다). */
    function renderCite(parent, section, data, lang) {
        (section.items || data[section.key] || []).forEach(function (item) {
            var node = block(el('p', 'doc-cite'));
            var before = pick(item.before, lang);
            var after = pick(item.after, lang);

            if (before) node.appendChild(document.createTextNode(before + ' '));
            node.appendChild(el('b', null, pick(item.title, lang)));
            if (after) node.appendChild(document.createTextNode(' ' + after));
            parent.appendChild(node);
        });
    }

    /* 아직 본인이 쓰지 않은 자리. 무엇을 쓰면 좋은지만 보여 준다.
     * guide 는 한국어 한 줄이거나 줄 목록이다 — 작성자용 메모라 번역하지 않는다. */
    function guideNode(guide) {
        var box = el('div', 'doc-guide');
        box.appendChild(el('p', 'doc-guide-label', '작성 안내'));

        if (Array.isArray(guide)) {
            var list = el('ul', 'doc-guide-list');
            guide.forEach(function (line) { list.appendChild(el('li', null, line)); });
            box.appendChild(list);
        } else {
            box.appendChild(el('p', 'doc-guide-body', guide));
        }
        return box;
    }

    /* 문단 한 덩어리. 세 가지 형태를 받는다.
     *   { guide: '…' } 또는 { guide: ['…','…'] }  아직 안 쓴 자리 → 안내 블록
     *   { text: { ko, en } }                      완성 문장
     *   { ko, en }                                완성 문장(짧은 표기)  */
    function paragraphNode(entry, lang) {
        if (entry && entry.guide !== undefined) return guideNode(entry.guide);
        var value = (entry && entry.text !== undefined) ? entry.text : entry;
        return el('p', 'doc-text', pick(value, lang));
    }

    function renderText(parent, section, data, lang) {
        var paragraphs = section.paragraphs
            || (section.content !== undefined ? [section.content] : null)
            || (section.guide !== undefined ? [{ guide: section.guide }] : null)
            || (section.key && data[section.key] ? [data[section.key]] : []);

        paragraphs.forEach(function (paragraph) {
            parent.appendChild(block(paragraphNode(paragraph, lang)));
        });
    }

    function renderClosing(parent, section, data, lang) {
        var box = block(el('div', 'doc-close'));
        (section.paragraphs || []).forEach(function (paragraph) {
            box.appendChild(paragraphNode(paragraph, lang));
        });
        if (section.sign) box.appendChild(el('p', 'doc-sign', pick(section.sign, lang)));
        parent.appendChild(box);
    }

    var RENDERERS = {
        text: renderText,
        prose: renderText,
        experience: renderExperience,
        list: renderList,
        cite: renderCite,
        closing: renderClosing
    };

    /* ------------------------------------------------------------ 진입점 */

    window.DocRender = {
        /* host(.paper-pages) 를 비우고 시트 한 장에 문서 전체를 그린다.
         * 이후 paper.js 가 높이를 재어 A4 한 장 분량씩 다시 나눈다. */
        build: function (host, data, version, lang) {
            host.textContent = '';

            var sheet = el('div', 'sheet');
            var body = el('div', 'sheet-body');
            sheet.appendChild(body);
            host.appendChild(sheet);

            renderHead(body, data || {}, version || {}, lang);

            var number = 0;
            (version.sections || []).forEach(function (section) {
                var render = RENDERERS[section.type];
                if (!render) return;

                // 번호는 제목이 있는 절에만 매긴다(맺음말 등은 건너뛴다).
                if (section.title) renderHeading(body, ++number, section.title, lang);
                render(body, section, data || {}, lang);
            });
        }
    };
})();
