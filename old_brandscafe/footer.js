// footer.js - Centralized Footer for Brands Face
document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Brands Face</h3>
                <p>Leading the way in innovative packaging design.</p>
                <p style="font-style: italic; color: var(--accent); margin-top: 10px;">"Packaging Creates Perception."</p>
                <p style="font-size: 0.9rem; color: #888; margin-top: 10px;">Serving USA & Global Markets</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <a href="/">Home</a><br>
                <a href="/#products">Products</a><br>
                <a href="/about-us.html">About Us</a><br>
                <a href="/privacy.html">Privacy Policy</a><br>
                <a href="/return-refund.html">Return &amp; Refund Policy</a>
            </div>
            <div class="footer-section">
                <h4>Contact Info</h4>
                <p>Email: <a href="mailto:hello@brandsface.com">hello@brandsface.com</a></p>
                <p>Phone/WhatsApp: <a href="tel:+923000337680">+92 300 0337680</a></p>
                <div class="social-links" style="margin-top: 15px;">
                  <a href="https://www.facebook.com/brandsface" target="_blank" rel="noopener">Facebook</a> |
                  <a href="https://www.instagram.com/brandsfaceofficial/" target="_blank" rel="noopener">Instagram</a> |
                  <a href="https://www.linkedin.com/company/brands-face/" target="_blank" rel="noopener">LinkedIn</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; ${new Date().getFullYear()} Brands Face. All Rights Reserved.
        </div>
    </footer>
    <script src="/talkto.js" defer data-talkto-injected></script>

    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/69859bc40204fe1c37634cea/1jgouguiq';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <!--End of Tawk.to Script-->

    `;

    // Inject the footer into the placeholder
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    }

    // Ensure site FABs (call / whatsapp / live chat) are present and functional
    (function(){
        if(document.querySelector('.contact-stack')) return;
        var stack = document.createElement('div');
        stack.className = 'contact-stack';
        stack.innerHTML = '\n            <a href="tel:+923000337680" class="fab fab-call" title="Call Us Now">📞</a>\n            <a href="https://wa.me/923000337680" class="fab fab-whatsapp" title="WhatsApp Chat">💬</a>\n            <a href="javascript:void(0)" id="fab-livechat" class="fab fab-chat" title="Live Chat">💬</a>\n        ';
        var header = document.querySelector('header');
        if(header) header.insertBefore(stack, header.firstChild);

        function tryOpenTawk(){
            if(window.Tawk_API && typeof window.Tawk_API.toggle === 'function'){
                try{ window.Tawk_API.toggle(); }catch(e){}
                return;
            }
            if(window.Tawk_API && typeof window.Tawk_API.maximize === 'function'){
                try{ window.Tawk_API.maximize(); }catch(e){}
                return;
            }
            if(window.Tawk_API && typeof window.Tawk_API.showWidget === 'function'){
                try{ window.Tawk_API.showWidget(); }catch(e){}
                return;
            }

            // Queue call for when Tawk loads
            window.Tawk_API = window.Tawk_API || {};
            var queued = false;
            var onLoad = function(){
                if(queued) return; queued = true;
                if(window.Tawk_API && typeof window.Tawk_API.toggle === 'function') try{ window.Tawk_API.toggle(); }catch(e){}
                else if(window.Tawk_API && typeof window.Tawk_API.maximize === 'function') try{ window.Tawk_API.maximize(); }catch(e){}
            };
            if(typeof window.Tawk_API.onLoad === 'function'){
                var prev = window.Tawk_API.onLoad;
                window.Tawk_API.onLoad = function(){ try{ prev(); }catch(e){}; onLoad(); };
            } else {
                window.Tawk_API.onLoad = onLoad;
            }
        }

        document.addEventListener('click', function(e){
            var el = e.target.closest && e.target.closest('#fab-livechat');
            if(el){ e.preventDefault(); tryOpenTawk(); }
        }, false);
    })();
});