import { useEffect, useState } from 'react';
import './FAQ.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const categories = ['All', 'General', 'Admissions', 'Academic', 'Student Life', 'Fees'];

const faqs = [
  // ── General ──
  {
    cat: 'General',
    q: 'Where is St. Lawrence Academy located?',
    a: 'St. Lawrence Academy is located in Juba, Central Equatoria, South Sudan. The school is easily accessible and welcomes students from across the city and surrounding areas.',
  },
  {
    cat: 'General',
    q: 'When was St. Lawrence Academy founded?',
    a: 'St. Lawrence Academy was founded in 2020 with a mission to provide quality, character-centred education to children in South Sudan. Since opening, the school has grown steadily and now serves students across Nursery, Primary, and Secondary levels.',
  },
  {
    cat: 'General',
    q: 'What age groups does SLA cater to?',
    a: 'St. Lawrence Academy offers education from Nursery through to Secondary school — welcoming children from as young as 3 years old through to the end of their secondary education.',
  },
  {
    cat: 'General',
    q: 'What is the medium of instruction at SLA?',
    a: 'English is the primary medium of instruction at St. Lawrence Academy. All core subjects are taught in English, and students are supported in developing strong English language proficiency throughout their time at school.',
  },
  {
    cat: 'General',
    q: 'What are the school hours?',
    a: 'The school day typically runs from Monday to Friday. Students are expected to arrive before classes begin in the morning and may remain on campus for supervised activities in the afternoon. Exact timings are communicated at the start of each term.',
  },
  {
    cat: 'General',
    q: 'Is St. Lawrence Academy a faith-based school?',
    a: 'St. Lawrence Academy was founded on Christian values and is committed to moral and character formation as a core part of its education. Students of all faiths and backgrounds are warmly welcomed into the school community.',
  },

  // ── Admissions ──
  {
    cat: 'Admissions',
    q: 'How do I apply to St. Lawrence Academy?',
    a: 'Applications can be made by visiting the school directly or through our admissions office. Parents are encouraged to contact us ahead of the new academic term to enquire about available places and begin the enrollment process. You can also use the contact form on our website.',
  },
  {
    cat: 'Admissions',
    q: 'What documents are required for enrollment?',
    a: 'Required documents typically include the student\'s birth certificate, recent passport-size photographs, previous school reports or transcripts (for transfers), and a completed application form. Specific requirements may vary by level — contact the admissions office for a full list.',
  },
  {
    cat: 'Admissions',
    q: 'Is there an entrance test for new students?',
    a: 'Students applying to Primary and Secondary levels may be assessed to help the school understand their academic level and ensure they are placed appropriately. This is not a barrier to entry — it is a tool to support each student from day one.',
  },
  {
    cat: 'Admissions',
    q: 'When does the academic year begin?',
    a: 'The academic year at St. Lawrence Academy follows the South Sudan national school calendar. The year is divided into three terms: Term 1 begins in February, Term 2 opens in June, and Term 3 runs from September through to December. Exact dates for each academic year are published on our Important Dates page.',
  },
  {
    cat: 'Admissions',
    q: 'Can my child join mid-term or mid-year?',
    a: 'Mid-term and mid-year admissions are considered on a case-by-case basis, subject to availability of places. We understand that circumstances vary — please contact the admissions office to discuss your situation and we will do our best to accommodate your child.',
  },
  {
    cat: 'Admissions',
    q: 'Do you accept students with special educational needs?',
    a: 'We are committed to inclusive education and aim to support every learner. Parents of children with specific learning needs are encouraged to speak with the admissions office before enrollment so that we can discuss how best to support their child.',
  },

  // ── Academic ──
  {
    cat: 'Academic',
    q: 'What curriculum does St. Lawrence Academy follow?',
    a: 'St. Lawrence Academy follows the South Sudan national curriculum, complemented by additional resources and approaches that reflect international best practices. Our goal is to provide a rigorous, relevant, and well-rounded academic experience for every student.',
  },
  {
    cat: 'Academic',
    q: 'What subjects are offered at secondary level?',
    a: 'Secondary students study a broad range of subjects including English, Mathematics, Sciences (Biology, Chemistry, Physics), Social Studies, History, Geography, Religious Education, and more. Physical Education and Arts are also part of the programme. A full subject list is available on the Subjects page.',
  },
  {
    cat: 'Academic',
    q: 'What qualifications do students leave with?',
    a: 'Students who complete their secondary education at St. Lawrence Academy sit national examinations and receive nationally recognised qualifications. Our academic programme is designed to prepare students for further education, vocational training, or entry into the workforce.',
  },
  {
    cat: 'Academic',
    q: 'How does SLA support students who are struggling academically?',
    a: 'Teachers at SLA take a personal interest in every student\'s progress. Students who are falling behind receive additional attention, peer tutoring support where available, and pastoral guidance from their teachers. No student is left to struggle without support.',
  },
  {
    cat: 'Academic',
    q: 'How are students assessed throughout the year?',
    a: 'Students are assessed through a combination of continuous assessment, end-of-term examinations, and practical work. Regular results are shared with parents and guardians to keep families informed of their child\'s progress throughout the year.',
  },

  // ── Student Life ──
  {
    cat: 'Student Life',
    q: 'Is there a school uniform?',
    a: 'Yes. St. Lawrence Academy students are required to wear the school uniform. Details of the uniform — including where it can be obtained — are provided to families upon enrollment and at the start of each academic year.',
  },
  {
    cat: 'Student Life',
    q: 'What meals are provided during the school day?',
    a: 'Students are provided with a morning break, lunch, and supper/dinner. All meals are freshly prepared on site. The school is committed to ensuring that no student goes without a meal during the school day.',
  },
  {
    cat: 'Student Life',
    q: 'What sports and activities are available to students?',
    a: 'SLA offers a wide range of co-curricular activities including football, basketball, athletics, netball, and more. Students also participate in arts, drama, music, and various clubs and societies. We encourage every student to find an activity they enjoy.',
  },
  {
    cat: 'Student Life',
    q: 'How does the school handle student discipline?',
    a: 'St. Lawrence Academy operates a firm but fair approach to discipline, rooted in respect, character formation, and personal responsibility. Issues are addressed in a structured way — always with the goal of helping students learn, grow, and do better. Serious matters are communicated to parents.',
  },
  {
    cat: 'Student Life',
    q: 'Is counseling available for students?',
    a: 'Yes. Pastoral care is embedded in our school culture. All teachers at SLA serve as mentors and guides for their students — providing academic, personal, and emotional support as needed. Students are always encouraged to speak to a trusted member of staff.',
  },
  {
    cat: 'Student Life',
    q: 'Are parents kept informed about school activities and their child\'s progress?',
    a: 'Yes. Regular communication with parents is a priority at SLA. This includes term-end reports, parents\' days, and ongoing communication through the school administration whenever needed.',
  },

  // ── Fees ──
  {
    cat: 'Fees',
    q: 'How much are the school fees?',
    a: 'School fees vary by level (Nursery, Primary, Secondary) and are reviewed at the start of each academic year. For the current fee schedule, please contact the school administration directly or visit the Fees & Payment page.',
  },
  {
    cat: 'Fees',
    q: 'When and how are fees paid?',
    a: 'Fees are typically paid on a termly basis before or at the beginning of each term. Payment can be made directly at the school. Details on accepted payment methods and deadlines are provided upon enrollment and communicated at the start of each term.',
  },
  {
    cat: 'Fees',
    q: 'Are scholarships or bursaries available?',
    a: 'St. Lawrence Academy is committed to making quality education accessible. We consider scholarship and financial assistance requests on a case-by-case basis. Families facing financial hardship are encouraged to speak with the school administration in confidence.',
  },
  {
    cat: 'Fees',
    q: 'What happens if fees are not paid on time?',
    a: 'We understand that circumstances can sometimes make timely payment difficult. We encourage parents to communicate with the school administration proactively if they are facing challenges. We will always aim to find a reasonable arrangement in the best interest of the student.',
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Frequently Asked Questions',
      'Answers to the most common questions about St. Lawrence Academy — admissions, academic programmes, student life, fees, and more.'
    );
    setTimeout(() => initScrollAnimations(), 100);
    return () => { window.speechSynthesis && window.speechSynthesis.cancel(); };
  }, []);

  useEffect(() => {
    setOpenIndex(null);
    window.speechSynthesis && window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  }, [activeCategory]);

  const filtered = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.cat === activeCategory);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const handleSpeak = (e, idx, item) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(`${item.q}. ${item.a}`);
    utter.rate = 0.95;
    utter.onend = () => setSpeakingIndex(null);
    utter.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="faq-page">

      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="faq-hero-bg">
          <img src="/images/secondary/assembly_overview.JPG" alt="St. Lawrence Academy" />
        </div>
        <div className="faq-hero-overlay"></div>
        <div className="faq-hero-content">
          <div className="container">
            <div className="faq-hero-inner">
              <span className="faq-hero-label">Help Centre</span>
              <h1 className="faq-hero-title">Frequently Asked <span>Questions</span></h1>
              <p className="faq-hero-sub">
                Find answers to the most common questions about life at
                St. Lawrence Academy — from admissions and fees to student life
                and academic programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="faq-mobile-band">
        <div className="container">
          <h2 className="faq-mobile-band-heading">FAQ</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="faq-intro">
        <div className="container">
          <div className="faq-intro-inner">
            <span className="faq-eyebrow">We Have Answers</span>
            <h2 className="faq-intro-heading">Everything You Need to Know</h2>
            <p className="faq-intro-text">
              Whether you are a prospective parent, a new student, or simply curious
              about what St. Lawrence Academy has to offer — this page is for you.
              If you cannot find the answer you are looking for, our team is always
              happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ body ── */}
      <section className="faq-body" id="questions">
        <div className="container">
          <div className="faq-body-inner">

          {/* Category filters */}
          <div className="faq-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`faq-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count line */}
          <p className="faq-count">
            Showing <strong>{filtered.length}</strong> question{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
          </p>

          {/* Accordion */}
          <div className="faq-accordion">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              const isSpeaking = speakingIndex === idx;
              return (
                <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`} key={idx}>
                  <div className="faq-question-row">
                    <button className="faq-question" onClick={() => toggle(idx)} aria-expanded={isOpen}>
                      <span className="faq-question-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="faq-question-text">{item.q}</span>
                      <span className="faq-question-meta">
                        <span className="faq-cat-badge">{item.cat}</span>
                        <span className="faq-chevron">
                          <i className={`fas fa-chevron-down${isOpen ? ' open' : ''}`}></i>
                        </span>
                      </span>
                    </button>
                    <button
                      className={`faq-audio-btn${isSpeaking ? ' faq-audio-btn--active' : ''}`}
                      onClick={(e) => handleSpeak(e, idx, item)}
                      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
                      title={isSpeaking ? 'Stop reading' : 'Listen to answer'}
                    >
                      <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-up'}`}></i>
                    </button>
                  </div>
                  <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          </div>{/* /faq-body-inner */}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="faq-contact">
        <div className="container">
          <div className="faq-contact-inner">
            <div className="faq-contact-text">
              <span className="faq-eyebrow">Still Have Questions?</span>
              <h2>We Are Happy to Help</h2>
              <p>
                If you did not find the answer you were looking for, please do not
                hesitate to reach out. Our administration team is available during
                school hours to assist parents, students, and visitors.
              </p>
            </div>
            <div className="faq-contact-actions">
              <a href="/contact" className="faq-contact-btn faq-contact-btn--primary">
                <i className="fas fa-envelope"></i>
                Send Us a Message
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
