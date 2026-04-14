import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

const API = process.env.REACT_APP_API_URL || '';

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchableContent = [
    // Main pages
    { title: 'Home',             url: '/',               category: 'Page',       content: 'home st lawrence academy sla juba south sudan excellence education overview welcome' },
    { title: 'About Us',         url: '/about',          category: 'Page',       content: 'about st lawrence academy history mission vision values slogan your ideal school where quality matters' },
    { title: 'Contact Us',       url: '/contact',        category: 'Page',       content: 'contact phone email address location juba south sudan get in touch' },
    { title: 'Support Us',       url: '/support',        category: 'Page',       content: 'support donate donation contribute financial scholarship fund infrastructure development' },
    { title: 'Blog',             url: '/blog',           category: 'Page',       content: 'blog news articles stories updates announcements events school life achievements' },
    { title: 'Gallery',          url: '/gallery',        category: 'Page',       content: 'gallery photos pictures school events students activities' },
    { title: 'Reviews',          url: '/reviews',        category: 'Page',       content: 'reviews testimonials ratings feedback parents students alumni staff' },
    { title: 'Alumni',           url: '/alumni',         category: 'Page',       content: 'alumni graduates former students profiles community network' },
    { title: 'FAQ',              url: '/faq',            category: 'Page',       content: 'frequently asked questions faq answers help information' },
    // About section
    { title: 'Our History',      url: '/history',        category: 'About',      content: 'history founding 2020 establishment juba south sudan milestones achievements legacy tradition' },
    { title: 'Our Founder',      url: '/founder',        category: 'About',      content: 'founder director leadership establishment vision management' },
    { title: 'Faculty & Staff',  url: '/faculty',        category: 'About',      content: 'faculty staff teachers educators administrators principal vice principal qualified experienced team' },
    { title: 'School Anthem',    url: '/anthem',         category: 'About',      content: 'anthem song hymn school song music words lyrics' },
    { title: 'PTA',              url: '/pta',            category: 'About',      content: 'pta parent teacher association meetings community involvement parents representatives' },
    // Academics
    { title: 'Nursery School',   url: '/nursery',        category: 'Academics',  content: 'nursery school baby class middle class top class ages 3 4 5 early childhood play-based learning foundational skills' },
    { title: 'Primary School',   url: '/primary',        category: 'Academics',  content: 'primary school p1 p2 p3 p4 p5 p6 p7 p8 lower upper literacy numeracy science english mathematics south sudan curriculum' },
    { title: 'Secondary School', url: '/secondary',      category: 'Academics',  content: 'secondary school senior 1 2 3 4 science stream arts stream biology physics chemistry mathematics history geography university preparation' },
    { title: 'Curriculum',       url: '/curriculum',     category: 'Academics',  content: 'curriculum syllabus south sudan national curriculum subjects programs academic structure' },
    { title: 'Subjects',         url: '/subjects',       category: 'Academics',  content: 'subjects english mathematics science christian religious education social studies geography history biology physics chemistry agriculture commerce accounting literature computer' },
    { title: 'Examinations',     url: '/examinations',   category: 'Academics',  content: 'examinations exams tests assessments grading results term end of year certificates' },
    { title: 'School Library',   url: '/library',        category: 'Academics',  content: 'library books resources reading research reference materials study' },
    { title: 'Science Labs',     url: '/science-labs',   category: 'Academics',  content: 'science laboratory labs biology chemistry physics experiments equipment practical' },
    { title: 'Technology',       url: '/technology',     category: 'Academics',  content: 'technology computer lab ict digital learning software internet wifi smart boards' },
    // Campus
    { title: 'Campus',           url: '/campus',         category: 'Campus',     content: 'campus tour facilities buildings classrooms grounds infrastructure sports field' },
    { title: 'Dining Services',  url: '/student-life/dining',    category: 'Campus',     content: 'dining cafeteria food meals lunch snacks canteen nutrition' },
    { title: 'Health & Wellness',url: '/student-life/health',    category: 'Campus',     content: 'health wellness clinic nurse medical first aid student wellbeing counseling' },
    // Student Life
    { title: 'Sports',           url: '/student-life/sports',          category: 'Student Life', content: 'sports athletics football basketball volleyball netball cricket track field competitions tournaments physical fitness teamwork' },
    { title: 'Arts & Culture',   url: '/student-life/arts',            category: 'Student Life', content: 'arts culture music drama dance theater choir visual arts painting cultural festivals performances' },
    { title: 'Clubs',            url: '/student-life/clubs',           category: 'Student Life', content: 'clubs societies debate science math environmental technology literary scouts red cross organizations' },
    { title: 'Student Leadership',url: '/student-life/leadership',     category: 'Student Life', content: 'student leadership prefects council head boy girl representatives government' },
    { title: 'Community Service',url: '/student-life/community-service', category: 'Student Life', content: 'community service outreach volunteering social responsibility charity giving back' },
    { title: 'Events & Activities',url: '/student-life/events',        category: 'Student Life', content: 'events activities school calendar sports day cultural day prize giving graduation ceremonies' },
    { title: 'Counseling',       url: '/student-life/counseling',      category: 'Student Life', content: 'counseling guidance support mental health emotional wellbeing student welfare' },
    // Admissions
    { title: 'How to Apply',           url: '/admissions/apply',        category: 'Admissions', content: 'apply application process steps how to enroll join admission requirements procedure' },
    { title: 'Requirements',           url: '/admissions/requirements', category: 'Admissions', content: 'requirements documents birth certificate report cards school records admission criteria' },
    { title: 'Fees & Payment',         url: '/admissions/fees',         category: 'Admissions', content: 'fees tuition school fees payment term costs charges financial' },
    { title: 'Registration Status',    url: '/admissions/status',       category: 'Admissions', content: 'registration status open closed term 1 2 3 deadline enrollment period dates' },
    { title: 'Important Dates',        url: '/admissions/dates',        category: 'Admissions', content: 'important dates calendar term dates school year schedule deadlines key events' },
    { title: 'Schedule a Campus Visit',url: '/admissions/visit',        category: 'Admissions', content: 'visit campus tour schedule book appointment see school' },
    { title: 'Admissions Contact',     url: '/admissions/contact',      category: 'Admissions', content: 'admissions office contact phone email enquiry information' },
    // Careers
    { title: 'Careers / Jobs',   url: '/careers',        category: 'Careers',    content: 'careers jobs hiring employment teachers principal administrator vacancies positions apply' },

    // Within-page sections — scroll directly to the section
    { title: 'Mission & Vision',           url: '/about#mission',                        category: 'About',        content: 'mission vision statement transformation high quality education leading centre academic excellence region' },
    { title: 'Our Values',                 url: '/about#values',                         category: 'About',        content: 'values core principles integrity discipline excellence respect community character' },
    { title: 'Science & Arts Streams',     url: '/secondary#streams',                    category: 'Academics',    content: 'science stream arts stream biology physics chemistry agriculture additional mathematics geography accounting commerce history literature senior' },
    { title: 'Science Stream',             url: '/secondary#streams',                    category: 'Academics',    content: 'science stream biology physics chemistry agriculture additional mathematics laboratory experiments research' },
    { title: 'Arts Stream',                url: '/secondary#streams',                    category: 'Academics',    content: 'arts stream geography accounting commerce history literature humanities social sciences' },
    { title: 'Primary Classes (P1–P8)',    url: '/primary#classes',                      category: 'Academics',    content: 'p1 p2 p3 p4 p5 p6 p7 p8 primary classes lower upper grades year levels' },
    { title: 'Primary Subjects',           url: '/primary#subjects',                     category: 'Academics',    content: 'primary subjects english mathematics science cre social studies physical education art' },
    { title: 'Nursery Classes',            url: '/nursery#classes',                      category: 'Academics',    content: 'nursery classes baby class middle class top class ages 3 4 5 early years groups' },
    { title: 'Nursery Learning Areas',     url: '/nursery#learning',                     category: 'Academics',    content: 'nursery learning domains language literacy numeracy creative arts physical social emotional development' },
    { title: 'Nursery Subjects',           url: '/subjects#nursery',                     category: 'Academics',    content: 'nursery subjects english mathematics science creative arts physical education christian religious education' },
    { title: 'Primary Subjects List',      url: '/subjects#primary',                     category: 'Academics',    content: 'primary subjects english mathematics science christian religious education social studies physical education art' },
    { title: 'Secondary Subjects List',    url: '/subjects#secondary',                   category: 'Academics',    content: 'secondary subjects biology physics chemistry geography accounting commerce history literature english mathematics agriculture computer' },
    { title: 'Curriculum by Level',        url: '/curriculum#levels',                    category: 'Academics',    content: 'curriculum nursery primary secondary levels structure academic program overview' },
    { title: 'Application Steps',          url: '/admissions/apply#steps',               category: 'Admissions',   content: 'application steps how to apply step by step process procedure enrollment' },
    { title: 'School Fees Breakdown',      url: '/admissions/fees#fees-breakdown',       category: 'Admissions',   content: 'fees breakdown nursery primary secondary tuition costs term payment amounts table' },
    { title: 'Required Documents',         url: '/admissions/requirements#documents',    category: 'Admissions',   content: 'required documents birth certificate report card transfer letter health records what to bring application' },
    { title: 'FAQ Questions',              url: '/faq#questions',                        category: 'Help',         content: 'frequently asked questions answers help information admissions fees term dates uniform' },
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      ).slice(0, 10);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleResultClick = (url) => {
    setSearchQuery('');
    onClose();
    if (url.includes('#')) {
      const [path, hash] = url.split('#');
      if (window.location.pathname === path) {
        // Already on the page — just scroll
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(path);
        // Wait for the page to render then scroll to section
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    } else {
      navigate(url);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSearchQuery('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="search-modal-overlay" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-header">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search pages, subjects, admissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button className="search-close" onClick={() => { setSearchQuery(''); onClose(); }}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="search-results">
          {isSearching && (
            <div className="search-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Searching...</span>
            </div>
          )}

          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No results found</h3>
              <p>Try different keywords</p>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <>
              <div className="results-header">
                <span>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</span>
              </div>
              <div className="results-list">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.url)}
                  >
                    <div className="result-category">{result.category}</div>
                    <h4 className="result-title">{result.title}</h4>
                    <p className="result-snippet">
                      {result.content.substring(0, 100)}…
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
