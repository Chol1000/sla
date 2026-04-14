import { useEffect } from 'react';
import './Arts.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const disciplines = [
  {
    tag: 'Performing Arts',
    title: 'Music & Singing',
    body: 'Music is woven into the fabric of St. Lawrence Academy. From morning assemblies to special performances, students engage in singing, choral work, and musical expression that builds confidence, unity, and joy. Our students represent a rich diversity of musical traditions.',
    img: '/sla_assembly.jpg',
  },
  {
    tag: 'Performing Arts',
    title: 'Drama & Theatre',
    body: 'Our drama programme gives students the stage to tell stories, embody characters, and explore the human experience. School productions — performed for families and the wider community — are a highlight of the academic year and a powerful showcase of student talent.',
    img: '/sla_assembly_1.jpg',
  },
  {
    tag: 'Visual Arts',
    title: 'Art & Creative Expression',
    body: 'Students at SLA are encouraged to express themselves through drawing, painting, design, and craft. Art classes nurture creativity, fine motor skills, and an appreciation for beauty. Student work is displayed across the school and celebrated at end-of-year exhibitions.',
    img: '/sla_assembly_2.jpg',
  },
  {
    tag: 'Cultural Arts',
    title: 'Traditional Dance & Movement',
    body: 'Dance at St. Lawrence Academy celebrates the rich cultural heritage of South Sudan and the wider African continent. Students learn traditional and contemporary movement, performing at cultural events, national days, and community celebrations.',
    img: '/sla_school_overview.jpg',
  },
];

const events = [
  {
    title: 'Inter-class Competitions',
    body: 'Classes compete against one another in music, drama, dance, and art — fostering healthy rivalry, school pride, and a platform for every student to perform.',
  },
  {
    title: 'Inter-school Events',
    body: 'SLA students represent the school at external arts and cultural events, showcasing their talent alongside students from other schools in the region.',
  },
  {
    title: 'Welcoming of New Students',
    body: 'New students are formally welcomed into the SLA community at the start of each academic year — a celebration of fresh beginnings and the growing family of St. Lawrence Academy.',
  },
  {
    title: 'Art Exhibition',
    body: 'Student artwork is displayed school-wide and recognised by staff and community members — celebrating creativity and giving students well-deserved recognition for their visual work.',
  },
];

const Arts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Arts & Culture', 'Arts, music, drama, and cultural life at St. Lawrence Academy, Juba.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="arts-page">

      {/* ── Hero ── */}
      <section className="arts-hero">
        <div className="arts-hero-bg">
          <img src="/sla_assembly_2.jpg" alt="Arts and Culture at St. Lawrence Academy" />
        </div>
        <div className="arts-hero-overlay"></div>
        <div className="arts-hero-content">
          <div className="container">
            <div className="arts-hero-inner">
              <span className="arts-hero-label">Student Life</span>
              <h1 className="arts-hero-title">Arts &amp; <span>Culture</span></h1>
              <p className="arts-hero-sub">
                Music, drama, dance, and creative expression — celebrating talent,
                diversity, and the richness of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="arts-mobile-band">
        <div className="container">
          <h2 className="arts-mobile-band-heading">Arts &amp; Culture</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="arts-intro">
        <div className="container">
          <div className="arts-intro-inner">
            <span className="arts-eyebrow">Creative Life at SLA</span>
            <h2 className="arts-intro-heading">Where Talent Meets Heritage</h2>
            <p className="arts-intro-text">
              The arts are not an add-on at St. Lawrence Academy — they are central to
              how we educate the whole child. From our youngest Nursery students to
              Secondary leavers, students are given space to sing, perform, create, and
              celebrate the diverse cultures that make up our school family.
            </p>
          </div>
        </div>
      </section>

      {/* ── Disciplines ── */}
      <section className="arts-disciplines">
        <div className="container">
          <div className="arts-section-header">
            <span className="arts-eyebrow">What We Offer</span>
            <h2 className="arts-section-heading">Our Arts Disciplines</h2>
            <p className="arts-section-sub">
              Students engage with the arts across multiple disciplines throughout their
              time at St. Lawrence Academy.
            </p>
          </div>
          <div className="arts-disciplines-list">
            {disciplines.map((d, i) => (
              <div className="arts-discipline-row reveal" key={i}>
                <div className="arts-discipline-img">
                  <img src={d.img} alt={d.title} />
                </div>
                <div className="arts-discipline-body">
                  <span className="arts-discipline-tag">{d.tag}</span>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cultural Celebration ── */}
      <section className="arts-cultures">
        <div className="container">
          <div className="arts-cultures-inner reveal">
            <div className="arts-cultures-text">
              <span className="arts-eyebrow">Celebrating Diversity</span>
              <h2>A School of Many Cultures</h2>
              <p>
                St. Lawrence Academy is home to students from across South Sudan and
                all over the world. We celebrate the diversity of our community as a
                strength — not just on Cultural Day, but throughout the year in music,
                storytelling, language, food, and art.
              </p>
              <p>
                Every student brings a unique heritage. We welcome all cultures, all
                backgrounds, and all traditions. Students are encouraged to share where
                they come from and take pride in who they are. This is how we build a
                school that truly belongs to everyone.
              </p>
            </div>
            <div className="arts-cultures-visual">
              <img src="/sla_assembly.jpg" alt="Cultural diversity at St. Lawrence Academy" />
              <div className="arts-cultures-visual-badge">
                <span>Everyone</span>
                <span>is Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section className="arts-events">
        <div className="container">
          <div className="arts-section-header">
            <span className="arts-eyebrow">Key Events</span>
            <h2 className="arts-section-heading">Cultural Events &amp; Performances</h2>
            <p className="arts-section-sub">
              These events bring the whole school together to celebrate creativity and culture.
            </p>
          </div>
          <div className="arts-events-grid">
            {events.map((e, i) => (
              <div className="arts-event-card reveal" key={i}>
                <div className="arts-event-head">
                  <h4>{e.title}</h4>
                </div>
                <div className="arts-event-body">
                  <p>{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="arts-closing">
        <div className="container">
          <div className="arts-closing-inner reveal">
            <span className="arts-eyebrow">Get Involved</span>
            <h2>Every Student Has a Gift</h2>
            <p>
              Whether your child loves to sing, paint, dance, or act — there is a place
              for them at St. Lawrence Academy. We look forward to helping every student
              discover and share their creative gifts.
            </p>
            <a href="/contact" className="arts-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Arts;
