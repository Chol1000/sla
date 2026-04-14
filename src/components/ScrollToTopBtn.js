import { useState, useEffect } from 'react';
import './ScrollToTopBtn.css';

const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`scroll-top-btn${visible ? ' scroll-top-btn--visible' : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

export default ScrollToTopBtn;
