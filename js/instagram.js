/**
 * Instagram Feed Fetcher - V2: Video Support
 * Fetches data from a JSON source and renders items with autoplay video support.
 */

document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('instagram-feed-container');

    // CONFIGURATION
    const FEED_URL = '/assets/instagram_mock.json'; // Temporarily point to mock for local testing
    const MAX_ITEMS = 4; // Grid 4x1

    // State for global mute
    let isMuted = true;
    let playingVideos = []; // Track active videos

    async function fetchInstagramFeed() {
        try {
            const response = await fetch(FEED_URL);
            if (!response.ok) throw new Error('Network response was not ok');

            const json = await response.json();
            let data = json.data || json.items || json;
            
            // The user requested a "live instagram reels" specific section, so we filter out regular images
            if (Array.isArray(data)) {
                data = data.filter(item => item.media_type === 'VIDEO' || item.media_type === 'REELS' || item.media_type === 'EMBED');
            }

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
        const hasVideos = items.some(i => i.media_type === 'VIDEO' || i.media_type === 'REELS' || i.media_type === 'EMBED');
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
        if (type === 'EMBED') {
            mediaHtml = `
                <iframe src="${item.embed_url}" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: 1;" 
                    frameborder="0" scrolling="no" allowtransparency="true">
                </iframe>
                <div class="insta-controls" style="z-index: 10;">
                    <a href="${link}" target="_blank" class="insta-btn btn-link"><i class="fab fa-instagram"></i></a>
                </div>
            `;
        } else if (type === 'VIDEO' || type === 'REELS') {
            // Video: Autoplay, Muted, Loop
            mediaHtml = `
                <video class="insta-media" src="${mediaSrc}" 
                    poster="${item.thumbnail_url || ''}" 
                    autoplay muted loop playsinline 
                    webkit-playsinline>
                </video>
                <div class="insta-controls">
                    <button class="insta-btn btn-mute" title="Unmute/Mute" style="width: auto; padding: 0 15px; border-radius: 20px; font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.05em; font-weight: 600;">
                        <i class="fas fa-volume-mute" style="margin-right: 5px;"></i> TAP TO UNMUTE
                    </button>
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
                    muteBtn.innerHTML = '<i class="fas fa-volume-up" style="margin-right: 5px;"></i> MUTING...'; 
                    // Briefly show Muting/Unmuting or just remove text. Actually let's just make it a clean icon after first interaction to reduce noise.
                    setTimeout(() => muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>', 500);
                    // Optional: Mute others
                } else {
                    video.muted = true;
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
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
