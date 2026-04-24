import { useEffect } from 'react';
import './ScienceLab.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const ScienceLab = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Science Laboratories', 'Explore the St. Lawrence Academy science laboratories — fully equipped facilities supporting practical science education.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="lab-page">

      {/* ── Hero ── */}
      <section className="lab-hero">
        <div className="lab-hero-bg">
          <img src="/images/secondary/students_5.JPG" alt="St. Lawrence Academy Science Labs" />
        </div>
        <div className="lab-hero-overlay"></div>
        <div className="lab-hero-content">
          <div className="container">
            <div className="lab-hero-inner">
              <span className="lab-hero-label">St. Lawrence Academy</span>
              <h1 className="lab-hero-title">Science <span>Laboratories</span></h1>
              <p className="lab-hero-sub">
                Hands-on science education in fully equipped facilities —
                where curiosity meets experiment and discovery becomes learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="lab-mobile-band">
        <div className="container">
          <h2 className="lab-mobile-band-heading">Science Laboratories</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="lab-intro">
        <div className="container">
          <div className="lab-intro-inner">
            <span className="lab-eyebrow">Practical Science</span>
            <h2 className="lab-intro-heading">Science Comes Alive in Our Labs</h2>
            <p className="lab-intro-text">
              At St. Lawrence Academy, we believe science is best understood through
              doing. Our dedicated laboratories give students the opportunity to move
              beyond the textbook — to observe, experiment, question, and discover
              for themselves. Every practical session is designed to deepen
              understanding and build a genuine love for scientific inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* ── About the Lab ── */}
      <section className="lab-about">
        <div className="container">
          <div className="lab-about-inner reveal">
            <div className="lab-about-imgs">
              <img className="lab-about-img-main" src="/images/secondary/campus_night_view.jpg" alt="St. Lawrence Academy at night" />
            </div>
            <div className="lab-about-text">
              <span className="lab-eyebrow">Our Facility</span>
              <h2 className="lab-about-heading">A Purpose-Built Space for Scientific Discovery</h2>
              <p>
                The St. Lawrence Academy science laboratory is a well-equipped,
                purpose-built facility designed to support the full range of
                practical science activities required by the national curriculum.
                Students from the secondary level engage in regular structured
                lab sessions covering biology, chemistry, and physics.
              </p>
              <p>
                The lab is stocked with quality equipment — microscopes, chemical
                reagents, Bunsen burners, circuit kits, measuring instruments,
                biological specimens, and more — giving every student direct
                hands-on experience with the tools of scientific investigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipment ── */}
      <section className="lab-equipment">
        <div className="container">
          <div className="lab-equipment-header">
            <span className="lab-eyebrow">What We Have</span>
            <h2 className="lab-equipment-heading">Equipment &amp; Resources</h2>
            <p className="lab-equipment-sub">
              Our lab is stocked with the equipment students need to carry
              out a full range of curriculum-aligned practical experiments.
            </p>
          </div>
          <div className="lab-equipment-grid">

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-microscope"></i></div>
              <h3>Biology Equipment</h3>
              <p>Compound microscopes, biological models, specimen collections, dissection tools, and plant and animal study materials for life science practicals.</p>
            </div>

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-flask"></i></div>
              <h3>Chemistry Equipment</h3>
              <p>Glassware, reagents, Bunsen burners, precision balances, titration sets, and full safety equipment for chemical experiments.</p>
            </div>

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-bolt"></i></div>
              <h3>Physics Equipment</h3>
              <p>Electrical circuit kits, magnetism and optics apparatus, Newton's cradles, measuring instruments, and wave demonstration equipment.</p>
            </div>

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-ruler-combined"></i></div>
              <h3>Measuring &amp; Recording</h3>
              <p>A range of precision measuring tools, data recording sheets, and scientific calculators to support accurate observation and analysis.</p>
            </div>

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-shield-alt"></i></div>
              <h3>Safety Equipment</h3>
              <p>Lab coats, safety goggles, gloves, fire extinguishers, first aid kits, and proper ventilation systems across all workstations.</p>
            </div>

            <div className="lab-equip-card reveal">
              <div className="lab-equip-icon"><i className="fas fa-book-open"></i></div>
              <h3>Reference Materials</h3>
              <p>Practical guides, data tables, lab manuals, and curriculum reference sheets available at every workstation to support independent learning.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Safety ── */}
      <section className="lab-safety">
        <div className="container">
          <div className="lab-safety-inner reveal">
            <div className="lab-safety-img">
              <img src="/images/secondary/students_in_class.JPG" alt="Safe lab environment" />
            </div>
            <div className="lab-safety-text">
              <span className="lab-eyebrow">Safety First</span>
              <h2 className="lab-safety-heading">A Safe Environment for Every Experiment</h2>
              <p>
                The safety of every student is our absolute priority in all laboratory
                sessions. Before entering the lab, students receive a clear safety
                briefing covering protective equipment, conduct rules, handling of
                chemicals, and emergency procedures.
              </p>
              <p>
                All practical sessions are supervised by qualified science teachers
                who ensure experiments are carried out correctly. The lab is fitted
                with proper ventilation, fire safety equipment, and a fully stocked
                first aid kit. We are committed to giving students the complete
                practical science experience while maintaining the highest
                standards of care.
              </p>
              <div className="lab-safety-items">
                <div className="lab-safety-item">
                  <i className="fas fa-check"></i>
                  <span>Protective gear provided at every session</span>
                </div>
                <div className="lab-safety-item">
                  <i className="fas fa-check"></i>
                  <span>Proper ventilation across all workstations</span>
                </div>
                <div className="lab-safety-item">
                  <i className="fas fa-check"></i>
                  <span>Qualified teacher supervision at all times</span>
                </div>
                <div className="lab-safety-item">
                  <i className="fas fa-check"></i>
                  <span>First aid and emergency procedures in place</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="lab-closing">
        <div className="container">
          <div className="lab-closing-inner">
            <span className="lab-eyebrow">Explore More</span>
            <h2 className="lab-closing-heading">Science is at the Heart of What We Do</h2>
            <p>
              Our science laboratories are just one part of a rich academic environment
              at St. Lawrence Academy. We are committed to giving every student the
              tools, knowledge, and confidence to pursue science at the highest level.
            </p>
            <div className="lab-closing-btns">
              <a href="/curriculum" className="lab-closing-btn lab-closing-btn--primary">
                <i className="fas fa-arrow-right"></i> View Academics
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ScienceLab;
