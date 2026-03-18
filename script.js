// Background animation - moves downwards and loops
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    let backgroundYPos = 0;
    const moveSpeed = 0.2;  // pixels per frame (lower = slower)
    const maxYOffset = 60; // how far down to move before resetting (pixels)
    const pauseAt = maxYOffset; // pause at this position (milliseconds pause)
    
    function animateBackground() {
        // Move background position down
        backgroundYPos += moveSpeed;
        
        // Update background position
        body.style.backgroundPosition = `center ${-backgroundYPos}px`;
        
        // Reset when reaching max offset
        if (backgroundYPos >= maxYOffset) {
            backgroundYPos = 0;
            // Optional: add a pause here by delaying next animation
            setTimeout(() => {
                requestAnimationFrame(animateBackground);
            }, 500); // 500ms pause before repeating
            return;
        }
        
        requestAnimationFrame(animateBackground);
    }
    
    // Start the animation
    animateBackground();

    // Animate shape buttons with floating effect
    const shapes = document.querySelectorAll('.shape-wrapper');
    
    shapes.forEach((wrapper, index) => {
        // Create unique animation for each shape
        const speed = 0.03 + (index * 0.001); // vary speed per shape
        const amplitude = 3; // how far to move (pixels)
        let time = index * 100; // offset start time for variety
        
        function float() {
            // Create circular motion: horizontal and vertical drift
            const floatX = Math.sin(time * speed) * amplitude;
            const floatY = Math.cos(time * speed * 0.7) * amplitude;
            
            // Apply transform to wrapper (affects both shape and label)
            wrapper.style.transform = `translate(${floatX}px, ${floatY}px)`;
            
            time += 1;
            requestAnimationFrame(float);
        }
        
        float();
    });
});
