import { useEffect } from 'react';
import './Library.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Library = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Library', 'The St. Lawrence Academy Library — a resource-rich learning hub supporting students from nursery through secondary.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="library-page">

      {/* ── Hero ── */}
      <section className="library-hero">
        <div className="library-hero-bg">
          <img src="/images/secondary/library.jpg" alt="St. Lawrence Academy Library" />
        </div>
        <div className="library-hero-overlay"></div>
        <div className="library-hero-content">
          <div className="container">
            <div className="library-hero-inner">
              <span className="library-hero-label">St. Lawrence Academy</span>
              <h1 className="library-hero-title">Our <span>Library</span></h1>
              <p className="library-hero-sub">
                A world of knowledge, available to every student — the
                St. Lawrence Academy Library is at the heart of our
                commitment to learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="library-mobile-band">
        <div className="container">
          <h2 className="library-mobile-band-heading">Library</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="library-intro">
        <div className="container">
          <div className="library-intro-inner">
            <span className="library-eyebrow">Knowledge Hub</span>
            <h2 className="library-intro-heading">More Than Books — A Centre for Learning</h2>
            <p className="library-intro-text">
              The St. Lawrence Academy Library is a vibrant, well-stocked resource centre
              designed to support every aspect of student life — from daily reading and
              research to examination preparation and independent study. Our library is
              open to all students across nursery, primary, and secondary levels.
            </p>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="library-about">
        <div className="container">
          <div className="library-about-inner reveal">
            <div className="library-about-text">
              <span className="library-eyebrow">About Our Library</span>
              <h2 className="library-about-heading">A Space Built for Curious Minds</h2>
              <p>
                Our library holds a carefully curated collection of books, reference
                materials, and periodicals spanning every subject on the curriculum.
                It is a quiet, organised, and welcoming space where students are
                encouraged to read, research, and grow as independent learners.
              </p>
              <p>
                Beyond books, the library serves as a study hub — a place where
                students come to prepare for examinations, work on assignments, and
                develop the habit of reading for pleasure. Our library staff are always
                on hand to guide students to the right resources and support their
                academic journey.
              </p>
            </div>
            <div className="library-about-img">
              <img src="/images/secondary/library_1.jpg" alt="Students in library" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="library-services">
        <div className="container">
          <div className="library-services-header">
            <span className="library-eyebrow">What We Offer</span>
            <h2 className="library-services-heading">Library Services &amp; Resources</h2>
          </div>
          <div className="library-services-grid">

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Books &amp; References</h3>
              <p>
                A wide-ranging collection of textbooks, storybooks, reference
                encyclopaedias, and subject-specific materials for all levels —
                from nursery picture books to advanced secondary texts.
              </p>
            </div>

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Research &amp; Study Support</h3>
              <p>
                Library staff assist students in locating materials, conducting
                research, and building the academic skills they need to succeed
                in examinations and beyond.
              </p>
            </div>

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Group Study Spaces</h3>
              <p>
                Dedicated areas for group discussions and collaborative learning,
                allowing students to work together on projects and support each
                other in their studies.
              </p>
            </div>

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-book-reader"></i>
              </div>
              <h3>Reading Programme</h3>
              <p>
                A structured reading programme encourages students at all levels
                to develop a love of reading — from guided reading sessions in
                the nursery to independent reading challenges in secondary.
              </p>
            </div>

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>Book Borrowing</h3>
              <p>
                Students may borrow books to take home, supporting continued
                learning beyond the classroom and encouraging reading as a
                daily habit.
              </p>
            </div>

            <div className="library-service-card reveal">
              <div className="library-service-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Teacher Resources</h3>
              <p>
                Teachers have access to a dedicated section of professional
                resources, lesson-planning materials, and subject references
                to support their teaching across all levels.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Reading Programme ── */}
      <section className="library-reading">
        <div className="container">
          <div className="library-reading-inner reveal">
            <div className="library-reading-img">
              <img src="/images/secondary/library_2.jpg" alt="Students reading" />
            </div>
            <div className="library-reading-text">
              <span className="library-eyebrow">Reading Programme</span>
              <h2 className="library-reading-heading">Building a Culture of Reading</h2>
              <p>
                At St. Lawrence Academy, we believe that reading is the foundation
                of all learning. Our structured reading programme is designed to
                meet students at every stage of their development — from learning
                to decode words in nursery to analysing complex texts in secondary.
              </p>
              <p>
                Regular reading challenges, class library visits, and teacher-guided
                reading sessions ensure that every student builds confidence, vocabulary,
                and a genuine love for books. The library is not just a room — it is
                a culture we are proud to cultivate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hours Band ── */}
      <div className="library-hours-band">
        <div className="container">
          <div className="library-hours-inner">
            <div className="library-hours-text">
              <span className="library-eyebrow library-eyebrow--light">Opening Hours</span>
              <h2 className="library-hours-heading">The Library is Open Monday to Friday</h2>
              <p>
                Students may visit the library before school, during break,
                and after school hours. The library is closed on weekends.
                Library staff are always present to assist during school days.
              </p>
            </div>
            <div className="library-hours-grid">
              <div className="library-hours-row">
                <span className="library-hours-day">Monday – Friday</span>
                <span className="library-hours-time">7:30 AM – 5:30 PM</span>
              </div>
              <div className="library-hours-row">
                <span className="library-hours-day">Saturday – Sunday</span>
                <span className="library-hours-time">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Closing ── */}
      <section className="library-closing">
        <div className="container">
          <div className="library-closing-inner">
            <span className="library-eyebrow">Visit Us</span>
            <h2 className="library-closing-heading">Come and Explore</h2>
            <p>
              Whether you are looking for a good story, preparing for examinations,
              or simply need a quiet place to think, the St. Lawrence Academy Library
              is your space. Come in — the shelves are waiting.
            </p>
            <a href="/contact" className="library-closing-btn">
              <i className="fas fa-arrow-right"></i> Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Library;
