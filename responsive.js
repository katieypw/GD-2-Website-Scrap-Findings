// Responsive viewport scaling
// Keeps the design looking correct at any desktop window size.
// The layout was designed at ~1300px effective width, which at 1440px
// matches the original zoom: 110% in style.css.
(function () {
    var BASE_WIDTH = 1300;
    var MAIN_PAGE_BREAKPOINT = 430;
    var MOBILE_ARCHIVE_BREAKPOINT = 900;

    function applyScale() {
        var vw = window.innerWidth;
        var isMainPage = document.body && document.body.id === 'main-page';
        var isArchivePage = document.body && document.body.id === 'archive';
        var scale;

        if (isMainPage && vw <= 768) {
            // Keep mobile index at full size until a narrow threshold is reached.
            scale = vw >= MAIN_PAGE_BREAKPOINT ? 1 : Math.max(0.92, vw / MAIN_PAGE_BREAKPOINT);
        } else if (isArchivePage && vw <= MOBILE_ARCHIVE_BREAKPOINT) {
            // Let archive pages use the stacked mobile layout at full size.
            scale = 1;
        } else {
            scale = vw / BASE_WIDTH;
        }

        // Clamp: 65% minimum (very small windows) – 130% maximum (large monitors)
        scale = Math.max(0.65, Math.min(scale, 1.3));
        document.body.style.zoom = scale;
    }

    // Run immediately so there is no flash of wrong zoom
    applyScale();

    // Re-run whenever the window is resized
    window.addEventListener('resize', applyScale);
})();
