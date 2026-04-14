import { useEffect, useState } from 'react';
import './Faculty.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const SECTION_LABELS = {
  director: 'Leadership',
  admin: 'Administration',
  nursery: 'Nursery School',
  primary: 'Primary School',
  secondary: 'Secondary School',
  pta: 'PTA',
};

const SECTION_ORDER = ['director', 'admin', 'nursery', 'primary', 'secondary', 'pta'];

/* ── Reusable staff card ── */
const StaffCard = ({ member, getPhotoUrl, onClick }) => (
  <div className="faculty-card" onClick={onClick}>
    <div className="faculty-card-photo">
      {getPhotoUrl(member.photo) ? (
        <img src={getPhotoUrl(member.photo)} alt={member.name} />
      ) : (
        <div className="faculty-card-photo-placeholder">
          <span className="ph-initials">{member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
          <span className="ph-label">No Photo</span>
        </div>
      )}
      <div className="faculty-card-photo-overlay">
        <span className="faculty-card-view"><i className="fas fa-eye"></i> View Profile</span>
      </div>
    </div>
    <div className="faculty-card-info">
      <h3>{member.name}</h3>
      <span className="faculty-card-position">{member.position}</span>
      {(member.facebook || member.twitter || member.linkedin || member.instagram) && (
        <div className="faculty-card-socials">
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
      {member.bio && (
        <p className="faculty-card-bio-preview">{member.bio}</p>
      )}
    </div>
  </div>
);

const Faculty = () => {
  const [staffData, setStaffData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setPageMeta('Faculty and Staff', 'Meet the dedicated faculty and staff of St. Lawrence Academy — the educators and leaders shaping the next generation in Juba, South Sudan.');
    fetch(`${API_URL}/api/staff/members/`)
      .then(res => res.json())
      .then(data => {
        const list = data.results || data;
        const grouped = {};
        list.forEach(member => {
          if (!grouped[member.section]) grouped[member.section] = [];
          grouped[member.section].push(member);
        });
        setStaffData(grouped);
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

  // Lock body scroll when modal open
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

  const sections = SECTION_ORDER.filter(s => s !== 'pta' && staffData[s]?.length > 0);
  const visibleSections = activeSection === 'all' ? sections : sections.filter(s => s === activeSection);
  const totalStaff = sections.reduce((acc, s) => acc + (staffData[s]?.length || 0), 0);

  return (
    <div className="faculty-page">

      {/* ── Hero ── */}
      <section className="faculty-hero">
        <div className="faculty-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="faculty-hero-overlay"></div>
        <div className="faculty-hero-content">
          <div className="faculty-hero-label">
            <span className="fh-line"></span>
            St. Lawrence Academy
            <span className="fh-line"></span>
          </div>
          <h1 className="faculty-hero-title">Faculty and Staff</h1>
          <p className="faculty-hero-sub">
            Meet the dedicated educators and leaders shaping the next generation in Juba, South Sudan.
          </p>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <div className="faculty-stats-band">
        <div className="container faculty-stats-inner">
          <div className="faculty-stat-item">
            <strong>{loading ? '—' : totalStaff}</strong>
            <span>Total Staff</span>
          </div>
          <div className="faculty-stat-divider"></div>
          <div className="faculty-stat-item">
            <strong>{loading ? '—' : sections.length}</strong>
            <span>Departments</span>
          </div>
          <div className="faculty-stat-divider"></div>
          <div className="faculty-stat-item">
            <strong>Est. 2020</strong>
            <span>Since</span>
          </div>
        </div>
      </div>

      {/* ── Staff Directory ── */}
      <section className="faculty-directory">
        <div className="container">

          {!loading && sections.length > 0 && (
            <div className="faculty-filters animate-on-scroll">
              <button
                className={`faculty-filter-btn${activeSection === 'all' ? ' active' : ''}`}
                onClick={() => setActiveSection('all')}
              >All Staff</button>
              {sections.filter(s => s !== 'pta').map(s => (
                <button
                  key={s}
                  className={`faculty-filter-btn${activeSection === s ? ' active' : ''}`}
                  onClick={() => setActiveSection(s)}
                >{SECTION_LABELS[s]}</button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="faculty-skeleton-wrap">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="faculty-skeleton-card">
                  <div className="fsk-photo"></div>
                  <div className="fsk-line fsk-name"></div>
                  <div className="fsk-line fsk-pos"></div>
                  <div className="fsk-line fsk-short"></div>
                </div>
              ))}
            </div>
          ) : totalStaff === 0 ? (
            <div className="faculty-empty">
              <i className="fas fa-users"></i>
              <h3>Staff profiles coming soon</h3>
              <p>We're updating our directory. Check back shortly.</p>
            </div>
          ) : (
            <>
              {visibleSections.map(section => (
                <div key={section} className="faculty-section-block animate-on-scroll">
                  <div className="faculty-section-heading">
                    <span className="fsh-eyebrow">Department</span>
                    <h2>{SECTION_LABELS[section]}</h2>
                    <div className="fsh-line"></div>
                  </div>
                  <div className="faculty-cards-grid">
                    {staffData[section].map(member => (
                      <StaffCard key={member.id} member={member} getPhotoUrl={getPhotoUrl} onClick={() => setModal(member)} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      </section>

      {/* ── Modal ── */}
      {modal && (
        <div className="faculty-modal-backdrop" onClick={() => setModal(null)}>
          <div className="faculty-modal" onClick={e => e.stopPropagation()}>
            <button className="faculty-modal-close" onClick={() => setModal(null)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="faculty-modal-inner">
              {/* Left: photo + socials (sticky) */}
              <div className="faculty-modal-left">
                <div className="faculty-modal-photo">
                  {getPhotoUrl(modal.photo) ? (
                    <img src={getPhotoUrl(modal.photo)} alt={modal.name} />
                  ) : (
                    <div className="faculty-modal-photo-placeholder">
                      <span className="ph-initials ph-initials--lg">{modal.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                      <span className="ph-label">No Photo</span>
                    </div>
                  )}
                </div>
                {(modal.facebook || modal.twitter || modal.linkedin || modal.instagram) && (
                  <div className="faculty-modal-socials">
                    {modal.facebook && <a href={modal.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>}
                    {modal.twitter && <a href={modal.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                    {modal.linkedin && <a href={modal.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>}
                    {modal.instagram && <a href={modal.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                  </div>
                )}
              </div>

              {/* Right: details */}
              <div className="faculty-modal-details">
                <span className="faculty-modal-dept">{SECTION_LABELS[modal.section]}</span>
                <h2 className="faculty-modal-name">{modal.name}</h2>
                <span className="faculty-modal-position">{modal.position}</span>

                {modal.bio && (
                  <div className="faculty-modal-bio">
                    {modal.bio.split('\n').filter(l => l.trim()).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                {(modal.email || modal.phone) && (
                  <div className="faculty-modal-contacts">
                    {modal.email && (
                      <a href={`mailto:${modal.email}`} className="faculty-modal-contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>{modal.email}</span>
                      </a>
                    )}
                    {modal.phone && (
                      <a href={`tel:${modal.phone}`} className="faculty-modal-contact-item">
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

export default Faculty;
