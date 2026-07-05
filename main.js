// ============================================================
// ATRANGI COMEDY — shared behaviour
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.innerHTML = open ? '&#10005;' : '&#9776;';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.innerHTML = '&#9776;';
    }));
  }

  /* ---------- Active nav link ---------- */
  const here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- Desktop vs touch device flag ----------
     Desktop / fine pointer -> interactive mouse-parallax 3D tilt.
     Touch / coarse pointer -> ambient auto-floating animation (CSS handles it via .is-touch). */
  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isTouch) document.body.classList.add('is-touch');

  const stage = document.querySelector('.hero-stage');
  const badge = document.querySelector('.badge-wrap');
  const floaties = document.querySelectorAll('.floaty');

  if (stage && badge && !isTouch) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      badge.style.transform = `rotateY(${x * 34}deg) rotateX(${ -y * 34}deg) translateZ(20px)`;
      floaties.forEach(f => {
        const depth = parseFloat(f.dataset.depth || '1');
        f.style.transform = `translate(${x * -26 * depth}px, ${y * -26 * depth}px)`;
      });
    });
    stage.addEventListener('mouseleave', () => {
      badge.style.transform = 'rotateY(0deg) rotateX(0deg)';
      floaties.forEach(f => f.style.transform = '');
    });
  }

  /* ---------- Video modal ---------- */
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    const frameWrap = overlay.querySelector('.modal-frame');
    const closeBtn  = overlay.querySelector('.modal-close');

    document.querySelectorAll('[data-video-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-video-id');
        frameWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0"
          title="Atrangi Comedy video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>`;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      overlay.classList.remove('open');
      frameWrap.innerHTML = '';
      document.body.style.overflow = '';
    }
    closeBtn && closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  /* ---------- Portfolio filter tabs ---------- */
  const tabBar = document.querySelector('.tab-bar');
  if (tabBar) {
    const items = document.querySelectorAll('.gallery-item');
    tabBar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        items.forEach(it => {
          it.classList.toggle('pf-hidden', cat !== 'all' && it.dataset.cat !== cat);
        });
      });
    });
  }

  /* ---------- Contact form -> Formspree (AJAX) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Bhej rahe hain...';
      status.className = 'form-status';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = 'Shukriya! Aapka message mil gaya — jaldi reply karenge. 🎉';
          status.classList.add('ok');
          form.reset();
        } else {
          status.textContent = 'Kuch gadbad ho gayi. Please email us directly.';
          status.classList.add('err');
        }
      } catch (err) {
        status.textContent = 'Network error — please try again.';
        status.classList.add('err');
      }
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  const toReveal = document.querySelectorAll('.video-card, .service-card, .gallery-item');
  if ('IntersectionObserver' in window && toReveal.length) {
    toReveal.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(18px)'; el.style.transition = 'opacity .5s ease, transform .5s ease'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    toReveal.forEach(el => io.observe(el));
  }
});
