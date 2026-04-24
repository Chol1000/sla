import { useEffect } from 'react';
import './CommunityService.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const initiatives = [
  {
    num: '01',
    icon: 'fas fa-broom',
    tag: 'Environment',
    title: 'Campus & Community Clean-Ups',
    body: 'Students take responsibility for the cleanliness of their school and surrounding neighbourhood. Regular clean-up drives teach environmental stewardship, civic pride, and the value of caring for shared spaces.',
  },
  {
    num: '02',
    icon: 'fas fa-book-open',
    tag: 'Education',
    title: 'Peer Tutoring & Mentoring',
    body: 'Senior students mentor younger ones through organised tutoring sessions and study circles. The programme builds academic confidence in younger students while developing leadership and communication skills in mentors.',
  },
  {
    num: '03',
    icon: 'fas fa-hands-helping',
    tag: 'Social Impact',
    title: 'Community Outreach',
    body: 'SLA students visit community members in need — the elderly, orphaned children, and families facing hardship. These visits nurture empathy, gratitude, and a deep sense of social responsibility that lasts a lifetime.',
  },
  {
    num: '04',
    icon: 'fas fa-seedling',
    tag: 'Environment',
    title: 'School Garden & Green Spaces',
    body: 'Our school garden is student-maintained — planting, watering, and harvesting throughout the academic year. Students learn about agriculture, sustainability, and the direct connection between effort and growth.',
  },
  {
    num: '05',
    icon: 'fas fa-paint-roller',
    tag: 'Infrastructure',
    title: 'School Improvement Projects',
    body: 'Students participate in painting, repairs, and beautification of school facilities. Taking ownership of their environment builds pride, responsibility, and a lasting bond with their school.',
  },
  {
    num: '06',
    icon: 'fas fa-hand-holding-heart',
    tag: 'Charity',
    title: 'Fundraising & Donations',
    body: 'Charity drives, collection campaigns, and fundraising events organised by students raise resources for those in need — teaching generosity, teamwork, and the power of collective action.',
  },
];

const values = [
  {
    title: 'Responsibility',
    body: 'Every student has a duty to contribute positively to their community — not because it is required, but because it is right.',
  },
  {
    title: 'Empathy',
    body: 'Serving others opens the heart. Students gain perspective and compassion that shapes who they become for life.',
  },
  {
    title: 'Leadership',
    body: 'Community service is one of the best training grounds for real leadership — identifying needs, mobilising peers, measuring impact.',
  },
  {
    title: 'Pride',
    body: 'When students improve their school and community with their own hands, they develop a pride of ownership that stays with them forever.',
  },
];

const CommunityService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Community Service',
      'Community service and outreach at St. Lawrence Academy — students giving back to school and community.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="cs-page">

      {/* ── Hero ── */}
      <section className="cs-hero">
        <div className="cs-hero-bg">
          <img src="/images/secondary/community_service.jpg" alt="Community Service at St. Lawrence Academy" />
        </div>
        <div className="cs-hero-overlay"></div>
        <div className="cs-hero-content">
          <div className="container">
            <div className="cs-hero-inner">
              <span className="cs-hero-label">Student Life</span>
              <h1 className="cs-hero-title">Community <span>Service</span></h1>
              <p className="cs-hero-sub">
                Giving back, building up, and making a difference — SLA students
                serve their school and community with pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="cs-mobile-band">
        <div className="container">
          <h2 className="cs-mobile-band-heading">Community Service</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="cs-intro">
        <div className="container">
          <div className="cs-intro-inner">
            <span className="cs-eyebrow">Our Commitment</span>
            <h2 className="cs-intro-heading">Serving Beyond the Classroom</h2>
            <p className="cs-intro-text">
              At St. Lawrence Academy, education is about more than academic achievement.
              We believe that students who serve their communities become better human beings —
              more aware, more compassionate, and more capable of leading meaningful lives.
              Community service is embedded in our school culture, not as a requirement,
              but as a reflection of who we are.
            </p>
          </div>
        </div>
      </section>

      {/* ── Initiatives grid ── */}
      <section className="cs-initiatives">
        <div className="container">
          <div className="cs-section-header">
            <span className="cs-eyebrow">What We Do</span>
            <h2 className="cs-section-heading">Our Service Initiatives</h2>
            <p className="cs-section-sub">
              Students engage in a range of service activities throughout the academic year,
              contributing to both the school and the wider community.
            </p>
          </div>
          <div className="cs-initiatives-grid">
            {initiatives.map((item) => (
              <div className="cs-initiative-card reveal" key={item.num}>
                <div className="cs-initiative-top">
                  <span className="cs-initiative-num">{item.num}</span>
                </div>
                <span className="cs-initiative-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact strip ── */}
      <section className="cs-impact-strip">
        <div className="container">
          <div className="cs-impact-inner reveal">
            <div className="cs-impact-photo">
              <img src="/images/secondary/community_service.jpg" alt="SLA students serving" />
            </div>
            <div className="cs-impact-quote">
              <i className="fas fa-quote-left cs-impact-icon"></i>
              <blockquote>
                "The measure of a person is what they do with what they have."
              </blockquote>
              <cite>— Epictetus, Greek Stoic Philosopher</cite>
              <p className="cs-impact-caption">
                From the very first term, SLA students are immersed in a culture of
                service. Our teachers and school leadership actively participate
                alongside students — modelling humility, hard work, and a genuine
                concern for others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="cs-values">
        <div className="container">
          <div className="cs-section-header">
            <span className="cs-eyebrow">Why It Matters</span>
            <h2 className="cs-section-heading">Values We Build Through Service</h2>
            <p className="cs-section-sub">
              Every act of service — large or small — shapes the character of our
              students in ways that last far beyond their time at school.
            </p>
          </div>
          <div className="cs-values-grid">
            {values.map((v, idx) => (
              <div className="cs-value-row reveal" key={idx}>
                <div className="cs-value-accent"></div>
                <div className="cs-value-content">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="cs-closing">
        <div className="container">
          <div className="cs-closing-inner reveal">
            <span className="cs-eyebrow">Get Involved</span>
            <h2>Join Us in Making a Difference</h2>
            <p>
              We welcome parents, alumni, and community partners to join us in our
              service efforts. Together, we can make an even greater impact on the
              students and families we serve.
            </p>
            <a href="/contact" className="cs-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CommunityService;
