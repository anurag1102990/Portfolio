// Smooth scroll + background animations + typewriter + card tilt + hover highlights
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for any in-page anchor (site-wide)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.length <= 1) return; // skip plain '#'
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // account for fixed announce bar height
      const OFFSET = 72; // px
      const y = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    });
  });

  // Fade in hero content on load
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  // Respect reduced motion preferences
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCnPage = document.body.getAttribute('data-page') === 'codeneuron';

  // Typewriter effect for hero tagline (HOME ONLY, not CodeNeuron page)
  if (!reduceMotion && !isCnPage) {
    const taglineEl = document.querySelector('.hero-content p');
    if (taglineEl) {
      const text = taglineEl.textContent.trim();
      taglineEl.textContent = '';
      let idx = 0;
      function type() {
        taglineEl.textContent += text.charAt(idx);
        idx += 1;
        if (idx < text.length) setTimeout(type, 60);
      }
      setTimeout(type, 300);
    }
  }

  // CodeNeuron page: typewriter for #cnHeroTyping
  if (!reduceMotion && isCnPage) {
    const el = document.getElementById('cnHeroTyping');
    if (el) {
      const text = el.textContent.trim();
      el.textContent = '';
      el.setAttribute('aria-label', text);
      el.classList.add('is-typing');
      let i = 0;
      const speed = 32;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i++);
          setTimeout(type, speed);
        } else {
          el.classList.remove('is-typing');
        }
      }
      setTimeout(type, 250);
    }
  }

  if (!reduceMotion) {
    const homeCnTyping = document.getElementById('homeCnTyping');
    if (homeCnTyping) {
      const text = homeCnTyping.textContent.trim();
      homeCnTyping.textContent = '';
      let i = 0;
      const speed = 35;
      function type() {
        if (i < text.length) {
          homeCnTyping.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      setTimeout(type, 800);
    }
  }

  // ===== IntersectionObserver for staggered scroll reveal =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `0ms`;
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project-card, .exp-card, .feature-card').forEach((card) => {
    card.classList.add('hidden');
    io.observe(card);
  });

  // ===== Floating Back-to-Top button =====
  const toTop = document.getElementById('backToTop');
  if (toTop) {
    const toggleToTop = () => {
      const show = window.scrollY > 240;
      toTop.classList.toggle('show', show);
    };
    toggleToTop();
    window.addEventListener('scroll', () => {
      if (!reduceMotion) {
        requestAnimationFrame(toggleToTop);
      } else {
        toggleToTop();
      }
    }, { passive: true });
    toTop.addEventListener('click', (e) => {
      e.preventDefault();
      if (reduceMotion) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  (function() {
    const cards = document.querySelectorAll('.exp-card');
    const today = new Date();
    function parseYM(ym) { if (!ym) return null; if (String(ym).toLowerCase() === 'present') return today; const [y, m] = String(ym).split('-').map(Number); if (!y || !m) return null; return new Date(y, m - 1, 1); }
    function monthsBetween(a, b) { const years = b.getFullYear() - a.getFullYear(); const months = b.getMonth() - a.getMonth(); return years * 12 + months + 1; }
    cards.forEach(card => { const start = parseYM(card.dataset.start || ''); const end = parseYM(card.dataset.end || ''); const durEl = card.querySelector('.exp-duration'); if (start && end && durEl) { const total = Math.max(1, monthsBetween(start, end)); const years = Math.floor(total / 12); const months = total % 12; const parts = []; if (years > 0) parts.push(`${years} yr${years>1?'s':''}`); if (months > 0) parts.push(`${months} mo${months>1?'s':''}`); durEl.textContent = parts.join(' ') || '1 mo'; } });
  })();

  // ===== Parallax tilt effect on project + featured cards =====
  if (!reduceMotion) {
    document.querySelectorAll('.project-card, .feature-card').forEach(card => {
      let rafId = null;
      function handleMove(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const amp = 8;
        const rx = (0.5 - y) * amp;
        const ry = (x - 0.5) * amp;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      }
      function handleLeave() {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
      }
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });
  }

  // ===== Button/CTA spotlight effect =====
  document.querySelectorAll('.button, .cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  // Dismissible announcement bar
  (function () {
    const bar = document.querySelector('.announce-bar');
    if (!bar) return;
    try { localStorage.removeItem('hideAnnouncementV1'); } catch (_) {}
  })();
});
