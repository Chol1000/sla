import { useEffect } from 'react';
import './DiningServices.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const meals = [
  {
    icon: 'fas fa-sun',
    label: 'Break',
    title: 'Morning Break',
    body: 'A mid-morning break gives students the chance to rest, recharge, and enjoy a light snack before returning to lessons. Break time is an important part of the school rhythm — supporting focus and energy for the rest of the morning.',
  },
  {
    icon: 'fas fa-utensils',
    label: 'Lunch',
    title: 'Lunch',
    body: 'A hot, freshly prepared midday meal is served to all students. Lunch is the main meal of the school day — nutritionally balanced with proteins, carbohydrates, and vegetables to sustain students through the afternoon.',
  },
  {
    icon: 'fas fa-moon',
    label: 'Supper',
    title: 'Supper & Dinner',
    body: 'For students who remain at school into the evening, a warm and satisfying supper is provided. We ensure that every student ends their school day well-nourished and ready for rest.',
  },
];

const standards = [
  {
    title: 'Cooked Fresh Daily',
    body: 'Meals are prepared from scratch every day. Students are never served reheated or leftover food — fresh preparation is a non-negotiable part of how our kitchen operates.',
  },
  {
    title: 'Clean & Safe Kitchen',
    body: 'Our kitchen and dining area are kept clean and well-maintained at all times. Hygiene is taken seriously — from the preparation surfaces to the utensils and serving areas.',
  },
  {
    title: 'Consistent Every Term',
    body: 'Students can rely on meals being served at the same times every school day, throughout every term. Consistency is important — a student who knows food is coming can focus on learning.',
  },
  {
    title: 'No Student Goes Without',
    body: 'Every student at SLA is entitled to their meals regardless of circumstance. We make sure that no child sits in class hungry — because we know what a difference that makes.',
  },
];

const DiningServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Dining Services',
      'School dining services at St. Lawrence Academy — nutritious, freshly prepared meals served daily to support student health and learning.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="ds-page">

      {/* ── Hero ── */}
      <section className="ds-hero">
        <div className="ds-hero-bg">
          <img src="/sla_school_overview.jpg" alt="Dining at St. Lawrence Academy" />
        </div>
        <div className="ds-hero-overlay"></div>
        <div className="ds-hero-content">
          <div className="container">
            <div className="ds-hero-inner">
              <span className="ds-hero-label">Student Support</span>
              <h1 className="ds-hero-title">Dining <span>Services</span></h1>
              <p className="ds-hero-sub">
                Nutritious, freshly prepared meals served daily — fuelling our
                students with the energy and nourishment they need to learn and thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="ds-mobile-band">
        <div className="container">
          <h2 className="ds-mobile-band-heading">Dining Services</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="ds-intro">
        <div className="container">
          <div className="ds-intro-inner">
            <span className="ds-eyebrow">Nourishing Every Student</span>
            <h2 className="ds-intro-heading">Good Food Is Good Learning</h2>
            <p className="ds-intro-text">
              At St. Lawrence Academy, we believe that a well-nourished student is a
              better learner. Our dining programme ensures every student has access to
              affordable, freshly prepared, and nutritionally balanced meals throughout
              the school day — giving them the energy to concentrate, participate, and
              perform at their best.
            </p>
          </div>
        </div>
      </section>

      {/* ── Meals ── */}
      <section className="ds-meals">
        <div className="container">
          <div className="ds-section-header">
            <span className="ds-eyebrow">Daily Meals</span>
            <h2 className="ds-section-heading">Three Meals, Every Day</h2>
            <p className="ds-section-sub">
              Students are provided with three meals throughout the school day —
              each prepared fresh and served with care.
            </p>
          </div>
          <div className="ds-meals-grid">
            {meals.map((m, idx) => (
              <div className="ds-meal-card reveal" key={idx}>
                <div className="ds-meal-head">
                  <div className="ds-meal-icon">
                    <i className={m.icon}></i>
                  </div>
                  <div>
                    <span className="ds-meal-label">{m.label}</span>
                    <h3>{m.title}</h3>
                  </div>
                </div>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Standards ── */}
      <section className="ds-standards">
        <div className="container">
          <div className="ds-section-header">
            <span className="ds-eyebrow">Our Promise</span>
            <h2 className="ds-section-heading">Our Dining Standards</h2>
            <p className="ds-section-sub">
              Every meal served at St. Lawrence Academy is prepared and delivered
              to these standards — no exceptions.
            </p>
          </div>
          <div className="ds-standards-grid">
            {standards.map((s, idx) => (
              <div className="ds-standard-card reveal" key={idx}>
                <div className="ds-standard-head">
                  <h4>{s.title}</h4>
                </div>
                <div className="ds-standard-body">
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature ── */}
      <section className="ds-feature">
        <div className="container">
          <div className="ds-feature-inner reveal">
            <div className="ds-feature-visual">
              <img src="/sla_assembly.jpg" alt="Students at St. Lawrence Academy" />
              <div className="ds-feature-badge">
                <span>Fresh &amp;</span>
                <span>Nutritious</span>
              </div>
            </div>
            <div className="ds-feature-text">
              <span className="ds-eyebrow">Our Kitchen</span>
              <h2>Prepared with Care, Every Day</h2>
              <p>
                Our kitchen team prepares fresh meals daily from locally sourced
                ingredients wherever possible. We take pride in the quality,
                cleanliness, and variety of what we serve — because we know that
                the food a student eats at school makes a real difference to
                their day, their focus, and their health.
              </p>
              <p>
                We work to accommodate the diverse tastes and needs of our student
                body, and we welcome feedback from students and parents to help us
                continuously improve the dining experience at SLA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="ds-closing">
        <div className="container">
          <div className="ds-closing-inner reveal">
            <span className="ds-eyebrow">Questions?</span>
            <h2>Dietary Requirements or Concerns?</h2>
            <p>
              If your child has a food allergy, a medical dietary requirement, or
              you have any concerns about our dining services, please contact the
              school administration before the start of term.
            </p>
            <a href="/contact" className="ds-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DiningServices;
