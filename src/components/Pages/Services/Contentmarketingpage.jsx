import React, { useState, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════ */
const T = {
  primary:      '#00a34d',
  primaryDark:  '#008040',
  primaryLight: '#e6f7ee',
  secondary:    '#ffffff',
  text:         '#2a2a2a',
  textLight:    '#6c757d',
  textLighter:  '#a0a8b0',
  border:       '#e9ecef',
  bgLight:      '#f8f9fa',
};

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const cmServices = [
  {
    icon: 'ti ti-pencil',
    accent: 'dark',
    tag: '01',
    title: 'Blog Writing & SEO Content',
    subtitle: 'Rank. Be Read. Convert.',
    desc: 'Long-form articles, pillar pages, and cluster content engineered for search intent — written by humans who understand your industry, not just your keywords.',
    features: ['Keyword research', 'Pillar & cluster content', 'On-page SEO', 'Internal linking strategy'],
    cta: 'Start Ranking',
  },
  {
    icon: 'ti ti-video',
    accent: 'mid',
    tag: '02',
    title: 'Video Content Production',
    subtitle: 'Stories That Stop Thumbs',
    desc: 'Explainer videos, brand documentaries, testimonials, and product demos — scripted, shot, and edited to move people from curious to convinced.',
    features: ['Script & storyboard', 'Full production', 'Motion graphics', 'YouTube optimisation'],
    cta: 'Start Filming',
  },
  {
    icon: 'ti ti-microphone',
    accent: 'light',
    tag: '03',
    title: 'Podcast Production',
    subtitle: 'Authority In Their Ears',
    desc: 'End-to-end podcast management — from concept and guest booking to recording, editing, and distribution across every major platform.',
    features: ['Show concept & format', 'Guest sourcing', 'Audio editing', 'Multi-platform publish'],
    cta: 'Launch My Podcast',
  },
  {
    icon: 'ti ti-chart-pie',
    accent: 'soft',
    tag: '04',
    title: 'Infographics & Visual Content',
    subtitle: 'Data Made Beautiful',
    desc: 'Complex ideas distilled into shareable visual stories — infographics, data visualisations, and branded illustration that earn backlinks and social shares.',
    features: ['Data visualisation', 'Brand illustration', 'Shareable assets', 'White-label reports'],
    cta: 'Design My Content',
  },
  {
    icon: 'ti ti-map',
    accent: 'dark',
    tag: '05',
    title: 'Content Strategy & Planning',
    subtitle: 'Every Piece Has a Job',
    desc: 'Full-funnel content architecture that maps every asset to a buyer stage, a keyword cluster, and a business goal. Strategy before a single word is written.',
    features: ['Audience research', 'Content audit', 'Editorial calendar', 'Funnel mapping'],
    cta: 'Build My Strategy',
  },
  {
    icon: 'ti ti-broadcast',
    accent: 'mid',
    tag: '06',
    title: 'Distribution & Amplification',
    subtitle: 'Content That Gets Seen',
    desc: 'Email newsletters, social repurposing, PR outreach, and paid amplification — so the content you invested in actually reaches the audience it deserves.',
    features: ['Newsletter syndication', 'Social repurposing', 'Link building', 'Paid amplification'],
    cta: 'Amplify My Content',
  },
];

const processSteps = [
  { icon: 'ti ti-telescope', title: 'Research', desc: 'Audience intent mapping, competitor content gaps, and keyword universe — we know exactly what your buyers are searching before we write a word.' },
  { icon: 'ti ti-writing', title: 'Create', desc: 'Editorial briefs, expert writing, design, and production. Every asset built to a quality bar that earns attention and trust.' },
  { icon: 'ti ti-broadcast', title: 'Distribute', desc: 'Multi-channel publishing — owned, earned, and paid. The right format on the right platform at the right moment.' },
  { icon: 'ti ti-chart-dots', title: 'Optimise', desc: 'Monthly performance reviews, content refreshes, and compound iteration. The library gets smarter with every publish.' },
];

const faqs = [
  { q: 'Do you write the content or just strategise?', a: 'Both — full-service includes strategy, writing, design, and distribution. We can also produce against your own editorial plan.' },
  { q: 'How long before SEO content ranks?', a: 'Typically 3–6 months for new content to gain traction. We track ranking progress monthly and refresh underperforming pieces.' },
  { q: 'Can you repurpose content we already have?', a: 'Yes — content audits and repurposing are part of every engagement. Good ideas shouldn\'t live in one format.' },
  { q: 'Do you handle distribution or just production?', a: 'We handle the full chain — strategy, creation, and multi-channel distribution including newsletter, social, and PR outreach.' },
  { q: 'How do you measure content ROI?', a: 'Organic traffic, keyword rankings, backlinks earned, and — for bottom-funnel content — pipeline and conversion attribution.' },
];

const caseStudies = [
  {
    company: 'Northleaf',
    industry: 'B2B / SaaS',
    result: '310% organic traffic',
    timeframe: '6 months',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&auto=format',
    quote: 'Our blog went from 800 monthly visitors to over 32K in six months. Pipeline from organic is now our highest-converting channel.',
    person: 'David Chen',
    role: 'Head of Marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=75&auto=format',
  },
  {
    company: 'Fable',
    industry: 'D2C / Education',
    result: '48K podcast listeners',
    timeframe: '4 months',
    img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80&auto=format',
    quote: 'We went from zero podcast presence to 48K monthly listeners. It\'s now our biggest brand-building channel by a wide margin.',
    person: 'Amara Osei',
    role: 'Founder',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format',
  },
  {
    company: 'Stratum',
    industry: 'Fintech / B2B',
    result: '2.4M content impressions',
    timeframe: '5 months',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format',
    quote: 'The infographic series earned 180 backlinks in three months and moved us from page 4 to page 1 for our core terms.',
    person: 'Lena Park',
    role: 'CMO',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=75&auto=format',
  },
];

const IMAGES = {
  a1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=75&auto=format',
  a2: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format',
};

const formats = [
  { icon: 'ti ti-pencil', label: 'Blog & SEO' },
  { icon: 'ti ti-video', label: 'Video' },
  { icon: 'ti ti-microphone', label: 'Podcast' },
  { icon: 'ti ti-chart-pie', label: 'Infographics' },
  { icon: 'ti ti-mail', label: 'Newsletter' },
];

const enquiryTypes = ['Blog & SEO Content', 'Video Production', 'Podcast Production', 'Infographics & Visual', 'Content Strategy', 'Distribution & Amplification', 'Full Content Package', 'Quick Audit'];

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started || target === null) return;
    const start = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return { ref, count };
}

function useParallax(strength = 14) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = e => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: px * strength, y: py * strength });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [strength]);
  return { ref, tilt };
}

/* ══════════════════════════════════════════════
   ANIMATED BACKGROUND
══════════════════════════════════════════════ */
function AnimatedBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 80 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.03 + Math.random() * 0.06, hue: 145 + Math.random() * 30,
    }));
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.8 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.18, vy: -0.05 - Math.random() * 0.2,
      opacity: 0.15 + Math.random() * 0.4, life: Math.random(),
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},80%,40%,${o.opacity})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += 0.004;
        if (p.y < -4 || p.life > 1) { p.x = Math.random() * W; p.y = H + 4; p.life = 0; }
        const fade = Math.sin(p.life * Math.PI);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,163,77,${p.opacity * fade})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

/* ══════════════════════════════════════════════
   FLOATING CONTENT ICONS
══════════════════════════════════════════════ */
function FloatingIcon({ icon, bg, size = 44, style, delay = '0s', dir = 1 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.18)', zIndex: 5,
      animation: `${dir > 0 ? 'floatUpCM' : 'floatDnCM'} ${3.5 + Math.random()}s ease-in-out infinite ${delay}`,
      ...style,
    }}>
      <i className={icon} style={{ fontSize: size * 0.46, color: '#fff' }} aria-hidden="true" />
    </div>
  );
}

function HeroRight() {
  const globeRef = useRef(null);
  const frameRef = useRef(null);
  const angleRef = useRef(0);
  const [visitors, setVisitors] = useState(31240);
  const [activeCard, setActiveCard] = useState(0);

  const contentCards = [
    { label: 'Blog Post Published', sub: 'Top 10 SEO Tips — 12K reads in 24h', icon: 'ti ti-pencil', color: '#00a34d' },
    { label: 'Podcast Episode Live', sub: 'Ep. 42 — 4.8K listens in 24h', icon: 'ti ti-microphone', color: '#7c3aed' },
    { label: 'Infographic Shared', sub: '180 backlinks earned this week', icon: 'ti ti-chart-pie', color: '#0891b2' },
    { label: 'Video Published', sub: '92K views — #1 on YouTube Search', icon: 'ti ti-video', color: '#dc2626' },
  ];

  const miniBarHeights = [30, 48, 38, 62, 55, 85, 100];

  useEffect(() => {
    let last = null;
    const animate = ts => {
      if (last !== null) {
        angleRef.current = (angleRef.current + (ts - last) * 0.016) % 360;
        if (globeRef.current) {
          globeRef.current.style.transform = `rotate(${angleRef.current}deg)`;
          globeRef.current.style.transformOrigin = '110px 110px';
        }
      }
      last = ts;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setVisitors(v => v + Math.floor(Math.random() * 16 + 3)), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveCard(v => (v + 1) % contentCards.length), 3000);
    return () => clearInterval(id);
  }, []);

  const leftIcons  = [
    { icon: 'ti ti-pencil',    bg: T.primary,    size: 46, delay: '0s',   dir: 1 },
    { icon: 'ti ti-microphone',bg: '#7c3aed',    size: 42, delay: '0.5s', dir:-1 },
    { icon: 'ti ti-chart-pie', bg: '#0891b2',    size: 40, delay: '1s',   dir: 1 },
  ];
  const rightIcons = [
    { icon: 'ti ti-video',     bg: '#dc2626',    size: 48, delay: '0.3s', dir:-1 },
    { icon: 'ti ti-broadcast', bg: T.primaryDark,size: 42, delay: '0.9s', dir: 1 },
    { icon: 'ti ti-mail',      bg: '#b45309',    size: 40, delay: '1.4s', dir:-1 },
  ];

  return (
    <div style={{ position: 'relative', width: 600, height: 560 }}>

      {/* Animated dashed connector lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 600 560">
        {[
          [72, 148], [72, 238], [72, 328],
          [528, 148], [528, 238], [528, 328],
        ].map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={300} y2={270}
            stroke="rgba(0,163,77,0.14)" strokeWidth="1.2"
            strokeDasharray="5 8"
            style={{ animation: `dashFlowCM ${2 + i * 0.4}s linear infinite` }}
          />
        ))}
      </svg>

      {/* Top stat cards */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', gap: 8, zIndex: 8, animation: 'slideInLeftCM 0.7s ease 0.1s both' }}>
        {[
          { label: 'Organic Traffic', value: '+310%', sub: '▲ 6 months', bars: miniBarHeights },
          { label: 'Content Pieces', value: '1,200+', sub: '▲ published' },
          { label: 'Avg. Read Time', value: '4.8m', sub: '▲ engagement' },
          { label: 'Backlinks', value: '+180', sub: '▲ this month' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.91)', backdropFilter: 'blur(14px)', border: '1px solid rgba(0,163,77,0.18)', borderRadius: 13, padding: '10px 13px', boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 8.5, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, lineHeight: 1.1, marginTop: 2 }}>{s.value}</div>
            <div style={{ fontSize: 8, color: T.primary, fontWeight: 700, marginTop: 1 }}>{s.sub}</div>
            {s.bars && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 22, marginTop: 6 }}>
                {s.bars.map((h, j) => (
                  <div key={j} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: j === s.bars.length - 1 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.2)' }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left icons */}
      {leftIcons.map((ic, i) => (
        <FloatingIcon key={i} {...ic} style={{ position: 'absolute', top: 130 + i * 90, left: 10 }} />
      ))}

      {/* Right icons */}
      {rightIcons.map((ic, i) => (
        <FloatingIcon key={i} {...ic} style={{ position: 'absolute', top: 130 + i * 90, right: 10 }} />
      ))}

      {/* Glow orb */}
      <div style={{ position: 'absolute', left: '50%', top: 270, transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.17) 0%,rgba(0,163,77,0.05) 55%,transparent 75%)', animation: 'glowPulseCM 3s ease-in-out infinite', zIndex: 2, pointerEvents: 'none' }} />

      {/* Orbital rings */}
      <div style={{ position: 'absolute', left: '50%', top: 270, transform: 'translate(-50%,-50%)', width: 290, height: 290, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(0,163,77,0.38)', animation: 'spinRingCM 9s linear infinite', transformStyle: 'preserve-3d', transform: 'rotateX(68deg)' }} />
        <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1.5px dashed rgba(0,190,90,0.22)', animation: 'spinRingCM2 13s linear infinite', transformStyle: 'preserve-3d', transform: 'rotateX(50deg) rotateY(22deg)' }} />
        <div style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '1px solid rgba(0,210,100,0.15)', animation: 'spinRingCM 18s linear infinite reverse', transformStyle: 'preserve-3d', transform: 'rotateX(82deg) rotateZ(45deg)' }} />
      </div>

      {/* Sphere */}
      <div style={{ position: 'absolute', left: '50%', top: 270, transform: 'translate(-50%,-50%)', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(ellipse at 34% 27%,#ffffff 0%,#e0f7eb 24%,#a8ddc0 54%,#57b080 76%,#237a4a 100%)', boxShadow: '10px 16px 48px rgba(0,100,40,0.36),inset -14px -10px 30px rgba(0,80,30,0.18),inset 10px 8px 24px rgba(255,255,255,0.55)', zIndex: 4 }}>
        <svg width="100%" height="100%" viewBox="0 0 220 220" style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', opacity: 0.18, pointerEvents: 'none' }}>
          <ellipse cx="110" cy="65" rx="94" ry="15" fill="none" stroke="#003d1a" strokeWidth="1" />
          <ellipse cx="110" cy="95" rx="108" ry="9" fill="none" stroke="#003d1a" strokeWidth="1" />
          <ellipse cx="110" cy="124" rx="110" ry="6" fill="none" stroke="#003d1a" strokeWidth="1" />
          <ellipse cx="110" cy="152" rx="106" ry="10" fill="none" stroke="#003d1a" strokeWidth="1" />
          <ellipse cx="110" cy="178" rx="94" ry="15" fill="none" stroke="#003d1a" strokeWidth="1" />
          <g ref={globeRef} fill="none" stroke="#003d1a" strokeWidth="1">
            <ellipse cx="110" cy="110" rx="16" ry="110" />
            <ellipse cx="110" cy="110" rx="52" ry="110" />
            <ellipse cx="110" cy="110" rx="88" ry="110" />
            <ellipse cx="110" cy="110" rx="108" ry="110" />
          </g>
        </svg>
        <div style={{ position: 'absolute', top: '12%', left: '14%', width: '40%', height: '32%', borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 40%,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.15) 60%,transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 3 }}>
          <i className="ti ti-pencil" style={{ fontSize: 22, color: '#00a34d', filter: 'drop-shadow(0 0 6px rgba(0,163,77,0.55))' }} />
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '1.8px', color: '#00a34d', textShadow: '0 0 12px rgba(0,163,77,0.5)', lineHeight: 1.3, marginTop: 3 }}>CONTENT<br />MARKETING</span>
        </div>
      </div>

      {/* Cycling notification card */}
      <div style={{ position: 'absolute', top: 322, left: '50%', marginLeft: -202, zIndex: 7, width: 178 }}>
        {contentCards.map((c, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            background: 'rgba(255,255,255,0.96)', border: `1px solid ${c.color}33`,
            borderRadius: 13, padding: '9px 12px', boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
            opacity: activeCard === i ? 1 : 0,
            transform: activeCard === i ? 'translateY(-2px)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={c.icon} style={{ fontSize: 11, color: '#fff' }} />
              </div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: T.text }}>{c.label}</div>
            </div>
            <div style={{ fontSize: 8.5, color: T.textLight, lineHeight: 1.45 }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 322, left: '50%', marginLeft: -202, width: 178, height: 62 }} />

      {/* Live counter */}
      <div style={{ position: 'absolute', top: 322, left: '50%', marginLeft: 26, zIndex: 7, minWidth: 150, animation: 'slideInRightCM 0.7s ease 1s both' }}>
        <div style={{ background: 'rgba(255,255,255,0.93)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 14, padding: '9px 14px', boxShadow: '0 6px 22px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#33c972', animation: 'pulseDotCM 1.8s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: T.primary }}>Live Readers</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: '-0.5px' }}>{visitors.toLocaleString()}</div>
          <div style={{ fontSize: 8.5, color: T.textLighter, marginTop: 2 }}>avg. time on page <span style={{ color: T.primary, fontWeight: 700 }}>4.8m</span></div>
        </div>
      </div>

      {/* Bottom 3 metric cards */}
      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', gap: 10, zIndex: 8, animation: 'slideInLeftCM 0.7s ease 0.6s both' }}>
        {/* SEO dark */}
        <div style={{ flex: 1, background: 'rgba(8,18,11,0.95)', border: '1px solid rgba(0,163,77,0.26)', borderRadius: 14, padding: '12px 14px', boxShadow: '0 10px 36px rgba(0,0,0,0.32)' }}>
          <div style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#33c972', animation: 'pulseDotCM 1.8s ease-in-out infinite', display: 'inline-block' }} />
            SEO Rankings
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', lineHeight: 1 }}>Page #1</div>
          <div style={{ fontSize: 8.5, color: '#33c972', fontWeight: 700, marginTop: 2 }}>↑ 14 core keywords</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, marginTop: 8 }}>
            {[30, 42, 38, 55, 48, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i === 5 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.25)' }} />
            ))}
          </div>
        </div>
        {/* Audience */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 14, padding: '12px 14px', boxShadow: '0 6px 22px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 8.5, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Audience Growth</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.primary, lineHeight: 1 }}>+48K</div>
          <div style={{ fontSize: 8.5, color: T.textLighter, marginTop: 1 }}>podcast listeners</div>
          <div style={{ margin: '8px 0', height: 4, background: T.border, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg,#00a34d,#33c972)', borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 8.5, color: T.textLighter }}>Backlinks: <span style={{ color: T.primary, fontWeight: 700 }}>180+</span> · DR: <span style={{ color: T.primary, fontWeight: 700 }}>↑22pts</span></div>
        </div>
        {/* Output */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 14, padding: '12px 14px', boxShadow: '0 6px 22px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 8.5, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Content Output</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#005c24', lineHeight: 1 }}>1,200+</div>
          <div style={{ fontSize: 8.5, color: T.textLighter, marginTop: 1 }}>pieces published</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 9 }}>
            {['300+ Clients', '6 Formats', '48h Delivery'].map(b => (
              <span key={b} style={{ fontSize: 8.5, background: T.primaryLight, color: T.primaryDark, borderRadius: 6, padding: '2px 8px', fontWeight: 700, border: '1px solid #b3f0cc' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Badge strip */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 8, whiteSpace: 'nowrap', animation: 'slideInLeftCM 0.7s ease 1s both' }}>
        {[{ val: '310%', label: 'Avg. Traffic Growth' }, { val: '4.8m', label: 'Avg. Read Time' }, { val: '180+', label: 'Backlinks/Month' }].map(b => (
          <div key={b.label} style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,163,77,0.18)', borderRadius: 10, padding: '6px 13px', textAlign: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.primary }}>{b.val}</div>
            <div style={{ fontSize: 8.5, color: T.textLighter, fontWeight: 600 }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════ */
const accentMap = {
  dark: {
    bg: '#0a140e', border: 'rgba(0,163,77,0.18)',
    bar: 'linear-gradient(90deg,#008040,#00a34d,#33c972)',
    iconBg: 'rgba(0,163,77,0.14)', iconColor: '#33c972',
    tagColor: '#33c972', titleColor: '#fff',
    descColor: 'rgba(255,255,255,0.58)', featColor: 'rgba(255,255,255,0.5)',
    hoverBorder: 'rgba(0,163,77,0.48)', hoverShadow: '0 24px 60px -12px rgba(0,128,64,0.38)',
  },
  mid: {
    bg: '#061209', border: 'rgba(0,163,77,0.15)',
    bar: 'linear-gradient(90deg,#004d26,#008040,#00a34d)',
    iconBg: 'rgba(0,128,64,0.2)', iconColor: '#66d49a',
    tagColor: '#66d49a', titleColor: '#edfaf3',
    descColor: 'rgba(180,240,210,0.68)', featColor: 'rgba(180,240,210,0.54)',
    hoverBorder: 'rgba(0,163,77,0.42)', hoverShadow: '0 24px 60px -12px rgba(0,64,26,0.58)',
  },
  light: {
    bg: '#ffffff', border: T.border,
    bar: 'linear-gradient(90deg,#00a34d,#33c972,#80e0aa)',
    iconBg: T.primaryLight, iconColor: T.primaryDark,
    tagColor: T.primary, titleColor: T.text,
    descColor: T.textLight, featColor: T.textLight,
    hoverBorder: 'rgba(0,163,77,0.35)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.12)',
  },
  soft: {
    bg: '#ffffff', border: T.border,
    bar: 'linear-gradient(90deg,#33c972,#80e0aa,#b3f0cc)',
    iconBg: T.primaryLight, iconColor: T.primary,
    tagColor: T.primary, titleColor: T.text,
    descColor: T.textLight, featColor: T.textLighter,
    hoverBorder: 'rgba(0,163,77,0.3)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.10)',
  },
};

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const a = accentMap[svc.accent];
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: a.bg, border: `1px solid ${hovered ? a.hoverBorder : a.border}`,
        borderRadius: 24, padding: '28px 26px 30px', position: 'relative', overflow: 'hidden',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`,
        boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(0,0,0,0.04)',
      }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%,${a.iconColor}16 0%,transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: a.tagColor, opacity: 0.55, display: 'block', marginBottom: 6 }}>{svc.tag}</span>
          <div style={{ fontSize: 10.5, color: a.tagColor, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{
          width: 46, height: 46, background: a.iconBg, borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: a.iconColor, fontSize: 21, flexShrink: 0,
          border: `1px solid ${a.iconColor}33`,
          boxShadow: hovered ? `0 8px 20px -6px ${a.iconColor}55` : 'none',
          transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
          transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)',
        }}>
          <i className={svc.icon} aria-hidden="true" />
        </div>
      </div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 800, color: a.titleColor, marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize: 13.5, color: a.descColor, lineHeight: 1.8, marginBottom: 20 }}>{svc.desc}</p>
      <div style={{ height: 1, background: `linear-gradient(90deg,${a.iconColor}30,transparent)`, marginBottom: 18 }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
        {svc.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: a.featColor }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.iconColor, flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button style={{
        background: hovered ? a.iconColor : 'transparent',
        border: `1.5px solid ${a.iconColor}`,
        color: hovered ? (svc.accent === 'light' || svc.accent === 'soft' ? '#fff' : '#051a0b') : a.iconColor,
        borderRadius: 11, padding: '12px 20px',
        fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12.5,
        cursor: 'pointer', transition: 'all 0.3s ease',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      }}>
        {svc.cta}
        <i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} style={{ padding: '44px 36px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 18, alignItems: 'center' }}>
      <div style={{ width: 56, height: 56, background: 'rgba(0,163,77,0.14)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a34d', fontSize: 26, flexShrink: 0, border: '1px solid rgba(0,163,77,0.22)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#ffffff 0%,#b3f0cc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {count}{suffix}
        </div>
        <div style={{ fontSize: 11, color: T.textLighter, fontWeight: 500, marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      </div>
    </div>
  );
}

function CaseStudyCard({ cs, index }) {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, overflow: 'hidden', background: '#fff',
        border: `1px solid ${hov ? 'rgba(0,163,77,0.32)' : T.border}`,
        boxShadow: hov ? '0 20px 50px -12px rgba(0,163,77,0.18)' : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.4s ease, border-color 0.4s ease`,
      }}>
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img src={cs.img} alt={cs.company} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.8)', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(0,64,26,0.75),rgba(0,0,0,0.45))' }} />
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{cs.industry}</div>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, fontWeight: 900, color: '#fff' }}>{cs.company}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(0,163,77,0.2)', border: '1px solid rgba(0,163,77,0.44)', borderRadius: 8, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, fontWeight: 700, color: '#66d49a' }}>{cs.result}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>in {cs.timeframe}</div>
        </div>
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <p style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.6, marginBottom: 16 }}>"{cs.quote}"</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={cs.avatar} alt={cs.person} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.primaryLight}` }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{cs.person}</div>
            <div style={{ fontSize: 10.5, color: T.textLighter }}>{cs.role}, {cs.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms` }}>
      <div style={{ width: 72, height: 72, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.25)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a34d', fontSize: 30, margin: '0 auto 20px' }}>
        <i className={step.icon} aria-hidden="true" />
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#33c972', opacity: 0.6, marginBottom: 8 }}>0{index + 1}</div>
      <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{step.title}</h4>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 220, margin: '0 auto' }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}`, padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, color: T.text, textAlign: 'left', gap: 16 }}>
        {item.q}
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? T.text : T.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? T.primary : T.primaryDark, fontSize: 16, flexShrink: 0, transition: 'all 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ marginTop: 12, fontSize: 14, color: T.textLight, lineHeight: 1.8, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

function LiveDashboard() {
  const { ref, tilt } = useParallax(6);
  const [pageViews, setPageViews] = useState(31240);
  useEffect(() => {
    const id = setInterval(() => setPageViews(v => v + Math.floor(Math.random() * 18) + 2), 1800);
    return () => clearInterval(id);
  }, []);
  const bars = [38, 52, 44, 70, 56, 88, 74];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ width: 260, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div style={{ background: 'linear-gradient(165deg,#0a1610,#06100a)', border: '1px solid rgba(0,163,77,0.24)', borderRadius: 16, padding: 16, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(0,163,77,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono,monospace' }}>analytics.google.com</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Monthly Visitors</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{pageViews.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.28)', borderRadius: 20, padding: '3px 8px', height: 'fit-content' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#33c972' }} /><span style={{ fontSize: 7.5, color: '#33c972', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 14 }}>
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.22)' }} />)}
          </div>
          {[
            { kw: 'Organic traffic', pos: '+310%', delta: '↑82pts' },
            { kw: 'Keywords ranking', pos: '142', delta: '↑38 new' },
            { kw: 'Avg. time on page', pos: '4.8m', delta: '↑1.2m' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 5 }}>
              <div style={{ flex: 1, fontSize: 9, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.kw}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#33c972', flexShrink: 0 }}>{row.pos}</div>
              <div style={{ fontSize: 8, color: '#33c972', flexShrink: 0 }}>{row.delta}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, height: 28, borderRadius: 8, background: 'linear-gradient(90deg,#008040,#00a34d)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="ti ti-chart-bar" style={{ fontSize: 12, color: '#fff' }} /><span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>Full Content Report Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' });
  const [status, setStatus] = useState('idle');
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1100);
  };
  if (status === 'sent') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, minHeight: 320, justifyContent: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(0,163,77,0.16)', border: '1.5px solid rgba(0,163,77,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 800, color: '#fff' }}>Enquiry sent!</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 320 }}>Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''} — your content audit request is in. We reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,163,77,0.42)', color: '#33c972', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
    </div>
  );
  return (
    <div>
      <div style={{ width: 52, height: 52, background: 'rgba(0,163,77,0.16)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(0,163,77,0.3)' }}><i className="ti ti-pencil" /></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Request a Free Content Audit</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>Tell us your website and goals — we'll send a full content gap and SEO audit within 48 hours.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="cm-enq-row">
          <input className="cm-enq-input" type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} required />
          <input className="cm-enq-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} required />
        </div>
        <div className="cm-enq-row">
          <input className="cm-enq-input" type="text" placeholder="Website URL" value={form.phone} onChange={e => update('phone', e.target.value)} />
          <div className="cm-enq-select-wrap">
            <i className="ti ti-list-details cm-enq-select-icon" aria-hidden="true" />
            <select className="cm-enq-input cm-enq-select" value={form.type} onChange={e => update('type', e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down cm-enq-select-chevron" aria-hidden="true" />
          </div>
        </div>
        <textarea className="cm-enq-input" placeholder="Tell us your current content situation and what you want to achieve..." rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins,sans-serif' }} />
        <button type="submit" disabled={status === 'sending'} style={{ background: T.primary, color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Get My Free Audit'}
          {status !== 'sending' && <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: T.bgLight }}>
      <AnimatedBg />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(230,247,238,0.65) 0%,transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top,${T.bgLight},transparent)`, pointerEvents: 'none', zIndex: 1 }} />
      <div className="cm-hero-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 64px 72px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div>
          <div className="cm-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.text, color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.primary, boxShadow: '0 0 0 3px rgba(0,163,77,0.25)', display: 'inline-block', flexShrink: 0, animation: 'pulseDotCM 2s ease-in-out infinite' }} />
            ✍️ Content Marketing Agency
          </div>
          <h1 className="cm-reveal" style={{ fontFamily: 'Playfair Display,serif', fontSize: 56, fontWeight: 900, lineHeight: 1.06, color: T.text, letterSpacing: '-1.2px', marginBottom: 20, animationDelay: '0.1s' }}>
            Content That Ranks,<br />
            <span style={{ background: `linear-gradient(135deg,${T.primaryDark} 0%,${T.primary} 55%,#33c972 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Builds Trust & Converts</span>
          </h1>
          <p className="cm-reveal" style={{ fontSize: 15, color: T.textLight, lineHeight: 1.8, maxWidth: 460, marginBottom: 34, animationDelay: '0.18s' }}>
            From SEO blogs and podcast shows to viral infographics and video — we build content programmes that compound in value every single month.
          </p>
          <div className="cm-reveal" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', animationDelay: '0.26s' }}>
            <button className="cm-magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)' }}>
              Get Free Content Audit →
            </button>
            <a href="#work" style={{ textDecoration: 'none' }}>
              <button className="cm-magnetic-btn-outline" style={{ background: '#fff', color: T.text, padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
                View Results
              </button>
            </a>
          </div>
          <div className="cm-reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32, animationDelay: '0.30s' }}>
            {['1,200+ Pieces Published', '300+ Clients', '310% Avg. Traffic Growth'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.text, fontWeight: 600 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: T.primaryLight, border: '1.5px solid #b3f0cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: T.primaryDark, flexShrink: 0 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
          <div className="cm-reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, animationDelay: '0.32s' }}>
            {[
              { icon: 'ti-trending-up', value: '+310%', label: 'Avg. traffic growth' },
              { icon: 'ti-clock',       value: '4.8m', label: 'Avg. time on page' },
              { icon: 'ti-link',        value: '180+', label: 'Backlinks/month' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.72)', border: `1px solid ${T.border}`, backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.primaryLight, border: '1px solid #b3f0cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`ti ${m.icon}`} style={{ fontSize: 15, color: T.primaryDark }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 900, color: T.text, lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: T.textLighter, marginTop: 1 }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cm-reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24, borderTop: `1px solid ${T.border}`, animationDelay: '0.38s' }}>
            <div style={{ display: 'flex' }}>
              {[IMAGES.a1, IMAGES.a2].map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.bgLight}`, marginLeft: i === 0 ? 0 : -8 }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: T.textLight }}>Trusted by <strong style={{ color: T.text }}>300+ brands</strong> to build content that compounds</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HeroRight />
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    { icon: 'ti ti-trending-up', num: 310, suffix: '%', label: 'Avg. organic traffic growth' },
    { icon: 'ti ti-pencil', num: 1200, suffix: '+', label: 'Content pieces published' },
    { icon: 'ti ti-users', num: 300, suffix: '+', label: 'Brands served' },
    { icon: 'ti ti-link', num: 180, suffix: '+', label: 'Backlinks earned monthly' },
  ];
  return (
    <div style={{ background: T.text, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#008040,#00a34d,#33c972,#00a34d,#008040,transparent)', backgroundSize: '200% 100%', animation: 'gradientMoveCM 3s linear infinite' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,163,77,0.14) 1px,transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div className="cm-stats-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => <StatCell key={i} {...s} />)}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div id="services" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 64px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>What We Do</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 38, fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Content That Actually Works</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Six formats, one strategy. Every piece earns attention, builds authority, and drives a measurable outcome.</p>
      <div className="cm-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {cmServices.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <div id="work" style={{ background: T.bgLight, padding: '88px 64px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>Case Studies</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 38, fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Proof Is In The Traffic</h2>
        <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Three brands, three different content needs — one consistent result: audiences that grow, trust, and buy.</p>
        <div className="cm-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {caseStudies.map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div id="process" style={{ background: T.text, padding: '88px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,163,77,0.16)', color: '#33c972', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(0,163,77,0.28)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 38, fontWeight: 900, color: '#fff', marginBottom: 56, lineHeight: 1.1, letterSpacing: '-1px' }}>Four Steps, Zero Filler</h2>
        <div className="cm-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,163,77,0.32),rgba(0,163,77,0.32),transparent)' }} />
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function FormatsBand() {
  return (
    <div style={{ background: '#fff', padding: '40px 64px', borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: T.textLighter, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>Content formats we produce</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {formats.map(p => (
            <span key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: T.textLighter, letterSpacing: '-0.3px' }}>
              <i className={p.icon} style={{ fontSize: 18 }} />{p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  return (
    <div id="contact" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 64px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>Get In Touch</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 38, fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Get Your Free Content Audit</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No pitch, no fluff — just a real audit of your content gaps and a clear growth plan, delivered in 48 hours.</p>
      <div ref={ref} className="cm-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, background: T.text, borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(0,163,77,0.28)', boxShadow: '0 24px 64px rgba(0,163,77,0.14)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        <div style={{ padding: '40px 36px', background: 'linear-gradient(165deg,#0a1410,#060e09)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#33c972' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Insights</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 32, maxWidth: 240 }}>This is what your content dashboard looks like after we take over your programme.</p>
            <LiveDashboard />
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-clock" style={{ fontSize: 14, color: '#33c972' }} />
              Audit delivered within 48 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div id="faq" style={{ background: T.bgLight, padding: '88px 64px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>FAQ</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 38, fontWeight: 900, color: T.text, marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: T.text, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)' }} />
      <div className="cm-cta-inner" style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 70, height: 70, background: 'rgba(0,163,77,0.16)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(0,163,77,0.32)' }}>
            <i className="ti ti-pencil" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Ready to Build Content That Compounds?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Get your free audit — we'll map exactly what content it takes to own your category.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="cm-magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.38)' }}>Get My Free Audit →</button>
          </a>
          <button className="cm-magnetic-btn-outline" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.22)', cursor: 'pointer' }}>View Case Studies →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export default function ContentMarketingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Poppins',sans-serif;background:${T.bgLight};color:${T.text};line-height:1.6;font-size:14px;}
        #services,#work,#process,#faq{scroll-margin-top:90px;}

        @keyframes glowPulseCM{0%,100%{opacity:0.55}50%{opacity:0.88}}
        @keyframes spinRingCM{from{transform:rotateX(70deg) rotateZ(0deg)}to{transform:rotateX(70deg) rotateZ(360deg)}}
        @keyframes spinRingCM2{from{transform:rotateX(50deg) rotateY(20deg) rotateZ(0deg)}to{transform:rotateX(50deg) rotateY(20deg) rotateZ(-360deg)}}
        @keyframes floatUpCM{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes floatDnCM{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
        @keyframes slideInLeftCM{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRightCM{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulseDotCM{0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,0.25)}50%{box-shadow:0 0 0 6px rgba(0,163,77,0.1)}}
        @keyframes gradientMoveCM{0%{background-position:0%}100%{background-position:200%}}
        @keyframes fadeUpCM{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        .cm-reveal{animation:fadeUpCM 0.7s cubic-bezier(0.22,1,0.36,1) both;}
        .cm-magnetic-btn{transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.25s ease;}
        .cm-magnetic-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 30px rgba(0,163,77,0.32);}
        .cm-magnetic-btn-outline{transition:transform 0.25s ease,border-color 0.25s ease,color 0.25s ease;}
        .cm-magnetic-btn-outline:hover{transform:translateY(-3px);border-color:${T.primary} !important;color:${T.primary} !important;}

        .cm-enq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .cm-enq-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:12px 14px;color:#fff;font-size:13px;font-family:'Poppins',sans-serif;outline:none;transition:border-color 0.25s ease,background 0.25s ease;}
        .cm-enq-input::placeholder{color:rgba(255,255,255,0.32);}
        .cm-enq-input:focus{border-color:${T.primary};background:rgba(0,163,77,0.08);}
        .cm-enq-select-wrap{position:relative;display:flex;align-items:center;}
        .cm-enq-select-icon{position:absolute;left:14px;font-size:14px;color:rgba(255,255,255,0.4);pointer-events:none;z-index:1;}
        .cm-enq-select{appearance:none;-webkit-appearance:none;padding-left:36px;padding-right:30px;cursor:pointer;color-scheme:dark;}
        .cm-enq-select-chevron{position:absolute;right:12px;font-size:14px;color:rgba(255,255,255,0.45);pointer-events:none;transition:transform 0.2s ease;}
        .cm-enq-select-wrap:focus-within .cm-enq-select-chevron{color:${T.primary};transform:rotate(180deg);}
        .cm-enq-select option{background:#071209;color:#fff;}

        @media(max-width:1024px){
          .cm-hero-grid{grid-template-columns:1fr !important;padding:56px 40px 48px !important;gap:40px !important;}
          .cm-stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-services-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-process-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-contact-grid{grid-template-columns:1fr !important;}
          .cm-cases-grid{grid-template-columns:repeat(2,1fr) !important;}
        }
        @media(max-width:640px){
          .cm-hero-grid{padding:40px 20px 36px !important;gap:28px !important;}
          .cm-services-grid{grid-template-columns:1fr !important;}
          .cm-process-grid{grid-template-columns:1fr 1fr !important;gap:24px !important;}
          .cm-cases-grid{grid-template-columns:1fr !important;}
          .cm-stats-grid{grid-template-columns:1fr 1fr !important;}
          .cm-contact-grid{grid-template-columns:1fr !important;}
          .cm-cta-inner{flex-direction:column !important;align-items:flex-start !important;}
          .cm-enq-row{grid-template-columns:1fr !important;}
        }
        @media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important;}}
      `}</style>
      <div id="top" style={{ fontFamily: 'Poppins,sans-serif', background: T.bgLight, color: T.text, lineHeight: 1.6, fontSize: 14 }}>
        <Hero />
        <StatsBand />
        <FormatsBand />
        <ServicesGrid />
        <CaseStudies />
        <HowWeWork />
        <Contact />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}