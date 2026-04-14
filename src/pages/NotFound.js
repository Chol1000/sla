import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="nf-page">
    <div className="nf-inner">
      <div className="nf-code">404</div>
      <div className="nf-divider"></div>
      <h1 className="nf-heading">Page Not Found</h1>
      <p className="nf-body">
        The page you're looking for doesn't exist or may have been moved.
        Use the links below to find your way back.
      </p>
      <div className="nf-links">
        <Link to="/" className="nf-btn nf-btn--primary">Back to Home</Link>
        <Link to="/contact" className="nf-btn nf-btn--ghost">Contact Us</Link>
      </div>
      <div className="nf-nav">
        <Link to="/about">About</Link>
        <Link to="/admissions/apply">Admissions</Link>
        <Link to="/blog">News</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
