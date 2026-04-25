import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import SearchModal from './SearchModal';

const Header = ({ isScrolled: forceScrolled }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isCareerDetail = location.pathname.startsWith('/careers/') && location.pathname !== '/careers';
  const isBlogDetail = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';
  const isNotFound = location.pathname === '/404';
  const scrolledState = forceScrolled || isScrolled || isCareerDetail || isBlogDetail || isNotFound;

  // Active state for dropdown parent nav items
  const isAboutActive = ['/about', '/blog', '/careers', '/support', '/founder', '/faculty', '/pta', '/history', '/anthem', '/campus', '/reviews'].some(p => location.pathname.startsWith(p));
  const isAcademicsActive = ['/academics', '/nursery', '/primary', '/secondary', '/library', '/science-labs', '/technology', '/examinations', '/subjects', '/curriculum'].some(p => location.pathname.startsWith(p));
  const isStudentLifeActive = location.pathname.startsWith('/student-life');
  const isAdmissionsActive = ['/admissions'].some(p => location.pathname.startsWith(p));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);
  const isMobile = () => window.innerWidth < 900;

  const toggleSubSection = (key) => {
    if (!isMobile()) return;
    setOpenSubSection(prev => prev === key ? null : key);
  };


  // Keep --header-bottom CSS variable in sync so dropdown sits flush with header.
  // We compute from state rather than getBoundingClientRect to avoid reading
  // mid-animation values while the header slides (transition: top 0.35s).
  useEffect(() => {
    const updateHeaderBottom = () => {
      const header = document.querySelector('.header');
      if (!header) return;
      const headerHeight = header.getBoundingClientRect().height;
      const topbarVisible = !document.body.classList.contains('topbar-hidden');
      const topbarHeight = topbarVisible ? 60 : 0;
      document.documentElement.style.setProperty('--header-bottom', `${Math.round(topbarHeight + headerHeight)}px`);
    };
    updateHeaderBottom();
    window.addEventListener('resize', updateHeaderBottom);
    return () => window.removeEventListener('resize', updateHeaderBottom);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isLargeScreen = window.innerWidth >= 900;
      const header = document.querySelector('.header');

      // Gallery hide logic
      if (isLargeScreen && header) {
        const galleries = [
          document.querySelector('[data-section="nursery-gallery-images"]'),
          document.querySelector('[data-section="primary-gallery-images"]'),
          document.querySelector('[data-section="secondary-gallery-images"]'),
        ];
        const headerHeight = 80;
        const overGallery = galleries.some(g => {
          if (!g) return false;
          const r = g.getBoundingClientRect();
          return r.top <= headerHeight && r.bottom >= headerHeight;
        });
        if (overGallery) { header.classList.add('header-hidden'); return; }
        header.classList.remove('header-hidden');
      }


      // Topbar hides once scrolled past 80px, reappears below 40px (hysteresis prevents jerk)
      const isHidden = document.body.classList.contains('topbar-hidden');
      if (!isHidden && currentY > 80) {
        document.body.classList.add('topbar-hidden');
        setIsScrolled(true);
        const h = document.querySelector('.header');
        if (h) document.documentElement.style.setProperty('--header-bottom', `${Math.round(h.getBoundingClientRect().height)}px`);
      } else if (isHidden && currentY < 40) {
        document.body.classList.remove('topbar-hidden');
        setIsScrolled(false);
        const h = document.querySelector('.header');
        if (h) document.documentElement.style.setProperty('--header-bottom', `${Math.round(44 + h.getBoundingClientRect().height)}px`);
      }

    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  // Reset all menu/dropdown state on every route change.
  // Briefly disable pointer-events on the nav so the CSS :hover state drops,
  // closing hover-based dropdowns on desktop without removing hover behaviour.
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubSection(null);
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.pointerEvents = 'none';
      const t = setTimeout(() => { nav.style.pointerEvents = ''; }, 300);
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

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
            <img src="/images/general/logo.png" alt="St Lawrence Academy" className="logo-img" />
            <div className="logo-text">
              <h1 className="school-name">
                <span className="name-line-1">ST. LAWRENCE</span>
                <span className="name-line-2">ACADEMY</span>
              </h1>
            </div>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>

            {/* ── About mega-menu ── */}
            <div className="nav-dropdown">
              <div className={`nav-link dropdown-toggle ${isAboutActive ? 'active' : ''}`} onClick={() => { toggleDropdown('about'); setOpenSubSection(null); }}>
                About Us <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'about' ? 'dropdown-open' : ''}`}>
                <div className="dropdown-inner">
                  <div className={`dropdown-col ${openSubSection === 'about-school' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('about-school')}>
                      THE SCHOOL <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/about" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>School Profile</Link>
                      <Link to="/history" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Our History</Link>
                      <Link to="/campus" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Campus</Link>
                      <Link to="/anthem" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>School Anthem</Link>
                      <Link to="/gallery" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'about-connect' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('about-connect')}>
                      RESOURCES <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/blog" className={`dropdown-item ${location.pathname === '/blog' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>News and Blog</Link>
                      <Link to="/careers" className={`dropdown-item ${location.pathname === '/careers' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Careers</Link>
                      <Link to="/reviews" className={`dropdown-item ${location.pathname === '/reviews' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>School Reviews</Link>
                      <Link to="/support" className={`dropdown-item ${location.pathname === '/support' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Support Us</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'about-people' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('about-people')}>
                      LEADERSHIP <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/founder" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>The Founder</Link>
                      <Link to="/faculty" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Faculty &amp; Staff</Link>
                      <Link to="/pta" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>PTA</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Academics mega-menu ── */}
            <div className="nav-dropdown">
              <div className={`nav-link dropdown-toggle ${isAcademicsActive ? 'active' : ''}`} onClick={() => { toggleDropdown('academics'); setOpenSubSection(null); }}>
                Academics <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'academics' ? 'dropdown-open' : ''}`}>
                <div className="dropdown-inner">
                  <div className={`dropdown-col ${openSubSection === 'ac-prog' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('ac-prog')}>
                      PROGRAMMES <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/nursery"   className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Nursery School</Link>
                      <Link to="/primary"   className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Primary School</Link>
                      <Link to="/secondary" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Secondary School</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'ac-cur' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('ac-cur')}>
                      CURRICULUM <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/curriculum" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Curriculum Overview</Link>
                      <Link to="/subjects" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Subjects Offered</Link>
                      <Link to="/examinations" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Examinations</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'ac-res' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('ac-res')}>
                      RESOURCES <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/library" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Library</Link>
                      <Link to="/science-labs" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Science Labs</Link>
                      <Link to="/technology" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Technology</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Student Life mega-menu ── */}
            <div className="nav-dropdown">
              <div className={`nav-link dropdown-toggle ${isStudentLifeActive ? 'active' : ''}`} onClick={() => { toggleDropdown('student-life'); setOpenSubSection(null); }}>
                Student Life <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'student-life' ? 'dropdown-open' : ''}`}>
                <div className="dropdown-inner">
                  <div className={`dropdown-col ${openSubSection === 'sl-com' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('sl-com')}>
                      COMMUNITY <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/student-life/leadership" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Student Leadership</Link>
                      <Link to="/student-life/events" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Events &amp; Activities</Link>
                      <Link to="/student-life/community-service" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Community Service</Link>
                      <Link to="/alumni" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Alumni</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'sl-act' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('sl-act')}>
                      ACTIVITIES <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/student-life/sports" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Sports &amp; Athletics</Link>
                      <Link to="/student-life/clubs" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Clubs &amp; Societies</Link>
                      <Link to="/student-life/arts" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Arts &amp; Culture</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'sl-sup' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('sl-sup')}>
                      SUPPORT <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/student-life/counseling" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Counseling</Link>
                      <Link to="/student-life/health" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Health &amp; Wellness</Link>
                      <Link to="/student-life/dining" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Dining Services</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Admissions with dropdown ── */}
            <div className="nav-dropdown">
              <div className={`nav-link dropdown-toggle ${isAdmissionsActive ? 'active' : ''}`} onClick={() => { toggleDropdown('admissions'); setOpenSubSection(null); }}>
                Admissions <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`dropdown-menu ${openDropdown === 'admissions' ? 'dropdown-open' : ''}`}>
                <div className="dropdown-inner">
                  <div className={`dropdown-col ${openSubSection === 'adm-info' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('adm-info')}>
                      INFORMATION <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/admissions/dates" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Important Dates</Link>
                      <Link to="/admissions/visit" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Schedule a Visit</Link>
                      <Link to="/admissions/contact" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Contact Admissions</Link>
                      <Link to="/admissions/status" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Registration Status</Link>
                      <Link to="/faq" className={`dropdown-item ${location.pathname === '/faq' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                    </div>
                  </div>
                  <div className={`dropdown-col ${openSubSection === 'adm-apply' ? 'sub-open' : ''}`}>
                    <div className="dropdown-col-title" onClick={() => toggleSubSection('adm-apply')}>
                      APPLY <i className="fas fa-chevron-down sub-arrow"></i>
                    </div>
                    <div className="dropdown-col-items">
                      <Link to="/admissions/apply" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Application Process</Link>
                      <Link to="/admissions/requirements" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Requirements</Link>
                      <Link to="/admissions/fees" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Fees &amp; Payment</Link>
                    </div>
                  </div>
                  <div className="dropdown-img-panel">
                    <img src="/images/secondary/assembly_overview.JPG" alt="St. Lawrence Academy" />
                    <div className="dropdown-img-caption">
                      <span>St. Lawrence Academy</span>
                      <p>Juba, South Sudan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>

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