import React, { useState } from 'react';
import './About.css';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your donation!');
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-video">
          <video autoPlay muted loop playsInline>
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <div className="about-hero-badge">
            <i className="fas fa-hand-holding-heart"></i>
            Support Us
          </div>
          <h1>Support St. Lawrence Academy</h1>
          <p>Your generosity helps us provide quality education and transform lives in South Sudan.</p>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="section" style={{padding: '100px 0'}}>
        <div className="container">
          <div className="support-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start'}}>
            {/* Left: Why Support Content */}
            <div>
              <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Why Support Us?</h2>
              <p style={{fontSize: '1.1rem', color: 'var(--medium-gray)', marginBottom: '2rem', lineHeight: '1.8'}}>
                Your support makes a lasting difference in the lives of our students and the future of South Sudan.
              </p>
              <p style={{fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--medium-gray)', marginBottom: '1.5rem', textAlign: 'justify'}}>
                St. Lawrence Academy is dedicated to providing exceptional education to the children of South Sudan. Since our founding in 2020, we have been committed to transforming lives through quality education, character development, and holistic student support. Our mission goes beyond academic excellence – we strive to nurture future leaders who will drive positive change in their communities and nation. However, achieving this vision requires resources, infrastructure, and continuous investment in our facilities, teachers, and programs.
              </p>
              <p style={{fontSize: '1.05rem', lineHeight: '1.9', color: 'var(--medium-gray)', textAlign: 'justify'}}>
                Your generous support enables us to maintain high educational standards, provide scholarships to deserving students from disadvantaged backgrounds, upgrade our facilities with modern equipment, offer professional development for our teachers, and expand our extracurricular programs. Every contribution, regardless of size, makes a meaningful impact on our students' lives and helps us continue our mission of educational excellence. By supporting St. Lawrence Academy, you become a partner in building a brighter future for South Sudan through education.
              </p>
            </div>

            {/* Right: Bank & Mobile Money Details */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              {/* Bank Transfer */}
              <div style={{background: 'var(--card-background)', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2px solid var(--primary-red)'}}>
                <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                  <i className="fas fa-university" style={{fontSize: '2.5rem', color: 'var(--primary-red)'}}></i>
                </div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.2rem', textAlign: 'center'}}>Bank Transfer</h3>
                <div style={{fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  <p style={{marginBottom: '0.6rem'}}><strong>Bank Name:</strong> National Bank of South Sudan</p>
                  <p style={{marginBottom: '0.6rem'}}><strong>Account Name:</strong> St. Lawrence Academy</p>
                  <p style={{marginBottom: '0.6rem'}}><strong>Account Number:</strong> 1234567890</p>
                  <p style={{marginBottom: '0'}}><strong>Swift Code:</strong> NBSSSSJ1</p>
                </div>
              </div>

              {/* Mobile Money */}
              <div style={{background: 'var(--card-background)', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2px solid var(--primary-red)'}}>
                <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                  <i className="fas fa-mobile-alt" style={{fontSize: '2.5rem', color: 'var(--primary-red)'}}></i>
                </div>
                <h3 style={{color: 'var(--primary-red)', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.2rem', textAlign: 'center'}}>Mobile Money</h3>
                <div style={{fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--medium-gray)'}}>
                  <p style={{marginBottom: '0.6rem'}}><strong>MTN Mobile Money:</strong></p>
                  <p style={{marginBottom: '1.2rem'}}>+211 123 456 789</p>
                  <p style={{marginBottom: '0.6rem'}}><strong>Zain Mobile Money:</strong></p>
                  <p style={{marginBottom: '0'}}>+211 987 654 321</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Donation Section */}
      <section className="section" style={{padding: '100px 0', background: 'var(--light-gray)'}}>
        <div className="container">
          <div className="donation-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
            {/* Left: Image */}
            <div>
              <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800" alt="Support Education" style={{width: '100%', height: '500px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}} />
            </div>

            {/* Right: Donation Form */}
            <div style={{background: 'var(--card-background)', padding: '3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2px solid var(--primary-red)'}}>
              <h3 style={{color: 'var(--primary-red)', fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center'}}>Donate by Card</h3>
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                  />
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                  />
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Donation Amount (USD)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="1"
                    style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                  />
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                  />
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--medium-gray)', fontWeight: '600'}}>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      maxLength="3"
                      style={{width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem'}}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{width: '100%', padding: '1rem', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', transition: 'background 0.3s'}}
                >
                  Donate Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Section */}
      <section style={{background: 'var(--primary-red)', padding: '0.8rem 0', overflow: 'hidden'}}>
        <div className="ticker-scroll" style={{display: 'flex', whiteSpace: 'nowrap', animation: 'scroll 25s linear infinite'}}>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
          <span style={{fontSize: '1.1rem', fontWeight: '500', color: 'white', paddingRight: '50px'}}>Thank you for your generous support • </span>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Support;
