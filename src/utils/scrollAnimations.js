// Scroll animation utility
export const initScrollAnimations = () => {

  // ── 1. Section fade-in (slide up gently, once only) ──
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        sectionObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  const sections = document.querySelectorAll(
    '.scroll-animate, .academic-excellence, .news-events, .student-life-section, .home-admissions-process, .campus-tour-section, .home-why-sla, .home-quick-facts, .home-stats-strip'
  );
  sections.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    // Show immediately if already visible on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'none';
    } else {
      sectionObserver.observe(el);
    }
  });

  // ── 2. Stats counter (eased, fires once) ──
  const animateCounter = (el, target, suffix) => {
    const duration = 1400;
    const startTime = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(easeOut(progress) * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.getAttribute('data-target'));
        const originalText = entry.target.textContent.trim();
        const suffix = originalText.includes('+') ? '+' : (originalText.includes('%') ? '%' : '');
        if (target > 0) animateCounter(entry.target, target, suffix);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.home-stat-number[data-target]').forEach(el => statsObserver.observe(el));

  // ── 4. Generic .reveal → .visible (fires once per element) ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));

  // ── 3. Card stagger (fires each time section enters) ──
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(
          '.prog-card, .home-pillar, .life-highlight-card, .admissions-step, .quick-fact-item'
        );
        cards.forEach((card, i) => {
          card.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll(
    '.prog-cards-grid, .home-pillars-grid, .life-highlights-grid, .home-admissions-steps, .home-quick-facts-grid'
  ).forEach(el => cardObserver.observe(el));
};