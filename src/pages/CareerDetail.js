import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CareerDetail.css';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const CareerDetail = () => {
  const { id }              = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admissions/hiring/`)
      .then(res => res.json())
      .then(data => {
        const all   = data.results || data;
        const found = all.find(c => c.id === parseInt(id));
        if (!found) { window.location.href = '/404'; return; }
        setCareer(found);
        setPageMeta(found.title, `${found.title} — Career opportunity at St. Lawrence Academy, Juba, South Sudan.`);
        setLoading(false);
      })
      .catch(() => { window.location.href = '/404'; });
  }, [id]);

  const isOpen = (c) => {
    if (!c.is_active) return false;
    if (!c.deadline) return true;
    return new Date(c.deadline) >= new Date();
  };

  const formatDate = (d) => {
    if (!d) return null;
    const date = new Date(d);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

  if (loading) {
    return (
      <div className="career-detail-page">
        <div className="career-loading">
          <div className="career-loading-inner">
            <div className="career-loading-spinner"></div>
            <p>Loading position details…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!career) return null;

  const open      = isOpen(career);
  const positions = parsePositions(career.positions);
  const deadline  = formatDate(career.deadline);
  const urgent    = isUrgent(career.deadline);

  return (
    <div className="career-detail-page">

      {/* ── Main ── */}
      <section className="career-detail-main">
        <div className="container">
          <div className="career-detail-layout">

            {/* Article */}
            <article className="career-detail-article">
              <div className="career-detail-article-header">
                <span className="career-detail-eyebrow">Career Opportunity — St. Lawrence Academy</span>
                <h1 className="career-detail-title">{career.title}</h1>
                <div className="career-detail-tags">
                  {open ? (
                    <span className="career-status career-status--open">
                      <i className="fas fa-circle"></i> Applications Open
                    </span>
                  ) : (
                    <span className="career-status career-status--closed">
                      <i className="fas fa-circle"></i> Applications Closed
                    </span>
                  )}
                </div>
              </div>

              <div className="career-detail-body">

                {/* Overview */}
                {career.description && (
                  <div className="career-detail-section">
                    <h3>Overview</h3>
                    <p>{career.description}</p>
                  </div>
                )}

                {/* Positions */}
                {positions.length > 0 && (
                  <div className="career-detail-section">
                    <h3>Positions Available</h3>
                    <div className="career-positions-list">
                      {positions.map((pos, idx) => (
                        <span key={idx} className="career-position-badge">{pos}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {career.requirements && (
                  <div className="career-detail-section">
                    <h3>Requirements</h3>
                    <div className="career-preformat">{career.requirements}</div>
                  </div>
                )}

                {/* Benefits */}
                {career.benefits && (
                  <div className="career-detail-section">
                    <h3>Benefits</h3>
                    <div className="career-preformat">{career.benefits}</div>
                  </div>
                )}

                {/* How to Apply */}
                <div className="career-detail-section">
                  <h3>How to Apply</h3>
                  <p>
                    {open
                      ? `Send your CV and a cover letter to ${career.application_email || 'our HR team'}. Applications are reviewed on a rolling basis — early submission is encouraged.`
                      : 'Applications for this position are now closed. Please check our careers page for other available opportunities.'}
                  </p>
                </div>

                {/* Back link */}
                <div className="career-back-link-wrap">
                  <a href="/careers" className="career-back-link-bottom">
                    <i className="fas fa-arrow-left"></i> All Career Opportunities
                  </a>
                </div>

              </div>
            </article>

            {/* Sidebar */}
            <aside className="career-detail-sidebar">

              {/* Apply Card */}
              <div className="career-apply-card">
                <h3>{open ? 'Apply for this Position' : 'Position Closed'}</h3>
                <p>
                  {open
                    ? 'Send your application directly to our team via email.'
                    : 'This vacancy is no longer accepting applications.'}
                </p>
                {open && career.application_email ? (
                  <a
                    href={`mailto:${career.application_email}?subject=Application: ${encodeURIComponent(career.title)}`}
                    className="career-apply-btn"
                  >
                    Apply Now <i className="fas fa-paper-plane"></i>
                  </a>
                ) : (
                  <span className="career-apply-btn career-apply-btn--disabled">
                    Applications Closed
                  </span>
                )}
                {open && career.application_email && (
                  <span className="career-apply-email">{career.application_email}</span>
                )}
              </div>

              {/* Details Card */}
              <div className="career-sidebar-card">
                <div className="career-sidebar-card-header">Position Details</div>
                <div className="career-sidebar-items">

                  {deadline && (
                    <div className="career-sidebar-item">
                      <i className="fas fa-calendar-alt"></i>
                      <div className="career-sidebar-item-text">
                        <strong>Application Deadline</strong>
                        <span className={urgent && open ? 'urgent' : ''}>
                          {deadline}{urgent && open ? ' — Closing soon' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {career.location && (
                    <div className="career-sidebar-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="career-sidebar-item-text">
                        <strong>Location</strong>
                        <span>{career.location}</span>
                      </div>
                    </div>
                  )}

                  <div className="career-sidebar-item">
                    <i className="fas fa-building"></i>
                    <div className="career-sidebar-item-text">
                      <strong>Institution</strong>
                      <span>St. Lawrence Academy</span>
                    </div>
                  </div>

                  {positions.length > 0 && (
                    <div className="career-sidebar-item">
                      <i className="fas fa-briefcase"></i>
                      <div className="career-sidebar-item-text">
                        <strong>Vacancies</strong>
                        <span>{positions.length} position{positions.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CareerDetail;
