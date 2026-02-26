(function(){
  // Talk.to loader — configurable without editing this file.
  // Set your Talk.to App ID on the page by adding this in a script before this file loads:
  //   window.TALKTO_APP_ID = 'your-app-id-here';
  // Or add data-talkto-id="your-app-id-here" to the <html> element.

  var id = window.TALKTO_APP_ID || document.documentElement.getAttribute('data-talkto-id') || '';
  if(!id) {
    console.warn('Talk.to loader: no App ID set. Set window.TALKTO_APP_ID or data-talkto-id on <html>.');
    return;
  }

  // Example embed URL pattern — replace if Talk.to provides a different embed URL.
  var scriptSrc = 'https://embed.talk.to/' + encodeURIComponent(id) + '.js';

  if(document.querySelector('script[data-talkto-loader]')) return;
  var s = document.createElement('script');
  s.async = true;
  s.defer = true;
  s.setAttribute('data-talkto-loader','1');
  s.src = scriptSrc;
  s.onload = function(){ console.info('Talk.to widget loaded ('+id+')'); };
  s.onerror = function(){ console.warn('Talk.to widget failed to load (check App ID and URL):', scriptSrc); };
  document.head.appendChild(s);
})();
