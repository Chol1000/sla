import { useEffect } from 'react';
import './Support.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Support Us',
      'Support St. Lawrence Academy through donations and contributions. Help us provide quality education and transform lives in South Sudan.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="support-page">

      {/* ── Hero ── */}
      <section className="support-hero">
        <div className="support-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="support-hero-overlay"></div>
        <div className="support-hero-content">
          <div className="container">
            <div className="support-hero-inner">
              <span className="support-hero-label">St. Lawrence Academy</span>
              <h1 className="support-hero-title support-hero-title--desktop">
                Support <span>St. Lawrence</span><br />Academy
              </h1>
              <p className="support-hero-sub">
                Your generosity helps us provide quality education and
                transform lives in South Sudan. Every contribution — large
                or small — makes a lasting difference.
              </p>
              <a href="#ways-to-give" className="support-hero-cta">
                <i className="fas fa-heart"></i> Ways to Give
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="support-mobile-band">
        <div className="container">
          <h2 className="support-mobile-band-heading">Support St. Lawrence Academy</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="support-intro">
        <div className="container">
          <div className="support-intro-inner">
            <span className="support-intro-eyebrow">Make a Difference</span>
            <h2 className="support-intro-heading">Why Your Support Matters</h2>
            <p className="support-intro-text">
              Since 2020, St. Lawrence Academy has been dedicated to providing
              quality education and character formation for students in South Sudan.
              Your generous support enables us to offer scholarships to students in
              need, upgrade our facilities, develop our teachers, and expand our
              programmes. Together, we are building a brighter future — one student
              at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <div className="support-stats-band">
        <div className="container">
          <div className="support-stats-inner">
            <div className="support-stat">
              <span className="support-stat-num">1500+</span>
              <span className="support-stat-label">Students Enrolled</span>
            </div>
            <div className="support-stat-divider"></div>
            <div className="support-stat">
              <span className="support-stat-num">100+</span>
              <span className="support-stat-label">Support Staff</span>
            </div>
            <div className="support-stat-divider"></div>
            <div className="support-stat">
              <span className="support-stat-num">3</span>
              <span className="support-stat-label">Academic Levels</span>
            </div>
            <div className="support-stat-divider"></div>
            <div className="support-stat">
              <span className="support-stat-num">6+</span>
              <span className="support-stat-label">Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Impact Section ── */}
      <section className="support-impact">
        <div className="container">
          <div className="support-section-header">
            <span className="support-section-eyebrow">Your Impact</span>
            <h2 className="support-section-heading">What Your Donation Funds</h2>
            <p className="support-section-sub">
              Every contribution is directed where it matters most — directly
              supporting our students and the quality of education we provide.
            </p>
          </div>
          <div className="support-impact-grid">
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Student Scholarships</h3>
              <p>
                Help us ensure that no deserving student is turned away due
                to financial hardship. Scholarships open doors to a
                life-changing education.
              </p>
            </div>
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Teacher Development</h3>
              <p>
                Funding teacher training and professional development ensures
                our students are taught by skilled, motivated, and
                well-supported educators.
              </p>
            </div>
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Facilities & Infrastructure</h3>
              <p>
                Your donations help us build and maintain classrooms, labs,
                libraries, and sports facilities that create an inspiring
                learning environment.
              </p>
            </div>
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Learning Resources</h3>
              <p>
                From textbooks and stationery to digital tools and library
                materials, your support equips students with what they need
                to succeed academically.
              </p>
            </div>
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Student Welfare</h3>
              <p>
                Contributions towards student health, nutrition, and wellbeing
                programmes help ensure every learner is in the best condition
                to study and grow.
              </p>
            </div>
            <div className="support-impact-card reveal">
              <div className="support-impact-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Sports & Activities</h3>
              <p>
                Sports and extracurricular activities build character, teamwork,
                and discipline. Your support helps us offer a full and enriching
                school experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ways to Give ── */}
      <section className="support-give" id="ways-to-give">
        <div className="container">
          <div className="support-section-header">
            <span className="support-section-eyebrow">Give Today</span>
            <h2 className="support-section-heading">Ways to Support Us</h2>
            <p className="support-section-sub">
              We make it easy to donate. Choose whichever method works best
              for you — every gift is welcomed and appreciated.
            </p>
          </div>
          <div className="support-give-grid">

            {/* Bank Transfer */}
            <div className="support-give-card reveal">
              <div className="support-give-card-header">
                <div>
                  <h3>Bank Transfer</h3>
                  <p>Direct wire or local bank deposit</p>
                </div>
              </div>
              <div className="support-give-card-body">
                <div className="support-give-row">
                  <div className="support-give-item">
                    <label>Bank Name</label>
                    <span>National Bank of South Sudan</span>
                  </div>
                  <div className="support-give-item">
                    <label>Account Name</label>
                    <span>St. Lawrence Academy</span>
                  </div>
                  <div className="support-give-item">
                    <label>Account Number</label>
                    <span className="highlight">1234567890</span>
                  </div>
                  <div className="support-give-item">
                    <label>Swift / BIC Code</label>
                    <span>NBSSSSJ1</span>
                  </div>
                  <div className="support-give-item">
                    <label>Branch</label>
                    <span>Juba Main Branch, South Sudan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Money */}
            <div className="support-give-card reveal">
              <div className="support-give-card-header">
                <div>
                  <h3>Mobile Money</h3>
                  <p>Quick and convenient mobile payment</p>
                </div>
              </div>
              <div className="support-give-card-body">
                <div className="support-give-row">
                  <div className="support-give-item">
                    <label>MTN Mobile Money</label>
                    <span className="highlight">+211 123 456 789</span>
                  </div>
                  <div className="support-give-item">
                    <label>Account Name (MTN)</label>
                    <span>St. Lawrence Academy</span>
                  </div>
                  <div className="support-give-provider-divider"></div>
                  <div className="support-give-item">
                    <label>Zain Mobile Money</label>
                    <span className="highlight">+211 987 654 321</span>
                  </div>
                  <div className="support-give-item">
                    <label>Account Name (Zain)</label>
                    <span>St. Lawrence Academy</span>
                  </div>
                  <div className="support-give-item">
                    <label>Reference / Memo</label>
                    <span>Donation — Your Name</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Quote Band ── */}
      <div className="support-quote-band">
        <div className="container">
          <div className="support-quote-inner">
            <div className="support-quote-mark">&ldquo;</div>
            <p className="support-quote-text">
              Education is the most powerful weapon you can use to change the world.
              At St. Lawrence Academy, every donation is an investment in the
              future of South Sudan.
            </p>
            <span className="support-quote-author">— Nelson Mandela</span>
          </div>
        </div>
      </div>

      {/* ── Contact & CTA ── */}
      <section className="support-contact">
        <div className="container">
          <div className="support-contact-inner">

            <div className="support-contact-note reveal support-contact-note--order">
              <span className="support-contact-note-eyebrow">Partner With Us</span>
              <h3>Interested in a Long-Term Partnership?</h3>
              <p>
                Whether you are an organisation, a business, or an individual
                looking to make a sustained impact, we welcome partnerships that
                align with our mission of providing quality education in South Sudan.
                Contact us to discuss how we can work together.
              </p>
              <a href="/contact" className="support-contact-note-btn">
                <i className="fas fa-arrow-right"></i> Contact Us
              </a>
            </div>

            <div className="support-contact-info reveal">
              <h3>Get in Touch</h3>
              <p>
                For large donations, partnerships, or if you would like more
                information about how your support is used, please reach out
                to us directly.
              </p>
              <div className="support-contact-items">
                <div className="support-contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="support-contact-item-text">
                    <strong>Email</strong>
                    <span>info@saintlawrenceacademy.org</span>
                  </div>
                </div>
                <div className="support-contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="support-contact-item-text">
                    <strong>Phone</strong>
                    <span>+211 912 345 678</span>
                  </div>
                </div>
                <div className="support-contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="support-contact-item-text">
                    <strong>Address</strong>
                    <span>Juba, Central Equatoria, South Sudan</span>
                  </div>
                </div>
                <div className="support-contact-item">
                  <i className="fas fa-clock"></i>
                  <div className="support-contact-item-text">
                    <strong>Office Hours</strong>
                    <span>Mon – Fri, 8:00 AM – 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Support;
