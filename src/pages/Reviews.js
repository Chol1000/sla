import { useEffect, useState, useCallback } from 'react';
import './Reviews.css';
import { setPageMeta } from '../utils/pageMeta';

const PREVIEW_CHARS = 220;
const NAME_MAX      = 80;
const ROLE_MAX      = 40;
const TEXT_MAX      = 600;

const API = process.env.REACT_APP_API_URL || '';

const REVIEWER_TYPES = ['Parent', 'Student', 'Alumni', 'Staff', 'Visitor', 'Other'];

const StarRating = ({ value, interactive = false, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className={`star-rating ${interactive ? 'star-rating--interactive' : ''}`}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={`star ${n <= (interactive ? hover || value : value) ? 'star--filled' : ''}`}
          onClick={() => interactive && onChange && onChange(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
        >&#9733;</span>
      ))}
    </div>
  );
};

const initials = (name) =>
  name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/* ── Single review card with expand/collapse ── */
const ReviewCard = ({ r }) => {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = r.text.length > PREVIEW_CHARS;
  const displayText = needsExpand && !expanded
    ? r.text.slice(0, PREVIEW_CHARS).trimEnd() + '…'
    : r.text;

  return (
    <div className="review-card">
      <div className="review-card-top">
        <div className="review-avatar">{initials(r.name)}</div>
        <div className="review-meta">
          <span className="review-name">{r.name}</span>
          <span className="review-role">{r.role || r.reviewer_type}</span>
        </div>
        <span className="review-type-badge">{r.reviewer_type}</span>
      </div>

      <StarRating value={r.rating} />

      <div className="review-text-wrap">
        <p className="review-text">{displayText}</p>
        {needsExpand && (
          <button
            className="review-expand-btn"
            onClick={() => setExpanded(e => !e)}
          >
            {expanded
              ? <><i className="fas fa-chevron-up"></i> Show less</>
              : <><i className="fas fa-chevron-down"></i> Read more</>}
          </button>
        )}
      </div>

      <span className="review-date">{formatDate(r.created_at)}</span>
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews]         = useState([]);
  const [summary, setSummary]         = useState({ total: 0, average: 0, distribution: {} });
  const [loadingList, setLoadingList] = useState(true);
  const [showForm, setShowForm]       = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [form, setForm]               = useState({ name: '', role: '', reviewer_type: 'Parent', rating: 0, text: '' });
  const [errors, setErrors]           = useState({});

  const fetchReviews = useCallback(() => {
    setLoadingList(true);
    fetch(`${API}/api/reviews/`)
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : data.results || []); setLoadingList(false); })
      .catch(() => setLoadingList(false));
  }, []);

  const fetchSummary = useCallback(() => {
    fetch(`${API}/api/reviews/summary/`)
      .then(r => r.json())
      .then(data => setSummary(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('School Reviews', 'Read what parents, students, and alumni say about St. Lawrence Academy — and share your own experience.');
    fetchReviews();
    fetchSummary();
  }, [fetchReviews, fetchSummary]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.role.trim()) e.role = 'Please describe your role.';
    if (form.rating === 0)  e.rating = 'Please select a star rating.';
    if (form.text.trim().length < 10) e.text = 'Please write at least 10 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);

    fetch(`${API}/api/reviews/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:          form.name.trim(),
        role:          form.role.trim(),
        reviewer_type: form.reviewer_type,
        rating:        form.rating,
        text:          form.text.trim(),
      }),
    })
      .then(r => { if (!r.ok) return r.json().then(d => Promise.reject(d)); return r.json(); })
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
        setForm({ name: '', role: '', reviewer_type: 'Parent', rating: 0, text: '' });
        setErrors({});
        fetchReviews();
        fetchSummary();
        setTimeout(() => { setSubmitted(false); setShowForm(false); }, 4000);
      })
      .catch((err) => {
        setSubmitting(false);
        if (err && typeof err === 'object') {
          const mapped = {};
          Object.keys(err).forEach(k => { mapped[k] = Array.isArray(err[k]) ? err[k][0] : err[k]; });
          setErrors(mapped);
        } else {
          setErrors({ text: 'Something went wrong. Please try again.' });
        }
      });
  };

  const totalDist = Object.values(summary.distribution || {}).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="reviews-page">

      {/* ── Hero ── */}
      <section className="reviews-hero">
        <div className="container">
          <div className="reviews-hero-inner">
            <span className="reviews-eyebrow">Community Voices</span>
            <h1 className="reviews-title">School Reviews</h1>
            <p className="reviews-sub">
              Real experiences from our parents, students, and alumni —
              an honest window into life at St. Lawrence Academy.
            </p>
            <button className="reviews-write-btn" onClick={() => setShowForm(s => !s)}>
              <i className="fas fa-pen"></i> {showForm ? 'Close Form' : 'Write a Review'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Rating summary ── */}
      <section className="reviews-summary-bar">
        <div className="container">
          <div className="reviews-summary-inner">
            <div className="reviews-summary-score">
              <span className="reviews-big-score">{summary.average || '—'}</span>
              <div>
                <StarRating value={Math.round(summary.average || 0)} />
                <span className="reviews-total-count">
                  {summary.total > 0
                    ? `Based on ${summary.total} review${summary.total !== 1 ? 's' : ''}`
                    : 'No reviews yet'}
                </span>
              </div>
            </div>
            <div className="reviews-summary-bars">
              {[5, 4, 3, 2, 1].map(n => {
                const count = summary.distribution?.[String(n)] || 0;
                const pct   = Math.round((count / totalDist) * 100);
                return (
                  <div key={n} className="reviews-bar-row">
                    <span>{n}</span>
                    <div className="reviews-bar-track">
                      <div className="reviews-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Write review form ── */}
      {showForm && (
        <section className="reviews-form-section">
          <div className="container">
            <div className="reviews-form-card">
              {submitted ? (
                <div className="reviews-form-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>Thank You!</h3>
                  <p>Your review has been submitted. We appreciate you sharing your experience with us.</p>
                </div>
              ) : (
                <>
                  <h3 className="reviews-form-title">Share Your Experience</h3>
                  <form className="reviews-form" onSubmit={handleSubmit} noValidate>
                    <div className="reviews-form-row">
                      <div className="reviews-form-field">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Mary Josette"
                          maxLength={NAME_MAX}
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                        <span className="reviews-char-count">{form.name.length}/{NAME_MAX}</span>
                        {errors.name && <span className="reviews-field-error">{errors.name}</span>}
                      </div>
                      <div className="reviews-form-field">
                        <label>Your Relationship to the School *</label>
                        <select
                          value={form.reviewer_type}
                          onChange={e => setForm(f => ({ ...f, reviewer_type: e.target.value }))}
                        >
                          {REVIEWER_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        {errors.reviewer_type && <span className="reviews-field-error">{errors.reviewer_type}</span>}
                      </div>
                    </div>
                    <div className="reviews-form-row">
                      <div className="reviews-form-field">
                        <label>Your Role *</label>
                        <input
                          type="text"
                          placeholder="e.g. Engineer, Student, Parent"
                          maxLength={ROLE_MAX}
                          value={form.role}
                          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                        />
                        <span className="reviews-char-count">{form.role.length}/{ROLE_MAX}</span>
                        {errors.role && <span className="reviews-field-error">{errors.role}</span>}
                      </div>
                      <div className="reviews-form-field">
                        <label>Your Rating *</label>
                        <StarRating
                          value={form.rating}
                          interactive
                          onChange={n => setForm(f => ({ ...f, rating: n }))}
                        />
                        {errors.rating && <span className="reviews-field-error">{errors.rating}</span>}
                      </div>
                    </div>
                    <div className="reviews-form-field reviews-form-field--full">
                      <label>Your Review *</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your experience at St. Lawrence Academy..."
                        maxLength={TEXT_MAX}
                        value={form.text}
                        onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                      />
                      <span className="reviews-char-count">{form.text.length}/{TEXT_MAX}</span>
                      {errors.text && <span className="reviews-field-error">{errors.text}</span>}
                    </div>
                    <div className="reviews-form-actions">
                      <button type="button" className="reviews-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                      <button type="submit" className="reviews-submit-btn" disabled={submitting}>
                        {submitting
                          ? <><span className="reviews-btn-spinner"></span> Submitting…</>
                          : 'Submit Review'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Review list ── */}
      <section className="reviews-main">
        <div className="container">

          {loadingList && (
            <div className="reviews-loading">
              <div className="reviews-spinner"></div>
              <p>Loading reviews…</p>
            </div>
          )}

          {!loadingList && reviews.length === 0 && (
            <div className="reviews-empty-state">
              <div className="reviews-empty-icon">
                <i className="fas fa-comment-slash"></i>
              </div>
              <h3>No Reviews Yet</h3>
              <p>Be the first to share your experience at St. Lawrence Academy.</p>
              <button
                className="reviews-empty-cta"
                onClick={() => { setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <i className="fas fa-pen"></i> Write the First Review
              </button>
            </div>
          )}

          {!loadingList && reviews.length > 0 && (
            <div className="reviews-grid">
              {reviews.map(r => <ReviewCard key={r.id} r={r} />)}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Reviews;
