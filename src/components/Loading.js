import './Loading.css';

const Loading = () => (
  <div className="loading-overlay">
    <div className="loading-stage">

      {/* Broken animated rings via SVG */}
      <svg className="loading-rings" viewBox="0 0 200 200" aria-hidden="true">
        {/* Outer ring — 3 arcs, slow CW */}
        <circle cx="100" cy="100" r="68" className="ring ring-1" />
        {/* Mid ring — 4 arcs, CCW */}
        <circle cx="100" cy="100" r="57" className="ring ring-2" />
        {/* Inner ring — 2 arcs, CW */}
        <circle cx="100" cy="100" r="46" className="ring ring-3" />
      </svg>

      {/* Logo centred inside the rings */}
      <div className="loading-logo-wrap">
        <img src="/ST_Logo.png" alt="St. Lawrence Academy" className="loading-logo" />
      </div>

    </div>

    <p className="loading-school-name">St. Lawrence Academy</p>
    <span className="loading-dots">
      <span></span><span></span><span></span>
    </span>
  </div>
);

export default Loading;
