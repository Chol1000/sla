import { useState, useEffect } from 'react';
import './Requirements.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const docsByLevel = {
  nursery: {
    required: [
      { icon: 'fa-file-alt',      title: 'Birth Certificate',       note: 'Original + 1 photocopy',              type: 'required' },
      { icon: 'fa-camera',        title: 'Passport Photos',          note: '2 recent passport-size photos',        type: 'required' },
      { icon: 'fa-id-card',       title: 'Parent / Guardian Details', note: 'Name, contact, and ID copy',          type: 'required' },
    ],
    additional: [
      { icon: 'fa-user-check',    title: 'Recommendation Letter',    note: 'From previous nursery or pre-school — optional but helpful', type: 'optional' },
    ],
  },
  primary: {
    required: [
      { icon: 'fa-file-alt',      title: 'Birth Certificate',        note: 'Original + 1 photocopy',              type: 'required' },
      { icon: 'fa-camera',        title: 'Passport Photos',          note: '2 recent passport-size photos',        type: 'required' },
      { icon: 'fa-graduation-cap', title: 'Latest Report Card',      note: 'Most recent school report',           type: 'required' },
      { icon: 'fa-id-card',       title: 'Parent / Guardian Details', note: 'Name, contact, and ID copy',         type: 'required' },
    ],
    additional: [
      { icon: 'fa-user-check',    title: 'Recommendation Letter',    note: 'From previous school head teacher — optional but beneficial', type: 'optional' },
    ],
  },
  secondary: {
    required: [
      { icon: 'fa-file-alt',      title: 'Birth Certificate',        note: 'Original + 1 photocopy',              type: 'required' },
      { icon: 'fa-camera',        title: 'Passport Photos',          note: '2 recent passport-size photos',        type: 'required' },
      { icon: 'fa-graduation-cap', title: 'Latest Report Card',      note: 'Most recent school report',           type: 'required' },
      { icon: 'fa-award',         title: 'PLE Certificate',          note: 'For S1 entry — Primary Leaving Examination results', type: 'required' },
      { icon: 'fa-id-card',       title: 'Parent / Guardian Details', note: 'Name, contact, and ID copy',         type: 'required' },
    ],
    additional: [
      { icon: 'fa-user-check',    title: 'Recommendation Letter',    note: 'From previous head teacher — optional but beneficial', type: 'optional' },
    ],
  },
};

const conductItems = [
  'St. Lawrence Academy expects all students to uphold the school\'s code of conduct from their first day.',
  'Parents and guardians are required to read and sign the school rules and parental agreement as part of enrolment.',
  'Students transferring from other schools must have a satisfactory conduct record.',
  'Any history of disciplinary action at a previous school must be disclosed during application.',
];

const onAdmissionItems = [
  'All remaining forms, including the enrolment form, emergency contacts, and medical disclosure, are completed at the time of admission.',
  'The school rules and parental agreement are signed in person at the admissions office.',
  'Uniform information and payment details are provided upon acceptance.',
  'A welcome pack and orientation schedule will be given once fees are confirmed.',
];

const Requirements = () => {
  const [activeTab, setActiveTab] = useState('nursery');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Admission Requirements', 'Documents needed to apply to St. Lawrence Academy — Nursery, Primary, and Secondary levels.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  const panel = docsByLevel[activeTab];

  return (
    <div className="req-page">

      {/* ── Hero ── */}
      <section className="req-hero">
        <div className="req-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="req-hero-overlay"></div>
        <div className="req-hero-content">
          <div className="container">
            <div className="req-hero-inner">
              <span className="req-hero-label">Admissions</span>
              <h1 className="req-hero-title">Admission <span>Requirements</span></h1>
              <p className="req-hero-sub">
                Documents needed to apply for Nursery, Primary, and Secondary
                entry at St. Lawrence Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="req-mobile-band">
        <div className="container">
          <h2 className="req-mobile-band-heading">Requirements</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="req-intro">
        <div className="container">
          <div className="req-intro-inner">
            <span className="req-eyebrow">What to Bring</span>
            <h2 className="req-intro-heading">Simple Requirements for Every Application</h2>
            <p className="req-intro-text">
              We keep our requirements straightforward. Bring the documents listed below
              when you visit the admissions office. Additional forms — including the
              enrolment form and parental agreement — are completed together with our
              team on the day of admission.
            </p>
          </div>
        </div>
      </section>

      {/* ── Document Requirements ── */}
      <section className="req-docs">
        <div className="container">
          <div className="req-section-header">
            <span className="req-eyebrow">Documents</span>
            <h2 className="req-section-heading">What to Bring — by School Level</h2>
            <p className="req-section-sub">
              Select your child's school level to see exactly what to bring.
            </p>
          </div>

          <div className="req-docs-tabs">
            {['nursery', 'primary', 'secondary'].map(tab => (
              <button
                key={tab}
                className={`req-docs-tab${activeTab === tab ? ' req-docs-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="req-docs-panel req-docs-panel--active">

            {/* Required */}
            <p className="req-doc-list-heading">Required Documents</p>
            <div className="req-doc-list">
              {panel.required.map((doc, i) => (
                <div className="req-doc-row reveal" key={i}>
                  <div className="req-doc-row-body">
                    <strong>{doc.title}</strong>
                    <span>{doc.note}</span>
                  </div>
                  <span className="req-doc-badge req-doc-badge--required">Required</span>
                </div>
              ))}
            </div>

            {/* Optional */}
            <p className="req-doc-list-heading">Optional</p>
            <div className="req-doc-list">
              {panel.additional.map((doc, i) => (
                <div className="req-doc-row reveal" key={i}>
                  <div className="req-doc-row-body">
                    <strong>{doc.title}</strong>
                    <span>{doc.note}</span>
                  </div>
                  <span className="req-doc-badge req-doc-badge--optional">Optional</span>
                </div>
              ))}
            </div>

            {/* Collected on admission */}
            <div className="req-admission-note reveal">
              <strong>Remaining forms collected at admission</strong>
              <p>The enrolment form, emergency contacts, parental agreement, and other paperwork are completed together with our admissions team on the day of registration — you do not need to prepare these in advance.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Conduct & On Admission ── */}
      <section className="req-health">
        <div className="container">
          <div className="req-section-header">
            <span className="req-eyebrow">At Registration</span>
            <h2 className="req-section-heading">What Happens on Admission Day</h2>
            <p className="req-section-sub">
              Once your application is accepted and fees are confirmed, this is what
              you can expect when you come in to complete enrolment.
            </p>
          </div>
          <div className="req-health-grid">
            <div className="req-health-card reveal">
              <h3>On Admission Day</h3>
              <div className="req-health-items">
                {onAdmissionItems.map((item, i) => (
                  <div className="req-health-item" key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="req-health-card reveal">
              <h3>Conduct &amp; School Rules</h3>
              <div className="req-health-items">
                {conductItems.map((item, i) => (
                  <div className="req-health-item" key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Note / CTA ── */}
      <section className="req-note">
        <div className="container">
          <div className="req-note-inner reveal">
            <span className="req-eyebrow">Need Help?</span>
            <h3>Questions About Requirements?</h3>
            <p>
              If you are unsure about any document or requirement, our admissions team
              is happy to help before you come in.
            </p>
            <div className="req-note-links">
              <a href="/admissions/contact" className="req-note-link">
                Contact Admissions <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Requirements;
