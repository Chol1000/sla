import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';
import API_URL from '../utils/api';

/* ── Helpers ── */
const getYoutubeThumbnail = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
};

const getPostImage = (post) => {
  if (post.image) return post.image.startsWith('http') ? post.image : `${API_URL}${post.image}`;
  if (post.video_url) return getYoutubeThumbnail(post.video_url);
  return null;
};

const isVideo = (post) => !!(post.video || post.video_url);

const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};


const DESKTOP_LIMIT = 50;
const MOBILE_LIMIT  = 10;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setPageMeta(
      'News and Blog',
      'Stay informed with the latest news, updates, and stories from St. Lawrence Academy, Juba, South Sudan.'
    );
    fetch(`${API_URL}/api/blog/posts/`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.results || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => initScrollAnimations(), 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  /* build category list: All + used backend categories + "Other" if any uncategorized */
  const usedCategories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));
  const hasUncategorized = posts.some(p => !p.category);
  const categories = [
    'All',
    ...usedCategories,
    ...(hasUncategorized ? ['Other'] : []),
  ];

  const filtered = activeCategory === 'All'
    ? posts
    : activeCategory === 'Other'
      ? posts.filter(p => !p.category)
      : posts.filter(p => p.category === activeCategory);

  const limit        = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT;
  const hasMore      = filtered.length > limit;
  const visiblePosts = showAll ? filtered : filtered.slice(0, limit);

  const featured   = visiblePosts[0] || null;
  const sideCards  = visiblePosts.slice(1, 6);
  const gridPosts  = visiblePosts.slice(6);

  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setFilterOpen(false);
    setShowAll(false);
  };

  return (
    <div className="blog-page">

      {/* ── Hero ── */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          <img src="/sla_assembly_1.jpg" alt="St. Lawrence Academy" />
        </div>
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <div className="blog-hero-label">
            <span className="bh-line"></span>St. Lawrence Academy<span className="bh-line"></span>
          </div>
          <h1 className="blog-hero-title">News and Blog</h1>
          <p className="blog-hero-sub">
            The latest stories, updates, and achievements from our school community.
          </p>
        </div>
      </section>

      {/* ── Mobile Filter Band ── */}
      {!loading && categories.length > 1 && (
        <div className="blog-mobile-band">
          <div className="container">
            <div className="blog-mobile-band-inner">
              <span className="blog-mobile-band-title">News &amp; Blog</span>
              <div className="blog-filter-dropdown blog-filter-dropdown--band">
                <button
                  className="blog-filter-select-btn"
                  onClick={() => setFilterOpen(o => !o)}
                >
                  <span className="blog-filter-select-btn-left">
                    <i className="fas fa-filter"></i>
                    <span>{activeCategory}</span>
                  </span>
                  <i className={`fas fa-chevron-down blog-filter-select-btn-arrow${filterOpen ? ' open' : ''}`}></i>
                </button>
                {filterOpen && (
                  <div className="blog-filter-menu">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`blog-filter-menu-item${activeCategory === cat ? ' active' : ''}`}
                        onClick={() => selectCategory(cat)}
                      >{cat}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main ── */}
      <section className="blog-main">
        <div className="container">

          {/* Filters — buttons on desktop, dropdown on mobile */}
          {!loading && categories.length > 1 && (
            <div className="blog-filters-wrap animate-on-scroll">
              {/* Desktop buttons */}
              <div className="blog-filters">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`blog-filter-btn${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => selectCategory(cat)}
                  >{cat}</button>
                ))}
              </div>

              {/* Mobile dropdown */}
              <div className="blog-filter-dropdown">
                <button
                  className="blog-filter-select-btn"
                  onClick={() => setFilterOpen(o => !o)}
                >
                  <span className="blog-filter-select-btn-left">
                    <i className="fas fa-filter"></i>
                    <span>{activeCategory}</span>
                  </span>
                  <i className={`fas fa-chevron-down blog-filter-select-btn-arrow${filterOpen ? ' open' : ''}`}></i>
                </button>
                {filterOpen && (
                  <div className="blog-filter-menu">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`blog-filter-menu-item${activeCategory === cat ? ' active' : ''}`}
                        onClick={() => selectCategory(cat)}
                      >{cat}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {loading ? (
            /* Skeleton */
            <div className="blog-skeleton-wrap">
              <div className="blog-skeleton-top">
                <div className="bsk-featured"></div>
                <div className="bsk-side-col">
                  {[1,2,3].map(i => <div key={i} className="bsk-side-card"></div>)}
                </div>
              </div>
              <div className="blog-skeleton-grid">
                {[1,2,3].map(i => (
                  <div key={i} className="blog-skeleton-card">
                    <div className="bsk-img"></div>
                    <div className="bsk-line bsk-title"></div>
                    <div className="bsk-line bsk-excerpt"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <i className="fas fa-newspaper"></i>
              <h3>No posts yet</h3>
              <p>Check back soon for updates and news from our community.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="blog-empty">
              <i className="fas fa-filter"></i>
              <h3>No posts in "{activeCategory}"</h3>
              <p>Try another category or check back later.</p>
            </div>
          ) : (
            <>
              {/* ── Top layout: featured + side cards ── */}
              {featured && (
                <div className={`blog-top animate-on-scroll${sideCards.length === 0 ? ' blog-top--solo' : ''}`}>

                  {/* Featured */}
                  <Link to={`/blog/${featured.id}/${toSlug(featured.title)}`} className="blog-featured">
                    <div className="blog-featured-image">
                      {getPostImage(featured) ? (
                        <img src={getPostImage(featured)} alt={featured.title} />
                      ) : (
                        <div className="blog-featured-ph"><i className="fas fa-newspaper"></i></div>
                      )}
                      {isVideo(featured) && (
                        <span className="blog-video-badge"><i className="fas fa-play"></i> Video</span>
                      )}
                      {/* Gradient overlay — desktop only (absolute positioned inside image) */}
                      <div className="blog-featured-overlay blog-featured-overlay--desktop">
                        <div className="blog-featured-overlay-inner">
                          <div className="blog-featured-meta">
                            {featured.category
                              ? <span className="blog-cat-label">{featured.category}</span>
                              : <span className="blog-cat-label">General</span>
                            }
                            <span className="blog-feat-date">{formatDate(featured.created_at)}</span>
                          </div>
                          <h2 className="blog-featured-title">{featured.title}</h2>
                          {featured.excerpt && (
                            <p className="blog-featured-excerpt">{featured.excerpt}</p>
                          )}
                          <span className="blog-read-more">
                            Read Article <i className="fas fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Card content — mobile only (below image) */}
                    <div className="blog-featured-card-content">
                      <div className="blog-featured-meta">
                        {featured.category
                          ? <span className="blog-cat-label">{featured.category}</span>
                          : <span className="blog-cat-label">General</span>
                        }
                        <span className="blog-feat-date">{formatDate(featured.created_at)}</span>
                      </div>
                      <h2 className="blog-featured-title">{featured.title}</h2>
                      {featured.excerpt && (
                        <p className="blog-featured-excerpt">{featured.excerpt}</p>
                      )}
                      <span className="blog-read-more">
                        Read Article <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </Link>

                  {/* Side cards — horizontal like Home */}
                  {sideCards.length > 0 && (
                    <div className="blog-side-cards">
                      {sideCards.map(post => (
                        <Link key={post.id} to={`/blog/${post.id}/${toSlug(post.title)}`} className="blog-side-card">
                          <div className="blog-side-image">
                            {getPostImage(post) ? (
                              <img src={getPostImage(post)} alt={post.title} />
                            ) : (
                              <div className="blog-side-ph"><i className="fas fa-newspaper"></i></div>
                            )}
                            {isVideo(post) && (
                              <span className="blog-side-video"><i className="fas fa-play"></i></span>
                            )}
                          </div>
                          <div className="blog-side-info">
                            {post.category && (
                              <span className="blog-cat-label">{post.category}</span>
                            )}
                            <span className="blog-side-date">{formatDate(post.created_at)}</span>
                            <h3 className="blog-side-title">{post.title}</h3>
                            {post.excerpt && (
                              <p className="blog-side-excerpt">{post.excerpt}</p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Grid (same style as side cards) ── */}
              {gridPosts.length > 0 && (
                <div className="blog-grid animate-on-scroll">
                  {gridPosts.map(post => (
                    <Link key={post.id} to={`/blog/${post.id}/${toSlug(post.title)}`} className="blog-side-card blog-grid-item">
                      <div className="blog-side-image">
                        {getPostImage(post) ? (
                          <img src={getPostImage(post)} alt={post.title} />
                        ) : (
                          <div className="blog-side-ph"><i className="fas fa-newspaper"></i></div>
                        )}
                        {isVideo(post) && (
                          <span className="blog-side-video"><i className="fas fa-play"></i></span>
                        )}
                      </div>
                      <div className="blog-side-info">
                        {post.category && <span className="blog-cat-label">{post.category}</span>}
                        <span className="blog-side-date">{formatDate(post.created_at)}</span>
                        <h3 className="blog-side-title">{post.title}</h3>
                        {post.excerpt && (
                          <p className="blog-side-excerpt">{post.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* ── View More / View Less ── */}
              {(hasMore || showAll) && (
                <div className="blog-view-more-wrap">
                  <button
                    className="blog-view-more-btn"
                    onClick={() => setShowAll(s => !s)}
                  >
                    {showAll
                      ? <><i className="fas fa-chevron-up"></i> View Less</>
                      : <>View More <i className="fas fa-chevron-down"></i></>
                    }
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  );
};

export default Blog;
