// Responsive viewport scaling
// Keeps the design looking correct at any desktop window size.
// The layout was designed at ~1300px effective width, which at 1440px
// matches the original zoom: 110% in style.css.
(function () {
    var BASE_WIDTH = 1300;

    function applyScale() {
        var vw = window.innerWidth;
        var scale = vw / BASE_WIDTH;
        // Clamp: 65% minimum (very small windows) – 130% maximum (large monitors)
        scale = Math.max(0.65, Math.min(scale, 1.3));
        document.body.style.zoom = scale;
    }

    // Run immediately so there is no flash of wrong zoom
    applyScale();

    // Re-run whenever the window is resized
    window.addEventListener('resize', applyScale);
})();
