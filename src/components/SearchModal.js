import React, { useState, useEffect } from 'react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchableContent = [
    // Registration Pages
    {
      title: 'Nursery Registration',
      url: '/registration/nursery',
      content: 'nursery registration online form baby middle top class early childhood enrollment application',
      category: 'Registration'
    },
    {
      title: 'Primary Registration',
      url: '/registration/primary',
      content: 'primary registration online form p1 p2 p3 p4 p5 p6 p7 p8 enrollment application',
      category: 'Registration'
    },
    {
      title: 'Secondary Registration',
      url: '/registration/secondary',
      content: 'secondary registration online form senior 1 2 3 4 enrollment application',
      category: 'Registration'
    },
    // Main Pages
    {
      title: 'Home',
      url: '/',
      content: 'Saint Lawrence Academy excellence education academic rigor innovation student empowerment critical thinking creativity leadership skills cultural values higher education success curriculum South Sudan national curriculum international standards university preparation',
      category: 'Page'
    },
    {
      title: 'About Us',
      url: '/about',
      content: 'about saint lawrence academy history mission vision values founding establishment educational philosophy community excellence tradition innovation faculty staff organizational hierarchy pta representatives facilities',
      category: 'Page'
    },
    {
      title: 'Our History',
      url: '/about#history',
      content: 'history founding 2010 establishment juba south sudan educational institution growth development milestones achievements legacy tradition',
      category: 'About'
    },
    {
      title: 'Mission & Vision',
      url: '/about#mission',
      content: 'mission vision values educational excellence holistic development character building academic achievement moral values cultural heritage leadership innovation',
      category: 'About'
    },
    {
      title: 'Faculty & Staff',
      url: '/about#faculty',
      content: 'faculty staff teachers educators administrators principal vice principal academic coordinator science department arts department qualified experienced dedicated professionals',
      category: 'About'
    },
    {
      title: 'Facilities',
      url: '/about#facilities',
      content: 'facilities campus buildings classrooms science laboratories computer labs library sports fields auditorium cafeteria modern equipment technology infrastructure',
      category: 'About'
    },
    {
      title: 'Academics',
      url: '/academics',
      content: 'academics curriculum programs courses subjects teaching learning education standards quality excellence',
      category: 'Page'
    },
    {
      title: 'Student Life',
      url: '/student-life',
      content: 'student life campus activities clubs organizations events community culture experience',
      category: 'Page'
    },
    {
      title: 'Admissions',
      url: '/admissions',
      content: 'admissions enrollment application process requirements deadlines tuition fees financial aid scholarships apply join',
      category: 'Page'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      content: 'contact information address phone email location directions visit campus juba south sudan get in touch',
      category: 'Page'
    },
    // About Submenu
    {
      title: 'Our History',
      url: '/about/history',
      content: 'history founding establishment heritage legacy tradition timeline milestones achievements growth development',
      category: 'About'
    },
    {
      title: 'Mission & Vision',
      url: '/about/mission',
      content: 'mission vision values goals objectives purpose philosophy educational approach principles beliefs',
      category: 'About'
    },
    {
      title: 'Faculty & Staff',
      url: '/about/faculty',
      content: 'faculty staff teachers educators administrators team qualified experienced dedicated professionals',
      category: 'About'
    },
    {
      title: 'Campus & Facilities',
      url: '/about/facilities',
      content: 'campus facilities buildings classrooms laboratories library sports fields technology infrastructure modern equipment',
      category: 'About'
    },
    {
      title: 'Blog',
      url: '/blog',
      content: 'blog news articles stories updates announcements events school life student achievements campus activities',
      category: 'About'
    },
    {
      title: 'Support Us',
      url: '/support',
      content: 'support donate donation contribute financial support bank transfer mobile money card payment why support us scholarship fund infrastructure development teacher training educational resources',
      category: 'Page'
    },
    // Blog Posts
    {
      title: 'Welcome to the New Academic Year 2024',
      url: '/blog/1',
      content: 'academic year 2024 welcome students parents staff learning growth achievement faculty curriculum teaching methods facilities improvements science laboratories library sports programs robotics mathematics environmental science',
      category: 'Blog'
    },
    {
      title: 'Science Fair Winners Announced',
      url: '/blog/2',
      content: 'science fair winners competition projects innovation research water purification solar energy indigenous plant medicines antimicrobial properties maria johnson david musa sarah akol biology chemistry physics environmental science engineering',
      category: 'Blog'
    },
    {
      title: 'Sports Day 2024 Highlights',
      url: '/blog/3',
      content: 'sports day athletics track field events sprints relays long jump high jump shot put red house blue house green house competition sportsmanship teamwork john deng grace ayak',
      category: 'Blog'
    },
    {
      title: 'New Library Resources Available',
      url: '/blog/4',
      content: 'library resources new books digital databases e-books online research tools 500 books science mathematics literature history technology fiction non-fiction reading materials',
      category: 'Blog'
    },
    {
      title: 'Community Service Initiative Launch',
      url: '/blog/5',
      content: 'community service initiative outreach programs tutoring underprivileged children environmental cleanup health awareness orphanages elderly care social responsibility civic engagement student council',
      category: 'Blog'
    },
    {
      title: 'Parent-Teacher Conference Success',
      url: '/blog/6',
      content: 'parent teacher conference student progress academic performance behavior social development communication partnership family school collaboration support education',
      category: 'Blog'
    },
    // Home Page Sections
    {
      title: 'Academic Excellence',
      url: '/#academic-excellence',
      content: 'curriculum excellence south sudan national curriculum international standards university acceptance student teacher ratio graduation rate higher education pathway qualified teachers advanced degrees',
      category: 'Academics'
    },
    {
      title: 'Science Subjects',
      url: '/#science-subjects',
      content: 'chemistry biology pure additional mathematics physics applied sciences agriculture environmental science laboratory experiments practical demonstrations problem-solving workshops field studies',
      category: 'Academics'
    },
    {
      title: 'Arts Subjects',
      url: '/#arts-subjects',
      content: 'history geography commerce accounting literature languages civics islamic studies critical thinking cultural awareness communication skills leadership library historical literary collections',
      category: 'Academics'
    },
    {
      title: 'School Library',
      url: '/#library',
      content: 'library excellence comprehensive collection books reference materials digital resources study research librarians information literacy textbooks encyclopedias newspapers magazines',
      category: 'Facilities'
    },
    {
      title: 'Academic Support',
      url: '/#academic-support',
      content: 'tutorial programs peer tutoring academic competitions science fairs mathematics olympiads debate tournaments university guidance counseling scholarship opportunities career planning',
      category: 'Support'
    },
    {
      title: 'Athletics & Sports',
      url: '/#athletics',
      content: 'athletics sports physical fitness teamwork leadership competitions football soccer basketball volleyball netball cricket rugby track field swimming tennis table tennis badminton cross country',
      category: 'Sports'
    },
    {
      title: 'Arts & Cultural Programs',
      url: '/#arts-culture',
      content: 'arts cultural programs creativity expression music drama visual arts dance theater choir traditional dance modern dance poetry spoken word cultural festivals painting drawing sculpture photography',
      category: 'Arts'
    },
    {
      title: 'Student Organizations',
      url: '/#student-organizations',
      content: 'student organizations leadership clubs societies student government council class representatives prefect system environmental club community service cultural society technology club debate science mathematics literary model un',
      category: 'Leadership'
    },
    {
      title: 'Campus Facilities',
      url: '/#facilities',
      content: 'campus facilities modern classrooms science laboratories computer labs library study areas art studios sports fields basketball courts gymnasium swimming pool fitness center cafeteria dining health center counseling transportation boarding high-speed internet smart classrooms',
      category: 'Facilities'
    },
    // Admissions Sections
    {
      title: 'Nursery School',
      url: '/admissions#nursery',
      content: 'nursery baby middle top class early childhood development play-based learning music art creative activities outdoor play physical activities safe caring environment qualified teachers small class sizes',
      category: 'Admissions'
    },
    {
      title: 'Primary School',
      url: '/admissions#primary',
      content: 'primary school p1 p8 south sudan national curriculum english arabic instruction mathematics sciences computer literacy library research skills sports physical education arts music cultural activities',
      category: 'Admissions'
    },
    {
      title: 'Secondary School',
      url: '/admissions#secondary',
      content: 'secondary school senior 1 2 3 4 advanced academic curriculum science track physics chemistry biology math arts track history geography literature languages university entrance exam preparation career guidance counseling leadership development',
      category: 'Admissions'
    },
    {
      title: 'Academic Calendar',
      url: '/admissions#calendar',
      content: 'academic calendar term dates registration government south sudan ministry general education instruction licensed registered',
      category: 'Admissions'
    },
    {
      title: 'Application Requirements',
      url: '/admissions#requirements',
      content: 'application requirements form student personal details parent guardian information emergency contacts academic records report cards transfer certificate birth certificate assessment interview entrance examination',
      category: 'Admissions'
    },
    // Academics Submenu
    {
      title: 'Curriculum',
      url: '/academics#curriculum',
      content: 'curriculum courses subjects programs south sudan national curriculum nursery primary secondary education',
      category: 'Academics'
    },
    {
      title: 'Arts & Humanities',
      url: '/academics#arts',
      content: 'arts humanities literature history languages culture creative expression critical thinking',
      category: 'Academics'
    },
    {
      title: 'Library Resources',
      url: '/academics#library',
      content: 'library resources books digital materials research study reading collection reference',
      category: 'Academics'
    },
    // Student Life Submenu
    {
      title: 'Athletics & Sports',
      url: '/student-life#athletics',
      content: 'athletics sports teams football basketball volleyball track field physical education fitness competition',
      category: 'Student Life'
    },
    {
      title: 'Clubs & Organizations',
      url: '/student-life#clubs',
      content: 'clubs organizations student groups activities interests hobbies leadership community service',
      category: 'Student Life'
    },
    {
      title: 'Extracurricular Activities',
      url: '/student-life#extracurricular',
      content: 'extracurricular activities programs enrichment arts music drama debate competitions',
      category: 'Student Life'
    },
    {
      title: 'Student Government',
      url: '/student-life#student-government',
      content: 'student government council leadership representation voice democracy participation',
      category: 'Student Life'
    },
    {
      title: 'Events & Calendar',
      url: '/student-life#events',
      content: 'events calendar schedule activities programs dates important occasions celebrations',
      category: 'Student Life'
    }
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
    if (url.includes('#')) {
      const [, hash] = url.split('#');
      window.location.href = url;
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.location.href = url;
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSearchQuery('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-header">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search..."
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
              <p>Try searching for different keywords</p>
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
                      {result.content.substring(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          

        </div>
      </div>
    </div>
  );
};

export default SearchModal;