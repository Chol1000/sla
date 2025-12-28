import React, { useState, useEffect } from 'react';
import './Registration.css';

const RegistrationSecondary = () => {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    parentName: '', parentPhone: '', parentEmail: '', parentAddress: '',
    studentName: '', studentAge: '', studentGender: '', class: '', term: '', studentType: '', track: '',
    transcript: null, recommendation: null, birthCertificate: null, paymentProof: null, agreeTerms: false
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/admissions/registration-status/')
      .then(res => res.json())
      .then(data => {
        const status = data.results ? data.results[0] : (Array.isArray(data) ? data[0] : data);
        setRegistrationStatus(status);
        if (status?.term) {
          setFormData(prev => ({ ...prev, term: status.term }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    if (!formData.agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }
    if (!formData.paymentProof) {
      alert('Please upload payment confirmation');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const data = new FormData();
    data.append('term', registrationStatus?.term || formData.term);
    data.append('year', registrationStatus?.year || '2025');
    data.append('parent_name', formData.parentName);
    data.append('relationship', 'Parent');
    data.append('phone', formData.parentPhone);
    data.append('email', formData.parentEmail);
    data.append('address', formData.parentAddress);
    data.append('student_name', formData.studentName);
    data.append('date_of_birth', '2010-01-01');
    data.append('student_age', formData.studentAge);
    data.append('gender', formData.studentGender.toLowerCase());
    const classMapping = {
      'Senior 1': 's1',
      'Senior 2': 's2',
      'Senior 3': 's3',
      'Senior 4': 's4'
    };
    data.append('class_level', classMapping[formData.class] || formData.class.toLowerCase());
    data.append('track', formData.track.toLowerCase());
    data.append('emergency_contact_name', formData.parentName);
    data.append('emergency_contact_phone', formData.parentPhone);
    if (formData.transcript) data.append('previous_transcripts', formData.transcript);
    if (formData.birthCertificate) data.append('birth_certificate', formData.birthCertificate);
    if (formData.recommendation) data.append('recommendation_letter', formData.recommendation);
    if (formData.paymentProof) data.append('payment_receipt', formData.paymentProof);

    try {
      const response = await fetch('http://localhost:8000/api/admissions/secondary/', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          parentName: '', parentPhone: '', parentEmail: '', parentAddress: '',
          studentName: '', studentAge: '', studentGender: '', class: '', term: registrationStatus?.term || '', studentType: '', track: '',
          transcript: null, recommendation: null, birthCertificate: null, paymentProof: null, agreeTerms: false
        });
      } else {
        const error = await response.json();
        setSubmitError(error.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const isClosed = registrationStatus?.is_deadline_passed;

  if (loading) {
    return <div className="registration-page"><div className="container" style={{padding: '80px 0', textAlign: 'center'}}>Loading...</div></div>;
  }

  return (
    <div className="registration-page">
      <section className="registration-hero">
        <div className="registration-hero-video">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80" alt="Secondary school students" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7'}} />
        </div>
        <div className="registration-hero-overlay" style={{background: 'rgba(0, 0, 0, 0.6)'}}></div>
        <div className="registration-hero-content">
          <div className="registration-hero-badge">
            <i className="fas fa-graduation-cap"></i>
            Secondary School
          </div>
          <h1>Online Registration</h1>
          <p>Senior 1 - 4 - Preparing students for university and professional success</p>
        </div>
      </section>

      <div className="container" style={{padding: '80px 0'}}>
        {submitSuccess && (
          <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
            <div style={{background: 'white', padding: '40px', borderRadius: '12px', maxWidth: '500px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'}}>
              <div style={{width: '80px', height: '80px', background: '#d4edda', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                <i className="fas fa-check-circle" style={{fontSize: '3rem', color: '#28a745'}}></i>
              </div>
              <h2 style={{color: '#28a745', marginBottom: '15px'}}>Registration Submitted Successfully!</h2>
              <p style={{color: '#666', marginBottom: '25px', lineHeight: '1.6'}}>Your application will be reviewed and you will be updated as soon as possible. This process may take 1-2 weeks.</p>
              <button onClick={() => setSubmitSuccess(false)} className="submit-btn" style={{margin: 0}}>Close</button>
            </div>
          </div>
        )}
        {isClosed ? (
          <div style={{textAlign: 'center', padding: '4rem', background: '#f8d7da', borderRadius: '8px'}}>
            <i className="fas fa-times-circle" style={{fontSize: '3rem', color: '#721c24', marginBottom: '1rem'}}></i>
            <h2 style={{color: '#721c24', marginBottom: '1rem'}}>Registration Closed</h2>
            <p style={{fontSize: '1.2rem', color: '#721c24'}}>Applications for {registrationStatus?.term}, {registrationStatus?.year} are now closed. Please check back when registration opens for the next term.</p>
          </div>
        ) : (
          <>
        <div className="registration-info-box">
          <h3><i className="fas fa-info-circle"></i> Important Information</h3>
          <ul>
            <li><strong>Registration Fee:</strong> 10,000 SSP</li>
            <li><strong>Payment Methods:</strong>
              <ul>
                <li>Mobile Money: 0927 222 017 (St. Lawrence Academy)</li>
                <li>Bank: Equity Bank - Account: 1234567890 (St. Lawrence Academy)</li>
              </ul>
            </li>
            <li><strong>Required Documents:</strong> Recent transcript, Birth certificate, Recommendation letter from previous school (for new students - optional)</li>
            <li><strong>Track Selection:</strong> Choose between Science Track or Arts Track based on your career goals</li>
            <li>Registration is not complete until payment confirmation and all required documents are uploaded</li>
            <li>All fields marked with (*) are required</li>
            <li>You will receive confirmation within 1-2 weeks</li>
          </ul>
        </div>

        {submitError && (
          <div style={{background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="registration-form">
          <h3>Parent/Guardian Information</h3>
          <div className="form-grid">
            <input type="text" name="parentName" placeholder="Full Name *" value={formData.parentName} onChange={handleChange} required />
            <input type="tel" name="parentPhone" placeholder="Phone Number *" value={formData.parentPhone} onChange={handleChange} required />
            <input type="email" name="parentEmail" placeholder="Email Address *" value={formData.parentEmail} onChange={handleChange} required />
            <input type="text" name="parentAddress" placeholder="Residential Address *" value={formData.parentAddress} onChange={handleChange} required />
          </div>

          <h3><i className="fas fa-user-graduate"></i> Student Information</h3>
          <div className="form-grid">
            <input type="text" name="studentName" placeholder="Student's Full Name *" value={formData.studentName} onChange={handleChange} required />
            <input type="number" name="studentAge" placeholder="Age *" value={formData.studentAge} onChange={handleChange} required min="9" />
            <select name="studentGender" value={formData.studentGender} onChange={handleChange} required>
              <option value="">Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select name="class" value={formData.class} onChange={handleChange} required>
              <option value="">Select Class *</option>
              <option value="Senior 1">Senior 1</option>
              <option value="Senior 2">Senior 2</option>
              <option value="Senior 3">Senior 3</option>
              <option value="Senior 4">Senior 4</option>
            </select>
            <select name="track" value={formData.track} onChange={handleChange} required>
              <option value="">Select Track *</option>
              <option value="Science">Science Track</option>
              <option value="Arts">Arts Track</option>
            </select>
            <select name="term" value={formData.term} onChange={handleChange} required disabled>
              <option value="">{registrationStatus?.term || 'Select Term *'}</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
            <select name="studentType" value={formData.studentType} onChange={handleChange} required>
              <option value="">Student Type *</option>
              <option value="New">New Student</option>
              <option value="Continuing">Continuing Student</option>
            </select>
          </div>

          <h3><i className="fas fa-file-upload"></i> Required Documents</h3>
          <div className="file-upload">
            <label htmlFor="transcript">Upload Recent Transcript *</label>
            <input type="file" id="transcript" name="transcript" accept="image/*,.pdf" onChange={handleChange} required />
          </div>
          <div className="file-upload">
            <label htmlFor="birthCertificate">Upload Birth Certificate *</label>
            <input type="file" id="birthCertificate" name="birthCertificate" accept="image/*,.pdf" onChange={handleChange} required />
          </div>
          <div className="file-upload">
            <label htmlFor="recommendation">Upload Recommendation Letter (Optional - for new students)</label>
            <input type="file" id="recommendation" name="recommendation" accept="image/*,.pdf" onChange={handleChange} />
          </div>

          <h3><i className="fas fa-receipt"></i> Payment Confirmation</h3>
          <div className="file-upload">
            <label htmlFor="paymentProof">Upload Payment Proof (Mobile Money/Bank Receipt) *</label>
            <input type="file" id="paymentProof" name="paymentProof" accept="image/*,.pdf" onChange={handleChange} required />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
            <label htmlFor="agreeTerms">I agree to the terms and conditions *</label>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting || isClosed}>
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationSecondary;
