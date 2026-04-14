import { useEffect } from 'react';
import './Fees.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const feeStructure = [
  {
    level: 'Nursery School',
    badge: 'Baby, Middle & Top Class',
    rows: [
      { item: 'Tuition Fee',                  note: 'Per term' },
      { item: 'Activity & Learning Materials', note: 'Per term' },
      { item: 'Uniform',                       note: 'One-off at enrolment' },
    ],
    totalNote: 'per term (excl. uniform)',
  },
  {
    level: 'Primary School',
    badge: 'P1 – P8',
    rows: [
      { item: 'Tuition Fee',        note: 'Per term' },
      { item: 'Textbooks & Materials', note: 'Per term' },
      { item: 'Examination Fee',    note: 'Term 3 only — internal exams' },
      { item: 'PLE Registration',   note: 'P8 students — Term 3 only' },
      { item: 'Uniform',            note: 'One-off at enrolment' },
    ],
    totalNote: 'per term (excl. PLE & uniform)',
  },
  {
    level: 'Secondary School',
    badge: 'S1 – S4',
    rows: [
      { item: 'Tuition Fee',                    note: 'Per term' },
      { item: 'Textbooks & Materials',           note: 'Per term' },
      { item: 'Laboratory / Practical Fee',      note: 'Per term — Science students' },
      { item: 'Examination Fee',                 note: 'Term 3 only — internal exams' },
      { item: 'SSCSE Registration',              note: 'S4 students — once per year' },
      { item: 'Uniform',                         note: 'One-off at enrolment' },
    ],
    totalNote: 'per term (excl. SSCSE & uniform)',
  },
];

const schedule = [
  {
    term: 'Term 1',
    heading: 'February',
    body: 'All Term 1 fees must be paid in full before your child\'s first day. The payment deadline is one week before term opens.',
  },
  {
    term: 'Term 2',
    heading: 'June',
    body: 'Term 2 fees are due by the last week of Term 1. Early payment is encouraged. A payment confirmation receipt must be presented at the start of term.',
  },
  {
    term: 'Term 3',
    heading: 'September',
    body: 'Term 3 fees including any examination fees are due before the start of term. National exam fees (PLE / SSCSE) are collected separately.',
  },
];

const methods = [
  { title: 'Cash Payment',    body: 'Pay directly at the school administration office during office hours, Monday to Friday 8:00 AM – 4:00 PM.' },
  { title: 'Bank Transfer',   body: 'Transfers accepted to the school\'s official bank account. Bring your deposit slip to the administration office for confirmation.' },
  { title: 'Mobile Money',    body: 'Payments via mobile money are accepted. Contact the administration office for the registered number.' },
  { title: 'Instalment Plan', body: 'Families who require a payment arrangement should contact the administration office before the term payment deadline.' },
];

const notes = [
  { text: <><strong>Fee amounts will be published shortly.</strong> Please contact the admissions office directly for the current fee schedule. Fees are subject to review at the start of each academic year.</> },
  { text: <><strong>Application processing fee:</strong> A non-refundable processing fee is charged at the time of submitting your application. This does not count toward term fees.</> },
  { text: <><strong>Fees must be paid in full</strong> before a student can begin attending classes. Students with outstanding fees from a previous term may be asked to remain at home until the balance is cleared.</> },
  { text: <><strong>Refund policy:</strong> Fees are non-refundable once a student has attended class for the term. Partial refunds may be considered in exceptional circumstances at the administration's discretion.</> },
  { text: <><strong>Uniform costs</strong> are charged once at the time of enrolment. Replacement uniforms are purchased separately from the school's uniform supplier.</> },
  { text: <>For <strong>financial hardship or fee assistance enquiries</strong>, please speak directly and confidentially with the school administration.</> },
];

const Fees = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Fees & Payment', 'School fees and payment information for St. Lawrence Academy — Nursery, Primary, and Secondary levels.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="fees-page">

      {/* ── Hero ── */}
      <section className="fees-hero">
        <div className="fees-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="fees-hero-overlay"></div>
        <div className="fees-hero-content">
          <div className="container">
            <div className="fees-hero-inner">
              <span className="fees-hero-label">Admissions</span>
              <h1 className="fees-hero-title">Fees &amp; <span>Payment</span></h1>
              <p className="fees-hero-sub">
                Fee structure, payment schedule, and accepted payment methods
                for St. Lawrence Academy — 2026 academic year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="fees-mobile-band">
        <div className="container">
          <h2 className="fees-mobile-band-heading">Fees &amp; Payment</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="fees-intro">
        <div className="container">
          <div className="fees-intro-inner">
            <span className="fees-eyebrow">2026 School Fees</span>
            <h2 className="fees-intro-heading">Clear, Honest Fees for Every Family</h2>
            <p className="fees-intro-text">
              St. Lawrence Academy is committed to transparency in all fee matters.
              The fee structure below outlines what is charged at each school level.
              Current fee amounts can be confirmed by contacting the admissions office
              directly. If you have any questions, our team is happy to assist.
            </p>
          </div>
        </div>
      </section>

      {/* ── Fee Tables ── */}
      <section className="fees-tables">
        <div className="container">
          <div className="fees-section-header">
            <span className="fees-eyebrow">Fee Structure</span>
            <h2 className="fees-section-heading">School Fees by Level — 2026</h2>
            <p className="fees-section-sub">
              All amounts are per term unless otherwise stated.
              Contact the admissions office for the current fee schedule.
            </p>
          </div>
          <div className="fees-levels">
            {feeStructure.map((level, i) => (
              <div className="fees-level-block reveal" key={i}>
                <div className="fees-level-head">
                  <h3>{level.level}</h3>
                  <span className="fees-level-badge">{level.badge}</span>
                </div>
                <table className="fees-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Note</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {level.rows.map((row, j) => (
                      <tr key={j}>
                        <td>{row.item}</td>
                        <td><span className="fees-table-note">{row.note}</span></td>
                        <td className="fees-amount-nil">—</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>Term Total <span className="fees-table-note">{level.totalNote}</span></td>
                      <td className="fees-amount-nil">Contact office</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
          <p className="fees-table-disclaimer">
            <i className="fas fa-info-circle"></i> Fee amounts are available on request. Please contact the admissions office or visit us in person.
          </p>
        </div>
      </section>

      {/* ── Payment Schedule ── */}
      <section className="fees-schedule">
        <div className="container">
          <div className="fees-section-header">
            <span className="fees-eyebrow">When to Pay</span>
            <h2 className="fees-section-heading">Payment Schedule</h2>
            <p className="fees-section-sub">
              Fees are due before the start of each term. Please plan ahead to avoid delays.
            </p>
          </div>
          <div className="fees-schedule-grid">
            {schedule.map((s, i) => (
              <div className="fees-schedule-card reveal" key={i}>
                <h3>{s.term}</h3>
                <h4>Due in {s.heading}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Payment Methods ── */}
      <section className="fees-methods">
        <div className="container">
          <div className="fees-section-header">
            <span className="fees-eyebrow">How to Pay</span>
            <h2 className="fees-section-heading">Accepted Payment Methods</h2>
            <p className="fees-section-sub">
              We offer several convenient ways to pay school fees.
            </p>
          </div>
          <div className="fees-methods-grid">
            {methods.map((m, i) => (
              <div className="fees-method-card reveal" key={i}>
                <div className="fees-method-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{m.title}</h4>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Important Notes ── */}
      <section className="fees-notes">
        <div className="container">
          <div className="fees-notes-inner">
            <span className="fees-eyebrow">Please Note</span>
            <h3>Important Information</h3>
            <div className="fees-note-items">
              {notes.map((note, i) => (
                <div className="fees-note-item reveal" key={i}>
                  <i className="fas fa-info-circle"></i>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>
            <div className="fees-cta">
              <a href="/admissions/contact" className="fees-cta-link">
                Contact Admissions <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Fees;
