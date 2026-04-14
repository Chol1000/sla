import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Curriculum.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Curriculum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Curriculum Overview', 'Discover the St. Lawrence Academy curriculum — a broad, balanced, and nationally aligned programme from nursery through secondary school.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="curriculum-page">

      {/* ── Hero ── */}
      <section className="curriculum-hero">
        <div className="curriculum-hero-bg">
          <img src="/sla_students_20.jpg" alt="St. Lawrence Academy Curriculum" />
        </div>
        <div className="curriculum-hero-overlay"></div>
        <div className="curriculum-hero-content">
          <div className="container">
            <div className="curriculum-hero-inner">
              <span className="curriculum-hero-label">St. Lawrence Academy</span>
              <h1 className="curriculum-hero-title">Curriculum <span>Overview</span></h1>
              <p className="curriculum-hero-sub">
                A broad, rigorous, and nationally aligned programme — from nursery
                through to secondary school — built to develop every student fully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="curriculum-mobile-band">
        <div className="container">
          <h2 className="curriculum-mobile-band-heading">Curriculum Overview</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="curriculum-intro">
        <div className="container">
          <div className="curriculum-intro-inner">
            <span className="curriculum-eyebrow">Our Approach</span>
            <h2 className="curriculum-intro-heading">Built for Every Stage of Learning</h2>
            <p className="curriculum-intro-text">
              St. Lawrence Academy follows the national curriculum framework of South Sudan,
              delivered across three progressive school levels. Our teaching goes beyond
              examination preparation — building knowledge, values, and practical skills
              that serve students throughout their lives.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Levels ── */}
      <section className="curriculum-levels">
        <div className="container">
          <div className="curriculum-levels-header">
            <span className="curriculum-eyebrow">School Levels</span>
            <h2 className="curriculum-levels-heading">Three Levels, One Continuous Journey</h2>
          </div>
          <div className="curriculum-levels-grid">

            <div className="curriculum-level-card reveal">
              <div className="curriculum-level-top">
                <div className="curriculum-level-num">1</div>
                <div className="curriculum-level-tag">Baby – Top</div>
              </div>
              <h3>Nursery School</h3>
              <p>Learning through play, guided by eight developmental domains — language, literacy, numeracy, creativity, physical development, social skills, environmental awareness, and values.</p>
              <Link to="/subjects#nursery" className="curriculum-level-link">
                View domains <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="curriculum-level-card reveal">
              <div className="curriculum-level-top">
                <div className="curriculum-level-num">2</div>
                <div className="curriculum-level-tag">P1 – P8</div>
              </div>
              <h3>Primary School</h3>
              <p>Five core subjects — English, Mathematics, Science, Social Studies, and Christian Religious Education — taught progressively across all primary years, leading to the PLE.</p>
              <Link to="/subjects#primary" className="curriculum-level-link">
                View subjects <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="curriculum-level-card reveal">
              <div className="curriculum-level-top">
                <div className="curriculum-level-num">3</div>
                <div className="curriculum-level-tag">S1 – S4</div>
              </div>
              <h3>Secondary School</h3>
              <p>Sciences and Arts streams with a shared core — 15 subjects in total, taught by subject specialists, culminating in the SSCSE national examination.</p>
              <Link to="/subjects#secondary" className="curriculum-level-link">
                View subjects <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="curriculum-pillars">
        <div className="container">
          <div className="curriculum-pillars-header">
            <span className="curriculum-eyebrow curriculum-eyebrow--light">What Guides Us</span>
            <h2 className="curriculum-pillars-heading">Our Curriculum Pillars</h2>
          </div>
          <div className="curriculum-pillars-grid">
            <div className="curriculum-pillar reveal">
              <div className="curriculum-pillar-num">01</div>
              <div className="curriculum-pillar-body">
                <h3>Academic Excellence</h3>
                <p>Rigorous, knowledge-rich teaching that builds deep understanding across all subjects.</p>
              </div>
            </div>
            <div className="curriculum-pillar reveal">
              <div className="curriculum-pillar-num">02</div>
              <div className="curriculum-pillar-body">
                <h3>Character &amp; Values</h3>
                <p>Honesty, respect, and integrity woven into daily school life, not treated as extras.</p>
              </div>
            </div>
            <div className="curriculum-pillar reveal">
              <div className="curriculum-pillar-num">03</div>
              <div className="curriculum-pillar-body">
                <h3>Practical Application</h3>
                <p>Learning reinforced through practicals, projects, and real-world application at every level.</p>
              </div>
            </div>
            <div className="curriculum-pillar reveal">
              <div className="curriculum-pillar-num">04</div>
              <div className="curriculum-pillar-body">
                <h3>Inclusive Learning</h3>
                <p>A curriculum that accommodates different paces and styles so no child is left behind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── National Alignment strip ── */}
      <section className="curriculum-national">
        <div className="container">
          <div className="curriculum-national-inner">
            <div className="curriculum-national-text">
              <span className="curriculum-eyebrow">National Framework</span>
              <h2 className="curriculum-national-heading">Aligned to the National Curriculum</h2>
              <p>
                Our programme follows the Ministry of General Education and Instruction
                framework, preparing students for the PLE and SSCSE while going further
                to ensure they are genuinely well-educated — not just exam-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="curriculum-links">
        <div className="container">
          <div className="curriculum-links-header">
            <span className="curriculum-eyebrow">Go Deeper</span>
            <h2 className="curriculum-links-heading">Explore Our Academic Offer</h2>
          </div>
          <div className="curriculum-links-grid">
            <a href="/subjects"     className="curriculum-link-card reveal"><div className="curriculum-link-icon"><i className="fas fa-book-open"></i></div><span>Subjects Offered</span><i className="fas fa-arrow-right"></i></a>
            <a href="/examinations" className="curriculum-link-card reveal"><div className="curriculum-link-icon"><i className="fas fa-file-alt"></i></div><span>Examinations</span><i className="fas fa-arrow-right"></i></a>
            <a href="/science-labs" className="curriculum-link-card reveal"><div className="curriculum-link-icon"><i className="fas fa-flask"></i></div><span>Science Labs</span><i className="fas fa-arrow-right"></i></a>
            <a href="/library"      className="curriculum-link-card reveal"><div className="curriculum-link-icon"><i className="fas fa-book-reader"></i></div><span>Library</span><i className="fas fa-arrow-right"></i></a>
            <a href="/technology"   className="curriculum-link-card reveal"><div className="curriculum-link-icon"><i className="fas fa-laptop"></i></div><span>Technology &amp; ICT</span><i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="curriculum-closing">
        <div className="container">
          <div className="curriculum-closing-inner">
            <span className="curriculum-eyebrow">Get Started</span>
            <h2 className="curriculum-closing-heading">A Complete Education, from Start to Finish</h2>
            <p>
              From nursery to the SSCSE, St. Lawrence Academy provides a structured,
              caring, and ambitious education at every stage of your child's journey.
            </p>
            <a href="/admissions/apply" className="curriculum-closing-btn curriculum-closing-btn--primary">
              <i className="fas fa-pen-alt"></i> Apply Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Curriculum;
