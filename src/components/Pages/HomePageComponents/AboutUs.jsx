import React, { useEffect, useRef, useState } from 'react';
import '../../../Style/HomeCss/AboutUs.css';
import circle1 from '../../../assets/images/about-1.png';
import circle2 from '../../../assets/images/about-2.png';
import circle3 from '../../../assets/images/about-3.png';
import circle4 from '../../../assets/images/about-4.png';

/* ── SEO JSON-LD ── */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sitakshi',
  url: 'https://www.sitakshi.com',
  foundingDate: '2026',
  description: 'Sitakshi is an all-in-one tech agency offering web design, digital marketing, IT support, and app development for businesses worldwide.',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
  knowsAbout: ['Web Design', 'Digital Marketing', 'IT Support', 'App Development', 'SEO', 'Brand Strategy'],
  sameAs: ['https://www.linkedin.com/company/sitakshi', 'https://www.instagram.com/sitakshi'],
};

const STATS = [
  { target: 48,  suffix: 'hr', label: 'Avg. Turnaround' },
  { target: 98,  suffix: '%',  label: 'Client Satisfaction' },
  { target: 15,  suffix: '+',  label: 'Tech Experts' },
  { target: 24,  suffix: '/7', label: 'Support Available' },
];

const PILLARS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Speed-First',
    desc: 'We deliver in 48 hours, not 48 days.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Quality Assured',
    desc: '98% client satisfaction across every project.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Reach',
    desc: 'Serving clients across multiple countries.',
  },
];

/* ── Animated counter hook ── */
function useCountUp(target, suffix, duration = 1200, delay = 0, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const timeout = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) raf = requestAnimationFrame(step);
        else setVal(target);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [active, target, duration, delay]);
  return val + suffix;
}

const StatCard = ({ target, suffix, label, active, delay }) => {
  const display = useCountUp(target, suffix, 1200, delay, active);
  return (
    <div className="au-stat-card">
      <div className="au-stat-bar" />
      <span className="au-stat-num">{display}</span>
      <div className="au-stat-label">{label}</div>
    </div>
  );
};

const PillarItem = ({ icon, title, desc }) => (
  <div className="au-pillar">
    <div className="au-pillar-icon">{icon}</div>
    <div>
      <strong className="au-pillar-title">{title}</strong>
      <span className="au-pillar-desc">{desc}</span>
    </div>
  </div>
);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const AboutUs = () => {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, raf, t = 0;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.00032,
      vy: (Math.random() - 0.5) * 0.00025,
      alpha: 0.06 + Math.random() * 0.14,
      phase: Math.random() * Math.PI * 2,
      shape: Math.random() > 0.65 ? 'ring' : 'dot',
    }));
    const resize = () => {
      W = canvas.width  = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      for (let i = -300; i < W + 300; i += 70) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 260, H);
        ctx.strokeStyle = 'rgba(0,163,77,0.035)'; ctx.lineWidth = 1; ctx.stroke();
      }
      for (let j = 0; j < H; j += 90) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j);
        ctx.strokeStyle = 'rgba(0,163,77,0.022)'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(t + p.phase));
        ctx.beginPath();
        if (p.shape === 'ring') {
          ctx.arc(p.x * W, p.y * H, p.r + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,163,77,${a})`; ctx.lineWidth = 1; ctx.stroke();
        } else {
          ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,163,77,${a})`; ctx.fill();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top  - r.height / 2) / r.height) * 6,
      y: ((e.clientX - r.left - r.width  / 2) / r.width)  * -6,
    });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const checkIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00a34d"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  return (
    <section
      className="au-section"
      ref={sectionRef}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <canvas ref={canvasRef} className="au-canvas" aria-hidden="true" />

      <div className="au-blob au-blob--a" aria-hidden="true" />
      <div className="au-blob au-blob--b" aria-hidden="true" />
      <div className="au-blob au-blob--c" aria-hidden="true" />
      <div className="au-corner-accent" aria-hidden="true" />

      <div className="au-inner">
        <div className="au-row">

          {/* ══ LEFT ══ */}
          <div
            className={`au-visual${visible ? ' au-vis-left' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="au-cluster"
              style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.18s ease-out',
              }}
            >
              <svg className="au-lines" viewBox="0 0 520 500" preserveAspectRatio="none" aria-hidden="true">
                <line x1="260" y1="218" x2="78"  y2="72"  stroke="rgba(0,163,77,0.18)" strokeWidth="1.2" strokeDasharray="6 5"/>
                <line x1="260" y1="218" x2="68"  y2="400" stroke="rgba(0,163,77,0.18)" strokeWidth="1.2" strokeDasharray="6 5"/>
                <line x1="260" y1="218" x2="422" y2="412" stroke="rgba(0,163,77,0.18)" strokeWidth="1.2" strokeDasharray="6 5"/>
              </svg>

              <div className="au-orbit au-orbit--1" />
              <div className="au-orbit au-orbit--2" />

              <div className="au-main-wrap">
                <div className="au-breath au-breath--1" />
                <div className="au-breath au-breath--2" />
                <div className="au-breath au-breath--3" />
                <div className="au-main-circle">
                  <img src={circle1} alt="Sitakshi team collaborating" className="au-img" />
                </div>
              </div>

              <div className="au-sat au-sat--tl">
                <img src={circle2} alt="Creative web design" className="au-img" />
              </div>
              <div className="au-sat au-sat--bl">
                <img src={circle3} alt="Digital marketing analytics" className="au-img" />
              </div>
              <div className="au-sat au-sat--br">
                <img src={circle4} alt="App development" className="au-img" />
              </div>

              <div className="au-chip au-chip--top">{checkIcon} Web Design</div>
              <div className="au-chip au-chip--bot">{checkIcon} App Dev</div>

              <div className="au-exp-badge">
                <span className="au-exp-num">15+</span>
                <span className="au-exp-txt">Experts</span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT ══ */}
          <div className={`au-content${visible ? ' au-vis-right' : ''}`}>

            <div className="au-tag">
              <span className="au-tag-dot" />
              Launched 2026 · All-in-One Tech Agency
            </div>

            <h2 id="about-heading" className="au-title" itemProp="name">
              Fresh Ideas,{' '}
              <span className="au-title-accent">Big Vision</span>
              {' '}— Built to Scale
            </h2>

            <div className="au-divider" />

            <div className="au-body" itemProp="description">
              <p>
                <strong>Sitakshi</strong> is a next-generation, all-in-one tech agency founded in{' '}
                <strong>2026</strong> by engineers, designers, and digital strategists driven to help
                businesses grow online — faster and smarter.
              </p>
              <p>
                From <strong>custom web design</strong> and <strong>SEO-optimised marketing</strong> to{' '}
                <strong>24/7 IT support</strong> and <strong>high-performance app development</strong> —
                one partner, full stack.
              </p>
            </div>

            <div className="au-pillars">
              {PILLARS.map(p => <PillarItem key={p.title} {...p} />)}
            </div>

            <div className="au-stats">
              {STATS.map(({ target, suffix, label }, i) => (
                <StatCard key={label} target={target} suffix={suffix} label={label} active={visible} delay={i * 150} />
              ))}
            </div>

            <div className="au-cta">
              <button className="au-btn">
                Join Our Journey
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a href="#services" className="au-link">Explore Services →</a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;