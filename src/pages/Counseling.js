import { useEffect } from 'react';
import './Counseling.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const areas = [
  {
    num: '01',
    tag: 'Academic Growth',
    title: 'Academic Guidance',
    body: 'Teachers work closely with students who are struggling academically — identifying the root cause, helping them build better study habits, manage exam pressure, and set realistic goals. No student is left to struggle alone.',
  },
  {
    num: '02',
    tag: 'Personal Wellbeing',
    title: 'Personal & Emotional Support',
    body: 'When a student is going through a difficult time — personally, socially, or emotionally — their teachers are the first point of care. Every teacher at SLA is trained to listen, respond with empathy, and provide the pastoral support students need.',
  },
  {
    num: '03',
    tag: 'Behaviour & Character',
    title: 'Discipline & Character Formation',
    body: 'Guidance at SLA is not just about correcting behaviour — it is about building character. Teachers engage students in reflective conversations that help them understand their choices, take responsibility, and grow as individuals.',
  },
  {
    num: '04',
    tag: 'Future Planning',
    title: 'Future & Career Guidance',
    body: 'As students approach the end of their secondary education, teachers help them explore career interests, understand their strengths, and make informed decisions about their next steps — whether that is further education, training, or entering the workforce.',
  },
];

const principles = [
  {
    title: 'Open Door',
    body: 'Every teacher maintains an open-door approach. Students are always welcome to approach any member of staff with a concern, question, or personal matter.',
  },
  {
    title: 'Confidentiality',
    body: 'Conversations between students and their teachers are treated with discretion. Students can speak freely, knowing they will be heard with care and respect.',
  },
  {
    title: 'Non-Judgmental',
    body: 'Our teachers engage with every student without judgment — regardless of background, ability, or circumstance. Every student deserves to be understood.',
  },
  {
    title: 'Whole Child',
    body: 'We see each student as a complete person — not just a learner. Academic progress, emotional health, and social development all matter equally at SLA.',
  },
];

const Counseling = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Student Counseling',
      'Pastoral care and student support at St. Lawrence Academy — teachers who guide, listen, and support every student\'s growth.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="cns-page">

      {/* ── Hero ── */}
      <section className="cns-hero">
        <div className="cns-hero-bg">
          <img src="/sla_assembly_2.jpg" alt="Student support at St. Lawrence Academy" />
        </div>
        <div className="cns-hero-overlay"></div>
        <div className="cns-hero-content">
          <div className="container">
            <div className="cns-hero-inner">
              <span className="cns-hero-label">Student Support</span>
              <h1 className="cns-hero-title">Student <span>Counseling</span></h1>
              <p className="cns-hero-sub">
                Our teachers are more than educators — they are mentors, guides,
                and a trusted source of support for every student at SLA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="cns-mobile-band">
        <div className="container">
          <h2 className="cns-mobile-band-heading">Student Counseling</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="cns-intro">
        <div className="container">
          <div className="cns-intro-inner">
            <span className="cns-eyebrow">Pastoral Care</span>
            <h2 className="cns-intro-heading">Teachers Who Care for the Whole Student</h2>
            <p className="cns-intro-text">
              At St. Lawrence Academy, the relationship between teacher and student
              extends beyond the classroom. Our teachers serve as counselors and mentors —
              providing academic guidance, personal support, and pastoral care as a natural
              part of how we educate. Every student has a trusted adult to turn to,
              someone who knows them, understands their journey, and is committed to
              helping them succeed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature ── */}
      <section className="cns-feature">
        <div className="cns-feature-img">
          <img src="/sla_assembly.jpg" alt="Teachers and students at St. Lawrence Academy" />
          <div className="cns-feature-overlay">
            <blockquote>
              "A good teacher is like a candle — it consumes itself to light the way for others."
              <cite>— Mustafa Kemal Atatürk</cite>
            </blockquote>
          </div>
        </div>
        <div className="cns-feature-text">
          <span className="cns-eyebrow">More Than a Teacher</span>
          <h2>A Trusted Adult in Every Classroom</h2>
          <p>
            At SLA, every teacher takes personal responsibility for the wellbeing
            of the students in their care. They notice when something is wrong, create
            space for honest conversations, and respond with both authority and compassion.
          </p>
          <p>
            This culture of pastoral care is embedded in how we train, appoint, and
            support our staff. It is not an add-on — it is central to what it means
            to be a teacher at St. Lawrence Academy.
          </p>
        </div>
      </section>

      {/* ── Support Areas ── */}
      <section className="cns-areas">
        <div className="container">
          <div className="cns-section-header">
            <span className="cns-eyebrow">How We Support Students</span>
            <h2 className="cns-section-heading">Areas of Guidance &amp; Support</h2>
            <p className="cns-section-sub">
              Our teachers provide guidance across every aspect of a student's life at school
              — academic, personal, behavioural, and future-focused.
            </p>
          </div>
          <div className="cns-areas-grid">
            {areas.map((a) => (
              <div className="cns-area-card reveal" key={a.num}>
                <div className="cns-area-top">
                  <span className="cns-area-num">{a.num}</span>
                  <span className="cns-area-tag">{a.tag}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="cns-principles">
        <div className="container">
          <div className="cns-section-header">
            <span className="cns-eyebrow">Our Approach</span>
            <h2 className="cns-section-heading">How We Engage with Every Student</h2>
            <p className="cns-section-sub">
              These principles guide every interaction between our teachers and the
              students they support.
            </p>
          </div>
          <div className="cns-principles-grid">
            {principles.map((p, idx) => (
              <div className="cns-principle-card reveal" key={idx}>
                <div className="cns-principle-head">
                  <h4>{p.title}</h4>
                </div>
                <div className="cns-principle-body">
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="cns-closing">
        <div className="container">
          <div className="cns-closing-inner reveal">
            <span className="cns-eyebrow">We Are Here</span>
            <h2>You Don't Have to Face It Alone</h2>
            <p>
              Whether you are a student who needs to talk, or a parent with concerns
              about your child's wellbeing, our school community is here to support you.
              Reach out to us at any time.
            </p>
            <a href="/contact" className="cns-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Counseling;
