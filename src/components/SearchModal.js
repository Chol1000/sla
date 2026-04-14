import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchableContent = [
    // Registration Pages
    {
      title: 'Nursery Registration',
      url: '/registration/nursery',
      content: 'nursery registration online form baby middle top class early childhood enrollment application ages 3-5 play-based learning foundational skills',
      category: 'Registration'
    },
    {
      title: 'Primary Registration',
      url: '/registration/primary',
      content: 'primary registration online form p1 p2 p3 p4 p5 p6 p7 p8 enrollment application lower primary upper primary literacy numeracy',
      category: 'Registration'
    },
    {
      title: 'Secondary Registration',
      url: '/registration/secondary',
      content: 'secondary registration online form senior 1 2 3 4 enrollment application high school science arts streams university preparation',
      category: 'Registration'
    },
    // Main Pages
    {
      title: 'Home',
      url: '/',
      content: 'St. Lawrence Academy SLA excellence education academic rigor innovation student empowerment critical thinking creativity leadership skills cultural values higher education success curriculum South Sudan national curriculum international standards university preparation career opportunities hiring principal deputy teachers nursery primary secondary 500 learners 20 qualified teachers 6 years excellence',
      category: 'Page'
    },
    {
      title: 'About Us',
      url: '/about',
      content: 'about saint lawrence academy history mission vision values slogan your ideal school where quality matters founding establishment educational philosophy community excellence tradition innovation faculty staff organizational hierarchy pta representatives facilities managing director admin nursery primary secondary',
      category: 'Page'
    },
    {
      title: 'Our Slogan',
      url: '/about',
      content: 'slogan your ideal school where quality matters motto tagline',
      category: 'About'
    },
    {
      title: 'Our History',
      url: '/about#history',
      content: 'history founding 2020 establishment juba south sudan educational institution growth development milestones achievements legacy tradition excellence',
      category: 'About'
    },
    {
      title: 'Mission & Vision',
      url: '/about#mission',
      content: 'mission vision values transformation society high quality education excellence science technology leading centre academic excellence region educational excellence holistic development character building academic achievement moral values cultural heritage leadership innovation',
      category: 'About'
    },
    {
      title: 'Faculty & Staff',
      url: '/about#faculty',
      content: 'faculty staff teachers educators administrators principal vice principal deputy managing director academic coordinator science department arts department qualified experienced dedicated professionals team members connect linkedin facebook twitter instagram email phone',
      category: 'About'
    },
    {
      title: 'Facilities',
      url: '/about#facilities',
      content: 'facilities campus buildings classrooms science laboratories computer labs library sports fields auditorium cafeteria modern equipment technology infrastructure smart boards projectors wifi internet',
      category: 'About'
    },
    {
      title: 'Academics',
      url: '/academics',
      content: 'academics curriculum programs courses subjects teaching learning education standards quality excellence south sudan national curriculum nursery primary secondary science arts mathematics english',
      category: 'Page'
    },
    {
      title: 'Student Life',
      url: '/student-life',
      content: 'student life campus activities clubs organizations events community culture experience athletics sports arts cultural programs music drama dance debate environmental club technology club leadership prefects student council',
      category: 'Page'
    },
    {
      title: 'Admissions',
      url: '/admissions',
      content: 'admissions enrollment application process requirements deadlines tuition fees financial aid scholarships apply join term 1 2 3 registration open closing dates nursery primary secondary school cards birth certificate report cards assessment interview',
      category: 'Page'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      content: 'contact information address phone email location directions visit campus juba south sudan VHW6+6VM get in touch office hours monday friday saturday sunday admissions office academic office',
      category: 'Page'
    },
    {
      title: 'Blog',
      url: '/blog',
      content: 'blog news articles stories updates announcements events school life student achievements campus activities latest news',
      category: 'Page'
    },
    {
      title: 'Support Us',
      url: '/support',
      content: 'support donate donation contribute financial support bank transfer mobile money card payment why support us scholarship fund infrastructure development teacher training educational resources quality education transform lives',
      category: 'Page'
    },
    // Nursery School
    {
      title: 'Nursery School',
      url: '/#nursery',
      content: 'nursery school baby class middle class top class ages 3-5 early childhood development play-based learning music art creative activities outdoor play physical activities safe caring environment qualified teachers small class sizes foundational skills social emotional cognitive development',
      category: 'Academics'
    },
    // Primary School
    {
      title: 'Primary School',
      url: '/#primary',
      content: 'primary school p1 p2 p3 p4 p5 p6 p7 p8 lower primary upper primary foundation years advanced learning south sudan national curriculum english mathematics science christian religious education social studies literacy numeracy critical thinking problem-solving independent study 100% transition rate 20+ qualified teachers 500+ pupils',
      category: 'Academics'
    },
    // Secondary School
    {
      title: 'Secondary School',
      url: '/#secondary',
      content: 'secondary school senior 1 2 3 4 high school advanced academic curriculum science stream arts stream shared subjects mathematics english christian religious education citizenship biology physics chemistry agriculture additional math computer geography accounting commerce history literature university preparation modern laboratories expert faculty academic excellence global perspective leadership development 500+ students 100% pass rate 30+ qualified teachers 6+ years excellence',
      category: 'Academics'
    },
    {
      title: 'Science Stream',
      url: '/#secondary',
      content: 'science stream biology physics chemistry agriculture additional mathematics computer laboratory experiments research projects',
      category: 'Academics'
    },
    {
      title: 'Arts Stream',
      url: '/#secondary',
      content: 'arts stream geography accounting commerce history literature humanities social sciences',
      category: 'Academics'
    },
    // Athletics & Sports
    {
      title: 'Athletics & Sports',
      url: '/student-life#athletics',
      content: 'athletics sports physical fitness teamwork leadership competitions football soccer basketball volleyball netball cricket rugby track field swimming tennis table tennis badminton cross country athletics tournaments championships inter-school competitions sports day',
      category: 'Sports'
    },
    // Arts & Cultural Programs
    {
      title: 'Arts & Cultural Programs',
      url: '/student-life#arts',
      content: 'arts cultural programs creativity expression music drama visual arts dance theater choir traditional dance modern dance poetry spoken word cultural festivals painting drawing sculpture photography performances concerts exhibitions',
      category: 'Arts'
    },
    // Student Organizations
    {
      title: 'Student Organizations',
      url: '/student-life#organizations',
      content: 'student organizations leadership clubs societies student government council class representatives prefect system environmental club community service cultural society technology club debate science mathematics literary model un red cross scouts',
      category: 'Leadership'
    },
    // Library
    {
      title: 'School Library',
      url: '/academics#library',
      content: 'library excellence comprehensive collection books reference materials digital resources study research librarians information literacy textbooks encyclopedias newspapers magazines fiction non-fiction academic journals reading programs',
      category: 'Facilities'
    },
    // Career Opportunities
    {
      title: 'Career Opportunities',
      url: '/#careers',
      content: 'career opportunities hiring jobs employment principal deputy principal nursery teachers primary school teachers secondary school teachers school administrator accountant support staff application deadline qualified committed passionate professionals',
      category: 'Careers'
    },
    // Registration Status
    {
      title: 'Registration Status',
      url: '/admissions',
      content: 'registration status open closed term 1 2 3 2025 2026 deadline dates enrollment period',
      category: 'Admissions'
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
    setSearchQuery('');
    onClose();
    if (url.includes('#')) {
      const [path, hash] = url.split('#');
      if (window.location.pathname === path || (path === '' && window.location.pathname === '/')) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(path || '/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
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
    </div>,
    document.body
  );
};

export default SearchModal;
