import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Careers.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const toSlug = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Careers = () => {
  const [careers, setCareers]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    setPageMeta('Career Opportunities', 'Join our team of dedicated educators and staff at St. Lawrence Academy. View current job openings and opportunities.');
    fetch(`${API_URL}/api/admissions/hiring/`)
      .then(res => res.json())
      .then(data => {
        setCareers(data.results || data);
        setLoading(false);
        setTimeout(() => initScrollAnimations(), 100);
      })
      .catch(() => setLoading(false));
  }, []);

  const isOpen = (career) => {
    if (!career.is_active) return false;
    if (!career.deadline) return true;
    return new Date(career.deadline) >= new Date();
  };

  const formatDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isUrgent = (d) => {
    if (!d) return false;
    const diff = (new Date(d) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  };

  const parsePositions = (pos) => {
    if (!pos) return [];
    return pos.split(',').map(p => p.trim()).filter(Boolean);
  };

  const openCount = careers.filter(isOpen).length;

  return (
    <div className="careers-page">

      {/* ── Hero ── */}
      <section className="careers-hero">
        <div className="careers-hero-bg">
          <img src="/images/secondary/students_with_staff.JPG" alt="St. Lawrence Academy — Careers" />
        </div>
        <div className="careers-hero-overlay"></div>
        <div className="careers-hero-content">
          <div className="careers-hero-label">
            <span className="careers-fh-line"></span>
            St. Lawrence Academy
            <span className="careers-fh-line"></span>
          </div>
          <h1 className="careers-hero-title">Career Opportunities</h1>
          <p className="careers-hero-sub">
            Be part of a team committed to transforming lives through quality education in Juba, South Sudan.
          </p>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="careers-mobile-band">
        <div className="container">
          <h2 className="careers-mobile-band-heading">Career Opportunities</h2>
        </div>
      </div>

      {/* ── Intro Band ── */}
      <div className="careers-intro-band">
        <div className="container careers-intro-inner">
          <div className="careers-intro-text">
            <span className="careers-intro-eyebrow">Join Our Team</span>
            <h2>Work With Us</h2>
            <p>
              At St. Lawrence Academy, we believe great education starts with great people.
              We seek passionate, qualified professionals who share our commitment to academic
              excellence, character formation, and service to South Sudan.
            </p>
          </div>
          <div className="careers-intro-stat">
            <strong>{loading ? '—' : openCount}</strong>
            <span>Open Positions</span>
          </div>
        </div>
      </div>

      {/* ── Listings ── */}
      <section className="careers-listings">
        <div className="container">

          {loading ? (
            <div className="careers-skeleton-grid">
              {[1,2,3].map(i => (
                <div key={i} className="careers-sk-card">
                  <div className="careers-sk-line careers-sk-title"></div>
                  <div className="careers-sk-line careers-sk-meta"></div>
                  <div className="careers-sk-line careers-sk-desc"></div>
                  <div className="careers-sk-line careers-sk-desc2"></div>
                </div>
              ))}
            </div>
          ) : careers.length === 0 ? (
            <div className="careers-empty">
              <i className="fas fa-briefcase"></i>
              <h3>No Open Positions</h3>
              <p>There are no job openings at the moment. Please check back soon.</p>
            </div>
          ) : (
            <div className="careers-grid">
              {careers.map(career => {
                const open      = isOpen(career);
                const positions = parsePositions(career.positions);
                const deadline  = formatDate(career.deadline);
                const urgent    = isUrgent(career.deadline);

                return (
                  <Link
                    key={career.id}
                    to={`/careers/${career.id}/${toSlug(career.title)}`}
                    className={`career-card${!open ? ' career-card--closed' : ''}`}
                  >
                    {/* Top stripe — status */}
                    <div className="career-card-top">
                      <span className="career-card-org">St. Lawrence Academy</span>
                      {open ? (
                        <span className="career-status career-status--open">
                          <i className="fas fa-circle"></i> Open
                        </span>
                      ) : (
                        <span className="career-status career-status--closed">
                          <i className="fas fa-circle"></i> Closed
                        </span>
                      )}
                    </div>

                    {/* Title + location */}
                    <div className="career-card-title-wrap">
                      <h3 className="career-card-title">{career.title}</h3>
                      {career.location && (
                        <span className="career-card-location">
                          <i className="fas fa-map-marker-alt"></i>
                          {career.location}
                        </span>
                      )}
                    </div>

                    {/* Positions */}
                    {positions.length > 0 && (
                      <div className="career-card-positions">
                        <span className="career-positions-label">
                          <i className="fas fa-briefcase"></i> Positions
                        </span>
                        <span className="career-positions-text">{positions.join(' · ')}</span>
                      </div>
                    )}

                    {/* Description */}
                    {career.description && (
                      <div className="career-card-desc-wrap">
                        <p className="career-card-desc">{career.description}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="career-card-footer">
                      {deadline && (
                        <span className={`career-deadline${urgent && open ? ' career-deadline--urgent' : ''}`}>
                          <i className="fas fa-calendar-alt"></i>
                          {urgent && open ? `Closes ${deadline}` : `Deadline: ${deadline}`}
                        </span>
                      )}
                      <span className="career-view-btn">
                        View Details <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>


    </div>
  );
};

export default Careers;
