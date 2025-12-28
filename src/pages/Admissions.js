import React, { useState, useEffect } from 'react';
import './Admissions.css';

const Admissions = () => {
  const [nurseryIndex, setNurseryIndex] = useState(0);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);
  const [ctaIndex, setCtaIndex] = useState(0);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  useEffect(() => {
    fetch('https://sla.pythonanywhere.com/api/admissions/registration-status/')
      .then(res => res.json())
      .then(data => {
        const status = data.results ? data.results[0] : (Array.isArray(data) ? data[0] : data);
        if (status) {
          setRegistrationStatus(status);
          setIsRegistrationClosed(!status.is_open || status.is_deadline_passed);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching registration status:', err);
        setLoading(false);
      });
  }, []);

  const nurseryImages = [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800'
  ];

  const primaryImages = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
  ];

  const secondaryImages = [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
  ];

  const ctaImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920'
  ];

  useEffect(() => {
    const nurseryTimer = setInterval(() => {
      setNurseryIndex((prev) => (prev + 1) % nurseryImages.length);
    }, 4000);
    const primaryTimer = setInterval(() => {
      setPrimaryIndex((prev) => (prev + 1) % primaryImages.length);
    }, 4000);
    const secondaryTimer = setInterval(() => {
      setSecondaryIndex((prev) => (prev + 1) % secondaryImages.length);
    }, 4000);
    const ctaTimer = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % ctaImages.length);
    }, 4000);
    return () => {
      clearInterval(nurseryTimer);
      clearInterval(primaryTimer);
      clearInterval(secondaryTimer);
      clearInterval(ctaTimer);
    };
  }, [nurseryImages.length, primaryImages.length, secondaryImages.length, ctaImages.length]);

  return (
    <div className="admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <div className="admissions-hero-video">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80" alt="Students in classroom" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="admissions-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="admissions-hero-content">
          <div className="admissions-hero-badge">
            <i className="fas fa-graduation-cap"></i>
            Join Our Community
          </div>
          <h1>Admissions</h1>
          <p>Where every child's potential is nurtured, dreams are realized, and futures are built. St. Lawrence Academy is more than a school—it's a community dedicated to shaping tomorrow's leaders through excellence in education, character development, and unwavering support for every student's unique journey to success.</p>
        </div>
      </section>

      {/* Registration Status */}
      {!loading && registrationStatus && (
        <section className="section" style={{background: isRegistrationClosed ? '#6c757d' : '#28a745', color: 'var(--primary-white)', padding: '2rem 0', textAlign: 'center', borderTop: '4px solid var(--primary-white)'}}>
          <div className="container">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
              <i className={`fas fa-${isRegistrationClosed ? 'times-circle' : 'info-circle'}`} style={{fontSize: '1.5rem'}}></i>
              <h3 style={{fontSize: '1.3rem', fontWeight: '600', margin: 0}}>Registration Status: <span style={{fontWeight: '800'}}>{isRegistrationClosed ? 'CLOSED' : 'OPEN'}</span> for {registrationStatus.term}, {registrationStatus.year}</h3>
            </div>
            {isRegistrationClosed && registrationStatus.is_deadline_passed ? (
              <p style={{marginTop: '0.5rem', fontSize: '1rem', opacity: '0.9'}}>
                Applications for {registrationStatus.term}, {registrationStatus.year} are now closed. The deadline has passed.
              </p>
            ) : (
              <>
                {registrationStatus.message && (
                  <p style={{marginTop: '0.5rem', fontSize: '1rem', opacity: '0.9'}}>
                    {registrationStatus.message}
                  </p>
                )}
                <p style={{marginTop: '0.5rem', fontSize: '1rem', opacity: '0.9'}}>
                  Registration closes on {new Date(registrationStatus.closing_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - Apply now to secure your spot!
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Academic Calendar */}
      <section id="calendar" className="section" style={{background: 'var(--primary-white)', padding: '80px 0', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Academic Calendar 2024/2025</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', marginBottom: '1rem'}}>Important dates for the upcoming academic year</p>
            <p style={{fontSize: '1rem', color: 'var(--medium-gray)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7'}}>
              <i className="fas fa-certificate" style={{color: 'var(--primary-red)', marginRight: '0.5rem'}}></i>
              St. Lawrence Academy is licensed and registered with the Government of South Sudan, Ministry of General Education and Instruction. Our academic calendar follows the guidelines set by the Ministry.
            </p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'var(--primary-white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                <i className="fas fa-calendar-alt" style={{marginRight: '0.75rem'}}></i>
                Term 1
              </h3>
              <p style={{fontSize: '1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                <strong>Registration:</strong> January 15 - February 5<br/>
                <strong>Term Opens:</strong> February 10, 2025<br/>
                <strong>Term Closes:</strong> May 15, 2025
              </p>
            </div>
            <div style={{background: 'var(--primary-white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                <i className="fas fa-calendar-alt" style={{marginRight: '0.75rem'}}></i>
                Term 2
              </h3>
              <p style={{fontSize: '1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                <strong>Registration:</strong> May 20 - June 10<br/>
                <strong>Term Opens:</strong> June 15, 2025<br/>
                <strong>Term Closes:</strong> September 20, 2025
              </p>
            </div>
            <div style={{background: 'var(--primary-white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                <i className="fas fa-calendar-alt" style={{marginRight: '0.75rem'}}></i>
                Term 3
              </h3>
              <p style={{fontSize: '1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                <strong>Registration:</strong> September 25 - October 15<br/>
                <strong>Term Opens:</strong> October 20, 2025<br/>
                <strong>Term Closes:</strong> December 15, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="section" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Our Schools</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>St. Lawrence Academy offers quality education across three levels, nurturing students from early childhood through secondary education. Each school provides a comprehensive curriculum designed to develop academic excellence, character, and leadership skills while maintaining strong cultural values and preparing students for success in their next educational journey.</p>
          </div>

          {/* Nursery School */}
          <div id="nursery" style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div className="school-content">
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>
                  Baby, Middle & Top Class
                </div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2.2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Nursery School</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>
                  Our nursery program provides a nurturing environment where young learners develop foundational skills through play-based learning, creative activities, and social interaction. We focus on holistic development including cognitive, physical, social, and emotional growth.
                </p>
                <div className="school-images-mobile" style={{position: 'relative', marginBottom: '2rem', display: 'none'}}>
                  <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                    {nurseryImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Nursery School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === nurseryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                    ))}
                  </div>
                  <button onClick={() => setNurseryIndex((nurseryIndex - 1 + nurseryImages.length) % nurseryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button onClick={() => setNurseryIndex((nurseryIndex + 1) % nurseryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Early childhood development programs
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Play-based learning approach
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Music, art, and creative activities
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Outdoor play and physical activities
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Safe and caring environment
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Qualified early years teachers
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Small class sizes for individual attention
                  </li>
                </ul>
              </div>
              <div style={{position: 'relative'}}>
                <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                  {nurseryImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Nursery School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === nurseryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                  ))}
                </div>
                <button onClick={() => setNurseryIndex((nurseryIndex - 1 + nurseryImages.length) % nurseryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={() => setNurseryIndex((nurseryIndex + 1) % nurseryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Primary School */}
          <div id="primary" style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}} className="school-content">
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>
                  P1 - P8
                </div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2.2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Primary School</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>
                  Our primary school builds strong academic foundations with a comprehensive curriculum that develops critical thinking, creativity, and character in a supportive learning environment. Students receive quality education following the South Sudan National Curriculum with international standards.
                </p>
                <div className="school-images-mobile" style={{position: 'relative', marginBottom: '2rem', display: 'none'}}>
                  <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                    {primaryImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Primary School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === primaryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                    ))}
                  </div>
                  <button onClick={() => setPrimaryIndex((primaryIndex - 1 + primaryImages.length) % primaryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button onClick={() => setPrimaryIndex((primaryIndex + 1) % primaryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Academic Excellence</h4>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    South Sudan National Curriculum
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    English and Arabic instruction
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Mathematics and sciences focus
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Computer literacy programs
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Library and research skills
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Sports and physical education
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Arts, music, and cultural activities
                  </li>
                </ul>
              </div>
              <div style={{order: 1, position: 'relative'}}>
                <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                  {primaryImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Primary School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === primaryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                  ))}
                </div>
                <button onClick={() => setPrimaryIndex((primaryIndex - 1 + primaryImages.length) % primaryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={() => setPrimaryIndex((primaryIndex + 1) % primaryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary School */}
          <div id="secondary">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div className="school-content">
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>
                  Senior 1-4
                </div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2.2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Secondary School</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>
                  Our secondary school prepares students for university and beyond with rigorous academics, leadership development, and comprehensive university preparation programs. Students can choose between science and arts tracks based on their interests and career goals.
                </p>
                <div className="school-images-mobile" style={{position: 'relative', marginBottom: '2rem', display: 'none'}}>
                  <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                    {secondaryImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Secondary School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === secondaryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                    ))}
                  </div>
                  <button onClick={() => setSecondaryIndex((secondaryIndex - 1 + secondaryImages.length) % secondaryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button onClick={() => setSecondaryIndex((secondaryIndex + 1) % secondaryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>University Preparation</h4>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Advanced academic curriculum
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Science track (Physics, Chemistry, Biology, Math)
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Arts track (History, Geography, Literature, Languages)
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    University entrance exam preparation
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Career guidance and counseling
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Leadership development programs
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Research and critical thinking skills
                  </li>
                </ul>
              </div>
              <div style={{position: 'relative'}}>
                <div style={{position: 'relative', height: '400px', overflow: 'hidden'}}>
                  {secondaryImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Secondary School ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === secondaryIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
                  ))}
                </div>
                <button onClick={() => setSecondaryIndex((secondaryIndex - 1 + secondaryImages.length) % secondaryImages.length)} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={() => setSecondaryIndex((secondaryIndex + 1) % secondaryImages.length)} style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10}}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section id="requirements" className="section" style={{padding: '100px 0', background: 'var(--primary-white)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Application Requirements</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '800px', margin: '0 auto'}}>Everything you need to complete your application to St. Lawrence Academy</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'var(--primary-white)', padding: '2.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <div style={{width: '60px', height: '60px', background: 'rgba(126, 26, 25, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <i className="fas fa-file-alt" style={{fontSize: '1.8rem', color: 'var(--primary-red)'}}></i>
              </div>
              <h3 style={{color: 'var(--primary-black)', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem'}}>Application Form</h3>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7', marginBottom: '1rem'}}>Complete the official application form with accurate student and parent information</p>
              <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                <li style={{marginBottom: '0.5rem'}}>• Student personal details</li>
                <li style={{marginBottom: '0.5rem'}}>• Parent/guardian information</li>
                <li style={{marginBottom: '0.5rem'}}>• Emergency contacts</li>
              </ul>
            </div>
            <div style={{background: 'var(--primary-white)', padding: '2.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <div style={{width: '60px', height: '60px', background: 'rgba(126, 26, 25, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <i className="fas fa-graduation-cap" style={{fontSize: '1.8rem', color: 'var(--primary-red)'}}></i>
              </div>
              <h3 style={{color: 'var(--primary-black)', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem'}}>Academic Records</h3>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7', marginBottom: '1rem'}}>Submit previous academic transcripts and certificates</p>
              <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                <li style={{marginBottom: '0.5rem'}}>• Report cards (last 2 years)</li>
                <li style={{marginBottom: '0.5rem'}}>• Transfer certificate</li>
                <li style={{marginBottom: '0.5rem'}}>• Birth certificate copy</li>
              </ul>
            </div>
            <div style={{background: 'var(--primary-white)', padding: '2.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary-red)'}}>
              <div style={{width: '60px', height: '60px', background: 'rgba(126, 26, 25, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <i className="fas fa-clipboard-check" style={{fontSize: '1.8rem', color: 'var(--primary-red)'}}></i>
              </div>
              <h3 style={{color: 'var(--primary-black)', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem'}}>Assessment & Interview</h3>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7', marginBottom: '1rem'}}>Complete entrance assessment and attend interview session</p>
              <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                <li style={{marginBottom: '0.5rem'}}>• Entrance examination</li>
                <li style={{marginBottom: '0.5rem'}}>• Student interview</li>
                <li style={{marginBottom: '0.5rem'}}>• Parent meeting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Online Registration */}
      <section id="registration" className="section" style={{padding: '100px 0', background: 'var(--light-gray)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Online Registration</h2>
            <p style={{fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
              Register your child online for the upcoming academic year. Select the appropriate school level below to begin the registration process.
            </p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'var(--card-background)', padding: '2rem', borderRadius: '8px', border: '2px solid var(--light-gray)'}}>
              <i className="fas fa-child" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '1rem'}}>Nursery School</h3>
              <p style={{color: 'var(--text-color)', marginBottom: '1.5rem'}}>Baby, Middle & Top Class</p>
              <button 
                onClick={() => window.location.href = '/registration/nursery'} 
                disabled={isRegistrationClosed}
                style={{width: '100%', padding: '12px', background: isRegistrationClosed ? '#6c757d' : 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: isRegistrationClosed ? 'not-allowed' : 'pointer', opacity: isRegistrationClosed ? 0.6 : 1}}
              >
                {isRegistrationClosed ? 'Registration Closed' : 'Register Now'}
              </button>
            </div>

            <div style={{background: 'var(--card-background)', padding: '2rem', borderRadius: '8px', border: '2px solid var(--light-gray)'}}>
              <i className="fas fa-book-reader" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '1rem'}}>Primary School</h3>
              <p style={{color: 'var(--text-color)', marginBottom: '1.5rem'}}>P1 - P8</p>
              <button 
                onClick={() => window.location.href = '/registration/primary'} 
                disabled={isRegistrationClosed}
                style={{width: '100%', padding: '12px', background: isRegistrationClosed ? '#6c757d' : 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: isRegistrationClosed ? 'not-allowed' : 'pointer', opacity: isRegistrationClosed ? 0.6 : 1}}
              >
                {isRegistrationClosed ? 'Registration Closed' : 'Register Now'}
              </button>
            </div>

            <div style={{background: 'var(--card-background)', padding: '2rem', borderRadius: '8px', border: '2px solid var(--light-gray)'}}>
              <i className="fas fa-graduation-cap" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h3 style={{color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '1rem'}}>Secondary School</h3>
              <p style={{color: 'var(--text-color)', marginBottom: '1.5rem'}}>Senior 1 - 4</p>
              <button 
                onClick={() => window.location.href = '/registration/secondary'} 
                disabled={isRegistrationClosed}
                style={{width: '100%', padding: '12px', background: isRegistrationClosed ? '#6c757d' : 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: '600', cursor: isRegistrationClosed ? 'not-allowed' : 'pointer', opacity: isRegistrationClosed ? 0.6 : 1}}
              >
                {isRegistrationClosed ? 'Registration Closed' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="section" style={{position: 'relative', overflow: 'hidden', color: 'var(--primary-white)', padding: '80px 0', textAlign: 'center'}}>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}}>
          {ctaImages.map((img, idx) => (
            <img key={idx} src={img} alt={`CTA Background ${idx + 1}`} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: idx === ctaIndex ? 1 : 0, transition: 'opacity 1s ease-in-out'}} />
          ))}
        </div>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(126, 26, 25, 0.1)', zIndex: 2}}></div>
        <div className="container" style={{position: 'relative', zIndex: 3}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-red)'}}>Ready to Apply?</h2>
          <p style={{fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--primary-red)'}}>
            Take the first step towards joining our academic community
          </p>
          <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/contact" className="btn" style={{background: 'rgba(200, 200, 200, 0.8)', color: 'var(--primary-red)', border: '2px solid var(--primary-red)', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease'}}>Contact Admissions</a>
            <a href="/contact" className="btn" style={{background: 'rgba(200, 200, 200, 0.8)', color: 'var(--primary-red)', border: '2px solid var(--primary-red)', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease'}}>Schedule Visit</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;