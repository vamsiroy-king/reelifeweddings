/**
 * Instagram Feed Fetcher - V2: Video Support
 * Fetches data from a JSON source and renders items with autoplay video support.
 */

document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('instagram-feed-container');

    // CONFIGURATION
    const FEED_URL = '/assets/instagram_mock.json';
    const MAX_ITEMS = 4; // Grid 4x1

    // State for global mute
    let isMuted = true;
    let playingVideos = []; // Track active videos

    async function fetchInstagramFeed() {
        try {
            const response = await fetch(FEED_URL);
            if (!response.ok) throw new Error('Network response was not ok');

            const json = await response.json();
            const data = json.data || json.items || json;

            renderFeed(data);
        } catch (error) {
            console.error('Error fetching Instagram feed:', error);
            renderError();
        }
    }

    function renderFeed(items) {
        if (!items || items.length === 0) {
            renderError();
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'insta-grid';

        // Slice to max items
        items.slice(0, MAX_ITEMS).forEach(item => {
            const card = createItemCard(item);
            grid.appendChild(card);
        });

        // Add "Unmute All" Button Overlay if there are videos
        const hasVideos = items.some(i => i.media_type === 'VIDEO' || i.media_type === 'REELS');
        if (hasVideos) {
            // Optional: A global mute toggle could go here, but per-card is better for UX
        }

        feedContainer.innerHTML = '';
        feedContainer.appendChild(grid);
    }

    function createItemCard(item) {
        // Extract Data
        const mediaSrc = item.media_url || item.thumbnail_url || item.displayUrl;
        const link = item.permalink || item.url || '#';
        const type = item.media_type || 'IMAGE';
        const caption = item.caption || '';

        // Truncate caption for display
        // const shortCaption = caption.length > 80 ? caption.substring(0, 80) + '...' : caption;

        const el = document.createElement('div');
        el.className = 'insta-item';

        // Construct Media Element
        let mediaHtml = '';
        if (type === 'VIDEO' || type === 'REELS') {
            // Video: Autoplay, Muted, Loop
            mediaHtml = `
                <video class="insta-media" src="${mediaSrc}" 
                    poster="${item.thumbnail_url || ''}" 
                    autoplay muted loop playsinline 
                    webkit-playsinline>
                </video>
                <div class="insta-controls">
                    <button class="insta-btn btn-mute" title="Unmute/Mute">
                        <i class="fas fa-volume-mute"></i>
                    </button>
                    <!-- <a href="${link}" target="_blank" class="insta-btn btn-link"><i class="fab fa-instagram"></i></a> -->
                </div>
            `;
        } else {
            // Image
            mediaHtml = `<img src="${mediaSrc}" alt="Instagram Post" class="insta-media" loading="lazy">`;
        }

        // Caption Overlay
        const captionHtml = `
            <div class="insta-caption-overlay">
                <div class="caption-text">${caption}</div>
                <a href="${link}" target="_blank" class="insta-link-sm">
                    VIEW ON INSTAGRAM <i class="fas fa-arrow-right" style="font-size: 0.7em;"></i>
                </a>
            </div>
        `;

        el.innerHTML = mediaHtml + captionHtml;

        // --- Interaction Logic ---

        if (type === 'VIDEO' || type === 'REELS') {
            const video = el.querySelector('video');
            const muteBtn = el.querySelector('.btn-mute');
            const icon = muteBtn.querySelector('i');

            // Handle Mute Toggle
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                e.preventDefault();

                if (video.muted) {
                    video.muted = false;
                    icon.classList.remove('fa-volume-mute');
                    icon.classList.add('fa-volume-up');
                    // Optional: Mute others?
                    // muteAllOthers(video); 
                } else {
                    video.muted = true;
                    icon.classList.remove('fa-volume-up');
                    icon.classList.add('fa-volume-mute');
                }
            });

            // Ensure autoplay works (sometimes blocked by browser policy unless muted)
            video.play().catch(e => console.log("Autoplay blocked", e));
        }

        // Card Click -> Open Link
        el.addEventListener('click', (e) => {
            // specific controls shouldn't trigger this
            if (e.target.closest('.insta-btn') || e.target.closest('a')) return;
            window.open(link, '_blank');
        });

        return el;
    }

    function renderError() {
        feedContainer.innerHTML = `
            <div class="insta-error">
                <p>Unable to load latest reels.</p>
                <a href="https://www.instagram.com/reelifeweddings" target="_blank" class="btn-intro-minimal">VISIT INSTAGRAM</a>
            </div>
        `;
    }

    // Init
    if (feedContainer) {
        fetchInstagramFeed();
    }
});
