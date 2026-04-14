import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* ── Nav body ── */}
      <div className="footer-body">

        {/* Centered ghost watermark */}
        <img src="/ST_Logo.png" alt="" className="footer-watermark" aria-hidden="true" />

        <div className="container footer-body-container">
          <div className="footer-nav-grid">

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Explore</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/history">Our History</a></li>
                <li><a href="/campus">Campus &amp; Facilities</a></li>
                <li><a href="/gallery">Photo Gallery</a></li>
                <li><a href="/faculty">Faculty &amp; Staff</a></li>
                <li><a href="/founder">The Founder</a></li>
                <li><a href="/pta">PTA</a></li>
                <li><a href="/anthem">School Anthem</a></li>
                <li><a href="/blog">News &amp; Blog</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/alumni">Alumni</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Academics</h4>
              <ul className="footer-links">
                <li><a href="/nursery">Nursery School</a></li>
                <li><a href="/primary">Primary School</a></li>
                <li><a href="/secondary">Secondary School</a></li>
                <li><a href="/curriculum">Curriculum Overview</a></li>
                <li><a href="/subjects">Subjects Offered</a></li>
                <li><a href="/examinations">Examinations</a></li>
                <li><a href="/library">Library</a></li>
                <li><a href="/science-labs">Science Labs</a></li>
                <li><a href="/technology">Technology</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Student Life</h4>
              <ul className="footer-links">
                <li><a href="/student-life/sports">Sports &amp; Athletics</a></li>
                <li><a href="/student-life/arts">Arts &amp; Culture</a></li>
                <li><a href="/student-life/clubs">Clubs &amp; Societies</a></li>
                <li><a href="/student-life/leadership">Student Leadership</a></li>
                <li><a href="/student-life/events">Events &amp; Activities</a></li>
                <li><a href="/student-life/community-service">Community Service</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Admissions</h4>
              <ul className="footer-links">
                <li><a href="/admissions/apply">How to Apply</a></li>
                <li><a href="/admissions/requirements">Requirements</a></li>
                <li><a href="/admissions/fees">Fees &amp; Payment</a></li>
                <li><a href="/admissions/visit">Schedule a Visit</a></li>
                <li><a href="/admissions/dates">Important Dates</a></li>
                <li><a href="/admissions/contact">Contact Admissions</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Wellbeing &amp; Support</h4>
              <ul className="footer-links">
                <li><a href="/student-life/counseling">Counseling</a></li>
                <li><a href="/student-life/health">Health &amp; Wellness</a></li>
                <li><a href="/student-life/dining">Dining Services</a></li>
                <li><a href="/support">Support the School</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom section ── */}
      <div className="footer-bottom">
        <div className="container">

          {/* Brand + contact + social row */}
          <div className="footer-bottom-brand">
            <div className="footer-bottom-school">
              <span className="footer-bottom-name">ST. LAWRENCE ACADEMY</span>
              <span className="footer-bottom-loc">Juba, South Sudan &nbsp;·&nbsp; Est. 2020</span>
            </div>

            <div className="footer-bottom-contact">
              <a href="tel:+211926100446"><i className="fas fa-phone-alt"></i>+211 926 100 446</a>
              <a href="mailto:info@stlawrenceacademy.edu.ss"><i className="fas fa-envelope"></i>info@stlawrenceacademy.edu.ss</a>
              <span><i className="fas fa-map-marker-alt"></i>Juba, Central Equatoria, South Sudan</span>
              <span><i className="fas fa-clock"></i>Mon – Fri &nbsp;·&nbsp; 7:00 am – 5:00 pm</span>
            </div>

            <div className="footer-bottom-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Copyright row */}
          <div className="footer-copyright-row">
            <p className="footer-copy">
              &copy; {year} St. Lawrence Academy. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/faq">FAQ</a>
              <span className="footer-bottom-dot"></span>
              <a href="/contact">Contact</a>
              <span className="footer-bottom-dot"></span>
              <a href="/support">Support Us</a>
            </div>
            <p className="footer-credit">
              Designed &amp; built by{' '}
              <a href="https://cholatem.com" target="_blank" rel="noopener noreferrer">Chol Atem Giet</a>
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
