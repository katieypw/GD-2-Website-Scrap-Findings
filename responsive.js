// Responsive viewport scaling
// Desktop (> 768 px): proportional body zoom tied to window width.
// Mobile  (≤ 768 px): reset body zoom so CSS handles the stacked layout;
//                     scale the floating-shapes nav-map to fit the screen.
(function () {
    var BASE_WIDTH = 1300;
    var MOBILE_BP  = 768;

    function applyScale() {
        var vw = window.innerWidth;
        var navWrapper = document.querySelector('.nav-wrapper');

        if (vw <= MOBILE_BP) {
            // Mobile: neutralise the CSS zoom set in style.css
            document.body.style.zoom = '1';

            // Scale the interactive shapes map (index.html) to fit the phone screen
            if (navWrapper) {
                var s = parseFloat((vw / 1000).toFixed(4)); // 1000 = designed nav-wrapper width
                navWrapper.style.transform       = 'scale(' + s + ')';
                navWrapper.style.transformOrigin = 'top center';
                // Collapse the empty logical space transform leaves behind
                navWrapper.style.marginBottom    = Math.round((s - 1) * 800) + 'px';
            }
        } else {
            // Desktop: restore any mobile overrides, then apply body zoom
            if (navWrapper) {
                navWrapper.style.transform       = '';
                navWrapper.style.transformOrigin = '';
                navWrapper.style.marginBottom    = '';
            }
            var scale = vw / BASE_WIDTH;
            scale = Math.max(0.65, Math.min(scale, 1.3));
            document.body.style.zoom = scale;
        }
    }

    // Run immediately so there is no flash of wrong zoom
    applyScale();

    // Re-run whenever the window is resized
    window.addEventListener('resize', applyScale);
})();
