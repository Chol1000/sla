import React, { useEffect } from 'react';
import './Academics.css';

const Academics = () => {
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
    <div className="academics-page">
      {/* Hero Section */}
      <section className="academics-hero">
        <div className="academics-hero-video">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80" alt="Academic excellence" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="academics-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="academics-hero-content">
          <div className="academics-hero-badge">
            <i className="fas fa-book-open"></i>
            Excellence in Education
          </div>
          <h1>Academics</h1>
          <p>Empowering minds through rigorous curriculum, innovative teaching, and comprehensive programs that prepare students for university success and lifelong learning.</p>
        </div>
      </section>

      <section className="section" id="curriculum" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Curriculum</h2>
            <p style={{fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
              St. Lawrence Academy follows the South Sudan National Curriculum, providing quality education across all levels from early childhood through secondary education.
            </p>
          </div>

          {/* Nursery School */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-child" style={{marginRight: '1rem'}}></i>
                  Nursery School
                </h3>
                <div style={{display: 'inline-block', padding: '6px 12px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', borderRadius: '20px', marginBottom: '1.5rem'}}>Baby, Middle & Top Class</div>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Early childhood development program focusing on foundational skills through play-based learning, creative activities, and social interaction.</p>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Learning Areas</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Language development
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Early numeracy skills
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Creative arts & music
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Physical activities
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Social skills development
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800" alt="Nursery School" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          {/* Detailed Learning Areas */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem'}}>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-comments" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Language Development</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Building vocabulary, listening skills, and basic communication through stories, songs, and conversations in English and Arabic.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-calculator" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Early Numeracy</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Introduction to numbers, counting, shapes, patterns, and basic mathematical concepts through play and hands-on activities.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-palette" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Creative Arts & Music</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Expressing creativity through drawing, painting, crafts, singing, and musical activities that develop fine motor skills.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-running" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Physical Activities</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Developing motor skills, coordination, and healthy habits through outdoor play, games, and structured physical exercises.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-users" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Social Skills</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Learning to share, cooperate, follow routines, and interact positively with peers and teachers in a nurturing environment.</p>
            </div>
          </div>

          {/* Primary School */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-book-reader" style={{marginRight: '1rem'}}></i>
                  Primary School
                </h3>
                <div style={{display: 'inline-block', padding: '6px 12px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', borderRadius: '20px', marginBottom: '1.5rem'}}>P1 - P8</div>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Comprehensive South Sudan National Curriculum building strong academic foundations with quality education in English and Arabic instruction.</p>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Core Subjects</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Mathematics
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Social Studies
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    English Language
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Science
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Christian Religious Education
                  </li>
                </ul>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800" alt="Primary School" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          {/* Primary School Detailed Subjects */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem'}}>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-calculator" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Mathematics</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Building strong mathematical foundations through arithmetic, geometry, problem-solving, and logical reasoning skills.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-globe-africa" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Social Studies</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Understanding society, culture, geography, and history with focus on South Sudan and the wider world.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-language" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>English Language</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Comprehensive language instruction developing reading, writing, speaking, and listening skills in English.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-flask" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Science</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Exploring the natural world through hands-on experiments, observations, and scientific inquiry in biology, physics, and chemistry.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-cross" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Christian Religious Education</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Moral and spiritual development through Christian teachings, values, and ethical principles.</p>
            </div>
          </div>

          {/* Secondary School */}
          <div style={{marginBottom: '4rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>

              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-graduation-cap" style={{marginRight: '1rem'}}></i>
                  Secondary School
                </h3>
                <div style={{display: 'inline-block', padding: '6px 12px', background: 'var(--primary-red)', color: 'var(--primary-white)', fontSize: '0.85rem', fontWeight: '600', borderRadius: '20px', marginBottom: '1.5rem'}}>Senior 1 - 4</div>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Advanced curriculum preparing students for university and professional careers with specialized Science and Arts tracks.</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem'}}>
                  <div>
                    <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Science Track</h4>
                    <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                      <li style={{padding: '0.5rem 0'}}>• Agriculture</li>
                      <li style={{padding: '0.5rem 0'}}>• Additional Mathematics</li>
                      <li style={{padding: '0.5rem 0'}}>• Biology</li>
                      <li style={{padding: '0.5rem 0'}}>• Physics</li>
                      <li style={{padding: '0.5rem 0'}}>• Chemistry</li>
                      <li style={{padding: '0.5rem 0'}}>• Computer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Arts Track</h4>
                    <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                      <li style={{padding: '0.5rem 0'}}>• Commerce</li>
                      <li style={{padding: '0.5rem 0'}}>• Geography</li>
                      <li style={{padding: '0.5rem 0'}}>• Accounting</li>
                      <li style={{padding: '0.5rem 0'}}>• Literature</li>
                      <li style={{padding: '0.5rem 0'}}>• History</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{color: 'var(--primary-red)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Combined (Both)</h4>
                    <ul style={{listStyle: 'none', padding: 0, color: 'var(--medium-gray)'}}>
                      <li style={{padding: '0.5rem 0'}}>• Mathematics</li>
                      <li style={{padding: '0.5rem 0'}}>• English Language</li>
                      <li style={{padding: '0.5rem 0'}}>• Christian Religious Education</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800" alt="Secondary School" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          {/* Secondary School Detailed Subjects */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-seedling" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Agriculture</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Study of farming, crop production, animal husbandry, and sustainable agricultural practices for food security.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-atom" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Physics</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Study of matter, energy, motion, and forces through theoretical concepts and practical laboratory experiments.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-vial" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Chemistry</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Exploring chemical reactions, elements, compounds, and molecular structures with hands-on laboratory work.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-dna" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Biology</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Understanding living organisms, ecosystems, human anatomy, and life processes through scientific investigation.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-square-root-alt" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Mathematics</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Advanced mathematics including algebra, calculus, trigonometry, and statistics for university preparation.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-laptop-code" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Computer</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Computer science, programming, and technology skills preparing students for the digital age.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-chart-line" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Commerce</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Business principles, trade, economics, and entrepreneurship skills for future business leaders.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-globe" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Geography</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Physical and human geography, environmental studies, and spatial understanding of the world.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-calculator" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Accounting</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Financial accounting, bookkeeping, and business finance for careers in accounting and finance.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-book-open" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Literature</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Analysis of literary works, poetry, drama, and prose developing critical thinking and appreciation for literature.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-landmark" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>History</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Comprehensive study of world history, African heritage, and South Sudan's historical development.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-language" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>English Language</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Advanced English language skills, communication, and linguistic competence for academic and professional success.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-cross" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Christian Religious Education</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Moral and spiritual development through Christian teachings, values, ethics, and biblical studies.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Arts & Humanities */}
      <section className="section" id="arts" style={{padding: '100px 0', background: 'var(--light-gray)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Arts & Humanities</h2>
            <p style={{fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
              Our Arts & Humanities programs cultivate critical thinking, creativity, and cultural awareness. Students explore literature, history, and the arts while developing essential skills in analysis, communication, and creative expression that prepare them for diverse career paths and informed citizenship.
            </p>
          </div>

          {/* Literature */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-book-open" style={{marginRight: '1rem'}}></i>
                  Literature
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our literature program explores diverse literary traditions from around the world, developing students' analytical and interpretive skills through the study of novels, poetry, drama, and essays. Students engage with classic and contemporary works, examining themes, literary techniques, and cultural contexts.</p>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>What Students Learn</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Critical analysis of literary texts
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Creative writing and composition
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Understanding cultural and historical contexts
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Advanced communication skills
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" alt="Literature" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          {/* History */}
          <div style={{marginBottom: '6rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div style={{order: 2}}>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-landmark" style={{marginRight: '1rem'}}></i>
                  History
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our history curriculum provides comprehensive study of world civilizations, African heritage, and South Sudan's historical development. Students examine political, social, economic, and cultural forces that have shaped societies, developing critical thinking skills and understanding of contemporary global issues.</p>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Areas of Study</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Ancient and modern civilizations
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    African history and heritage
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    South Sudan's independence and development
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Historical research and analysis
                  </li>
                </ul>
              </div>
              <div style={{order: 1}}>
                <img src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800" alt="History" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          {/* Fine Arts */}
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-palette" style={{marginRight: '1rem'}}></i>
                  Fine Arts
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our Fine Arts program nurtures creativity and artistic expression through visual arts, music, and drama. Students develop technical skills, aesthetic appreciation, and confidence in creative expression while exploring various artistic mediums and cultural traditions.</p>
                <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>Creative Disciplines</h4>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Visual arts: painting, drawing, sculpture
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Music: vocal and instrumental training
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Drama and theater performance
                  </li>
                  <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--primary-black)'}}>
                    <i className="fas fa-check-circle" style={{color: 'var(--primary-red)', marginRight: '1rem'}}></i>
                    Traditional and contemporary arts
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800" alt="Fine Arts" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Resources */}
      <section className="section" id="library" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '5rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Library Resources</h2>
            <p style={{fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
              The St. Lawrence Academy Library is the heart of our academic community, providing comprehensive resources that support student learning, research, and intellectual growth. Our modern facility offers a welcoming environment for study, collaboration, and discovery.
            </p>
          </div>

          <div style={{marginBottom: '4rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
              <div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem'}}>
                  <i className="fas fa-book" style={{marginRight: '1rem'}}></i>
                  Our Collection
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--medium-gray)', marginBottom: '2rem'}}>Our extensive collection includes over 10,000 carefully curated books, digital resources, and reference materials covering all academic subjects. From classic literature to contemporary research, our library provides the resources students need to excel in their studies and explore their interests.</p>
                <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
                  <h4 style={{color: 'var(--primary-black)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem'}}>Available Resources</h4>
                  <ul style={{listStyle: 'none', padding: 0}}>
                    <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0'}}>
                      <i className="fas fa-book" style={{color: 'var(--primary-red)', marginRight: '1rem', fontSize: '1.2rem'}}></i>
                      <strong style={{color: 'var(--primary-black)'}}>10,000+ Books</strong>
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0'}}>
                      <i className="fas fa-laptop" style={{color: 'var(--primary-red)', marginRight: '1rem', fontSize: '1.2rem'}}></i>
                      <strong style={{color: 'var(--primary-black)'}}>Digital Resources</strong>
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0'}}>
                      <i className="fas fa-newspaper" style={{color: 'var(--primary-red)', marginRight: '1rem', fontSize: '1.2rem'}}></i>
                      <strong style={{color: 'var(--primary-black)'}}>Periodicals</strong>
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', padding: '0.75rem 0'}}>
                      <i className="fas fa-globe" style={{color: 'var(--primary-red)', marginRight: '1rem', fontSize: '1.2rem'}}></i>
                      <strong style={{color: 'var(--primary-black)'}}>Reference Section</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800" alt="Library" style={{width: '100%', height: '500px', objectFit: 'cover'}} />
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-chair" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Study Spaces</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Quiet individual study areas, collaborative group rooms, and comfortable reading spaces designed to support different learning styles and needs.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-user-graduate" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Librarian Support</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Professional librarians provide research assistance, information literacy instruction, and guidance in finding and evaluating resources.</p>
            </div>
            <div style={{background: 'var(--light-gray)', padding: '2rem', borderRadius: '8px'}}>
              <i className="fas fa-clock" style={{fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem'}}></i>
              <h4 style={{color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '1rem'}}>Extended Hours</h4>
              <p style={{color: 'var(--medium-gray)', lineHeight: '1.7'}}>Open throughout the school day and after hours to accommodate student schedules and provide flexible access to resources.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;