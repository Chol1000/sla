import { useEffect } from 'react';
import './Secondary.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Secondary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Secondary School', 'St. Lawrence Academy Secondary School — Sciences and Arts streams from S1 to S4, preparing students for the national SSCSE examination.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="secondary-page">

      {/* ── Hero ── */}
      <section className="secondary-hero">
        <div className="secondary-hero-bg">
          <img src="/sla_secondary_school.jpg" alt="St. Lawrence Academy Secondary School" />
        </div>
        <div className="secondary-hero-overlay"></div>
        <div className="secondary-hero-content">
          <div className="container">
            <div className="secondary-hero-inner">
              <span className="secondary-hero-label">St. Lawrence Academy</span>
              <h1 className="secondary-hero-title">Secondary <span>School</span></h1>
              <p className="secondary-hero-sub">
                Four years of rigorous, specialist education — Sciences and Arts
                streams preparing every student for national examinations and
                the careers that follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="secondary-mobile-band">
        <div className="container">
          <h2 className="secondary-mobile-band-heading">Secondary School</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="secondary-intro">
        <div className="container">
          <div className="secondary-intro-inner">
            <span className="secondary-eyebrow">Welcome</span>
            <h2 className="secondary-intro-heading">Where Students Become Scholars</h2>
            <p className="secondary-intro-text">
              Secondary school at St. Lawrence Academy spans four years — Senior One
              through Senior Four — with subject-specialist teaching, stream-based
              learning, and a clear path to the national SSCSE examination. We prepare
              students not just for results, but for life beyond school.
            </p>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="secondary-about">
        <div className="container">
          <div className="secondary-about-inner reveal">
            <div className="secondary-about-text">
              <span className="secondary-eyebrow">Our Approach</span>
              <h2 className="secondary-about-heading">Specialist Teaching. High Expectations.</h2>
              <p>
                At secondary level, every subject is taught by a dedicated subject
                specialist. Students move between teachers who know their discipline
                deeply — receiving focused, expert instruction that goes well beyond
                what a generalist classroom can offer.
              </p>
              <p>
                We set high expectations from day one. Students are supported through
                structured assessments, regular feedback, and targeted intervention
                so that no one falls behind and every student is pushed to reach their
                full potential.
              </p>
              <div className="secondary-about-years">
                {['S1','S2','S3','S4','SSCSE'].map((label, i) => (
                  <div className={`secondary-about-step${i === 4 ? ' secondary-about-step--exam' : ''}`} key={i}>
                    <div className="secondary-about-step-label">{label}</div>
                    {i < 4 && <div className="secondary-about-step-arrow"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="secondary-about-img">
              <img src="/sla_students_20.jpg" alt="Secondary students at St. Lawrence Academy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Streams ── */}
      <section className="secondary-streams">
        <div className="container">
          <div className="secondary-streams-header">
            <span className="secondary-eyebrow">Academic Streams</span>
            <h2 className="secondary-streams-heading">Two Streams, One Standard of Excellence</h2>
            <p className="secondary-streams-sub">
              Students choose their stream at Senior One — Sciences or Arts —
              based on their strengths and career interests.
            </p>
          </div>
          <div className="secondary-streams-split">

            {/* Sciences */}
            <div className="secondary-stream-block secondary-stream-block--sciences reveal">
              <div className="secondary-stream-head">
                <h3>Sciences Stream</h3>
                <p>For students with a passion for the natural world, medicine, engineering, and technology.</p>
              </div>
              <ul className="secondary-stream-subjects">
                <li><span>Biology</span><em>The study of living organisms, genetics, ecology, and the human body.</em></li>
                <li><span>Chemistry</span><em>Atoms, elements, reactions, and materials through theory and laboratory practicals.</em></li>
                <li><span>Physics</span><em>Forces, energy, electricity, waves, and motion — analytical and practical.</em></li>
                <li><span>Additional Mathematics</span><em>Advanced topics for students targeting science and engineering careers.</em></li>
                <li><span>Agriculture</span><em>Crop production, animal husbandry, soil science, and sustainable farming.</em></li>
                <li><span>Computer Studies</span><em>ICT skills, digital literacy, and introductory programming.</em></li>
              </ul>
            </div>

            {/* Arts */}
            <div className="secondary-stream-block secondary-stream-block--arts reveal">
              <div className="secondary-stream-head">
                <h3>Arts Stream</h3>
                <p>For students drawn to business, law, humanities, and social sciences.</p>
              </div>
              <ul className="secondary-stream-subjects">
                <li><span>Commerce</span><em>Trade, business operations, marketing, and economic systems.</em></li>
                <li><span>History</span><em>African, world, and South Sudanese history and its shaping of modern societies.</em></li>
                <li><span>Geography</span><em>Physical and human geography — landforms, climate, population, and development.</em></li>
                <li><span>Accounting</span><em>Bookkeeping, financial statements, and business accounts.</em></li>
                <li><span>Literature</span><em>Prose, poetry, drama, and literary analysis developing critical thinking.</em></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Core Subjects ── */}
      <section className="secondary-core">
        <div className="container">
          <div className="secondary-core-header">
            <span className="secondary-eyebrow">Studied by All</span>
            <h2 className="secondary-core-heading">Core Subjects</h2>
            <p className="secondary-core-sub">Regardless of stream, every secondary student studies these four subjects.</p>
          </div>
          <div className="secondary-core-grid">

            <div className="secondary-core-card reveal">
              <div className="secondary-core-num">01</div>
              <h3>Mathematics</h3>
              <p>Algebra, geometry, trigonometry, and statistics — the foundation of many career paths and a core examination subject.</p>
            </div>

            <div className="secondary-core-card reveal">
              <div className="secondary-core-num">02</div>
              <h3>English</h3>
              <p>Advanced reading, writing, comprehension, and oral communication — essential for academic success and professional life.</p>
            </div>

            <div className="secondary-core-card reveal">
              <div className="secondary-core-num">03</div>
              <h3>Christian Religious Education</h3>
              <p>In-depth study of the Bible, Christian doctrine, and ethics — encouraging personal reflection and moral development.</p>
            </div>

            <div className="secondary-core-card reveal">
              <div className="secondary-core-num">04</div>
              <h3>Citizenship</h3>
              <p>Rights, responsibilities, governance, and national identity — preparing informed, active citizens of South Sudan.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SSCSE Examinations ── */}
      <section className="secondary-sscse">
        <div className="container">
          <div className="secondary-sscse-inner reveal">
            <div className="secondary-sscse-text">
              <span className="secondary-eyebrow secondary-eyebrow--light">National Examination</span>
              <h2 className="secondary-sscse-heading">The South Sudan Certificate of Secondary Education</h2>
              <p>
                At the end of Senior Four, students sit the SSCSE — the national
                examination that opens the door to university, professional training,
                and career entry. Preparation begins from S1 and intensifies
                through S3 and S4.
              </p>
              <p>
                Our examination preparation programme includes structured revision,
                mock examinations, past paper practice, and individual progress
                tracking to ensure every student performs to their full potential.
              </p>
              <div className="secondary-sscse-items">
                <div className="secondary-sscse-item">
                  <i className="fas fa-check"></i>
                  <span>Structured revision from S3 onwards</span>
                </div>
                <div className="secondary-sscse-item">
                  <i className="fas fa-check"></i>
                  <span>Mock examinations and past paper practice</span>
                </div>
                <div className="secondary-sscse-item">
                  <i className="fas fa-check"></i>
                  <span>Individual student progress tracking</span>
                </div>
                <div className="secondary-sscse-item">
                  <i className="fas fa-check"></i>
                  <span>Subject-specialist examination guidance</span>
                </div>
              </div>
            </div>
            <div className="secondary-sscse-img">
              <img src="/sla_students_21.jpg" alt="Secondary students preparing for examinations" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="secondary-gallery">
        <div className="container">
          <div className="secondary-gallery-header">
            <span className="secondary-eyebrow">Life in Secondary</span>
            <h2 className="secondary-gallery-heading">A Glimpse Inside</h2>
          </div>
          <div className="secondary-gallery-row">
            <div className="secondary-gallery-cell">
              <img src="/sla_students_25.jpg" alt="Secondary students at SLA" />
            </div>
            <div className="secondary-gallery-cell">
              <img src="/sla_students_26.jpg" alt="Secondary school classroom" />
            </div>
            <div className="secondary-gallery-cell">
              <img src="/sla_students_27.jpg" alt="Secondary school activity" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="secondary-closing">
        <div className="container">
          <div className="secondary-closing-inner">
            <span className="secondary-eyebrow">Get Started</span>
            <h2 className="secondary-closing-heading">Begin Your Secondary Journey at SLA</h2>
            <p>
              Admissions to Senior One are open. We welcome students who are ready
              to be challenged, to grow, and to achieve at the highest level.
            </p>
            <div className="secondary-closing-btns">
              <a href="/admissions/apply" className="secondary-closing-btn secondary-closing-btn--primary">
                <i className="fas fa-pen-alt"></i> Apply Now
              </a>
              <a href="/contact" className="secondary-closing-btn secondary-closing-btn--outline">
                <i className="fas fa-envelope"></i> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Secondary;
