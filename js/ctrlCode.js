window.addEventListener('DOMContentLoaded', function() {
  const selectors = ['pre', 'samp', 'code'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      const btn = document.createElement('button');
      btn.innerHTML = '&#x2398;';
      btn.style.position = 'absolute';
      btn.style.top = '1rem';
      btn.style.right = '1rem';
      btn.style.border = '1px solid #ddd';
      btn.style.backgroundColor = '1px solid #ccc';
      btn.style.borderRadius = '.5rem';
      btn.style.color = 'inherit';
      btn.style.zIndex = '10';
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      btn.onclick = function(e) {
        e.stopPropagation();navigator.clipboard.writeText(el.innerText);
        btn.innerHTML = '&check;'; setTimeout(()=>btn.innerHTML = '&#x2398;', 500);
      };
      el.appendChild(btn);
    });
  });
});