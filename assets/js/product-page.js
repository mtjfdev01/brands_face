// product-page.js - Product page functionality

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize Product Gallery
    initProductGallery();
    
    // 2. Initialize Quote Form
    initQuoteForm();
    
    // 3. Initialize Lazy Loading for Images
    initLazyLoading();
    
    // 4. Add Responsive Behaviors
    initResponsiveBehaviors();
    
    // 5. Initialize Loading Animation
    initProductPageLoader();
});

// Product Gallery Functionality
function initProductGallery() {
    const mainImage = document.querySelector('.main-product-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    if (!mainImage || !thumbnails.length) return;
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            const newSrc = this.src;
            const newAlt = this.alt;
            
            // Add loading animation
            mainImage.style.opacity = '0';
            mainImage.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.alt = newAlt;
                
                // Remove loading animation
                mainImage.style.opacity = '1';
                mainImage.style.transform = 'scale(1)';
            }, 300);
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Quote Form Handling
function initQuoteForm() {
    const quoteForm = document.querySelector('.simple-quote-form');
    
    if (!quoteForm) return;
    
    // Form validation and submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);
        
        // Simple validation
        const requiredFields = ['name', 'email', 'phone', 'quantity'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (input && !input.value.trim()) {
                markFieldAsInvalid(input);
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fill all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit-quote');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you! We will contact you shortly with a custom quote.', 'success');
            
            // Scroll to top of form
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });
    
    // Real-time validation
    const inputs = quoteForm.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                markFieldAsValid(this);
            } else {
                markFieldAsInvalid(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                markFieldAsValid(this);
            }
        });
    });
}

// Field Validation Helpers
function markFieldAsInvalid(input) {
    input.classList.add('invalid');
    input.classList.remove('valid');
}

function markFieldAsValid(input) {
    input.classList.add('valid');
    input.classList.remove('invalid');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">${message}</div>
        <button class="notification-close">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#1a4d2e' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Lazy Loading Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Responsive Behaviors
function initResponsiveBehaviors() {
    // Handle mobile menu if exists
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Handle responsive table of contents if exists
    const tocToggle = document.querySelector('.toc-toggle');
    const tocContent = document.querySelector('.toc-content');
    
    if (tocToggle && tocContent) {
        tocToggle.addEventListener('click', () => {
            tocContent.classList.toggle('active');
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Adjust sticky elements on resize
            adjustStickyElements();
        }, 250);
    });
}

// Adjust sticky elements on resize
function adjustStickyElements() {
    const productGallery = document.querySelector('.product-gallery-section');
    if (productGallery && window.innerWidth <= 768) {
        productGallery.style.position = 'static';
    }
}

// Product Page Loader
function initProductPageLoader() {
    const loader = document.querySelector('#page-loader');
    if (!loader) return;
    
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    });
    
    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
        if (loader.parentNode) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.style.display = 'none';
                }
            }, 300);
        }
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        flex: 1;
    }
    
    /* Form validation styles */
    input.valid {
        border-color: #2ecc71 !important;
    }
    
    input.invalid {
        border-color: #dc3545 !important;
        animation: shake 0.3s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
