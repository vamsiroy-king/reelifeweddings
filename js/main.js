/* ═══════════════════════════════════════════════════
   Main JavaScript — White & Red Premium V11 (GSAP + Lenis Edition)
   ═══════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all'; // Import from 'gsap/all' is safer for some bundlers
import Lenis from 'lenis';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollLogo();
    initMobileMenu();
});

/* ── 1. Lenis Smooth Scroll (The "Thick" App Feel) ── */
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2, // More responsive on mobile
        infinite: false,
    });

    // 1b. Connect Lenis to GSAP ScrollTrigger
    // This ensures GSAP animations stay perfectly synced with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // 1c. Add Lenis RAF loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 1d. Add specific class to body for CSS hooks
    document.body.classList.add('smooth-scroll-active');
}

/* ── 2. GSAP Logo Animation (Precision 60fps) ── */
function initScrollLogo() {
    const logo = document.getElementById('mainLogo');
    const header = document.getElementById('mainHeader');

    // Safety checks
    if (!logo || !header) return;

    // Detect Mobile (Simple width check for initial config)
    // We utilize GSAP's responsive matching/functions for better handling usually,
    // but for this specific logic, a simple check works for the timeline setup.
    const isMobile = window.innerWidth < 1000;
    const isStaticPage = document.body.classList.contains('static-logo-page');

    // STATIC PAGE: No heavy animation, just ensure it's in place
    if (isStaticPage) {
        gsap.set(logo, { top: '70px', scale: isMobile ? 0.5 : 0.38, y: '-50%', x: '-50%' });
        // Header background toggle for static pages
        ScrollTrigger.create({
            trigger: "body",
            start: "top -100",
            onUpdate: (self) => {
                if (self.scroll() > 100) {
                    header.classList.add('scrolled');
                    logo.classList.add('logo-scrolled');
                } else {
                    header.classList.remove('scrolled');
                    logo.classList.remove('logo-scrolled');
                }
            }
        });
        return;
    }

    // HOME PAGE ANIMATION
    // Initial State (Center of Screen)
    // defined in CSS, but let's enforce via GSAP to prevent FOUC
    // CSS: top: 50%, left: 50%, transform: translate(-50%, -50%) scale(1)

    // We want to animate TO:
    // top: 70px (Header center)
    // scale: 0.38 (Desktop) / 0.5 (Mobile)

    const endScale = isMobile ? 0.50 : 0.38;
    const scrollDistance = window.innerHeight; // 100vh scroll distance

    // Create a Timeline linked to Scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",       // Entire page scroll drives it
            start: "top top",      // Start when top of body hits top of viewport
            end: `+=${scrollDistance}`, // End after scrolling 1 screen height
            scrub: 1,              // 1 second "catch up" smoothing (The "Weighty" feel)
            priority: 1
        }
    });

    // The Animation
    tl.to(logo, {
        top: '70px',
        scale: endScale,
        ease: "power2.out" // Slight ease out for premium feel
    });

    // Header Background & Logo Color Toggle
    // This needs to happen exactly when the logo reaches the header area.
    // We can use a separate ScrollTrigger for precise class toggling.
    ScrollTrigger.create({
        trigger: "body",
        start: `top -${scrollDistance - 100}`, // Just before the animation ends
        onEnter: () => {
            header.classList.add('scrolled');
            logo.classList.add('logo-scrolled');
        },
        onLeaveBack: () => {
            header.classList.remove('scrolled');
            logo.classList.remove('logo-scrolled');
        }
    });
}

/* ── 3. Mobile Menu (Touch-Optimized) ── */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');

    if (!mobileToggle || !mobileMenu) return;

    mobileToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isActive);

        // Animate Hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (isActive) {
            gsap.to(spans[0], { rotation: 45, y: 5, duration: 0.3 });
            gsap.to(spans[1], { rotation: -45, y: -5, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');

            // Reset Hamburger
            const spans = mobileToggle.querySelectorAll('span');
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
        });
    });
}
