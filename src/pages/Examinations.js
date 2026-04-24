import { useEffect } from 'react';
import './Examinations.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Examinations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Examinations', 'Learn about the St. Lawrence Academy examinations programme — internal assessments, national examinations, and how we prepare every student to succeed.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="exams-page">

      {/* ── Hero ── */}
      <section className="exams-hero">
        <div className="exams-hero-bg">
          <img src="/images/nursery/examination.jpg" alt="St. Lawrence Academy Examinations" />
        </div>
        <div className="exams-hero-overlay"></div>
        <div className="exams-hero-content">
          <div className="container">
            <div className="exams-hero-inner">
              <span className="exams-hero-label">St. Lawrence Academy</span>
              <h1 className="exams-hero-title">Examinations <span>&amp; Assessment</span></h1>
              <p className="exams-hero-sub">
                Rigorous, fair, and well-supported — our examination programme
                ensures every student is prepared to demonstrate their best work
                and achieve the results they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="exams-mobile-band">
        <div className="container">
          <h2 className="exams-mobile-band-heading">Examinations &amp; Assessment</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="exams-intro">
        <div className="container">
          <div className="exams-intro-inner">
            <span className="exams-eyebrow">Our Approach</span>
            <h2 className="exams-intro-heading">Assessment That Reflects True Learning</h2>
            <p className="exams-intro-text">
              At St. Lawrence Academy, examinations are more than tests — they are
              milestones that mark each student's academic journey. We combine
              continuous internal assessment with structured formal examinations
              to give a full and accurate picture of every student's progress,
              understanding, and potential.
            </p>
          </div>
        </div>
      </section>

      {/* ── Types of Assessment ── */}
      <section className="exams-types">
        <div className="container">
          <div className="exams-types-header">
            <span className="exams-eyebrow">How We Assess</span>
            <h2 className="exams-types-heading">Types of Assessment</h2>
            <p className="exams-types-sub">
              Students are assessed through a combination of ongoing classwork and
              formal examinations throughout each academic year.
            </p>
          </div>
          <div className="exams-types-grid">

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-clipboard-check"></i></div>
              <h3>Continuous Assessment</h3>
              <p>Regular class tests, assignments, and coursework contribute to each student's overall grade, rewarding consistent effort and engagement throughout the term.</p>
            </div>

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-calendar-alt"></i></div>
              <h3>End-of-Term Examinations</h3>
              <p>Formal written examinations are conducted at the end of each term across all subjects, testing students' understanding and preparing them for national assessments.</p>
            </div>

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>National Examinations</h3>
              <p>Students at key stages sit national examinations set by the Ministry of Education — the PLE at primary level and the SSCSE at secondary level.</p>
            </div>

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-chart-bar"></i></div>
              <h3>Mock Examinations</h3>
              <p>Structured mock exams are held before national assessments to familiarise students with exam conditions, identify gaps, and build the confidence needed to perform well.</p>
            </div>

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-flask"></i></div>
              <h3>Practical Assessments</h3>
              <p>Science and ICT subjects include practical components, assessed through supervised lab and computer sessions as part of the overall subject grade.</p>
            </div>

            <div className="exams-type-card reveal">
              <div className="exams-type-icon"><i className="fas fa-comments"></i></div>
              <h3>Oral &amp; Presentation</h3>
              <p>Language and humanities subjects may include oral examinations and presentations, developing students' communication skills alongside written ability.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── National Exams ── */}
      <section className="exams-national">
        <div className="container">
          <div className="exams-national-inner reveal">
            <div className="exams-national-img">
              <img src="/images/secondary/success_card_from_director.jpg" alt="Director wishing S4 students success" />
            </div>
            <div className="exams-national-text">
              <span className="exams-eyebrow">National Assessments</span>
              <h2 className="exams-national-heading">Preparing for National Examinations</h2>
              <p>
                St. Lawrence Academy prepares students for the national examinations
                administered by the Ministry of General Education and Instruction
                of South Sudan. These are the benchmarks against which all students
                in the country are measured, and we take this responsibility seriously.
              </p>
              <p>
                Our teaching is aligned to the national curriculum from the earliest
                years so that by the time students reach examination stage, they are
                thoroughly prepared — not only in subject knowledge but also in
                technique, time management, and examination confidence.
              </p>
              <div className="exams-national-badges">
                <div className="exams-national-badge">
                  <div className="exams-badge-label">Primary Level</div>
                  <div className="exams-badge-name">PLE</div>
                  <div className="exams-badge-desc">Primary Leaving Examination</div>
                </div>
                <div className="exams-national-badge">
                  <div className="exams-badge-label">Secondary Level</div>
                  <div className="exams-badge-name">SSCSE</div>
                  <div className="exams-badge-desc">South Sudan Certificate of Secondary Education</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Preparation ── */}
      <section className="exams-prep">
        <div className="container">
          <div className="exams-prep-header">
            <span className="exams-eyebrow exams-eyebrow--light">How We Support Students</span>
            <h2 className="exams-prep-heading">Exam Preparation at SLA</h2>
          </div>
          <div className="exams-prep-grid">
            <div className="exams-prep-card">
              <div className="exams-prep-num">01</div>
              <h3>Structured Revision</h3>
              <p>Dedicated revision timetables are provided before each exam period, with teachers running focused revision sessions covering key topics and exam techniques across all subjects.</p>
            </div>
            <div className="exams-prep-card">
              <div className="exams-prep-num">02</div>
              <h3>Past Paper Practice</h3>
              <p>Students practise with past national examination papers under timed conditions, helping them understand question formats and develop the pacing skills needed for exam success.</p>
            </div>
            <div className="exams-prep-card">
              <div className="exams-prep-num">03</div>
              <h3>Individual Support</h3>
              <p>Teachers identify students who need additional support early and provide one-on-one guidance, targeted interventions, and extra practice to close gaps before the examination.</p>
            </div>
            <div className="exams-prep-card">
              <div className="exams-prep-num">04</div>
              <h3>Parent Communication</h3>
              <p>We keep parents informed throughout the exam cycle — sharing timetables, preparation tips, and student progress so that the home environment can support each student's efforts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conduct & Integrity ── */}
      <section className="exams-conduct">
        <div className="container">
          <div className="exams-conduct-inner reveal">
            <div className="exams-conduct-text">
              <span className="exams-eyebrow">Standards &amp; Integrity</span>
              <h2 className="exams-conduct-heading">Examination Conduct &amp; Integrity</h2>
              <p>
                St. Lawrence Academy holds academic integrity to the highest standard.
                All examinations are conducted under strict, fair conditions supervised
                by qualified invigilators. Students are briefed in advance on all rules,
                regulations, and expectations.
              </p>
              <p>
                We are committed to ensuring that every result earned at St. Lawrence
                Academy reflects genuine effort and knowledge. Conduct rules are
                communicated clearly and enforced consistently so that all students
                compete on a level and fair playing field.
              </p>
              <div className="exams-conduct-items">
                <div className="exams-conduct-item">
                  <i className="fas fa-check"></i>
                  <span>Supervised by qualified invigilators</span>
                </div>
                <div className="exams-conduct-item">
                  <i className="fas fa-check"></i>
                  <span>Strict no-cheating and conduct policy</span>
                </div>
                <div className="exams-conduct-item">
                  <i className="fas fa-check"></i>
                  <span>Timetables published well in advance</span>
                </div>
                <div className="exams-conduct-item">
                  <i className="fas fa-check"></i>
                  <span>Results reviewed and communicated promptly</span>
                </div>
                <div className="exams-conduct-item">
                  <i className="fas fa-check"></i>
                  <span>Marking aligned with national marking schemes</span>
                </div>
              </div>
            </div>
            <div className="exams-conduct-img">
              <img src="/images/secondary/students_standing.JPG" alt="Examination hall" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="exams-results">
        <div className="container">
          <div className="exams-results-inner">
            <span className="exams-eyebrow">After the Exam</span>
            <h2 className="exams-results-heading">Results &amp; Reporting</h2>
            <p className="exams-results-text">
              Following each examination period, results are compiled and communicated
              to students and parents through formal report cards. Our report cards
              provide a detailed breakdown of performance by subject, with teacher
              comments and guidance for improvement where needed.
            </p>
            <div className="exams-results-steps">
              <div className="exams-result-step">
                <div className="exams-result-step-icon"><i className="fas fa-pen-nib"></i></div>
                <div className="exams-result-step-text">
                  <strong>Marking &amp; Moderation</strong>
                  <span>Scripts are marked and internally moderated for accuracy and consistency.</span>
                </div>
              </div>
              <div className="exams-result-step-arrow"><i className="fas fa-chevron-right"></i></div>
              <div className="exams-result-step">
                <div className="exams-result-step-icon"><i className="fas fa-chart-line"></i></div>
                <div className="exams-result-step-text">
                  <strong>Grading &amp; Analysis</strong>
                  <span>Grades are assigned and performance patterns identified to inform teaching.</span>
                </div>
              </div>
              <div className="exams-result-step-arrow"><i className="fas fa-chevron-right"></i></div>
              <div className="exams-result-step">
                <div className="exams-result-step-icon"><i className="fas fa-file-alt"></i></div>
                <div className="exams-result-step-text">
                  <strong>Report Cards</strong>
                  <span>Detailed reports are issued to parents with grades, comments, and teacher guidance.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="exams-closing">
        <div className="container">
          <div className="exams-closing-inner">
            <span className="exams-eyebrow">Learn More</span>
            <h2 className="exams-closing-heading">Every Student Can Achieve Their Best</h2>
            <p>
              Our examinations programme is built on preparation, support, and fairness.
              We are committed to giving every student at St. Lawrence Academy the
              foundation they need to perform with confidence and succeed.
            </p>
            <a href="/curriculum" className="exams-closing-btn">
              <i className="fas fa-arrow-right"></i> View Academics
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Examinations;
