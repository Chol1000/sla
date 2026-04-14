import { useEffect, useState } from 'react';
import './EventsActivities.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const categories = ['All', 'Academic', 'Cultural', 'Sports', 'Social', 'National'];

const allEvents = [
  {
    month: 'Aug',
    title: 'Opening Assembly & Welcome Ceremony',
    category: 'Social',
    body: 'Every academic year begins with a whole-school opening assembly where returning students reunite and new students are formally welcomed into the SLA family.',
    highlight: true,
  },
  {
    month: 'Sep',
    title: 'Welcoming of New Students',
    category: 'Social',
    body: 'A dedicated celebration for students joining St. Lawrence Academy for the first time — helping new students feel at home, meet their peers, and understand what it means to be part of SLA.',
    highlight: false,
  },
  {
    month: 'Oct',
    title: 'Inter-class Competitions',
    category: 'Academic',
    body: 'Classes compete in academic quizzes, debates, arts, and creative challenges, fostering healthy rivalry, class pride, and a platform for every student to shine.',
    highlight: false,
  },
  {
    month: 'Oct',
    title: 'Sports Day',
    category: 'Sports',
    body: 'One of the most anticipated events in the SLA calendar. Students compete in track and field events, team games, and relay races — celebrated with school colours and great community spirit.',
    highlight: true,
  },
  {
    month: 'Nov',
    title: 'Student Leadership Swearing-In',
    category: 'Social',
    body: 'The formal inauguration ceremony for the new Head Boy, Head Girl, prefects, and student council — marking the beginning of a year of service and leadership.',
    highlight: false,
  },
  {
    month: 'Nov',
    title: 'Cultural Day',
    category: 'Cultural',
    body: 'A vibrant celebration of the many cultures within our school community. Students dress in traditional attire, perform cultural dances, and share foods that reflect the rich diversity of South Sudan and beyond.',
    highlight: true,
  },
  {
    month: 'Nov',
    title: 'Inter-school Events',
    category: 'Sports',
    body: 'SLA students represent the school in competitions with other schools — in sports, arts, debates, and academic challenges. These events build school pride and wider community connections.',
    highlight: false,
  },
  {
    month: 'Dec',
    title: 'Art Exhibition',
    category: 'Cultural',
    body: 'Student artwork from across all classes is displayed and celebrated. The exhibition is open to parents and community members, giving students the recognition they deserve.',
    highlight: false,
  },
  {
    month: 'Dec',
    title: 'Independence Day Celebrations',
    category: 'National',
    body: "St. Lawrence Academy proudly marks South Sudan's national holidays with assemblies, performances, and reflections on patriotism, national identity, and the responsibilities of citizenship.",
    highlight: false,
  },
  {
    month: 'Dec',
    title: "Prize Giving & Parents' Day",
    category: 'Academic',
    body: 'The highlight of the academic year — students are recognised for academic excellence, leadership, character, and service. Families gather to celebrate a year of achievement and growth.',
    highlight: true,
  },
];

const highlights = allEvents.filter(e => e.highlight);

const EventsActivities = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta(
      'Events & Activities',
      'School events and activities at St. Lawrence Academy — celebrating achievement, culture, and community throughout the year.'
    );
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  useEffect(() => {
    setTimeout(() => initScrollAnimations(), 100);
  }, [activeCategory]);

  const filtered = activeCategory === 'All'
    ? allEvents
    : allEvents.filter(e => e.category === activeCategory);

  return (
    <div className="ea-page">

      {/* ── Hero ── */}
      <section className="ea-hero">
        <div className="ea-hero-bg">
          <img src="/sla_assembly_1.jpg" alt="Events at St. Lawrence Academy" />
        </div>
        <div className="ea-hero-overlay"></div>
        <div className="ea-hero-content">
          <div className="container">
            <div className="ea-hero-inner">
              <span className="ea-hero-label">Student Life</span>
              <h1 className="ea-hero-title">Events &amp; <span>Activities</span></h1>
              <p className="ea-hero-sub">
                Celebrations, competitions, ceremonies, and community moments that
                bring St. Lawrence Academy to life throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="ea-mobile-band">
        <div className="container">
          <h2 className="ea-mobile-band-heading">Events &amp; Activities</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="ea-intro">
        <div className="container">
          <div className="ea-intro-inner">
            <span className="ea-eyebrow">School Calendar</span>
            <h2 className="ea-intro-heading">A Year Full of Life</h2>
            <p className="ea-intro-text">
              Life at St. Lawrence Academy extends well beyond the classroom. Our school
              calendar is filled with events that bring together students, staff, families,
              and the wider community — celebrating achievement, honouring culture, and
              building the lasting bonds that define an SLA education.
            </p>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="ea-highlights">
        <div className="container">
          <div className="ea-section-header">
            <span className="ea-eyebrow">Key Highlights</span>
            <h2 className="ea-section-heading">Events That Define SLA</h2>
            <p className="ea-section-sub">
              These moments are the heartbeat of the school year — looked forward to
              by students, staff, and families alike.
            </p>
          </div>
          <div className="ea-highlights-grid">
            {highlights.map((ev, idx) => (
              <div className="ea-highlight-card reveal" key={idx}>
                <div className="ea-highlight-head">
                  <h4>{ev.title}</h4>
                </div>
                <div className="ea-highlight-body">
                  <p>{ev.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Calendar ── */}
      <section className="ea-calendar">
        <div className="container">
          <div className="ea-section-header">
            <span className="ea-eyebrow">Full Calendar</span>
            <h2 className="ea-section-heading">All School Events</h2>
            <p className="ea-section-sub">
              Browse all events across the year — use the filters to find events by type.
            </p>
          </div>

          {/* Filter pills */}
          <div className="ea-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`ea-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Event rows */}
          <div className="ea-event-list">
            {filtered.map((ev, idx) => (
              <div className="ea-event-row reveal" key={idx}>
                <div className="ea-event-content">
                  <span className="ea-event-tag">{ev.category}</span>
                  <h3>{ev.title}</h3>
                  <p>{ev.body}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="ea-empty reveal">
              <i className="fas fa-calendar-times"></i>
              <p>No events in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Community section ── */}
      <section className="ea-community">
        <div className="container">
          <div className="ea-community-inner reveal">
            <div className="ea-community-visual">
              <img src="/sla_assembly_2.jpg" alt="SLA school event" />
              <div className="ea-community-badge">
                <span>Where</span>
                <span>Memories Are Made</span>
              </div>
            </div>
            <div className="ea-community-text">
              <span className="ea-eyebrow">Always Something Happening</span>
              <h2>More Than Just a School Year</h2>
              <p>
                The events and activities programme at St. Lawrence Academy is designed
                to give every student a moment to shine — whether on the sports field,
                the stage, the debate podium, or the exhibition floor.
              </p>
              <p>
                Co-curricular experiences are not extras here — they are essential to
                developing well-rounded, confident, and capable young people ready to
                contribute to South Sudan and the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="ea-closing">
        <div className="container">
          <div className="ea-closing-inner reveal">
            <span className="ea-eyebrow">Stay Up to Date</span>
            <h2>Follow Our News &amp; Announcements</h2>
            <p>
              Read our blog for the latest updates on upcoming events, results,
              and celebrations at St. Lawrence Academy.
            </p>
            <a href="/blog" className="ea-closing-btn">
              Read Our Blog <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EventsActivities;
