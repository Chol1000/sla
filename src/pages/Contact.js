import { useState, useEffect } from 'react';
import './Contact.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { secureFetch, isValidEmail, isValidPhone, sanitizeInput } from '../utils/api';
import { setPageMeta } from '../utils/pageMeta';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Contact Us', 'Get in touch with St. Lawrence Academy. Visit us in Hai Referendum, Juba, South Sudan, or send us a message — our team is ready to help.');
    const timer = setTimeout(() => initScrollAnimations(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    if (!isValidEmail(formData.email)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setSubmitting(false);
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      setSubmitting(false);
      return;
    }

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      message: sanitizeInput(formData.message)
    };

    try {
      await secureFetch('/api/contact/messages/', {
        method: 'POST',
        body: JSON.stringify(sanitizedData)
      });
      setSubmitMessage({ type: 'success', text: 'Thank you! Your message has been received. We will be in touch shortly.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 12000);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterMessage({ type: '', text: '' });

    const fd = new FormData(e.target);
    const email = fd.get('email');
    const name = fd.get('name');

    if (!isValidEmail(email)) {
      setNewsletterMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setNewsletterSubmitting(false);
      return;
    }

    try {
      await secureFetch('/api/contact/newsletter/', {
        method: 'POST',
        body: JSON.stringify({ name: sanitizeInput(name), email: sanitizeInput(email) })
      });
      setNewsletterMessage({ type: 'success', text: 'Thank you for subscribing!' });
      e.target.reset();
    } catch (error) {
      setNewsletterMessage({ type: 'error', text: error.message || 'Failed to subscribe. Please try again.' });
    } finally {
      setNewsletterSubmitting(false);
      setTimeout(() => setNewsletterMessage({ type: '', text: '' }), 12000);
    }
  };

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src="/sla_school_view_4.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <div className="container">
            <div className="contact-hero-inner">
              <span className="contact-hero-label">St. Lawrence Academy</span>
              <h1 className="contact-hero-title">Get in <span>Touch</span></h1>
              <p className="contact-hero-sub">
                We are here to answer your questions. Reach out and our
                team will guide you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="contact-mobile-band">
        <div className="container">
          <h2 className="contact-mobile-band-heading">Contact Us</h2>
        </div>
      </div>

      {/* ── Quick Info Band ── */}
      <div className="contact-quick-band">
        <div className="container">
          <div className="contact-quick-grid">
            <div className="contact-quick-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <span className="contact-quick-label">Location</span>
                <span className="contact-quick-value">Hai Referendum, Juba, South Sudan</span>
              </div>
            </div>
            <div className="contact-quick-item">
              <i className="fas fa-phone"></i>
              <div>
                <span className="contact-quick-label">Main Office</span>
                <span className="contact-quick-value">+211 9 12 345 678</span>
              </div>
            </div>
            <div className="contact-quick-item">
              <i className="fas fa-envelope"></i>
              <div>
                <span className="contact-quick-label">Email</span>
                <span className="contact-quick-value">info@stlawrenceacademy.edu</span>
              </div>
            </div>
            <div className="contact-quick-item">
              <i className="fas fa-clock"></i>
              <div>
                <span className="contact-quick-label">Office Hours</span>
                <span className="contact-quick-value">Mon – Fri: 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main-grid">

            {/* Left: Info */}
            <div className="contact-info-col reveal">
              <span className="contact-eyebrow">Reach Us</span>
              <h2 className="contact-info-heading">We'd Love to Hear from You</h2>
              <p className="contact-info-intro">
                Whether you have a question about admissions, academics, school
                life, or simply want to learn more about St. Lawrence Academy,
                our team is always ready to help.
              </p>

              <div className="contact-detail-cards">

                <div className="contact-detail-card">
                  <div className="contact-detail-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Campus Address</span>
                    <p>Hai Referendum, Juba, South Sudan</p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Phone Numbers</span>
                    <p>
                      Main Office: +211 9 12 345 678<br />
                      Admissions: +211 9 12 345 679
                    </p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Email Addresses</span>
                    <p>
                      General: info@stlawrenceacademy.edu<br />
                      Admissions: admissions@stlawrenceacademy.edu
                    </p>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-detail-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Office Hours</span>
                    <p>
                      Monday – Friday: 8:00 AM – 5:00 PM<br />
                      Saturday: 9:00 AM – 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-col reveal">
              <div className="contact-form-card">
                <span className="contact-eyebrow">Send a Message</span>
                <h2 className="contact-form-heading">Write to Us</h2>

                {submitMessage.text && (
                  <div className={`contact-alert contact-alert--${submitMessage.type}`}>
                    <i className={`fas ${submitMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label>Full Name <span>*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="contact-field">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+211 9 12 345 678"
                      />
                    </div>
                  </div>
                  <div className="contact-field">
                    <label>Email Address <span>*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="contact-field">
                    <label>Message <span>*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button type="submit" className="contact-submit-btn" disabled={submitting}>
                    {submitting ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending…</>
                    ) : (
                      <><i className="fas fa-paper-plane"></i> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="contact-newsletter">
        <div className="container">
          <div className="contact-newsletter-inner">
            <div className="contact-newsletter-text">
              <span className="contact-eyebrow contact-eyebrow--light">Stay Connected</span>
              <h2 className="contact-newsletter-heading">Subscribe to Our Newsletter</h2>
              <p>
                Receive the latest news, events, and announcements from
                St. Lawrence Academy directly in your inbox.
              </p>
            </div>
            <div className="contact-newsletter-form-wrap">
              {newsletterMessage.text && (
                <div className={`contact-alert contact-alert--${newsletterMessage.type} contact-alert--light`}>
                  <i className={`fas ${newsletterMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  {newsletterMessage.text}
                </div>
              )}
              <form onSubmit={handleNewsletterSubmit} className="contact-newsletter-form">
                <input type="text" name="name" required placeholder="Your name" />
                <input type="email" name="email" required placeholder="Your email address" />
                <button type="submit" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Find Us ── */}
      <section className="contact-findus">
        <div className="container">
          <div className="contact-findus-inner">
            <div className="contact-findus-text">
              <span className="contact-eyebrow">Find Us</span>
              <h2 className="contact-findus-heading">Visit Our Campus</h2>
              <p>
                Come and see St. Lawrence Academy for yourself — our doors are
                open to prospective families and visitors. Walk through our classrooms,
                meet our teachers, and get a real sense of life at SLA.
              </p>
            </div>
            <a href="/admissions/visit" className="contact-findus-btn">
              <i className="fas fa-walking"></i> Schedule a Campus Visit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
