// Loading Animation Handler
(function() {
    // Show loader on page start
    window.addEventListener('load', function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease-out';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    });

    // Show loader when navigating
    window.addEventListener('beforeunload', function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.display = 'flex';
            loader.style.opacity = '1';
        }
    });

    // Optional: Hide loader on page hide (for back/forward behavior)
    window.addEventListener('pagehide', function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.display = 'flex';
            loader.style.opacity = '1';
        }
    });
})();
