/* ═══════════════════════════════════════════════════
   Main JavaScript — White & Red Premium V11
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollLogo();
    initMobileMenu();
});

function initScrollLogo() {
    const logo = document.getElementById('mainLogo');
    const header = document.getElementById('mainHeader');

    if (!logo || !header) return;

    // CONFIGURATION
    const animationDistance = window.innerHeight; // 100vh

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const isMobile = window.innerWidth < 900;
        const isStaticPage = document.body.classList.contains('static-logo-page');

        // 1. Header Background Toggler
        let headerThreshold;

        if (isStaticPage) {
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
        if (!isStaticPage) {
            let progress = scrolled / animationDistance;
            if (progress > 1) progress = 1;

            const startTop = window.innerHeight / 2;
            const endTop = 70;

            const startScale = 1;
            const endScale = isMobile ? 0.50 : 0.38;

            const currentTop = startTop - (progress * (startTop - endTop));
            const currentScale = startScale - (progress * (startScale - endScale));

            logo.style.top = `${currentTop}px`;
            logo.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        }

        // Toggle 'logo-scrolled' for black filter
        if (scrolled > headerThreshold) {
            logo.classList.add('logo-scrolled');
        } else {
            logo.classList.remove('logo-scrolled');
        }

    }, { passive: true });
}

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');

    if (!mobileToggle || !mobileMenu) return;

    mobileToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isActive);

        // Animate Hamburger to X (2-span version)
        const spans = mobileToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });
}
