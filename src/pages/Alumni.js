import { useEffect, useState, useCallback, useRef } from 'react';
import './Alumni.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

const paths = [
  {
    num: '01',
    tag: 'Higher Education',
    title: 'University & Further Study',
    body: 'SLA graduates go on to universities across South Sudan, Uganda, Kenya, and further abroad — pursuing degrees in medicine, law, engineering, education, business, and the humanities.',
  },
  {
    num: '02',
    tag: 'Professional Life',
    title: 'Careers & Public Service',
    body: 'Our alumni are found in classrooms, hospitals, government offices, businesses, and NGOs. They carry the values of SLA into every field they enter.',
  },
  {
    num: '03',
    tag: 'Community',
    title: 'Leadership in the Community',
    body: 'Many graduates return to their communities as leaders, teachers, and advocates — living out the mission of St. Lawrence Academy to serve and transform society.',
  },
  {
    num: '04',
    tag: 'Mentorship',
    title: 'Inspiring the Next Generation',
    body: "Experienced alumni volunteer as mentors, guest speakers, and role models for current students — building a chain of support that stretches across generations.",
  },
];

const REQUIRED_FIELDS = { name: 'Full name', graduation_year: 'Year of graduation', title: 'Current role or position', email: 'Email address', short_desc: 'Short bio' };
const EMPTY_FORM = { name: '', graduation_year: '', title: '', email: '', short_desc: '', full_desc: '' };
const EMPTY_ERRORS = { name: '', graduation_year: '', title: '', email: '', short_desc: '', full_desc: '', image: '' };

const Alumni = () => {
  const [alumniList, setAlumniList]     = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [errors, setErrors]             = useState(EMPTY_ERRORS);
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting]     = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMsg, setSubmitMsg]       = useState('');
  const fileInputRef                    = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('Alumni', 'St. Lawrence Academy alumni — stay connected, share your story, and carry the values of SLA into the world.');
    fetch(`${API_URL}/api/alumni/profiles/`)
      .then(res => res.json())
      .then(data => {
        setAlumniList(data.results || data);
        setLoadingProfiles(false);
      })
      .catch(() => setLoadingProfiles(false));
  }, []);

  useEffect(() => {
    if (!loadingProfiles) setTimeout(() => initScrollAnimations(), 100);
  }, [loadingProfiles]);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http')) return photo;
    return `${API_URL}${photo}`;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }, [errors]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image must be smaller than 5 MB.' }));
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file.' }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const newErrors = { ...EMPTY_ERRORS };
    let valid = true;

    Object.entries(REQUIRED_FIELDS).forEach(([field, label]) => {
      if (!form[field].trim()) {
        newErrors[field] = `${label} is required.`;
        valid = false;
      }
    });

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (form.graduation_year.trim() && !/^\d{4}$/.test(form.graduation_year.trim())) {
      newErrors.graduation_year = 'Please enter a valid 4-digit year (e.g. 2018).';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitStatus(null);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v.trim()) fd.append(k, v.trim()); });
    if (imageFile) fd.append('image', imageFile);

    try {
      const res = await fetch(`${API_URL}/api/alumni/submit/`, { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus('success');
        setSubmitMsg(data.message || 'Thank you! Your profile has been submitted.');
        setForm(EMPTY_FORM);
        setErrors(EMPTY_ERRORS);
        removeImage();
      } else {
        // Map server field errors back into form errors
        const mapped = { ...EMPTY_ERRORS };
        let hasFieldErrors = false;
        Object.entries(data).forEach(([field, msgs]) => {
          if (field in mapped) {
            mapped[field] = Array.isArray(msgs) ? msgs[0] : msgs;
            hasFieldErrors = true;
          }
        });
        if (hasFieldErrors) {
          setErrors(mapped);
          setSubmitStatus('error');
          setSubmitMsg('Please fix the errors above and try again.');
        } else {
          const first = Object.values(data)[0];
          setSubmitStatus('error');
          setSubmitMsg(Array.isArray(first) ? first[0] : (data.detail || 'Something went wrong. Please try again.'));
        }
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMsg('Unable to send. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="alumni-page">

      {/* ── Hero ── */}
      <section className="alumni-hero">
        <div className="alumni-hero-bg">
          <img src="/sla_assembly.jpg" alt="St. Lawrence Academy Alumni" />
        </div>
        <div className="alumni-hero-overlay"></div>
        <div className="alumni-hero-content">
          <div className="container">
            <div className="alumni-hero-inner">
              <span className="alumni-hero-label">Our Community</span>
              <h1 className="alumni-hero-title">SLA <span>Alumni</span></h1>
              <p className="alumni-hero-sub">
                Once a member of the St. Lawrence Academy family, always a member.
                Our graduates carry the school's values into every corner of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="alumni-mobile-band">
        <div className="container">
          <h2 className="alumni-mobile-band-heading">SLA Alumni</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="alumni-intro">
        <div className="container">
          <div className="alumni-intro-inner">
            <span className="alumni-eyebrow">Former Students</span>
            <h2 className="alumni-intro-heading">A Bond That Lasts a Lifetime</h2>
            <p className="alumni-intro-text">
              St. Lawrence Academy has been shaping students since its founding. Our
              graduates go on to become doctors, teachers, engineers, public servants,
              and community leaders. The values of discipline, respect, and service that
              are taught at SLA follow them through every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* ── Life After SLA ── */}
      <section className="alumni-paths">
        <div className="container">
          <div className="alumni-section-header">
            <span className="alumni-eyebrow">Where They Go</span>
            <h2 className="alumni-section-heading">Life After SLA</h2>
            <p className="alumni-section-sub">
              Our graduates take many different paths — but all of them carry the
              foundation built at St. Lawrence Academy.
            </p>
          </div>
          <div className="alumni-paths-grid">
            {paths.map((p) => (
              <div className="alumni-path-card reveal" key={p.num}>
                <div className="alumni-path-num">{p.num}</div>
                <span className="alumni-path-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni Profiles ── */}
      <section className="alumni-profiles">
        <div className="container">
          <div className="alumni-section-header">
            <span className="alumni-eyebrow">Our Graduates</span>
            <h2 className="alumni-section-heading">Featured Alumni</h2>
            <p className="alumni-section-sub">
              Profiles of SLA graduates who are making a difference in their fields and communities.
            </p>
          </div>

          {loadingProfiles ? (
            <div className="alumni-skeleton-wrap">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="alumni-skeleton-card">
                  <div className="ask-photo"></div>
                  <div className="ask-line ask-name"></div>
                  <div className="ask-line ask-pos"></div>
                  <div className="ask-line ask-short"></div>
                </div>
              ))}
            </div>
          ) : alumniList.length === 0 ? (
            <div className="alumni-empty">
              <i className="fas fa-graduation-cap"></i>
              <h3>Alumni profiles coming soon</h3>
              <p>We are building out our alumni directory. Check back shortly.</p>
            </div>
          ) : (
            <div className="alumni-cards-grid">
              {alumniList.map(a => (
                <div className="alumni-card" key={a.id} onClick={() => setModal(a)}>
                  <div className="alumni-card-photo">
                    {getPhotoUrl(a.image) ? (
                      <img src={getPhotoUrl(a.image)} alt={a.name} />
                    ) : (
                      <div className="alumni-card-photo-placeholder">
                        <span className="ph-initials">{a.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                        <span className="ph-label">No Photo</span>
                      </div>
                    )}
                    <div className="alumni-card-photo-overlay">
                      <span><i className="fas fa-eye"></i> View Profile</span>
                    </div>
                  </div>
                  <div className="alumni-card-info">
                    <span className="alumni-card-year">{a.graduation_year}</span>
                    <h3>{a.name}</h3>
                    <span className="alumni-card-title">{a.title}</span>
                    {a.short_desc && <p className="alumni-card-desc">{a.short_desc}</p>}
                    {(a.linkedin || a.twitter || a.facebook || a.instagram) && (
                      <div className="alumni-card-socials">
                        {a.linkedin  && <a href={a.linkedin}  target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><i className="fab fa-linkedin-in"></i></a>}
                        {a.twitter   && <a href={a.twitter}   target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><i className="fab fa-twitter"></i></a>}
                        {a.facebook  && <a href={a.facebook}  target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><i className="fab fa-facebook-f"></i></a>}
                        {a.instagram && <a href={a.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><i className="fab fa-instagram"></i></a>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Share Your Story ── */}
      <section className="alumni-submit">
        <div className="container">
          <div className="alumni-submit-inner">
            <div className="alumni-submit-text">
              <span className="alumni-eyebrow">Your Story Matters</span>
              <h2>Share Your Journey</h2>
              <p>
                Are you an SLA graduate? Submit your profile and let us celebrate
                where life has taken you since leaving St. Lawrence Academy. Your
                story inspires current students and strengthens our community.
              </p>
              <p>
                Fill in the form and our team will review your submission. Approved
                profiles are published directly to the alumni directory on this page.
              </p>
            </div>

            <form className="alumni-submit-form" onSubmit={handleSubmit} noValidate>

              {/* Photo upload */}
              <div className="alumni-form-group">
                <label>Your Photo</label>
                <div className="alumni-photo-upload">
                  {imagePreview ? (
                    <div className="alumni-photo-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button type="button" className="alumni-photo-remove" onClick={removeImage}>
                        <i className="fas fa-times"></i> Remove
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="alumni-photo-placeholder" onClick={() => fileInputRef.current?.click()}>
                      <i className="fas fa-camera"></i>
                      <span>Upload a photo</span>
                      <small>JPG, PNG — max 5 MB</small>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
                {errors.image && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.image}</span>}
              </div>

              {/* Row: name + year */}
              <div className="alumni-form-row">
                <div className={`alumni-form-group${errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="al-name">Full Name <span className="req">*</span></label>
                  <input
                    id="al-name" name="name" type="text"
                    placeholder="Your full name"
                    value={form.name} onChange={handleChange}
                  />
                  {errors.name && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.name}</span>}
                </div>
                <div className={`alumni-form-group${errors.graduation_year ? ' has-error' : ''}`}>
                  <label htmlFor="al-year">Year of Graduation <span className="req">*</span></label>
                  <input
                    id="al-year" name="graduation_year" type="text"
                    placeholder="e.g. 2018"
                    value={form.graduation_year} onChange={handleChange}
                  />
                  {errors.graduation_year && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.graduation_year}</span>}
                </div>
              </div>

              {/* Row: role + email */}
              <div className="alumni-form-row">
                <div className={`alumni-form-group${errors.title ? ' has-error' : ''}`}>
                  <label htmlFor="al-title">Current Role / Position <span className="req">*</span></label>
                  <input
                    id="al-title" name="title" type="text"
                    placeholder="e.g. Engineer at XYZ"
                    value={form.title} onChange={handleChange}
                  />
                  {errors.title && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.title}</span>}
                </div>
                <div className={`alumni-form-group${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="al-email">Email Address <span className="req">*</span></label>
                  <input
                    id="al-email" name="email" type="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                  />
                  {errors.email && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.email}</span>}
                </div>
              </div>

              {/* Short bio */}
              <div className={`alumni-form-group${errors.short_desc ? ' has-error' : ''}`}>
                <label htmlFor="al-short">Short Bio <span className="req">*</span></label>
                <input
                  id="al-short" name="short_desc" type="text"
                  placeholder="One or two sentences about yourself — shown on your profile card"
                  value={form.short_desc} onChange={handleChange}
                />
                {errors.short_desc && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.short_desc}</span>}
              </div>

              {/* Full story */}
              <div className={`alumni-form-group${errors.full_desc ? ' has-error' : ''}`}>
                <label htmlFor="al-full">Your Story <span className="alumni-optional">(optional)</span></label>
                <textarea
                  id="al-full" name="full_desc" rows={5}
                  placeholder="Tell us more — your career, studies, achievements, and what SLA means to you. Each paragraph you write here will be shown as a separate section in your profile."
                  value={form.full_desc} onChange={handleChange}
                />
                {errors.full_desc && <span className="alumni-field-error"><i className="fas fa-exclamation-circle"></i> {errors.full_desc}</span>}
              </div>

              {submitStatus === 'success' && (
                <div className="alumni-form-notice alumni-form-notice--success">
                  <i className="fas fa-check-circle"></i>
                  <span>{submitMsg}</span>
                </div>
              )}
              {submitStatus === 'error' && submitMsg && (
                <div className="alumni-form-notice alumni-form-notice--error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{submitMsg}</span>
                </div>
              )}

              <button type="submit" className="alumni-form-btn" disabled={submitting}>
                {submitting
                  ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                  : <>Submit My Profile <i className="fas fa-arrow-right"></i></>
                }
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="alumni-closing">
        <div className="container">
          <div className="alumni-closing-inner reveal">
            <span className="alumni-eyebrow">Get in Touch</span>
            <h2>Connect with the School</h2>
            <p>
              Whether you would like to visit, mentor a student, or simply say hello —
              the doors of St. Lawrence Academy are always open to our former students.
            </p>
            <a href="/contact" className="alumni-closing-btn">
              Contact the School <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── Profile Modal ── */}
      {modal && (
        <div className="alumni-modal-backdrop" onClick={() => setModal(null)}>
          <div className="alumni-modal" onClick={e => e.stopPropagation()}>
            <button className="alumni-modal-close" onClick={() => setModal(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="alumni-modal-inner">
              <div className="alumni-modal-left">
                <div className="alumni-modal-photo">
                  {getPhotoUrl(modal.image) ? (
                    <img src={getPhotoUrl(modal.image)} alt={modal.name} />
                  ) : (
                    <div className="alumni-modal-photo-placeholder">
                      <span className="ph-initials ph-initials--lg">{modal.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                      <span className="ph-label">No Photo</span>
                    </div>
                  )}
                </div>
                {(modal.linkedin || modal.twitter || modal.facebook || modal.instagram) && (
                  <div className="alumni-modal-socials">
                    {modal.linkedin  && <a href={modal.linkedin}  target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>}
                    {modal.twitter   && <a href={modal.twitter}   target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                    {modal.facebook  && <a href={modal.facebook}  target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>}
                    {modal.instagram && <a href={modal.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                  </div>
                )}
              </div>
              <div className="alumni-modal-details">
                <span className="alumni-modal-year">Class of {modal.graduation_year}</span>
                <h2 className="alumni-modal-name">{modal.name}</h2>
                <span className="alumni-modal-title">{modal.title}</span>
                {(modal.full_desc || modal.short_desc) && (
                  <div className="alumni-modal-bio">
                    {(modal.full_desc || modal.short_desc).split('\n').filter(l => l.trim()).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Alumni;
