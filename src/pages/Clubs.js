import { useEffect } from 'react';
import './Clubs.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const featuredClubs = [
  {
    label: 'Featured Club',
    title: 'Debate Club',
    body: 'The SLA Debate Club trains students to research, argue, and communicate with confidence. Members participate in structured debates on current affairs, social issues, and academic topics, developing critical thinking and public speaking skills that serve them throughout life.',
    img: '/sla_assembly.jpg',
  },
  {
    label: 'Featured Club',
    title: 'Environmental Club',
    body: 'The Environmental Club raises awareness about sustainability, conservation, and the natural world. Members lead school-wide initiatives including tree planting, clean-up drives, recycling campaigns, and environmental education for younger students.',
    img: '/sla_school_overview.jpg',
  },
  {
    label: 'Featured Club',
    title: 'Health & Wellness Club',
    body: 'The Health Club promotes physical and mental wellbeing across the school. Activities include health awareness campaigns, peer education sessions, and community outreach on hygiene, nutrition, and mental health.',
    img: '/sla_assembly_1.jpg',
  },
  {
    label: 'Featured Club',
    title: 'Journalism Club',
    body: 'Our Journalism Club gives students a platform to write, report, and tell stories. Members contribute to the school newsletter, produce written features on school life and current events, and develop skills of researching, interviewing, and writing for a real audience.',
    img: '/sla_assembly_2.jpg',
  },
];

const otherClubs = [
  { title: 'Football Club',       body: 'Students passionate about football meet regularly for training, tactics, and friendly inter-class matches.' },
  { title: 'Basketball Club',     body: 'An extension of our athletics programme — open to students who want extra court time and skills training.' },
  { title: 'Volleyball Club',     body: 'Recreational and competitive play for students across all levels who love the game.' },
  { title: 'Science Club',        body: 'Experiments, investigations, and STEM challenges beyond the classroom curriculum.' },
  { title: 'Mathematics Club',    body: 'Problem-solving competitions, puzzles, and applied maths for curious minds.' },
  { title: 'Reading Club',        body: 'A safe, quiet space for students who love books to share and discuss what they read.' },
  { title: 'Agriculture Club',    body: 'Hands-on learning about growing food, farming practices, and food security.' },
  { title: 'Christian Union',     body: 'Faith-based fellowship, Bible study, and community service activities.' },
  { title: 'Student Council',     body: 'Representative body giving students a voice in school decision-making.' },
];

const benefits = [
  { title: 'Leadership',         body: 'Clubs give students the chance to lead, organise, and take responsibility for others.' },
  { title: 'Confidence',         body: 'Speaking, performing, and contributing in a group builds self-assurance and voice.' },
  { title: 'Friendship',         body: 'Students from different classes and levels bond over shared passions and interests.' },
  { title: 'Real-World Skills',  body: 'Whether journalism, environment, or debate — every club builds skills for life.' },
];

const Clubs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Clubs & Societies', 'Student clubs and societies at St. Lawrence Academy — debate, environmental, journalism, health and more.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="clubs-page">

      {/* ── Hero ── */}
      <section className="clubs-hero">
        <div className="clubs-hero-bg">
          <img src="/sla_assembly.jpg" alt="St. Lawrence Academy Clubs" />
        </div>
        <div className="clubs-hero-overlay"></div>
        <div className="clubs-hero-content">
          <div className="container">
            <div className="clubs-hero-inner">
              <span className="clubs-hero-label">Student Life</span>
              <h1 className="clubs-hero-title">Clubs &amp; <span>Societies</span></h1>
              <p className="clubs-hero-sub">
                Beyond the classroom, students grow as leaders, thinkers, and
                contributors through our vibrant range of clubs and societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="clubs-mobile-band">
        <div className="container">
          <h2 className="clubs-mobile-band-heading">Clubs &amp; Societies</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="clubs-intro">
        <div className="container">
          <div className="clubs-intro-inner">
            <span className="clubs-eyebrow">Student Clubs</span>
            <h2 className="clubs-intro-heading">Find Your Passion. Build Your Voice.</h2>
            <p className="clubs-intro-text">
              St. Lawrence Academy offers a growing range of clubs and societies that
              complement academic life and nurture the whole student. Whether a child
              is passionate about science, the environment, journalism, or faith, there
              is a place for them to connect, contribute, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Clubs ── */}
      <section className="clubs-main">
        <div className="container">
          <div className="clubs-section-header">
            <span className="clubs-eyebrow">Key Clubs</span>
            <h2 className="clubs-section-heading">Our Featured Clubs</h2>
            <p className="clubs-section-sub">
              These clubs are at the heart of student life at SLA — each with
              dedicated sessions, active membership, and real-world impact.
            </p>
          </div>
          <div className="clubs-featured-grid">
            {featuredClubs.map((club, i) => (
              <div className="clubs-feature-card reveal" key={i}>
                <div className="clubs-feature-img">
                  <img src={club.img} alt={club.title} />
                  <div className="clubs-feature-img-overlay"></div>
                  <span className="clubs-feature-label">{club.label}</span>
                </div>
                <div className="clubs-feature-body">
                  <h3>{club.title}</h3>
                  <p>{club.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Clubs ── */}
      <section className="clubs-other">
        <div className="container">
          <div className="clubs-section-header">
            <span className="clubs-eyebrow">More Clubs</span>
            <h2 className="clubs-section-heading">Also at SLA</h2>
            <p className="clubs-section-sub">
              Our list of clubs continues to grow as students bring new ideas and
              interests to school life.
            </p>
          </div>
          <div className="clubs-other-grid">
            {otherClubs.map((c, i) => (
              <div className="clubs-other-card reveal" key={i}>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="clubs-benefits">
        <div className="container">
          <div className="clubs-section-header">
            <span className="clubs-eyebrow">Why It Matters</span>
            <h2 className="clubs-section-heading">What Students Gain</h2>
          </div>
          <div className="clubs-benefits-grid">
            {benefits.map((b, i) => (
              <div className="clubs-benefit-card reveal" key={i}>
                <div className="clubs-benefit-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{b.title}</h4>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="clubs-closing">
        <div className="container">
          <div className="clubs-closing-inner reveal">
            <span className="clubs-eyebrow">Get Involved</span>
            <h2>Join a Club Today</h2>
            <p>
              Students can join clubs at the start of each term. Speak to your
              class teacher or ask the school administration for the current
              schedule of club meetings.
            </p>
            <a href="/contact" className="clubs-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Clubs;
