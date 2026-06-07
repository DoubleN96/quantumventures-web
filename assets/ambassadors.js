/* Quantum Ventures — ambassador social-proof loader.
   Renders approved brand ambassadors (influencers) into any [data-ambassadors] block.
   Data comes live from the API, so new approved ambassadors appear without a redeploy.
   Empty/failed state: the block hides itself. */
(function () {
  var API = 'https://qv-audit.128.140.44.162.sslip.io/api/ambassadors';
  var hosts = document.querySelectorAll('[data-ambassadors]');
  if (!hosts.length) return;

  var css = document.createElement('style');
  css.textContent = ''
    + '.amb-grid{display:flex;flex-wrap:wrap;gap:14px;margin-top:24px}'
    + '.amb{display:flex;align-items:center;gap:10px;background:#0c0e17;border:1px solid rgba(255,255,255,.10);border-radius:999px;padding:7px 16px 7px 7px;text-decoration:none;transition:transform .3s cubic-bezier(.16,1,.3,1),border-color .3s}'
    + '.amb:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.45)}'
    + '.amb img{width:38px;height:38px;border-radius:50%;object-fit:cover;background:#1b2233;border:1px solid rgba(255,255,255,.14);display:block}'
    + '.amb .h{display:flex;flex-direction:column;line-height:1.2}'
    + '.amb .h b{font-size:13.5px;color:#e7ecf3;font-weight:600}'
    + '.amb .h s{font-size:11.5px;color:#8b97a8;text-decoration:none}';
  document.head.appendChild(css);

  function platformUrl(p, h) {
    h = encodeURIComponent(h);
    switch ((p || '').toLowerCase()) {
      case 'youtube': return 'https://youtube.com/@' + h;
      case 'tiktok': return 'https://tiktok.com/@' + h;
      case 'twitter': case 'x': return 'https://twitter.com/' + h;
      default: return 'https://instagram.com/' + h;
    }
  }
  function esc(s){ return (s||'').replace(/[<>&"]/g, function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];}); }

  fetch(API, { mode: 'cors' })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (list) {
      if (!Array.isArray(list) || !list.length) { hosts.forEach(function (h) { h.remove(); }); return; }
      var html = list.map(function (a) {
        return '<a class="amb" href="' + platformUrl(a.platform, a.handle) + '" target="_blank" rel="noopener">'
          + '<img loading="lazy" alt="' + esc(a.name || a.handle) + '" src="' + a.avatar + '" '
          + 'onerror="this.style.visibility=\'hidden\'">'
          + '<span class="h"><b>' + esc(a.name || ('@' + a.handle)) + '</b><s>@' + esc(a.handle) + (a.niche ? ' · ' + esc(a.niche) : '') + '</s></span></a>';
      }).join('');
      hosts.forEach(function (h) {
        var grid = h.querySelector('[data-amb-grid]');
        if (grid) grid.innerHTML = html;
        var count = h.querySelector('[data-amb-count]');
        if (count) count.textContent = list.length;
        h.style.display = '';
      });
    })
    .catch(function () { hosts.forEach(function (h) { h.remove(); }); });
})();
