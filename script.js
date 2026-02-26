// ─── Navbar scroll effect ─────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const revealTargets = [
  '.portfolio-card',
  '.company-row',
  '.about-fact-card',
  '.about-text',
  '.contact-left',
  '.contact-right',
  '.hero-stat-card',
];

document.querySelectorAll(revealTargets.join(', ')).forEach(el => {
  el.classList.add('reveal');
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children]
        .filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 70);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll(revealTargets.join(', ')).forEach(el => observer.observe(el));

// ─── Hero entrance ────────────────────────────────────────────────────────────
['.hero-tag', '.hero-heading', '.hero-sub', '.hero-actions'].forEach((sel, i) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.style.cssText = `opacity:0;transform:translateY(20px);transition:opacity .7s ease ${i * 0.1}s,transform .7s ease ${i * 0.1}s`;
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// ─── Active nav link ──────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.style.color = active ? 'var(--text)' : 'var(--muted)';
        link.style.fontWeight = active ? '600' : '500';
      });
    }
  });
}, { threshold: 0.45 }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.style.color = active ? 'var(--text)' : '';
          link.style.fontWeight = active ? '600' : '';
        });
      }
    });
  }, { threshold: 0.45 }).observe(s)
);
