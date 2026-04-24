import { useEffect } from 'react';
import './History.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const History = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Our History', 'The story of St. Lawrence Academy — from our founding in 2020 to becoming a leading school in South Sudan.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="history-page">

      {/* ── Hero ── */}
      <section className="history-hero">
        <div className="history-hero-bg">
          <img src="/images/secondary/assembly_overview.JPG" alt="St. Lawrence Academy" />
        </div>
        <div className="history-hero-overlay"></div>
        <div className="history-hero-content">
          <div className="container">
            <div className="history-hero-inner">
              <span className="history-hero-label">St. Lawrence Academy</span>
              <h1 className="history-hero-title">Our <span>History</span></h1>
              <p className="history-hero-sub">
                From a bold vision in 2020 to a thriving institution serving
                over 1,500 students — the story of St. Lawrence Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="history-mobile-band">
        <div className="container">
          <h2 className="history-mobile-band-heading">Our History</h2>
        </div>
      </div>

      {/* ── Origin ── */}
      <section className="history-origin">
        <div className="container">
          <div className="history-origin-inner">
            <div className="history-origin-text">
              <span className="history-eyebrow">Our Story</span>
              <h2 className="history-origin-heading">Where It All Began</h2>
              <div className="history-origin-body">
                <p>
                  St. Lawrence Academy was born out of a deep conviction — that quality
                  education is the most powerful tool for transforming lives and shaping
                  the future of South Sudan. Established in Juba in 2020, the academy
                  started small but dreamed big, opening its doors with a handful of
                  students and a team of passionate teachers.
                </p>
                <p>
                  In just a few years, what began as a vision has grown into one of the
                  most respected educational institutions in the country — a story not
                  simply of growth in numbers, but of lives changed, families empowered,
                  and a community united around the enduring power of learning.
                </p>
              </div>
            </div>
            <div className="history-origin-img-wrap">
              <img
                src="/images/primary/primary_view.jpg"
                alt="Where it all began — St. Lawrence Academy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Foundation ── */}
      <section className="history-body-section history-body-section--alt reveal">
        <div className="container">
          <div className="history-body-inner">
            <div className="history-body-meta">
              <span className="history-eyebrow">The Foundation</span>
              <h2 className="history-body-heading">Built on Purpose &amp; Principle</h2>
            </div>
            <div className="history-body-text">
              <p>
                When St. Lawrence Academy was established, it was a statement of faith
                in the future of South Sudan. The founders envisioned an institution
                where academic excellence and strong moral values would go hand in hand,
                producing graduates who were not only educated but also principled and
                community-minded.
              </p>
              <p>
                The early days were not without challenge — building a school in a young
                nation requires resilience and conviction. The families who enrolled their
                children in those first years were pioneers, and their trust became the
                foundation on which everything else was built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <div className="history-pull-quote">
        <div className="container">
          <div className="history-pull-quote-inner">
            <p>
              "Education is not preparation for life — education is life itself."
            </p>
            <span className="history-pull-quote-cite">— John Dewey</span>
            <p className="history-pull-quote-response">
              At St. Lawrence Academy, we exist to make that life as rich, as
              purposeful, and as full of possibility as it can be.
            </p>
          </div>
        </div>
      </div>

      {/* ── Growth ── */}
      <section className="history-body-section reveal">
        <div className="container">
          <div className="history-body-inner">
            <div className="history-body-meta">
              <span className="history-eyebrow">Growing Excellence</span>
              <h2 className="history-body-heading">From Nursery to Secondary — One Vision</h2>
            </div>
            <div className="history-body-text">
              <p>
                The academy grew deliberately — nursery first, then primary, then
                secondary, completing a full educational journey under one roof.
                Each new level brought new teachers, new facilities, and a renewed
                sense of ambition.
              </p>
              <p>
                Today the school serves over 1,500 students, with examination results
                that speak for themselves — graduates gaining university admission
                within South Sudan and across the region, carrying the St. Lawrence
                Academy name forward with pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="history-body-section history-body-section--alt reveal">
        <div className="container">
          <div className="history-body-inner">
            <div className="history-body-meta">
              <span className="history-eyebrow">Community &amp; Culture</span>
              <h2 className="history-body-heading">More Than a School — A Community</h2>
            </div>
            <div className="history-body-text">
              <p>
                From the very beginning, St. Lawrence Academy was built as a community.
                Parents, teachers, and students share a common purpose — education is
                not a transaction but a transformative experience that shapes character,
                builds confidence, and opens doors.
              </p>
              <p>
                Cultural events, sporting competitions, assemblies, and outreach
                programmes bring the entire school family together. Students leave not
                just with qualifications but with the values and the vision to make a
                real difference in South Sudan and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="history-closing">
        <div className="container">
          <div className="history-closing-inner">
            <span className="history-closing-eyebrow">Looking Ahead</span>
            <h2>The Best is Yet to Come</h2>
            <p>
              Our history is one of courage and purpose. As we look ahead, we remain
              committed to quality education, developing our teachers, and producing
              graduates who will lead South Sudan into a brighter tomorrow.
              The best chapters of our story are still ahead.
            </p>
            <a href="/about" className="history-closing-btn">
              <i className="fas fa-arrow-right"></i> Our School Profile
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default History;
