import { useEffect, useState, useCallback } from 'react';
import './Subjects.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const NURSERY_DOMAINS = [
  { icon: 'fas fa-comment-dots', title: 'Language & Communication',    desc: 'Children develop early speaking and listening skills through stories, songs, conversation, and guided activities that build vocabulary and confidence in expression.' },
  { icon: 'fas fa-book-open',    title: 'Early Literacy',               desc: 'Introduction to letters, sounds, and basic reading readiness. Children engage with picture books, phonics, and storytelling to lay the foundation for reading.' },
  { icon: 'fas fa-calculator',   title: 'Early Numeracy',               desc: 'Numbers, counting, shapes, and simple patterns through hands-on play-based activities that make early mathematics natural and enjoyable.' },
  { icon: 'fas fa-palette',      title: 'Creative Arts & Music',        desc: 'Drawing, painting, craft, singing, and movement activities that nurture imagination, fine motor skills, and creative expression in every child.' },
  { icon: 'fas fa-running',      title: 'Physical Development',         desc: 'Gross and fine motor development through play, outdoor activities, and structured physical exercises that build coordination, strength, and healthy habits.' },
  { icon: 'fas fa-heart',        title: 'Social & Emotional Growth',    desc: 'Children learn to interact, share, cooperate, and manage emotions in a nurturing environment that builds confidence, empathy, and a sense of belonging.' },
  { icon: 'fas fa-leaf',         title: 'Environmental Awareness',      desc: 'Age-appropriate exploration of the world around them — nature, animals, weather, and community — building early curiosity and scientific thinking.' },
  { icon: 'fas fa-star',         title: 'Values & Moral Development',   desc: 'Children are guided through stories and activities that instil good character — honesty, kindness, respect, and care for others — nurturing a strong moral foundation.' },
];

const PRIMARY_SUBJECTS = [
  { name: 'English',                       desc: 'Reading, writing, grammar, comprehension, and oral communication. English is the language of instruction and a core subject developed across all years of primary school.' },
  { name: 'Mathematics',                   desc: 'Number work, arithmetic, fractions, geometry, measurement, and problem-solving built through structured and practical learning throughout primary school.' },
  { name: 'Science',                       desc: 'Exploring the natural world through observation and experiment — living things, the human body, materials, forces, and basic environmental science.' },
  { name: 'Social Studies',                desc: 'Geography, history, civics, and culture — helping students understand their community, their country, and the world they live in as responsible citizens.' },
  { name: 'Christian Religious Education', desc: 'Bible stories, Christian values, prayer, and moral education — nurturing faith, character, and the ethical principles that guide students through life.' },
];

const SECONDARY_STREAMS = [
  {
    stream: 'Sciences',
    subjects: [
      { name: 'Biology',                desc: 'The study of living organisms — cells, genetics, ecology, human biology, and evolution through classroom theory and hands-on laboratory practicals.' },
      { name: 'Chemistry',              desc: 'Atoms, elements, reactions, and materials — combining classroom theory with structured laboratory experiments to develop analytical and practical skills.' },
      { name: 'Physics',                desc: 'Forces, energy, electricity, waves, and motion — developing analytical thinking and a strong foundation for engineering and scientific careers.' },
      { name: 'Additional Mathematics', desc: 'An extended mathematics programme covering advanced topics for students aiming for science, engineering, or highly academic career paths.' },
      { name: 'Agriculture',            desc: 'Practical and theoretical knowledge of crop production, animal husbandry, soil science, and sustainable farming highly relevant to South Sudan.' },
      { name: 'Computer Studies',       desc: 'ICT skills, software applications, digital literacy, and introductory programming — preparing students for a technology-driven world.' },
    ],
  },
  {
    stream: 'Arts',
    subjects: [
      { name: 'Commerce',               desc: 'Trade, business operations, marketing, and economic systems — a strong foundation for entrepreneurship and business-related careers.' },
      { name: 'History',                desc: 'African, world, and South Sudanese history — exploring the political and social forces that have shaped modern societies.' },
      { name: 'Geography',              desc: 'Physical and human geography — landforms, climate, population, development, and the environmental challenges facing our world.' },
      { name: 'Accounting',             desc: 'Bookkeeping, financial statements, and business accounts — core skills for finance, management, and professional careers.' },
      { name: 'Literature',             desc: 'Prose, poetry, drama, and literary analysis — developing critical thinking, empathy, and a deep appreciation for written expression.' },
    ],
  },
  {
    stream: 'Core Subjects',
    desc: 'Studied by all secondary students regardless of stream.',
    subjects: [
      { name: 'Mathematics',                       desc: 'Algebra, geometry, trigonometry, and statistics. A core subject for every student and the foundation of many career paths.' },
      { name: 'English',                           desc: 'Advanced reading, writing, comprehension, and oral communication — essential for academic success and professional life.' },
      { name: 'Christian Religious Education',     desc: 'In-depth study of the Bible, Christian doctrine, and ethics — encouraging personal reflection and moral development.' },
      { name: 'Citizenship',                       desc: 'Rights, responsibilities, governance, and national identity — preparing informed, active citizens of South Sudan.' },
    ],
  },
];

const Subjects = () => {
  const [activeTab, setActiveTab] = useState('nursery');

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveTab(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Subjects Offered', 'Explore the subjects offered at St. Lawrence Academy — from early childhood development to primary and secondary school curriculum.');
    setTimeout(() => initScrollAnimations(), 100);

    const sections = ['nursery', 'primary', 'secondary'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="subjects-page">

      {/* ── Hero ── */}
      <section className="subjects-hero">
        <div className="subjects-hero-bg">
          <img src="/images/secondary/library_2.jpg" alt="St. Lawrence Academy Subjects Offered" />
        </div>
        <div className="subjects-hero-overlay"></div>
        <div className="subjects-hero-content">
          <div className="container">
            <div className="subjects-hero-inner">
              <span className="subjects-hero-label">St. Lawrence Academy</span>
              <h1 className="subjects-hero-title">Subjects <span>Offered</span></h1>
              <p className="subjects-hero-sub">
                A broad and balanced curriculum — from early childhood foundations
                to advanced secondary studies — giving every student the knowledge
                and skills to build a successful future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="subjects-mobile-band">
        <div className="container">
          <h2 className="subjects-mobile-band-heading">Subjects Offered</h2>
        </div>
      </div>

      {/* ── Sticky Level Tabs ── */}
      <div className="subjects-tabs-bar">
        <div className="container">
          <div className="subjects-tabs">
            <button className={`subjects-tab ${activeTab === 'nursery'   ? 'active' : ''}`} onClick={() => scrollToSection('nursery')}>
              <i className="fas fa-child"></i> <span>Nursery School</span>
            </button>
            <button className={`subjects-tab ${activeTab === 'primary'   ? 'active' : ''}`} onClick={() => scrollToSection('primary')}>
              <i className="fas fa-pencil-alt"></i> <span>Primary School</span>
            </button>
            <button className={`subjects-tab ${activeTab === 'secondary' ? 'active' : ''}`} onClick={() => scrollToSection('secondary')}>
              <i className="fas fa-graduation-cap"></i> <span>Secondary School</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Nursery ── */}
      <section className="subjects-level-section" id="nursery">
        <div className="container">
          <div className="subjects-level-header">
            <span className="subjects-eyebrow">Foundation Years</span>
            <h2 className="subjects-level-heading">Nursery School</h2>
            <p className="subjects-level-sub">
              Our nursery programme focuses entirely on whole-child development.
              Rather than formal subjects, children are guided through structured
              developmental domains that build the physical, cognitive, social, and
              emotional foundations for all future learning.
            </p>
          </div>
          <div className="subjects-nursery-grid">
            {NURSERY_DOMAINS.map((d, i) => (
              <div className="subjects-nursery-card reveal" key={i}>
                <div className="subjects-nursery-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary ── */}
      <section className="subjects-level-section subjects-level-section--alt" id="primary">
        <div className="container">
          <div className="subjects-level-header">
            <span className="subjects-eyebrow">Primary School</span>
            <h2 className="subjects-level-heading">Primary School Subjects</h2>
            <p className="subjects-level-sub">
              Primary students follow a focused five-subject curriculum that builds
              strong literacy, numeracy, scientific thinking, civic understanding,
              and Christian values — the core pillars of a well-rounded education.
            </p>
          </div>
          <div className="subjects-primary-grid">
            {PRIMARY_SUBJECTS.map((s, i) => (
              <div className="subjects-primary-card reveal" key={i}>
                <div className="subjects-primary-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secondary ── */}
      <section className="subjects-level-section" id="secondary">
        <div className="container">
          <div className="subjects-level-header">
            <span className="subjects-eyebrow">Secondary School</span>
            <h2 className="subjects-level-heading">Secondary School Subjects</h2>
            <p className="subjects-level-sub">
              Secondary students are grouped into Sciences and Arts streams, with
              a set of core subjects studied by all — preparing them comprehensively
              for national examinations and life beyond school.
            </p>
          </div>

          {SECONDARY_STREAMS.map((group, gi) => (
            <div className="subjects-stream-block" key={gi}>
              <div className="subjects-stream-label">
                <span>{group.stream}</span>
                {group.desc && <p>{group.desc}</p>}
              </div>
              <div className="subjects-stream-grid">
                {group.subjects.map((s, si) => (
                  <div className="subjects-subject-card reveal" key={si}>
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="subjects-closing">
        <div className="container">
          <div className="subjects-closing-inner">
            <span className="subjects-eyebrow">Explore More</span>
            <h2 className="subjects-closing-heading">A Curriculum Built for Every Student's Future</h2>
            <p>
              Our subjects are taught by dedicated, qualified teachers who bring
              each discipline to life. Whether your child's passion is the sciences,
              the arts, business, or technology, St. Lawrence Academy has a path for them.
            </p>
            <a href="/curriculum" className="subjects-closing-btn">
              <i className="fas fa-arrow-right"></i> View Academics
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Subjects;
