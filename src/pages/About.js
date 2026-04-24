import { useEffect } from 'react';
import './About.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('School Profile', 'Learn about St. Lawrence Academy — our mission, vision, values, motto, and slogan in Juba, South Sudan.');
    setTimeout(() => initScrollAnimations(), 100);
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/images/secondary/campus_view_from_above_assembly.JPG" alt="St. Lawrence Academy" />
        </div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <div className="container">
            <div className="about-hero-inner">
              <span className="about-hero-label">St. Lawrence Academy</span>
              <h1 className="about-hero-title">School <span>Profile</span></h1>
              <p className="about-hero-sub">
                Our mission, vision, values, and identity — the foundations that
                guide everything we do at St. Lawrence Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="about-mobile-band">
        <div className="container">
          <h2 className="about-mobile-band-heading">School Profile</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="about-intro">
        <div className="container">
          <div className="about-intro-inner">
            <span className="about-section-eyebrow">Who We Are</span>
            <h2 className="about-section-heading">Excellence in Education Since 2020</h2>
            <p className="about-section-sub">
              St. Lawrence Academy is a leading private school in Juba, South Sudan,
              offering nursery, primary, and secondary education. We are committed to
              academic rigour, moral integrity, and the holistic development of every
              student in our care.
            </p>
          </div>
        </div>
      </section>

      {/* ── Slogan ── */}
      <div className="about-slogan-band">
        <div className="container">
          <span className="about-slogan-label">Our Slogan</span>
          <p className="about-slogan-text">Your Ideal School Where Quality Matters</p>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <section className="about-mv" id="mission">
        <div className="container">
          <div className="about-mv-grid">
            <div className="about-mv-card reveal">
              <span className="about-mv-card-eyebrow">What We Do</span>
              <h3>Our Mission</h3>
              <p>
                To participate in the transformation of society by providing high quality
                education that promotes excellence in the areas of science and technology —
                nurturing critical thinkers, leaders, and responsible citizens of tomorrow.
              </p>
            </div>
            <div className="about-mv-card reveal">
              <span className="about-mv-card-eyebrow">What We Strive For</span>
              <h3>Our Vision</h3>
              <p>
                To be a leading centre of academic excellence in the region and beyond —
                an institution recognised for outstanding results, character formation,
                and the lifelong impact it has on the communities it serves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values" id="values">
        <div className="container">
          <div className="about-values-header">
            <span className="about-section-eyebrow">Guiding Principles</span>
            <h2 className="about-section-heading">Our Core Values</h2>
          </div>
          <div className="about-values-grid">
            {[
              { name: 'Integrity',  desc: 'Upholding honesty and strong moral principles in everything we do, both inside and outside the classroom.' },
              { name: 'Excellence', desc: 'Striving for the highest standards in academic achievement, teaching quality, and character development.' },
              { name: 'Respect',    desc: 'Valuing every individual and fostering a culture of dignity, empathy, and mutual understanding.' },
            ].map(v => (
              <div className="about-value-card reveal" key={v.name}>
                <div className="about-value-initial">{v.name[0]}</div>
                <h3>{v.name}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Motto ── */}
      <section className="about-motto">
        <div className="container">
          <div className="about-motto-inner">
            <span className="about-section-eyebrow">Our Motto</span>
            <p className="about-motto-quote">"Education is the Key of Life"</p>
            <p className="about-motto-desc">
              Without quality education, the future of the citizens and that of the nation
              is bleak. As such, we have set out to provide an education that will impact
              the lives of citizens for a better and more prosperous future.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
