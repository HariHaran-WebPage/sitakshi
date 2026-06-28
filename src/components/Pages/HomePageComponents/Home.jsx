import React, { useState, useEffect, useRef } from 'react';
import Hero1 from '../../../assets/images/Hero1.png';
import Hero2 from '../../../assets/images/Hero2.png';
import Hero3 from '../../../assets/images/Hero3.png';
import '../../../Style/HomeCss/HomePage.css';

const slides = [
  {
    img: Hero1,
    alt: 'Web Development – Desktop',
    label: 'Web Development',
    icon: 'ti-world',
    badges: [
      { id: 'b1', position: 'top-right',    icon: 'ti-bolt',         value: 48,   suffix: 'hr', label: 'Avg. Turnaround',   color: 'green'  },
      { id: 'b2', position: 'top-left',     icon: 'ti-layout-grid',  value: 120,  suffix: '+',  label: 'Websites Built',    color: 'blue'   },
      { id: 'b3', position: 'bottom-right', icon: 'ti-device-mobile',value: 100,  suffix: '%',  label: 'Responsive Design', color: 'purple' },
      { id: 'b4', position: 'bottom-left',  icon: 'ti-shield-lock',  value: 99,   suffix: '%',  label: 'Secure Uptime',     color: 'teal'   },
    ],
  },
  {
    img: Hero2,
    alt: 'Mobile App – Phone',
    label: 'Mobile Apps',
    icon: 'ti-device-mobile',
    badges: [
      { id: 'b1', position: 'top-right',    icon: 'ti-mood-happy',   value: 98,   suffix: '%',   label: 'Client Satisfaction', color: 'green'  },
      { id: 'b2', position: 'top-left',     icon: 'ti-rocket',       value: 50,   suffix: '+',   label: 'Apps Launched',       color: 'blue'   },
      { id: 'b3', position: 'bottom-right', icon: 'ti-star',         value: 4.9,  suffix: '★',   label: '120+ Reviews',        color: 'amber'  },
      { id: 'b4', position: 'bottom-left',  icon: 'ti-brand-apple',  value: 2,    suffix: ' OS', label: 'iOS & Android',       color: 'purple' },
    ],
  },
  {
    img: Hero3,
    alt: 'Digital Marketing Dashboard',
    label: 'Digital Marketing',
    icon: 'ti-chart-bar',
    badges: [
      { id: 'b1', position: 'top-right',    icon: 'ti-trending-up',  value: 245,  suffix: '%',  label: 'Revenue Growth',    color: 'green'  },
      { id: 'b2', position: 'top-left',     icon: 'ti-headset',      value: 24,   suffix: '/7', label: 'Support Available', color: 'blue'   },
      { id: 'b3', position: 'bottom-right', icon: 'ti-users',        value: 15,   suffix: '+',  label: 'Tech Experts',      color: 'teal'   },
      { id: 'b4', position: 'bottom-left',  icon: 'ti-chart-pie',    value: 3,    suffix: '×',  label: 'Avg. ROI Growth',   color: 'purple' },
    ],
  },
];

/* ── Count-up hook ── */
function useCountUp(target, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let startTs = null;
    const isDecimal = target % 1 !== 0;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(isDecimal ? parseFloat((e * target).toFixed(1)) : Math.floor(e * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return count;
}

const colorMap = {
  green:  { bg: '#ffffff', border: '#6fcf97', icon: '#00a34d', text: '#007a39' },
  blue:   { bg: '#ffffff', border: '#93b8f5', icon: '#2f80ed', text: '#1a5fc8' },
  purple: { bg: '#ffffff', border: '#b5a8f5', icon: '#7c5cbf', text: '#5a3fa0' },
  teal:   { bg: '#ffffff', border: '#5fcfb8', icon: '#0d9e85', text: '#077a67' },
  amber:  { bg: '#ffffff', border: '#f5c842', icon: '#d4a017', text: '#a07810' },
};

/* Badge with count-up */
const BadgeItem = ({ badge, visible }) => {
  const count = useCountUp(badge.value, 1100, visible);
  const c = colorMap[badge.color] || colorMap.green;
  return (
    <div
      className={`hero-badge hero-badge--${badge.position} ${visible ? 'hero-badge--visible' : 'hero-badge--hidden'}`}
      style={{ '--badge-bg': c.bg, '--badge-border': c.border, '--badge-icon': c.icon, '--badge-text': c.text }}
    >
      <div className="hero-badge__icon-wrap">
        <i className={`ti ${badge.icon}`} aria-hidden="true" />
      </div>
      <div className="hero-badge__body">
        <strong className="hero-badge__value">{count}{badge.suffix}</strong>
        <span className="hero-badge__label">{badge.label}</span>
      </div>
    </div>
  );
};

/* ── Updated stat items ── */
const statItems = [
  { num: 120, suffix: '+',  label: 'Projects Delivered',  duration: 1200 },
  { num: 98,  suffix: '%',  label: 'Client Satisfaction', duration: 1400 },
  { num: 15,  suffix: '+',  label: 'Technology Experts',  duration: 1000 },
  { num: 24,  suffix: '/7', label: 'Technical Support',   duration: 1300 },
];

const StatItem = ({ num, suffix, label, duration, active }) => {
  const count = useCountUp(num, duration, active);
  return (
    <div className="hero-stats__item">
      <strong className="hero-stats__value">{count}{suffix}</strong>
      <span className="hero-stats__label">{label}</span>
    </div>
  );
};

/* ── Main component ── */
const HomePage = () => {
  const [current, setCurrent]             = useState(0);
  const [animating, setAnimating]         = useState(false);
  const [badgesVisible, setBadgesVisible] = useState(true);
  const [statsActive, setStatsActive]     = useState(false);
  const timerRef = useRef(null);

  /* Trigger left stat count-up shortly after mount */
  useEffect(() => {
    const t = setTimeout(() => setStatsActive(true), 400);
    return () => clearTimeout(t);
  }, []);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setBadgesVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
      setTimeout(() => setBadgesVisible(true), 100);
    }, 380);
  };

  useEffect(() => {
    setBadgesVisible(true);
    timerRef.current = setInterval(() => {
      setBadgesVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTimeout(() => setBadgesVisible(true), 120);
      }, 350);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setBadgesVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTimeout(() => setBadgesVisible(true), 120);
      }, 350);
    }, 4500);
  };

  const handlePrev = () => { goTo((current - 1 + slides.length) % slides.length); resetTimer(); };
  const handleNext = () => { goTo((current + 1) % slides.length); resetTimer(); };
  const handleDot  = (i) => { goTo(i); resetTimer(); };

  return (
    <div className="home">
      <div className="row align-items-center w-100 g-0">

        {/* ── Left Column ── */}
        <div className="col-lg-6">
          <div className="home__content">
            <p className="home__trusted-tag">
              <span className="home__trusted-dot" />
              Trusted Technology Partner for Business Growth
            </p>
            <h1 className="home__heading--cursive">Build, Launch & Scale</h1>
            <h2 className="home__heading--bold">
              Your Business With{' '}
              <span className="home__heading--accent">Digital Excellence.</span>
            </h2>
            <p className="home__description">
              Sitakshi Software Solutions empowers startups, SMEs, and enterprises with innovative
              web development, mobile applications, AI-powered solutions, and digital marketing
              services — delivering scalable, high-performance technology that drives measurable growth.
            </p>
            <div className="home__cta-group">
              <button className="btn home__cta-btn">Get Free Consultation →</button>
              <button className="btn home__cta-btn-outline">Explore Services →</button>
            </div>

            {/* Stats row with count-up */}
            <div className="hero-stats">
              {statItems.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="hero-stats__divider" />}
                  <StatItem {...s} active={statsActive} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="col-lg-6">
          <div className="hero-slider">

            {/* Floating Badges */}
            {slides[current].badges.map((b) => (
              <BadgeItem key={`${current}-${b.id}`} badge={b} visible={badgesVisible} />
            ))}

            {/* Image + label overlaid */}
            <div className="hero-slider__track">
              <div className="hero-slider__img-wrap">
                <img
                  key={current}
                  src={slides[current].img}
                  alt={slides[current].alt}
                  className={`hero-slider__img hero-slider__img--heartbeat ${animating ? 'hero-slider__img--fade-out' : 'hero-slider__img--fade-in'}`}
                />
                <div className="hero-slider__label">
                  <i className={`ti ${slides[current].icon}`} aria-hidden="true" />
                  {slides[current].label}
                  <span className="hero-slider__label-dot" />
                </div>
              </div>
            </div>

            <button className="hero-slider__arrow hero-slider__arrow--prev" onClick={handlePrev} aria-label="Previous slide">‹</button>
            <button className="hero-slider__arrow hero-slider__arrow--next" onClick={handleNext} aria-label="Next slide">›</button>

            <div className="hero-slider__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-slider__dot ${i === current ? 'hero-slider__dot--active' : ''}`}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;