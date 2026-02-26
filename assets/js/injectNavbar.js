// Alternative Navbar Injection (Legacy Support)
// This file provides navbar injection functionality for backward compatibility
(function() {
  function injectNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Check if navbar already injected (via navbar.js)
    if (nav.querySelector('.nav-left')) {
      return; // Already injected
    }

    // Fallback navbar structure if navbar.js hasn't run
    const navHTML = `
      <div class="nav-left">
        <a href="/index.html" class="logo">Box Studio</a>
      </div>
      <div class="nav-center"></div>
      <div class="nav-right">
        <a href="/index.html">Home</a>
        <a href="/about-us.html">About</a>
        <a href="/index.html#contact">Quote</a>
      </div>
    `;

    nav.innerHTML = navHTML;
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavbar);
  } else {
    injectNavbar();
  }
})();
