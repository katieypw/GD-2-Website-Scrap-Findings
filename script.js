// Background animation - moves downwards and loops
document.addEventListener('DOMContentLoaded', function() {
    const shapes = document.querySelectorAll('.shape-wrapper');
    if (!shapes.length) {
        return;
    }

    const shapeConfigs = Array.from(shapes, function (wrapper, index) {
        return {
            wrapper: wrapper,
            speed: 0.03 + (index * 0.001),
            amplitude: 3,
            phase: index * 100
        };
    });

    let time = 0;
    let animationFrameId = null;

    function animateShapes() {
        if (document.hidden) {
            animationFrameId = null;
            return;
        }

        shapeConfigs.forEach(function (shape) {
            const t = time + shape.phase;
            const floatX = Math.sin(t * shape.speed) * shape.amplitude;
            const floatY = Math.cos(t * shape.speed * 0.7) * shape.amplitude;
            shape.wrapper.style.transform = `translate(${floatX}px, ${floatY}px)`;
        });

        time += 1;
        animationFrameId = requestAnimationFrame(animateShapes);
    }

    function startAnimationIfNeeded() {
        if (animationFrameId === null && !document.hidden) {
            animationFrameId = requestAnimationFrame(animateShapes);
        }
    }

    document.addEventListener('visibilitychange', startAnimationIfNeeded);
    startAnimationIfNeeded();
});
