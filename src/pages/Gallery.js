import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './Gallery.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const categories = ['All', 'Nursery', 'Primary', 'Secondary', 'Sports', 'Campus', 'Events', 'Cultural', 'Staff'];

const photos = [
  // ── Campus & Grounds ──
  { src: '/sla_school_overview.jpg',   cat: 'Campus',    alt: 'School overview' },
  { src: '/sla_school_view.jpg',       cat: 'Campus',    alt: 'School grounds' },
  { src: '/sla_school_view_1.jpg',     cat: 'Campus',    alt: 'School view' },
  { src: '/sla_school_view_4.jpg',     cat: 'Campus',    alt: 'School compound' },
  { src: '/sla_school_gate.jpg',       cat: 'Campus',    alt: 'School gate' },
  { src: '/sla_construction_view.jpg', cat: 'Campus',    alt: 'Campus development' },
  { src: '/sla_secondary_school.jpg',  cat: 'Campus',    alt: 'Secondary school block' },

  // ── Nursery ──
  { src: '/sla_nursery_0.jpg',  cat: 'Nursery', alt: 'Nursery students' },
  { src: '/sla_nursery_1.jpg',  cat: 'Nursery', alt: 'Nursery class' },
  { src: '/sla_nursery_3.jpg',  cat: 'Nursery', alt: 'Nursery learning' },
  { src: '/sla_nursery_4.jpg',  cat: 'Nursery', alt: 'Nursery children' },
  { src: '/sla_nursery_5.jpg',  cat: 'Nursery', alt: 'Nursery activity' },
  { src: '/sla_nursery_6.jpg',  cat: 'Nursery', alt: 'Nursery students' },
  { src: '/sla_nursery_7.jpg',  cat: 'Nursery', alt: 'Nursery class' },
  { src: '/sla_nursery_9.jpg',  cat: 'Nursery', alt: 'Nursery pupils' },
  { src: '/sla_nursery_10.jpg', cat: 'Nursery', alt: 'Nursery children' },
  { src: '/sla_nursery_11.jpg', cat: 'Nursery', alt: 'Nursery activity' },
  { src: '/sla_nursery_12.jpg', cat: 'Nursery', alt: 'Nursery learning' },
  { src: '/sla_nursery_14.jpg', cat: 'Nursery', alt: 'Nursery class' },
  { src: '/sla_nursery_15.jpg', cat: 'Nursery', alt: 'Nursery students' },
  { src: '/sla_nursery_16.jpg', cat: 'Nursery', alt: 'Nursery pupils' },
  { src: '/sla_nursery_17.jpg', cat: 'Nursery', alt: 'Nursery children' },
  { src: '/sla_nursery_18.jpg', cat: 'Nursery', alt: 'Nursery activity' },
  { src: '/sla_nursery_19.jpg', cat: 'Nursery', alt: 'Nursery learning' },
  { src: '/sla_nursery_20.jpg', cat: 'Nursery', alt: 'Nursery class' },
  { src: '/sla_nursery_21.jpg', cat: 'Nursery', alt: 'Nursery students' },
  { src: '/sla_nursery_22.jpg', cat: 'Nursery', alt: 'Nursery pupils' },

  // ── Primary ──
  { src: '/sla_primary_14.jpg', cat: 'Primary', alt: 'Primary class' },
  { src: '/sla_primary_16.jpg', cat: 'Primary', alt: 'Primary students' },
  { src: '/sla_pupils_1.jpg',   cat: 'Primary', alt: 'Primary pupils' },
  { src: '/sla_pupils_2.jpg',   cat: 'Primary', alt: 'Primary class' },
  { src: '/sla_pupils_8.jpg',   cat: 'Primary', alt: 'Primary students' },
  { src: '/sla_pupils_9.jpg',   cat: 'Primary', alt: 'Primary learning' },
  { src: '/sla_pupils_10.jpg',  cat: 'Primary', alt: 'Primary pupils' },
  { src: '/sla_pupils_11.jpg',  cat: 'Primary', alt: 'Primary activity' },
  { src: '/sla_pupils_12.jpg',  cat: 'Primary', alt: 'Primary class' },
  { src: '/sla_pupils_13.jpg',  cat: 'Primary', alt: 'Primary students' },
  { src: '/sla_pupils_14.jpg',  cat: 'Primary', alt: 'Primary learning' },
  { src: '/sla_pupils_18.jpg',  cat: 'Primary', alt: 'Primary pupils' },

  // ── Secondary ──
  { src: '/sla_students_16.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_17.jpg', cat: 'Secondary', alt: 'Secondary class' },
  { src: '/sla_students_19.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_20.jpg', cat: 'Secondary', alt: 'Secondary learning' },
  { src: '/sla_students_21.jpg', cat: 'Secondary', alt: 'Secondary pupils' },
  { src: '/sla_students_22.jpg', cat: 'Secondary', alt: 'Secondary class' },
  { src: '/sla_students_23.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_24.jpg', cat: 'Secondary', alt: 'Secondary activity' },
  { src: '/sla_students_25.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_26.jpg', cat: 'Secondary', alt: 'Secondary class' },
  { src: '/sla_students_27.jpg', cat: 'Secondary', alt: 'Secondary learning' },
  { src: '/sla_students_28.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_30.jpg', cat: 'Secondary', alt: 'Secondary pupils' },
  { src: '/sla_students_31.jpg', cat: 'Secondary', alt: 'Secondary class' },
  { src: '/sla_students_32.jpg', cat: 'Secondary', alt: 'Secondary students' },
  { src: '/sla_students_33.jpg', cat: 'Secondary', alt: 'Secondary activity' },
  { src: '/students.jpg',        cat: 'Secondary', alt: 'SLA students' },
  { src: '/students-posing.jpg', cat: 'Secondary', alt: 'Students posing' },

  // ── Sports ──
  { src: '/sla_basketball_cover.jpg', cat: 'Sports', alt: 'Basketball' },
  { src: '/sla_basketball_1.jpg',     cat: 'Sports', alt: 'Basketball match' },
  { src: '/sla_basketball_2.jpg',     cat: 'Sports', alt: 'Basketball game' },
  { src: '/sla_basketball_3.jpg',     cat: 'Sports', alt: 'Basketball players' },
  { src: '/sla_basketball_4.jpg',     cat: 'Sports', alt: 'Basketball action' },
  { src: '/sla_basketball_5.jpg',     cat: 'Sports', alt: 'Basketball team' },
  { src: '/sla_valleyball_0.jpg',     cat: 'Sports', alt: 'Volleyball match' },
  { src: '/sla_valleyball_1.jpg',     cat: 'Sports', alt: 'Volleyball game' },
  { src: '/sla_volleyball_2.jpg',     cat: 'Sports', alt: 'Volleyball players' },
  { src: '/sla_volleyball_3.jpg',     cat: 'Sports', alt: 'Volleyball action' },

  // ── Events & Assembly ──
  { src: '/sla_assembly.jpg',   cat: 'Events', alt: 'School assembly' },
  { src: '/sla_assembly_1.jpg', cat: 'Events', alt: 'Morning assembly' },
  { src: '/sla_assembly_2.jpg', cat: 'Events', alt: 'Assembly gathering' },

  // ── Cultural ──
  { src: '/sla_cultural_dance.jpg', cat: 'Cultural', alt: 'Cultural dance performance' },

  // ── Staff ──
  { src: '/sla_staffs.jpg',   cat: 'Staff', alt: 'SLA staff' },
  { src: '/sla_staffs_2.jpg', cat: 'Staff', alt: 'SLA staff members' },
  { src: '/sla_staffs_3.jpg', cat: 'Staff', alt: 'SLA teaching staff' },
];

const Gallery = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    return categories.includes(cat) ? cat : 'All';
  });
  const [lightbox, setLightbox] = useState(null); // index into filtered array

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Gallery',
      'A visual journey through life at St. Lawrence Academy — students, staff, sports, campus and more.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  // Close lightbox on Escape / arrow keys
  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filtered.length);
    if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.cat === activeCategory);

  const counts = {};
  categories.forEach(c => {
    counts[c] = c === 'All' ? photos.length : photos.filter(p => p.cat === c).length;
  });

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(i => (i + 1) % filtered.length);

  return (
    <div className="gallery-page">

      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content">
          <div className="container">
            <div className="gallery-hero-inner">
              <span className="gallery-hero-label">Our School in Pictures</span>
              <h1 className="gallery-hero-title">Photo <span>Gallery</span></h1>
              <p className="gallery-hero-sub">
                A visual journey through life at St. Lawrence Academy — our students,
                campus, sports, events, and everything that makes our school community special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile band ── */}
      <div className="gallery-mobile-band">
        <div className="container">
          <h2 className="gallery-mobile-band-heading">Gallery</h2>
        </div>
      </div>

      {/* ── Filter + Grid ── */}
      <section className="gallery-body">
        <div className="container">

          {/* Category tabs */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => { setActiveCategory(cat); setLightbox(null); }}
              >
                {cat}
                <span className="gallery-filter-count">{counts[cat]}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="gallery-count">
            <strong>{filtered.length}</strong> photo{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> — <strong>{activeCategory}</strong></>}
          </p>

          {/* Masonry grid */}
          <div className="gallery-grid">
            {filtered.map((photo, idx) => (
              <button
                key={photo.src}
                className="gallery-thumb"
                onClick={() => setLightbox(idx)}
                aria-label={`View ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="gallery-thumb-overlay">
                  <i className="fas fa-expand-alt"></i>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-lb-close" onClick={() => setLightbox(null)} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>

          <button className="gallery-lb-nav gallery-lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="gallery-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="gallery-lb-img"
            />
            <div className="gallery-lb-caption">
              <span>{filtered[lightbox].alt}</span>
              <span className="gallery-lb-counter">{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>

          <button className="gallery-lb-nav gallery-lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

    </div>
  );
};

export default Gallery;
