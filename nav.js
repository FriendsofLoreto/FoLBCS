// nav.js — inject shared nav and footer into every page
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  function active(page) {
    return path === page ? ' class="active"' : '';
  }

  const nav = `
  <nav class="site-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="logo.png" alt="Friends of Loreto BCS logo">
        <div class="nav-logo-text">
          Friends of Loreto, BCS
          <span>Loreto, Baja California Sur</span>
        </div>
      </a>
      <ul class="nav-links">
        <li><a href="index.html"${active('index.html')}>Home</a></li>
        <li><a href="soft-paws.html"${active('soft-paws.html')}>Soft Paws</a></li>
        <li><a href="volleyball.html"${active('volleyball.html')}>Volleyball</a></li>
        <li><a href="contact.html"${active('contact.html')}>Contact</a></li>
        <li><a href="donate.html" class="nav-donate-btn"${active('donate.html')}>Donate</a></li>
      </ul>
    </div>
  </nav>`;

  const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-org">Friends of Loreto, BCS</div>
        <p>A Minnesota 501(c)(3) nonprofit supporting animal welfare and youth sports in Loreto, Baja California Sur, Mexico.
        [NOTE: 501(c)(3) registration is still pending. Donations are not tax deductable at this time.]</p>
        <br>
        <p>1114 Cripple Creek Pass<br>Lino Lakes, MN 55038</p>
      </div>
      <div class="footer-col">
        <h4>Programs</h4>
        <ul>
          <li><a href="soft-paws.html">Soft Paws Cat Sanctuary</a></li>
          <li><a href="volleyball.html">UABCS Men's Volleyball</a></li>
          <li><a href="volleyball.html">UABCS Women's Volleyball</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Organization</h4>
        <ul>
          <li><a href="index.html#about">About Us</a></li>
          <li><a href="donate.html">Donate</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Friends of Loreto, BCS. A Minnesota Nonprofit Corporation. 501(c)(3) Tax-Exempt.</span>
      <span>Donations are tax deductible as permitted by law.</span>
    </div>
  </footer>`;

  document.getElementById('site-nav').innerHTML = nav;
  document.getElementById('site-footer').innerHTML = footer;
})();
