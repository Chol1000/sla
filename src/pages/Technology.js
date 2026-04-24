import { useEffect } from 'react';
import './Technology.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Technology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Technology & ICT', 'Explore the St. Lawrence Academy technology and ICT programme — equipping students with essential digital skills for the modern world.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="tech-page">

      {/* ── Hero ── */}
      <section className="tech-hero">
        <div className="tech-hero-bg">
          <img src="/images/secondary/students.JPG" alt="St. Lawrence Academy Technology & ICT" />
        </div>
        <div className="tech-hero-overlay"></div>
        <div className="tech-hero-content">
          <div className="container">
            <div className="tech-hero-inner">
              <span className="tech-hero-label">St. Lawrence Academy</span>
              <h1 className="tech-hero-title">Technology <span>&amp; ICT</span></h1>
              <p className="tech-hero-sub">
                Building digital competence from the ground up — practical skills,
                computer literacy, and technology education for every student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="tech-mobile-band">
        <div className="container">
          <h2 className="tech-mobile-band-heading">Technology &amp; ICT</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="tech-intro">
        <div className="container">
          <div className="tech-intro-inner">
            <span className="tech-eyebrow">Digital Education</span>
            <h2 className="tech-intro-heading">Preparing Students for a Digital World</h2>
            <p className="tech-intro-text">
              At St. Lawrence Academy, technology education is not an afterthought — it is
              a core part of how we prepare students for the future. From the basics of
              computer operation to applied digital skills, our ICT programme gives every
              student the knowledge and confidence to navigate an increasingly technology-driven world.
            </p>
          </div>
        </div>
      </section>

      {/* ── Computer Lab ── */}
      <section className="tech-lab">
        <div className="container">
          <div className="tech-lab-inner reveal">
            <div className="tech-lab-imgs">
              <img className="tech-lab-img-main" src="/images/secondary/school_view.jpg" alt="Students in computer lab" />
            </div>
            <div className="tech-lab-text">
              <span className="tech-eyebrow">Our Facility</span>
              <h2 className="tech-lab-heading">A Dedicated Computer Laboratory</h2>
              <p>
                St. Lawrence Academy operates a purpose-built computer laboratory
                equipped with desktop computers and supporting hardware for
                structured ICT sessions. Students access the lab on a scheduled
                basis throughout the academic year as part of their formal timetable.
              </p>
              <p>
                The lab provides a focused learning environment where students
                can practise and apply the digital skills they learn in class.
                All sessions are supervised by a qualified ICT teacher who guides
                students through practical tasks aligned with the national curriculum.
              </p>
              <div className="tech-lab-highlights">
                <div className="tech-lab-highlight">
                  <i className="fas fa-desktop"></i>
                  <span>Computer workstations for every student</span>
                </div>
                <div className="tech-lab-highlight">
                  <i className="fas fa-wifi"></i>
                  <span>Internet access for research and learning</span>
                </div>
                <div className="tech-lab-highlight">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Qualified ICT teacher supervision</span>
                </div>
                <div className="tech-lab-highlight">
                  <i className="fas fa-calendar-check"></i>
                  <span>Scheduled practical sessions each week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="tech-curriculum">
        <div className="container">
          <div className="tech-curriculum-header">
            <span className="tech-eyebrow">What We Teach</span>
            <h2 className="tech-curriculum-heading">ICT Curriculum Areas</h2>
            <p className="tech-curriculum-sub">
              Our ICT programme covers the full range of topics required by the national curriculum,
              building students' skills progressively across all year groups.
            </p>
          </div>
          <div className="tech-curriculum-grid">

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-keyboard"></i></div>
              <h3>Computer Fundamentals</h3>
              <p>Hardware, software, operating systems, file management, and the basic skills every student needs to operate a computer confidently.</p>
            </div>

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-file-word"></i></div>
              <h3>Word Processing</h3>
              <p>Document creation, formatting, editing, and presentation using word processing software — essential for academic and professional life.</p>
            </div>

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-table"></i></div>
              <h3>Spreadsheets &amp; Data</h3>
              <p>Using spreadsheet applications for data entry, calculations, charts, and basic data analysis — a skill applied across all subjects.</p>
            </div>

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-globe"></i></div>
              <h3>Internet &amp; Research</h3>
              <p>Safe and effective use of the internet, search techniques, evaluating online sources, and email communication etiquette.</p>
            </div>

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-shield-alt"></i></div>
              <h3>Digital Safety</h3>
              <p>Understanding online safety, responsible digital citizenship, data privacy, and how to protect oneself in digital environments.</p>
            </div>

            <div className="tech-curr-card reveal">
              <div className="tech-curr-icon"><i className="fas fa-code"></i></div>
              <h3>Introduction to Programming</h3>
              <p>Basic programming logic, algorithms, and problem-solving using introductory coding concepts at the secondary level.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Why ICT Matters ── */}
      <section className="tech-why">
        <div className="container">
          <div className="tech-why-inner reveal">
            <div className="tech-why-img">
              <img src="/images/secondary/mathematics_club.jpg" alt="Technology in education" />
            </div>
            <div className="tech-why-text">
              <span className="tech-eyebrow">Our Approach</span>
              <h2 className="tech-why-heading">Technology as a Tool for Every Subject</h2>
              <p>
                At St. Lawrence Academy, we understand that technology is not a
                standalone skill — it underpins learning across every discipline.
                Whether students are writing essays, analysing data in mathematics,
                researching for geography projects, or presenting science findings,
                digital competence makes them more effective and confident learners.
              </p>
              <p>
                Our ICT programme is designed not just to teach software, but to
                develop critical thinkers who understand how and why technology
                works. We give students the foundation they need to continue
                learning independently and to thrive in further education and
                careers where digital skills are increasingly expected.
              </p>
              <div className="tech-why-items">
                <div className="tech-why-item">
                  <i className="fas fa-check"></i>
                  <span>Practical sessions tied to real-world applications</span>
                </div>
                <div className="tech-why-item">
                  <i className="fas fa-check"></i>
                  <span>ICT integrated across the academic programme</span>
                </div>
                <div className="tech-why-item">
                  <i className="fas fa-check"></i>
                  <span>Emphasis on responsible and safe technology use</span>
                </div>
                <div className="tech-why-item">
                  <i className="fas fa-check"></i>
                  <span>Curriculum-aligned with national ICT standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Levels Band ── */}
      <section className="tech-levels">
        <div className="container">
          <div className="tech-levels-header">
            <span className="tech-eyebrow tech-eyebrow--light">By School Level</span>
            <h2 className="tech-levels-heading">ICT Across All Levels</h2>
          </div>
          <div className="tech-levels-grid">
            <div className="tech-level-card">
              <div className="tech-level-num">01</div>
              <h3>Primary Level</h3>
              <p>Students are introduced to computers — basic operation, mouse and keyboard skills, and foundational digital literacy. Technology is explored through guided activities and simple tasks.</p>
            </div>
            <div className="tech-level-card">
              <div className="tech-level-num">02</div>
              <h3>Lower Secondary</h3>
              <p>Students begin formal ICT studies — word processing, spreadsheets, internet research, and computer theory. Practical lab sessions reinforce classroom learning with hands-on exercises.</p>
            </div>
            <div className="tech-level-card">
              <div className="tech-level-num">03</div>
              <h3>Upper Secondary</h3>
              <p>Students prepare for national examinations in ICT and deepen their skills in applications, networking concepts, digital communication, and introductory programming logic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="tech-closing">
        <div className="container">
          <div className="tech-closing-inner">
            <span className="tech-eyebrow">Explore More</span>
            <h2 className="tech-closing-heading">Technology is Part of Every Student's Future</h2>
            <p>
              Our ICT programme is one part of a broad and ambitious academic offer at
              St. Lawrence Academy. We are committed to equipping every student with
              the skills, knowledge, and confidence to succeed in a digital age.
            </p>
            <div className="tech-closing-btns">
              <a href="/curriculum" className="tech-closing-btn tech-closing-btn--primary">
                <i className="fas fa-arrow-right"></i> View Academics
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Technology;
