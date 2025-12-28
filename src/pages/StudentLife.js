import React, { useState, useEffect, useCallback } from 'react';
import './StudentLife.css';
import HeadStudents from '../components/HeadStudents';
import AlumniSection from '../components/AlumniSection';

// Alumni Form Component
const AlumniForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    graduation_year: '',
    title: '',
    short_desc: '',
    full_desc: '',
    image: null,
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('graduation_year', formData.graduation_year);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('short_desc', formData.short_desc);
    formDataToSend.append('full_desc', formData.full_desc);
    if (formData.image) formDataToSend.append('image', formData.image);
    if (formData.linkedin) formDataToSend.append('linkedin', formData.linkedin);
    if (formData.twitter) formDataToSend.append('twitter', formData.twitter);
    if (formData.facebook) formDataToSend.append('facebook', formData.facebook);
    if (formData.instagram) formDataToSend.append('instagram', formData.instagram);
    formDataToSend.append('is_active', 'false');
    formDataToSend.append('order', '0');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/alumni/', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setMessage('success');
        setFormData({
          name: '',
          graduation_year: '',
          title: '',
          short_desc: '',
          full_desc: '',
          image: null,
          linkedin: '',
          twitter: '',
          facebook: '',
          instagram: ''
        });
        document.getElementById('photo-upload').value = '';
      } else {
        setMessage('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('error');
    }
    setSubmitting(false);
  };

  return (
    <div className="alumni-form-container">
      <div className="alumni-form-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="alumni-form-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h3>Are You Our Alumni?</h3>
        <p>Share your success story and inspire current students. Your journey matters!</p>
        <button className="toggle-btn">
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </button>
      </div>

      {isOpen && (
      <form onSubmit={handleSubmit} className="alumni-form">
        {message === 'success' && (
          <div style={{padding: '1rem', marginBottom: '1rem', background: '#d4edda', color: '#155724', borderRadius: '5px', border: '1px solid #c3e6cb'}}>
            <strong>Success!</strong> Thank you for sharing your story! Your submission has been received and will be reviewed by our team. Once approved, it will appear on this page.
          </div>
        )}
        
        {message === 'error' && (
          <div style={{padding: '1rem', marginBottom: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '5px', border: '1px solid #f5c6cb'}}>
            <strong>Error!</strong> There was a problem submitting your story. Please check all fields and try again. If the problem persists, please contact us directly.
          </div>
        )}
        
        <div className="form-group">
          <label><i className="fas fa-user"></i> Full Name *</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><i className="fas fa-calendar-alt"></i> Graduation Year *</label>
            <input 
              type="text" 
              required
              value={formData.graduation_year}
              onChange={(e) => setFormData({...formData, graduation_year: e.target.value})}
              placeholder="e.g., Class of 2015"
            />
          </div>
          <div className="form-group">
            <label><i className="fas fa-briefcase"></i> Current Title/Position *</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Medical Doctor"
            />
          </div>
        </div>

        <div className="form-group">
          <label><i className="fas fa-camera"></i> Your Photo *</label>
          <div className="file-input-wrapper">
            <input 
              type="file" 
              accept="image/*"
              required
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="file-input-label">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>{formData.image ? formData.image.name : 'Choose a photo or drag it here'}</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label><i className="fas fa-align-left"></i> Short Description * (Max 100 characters)</label>
          <textarea 
            required
            value={formData.short_desc}
            onChange={(e) => setFormData({...formData, short_desc: e.target.value.slice(0, 100)})}
            rows="3"
            placeholder="Brief description of your current work (100 characters max)"
            maxLength="100"
          />
          <small style={{color: 'var(--medium-gray)', fontSize: '0.85rem'}}>{formData.short_desc.length}/100 characters</small>
        </div>

        <div className="form-group">
          <label><i className="fas fa-pen"></i> Your Success Story *</label>
          <textarea 
            required
            value={formData.full_desc}
            onChange={(e) => setFormData({...formData, full_desc: e.target.value})}
            rows="8"
            placeholder="Share your journey, achievements, and how St. Lawrence Academy shaped your success..."
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-share-alt"></i> Social Media Links</label>
          <div className="social-inputs">
            <div className="social-input-group">
              <i className="fab fa-linkedin"></i>
              <input 
                type="url" 
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="social-input-group">
              <i className="fab fa-twitter"></i>
              <input 
                type="url" 
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                placeholder="Twitter URL"
              />
            </div>
            <div className="social-input-group">
              <i className="fab fa-facebook"></i>
              <input 
                type="url" 
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                placeholder="Facebook URL"
              />
            </div>
            <div className="social-input-group">
              <i className="fab fa-instagram"></i>
              <input 
                type="url" 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                placeholder="Instagram URL"
              />
            </div>
          </div>
        </div>

        <div className="form-submit">
          <button type="submit" className="submit-btn" disabled={submitting}>
            <i className="fas fa-paper-plane"></i>
            {submitting ? 'Submitting...' : 'Submit Your Story'}
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

// Alumni Card Component
const StudentLife = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getMediaUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/alumni/')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.results.map(alumni => ({
          id: alumni.id,
          image: getMediaUrl(alumni.image),
          name: alumni.name,
          year: alumni.graduation_year,
          title: alumni.title,
          shortDesc: alumni.short_desc,
          fullDesc: alumni.full_desc,
          linkedin: alumni.linkedin || '#',
          twitter: alumni.twitter || '#',
          facebook: alumni.facebook || '#',
          instagram: alumni.instagram || '#'
        }));
        setAlumniData(formattedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching alumni:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="student-life-page">
      {/* Hero Section */}
      <section className="student-life-hero">
        <div className="student-life-hero-video">
          <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80" alt="Students activities" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="student-life-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="student-life-hero-content">
          <div className="student-life-hero-badge">
            <i className="fas fa-users"></i>
            Campus Life
          </div>
          <h1>Student Life</h1>
          <p>Experience a vibrant community where students grow, learn, and thrive through diverse opportunities in sports, arts, leadership, and cultural activities.</p>
        </div>
      </section>

      {/* Athletics & Sports */}
      <section className="section" id="athletics" style={{padding: '100px 0', background: 'var(--primary-white)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Athletics & Sports</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>Building champions through teamwork, discipline, and excellence in competitive sports. Our comprehensive athletics program develops physical fitness, mental toughness, and leadership skills while fostering school spirit and healthy competition.</p>
          </div>

          {/* Football */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-futbol" style={{marginRight: '1rem'}}></i>
                  Football (Soccer)
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our football program is one of the most popular and competitive sports at St. Lawrence Academy. Students develop technical skills, tactical awareness, and teamwork through regular training sessions and inter-school competitions. Our teams have consistently performed well in regional tournaments, bringing pride to our school.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Boys and Girls teams (U-14, U-16, U-19)</li>
                    <li style={{marginBottom: '0.75rem'}}>• Professional coaching staff</li>
                    <li style={{marginBottom: '0.75rem'}}>• Weekly training sessions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Inter-school league participation</li>
                    <li style={{marginBottom: '0.75rem'}}>• Annual football tournament</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800" alt="Football" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400" alt="Football Training" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400" alt="Football Match" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Basketball */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-basketball-ball" style={{marginRight: '1rem'}}></i>
                  Basketball
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Basketball at St. Lawrence Academy combines fast-paced action with strategic gameplay. Our program emphasizes skill development, teamwork, and sportsmanship. Students learn dribbling, shooting, passing, and defensive techniques while building endurance and agility. Our basketball teams compete in regional championships and have earned numerous accolades.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Indoor basketball court facility</li>
                    <li style={{marginBottom: '0.75rem'}}>• Experienced coaching team</li>
                    <li style={{marginBottom: '0.75rem'}}>• Regular practice sessions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Inter-house competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Regional tournament participation</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800" alt="Basketball" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400" alt="Basketball Practice" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400" alt="Basketball Game" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Volleyball */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-volleyball-ball" style={{marginRight: '1rem'}}></i>
                  Volleyball & Netball
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our volleyball and netball programs promote teamwork, coordination, and strategic thinking. Students develop serving, spiking, blocking, and passing skills while learning the importance of communication and positioning. Both sports are highly popular among our students, with dedicated teams competing at various levels throughout the academic year.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Separate boys and girls teams</li>
                    <li style={{marginBottom: '0.75rem'}}>• Outdoor and indoor courts</li>
                    <li style={{marginBottom: '0.75rem'}}>• Skill development workshops</li>
                    <li style={{marginBottom: '0.75rem'}}>• Inter-school competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Team building activities</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800" alt="Volleyball" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1593786481097-b5f9b1eb6e0f?w=400" alt="Volleyball Match" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400" alt="Netball" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Track & Field */}
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-running" style={{marginRight: '1rem'}}></i>
                  Track & Field
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Track and field athletics at St. Lawrence Academy develops speed, strength, endurance, and determination. Students compete in sprints, middle-distance races, long-distance events, hurdles, relays, long jump, high jump, and throwing events. Our annual sports day is a highlight of the school calendar, showcasing individual talents and house spirit.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• 400m running track</li>
                    <li style={{marginBottom: '0.75rem'}}>• Field event facilities</li>
                    <li style={{marginBottom: '0.75rem'}}>• Individual and team events</li>
                    <li style={{marginBottom: '0.75rem'}}>• Annual sports day competition</li>
                    <li style={{marginBottom: '0.75rem'}}>• Regional athletics meets</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800" alt="Track and Field" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400" alt="Running" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400" alt="Athletics" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Organizations */}
      <section className="section" id="clubs" style={{padding: '100px 0', background: 'var(--primary-white)', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Clubs & Organizations</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>Explore your interests and develop new skills through our diverse student organizations. Each club provides unique opportunities for personal growth, leadership development, and building lasting friendships with like-minded peers.</p>
          </div>

          {/* Debate Society */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-comments" style={{marginRight: '1rem'}}></i>
                  Debate Society
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Debate Society is one of our most prestigious clubs, training students in the art of argumentation, critical thinking, and public speaking. Members learn to research complex topics, construct logical arguments, and present their ideas confidently. Our debaters compete in regional and national tournaments, consistently bringing home awards and recognition.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Weekly debate sessions and workshops</li>
                    <li style={{marginBottom: '0.75rem'}}>• Inter-school debate competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Public speaking training</li>
                    <li style={{marginBottom: '0.75rem'}}>• Model UN participation</li>
                    <li style={{marginBottom: '0.75rem'}}>• National debate championship qualifiers</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800" alt="Debate" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=400" alt="Public Speaking" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400" alt="Debate Competition" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Science Club */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-flask" style={{marginRight: '1rem'}}></i>
                  Science Club
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Science Club ignites curiosity and fosters scientific inquiry through hands-on experiments, research projects, and science fairs. Students explore physics, chemistry, biology, and environmental science beyond the classroom curriculum. Members conduct independent research, participate in science olympiads, and engage with real-world scientific challenges.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Laboratory experiments and demonstrations</li>
                    <li style={{marginBottom: '0.75rem'}}>• Annual science fair participation</li>
                    <li style={{marginBottom: '0.75rem'}}>• Research project mentorship</li>
                    <li style={{marginBottom: '0.75rem'}}>• Science olympiad competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Guest lectures from scientists</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" alt="Science" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400" alt="Lab Work" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1581093458791-9d42e1c5e2e4?w=400" alt="Science Fair" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Technology Club */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-laptop-code" style={{marginRight: '1rem'}}></i>
                  Technology Club
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Technology Club prepares students for the digital age through coding, robotics, web development, and emerging technologies. Members learn programming languages, build websites and apps, participate in hackathons, and explore artificial intelligence and machine learning. The club provides hands-on experience with cutting-edge technology and prepares students for tech careers.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Programming workshops (Python, JavaScript)</li>
                    <li style={{marginBottom: '0.75rem'}}>• Robotics competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Web and app development projects</li>
                    <li style={{marginBottom: '0.75rem'}}>• Coding hackathons</li>
                    <li style={{marginBottom: '0.75rem'}}>• Tech innovation challenges</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" alt="Technology" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" alt="Coding" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400" alt="Robotics" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Literary Club */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-book" style={{marginRight: '1rem'}}></i>
                  Literary Club
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Literary Club celebrates the written word through reading, writing, and creative expression. Members explore diverse literary genres, participate in book discussions, write poetry and short stories, and publish the school literary magazine. The club hosts author visits, poetry slams, and creative writing workshops that nurture literary talent and appreciation.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Book club discussions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Creative writing workshops</li>
                    <li style={{marginBottom: '0.75rem'}}>• Poetry slam competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• School literary magazine publication</li>
                    <li style={{marginBottom: '0.75rem'}}>• Author visits and readings</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" alt="Literature" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400" alt="Reading" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" alt="Writing" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Club */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-leaf" style={{marginRight: '1rem'}}></i>
                  Environmental Club
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Environmental Club promotes sustainability and environmental awareness on campus and in the community. Members organize recycling programs, tree planting initiatives, clean-up campaigns, and environmental education workshops. The club works to reduce the school's carbon footprint and inspire eco-friendly practices among students and staff.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Campus recycling programs</li>
                    <li style={{marginBottom: '0.75rem'}}>• Tree planting campaigns</li>
                    <li style={{marginBottom: '0.75rem'}}>• Environmental awareness workshops</li>
                    <li style={{marginBottom: '0.75rem'}}>• Community clean-up drives</li>
                    <li style={{marginBottom: '0.75rem'}}>• Sustainability projects</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800" alt="Environment" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400" alt="Tree Planting" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400" alt="Recycling" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Community Service */}
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-hands-helping" style={{marginRight: '1rem'}}></i>
                  Community Service
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Community Service Club embodies our commitment to giving back and making a positive impact in society. Members volunteer at local organizations, organize charity drives, visit orphanages and elderly homes, and support community development projects. Through service, students develop empathy, leadership, and a sense of social responsibility.</p>
                <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Activities & Achievements</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Charity fundraising events</li>
                    <li style={{marginBottom: '0.75rem'}}>• Orphanage and elderly home visits</li>
                    <li style={{marginBottom: '0.75rem'}}>• Food and clothing drives</li>
                    <li style={{marginBottom: '0.75rem'}}>• Tutoring underprivileged children</li>
                    <li style={{marginBottom: '0.75rem'}}>• Community development projects</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800" alt="Community Service" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400" alt="Volunteering" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400" alt="Charity" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="section" id="extracurricular" style={{padding: '100px 0', background: 'var(--light-gray)', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Extracurricular Activities</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>Discover your passion through arts, music, drama, and cultural programs that nurture creativity and celebrate our rich cultural heritage</p>
          </div>

          {/* Drama & Theater */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-theater-masks" style={{marginRight: '1rem'}}></i>
                  Drama & Theater
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our drama program brings stories to life through theatrical performances, developing confidence, creativity, and collaboration. Students learn acting techniques, stage management, set design, and production skills. Annual productions showcase student talent and provide unforgettable experiences for performers and audiences alike.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Annual school plays and musicals</li>
                    <li style={{marginBottom: '0.75rem'}}>• Acting workshops and training</li>
                    <li style={{marginBottom: '0.75rem'}}>• Stage production and design</li>
                    <li style={{marginBottom: '0.75rem'}}>• Drama competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Theater trips and performances</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=800" alt="Theater" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400" alt="Drama Performance" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400" alt="Stage" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Music & Choir */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-music" style={{marginRight: '1rem'}}></i>
                  Music & Choir
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Music education at St. Lawrence Academy develops musical talent and appreciation through vocal and instrumental training. Our choir performs at school events, competitions, and community celebrations. Students learn music theory, vocal techniques, and performance skills while exploring diverse musical genres from traditional to contemporary.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• School choir and vocal ensembles</li>
                    <li style={{marginBottom: '0.75rem'}}>• Instrumental music lessons</li>
                    <li style={{marginBottom: '0.75rem'}}>• Music theory and composition</li>
                    <li style={{marginBottom: '0.75rem'}}>• Concert performances</li>
                    <li style={{marginBottom: '0.75rem'}}>• Music competitions and festivals</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800" alt="Music" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400" alt="Choir" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400" alt="Instruments" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Traditional Dance */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-drum" style={{marginRight: '1rem'}}></i>
                  Traditional Dance & Culture
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Celebrating South Sudanese heritage through traditional dance and cultural performances. Students learn authentic dances from various ethnic groups, understanding the history and significance behind each movement. Our cultural troupe performs at national celebrations, cultural festivals, and school events, preserving and promoting our rich cultural identity.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Traditional dance training</li>
                    <li style={{marginBottom: '0.75rem'}}>• Cultural festival performances</li>
                    <li style={{marginBottom: '0.75rem'}}>• Costume and traditional attire</li>
                    <li style={{marginBottom: '0.75rem'}}>• Cultural heritage education</li>
                    <li style={{marginBottom: '0.75rem'}}>• Community celebrations</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800" alt="Traditional Dance" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400" alt="Cultural Performance" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400" alt="Dance Group" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Arts */}
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
                  <i className="fas fa-palette" style={{marginRight: '1rem'}}></i>
                  Visual Arts
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our visual arts program nurtures creativity through painting, drawing, sculpture, and digital art. Students explore various mediums and techniques while developing their artistic voice. The program culminates in annual art exhibitions showcasing student work. From traditional to contemporary art forms, students learn to express ideas visually and appreciate artistic diversity.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem', marginBottom: '2rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Program Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Painting and drawing classes</li>
                    <li style={{marginBottom: '0.75rem'}}>• Sculpture and ceramics</li>
                    <li style={{marginBottom: '0.75rem'}}>• Photography and digital art</li>
                    <li style={{marginBottom: '0.75rem'}}>• Annual art exhibitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Art competitions and showcases</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800" alt="Visual Arts" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" alt="Painting" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400" alt="Art Studio" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Government */}
      <section className="section" id="student-government" style={{padding: '100px 0', background: 'var(--primary-white)', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Student Government</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>Lead, serve, and represent your fellow students through democratic governance and leadership opportunities that prepare you for future civic engagement</p>
          </div>

          {/* Student Council */}
          <StudentCouncilCarousel />

          {/* Prefect System */}
          <PrefectSystemCarousel />

          {/* Head Boy & Head Girl */}
          <HeadStudents />
        </div>
      </section>

      {/* Events & Calendar */}
      <section className="section" id="events" style={{padding: '100px 0', background: 'var(--light-gray)', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Events & Calendar</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>Join us for exciting events, celebrations, and activities throughout the academic year that bring our community together and create lasting memories</p>
          </div>

          {/* Sports Day */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>Annual Event</div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Sports Day</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our annual Sports Day is the highlight of the athletic calendar, featuring inter-house competitions in track and field, team sports, and relay races. Students compete for house glory while demonstrating sportsmanship, teamwork, and athletic excellence. The day culminates in an awards ceremony celebrating individual and team achievements.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Event Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Inter-house athletic competitions</li>
                    <li style={{marginBottom: '0.75rem'}}>• Track and field events</li>
                    <li style={{marginBottom: '0.75rem'}}>• Team sports tournaments</li>
                    <li style={{marginBottom: '0.75rem'}}>• Awards and recognition ceremony</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" alt="Sports Day" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400" alt="Athletics" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400" alt="Competition" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Festival */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>Annual Event</div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Cultural Festival</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Cultural Festival celebrates South Sudan's rich heritage through traditional music, dance, art, and cuisine. Students showcase cultural performances, traditional attire, and artistic expressions from various ethnic groups. This vibrant celebration promotes cultural understanding, pride, and unity within our diverse school community.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Event Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Traditional dance performances</li>
                    <li style={{marginBottom: '0.75rem'}}>• Cultural exhibitions and displays</li>
                    <li style={{marginBottom: '0.75rem'}}>• Traditional food and cuisine</li>
                    <li style={{marginBottom: '0.75rem'}}>• Art and craft demonstrations</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" alt="Cultural Festival" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400" alt="Traditional Dance" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400" alt="Cultural Performance" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Science Fair */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>Annual Event</div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Science Fair</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The annual Science Fair showcases student innovation and scientific inquiry. Students present research projects, experiments, and inventions across various scientific disciplines. Judges evaluate projects based on creativity, methodology, and presentation. Winners advance to regional and national science competitions, representing our school with distinction.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Event Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Student research presentations</li>
                    <li style={{marginBottom: '0.75rem'}}>• Scientific experiments and demonstrations</li>
                    <li style={{marginBottom: '0.75rem'}}>• Innovation and invention displays</li>
                    <li style={{marginBottom: '0.75rem'}}>• Awards and recognition</li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" alt="Science Fair" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400" alt="Science Project" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1581093458791-9d42e1c5e2e4?w=400" alt="Presentation" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>

          {/* Graduation Ceremony */}
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>Annual Event</div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>Graduation Ceremony</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Graduation Ceremony marks the culmination of years of hard work and achievement. Senior students celebrate their accomplishments with family, friends, and faculty. The ceremony includes speeches, awards, and the conferring of diplomas. It's a momentous occasion filled with pride, joy, and anticipation for future endeavors.</p>
                <div style={{background: 'var(--primary-white)', padding: '1.5rem'}}>
                  <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Event Highlights</h4>
                  <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                    <li style={{marginBottom: '0.75rem'}}>• Diploma conferring ceremony</li>
                    <li style={{marginBottom: '0.75rem'}}>• Valedictorian and speeches</li>
                    <li style={{marginBottom: '0.75rem'}}>• Academic awards and honors</li>
                    <li style={{marginBottom: '0.75rem'}}>• Celebration with family and friends</li>
                  </ul>
                </div>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800" alt="Graduation" style={{width: '100%', height: '400px', objectFit: 'cover', marginBottom: '1rem'}} />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400" alt="Graduates" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400" alt="Ceremony" style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="section" id="alumni" style={{padding: '100px 0', background: 'var(--primary-white)', borderTop: '2px solid var(--primary-red)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Our Alumni</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', marginBottom: '1rem'}}>St. Lawrence Academy graduates have gone on to achieve remarkable success in various fields, making positive impacts in South Sudan and around the world. Our alumni are leaders, innovators, and change-makers who embody the values of excellence, integrity, and service instilled during their time at the academy.</p>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8'}}>From doctors saving lives in rural communities to engineers building critical infrastructure, from educators transforming classrooms to entrepreneurs creating jobs and opportunities, our alumni are making a tangible difference. They serve in government, lead NGOs, advance scientific research, practice law, and contribute to every sector of society. Their achievements reflect the strong foundation and holistic education they received at St. Lawrence Academy.</p>
          </div>

          {loading ? (
            <div style={{textAlign: 'center', padding: '4rem 0'}}>
              <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)'}}>Loading alumni...</p>
            </div>
          ) : alumniData.length === 0 ? (
            <div style={{textAlign: 'center', padding: '4rem 0'}}>
              <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)'}}>No alumni added yet.</p>
            </div>
          ) : (
            <AlumniSection
              alumniData={alumniData}
              expandedCard={expandedCard}
              onToggle={handleToggle}
            />
          )}

          <AlumniForm />
        </div>
      </section>
    </div>
  );
};

// Student Council Carousel Component
const StudentCouncilCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  ];

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % images.length), [images.length]);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div style={{marginBottom: '6rem'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
        <div>
          <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <i className="fas fa-users-cog" style={{marginRight: '1rem'}}></i>
            Student Council
          </h3>
          <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Student Council is the democratically elected voice of the student body. Led by the <strong>Student Council President</strong>, council members represent student interests, organize school events, and work with administration to improve campus life. The President focuses on student advocacy, event coordination, and implementing student-led initiatives.</p>
          <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
            <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Roles & Responsibilities</h4>
            <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
              <li style={{marginBottom: '0.75rem'}}>• President & Vice President leadership</li>
              <li style={{marginBottom: '0.75rem'}}>• Class representatives from each grade</li>
              <li style={{marginBottom: '0.75rem'}}>• Event planning and coordination</li>
              <li style={{marginBottom: '0.75rem'}}>• Student advocacy and representation</li>
              <li style={{marginBottom: '0.75rem'}}>• School improvement initiatives</li>
            </ul>
          </div>
        </div>
        <div style={{position: 'relative'}}>
          <img src={images[currentIndex]} alt="Student Council" style={{width: '100%', height: '500px', objectFit: 'cover'}} />
          <button onClick={prevSlide} style={{position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={nextSlide} style={{position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Prefect System Carousel Component
const PrefectSystemCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'
  ];

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % images.length), [images.length]);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
        <div style={{order: 2}}>
          <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <i className="fas fa-award" style={{marginRight: '1rem'}}></i>
            Prefect System
          </h3>
          <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>The Prefect System recognizes exemplary students as role models and leaders. The <strong>Head Boy and Head Girl</strong> are the highest student leadership positions, focusing on discipline, mentorship, and upholding school traditions. Unlike the Student Council President who handles events and advocacy, the Head Boy/Girl maintain order, mentor younger students, and preserve school values.</p>
          <div style={{background: 'var(--light-gray)', padding: '1.5rem', marginBottom: '2rem'}}>
            <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Leadership Positions</h4>
            <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
              <li style={{marginBottom: '0.75rem'}}>• Head Boy & Head Girl (Discipline & Tradition)</li>
              <li style={{marginBottom: '0.75rem'}}>• House Captains and Vice Captains</li>
              <li style={{marginBottom: '0.75rem'}}>• Senior and Junior Prefects</li>
              <li style={{marginBottom: '0.75rem'}}>• Student mentorship and guidance</li>
              <li style={{marginBottom: '0.75rem'}}>• School values preservation</li>
            </ul>
          </div>
        </div>
        <div style={{order: 1, position: 'relative'}}>
          <img src={images[currentIndex]} alt="Prefects" style={{width: '100%', height: '500px', objectFit: 'cover'}} />
          <button onClick={prevSlide} style={{position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={nextSlide} style={{position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(126, 26, 25, 0.8)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLife;
