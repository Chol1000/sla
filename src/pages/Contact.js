import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8000/api/contact/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Thank you for your message! We will get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email')
    };

    try {
      const response = await fetch('http://localhost:8000/api/contact/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setNewsletterMessage({ type: 'success', text: 'Thank you for subscribing to our newsletter!' });
        e.target.reset();
      } else {
        const error = await response.json();
        setNewsletterMessage({ type: 'error', text: error.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setNewsletterMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920" alt="Contact Us" style={{opacity: '0.7'}} />
        </div>
        <div className="contact-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="contact-hero-content">
          <div className="contact-hero-badge">
            <i className="fas fa-envelope"></i>
            Get In Touch
          </div>
          <h1>Contact Us</h1>
          <p>We're here to answer your questions and help you discover how St. Lawrence Academy can shape your child's future. Our dedicated team is ready to assist you with admissions, academics, and everything in between.</p>
          <div className="hero-response-time">
            <i className="fas fa-clock"></i>
            Send us a message and get a reply within 2 business days (48 hours)
          </div>
        </div>
      </section>

      {/* Contact Intro - Mobile Only */}
      <section className="contact-intro">
        <div className="container">
          <p>
            We're here to answer your questions and help you discover how St. Lawrence Academy can shape your child's future. Our dedicated team is ready to assist you with admissions, academics, and everything in between.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              
              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>
                  Campus Address
                </h3>
                <p>
                  123 Education Street<br />
                  Juba<br />
                  South Sudan
                </p>
              </div>

              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-phone"></i>
                  Phone Numbers
                </h3>
                <p>
                  Main Office: +211 9 12 345 678<br />
                  Admissions Office: +211 9 12 345 679<br />
                  Student Services: +211 9 12 345 680<br />
                  Athletics Department: +211 9 12 345 681
                </p>
              </div>

              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-envelope"></i>
                  Email Addresses
                </h3>
                <p>
                  General Inquiries: info@stlawrenceacademy.edu<br />
                  Admissions: admissions@stlawrenceacademy.edu<br />
                  Academics: academics@stlawrenceacademy.edu<br />
                  Support: support@stlawrenceacademy.edu
                </p>
              </div>

              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-clock"></i>
                  Office Hours
                </h3>
                <p>
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed<br />
                  <strong style={{color: 'var(--primary-red)', marginTop: '0.5rem', display: 'block'}}>Summer Hours (June-August):</strong>
                  Monday - Thursday: 8:00 AM - 4:00 PM
                </p>
              </div>

              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-directions"></i>
                  Directions
                </h3>
                <p>
                  From Downtown: Take Highway 101 North, exit at Education Blvd<br />
                  From Airport: Follow signs to Academic District<br />
                  Parking: Visitor parking available in Lot A<br />
                  Public Transit: Bus routes 12, 45, and 67
                </p>
              </div>

              <div className="contact-info-item">
                <h3>
                  <i className="fas fa-calendar-check"></i>
                  Schedule a Visit
                </h3>
                <p>
                  Campus Tours: Monday - Friday at 10:00 AM and 2:00 PM<br />
                  Shadow Days: Available for prospective students<br />
                  Parent Information Sessions: First Saturday of each month<br />
                  Please call ahead to reserve your spot
                </p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {/* Contact Form */}
              <div className="contact-form-section">
                <h2>Send Us a Message</h2>
                {submitMessage.text && (
                  <div style={{padding: '1rem', marginBottom: '1rem', background: submitMessage.type === 'success' ? '#d4edda' : '#f8d7da', color: submitMessage.type === 'success' ? '#155724' : '#721c24', borderRadius: '5px'}}>
                    {submitMessage.text}
                  </div>
                )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+211 9 12 345 678"
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              </div>

              {/* Newsletter Subscription */}
              <div className="newsletter-section" style={{marginTop: '3rem'}}>
              <h2 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '2rem'}}>Subscribe to Newsletter</h2>
              <p style={{fontSize: '1rem', color: 'var(--medium-gray)', marginBottom: '2rem', lineHeight: '1.7'}}>
                Stay updated with the latest news, events, and announcements from St. Lawrence Academy.
              </p>
              {newsletterMessage.text && (
                <div style={{padding: '1rem', marginBottom: '1rem', background: newsletterMessage.type === 'success' ? '#d4edda' : '#f8d7da', color: newsletterMessage.type === 'success' ? '#155724' : '#721c24', borderRadius: '5px'}}>
                  {newsletterMessage.text}
                </div>
              )}
              <form onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section" id="map">
        <div className="container">
          <div className="map-header">
            <h2>Find Us on Campus</h2>
            <p>Visit our beautiful campus and experience St. Lawrence Academy firsthand</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63492.64193087641!2d31.551889!3d4.859363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1735c5d6b8b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{border: 0, borderRadius: '12px'}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Lawrence Academy Location - Juba, South Sudan"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;