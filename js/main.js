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
    
    
    let isGlobalSoundOn = false;

    // Direct click handler for mute/unmute buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.slide-mute-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle sound
            isGlobalSoundOn = !isGlobalSoundOn;
            
            // Immediately apply to the actively visible video
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const video = activeSlide.querySelector('.reel-video');
                const icon = btn.querySelector('i');
                if (video) {
                    if (isGlobalSoundOn) {
                        video.muted = false;
                        video.volume = 1.0;
                        if(icon) icon.className = 'fas fa-volume-high';
                        // Also update all duplicate active slides visually
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-high');
                    } else {
                        video.muted = true;
                        if(icon) icon.className = 'fas fa-volume-xmark';
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-xmark');
                    }
                }
            }
            
            // Also force update all other slides to be muted
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                if (!slide.classList.contains('swiper-slide-active') && !slide.classList.contains('swiper-slide-duplicate-active')) {
                    const video = slide.querySelector('.reel-video');
                    const slideBtn = slide.querySelector('.slide-mute-btn i');
                    if (video) video.muted = true;
                    if (slideBtn) slideBtn.className = 'fas fa-volume-xmark';
                }
            });
        }
    });

    
    // Dynamically clone slides if there are too few for a wide desktop screen
    // This keeps the HTML clean but ensures Swiper's loop engine has enough elements to render infinitely without breaking
    const swiperWrapper = document.querySelector('.swiper-container-hero .swiper-wrapper');
    if (swiperWrapper) {
        const slides = Array.from(swiperWrapper.children);
        if (slides.length > 0 && slides.length < 10) {
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                swiperWrapper.appendChild(clone);
            });
        }
    }

    if (typeof Swiper !== 'undefined') {
        window.heroSwiper = new Swiper('.swiper-container-hero', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            loopedSlides: 3,
            observer: true,
            observeParents: true,
            initialSlide: 7,
            coverflowEffect: {
                rotate: 0,
                stretch: -20,
                depth: 150,
                modifier: 2.5,
                slideShadows: false,
            },
            on: {
                init: function () {
                    // Mute and pause all videos except the center one
                    document.querySelectorAll('.reel-video').forEach(video => {
                        video.muted = true;
                        video.pause();
                    });
                    
                    // Give swiper a tiny delay to mark the active slide, then play it
                    setTimeout(() => {
                        const activeSlide = document.querySelector('.swiper-slide-active');
                        if (activeSlide) {
                            const video = activeSlide.querySelector('.reel-video');
                            if (video) video.play().catch(e => {});
                        }
                    }, 100);
                },
                slideChangeTransitionEnd: function () {
                    // Pause all videos to save bandwidth and CPU
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        const video = slide.querySelector('.reel-video');
                        const btn = slide.querySelector('.slide-mute-btn i');
                        if (video) {
                            video.muted = true;
                            video.pause(); // Stop playing inactive videos!
                        }
                        if (btn) btn.className = 'fas fa-volume-xmark';
                    });

                    // Play and optionally unmute the active slide
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) {
                        const video = activeSlide.querySelector('.reel-video');
                        if (video) {
                            video.play().catch(e => {}); // Play only the active video
                            activeSlide.classList.remove('video-paused');
                            
                            if (isGlobalSoundOn) {
                                video.muted = false;
                                video.volume = 1.0;
                            }
                        }
                    }

                    // Update UI icons for active
                    if (isGlobalSoundOn) {
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-high');
                    }
                },
            }
        });
    }

    
    // Auto-pause and mute videos when carousel scrolls out of view
    const carouselSection = document.querySelector('.hero-carousel-section');
    if (carouselSection && typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    document.querySelectorAll('.reel-video').forEach(video => {
                        video.muted = true;
                        video.pause();
                        // Reset play button states
                        const btn = video.nextElementSibling;
                        if (btn && btn.classList.contains('slide-mute-btn')) {
                            btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
                        }
                    });
                }
            });
        }, { threshold: 0 });
        observer.observe(carouselSection);
    }


    
    // Play/Pause toggle on click
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('reel-video')) {
            const video = e.target;
            const slide = video.closest('.swiper-slide');
            
            if (video.paused) {
                video.play().catch(e => console.log('Play prevented'));
                if (slide) slide.classList.remove('video-paused');
            } else {
                video.pause();
                if (slide) slide.classList.add('video-paused');
            }
        }
    });


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

            let message = `*New Booking Inquiry!*\n\n`;
            message += `*Name:* ${name}\n`;
            message += `*Phone:* ${mobile}\n`;
            message += `*Email:* ${email}\n`;
            message += `*Event Date:* ${date}\n`;
            if (venue) message += `*Venue:* ${venue}\n`;
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

    /* ── New Booking Form Logic (contact.html) ── */
    /* ── New Booking Form Logic (contact.html) ── */
    const packageChips = document.querySelectorAll('#packageChips .event-chip');
    const eventChipsContainer = document.getElementById('eventChips');
    const eventDatesContainer = document.getElementById('eventDatesContainer');
    const customEventInput = document.getElementById('customEventInput');
    const addCustomEventBtn = document.getElementById('addCustomEventBtn');
    
    // Receipt Elements
    const quotationReceipt = document.getElementById('quotationReceipt');
    const receiptPackageName = document.getElementById('receiptPackageName');
    const receiptBasePrice = document.getElementById('receiptBasePrice');
    const receiptEventCount = document.getElementById('receiptEventCount');
    const receiptTotalPrice = document.getElementById('receiptTotalPrice');

    let selectedPackage = null;
    let selectedPackagePrice = 0;
    let selectedEvents = new Set();
    
    const packagePricing = {
        moments: 9999,
        signature: 14999,
        legacy: 24999
    };
    
    const packageDisplayNames = {
        moments: 'Moments',
        signature: 'Signature',
        legacy: 'Legacy'
    };

    function formatCurrency(num) {
        return '₹' + num.toLocaleString('en-IN');
    }

    function updateQuotation() {
        if (!quotationReceipt) return;
        
        if (selectedPackage && selectedEvents.size > 0) {
            quotationReceipt.style.display = 'block';
            
            receiptPackageName.textContent = packageDisplayNames[selectedPackage];
            receiptBasePrice.textContent = formatCurrency(selectedPackagePrice);
            receiptEventCount.textContent = selectedEvents.size;
            
            const total = selectedPackagePrice * selectedEvents.size;
            receiptTotalPrice.textContent = formatCurrency(total);
        } else {
            quotationReceipt.style.display = 'none';
        }
    }

    function renderEventDates() {
        if (!eventDatesContainer) return;
        
        // Store current date values before re-rendering to prevent clearing them
        const currentDates = {};
        const existingInputs = eventDatesContainer.querySelectorAll('input[type="date"]');
        existingInputs.forEach(input => {
            if (input.value) {
                currentDates[input.dataset.eventDate] = input.value;
            }
        });

        eventDatesContainer.innerHTML = '';
        
        if (selectedEvents.size === 0) return;

        const title = document.createElement('h4');
        title.textContent = 'Event Dates & Venue Details';
        title.style.marginBottom = '15px';
        title.style.color = 'var(--color-primary)';
        eventDatesContainer.appendChild(title);

        selectedEvents.forEach(ev => {
            const row = document.createElement('div');
            row.className = 'event-date-row';

            const label = document.createElement('label');
            label.textContent = ev + ' Date:';

            const input = document.createElement('input');
            input.type = 'date';
            input.dataset.eventDate = ev;
            
            // Restore previously entered value
            if (currentDates[ev]) {
                input.value = currentDates[ev];
            }

            row.appendChild(label);
            row.appendChild(input);
            eventDatesContainer.appendChild(row);
        });
        
        updateQuotation();
    }

    // Auto-select package from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedPkg = urlParams.get('package');
    if (preselectedPkg && packageChips.length) {
        packageChips.forEach(chip => {
            if (chip.getAttribute('data-package') === preselectedPkg) {
                chip.classList.add('selected');
                selectedPackage = preselectedPkg;
                selectedPackagePrice = packagePricing[preselectedPkg] || 0;
            }
        });
        updateQuotation();
    }

    // Package Chip Click
    if (packageChips.length) {
        packageChips.forEach(chip => {
            chip.addEventListener('click', () => {
                packageChips.forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                
                selectedPackage = chip.getAttribute('data-package');
                selectedPackagePrice = packagePricing[selectedPackage] || 0;
                
                updateQuotation();
            });
        });
    }

    // Event Chip Click (Delegated for dynamically added custom events)
    if (eventChipsContainer) {
        eventChipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.event-chip');
            if (!chip) return;
            
            // Handle Delete Button Click
            if (e.target.closest('.chip-delete-btn')) {
                const eventName = chip.getAttribute('data-event');
                selectedEvents.delete(eventName);
                chip.remove();
                renderEventDates();
                return;
            }

            // Handle Standard Toggle
            const eventName = chip.getAttribute('data-event');
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                selectedEvents.delete(eventName);
            } else {
                chip.classList.add('selected');
                selectedEvents.add(eventName);
            }
            renderEventDates();
        });
    }

    // Add custom event
    if (addCustomEventBtn && customEventInput) {
        const addCustom = () => {
            const val = customEventInput.value.trim();
            if (val && !selectedEvents.has(val)) {
                // Create new chip
                const newChip = document.createElement('div');
                newChip.className = 'event-chip custom-chip selected';
                newChip.setAttribute('data-event', val);
                
                newChip.innerHTML = `${val} <button type="button" class="chip-delete-btn" aria-label="Delete">&times;</button>`;
                
                eventChipsContainer.appendChild(newChip);
                
                // Add to set
                selectedEvents.add(val);
                customEventInput.value = '';
                
                renderEventDates();
            }
        };
        addCustomEventBtn.addEventListener('click', addCustom);
        customEventInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
        });
    }

    // Booking form submission
    const dynamicBookingForm = document.getElementById('dynamicBookingForm');
    if (dynamicBookingForm) {
        dynamicBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!selectedPackage) {
                alert('Please select a package.');
                return;
            }
            if (selectedEvents.size === 0) {
                alert('Please select at least one event.');
                return;
            }

            const name = document.getElementById('b_name').value.trim();
            const mobile = document.getElementById('b_mobile').value.trim();
            const email = document.getElementById('b_email').value.trim();
            const venue = document.getElementById('b_venue').value.trim();
            const notes = document.getElementById('b_notes')?.value.trim() || '';

            if (!name || !mobile || !email || !venue) {
                alert('Please fill all required fields.');
                return;
            }

            const totalQuotation = selectedPackagePrice * selectedEvents.size;

            let msg = `*REELIFE WEDDINGS — NEW BOOKING*\n\n`;
            msg += `*Package:* ${packageDisplayNames[selectedPackage]} (${formatCurrency(selectedPackagePrice)}/event)\n`;
            msg += `*Total Events:* ${selectedEvents.size}\n`;
            msg += `*Estimated Quotation:* ${formatCurrency(totalQuotation)}\n\n`;
            
            msg += `*Couple Details*\n`;
            msg += `Name: ${name}\n`;
            msg += `Phone: ${mobile}\n`;
            msg += `Email: ${email}\n`;
            msg += `Venue / City: ${venue}\n\n`;

            msg += `*Selected Events and Dates*\n`;
            let idx = 1;
            selectedEvents.forEach(ev => {
                const dateInput = document.querySelector(`input[data-event-date="${ev}"]`);
                const dateVal = dateInput?.value || 'TBD';
                msg += `${idx}. ${ev} — ${dateVal}\n`;
                idx++;
            });

            if (notes) {
                msg += `\n*Additional Notes:* ${notes}`;
            }

            const url = `https://wa.me/919148132417?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }
});