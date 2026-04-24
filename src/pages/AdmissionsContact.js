import { useEffect } from 'react';
import './AdmissionsContact.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const AdmissionsContact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Contact Admissions', 'Get in touch with the St. Lawrence Academy admissions team. We are ready to answer your questions about enrolment, fees, and the application process.');
    const timer = setTimeout(() => initScrollAnimations(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="adm-contact-page">

      {/* ── Hero ── */}
      <section className="adm-contact-hero">
        <div className="adm-contact-hero-bg">
          <img src="/images/primary/primary_school_gate.JPG" alt="St. Lawrence Academy Primary School gate" />
        </div>
        <div className="adm-contact-hero-overlay"></div>
        <div className="adm-contact-hero-content">
          <div className="container">
            <div className="adm-contact-hero-inner">
              <span className="adm-contact-hero-label">Admissions</span>
              <h1 className="adm-contact-hero-title">Contact <span>Admissions</span></h1>
              <p className="adm-contact-hero-sub">
                Our admissions team is here to guide you through every step —
                from your first question to your child's first day at SLA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="adm-contact-mobile-band">
        <div className="container">
          <h2 className="adm-contact-mobile-band-heading">Contact Admissions</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="adm-contact-intro">
        <div className="container">
          <div className="adm-contact-intro-inner">
            <span className="adm-contact-eyebrow">Reach Us</span>
            <h2 className="adm-contact-intro-heading">We're Ready to Help</h2>
            <p className="adm-contact-intro-text">
              Whether you have questions about enrolment, the application process, fees,
              or simply want to know more about SLA — reach out and our admissions team
              will get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="adm-contact-cards-section">
        <div className="container">
          <div className="adm-contact-cards-grid">

            <div className="adm-contact-card reveal">
              <div className="adm-contact-card-body">
                <span className="adm-contact-eyebrow">Call Us</span>
                <h3>Phone</h3>
                <div className="adm-contact-card-rows">
                  <div className="adm-contact-card-row">
                    <span>Admissions Office</span>
                    <em>+211 9 12 345 679</em>
                  </div>
                  <div className="adm-contact-card-row">
                    <span>Main Office</span>
                    <em>+211 9 12 345 678</em>
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-contact-card reveal">
              <div className="adm-contact-card-body">
                <span className="adm-contact-eyebrow">Write to Us</span>
                <h3>Email</h3>
                <div className="adm-contact-card-rows">
                  <div className="adm-contact-card-row">
                    <span>Admissions</span>
                    <em>admissions@stlawrenceacademy.edu</em>
                  </div>
                  <div className="adm-contact-card-row">
                    <span>General</span>
                    <em>info@stlawrenceacademy.edu</em>
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-contact-card reveal">
              <div className="adm-contact-card-body">
                <span className="adm-contact-eyebrow">When We're Available</span>
                <h3>Office Hours</h3>
                <div className="adm-contact-card-rows">
                  <div className="adm-contact-card-row">
                    <span>Monday – Friday</span>
                    <em>8:00 AM – 4:00 PM</em>
                  </div>
                  <div className="adm-contact-card-row adm-contact-card-row--muted">
                    <span>Saturday</span>
                    <em>Closed</em>
                  </div>
                  <div className="adm-contact-card-row adm-contact-card-row--muted">
                    <span>Sunday</span>
                    <em>Closed</em>
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-contact-card reveal">
              <div className="adm-contact-card-body">
                <span className="adm-contact-eyebrow">Find Us</span>
                <h3>Campus Address</h3>
                <div className="adm-contact-card-rows">
                  <div className="adm-contact-card-row adm-contact-card-row--single">
                    <em>Hai Referendum, Juba, South Sudan</em>
                  </div>
                </div>
                <a href="/admissions/visit" className="adm-contact-directions-link">
                  <i className="fas fa-walking"></i> Schedule a Campus Visit
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What We Can Help With ── */}
      <section className="adm-contact-topics">
        <div className="container">
          <div className="adm-contact-topics-header">
            <span className="adm-contact-eyebrow">Common Enquiries</span>
            <h2 className="adm-contact-topics-heading">What Can We Help You With?</h2>
          </div>
          <div className="adm-contact-topics-grid">
            <div className="adm-contact-topic-item reveal">
              <div className="adm-contact-topic-num">01</div>
              <h3>Enrolment & Applications</h3>
              <p>Questions about how to apply, what documents are required, and what the admissions process involves.</p>
            </div>
            <div className="adm-contact-topic-item reveal">
              <div className="adm-contact-topic-num">02</div>
              <h3>Fees & Payment</h3>
              <p>Information about the current fee structure, payment terms, and any available scholarship options.</p>
            </div>
            <div className="adm-contact-topic-item reveal">
              <div className="adm-contact-topic-num">03</div>
              <h3>Academic Programmes</h3>
              <p>Details about Nursery, Primary, and Secondary school programmes, subjects, and examination pathways.</p>
            </div>
            <div className="adm-contact-topic-item reveal">
              <div className="adm-contact-topic-num">04</div>
              <h3>Campus Visits</h3>
              <p>Arrange a guided tour of the school so you and your child can see facilities and meet the teaching team.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AdmissionsContact;
