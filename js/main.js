import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 3. Header Scroll Effect
    const header = document.querySelector('.header-main');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'var(--glass-bg-dark)';
                header.style.borderColor = 'rgba(255,255,255,0.1)';
                header.querySelectorAll('.nav-link').forEach(link => link.style.color = 'var(--color-white)');
                if(mobileToggle) mobileToggle.querySelectorAll('span').forEach(span => span.style.backgroundColor = 'var(--color-white)');
            } else {
                header.style.background = 'var(--glass-bg)';
                header.style.borderColor = 'var(--glass-border)';
                header.querySelectorAll('.nav-link').forEach(link => link.style.color = 'var(--text-main)');
                if(mobileToggle) mobileToggle.querySelectorAll('span').forEach(span => span.style.backgroundColor = 'var(--text-main)');
            }
        });
    }

    // 4. Contact Form WhatsApp Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const packageSelect = document.getElementById('package').value;
            const events = document.getElementById('events').value;
            const date = document.getElementById('date').value;
            
            // Collect checked events
            const eventTypes = [];
            document.querySelectorAll('input[name="eventType"]:checked').forEach(checkbox => {
                eventTypes.push(checkbox.value);
            });
            const details = document.getElementById('details').value;

            // Basic validation
            if (!name || !packageSelect || !events || !date || eventTypes.length === 0) {
                alert("Please fill all required fields and select at least one event type.");
                return;
            }

            let message = `*New Booking Request!*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Package:* ${packageSelect}%0A`;
            message += `*No. of Events:* ${events}%0A`;
            message += `*Event Types:* ${eventTypes.join(', ')}%0A`;
            message += `*Date(s):* ${date}%0A`;
            if (details) message += `*Details:* ${details}`;

            window.open(`https://wa.me/919148132417?text=${message}`, '_blank');
        });

        // Pre-select package from URL
        const urlParams = new URLSearchParams(window.location.search);
        const preselectedPackage = urlParams.get('package');
        if (preselectedPackage) {
            const selectElement = document.getElementById('package');
            if (selectElement) {
                for (let i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value.toLowerCase().includes(preselectedPackage.toLowerCase())) {
                        selectElement.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    }

    // 5. Creator Form WhatsApp Submission
    const creatorForm = document.getElementById('creatorForm');
    if (creatorForm) {
        creatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('creatorName').value;
            const mobile = document.getElementById('creatorMobile').value;
            const insta = document.getElementById('creatorInsta').value;
            const city = document.getElementById('creatorCity').value;
            const device = document.getElementById('creatorDevice').value;

            if (!name || !mobile || !insta || !city || !device) {
                alert("Please fill all fields.");
                return;
            }

            let message = `*New Creator Application!*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Mobile:* ${mobile}%0A`;
            message += `*Instagram:* ${insta}%0A`;
            message += `*City:* ${city}%0A`;
            message += `*Device:* ${device}%0A`;

            window.open(`https://wa.me/919148132417?text=${message}`, '_blank');
        });
    }
});
