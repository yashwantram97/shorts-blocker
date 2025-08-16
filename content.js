// YouTube Shorts Blocker Content Script

(function() {
    'use strict';

    let isEnabled = true;

    // Load settings from storage
    chrome.storage.sync.get(['shortsBlockerEnabled'], function(result) {
        isEnabled = result.shortsBlockerEnabled !== false; // Default to true
        if (isEnabled) {
            initializeBlocker();
        }
    });

    // Listen for settings changes
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.shortsBlockerEnabled) {
            isEnabled = changes.shortsBlockerEnabled.newValue;
            if (isEnabled) {
                initializeBlocker();
            } else {
                restoreShorts();
            }
        }
    });

    function initializeBlocker() {
        // Block existing shorts
        blockShorts();
        
        // Set up observer for dynamically loaded content
        setupObserver();
        
        // Block shorts on navigation
        window.addEventListener('yt-navigate-finish', blockShorts);
        
        // Additional check for SPA navigation
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                setTimeout(blockShorts, 500);
            }
        }).observe(document, { subtree: true, childList: true });
    }

    function blockShorts() {
        if (!isEnabled) return;

        // Block Shorts in various locations
        blockShortsInFeed();
        blockShortsPage();
        blockShortsShelf();
        blockShortsInSidebar();
        blockShortsTab();
    }

    function blockShortsInFeed() {
        // Main feed shorts
        const shortsContainers = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer');
        
        shortsContainers.forEach(container => {
            const titleElement = container.querySelector('a#video-title, h3 a, #video-title-link');
            const linkElement = container.querySelector('a[href*="/shorts/"]');
            const shortsIndicator = container.querySelector('[aria-label*="Shorts"], [title*="Shorts"], .ytd-thumbnail-overlay-time-status-renderer[aria-label="Shorts"]');
            
            if (linkElement || shortsIndicator || (titleElement && titleElement.href && titleElement.href.includes('/shorts/'))) {
                hideElement(container);
            }
        });
    }

    function blockShortsPage() {
        // Block entire shorts page
        if (window.location.pathname.includes('/shorts/')) {
            const pageContent = document.querySelector('#page-manager, #content, #primary');
            if (pageContent && !pageContent.querySelector('.shorts-blocked-message')) {
                // Create the blocked message container
                const blockedMessage = document.createElement('div');
                blockedMessage.className = 'shorts-blocked-message';
                
                const blockedContent = document.createElement('div');
                blockedContent.className = 'blocked-content';
                
                // Create title
                const title = document.createElement('h2');
                title.textContent = '🚫 YouTube Shorts Blocked';
                
                // Create description
                const description = document.createElement('p');
                description.textContent = 'This YouTube Short has been blocked by the YouTube Shorts Blocker extension.';
                
                // Create home button
                const homeButton = document.createElement('button');
                homeButton.className = 'home-button';
                homeButton.textContent = '🏠 Return to YouTube Home';
                homeButton.addEventListener('click', function() {
                    window.location.href = 'https://youtube.com';
                });
                
                // Assemble the elements
                blockedContent.appendChild(title);
                blockedContent.appendChild(description);
                blockedContent.appendChild(homeButton);
                blockedMessage.appendChild(blockedContent);
                
                // Replace page content
                pageContent.innerHTML = '';
                pageContent.appendChild(blockedMessage);
            }
        }
    }

    function blockShortsShelf() {
        // Block shorts shelf/carousel
        const shortsShelf = document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer');
        shortsShelf.forEach(shelf => {
            const shelfTitle = shelf.querySelector('#shelf-header h2, #title');
            if (shelfTitle && (shelfTitle.textContent.toLowerCase().includes('shorts') || 
                              shelfTitle.textContent.toLowerCase().includes('short'))) {
                hideElement(shelf);
            }
        });

        // Block individual shorts in shelves
        const reelItems = document.querySelectorAll('ytd-reel-item-renderer');
        reelItems.forEach(item => hideElement(item));
    }

    function blockShortsInSidebar() {
        // Block shorts in sidebar/recommendations
        const sidebarVideos = document.querySelectorAll('ytd-compact-video-renderer, ytd-video-renderer');
        sidebarVideos.forEach(video => {
            const link = video.querySelector('a[href*="/shorts/"]');
            const shortsIndicator = video.querySelector('[aria-label*="Shorts"], .ytd-thumbnail-overlay-time-status-renderer[aria-label="Shorts"]');
            
            if (link || shortsIndicator) {
                hideElement(video);
            }
        });
    }

    function blockShortsTab() {
        // Block Shorts tab in channel pages
        const shortsTab = document.querySelector('tp-yt-paper-tab[tab-title="Shorts"], yt-tab-shape[tab-title="Shorts"]');
        if (shortsTab) {
            hideElement(shortsTab);
        }
    }

    function hideElement(element) {
        if (element && !element.classList.contains('shorts-blocked')) {
            element.style.display = 'none';
            element.classList.add('shorts-blocked');
        }
    }

    function restoreShorts() {
        const blockedElements = document.querySelectorAll('.shorts-blocked');
        blockedElements.forEach(element => {
            element.style.display = '';
            element.classList.remove('shorts-blocked');
        });
    }

    function setupObserver() {
        const observer = new MutationObserver(function(mutations) {
            if (!isEnabled) return;
            
            let shouldBlock = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    shouldBlock = true;
                }
            });
            
            if (shouldBlock) {
                setTimeout(blockShorts, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBlocker);
    } else {
        initializeBlocker();
    }

})();