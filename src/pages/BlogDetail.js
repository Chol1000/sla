import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';
import API_URL from '../utils/api';
import { setPageMeta } from '../utils/pageMeta';

const BlogDetail = () => {
  const { id }          = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/blog/posts/${id}`)
      .then(res => {
        if (!res.ok) { window.location.href = '/404'; return null; }
        return res.json();
      })
      .then(data => {
        if (data) {
          setPost(data);
          setPageMeta(data.title, data.excerpt || data.content?.slice(0, 160));
        }
        setLoading(false);
      })
      .catch(() => { window.location.href = '/404'; });
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/api/blog/posts/`)
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data) ? data : (data.results || []);
        setRelated(posts.filter(p => String(p.id) !== String(id)).slice(0, 5));
      })
      .catch(() => {});
  }, [id]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const getImage = (p) => {
    if (p.image) return p.image.startsWith('http') ? p.image : `${API_URL}${p.image}`;
    return null;
  };

  const isVideo = (p) => p.video || p.video_url;

  const getYoutubeThumbnail = (url) => {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : null;
  };

  const getCardImage = (p) => {
    if (p.image) return p.image.startsWith('http') ? p.image : `${API_URL}${p.image}`;
    if (p.video_url) return getYoutubeThumbnail(p.video_url);
    return null;
  };

  const getVideoEmbed = (p) => {
    if (!p.video_url) return null;
    const url = p.video_url;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/').split('&')[0];
    }
    return null;
  };

  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (loading) {
    return (
      <div className="bd-page">
        <div className="bd-loading">
          <div className="bd-loading-spinner"></div>
          <p>Loading article…</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const heroImg   = getImage(post);
  const embedUrl  = getVideoEmbed(post);
  const videoFile = !embedUrl && (post.video_url || post.video);

  return (
    <div className="bd-page">

      {/* ── Main ── */}
      <section className="bd-main">
        <div className="container">
          <div className="bd-layout">

            {/* Article */}
            <article className="bd-article">

              {/* Article header */}
              <div className="bd-article-header">
                <span className="bd-article-eyebrow">
                  {post.category || 'News & Blog'} &mdash; St. Lawrence Academy
                </span>
                <h1 className="bd-article-title">{post.title}</h1>
                {post.excerpt && (
                  <p className="bd-article-excerpt">{post.excerpt}</p>
                )}
                <div className="bd-article-meta">
                  <span className="bd-meta-item">
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(post.created_at)}
                  </span>
                  {post.author && (
                    <span className="bd-meta-item">
                      <i className="far fa-user"></i>
                      {post.author}
                    </span>
                  )}
                  {post.read_time && (
                    <span className="bd-meta-item">
                      <i className="far fa-clock"></i>
                      {post.read_time} min read
                    </span>
                  )}
                </div>
              </div>

              {/* Hero image */}
              {heroImg && !isVideo(post) && (
                <div className="bd-article-image">
                  <img src={heroImg} alt={post.title} />
                </div>
              )}

              {/* Video */}
              {isVideo(post) && (
                <div className="bd-article-video">
                  {embedUrl ? (
                    <div className="bd-embed">
                      <iframe
                        src={embedUrl}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : videoFile ? (
                    <video controls preload="metadata" playsInline>
                      <source src={videoFile} type="video/mp4" />
                    </video>
                  ) : null}
                </div>
              )}

              {/* Content */}
              <div className="bd-article-body">
                <div className="bd-content">{post.content}</div>
              </div>

              {/* Back link */}
              <div className="bd-article-footer">
                <a href="/blog" className="bd-back-bottom">
                  <i className="fas fa-arrow-left"></i> Back to All Articles
                </a>
              </div>

            </article>

            {/* Sidebar */}
            <aside className="bd-sidebar">

              {/* Post info card */}
              <div className="bd-sidebar-card">
                <div className="bd-sidebar-card-header">About This Article</div>
                <div className="bd-sidebar-items">
                  <div className="bd-sidebar-item">
                    <i className="far fa-calendar-alt"></i>
                    <div className="bd-sidebar-item-text">
                      <strong>Published</strong>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                  {post.author && (
                    <div className="bd-sidebar-item">
                      <i className="far fa-user"></i>
                      <div className="bd-sidebar-item-text">
                        <strong>Author</strong>
                        <span>{post.author}</span>
                      </div>
                    </div>
                  )}
                  {post.category && (
                    <div className="bd-sidebar-item">
                      <i className="fas fa-tag"></i>
                      <div className="bd-sidebar-item-text">
                        <strong>Category</strong>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  )}
                  {post.read_time && (
                    <div className="bd-sidebar-item">
                      <i className="far fa-clock"></i>
                      <div className="bd-sidebar-item-text">
                        <strong>Read Time</strong>
                        <span>{post.read_time} min</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bd-sidebar-card">
                  <div className="bd-sidebar-card-header">More Articles</div>
                  <div className="bd-related-list">
                    {related.map(rp => (
                      <a
                        key={rp.id}
                        href={`/blog/${rp.id}/${slugify(rp.title)}`}
                        className="bd-related-card"
                      >
                        <div className="bd-related-img">
                          {getCardImage(rp) ? (
                            <img src={getCardImage(rp)} alt={rp.title} />
                          ) : (
                            <div className="bd-related-ph">
                              <i className="fas fa-newspaper"></i>
                            </div>
                          )}
                          {isVideo(rp) && (
                            <span className="bd-related-video-badge">
                              <i className="fas fa-play"></i>
                            </span>
                          )}
                        </div>
                        <div className="bd-related-info">
                          {rp.category && <span className="bd-related-cat">{rp.category}</span>}
                          <h4 className="bd-related-title">{rp.title}</h4>
                          <span className="bd-related-date">{formatDate(rp.created_at)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogDetail;
