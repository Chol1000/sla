import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section main-section">
            <div className="footer-brand">
              <img src="/ST_Logo.png" alt="Saint Lawrence Academy Logo" className="footer-logo" />
            </div>
          </div>
          
          <div className="footer-section stats-section">
            <p className="footer-description">
              Committed to excellence in education and developing future leaders through innovative learning experiences and comprehensive academic programs.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Acceptance Rate</span>
              </div>
              <div className="footer-stat">
                <span className="stat-number">35+</span>
                <span className="stat-label">Programs</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/"><i className="fas fa-chevron-right"></i>Home</a></li>
              <li><a href="/about#history"><i className="fas fa-chevron-right"></i>About</a></li>
              <li><a href="/academics#curriculum"><i className="fas fa-chevron-right"></i>Academics</a></li>
              <li><a href="/student-life#athletics"><i className="fas fa-chevron-right"></i>Student Life</a></li>
              <li><a href="/admissions"><i className="fas fa-chevron-right"></i>Admissions</a></li>
              <li><a href="/contact"><i className="fas fa-chevron-right"></i>Contact</a></li>
              <li><a href="/support"><i className="fas fa-chevron-right"></i>Support</a></li>
            </ul>
          </div>
          

          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Address:</strong> Juba, South Sudan
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +211 927 222 017
              </div>
              <div className="contact-item">
                <strong>Email:</strong> info@stlawrenceacademy.edu
              </div>
            </div>
            
            <div className="social-icons">
              <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://youtube.com"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Saint Lawrence Academy. All rights reserved.</p>
            <p className="designer-credit">Designed by: <a href="https://cholatem.com" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none', fontWeight: 'bold'}}>Chol Atem Giet</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;