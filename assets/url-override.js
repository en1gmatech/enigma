// URL Override Script - Replaces download button URLs after Framer hydration
(function() {
    'use strict';

    // Your new download URL
    const NEW_DOWNLOAD_URL = 'https://github.com/exloader-api/enigma-tech/releases/download/v1.6/enigma-tech-v1.6.zip';

    // Old URLs to replace (add any variations you find)
    const OLD_URLS = [
        'https://github.com/engmate/Enigma/releases/download/v2.0/EnigmaTech-v2.exe',
        // Add more old URLs here if needed
    ];

    function updateDownloadLinks() {
        // Update all anchor tags
        document.querySelectorAll('a[href]').forEach(link => {
            if (OLD_URLS.includes(link.href)) {
                link.href = NEW_DOWNLOAD_URL;
                console.log('Updated link:', link);
            }
        });

        // Monitor for dynamic changes (Framer's React hydration)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'A' && node.href && OLD_URLS.includes(node.href)) {
                            node.href = NEW_DOWNLOAD_URL;
                            console.log('Updated dynamically added link:', node);
                        }
                        // Check children
                        node.querySelectorAll && node.querySelectorAll('a[href]').forEach(link => {
                            if (OLD_URLS.includes(link.href)) {
                                link.href = NEW_DOWNLOAD_URL;
                                console.log('Updated child link:', link);
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run immediately
    updateDownloadLinks();

    // Run after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDownloadLinks);
    }

    // Run after a delay to catch Framer hydration
    setTimeout(updateDownloadLinks, 100);
    setTimeout(updateDownloadLinks, 500);
    setTimeout(updateDownloadLinks, 1000);
    setTimeout(updateDownloadLinks, 2000);
})();
