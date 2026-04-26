import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { initDropdowns } from '../utils/dropdownHandler';
import { initCarousels } from '../utils/carousel';
import API_URL from '../utils/api';
import { setPageMeta } from '../utils/pageMeta';

const HERO_SLIDES = [
  {
    img: '/images/secondary/morning_assembly.JPG',
    bgPos: 'center 40%',
    title: 'Building Character Daily',
    desc: 'Discipline, integrity, and leadership form the foundation of every school day at St. Lawrence Academy — shaping responsible, principled citizens for South Sudan and beyond.',
  },
  {
    img: '/images/secondary/school_view.jpg',
    bgPos: 'center center',
    title: 'A Place to Belong',
    desc: 'Our safe, welcoming campus in Hai Referendum, Juba is designed to inspire curiosity, nurture every talent, and make every child feel truly at home.',
  },
  {
    img: '/images/secondary/school_gate.jpg',
    bgPos: 'center center',
    title: 'Where Dreams Begin',
    desc: 'Join the St. Lawrence Academy family — trusted by parents across Juba since 2020 for education that genuinely prepares children for life, university, and the world.',
  },
  {
    img: '/images/primary/primary_campus.jpg',
    bgPos: 'center center',
    title: 'Excellence in Education',
    desc: 'St. Lawrence Academy — a leading school in Juba offering quality Nursery, Primary, and Secondary education built on academic rigour, strong values, and genuine care for every child.',
  },
  {
    img: '/images/secondary/assembly_1.JPG',
    bgPos: 'center 35%',
    title: 'Shaping Futures Together',
    desc: 'Every student at SLA is known by name, supported individually, and guided step by step toward discovering their true potential and purpose.',
  },
  {
    img: '/images/primary/primary_campus_1.jpg',
    bgPos: 'center center',
    title: 'Beyond the Classroom',
    desc: 'From athletics and music to cultural celebrations and community service — SLA nurtures well-rounded, confident individuals who are proud of who they are.',
  },
  {
    img: '/images/secondary/assembly_2.JPG',
    bgPos: 'center 80px',
    title: 'Values That Last a Lifetime',
    desc: 'We believe great education is inseparable from strong values — honesty, respect, hard work, and service form the core of every SLA student\'s character.',
  },
  {
    img: '/images/secondary/assembly_view_from_above.JPG',
    bgPos: 'center center',
    title: 'A Community United',
    desc: 'Every morning our students gather with purpose — building discipline, shared identity, and the bonds that carry them through school and beyond.',
  },
  {
    img: '/images/secondary/sla_school_view_1.jpg',
    bgPos: 'center center',
    title: 'Our Growing Campus',
    desc: 'A modern, expanding campus built to give every student the facilities, space, and environment they need to learn, grow, and thrive.',
  },
  {
    img: '/images/secondary/campus_view_from_above_assembly.JPG',
    bgPos: 'center center',
    title: 'Rooted in Community',
    desc: 'St. Lawrence Academy is more than a school — it is a community of families, educators, and students united by a shared belief in the power of education.',
  },
];

const HERO_IMAGES = HERO_SLIDES.map(s => s.img);

const PREVIEW_CHARS = 220;

const HomeReviewCard = ({ r }) => {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = r.text.length > PREVIEW_CHARS;
  const displayText = needsExpand && !expanded
    ? r.text.slice(0, PREVIEW_CHARS).trimEnd() + '…'
    : r.text;
  return (
    <div className="home-review-card">
      <div className="home-review-card-top">
        <div className="home-review-avatar">
          {r.name.trim().split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()}
        </div>
        <div>
          <span className="home-review-name">{r.name}</span>
          <span className="home-review-role">{r.role || r.reviewer_type}</span>
        </div>
      </div>
      <div className="home-review-stars">
        {[1,2,3,4,5].map(n => (
          <span key={n} style={{color: n <= r.rating ? '#e8a020' : '#ddd', fontSize: '1rem'}}>&#9733;</span>
        ))}
      </div>
      <div className="home-review-text-wrap">
        <p className="home-review-text">"{displayText}"</p>
        {needsExpand && (
          <button className="home-review-expand-btn" onClick={() => setExpanded(e => !e)}>
            {expanded
              ? <><i className="fas fa-chevron-up"></i> Show less</>
              : <><i className="fas fa-chevron-down"></i> Read more</>}
          </button>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [prevCarouselIdx, setPrevCarouselIdx] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const heroIntervalRef = useRef(null);

  useEffect(() => {
    setPageMeta(null, 'St. Lawrence Academy — your ideal school in Juba, South Sudan. Quality education from Nursery through Secondary, shaping tomorrow\'s leaders today.');
    let campusAutoplay = null;
    const timer = setTimeout(() => {
      initScrollAnimations();
      initDropdowns();
      initCarousels();

      // Campus Tour Split Carousel
      const campusSlides = document.querySelectorAll('.campus-tour-slide');
      const campusContent = document.querySelectorAll('.campus-content-item');
      const campusDots = document.querySelectorAll('.campus-nav-dot');
      const campusDotsMobile = document.querySelectorAll('.campus-nav-dot-mobile');
      const prevBtn = document.querySelector('.campus-prev');
      const nextBtn = document.querySelector('.campus-next');
      const prevBtnMobile = document.querySelector('.campus-prev-mobile');
      const nextBtnMobile = document.querySelector('.campus-next-mobile');
      let currentIndex = 0;

      const showCampusSlide = (index) => {
        campusSlides.forEach(s => s.classList.remove('active'));
        campusContent.forEach(c => c.classList.remove('active'));
        campusDots.forEach(d => d.classList.remove('active'));
        campusDotsMobile.forEach(d => d.classList.remove('active'));
        campusSlides[index].classList.add('active');
        campusContent[index].classList.add('active');
        if (campusDots[index]) campusDots[index].classList.add('active');
        if (campusDotsMobile[index]) campusDotsMobile[index].classList.add('active');
        currentIndex = index;
      };

      // Navigate and reset auto-play timer
      const goTo = (index) => {
        showCampusSlide(index);
        clearInterval(campusAutoplay);
        campusAutoplay = setInterval(() => showCampusSlide((currentIndex + 1) % campusSlides.length), 5000);
      };

      // Desktop navigation
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => goTo((currentIndex - 1 + campusSlides.length) % campusSlides.length));
        nextBtn.addEventListener('click', () => goTo((currentIndex + 1) % campusSlides.length));
      }

      // Mobile navigation
      if (prevBtnMobile && nextBtnMobile) {
        prevBtnMobile.addEventListener('click', () => goTo((currentIndex - 1 + campusSlides.length) % campusSlides.length));
        nextBtnMobile.addEventListener('click', () => goTo((currentIndex + 1) % campusSlides.length));
      }

      // Dots (desktop + mobile)
      campusDots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.getAttribute('data-index')))));
      campusDotsMobile.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.getAttribute('data-index')))));

      // Touch swipe support
      let touchStartX = 0;
      const imageEl = document.querySelector('.campus-tour-image-side');
      if (imageEl) {
        imageEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        imageEl.addEventListener('touchend', (e) => {
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? (currentIndex + 1) % campusSlides.length : (currentIndex - 1 + campusSlides.length) % campusSlides.length);
          }
        }, { passive: true });
      }

      // Start auto-play (5s per slide)
      campusAutoplay = setInterval(() => showCampusSlide((currentIndex + 1) % campusSlides.length), 5000);
    }, 100);
    

    
    // Fetch featured reviews
    fetch(`${API_URL}/api/reviews/?limit=3`)
      .then(res => res.json())
      .then(data => {
        const reviews = data.results || data;
        if (Array.isArray(reviews)) setFeaturedReviews(reviews.slice(0, 3));
      })
      .catch(() => {});

    // Fetch blog posts (8s timeout fallback so spinner never hangs indefinitely)
    const blogTimeout = setTimeout(() => setLoadingBlogs(false), 8000);
    fetch(`${API_URL}/api/blog/posts/?limit=5`)
      .then(res => res.json())
      .then(data => {
        clearTimeout(blogTimeout);
        const posts = data.results || data;
        if (Array.isArray(posts)) {
          setBlogPosts(posts.slice(0, 5));
        }
        setLoadingBlogs(false);
      })
      .catch(err => {
        clearTimeout(blogTimeout);
        console.error('Error fetching blog posts:', err);
        setLoadingBlogs(false);
      });
    
    return () => {
      clearTimeout(timer);
      clearTimeout(blogTimeout);
      clearInterval(campusAutoplay);
    };
  }, []);

  const startHeroAutoplay = () => {
    clearInterval(heroIntervalRef.current);
    heroIntervalRef.current = setInterval(() => {
      setCarouselIdx(prev => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setPrevCarouselIdx(prev);
        setTimeout(() => setPrevCarouselIdx(null), 1200);
        return next;
      });
    }, 10000);
  };

  useEffect(() => {
    startHeroAutoplay();
    return () => clearInterval(heroIntervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSlide = (i) => {
    if (i === carouselIdx) return;
    setPrevCarouselIdx(carouselIdx);
    setCarouselIdx(i);
    setTimeout(() => setPrevCarouselIdx(null), 1200);
    startHeroAutoplay();
  };


  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    return text.length > wordLimit ? text.substring(0, wordLimit) + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getMediaUrl = (post) => {
    if (post.image) {
      if (post.image.startsWith('http')) return post.image;
      return `${API_URL}${post.image}`;
    }
    if (post.video) {
      if (post.video.startsWith('http')) return post.video;
      return `${API_URL}${post.video}`;
    }
    if (post.video_url) return post.video_url;
    return '/images/secondary/assembly_overview.JPG';
  };

  const isVideo = (post) => {
    return post.video || post.video_url;
  };



  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* Carousel Background Images */}
        <div className="hero-carousel-bg">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hero-carousel-slide${carouselIdx === i ? ' active' : prevCarouselIdx === i ? ' prev' : ''}`}
              style={{ backgroundImage: `url(${slide.img})`, backgroundPosition: slide.bgPos || 'center center' }}
            />
          ))}
        </div>

        {/* Left-side dark gradient overlay */}
        <div className="hero-left-overlay" />

        {/* Hero Content */}
        <div className="hero-content-wrapper">
          <div className="hero-content-left" key={carouselIdx}>

            <div className="hero-main-text">
              <h1 className="hero-title">{HERO_SLIDES[carouselIdx].title}</h1>
            </div>

            <p className="hero-description">{HERO_SLIDES[carouselIdx].desc}</p>

          </div>
        </div>

        {/* Side nav arrows */}
        <button
          className="hero-arrow hero-arrow-left"
          onClick={() => goToSlide((carouselIdx - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className="hero-arrow hero-arrow-right"
          onClick={() => goToSlide((carouselIdx + 1) % HERO_IMAGES.length)}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right" />
        </button>

        {/* Dots — bottom right */}
        <div className="hero-dots">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${carouselIdx === i ? ' active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </section>



      {/* Academic Excellence Section */}
      <section id="academic-excellence" className="academic-excellence scroll-animate">

        {/* Full-bleed title band — presses against the hero */}
        <div className="prog-title-band">
          <div className="container">
            <h2 className="prog-title-band-heading">Welcome to St. Lawrence Academy</h2>
          </div>
        </div>

        <div className="container">
          <div className="prog-cards-grid">
            <a href="/nursery" className="prog-card">
              <div className="prog-card-img">
                <img src="/images/nursery/nursery_1.JPG" alt="Nursery School" />
              </div>
              <div className="prog-card-body">
                <span className="prog-card-tag">Baby – Top</span>
                <h3>NURSERY SCHOOL</h3>
                <p>Early childhood development nurturing curiosity, creativity, and essential social skills through play-based learning in a safe and loving environment.</p>
                <div className="prog-card-footer">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>

            <a href="/primary" className="prog-card prog-card-featured">
              <div className="prog-card-img">
                <img src="/images/primary/pupils.JPG" alt="Primary School" />
              </div>
              <div className="prog-card-body">
                <span className="prog-card-tag">Primary 1 – 8</span>
                <h3>PRIMARY SCHOOL</h3>
                <p>Building strong foundations in literacy, numeracy, and moral values — developing well-rounded, disciplined learners ready to excel and lead.</p>
                <div className="prog-card-footer">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>

            <a href="/secondary" className="prog-card">
              <div className="prog-card-img">
                <img src="/images/secondary/secondary_students.JPG" alt="Secondary School" />
              </div>
              <div className="prog-card-body">
                <span className="prog-card-tag">S1 – S4</span>
                <h3>SECONDARY SCHOOL</h3>
                <p>Rigorous academics, critical thinking, and leadership development — preparing students for national exams, higher education, and global careers.</p>
                <div className="prog-card-footer">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="prog-banner">
          <div className="prog-banner-content">
            <i className="fas fa-quote-left"></i>
            <p>Across all levels, St. Lawrence Academy is committed to nurturing South Sudanese generations to become <strong>responsible, confident, and globally minded leaders</strong>.</p>
          </div>
        </div>
      </section>

      {/* ── Why Choose SLA ── */}
      <section className="home-why-sla scroll-animate">
        <div className="container">
          <div className="home-why-header">
            <h2>Why Choose St. Lawrence Academy?</h2>
            <p>Empowering the next generation of South Sudanese leaders through excellence, innovation, and character development.</p>
          </div>
          <div className="home-pillars-grid">
            <div className="home-pillar">
              <span className="pillar-num">01</span>
              <h3>Academic Excellence</h3>
              <p>Rigorous curriculum following South Sudan National Standards with proven outstanding results and university preparation.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">02</span>
              <h3>Innovation &amp; Technology</h3>
              <p>Modern teaching methods, digital learning tools, and technology integration preparing students for the future.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">03</span>
              <h3>Safe Environment</h3>
              <p>Secure campus with caring staff where every student feels valued, supported, and empowered to grow confidently.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">04</span>
              <h3>Character Building</h3>
              <p>Strong moral values, leadership development, discipline, and integrity shaping responsible future citizens.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">05</span>
              <h3>Cultural Pride</h3>
              <p>Celebrating South Sudanese heritage while preparing students for global opportunities and international success.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">06</span>
              <h3>Sports &amp; Arts</h3>
              <p>Comprehensive athletics programs, music, drama, and creative arts developing well-rounded talented individuals.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">07</span>
              <h3>Community Service</h3>
              <p>Active engagement in community projects teaching compassion, responsibility, and social awareness to students.</p>
            </div>
            <div className="home-pillar">
              <span className="pillar-num">08</span>
              <h3>Career Guidance</h3>
              <p>Professional counseling, university placement support, and career planning ensuring bright futures for graduates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="home-stats-strip">
        <div className="container">
          <div className="home-stats-grid">
            <div className="home-stat">
              <span className="home-stat-number" data-target="1500">1500+</span>
              <span className="home-stat-label">Students Enrolled</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-number" data-target="100">100+</span>
              <span className="home-stat-label">Support Staff</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-number" data-target="3">3</span>
              <span className="home-stat-label">Academic Levels</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-number" data-target="6">6+</span>
              <span className="home-stat-label">Years of Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Campus Tour - Split Layout ── */}
      <section className="campus-tour-section scroll-animate">
        <div className="campus-tour-header">
          <div className="container">
            <div className="campus-header-content">
              <div className="campus-header-text">
                <span className="campus-header-eyebrow">Virtual Tour</span>
                <h2>Explore Our Campus</h2>
                <p>Take a tour of our facilities and learning spaces</p>
              </div>
            </div>
          </div>
        </div>
        <div className="campus-tour-split">
          <div className="campus-tour-image-side">
            <div className="campus-tour-slide active" style={{backgroundImage: 'url(/images/secondary/students_in_class.JPG)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/primary/primary_campus_1.jpg)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/football_interclasses.JPG)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/assembly.JPG)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/library.jpg)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/st_chapel.JPG)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/night_reading.jpg)'}}></div>
            <div className="campus-tour-slide" style={{backgroundImage: 'url(/images/secondary/campus_view_from_above_assembly.JPG)'}}></div>
          </div>
          <div className="campus-navigation-mobile">
            <button className="campus-nav-btn campus-prev-mobile" aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
            <div className="campus-nav-dots-mobile">
              <button className="campus-nav-dot-mobile active" data-index="0"></button>
              <button className="campus-nav-dot-mobile" data-index="1"></button>
              <button className="campus-nav-dot-mobile" data-index="2"></button>
              <button className="campus-nav-dot-mobile" data-index="3"></button>
              <button className="campus-nav-dot-mobile" data-index="4"></button>
              <button className="campus-nav-dot-mobile" data-index="5"></button>
              <button className="campus-nav-dot-mobile" data-index="6"></button>
              <button className="campus-nav-dot-mobile" data-index="7"></button>
            </div>
            <button className="campus-nav-btn campus-next-mobile" aria-label="Next"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="campus-tour-content-side">
            <div className="campus-content-item active">
              <span className="campus-badge">Learning Spaces</span>
              <h3>Modern Classrooms</h3>
              <p>Our classrooms are designed for focused, interactive learning — well-lit, well-ventilated spaces where every student has room to think, ask questions, and grow.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Teaching aids and projectors</li>
                <li><i className="fas fa-check-circle"></i>Comfortable seating for 30+ students</li>
                <li><i className="fas fa-check-circle"></i>Natural lighting and ventilation</li>
                <li><i className="fas fa-check-circle"></i>Separate nursery, primary & secondary blocks</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Our Campus</span>
              <h3>School Compound</h3>
              <p>Set in Hai Referendum, Juba, our campus is a secure, welcoming environment with well-maintained grounds shared by nursery, primary, and secondary students.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>24/7 security and supervision</li>
                <li><i className="fas fa-check-circle"></i>Spacious outdoor and play areas</li>
                <li><i className="fas fa-check-circle"></i>Separate zones for each school level</li>
                <li><i className="fas fa-check-circle"></i>Ongoing campus development</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Athletics</span>
              <h3>Sports Facilities</h3>
              <p>From basketball and volleyball to football and athletics, our sports facilities support physical development, teamwork, and competitive achievement at every level.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Full-size basketball court</li>
                <li><i className="fas fa-check-circle"></i>Football and volleyball grounds</li>
                <li><i className="fas fa-check-circle"></i>Inter-class and inter-school competitions</li>
                <li><i className="fas fa-check-circle"></i>Dedicated PE programme</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Community</span>
              <h3>Assembly Ground</h3>
              <p>Our assembly ground is the heart of daily school life — where students gather each morning to begin the day with purpose, discipline, and a sense of shared community.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Capacity for 1,500+ students</li>
                <li><i className="fas fa-check-circle"></i>Daily morning assembly</li>
                <li><i className="fas fa-check-circle"></i>Cultural events and celebrations</li>
                <li><i className="fas fa-check-circle"></i>Prize-giving and special occasions</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Knowledge</span>
              <h3>School Library</h3>
              <p>Our library provides a quiet, resourced space for reading, research, and independent study — stocked with textbooks, reference materials, and reading books for all levels.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Books for nursery through secondary</li>
                <li><i className="fas fa-check-circle"></i>Dedicated reading and study sections</li>
                <li><i className="fas fa-check-circle"></i>Open daily before and after school</li>
                <li><i className="fas fa-check-circle"></i>Supported by trained library staff</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Faith</span>
              <h3>School Chapel</h3>
              <p>The chapel is a place of reflection, prayer, and spiritual development — central to our values as a school that nurtures the whole child, including their faith and character.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Regular worship and prayer sessions</li>
                <li><i className="fas fa-check-circle"></i>Christian Religious Education support</li>
                <li><i className="fas fa-check-circle"></i>Open to all students and staff</li>
                <li><i className="fas fa-check-circle"></i>Scripture Union and faith clubs</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Campus Life</span>
              <h3>Evening & Boarding</h3>
              <p>Our boarding facility offers a structured, supportive environment for students who stay on campus — with supervised study, meals, and evening activities in a safe setting.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Supervised evening study</li>
                <li><i className="fas fa-check-circle"></i>Three meals provided daily</li>
                <li><i className="fas fa-check-circle"></i>Resident house parents</li>
                <li><i className="fas fa-check-circle"></i>Safe and secure boarding block</li>
              </ul>
            </div>
            <div className="campus-content-item">
              <span className="campus-badge">Overview</span>
              <h3>Campus from Above</h3>
              <p>Seen from above, the full scale of St. Lawrence Academy becomes clear — a growing campus with dedicated spaces for every aspect of student life, learning, and development.</p>
              <ul className="campus-features">
                <li><i className="fas fa-check-circle"></i>Nursery, primary & secondary buildings</li>
                <li><i className="fas fa-check-circle"></i>Sports grounds and open spaces</li>
                <li><i className="fas fa-check-circle"></i>Library, chapel and admin block</li>
                <li><i className="fas fa-check-circle"></i>Expanding to serve more students</li>
              </ul>
            </div>
            <div className="campus-navigation-desktop">
              <button className="campus-nav-btn campus-prev" aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
              <div className="campus-nav-dots">
                <button className="campus-nav-dot active" data-index="0"></button>
                <button className="campus-nav-dot" data-index="1"></button>
                <button className="campus-nav-dot" data-index="2"></button>
                <button className="campus-nav-dot" data-index="3"></button>
                <button className="campus-nav-dot" data-index="4"></button>
                <button className="campus-nav-dot" data-index="5"></button>
                <button className="campus-nav-dot" data-index="6"></button>
                <button className="campus-nav-dot" data-index="7"></button>
              </div>
              <button className="campus-nav-btn campus-next" aria-label="Next"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Life Section ── */}
      <section className="student-life-section scroll-animate">
        <div className="student-life-header">
          <div className="container">
            <div className="student-life-header-inner">
              <div className="student-life-header-text">
                <p className="student-life-eyebrow">BEYOND THE CLASSROOM</p>
                <h2>Student Life at SLA</h2>
              </div>
              <p className="student-life-header-desc">Discover the vibrant community and enriching experiences that make St. Lawrence Academy special</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="life-highlights-grid">
            <a href="/student-life/sports" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/basketball_game.JPG" alt="Sports & Athletics" />
              </div>
              <div className="life-highlight-content">
                <h3>Sports &amp; Athletics</h3>
                <p>Competitive sports programs including basketball, football, volleyball, and athletics developing teamwork and physical fitness.</p>
              </div>
            </a>
            <a href="/student-life/leadership" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/assembly.JPG" alt="Leadership Development" />
              </div>
              <div className="life-highlight-content">
                <h3>Leadership Development</h3>
                <p>Student council, prefect system, and leadership training programs building confident future leaders.</p>
              </div>
            </a>
            <a href="/student-life/arts" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/sla_cultural_dance.jpg" alt="Cultural Activities" />
              </div>
              <div className="life-highlight-content">
                <h3>Cultural Activities</h3>
                <p>Music, drama, dance, and cultural celebrations fostering creativity and appreciation for diverse traditions.</p>
              </div>
            </a>
            <a href="/student-life/clubs" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/mathematics_club.jpg" alt="Academic Clubs" />
              </div>
              <div className="life-highlight-content">
                <h3>Academic Clubs</h3>
                <p>Debate club, science club, math club, and more fostering intellectual curiosity and academic excellence.</p>
              </div>
            </a>
            <a href="/student-life/community-service" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/community_service.jpg" alt="Community Service" />
              </div>
              <div className="life-highlight-content">
                <h3>Community Service</h3>
                <p>Volunteer programs and outreach initiatives teaching compassion, responsibility, and social awareness.</p>
              </div>
            </a>
            <a href="/student-life/counseling" className="life-highlight-card">
              <div className="life-highlight-image">
                <img src="/images/secondary/secondary_students.JPG" alt="Career Preparation" />
              </div>
              <div className="life-highlight-content">
                <h3>Career Preparation</h3>
                <p>Career guidance, mentorship programs, and university preparation supporting students' future success.</p>
              </div>
            </a>
          </div>
          <div className="life-cta">
            <a href="/student-life/events" className="life-cta-link">
              Explore Student Life
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── Admissions Process ── */}
      <section className="home-admissions-process scroll-animate">
        <div className="container">

          <div className="home-admissions-header">
            <span className="admissions-eyebrow">Admissions</span>
            <h2>How to Apply</h2>
            <p>Simple steps to join the St. Lawrence Academy family</p>
          </div>

          <div className="home-admissions-steps">

            <div className="admissions-step">
              <span className="step-num">01</span>
              <div className="step-divider"></div>
              <div className="step-content">
                <h3>Visit &amp; Inquire</h3>
                <p>Schedule a campus tour, meet our staff, and learn about our programmes and admission requirements.</p>
              </div>
            </div>

            <div className="admissions-step">
              <span className="step-num">02</span>
              <div className="step-divider"></div>
              <div className="step-content">
                <h3>Complete Application</h3>
                <p>Fill out the application form with student information, academic history, and parent/guardian details.</p>
              </div>
            </div>

            <div className="admissions-step">
              <span className="step-num">03</span>
              <div className="step-divider"></div>
              <div className="step-content">
                <h3>Assessment &amp; Interview</h3>
                <p>Student takes a placement test and attends an interview to determine the appropriate grade level.</p>
              </div>
            </div>

            <div className="admissions-step">
              <span className="step-num">04</span>
              <div className="step-divider"></div>
              <div className="step-content">
                <h3>Enrol &amp; Join</h3>
                <p>Receive your acceptance letter, submit required documents, pay fees, and complete registration.</p>
              </div>
            </div>

          </div>

          <div className="admissions-cta">
            <a href="/admissions/apply" className="admissions-cta-btn">
              Start Your Application
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>

        </div>
      </section>

      {/* ── Latest News & Events ── */}
      <section className="news-events scroll-animate">
        <div className="container">
          <div className="news-section-header">
            <div className="news-header-content">
              <span className="news-section-badge">Latest Updates</span>
              <h2>News & Events</h2>
              <p>Stay informed about the latest happenings at St. Lawrence Academy</p>
            </div>
            <a href="/blog" className="news-header-link">
              View All News
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          
          {loadingBlogs ? (
            <div style={{textAlign: 'center', padding: '4rem 0'}}>
              <i className="fas fa-spinner fa-spin" style={{fontSize: '3rem', color: 'var(--primary-red)'}}></i>
              <p style={{marginTop: '1rem', color: 'var(--medium-gray)'}}>Loading news...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="news-main-layout">
              <a href={`/blog/${blogPosts[0].id}/${blogPosts[0].title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="news-featured-main">
                <div className="news-featured-image-large">
                  {isVideo(blogPosts[0]) ? (
                    blogPosts[0].video_url ? (
                      <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <iframe 
                          src={blogPosts[0].video_url.includes('youtube.com') || blogPosts[0].video_url.includes('youtu.be') 
                            ? blogPosts[0].video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]
                            : blogPosts[0].video_url
                          } 
                          style={{width: '100%', height: '100%', border: 'none'}}
                          title={blogPosts[0].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    ) : (
                      <video src={getMediaUrl(blogPosts[0])} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    )
                  ) : (
                    <img src={getMediaUrl(blogPosts[0])} alt={blogPosts[0].title} />
                  )}
                  {blogPosts[0].is_featured && <span className="news-featured-badge">Featured</span>}
                </div>
                <div className="news-featured-content-large">
                  <div className="news-featured-meta">
                    <span><i className="far fa-calendar"></i> {formatDate(blogPosts[0].created_at)}</span>
                    <span><i className="far fa-user"></i> {blogPosts[0].author || 'SLA Communications'}</span>
                  </div>
                  <h3>{blogPosts[0].title}</h3>
                  <p>{truncateText(blogPosts[0].excerpt || blogPosts[0].content, 200)}</p>
                  <div className="news-featured-author">
                    <div className="news-featured-avatar"></div>
                    <span>{blogPosts[0].author || 'SLA Communications'}</span>
                  </div>
                </div>
              </a>
              
              <div className="news-side-cards">
                {blogPosts.slice(1, 6).map((post) => (
                  <a key={post.id} href={`/blog/${post.id}/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="news-side-card">
                    <div className="news-side-image">
                      {isVideo(post) ? (
                        post.video_url ? (
                          <div style={{position: 'relative', width: '100%', height: '100%'}}>
                            <iframe 
                              src={post.video_url.includes('youtube.com') || post.video_url.includes('youtu.be') 
                                ? post.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0]
                                : post.video_url
                              } 
                              style={{width: '100%', height: '100%', border: 'none'}}
                              title={post.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          </div>
                        ) : (
                          <video src={getMediaUrl(post)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        )
                      ) : (
                        <img src={getMediaUrl(post)} alt={post.title} />
                      )}
                    </div>
                    <div className="news-side-content">
                      <span className="news-side-date">{formatDate(post.created_at)}</span>
                      <h4>{truncateText(post.title, 60)}</h4>
                      <p>{truncateText(post.excerpt || post.content, 100)}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '4rem 0'}}>
              <i className="fas fa-newspaper" style={{fontSize: '3rem', color: 'var(--medium-gray)', opacity: 0.5}}></i>
              <p style={{marginTop: '1rem', color: 'var(--medium-gray)'}}>No news available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Reviews Teaser ── */}
      {featuredReviews.length > 0 && (
        <section className="home-reviews-teaser scroll-animate">
          <div className="container">
            <div className="home-reviews-header">
              <span className="home-reviews-eyebrow">Community Voices</span>
              <h2>What Our Families Say</h2>
              <p>Honest experiences from parents, students, and alumni</p>
            </div>
            <div className="home-reviews-grid">
              {featuredReviews.map(r => (
                <HomeReviewCard key={r.id} r={r} />
              ))}
            </div>
            <div className="home-reviews-cta">
              <a href="/reviews" className="home-reviews-link">
                Read All Reviews <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Quick Facts ── */}
      <section className="home-quick-facts scroll-animate">
        <div className="container">
          <div className="quick-facts-inner">
            <div className="quick-facts-header">
              <span className="quick-facts-eyebrow">At a Glance</span>
              <h2>School at a Glance</h2>
              <p>Essential information about St. Lawrence Academy</p>
            </div>
            <div className="quick-facts-body">
              <div className="quick-facts-col">
                <div className="qf-row">
                  <span className="qf-label">Founded</span>
                  <span className="qf-value">2020</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">Location</span>
                  <span className="qf-value">Juba, South Sudan</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">Curriculum</span>
                  <span className="qf-value">South Sudan National</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">Language</span>
                  <span className="qf-value">English</span>
                </div>
              </div>
              <div className="quick-facts-col">
                <div className="qf-row">
                  <span className="qf-label">Class Size</span>
                  <span className="qf-value">Avg. 30 Students</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">School Hours</span>
                  <span className="qf-value">7:00 AM – 5:00 PM</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">Facilities</span>
                  <span className="qf-value">Library, Labs, Sports Fields</span>
                </div>
                <div className="qf-row">
                  <span className="qf-label">Transportation</span>
                  <span className="qf-value">School Bus Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="home-cta-band">
        <div className="home-cta-band-bg"></div>
        <div className="container">
          <div className="home-cta-band-inner">
            <div className="home-cta-band-text">
              <span className="home-cta-band-eyebrow">Join Our Community</span>
              <h2>Begin Your Journey at St. Lawrence Academy</h2>
              <p>Give your child the foundation they deserve — quality education, strong values, and a community that cares.</p>
            </div>
            <div className="home-cta-band-actions">
              <a href="/admissions/apply" className="home-cta-band-btn home-cta-band-btn--primary">
                Apply Now <i className="fas fa-arrow-right"></i>
              </a>
              <a href="/admissions/visit" className="home-cta-band-btn home-cta-band-btn--ghost">
                Schedule a Visit
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
