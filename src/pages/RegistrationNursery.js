import React, { useState, useEffect } from 'react';
import './Registration.css';

const RegistrationNursery = () => {
  const [formData, setFormData] = useState({
    term: '', year: '', student_name: '', date_of_birth: '', gender: '', class_level: '',
    parent_name: '', relationship: '', phone: '', email: '', address: '',
    emergency_contact_name: '', emergency_contact_phone: '',
    medical_conditions: '', previous_school: '',
    birth_certificate: null, previous_report: null, recommendation_letter: null, payment_receipt: null,
    agreeTerms: false
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    fetch('https://sla.pythonanywhere.com/api/admissions/registration-status/')
      .then(res => res.json())
      .then(data => {
        const status = data.results ? data.results[0] : (Array.isArray(data) ? data[0] : data);
        if (status) {
          setRegistrationStatus(status);
          setIsClosed(!status.is_open || status.is_deadline_passed);
          setFormData(prev => ({ ...prev, term: status.term, year: status.year }));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!formData.agreeTerms) {
      setMessage({ type: 'error', text: 'Please agree to terms and conditions' });
      return;
    }

    setSubmitting(true);
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'agreeTerms' && formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('https://sla.pythonanywhere.com/api/admissions/nursery/', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration submitted successfully! Your application will be reviewed and you will be updated as soon as possible. This process may take 1-2 weeks.' });
        setFormData({
          term: registrationStatus.term, year: registrationStatus.year,
          student_name: '', date_of_birth: '', gender: '', class_level: '',
          parent_name: '', relationship: '', phone: '', email: '', address: '',
          emergency_contact_name: '', emergency_contact_phone: '',
          medical_conditions: '', previous_school: '',
          birth_certificate: null, previous_report: null, recommendation_letter: null, payment_receipt: null,
          agreeTerms: false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="registration-page">
      <section className="registration-hero">
        <div className="registration-hero-video">
          <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1920&q=80" alt="Nursery school children" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="registration-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="registration-hero-content">
          <div className="registration-hero-badge">
            <i className="fas fa-child"></i>
            Nursery School
          </div>
          <h1>Online Registration</h1>
          <p>Baby, Middle & Top Class - Register your child for quality early childhood education</p>
        </div>
      </section>

      <div className="container" style={{padding: '80px 0'}}>
        {loading ? (
          <div style={{textAlign: 'center', padding: '4rem'}}>
            <p style={{fontSize: '1.2rem'}}>Loading...</p>
          </div>
        ) : isClosed ? (
          <div style={{textAlign: 'center', padding: '4rem', background: '#f8d7da', borderRadius: '8px'}}>
            <i className="fas fa-times-circle" style={{fontSize: '3rem', color: '#721c24', marginBottom: '1rem'}}></i>
            <h2 style={{color: '#721c24', marginBottom: '1rem'}}>Registration Closed</h2>
            <p style={{fontSize: '1.2rem', color: '#721c24'}}>Applications for {registrationStatus?.term}, {registrationStatus?.year} are now closed. Please check back when registration opens for the next term.</p>
          </div>
        ) : (
          <>
            {message.text && (
              <div style={{padding: '1rem', marginBottom: '2rem', background: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24', borderRadius: '5px', border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`}}>
                <strong>{message.type === 'success' ? 'Success!' : 'Error!'}</strong> {message.text}
              </div>
            )}

            <div className="registration-info-box">
              <h3><i className="fas fa-info-circle"></i> Important Information</h3>
              <ul>
                <li><strong>Registering for:</strong> {registrationStatus?.term}, {registrationStatus?.year}</li>
                <li><strong>Registration Fee:</strong> 5,000 SSP</li>
                <li><strong>Payment Methods:</strong>
                  <ul>
                    <li>Mobile Money: 0927 222 017 (St. Lawrence Academy)</li>
                    <li>Bank: Equity Bank - Account: 1234567890 (St. Lawrence Academy)</li>
                  </ul>
                </li>
                <li>All fields marked with (*) are required</li>
                <li>You will receive confirmation within 48 hours</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <h3>Parent/Guardian Information</h3>
              <div className="form-grid">
                <input type="text" name="parent_name" placeholder="Full Name *" value={formData.parent_name} onChange={handleChange} required />
                <input type="text" name="relationship" placeholder="Relationship to Child *" value={formData.relationship} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Residential Address *" value={formData.address} onChange={handleChange} required style={{gridColumn: '1 / -1'}} />
              </div>

              <h3><i className="fas fa-child"></i> Student Information</h3>
              <div className="form-grid">
                <input type="text" name="student_name" placeholder="Child's Full Name *" value={formData.student_name} onChange={handleChange} required />
                <input type="date" name="date_of_birth" placeholder="Date of Birth *" value={formData.date_of_birth} onChange={handleChange} required max={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]} />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select name="class_level" value={formData.class_level} onChange={handleChange} required>
                  <option value="">Select Class *</option>
                  <option value="baby">Baby Class</option>
                  <option value="middle">Middle Class</option>
                  <option value="top">Top Class</option>
                </select>
              </div>

              <h3><i className="fas fa-phone-alt"></i> Emergency Contact</h3>
              <div className="form-grid">
                <input type="text" name="emergency_contact_name" placeholder="Emergency Contact Name *" value={formData.emergency_contact_name} onChange={handleChange} required />
                <input type="tel" name="emergency_contact_phone" placeholder="Emergency Contact Phone *" value={formData.emergency_contact_phone} onChange={handleChange} required />
              </div>

              <h3><i className="fas fa-notes-medical"></i> Additional Information</h3>
              <div className="form-grid">
                <input type="text" name="previous_school" placeholder="Previous School (if any)" value={formData.previous_school} onChange={handleChange} style={{gridColumn: '1 / -1'}} />
                <textarea name="medical_conditions" placeholder="Medical Conditions or Allergies (if any)" value={formData.medical_conditions} onChange={handleChange} rows="3" style={{gridColumn: '1 / -1'}} />
              </div>

              <h3><i className="fas fa-file-upload"></i> Document Uploads</h3>
              <div className="file-upload">
                <label htmlFor="payment_receipt">Payment Receipt *</label>
                <input type="file" id="payment_receipt" name="payment_receipt" accept="image/*,.pdf" onChange={handleChange} required />
                <label htmlFor="birth_certificate">Birth Certificate (Optional)</label>
                <input type="file" id="birth_certificate" name="birth_certificate" accept="image/*,.pdf" onChange={handleChange} />
                <label htmlFor="previous_report">Previous School Report (Optional)</label>
                <input type="file" id="previous_report" name="previous_report" accept="image/*,.pdf" onChange={handleChange} />
                <label htmlFor="recommendation_letter">Recommendation Letter (Optional)</label>
                <input type="file" id="recommendation_letter" name="recommendation_letter" accept="image/*,.pdf" onChange={handleChange} />
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                <label htmlFor="agreeTerms">I agree to the terms and conditions and confirm that all information provided is accurate *</label>
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationNursery;
