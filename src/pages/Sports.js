import { useState, useEffect, useCallback } from 'react';
import './Sports.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const mainSports = [
  {
    tag: 'Main Sport',
    title: 'Basketball',
    body: 'Basketball is one of the most popular sports at St. Lawrence Academy. Our teams compete at inter-school level, with separate squads for boys and girls. Training takes place on the school\'s outdoor court throughout the year.',
    images: [
      '/sla_basketball_1.jpg',
      '/sla_basketball_2.jpg',
      '/sla_basketball_3.jpg',
      '/sla_basketball_4.jpg',
      '/sla_basketball_5.jp',
    ],
  },
  {
    tag: 'Main Sport',
    title: 'Football',
    body: 'Football brings our school community together like nothing else. Our teams train regularly and take part in local competitions and friendly matches. The game is open to all students across Primary and Secondary.',
    images: [
      '/sla_school_overview.jpg',
      '/sla_assembly.jpg',
      '/sla_assembly_1.jpg',
      '/sla_assembly_2.jpg',
      '/sla_baskeltball.jpg',
    ],
  },
  {
    tag: 'Main Sport',
    title: 'Volleyball',
    body: 'Volleyball is played and loved across all school levels at SLA. Our courts provide a great space for students to develop teamwork, communication, and athletic skill in a fun and competitive environment.',
    images: [
      '/sla_assembly.jpg',
      '/sla_assembly_1.jpg',
      '/sla_assembly_2.jpg',
      '/sla_basketball_1.jpg',
      '/sla_school_overview.jpg',
    ],
  },
  {
    tag: 'Main Sport',
    title: 'Athletics & Track',
    body: 'Our athletics programme covers running, jumping, and field events. Students represent the school at inter-school athletics meets and national youth competitions throughout the year.',
    images: [
      '/sla_assembly_1.jpg',
      '/sla_assembly_2.jpg',
      '/sla_basketball_2.jpg',
      '/sla_basketball_3.jpg',
      '/sla_school_overview.jpg',
    ],
  },
];

const values = [
  { title: 'Teamwork',   body: 'Every sport at SLA teaches students to work together, communicate, and rely on one another — skills that serve them well beyond the field.' },
  { title: 'Discipline', body: 'Training builds character. Students learn the value of consistency, showing up, and putting in effort even when it is difficult.' },
  { title: 'Fair Play',  body: 'We uphold the highest standards of sportsmanship. Respect for opponents, officials, and teammates is non-negotiable at St. Lawrence Academy.' },
];

const Sports = () => {
  const [activeSlides, setActiveSlides] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });

  const goTo = useCallback((sportIdx, slideIdx) => {
    setActiveSlides(prev => ({ ...prev, [sportIdx]: slideIdx }));
  }, []);

  const prev = useCallback((sportIdx, total) => {
    setActiveSlides(prev => ({
      ...prev,
      [sportIdx]: (prev[sportIdx] - 1 + total) % total,
    }));
  }, []);

  const next = useCallback((sportIdx, total) => {
    setActiveSlides(prev => ({
      ...prev,
      [sportIdx]: (prev[sportIdx] + 1) % total,
    }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Sports & Athletics', 'Sports programmes at St. Lawrence Academy — basketball, football, volleyball, athletics and more.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="sports-page">

      {/* ── Hero ── */}
      <section className="sports-hero">
        <div className="sports-hero-bg">
          <img src="/sla_basketball_1.jpg" alt="St. Lawrence Academy Sports" />
        </div>
        <div className="sports-hero-overlay"></div>
        <div className="sports-hero-content">
          <div className="container">
            <div className="sports-hero-inner">
              <span className="sports-hero-label">Student Life</span>
              <h1 className="sports-hero-title">Sports &amp; <span>Athletics</span></h1>
              <p className="sports-hero-sub">
                Competitive sport, physical development, and the values of teamwork
                and fair play — at the heart of life at St. Lawrence Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="sports-mobile-band">
        <div className="container">
          <h2 className="sports-mobile-band-heading">Sports &amp; Athletics</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="sports-intro">
        <div className="container">
          <div className="sports-intro-inner">
            <span className="sports-eyebrow">Athletics Programme</span>
            <h2 className="sports-intro-heading">Sport is Central to Life at SLA</h2>
            <p className="sports-intro-text">
              At St. Lawrence Academy, we believe physical education and competitive sport
              are essential to a child's development. Our sports programme is open to all
              students from Nursery through Secondary, with dedicated training, inter-school
              competition, and a culture that celebrates effort, discipline, and team spirit.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Sports ── */}
      <section className="sports-main">
        <div className="container">
          <div className="sports-section-header">
            <span className="sports-eyebrow">Main Sports</span>
            <h2 className="sports-section-heading">Our Key Sports Programmes</h2>
            <p className="sports-section-sub">
              These sports are at the heart of our athletics programme — each with
              dedicated teams, regular training, and inter-school competition.
            </p>
          </div>

          <div className="sports-main-grid">
            {mainSports.map((sport, i) => {
              const active = activeSlides[i] || 0;
              return (
                <div className="sports-card reveal" key={i}>

                  {/* Carousel */}
                  <div className="sports-carousel">
                    <div className="sports-carousel-track">
                      {sport.images.map((img, j) => (
                        <div
                          className={`sports-carousel-slide${j === active ? ' sports-carousel-slide--active' : ''}`}
                          key={j}
                        >
                          <img src={img} alt={`${sport.title} ${j + 1}`} />
                        </div>
                      ))}
                    </div>

                    {/* Overlay gradient */}
                    <div className="sports-carousel-overlay"></div>

                    {/* Tag */}
                    <span className="sports-card-tag">{sport.tag}</span>

                    {/* Counter */}
                    <span className="sports-carousel-counter">
                      {active + 1} / {sport.images.length}
                    </span>

                    {/* Arrow buttons */}
                    <button
                      className="sports-carousel-btn sports-carousel-btn--prev"
                      onClick={() => prev(i, sport.images.length)}
                      aria-label="Previous image"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="sports-carousel-btn sports-carousel-btn--next"
                      onClick={() => next(i, sport.images.length)}
                      aria-label="Next image"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>

                    {/* Dot pagination */}
                    <div className="sports-carousel-dots">
                      {sport.images.map((_, j) => (
                        <button
                          key={j}
                          className={`sports-carousel-dot${j === active ? ' sports-carousel-dot--active' : ''}`}
                          onClick={() => goTo(i, j)}
                          aria-label={`Image ${j + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="sports-card-body">
                    <h3>{sport.title}</h3>
                    <p>{sport.body}</p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="sports-values">
        <div className="container">
          <div className="sports-section-header">
            <span className="sports-eyebrow">What We Stand For</span>
            <h2 className="sports-section-heading">The Values Behind Every Game</h2>
          </div>
          <div className="sports-values-grid">
            {values.map((v, i) => (
              <div className="sports-value-card reveal" key={i}>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="sports-closing">
        <div className="container">
          <div className="sports-closing-inner reveal">
            <span className="sports-eyebrow">Get Involved</span>
            <h2>Join a Team or Find Out More</h2>
            <p>
              All students are encouraged to participate in at least one sport.
              Speak to your class teacher or the PE department to find out how
              to join a team or sign up for training sessions.
            </p>
            <a href="/contact" className="sports-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sports;
