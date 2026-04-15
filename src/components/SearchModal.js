import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import SEARCH_INDEX from '../utils/searchIndex.json';
import './SearchModal.css';

const POPULAR = ['fees', 'admissions', 'nursery', 'secondary', 'Achier John', 'sports', 'contact', 'why choose'];

const categoryLabel = (file) => {
  const map = {
    'Home': 'Home', 'About': 'About', 'Founder': 'About', 'History': 'About',
    'Faculty': 'About', 'Anthem': 'About', 'PTA': 'About',
    'Nursery': 'Academics', 'Primary': 'Academics', 'Secondary': 'Academics',
    'Curriculum': 'Academics', 'Subjects': 'Academics', 'Examinations': 'Academics',
    'Library': 'Academics', 'ScienceLab': 'Academics', 'Technology': 'Academics',
    'Campus': 'Campus', 'DiningServices': 'Campus', 'HealthWellness': 'Campus',
    'Sports': 'Student Life', 'Arts': 'Student Life', 'Clubs': 'Student Life',
    'StudentLeadership': 'Student Life', 'CommunityService': 'Student Life',
    'EventsActivities': 'Student Life', 'Counseling': 'Student Life',
    'ApplicationProcess': 'Admissions', 'Requirements': 'Admissions',
    'Fees': 'Admissions', 'AdmissionsContact': 'Admissions',
    'AdmissionsVisit': 'Admissions', 'ImportantDates': 'Admissions',
    'RegistrationStatus': 'Admissions',
    'Blog': 'News', 'Gallery': 'Gallery', 'Reviews': 'Reviews',
    'Alumni': 'Alumni', 'FAQ': 'Help', 'Careers': 'Careers', 'Contact': 'Contact',
    'Support': 'Support',
  };
  return map[file] || file;
};

const categoryIcon = (cat) => ({
  'Home': 'fa-home', 'About': 'fa-info-circle', 'Academics': 'fa-graduation-cap',
  'Campus': 'fa-building', 'Student Life': 'fa-users', 'Admissions': 'fa-door-open',
  'Careers': 'fa-briefcase', 'Help': 'fa-question-circle', 'News': 'fa-newspaper',
  'Gallery': 'fa-images', 'Reviews': 'fa-star', 'Alumni': 'fa-user-graduate',
  'Contact': 'fa-phone', 'Support': 'fa-heart',
}[cat] || 'fa-file-alt');

const Hl = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
};

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const listRef  = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(''); setResults([]); setActiveIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setActiveIdx(-1); return; }
    const q = query.toLowerCase().trim();

    // Score each index entry
    const scored = SEARCH_INDEX.map(entry => {
      const tl = entry.text.toLowerCase();
      let score = 0;
      if (tl === q)              score = 100;
      else if (tl.startsWith(q)) score = 70;
      else if (tl.includes(q))   score = tl.indexOf(q) < 40 ? 50 : 30;
      return score > 0 ? { ...entry, score } : null;
    }).filter(Boolean);

    // Sort by score desc, deduplicate by url+text leading 60 chars
    scored.sort((a, b) => b.score - a.score);
    const seen = new Set();
    const deduped = [];
    for (const e of scored) {
      const key = e.url + e.text.slice(0, 60);
      if (!seen.has(key)) { seen.add(key); deduped.push(e); }
      if (deduped.length >= 10) break;
    }
    setResults(deduped);
    setActiveIdx(-1);
  }, [query]);

  const go = useCallback((url, term) => {
    setQuery(''); onClose();
    navigate(url, { state: { highlight: term } });
  }, [navigate, onClose]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); go(results[activeIdx].url, query); }
  }, [results, activeIdx, go, onClose, query]);

  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    listRef.current.querySelectorAll('.sm-result')[activeIdx]?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  if (!isOpen) return null;

  return createPortal(
    <div className="sm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sm-modal" onKeyDown={handleKey}>

        <div className="sm-header">
          <i className="fas fa-search sm-search-icon"></i>
          <input
            ref={inputRef}
            className="sm-input"
            type="text"
            placeholder="Search anything on this website…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button className="sm-clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
              <i className="fas fa-times-circle"></i>
            </button>
          )}
          <button className="sm-close-btn" onClick={onClose}><span>ESC</span></button>
        </div>

        <div className="sm-body" ref={listRef}>

          {!query.trim() && (
            <div className="sm-empty">
              <p className="sm-empty-label">Popular searches</p>
              <div className="sm-popular">
                {POPULAR.map(p => (
                  <button key={p} className="sm-popular-btn" onClick={() => setQuery(p)}>
                    <i className="fas fa-search"></i> {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="sm-none">
              <i className="fas fa-search"></i>
              <p>No results for <strong>"{query}"</strong></p>
              <span>Try different keywords</span>
            </div>
          )}

          {results.length > 0 && (
            <>
              <div className="sm-results-bar">
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <span className="sm-hint">
                  <i className="fas fa-arrow-up"></i><i className="fas fa-arrow-down"></i> navigate &nbsp;·&nbsp; Enter to open
                </span>
              </div>
              <ul className="sm-results">
                {results.map((r, idx) => {
                  const cat = categoryLabel(r.file);
                  return (
                    <li
                      key={idx}
                      className={`sm-result${idx === activeIdx ? ' sm-result--active' : ''}`}
                      onClick={() => go(r.url, query)}
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      <span className="sm-result-icon">
                        <i className={`fas ${categoryIcon(cat)}`}></i>
                      </span>
                      <div className="sm-result-body">
                        <div className="sm-result-top">
                          <span className="sm-result-cat">{cat}</span>
                        </div>
                        <p className="sm-result-text">
                          <Hl text={r.text} query={query} />
                        </p>
                        <span className="sm-result-url">{r.page}</span>
                      </div>
                      <i className="fas fa-arrow-right sm-result-arrow"></i>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="sm-footer">
          <span><i className="fas fa-highlighter"></i> Text is highlighted on the page when you open a result</span>
          <span>St. Lawrence Academy</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
