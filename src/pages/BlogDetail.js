import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './About.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blog/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog post:', err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

  if (loading) {
    return <div style={{textAlign: 'center', padding: '5rem', color: 'var(--medium-gray)'}}>Loading...</div>;
  }

  if (!post) {
    return <div style={{textAlign: 'center', padding: '5rem', color: 'var(--medium-gray)'}}>Blog post not found</div>;
  }

  return (
    <div style={{background: 'var(--section-background)', minHeight: '100vh', paddingTop: '80px'}}>
      <article style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
        <header style={{marginBottom: '3rem'}}>
          <div style={{marginBottom: '1.5rem'}}>
            <span style={{background: 'var(--primary-red)', color: 'white', padding: '0.5rem 1.2rem', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase'}}>{post.category}</span>
          </div>
          
          <h1 className="blog-detail-title" style={{fontSize: '2.8rem', fontWeight: '700', color: 'var(--text-color)', lineHeight: '1.2', marginBottom: '1.5rem'}}>{post.title}</h1>
          
          <div className="blog-detail-meta" style={{display: 'flex', gap: '2rem', fontSize: '0.95rem', color: 'var(--medium-gray)', marginBottom: '2rem'}}>
            <span><i className="fas fa-calendar" style={{marginRight: '0.5rem'}}></i>{formatDate(post.created_at)}</span>
            <span><i className="fas fa-user" style={{marginRight: '0.5rem'}}></i>{post.author}</span>
            <span><i className="fas fa-clock" style={{marginRight: '0.5rem'}}></i>{post.read_time} min read</span>
          </div>
          
          <figure style={{margin: '0'}}>
            {isVideo(post) ? (
              post.video_url ? (
                <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '85%', display: 'block'}}>
                  <iframe 
                    src={post.video_url.replace('watch?v=', 'embed/')} 
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none'}}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video controls style={{width: '85%', height: '600px', objectFit: 'contain', display: 'block'}}>
                  <source src={getMediaUrl(post)} />
                </video>
              )
            ) : (
              <img className="blog-detail-image" src={getMediaUrl(post)} alt={post.title} style={{width: '85%', height: '600px', objectFit: 'contain', display: 'block'}} />
            )}
          </figure>
        </header>
        
        <div className="blog-detail-content" style={{fontSize: '1.1rem', lineHeight: '2', color: '#4a4a4a', whiteSpace: 'pre-line', fontWeight: '400', width: '85%', fontFamily: 'Georgia, serif'}}>
          {post.content}
        </div>
        
        <footer style={{marginTop: '5rem', paddingTop: '2.5rem', borderTop: '2px solid var(--light-gray)'}}>
          <a href="/blog" style={{color: 'var(--primary-red)', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'gap 0.3s'}}>
            <i className="fas fa-arrow-left"></i> Back to All Articles
          </a>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetail;
