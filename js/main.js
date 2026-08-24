/*
 * 메인 페이지 동작 — 모바일 메뉴, 헤더 스크롤 상태, 푸터 연도.
 * 다국어는 js/i18n.js 가 따로 담당한다.
 */
(function () {
    'use strict';

    var header = document.querySelector('.site-header');
    var nav = document.getElementById('siteNav');
    var toggle = document.querySelector('.menu-toggle');

    /* --------------------------------------------------- 모바일 메뉴 */

    function closeMenu() {
        if (!nav || !toggle) return;
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    if (nav && toggle) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });

        // 메뉴 안의 링크를 눌러 이동하면 메뉴는 닫는다(언어 버튼은 예외).
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });

        // 데스크톱 폭으로 돌아오면 접힌 상태를 초기화한다.
        window.matchMedia('(min-width: 768px)').addEventListener('change', function (event) {
            if (event.matches) closeMenu();
        });
    }

    /* ------------------------------------------------- 헤더 스크롤 */

    if (header) {
        var syncHeader = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', syncHeader, { passive: true });
        syncHeader();
    }

    /* ------------------------------------------------------ 푸터 연도 */

    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
