import { useEffect } from 'react';
import './HealthWellness.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const pillars = [
  {
    num: '01',
    tag: 'Education',
    title: 'Health Awareness & Education',
    body: 'Through structured health education and awareness campaigns embedded in our curriculum, students learn about personal hygiene, disease prevention, nutrition, and healthy living. We equip every student with the knowledge to make informed decisions about their own health.',
  },
  {
    num: '02',
    tag: 'Physical Activity',
    title: 'Physical Fitness & Active Living',
    body: 'Daily physical education classes and regular participation in sports are a core part of life at SLA. Physical activity builds strength, reduces stress, improves concentration, and establishes the habits of an active, healthy lifestyle that students carry into adulthood.',
  },
  {
    num: '03',
    tag: 'Mental Health',
    title: 'Emotional & Mental Wellbeing',
    body: 'We take mental health as seriously as physical health. Teachers are trained to recognise signs of emotional distress and to respond with care and sensitivity. Students are encouraged to speak openly, and pastoral support is always available.',
  },
  {
    num: '04',
    tag: 'Environment',
    title: 'Clean & Safe School Environment',
    body: 'A healthy school starts with a clean and well-maintained environment. From classrooms and toilets to outdoor spaces, SLA maintains high standards of cleanliness and safety — and students are active participants in keeping their school environment healthy.',
  },
  {
    num: '05',
    tag: 'Nutrition',
    title: 'Nutrition & Healthy Eating',
    body: 'Good nutrition supports learning, concentration, and growth. Our dining programme is designed to provide students with balanced, nutritious meals throughout the school day, ensuring every student has the fuel they need to perform at their best.',
  },
  {
    num: '06',
    tag: 'Community',
    title: 'Whole-School Wellbeing',
    body: 'Health and wellness at SLA is not just an individual matter — it is a shared commitment. Staff, students, and families work together to create a school culture where taking care of yourself and others is valued, encouraged, and modelled every day.',
  },
];

const commitments = [
  {
    title: 'Safe Environment',
    body: 'We maintain a clean, safe, and hygienic school environment — from classrooms and sanitation facilities to outdoor spaces and food preparation.',
  },
  {
    title: 'Informed Students',
    body: 'Students receive regular health education so they can recognise health risks, practise good hygiene, and make responsible decisions for their own wellbeing.',
  },
  {
    title: 'Supportive Staff',
    body: 'Every teacher is trained and committed to supporting student wellbeing — noticing changes in behaviour, responding with care, and escalating concerns appropriately.',
  },
  {
    title: 'Family Partnership',
    body: 'We work closely with parents and guardians on matters of student health and wellbeing. Open communication between school and home is essential to every student\'s care.',
  },
];

const HealthWellness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Health & Wellness',
      'Student health and wellness at St. Lawrence Academy — physical health, mental wellbeing, nutrition, and a safe school environment.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="hw-page">

      {/* ── Hero ── */}
      <section className="hw-hero">
        <div className="hw-hero-bg">
          <img src="/images/secondary/assembly_1.JPG" alt="Health and Wellness at St. Lawrence Academy" />
        </div>
        <div className="hw-hero-overlay"></div>
        <div className="hw-hero-content">
          <div className="container">
            <div className="hw-hero-inner">
              <span className="hw-hero-label">Student Support</span>
              <h1 className="hw-hero-title">Health &amp; <span>Wellness</span></h1>
              <p className="hw-hero-sub">
                Caring for the whole student — physical health, mental wellbeing,
                and the habits that support a lifetime of healthy living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="hw-mobile-band">
        <div className="container">
          <h2 className="hw-mobile-band-heading">Health &amp; Wellness</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="hw-intro">
        <div className="container">
          <div className="hw-intro-inner">
            <span className="hw-eyebrow">Whole Student Care</span>
            <h2 className="hw-intro-heading">A Healthy Student Is a Ready Learner</h2>
            <p className="hw-intro-text">
              At St. Lawrence Academy, we understand that academic success depends on
              more than textbooks and teaching. A student who is healthy — physically,
              mentally, and emotionally — is better equipped to learn, engage, and grow.
              Our approach to health and wellness is holistic: built into how we teach,
              how we feed our students, how we design our environment, and how we care
              for every individual in our community.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="hw-pillars">
        <div className="container">
          <div className="hw-section-header">
            <span className="hw-eyebrow">Our Approach</span>
            <h2 className="hw-section-heading">Six Pillars of Student Wellness</h2>
            <p className="hw-section-sub">
              Our wellness programme is built on six connected pillars — each reinforcing
              the others to create a truly healthy school community.
            </p>
          </div>
          <div className="hw-pillars-grid">
            {pillars.map((p) => (
              <div className="hw-pillar-card reveal" key={p.num}>
                <div className="hw-pillar-top">
                  <span className="hw-pillar-num">{p.num}</span>
                  <span className="hw-pillar-tag">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="hw-commitments">
        <div className="container">
          <div className="hw-section-header">
            <span className="hw-eyebrow">Our Standards</span>
            <h2 className="hw-section-heading">What We Commit To</h2>
            <p className="hw-section-sub">
              These are the standards we hold ourselves to in support of every student's
              health and wellbeing at SLA.
            </p>
          </div>
          <div className="hw-commitments-grid">
            {commitments.map((c, idx) => (
              <div className="hw-commitment-card reveal" key={idx}>
                <div className="hw-commitment-head">
                  <h4>{c.title}</h4>
                </div>
                <div className="hw-commitment-body">
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture section ── */}
      <section className="hw-culture">
        <div className="container">
          <div className="hw-culture-inner reveal">
            <div className="hw-culture-visual">
              <img src="/images/nursery/nursery_wave.JPG" alt="Students at St. Lawrence Academy" />
              <div className="hw-culture-badge">
                <span>Healthy</span>
                <span>Body &amp; Mind</span>
              </div>
            </div>
            <div className="hw-culture-text">
              <span className="hw-eyebrow">A Culture of Wellness</span>
              <h2>Health Is a Way of Life at SLA</h2>
              <p>
                Wellness at St. Lawrence Academy is not a programme — it is a culture.
                It is present in the way teachers interact with students, in the food
                served at mealtimes, in the time set aside for physical activity, and
                in the conversations had every day in classrooms and corridors.
              </p>
              <p>
                We believe that young people who understand how to take care of
                themselves — physically, emotionally, and socially — are better
                prepared not just for school, but for the whole of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="hw-closing">
        <div className="container">
          <div className="hw-closing-inner reveal">
            <span className="hw-eyebrow">Your Wellbeing Matters</span>
            <h2>Questions About Student Wellness?</h2>
            <p>
              If you have any concerns about your child's health or wellbeing at school,
              please do not hesitate to reach out to the school administration.
            </p>
            <a href="/contact" className="hw-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HealthWellness;
