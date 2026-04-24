import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Campus.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Campus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Campus & Facilities', 'Explore the St. Lawrence Academy campus — nursery, primary, and secondary facilities in Juba, South Sudan.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="campus-page">

      {/* ── Hero ── */}
      <section className="campus-hero">
        <div className="campus-hero-bg">
          <img src="/images/primary/primary_school_gate.JPG" alt="St. Lawrence Academy Campus" />
        </div>
        <div className="campus-hero-overlay"></div>
        <div className="campus-hero-content">
          <div className="container">
            <div className="campus-hero-inner">
              <span className="campus-hero-label">St. Lawrence Academy</span>
              <h1 className="campus-hero-title">Our <span>Campus</span></h1>
              <p className="campus-hero-sub">
                A modern, well-equipped learning environment built to inspire
                students across all three academic levels — nursery through secondary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="campus-mobile-band">
        <div className="container">
          <h2 className="campus-mobile-band-heading">Campus &amp; Facilities</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="campus-intro">
        <div className="container">
          <div className="campus-intro-inner">
            <span className="campus-eyebrow">Our Facilities</span>
            <h2 className="campus-intro-heading">A Campus Built for Excellence</h2>
            <p className="campus-intro-text">
              St. Lawrence Academy provides a safe, inspiring, and well-resourced
              environment for every learner. From our welcoming nursery classrooms to
              our modern secondary science labs, every space is intentionally designed
              to support student growth, curiosity, and achievement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="campus-location">
        <div className="container">
          <div className="campus-location-inner">

            <div className="campus-location-text reveal">
              <span className="campus-eyebrow">Where We Are</span>
              <h2 className="campus-location-heading">Located in the Heart of Juba</h2>
              <p>
                St. Lawrence Academy is situated in Juba, the capital city of South
                Sudan. Our campus occupies a spacious, purpose-built site designed to
                give students room to learn, explore, and grow in a secure and
                well-managed environment.
              </p>
              <p>
                The school is easily accessible from across the city, with a clearly
                marked entrance and ample space for school transport and parent
                drop-off. Our gates open to a welcoming compound that immediately
                communicates the school's commitment to order, safety, and pride.
              </p>
              <div className="campus-location-details">
                <div className="campus-location-detail">
                  <span className="campus-location-detail-label">City</span>
                  <span className="campus-location-detail-value">Juba, South Sudan</span>
                </div>
                <div className="campus-location-detail">
                  <span className="campus-location-detail-label">Levels</span>
                  <span className="campus-location-detail-value">Nursery · Primary · Secondary</span>
                </div>
                <div className="campus-location-detail">
                  <span className="campus-location-detail-label">Students</span>
                  <span className="campus-location-detail-value">1,500+</span>
                </div>
              </div>
            </div>

            <div className="campus-location-img reveal">
              <img src="/images/secondary/school_gate.jpg" alt="St. Lawrence Academy entrance" />
            </div>

          </div>
        </div>
      </section>

      {/* ── Levels ── */}
      <section className="campus-levels">
        <div className="container">

          {/* Nursery */}
          <div className="campus-level reveal">
            <div className="campus-level-header">
              <div className="campus-level-info">
                <p className="campus-level-number">01</p>
                <span className="campus-level-tag">Early Childhood</span>
                <h2 className="campus-level-name">Nursery School</h2>
                <p className="campus-level-desc">
                  Our nursery is a warm and stimulating space where the youngest
                  learners take their first steps in education. Bright classrooms,
                  safe outdoor play areas, and dedicated early-childhood teachers
                  create an environment where curiosity and creativity are nurtured
                  from day one. Each classroom is equipped with age-appropriate
                  learning materials, and our schedule balances structured learning
                  with free play to support the whole child.
                </p>
              </div>
              <img
                className="campus-level-feature"
                src="/images/nursery/nursery.JPG"
                alt="Nursery School"
              />
            </div>
            <div className="campus-level-grid">
              <div className="campus-level-grid-item">
                <img src="/images/nursery/nursery_group_pic.JPG" alt="Nursery" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/nursery/nursery_kids.JPG" alt="Nursery" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/nursery/nursery_pic.JPG" alt="Nursery" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/nursery/nursery_pic_1.JPG" alt="Nursery" />
              </div>
            </div>
            <div className="campus-gallery-link">
              <Link to="/gallery?cat=Nursery" className="campus-gallery-btn">
                <i className="fas fa-images"></i> Visit Gallery for More Images
              </Link>
            </div>
          </div>

          <div className="campus-divider"></div>

          {/* Primary */}
          <div className="campus-level reveal">
            <div className="campus-level-header campus-level-header--reverse">
              <div className="campus-level-info">
                <p className="campus-level-number">02</p>
                <span className="campus-level-tag">Foundation Years</span>
                <h2 className="campus-level-name">Primary School</h2>
                <p className="campus-level-desc">
                  Our primary classrooms are purposefully designed to encourage
                  active learning and collaborative thinking. Students benefit from
                  well-resourced rooms, structured timetables, and dedicated teachers
                  who give each child the attention they need to thrive. The primary
                  section also includes dedicated spaces for reading, group work, and
                  creative activities, ensuring that learning extends well beyond
                  the textbook.
                </p>
              </div>
              <img
                className="campus-level-feature"
                src="/images/primary/primary_campus.jpg"
                alt="Primary School"
              />
            </div>
            <div className="campus-level-grid">
              <div className="campus-level-grid-item">
                <img src="/images/primary/pupils.JPG" alt="Primary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/primary/pupils_1.JPG" alt="Primary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/primary/pupils_pic.JPG" alt="Primary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/primary/pupils_pic_1.JPG" alt="Primary" />
              </div>
            </div>
            <div className="campus-gallery-link">
              <Link to="/gallery?cat=Primary" className="campus-gallery-btn">
                <i className="fas fa-images"></i> Visit Gallery for More Images
              </Link>
            </div>
          </div>

          <div className="campus-divider"></div>

          {/* Secondary */}
          <div className="campus-level reveal">
            <div className="campus-level-header">
              <div className="campus-level-info">
                <p className="campus-level-number">03</p>
                <span className="campus-level-tag">Senior Education</span>
                <h2 className="campus-level-name">Secondary School</h2>
                <p className="campus-level-desc">
                  The secondary section provides a rigorous academic environment
                  equipped for serious study. With dedicated science laboratories,
                  a well-stocked library, computer access, and experienced subject
                  teachers, our secondary students are fully prepared for national
                  examinations and the opportunities that follow. Classrooms are
                  spacious and well-lit, designed to foster focus, discussion,
                  and independent thinking.
                </p>
              </div>
              <img
                className="campus-level-feature"
                src="/images/secondary/secondary_students.JPG"
                alt="Secondary School"
              />
            </div>
            <div className="campus-level-grid">
              <div className="campus-level-grid-item">
                <img src="/images/secondary/students_5.JPG" alt="Secondary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/secondary/students_in_class.JPG" alt="Secondary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/secondary/admin_with_students.JPG" alt="Secondary" />
              </div>
              <div className="campus-level-grid-item">
                <img src="/images/secondary/sla_students_25.jpg" alt="Secondary" />
              </div>
            </div>
            <div className="campus-gallery-link">
              <Link to="/gallery?cat=Secondary" className="campus-gallery-btn">
                <i className="fas fa-images"></i> Visit Gallery for More Images
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="campus-grounds" id="gallery">
        <div className="container">
          <div className="campus-grounds-header">
            <span className="campus-eyebrow">Photo Gallery</span>
            <h2 className="campus-grounds-heading">School Grounds &amp; Common Areas</h2>
            <p className="campus-grounds-sub">
              A look at the wider campus — from the school entrance and assembly
              grounds to the common areas that bring our community together.
            </p>
          </div>
          <div className="campus-grounds-grid">
            {[
              '/images/secondary/school_view.jpg',
              '/images/secondary/assembly.JPG',
              '/images/primary/school_view_4.jpg',
              '/images/secondary/assembly_1.JPG',
            ].map((img, i) => (
              <div className="campus-grounds-item" key={i}>
                <img src={img} alt={`Campus grounds ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Campus;
