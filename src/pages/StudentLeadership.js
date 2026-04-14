import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './StudentLeadership.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const StudentLeadership = () => {
  const [searchParams]                = useSearchParams();
  const [leaders, setLeaders]         = useState({});
  const [years, setYears]             = useState([]);
  const [activeYear, setActiveYear]   = useState(searchParams.get('year') || 'all');
  const [loading, setLoading]         = useState(true);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [lightbox, setLightbox]       = useState(null); // { src, name, position }
  const filterRef                     = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Student Leadership',
      'Student leaders of St. Lawrence Academy — the head students, prefects, and representatives who serve our school community.'
    );
    fetch(`${API_URL}/api/leadership/`)
      .then(res => res.json())
      .then(data => {
        const list = data.results || data;
        const grouped = {};
        list.forEach(leader => {
          if (!grouped[leader.year]) grouped[leader.year] = [];
          grouped[leader.year].push(leader);
        });
        const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        setLeaders(grouped);
        setYears(sortedYears);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => initScrollAnimations(), 100);
  }, [loading]);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // Close lightbox on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http')) return photo;
    return `${API_URL}${photo}`;
  };

  const visibleYears   = activeYear === 'all' ? years : years.filter(y => y === activeYear);
  const totalLeaders   = years.reduce((acc, y) => acc + (leaders[y]?.length || 0), 0);
  const activeLabel    = activeYear === 'all' ? `All Years (${totalLeaders})` : activeYear;

  const selectYear = (y) => { setActiveYear(y); setFilterOpen(false); };

  return (
    <div className="leadership-page">

      {/* ── Hero ── */}
      <section className="leadership-hero">
        <div className="leadership-hero-bg">
          <img src="/sla_assembly.jpg" alt="Student Leadership at St. Lawrence Academy" />
        </div>
        <div className="leadership-hero-overlay"></div>
        <div className="leadership-hero-content">
          <div className="leadership-hero-label">
            <span className="lh-line"></span>
            St. Lawrence Academy
            <span className="lh-line"></span>
          </div>
          <h1 className="leadership-hero-title">Student Leadership</h1>
          <p className="leadership-hero-sub">
            The head students, prefects, and student representatives who serve and
            lead the SLA community — year by year.
          </p>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="leadership-mobile-band">
        <div className="container">
          <h2 className="leadership-mobile-band-heading">Student Leadership</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="leadership-intro">
        <div className="container">
          <div className="leadership-intro-inner">
            <span className="leadership-eyebrow">Our Leaders</span>
            <h2 className="leadership-intro-heading">Serving the School Community</h2>
            <p className="leadership-intro-text">
              At St. Lawrence Academy, student leaders are chosen for their character,
              discipline, and commitment to the school community. From Head Boys and
              Girls to class prefects and council members, these students represent
              the best of what SLA stands for — and they carry that responsibility
              with pride.
            </p>
          </div>
        </div>
      </section>

      {/* ── Directory ── */}
      <section className="leadership-directory">
        <div className="container">

          {!loading && years.length > 1 && (
            <div className="leadership-filters-wrap">
              {/* Desktop pill buttons */}
              <div className="leadership-filters">
                <button
                  className={`leadership-filter-btn${activeYear === 'all' ? ' active' : ''}`}
                  onClick={() => selectYear('all')}
                >
                  All Years {totalLeaders > 0 && `(${totalLeaders})`}
                </button>
                {years.map(y => (
                  <button
                    key={y}
                    className={`leadership-filter-btn${activeYear === y ? ' active' : ''}`}
                    onClick={() => selectYear(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>

              {/* Mobile dropdown */}
              <div className="leadership-filter-dropdown" ref={filterRef}>
                <button
                  className="leadership-filter-select-btn"
                  onClick={() => setFilterOpen(f => !f)}
                >
                  <span className="leadership-filter-select-left">
                    <i className="fas fa-filter"></i>
                    {activeLabel}
                  </span>
                  <i className={`fas fa-chevron-down leadership-filter-arrow${filterOpen ? ' open' : ''}`}></i>
                </button>
                {filterOpen && (
                  <div className="leadership-filter-menu">
                    <button
                      className={`leadership-filter-menu-item${activeYear === 'all' ? ' active' : ''}`}
                      onClick={() => selectYear('all')}
                    >
                      All Years ({totalLeaders})
                      {activeYear === 'all' && <span className="leadership-filter-dot"></span>}
                    </button>
                    {years.map(y => (
                      <button
                        key={y}
                        className={`leadership-filter-menu-item${activeYear === y ? ' active' : ''}`}
                        onClick={() => selectYear(y)}
                      >
                        {y}
                        {activeYear === y && <span className="leadership-filter-dot"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="leadership-skeleton-wrap">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="lsk-card">
                  <div className="lsk-circle"></div>
                  <div className="lsk-line lsk-name"></div>
                  <div className="lsk-line lsk-pos"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && years.length === 0 && (
            <div className="leadership-empty">
              <i className="fas fa-user-tie"></i>
              <h3>Leadership profiles coming soon</h3>
              <p>Student leader profiles are being added. Check back shortly.</p>
            </div>
          )}

          {/* Year sections */}
          {!loading && visibleYears.map(year => (
            <div className="leadership-year-block" key={year}>
              <div className="leadership-year-heading">
                <span>{year}</span>
                <div className="leadership-year-heading-line"></div>
                <span className="leadership-year-badge">
                  {leaders[year]?.length} {leaders[year]?.length === 1 ? 'Leader' : 'Leaders'}
                </span>
              </div>
              <div className="leadership-cards-grid">
                {leaders[year].map(leader => {
                  const photoUrl = getPhotoUrl(leader.image);
                  return (
                    <div className="leadership-card reveal" key={leader.id}>
                      <div
                        className={`leadership-card-avatar${photoUrl ? ' leadership-card-avatar--clickable' : ''}`}
                        onClick={photoUrl ? () => setLightbox({ src: photoUrl, name: leader.name, position: leader.position }) : undefined}
                        title={photoUrl ? 'Click to enlarge' : undefined}
                      >
                        {photoUrl ? (
                          <>
                            <img src={photoUrl} alt={leader.name} />
                            <div className="leadership-card-avatar-zoom">
                              <i className="fas fa-expand-alt"></i>
                            </div>
                          </>
                        ) : (
                          <div className="leadership-card-avatar-placeholder">
                            <div className="leadership-card-avatar-initials">
                              {leader.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <span className="leadership-card-avatar-label">No Photo</span>
                          </div>
                        )}
                      </div>
                      <div className="leadership-card-info">
                        <h3>{leader.name}</h3>
                        <span className="leadership-card-position">{leader.position}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="leadership-lightbox" onClick={() => setLightbox(null)}>
          <button className="leadership-lightbox-close" onClick={() => setLightbox(null)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="leadership-lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.name} />
            <div className="leadership-lightbox-caption">
              <strong>{lightbox.name}</strong>
              <span>{lightbox.position}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentLeadership;
