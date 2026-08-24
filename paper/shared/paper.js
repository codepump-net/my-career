/*
 * 공용 A4 세로 문서 컨트롤러 — /cv, /coverletter 가 함께 쓴다.
 *
 * 담당 범위
 *  - 버전은 페이지가 직접 로드한 version.js 가 정한다. 폴더 하나가 버전 하나다.
 *  - KO/EN 전환. 저장 키 'language' 를 메인 페이지·슬라이드 덱과 공유한다.
 *  - 화면용 페이지 분할: 내용 높이를 재어 A4 한 장 분량씩 시트로 나눈다.
 *  - PDF 추출(window.print).
 *
 * 문서 내용은 render.js 가 data.js(정본) + version.js(버전 정의)로 그린다.
 * 언어를 바꾸면 문자열을 갈아 끼우는 게 아니라 다시 그린 뒤 다시 나눈다.
 *
 * 화면 분할과 인쇄 분할은 별개다.
 *   화면 — 이 스크립트가 재서 나눈다. 워드처럼 보이게 하는 미리보기 목적이다.
 *   인쇄 — paper.css 가 시트 상자를 걷어내고 브라우저가 직접 나눈다. 이쪽이 기준이다.
 * 둘은 같은 여백·같은 글자 크기·같은 분할 회피 규칙을 쓰므로 장수가 일치한다.
 * @media print 에서 글자 크기나 여백을 바꾸면 이 일치가 깨진다.
 *
 * 로드 순서: render.js → ../data.js(정본) → version.js(이 버전) → paper.js
 */
(function () {
    'use strict';

    var LANGS = ['ko', 'en'];
    var STORE_KEY = 'language';
    var DEFAULT_VERSION = 'default';

    /* A4 한 장에서 내용이 들어갈 높이 = 297mm - 위아래 여백 18mm x 2 (paper.css 와 같은 값) */
    var PAGE_CONTENT_H = 987;
    var PAGINATE_MIN_W = 900;

    var UI_I18N = {
        ko: {
            ui_home: '메인으로',
            ui_versions: '버전 목록으로',
            ui_lang_group: '언어 선택',
            ui_pdf: 'PDF 로 저장',
            ui_pdf_label: 'PDF',
            ui_load_error: '문서를 불러오지 못했습니다. 주소를 확인해 주세요.'
        },
        en: {
            ui_home: 'Back to home',
            ui_versions: 'Back to version list',
            ui_lang_group: 'Language',
            ui_pdf: 'Save as PDF',
            ui_pdf_label: 'PDF',
            ui_load_error: 'The document could not be loaded. Please check the address.'
        }
    };

    var host = document.getElementById('paperPages');
    var pdfBtn = document.getElementById('paperPdf');
    var root = document.documentElement;

    if (!host || !pdfBtn) return;

    var params = new URLSearchParams(window.location.search);   // ?lang= 만 쓴다
    var lang = resolveLang();
    var version = null;
    var blocks = [];
    var relayoutTimer = null;

    /* ------------------------------------------------------------ 언어 */

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
        var query = params.get('lang');
        if (LANGS.indexOf(query) !== -1) return query;

        var saved = readStore();
        if (LANGS.indexOf(saved) !== -1) return saved;

        return (navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
    }

    function t(key) {
        var dict = UI_I18N[lang] || UI_I18N.ko;
        return dict[key] !== undefined ? dict[key] : (UI_I18N.ko[key] || '');
    }

    /* 셸(상단 바) 문구. 문서 본문은 render.js 가 직접 언어를 반영한다. */
    function applyShellLanguage() {
        root.lang = lang;

        document.querySelectorAll('[data-doc-key]').forEach(function (node) {
            node.textContent = t(node.getAttribute('data-doc-key'));
        });
        document.querySelectorAll('[data-doc-key-aria-label]').forEach(function (node) {
            node.setAttribute('aria-label', t(node.getAttribute('data-doc-key-aria-label')));
        });
        document.querySelectorAll('[data-doc-key-title]').forEach(function (node) {
            node.setAttribute('title', t(node.getAttribute('data-doc-key-title')));
        });
        document.querySelectorAll('.paper-lang').forEach(function (button) {
            var active = button.getAttribute('data-lang') === lang;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        if (version && version.title) {
            document.title = typeof version.title === 'string'
                ? version.title
                : (version.title[lang] || version.title.ko || document.title);
        }
    }

    function setLanguage(next) {
        if (LANGS.indexOf(next) === -1 || next === lang) return;
        lang = next;
        writeStore(next);
        applyShellLanguage();
        draw();
    }

    /* ---------------------------------------------------------- 버전 */

    /* 맞춤 버전은 지원처에 링크로 전달하는 문서다. 검색 노출을 막는다. */
    function blockIndexing() {
        var meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
    }

    function showLoadError() {
        host.textContent = '';
        var sheet = document.createElement('div');
        sheet.className = 'sheet';
        var body = document.createElement('div');
        body.className = 'sheet-body';
        var message = document.createElement('p');
        message.className = 'doc-text';
        message.textContent = t('ui_load_error');
        body.appendChild(message);
        sheet.appendChild(body);
        host.appendChild(sheet);
    }

    /* -------------------------------------------------- 화면 페이지 분할 */

    function collectBlocks() {
        if (blocks.length) return blocks;
        blocks = Array.prototype.slice.call(host.querySelectorAll('[data-doc-block]'));
        return blocks;
    }

    function makeSheet() {
        var sheet = document.createElement('div');
        sheet.className = 'sheet';
        var body = document.createElement('div');
        body.className = 'sheet-body';
        sheet.appendChild(body);
        host.appendChild(sheet);
        return body;
    }

    /* 시트에 담긴 내용의 실제 높이.
     * scrollHeight 대신 첫 블록 위쪽부터 마지막 블록 아래쪽까지를 잰다 —
     * 페이지 경계에 걸린 여백은 인쇄에서 사라지므로 여기서도 빼야 장수가 맞는다. */
    function usedHeight(body) {
        var first = body.firstElementChild;
        var last = body.lastElementChild;
        if (!first) return 0;
        return last.getBoundingClientRect().bottom - first.getBoundingClientRect().top;
    }

    /* 뒤 블록과 떨어지면 안 되는 블록 — 절 제목, 그리고 data-doc-keep 을 단 회사 머리글.
     * paper.css 의 인쇄 규칙(break-after: avoid)과 같은 대상을 가리킨다. */
    function keepsWithNext(node) {
        return !!node && (node.classList.contains('doc-heading') || node.hasAttribute('data-doc-keep'));
    }

    function layout() {
        var items = collectBlocks();
        if (!items.length) return;

        host.textContent = '';

        // A4 폭보다 좁은 화면에서는 종이 흉내를 포기하고 한 줄기로 흘린다.
        if (!window.matchMedia('(min-width: ' + PAGINATE_MIN_W + 'px)').matches) {
            var single = makeSheet();
            items.forEach(function (block) { single.appendChild(block); });
            return;
        }

        var current = makeSheet();

        items.forEach(function (block) {
            current.appendChild(block);
            if (usedHeight(current) <= PAGE_CONTENT_H) return;

            // 첫 블록부터 넘치면 나눌 곳이 없다. 그대로 두고 시트를 늘린다.
            if (current.children.length === 1) {
                current = makeSheet();
                return;
            }

            current.removeChild(block);

            // 앞 장 끝에 제목이나 회사 머리글만 남으면 본문과 함께 다음 장으로 넘긴다.
            // 제목 바로 뒤에 머리글이 오는 경우도 있어 이어진 만큼 모두 가져간다.
            var trailing = [];
            while (keepsWithNext(current.lastElementChild) && current.children.length > 1) {
                trailing.unshift(current.removeChild(current.lastElementChild));
            }

            current = makeSheet();
            trailing.forEach(function (node) { current.appendChild(node); });
            current.appendChild(block);
        });
    }

    /* 문서를 다시 그리고 다시 나눈다. 언어 전환과 최초 진입에서 함께 쓴다. */
    function draw() {
        if (!version || !window.DocRender) return;
        blocks = [];
        window.DocRender.build(host, window.DOC_DATA || {}, version, lang);
        layout();
    }

    function scheduleLayout() {
        if (relayoutTimer) window.clearTimeout(relayoutTimer);
        relayoutTimer = window.setTimeout(function () {
            relayoutTimer = null;
            layout();
        }, 150);
    }

    /* ---------------------------------------------------------- PDF 추출 */

    /* 화면 밖 이미지가 빈 칸으로 찍히지 않도록 인쇄 전에 모두 받아 둔다. */
    function loadAllImages() {
        var images = Array.prototype.slice.call(host.querySelectorAll('img'));
        images.forEach(function (image) {
            if (image.loading === 'lazy') image.loading = 'eager';
        });

        var pending = images.filter(function (image) { return !image.complete; });
        if (!pending.length) return Promise.resolve();

        return Promise.all(pending.map(function (image) {
            return new Promise(function (resolve) {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
            });
        }));
    }

    function exportPdf() {
        root.classList.add('is-exporting');
        loadAllImages().then(function () {
            root.classList.remove('is-exporting');
            window.print();
        });
    }

    /* ------------------------------------------------------------ 시작 */

    document.querySelectorAll('.paper-lang').forEach(function (button) {
        button.addEventListener('click', function () {
            setLanguage(button.getAttribute('data-lang'));
        });
    });

    pdfBtn.addEventListener('click', function () {
        exportPdf();
        pdfBtn.blur();
    });

    window.addEventListener('resize', scheduleLayout);

    applyShellLanguage();

    // 버전은 이 페이지가 직접 로드한 version.js 가 정한다(폴더 하나 = 버전 하나).
    version = window.DOC_VERSION;

    if (!version) {
        showLoadError();
    } else {
        if ((version.id || DEFAULT_VERSION) !== DEFAULT_VERSION) blockIndexing();

        applyShellLanguage();
        draw();

        // 웹폰트가 늦게 오면 줄 수가 달라진다. 로드 후 한 번 더 잰다.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(layout);
        }
    }
})();
