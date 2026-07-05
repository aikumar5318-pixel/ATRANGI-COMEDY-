document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="assets/logo.png" alt="Atrangi Comedy logo">
            <strong>Atrangi Comedy</strong>
          </div>
          <p>Daily viral AI comedy shorts, funny memes aur trending content. Business ke liye — thumbnails, videos, websites aur portfolios bhi banate hain.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="videos.html">Videos</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="https://www.youtube.com/@Atrangi-Comedy_1" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i>&nbsp; @Atrangi-Comedy_1</a></li>
            <li><a href="https://www.instagram.com/atrangi_comedy_1" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i>&nbsp; atrangi_comedy_1</a></li>
            <li><a href="mailto:aikumar.5318@gmail.com"><i class="fa-solid fa-envelope"></i>&nbsp; aikumar.5318@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Atrangi Comedy. Made with 😂 and a lot of AI magic.</span>
        <div class="footer-social">
          <a class="yt" href="https://www.youtube.com/@Atrangi-Comedy_1" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          <a class="ig" href="https://www.instagram.com/atrangi_comedy_1" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </div>
  `;
});
