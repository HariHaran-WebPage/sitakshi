import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    id: 1, tag: 'AI & ML', title: 'Artificial Intelligence',
    desc: 'Smart AI solutions that automate processes, surface deep insights, and scale effortlessly with your business goals.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="10" y="10" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.2"/>
        <line x1="24" y1="10" x2="24" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="30" x2="24" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="14" x2="20" y2="20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
        <line x1="28" y1="28" x2="34" y2="34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
        <line x1="34" y1="14" x2="28" y2="20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
        <line x1="14" y1="34" x2="20" y2="28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 2, tag: 'Creative', title: 'Product Design',
    desc: 'From wireframes to polished interfaces — user-centered design that feels intuitive from the very first click.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2.2" opacity="0.6"/>
        <path d="M16 33 Q24 20 32 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M32 33 L32 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="26" cy="24" r="2.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 3, tag: 'Engineering', title: 'Web Development',
    desc: 'Scalable, performant web apps built with modern frameworks and production-grade engineering practices.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M17 24 L22 29 L31 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="13" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="23" cy="15" r="1.5" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 4, tag: 'Growth', title: 'Digital Marketing',
    desc: 'SEO, paid ads, and social strategies that create measurable growth and drive qualified traffic consistently.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="28" width="7" height="12" rx="2" fill="currentColor" opacity="0.4"/>
        <rect x="20" y="20" width="7" height="20" rx="2" fill="currentColor" opacity="0.65"/>
        <rect x="32" y="12" width="7" height="28" rx="2" fill="currentColor"/>
        <polyline points="11.5,26 23.5,18 35.5,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <circle cx="11.5" cy="26" r="2.5" fill="currentColor" opacity="0.7"/>
        <circle cx="23.5" cy="18" r="2.5" fill="currentColor" opacity="0.7"/>
        <circle cx="35.5" cy="10" r="2.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 5, tag: 'Experience', title: 'UI / UX Design',
    desc: 'Research-driven interfaces that reduce friction, boost engagement and delight users at every touchpoint.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <rect x="26" y="8" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.2" opacity="0.6"/>
        <rect x="8" y="26" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.2" opacity="0.6"/>
        <rect x="26" y="26" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.25"/>
        <circle cx="33" cy="15" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="15" cy="33" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="33" cy="33" r="3" fill="currentColor" opacity="0.25"/>
      </svg>
    ),
  },
];

const CURVE_OFFSETS = [0, 12, 22, 8, 0];
const ACTIVE_OFFSET = 36;

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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --p:        #00a34d;
    --p-dark:   #007a39;
    --p-deep:   #004d25;
    --p-light:  rgba(0,163,77,0.12);
    --p-glow:   rgba(0,163,77,0.25);
    --white:    #ffffff;
    --text:     #0f1a14;
    --muted:    #4a5c51;
    --faint:    #8aa894;
    --border:   rgba(0,163,77,0.18);
    --card-bg:  rgba(255,255,255,0.82);
  }

  /* ═══ SECTION ═══ */
  .svc-section {
    width: 100%;
    position: relative;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  /* ═══ STICKY PANEL — full rich background ═══ */
  .svc-sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    overflow-y: visible;

    /* Layered background: deep green → mid → light with mesh */
    background:
      radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,163,77,0.13) 0%, transparent 70%),
      radial-gradient(ellipse 50% 80% at 10% 20%, rgba(0,77,37,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 40% 50% at 50% 90%, rgba(0,122,57,0.10) 0%, transparent 60%),
      linear-gradient(145deg, #f0faf4 0%, #e8f7ee 35%, #f5fcf7 65%, #edf8f2 100%);
  }

  /* Mesh grid overlay */
  .svc-bg-mesh {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,163,77,0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,163,77,0.055) 1px, transparent 1px);
    background-size: 44px 44px;
    pointer-events: none;
    z-index: 0;
  }

  /* Floating orbs for depth */
  .svc-bg-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(60px);
  }
  .svc-bg-orb--1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(0,163,77,0.14) 0%, transparent 70%);
    top: -80px; right: 10%;
  }
  .svc-bg-orb--2 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(0,77,37,0.12) 0%, transparent 70%);
    bottom: -60px; left: 5%;
  }
  .svc-bg-orb--3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(0,196,94,0.10) 0%, transparent 70%);
    top: 40%; left: 42%;
  }

  /* ═══ INNER GRID ═══ */
  .svc-inner {
    max-width: 1440px;
    width: 94%;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 1;
    height: 100%;
  }

  /* ═══ LEFT ═══ */
  .svc-left {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .svc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--p);
    background: rgba(0,163,77,0.10);
    border: 1px solid rgba(0,163,77,0.22);
    padding: 6px 14px;
    border-radius: 30px;
    width: fit-content;
  }
  .svc-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--p);
    flex-shrink: 0;
    animation: pulse-green 2s ease-in-out infinite;
  }
  @keyframes pulse-green {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,163,77,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(0,163,77,0); }
  }

  .svc-heading {
    margin: 0;
    font-size: clamp(30px, 3.2vw, 54px);
    font-weight: 800;
    line-height: 1.14;
    color: var(--text);
    letter-spacing: -0.035em;
  }
  .svc-heading em {
    display: block;
    font-style: normal;
    background: linear-gradient(135deg, #00c45e 0%, #00a34d 45%, #007a39 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-top: 4px;
  }

  .svc-body-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.85;
    color: var(--muted);
    max-width: 440px;
  }

  /* ═══ STATS ═══ */
  .svc-stats {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    background: rgba(255,255,255,0.55);
    border: 1px solid rgba(0,163,77,0.15);
    border-radius: 16px;
    padding: 16px 20px;
    backdrop-filter: blur(8px);
    width: fit-content;
  }
  .svc-stat { display: flex; flex-direction: column; gap: 3px; }
  .svc-stat-value {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
    background: linear-gradient(135deg, #00c45e, #007a39);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .svc-stat-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--faint);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .svc-stat-divider {
    width: 1px; height: 36px;
    background: linear-gradient(180deg, rgba(0,163,77,0.4), transparent);
    flex-shrink: 0;
  }

  /* ═══ CTA ═══ */
  .svc-cta-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 700;
    color: var(--white);
    text-decoration: none;
    padding: 13px 26px;
    background: linear-gradient(135deg, #00c45e, #00a34d, #007a39);
    border-radius: 50px;
    width: fit-content;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0,163,77,0.32);
  }
  .svc-cta-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0,163,77,0.42);
  }
  .svc-cta-link svg { flex-shrink: 0; transition: transform 0.3s ease; }
  .svc-cta-link:hover svg { transform: translate(3px, -2px); }

  /* ═══ CARDS COLUMN ═══ */
  .svc-cards-outer {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: visible;
  }

  .svc-cards-track {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
    justify-content: space-between;
    padding: 4px 8px 4px 0;
    box-sizing: border-box;
  }

  /* ═══ CARD — glassmorphism with green accent ═══ */
  .svc-card {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 18px;
    padding: 14px 18px 14px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
    transition:
      transform    0.5s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.35s ease,
      box-shadow   0.35s ease,
      background   0.35s ease;
    will-change: transform;
    min-width: 0;
    flex-shrink: 0;
    /* Left accent bar */
    overflow: hidden;
    box-shadow:
      0 2px 8px rgba(0,0,0,0.04),
      0 1px 3px rgba(0,0,0,0.03),
      inset 0 1px 0 rgba(255,255,255,0.9);
  }

  /* Left accent strip */
  .svc-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, rgba(0,196,94,0.3), rgba(0,163,77,0.15));
    border-radius: 18px 0 0 18px;
    transition: background 0.35s ease;
  }

  .svc-card--active {
    background: rgba(255,255,255,0.96);
    border-color: rgba(0,163,77,0.35);
    box-shadow:
      0 16px 40px rgba(0,163,77,0.16),
      0 4px 12px rgba(0,163,77,0.10),
      0 1px 3px rgba(0,0,0,0.04),
      inset 0 1px 0 rgba(255,255,255,1);
    z-index: 10;
  }
  .svc-card--active::before {
    background: linear-gradient(180deg, #00c45e, #00a34d, #007a39);
    width: 4px;
  }

  .svc-card-num {
    position: absolute;
    top: 9px; right: 12px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--p);
    opacity: 0.22;
    font-variant-numeric: tabular-nums;
  }
  .svc-card--active .svc-card-num { opacity: 0.45; }

  /* ═══ ICON ═══ */
  .svc-card-icon {
    width: 46px; height: 46px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(0,163,77,0.08);
    border: 1px solid rgba(0,163,77,0.14);
    color: var(--p);
    transition: all 0.35s ease;
  }
  .svc-card-icon svg { width: 25px; height: 25px; }

  .svc-card--active .svc-card-icon {
    background: linear-gradient(135deg, #00c45e, #00a34d);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 14px rgba(0,163,77,0.35);
  }

  /* ═══ BODY ═══ */
  .svc-card-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .svc-card-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.015em;
    line-height: 1.3;
  }
  .svc-card--active .svc-card-title { color: #003d1e; }

  .svc-card-desc {
    font-size: 11.5px;
    line-height: 1.65;
    color: var(--muted);
  }

  .svc-card-tag {
    display: inline-block;
    align-self: flex-start;
    padding: 2px 9px;
    border-radius: 20px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    background: rgba(0,163,77,0.09);
    color: var(--p-dark);
    border: 1px solid rgba(0,163,77,0.16);
    margin-top: 3px;
    transition: all 0.35s ease;
  }
  .svc-card--active .svc-card-tag {
    background: rgba(0,163,77,0.13);
    border-color: rgba(0,163,77,0.28);
  }

  /* ═══ ARROW BUTTON ═══ */
  .svc-card-arrow {
    width: 32px; height: 32px;
    border-radius: 9px;
    border: 1px solid rgba(0,163,77,0.15);
    background: rgba(0,163,77,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--faint);
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .svc-card--active .svc-card-arrow {
    background: linear-gradient(135deg, #00c45e, #00a34d);
    border-color: transparent;
    color: var(--white);
    box-shadow: 0 3px 10px rgba(0,163,77,0.3);
  }

  /* ══════════════════════════════════════
     RESPONSIVE
  ══════════════════════════════════════ */
  @media (min-width: 1281px) {
    .svc-card { padding: 15px 20px 15px 22px; gap: 16px; }
    .svc-card-icon { width: 50px; height: 50px; }
    .svc-card-icon svg { width: 27px; height: 27px; }
    .svc-card-title { font-size: 14.5px; }
    .svc-card-desc  { font-size: 12px; }
  }

  @media (max-width: 1280px) {
    .svc-inner { gap: 44px; padding: 0 32px; }
  }

  @media (max-width: 1100px) {
    .svc-inner { gap: 30px; padding: 0 24px; }
    .svc-heading { font-size: clamp(26px, 2.8vw, 42px); }
    .svc-stat-value { font-size: 24px; }
    .svc-stat-divider { height: 30px; }
    .svc-left { gap: 16px; }
    .svc-body-text { font-size: 14px; line-height: 1.75; }
    .svc-stats { padding: 13px 16px; gap: 16px; }
  }

  /* ── Mobile ── */
  @media (max-width: 900px) {
    .svc-section { height: auto !important; }

    .svc-sticky {
      position: relative;
      height: auto;
      padding: 64px 0 80px;
      overflow: visible;
    }

    .svc-inner {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 0 24px;
      height: auto;
      align-items: start;
    }

    .svc-left { text-align: center; align-items: center; gap: 20px; }
    .svc-body-text { max-width: 560px; }
    .svc-stats { justify-content: center; width: auto; }

    .svc-cards-outer { overflow: visible; height: auto; }
    .svc-cards-track {
      height: auto;
      justify-content: flex-start;
      gap: 10px;
      padding: 0;
    }

    .svc-card { transform: none !important; padding: 13px 16px 13px 18px; gap: 12px; }
    .svc-card-icon { width: 42px; height: 42px; }
    .svc-card-icon svg { width: 22px; height: 22px; }
    .svc-card-title { font-size: 13.5px; }
    .svc-card-desc  { font-size: 11.5px; }
  }

  @media (max-width: 640px) {
    .svc-sticky { padding: 48px 0 60px; }
    .svc-inner { padding: 0 16px; gap: 28px; }
    .svc-heading { font-size: clamp(24px, 7vw, 34px); }
    .svc-body-text { font-size: 13.5px; }
    .svc-stat-value { font-size: 21px; }
    .svc-stats { gap: 12px; padding: 12px 14px; }
    .svc-stat-divider { height: 26px; }
    .svc-card { padding: 11px 13px 11px 15px; gap: 10px; border-radius: 14px; }
    .svc-card-icon { width: 38px; height: 38px; border-radius: 10px; }
    .svc-card-icon svg { width: 20px; height: 20px; }
    .svc-card-title { font-size: 13px; }
    .svc-card-desc { font-size: 11px; }
    .svc-card-arrow { width: 28px; height: 28px; border-radius: 7px; }
    .svc-cards-track { gap: 8px; }
  }

  @media (max-width: 400px) {
    .svc-inner { padding: 0 12px; gap: 20px; }
    .svc-heading { font-size: clamp(21px, 8vw, 28px); }
    .svc-stat-value { font-size: 18px; }
    .svc-card { padding: 9px 11px 9px 13px; gap: 9px; border-radius: 12px; }
    .svc-card-icon { width: 34px; height: 34px; }
    .svc-card-icon svg { width: 18px; height: 18px; }
    .svc-card-title { font-size: 12.5px; }
    .svc-card-desc { font-size: 10.5px; line-height: 1.55; }
    .svc-card-arrow { width: 26px; height: 26px; }
    .svc-cards-track { gap: 6px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .svc-card { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
    .svc-cta-link, .svc-eyebrow-dot { animation: none; transition: none; }
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

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect     = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const vh       = window.innerHeight;
      const clamped  = Math.max(0, Math.min(SERVICES.length - 1, scrolled / vh));
      setActiveIndex(Math.round(clamped));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveIndex(i); },
        { threshold: 0.55, rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [isMobile]);

  const sectionStyle = isMobile
    ? {}
    : { height: `${(SERVICES.length + 1) * 100}vh` };

  return (
    <>
      <style>{styles}</style>
      <section className="svc-section" ref={sectionRef} style={sectionStyle}>
        <div className="svc-sticky">

          {/* Rich layered background elements */}
          <div className="svc-bg-mesh" />
          <div className="svc-bg-orb svc-bg-orb--1" />
          <div className="svc-bg-orb svc-bg-orb--2" />
          <div className="svc-bg-orb svc-bg-orb--3" />

          <div className="svc-inner">

            {/* ── LEFT ── */}
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>

            {/* ── RIGHT: cards ── */}
            <div className="svc-cards-outer" role="region" aria-label="Services">
              <div className="svc-cards-track">
                {SERVICES.map((s, i) => {
                  const isActive   = i === activeIndex;
                  const translateX = isActive ? ACTIVE_OFFSET : CURVE_OFFSETS[i];

                  return (
                    <div
                      key={s.id}
                      ref={el => (cardRefs.current[i] = el)}
                      className={`svc-card${isActive ? ' svc-card--active' : ''}`}
                      aria-current={isActive ? 'true' : undefined}
                      style={{ transform: `translateX(${translateX}px)` }}
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
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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