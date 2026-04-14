import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-left">
          <a href="tel:+211926100446" className="topbar-item">
            <i className="fas fa-phone"></i>
            <span>+211 926 100 446</span>
          </a>
          <a href="mailto:info@stlawrenceacademy.edu" className="topbar-item">
            <i className="fas fa-envelope"></i>
            <span>info@stlawrenceacademy.edu</span>
          </a>
          <span className="topbar-item topbar-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>Juba, South Sudan</span>
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-label">Follow Us:</span>
          <div className="topbar-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
