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
    initWhatsAppCTA();
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

/* ── 2. Static Logo Handler (Native App Feel) ── */
function initScrollLogo() {
    const logo = document.getElementById('mainLogo');
    const header = document.getElementById('mainHeader');

    if (!logo || !header) return;

    // Remove complex scroll animations for a clean, static, "React Native" feel.
    // Ensure the logo stays neatly in the header area globally.
    gsap.set(logo, { top: '70px', scale: window.innerWidth < 1000 ? 0.5 : 0.38, y: '-50%', x: '-50%' });

    // Header background toggle on scroll
    ScrollTrigger.create({
        trigger: "body",
        start: "top -50",
        onUpdate: (self) => {
            if (self.scroll() > 50) {
                header.classList.add('scrolled');
                logo.classList.add('logo-scrolled');
            } else {
                header.classList.remove('scrolled');
                logo.classList.remove('logo-scrolled');
            }
        }
    });
}

/* ── Add WhatsApp Floating CTA ── */
function initWhatsAppCTA() {
    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'whatsapp-cta-wrapper';

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'whatsapp-tooltip';
    tooltip.innerText = 'Hi! How can we help you?';
    
    // WhatsApp Button
    const waCTA = document.createElement('a');
    waCTA.href = 'https://wa.me/919148132417';
    waCTA.target = '_blank';
    waCTA.className = 'whatsapp-cta-global';
    waCTA.innerHTML = '<i class="fab fa-whatsapp"></i>';

    wrapper.appendChild(tooltip);
    wrapper.appendChild(waCTA);
    document.body.appendChild(wrapper);

    // Animate Tooltip In after delay
    gsap.to(tooltip, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 2 // Wait 2 seconds before showing
    });

    // Optionally hide tooltip after 8 seconds
    gsap.to(tooltip, {
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: 'power2.in',
        delay: 10
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
