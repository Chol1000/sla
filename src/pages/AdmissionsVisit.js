import { useState, useEffect, useRef } from 'react';
import './AdmissionsVisit.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { isValidEmail, isValidPhone, sanitizeInput } from '../utils/api';
import { setPageMeta } from '../utils/pageMeta';

const API_BASE = process.env.REACT_APP_API_URL || '';

const AdmissionsVisit = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', adults: '', level: '', notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const alertRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Schedule a Visit', 'Book a campus tour at St. Lawrence Academy in Juba, South Sudan. Meet our teachers, see our facilities, and discover what makes SLA the right school for your child.');
    const timer = setTimeout(() => initScrollAnimations(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Returns true if the selected date is Mon–Fri only
  const isWeekday = (dateStr) => {
    if (!dateStr) return true;
    const day = new Date(dateStr + 'T00:00:00').getDay();
    return day >= 1 && day <= 5; // 0=Sun, 6=Sat
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    if (formData.email && !isValidEmail(formData.email)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setSubmitting(false);
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setSubmitMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      setSubmitting(false);
      return;
    }

    if (formData.date && !isWeekday(formData.date)) {
      setSubmitMessage({ type: 'error', text: 'Campus visits are available Monday – Friday only. Please choose a weekday.' });
      setSubmitting(false);
      return;
    }

    const payload = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      email: sanitizeInput(formData.email),
      preferred_date: formData.date || null,
      preferred_time: formData.time || '',
      number_of_adults: formData.adults || '',
      interested_in: formData.level || '',
      notes: sanitizeInput(formData.notes),
    };

    try {
      const res = await fetch(`${API_BASE}/api/admissions/visit-requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || err.error || 'Submission failed. Please try again.');
      }

      setSubmitMessage({ type: 'success', text: 'Thank you! Your visit request has been received. We will confirm your booking within one business day.' });
      setFormData({ name: '', email: '', phone: '', date: '', time: '', adults: '', level: '', notes: '' });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: error.message || 'Failed to submit request. Please try again.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 14000);
    }
  };

  // Min date = tomorrow, and we'll show a note if Saturday/Sunday selected
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="visit-page">

      {/* ── Hero ── */}
      <section className="visit-hero">
        <div className="visit-hero-bg">
          <img src="/images/secondary/beautiful_students_school_view.JPG" alt="St. Lawrence Academy campus" />
        </div>
        <div className="visit-hero-overlay"></div>
        <div className="visit-hero-content">
          <div className="container">
            <div className="visit-hero-inner">
              <span className="visit-hero-label">Admissions</span>
              <h1 className="visit-hero-title">Schedule <span>a Visit</span></h1>
              <p className="visit-hero-sub">
                See St. Lawrence Academy for yourself. Walk our campus, meet
                our teachers, and discover the environment where your child will thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="visit-mobile-band">
        <div className="container">
          <h2 className="visit-mobile-band-heading">Schedule a Visit</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="visit-intro">
        <div className="container">
          <div className="visit-intro-inner">
            <span className="visit-eyebrow">Welcome</span>
            <h2 className="visit-intro-heading">Come and See SLA in Person</h2>
            <p className="visit-intro-text">
              We believe the best way to understand St. Lawrence Academy is to visit.
              A campus tour gives you and your child the chance to see our classrooms,
              meet our teachers, and get a real sense of school life before making any decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section className="visit-expect">
        <div className="container">
          <div className="visit-expect-header">
            <span className="visit-eyebrow">During Your Visit</span>
            <h2 className="visit-expect-heading">What to Expect</h2>
          </div>
          <div className="visit-expect-grid">
            <div className="visit-expect-card reveal">
              <div className="visit-expect-num">01</div>
              <h3>Campus Tour</h3>
              <p>A guided walk through our classrooms, library, science labs, sports grounds, and all key facilities.</p>
            </div>
            <div className="visit-expect-card reveal">
              <div className="visit-expect-num">02</div>
              <h3>Meet the Team</h3>
              <p>An opportunity to meet our teachers, head teachers, and admissions staff and ask any questions you have.</p>
            </div>
            <div className="visit-expect-card reveal">
              <div className="visit-expect-num">03</div>
              <h3>Admissions Briefing</h3>
              <p>A brief session covering the application process, fee structure, term dates, and enrolment requirements.</p>
            </div>
            <div className="visit-expect-card reveal">
              <div className="visit-expect-num">04</div>
              <h3>Q &amp; A</h3>
              <p>Time for open questions — about curriculum, school values, pastoral care, or anything else on your mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking Form + Info ── */}
      <section className="visit-booking">
        <div className="container">
          <div className="visit-booking-grid">

            {/* Left: Info */}
            <div className="visit-info-col reveal">
              <span className="visit-eyebrow">Plan Your Visit</span>
              <h2 className="visit-info-heading">Visiting Hours</h2>
              <p className="visit-info-intro">
                Campus tours are available Monday through Friday only.
                Please book in advance to ensure an admissions officer is available
                to meet with you personally.
              </p>

              <div className="visit-hours-list">
                <div className="visit-hours-row">
                  <span>Monday – Friday</span>
                  <em>8:00 AM – 4:00 PM</em>
                </div>
                <div className="visit-hours-row visit-hours-row--closed">
                  <span>Saturday</span>
                  <em>Closed</em>
                </div>
                <div className="visit-hours-row visit-hours-row--closed">
                  <span>Sunday</span>
                  <em>Closed</em>
                </div>
              </div>

              <div className="visit-info-note">
                <i className="fas fa-info-circle"></i>
                <p>Visiting on a weekday gives you a chance to see the school in full operation — classrooms, teachers, and students all at work.</p>
              </div>

              <div className="visit-info-contact">
                <span className="visit-eyebrow">Have Questions First?</span>
                <p>Speak with our admissions team before your visit.</p>
                <a href="/admissions/contact" className="visit-info-link">
                  <i className="fas fa-envelope"></i> Contact Admissions
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="visit-form-col reveal">
              <div className="visit-form-card">
                <span className="visit-eyebrow">Book Your Slot</span>
                <h2 className="visit-form-heading">Request a Campus Tour</h2>

                {submitMessage.text && (
                  <div ref={alertRef} className={`visit-alert visit-alert--${submitMessage.type}`}>
                    <i className={`fas ${submitMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="visit-form">
                  <div className="visit-form-row">
                    <div className="visit-field">
                      <label>Full Name <span>*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Parent / guardian name"
                      />
                    </div>
                    <div className="visit-field">
                      <label>Phone Number <span>*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+211 9 12 345 678"
                      />
                    </div>
                  </div>
                  <div className="visit-field">
                    <label>Email Address <span className="visit-field-optional">(optional)</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="visit-form-row">
                    <div className="visit-field">
                      <label>Preferred Date <span>*</span></label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={minDate}
                      />
                      {formData.date && !isWeekday(formData.date) && (
                        <span className="visit-field-warn">Weekdays only (Mon – Fri)</span>
                      )}
                    </div>
                    <div className="visit-field">
                      <label>Preferred Time</label>
                      <select name="time" value={formData.time} onChange={handleChange}>
                        <option value="">Select a time slot</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="visit-form-row">
                    <div className="visit-field">
                      <label>Number of Adults</label>
                      <select name="adults" value={formData.adults} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4 or more</option>
                      </select>
                    </div>
                    <div className="visit-field">
                      <label>Interested In</label>
                      <select name="level" value={formData.level} onChange={handleChange}>
                        <option value="">Select school level</option>
                        <option value="Nursery School">Nursery School</option>
                        <option value="Primary School">Primary School (P1–P8)</option>
                        <option value="Secondary School">Secondary School (S1–S4)</option>
                        <option value="Multiple Levels">Multiple Levels</option>
                      </select>
                    </div>
                  </div>
                  <div className="visit-field">
                    <label>Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific questions or things you'd like to focus on during the visit..."
                    />
                  </div>
                  <button type="submit" className="visit-submit-btn" disabled={submitting}>
                    {submitting ? (
                      <><i className="fas fa-spinner fa-spin"></i> Submitting…</>
                    ) : (
                      <><i className="fas fa-calendar-check"></i> Request Visit</>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="visit-gallery">
        <div className="container">
          <div className="visit-gallery-header">
            <span className="visit-eyebrow">Our Campus</span>
            <h2 className="visit-gallery-heading">A Glimpse of What Awaits</h2>
          </div>
          <div className="visit-gallery-row">
            <div className="visit-gallery-cell">
              <img src="/images/secondary/sla_secondary_school_gate.jpg" alt="St. Lawrence Academy Secondary School gate" />
            </div>
            <div className="visit-gallery-cell">
              <img src="/images/secondary/sla_school_view_1.jpg" alt="SLA secondary school building" />
            </div>
            <div className="visit-gallery-cell">
              <img src="/images/primary/primary_school_gate.JPG" alt="St. Lawrence Academy Primary School gate" />
            </div>
          </div>
          <div className="visit-gallery-footer">
            <a href="/campus#gallery" className="visit-gallery-link">
              View the full campus gallery <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="visit-map">
        <div className="container">
          <div className="visit-map-header">
            <span className="visit-eyebrow">Find Us</span>
            <h2 className="visit-map-heading">We're in Hai Referendum, Juba</h2>
            <p className="visit-map-sub">
              St. Lawrence Academy is located in Hai Referendum, Juba, South Sudan.
              Our gates are open to visitors during school hours, Monday to Friday.
            </p>
          </div>
          <div className="visit-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6547!2d31.5604!3d4.8459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVkhXNis2Vk0sIEp1YmEsIFNvdXRoIFN1ZGFu!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Lawrence Academy — Hai Referendum, Juba, South Sudan"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdmissionsVisit;
