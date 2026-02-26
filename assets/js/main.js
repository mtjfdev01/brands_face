// Main Site Interactions Script
document.addEventListener('DOMContentLoaded', function() {
  // Modal functionality
  const modal = document.getElementById('productModal');
  const closeBtn = document.querySelector('.close-modal');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      if (modal) modal.style.display = 'none';
    });
  }

  if (modal) {
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Product card click handlers
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', function() {
      const productName = this.getAttribute('data-product');
      const productUrl = this.getAttribute('data-url');
      if (productUrl) {
        window.location.href = productUrl;
      }
    });
  });

  // Form submission handler
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('input-error');
          isValid = false;
        } else {
          input.classList.remove('input-error');
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // Collapsible form sections
  const formTriggers = document.querySelectorAll('.form-trigger-bar');
  formTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content && content.classList.contains('form-content-collapsed')) {
        content.classList.toggle('open');
      }
    });
  });

  // Mobile menu toggle (if applicable)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.classList.toggle('mobile-active');
      }
    });
  }
});

// Utility function to open external links in new tab
function openLink(url, newTab = false) {
  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

// Utility function for form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Analytics tracking (if needed)
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

