import { useEffect, useState } from 'react';
import './PTA.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const PTA = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setPageMeta(
      'Parent-Teacher Association',
      'Meet the Parent-Teacher Association of St. Lawrence Academy — the bridge between families and the school community in Juba, South Sudan.'
    );
    fetch(`${API_URL}/api/staff/members/`)
      .then(res => res.json())
      .then(data => {
        const list = data.results || data;
        setMembers(list.filter(m => m.section === 'pta'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => initScrollAnimations(), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http')) return photo;
    return `${API_URL}${photo}`;
  };

  return (
    <div className="pta-page">

      {/* ── Hero ── */}
      <section className="pta-hero">
        <div className="pta-hero-bg">
          <img src="/images/general/pta_meeting.jpg" alt="PTA Meeting at St. Lawrence Academy" />
        </div>
        <div className="pta-hero-overlay"></div>
        <div className="pta-hero-content">
          <div className="container">
            <div className="pta-hero-inner">
              <span className="pta-hero-label">St. Lawrence Academy</span>
              <h1 className="pta-hero-title">Parent-Teacher Association</h1>
              <p className="pta-hero-sub">
                The bridge between families and the school community — partnering to support every child's growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Welcome Band ── */}
      <div className="pta-mobile-band">
        <div className="container">
          <h2 className="pta-mobile-band-heading">Parent-Teacher Association</h2>
        </div>
      </div>

      {/* ── Intro Band ── */}
      <div className="pta-intro-band">
        <div className="container pta-intro-inner">
          <div className="pta-intro-text">
            <span className="pta-intro-eyebrow">Meet the PTA</span>
            <h2>About the PTA</h2>
            <p>
              The Parent-Teacher Association at St. Lawrence Academy works closely with school leadership to foster
              open communication, support student welfare, and build a strong community between parents and teachers.
              Our PTA plays a vital role in shaping the school environment and advocating for the needs of every learner.
            </p>
          </div>
          <div className="pta-intro-stat">
            <strong>{loading ? '—' : members.length}</strong>
            <span>PTA Members</span>
          </div>
        </div>
      </div>

      {/* ── Members Directory ── */}
      <section className="pta-directory">
        <div className="container">
          <div className="pta-section-heading animate-on-scroll">
            <h2>PTA Members</h2>
            <div className="pta-heading-line"></div>
          </div>

          {loading ? (
            <div className="pta-skeleton-wrap">
              {[1,2,3,4].map(i => (
                <div key={i} className="pta-skeleton-card">
                  <div className="pta-sk-photo"></div>
                  <div className="pta-sk-line pta-sk-name"></div>
                  <div className="pta-sk-line pta-sk-pos"></div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="pta-empty">
              <i className="fas fa-users"></i>
              <h3>PTA profiles coming soon</h3>
              <p>We're updating our directory. Check back shortly.</p>
            </div>
          ) : (
            <div className="pta-cards-grid animate-on-scroll">
              {members.map(member => (
                <div key={member.id} className="pta-card" onClick={() => setModal(member)}>
                  <div className="pta-card-photo">
                    {getPhotoUrl(member.photo) ? (
                      <img src={getPhotoUrl(member.photo)} alt={member.name} />
                    ) : (
                      <div className="pta-card-photo-placeholder">
                        <span className="ph-initials">{member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                        <span className="ph-label">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="pta-card-info">
                    <h3>{member.name}</h3>
                    <span className="pta-card-position">{member.position}</span>
                    {(member.facebook || member.twitter || member.linkedin || member.instagram) && (
                      <div className="pta-card-socials">
                        {member.facebook && (
                          <a href={member.facebook} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    )}
                    {member.bio && <p className="pta-card-bio">{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Modal ── */}
      {modal && (
        <div className="pta-modal-backdrop" onClick={() => setModal(null)}>
          <div className="pta-modal" onClick={e => e.stopPropagation()}>
            <button className="pta-modal-close" onClick={() => setModal(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="pta-modal-inner">
              {/* Left: photo + socials (sticky) */}
              <div className="pta-modal-left">
                <div className="pta-modal-photo">
                  {getPhotoUrl(modal.photo) ? (
                    <img src={getPhotoUrl(modal.photo)} alt={modal.name} />
                  ) : (
                    <div className="pta-modal-photo-placeholder">
                      <span className="ph-initials ph-initials--lg">{modal.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                      <span className="ph-label">No Photo</span>
                    </div>
                  )}
                </div>
                {(modal.facebook || modal.twitter || modal.linkedin || modal.instagram) && (
                  <div className="pta-modal-socials">
                    {modal.facebook && <a href={modal.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>}
                    {modal.twitter && <a href={modal.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                    {modal.linkedin && <a href={modal.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>}
                    {modal.instagram && <a href={modal.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                  </div>
                )}
              </div>
              <div className="pta-modal-details">
                <span className="pta-modal-dept">PTA</span>
                <h2 className="pta-modal-name">{modal.name}</h2>
                <span className="pta-modal-position">{modal.position}</span>
                {modal.bio && (
                  <div className="pta-modal-bio">
                    {modal.bio.split('\n').filter(l => l.trim()).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
                {(modal.email || modal.phone) && (
                  <div className="pta-modal-contacts">
                    {modal.email && (
                      <a href={`mailto:${modal.email}`} className="pta-modal-contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>{modal.email}</span>
                      </a>
                    )}
                    {modal.phone && (
                      <a href={`tel:${modal.phone}`} className="pta-modal-contact-item">
                        <i className="fas fa-phone"></i>
                        <span>{modal.phone}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PTA;
