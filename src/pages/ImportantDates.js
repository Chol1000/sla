import { useEffect } from 'react';
import './ImportantDates.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const terms = [
  {
    label: 'Term 1',
    current: true,
    days: '70 instructional days',
    rows: [
      { key: 'Registration', value: 'To be announced', past: true },
      { key: 'Term Opens', value: '2 Feb 2026', past: true },
      { key: 'Term Closes', value: '15 May 2026', past: false },
    ],
  },
  {
    label: 'Term 2',
    current: false,
    days: '68 instructional days',
    rows: [
      { key: 'Registration', value: 'To be announced', past: false },
      { key: 'Term Opens', value: '1 Jun 2026', past: false },
      { key: 'Term Closes', value: '4 Sep 2026', past: false },
    ],
  },
  {
    label: 'Term 3',
    current: false,
    days: '65 instructional days',
    rows: [
      { key: 'Registration', value: 'To be announced', past: false },
      { key: 'Term Opens', value: '21 Sep 2026', past: false },
      { key: 'Term Closes', value: '18 Dec 2026', past: false },
    ],
  },
];

const holidays = [
  { day: '1',   month: 'Jan', name: "New Year's Day",            note: 'Public holiday — school closed' },
  { day: '22',  month: 'Feb', name: 'Nile Day',                  note: 'National holiday celebrating the River Nile — passed' },
  { day: '8',   month: 'Mar', name: "International Women's Day", note: 'Public holiday' },
  { day: '3',   month: 'Apr', name: 'Good Friday',               note: 'Easter holiday — school closed' },
  { day: '6',   month: 'Apr', name: 'Easter Monday',             note: 'Easter holiday — school closed' },
  { day: '1',   month: 'May', name: 'International Labour Day',  note: 'Public holiday' },
  { day: '16',  month: 'May', name: 'SPLA Day',                  note: 'Anniversary of the founding of the SPLA, 1983' },
  { day: '~26', month: 'May', name: 'Eid al-Fitr',               note: 'End of Ramadan — variable, follows Islamic lunar calendar' },
  { day: '9',   month: 'Jul', name: 'Independence Day',          note: 'Republic of South Sudan independence, 2011' },
  { day: '30',  month: 'Jul', name: "Martyrs' Day",              note: "In honour of Dr. John Garang and South Sudan's fallen heroes" },
  { day: '3',   month: 'Aug', name: 'Eid al-Adha',               note: 'Feast of the Sacrifice — variable, follows Islamic lunar calendar' },
  { day: '25',  month: 'Dec', name: 'Christmas Day',             note: 'Public holiday — school closed' },
  { day: '26',  month: 'Dec', name: 'Christmas Holiday',         note: 'Second day of Christmas — school closed' },
];

const examDates = [
  { period: 'Throughout Year', event: 'Internal Termly Assessments', detail: 'All classes — structured end-of-term examinations set and marked internally.' },
  { period: 'Term 3 — P7 & P8', event: 'PLE Mock Examinations', detail: 'Upper primary students sit mock papers under examination conditions to prepare for the national PLE.' },
  { period: 'Term 3 — S3 & S4', event: 'SSCSE Mock Examinations', detail: 'Secondary students sit mock SSCSE papers across all subjects with full examination conditions.' },
  { period: 'End of Year — P8', event: 'Primary Leaving Examination (PLE)', detail: 'National examination administered by the South Sudan National Examinations Council (SSNEC).' },
  { period: 'End of Year — S4', event: 'South Sudan Certificate of Secondary Education (SSCSE)', detail: 'National secondary examination — results determine university and professional training entry.' },
];

const ImportantDates = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Important Dates', 'Academic calendar, public holidays, and key examination dates for St. Lawrence Academy, Juba, South Sudan.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="dates-page">

      {/* ── Hero ── */}
      <section className="dates-hero">
        <div className="dates-hero-bg">
          <img src="/sla_school_overview.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="dates-hero-overlay"></div>
        <div className="dates-hero-content">
          <div className="container">
            <div className="dates-hero-inner">
              <span className="dates-hero-label">Admissions</span>
              <h1 className="dates-hero-title">Important <span>Dates</span></h1>
              <p className="dates-hero-sub">
                Academic calendar, public holidays, and key examination dates
                for the 2026 school year at St. Lawrence Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="dates-mobile-band">
        <div className="container">
          <h2 className="dates-mobile-band-heading">Important Dates</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="dates-intro">
        <div className="container">
          <div className="dates-intro-inner">
            <span className="dates-eyebrow">2026 School Year</span>
            <h2 className="dates-intro-heading">Plan the Year Ahead</h2>
            <p className="dates-intro-text">
              St. Lawrence Academy follows the academic calendar set by the
              Government of South Sudan, Ministry of General Education and Instruction.
              All term dates, examinations, and school closures listed below are for
              the 2026 academic year.
            </p>
          </div>
        </div>
      </section>

      {/* ── Academic Calendar ── */}
      <section className="dates-calendar">
        <div className="container">
          <div className="dates-section-header">
            <span className="dates-eyebrow">Term Dates</span>
            <h2 className="dates-section-heading">Academic Calendar 2026</h2>
            <p className="dates-section-sub">
              Official dates as released by the Ministry of General Education and
              Instruction. Registration dates will be confirmed by the school.
            </p>
          </div>
          <div className="dates-calendar-grid">
            {terms.map((term, i) => (
              <div className={`dates-term-card reveal${term.current ? ' dates-term-card--current' : ''}`} key={i}>
                <div className="dates-term-head">
                  <span>{term.label}</span>
                  {term.current && <span className="dates-term-badge">Current Term</span>}
                </div>
                <div className="dates-term-days">{term.days}</div>
                <div className="dates-term-rows">
                  {term.rows.map((row, j) => (
                    <div className={`dates-term-row${row.past ? ' dates-term-row--past' : ''}`} key={j}>
                      <span>{row.key}</span>
                      <em>{row.value}</em>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Public Holidays ── */}
      <section className="dates-holidays">
        <div className="container">
          <div className="dates-section-header">
            <span className="dates-eyebrow">School Closures</span>
            <h2 className="dates-section-heading">Public Holidays 2026</h2>
            <p className="dates-section-sub">
              St. Lawrence Academy observes all officially declared public holidays
              of the Republic of South Sudan. The school will be closed on these dates.
            </p>
          </div>
          <div className="dates-holidays-grid">
            {holidays.map((h, i) => (
              <div className="dates-holiday-card reveal" key={i}>
                <div className="dates-holiday-badge">
                  <span className="dates-holiday-badge-day">{h.day}</span>
                  <span className="dates-holiday-badge-month">{h.month}</span>
                </div>
                <div className="dates-holiday-info">
                  <strong>{h.name}</strong>
                  <span>{h.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Examinations ── */}
      <section className="dates-exams">
        <div className="container">
          <div className="dates-section-header">
            <span className="dates-eyebrow">Assessments & Exams</span>
            <h2 className="dates-section-heading">Key Examination Dates</h2>
            <p className="dates-section-sub">
              Internal assessments run every term. National examinations follow the
              schedule set by the South Sudan National Examinations Council (SSNEC).
            </p>
          </div>
          <div className="dates-exams-list">
            {examDates.map((e, i) => (
              <div className="dates-exam-row reveal" key={i}>
                <div className="dates-exam-num">0{i + 1}</div>
                <div className="dates-exam-body">
                  <div className="dates-exam-period">{e.period}</div>
                  <h3>{e.event}</h3>
                  <p>{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notice ── */}
      <section className="dates-notice">
        <div className="container">
          <div className="dates-notice-inner reveal">
            <span className="dates-eyebrow">Stay Informed</span>
            <h3>Stay Up to Date</h3>
            <p>
              Term dates and examination schedules are confirmed by the Ministry of
              General Education and Instruction and may be subject to change.
              Families are notified through school notices and the newsletter when
              dates are confirmed or updated.
            </p>
            <div className="dates-notice-links">
              <a href="/admissions/contact" className="dates-notice-link">
                Contact Admissions <i className="fas fa-arrow-right"></i>
              </a>
              <a href="/admissions/apply" className="dates-notice-link">
                Admissions Overview <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ImportantDates;
