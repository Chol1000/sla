import React, { useEffect } from 'react';
import './About.css';

const StaffCard = ({ id, image, name, position, shortDesc, fullDesc, linkedin, twitter, facebook, instagram, email, phone, isExpanded, onToggle }) => {
  const getMediaUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400';
    if (url.startsWith('http')) return url;
    return `https://sla.pythonanywhere.com${url}`;
  };

  return (
    <div style={{textAlign: 'center', padding: '1.5rem', background: 'var(--primary-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: '5px', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '380px', maxHeight: isExpanded ? 'none' : '380px', overflow: 'hidden'}}>
      <img src={getMediaUrl(image)} alt={name} style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.8rem', border: '3px solid var(--primary-red)'}} />
      
      <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '0.8rem'}}>
        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}><i className="fab fa-linkedin"></i></a>}
        {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}><i className="fab fa-twitter"></i></a>}
        {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}><i className="fab fa-facebook"></i></a>}
        {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-red)', fontSize: '1.1rem', transition: 'color 0.3s'}}><i className="fab fa-instagram"></i></a>}
      </div>

      <h3 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem'}}>{name}</h3>
      <p style={{color: 'var(--primary-red)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.6rem'}}>{position}</p>
      {email && <p style={{color: 'var(--medium-gray)', fontSize: '0.85rem', marginBottom: '0.3rem'}}><i className="fas fa-envelope" style={{marginRight: '0.3rem'}}></i>{email}</p>}
      {phone && <p style={{color: 'var(--medium-gray)', fontSize: '0.85rem', marginBottom: '0.6rem'}}><i className="fas fa-phone" style={{marginRight: '0.3rem'}}></i>{phone}</p>}
      {shortDesc && <p style={{color: 'var(--medium-gray)', lineHeight: '1.5', marginBottom: '0.6rem', fontSize: '0.9rem', textAlign: 'center'}}>{shortDesc}</p>}
      
      {isExpanded && fullDesc && (
        <p style={{color: 'var(--medium-gray)', lineHeight: '1.5', marginBottom: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(126, 26, 25, 0.2)', fontSize: '0.9rem', textAlign: 'left'}}>{fullDesc}</p>
      )}
      
      {fullDesc && (
        <button 
          onClick={() => onToggle(id)}
          style={{color: 'var(--primary-red)', background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginTop: 'auto'}}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      )}
    </div>
  );
};

const About = () => {
  const [expandedStaff, setExpandedStaff] = React.useState(null);
  const [staffData, setStaffData] = React.useState({
    all: [],
    nursery: [],
    primary: [],
    secondary: [],
    pta: []
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://sla.pythonanywhere.com/api/staff/members/')
      .then(res => res.json())
      .then(data => {
        const staff = data.results || data;
        setStaffData({
          all: staff.filter(s => s.section === 'all'),
          nursery: staff.filter(s => s.section === 'nursery'),
          primary: staff.filter(s => s.section === 'primary'),
          secondary: staff.filter(s => s.section === 'secondary'),
          pta: staff.filter(s => s.section === 'pta')
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching staff:', err);
        setLoading(false);
      });
  }, []);

  const handleStaffToggle = (id) => {
    setExpandedStaff(expandedStaff === id ? null : id);
  };

  const renderStaffSection = (title, icon, staffList) => (
    <div style={{marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '3px solid var(--primary-red)'}}>
      <h3 style={{color: 'var(--primary-red)', fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem', fontWeight: '700'}}>
        <i className={`fas fa-${icon}`} style={{marginRight: '0.5rem'}}></i>
        {title}
      </h3>
      {loading ? (
        <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>Loading...</div>
      ) : staffList.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start'}}>
          {staffList.map(staff => (
            <StaffCard
              key={staff.id}
              id={staff.id}
              image={staff.photo}
              name={staff.name}
              position={staff.position}
              shortDesc={staff.bio ? staff.bio.substring(0, 50) + '...' : ''}
              fullDesc={staff.bio}
              linkedin={staff.linkedin}
              twitter={staff.twitter}
              facebook={staff.facebook}
              instagram={staff.instagram}
              email={staff.email}
              phone={staff.phone}
              isExpanded={expandedStaff === staff.id}
              onToggle={handleStaffToggle}
            />
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>No staff members available</div>
      )}
    </div>
  );

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
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-video">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80" alt="About our school" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="about-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="about-hero-content">
          <div className="about-hero-badge">
            <i className="fas fa-school"></i>
            About Us
          </div>
          <h1>St. Lawrence Academy</h1>
          <p>Building futures through excellence in education, character development, and unwavering commitment to every student's success since 1985.</p>
        </div>
      </section>

      {/* Our History */}
      <section className="section" id="history" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Our History</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8'}}>
              Nearly four decades of educational excellence, shaping futures and building leaders in South Sudan.
            </p>
          </div>

          <div className="foundation-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem'}}>
            <div>
              <div style={{background: 'var(--card-background)', padding: '3rem', border: '2px solid var(--primary-red)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <div style={{fontSize: '4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-red)'}}>2020</div>
                <h3 style={{fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary-red)'}}>Our Foundation</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  St. Lawrence Academy was founded in 2020 with a vision to provide quality education to the children of South Sudan. Starting with just 50 students and a handful of dedicated teachers, we set out to create an institution that would transform lives through education.
                </p>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800" alt="School History" style={{width: '100%', height: '400px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}} />
            </div>
          </div>

          <div className="history-detail" style={{background: 'var(--light-gray)', padding: '4rem', borderRadius: '12px', marginBottom: '4rem'}}>
            <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', textAlign: 'center', marginBottom: '3rem'}}>Our History in Detail</h3>
            <div className="history-text" style={{maxWidth: '1000px', margin: '0 auto'}}>
              <p style={{fontSize: '1.15rem', lineHeight: '2', color: 'var(--medium-gray)', marginBottom: '2rem', textAlign: 'justify'}}>
                St. Lawrence Academy was established in 2020 during a pivotal moment in South Sudan's educational landscape. Founded by a group of visionary educators and community leaders who recognized the urgent need for quality education in the region, the academy began its journey with a modest enrollment of 50 students and a dedicated team of passionate teachers. The founders envisioned an institution that would not only provide academic excellence but also nurture character, integrity, and leadership qualities in young South Sudanese citizens. Despite the challenges posed by limited resources and infrastructure in the early days, the founding team remained committed to their mission of transforming lives through education. The school started with basic facilities but was rich in determination and educational vision. From the very beginning, St. Lawrence Academy distinguished itself through its holistic approach to education, combining rigorous academic standards with character development, extracurricular activities, and community engagement. The academy's name was chosen to honor the values of service, sacrifice, and dedication to others, inspiring students to become not just successful individuals but also responsible citizens who contribute positively to their communities and nation.
              </p>
              <p style={{fontSize: '1.15rem', lineHeight: '2', color: 'var(--medium-gray)', textAlign: 'justify'}}>
                Since its founding in 2020, St. Lawrence Academy has experienced remarkable growth and development, evolving from a small educational initiative into a comprehensive institution serving over 500 students across nursery, primary, and secondary levels. Within just a few years, the academy has expanded its facilities to include modern classrooms, well-equipped science laboratories, a resourceful library, computer labs with internet connectivity, sports facilities, and a cafeteria providing nutritious meals. The school has attracted highly qualified teachers and staff members who bring expertise, passion, and innovative teaching methodologies to the classroom. Academic performance has consistently improved, with students achieving excellent results in national examinations and gaining admission to prestigious universities both within South Sudan and internationally. The academy has also established a vibrant extracurricular program featuring sports teams, debate clubs, science clubs, cultural activities, and community service initiatives that provide students with well-rounded development opportunities. Despite being a relatively young institution, St. Lawrence Academy has already made a significant impact on the community, earning recognition from parents, educational authorities, and stakeholders for its commitment to excellence, discipline, and holistic student development. Looking ahead, the academy continues to invest in infrastructure improvements, teacher professional development, and curriculum enhancement to ensure that every student receives the highest quality education and is prepared to meet the challenges and opportunities of the 21st century.
              </p>
            </div>
          </div>

          <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--card-background)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <div style={{fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '0.5rem'}}>500+</div>
              <div style={{fontSize: '0.9rem', color: 'var(--text-color)'}}>Current Students</div>
            </div>
            <div style={{textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--card-background)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <div style={{fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '0.5rem'}}>4</div>
              <div style={{fontSize: '0.9rem', color: 'var(--text-color)'}}>Years of Excellence</div>
            </div>
            <div style={{textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--card-background)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <div style={{fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '0.5rem'}}>100%</div>
              <div style={{fontSize: '0.9rem', color: 'var(--text-color)'}}>Acceptance Rate</div>
            </div>
            <div style={{textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--card-background)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <div style={{fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '0.5rem'}}>50+</div>
              <div style={{fontSize: '0.9rem', color: 'var(--text-color)'}}>Qualified Staff</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" id="mission" style={{padding: '100px 0', background: 'var(--light-gray)'}}>
        <div className="container">
          <div className="mission-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
            <div>
              <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'white', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>
                <i className="fas fa-bullseye" style={{marginRight: '0.5rem'}}></i>
                Our Mission
              </div>
              <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.2'}}>Committed to Educational Excellence</h2>
              <p style={{fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--medium-gray)', textAlign: 'justify'}}>
                At St. Lawrence Academy, we are committed to providing an exceptional educational experience that nurtures intellectual curiosity, develops critical thinking skills, and prepares students for success in higher education and beyond. We believe in fostering a learning environment where every student is valued, challenged, and supported to reach their full potential. Our dedicated faculty employs innovative teaching methods and personalized attention to ensure that each student develops not only academically but also socially, emotionally, and morally. We strive to instill values of integrity, respect, responsibility, and excellence that will guide our students throughout their lives.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800" alt="Mission" style={{width: '100%', height: '450px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section" style={{padding: '100px 0', background: 'var(--section-background)'}}>
        <div className="container">
          <div className="vision-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
            <div className="vision-text" style={{order: 2}}>
              <div style={{display: 'inline-block', padding: '8px 16px', background: 'var(--primary-red)', color: 'white', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '20px', marginBottom: '1.5rem'}}>
                <i className="fas fa-eye" style={{marginRight: '0.5rem'}}></i>
                Our Vision
              </div>
              <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.2'}}>Empowering Future Leaders</h2>
              <p style={{fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--medium-gray)', textAlign: 'justify'}}>
                To be a leading institution that empowers students to become confident, compassionate, and capable leaders who make positive contributions to their communities and the world. We envision a future where our graduates are equipped with the knowledge, skills, and character to navigate an increasingly complex global society. Our vision extends beyond academic achievement to encompass the development of well-rounded individuals who are critical thinkers, effective communicators, creative problem-solvers, and responsible global citizens. We aspire to create a lasting impact on South Sudan and beyond by producing graduates who will drive positive change, promote peace and development, and serve as role models in their respective fields.
              </p>
            </div>
            <div className="vision-image" style={{order: 1}}>
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800" alt="Vision" style={{width: '100%', height: '450px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Faculty & Staff */}
      <section className="section" id="faculty" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Faculty & Staff</h2>
          </div>
          <div style={{maxWidth: '1000px', margin: '0 auto', marginBottom: '4rem'}}>
            <p style={{fontSize: '1.15rem', lineHeight: '2', color: 'var(--medium-gray)', marginBottom: '2rem', textAlign: 'justify'}}>
              At St. Lawrence Academy, we pride ourselves on our exceptional faculty and staff who bring passion, expertise, and dedication to their work every day. Our educational team comprises highly qualified professionals with advanced degrees and extensive experience in their respective fields. Each member of our faculty undergoes rigorous selection processes and continuous professional development to ensure they remain at the forefront of educational best practices. From our experienced CEO who provides visionary leadership to our dedicated classroom teachers who inspire young minds daily, every staff member plays a crucial role in creating a nurturing and academically rigorous environment. Our teachers employ innovative teaching methodologies, integrate technology effectively, and maintain a student-centered approach that recognizes and celebrates the unique strengths and learning styles of each child.
            </p>
            <p style={{fontSize: '1.15rem', lineHeight: '2', color: 'var(--medium-gray)', marginBottom: '3rem', textAlign: 'justify'}}>
              Our organizational structure is designed to provide comprehensive support across all educational levels. The school is led by our Chief Executive Officer who oversees strategic direction and ensures excellence across all departments. Under this leadership, we have three main academic divisions: the Secondary Section serving students in grades 9-12 with specialized subject teachers and career counselors; the Primary Section catering to grades 1-8 with experienced educators focused on foundational skills and character development; and the Nursery Section providing early childhood education for our youngest learners aged 3-5 years. Each section is staffed with qualified teachers, teaching assistants, and support personnel who work collaboratively to deliver age-appropriate curriculum, maintain safe learning environments, and foster holistic development. Our administrative staff, including registrars, librarians, IT specialists, counselors, and facilities managers, ensure smooth operations and provide essential services that enhance the educational experience for all students.
            </p>
          </div>

          {/* Director Section */}
          <div style={{marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '3px solid var(--primary-red)'}}>
            <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', fontWeight: '700'}}>School Director</h3>
            {loading ? (
              <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>Loading...</div>
            ) : staffData.all.length > 0 ? (
              <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem'}}>
                {staffData.all.map(staff => (
                  <div key={staff.id} style={{maxWidth: '350px'}}>
                    <StaffCard
                      id={staff.id}
                      image={staff.photo}
                      name={staff.name}
                      position={staff.position}
                      shortDesc={staff.bio ? staff.bio.substring(0, 60) + '...' : ''}
                      fullDesc={staff.bio}
                      linkedin={staff.linkedin}
                      twitter={staff.twitter}
                      facebook={staff.facebook}
                      instagram={staff.instagram}
                      email={staff.email}
                      phone={staff.phone}
                      isExpanded={expandedStaff === staff.id}
                      onToggle={handleStaffToggle}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>No director information available</div>
            )}
          </div>

          {/* Secondary Section Staff */}
          {renderStaffSection('Secondary Section Staff', 'graduation-cap', staffData.secondary)}

          {/* Primary Section Staff */}
          {renderStaffSection('Primary Section Staff', 'book-reader', staffData.primary)}

          {/* Nursery Section Staff */}
          {renderStaffSection('Nursery Section Staff', 'child', staffData.nursery)}

          {/* Organizational Hierarchy Flowchart */}
          <div className="org-hierarchy" style={{marginTop: '5rem', marginBottom: '4rem', position: 'relative'}}>
            <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: '700'}}>Organizational Hierarchy</h3>
            
            {/* Level 1: Director */}
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '0', position: 'relative', zIndex: '2'}}>
              <div style={{background: 'linear-gradient(135deg, var(--primary-red) 0%, #9a1a19 100%)', color: 'white', padding: '1.5rem 3rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 15px rgba(126, 26, 25, 0.3)', minWidth: '280px', position: 'relative'}}>
                <i className="fas fa-user-tie" style={{fontSize: '2rem', marginBottom: '0.5rem'}}></i>
                <h4 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.3rem'}}>Director of School</h4>
                <p style={{fontSize: '0.9rem', opacity: '0.9'}}>Executive Leadership</p>
                {/* Arrow down */}
                <div style={{position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
                <div style={{position: 'absolute', bottom: '-35px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              </div>
            </div>
            
            {/* Horizontal connector line for 3 branches */}
            <div style={{display: 'flex', justifyContent: 'center', position: 'relative', height: '50px'}}>
              <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '20px', background: 'var(--primary-red)'}}></div>
              <div style={{position: 'absolute', top: '20px', left: '20%', right: '20%', height: '3px', background: 'var(--primary-red)'}}></div>
              {/* Three vertical lines down */}
              <div style={{position: 'absolute', top: '20px', left: '20%', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
              <div style={{position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
              <div style={{position: 'absolute', top: '20px', right: '20%', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
              {/* Arrows */}
              <div style={{position: 'absolute', top: '50px', left: '20%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              <div style={{position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              <div style={{position: 'absolute', top: '50px', right: '20%', transform: 'translateX(50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
            </div>

            {/* Level 2: Section Heads */}
            <div className="section-heads" style={{display: 'flex', justifyContent: 'space-around', marginBottom: '0', position: 'relative', zIndex: '2', maxWidth: '1200px', margin: '0 auto'}}>
              <div style={{background: 'var(--card-background)', border: '2px solid var(--primary-red)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '220px', flex: '1', maxWidth: '280px', margin: '0 1rem', position: 'relative'}}>
                <i className="fas fa-graduation-cap" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '0.5rem'}}></i>
                <h4 style={{color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.3rem'}}>Secondary Head</h4>
                <p style={{fontSize: '0.85rem', color: 'var(--text-color)', marginBottom: '0.5rem'}}>Secondary School</p>
                {/* Arrow down */}
                <div style={{position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
                <div style={{position: 'absolute', bottom: '-35px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              </div>
              <div style={{background: 'var(--card-background)', border: '2px solid var(--primary-red)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '220px', flex: '1', maxWidth: '280px', margin: '0 1rem', position: 'relative'}}>
                <i className="fas fa-book-reader" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '0.5rem'}}></i>
                <h4 style={{color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.3rem'}}>Primary Head</h4>
                <p style={{fontSize: '0.85rem', color: 'var(--text-color)', marginBottom: '0.5rem'}}>Primary School</p>
                {/* Arrow down */}
                <div style={{position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
                <div style={{position: 'absolute', bottom: '-35px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              </div>
              <div style={{background: 'var(--card-background)', border: '2px solid var(--primary-red)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '220px', flex: '1', maxWidth: '280px', margin: '0 1rem', position: 'relative'}}>
                <i className="fas fa-child" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '0.5rem'}}></i>
                <h4 style={{color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.3rem'}}>Nursery Head</h4>
                <p style={{fontSize: '0.85rem', color: 'var(--text-color)', marginBottom: '0.5rem'}}>Nursery School</p>
                {/* Arrow down */}
                <div style={{position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '30px', background: 'var(--primary-red)'}}></div>
                <div style={{position: 'absolute', bottom: '-35px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--primary-red)'}}></div>
              </div>
            </div>

            {/* Level 3: Department Staff */}
            <div className="department-staff" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '50px', maxWidth: '1200px', margin: '50px auto 0'}}>
              <div style={{background: 'var(--light-gray)', padding: '1.5rem', borderRadius: '8px', border: '2px solid var(--primary-red)'}}>
                <h5 style={{color: 'var(--primary-red)', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center'}}>Secondary Staff</h5>
                <ul style={{listStyle: 'none', padding: '0', fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: '1.8'}}>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Deputy Head</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Director of Studies</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Heads of Departments</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Relations Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Class Teachers</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Subject Teachers</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Lab Technicians</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Career Counselor</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Exam Officer</li>
                </ul>
              </div>
              <div style={{background: 'var(--light-gray)', padding: '1.5rem', borderRadius: '8px', border: '2px solid var(--primary-red)'}}>
                <h5 style={{color: 'var(--primary-red)', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center'}}>Primary Staff</h5>
                <ul style={{listStyle: 'none', padding: '0', fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: '1.8'}}>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Deputy Head</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Director of Studies</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Heads of Departments</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Relations Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Class Teachers</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Subject Teachers</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Teaching Assistants</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>PE Teacher</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Art & Music Teachers</li>
                </ul>
              </div>
              <div style={{background: 'var(--light-gray)', padding: '1.5rem', borderRadius: '8px', border: '2px solid var(--primary-red)'}}>
                <h5 style={{color: 'var(--primary-red)', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center'}}>Nursery Staff</h5>
                <ul style={{listStyle: 'none', padding: '0', fontSize: '0.85rem', color: 'var(--text-color)', lineHeight: '1.8'}}>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Deputy Head</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Director of Studies</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>School Relations Officer</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Class Teachers</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Early Childhood Educators</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Nursery Assistants</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Child Care Specialists</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Play Coordinator</li>
                  <li style={{marginBottom: '0.3rem'}}><i className="fas fa-arrow-right" style={{color: 'var(--primary-red)', fontSize: '0.7rem', marginRight: '0.5rem'}}></i>Health & Safety Officer</li>
                </ul>
              </div>
            </div>

            {/* Parents and Teachers Association Representatives */}
            <div style={{marginTop: '4rem', paddingTop: '3rem', borderTop: '3px solid var(--primary-red)'}}>
              <h5 className="pta-heading" style={{color: 'var(--primary-red)', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center'}}>Parents and Teachers Association (PTA) Representatives</h5>
              
              {loading ? (
                <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>Loading...</div>
              ) : staffData.pta.length > 0 ? (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start'}}>
                  {staffData.pta.map(staff => (
                    <StaffCard
                      key={staff.id}
                      id={staff.id}
                      image={staff.photo}
                      name={staff.name}
                      position={staff.position}
                      shortDesc={staff.bio ? staff.bio.substring(0, 50) + '...' : ''}
                      fullDesc={staff.bio}
                      linkedin={staff.linkedin}
                      twitter={staff.twitter}
                      facebook={staff.facebook}
                      instagram={staff.instagram}
                      email={staff.email}
                      phone={staff.phone}
                      isExpanded={expandedStaff === staff.id}
                      onToggle={handleStaffToggle}
                    />
                  ))}
                </div>
              ) : (
                <div style={{textAlign: 'center', padding: '2rem', color: 'var(--medium-gray)'}}>No PTA members available</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Campus & Facilities */}
      <section className="section" id="facilities" style={{padding: '100px 0', background: 'var(--light-gray)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Campus & Facilities</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8'}}>
              Our modern campus provides a safe, inspiring environment equipped with state-of-the-art facilities to support learning and growth.
            </p>
          </div>

          {/* Library */}
          <div style={{marginBottom: '4rem'}}>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Library</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  Our extensive library features a vast collection of books, digital resources, and quiet study spaces designed to foster a love for reading and research. Students have access to academic texts, fiction, reference materials, and online databases that support their learning across all subjects.
                </p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800" alt="Library" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>

          {/* Science Labs */}
          <div style={{marginBottom: '4rem'}}>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div className="facility-text-right" style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Science Labs</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  Modern, well-equipped laboratories for physics, chemistry, and biology provide hands-on learning experiences. Students conduct experiments, develop scientific inquiry skills, and explore concepts through practical application under the guidance of experienced teachers.
                </p>
              </div>
              <div className="facility-image-right" style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800" alt="Science Lab" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>

          {/* Computer Labs */}
          <div style={{marginBottom: '4rem'}}>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Computer Labs</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  Technology-equipped classrooms with modern computers and high-speed internet enable digital learning and computer science education. Students learn programming, digital literacy, and essential technology skills that prepare them for the digital age.
                </p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" alt="Computer Lab" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>

          {/* Sports Facilities */}
          <div style={{marginBottom: '4rem'}}>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div className="facility-text-right" style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Sports Facilities</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  Athletic fields, courts, and equipment support various sports and physical activities. Our facilities promote physical fitness, teamwork, and healthy competition, allowing students to develop athletic skills and sportsmanship.
                </p>
              </div>
              <div className="facility-image-right" style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" alt="Sports Facilities" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>

          {/* Cafeteria */}
          <div style={{marginBottom: '4rem'}}>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Cafeteria</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  Our cafeteria provides nutritious meals and snacks in a clean, comfortable dining environment. We prioritize healthy eating with balanced menus that support student growth and energy throughout the school day.
                </p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" alt="Cafeteria" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>

          {/* Auditorium */}
          <div>
            <div className="facility-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
              <div className="facility-text-right" style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem'}}>Auditorium</h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  A multi-purpose hall serves as the venue for assemblies, performances, and special events. The auditorium provides a professional space for student presentations, cultural celebrations, and community gatherings.
                </p>
              </div>
              <div className="facility-image-right" style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800" alt="Auditorium" style={{width: '100%', height: '350px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="section" style={{padding: '80px 0', background: 'var(--primary-red)', borderTop: '4px solid #9a1a19'}}>
        <div className="container">
          <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
            <h2 className="motivational-quote" style={{fontSize: '2.2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white', lineHeight: '1.4'}}>
              "Education is the most powerful weapon which you can use to change the world."
            </h2>
            <p style={{fontSize: '1.1rem', color: 'white', opacity: '0.9', fontStyle: 'italic'}}>— Nelson Mandela</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;