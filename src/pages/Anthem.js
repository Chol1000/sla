import { useEffect, useRef, useState } from 'react';
import './Anthem.css';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { setPageMeta } from '../utils/pageMeta';

const Anthem = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageMeta('School Anthem', 'The St. Lawrence Academy school anthem — lyrics and audio. A song of values, pride, and commitment to excellence.');
    setTimeout(() => initScrollAnimations(), 100);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => setPlaying(false);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="anthem-page">

      {/* ── Hero ── */}
      <section className="anthem-hero">
        <div className="anthem-hero-bg">
          <img src="/sla_assembly.jpg" alt="St. Lawrence Academy Assembly" />
        </div>
        <div className="anthem-hero-overlay"></div>
        <div className="anthem-hero-content">
          <div className="container">
            <div className="anthem-hero-inner">
              <span className="anthem-hero-label">St. Lawrence Academy</span>
              <h1 className="anthem-hero-title">School <span>Anthem</span></h1>
              <p className="anthem-hero-sub">
                Our anthem is a celebration of who we are — our values, our
                pride, and our unwavering commitment to building a brighter
                future through education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Band ── */}
      <div className="anthem-mobile-band">
        <div className="container">
          <h2 className="anthem-mobile-band-heading">School Anthem</h2>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="anthem-intro">
        <div className="container">
          <div className="anthem-intro-inner">
            <span className="anthem-eyebrow">Our Song</span>
            <h2 className="anthem-intro-heading">St. Lawrence Academy Anthem</h2>
            <p className="anthem-intro-text">
              Every great institution has a song that binds its community together.
              The St. Lawrence Academy anthem captures the spirit of our school —
              the hope we carry for South Sudan, the values we hold dear, and the
              pride every student and staff member feels when they walk through our gates.
            </p>
          </div>
        </div>
      </section>

      {/* ── Lyrics + Audio ── */}
      <section className="anthem-main">
        <div className="container">
          <div className="anthem-main-inner">

            {/* Lyrics column */}
            <div className="anthem-lyrics-col reveal">
              <span className="anthem-eyebrow">Lyrics</span>
              <h2 className="anthem-lyrics-heading">The Words We Sing</h2>

              <div className="anthem-lyrics-body">

                <div className="anthem-verse">
                  <span className="anthem-verse-label">Verse 1</span>
                  <p>
                    St. Lawrence Academy, is the home<br />
                    of great heroes<br />
                    with great wisdom per &#8209; excellence<br />
                    and leadership<br />
                    We stand united train to win in all,<br />
                    Education is the key of life.
                  </p>
                </div>

                <div className="anthem-verse">
                  <span className="anthem-verse-label">Verse 2</span>
                  <p>
                    St. Lawrence Academy is the<br />
                    school of great champions, we<br />
                    rise to build our country South<br />
                    Sudan, to raise great leaders<br />
                    in dignity and peace, in all<br />
                    professions of life.
                  </p>
                </div>

                <div className="anthem-verse">
                  <span className="anthem-verse-label">Verse 3</span>
                  <p>
                    St. Lawrence Academy, St.<br />
                    Lawrence Academy. promoting<br />
                    excellence, in science and &#8209;<br />
                    technology to be leading centre of<br />
                    academics.<br /><br />
                    Excellence, in the region and beyond.
                  </p>
                </div>

              </div>
            </div>

            {/* Audio + notes column */}
            <div className="anthem-side-col">

              {/* Audio player */}
              <div className="anthem-player reveal">
                <audio
                  ref={audioRef}
                  src="/sla_anthem.mp4"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                  preload="metadata"
                />
                <div className="anthem-player-top">
                  <span className="anthem-player-label">Now Playing</span>
                  <h3 className="anthem-player-title">St. Lawrence Academy Anthem</h3>
                  <p className="anthem-player-sub">St. Lawrence Academy — Juba, South Sudan</p>
                </div>
                <button
                  className={`anthem-play-btn${playing ? ' anthem-play-btn--pause' : ''}`}
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause anthem' : 'Play anthem'}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  <span>{playing ? 'Pause Anthem' : 'Play Anthem'}</span>
                </button>

                {/* Progress bar */}
                <div className="anthem-progress-wrap" onClick={handleSeek} aria-label="Seek audio position">
                  <div className="anthem-progress-track">
                    <div className="anthem-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="anthem-time-row">
                  <span>{fmt(currentTime)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Info cards */}
              <div className="anthem-note reveal">
                <span className="anthem-note-eyebrow">About the Anthem</span>
                <h3>A Song of Identity &amp; Pride</h3>
                <p>
                  The school anthem was composed to reflect the core identity of
                  St. Lawrence Academy — our faith, our commitment to excellence,
                  and our belief in the transformative power of education. It is
                  sung at assemblies, ceremonies, and key school events, uniting
                  students, staff, and families in shared purpose.
                </p>
              </div>

              <div className="anthem-note reveal">
                <span className="anthem-note-eyebrow">When We Sing</span>
                <h3>Part of Every Milestone</h3>
                <p>
                  From the very first day of school to graduation ceremonies, the
                  anthem marks every important moment in a student's journey at
                  St. Lawrence Academy. It is a reminder of where we come from,
                  what we stand for, and where we are going together.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <div className="anthem-quote-band">
        <div className="container">
          <div className="anthem-quote-inner">
            <div className="anthem-quote-mark">&ldquo;</div>
            <p className="anthem-quote-text">
              Music gives a soul to the universe, wings to the mind, flight to the
              imagination, and life to everything.
            </p>
            <span className="anthem-quote-source">— Plato</span>
            <p className="anthem-quote-sub">
              Our anthem gives voice to the soul of St. Lawrence Academy.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Anthem;
