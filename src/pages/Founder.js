import { useEffect } from 'react';
import './Founder.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Founder = () => {
  useEffect(() => {
    setPageMeta('The Founder', 'Achier John — Founder & Director of St. Lawrence Academy, Juba, South Sudan. A visionary educator dedicated to transforming lives through quality education.');
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="founder-page">

      {/* ── Hero ── */}
      <section className="founder-hero">
        <div className="founder-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="founder-hero-overlay"></div>
        <div className="founder-hero-content">
          <div className="founder-hero-label">
            <span className="label-line"></span>
            Founder &amp; Director — St. Lawrence Academy
            <span className="label-line"></span>
          </div>
          <h1 className="founder-hero-name">Achier John</h1>
          <p className="founder-hero-tagline">
            "Education is not just the transfer of knowledge; it is the transformation of character, the lifting of a nation."
          </p>
          <div className="founder-hero-scroll">
            <span></span>
          </div>
        </div>
      </section>

      {/* ── Name Band ── */}
      <div className="founder-name-band">
        <div className="founder-name-band-inner">
          <div className="founder-name-band-text">
            <span className="founder-name-band-eyebrow">Founder &amp; Director</span>
            <h2 className="founder-name-band-name">Achier John</h2>
            <span className="founder-name-band-sub">St. Lawrence Academy, Juba, South Sudan</span>
          </div>
        </div>
      </div>

      {/* ── Profile Section ── */}
      <section className="founder-profile">
        <div className="container">
          <div className="founder-article">

            {/* Left: editorial text */}
            <div className="founder-article-text animate-on-scroll">
              <div className="article-category">Profile &mdash; Founder &amp; Director</div>
              <h2 className="article-headline">Achier John: The Man Who Dared to Build</h2>
              <p className="article-subheadline">
                A visionary educator whose belief in quality schooling is quietly transforming a generation in Juba, South Sudan.
              </p>
              <div className="article-byline">
                <strong>St. Lawrence Academy</strong>
                <span className="article-byline-dot"></span>
                <span>Juba, South Sudan</span>
                <span className="article-byline-dot"></span>
                <span>Est. 2020</span>
              </div>

              <div className="article-body">
                <p>
                  Achier John is the driving force behind St. Lawrence Academy — a visionary leader whose passion for education was forged through personal experience and a deep desire to see South Sudan rise through the power of knowledge.
                </p>
                <p>
                  With a profound belief that quality education is the foundation of every thriving society, Achier founded St. Lawrence Academy in 2020 with a singular mission: to provide young South Sudanese with the academic excellence, moral grounding, and life skills they need to lead and serve their communities.
                </p>

                <div className="article-pull-quote">
                  The greatest gift we can give to a child is not wealth or comfort — it is the ability to think, to question, and to lead with integrity.
                </div>

                <p>
                  From its very first students, the school grew into a trusted institution known for rigorous standards and for producing graduates who carry its values into every corner of society. Today, under Achier's continued leadership, St. Lawrence Academy stands as proof that one person's commitment can change the course of a community.
                </p>
              </div>
            </div>

            {/* Right: image + facts */}
            <div className="founder-article-side animate-on-scroll">
              <div className="article-portrait">
                <div className="article-portrait-img">
                  <img src="/sla_school_view_1.jpg" alt="Achier John — Founder & Director" />
                </div>
                <div className="article-portrait-caption">
                  <strong>Achier John</strong>
                  <span>Founder &amp; Director, St. Lawrence Academy</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Founding Story ── */}
      <section className="founding-story">
        <div className="container">

          <div className="story-intro animate-on-scroll">
            <div className="story-intro-left">
              <span className="story-eyebrow">The Journey</span>
              <h2>The Founding<br /><em>Story</em></h2>
            </div>
            <div className="story-intro-right">
              <p>From a dream to a thriving institution — the story of how St. Lawrence Academy came to be, told through the defining moments that shaped its founding.</p>
            </div>
          </div>

          <div className="story-chapters">

            <div className="story-chapter animate-on-scroll">
              <div className="story-chapter-number">01</div>
              <div className="story-chapter-body">
                <span className="story-chapter-tag">The Beginning</span>
                <h3>A Calling Recognised</h3>
                <p>
                  Growing up in South Sudan, Achier John witnessed firsthand the challenges faced by young people seeking quality education. Access was limited, resources were scarce, and the potential of an entire generation risked going unfulfilled. This reality ignited in him a sense of calling — not just to teach, but to build.
                </p>
              </div>
              <div className="story-chapter-accent"></div>
            </div>

            <div className="story-chapter animate-on-scroll">
              <div className="story-chapter-number">02</div>
              <div className="story-chapter-body">
                <span className="story-chapter-tag">The Preparation</span>
                <h3>Education &amp; Formation</h3>
                <p>
                  Achier pursued his own academic journey with dedication, studying education and school administration. He gained experience working in various educational settings, observing what worked and what was missing — building both the knowledge and the resolve to create something different, something better, for the children of Juba.
                </p>
              </div>
              <div className="story-chapter-accent"></div>
            </div>

            <div className="story-chapter story-chapter--featured animate-on-scroll">
              <div className="story-chapter-number">2020</div>
              <div className="story-chapter-body">
                <span className="story-chapter-tag">The Founding</span>
                <h3>St. Lawrence Academy Is Born</h3>
                <p>
                  With unwavering determination and the support of a committed team, Achier John opened the doors of St. Lawrence Academy in Juba, South Sudan. The school was founded on three pillars: academic excellence, character development, and community service. From its very first students, the academy became a beacon of hope and possibility.
                </p>
              </div>
              <div className="story-chapter-accent"></div>
            </div>

            <div className="story-chapter animate-on-scroll">
              <div className="story-chapter-number">04</div>
              <div className="story-chapter-body">
                <span className="story-chapter-tag">Growth &amp; Impact</span>
                <h3>Building a Legacy</h3>
                <p>
                  Under Achier's leadership, St. Lawrence Academy has grown rapidly — expanding programmes, recruiting passionate educators, improving facilities, and transforming the lives of hundreds of students. The school became a trusted institution in Juba, known for its rigorous standards and graduates who carry its values everywhere.
                </p>
              </div>
              <div className="story-chapter-accent"></div>
            </div>

            <div className="story-chapter animate-on-scroll">
              <div className="story-chapter-number">05</div>
              <div className="story-chapter-body">
                <span className="story-chapter-tag">Today</span>
                <h3>The Vision Continues</h3>
                <p>
                  Achier John continues to lead with the same passion that first drove him to found St. Lawrence Academy — mentoring teachers, engaging with families, and constantly pursuing new ways to elevate what the school offers. His vision is clear: St. Lawrence Academy must be a world-class institution that all of South Sudan can be proud of.
                </p>
              </div>
              <div className="story-chapter-accent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Vision & Philosophy ── */}
      <section className="founder-vision">
        <div className="container">
          <div className="section-header-gold animate-on-scroll">
            <p className="section-eyebrow">Leadership Philosophy</p>
            <h2>Vision &amp; Core Beliefs</h2>
            <p>The principles that guide Achier John's leadership and shape everything at St. Lawrence Academy.</p>
          </div>

          <div className="vision-pillars">
            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Excellence in Learning</h3>
              <p>Every student deserves a rigorous, inspiring education that challenges them to reach their full potential. Mediocrity is never acceptable when our students' futures are at stake.</p>
            </div>

            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Character Above All</h3>
              <p>Academic achievement means little without integrity, compassion, and responsibility. St. Lawrence Academy forms complete human beings — scholars and servants of society.</p>
            </div>

            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-globe-africa"></i>
              </div>
              <h3>Serving South Sudan</h3>
              <p>Every graduate carries a responsibility to give back. Our mission is inseparable from the development and flourishing of South Sudan as a nation.</p>
            </div>

            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Community Partnership</h3>
              <p>Education does not happen in isolation. Families, teachers, and the wider community must all be partners in the journey of every child who walks through our gates.</p>
            </div>

            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation &amp; Growth</h3>
              <p>The world changes, and education must change with it. We constantly seek better ways to teach, to engage, and to prepare students for tomorrow.</p>
            </div>

            <div className="vision-pillar animate-on-scroll">
              <div className="vision-pillar-icon">
                <i className="fas fa-cross"></i>
              </div>
              <h3>Faith &amp; Values</h3>
              <p>Rooted in faith, St. Lawrence Academy nurtures students who are grounded in strong values — students who act with honour, lead with humility, and live with purpose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Legacy ── */}
      <section className="founder-legacy">
        <div className="container legacy-inner">

          {/* Top: heading + text */}
          <div className="legacy-header animate-on-scroll">
            <div className="legacy-header-left">
              <span className="legacy-eyebrow">Impact &amp; Legacy</span>
              <h2>A Living<br /><em>Legacy</em></h2>
            </div>
            <div className="legacy-header-right">
              <p>
                What Achier John has built at St. Lawrence Academy is more than a school — it is a movement. A movement that says the children of South Sudan deserve the very best, and that with the right environment, support, and inspiration, they can achieve anything.
              </p>
              <p>
                His legacy is written not in stone, but in the lives of the students who have passed through these halls — students now pursuing careers in medicine, law, engineering, education, and public service, becoming the leaders their country needs.
              </p>
            </div>
          </div>

          {/* Bottom: achievement cards */}
          <div className="legacy-cards animate-on-scroll">

            <div className="legacy-card">
              <div className="legacy-card-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Founded St. Lawrence Academy</h3>
              <p>Established in 2020, serving Nursery through Secondary education in Juba, South Sudan.</p>
            </div>

            <div className="legacy-card">
              <div className="legacy-card-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Hundreds of Graduates</h3>
              <p>Students who have gone on to contribute meaningfully to South Sudanese society and beyond.</p>
            </div>

            <div className="legacy-card">
              <div className="legacy-card-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Quality Teaching Staff</h3>
              <p>Recruited and developed a team of dedicated, qualified educators committed to excellence.</p>
            </div>

            <div className="legacy-card">
              <div className="legacy-card-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Growing Infrastructure</h3>
              <p>Expanding facilities continuously to meet the needs of a growing and thriving student body.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Final Quote ── */}
      <section className="founder-quote-banner">
        <div className="container">
          <div className="gold-divider">
            <div className="gold-divider-line"></div>
            <div className="gold-divider-diamond"></div>
            <div className="gold-divider-line"></div>
          </div>
          <blockquote>
            We are not just building a school. We are building the future of South Sudan — one student, one lesson, one act of kindness at a time.
          </blockquote>
          <cite>Achier John &mdash; Founder &amp; Director, St. Lawrence Academy</cite>
          <div className="gold-divider" style={{marginTop: '2.5rem'}}>
            <div className="gold-divider-line"></div>
            <div className="gold-divider-diamond"></div>
            <div className="gold-divider-line"></div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Founder;
