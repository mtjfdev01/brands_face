// Navbar Injection Script with Product Dropdowns
(function() {
  const navHTML = `
    <div class="nav-left">
      <a href="/index.html" class="logo">Box Studio</a>
    </div>
    <div class="nav-center"></div>
    <div class="nav-right">
      <a href="/index.html">Home</a>
      <a href="/about-us.html">About</a>
      <li class="nav-item dropdown" style="list-style: none; position: relative;">
        <a href="#" style="background: #165927; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; display: inline-flex; align-items: center; border: 1px solid #165927;">
          Products ▼
        </a>
        <ul class="dropdown-menu" style="position: absolute; top: 100%; right: 0; background: #2a2e6e; min-width: 220px; list-style: none; padding: 10px 0; border-top: 3px solid #fbb13c; box-shadow: 0 10px 30px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; transform: translateY(10px); transition: all 0.3s ease; z-index: 1000;">
          <li class="dropdown-item" style="position: relative;"><a href="/products/rigid-boxes.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Rigid Boxes</a>
            <ul class="submenu" style="position: absolute; top: 0; right: 100%; background: #fff; min-width: 200px; list-style: none; padding: 10px 0; display: none; box-shadow: -5px 0 15px rgba(0,0,0,0.1); z-index: 1000;">
              <li><a href="/products/rigid-boxes/magnetic-snap-box.html" style="display: block; padding: 8px 20px; color: #333; text-decoration: none; font-size: 0.85rem;">Magnetic Snap Box</a></li>
              <li><a href="/products/rigid-boxes/book-style-box.html" style="display: block; padding: 8px 20px; color: #333; text-decoration: none; font-size: 0.85rem;">Book Style Box</a></li>
              <li><a href="/products/rigid-boxes/drawer-style-box.html" style="display: block; padding: 8px 20px; color: #333; text-decoration: none; font-size: 0.85rem;">Drawer Style Box</a></li>
            </ul>
          </li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/corrugated-boxes.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Corrugated Boxes</a></li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/custom-pouches.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Custom Pouches</a></li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/gift-boxes.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Gift Boxes</a></li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/kraft-paper.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Kraft Paper</a></li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/labels-and-tags.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Labels & Tags</a></li>
          <li class="dropdown-item" style="position: relative;"><a href="/products/premium-finish.html" style="display: block; padding: 12px 20px; color: white; text-decoration: none; font-size: 0.9rem;">Premium Finish</a></li>
        </ul>
      </li>
      <a href="/index.html#contact">Quote</a>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.innerHTML = navHTML;
      
      // Add hover functionality for dropdowns
      const dropdownItems = nav.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          const submenu = this.querySelector('.submenu');
          if (submenu) submenu.style.display = 'block';
        });
        item.addEventListener('mouseleave', function() {
          const submenu = this.querySelector('.submenu');
          if (submenu) submenu.style.display = 'none';
        });
      });

      // Dropdown menu show/hide
      const dropdown = nav.querySelector('.nav-item.dropdown');
      const dropdownMenu = nav.querySelector('.dropdown-menu');
      if (dropdown && dropdownMenu) {
        dropdown.addEventListener('mouseenter', function() {
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.visibility = 'visible';
          dropdownMenu.style.transform = 'translateY(0)';
        });
        dropdown.addEventListener('mouseleave', function() {
          dropdownMenu.style.opacity = '0';
          dropdownMenu.style.visibility = 'hidden';
          dropdownMenu.style.transform = 'translateY(10px)';
        });
      }
    }

    // Scroll effect on navbar
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.querySelector('nav').classList.add('scrolled');
      } else {
        document.querySelector('nav').classList.remove('scrolled');
      }
    });
  });
})();

