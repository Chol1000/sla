import React, { useEffect, useState } from 'react';
import './About.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getMediaUrl = (post) => {
    if (post.image) {
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
            <i className="fas fa-newspaper"></i>
            Blog & News
          </div>
          <h1>Latest News & Updates</h1>
          <p>Stay informed about the latest happenings, achievements, and events at St. Lawrence Academy.</p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="section" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{color: 'var(--primary-red)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>Our Blog</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--medium-gray)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8'}}>
              Read the latest news, updates, and stories from our school community.
            </p>
          </div>

          {loading ? (
            <div style={{textAlign: 'center', padding: '3rem', color: 'var(--medium-gray)'}}>Loading...</div>
          ) : blogPosts.length === 0 ? (
            <div style={{textAlign: 'center', padding: '5rem 2rem'}}>
              <i className="fas fa-newspaper" style={{fontSize: '4rem', color: 'var(--primary-red)', marginBottom: '1.5rem'}}></i>
              <h3 style={{fontSize: '1.5rem', color: 'var(--primary-black)', marginBottom: '1rem'}}>No Blog Posts Available</h3>
              <p style={{fontSize: '1rem', color: 'var(--medium-gray)'}}>Check back soon for updates and news from our community.</p>
            </div>
          ) : (
            <div className="news-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
              {blogPosts.map(post => (
                <a href={`/blog/${post.id}`} key={post.id} style={{textDecoration: 'none', color: 'inherit'}}>
                  <article className="news-article" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div className="news-image" style={{height: '250px', overflow: 'hidden'}}>
                      {isVideo(post) ? (
                        post.video_url ? (
                          <div style={{position: 'relative', width: '100%', height: '100%', display: 'block'}}>
                            <iframe 
                              src={post.video_url.replace('watch?v=', 'embed/')} 
                              style={{width: '100%', height: '100%', border: 'none', display: 'block'}}
                              title={post.title}
                            />
                          </div>
                        ) : (
                          <video style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}>
                            <source src={getMediaUrl(post)} />
                          </video>
                        )
                      ) : (
                        <img src={getMediaUrl(post)} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
                      )}
                    </div>
                    <div className="news-content" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <span className="news-date">{formatDate(post.created_at)}</span>
                      <h4 style={{height: '48px', overflow: 'hidden', margin: '0.5rem 0'}}>{truncateText(post.title, 60)}</h4>
                      <p style={{height: '60px', overflow: 'hidden', flex: 1}}>{truncateText(post.excerpt, 100)}</p>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
