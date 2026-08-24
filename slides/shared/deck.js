/*
 * 공용 16:9 슬라이드 덱 컨트롤러 — /portfolio 가 쓴다.
 * 참고 구현: nnn-games-website/slides/shared/deck.js
 *
 * 담당 범위
 *  - 슬라이드 전환(버튼 / 키보드 / 스와이프 / 도트)과 #/n 딥링크
 *  - KO/EN 전환. 저장 키 'language' 는 메인 사이트(js/i18n.js)와 공유해,
 *    한쪽에서 고른 언어가 다른 쪽에서도 이어지도록 한다.
 *  - 전체화면과 무입력 시 컨트롤 감추기
 *  - PDF 추출(window.print) — 인쇄 레이아웃은 deck.css 의 @media print 가 잡는다.
 *
 *  - 버전은 페이지가 직접 로드한 version.js 가 정한다. 폴더 하나가 버전 하나다.
 *
 * 로드 순서: ../data.js(문구 정본) → version.js(DECK_VERSION.slides) → deck.js
 */
(function () {
    'use strict';

    var LANGS = ['ko', 'en'];
    var STORE_KEY = 'language';
    var SWIPE_MIN = 60;   // 스와이프로 인정할 최소 이동 거리(px)
    var IDLE_MS = 2600;   // 전체화면에서 컨트롤을 감추기까지의 무입력 시간

    /* 셸 UI 문구는 모든 덱이 똑같이 쓰므로 여기에 둔다. 각 덱의 data.js 는
     * 내용 문구만 정의하고, 같은 키를 다시 쓰면 아래 값을 덮어쓴다. */
    var UI_I18N = {
        ko: {
            ui_home: '메인으로',
            ui_versions: '버전 목록으로',
            ui_lang_group: '언어 선택',
            ui_fullscreen: '전체화면',
            ui_fullscreen_exit: '전체화면 종료',
            ui_pdf: 'PDF 로 저장',
            ui_prev: '이전',
            ui_next: '다음',
            ui_appendix: '부록',
            ui_slide_position: '{{current}} / {{total}} 슬라이드',
            ui_appendix_position: '부록 {{current}} / {{total}}',
            ui_dot: '{{n}}번 슬라이드로 이동',
            ui_dot_appendix: '부록 {{n}}번으로 이동',
            ui_load_error: '덱을 불러오지 못했습니다. 주소를 확인해 주세요.'
        },
        en: {
            ui_home: 'Back to home',
            ui_versions: 'Back to version list',
            ui_lang_group: 'Language',
            ui_fullscreen: 'Fullscreen',
            ui_fullscreen_exit: 'Exit fullscreen',
            ui_pdf: 'Save as PDF',
            ui_prev: 'Prev',
            ui_next: 'Next',
            ui_appendix: 'Appendix',
            ui_slide_position: 'Slide {{current}} of {{total}}',
            ui_appendix_position: 'Appendix {{current}} of {{total}}',
            ui_dot: 'Go to slide {{n}}',
            ui_dot_appendix: 'Go to appendix {{n}}',
            ui_load_error: 'The deck could not be loaded. Please check the address.'
        }
    };

    var slidesData = [];
    var version = null;
    var i18n = mergeI18n(UI_I18N, window.DECK_I18N || {});

    function mergeI18n(base, extra) {
        var merged = {};
        LANGS.forEach(function (code) {
            merged[code] = Object.assign({}, base[code] || {}, extra[code] || {});
        });
        return merged;
    }

    var stage = document.getElementById('deckStage');
    var viewport = document.getElementById('deckViewport');
    var prevBtn = document.getElementById('deckPrev');
    var nextBtn = document.getElementById('deckNext');
    var dotsBox = document.getElementById('deckDots');
    var railFill = document.getElementById('deckRail');
    var curEl = document.getElementById('deckCurrent');
    var sepEl = document.getElementById('deckSep');
    var totalEl = document.getElementById('deckTotal');
    var nextLabel = document.getElementById('deckNextLabel');
    var announcer = document.getElementById('deckAnnounce');
    var fullBtn = document.getElementById('deckFull');
    var pdfBtn = document.getElementById('deckPdf');
    var root = document.documentElement;

    if (!stage || !viewport || !prevBtn || !nextBtn || !dotsBox || !railFill ||
        !curEl || !sepEl || !totalEl || !nextLabel || !announcer || !fullBtn || !pdfBtn) return;

    var params = new URLSearchParams(window.location.search);
    var showAll = params.get('preview') === 'all';   // ?preview=all 이면 enabled:false 도 보여 준다

    var lang = resolveLang();
    var slides = [];
    var dots = [];
    var index = 0;
    var mainTotal = 0;      // 본편 장수 (부록 제외)
    var appendixTotal = 0;  // 부록 장수
    var fauxFullscreen = false;   // 전체화면 요청이 거부됐을 때의 대체 모드
    var canFullscreen = supportsFullscreen();
    var idleTimer = null;

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

    function t(key, vars) {
        var dict = i18n[lang] || {};
        var value = dict[key];
        if (value === undefined) value = (i18n.ko && i18n.ko[key]) || '';
        if (vars) {
            Object.keys(vars).forEach(function (name) {
                value = value.split('{{' + name + '}}').join(vars[name]);
            });
        }
        return value;
    }

    function applyLanguage() {
        root.lang = lang;

        document.querySelectorAll('[data-deck-key]').forEach(function (node) {
            node.textContent = t(node.getAttribute('data-deck-key'));
        });
        document.querySelectorAll('[data-deck-key-alt]').forEach(function (node) {
            node.setAttribute('alt', t(node.getAttribute('data-deck-key-alt')));
        });
        document.querySelectorAll('[data-deck-key-aria-label]').forEach(function (node) {
            node.setAttribute('aria-label', t(node.getAttribute('data-deck-key-aria-label')));
        });
        document.querySelectorAll('.deck-lang').forEach(function (button) {
            var active = button.getAttribute('data-lang') === lang;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });

        labelSlides();
        labelNavigation();
        labelFullscreen();
        labelPdf();
    }

    function setLanguage(next) {
        if (LANGS.indexOf(next) === -1 || next === lang) return;
        lang = next;
        writeStore(next);
        applyLanguage();
    }

    /* -------------------------------------------------- 슬라이드 구성 */

    function buildSlides() {
        var chosen = {};

        slidesData.forEach(function (data) {
            var element = stage.querySelector('[data-slide="' + data.id + '"]');
            if (!element) return;

            // 아직 공개하지 않을 장은 DOM 에서 제거한다 — 인쇄 결과에도 포함되지 않는다.
            if (data.enabled === false && !showAll) {
                element.remove();
                return;
            }
            chosen[data.id] = true;
            slides.push({ data: data, element: element, appendix: data.appendix === true });
        });

        // 마크업은 모든 슬라이드를 담은 모음집이다. 이 버전이 고르지 않은 장은 빼야 한다 —
        // 남겨 두면 화면에는 안 보여도 인쇄에서 딸려 나온다.
        stage.querySelectorAll('[data-slide]').forEach(function (element) {
            if (!chosen[element.getAttribute('data-slide')]) element.remove();
        });

        // 인쇄는 DOM 순서대로 흐른다. 버전이 정한 순서로 다시 붙여야 PDF 도 같은 순서가 된다.
        slides.forEach(function (slide) { stage.appendChild(slide.element); });

        // 본편과 부록은 번호를 따로 센다 — 카운터/진행 바/라벨이 모두 이 번호를 쓴다.
        slides.forEach(function (slide) {
            slide.num = slide.appendix ? ++appendixTotal : ++mainTotal;
            if (slide.appendix) slide.element.setAttribute('data-appendix', '');
        });
    }

    function buildDots() {
        dotsBox.textContent = '';
        dots = slides.map(function (slide, slideIndex) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'deck-dot';
            if (slide.appendix) dot.classList.add('deck-dot-appendix');
            dot.addEventListener('click', function () { go(slideIndex); });
            dotsBox.appendChild(dot);
            return dot;
        });
    }

    /* -------------------------------------------------------- 상태 반영 */

    function pad(number) {
        return number < 10 ? '0' + number : String(number);
    }

    /* 위치 문구는 본편/부록을 따로 센다. 예: '3 / 7 슬라이드' vs '부록 1 / 2' */
    function position(slide) {
        return t(slide.appendix ? 'ui_appendix_position' : 'ui_slide_position', {
            current: slide.num,
            total: slide.appendix ? appendixTotal : mainTotal
        });
    }

    function labelSlides() {
        slides.forEach(function (slide) {
            slide.element.setAttribute('aria-label', position(slide));
        });
        dots.forEach(function (dot, dotIndex) {
            var slide = slides[dotIndex];
            dot.setAttribute('aria-label', t(slide.appendix ? 'ui_dot_appendix' : 'ui_dot', { n: slide.num }));
        });
    }

    /* 본편 마지막에서는 다음 버튼이 부록으로 넘어간다는 것을 미리 알려 준다. */
    function labelNavigation() {
        var next = slides[index + 1];
        nextLabel.textContent = t(next && next.appendix && !slides[index].appendix ? 'ui_appendix' : 'ui_next');
    }

    function go(next, options) {
        var opts = options || {};
        index = Math.max(0, Math.min(next, slides.length - 1));

        slides.forEach(function (slide, slideIndex) {
            var active = slideIndex === index;
            slide.element.classList.toggle('is-active', active);
            if (active) {
                slide.element.removeAttribute('inert');
            } else {
                slide.element.setAttribute('inert', '');
                slide.element.scrollTop = 0;
            }
        });

        dots.forEach(function (dot, dotIndex) {
            var active = dotIndex === index;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });

        var slide = slides[index];
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
        labelNavigation();

        // 부록에서는 '01 / 07' 대신 라벨만 남긴다(2장 이상이면 '부록 1 / 2').
        curEl.textContent = slide.appendix
            ? (appendixTotal > 1 ? position(slide) : t('ui_appendix'))
            : pad(slide.num);
        sepEl.hidden = slide.appendix;
        totalEl.hidden = slide.appendix;

        // 진행 바는 본편 기준이다 — 마지막 본편에서 100% 가 되고 부록에서도 그대로 둔다.
        railFill.style.width = (slide.appendix ? 100 : slide.num / (mainTotal || 1) * 100) + '%';

        if (!opts.silent) {
            var heading = slide.element.querySelector('h1, h2, .slide-kicker');
            announcer.textContent = position(slide) + (heading ? ' — ' + heading.textContent : '');
        }

        // 첫 진입(1번 슬라이드, 해시 없음)에서는 URL 을 건드리지 않는다.
        var hash = '#/' + (index + 1);
        if (window.location.hash !== hash && !(index === 0 && !window.location.hash)) {
            history.replaceState(null, '', window.location.pathname + window.location.search + hash);
        }
    }

    function fromHash() {
        var match = /^#\/(\d+)$/.exec(window.location.hash || '');
        if (!match) return 0;
        var target = parseInt(match[1], 10) - 1;
        return isNaN(target) ? 0 : Math.max(0, Math.min(target, slides.length - 1));
    }

    /* -------------------------------------------------------- 전체화면 */

    function fullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function isFullscreen() {
        return !!fullscreenElement() || fauxFullscreen;
    }

    /* iPhone Safari 처럼 요소 전체화면이 없는 환경, iframe 삽입처럼 정책으로 막힌
     * 환경에서는 버튼을 노출하지 않는다(눌러도 아무 일도 일어나지 않기 때문). */
    function supportsFullscreen() {
        if (!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)) return false;
        var allowed = document.fullscreenEnabled;
        if (allowed === undefined) allowed = document.webkitFullscreenEnabled;
        return allowed !== false;
    }

    function labelFullscreen() {
        var label = t(isFullscreen() ? 'ui_fullscreen_exit' : 'ui_fullscreen');
        fullBtn.setAttribute('aria-label', label);
        fullBtn.setAttribute('title', label);
        fullBtn.setAttribute('aria-pressed', String(isFullscreen()));
    }

    /* 무입력이 이어지면 컨트롤과 커서를 감춘다. 아무 입력이 들어오면 곧바로 되돌린다. */
    function wake() {
        if (idleTimer) window.clearTimeout(idleTimer);
        idleTimer = null;
        root.classList.remove('is-idle');
        if (!isFullscreen()) return;

        idleTimer = window.setTimeout(function () {
            idleTimer = null;
            root.classList.add('is-idle');
        }, IDLE_MS);
    }

    function syncFullscreen() {
        // CSS 가 이 클래스를 보고 컨트롤을 띄우고 캔버스 상한을 푼다(deck.css).
        root.classList.toggle('is-fullscreen', isFullscreen());
        labelFullscreen();
        wake();
    }

    function fallbackFullscreen() {
        // 요청이 거부된 경우 — 컨트롤만 접어 창 안에서 최대한 넓게 쓴다.
        fauxFullscreen = true;
        syncFullscreen();
    }

    function toggleFullscreen() {
        if (!canFullscreen) return;

        if (isFullscreen()) {
            var exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (fullscreenElement() && exit) exit.call(document);
            // 대체 모드는 알려 줄 이벤트가 없으므로 여기서 직접 되돌린다.
            if (fauxFullscreen) {
                fauxFullscreen = false;
                syncFullscreen();
            }
            return;
        }

        var request = root.requestFullscreen || root.webkitRequestFullscreen;
        try {
            var pending = request.call(root);
            if (pending && typeof pending.catch === 'function') pending.catch(fallbackFullscreen);
        } catch (e) {
            fallbackFullscreen();
        }
    }

    function onFullscreenChange() {
        if (fullscreenElement()) fauxFullscreen = false;
        syncFullscreen();
    }

    /* ------------------------------------------------------- PDF 추출 */

    function labelPdf() {
        var label = t('ui_pdf');
        pdfBtn.setAttribute('aria-label', label);
        pdfBtn.setAttribute('title', label);
    }

    /* 화면에 없던 장의 이미지는 아직 내려받히지 않았을 수 있다. 인쇄를 걸기 전에
     * lazy 를 풀고 모든 이미지가 끝날 때까지 기다려야 빈 칸 없는 PDF 가 나온다. */
    function loadAllImages() {
        var images = Array.prototype.slice.call(stage.querySelectorAll('img'));
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

    /* 브라우저의 인쇄 대화상자를 연다. 대상을 '다른 이름으로 PDF 저장'으로 두고
     * 여백 없음 / 배경 그래픽 켜기로 저장하면 1280x720 슬라이드가 그대로 나온다. */
    function exportPdf() {
        if (isFullscreen()) toggleFullscreen();   // 전체화면 상태에서는 인쇄 대화상자가 가려진다
        root.classList.add('is-exporting');

        loadAllImages().then(function () {
            root.classList.remove('is-exporting');
            window.print();
        });
    }

    /* Ctrl+P 로 직접 인쇄하는 경로에서도 최소한 lazy 는 풀어 둔다. */
    function onBeforePrint() {
        stage.querySelectorAll('img[loading="lazy"]').forEach(function (image) {
            image.loading = 'eager';
        });
    }

    /* ------------------------------------------------------------ 조작 */

    function bind() {
        prevBtn.addEventListener('click', function () { go(index - 1); });
        nextBtn.addEventListener('click', function () { go(index + 1); });

        fullBtn.addEventListener('click', function () {
            toggleFullscreen();
            // 초점이 남아 있으면 Space 가 슬라이드 넘김 대신 전체화면 토글로 먹힌다.
            fullBtn.blur();
        });
        pdfBtn.addEventListener('click', function () {
            exportPdf();
            pdfBtn.blur();
        });

        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        window.addEventListener('beforeprint', onBeforePrint);

        ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (type) {
            document.addEventListener(type, function () { if (isFullscreen()) wake(); }, { passive: true });
        });

        document.querySelectorAll('.deck-lang').forEach(function (button) {
            button.addEventListener('click', function () { setLanguage(button.getAttribute('data-lang')); });
        });

        document.addEventListener('keydown', function (event) {
            // Ctrl+P 같은 브라우저 단축키는 그대로 통과시킨다.
            if (event.metaKey || event.ctrlKey || event.altKey) return;

            var onButton = document.activeElement && document.activeElement.tagName === 'BUTTON';
            if (onButton && (event.key === ' ' || event.key === 'Enter')) return;

            switch (event.key) {
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    event.preventDefault();
                    go(index + 1);
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    event.preventDefault();
                    go(index - 1);
                    break;
                case 'Home':
                    event.preventDefault();
                    go(0);
                    break;
                case 'End':
                    event.preventDefault();
                    go(slides.length - 1);
                    break;
                case 'f':
                case 'F':
                    event.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    // 네이티브 전체화면은 브라우저가 닫아 준다. 대체 모드만 직접 처리한다.
                    if (fauxFullscreen) {
                        event.preventDefault();
                        toggleFullscreen();
                    }
                    break;
            }
        });

        var startX = 0;
        var startY = 0;
        var tracking = false;

        viewport.addEventListener('touchstart', function (event) {
            if (event.touches.length !== 1) { tracking = false; return; }
            tracking = true;
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        }, { passive: true });

        viewport.addEventListener('touchend', function (event) {
            if (!tracking) return;
            tracking = false;

            var touch = event.changedTouches[0];
            var dx = touch.clientX - startX;
            var dy = touch.clientY - startY;

            // 세로 스크롤과 겹치지 않도록 수평 이동이 더 클 때만 슬라이드를 넘긴다.
            if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) <= Math.abs(dy)) return;
            go(dx < 0 ? index + 1 : index - 1);
        }, { passive: true });

        window.addEventListener('hashchange', function () {
            var target = fromHash();
            if (target !== index) go(target);
        });
    }

    /* ------------------------------------------------------------ 시작 */

    var DEFAULT_VERSION = 'default';

    /* 맞춤 버전은 지원처에 링크로 전달하는 문서다. 검색 노출을 막는다. */
    function blockIndexing() {
        var meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
    }

    function start() {
        buildSlides();
        if (!slides.length) return;

        buildDots();
        bind();
        fullBtn.hidden = !canFullscreen;
        totalEl.textContent = pad(mainTotal);
        applyLanguage();

        if (version && version.title) {
            document.title = version.title[lang] || version.title.ko || document.title;
        }
        go(fromHash(), { silent: true });
    }

    // 버전은 이 페이지가 직접 로드한 version.js 가 정한다(폴더 하나 = 버전 하나).
    version = window.DECK_VERSION;

    if (!version) {
        announcer.textContent = t(ui_load_error);
    } else {
        slidesData = version.slides || [];
        if ((version.id || DEFAULT_VERSION) !== DEFAULT_VERSION) blockIndexing();
        start();
    }
})();
