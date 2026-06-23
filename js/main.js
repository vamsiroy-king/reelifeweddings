import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHeader();
    initMobileMenu();
});

/* ── 1. Lenis Smooth Scroll ── */
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
}

/* ── 2. Header Scroll Effect ── */
function initHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    ScrollTrigger.create({
        trigger: "body",
        start: "top -50",
        onUpdate: (self) => {
            if (self.scroll() > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

/* ── 3. Mobile Menu ── */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu .nav-link');
    
    if (!toggle || !menu) return;

    let isActive = false;

    function toggleMenu() {
        isActive = !isActive;
        menu.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        const spans = toggle.querySelectorAll('span');
        if (isActive) {
            gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.2 });
            gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.2 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    }

    toggle.addEventListener('click', toggleMenu);
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isActive) toggleMenu();
        });
    });
}
