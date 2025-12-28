import React, { useEffect, useState } from 'react';
import './Home.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { initDropdowns } from '../utils/dropdownHandler';
import { initCarousels } from '../utils/carousel';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [campusTour, setCampusTour] = useState(null);
  const [heroSection, setHeroSection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollAnimations();
      initDropdowns();
      initCarousels();
    }, 100);
    
    // Fetch blog posts
    fetch('http://127.0.0.1:8000/api/blog/posts/')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      });
    
    // Fetch campus tour
    fetch('http://127.0.0.1:8000/api/campus/tours/')
      .then(res => res.json())
      .then(data => {
        const tours = data.results || data;
        if (tours.length > 0) setCampusTour(tours[0]);
      })
      .catch(err => console.error('Error fetching campus tour:', err));
    
    // Fetch hero section
    fetch('http://127.0.0.1:8000/api/hero/sections/')
      .then(res => res.json())
      .then(data => {
        const sections = data.results || data;
        if (sections.length > 0) setHeroSection(sections[0]);
      })
      .catch(err => console.error('Error fetching hero section:', err));
    
    // Fetch registration status
    fetch('http://127.0.0.1:8000/api/admissions/registration-status/')
      .then(res => res.json())
      .then(data => {
        const status = data.results ? data.results[0] : (Array.isArray(data) ? data[0] : data);
        if (status) setRegistrationStatus(status);
      })
      .catch(err => console.error('Error fetching registration status:', err));
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroSection && heroSection.images && heroSection.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % heroSection.images.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [heroSection]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getMediaUrl = (post) => {
    if (post.image) {
      // Check if it's already a full URL
      if (post.image.startsWith('http')) return post.image;
      return `http://127.0.0.1:8000${post.image}`;
    }
    if (post.video) {
      if (post.video.startsWith('http')) return post.video;
      return `http://127.0.0.1:8000${post.video}`;
    }
    if (post.video_url) return post.video_url;
    return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  };

  const isVideo = (post) => {
    return post.video || post.video_url;
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {heroSection && (heroSection.video_url || heroSection.video || (heroSection.images && heroSection.images.length > 0)) ? (
          <div className="hero-video">
            {heroSection.video_url ? (
              heroSection.video_url.includes('youtube.com') || heroSection.video_url.includes('youtu.be') ? (
                <iframe 
                  src={heroSection.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0] + '?autoplay=1&mute=1&loop=1&controls=0&playlist=' + (heroSection.video_url.split('v=')[1]?.split('&')[0] || heroSection.video_url.split('/').pop())}
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none'}}
                  title="Hero Video"
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video autoPlay muted loop playsInline>
                  <source src={heroSection.video_url} type="video/mp4" />
                </video>
              )
            ) : heroSection.video ? (
              <video autoPlay muted loop playsInline>
                <source src={heroSection.video.startsWith('http') ? heroSection.video : `http://127.0.0.1:8000${heroSection.video}`} type="video/mp4" />
              </video>
            ) : heroSection.images && heroSection.images.length > 0 ? (
              heroSection.images.map((img, index) => (
                <div 
                  key={img.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: currentImageIndex === index ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    backgroundColor: '#7e1a19',
                    backgroundImage: `url(${img.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ))
            ) : null}
          </div>
        ) : (
          <div className="hero-video">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80" alt="School campus" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
          </div>
        )}
        <div className="hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="container">
          <div className="hero-layout">
            <div className="hero-left">
              <div className="hero-main-text">
                <h2 className="hero-subtitle">EXCELLENCE IN</h2>
                <h1 className="hero-title">EDUCATION</h1>
                <h2 className="hero-subtitle">FOR ALL</h2>
              </div>
              <p className="hero-school-name">Saint Lawrence Academy</p>
            </div>
            <div className="hero-right">
              <p className="hero-description hero-description-desktop">Join a community where academic rigor meets innovation, and every student is empowered to reach their full potential through comprehensive education. At Saint Lawrence Academy, we foster critical thinking, creativity, and leadership skills while maintaining strong cultural values and preparing students for success in higher education and beyond.</p>
              <div className="hero-motto">
                <span className="typing-text">Education is the key of life</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Registration Status Banner */}
      {registrationStatus && registrationStatus.is_open && !registrationStatus.is_deadline_passed && (
        <section style={{background: '#28a745', color: 'white', padding: '1.5rem 0', position: 'relative'}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.3)'}}></div>
          <div className="container">
            <div style={{textAlign: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '0.8rem'}}>
                <i className="fas fa-bullhorn" style={{fontSize: '1.3rem'}}></i>
                <div>
                  <span style={{fontSize: '0.8rem', opacity: '0.9', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '0.5rem'}}>Registration Open</span>
                  <span style={{fontSize: '1.2rem', fontWeight: '700'}}>{registrationStatus.term}, {registrationStatus.year}</span>
                </div>
              </div>
              <div style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <i className="fas fa-calendar-alt" style={{marginRight: '0.5rem'}}></i>
                Deadline: {new Date(registrationStatus.closing_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div style={{fontSize: '0.9rem', opacity: '0.95'}}>
                Visit <a href="/admissions" style={{color: 'white', fontWeight: '700', textDecoration: 'underline'}}>Admissions</a> for online application or come to school in person
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.3)'}}></div>
        </section>
      )}

      {/* Mobile Hero Text Section */}
      <div className="hero-text-mobile">
        <p>Join a community where academic rigor meets innovation, and every student is empowered to reach their full potential through comprehensive education. At Saint Lawrence Academy, we foster critical thinking, creativity, and leadership skills while maintaining strong cultural values and preparing students for success in higher education and beyond.</p>
      </div>

      {/* Academic Excellence Section */}
      <section id="academic-excellence" className="academic-excellence scroll-animate">
        <div className="container">
          <div className="section-header mobile-section-header">
            <span className="section-label">Academic Excellence</span>
            <h2 className="mobile-heading">Nurturing South Sudanese Students for Global Leadership</h2>
          </div>
          
          <div className="program-section" style={{marginTop: '3rem'}}>
            {/* Nursery School Section */}
            <div className="program-row" style={{alignItems: 'flex-start', marginBottom: '5rem'}}>
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Nursery School" />
                <div style={{
                  marginTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                       alt="Nursery Activities" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                  <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                       alt="Early Learning" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
              </div>
              <div className="program-content" style={{marginTop: 0}}>
                <div className="program-header">
                  <i className="fas fa-child"></i>
                  <h3>Nursery School</h3>
                </div>
                <p style={{marginBottom: '2rem'}}>Our nursery program provides a nurturing environment where young learners develop foundational skills through play-based learning, creative activities, and social interaction. We focus on holistic development including cognitive, physical, social, and emotional growth.</p>
                
                <div style={{
                  backgroundColor: 'rgba(126, 26, 25, 0.05)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--primary-red)'
                }}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem'}}>Early Childhood Development</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                    <li>Play-based learning approach</li>
                    <li>Music, art, and creative activities</li>
                    <li>Outdoor play and physical development</li>
                    <li>Social skills and emotional intelligence</li>
                    <li>Qualified early years teachers</li>
                  </ul>
                </div>
                
                <div style={{marginTop: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Classes Offered</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                    <li>Baby Class (Ages 2-3)</li>
                    <li>Middle Class (Ages 3-4)</li>
                    <li>Top Class (Ages 4-5)</li>
                  </ul>
                </div>
                
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  borderRadius: '8px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>12:1</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Student-Teacher Ratio</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Safe Environment</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>4</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Nursery Teachers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary School Section */}
            <div className="program-row reverse" style={{alignItems: 'flex-start', marginBottom: '5rem'}}>
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Primary School" />
                <div style={{
                  marginTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                       alt="Primary Learning" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                       alt="Primary Students" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
              </div>
              <div className="program-content" style={{marginTop: 0}}>
                <div className="program-header">
                  <i className="fas fa-book-reader"></i>
                  <h3>Primary School</h3>
                </div>
                <p style={{marginBottom: '2rem'}}>Our primary school builds strong academic foundations with a comprehensive curriculum that develops critical thinking, creativity, and character. Students receive quality education following the South Sudan National Curriculum with international standards.</p>
                
                <div style={{
                  backgroundColor: 'rgba(126, 26, 25, 0.05)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--primary-red)'
                }}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem'}}>Comprehensive Education</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                    <li>South Sudan National Curriculum</li>
                    <li>English and Arabic instruction</li>
                    <li>Mathematics and sciences focus</li>
                    <li>Computer literacy programs</li>
                    <li>Sports and physical education</li>
                  </ul>
                </div>
                
                <div style={{marginTop: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Grade Levels</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                    <li>Primary 1 - Primary 4 (Lower Primary)</li>
                    <li>Primary 5 - Primary 8 (Upper Primary)</li>
                  </ul>
                </div>
                
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  borderRadius: '8px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Transition Rate</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>15:1</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Student-Teacher Ratio</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>12</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Primary Teachers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary/University Preparation Section */}
            <div id="university-preparation" className="program-row" style={{alignItems: 'flex-start'}}>
              <div className="program-image">
                <div style={{
                  marginTop: '3rem',
                  marginBottom: '2rem'
                }} className="curriculum-content">
                  <h3 style={{
                    color: 'var(--primary-red)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>Our Curriculum Excellence</h3>
                  <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    color: 'var(--primary-black)',
                    marginBottom: '1rem'
                  }}>St. Lawrence Academy follows the South Sudanese National Curriculum enhanced with international standards, preparing students to excel locally and compete globally while maintaining strong cultural roots.</p>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'var(--medium-gray)'
                  }}>Our comprehensive educational approach integrates rigorous academic standards with cultural values, ensuring students develop both intellectual excellence and strong moral foundations. Through innovative teaching methodologies and personalized learning experiences, we cultivate critical thinking, creativity, and leadership skills essential for success in the 21st century.</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>University Acceptance</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)'}}>15:1</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Student-Teacher Ratio</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Graduation Rate</div>
                    </div>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="University Preparation" />
              </div>
              <div className="program-content" style={{marginTop: 0}}>
                <div className="program-header">
                  <h3>Higher Education Pathway</h3>
                </div>
                
                <p className="program-description">Our graduates successfully transition to universities across East Africa, including Makerere University, University of Nairobi, and international institutions, with strong preparation in both English and Arabic curricula.</p>
                
                <div style={{
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--primary-red)'
                }}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem'}}>Accredited Excellence</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                    <li>Ministry of Education Certified Curriculum</li>
                    <li>International Baccalaureate Preparation</li>
                    <li>Qualified Teachers with Advanced Degrees</li>
                  </ul>
                </div>
                
                <div className="program-features-list">
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Advanced Mathematics & Sciences</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Comprehensive mathematics including Algebra, Geometry, Calculus, and advanced sciences covering Physics, Chemistry, and Biology with hands-on laboratory experiences.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>English Language & Literature</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Advanced English communication skills, literary analysis, creative writing, and critical reading of classical and contemporary works from global authors.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Arabic Studies & Islamic Education</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Classical Arabic language mastery, Islamic history and civilization, Quranic studies, and contemporary Islamic thought and ethics.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Social Studies & History</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>South Sudanese history, African civilizations, world history, geography, civics, and contemporary global affairs and international relations.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Computer Science & Technology</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Programming fundamentals, web development, digital literacy, robotics, and emerging technologies preparing students for the digital age.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Laboratory Sciences & Research</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Hands-on scientific research methods, experimental design, data analysis, and independent research projects in state-of-the-art laboratories.</p>
                    </div>
                  </div>
                  <div className="feature-dropdown">
                    <div className="feature-line">
                      <span>Critical Thinking & Problem Solving</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    <div className="feature-content">
                      <p>Analytical reasoning, logical problem-solving strategies, debate and discussion skills, and interdisciplinary project-based learning approaches.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="science-subjects" className="program-row reverse" style={{alignItems: 'flex-start'}}>
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Science Laboratory" />
                <div style={{
                  marginTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="Mathematics Class" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                  <img src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="Agriculture Studies" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
              </div>
              <div className="program-content" style={{marginTop: 0}}>
                <div className="program-header">
                  <i className="fas fa-microscope"></i>
                  <h3>Science Subjects</h3>
                </div>
                <p style={{marginBottom: '2rem'}}>Our comprehensive science and mathematics program provides students with rigorous theoretical knowledge and extensive hands-on laboratory experience. Students engage in practical experiments, research projects, and real-world problem-solving that prepares them for careers in medicine, engineering, agriculture, and scientific research.</p>
                
                <div style={{
                  backgroundColor: 'rgba(126, 26, 25, 0.05)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--primary-red)'
                }}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem'}}>Learning Resources & Methods</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                    <li>Comprehensive textbooks and reference materials</li>
                    <li>Practical demonstrations and experiments</li>
                    <li>Problem-solving workshops and tutorials</li>
                    <li>Agricultural field studies and observations</li>
                    <li>Mathematics resource center with calculators</li>
                  </ul>
                </div>
                
                <div style={{marginTop: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Core Science Subjects</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                    <li>Chemistry & Biology</li>
                    <li>Pure & Additional Mathematics</li>
                    <li>Physics & Applied Sciences</li>
                    <li>Agriculture & Environmental Science</li>
                  </ul>
                </div>
                
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  borderRadius: '8px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Science Graduates</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Pass Rate</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>6</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Science Teachers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="arts-subjects" className="program-row" style={{alignItems: 'flex-start'}}>
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" alt="Library and Reading" />
                <div style={{
                  marginTop: '2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="History Class" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                  <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="Business Studies" 
                       style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
              </div>
              <div className="program-content" style={{marginTop: 0}}>
                <div className="program-header">
                  <i className="fas fa-globe-africa"></i>
                  <h3>Arts Subjects</h3>
                </div>
                <p style={{marginBottom: '2rem'}}>Our arts and humanities program develops critical thinking, cultural awareness, and communication skills essential for leadership in South Sudan. Students explore history, literature, languages, and commercial subjects that prepare them for careers in government, business, education, and international relations.</p>
                
                <div style={{
                  backgroundColor: 'rgba(126, 26, 25, 0.05)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--primary-red)'
                }}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem'}}>Learning Resources & Methods</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '0.95rem'}}>
                    <li>Comprehensive library with historical and literary collections</li>
                    <li>Interactive geography and mapping resources</li>
                    <li>Business simulation software and accounting tools</li>
                    <li>Debate and discussion forums for critical thinking</li>
                    <li>Cultural heritage preservation projects</li>
                  </ul>
                </div>
                
                <div style={{marginTop: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Core Arts Subjects</h4>
                  <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                    <li>History & Geography</li>
                    <li>Commerce & Accounting</li>
                    <li>Literature & Languages</li>
                    <li>Civics & Islamic Studies</li>
                  </ul>
                </div>
                
                <div style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  borderRadius: '8px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>100%</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Arts Graduates</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>5000+</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Library Books</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', display: 'block'}}>8</span>
                      <div style={{fontSize: '0.8rem', color: 'var(--medium-gray)'}}>Arts Teachers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* School Library Section */}
          </div>
          
          <div id="library" style={{marginTop: '5rem'}}>
            <h2 style={{fontSize: '2.2rem', color: 'var(--primary-black)', marginBottom: '3rem', textAlign: 'center'}} className="library-title">School Library & Learning Resources</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start'}} className="library-grid">
              <div>
                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.5rem'}}>Our Library Excellence</h3>
                  <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--primary-black)', marginBottom: '1rem'}}>Our comprehensive library serves as the heart of academic learning at St. Lawrence Academy. With an extensive collection of books, reference materials, and digital resources, students have access to knowledge that supports their curriculum and encourages independent research and lifelong learning habits.</p>
                  <p style={{fontSize: '1rem', lineHeight: '1.6', color: 'var(--medium-gray)'}}>The library provides a quiet, conducive environment for study and research, equipped with modern facilities and staffed by knowledgeable librarians who assist students in developing information literacy skills essential for academic success.</p>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '2px solid var(--primary-red)', marginTop: '2rem'}}>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '2rem', fontWeight: '900', color: 'var(--primary-red)', display: 'block'}}>8000+</span>
                      <div style={{fontSize: '0.85rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Books Available</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '2rem', fontWeight: '900', color: 'var(--primary-red)', display: 'block'}}>50</span>
                      <div style={{fontSize: '0.85rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Study Seats</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <span style={{fontSize: '2rem', fontWeight: '900', color: 'var(--primary-red)', display: 'block'}}>12hrs</span>
                      <div style={{fontSize: '0.85rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Daily Access</div>
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}} className="library-images">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="Students in Library" 
                       style={{width: '100%', height: '300px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                       alt="Students Studying" 
                       style={{width: '100%', height: '300px', objectFit: 'cover'}} />
                </div>
              </div>
              
              <div>
                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{color: 'var(--primary-red)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem'}}>Library Resources & Services</h3>
                  
                  <div style={{marginBottom: '2rem'}}>
                    <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Collections & Materials</h4>
                    <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                      <li>Academic textbooks for all subjects</li>
                      <li>Reference materials and encyclopedias</li>
                      <li>Newspapers and current affairs magazines</li>
                      <li>Literature and fiction collections</li>
                      <li>Research and study guides</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600'}}>Library Services</h4>
                    <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--medium-gray)', fontSize: '1rem', lineHeight: '1.8'}}>
                      <li>Book Lending</li>
                      <li>Research Assistance</li>
                      <li>Study Groups</li>
                      <li>Extended Hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Academic Support Services */}
            <div id="academic-support" style={{marginTop: '8rem', paddingTop: '5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
              <h2 style={{fontSize: '2.2rem', color: 'var(--primary-black)', marginBottom: '3rem', textAlign: 'center'}}>Academic Support & Enrichment</h2>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem'}}>
                <div style={{textAlign: 'center'}}>
                  <i className="fas fa-chalkboard-teacher" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
                  <h4 style={{fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-black)', marginBottom: '1rem'}}>Tutorial Programs</h4>
                  <p style={{fontSize: '1rem', color: 'var(--medium-gray)', lineHeight: '1.6'}}>Extra support sessions and peer tutoring for students who need additional help in challenging subjects.</p>
                </div>
                
                <div style={{textAlign: 'center'}}>
                  <i className="fas fa-trophy" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
                  <h4 style={{fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-black)', marginBottom: '1rem'}}>Academic Competitions</h4>
                  <p style={{fontSize: '1rem', color: 'var(--medium-gray)', lineHeight: '1.6'}}>Science fairs, mathematics olympiads, debate tournaments, and essay competitions to showcase student talents.</p>
                </div>
                
                <div style={{textAlign: 'center'}}>
                  <i className="fas fa-graduation-cap" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
                  <h4 style={{fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-black)', marginBottom: '1rem'}}>University Guidance</h4>
                  <p style={{fontSize: '1rem', color: 'var(--medium-gray)', lineHeight: '1.6'}}>Comprehensive counseling for university applications, scholarship opportunities, and career pathway planning.</p>
                </div>
                
                <div style={{textAlign: 'center'}}>
                  <i className="fas fa-laptop" style={{fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
                  <h4 style={{fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-black)', marginBottom: '1rem'}}>Digital Learning</h4>
                  <p style={{fontSize: '1rem', color: 'var(--medium-gray)', lineHeight: '1.6'}}>Computer literacy, online research skills, and digital tools integration across all subject areas.</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id="campus-life" className="campus-life scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Campus Life</span>
            <h2>A Vibrant Community of Learners</h2>
          </div>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--medium-gray)', marginBottom: '3rem', textAlign: 'left', maxWidth: 'none'}}>Beyond academics, St Lawrence Academy offers a rich and vibrant campus experience with diverse opportunities for personal growth, leadership development, and lifelong friendships. Our students engage in a wide range of extracurricular activities, from competitive sports and creative arts to community service and cultural celebrations. Through these experiences, students develop essential life skills, discover their passions, build lasting relationships, and create memories that will shape their character for years to come. Our campus community fosters an environment where every student can thrive, explore their interests, and contribute meaningfully to the school's dynamic culture.</p>

          {/* Athletics & Sports */}
          <div id="athletics" style={{marginTop: '4rem', marginBottom: '5rem'}}>
            <h3 style={{fontSize: '2.2rem', fontWeight: '700', color: 'var(--primary-black)', margin: 0, marginBottom: '2rem'}}>Athletics & Sports Excellence</h3>
            
            <div className="athletics-container">
              
              <div className="athletics-content">
                <div className="athletics-left">
                  <div className="athletics-description">
                    <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our comprehensive athletics program develops physical fitness, teamwork, and leadership skills through competitive sports and recreational activities. Students participate in interscholastic competitions while learning valuable life lessons about dedication, perseverance, and sportsmanship.</p>
                  </div>
                  
                  <div className="athletics-sports">
                    <div>
                      <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Team Sports</h4>
                      <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                        <li style={{marginBottom: '0.5rem'}}>• Football (Soccer)</li>
                        <li style={{marginBottom: '0.5rem'}}>• Basketball</li>
                        <li style={{marginBottom: '0.5rem'}}>• Volleyball</li>
                        <li style={{marginBottom: '0.5rem'}}>• Netball</li>
                        <li style={{marginBottom: '0.5rem'}}>• Cricket</li>
                        <li style={{marginBottom: '0.5rem'}}>• Rugby</li>
                      </ul>
                    </div>
                    <div className="sports-divider"></div>
                    <div>
                      <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Individual Sports</h4>
                      <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                        <li style={{marginBottom: '0.5rem'}}>• Track & Field</li>
                        <li style={{marginBottom: '0.5rem'}}>• Swimming</li>
                        <li style={{marginBottom: '0.5rem'}}>• Tennis</li>
                        <li style={{marginBottom: '0.5rem'}}>• Table Tennis</li>
                        <li style={{marginBottom: '0.5rem'}}>• Badminton</li>
                        <li style={{marginBottom: '0.5rem'}}>• Cross Country</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="athletics-image">
                  <div className="image-carousel" data-carousel="athletics">
                    <img src="/students-posing.jpg" alt="Sports" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Basketball" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Football" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Swimming" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <button className="carousel-arrow carousel-prev"><i className="fas fa-chevron-left"></i></button>
                    <button className="carousel-arrow carousel-next"><i className="fas fa-chevron-right"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arts & Culture */}
          <div id="arts-culture" style={{marginBottom: '5rem', paddingTop: '5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
            <h3 style={{fontSize: '2.2rem', fontWeight: '700', color: 'var(--primary-black)', margin: 0, marginBottom: '2rem'}}>Arts & Cultural Programs</h3>
            
            <div className="arts-container">
              <div className="arts-content">
                <div className="arts-left">
                  <div className="arts-description">
                    <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our vibrant arts program nurtures creativity and cultural expression through music, drama, visual arts, and dance. Students develop artistic skills while exploring their cultural heritage and contemporary artistic movements.</p>
                  </div>
                  
                  <div className="arts-programs">
                    <div>
                      <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Performing Arts</h4>
                      <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                        <li style={{marginBottom: '0.5rem'}}>• Drama & Theater</li>
                        <li style={{marginBottom: '0.5rem'}}>• Music & Choir</li>
                        <li style={{marginBottom: '0.5rem'}}>• Traditional Dance</li>
                        <li style={{marginBottom: '0.5rem'}}>• Modern Dance</li>
                        <li style={{marginBottom: '0.5rem'}}>• Poetry & Spoken Word</li>
                        <li style={{marginBottom: '0.5rem'}}>• Cultural Festivals</li>
                      </ul>
                    </div>
                    <div className="arts-divider"></div>
                    <div>
                      <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Visual Arts</h4>
                      <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                        <li style={{marginBottom: '0.5rem'}}>• Painting & Drawing</li>
                        <li style={{marginBottom: '0.5rem'}}>• Sculpture & Crafts</li>
                        <li style={{marginBottom: '0.5rem'}}>• Photography</li>
                        <li style={{marginBottom: '0.5rem'}}>• Digital Art</li>
                        <li style={{marginBottom: '0.5rem'}}>• Traditional Crafts</li>
                        <li style={{marginBottom: '0.5rem'}}>• Art Exhibitions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="arts-image">
                  <div className="image-carousel" data-carousel="arts">
                    <img src="/students.jpg" alt="Arts" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Theater" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Music" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Visual Arts" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                    <button className="carousel-arrow carousel-prev"><i className="fas fa-chevron-left"></i></button>
                    <button className="carousel-arrow carousel-next"><i className="fas fa-chevron-right"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Student Organizations & Leadership */}
          <div id="student-organizations" style={{marginBottom: '5rem', paddingTop: '5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
            <h3 style={{fontSize: '2.2rem', fontWeight: '700', color: 'var(--primary-black)', margin: 0, marginBottom: '2rem'}}>Student Organizations & Leadership</h3>
            
            <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Students develop leadership skills and pursue their interests through various clubs, societies, and student government opportunities. These organizations foster teamwork, responsibility, and community engagement.</p>
            
            <div className="organizations-layout">
              <div className="org-column">
                <div className="org-section">
                  <div className="org-circle"></div>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Student Government</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.5rem'}}>• Student Council</li>
                    <li style={{marginBottom: '0.5rem'}}>• Class Representatives</li>
                    <li style={{marginBottom: '0.5rem'}}>• Prefect System</li>
                    <li style={{marginBottom: '0.5rem'}}>• House Captains</li>
                  </ul>
                </div>
                
                <div className="org-section">
                  <div className="org-circle"></div>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Special Interest Groups</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.5rem'}}>• Environmental Club</li>
                    <li style={{marginBottom: '0.5rem'}}>• Community Service</li>
                    <li style={{marginBottom: '0.5rem'}}>• Cultural Society</li>
                    <li style={{marginBottom: '0.5rem'}}>• Technology Club</li>
                    <li style={{marginBottom: '0.5rem'}}>• Entrepreneurship Club</li>
                  </ul>
                </div>
              </div>
              
              <div className="org-divider"></div>
              
              <div className="org-column">
                <div className="org-section">
                  <div className="org-circle"></div>
                  <h4 style={{color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.2rem'}}>Academic Clubs</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.5rem'}}>• Debate Society</li>
                    <li style={{marginBottom: '0.5rem'}}>• Science Club</li>
                    <li style={{marginBottom: '0.5rem'}}>• Mathematics Society</li>
                    <li style={{marginBottom: '0.5rem'}}>• Literary Club</li>
                    <li style={{marginBottom: '0.5rem'}}>• Model UN</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campus Facilities & Services */}
          <div id="facilities" style={{marginBottom: '5rem', paddingTop: '5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
            <h3 style={{fontSize: '2.2rem', fontWeight: '700', color: 'var(--primary-black)', margin: 0, marginBottom: '2rem'}}>Campus Facilities & Services</h3>
            
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--medium-gray)', marginBottom: '4rem', textAlign: 'left', maxWidth: 'none'}}>Our modern campus provides state-of-the-art facilities designed to support learning, recreation, and personal development in a safe and nurturing environment. From cutting-edge science laboratories and technology centers to comprehensive sports facilities and comfortable student services, every aspect of our campus is thoughtfully designed to enhance the educational experience. Our facilities create an inspiring atmosphere where students can excel academically, grow personally, and build lasting friendships while preparing for their future careers and higher education opportunities.</p>
            
            <div className="facilities-zigzag">
              <div className="facility-card left-up scroll-animate">
                <div className="connection-circle"></div>
                <h4>Learning Spaces</h4>
                <ul>
                  <li>Modern Classrooms</li>
                  <li>Science Laboratories</li>
                  <li>Computer Labs</li>
                  <li>Library & Study Areas</li>
                  <li>Art Studios</li>
                </ul>
              </div>
              
              <div className="facility-card right-down scroll-animate">
                <div className="connection-circle"></div>
                <h4>Recreation & Sports</h4>
                <ul>
                  <li>Sports Fields</li>
                  <li>Basketball Courts</li>
                  <li>Gymnasium</li>
                  <li>Swimming Pool</li>
                  <li>Fitness Center</li>
                </ul>
              </div>
              
              <div className="facility-card left-up scroll-animate">
                <div className="connection-circle"></div>
                <h4>Student Services</h4>
                <ul>
                  <li>Cafeteria & Dining</li>
                  <li>Health Center</li>
                  <li>Counseling Services</li>
                  <li>Transportation</li>
                  <li>Boarding Facilities</li>
                </ul>
              </div>
              
              <div className="facility-card right-down scroll-animate">
                <div className="connection-circle"></div>
                <h4>Technology & Innovation</h4>
                <ul>
                  <li>High-Speed Internet</li>
                  <li>Smart Classrooms</li>
                  <li>Digital Learning Tools</li>
                  <li>Innovation Labs</li>
                  <li>Audio-Visual Equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="news-events scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Latest News</span>
            <h2>Stay Connected with Our Community</h2>
            <p style={{fontSize: '1.2rem', lineHeight: '1.7', color: 'var(--medium-gray)', marginBottom: '3rem', textAlign: 'left', maxWidth: 'none'}}>Discover the latest achievements, events, and milestones from our vibrant school community. Stay informed about academic successes, sports victories, cultural celebrations, and important announcements that showcase the dynamic spirit and excellence of Saint Lawrence Academy.</p>
          </div>
          
          <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem'}}>
            <a href="/blog" className="view-all-btn">View All News <i className="fas fa-arrow-right"></i></a>
          </div>
          
          <div className="news-main">
            {loading ? (
              <div style={{textAlign: 'center', padding: '3rem', color: 'var(--medium-gray)'}}>Loading...</div>
            ) : blogPosts.length === 0 ? (
              <div style={{textAlign: 'center', padding: '5rem 2rem', gridColumn: '1 / -1'}}>
                <i className="fas fa-newspaper" style={{fontSize: '4rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
                <h3 style={{fontSize: '1.5rem', color: 'var(--primary-black)', marginBottom: '1rem'}}>No Blog Posts Available</h3>
                <p style={{fontSize: '1rem', color: 'var(--medium-gray)'}}>Check back soon for updates and news from our community.</p>
              </div>
            ) : blogPosts.length >= 2 ? (
              <>
                <a href={`/blog/${blogPosts[0].id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <div className="featured-article">
                    <div className="article-image" style={{height: '350px'}}>
                      {isVideo(blogPosts[0]) ? (
                        blogPosts[0].video_url ? (
                          <iframe title={blogPosts[0].title} 
                            src={blogPosts[0].video_url.replace('watch?v=', 'embed/')} 
                            style={{width: '100%', height: '100%', border: 'none'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video controls style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                            <source src={getMediaUrl(blogPosts[0])} />
                          </video>
                        )
                      ) : (
                        <img src={getMediaUrl(blogPosts[0])} alt={blogPosts[0].title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      )}
                      <div className="article-overlay">
                        <span className="article-category">{blogPosts[0].category}</span>
                      </div>
                    </div>
                    <div className="article-content">
                      <div className="article-meta">
                        <span className="article-date">{formatDate(blogPosts[0].created_at)}</span>
                        <span className="read-time">{blogPosts[0].read_time} min read</span>
                      </div>
                      <h3 style={{height: '60px', overflow: 'hidden'}}>{truncateText(blogPosts[0].title, 80)}</h3>
                      <p style={{height: '48px', overflow: 'hidden'}}>{truncateText(blogPosts[0].excerpt, 120)}</p>
                      <div className="article-footer">
                        <div className="author-info">
                          <div className="author-avatar"></div>
                          <span>{blogPosts[0].author}</span>
                        </div>
                        <span className="read-article">Read Article <i className="fas fa-arrow-right"></i></span>
                      </div>
                    </div>
                  </div>
                </a>
                
                <a href={`/blog/${blogPosts[1].id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <div className="featured-article">
                    <div className="article-image" style={{height: '350px'}}>
                      {isVideo(blogPosts[1]) ? (
                        blogPosts[1].video_url ? (
                          <iframe title={blogPosts[0].title} 
                            src={blogPosts[1].video_url.replace('watch?v=', 'embed/')} 
                            style={{width: '100%', height: '100%', border: 'none'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video controls style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                            <source src={getMediaUrl(blogPosts[1])} />
                          </video>
                        )
                      ) : (
                        <img src={getMediaUrl(blogPosts[1])} alt={blogPosts[1].title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      )}
                      <div className="article-overlay">
                        <span className="article-category">{blogPosts[1].category}</span>
                      </div>
                    </div>
                    <div className="article-content">
                      <div className="article-meta">
                        <span className="article-date">{formatDate(blogPosts[1].created_at)}</span>
                        <span className="read-time">{blogPosts[1].read_time} min read</span>
                      </div>
                      <h3 style={{height: '60px', overflow: 'hidden'}}>{truncateText(blogPosts[1].title, 80)}</h3>
                      <p style={{height: '48px', overflow: 'hidden'}}>{truncateText(blogPosts[1].excerpt, 120)}</p>
                      <div className="article-footer">
                        <div className="author-info">
                          <div className="author-avatar"></div>
                          <span>{blogPosts[1].author}</span>
                        </div>
                        <span className="read-article">Read Article <i className="fas fa-arrow-right"></i></span>
                      </div>
                    </div>
                  </div>
                </a>
              </>
            ) : null}
          </div>
          
          <div className="news-grid">
            {!loading && blogPosts.slice(2, 5).map((post) => (
              <a key={post.id} href={`/blog/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <article className="news-article">
                  <div className="news-image" style={{height: '200px'}}>
                    {isVideo(post) ? (
                      post.video_url ? (
                        <iframe title={blogPosts[0].title} 
                          src={post.video_url.replace('watch?v=', 'embed/')} 
                          style={{width: '100%', height: '100%', border: 'none'}}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                          <source src={getMediaUrl(post)} />
                        </video>
                      )
                    ) : (
                      <img src={getMediaUrl(post)} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    )}
                  </div>
                  <div className="news-content">
                    <span className="news-date">{formatDate(post.created_at)}</span>
                    <h4 style={{height: '48px', overflow: 'hidden'}}>{truncateText(post.title, 60)}</h4>
                    <p style={{height: '60px', overflow: 'hidden'}}>{truncateText(post.excerpt, 100)}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
            
          <div className="news-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '2rem'}}>
            {!loading && blogPosts.slice(5, 8).map((post) => (
              <a key={post.id} href={`/blog/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <article className="news-article">
                  <div className="news-image" style={{height: '200px'}}>
                    {isVideo(post) ? (
                      post.video_url ? (
                        <iframe title={blogPosts[0].title} 
                          src={post.video_url.replace('watch?v=', 'embed/')} 
                          style={{width: '100%', height: '100%', border: 'none'}}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                          <source src={getMediaUrl(post)} />
                        </video>
                      )
                    ) : (
                      <img src={getMediaUrl(post)} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    )}
                  </div>
                  <div className="news-content">
                    <span className="news-date">{formatDate(post.created_at)}</span>
                    <h4 style={{height: '48px', overflow: 'hidden'}}>{truncateText(post.title, 60)}</h4>
                    <p style={{height: '60px', overflow: 'hidden'}}>{truncateText(post.excerpt, 100)}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
          
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
            <a href="/blog" className="view-all-btn">View More News <i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="faq-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Campus Tour</span>
            <h2>{campusTour ? campusTour.title : 'Experience Saint Lawrence Academy'}</h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--medium-gray)', marginBottom: '3rem', textAlign: 'left', maxWidth: 'none'}}>
              {campusTour ? campusTour.description : 'Take a virtual tour of our beautiful campus and discover the facilities, classrooms, and spaces where our students learn, grow, and thrive. See firsthand what makes Saint Lawrence Academy a premier educational institution.'}
            </p>
          </div>
          
          {campusTour && (campusTour.video_url || campusTour.video) && (
            <div style={{marginBottom: '4rem', maxWidth: '1200px', margin: '0 auto 4rem'}}>
              <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000'}}>
                {campusTour.video_url ? (
                  <iframe 
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none'}} 
                    src={campusTour.video_url.replace('watch?v=', 'embed/')} 
                    title={campusTour.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
                    <source src={`http://127.0.0.1:8000${campusTour.video}`} />
                  </video>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Frequently Asked Questions</span>
            <h2>Everything You Need to Know</h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--medium-gray)', marginBottom: '3rem', textAlign: 'left', maxWidth: 'none'}}>Find answers to common questions about admissions, academics, and student life at Saint Lawrence Academy. Whether you're interested in our enrollment process, curriculum offerings, extracurricular activities, or campus facilities, we've compiled comprehensive information to help you make informed decisions about your educational journey with us.</p>
          </div>
          
          <div className="program-features-list">
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What is the admission process?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>Our admission process includes an application, academic transcripts, entrance exam, and interview. We review applications holistically to find students who will thrive in our community.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What extracurricular activities are available?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>We offer over 35 clubs and organizations, 15 varsity sports teams, performing arts programs, and numerous leadership opportunities for students to explore their interests.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What is the student-teacher ratio?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>We maintain a 15:1 student-teacher ratio to ensure personalized attention and support for every student's academic and personal growth.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>Do you offer financial aid?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>Yes, we offer need-based financial aid and merit scholarships. Our financial aid office works with families to make quality education accessible.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What are the school hours and schedule?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>Classes run from 7:30 AM to 3:30 PM, Monday through Friday. We also offer extended study hours and after-school programs until 6:00 PM for additional academic support and extracurricular activities.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What transportation options are available?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>We provide comprehensive bus transportation covering major areas of the city. Additionally, we have secure parking facilities for students who drive and designated drop-off zones for parents.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>What meals and dining options do you offer?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>Our cafeteria serves nutritious breakfast, lunch, and snacks daily. We accommodate dietary restrictions and offer both local and international cuisine options to meet diverse student needs.</p>
              </div>
            </div>
            <div className="feature-dropdown">
              <div className="feature-line">
                <span>How do you support students with different learning needs?</span>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="feature-content">
                <p>We provide individualized learning support, tutoring programs, counseling services, and specialized resources to ensure every student can succeed regardless of their learning style or challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;