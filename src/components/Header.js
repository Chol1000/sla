import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import SearchModal from './SearchModal';

const Header = ({ isScrolled: forceScrolled }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isBlogDetail = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';
  const scrolledState = forceScrolled || isScrolled || isBlogDetail;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setOpenDropdown(null);
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className={`header ${scrolledState ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <Link 
            to="/" 
            className="logo" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src="/ST_Logo.png" alt="St Lawrence Academy" className="logo-img" />
            <div className="logo-text">
              <h1 className="school-name">St. Lawrence Academy</h1>
            </div>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
            
            <div className="nav-dropdown">
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => toggleDropdown('about')}
              >
                About <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'about' ? 'dropdown-open' : ''}`}>
                <Link to="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about#history'; setIsMenuOpen(false); }} className="dropdown-item">Our History</Link>
                <Link to="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about#mission'; setIsMenuOpen(false); }} className="dropdown-item">Mission & Vision</Link>
                <Link to="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about#faculty'; setIsMenuOpen(false); }} className="dropdown-item">Faculty & Staff</Link>
                <Link to="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about#facilities'; setIsMenuOpen(false); }} className="dropdown-item">Campus & Facilities</Link>
                <Link to="/blog" className={`dropdown-item ${location.pathname === '/blog' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Blog</Link>
                <Link to="/support" className={`dropdown-item ${location.pathname === '/support' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Support</Link>
              </div>
            </div>
            
            <div className="nav-dropdown">
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => toggleDropdown('academics')}
              >
                Academics <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'academics' ? 'dropdown-open' : ''}`}>
                <Link to="/academics" onClick={(e) => { e.preventDefault(); window.location.href = '/academics#curriculum'; setIsMenuOpen(false); }} className="dropdown-item">Curriculum</Link>
                <Link to="/academics" onClick={(e) => { e.preventDefault(); window.location.href = '/academics#arts'; setIsMenuOpen(false); }} className="dropdown-item">Arts & Humanities</Link>
                <Link to="/academics" onClick={(e) => { e.preventDefault(); window.location.href = '/academics#library'; setIsMenuOpen(false); }} className="dropdown-item">Library Resources</Link>
              </div>
            </div>
            
            <div className="nav-dropdown">
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => toggleDropdown('student-life')}
              >
                Student Life <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'student-life' ? 'dropdown-open' : ''}`}>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#athletics'; setIsMenuOpen(false); }} className="dropdown-item">Athletics & Sports</Link>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#clubs'; setIsMenuOpen(false); }} className="dropdown-item">Clubs & Organizations</Link>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#extracurricular'; setIsMenuOpen(false); }} className="dropdown-item">Extracurricular Activities</Link>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#student-government'; setIsMenuOpen(false); }} className="dropdown-item">Student Government</Link>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#events'; setIsMenuOpen(false); }} className="dropdown-item">Events & Calendar</Link>
                <Link to="/student-life" onClick={(e) => { e.preventDefault(); window.location.href = '/student-life#alumni'; setIsMenuOpen(false); }} className="dropdown-item">Alumni</Link>
              </div>
            </div>
            
            <Link to="/admissions" className={`nav-link ${location.pathname === '/admissions' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Admissions</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            <div className="nav-dropdown">
              <div 
                className="nav-link dropdown-toggle" 
                onClick={() => toggleDropdown('theme')}
              >
                Theme <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'theme' ? 'dropdown-open' : ''}`}>
                <div className="dropdown-item" onClick={() => { document.body.classList.remove('dark-theme'); localStorage.setItem('theme', 'light'); setIsMenuOpen(false); }}>Light Mode</div>
                <div className="dropdown-item" onClick={() => { document.body.classList.add('dark-theme'); localStorage.setItem('theme', 'dark'); setIsMenuOpen(false); }}>Dark Mode</div>
              </div>
            </div>
            
            <button 
              className="search-btn" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <i className="fas fa-search"></i>
            </button>
          </nav>

          <div className="mobile-actions">
            <button 
              className="search-btn mobile-search" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <i className="fas fa-search"></i>
            </button>
            
            <button 
              className="menu-toggle"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setOpenDropdown(null);
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;