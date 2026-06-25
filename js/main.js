import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Swiper is loaded globally via CDN in head for simplicity, but we can access it here.

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

    // 2. Swiper Coverflow Initialization
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper-container-hero', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1.5,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                }
            },
            loop: true,
            initialSlide: 0,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            on: {
                init: function () {
                    playActiveVideo(this);
                },
                slideChangeTransitionEnd: function () {
                    playActiveVideo(this);
                },
            }
        });

        function playActiveVideo(swiperInstance) {
            // Pause all videos
            document.querySelectorAll('.reel-video').forEach(video => {
                video.pause();
                video.currentTime = 0; // reset
                    });
            // Play active slide video
            const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
            const activeVideo = activeSlide.querySelector('video');
            if (activeVideo) {
                activeVideo.play().catch(e => console.log("Autoplay prevented"));
            }
        }
    }

    // 3. Mobile Menu Toggle
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

    // 4. Removed Floating Header Scroll Effect as per minimal static design

    // 5. Contact Form WhatsApp Submission (The Sky Form)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const venue = document.getElementById('venue').value;
            
            let source = 'Not specified';
            const sourceEl = document.querySelector('input[name="source"]:checked');
            if (sourceEl) {
                source = sourceEl.value;
            }

            if (!name || !mobile || !email || !date) {
                alert("Please fill all required fields.");
                return;
            }

            let message = `*New Booking Inquiry!*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Phone:* ${mobile}%0A`;
            message += `*Email:* ${email}%0A`;
            message += `*Event Date:* ${date}%0A`;
            if (venue) message += `*Venue:* ${venue}%0A`;
            message += `*Source:* ${source}`;

            window.open(`https://wa.me/919148132417?text=${message}`, '_blank');
        });
    }

    // 6. FAQs Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const card = question.parentElement;
            
            // Close others
            document.querySelectorAll('.faq-card').forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            
            // Toggle current
            card.classList.toggle('active');
        });
    });

    /* ── South Indian Theme: Falling Petals Animation ── */
    function createPetals() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Create container
        const petalContainer = document.createElement('div');
        petalContainer.className = 'falling-petals';
        heroSection.appendChild(petalContainer);

        // Generate 30 petals
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.className = `petal ${Math.random() > 0.5 ? 'white' : ''}`;
            
            // Randomize position, delay, and duration
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${5 + Math.random() * 5}s`;
            petal.style.animationDelay = `-${Math.random() * 5}s`;
            
            petalContainer.appendChild(petal);
        }
    }
    
    // Initialize falling petals
    createPetals();
});
