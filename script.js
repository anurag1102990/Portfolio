// Smooth scroll for the call‑to‑action button
document.addEventListener('DOMContentLoaded', () => {
  const cta = document.querySelector('.cta');
  // Smooth scroll on call‑to‑action click
  if (cta) {
    cta.addEventListener('click', event => {
      event.preventDefault();
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  // Trigger loaded state on next animation frame to reveal hero content
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
  // Intersection observer for scroll reveal of project cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
  });
});