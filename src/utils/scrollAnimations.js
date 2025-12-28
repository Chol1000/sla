// Scroll animation utility
export const initScrollAnimations = () => {
  // Fallback: Show all content after 1 second if animations don't trigger
  setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.scroll-animate:not(.animate-in)');
    hiddenElements.forEach(el => el.classList.add('animate-in'));
  }, 1000);

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all scroll-animate elements
  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(el => observer.observe(el));

  // Observe individual elements
  const programRows = document.querySelectorAll('.program-row');
  const campusRows = document.querySelectorAll('.campus-row');
  const newsArticles = document.querySelectorAll('.news-article');
  const featuredArticle = document.querySelector('.featured-article');

  [...programRows, ...campusRows, ...newsArticles, featuredArticle].forEach(el => {
    if (el) observer.observe(el);
  });
};