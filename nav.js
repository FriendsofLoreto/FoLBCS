(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  function active(page) { return path === page ? ' class="active"' : ''; }

  const nav = `
  <nav class="site-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="logo.png" alt="Friends of Loreto BCS logo">
        <div class="nav-logo-text">
          Friends of Loreto, BCS
          <span data-en="Loreto, Baja California Sur" data-es="Loreto, Baja California Sur">Loreto, Baja California Sur</span>
        </div>
      </a>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <div class="lang-toggle-nav">
          <button class="lang-btn-nav active" id="nav-btn-en" onclick="setLang('en')">🇺🇸 EN</button>
          <span style="color:rgba(255,255,255,0.3);">|</span>
          <button class="lang-btn-nav" id="nav-btn-es" onclick="setLang('es')">🇲🇽 ES</button>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <ul class="nav-links" id="nav-links">
        <li><a href="index.html"${active('index.html')} data-en="Home" data-es="Inicio">Home</a></li>
        <li><a href="soft-paws.html"${active('soft-paws.html')} data-en="Soft Paws" data-es="Soft Paws">Soft Paws</a></li>
        <li><a href="volleyball.html"${active('volleyball.html')} data-en="Volleyball" data-es="Voleibol">Volleyball</a></li>
        <li><a href="contact.html"${active('contact.html')} data-en="Contact" data-es="Contacto">Contact</a></li>
        <li><a href="donate.html" class="nav-donate-btn"${active('donate.html')} data-en="Donate" data-es="Donar">Donate</a></li>
      </ul>
    </div>
  </nav>`;

  const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-org">Friends of Loreto, BCS</div>
        <p data-en="A Minnesota 501(c)(3) tax-exempt nonprofit supporting animal welfare and youth sports in Loreto, Baja California Sur, México."
           data-es="Una organización sin fines de lucro de Minnesota, exenta de impuestos bajo la sección 501(c)(3), que apoya el bienestar animal y los deportes juveniles en Loreto, Baja California Sur, México.">
          A Minnesota 501(c)(3) tax-exempt nonprofit supporting animal welfare and youth sports in Loreto, Baja California Sur, México.
        </p>
        <br>
        <p>1114 Cripple Creek Pass<br>Lino Lakes, MN 55038</p>
      </div>
      <div class="footer-col">
        <h4 data-en="Programs" data-es="Programas">Programs</h4>
        <ul>
          <li><a href="soft-paws.html" data-en="Soft Paws Cat Sanctuary" data-es="Refugio Soft Paws">Soft Paws Cat Sanctuary</a></li>
          <li><a href="volleyball.html" data-en="UABCS Men's Volleyball" data-es="Voleibol Varonil UABCS">UABCS Men's Volleyball</a></li>
          <li><a href="volleyball.html" data-en="UABCS Women's Volleyball" data-es="Voleibol Femenil UABCS">UABCS Women's Volleyball</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-en="Organization" data-es="Organización">Organization</h4>
        <ul>
          <li><a href="index.html#about" data-en="About Us" data-es="Quiénes Somos">About Us</a></li>
          <li><a href="donate.html" data-en="Donate" data-es="Donar">Donate</a></li>
          <li><a href="contact.html" data-en="Contact" data-es="Contacto">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-en="© 2026 Friends of Loreto, BCS. A Minnesota Nonprofit Corporation. 501(c)(3) Tax-Exempt."
            data-es="© 2026 Friends of Loreto, BCS. Corporación Sin Fines de Lucro de Minnesota. Exenta de impuestos 501(c)(3).">
        © 2026 Friends of Loreto, BCS. A Minnesota Nonprofit Corporation. 501(c)(3) Tax-Exempt.
      </span>
      <span data-en="Donations are tax deductible as permitted by law."
            data-es="Las donaciones son deducibles de impuestos según lo permitido por la ley.">
        Donations are tax deductible as permitted by law.
      </span>
    </div>
  </footer>`;

  document.getElementById('site-nav').innerHTML = nav;
  document.getElementById('site-footer').innerHTML = footer;

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Apply saved language on load
  const saved = localStorage.getItem('forlang') || 'en';
  if (saved === 'es') { setTimeout(function(){ setLang('es'); }, 50); }
})();

// ── Global language switcher ──────────────────────────────────────────
window.currentLang = localStorage.getItem('forlang') || 'en';

window.setLang = function(lang) {
  window.currentLang = lang;
  localStorage.setItem('forlang', lang);

  // Nav buttons
  ['en','es'].forEach(function(l) {
    const nb = document.getElementById('nav-btn-' + l);
    const pb = document.getElementById('page-btn-' + l);
    if (nb) nb.classList.toggle('active', l === lang);
    if (pb) pb.classList.toggle('active', l === lang);
  });

  // Translate all data-en/data-es elements
  document.querySelectorAll('[data-en]').forEach(function(el) {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else if (text.includes('<') || el.tagName === 'SPAN' || el.tagName === 'P') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Placeholder overrides
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(function(el) {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });

  document.documentElement.lang = lang;
};
