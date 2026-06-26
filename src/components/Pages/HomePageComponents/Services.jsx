import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    id: 1, tag: 'AI & ML', title: 'Artificial Intelligence',
    desc: 'Smart AI solutions that automate processes, surface deep insights, and scale effortlessly with your business goals.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="10" y="10" width="28" height="28" rx="6" stroke="#00a34d" strokeWidth="2.2"/>
        <circle cx="24" cy="24" r="6" stroke="#00a34d" strokeWidth="2.2"/>
        <line x1="24" y1="10" x2="24" y2="18" stroke="#00a34d" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="30" x2="24" y2="38" stroke="#00a34d" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="24" x2="18" y2="24" stroke="#00a34d" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="24" x2="38" y2="24" stroke="#00a34d" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="14" x2="20" y2="20" stroke="#00c45e" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="28" y1="28" x2="34" y2="34" stroke="#00c45e" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="34" y1="14" x2="28" y2="20" stroke="#00c45e" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="14" y1="34" x2="20" y2="28" stroke="#00c45e" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2, tag: 'Creative', title: 'Product Design',
    desc: 'From wireframes to polished interfaces — user-centered design that feels intuitive from the very first click.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="12" cy="36" r="4" stroke="#00a34d" strokeWidth="2.2"/>
        <circle cx="36" cy="12" r="4" stroke="#008040" strokeWidth="2.2"/>
        <circle cx="36" cy="36" r="4" stroke="#00c45e" strokeWidth="2.2"/>
        <path d="M16 33 Q24 20 32 15" stroke="#00a34d" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M32 33 L32 19" stroke="#00c45e" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="26" cy="24" r="2.5" fill="#00a34d"/>
      </svg>
    ),
  },
  {
    id: 3, tag: 'Engineering', title: 'Web Development',
    desc: 'Scalable, performant web apps built with modern frameworks and production-grade engineering practices.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="4" stroke="#00a34d" strokeWidth="2.2"/>
        <path d="M17 24 L22 29 L31 20" stroke="#00a34d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="18" x2="40" y2="18" stroke="#00c45e" strokeWidth="1.5"/>
        <circle cx="13" cy="15" r="1.5" fill="#00a34d"/>
        <circle cx="18" cy="15" r="1.5" fill="#00c45e"/>
        <circle cx="23" cy="15" r="1.5" fill="#e6f7ee"/>
      </svg>
    ),
  },
  {
    id: 4, tag: 'Growth', title: 'Digital Marketing',
    desc: 'SEO, paid ads, and social strategies that create measurable growth and drive qualified traffic consistently.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="28" width="7" height="12" rx="2" fill="#00c45e" opacity="0.7"/>
        <rect x="20" y="20" width="7" height="20" rx="2" fill="#00a34d" opacity="0.85"/>
        <rect x="32" y="12" width="7" height="28" rx="2" fill="#008040"/>
        <polyline points="11.5,26 23.5,18 35.5,10" stroke="#00c45e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="11.5" cy="26" r="2.5" fill="#00c45e"/>
        <circle cx="23.5" cy="18" r="2.5" fill="#00c45e"/>
        <circle cx="35.5" cy="10" r="2.5" fill="#00c45e"/>
      </svg>
    ),
  },
  {
    id: 5, tag: 'Experience', title: 'UI / UX Design',
    desc: 'Research-driven interfaces that reduce friction, boost engagement and delight users at every touchpoint.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="14" height="14" rx="3" stroke="#00a34d" strokeWidth="2.2"/>
        <rect x="26" y="8" width="14" height="14" rx="3" stroke="#00c45e" strokeWidth="2.2"/>
        <rect x="8" y="26" width="14" height="14" rx="3" stroke="#00c45e" strokeWidth="2.2"/>
        <rect x="26" y="26" width="14" height="14" rx="3" stroke="#00a34d" strokeWidth="2.2"/>
        <circle cx="15" cy="15" r="3" fill="#e6f7ee"/>
        <circle cx="33" cy="15" r="3" fill="#00a34d" opacity="0.4"/>
        <circle cx="15" cy="33" r="3" fill="#00a34d" opacity="0.4"/>
        <circle cx="33" cy="33" r="3" fill="#e6f7ee"/>
      </svg>
    ),
  },
];

// Manual curve offsets per card (translateX in px, positive = push right)
// Shape: 1=down(0), 2=little up(14), 3=most up(28), 4=down(6), 5=down(0)
const CURVE_OFFSETS = [0, 14, 28, 6, 0];

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

const styles = `
  :root {
    --primary:       #00a34d;
    --primary-dark:  #008040;
    --primary-light: #e6f7ee;
    --text:          #2a2a2a;
    --text-muted:    #6c757d;
    --text-faint:    #a0a8b0;
    --border:        #e9ecef;
    --white:         #ffffff;
  }

  .svc-section { width: 100%; position: relative; }

  .svc-sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: var(--white);
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  .svc-bg-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(0,163,77,0.13) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.45;
    pointer-events: none; z-index: 0;
  }

  .svc-inner {
    max-width: 1440px;
    width: 94%;
    margin: 0 auto;
    padding: 0 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 1;
    height: 100%;
  }

  .svc-left { display: flex; flex-direction: column; gap: 28px; }

  .svc-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.13em;
    text-transform: uppercase; color: var(--primary);
  }
  .svc-eyebrow-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--primary); flex-shrink: 0;
  }

  .svc-heading {
    margin: 0;
    font-size: clamp(34px, 3.4vw, 60px);
    font-weight: 800; line-height: 1.15;
    color: var(--text); letter-spacing: -0.03em;
  }
  .svc-heading em {
    display: block; font-style: normal;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-top: 6px;
  }

  .svc-body-text {
    margin: 0; font-size: 15px; line-height: 1.85; color: var(--text-muted);
  }

  .svc-stats { display: flex; align-items: center; gap: 24px; padding: 16px 0 4px; }
  .svc-stat  { display: flex; flex-direction: column; gap: 4px; }
  .svc-stat-value {
    font-size: 36px; font-weight: 800; letter-spacing: -0.02em; line-height: 1;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .svc-stat-label {
    font-size: 10px; font-weight: 700; color: var(--text-faint);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .svc-stat-divider {
    width: 1.5px; height: 44px;
    background: linear-gradient(180deg, var(--primary), transparent); flex-shrink: 0;
  }

  .svc-cta-link {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 14px; font-weight: 700; color: var(--primary);
    text-decoration: none; padding: 13px 26px;
    background: var(--primary-light); border-radius: 50px;
    width: fit-content; transition: all 0.3s ease;
  }
  .svc-cta-link:hover {
    background: var(--primary); color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,163,77,0.22);
  }
  .svc-cta-link svg { flex-shrink: 0; transition: transform 0.3s ease; }
  .svc-cta-link:hover svg { transform: translate(3px,-2px); }

  /* ── RIGHT: curved cards ── */
  .svc-cards-outer {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .svc-cards-track {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 12px 0;
  }

  .svc-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    transition:
      transform    0.5s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.35s ease,
      box-shadow   0.35s ease;
    will-change: transform;
  }

  .svc-card--active {
    border-color: var(--primary);
    box-shadow: 0 16px 48px rgba(0,163,77,0.18), 0 2px 10px rgba(0,163,77,0.10);
    z-index: 10;
  }

  .svc-card-num {
    position: absolute; top: 11px; right: 13px;
    font-size: 10px; font-weight: 800;
    letter-spacing: 0.08em; color: var(--primary); opacity: 0.3;
  }

  .svc-card-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; background: var(--primary-light);
    transition: background 0.35s ease;
  }
  .svc-card-icon svg { width: 30px; height: 30px; }
  .svc-card--active .svc-card-icon { background: var(--primary); }
  .svc-card--active .svc-card-icon svg { filter: brightness(0) invert(1); }

  .svc-card-body {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; gap: 5px;
  }

  .svc-card-title {
    font-size: 15px; font-weight: 800;
    color: var(--text); letter-spacing: -0.01em; line-height: 1.3;
  }

  .svc-card-desc {
    font-size: 12.5px; line-height: 1.7; color: var(--text-muted);
  }

  .svc-card-tag {
    display: inline-block; align-self: flex-start;
    padding: 3px 10px; border-radius: 20px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
    background: var(--primary-light); color: var(--primary);
    margin-top: 2px;
  }

  .svc-card-arrow {
    width: 36px; height: 36px; border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--white);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-faint); flex-shrink: 0; cursor: pointer;
    transition: all 0.3s ease;
  }
  .svc-card--active .svc-card-arrow {
    background: var(--primary); border-color: var(--primary); color: var(--white);
  }

  @media (max-width: 1200px) {
    .svc-inner { gap: 44px; padding: 0 24px; }
  }
  @media (max-width: 1024px) {
    .svc-inner { gap: 32px; padding: 0 20px; }
    .svc-heading { font-size: clamp(28px, 3vw, 46px); }
    .svc-stat-value { font-size: 30px; }
    .svc-card { padding: 13px 16px; gap: 13px; }
    .svc-card-icon { width: 46px; height: 46px; }
    .svc-card-icon svg { width: 26px; height: 26px; }
    .svc-card-title { font-size: 14px; }
    .svc-card-desc { font-size: 12px; }
    .svc-cards-track { gap: 7px; }
  }
  @media (max-width: 900px) {
    .svc-section { height: auto !important; }
    .svc-sticky { position: relative; height: auto; padding: 60px 0 72px; }
    .svc-inner {
      grid-template-columns: 1fr;
      gap: 36px; padding: 0 20px;
      height: auto; align-items: start;
    }
    .svc-left { text-align: center; align-items: center; }
    .svc-body-text { max-width: 560px; }
    .svc-stats { justify-content: center; }
  }
  @media (max-width: 640px) {
    .svc-sticky { padding: 48px 0 60px; }
    .svc-inner { padding: 0 14px; gap: 28px; }
    .svc-heading { font-size: clamp(26px, 7vw, 38px); }
    .svc-body-text { font-size: 14px; }
    .svc-stat-value { font-size: 26px; }
    .svc-stats { gap: 14px; flex-wrap: wrap; padding: 12px 0 0; }
    .svc-stat-divider { height: 36px; }
    .svc-eyebrow { font-size: 11px; }
    .svc-cta-link { font-size: 13px; padding: 11px 20px; }
    .svc-card { padding: 12px 14px; gap: 12px; border-radius: 14px; }
    .svc-card-icon { width: 42px; height: 42px; border-radius: 11px; }
    .svc-card-icon svg { width: 24px; height: 24px; }
    .svc-card-title { font-size: 13px; }
    .svc-card-desc { font-size: 11.5px; }
    .svc-card-arrow { width: 32px; height: 32px; border-radius: 8px; }
    .svc-cards-track { gap: 6px; }
  }
  @media (max-width: 400px) {
    .svc-inner { padding: 0 10px; gap: 22px; }
    .svc-heading { font-size: clamp(22px, 8.5vw, 32px); }
    .svc-stat-value { font-size: 22px; }
    .svc-card { padding: 10px 12px; gap: 10px; border-radius: 12px; }
    .svc-card-icon { width: 38px; height: 38px; }
    .svc-card-icon svg { width: 21px; height: 21px; }
    .svc-card-title { font-size: 12.5px; }
    .svc-card-desc { font-size: 11px; line-height: 1.6; }
    .svc-card-arrow { width: 28px; height: 28px; }
    .svc-cards-track { gap: 5px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .svc-card { transition: border-color 0.2s ease; }
  }
`;

const ServicesSection = () => {
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);

  const sectionRef = useRef(null);
  const statsRef   = useRef(null);
  const cardRefs   = useRef([]);

  const c200 = useCountUp(200, 1800, statsStarted);
  const c98  = useCountUp(98,  1600, statsStarted);
  const c12  = useCountUp(12,  1400, statsStarted);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll-driven active card (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect     = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const vh       = window.innerHeight;
      const rawIdx   = scrolled / vh;
      const clamped  = Math.max(0, Math.min(SERVICES.length - 1, rawIdx));
      setActiveIndex(Math.round(clamped));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Mobile: highlight card as it scrolls into view
  useEffect(() => {
    if (!isMobile) return;
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveIndex(i); },
        { threshold: 0.6 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [isMobile]);

  const sectionStyle = isMobile
    ? {}
    : { height: `${(SERVICES.length + 1) * 100}vh` };

  // Active card pops out furthest right (max offset + extra boost)
  const ACTIVE_OFFSET = Math.max(...CURVE_OFFSETS) + 22; // 28 + 22 = 50px

  return (
    <>
      <style>{styles}</style>
      <section className="svc-section" ref={sectionRef} style={sectionStyle}>
        <div className="svc-sticky">
          <div className="svc-bg-dots" />

          <div className="svc-inner">

            {/* LEFT */}
            <div className="svc-left">
              <div className="svc-eyebrow">
                <span className="svc-eyebrow-dot" />
                What We Do
              </div>
              <h2 className="svc-heading">
                How Can We
                <em>Help You!</em>
              </h2>
              <p className="svc-body-text">
                Our custom software design and development teams design, build, test,
                and deliver products that fit your vision and market demand.
              </p>
              <div className="svc-stats" ref={statsRef}>
                <div className="svc-stat">
                  <div className="svc-stat-value">{c200}+</div>
                  <div className="svc-stat-label">Projects Done</div>
                </div>
                <div className="svc-stat-divider" />
                <div className="svc-stat">
                  <div className="svc-stat-value">{c98}%</div>
                  <div className="svc-stat-label">Satisfaction</div>
                </div>
                <div className="svc-stat-divider" />
                <div className="svc-stat">
                  <div className="svc-stat-value">{c12}+</div>
                  <div className="svc-stat-label">Years Active</div>
                </div>
              </div>
              <a href="#contact" className="svc-cta-link">
                See What We Do
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>

            {/* RIGHT — custom wave curve cards */}
            <div className="svc-cards-outer" role="region" aria-label="Services">
              <div className="svc-cards-track">
                {SERVICES.map((s, i) => {
                  const isActive   = i === activeIndex;
                  const translateX = isActive ? ACTIVE_OFFSET : CURVE_OFFSETS[i];
                  const translateY = isActive ? -6 : 0;
                  const scale      = isActive ? 1.022 : 1;

                  return (
                    <div
                      key={s.id}
                      ref={el => cardRefs.current[i] = el}
                      className={`svc-card${isActive ? ' svc-card--active' : ''}`}
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                      }}
                    >
                      <span className="svc-card-num">0{i + 1}</span>

                      <div className="svc-card-icon">{s.icon}</div>

                      <div className="svc-card-body">
                        <div className="svc-card-title">{s.title}</div>
                        <div className="svc-card-desc">{s.desc}</div>
                        <span className="svc-card-tag">{s.tag}</span>
                      </div>

                      <button
                        className="svc-card-arrow"
                        aria-label={`Learn more about ${s.title}`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10"/>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;