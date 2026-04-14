import { useEffect } from 'react';
import './ApplicationProcess.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const steps = [
  {
    tag: 'Step 1',
    title: 'Contact the Admissions Office',
    body: 'Begin by reaching out to our admissions team to express your interest and learn about available places for the upcoming term. Our team will provide you with all the information you need to proceed.',
    checks: [
      'Call or visit the admissions office',
      'Confirm available places for your child\'s level',
      'Receive the admissions information pack',
    ],
  },
  {
    tag: 'Step 2',
    title: 'Collect & Complete the Application Form',
    body: 'Obtain the official application form from the admissions office. Fill in all sections accurately and completely. Incomplete forms will not be processed.',
    checks: [
      'Pick up the form from the admissions office',
      'Complete all sections — do not leave fields blank',
      'Have a parent or guardian sign the declaration',
    ],
  },
  {
    tag: 'Step 3',
    title: 'Gather Required Documents',
    body: 'Compile all supporting documents before submitting your application. Please ensure all documents are originals or certified copies where required. See the Requirements page for the full list by school level.',
    checks: [
      'Birth certificate (original + copy)',
      'Latest school report card',
      'Passport photos (2 recent)',
      'Parent or guardian ID copy',
      'Transfer letter from previous school (if applicable)',
    ],
  },
  {
    tag: 'Step 4',
    title: 'Submit Your Application',
    body: 'Bring the completed form and all documents to the admissions office in person. Applications submitted by a third party must include written authorisation from the parent or guardian.',
    checks: [
      'Submit during office hours: Mon – Fri, 8:00 AM – 4:00 PM',
      'Receive an acknowledgement receipt',
      'Pay the non-refundable application processing fee',
    ],
  },
  {
    tag: 'Step 5',
    title: 'Assessment & Interview',
    body: 'Depending on the level of entry, your child may be invited for a short assessment and/or an informal interview with the head of section. This helps us place each learner appropriately.',
    checks: [
      'Nursery: informal play-based observation',
      'Primary: short literacy and numeracy assessment',
      'Secondary: subject-based placement test',
    ],
  },
  {
    tag: 'Step 6',
    title: 'Admission Decision & Offer Letter',
    body: 'Following assessment, the admissions team will review your application and notify you of the outcome. Successful applicants will receive a formal offer letter outlining next steps.',
    checks: [
      'Decision communicated within 5 – 7 working days',
      'Offer letter issued to successful applicants',
      'Place reserved for 7 days pending acceptance',
    ],
  },
  {
    tag: 'Step 7',
    title: 'Accept the Offer & Pay Fees',
    body: 'To confirm your child\'s place, sign and return the acceptance form with the required term fees paid before the deadline stated in the offer letter. Places are only confirmed upon receipt of fees.',
    checks: [
      'Sign and return the acceptance form',
      'Pay the first term\'s school fees in full',
      'Receive confirmation of enrolment and orientation details',
    ],
  },
];

const timeline = [
  { step: 'Step 1', title: 'Enquire', body: 'Contact the admissions office to check availability and collect your application pack.' },
  { step: 'Step 2–3', title: 'Apply', body: 'Complete the form, gather documents, and submit in person at the admissions office.' },
  { step: 'Step 4–5', title: 'Assess', body: 'Your child attends a brief assessment. Results reviewed by the head of section.' },
  { step: 'Step 6–7', title: 'Enrol', body: 'Receive your offer, accept, pay fees, and confirm your child\'s place.', highlight: true },
];

const prepareAll = [
  'Birth certificate — original and a copy',
  'Passport-size photos (2, recent)',
  'Latest school report card',
  'Parent or guardian ID copy',
];

const prepareSecondary = [
  'PLE certificate (for S1 entry)',
  'Transfer letter from current school (if mid-year)',
  'Recommendation letter from previous head teacher (optional)',
];

const ApplicationProcess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Application Process', 'How to apply to St. Lawrence Academy, Juba — step-by-step guide for parents and guardians.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="apply-page">

      {/* ── Hero ── */}
      <section className="apply-hero">
        <div className="apply-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="apply-hero-overlay"></div>
        <div className="apply-hero-content">
          <div className="container">
            <div className="apply-hero-inner">
              <span className="apply-hero-label">Admissions</span>
              <h1 className="apply-hero-title">Application <span>Process</span></h1>
              <p className="apply-hero-sub">
                A clear, step-by-step guide to joining St. Lawrence Academy —
                from your first enquiry to your child's first day of school.
              </p>
              <a href="/admissions/contact" className="apply-hero-cta">
                <i className="fas fa-phone"></i> Contact Admissions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="apply-mobile-band">
        <div className="container">
          <h2 className="apply-mobile-band-heading">Application Process</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="apply-intro">
        <div className="container">
          <div className="apply-intro-inner">
            <span className="apply-eyebrow">How to Apply</span>
            <h2 className="apply-intro-heading">Seven Simple Steps to Joining Our School</h2>
            <p className="apply-intro-text">
              We welcome applications for Nursery, Primary, and Secondary levels throughout the
              year, subject to availability. Our admissions process is straightforward and
              designed to help families make a confident, informed decision. Below is everything
              you need to know — from your first contact with us to the moment your child walks
              through our gates.
            </p>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="apply-steps">
        <div className="container">
          <div className="apply-steps-header">
            <span className="apply-eyebrow">The Process</span>
            <h2 className="apply-steps-heading">Step-by-Step Application Guide</h2>
          </div>
          <div className="apply-steps-list">
            {steps.map((s, i) => (
              <div className="apply-step reveal" key={i}>
                <div className="apply-step-num-wrap">
                  <div className="apply-step-num">
                    <span>0{i + 1}</span>
                  </div>
                </div>
                <div className="apply-step-body">
                  <span className="apply-step-tag" data-num={String(i + 1).padStart(2, '0')}>{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.checks && (
                    <div className="apply-step-checklist">
                      {s.checks.map((c, j) => (
                        <div className="apply-step-check" key={j}>
                          <i className="fas fa-check-circle"></i>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline Summary ── */}
      <section className="apply-timeline">
        <div className="container">
          <div className="apply-timeline-header">
            <span className="apply-eyebrow">At a Glance</span>
            <h2 className="apply-timeline-heading">The Admissions Journey</h2>
            <p className="apply-timeline-sub">
              From first contact to confirmed enrolment — typically completed within two weeks.
            </p>
          </div>
          <div className="apply-timeline-grid">
            {timeline.map((t, i) => (
              <div className={`apply-tl-card reveal${t.highlight ? ' apply-tl-card--highlight' : ''}`} key={i}>
                <span className="apply-tl-step">{t.step}</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Prepare ── */}
      <section className="apply-prepare">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <span className="apply-eyebrow">Documents</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#111', margin: '0.5rem 0 0.5rem' }}>
              What to Prepare
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
              Please have these documents ready before visiting the admissions office.
              For the full requirements list by school level, see the Requirements page.
            </p>
          </div>
          <div className="apply-prepare-grid">
            <div className="apply-prepare-col reveal">
              <h3>All Applicants</h3>
              <div className="apply-prepare-items">
                {prepareAll.map((item, i) => (
                  <div className="apply-prepare-item" key={i}>
                    <i className="fas fa-file-alt"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="apply-prepare-col reveal">
              <h3>Secondary Entry (Additional)</h3>
              <div className="apply-prepare-items">
                {prepareSecondary.map((item, i) => (
                  <div className="apply-prepare-item" key={i}>
                    <i className="fas fa-file-alt"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="apply-closing">
        <div className="container">
          <div className="apply-closing-inner reveal">
            <span className="apply-eyebrow">Ready to Begin?</span>
            <h2>Start Your Application Today</h2>
            <p>
              Our admissions team is available Monday to Friday, 8:00 AM – 4:00 PM.
              You are welcome to call, email, or come in person to begin the process.
              We look forward to welcoming your family to St. Lawrence Academy.
            </p>
            <a href="/admissions/contact" className="apply-closing-btn">
              Contact Admissions <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ApplicationProcess;
