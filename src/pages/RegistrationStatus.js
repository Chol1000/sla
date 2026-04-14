import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationStatus.css';
import { setPageMeta } from '../utils/pageMeta';

const API = process.env.REACT_APP_API_URL || '';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const daysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
  return Math.ceil((d - today) / 86400000);
};

const isExpired = (dateStr) => daysLeft(dateStr) < 0;

const RegistrationStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Registration Status', 'Check the current registration status at St. Lawrence Academy.');

    fetch(`${API}/api/admissions/status/`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setStatuses(Array.isArray(data) ? data : data.results || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <div className="rs-page">

      {/* ── Top bar ── */}
      <div className="rs-topbar">
        <div className="container">
          <div className="rs-topbar-inner">
            <div className="rs-topbar-breadcrumb">
              <Link to="/admissions/apply">Admissions</Link>
              <i className="fas fa-chevron-right"></i>
              <span>Registration Status</span>
            </div>
            <Link to="/admissions/apply" className="rs-topbar-apply">
              Apply Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="rs-header">
        <div className="container">
          <div className="rs-header-inner">
            <div className="rs-header-text">
              <span className="rs-label">Admissions Office</span>
              <h1 className="rs-title">Registration Status</h1>
              <p className="rs-desc">
                Live registration status updated directly by the admissions team.
                Check which term is currently open, the closing deadline, and how to apply.
              </p>
            </div>
            <div className="rs-header-meta">
              <div className="rs-meta-item">
                <i className="fas fa-sync-alt"></i>
                <span>Live from admissions</span>
              </div>
              <div className="rs-meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Juba, South Sudan</span>
              </div>
              <div className="rs-meta-item">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+211926100446">+211 926 100 446</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="rs-main">
        <div className="container">

          {loading && (
            <div className="rs-loader">
              <div className="rs-spinner"></div>
              <p>Checking registration status…</p>
            </div>
          )}

          {error && (
            <div className="rs-notice rs-notice--error">
              <div className="rs-notice-icon"><i className="fas fa-exclamation-circle"></i></div>
              <div>
                <h3>Unable to Load Status</h3>
                <p>We could not retrieve the current registration status. Please contact the admissions office directly or try again later.</p>
                <a href="tel:+211926100446" className="rs-btn rs-btn--outline">
                  <i className="fas fa-phone-alt"></i> Call Admissions
                </a>
              </div>
            </div>
          )}

          {!loading && !error && statuses.length === 0 && (
            <div className="rs-notice rs-notice--info">
              <div className="rs-notice-icon"><i className="fas fa-calendar-times"></i></div>
              <div>
                <h3>No Active Registration Period</h3>
                <p>No registration period has been set up at this time. Check back soon or contact the admissions office for more information.</p>
                <Link to="/admissions/contact" className="rs-btn rs-btn--outline">Contact Admissions</Link>
              </div>
            </div>
          )}

          {!loading && !error && statuses.length > 0 && (
            <div className="rs-content">

              {/* Primary status card — first/most recent */}
              {(() => {
                const s        = statuses[0];
                const expired  = isExpired(s.closing_date);
                const open     = s.is_open && !expired;
                const days     = daysLeft(s.closing_date);
                return (
                  <div className={`rs-primary-card ${open ? 'rs-primary-card--open' : 'rs-primary-card--closed'}`}>
                    <div className="rs-primary-card-left">
                      <div className="rs-status-indicator">
                        <span className={`rs-status-dot ${open ? 'rs-status-dot--open' : 'rs-status-dot--closed'}`}></span>
                        <span className={`rs-status-label ${open ? 'rs-status-label--open' : 'rs-status-label--closed'}`}>
                          {open ? 'Registration Open' : 'Registration Closed'}
                        </span>
                      </div>
                      <div className="rs-term-display">
                        <h2 className="rs-term-name">{s.term} <span>{s.year}</span></h2>
                      </div>
                      {open && days >= 0 && (
                        <div className="rs-days-left">
                          {days === 0
                            ? <><i className="fas fa-hourglass-end"></i> Closes today</>
                            : <><i className="fas fa-hourglass-half"></i> {days} day{days !== 1 ? 's' : ''} remaining</>}
                        </div>
                      )}
                      {s.message && <p className="rs-admin-message">{s.message}</p>}
                    </div>
                    <div className="rs-primary-card-right">
                      <div className="rs-deadline-block">
                        <span className="rs-deadline-label">
                          {expired ? 'Deadline Passed' : 'Registration Closes'}
                        </span>
                        <span className="rs-deadline-date">{formatDate(s.closing_date)}</span>
                        {!expired && (
                          <div className="rs-deadline-bar">
                            <div
                              className="rs-deadline-bar-fill"
                              style={{ width: open ? `${Math.max(5, Math.min(100, 100 - (days / 90) * 100))}%` : '100%' }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div className="rs-primary-actions">
                        {open
                          ? <Link to="/admissions/apply" className="rs-btn rs-btn--primary">
                              Apply Now <i className="fas fa-arrow-right"></i>
                            </Link>
                          : <Link to="/admissions/contact" className="rs-btn rs-btn--secondary">
                              Contact Admissions
                            </Link>}
                        <Link to="/admissions/requirements" className="rs-btn rs-btn--ghost">
                          View Requirements
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Additional terms table */}
              {statuses.length > 1 && (
                <div className="rs-history">
                  <h3 className="rs-history-title">Other Registration Periods</h3>
                  <table className="rs-history-table">
                    <thead>
                      <tr>
                        <th>Term</th>
                        <th>Year</th>
                        <th>Closing Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statuses.slice(1).map(s => {
                        const expired = isExpired(s.closing_date);
                        const open    = s.is_open && !expired;
                        return (
                          <tr key={s.id}>
                            <td>{s.term}</td>
                            <td>{s.year}</td>
                            <td>{formatDate(s.closing_date)}</td>
                            <td>
                              <span className={`rs-pill ${open ? 'rs-pill--open' : 'rs-pill--closed'}`}>
                                <span className="rs-pill-dot"></span>
                                {open ? 'Open' : 'Closed'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Info strip */}
              <div className="rs-info-strip">
                <div className="rs-info-item">
                  <div className="rs-info-icon"><i className="fas fa-list-ol"></i></div>
                  <div>
                    <h4>Application Process</h4>
                    <p>Learn the step-by-step process for applying to St. Lawrence Academy.</p>
                    <Link to="/admissions/apply">View process <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </div>
                <div className="rs-info-divider"></div>
                <div className="rs-info-item">
                  <div className="rs-info-icon"><i className="fas fa-clipboard-check"></i></div>
                  <div>
                    <h4>Requirements</h4>
                    <p>Check the documents and criteria required for admission.</p>
                    <Link to="/admissions/requirements">View requirements <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </div>
                <div className="rs-info-divider"></div>
                <div className="rs-info-item">
                  <div className="rs-info-icon"><i className="fas fa-money-bill-wave"></i></div>
                  <div>
                    <h4>Fees &amp; Payment</h4>
                    <p>Find out about school fees and payment options for each term.</p>
                    <Link to="/admissions/fees">View fees <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ── Contact footer band ── */}
      <div className="rs-contact-band">
        <div className="container">
          <div className="rs-contact-band-inner">
            <div>
              <h3>Need to speak to someone?</h3>
              <p>Our admissions team is available Monday to Friday, 7:30 AM – 5:00 PM.</p>
            </div>
            <div className="rs-contact-band-actions">
              <a href="tel:+211926100446" className="rs-contact-link">
                <i className="fas fa-phone-alt"></i> +211 926 100 446
              </a>
              <a href="mailto:info@stlawrenceacademy.edu.ss" className="rs-contact-link">
                <i className="fas fa-envelope"></i> info@stlawrenceacademy.edu.ss
              </a>
              <Link to="/admissions/visit" className="rs-btn rs-btn--outline-light">
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegistrationStatus;
