import { useEffect } from 'react';
import './Nursery.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Nursery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Nursery School', 'St. Lawrence Academy Nursery School — a warm, safe, and nurturing environment where children take their first steps in learning.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  return (
    <div className="nursery-page">

      {/* ── Hero ── */}
      <section className="nursery-hero">
        <div className="nursery-hero-bg">
          <img src="/images/nursery/nursery_with_staff.JPG" alt="St. Lawrence Academy Nursery School" />
        </div>
        <div className="nursery-hero-overlay"></div>
        <div className="nursery-hero-content">
          <div className="container">
            <div className="nursery-hero-inner">
              <span className="nursery-hero-label">St. Lawrence Academy</span>
              <h1 className="nursery-hero-title">Nursery <span>School</span></h1>
              <p className="nursery-hero-sub">
                A warm, safe, and nurturing space where children take their
                very first steps into learning — building confidence, curiosity,
                and a lifelong love of school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="nursery-mobile-band">
        <div className="container">
          <h2 className="nursery-mobile-band-heading">Nursery School</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="nursery-intro">
        <div className="container">
          <div className="nursery-intro-inner">
            <span className="nursery-eyebrow">Welcome</span>
            <h2 className="nursery-intro-heading">Where Every Child's Journey Begins</h2>
            <p className="nursery-intro-text">
              Our nursery school is built on one belief — that the earliest years of a
              child's life are the most formative, and every child deserves the best
              possible start. At St. Lawrence Academy, we provide a structured yet
              joyful learning environment where children are encouraged to explore,
              create, and grow at their own pace.
            </p>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="nursery-about">
        <div className="container">
          <div className="nursery-about-inner reveal">
            <div className="nursery-about-img">
              <img src="/images/nursery/nursery_kids.JPG" alt="Nursery children at St. Lawrence Academy" />
            </div>
            <div className="nursery-about-text">
              <span className="nursery-eyebrow">Our Approach</span>
              <h2 className="nursery-about-heading">Guided Through Play, Prepared for Life</h2>
              <p>
                We do not rush children. We guide them — through play, through stories,
                through song, through gentle daily routines — so that by the time they
                step into Primary One, they are confident, curious, and ready to learn.
              </p>
              <p>
                Our nursery teachers are trained in early childhood education and
                understand that every child develops at their own pace. Small class sizes
                ensure every child receives the individual attention and care they need
                to truly thrive.
              </p>
              <div className="nursery-about-tags">
                <span>Baby Class</span>
                <span>Middle Class</span>
                <span>Top Class</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Classes ── */}
      <section className="nursery-classes" id="classes">
        <div className="container">
          <div className="nursery-classes-header">
            <span className="nursery-eyebrow">Our Classes</span>
            <h2 className="nursery-classes-heading">Three Classes, One Foundation</h2>
            <p className="nursery-classes-sub">
              Children progress through three nursery classes — Baby, Middle, and Top —
              each building directly on the last, preparing them fully for Primary One.
            </p>
          </div>
          <div className="nursery-classes-grid">

            <div className="nursery-class-card reveal">
              <div className="nursery-class-num">01</div>
              <h3>Baby Class</h3>
              <p>A gentle, nurturing introduction to school life — building confidence, basic communication, and a love of learning through play and guided exploration.</p>
              <ul className="nursery-class-list">
                <li><i className="fas fa-check"></i><span>Learning to follow simple routines</span></li>
                <li><i className="fas fa-check"></i><span>Introductory songs and rhymes</span></li>
                <li><i className="fas fa-check"></i><span>Sensory and creative play</span></li>
                <li><i className="fas fa-check"></i><span>Basic self-care and independence</span></li>
              </ul>
            </div>

            <div className="nursery-class-card reveal">
              <div className="nursery-class-num">02</div>
              <h3>Middle Class</h3>
              <p>Children grow in independence and begin more structured learning. Language deepens, early number concepts are introduced, and social bonds strengthen.</p>
              <ul className="nursery-class-list">
                <li><i className="fas fa-check"></i><span>Early phonics and letter recognition</span></li>
                <li><i className="fas fa-check"></i><span>Number concepts and counting</span></li>
                <li><i className="fas fa-check"></i><span>Group play and cooperation</span></li>
                <li><i className="fas fa-check"></i><span>Creative arts and expression</span></li>
              </ul>
            </div>

            <div className="nursery-class-card reveal">
              <div className="nursery-class-num">03</div>
              <h3>Top Class</h3>
              <p>Top class prepares children for Primary One. Learning becomes more structured — focusing on reading readiness, early writing, and mathematical thinking.</p>
              <ul className="nursery-class-list">
                <li><i className="fas fa-check"></i><span>Reading readiness and early phonics</span></li>
                <li><i className="fas fa-check"></i><span>Pre-writing skills and fine motor control</span></li>
                <li><i className="fas fa-check"></i><span>Early mathematics and problem solving</span></li>
                <li><i className="fas fa-check"></i><span>Transition preparation for Primary 1</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Developmental Domains ── */}
      <section className="nursery-domains" id="learning">
        <div className="container">
          <div className="nursery-domains-header">
            <span className="nursery-eyebrow">What Children Learn</span>
            <h2 className="nursery-domains-heading">Eight Developmental Domains</h2>
            <p className="nursery-domains-sub">
              Rather than formal subjects, our nursery curriculum is structured around
              eight key areas of child development — each as important as the next.
            </p>
          </div>
          <div className="nursery-domains-grid">

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">01</div>
              <h3>Language &amp; Communication</h3>
              <p>Speaking, listening, and early conversation skills — the foundation of all academic learning.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">02</div>
              <h3>Early Literacy</h3>
              <p>Letters, sounds, phonics awareness, and a love of books built through stories and guided reading.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">03</div>
              <h3>Early Numeracy</h3>
              <p>Numbers, counting, shapes, patterns, and early mathematical thinking through play.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">04</div>
              <h3>Creative Arts &amp; Music</h3>
              <p>Drawing, painting, craft, singing, and movement that nurture imagination and self-expression.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">05</div>
              <h3>Physical Development</h3>
              <p>Gross and fine motor skills built through structured play, outdoor activities, and physical exercises.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">06</div>
              <h3>Social &amp; Emotional Growth</h3>
              <p>Confidence, empathy, cooperation, and emotional wellbeing developed in a safe and caring environment.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">07</div>
              <h3>Environmental Awareness</h3>
              <p>Exploring nature, community, weather, and the world — building curiosity and early scientific thinking.</p>
            </div>

            <div className="nursery-domain-card reveal">
              <div className="nursery-domain-num">08</div>
              <h3>Values &amp; Moral Development</h3>
              <p>Stories and activities that instil honesty, kindness, respect, and care for others.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── A Day at Nursery ── */}
      <section className="nursery-day">
        <div className="container">
          <div className="nursery-day-inner reveal">
            <div className="nursery-day-img">
              <img src="/images/nursery/nursery_1.JPG" alt="Children during a typical nursery day" />
            </div>
            <div className="nursery-day-text">
              <span className="nursery-eyebrow">Daily Life</span>
              <h2 className="nursery-day-heading">A Typical Day at Nursery</h2>
              <p>
                Every nursery day at SLA follows a warm, predictable routine that gives
                children a sense of security. Routines are flexible enough to follow
                the children's energy and interests while ensuring all learning goals
                are met.
              </p>
              <div className="nursery-schedule">
                <div className="nursery-schedule-row">
                  <div className="nursery-schedule-time">Morning</div>
                  <div className="nursery-schedule-desc">Arrival, free play, and morning circle — greetings, songs, and the day's theme introduction.</div>
                </div>
                <div className="nursery-schedule-row">
                  <div className="nursery-schedule-time">Mid-Morning</div>
                  <div className="nursery-schedule-desc">Guided learning activities — literacy, numeracy, and creative arts sessions in small groups.</div>
                </div>
                <div className="nursery-schedule-row">
                  <div className="nursery-schedule-time">Break</div>
                  <div className="nursery-schedule-desc">Snack time and outdoor play — physical development, fresh air, and free social interaction.</div>
                </div>
                <div className="nursery-schedule-row">
                  <div className="nursery-schedule-time">Late Morning</div>
                  <div className="nursery-schedule-desc">Story time, music, or a special activity — followed by reflection and tidy-up routines.</div>
                </div>
                <div className="nursery-schedule-row">
                  <div className="nursery-schedule-time">Afternoon</div>
                  <div className="nursery-schedule-desc">Rest period, independent play, and afternoon activities before dismissal.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="nursery-why">
        <div className="container">
          <div className="nursery-why-header">
            <span className="nursery-eyebrow">Why SLA Nursery</span>
            <h2 className="nursery-why-heading">Why Parents Choose Us</h2>
            <p className="nursery-why-intro">
              We offer more than just childcare. SLA Nursery is a structured,
              caring, and stimulating environment where children are known by name,
              supported individually, and loved as a community.
            </p>
          </div>
          <div className="nursery-why-list">

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">01</div>
              <div className="nursery-why-body">
                <h3>Low Pupil-Teacher Ratio</h3>
                <p>Small class sizes ensure every child receives individual attention and care from their teacher every single day.</p>
              </div>
            </div>

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">02</div>
              <div className="nursery-why-body">
                <h3>Safe &amp; Secure Environment</h3>
                <p>A fully supervised, child-safe space where children can explore and thrive without distraction or risk.</p>
              </div>
            </div>

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">03</div>
              <div className="nursery-why-body">
                <h3>Child-Led Learning</h3>
                <p>Activities are designed around how young children learn best — through play, curiosity, and guided discovery.</p>
              </div>
            </div>

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">04</div>
              <div className="nursery-why-body">
                <h3>Qualified Teachers</h3>
                <p>Our nursery teachers are trained in early childhood education and deeply committed to every child in their care.</p>
              </div>
            </div>

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">05</div>
              <div className="nursery-why-body">
                <h3>Structured Routines</h3>
                <p>Daily routines give children a sense of security and predictability, helping them settle, focus, and feel at home.</p>
              </div>
            </div>

            <div className="nursery-why-item reveal">
              <div className="nursery-why-num">06</div>
              <div className="nursery-why-body">
                <h3>Regular Parent Updates</h3>
                <p>We keep parents informed and involved — through written reports, parent meetings, and open, honest communication.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="nursery-gallery">
        <div className="container">
          <div className="nursery-gallery-header">
            <span className="nursery-eyebrow">Life at Our Nursery</span>
            <h2 className="nursery-gallery-heading">A Glimpse Inside</h2>
            <p className="nursery-gallery-sub">A look at the warmth, energy, and joy of everyday life in our nursery.</p>
          </div>
          <div className="nursery-gallery-row">
            <div className="nursery-gallery-cell">
              <img src="/images/nursery/kids_in_class.jpg" alt="Nursery learning activity" />
            </div>
            <div className="nursery-gallery-cell">
              <img src="/images/nursery/nursery_group_pic_1.JPG" alt="Nursery play session" />
            </div>
            <div className="nursery-gallery-cell">
              <img src="/images/nursery/nursery_with_staff.JPG" alt="Nursery classroom" />
            </div>
            <div className="nursery-gallery-cell">
              <img src="/images/nursery/nursery_gate.jpg" alt="Nursery gate" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="nursery-closing">
        <div className="container">
          <div className="nursery-closing-inner">
            <span className="nursery-eyebrow">Get Started</span>
            <h2 className="nursery-closing-heading">Give Your Child the Best Possible Start</h2>
            <p>
              Enrolment for our nursery classes is open. We welcome families to visit
              the school, meet our teachers, and see the nursery environment for
              themselves before making their decision.
            </p>
            <div className="nursery-closing-btns">
              <a href="/admissions/apply" className="nursery-closing-btn nursery-closing-btn--primary">
                <i className="fas fa-pen-alt"></i> Apply Now
              </a>
              <a href="/contact" className="nursery-closing-btn nursery-closing-btn--outline">
                <i className="fas fa-envelope"></i> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nursery;
