/* ═══════════════════════════════════════════════════
   Main JavaScript — White & Red Premium V11
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollLogo();
});

function initScrollLogo() {
    // Note: Removed early return for 'static-logo-page' so we can still get the Color Toggles!

    const logo = document.getElementById('mainLogo');
    const header = document.getElementById('mainHeader');

    // CONFIGURATION
    // ------------------------------------------------
    // The scroll distance over which the animation completes
    const animationDistance = window.innerHeight; // 100vh

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY; // RESTORED (Fixes crash)
        const isMobile = window.innerWidth < 900;
        const isStaticPage = document.body.classList.contains('static-logo-page');

        // 1. Header Background Toggler
        // Define specific INTERACTION POINTS based on device
        let headerThreshold;

        if (isStaticPage) {
            // Static Pages have shorter heroes (approx 500-600px).
            // Let's toggle sooner.
            headerThreshold = 300;
        } else if (isMobile) {
            headerThreshold = window.innerHeight - 100;
        } else {
            headerThreshold = window.innerHeight - 100;
        }

        if (scrolled > headerThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Logo Animation Logic (Smooth Continuous Lerp)
        // ------------------------------------------------

        // IF STATIC PAGE: Skip the movement/scale logic!
        if (!isStaticPage) {
            // Calculate Progress (0.0 to 1.0)
            let progress = scrolled / animationDistance;
            if (progress > 1) progress = 1;

            // TARGET VALUES
            // We want to move from Center Screen (50vh) to Header Center (70px for 140px header)
            const startTop = window.innerHeight / 2;
            const endTop = 70;                       // Center of 140px header

            // Scale Targets (Bigger Logo)
            const startScale = 1;
            const endScale = isMobile ? 0.50 : 0.38; // Mobile: 0.50, Desktop: 0.38 (Significantly larger)

            // Interpolation
            const currentTop = startTop - (progress * (startTop - endTop));
            const currentScale = startScale - (progress * (startScale - endScale));

            // Apply Styles
            logo.style.top = `${currentTop}px`;
            logo.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        }

        // Toggle 'logo-scrolled' for black filter
        // Sync EXACTLY with Header Background for clean "snap" effect
        if (scrolled > headerThreshold) {
            logo.classList.add('logo-scrolled');
        } else {
            logo.classList.remove('logo-scrolled');
        }

    }, { passive: true });
}

// Mobile Menu Logic
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu-overlay');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Lock body scroll

        // Animate Hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            // Need 3 spans for standard burger, but we have 2. Let's stick to simple or add a 3rd.
            // Current HTML has 2 spans.
            // Let's just make it X.
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
        }
    });
}
