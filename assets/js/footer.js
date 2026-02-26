// Footer Injection Script
(function() {
  const footerHTML = `
    <footer class="site-footer">
    <div class="footer-content">
      <div>
        <h4>Company</h4>
        <ul style="list-style: none; padding: 0;">
          <li><a href="/about-us.html">About Us</a></li>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/lab.html">Box Studio</a></li>
        </ul>
      </div>
      <div>
        <h4>Products</h4>
        <ul style="list-style: none; padding: 0;">
          <li><a href="/products/rigid-boxes.html">Rigid Boxes</a></li>
          <li><a href="/products/corrugated-boxes.html">Corrugated Boxes</a></li>
          <li><a href="/products/custom-pouches.html">Custom Pouches</a></li>
          <li><a href="/products/gift-boxes.html">Gift Boxes</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul style="list-style: none; padding: 0;">
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/return-refund.html">Returns & Refunds</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        <p>Global packaging solutions for your business.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Box Studio. All rights reserved. | High-quality custom packaging.</p>
    </div>
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

  document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer && !footer.innerHTML.includes('footer-content')) {
      footer.innerHTML = footerHTML;
    }

    // Inject site FABs (call / whatsapp / live chat) for pages that don't already include them
    (function(){
      if(document.querySelector('.contact-stack')) return;
      var stack = document.createElement('div');
      stack.className = 'contact-stack';
      stack.innerHTML = '\n        <a href="tel:+923000337680" class="fab fab-call" title="Call Us Now">📞</a>\n        <a href="https://wa.me/923000337680" class="fab fab-whatsapp" title="WhatsApp Chat">💬</a>\n        <a href="javascript:void(0)" id="fab-livechat" class="fab fab-chat" title="Live Chat">💬</a>\n      ';
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
})();

