import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../../../Style/HomeCss/ClientsSection.css';

/* ─── Data ─────────────────────────────────────────────── */
const stats = [
  { id: 'n1', target: 120, suffix: '+', label: 'Projects delivered' },
  { id: 'n2', target: 98,  suffix: '%', label: 'Client retention'  },
  { id: 'n3', target: 5,   suffix: '★', label: 'Avg rating'        },
  { id: 'n4', target: 12,  suffix: '+', label: 'Countries served'  },
];

const logos = [
  { name: 'TechCorp',   color: '#6366f1', icon: 'ti-cpu'         },
  { name: 'FinEdge',    color: '#0ea5e9', icon: 'ti-chart-line'   },
  { name: 'MediSoft',   color: '#10b981', icon: 'ti-heart-rate-monitor' },
  { name: 'RetailPro',  color: '#f59e0b', icon: 'ti-shopping-bag' },
  { name: 'CloudBase',  color: '#8b5cf6', icon: 'ti-cloud'        },
  { name: 'NexaAI',     color: '#ec4899', icon: 'ti-brain'        },
  { name: 'DataSync',   color: '#14b8a6', icon: 'ti-database'     },
  { name: 'BuildIO',    color: '#f97316', icon: 'ti-settings-2'   },
  { name: 'StreamNet',  color: '#3b82f6', icon: 'ti-antenna'      },
  { name: 'VaultPay',   color: '#a855f7', icon: 'ti-shield-check' },
];

const reviews = [
  {
    quote: 'Delivered our React platform two weeks ahead of schedule. Code quality was exceptional — best engineering partner we have worked with in years.',
    name: 'Arjun Rao',
    role: 'CTO',
    company: 'TechCorp',
    domain: 'techcorp.io',
    companyColor: '#6366f1',
    companyIcon: 'ti-cpu',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=600&q=80',
    initials: 'AR',
    grad: ['#6366f1', '#818cf8'],
  },
  {
    quote: 'Our AI integration reduced document processing time by 60%. They truly understand the business problem — not just the technology behind it.',
    name: 'Priya Singh',
    role: 'COO',
    company: 'MediSoft',
    domain: 'medisoft.health',
    companyColor: '#10b981',
    companyIcon: 'ti-heart-rate-monitor',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    initials: 'PS',
    grad: ['#10b981', '#34d399'],
  },
  {
    quote: 'Rebuilt our e-commerce with Next.js — 3× faster page loads and a 45% uplift in conversions. ROI was visible within the first month.',
    name: 'Kiran Mehta',
    role: 'Founder',
    company: 'RetailPro',
    domain: 'retailpro.com',
    companyColor: '#f59e0b',
    companyIcon: 'ti-shopping-bag',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    initials: 'KM',
    grad: ['#f59e0b', '#fbbf24'],
  },
  {
    quote: 'Node.js backend handles 50k concurrent users without breaking a sweat. Scalability promised, scalability delivered — on time and on budget.',
    name: 'Divya Nair',
    role: 'VP Engineering',
    company: 'CloudBase',
    domain: 'cloudbase.dev',
    companyColor: '#8b5cf6',
    companyIcon: 'ti-cloud',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    initials: 'DN',
    grad: ['#8b5cf6', '#a78bfa'],
  },
  {
    quote: 'From UI design to MongoDB optimisation, every layer was handled with care. Our dashboard went live in 6 weeks — impressive by any standard.',
    name: 'Ravi Kumar',
    role: 'Product Manager',
    company: 'FinEdge',
    domain: 'finedge.io',
    companyColor: '#0ea5e9',
    companyIcon: 'ti-chart-line',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    initials: 'RK',
    grad: ['#0ea5e9', '#38bdf8'],
  },
];

/* ─── Animated counter ──────────────────────────────────── */
function useCounter(target, active, suffix = '', duration = 1400) {
  const [display, setDisplay] = useState('0' + suffix);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * target) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, suffix, duration]);
  return display;
}

const AnimStat = ({ stat, active }) => {
  const val = useCounter(stat.target, active, stat.suffix);
  return (
    <div className="cs-stat" role="listitem">
      <span className="cs-stat-num">{val}</span>
      <span className="cs-stat-lbl">{stat.label}</span>
    </div>
  );
};

const Stars = ({ size = 14 }) => (
  <div className="cs-stars" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

/* ─── Main component ────────────────────────────────────── */
const ClientsSection = () => {
  const [current, setCurrent]       = useState(0);
  const [animKey, setAnimKey]       = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [inView, setInView]         = useState(false);

  const sectionRef = useRef(null);
  const statsRef   = useRef(null);
  const autoRef    = useRef(null);

  /* IntersectionObserver */
  useEffect(() => {
    const obs1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs1.disconnect(); } },
      { threshold: 0.1 }
    );
    const obs2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs2.disconnect(); } },
      { threshold: 0.05 }
    );
    if (statsRef.current)   obs1.observe(statsRef.current);
    if (sectionRef.current) obs2.observe(sectionRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  /* Auto-slide */
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
      setAnimKey(k => k + 1);
    }, 5000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const goTo = (idx) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
    startAuto();
  };

  const prev = () => goTo((current - 1 + reviews.length) % reviews.length);
  const next = () => goTo((current + 1) % reviews.length);

  const r = reviews[current];
  const doubledLogos = [...logos, ...logos];

  return (
    <section
      className="cs-section"
      ref={sectionRef}
      aria-labelledby="cs-heading"
      onMouseEnter={() => clearInterval(autoRef.current)}
      onMouseLeave={startAuto}
    >
      {/* Background */}
      <div className="cs-bg" aria-hidden="true">
        <div className="cs-bg-grid" />
        <div className="cs-bg-orb cs-bg-orb-1" />
        <div className="cs-bg-orb cs-bg-orb-2" />
        <div className="cs-bg-top-line" />
      </div>

      <div className="container cs-container">

        {/* ── Header ── */}
        <header className={`cs-header ${inView ? 'cs-in' : ''}`}>
          <p className="cs-eyebrow">Client success</p>
          <h2 className="cs-heading" id="cs-heading">
            What our clients say <span className="cs-accent-text">about us</span>
          </h2>
          <p className="cs-sub">
            Hear directly from the companies we&apos;ve helped scale and grow with modern technology.
          </p>
        </header>

        {/* ── Stats ── */}
        <div ref={statsRef} className={`cs-stats ${inView ? 'cs-in' : ''}`} role="list">
          {stats.map((s) => (
            <AnimStat key={s.id} stat={s} active={statsVisible} />
          ))}
        </div>

        {/* ── Logo marquee (animated) ── */}
        <div className={`cs-marquee-wrap ${inView ? 'cs-in' : ''}`} aria-label="Our clients">
          <div className="cs-marquee-track">
            {doubledLogos.map((logo, i) => (
              <div className="cs-logo-pill" key={i} aria-hidden={i >= logos.length}>
                <span
                  className="cs-logo-icon-wrap"
                  style={{ background: logo.color + '18', borderColor: logo.color + '30' }}
                >
                  <i
                    className={`ti ${logo.icon} cs-logo-icon`}
                    style={{ color: logo.color }}
                    aria-hidden="true"
                  />
                </span>
                <span className="cs-logo-name">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonial slider ── */}
        <div className={`cs-slider-wrap ${inView ? 'cs-in' : ''}`}>

          {/* Slide card */}
          <div className="cs-slide-card" key={animKey}>

            {/* Left: human photo */}
            <div className="cs-photo-col">
              <img
                src={r.photo}
                alt={r.name}
                className="cs-photo"
                loading="lazy"
              />
              <div className="cs-photo-overlay" style={{ background: `linear-gradient(160deg, ${r.companyColor}22 0%, transparent 55%)` }} />
              {/* Floating company badge on photo */}
              <div className="cs-photo-badge">
                <span
                  className="cs-badge-icon-wrap"
                  style={{ background: r.companyColor + '22', borderColor: r.companyColor + '44' }}
                >
                  <i className={`ti ${r.companyIcon}`} style={{ color: r.companyColor }} aria-hidden="true" />
                </span>
                <div>
                  <p className="cs-badge-company">{r.company}</p>
                  <p className="cs-badge-domain">{r.domain}</p>
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className="cs-content-col">

              {/* Top row: company badge + nav */}
              <div className="cs-content-top">
                <div className="cs-company-pill" style={{ borderColor: r.companyColor + '40' }}>
                  <span
                    className="cs-company-dot"
                    style={{ background: r.companyColor }}
                  />
                  <span className="cs-company-name">{r.company}</span>
                  <span className="cs-company-sep">·</span>
                  <span className="cs-company-domain">{r.domain}</span>
                </div>
                <div className="cs-nav">
                  <button className="cs-nav-btn" onClick={prev} aria-label="Previous review">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="cs-nav-counter">{current + 1} / {reviews.length}</span>
                  <button className="cs-nav-btn" onClick={next} aria-label="Next review">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Stars */}
              <Stars />

              {/* Quote */}
              <blockquote className="cs-quote-block" itemScope itemType="https://schema.org/Review">
                <span className="cs-qmark" aria-hidden="true">"</span>
                <p className="cs-quote-text" itemProp="reviewBody">{r.quote}</p>
              </blockquote>

              {/* Author */}
              <footer className="cs-author-row" itemScope itemType="https://schema.org/Person">
                <div
                  className="cs-avatar"
                  style={{ background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})` }}
                  aria-hidden="true"
                >
                  {r.initials}
                </div>
                <div className="cs-author-info">
                  <span className="cs-author-name" itemProp="name">{r.name}</span>
                  <span className="cs-author-role">
                    <span itemProp="jobTitle">{r.role}</span>
                    {' · '}
                    <span itemProp="worksFor">{r.company}</span>
                  </span>
                </div>
                <div className="cs-verified" aria-label="Verified review">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified
                </div>
              </footer>

              {/* Thumbnail strip */}
              <div className="cs-thumbs" role="list" aria-label="Select reviewer">
                {reviews.map((rev, i) => (
                  <button
                    key={i}
                    className={`cs-thumb-btn ${i === current ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`View review by ${rev.name}`}
                    role="listitem"
                  >
                    <img
                      src={rev.photo}
                      alt={rev.name}
                      className="cs-thumb-img"
                      loading="lazy"
                    />
                    {i === current && (
                      <span
                        className="cs-thumb-ring"
                        style={{ borderColor: rev.companyColor }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="cs-progress-wrap" aria-hidden="true">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`cs-progress-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                style={i === current ? { background: r.companyColor } : {}}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`cs-cta ${inView ? 'cs-in' : ''}`}>
          <div className="cs-cta-left">
            <div className="cs-cta-faces" aria-hidden="true">
              {reviews.slice(0, 4).map((rev, i) => (
                <div
                  key={i}
                  className="cs-cta-face"
                  style={{
                    background: `linear-gradient(135deg, ${rev.grad[0]}, ${rev.grad[1]})`,
                    left: i * 22,
                    zIndex: 4 - i,
                  }}
                >
                  {rev.initials}
                </div>
              ))}
            </div>
            <div>
              <p className="cs-cta-text">Ready to become our next success story?</p>
              <p className="cs-cta-sub">Join 120+ companies who scaled with us</p>
            </div>
          </div>
          <a href="/contact" className="cs-cta-btn" aria-label="Start a project with us">
            Start your project
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;