import React, { useState } from 'react';
import './HeadStudents.css';

const HeadStudents = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedYear, setSelectedYear] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [studentLeaders, setStudentLeaders] = useState({});
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMediaUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://sla.pythonanywhere.com${url}`;
  };

  React.useEffect(() => {
    fetch('https://sla.pythonanywhere.com/api/leadership/')
      .then(res => res.json())
      .then(data => {
        const groupedByYear = {};
        data.results.forEach(leader => {
          if (!groupedByYear[leader.year]) {
            groupedByYear[leader.year] = [];
          }
          groupedByYear[leader.year].push({
            position: leader.position,
            name: leader.name,
            image: getMediaUrl(leader.image)
          });
        });
        
        const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);
        setYears(sortedYears);
        setStudentLeaders(groupedByYear);
        if (sortedYears.length > 0) {
          setSelectedYear(sortedYears[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leadership:', err);
        setLoading(false);
      });
  }, []);

  const yearsPerPage = isMobile ? 3 : 4;
  const visibleYears = years.slice(currentPage, currentPage + yearsPerPage);

  const nextPage = () => {
    if (currentPage + yearsPerPage < years.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div style={{marginTop: '6rem', textAlign: 'center'}}>
        <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)'}}>Loading student leaders...</p>
      </div>
    );
  }

  if (years.length === 0) {
    return (
      <div style={{marginTop: '6rem', textAlign: 'center'}}>
        <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Student Leadership</h3>
        <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)'}}>No student leaders added yet.</p>
      </div>
    );
  }

  return (
    <div style={{marginTop: '6rem'}}>
      <div style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Student Leadership</h3>
        <p style={{fontSize: '1.1rem', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Meet our student leaders who represent discipline, tradition, and school values</p>
        
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
          <button onClick={prevPage} disabled={currentPage === 0} className="pagination-arrow" style={{background: 'var(--primary-red)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: currentPage === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === 0 ? 0.5 : 1}}>
            <i className="fas fa-chevron-left"></i>
          </button>
          {visibleYears.map(year => (
            <button key={year} onClick={() => setSelectedYear(year)} className="year-button" style={{padding: '10px 25px', background: selectedYear === year ? 'var(--primary-red)' : 'transparent', color: selectedYear === year ? 'var(--primary-white)' : 'var(--primary-red)', border: '2px solid var(--primary-red)', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s'}}>{year}</button>
          ))}
          <button onClick={nextPage} disabled={currentPage + yearsPerPage >= years.length} className="pagination-arrow" style={{background: 'var(--primary-red)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: currentPage + yearsPerPage >= years.length ? 'not-allowed' : 'pointer', opacity: currentPage + yearsPerPage >= years.length ? 0.5 : 1}}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
        {studentLeaders[selectedYear]?.map((leader, index) => (
          <div key={index} style={{textAlign: 'center', padding: '1.5rem', background: 'var(--light-gray)', borderRadius: '10px'}}>
            <img src={leader.image} alt={leader.position} style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', border: '3px solid var(--primary-red)'}} />
            <h4 style={{color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem'}}>{leader.position}</h4>
            <h5 style={{color: 'var(--dark-gray)', fontSize: '1rem', fontWeight: '600'}}>{leader.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadStudents;
