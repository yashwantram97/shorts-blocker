// YouTube Shorts Blocker Popup Script

document.addEventListener('DOMContentLoaded', function() {
    const enableToggle = document.getElementById('enableToggle');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    // Load current settings
    chrome.storage.sync.get(['shortsBlockerEnabled'], function(result) {
        const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
        updateToggleState(isEnabled);
    });

    // Handle toggle change
    enableToggle.addEventListener('change', function() {
        const isEnabled = enableToggle.checked;
        
        chrome.storage.sync.set({ shortsBlockerEnabled: isEnabled }, function() {
            updateToggleState(isEnabled);
            
            // Refresh current tab if it's YouTube
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs[0] && tabs[0].url.includes('youtube.com')) {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        });
    });

    function updateToggleState(isEnabled) {
        enableToggle.checked = isEnabled;
        
        if (isEnabled) {
            statusDot.classList.remove('inactive');
            statusDot.classList.add('active');
            statusText.textContent = 'Active';
        } else {
            statusDot.classList.remove('active');
            statusDot.classList.add('inactive');
            statusText.textContent = 'Disabled';
        }
    }

    // Add smooth transitions
    enableToggle.style.transition = 'all 0.3s ease';
    statusDot.style.transition = 'all 0.3s ease';
});