import { useEffect } from 'react';
import './Primary.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Primary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Primary School', 'St. Lawrence Academy Primary School — quality education from P1 to P8, building strong foundations in English, Mathematics, Science, and more.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="primary-page">

      {/* ── Hero ── */}
      <section className="primary-hero">
        <div className="primary-hero-bg">
          <img src="/sla_pupils_1.jpg" alt="St. Lawrence Academy Primary School" />
        </div>
        <div className="primary-hero-overlay"></div>
        <div className="primary-hero-content">
          <div className="container">
            <div className="primary-hero-inner">
              <span className="primary-hero-label">St. Lawrence Academy</span>
              <h1 className="primary-hero-title">Primary <span>School</span></h1>
              <p className="primary-hero-sub">
                Eight years of structured, progressive education — building
                strong foundations in literacy, numeracy, science, and values
                that carry every student through life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="primary-mobile-band">
        <div className="container">
          <h2 className="primary-mobile-band-heading">Primary School</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="primary-intro">
        <div className="container">
          <div className="primary-intro-inner">
            <span className="primary-eyebrow">Welcome</span>
            <h2 className="primary-intro-heading">Eight Years That Shape a Lifetime</h2>
            <p className="primary-intro-text">
              Primary school at St. Lawrence Academy spans eight years — Primary One
              through Primary Eight — delivering a nationally aligned curriculum that
              goes beyond examination preparation. We build curious, confident, and
              capable learners ready for secondary school and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="primary-about">
        <div className="container">
          <div className="primary-about-inner reveal">
            <div className="primary-about-img">
              <img src="/sla_pupils_8.jpg" alt="Primary students at St. Lawrence Academy" />
            </div>
            <div className="primary-about-text">
              <span className="primary-eyebrow">Our Approach</span>
              <h2 className="primary-about-heading">Rigorous Teaching in a Caring Environment</h2>
              <p>
                Our primary programme is built on structured teaching, consistent
                assessment, and dedicated teachers who understand their students
                individually. Lessons are purposeful — every class moves children
                forward in measurable, meaningful ways.
              </p>
              <p>
                Beyond academics, primary school at SLA develops character. Students
                learn discipline, respect, and responsibility alongside their
                subject knowledge — so that when they leave for secondary, they
                are well-rounded in every sense.
              </p>
              <div className="primary-about-tags">
                {['P1','P2','P3','P4','P5','P6','P7','P8'].map((p, i) => (
                  <div className="primary-about-tag" key={i}>
                    <div className="primary-about-tag-label">{p}</div>
                    {i < 7 && <div className="primary-about-tag-arrow"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classes P1–P8 ── */}
      <section className="primary-classes" id="classes">
        <div className="container">
          <div className="primary-classes-header">
            <span className="primary-eyebrow">School Years</span>
            <h2 className="primary-classes-heading">Primary One to Primary Eight</h2>
            <p className="primary-classes-sub">
              Each year builds on the last — progressively deepening knowledge,
              raising expectations, and preparing students for the national PLE examination.
            </p>
          </div>
          <div className="primary-classes-track">
            {['P1','P2','P3','P4','P5','P6','P7','P8'].map((label, i) => (
              <div className="primary-track-step" key={i}>
                <div className="primary-track-label">{label}</div>
                <div className="primary-track-line"></div>
              </div>
            ))}
          </div>
          <div className="primary-classes-grid">
            <div className="primary-class-row reveal">
              <div className="primary-class-band">Lower Primary</div>
              <div className="primary-class-desc">
                <strong>P1 – P3</strong> — The foundation years. Students build core literacy and numeracy skills,
                develop classroom habits, and grow in confidence through structured, supportive teaching.
              </div>
            </div>
            <div className="primary-class-row reveal">
              <div className="primary-class-band">Middle Primary</div>
              <div className="primary-class-desc">
                <strong>P4 – P6</strong> — Learning deepens across all subjects. Students develop stronger reading
                comprehension, mathematical reasoning, and begin independent written work.
              </div>
            </div>
            <div className="primary-class-row reveal">
              <div className="primary-class-band">Upper Primary</div>
              <div className="primary-class-desc">
                <strong>P7 – P8</strong> — Examination preparation begins in earnest. Students are rigorously prepared
                for the Primary Leaving Examination (PLE) through intensive revision, past papers, and focused teaching.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="primary-subjects" id="subjects">
        <div className="container">
          <div className="primary-subjects-header">
            <span className="primary-eyebrow">What We Teach</span>
            <h2 className="primary-subjects-heading">Five Core Subjects</h2>
            <p className="primary-subjects-sub">
              Every primary student follows the same five core subjects across all eight years —
              building deep, connected knowledge from the ground up.
            </p>
          </div>
          <div className="primary-subjects-list">

            <div className="primary-subject-item reveal">
              <div className="primary-subject-num">01</div>
              <h3>English</h3>
              <p>Reading, writing, grammar, comprehension, and oral communication. English is the language of instruction and a core subject built across all eight primary years.</p>
            </div>

            <div className="primary-subject-item reveal">
              <div className="primary-subject-num">02</div>
              <h3>Mathematics</h3>
              <p>Number work, arithmetic, fractions, geometry, measurement, and problem-solving built through structured and practical learning throughout all primary years.</p>
            </div>

            <div className="primary-subject-item reveal">
              <div className="primary-subject-num">03</div>
              <h3>Science</h3>
              <p>Exploring the natural world through observation — living things, the human body, materials, forces, and basic environmental science taught progressively.</p>
            </div>

            <div className="primary-subject-item reveal">
              <div className="primary-subject-num">04</div>
              <h3>Social Studies</h3>
              <p>Geography, history, civics, and culture — helping students understand their community, country, and the world as responsible, informed citizens.</p>
            </div>

            <div className="primary-subject-item reveal">
              <div className="primary-subject-num">05</div>
              <h3>Christian Religious Education</h3>
              <p>Bible stories, Christian values, prayer, and moral education — nurturing faith, character, and the ethical principles that guide students through life.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── PLE Examinations ── */}
      <section className="primary-ple">
        <div className="container">
          <div className="primary-ple-inner reveal">
            <div className="primary-ple-text">
              <span className="primary-eyebrow primary-eyebrow--light">National Examination</span>
              <h2 className="primary-ple-heading">The Primary Leaving Examination</h2>
              <p>
                At the end of Primary Eight, students sit the Primary Leaving
                Examination (PLE) — the national assessment that determines
                entry into secondary school. At SLA, we take PLE preparation
                seriously from P7 onwards.
              </p>
              <p>
                Our teachers use structured revision programmes, regular mock
                examinations, and past paper practice to ensure every student
                enters the PLE fully prepared and confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="primary-gallery">
        <div className="container">
          <div className="primary-gallery-header">
            <span className="primary-eyebrow">Life in Primary</span>
            <h2 className="primary-gallery-heading">A Glimpse Inside</h2>
          </div>
          <div className="primary-gallery-row">
            <div className="primary-gallery-cell">
              <img src="/sla_pupils_10.jpg" alt="Primary students learning" />
            </div>
            <div className="primary-gallery-cell">
              <img src="/sla_pupils_11.jpg" alt="Primary classroom" />
            </div>
            <div className="primary-gallery-cell">
              <img src="/sla_pupils_12.jpg" alt="Primary school activity" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="primary-closing">
        <div className="container">
          <div className="primary-closing-inner">
            <span className="primary-eyebrow">Get Started</span>
            <h2 className="primary-closing-heading">Enrol Your Child in Primary School</h2>
            <p>
              Places in our primary classes are limited. We welcome families to visit
              the school and speak with our admissions team about enrolling their child.
            </p>
            <div className="primary-closing-btns">
              <a href="/admissions/apply" className="primary-closing-btn primary-closing-btn--primary">
                <i className="fas fa-pen-alt"></i> Apply Now
              </a>
              <a href="/contact" className="primary-closing-btn primary-closing-btn--outline">
                <i className="fas fa-envelope"></i> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Primary;
