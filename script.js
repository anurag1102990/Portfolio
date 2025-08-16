// Smooth scroll + background animations + typewriter + card tilt + hover highlights
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll on CTA click
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.addEventListener('click', (event) => {
      event.preventDefault();
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Fade in hero content on load
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  // Respect reduced motion preferences
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typewriter effect for hero tagline
  if (!reduceMotion) {
    const taglineEl = document.querySelector('.hero-content p');
    if (taglineEl) {
      const text = taglineEl.textContent.trim();
      taglineEl.textContent = '';
      let idx = 0;
      function type() {
        taglineEl.textContent += text.charAt(idx);
        idx += 1;
        if (idx < text.length) {
          setTimeout(type, 60);
        }
      }
      setTimeout(type, 300);
    }
  }

  // ===== Animated particle background =====
  const canvas = document.getElementById('bg');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let w = 0, h = 0, particles = [];

  function resize() {
    if (!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function rnd(min, max) { return Math.random() * (max - min) + min; }

  function createParticles() {
    // Increase particle count for a more noticeable effect
    const count = Math.min(200, Math.floor((w * h) / 10000));
    particles = new Array(count).fill(0).map(() => ({
      x: rnd(0, w),
      y: rnd(0, h),
      vx: rnd(-0.25, 0.25),
      vy: rnd(-0.25, 0.25),
      r: rnd(0.6, 2.0)
    }));
  }

  function step() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    const linkDist = 180;
    // Draw particles
    ctx.fillStyle = 'rgba(230, 235, 240, 0.60)';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    // Draw connecting lines
    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < linkDist * linkDist) {
          const alpha = 1 - dist2 / (linkDist * linkDist);
          ctx.strokeStyle = `rgba(220, 225, 230, ${alpha * 0.25})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    if (!reduceMotion) {
      requestAnimationFrame(step);
    }
  }

  if (canvas && ctx && !reduceMotion) {
    resize();
    createParticles();
    step();
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    // Subtle repulsion effect on mouse move
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      particles.forEach(p => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const r = 150 * 150;
        if (d2 < r) {
          const f = (r - d2) / r * 0.06;
          p.vx += dx * f / 150;
          p.vy += dy * f / 150;
        }
      });
    });
  }

  // ===== IntersectionObserver for staggered scroll reveal =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove transition-delay for scroll reveal
        entry.target.style.transitionDelay = `0ms`;
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project-card, .exp-card').forEach((card) => {
    card.classList.add('hidden');
    io.observe(card);
  });

  (function() {
    const cards = document.querySelectorAll('.exp-card');
    const today = new Date();
    function parseYM(ym) { if (!ym) return null; if (String(ym).toLowerCase() === 'present') return today; const [y, m] = String(ym).split('-').map(Number); if (!y || !m) return null; return new Date(y, m - 1, 1); }
    function monthsBetween(a, b) { const years = b.getFullYear() - a.getFullYear(); const months = b.getMonth() - a.getMonth(); return years * 12 + months + 1; }
    cards.forEach(card => { const start = parseYM(card.dataset.start || ''); const end = parseYM(card.dataset.end || ''); const durEl = card.querySelector('.exp-duration'); if (start && end && durEl) { const total = Math.max(1, monthsBetween(start, end)); const years = Math.floor(total / 12); const months = total % 12; const parts = []; if (years > 0) parts.push(`${years} yr${years>1?'s':''}`); if (months > 0) parts.push(`${months} mo${months>1?'s':''}`); durEl.textContent = parts.join(' ') || '1 mo'; } });
  })();

  // ===== Parallax tilt effect on project cards =====
  document.querySelectorAll('.project-card').forEach(card => {
    let rafId = null;
    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // Increase tilt amplitude for more noticeable effect
      const rx = (0.5 - y) * 12;
      const ry = (x - 0.5) * 12;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }
    function handleLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      // Clear inline transform so CSS (:hover) and base styles control the final state
      card.style.transform = '';
    }
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
  });

  // ===== Button/CTA spotlight effect tracking cursor =====
  document.querySelectorAll('.button, .cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
});