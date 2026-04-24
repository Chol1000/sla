import { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './Gallery.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const categories = ['All', 'Nursery', 'Primary', 'Secondary', 'Sports', 'Campus', 'Events', 'Cultural', 'Staff'];

const photos = [
  // ── Campus & Grounds ──
  { src: '/images/secondary/school_view.jpg',                       cat: 'Campus', alt: 'School grounds' },
  { src: '/images/secondary/sla_school_view_1.jpg',                 cat: 'Campus', alt: 'School view' },
  { src: '/images/primary/school_view_4.jpg',                       cat: 'Campus', alt: 'School compound' },
  { src: '/images/secondary/school_gate.jpg',                       cat: 'Campus', alt: 'School gate' },
  { src: '/images/primary/primary_school_gate.JPG',                 cat: 'Campus', alt: 'Primary school gate' },
  { src: '/images/secondary/sla_secondary_school_gate.jpg',         cat: 'Campus', alt: 'Secondary school gate' },
  { src: '/images/secondary/campus_night_view.jpg',                 cat: 'Campus', alt: 'Campus at night' },
  { src: '/images/secondary/campus_view_from_above_assembly.JPG',   cat: 'Campus', alt: 'Campus aerial view' },
  { src: '/images/secondary/flags_on_campus.jpg',                   cat: 'Campus', alt: 'Flags on campus' },
  { src: '/images/secondary/school_bus.jpg',                        cat: 'Campus', alt: 'School bus' },
  { src: '/images/secondary/school_bus_1.jpg',                      cat: 'Campus', alt: 'School bus' },
  { src: '/images/secondary/st_chapel.JPG',                         cat: 'Cultural', alt: 'School chapel' },
  { src: '/images/secondary/beautiful_students_school_view.JPG',    cat: 'Campus', alt: 'Campus view' },
  { src: '/images/primary/primary_campus.jpg',                      cat: 'Campus', alt: 'Primary campus building' },
  { src: '/images/primary/primary_campus_1.jpg',                    cat: 'Campus', alt: 'Primary school building' },
  { src: '/images/primary/primary_view.jpg',                        cat: 'Campus', alt: 'Primary school view' },

  // ── Nursery ──
  { src: '/images/nursery/nursery.JPG',                    cat: 'Nursery', alt: 'Nursery students' },
  { src: '/images/nursery/nursery%20(1).JPG',              cat: 'Nursery', alt: 'Nursery students' },
  { src: '/images/nursery/nursery_1.JPG',                  cat: 'Nursery', alt: 'Nursery class' },
  { src: '/images/nursery/nursery_group_pic.JPG',          cat: 'Nursery', alt: 'Nursery group' },
  { src: '/images/nursery/nursery_group_pic%20(1).JPG',    cat: 'Nursery', alt: 'Nursery group photo' },
  { src: '/images/nursery/nursery_group_pic_1.JPG',        cat: 'Nursery', alt: 'Nursery group photo' },
  { src: '/images/nursery/nursery_kids.JPG',               cat: 'Nursery', alt: 'Nursery children' },
  { src: '/images/nursery/nursery_pic.JPG',                cat: 'Nursery', alt: 'Nursery activity' },
  { src: '/images/nursery/nursery_pic%20(1).JPG',          cat: 'Nursery', alt: 'Nursery activity' },
  { src: '/images/nursery/nursery_pic_1.JPG',              cat: 'Nursery', alt: 'Nursery students' },
  { src: '/images/nursery/nursery_pic_1%20(1).JPG',        cat: 'Nursery', alt: 'Nursery students' },
  { src: '/images/nursery/nursery_pic_2.JPG',              cat: 'Nursery', alt: 'Nursery learning' },
  { src: '/images/nursery/nursery_pic_2%20(1).JPG',        cat: 'Nursery', alt: 'Nursery learning' },
  { src: '/images/nursery/nursery_class.JPG',              cat: 'Nursery', alt: 'Nursery class session' },
  { src: '/images/nursery/nursery_class_1.JPG',            cat: 'Nursery', alt: 'Nursery children learning' },
  { src: '/images/nursery/nursery_pic_3.JPG',              cat: 'Nursery', alt: 'Nursery play time' },
  { src: '/images/nursery/nursery_pic_3%20(1).JPG',        cat: 'Nursery', alt: 'Nursery play time' },
  { src: '/images/nursery/nursery_with_staff.JPG',         cat: 'Nursery', alt: 'Nursery with staff' },
  { src: '/images/nursery/nursery_wave.JPG',               cat: 'Nursery', alt: 'Nursery waving' },
  { src: '/images/nursery/graduation.JPG',                 cat: 'Nursery', alt: 'Nursery graduation' },
  { src: '/images/nursery/graduation_1.jpg',               cat: 'Nursery', alt: 'Nursery graduation ceremony' },
  { src: '/images/nursery/kids_in_class.jpg',              cat: 'Nursery', alt: 'Young children in class' },
  { src: '/images/nursery/nursery_gate.jpg',               cat: 'Nursery', alt: 'Nursery gate' },

  // ── Primary ──
  { src: '/images/primary/pupils.JPG',               cat: 'Primary', alt: 'Primary pupils' },
  { src: '/images/primary/pupils_1.JPG',             cat: 'Primary', alt: 'Primary class' },
  { src: '/images/primary/pupils_2.JPG',             cat: 'Primary', alt: 'Primary pupils group' },
  { src: '/images/primary/pupils_pic.JPG',           cat: 'Primary', alt: 'Primary students' },
  { src: '/images/primary/pupils_pic_1.JPG',         cat: 'Primary', alt: 'Primary learning' },
  { src: '/images/primary/pupils_pic_3.JPG',         cat: 'Primary', alt: 'Primary pupils together' },
  { src: '/images/primary/pupils_pic_4.JPG',         cat: 'Primary', alt: 'Primary activity' },
  { src: '/images/primary/pupils_pic_5.JPG',         cat: 'Primary', alt: 'Primary class session' },
  { src: '/images/primary/pupils_pic_6.JPG',         cat: 'Primary', alt: 'Primary students outdoors' },
  { src: '/images/primary/pupils_pic_7.JPG',         cat: 'Primary', alt: 'Primary pupils playing' },
  { src: '/images/primary/pupils_pic_8.JPG',         cat: 'Primary', alt: 'Primary class learning' },
  { src: '/images/primary/pupils_pic_9.JPG',         cat: 'Primary', alt: 'Primary pupils together' },
  { src: '/images/primary/pupils_pic_10.JPG',        cat: 'Primary', alt: 'Primary class activity' },
  { src: '/images/primary/pupils_pics.JPG',          cat: 'Primary', alt: 'Primary pupils portraits' },
  { src: '/images/primary/pic.JPG',                  cat: 'Primary', alt: 'Primary school activity' },
  { src: '/images/primary/IMG_2195.JPG',             cat: 'Primary', alt: 'Primary school activity' },
  { src: '/images/primary/IMG_2196.JPG',             cat: 'Primary', alt: 'Primary school activity' },
  { src: '/images/primary/primary_girls.JPG',        cat: 'Primary', alt: 'Primary girls' },
  { src: '/images/primary/primary_girls_1.JPG',      cat: 'Primary', alt: 'Primary girls outdoors' },

  // ── Secondary ──
  { src: '/images/secondary/students.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/students_1.jpg',                    cat: 'Secondary', alt: 'Secondary class' },
  { src: '/images/secondary/students_2.jpg',                    cat: 'Secondary', alt: 'Secondary students outdoors' },
  { src: '/images/secondary/students_3.JPG',                    cat: 'Secondary', alt: 'SLA students' },
  { src: '/images/secondary/students_4.JPG',                    cat: 'Secondary', alt: 'Secondary pupils' },
  { src: '/images/secondary/students_5.JPG',                    cat: 'Secondary', alt: 'Secondary class session' },
  { src: '/images/secondary/students_in_class.JPG',             cat: 'Secondary', alt: 'Students in class' },
  { src: '/images/secondary/students_group.JPG',                cat: 'Secondary', alt: 'Student group photo' },
  { src: '/images/secondary/students_pic.JPG',                  cat: 'Secondary', alt: 'Secondary students portrait' },
  { src: '/images/secondary/students_standing.JPG',             cat: 'Secondary', alt: 'Students standing' },
  { src: '/images/secondary/student_group_1.JPG',               cat: 'Secondary', alt: 'Student group' },
  { src: '/images/secondary/sla_students_25.jpg',               cat: 'Secondary', alt: 'Secondary students group' },
  { src: '/images/secondary/sla_students_51.jpg',               cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/sla_students_10.JPEG',              cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/secondary_school_students.JPG',     cat: 'Secondary', alt: 'Secondary school students' },
  { src: '/images/secondary/secondary_students.JPG',            cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/secondary_school_pic_2.JPG',        cat: 'Secondary', alt: 'Secondary school' },
  { src: '/images/secondary/boarding_students.JPG',             cat: 'Secondary', alt: 'Boarding students' },
  { src: '/images/secondary/boarding_students_group_pic.JPG',   cat: 'Secondary', alt: 'Boarding students group' },
  { src: '/images/secondary/boarding_students_0.JPG',           cat: 'Secondary', alt: 'Boarding students' },
  { src: '/images/secondary/boarding_students_1.JPG',           cat: 'Secondary', alt: 'Boarding students' },
  { src: '/images/secondary/boarding_students_2.JPG',           cat: 'Secondary', alt: 'Boarding students' },
  { src: '/images/secondary/boarding_students_pic.JPG',         cat: 'Secondary', alt: 'Boarding students portrait' },
  { src: '/images/secondary/boarding_pic.JPG',                  cat: 'Secondary', alt: 'Boarding life' },
  { src: '/images/secondary/pic_1.JPG',                         cat: 'Secondary', alt: 'Secondary learning' },
  { src: '/images/secondary/pic_2.JPG',                         cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_3.JPG',                         cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_6.JPG',                         cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_8.JPG',                         cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_9.JPG',                         cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_10.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_11.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_12.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_14.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_15.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_16.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_17.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_18.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/pic_19.JPG',                        cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/20260323_071054.jpg',               cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/20260323_071134.jpg',               cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/20260323_071158.jpg',               cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_1551.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_1552.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_2958.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8210.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8309.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8755.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8756.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8763.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/IMG_8772.JPG',                      cat: 'Secondary', alt: 'Secondary students' },
  { src: '/images/secondary/sla_books.jpg',                     cat: 'Secondary', alt: 'School books' },

  // ── Sports ──
  { src: '/images/secondary/sla_basketball_cover.jpg',           cat: 'Sports', alt: 'Basketball' },
  { src: '/images/secondary/basketball_game.JPG',                cat: 'Sports', alt: 'Basketball match' },
  { src: '/images/secondary/sla_basketball_2.jpg',               cat: 'Sports', alt: 'Basketball game' },
  { src: '/images/secondary/sla_basketball_3.jpg',               cat: 'Sports', alt: 'Basketball players' },
  { src: '/images/secondary/sla_basketball_4.jpg',               cat: 'Sports', alt: 'Basketball action' },
  { src: '/images/secondary/sla_basketball_5.jpg',               cat: 'Sports', alt: 'Basketball team' },
  { src: '/images/secondary/sla_basketball_6.jpg',               cat: 'Sports', alt: 'Basketball match' },
  { src: '/images/secondary/sla_basketball_7.jpg',               cat: 'Sports', alt: 'Basketball players' },
  { src: '/images/secondary/sla_basketball_8.jpg',               cat: 'Sports', alt: 'Basketball action' },
  { src: '/images/secondary/basketball_2.JPG',                   cat: 'Sports', alt: 'Basketball training' },
  { src: '/images/secondary/baseket_training.JPG',               cat: 'Sports', alt: 'Basketball drill' },
  { src: '/images/secondary/basketball_training.jpg',            cat: 'Sports', alt: 'Basketball practice' },
  { src: '/images/secondary/baseketball.jpg',                   cat: 'Sports', alt: 'Basketball' },
  { src: '/images/secondary/baseketball%20(1).jpg',             cat: 'Sports', alt: 'Basketball' },
  { src: '/images/secondary/baseketball_1.jpg',                 cat: 'Sports', alt: 'Basketball' },
  { src: '/images/secondary/basket_team.jpg',                   cat: 'Sports', alt: 'Basketball team' },
  { src: '/images/secondary/basketball_team.jpg',               cat: 'Sports', alt: 'Basketball team' },
  { src: '/images/secondary/students_watching_game.JPG',         cat: 'Sports', alt: 'Students watching game' },
  { src: '/images/secondary/students_siting_watching_game.JPG',  cat: 'Sports', alt: 'Students watching match' },
  { src: '/images/secondary/cup_branded.jpg',                    cat: 'Sports', alt: 'Sports trophy' },
  { src: '/images/secondary/football_interclasses.JPG',          cat: 'Sports', alt: 'Football interclass match' },
  { src: '/images/primary/football_team.JPG',                    cat: 'Sports', alt: 'Football team' },
  { src: '/images/primary/primary_football_team.JPG',            cat: 'Sports', alt: 'Primary football team' },
  { src: '/images/primary/primary_school_football_team.JPG',     cat: 'Sports', alt: 'Primary school football' },
  { src: '/images/primary/primary_school_girls_football_team.JPG', cat: 'Sports', alt: 'Girls football team' },
  { src: '/images/primary/girls_sport.JPG',                      cat: 'Sports', alt: 'Girls sports' },
  { src: '/images/primary/full_girls_squad.JPG',                 cat: 'Sports', alt: 'Girls squad' },
  { src: '/images/primary/girls_team.JPG',                       cat: 'Sports', alt: 'Girls sports team' },
  { src: '/images/primary/primary_team_on_campus.JPG',           cat: 'Sports', alt: 'Sports team on campus' },
  { src: '/images/primary/primary_trophy.JPG',                   cat: 'Sports', alt: 'Trophy winners' },
  { src: '/images/primary/pupils_with_trophies.JPG',             cat: 'Sports', alt: 'Pupils with trophies' },

  // ── Secondary (additional) ──
  { src: '/images/secondary/mathematics_club.jpg',               cat: 'Secondary', alt: 'Mathematics club' },
  { src: '/images/secondary/sla_students_scripture_union.jpg',   cat: 'Secondary', alt: 'Scripture Union meeting' },
  { src: '/images/secondary/sla_students_scripture_union_0.jpg', cat: 'Secondary', alt: 'Scripture Union gathering' },
  { src: '/images/secondary/students_dinner.jpg',                cat: 'Secondary', alt: 'Students dining' },
  { src: '/images/secondary/students_with_flag.jpg',             cat: 'Secondary', alt: 'Students with flag' },
  { src: '/images/secondary/students_with_flag_1.jpg',           cat: 'Secondary', alt: 'Students and flag' },
  { src: '/images/secondary/admin_with_students.JPG',            cat: 'Secondary', alt: 'Admin with students' },
  { src: '/images/secondary/students_with_staff.JPG',            cat: 'Secondary', alt: 'Students with staff' },
  { src: '/images/secondary/students_press.jpg',                 cat: 'Secondary', alt: 'Students with press' },

  // ── Secondary (assembly & student shots) ──
  { src: '/images/secondary/assembly_1.JPG',                     cat: 'Secondary', alt: 'Morning assembly' },
  { src: '/images/secondary/assembly_2.JPG',                     cat: 'Secondary', alt: 'Assembly gathering' },
  { src: '/images/secondary/assembly_4.JPG',                     cat: 'Secondary', alt: 'Assembly session' },
  { src: '/images/secondary/assembly_5.JPG',                     cat: 'Secondary', alt: 'Assembly gathering' },
  { src: '/images/secondary/assembly_6.JPG',                     cat: 'Secondary', alt: 'Assembly session' },
  { src: '/images/secondary/assembly_7.JPG',                     cat: 'Secondary', alt: 'Assembly march' },
  { src: '/images/secondary/assembly_13.JPG',                    cat: 'Secondary', alt: 'School assembly' },
  { src: '/images/secondary/morning_assembly.JPG',               cat: 'Secondary', alt: 'Morning assembly march' },
  { src: '/images/secondary/assembly_students_on_t-shirt.JPG',   cat: 'Secondary', alt: 'Students in school T-shirts' },
  { src: '/images/secondary/students_assembly_view.jpg',         cat: 'Secondary', alt: 'Assembly view' },

  // ── Primary (assembly shots) ──
  { src: '/images/primary/assembly.JPG',        cat: 'Primary', alt: 'Primary school assembly' },
  { src: '/images/primary/primary_assembly.JPG', cat: 'Primary', alt: 'Primary assembly' },
  { src: '/images/primary/primary_assembly.jpg', cat: 'Primary', alt: 'Primary assembly' },

  // ── Events ──
  { src: '/images/secondary/assembly_overview.JPG',        cat: 'Events', alt: 'School assembly overview' },
  { src: '/images/secondary/assembly.JPG',                  cat: 'Events', alt: 'School assembly' },
  { src: '/images/secondary/assembly_view_from_above.JPG', cat: 'Events', alt: 'Assembly from above' },
  { src: '/images/secondary/event_setup.jpg',               cat: 'Events', alt: 'Event setup' },
  { src: '/images/secondary/events_1.jpg',                  cat: 'Events', alt: 'School event' },
  { src: '/images/secondary/events_2.jpg',                  cat: 'Events', alt: 'School activities' },
  { src: '/images/secondary/events_3.jpg',                  cat: 'Events', alt: 'School events' },
  { src: '/images/secondary/alumni_visit.jpg',              cat: 'Events', alt: 'Alumni visit' },
  { src: '/images/secondary/press.jpeg',                    cat: 'Events', alt: 'Press coverage' },
  { src: '/images/secondary/press_1.jpeg',                  cat: 'Events', alt: 'Media coverage' },
  { src: '/images/secondary/Journalists_press.jpg',         cat: 'Events', alt: 'Press journalists' },
  { src: '/images/secondary/press_clear_pic.jpg',           cat: 'Events', alt: 'Press photo' },
  { src: '/images/secondary/community_service.jpg',         cat: 'Events', alt: 'Community service' },
  { src: '/images/secondary/debate_team.jpg',               cat: 'Events', alt: 'Debate team' },
  { src: '/images/primary/Debate_winners.jpg',              cat: 'Events', alt: 'Debate competition winners' },
  { src: '/images/nursery/nurs_exams.jpg',                   cat: 'Events', alt: 'Student examination' },
  { src: '/images/secondary/exams.jpg',                      cat: 'Events', alt: 'Secondary examinations' },
  { src: '/images/secondary/sec_examinations.jpg',           cat: 'Events', alt: 'Examination hall' },

  // ── Cultural ──
  { src: '/images/secondary/sla_cultural_dance.jpg',         cat: 'Cultural', alt: 'Cultural dance performance' },
  { src: '/images/secondary/palm_sunday.JPG',                cat: 'Cultural', alt: 'Palm Sunday celebration' },
  { src: '/images/secondary/palm_sunday_with_students.JPG',  cat: 'Cultural', alt: 'Palm Sunday with students' },
  { src: '/images/secondary/palm_sunday_1.JPG',              cat: 'Cultural', alt: 'Palm Sunday procession' },

  // ── Library ──
  { src: '/images/secondary/library.jpg',   cat: 'Campus', alt: 'School library' },
  { src: '/images/secondary/library_1.jpg', cat: 'Campus', alt: 'Library reading area' },
  { src: '/images/secondary/library_2.jpg', cat: 'Campus', alt: 'Students in library' },

  // ── Staff ──
  { src: '/images/general/pta.jpg',                          cat: 'Staff', alt: 'PTA at St. Lawrence Academy' },
  { src: '/images/general/pta_meeting.jpg',                  cat: 'Staff', alt: 'PTA meeting' },
  { src: '/images/general/Director_achier_john.jpg',         cat: 'Staff', alt: 'Achier Manyuat John — Founder & Director' },
  { src: '/images/secondary/sla_director_1.jpg',             cat: 'Staff', alt: 'School director' },
  { src: '/images/secondary/staff_dinner.jpg',               cat: 'Staff', alt: 'Staff dinner' },
  { src: '/images/secondary/success_card_from_director.jpg', cat: 'Staff', alt: 'Message from director' },
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
          <img src="/images/secondary/morning_assembly.JPG" alt="St. Lawrence Academy" />
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
      {lightbox !== null && ReactDOM.createPortal(
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>

          {/* Top bar — close button */}
          <div className="gallery-lb-topbar" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lb-close" onClick={() => setLightbox(null)} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Middle — image + arrows */}
          <div className="gallery-lb-middle" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lb-nav gallery-lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
              <i className="fas fa-chevron-left"></i>
            </button>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="gallery-lb-img"
            />
            <button className="gallery-lb-nav gallery-lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Caption bar */}
          <div className="gallery-lb-caption" onClick={(e) => e.stopPropagation()}>
            <span>{filtered[lightbox].alt}</span>
            <span className="gallery-lb-counter">{lightbox + 1} / {filtered.length}</span>
          </div>

        </div>,
        document.body
      )}

    </div>
  );
};

export default Gallery;
