import React, { useState } from 'react';

const AlumniSection = ({ alumniData, expandedCard, onToggle }) => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayCount = isMobile ? 10 : 12;
  const visibleAlumni = showAll ? alumniData : alumniData.slice(0, displayCount);
  const hasMore = alumniData.length > displayCount;

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem', alignItems: 'start'}}>
        {visibleAlumni.map((alumni) => (
          <AlumniCard
            key={alumni.id}
            id={alumni.id}
            isExpanded={expandedCard === alumni.id}
            onToggle={onToggle}
            {...alumni}
          />
        ))}
      </div>

      {hasMore && (
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{padding: '12px 40px', background: 'var(--primary-red)', color: 'var(--primary-white)', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', borderRadius: '5px', transition: 'all 0.3s'}}
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </>
  );
};

const AlumniCard = ({ id, image, name, year, title, shortDesc, fullDesc, linkedin, twitter, facebook, isExpanded, onToggle }) => {
  return (
    <div style={{textAlign: 'center', padding: '1.5rem', background: 'var(--primary-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: '5px', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '420px', maxHeight: isExpanded ? 'none' : '420px', overflow: 'hidden'}}>
      <img src={image} alt={name} style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.8rem', border: '3px solid var(--primary-red)'}} />
      
      <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '0.8rem'}}>
        <a href={linkedin} style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}>
          <i className="fab fa-linkedin"></i>
        </a>
        <a href={twitter} style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href={facebook} style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}>
          <i className="fab fa-facebook"></i>
        </a>
      </div>

      <h3 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem'}}>{name}</h3>
      <p style={{color: 'var(--medium-gray)', fontSize: '0.85rem', marginBottom: '0.2rem', fontStyle: 'italic'}}>{year}</p>
      <p style={{color: 'var(--primary-red)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.6rem'}}>{title}</p>
      <p style={{color: 'var(--medium-gray)', lineHeight: '1.5', marginBottom: '0.6rem', fontSize: '0.9rem'}}>
        {shortDesc.length > 100 ? `${shortDesc.substring(0, 100)}...` : shortDesc}
      </p>
      
      {isExpanded && (
        <p style={{color: 'var(--medium-gray)', lineHeight: '1.5', marginBottom: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(126, 26, 25, 0.2)', fontSize: '0.9rem', textAlign: 'left'}}>{fullDesc}</p>
      )}
      
      <button 
        onClick={() => onToggle(id)}
        style={{color: 'var(--primary-red)', background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
      </button>
    </div>
  );
};

export default AlumniSection;
