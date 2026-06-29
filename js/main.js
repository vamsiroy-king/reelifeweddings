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

    /* ── Dynamic Pricing & Booking Form Logic ── */
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    const bookingFormSection = document.getElementById('bookingFormSection');
    const selectedTierSelect = document.getElementById('selectedTier');
    
    // Smooth scroll from pricing card to form and pre-select tier
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tier = e.target.getAttribute('data-tier');
            // Map data-tier to the option values in the select element
            const tierMap = {
                'moments': 'Moments (₹9,999 / Event)',
                'signature': 'Signature (₹14,999 / Event)',
                'legacy': 'Legacy (₹24,999 / Event)'
            };
            
            if (selectedTierSelect && tierMap[tier]) {
                selectedTierSelect.value = tierMap[tier];
            }
            
            if (bookingFormSection) {
                lenis.scrollTo(bookingFormSection, { offset: -100, duration: 1.5 });
            }
        });
    });

    // Event Selection Logic
    const eventCards = document.querySelectorAll('.event-card');
    const selectedEventsList = document.getElementById('selectedEventsList');
    const customEventInput = document.getElementById('customEventInput');
    const addCustomEventBtn = document.getElementById('addCustomEventBtn');
    
    let selectedEvents = new Set();

    function renderEventBadges() {
        if (!selectedEventsList) return;
        selectedEventsList.innerHTML = '';
        selectedEvents.forEach(eventName => {
            const badge = document.createElement('div');
            badge.className = 'event-badge';
            badge.innerHTML = `${eventName} <i class="fas fa-times remove-btn" data-event="${eventName}"></i>`;
            selectedEventsList.appendChild(badge);
        });

        // Sync card active states
        eventCards.forEach(card => {
            const eventName = card.getAttribute('data-event');
            if (selectedEvents.has(eventName)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    // Toggle default events via cards
    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const eventName = card.getAttribute('data-event');
            if (selectedEvents.has(eventName)) {
                selectedEvents.delete(eventName);
            } else {
                selectedEvents.add(eventName);
            }
            renderEventBadges();
        });
    });

    // Add custom events
    if (addCustomEventBtn && customEventInput) {
        addCustomEventBtn.addEventListener('click', () => {
            const customEvent = customEventInput.value.trim();
            if (customEvent && !selectedEvents.has(customEvent)) {
                selectedEvents.add(customEvent);
                customEventInput.value = '';
                renderEventBadges();
            }
        });

        customEventInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomEventBtn.click();
            }
        });
    }

    // Remove events via badge click
    if (selectedEventsList) {
        selectedEventsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const eventName = e.target.getAttribute('data-event');
                selectedEvents.delete(eventName);
                renderEventBadges();
            }
        });
    }

    // Handle Booking Form Submission
    const dynamicBookingForm = document.getElementById('dynamicBookingForm');
    if (dynamicBookingForm) {
        dynamicBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const tier = selectedTierSelect.value;
            const name = document.getElementById('b_name').value.trim();
            const mobile = document.getElementById('b_mobile').value.trim();
            const email = document.getElementById('b_email').value.trim();
            const venue = document.getElementById('b_venue').value.trim();
            
            if (!tier) {
                alert('Please select a package first.');
                return;
            }
            
            if (selectedEvents.size === 0) {
                alert('Please select at least one event.');
                return;
            }

            // Create beautiful, structured WhatsApp message payload
            let message = `*✨ REELIFE WEDDINGS BOOKING ✨*%0A%0A`;
            
            message += `*👤 Client Details:*%0A`;
            message += `• Name: ${name}%0A`;
            message += `• Phone: ${mobile}%0A`;
            message += `• Email: ${email}%0A`;
            message += `• Venue / City: ${venue}%0A%0A`;
            
            message += `*💎 Selected Package:*%0A`;
            message += `• ${tier}%0A%0A`;
            
            message += `*📅 Selected Events:*%0A`;
            let index = 1;
            selectedEvents.forEach(ev => {
                message += `${index}. ${ev}%0A`;
                index++;
            });

            // Replace spaces and URI encode
            const finalURL = `https://wa.me/919148132417?text=${message.replace(/ /g, '%20')}`;
            window.open(finalURL, '_blank');
        });
    }

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
