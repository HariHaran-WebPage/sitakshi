import React, { useState, useEffect, useRef } from 'react';

const T = {
  primary:      '#00a34d',
  primaryDark:  '#008040',
  primaryLight: '#e6f7ee',
  secondary:    '#ffffff',
  text:         '#1a1a2e',
  textLight:    '#6c757d',
  textLighter:  '#a0a8b0',
  border:       '#e9ecef',
  bgLight:      '#f8f9fa',
};

const RED_TOP  = '#ff8a7a';
const RED_MID  = '#e84033';
const RED_DARK = '#c42e24';

const ppcServices = [
  { icon: 'ti ti-brand-google', tag: '01', accent: 'dark', title: 'Google Search Ads', subtitle: 'Own The Search Bar', desc: 'Capture high-intent buyers at the exact moment they\'re searching. Keyword strategy, Quality Score optimisation, and ad copy that wins the click — and the conversion.', features: ['Keyword research', 'Match type strategy', 'Ad copy testing', 'Quality Score boost'], cta: 'Start Ranking' },
  { icon: 'ti ti-brand-youtube', tag: '02', accent: 'mid', title: 'YouTube & Display', subtitle: 'Interrupt Beautifully', desc: 'Video pre-rolls and display banners that earn attention instead of begging for it. Audience targeting, creative direction, and frequency capping that respects your budget.', features: ['Video script & creative', 'Audience targeting', 'Remarketing lists', 'Frequency capping'], cta: 'Go Visual' },
  { icon: 'ti ti-brand-meta', tag: '03', accent: 'light', title: 'Meta & Social PPC', subtitle: 'Find, Don\'t Wait', desc: 'Facebook and Instagram paid campaigns built around lookalike audiences, creative testing frameworks, and full-funnel retargeting that turns browsers into buyers.', features: ['Lookalike audiences', 'Creative A/B testing', 'Retargeting funnels', 'ROAS optimisation'], cta: 'Target Smarter' },
  { icon: 'ti ti-device-mobile', tag: '04', accent: 'soft', title: 'Shopping & PMax', subtitle: 'Show Up In The Cart', desc: 'Google Shopping and Performance Max campaigns that put your product in front of ready-to-buy audiences — with feed optimisation, bid strategy, and automated creative.', features: ['Feed optimisation', 'Performance Max', 'Smart bidding', 'Product segmentation'], cta: 'List My Products' },
  { icon: 'ti ti-users', tag: '05', accent: 'dark', title: 'Remarketing', subtitle: 'Close The Loop', desc: 'Re-engage visitors who didn\'t convert. Pixel setup, audience segmentation, and dynamic ads that follow the right people with the right message at the right time.', features: ['Pixel & tag setup', 'Audience segments', 'Dynamic remarketing', 'Sequential messaging'], cta: 'Recapture Leads' },
  { icon: 'ti ti-chart-bar', tag: '06', accent: 'mid', title: 'PPC Analytics & CRO', subtitle: 'Numbers That Drive Action', desc: 'Conversion tracking, attribution modelling, and landing page CRO that turns ad spend into measurable revenue. We show you what\'s working and scale it.', features: ['Conversion tracking', 'Attribution modelling', 'Landing page CRO', 'Monthly reporting'], cta: 'Track Everything' },
];

const processSteps = [
  { icon: 'ti ti-search', title: 'Audit', desc: 'We tear down your existing campaigns — or your competitors\' — and build a clear picture of where budget is wasted and where opportunity is hiding.' },
  { icon: 'ti ti-target', title: 'Build', desc: 'Account structure, keyword lists, ad copy, audiences, and landing page briefs — all built before we spend a single rupee of your budget.' },
  { icon: 'ti ti-rocket', title: 'Launch', desc: 'Campaigns go live with full conversion tracking, automated alerts, and daily spend monitoring to catch anything that moves against the plan.' },
  { icon: 'ti ti-trending-up', title: 'Scale', desc: 'Weekly optimisation cycles. We double down on what the data proves and pause what doesn\'t earn its place in the account.' },
];

const platforms = [
  { icon: 'ti ti-brand-google',   label: 'Google Ads'    },
  { icon: 'ti ti-brand-meta',     label: 'Meta Ads'      },
  { icon: 'ti ti-brand-linkedin', label: 'LinkedIn Ads'  },
  { icon: 'ti ti-brand-youtube',  label: 'YouTube Ads'   },
  { icon: 'ti ti-brand-bing',     label: 'Microsoft Ads' },
];

const caseStudies = [
  { company: 'NestFit', industry: 'D2C / Home Fitness', result: '6.8x ROAS', timeframe: '3 months', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format', quote: 'We\'d burned ₹18L on Google Ads with no idea what worked. They restructured everything in 3 weeks and our ROAS went from 1.4 to 6.8.', person: 'Rohan Mehta', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75&auto=format' },
  { company: 'Aurelle', industry: 'Fashion / Jewellery', result: '₹42L in 60 days', timeframe: '2 months', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format', quote: 'Meta Shopping campaigns completely replaced our organic dependency. We now have a predictable pipeline we can turn up or down based on inventory.', person: 'Priya Nair', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format' },
  { company: 'DocQueue', industry: 'SaaS / HealthTech', result: '₹380 cost per lead', timeframe: '45 days', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80&auto=format', quote: 'LinkedIn ads for B2B SaaS felt impossible at our budget. They found a Search + LinkedIn combo that cut our CPL by 64% inside six weeks.', person: 'Aditya Srinivas', role: 'Head of Growth', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&q=75&auto=format' },
];

const faqs = [
  { q: 'What is the minimum budget to start PPC?', a: 'We typically recommend ₹30,000–₹50,000/month in ad spend to generate enough data for optimisation. Smaller budgets can work for very niche keywords.' },
  { q: 'How quickly will I see results?', a: 'Search campaigns often show traction in 2–4 weeks. Full optimisation with data-backed decisions usually takes 60–90 days.' },
  { q: 'Do you manage the ad spend directly?', a: 'Ad spend stays in your own Google/Meta account — we manage strategy and execution. You always own the account and the data.' },
  { q: 'What platforms do you run ads on?', a: 'Google Search, Display, YouTube, Shopping, Performance Max, Meta (Facebook + Instagram), LinkedIn, and Microsoft Ads.' },
  { q: 'How do you report performance?', a: 'Live dashboard access plus a monthly video walkthrough of spend, ROAS, CPL, and recommendations for the next month.' },
];

const IMAGES = {
  av1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&q=75&auto=format',
  av2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75&auto=format',
};

const enquiryTypes = ['Google Search Ads', 'Meta / Instagram Ads', 'YouTube Ads', 'Google Shopping / PMax', 'Remarketing', 'Full PPC Management', 'Free PPC Audit'];

const easeOutBack = t => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
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
      r: 120 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      opacity: 0.025 + Math.random() * 0.045, hue: 145 + Math.random() * 30,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},75%,42%,${o.opacity})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
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

/* ══ ISO CUBE ══ */
function IsoCube({ cx, cy, size = 96, letter, floatY = 0, dropProgress = 0 }) {
  const hw = size * 0.5, th = size * 0.28, fh = size * 0.68;
  const dy = (1 - easeOutBack(Math.min(dropProgress, 1))) * -340;
  const oy = floatY, y = cy + dy + oy, op = Math.min(dropProgress * 3, 1);
  const top   = `${cx},${y-th} ${cx+hw},${y} ${cx},${y+th} ${cx-hw},${y}`;
  const left  = `${cx-hw},${y} ${cx},${y+th} ${cx},${y+th+fh} ${cx-hw},${y+fh}`;
  const right = `${cx+hw},${y} ${cx},${y+th} ${cx},${y+th+fh} ${cx+hw},${y+fh}`;
  const shadowY = cy + th + fh + 12 + oy;
  return (
    <g style={{ opacity: op }}>
      <defs>
        <filter id={`cubeShadow${letter}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
      <ellipse cx={cx} cy={shadowY} rx={hw*0.88} ry={th*0.5} fill="rgba(0,0,0,0.13)" />
      <polygon points={top}   fill={RED_TOP}  stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" filter={`url(#cubeShadow${letter})`} />
      <polygon points={left}  fill={RED_MID}  stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      <polygon points={right} fill={RED_DARK} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      {/* highlight sheen on top face */}
      <polygon points={top} fill="url(#topSheen)" opacity="0.22" />
      <text x={cx - hw/2} y={y + th + fh * 0.62}
        textAnchor="middle" fontFamily="'Playfair Display',Georgia,serif"
        fontSize={size * 0.4} fontWeight="900" fill="rgba(255,255,255,0.95)"
        style={{ userSelect: 'none' }}
      >{letter}</text>
    </g>
  );
}

/* ══ FLOATING BADGE ══ */
function FloatBadge({ x, y, emoji, label, value, visible, floatY = 0 }) {
  return (
    <g style={{
      opacity: visible ? 1 : 0,
      transform: `translateY(${floatY}px)`,
      transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.08s linear',
      filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))',
    }}>
      <rect x={x} y={y} width={138} height={50} rx={13}
        fill="rgba(255,255,255,0.97)" stroke="rgba(0,163,77,0.2)" strokeWidth="1.2" />
      <rect x={x} y={y} width={44} height={50} rx={12} fill={T.primaryLight} />
      <text x={x+22} y={y+31} textAnchor="middle" fontSize={19}>{emoji}</text>
      <text x={x+56} y={y+20} fontSize={8} fontWeight="700" fill="#9ca3af"
        fontFamily="Poppins,sans-serif" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</text>
      <text x={x+56} y={y+37} fontSize={15} fontWeight="800" fill="#111827"
        fontFamily="Poppins,sans-serif">{value}</text>
    </g>
  );
}

/* ══════════════════════════════════════════════
   REALISTIC HUMAN CHARACTER
   — full body, detailed face, professional look
══════════════════════════════════════════════ */
function RealisticCharacter({ baseX, baseY, phase, walkProgress, tick }) {
  const isWalking = walkProgress < 0.97;
  const isIdle    = phase >= 3;
  const charX     = baseX + (1 - Math.min(walkProgress, 1)) * 290;
  const opacity   = walkProgress > 0.04 ? 1 : 0;

  // walking gait
  const stride   = isWalking ? Math.sin(walkProgress * Math.PI * 9) * 20 : 0;
  const armSwing = isWalking ? Math.sin(walkProgress * Math.PI * 9) * 16 : 0;
  // idle breathing & sway
  const breathe  = isIdle ? Math.sin(tick * 0.028) * 1.4 : 0;
  const sway     = isIdle ? Math.sin(tick * 0.022) * 1.2 : 0;
  // idle arm bob
  const lArmRot  = isIdle ? Math.sin(tick * 0.024) * 5 : armSwing;
  const rArmRot  = isIdle ? -Math.sin(tick * 0.024 + 1.2) * 5 : -armSwing;

  // shorthand coords
  const bx = charX, by = baseY + breathe;

  return (
    <g style={{ opacity, transition: 'opacity 0.4s ease' }}>
      <defs>
        {/* Skin gradient — warm realistic tone */}
        <radialGradient id="skinFace" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#f4c89e" />
          <stop offset="60%" stopColor="#e8a870" />
          <stop offset="100%" stopColor="#d4925a" />
        </radialGradient>
        <radialGradient id="skinHand" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f0c090" />
          <stop offset="100%" stopColor="#c87840" />
        </radialGradient>
        {/* Suit jacket gradient */}
        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="50%" stopColor="#162d4a" />
          <stop offset="100%" stopColor="#0e1f33" />
        </linearGradient>
        <linearGradient id="suitLapel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#243d5f" />
          <stop offset="100%" stopColor="#0d1c30" />
        </linearGradient>
        {/* Shirt */}
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f9ff" />
          <stop offset="100%" stopColor="#dde4f0" />
        </linearGradient>
        {/* Tie */}
        <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00c45e" />
          <stop offset="100%" stopColor="#006830" />
        </linearGradient>
        {/* Trouser */}
        <linearGradient id="trouserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a2d40" />
          <stop offset="100%" stopColor="#0f1e2e" />
        </linearGradient>
        {/* Tablet screen */}
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="40%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d1b00" />
          <stop offset="100%" stopColor="#1a0f00" />
        </linearGradient>
        <filter id="charShadow" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.18)" />
        </filter>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={bx} cy={by + 168} rx={38} ry={9}
        fill="rgba(0,0,0,0.1)"
        style={{ transform: `scaleX(${isWalking ? 1.1 : 1})`, transformOrigin: `${bx}px ${by+168}px` }}
      />

      {/* ── WHOLE BODY PIVOT (sway) ── */}
      <g style={{ transform: `rotate(${sway}deg)`, transformOrigin: `${bx}px ${by+80}px` }}>

        {/* ── LEGS ── */}
        {/* Left leg */}
        <g style={{ transform: `rotate(${-stride}deg)`, transformOrigin: `${bx-10}px ${by+104}px` }}>
          {/* thigh */}
          <path d={`M${bx-22},${by+100} Q${bx-20},${by+118} ${bx-18},${by+130}`}
            stroke="#1a2d40" strokeWidth="17" strokeLinecap="round" fill="none" />
          <path d={`M${bx-22},${by+100} Q${bx-20},${by+118} ${bx-18},${by+130}`}
            stroke="#243d54" strokeWidth="15" strokeLinecap="round" fill="none" />
          {/* shin */}
          <path d={`M${bx-18},${by+130} Q${bx-17},${by+148} ${bx-16},${by+158}`}
            stroke="#1a2d40" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* shoe */}
          <ellipse cx={bx-14} cy={by+162} rx={14} ry={7} fill="#111827" />
          <ellipse cx={bx-18} cy={by+160} rx={10} ry={6} fill="#1f2937" />
          <path d={`M${bx-28},${by+160} Q${bx-24},${by+165} ${bx-4},${by+163}`}
            stroke="#374151" strokeWidth="1.5" fill="none" />
        </g>
        {/* Right leg */}
        <g style={{ transform: `rotate(${stride}deg)`, transformOrigin: `${bx+10}px ${by+104}px` }}>
          <path d={`M${bx+22},${by+100} Q${bx+20},${by+118} ${bx+18},${by+130}`}
            stroke="#0f1e2e" strokeWidth="17" strokeLinecap="round" fill="none" />
          <path d={`M${bx+22},${by+100} Q${bx+20},${by+118} ${bx+18},${by+130}`}
            stroke="#1a2d40" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d={`M${bx+18},${by+130} Q${bx+17},${by+148} ${bx+16},${by+158}`}
            stroke="#0f1e2e" strokeWidth="14" strokeLinecap="round" fill="none" />
          <ellipse cx={bx+14} cy={by+162} rx={14} ry={7} fill="#111827" />
          <ellipse cx={bx+18} cy={by+160} rx={10} ry={6} fill="#1f2937" />
          <path d={`M${bx+4},${by+163} Q${bx+24},${by+165} ${bx+28},${by+160}`}
            stroke="#374151" strokeWidth="1.5" fill="none" />
        </g>

        {/* ── TORSO — suit jacket ── */}
        {/* Back jacket panels */}
        <path d={`M${bx-28},${by+44} L${bx-32},${by+100} L${bx-16},${by+102} L${bx-10},${by+60} Z`}
          fill="url(#suitGrad)" />
        <path d={`M${bx+28},${by+44} L${bx+32},${by+100} L${bx+16},${by+102} L${bx+10},${by+60} Z`}
          fill="url(#suitGrad)" />
        {/* Main torso body */}
        <rect x={bx-26} y={by+38} width={52} height={64} rx={12}
          fill="url(#suitGrad)" />
        {/* Shirt front */}
        <path d={`M${bx-8},${by+40} L${bx+8},${by+40} L${bx+8},${by+96} L${bx-8},${by+96} Z`}
          fill="url(#shirtGrad)" />
        {/* Suit lapels */}
        <path d={`M${bx-8},${by+40} L${bx-26},${by+55} L${bx-18},${by+70} L${bx-8},${by+62} Z`}
          fill="url(#suitLapel)" />
        <path d={`M${bx+8},${by+40} L${bx+26},${by+55} L${bx+18},${by+70} L${bx+8},${by+62} Z`}
          fill="url(#suitLapel)" />
        {/* Lapel sheen */}
        <path d={`M${bx-24},${by+57} L${bx-17},${by+52} L${bx-10},${by+64}`}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Tie */}
        <path d={`M${bx-4},${by+42} L${bx+4},${by+42} L${bx+6},${by+60} L${bx},${by+78} L${bx-6},${by+60} Z`}
          fill="url(#tieGrad)" />
        <path d={`M${bx-3},${by+43} L${bx+3},${by+43} L${bx+2},${by+52} L${bx},${by+55} L${bx-2},${by+52} Z`}
          fill="rgba(255,255,255,0.15)" />
        {/* Tie knot */}
        <path d={`M${bx-5},${by+42} L${bx+5},${by+42} L${bx+4},${by+48} L${bx},${by+50} L${bx-4},${by+48} Z`}
          fill="#00a34d" />
        {/* Shirt collar */}
        <path d={`M${bx-8},${by+38} L${bx-14},${by+46} L${bx-5},${by+48} L${bx},${by+42} Z`}
          fill="url(#shirtGrad)" />
        <path d={`M${bx+8},${by+38} L${bx+14},${by+46} L${bx+5},${by+48} L${bx},${by+42} Z`}
          fill="url(#shirtGrad)" />
        {/* Jacket buttons */}
        <circle cx={bx} cy={by+72} r={2.2} fill="rgba(255,255,255,0.2)" />
        <circle cx={bx} cy={by+83} r={2.2} fill="rgba(255,255,255,0.2)" />
        {/* Pocket square */}
        <path d={`M${bx-24},${by+55} L${bx-20},${by+52} L${bx-18},${by+56} L${bx-23},${by+57} Z`}
          fill="#ffffff" opacity="0.7" />
        <path d={`M${bx-19},${by+52} L${bx-17},${by+51} L${bx-16},${by+55}`}
          stroke="white" strokeWidth="0.8" fill="none" />

        {/* ── LEFT ARM (holds nothing, swings) ── */}
        <g style={{ transform: `rotate(${lArmRot}deg)`, transformOrigin: `${bx-24}px ${by+48}px` }}>
          {/* upper arm */}
          <path d={`M${bx-24},${by+50} Q${bx-32},${by+66} ${bx-34},${by+78}`}
            stroke="#1e3a5f" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d={`M${bx-24},${by+50} Q${bx-32},${by+66} ${bx-34},${by+78}`}
            stroke="#243d5f" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* forearm */}
          <path d={`M${bx-34},${by+78} Q${bx-34},${by+90} ${bx-30},${by+98}`}
            stroke="#1e3a5f" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* cuff */}
          <path d={`M${bx-34},${by+78} Q${bx-34},${by+90} ${bx-30},${by+98}`}
            stroke="url(#shirtGrad)" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* left hand */}
          <ellipse cx={bx-29} cy={by+101} rx={9} ry={7} fill="url(#skinHand)" />
          <path d={`M${bx-38},${by+99} Q${bx-35},${by+95} ${bx-30},${by+96}`}
            stroke="#d4925a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d={`M${bx-36},${by+102} Q${bx-33},${by+98} ${bx-28},${by+99}`}
            stroke="#d4925a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d={`M${bx-33},${by+105} Q${bx-30},${by+101} ${bx-26},${by+103}`}
            stroke="#d4925a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d={`M${bx-30},${by+107} Q${bx-27},${by+104} ${bx-24},${by+105}`}
            stroke="#d4925a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* ── RIGHT ARM (holds tablet) ── */}
        <g style={{ transform: `rotate(${rArmRot - 14}deg)`, transformOrigin: `${bx+24}px ${by+48}px` }}>
          <path d={`M${bx+24},${by+50} Q${bx+32},${by+62} ${bx+36},${by+74}`}
            stroke="#1e3a5f" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d={`M${bx+24},${by+50} Q${bx+32},${by+62} ${bx+36},${by+74}`}
            stroke="#243d5f" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d={`M${bx+36},${by+74} Q${bx+38},${by+86} ${bx+36},${by+96}`}
            stroke="#1e3a5f" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* right hand */}
          <ellipse cx={bx+35} cy={by+100} rx={9} ry={7} fill="url(#skinHand)" />
          {/* Tablet */}
          {isIdle && (
            <g>
              <rect x={bx+10} y={by+66} width={42} height={54} rx={5} fill="#1e293b" />
              <rect x={bx+13} y={by+69} width={36} height={44} rx={3} fill="url(#screenGrad)" />
              {/* screen UI */}
              <rect x={bx+16} y={by+72} width={20} height={3} rx={1.5} fill="rgba(255,255,255,0.7)" />
              <rect x={bx+16} y={by+77} width={14} height={2} rx={1} fill="rgba(255,255,255,0.4)" />
              <rect x={bx+16} y={by+82} width={28} height={12} rx={2} fill="rgba(0,0,0,0.25)" />
              <rect x={bx+18} y={by+84} width={10} height={2} rx={1} fill="#00e87a" />
              <rect x={bx+18} y={by+87} width={16} height={2} rx={1} fill="rgba(255,255,255,0.5)" />
              <rect x={bx+18} y={by+90} width={12} height={2} rx={1} fill="rgba(255,255,255,0.3)" />
              {/* bar chart mini */}
              <rect x={bx+16} y={by+99} width={4} height={8} rx={1} fill="#34d399" />
              <rect x={bx+22} y={by+96} width={4} height={11} rx={1} fill="#60a5fa" />
              <rect x={bx+28} y={by+93} width={4} height={14} rx={1} fill="#f472b6" />
              <rect x={bx+34} y={by+97} width={4} height={10} rx={1} fill="#fbbf24" />
              {/* home button */}
              <circle cx={bx+31} cy={by+116} r={2} fill="rgba(255,255,255,0.3)" />
            </g>
          )}
        </g>

        {/* ── NECK ── */}
        <rect x={bx-8} y={by+26} width={16} height={17} rx={7}
          fill="#e8a870" />
        <rect x={bx-5} y={by+36} width={10} height={6} rx={3}
          fill="url(#shirtGrad)" />

        {/* ── HEAD ── */}
        <g filter="url(#charShadow)">
          {/* skull shape */}
          <ellipse cx={bx} cy={by+12} rx={22} ry={20} fill="url(#skinFace)" />
          {/* chin refinement */}
          <path d={`M${bx-15},${by+20} Q${bx},${by+34} ${bx+15},${by+20}`}
            fill="url(#skinFace)" />

          {/* ── HAIR ── realistic with volume */}
          <path d={`M${bx-22},${by+10} Q${bx-24},${by-12} ${bx},${by-10} Q${bx+24},${by-12} ${bx+22},${by+10}`}
            fill="url(#hairGrad)" />
          {/* hair top texture strands */}
          <path d={`M${bx-18},${by+4} Q${bx-12},${by-8} ${bx},${by-8}`}
            stroke="#1a0f00" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d={`M${bx},${by-8} Q${bx+12},${by-8} ${bx+18},${by+4}`}
            stroke="#1a0f00" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
          {/* sideburns */}
          <path d={`M${bx-22},${by+10} Q${bx-24},${by+16} ${bx-22},${by+22}`}
            stroke="#2d1b00" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d={`M${bx+22},${by+10} Q${bx+24},${by+16} ${bx+22},${by+22}`}
            stroke="#2d1b00" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* ears — detailed concha */}
          <ellipse cx={bx-22} cy={by+16} rx={5} ry={6.5} fill="#e0956a" />
          <ellipse cx={bx-22} cy={by+16} rx={3} ry={4.5} fill="#d4845a" />
          <path d={`M${bx-22},${by+13} Q${bx-24},${by+16} ${bx-22},${by+19}`}
            stroke="#c07848" strokeWidth="1.2" fill="none" />
          <ellipse cx={bx+22} cy={by+16} rx={5} ry={6.5} fill="#e0956a" />
          <ellipse cx={bx+22} cy={by+16} rx={3} ry={4.5} fill="#d4845a" />
          <path d={`M${bx+22},${by+13} Q${bx+24},${by+16} ${bx+22},${by+19}`}
            stroke="#c07848" strokeWidth="1.2" fill="none" />

          {/* ── FACE PLANES ── subtle shading */}
          {/* temple shadows */}
          <ellipse cx={bx-16} cy={by+12} rx={6} ry={8} fill="rgba(0,0,0,0.04)" />
          <ellipse cx={bx+16} cy={by+12} rx={6} ry={8} fill="rgba(0,0,0,0.04)" />
          {/* forehead highlight */}
          <ellipse cx={bx} cy={by+4} rx={9} ry={5} fill="rgba(255,255,255,0.15)" />

          {/* ── EYEBROWS — arched, groomed ── */}
          <path d={`M${bx-15},${by+8} Q${bx-10},${by+4} ${bx-5},${by+7}`}
            stroke="#1a0f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d={`M${bx+5},${by+7} Q${bx+10},${by+4} ${bx+15},${by+8}`}
            stroke="#1a0f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* ── EYES — detailed ── */}
          {/* eye socket shadows */}
          <ellipse cx={bx-9} cy={by+14} rx={7} ry={6} fill="rgba(100,50,10,0.08)" />
          <ellipse cx={bx+9} cy={by+14} rx={7} ry={6} fill="rgba(100,50,10,0.08)" />
          {/* whites */}
          <ellipse cx={bx-9} cy={by+14} rx={6} ry={5.5} fill="#f8f8f8" />
          <ellipse cx={bx+9} cy={by+14} rx={6} ry={5.5} fill="#f8f8f8" />
          {/* irises — dark brown */}
          <circle cx={bx-9}   cy={by+14.5} r={4}   fill="#3d2008" />
          <circle cx={bx+9}   cy={by+14.5} r={4}   fill="#3d2008" />
          {/* iris texture */}
          <circle cx={bx-9}   cy={by+14.5} r={3.8} fill="none" stroke="#5c3310" strokeWidth="0.8" />
          {/* pupils */}
          <circle cx={bx-8.5} cy={by+14}   r={2.2} fill="#0d0701" />
          <circle cx={bx+9.5} cy={by+14}   r={2.2} fill="#0d0701" />
          {/* catch lights */}
          <circle cx={bx-7.5} cy={by+12.8} r={1.1} fill="rgba(255,255,255,0.92)" />
          <circle cx={bx+10.5} cy={by+12.8} r={1.1} fill="rgba(255,255,255,0.92)" />
          <circle cx={bx-10} cy={by+15.5} r={0.6} fill="rgba(255,255,255,0.5)" />
          <circle cx={bx+8}  cy={by+15.5} r={0.6} fill="rgba(255,255,255,0.5)" />
          {/* upper eyelid line */}
          <path d={`M${bx-15},${by+12} Q${bx-9},${by+9} ${bx-3},${by+12}`}
            stroke="#1a0f00" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d={`M${bx+3},${by+12} Q${bx+9},${by+9} ${bx+15},${by+12}`}
            stroke="#1a0f00" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          {/* lower lash line */}
          <path d={`M${bx-15},${by+17} Q${bx-9},${by+19} ${bx-3},${by+17}`}
            stroke="rgba(50,20,5,0.35)" strokeWidth="0.8" fill="none" />
          <path d={`M${bx+3},${by+17} Q${bx+9},${by+19} ${bx+15},${by+17}`}
            stroke="rgba(50,20,5,0.35)" strokeWidth="0.8" fill="none" />

          {/* ── GLASSES ── refined frames */}
          <rect x={bx-16.5} y={by+9.5} width={13.5} height={10} rx={4}
            fill="rgba(255,255,255,0.04)" stroke="#1e3a5f" strokeWidth="1.6" />
          <rect x={bx+3}    y={by+9.5} width={13.5} height={10} rx={4}
            fill="rgba(255,255,255,0.04)" stroke="#1e3a5f" strokeWidth="1.6" />
          {/* bridge */}
          <path d={`M${bx-3},${by+14} Q${bx},${by+12} ${bx+3},${by+14}`}
            stroke="#1e3a5f" strokeWidth="1.4" fill="none" />
          {/* temples */}
          <line x1={bx-20} y1={by+13.5} x2={bx-16.5} y2={by+13.5} stroke="#1e3a5f" strokeWidth="1.4" />
          <line x1={bx+16.5} y1={by+13.5} x2={bx+20} y2={by+13.5} stroke="#1e3a5f" strokeWidth="1.4" />
          {/* lens glare */}
          <path d={`M${bx-16},${by+11} L${bx-14},${by+11} L${bx-15},${by+13}`}
            stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
          <path d={`M${bx+4},${by+11} L${bx+6},${by+11} L${bx+5},${by+13}`}
            stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />

          {/* ── NOSE ── realistic bridge + nostrils ── */}
          {/* bridge */}
          <path d={`M${bx-1},${by+16} L${bx-1},${by+22}`}
            stroke="rgba(150,80,30,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* tip */}
          <ellipse cx={bx} cy={by+23} rx={4.5} ry={3} fill="#da9060" opacity="0.6" />
          {/* nostrils */}
          <ellipse cx={bx-3} cy={by+24} rx={2} ry={1.4} fill="#c07040" opacity="0.7" />
          <ellipse cx={bx+3} cy={by+24} rx={2} ry={1.4} fill="#c07040" opacity="0.7" />
          {/* nose shadow */}
          <path d={`M${bx-5},${by+25} Q${bx},${by+26} ${bx+5},${by+25}`}
            stroke="rgba(150,70,20,0.2)" strokeWidth="1" fill="none" />

          {/* ── CHEEKS ── subtle blush ── */}
          <ellipse cx={bx-14} cy={by+22} rx={6.5} ry={3.5} fill="#f08080" opacity="0.18" />
          <ellipse cx={bx+14} cy={by+22} rx={6.5} ry={3.5} fill="#f08080" opacity="0.18" />

          {/* ── MOUTH & SMILE ── */}
          {/* upper lip */}
          <path d={`M${bx-7},${by+27} Q${bx-3.5},${by+25} ${bx},${by+26.5} Q${bx+3.5},${by+25} ${bx+7},${by+27}`}
            fill="#c07050" />
          {/* lower lip */}
          <path d={`M${bx-7},${by+27} Q${bx},${by+32} ${bx+7},${by+27}`}
            fill="#d4855a" />
          {/* lip highlight */}
          <path d={`M${bx-3},${by+28.5} Q${bx},${by+30} ${bx+3},${by+28.5}`}
            stroke="rgba(255,200,160,0.45)" strokeWidth="1.2" fill="none" />
          {/* teeth glimpse */}
          <path d={`M${bx-5},${by+27.5} Q${bx},${by+31} ${bx+5},${by+27.5}`}
            stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* smile crease lines */}
          <path d={`M${bx-9},${by+24} Q${bx-10},${by+27} ${bx-8},${by+29}`}
            stroke="rgba(160,90,40,0.25)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M${bx+9},${by+24} Q${bx+10},${by+27} ${bx+8},${by+29}`}
            stroke="rgba(160,90,40,0.25)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* chin cleft */}
          <path d={`M${bx-1},${by+30} L${bx+1},${by+30}`}
            stroke="rgba(160,80,30,0.2)" strokeWidth="1" fill="none" />
        </g>
      </g>
    </g>
  );
}

/* ══ DEFS for illustration ══ */
function IllusDefs() {
  return (
    <defs>
      <linearGradient id="topSheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e6f7ee" stopOpacity="0.6" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ══ MAIN ILLUSTRATION ══ */
function PPCIllustration() {
  const [phase, setPhase]             = useState(0);
  const [drops, setDrops]             = useState([0, 0, 0]);
  const [floats, setFloats]           = useState([0, 0, 0]);
  const [badgeVis, setBadgeVis]       = useState(false);
  const [walkProgress, setWalkProgress] = useState(0);
  const [tick, setTick]               = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let start = null;
    const PHASE1 = 180, PHASE2 = 1300, PHASE3 = 2700, DROP_DUR = 680, WALK_DUR = 1500;
    const loop = (ts) => {
      if (!start) start = ts;
      const el = ts - start;
      const d0 = Math.max(0, Math.min(1, (el - PHASE1) / DROP_DUR));
      const d1 = Math.max(0, Math.min(1, (el - PHASE1 - 140) / DROP_DUR));
      const d2 = Math.max(0, Math.min(1, (el - PHASE1 - 280) / DROP_DUR));
      setDrops([d0, d1, d2]);
      const walkP = Math.max(0, Math.min(1, (el - PHASE2) / WALK_DUR));
      setWalkProgress(walkP);
      if (el > PHASE3) {
        setTick(t => t + 1);
        const t = el * 0.001;
        setFloats([Math.sin(t * 1.2) * 7, Math.sin(t * 1.0 + 1) * 6, Math.sin(t * 1.4 + 2) * 7.5]);
        setBadgeVis(true); setPhase(3);
      } else if (el > PHASE2) setPhase(p => p < 2 ? 2 : p);
      else if (el > PHASE1)   setPhase(p => p < 1 ? 1 : p);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const bf1 = Math.sin(tick * 0.03) * 5;
  const bf2 = -Math.sin(tick * 0.025 + 1) * 4;

  return (
    <div style={{ width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg viewBox="0 0 460 480" width="100%" style={{ overflow: 'visible', maxWidth: 540 }}
        aria-label="PPC Pay Per Click animated illustration with realistic character">
        <IllusDefs />

        {/* subtle background glow behind cubes */}
        <ellipse cx={165} cy={280} rx={130} ry={80} fill="url(#bgGlow)" />

        {/* grid floor lines */}
        {[0,1,2].map(i => (
          <line key={i} x1={20} y1={422+i*14} x2={430} y2={422+i*14}
            stroke="rgba(0,163,77,0.05)" strokeWidth="1" strokeDasharray="5 8" />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={28+i*72} y1={422} x2={28+i*72} y2={446}
            stroke="rgba(0,163,77,0.04)" strokeWidth="1" />
        ))}

        {/* PAY PER CLICK label */}
        <g style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.9s ease 0.5s' }}>
          <rect x={326} y={76} width={3} height={90} rx="1.5" fill={T.primary} opacity="0.55" />
          {['PAY','PER','CLICK'].map((w, i) => (
            <text key={w} x={337} y={100+i*30}
              fontSize={14.5} fontWeight="800" fill={T.primary}
              fontFamily="Poppins,sans-serif" style={{ letterSpacing: '0.16em' }}>{w}</text>
          ))}
        </g>

        {/* orbit ring when idle */}
        {phase >= 3 && Array.from({ length: 8 }, (_, i) => {
          const ang = (tick * 0.007) + (i / 8) * Math.PI * 2;
          return (
            <circle key={i}
              cx={165 + Math.cos(ang) * 90}
              cy={255 + Math.sin(ang) * 30}
              r={i % 2 === 0 ? 2.8 : 1.8}
              fill={i % 2 === 0 ? T.primary : RED_MID}
              opacity={0.25 + Math.sin(tick*0.05+i)*0.15} />
          );
        })}

        {/* sparkle dots */}
        <g style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.5s ease 0.4s' }}>
          {[[50,40],[392,58],[408,296],[20,342],[204,18],[382,184]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy}
              r={i%3===0 ? 4.5 : 3}
              fill={i%2===0 ? T.primary : RED_MID}
              opacity={0.35 + Math.sin(tick*0.06+i)*0.25} />
          ))}
        </g>

        {/* PPC CUBES */}
        <IsoCube cx={165} cy={138} size={100} letter="P" floatY={floats[0]} dropProgress={drops[0]} />
        <IsoCube cx={90}  cy={268} size={100} letter="P" floatY={floats[1]} dropProgress={drops[1]} />
        <IsoCube cx={245} cy={268} size={100} letter="C" floatY={floats[2]} dropProgress={drops[2]} />

        {/* REALISTIC CHARACTER */}
        <RealisticCharacter
          baseX={356} baseY={278}
          phase={phase} walkProgress={walkProgress} tick={tick}
        />

        {/* METRIC BADGES */}
        <FloatBadge x={0}   y={58}  emoji="📈" label="Avg ROAS"  value="6.8×" visible={badgeVis} floatY={bf1}  />
        <FloatBadge x={0}   y={118} emoji="💰" label="Avg CPC"   value="₹22"  visible={badgeVis} floatY={bf2}  />
        <FloatBadge x={298} y={170} emoji="✅" label="Conv Rate" value="5.6%" visible={badgeVis} floatY={bf1}  />
        <FloatBadge x={298} y={228} emoji="🎯" label="Campaigns" value="200+" visible={badgeVis} floatY={bf2}  />
      </svg>

      {/* trust strip */}
      <div style={{
        display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center',
        opacity: badgeVis ? 1 : 0, transition: 'opacity 0.9s ease 0.4s',
      }}>
        {[{val:'6.8×',label:'Avg. ROAS'},{val:'₹22',label:'Avg. CPC'},{val:'5.6%',label:'Conv. Rate'},{val:'200+',label:'Campaigns'}].map(b => (
          <div key={b.label} style={{
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,163,77,0.18)', borderRadius: 12,
            padding: '9px 18px', textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.primary, lineHeight: 1 }}>{b.val}</div>
            <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ SERVICE CARD ══ */
const accentMap = {
  dark:  { bg:'#0a140e', border:'rgba(0,163,77,0.18)', bar:'linear-gradient(90deg,#008040,#00a34d,#33c972)', iconBg:'rgba(0,163,77,0.14)', iconColor:'#33c972', tagColor:'#33c972', titleColor:'#fff', descColor:'rgba(255,255,255,0.58)', featColor:'rgba(255,255,255,0.5)', hoverBorder:'rgba(0,163,77,0.48)', hoverShadow:'0 24px 60px -12px rgba(0,128,64,0.38)' },
  mid:   { bg:'#061209', border:'rgba(0,163,77,0.15)', bar:'linear-gradient(90deg,#004d26,#008040,#00a34d)', iconBg:'rgba(0,128,64,0.2)', iconColor:'#66d49a', tagColor:'#66d49a', titleColor:'#edfaf3', descColor:'rgba(180,240,210,0.68)', featColor:'rgba(180,240,210,0.54)', hoverBorder:'rgba(0,163,77,0.42)', hoverShadow:'0 24px 60px -12px rgba(0,64,26,0.58)' },
  light: { bg:'#ffffff', border:T.border, bar:'linear-gradient(90deg,#00a34d,#33c972,#80e0aa)', iconBg:T.primaryLight, iconColor:T.primaryDark, tagColor:T.primary, titleColor:T.text, descColor:T.textLight, featColor:T.textLight, hoverBorder:'rgba(0,163,77,0.35)', hoverShadow:'0 24px 60px -16px rgba(0,0,0,0.12)' },
  soft:  { bg:'#ffffff', border:T.border, bar:'linear-gradient(90deg,#33c972,#80e0aa,#b3f0cc)', iconBg:T.primaryLight, iconColor:T.primary, tagColor:T.primary, titleColor:T.text, descColor:T.textLight, featColor:T.textLighter, hoverBorder:'rgba(0,163,77,0.3)', hoverShadow:'0 24px 60px -16px rgba(0,0,0,0.10)' },
};

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const a = accentMap[svc.accent];
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:a.bg, border:`1px solid ${hovered?a.hoverBorder:a.border}`,
        borderRadius:24, padding:'28px 26px 30px', position:'relative', overflow:'hidden', cursor:'default',
        opacity:visible?1:0, transform:visible?(hovered?'translateY(-8px)':'translateY(0)'):'translateY(28px)',
        transition:`opacity 0.5s ease ${index*80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`,
        boxShadow:hovered?a.hoverShadow:'0 1px 2px rgba(0,0,0,0.04)',
      }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle at 100% 0%,${a.iconColor}16 0%,transparent 55%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:hovered?3:2.5, background:a.bar, transition:'height 0.35s ease' }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <span style={{ fontFamily:'Playfair Display,serif', fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:a.tagColor, opacity:0.55, display:'block', marginBottom:6 }}>{svc.tag}</span>
          <div style={{ fontSize:10.5, color:a.tagColor, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width:46, height:46, background:a.iconBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:a.iconColor, fontSize:22, flexShrink:0, border:`1px solid ${a.iconColor}33`, boxShadow:hovered?`0 8px 20px -6px ${a.iconColor}55`:'none', transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease', transform:hovered?'scale(1.1) rotate(-4deg)':'scale(1)' }}>
          <i className={svc.icon} aria-hidden="true" />
        </div>
      </div>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:800, color:a.titleColor, marginBottom:12, lineHeight:1.2, letterSpacing:'-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize:13.5, color:a.descColor, lineHeight:1.8, marginBottom:20 }}>{svc.desc}</p>
      <div style={{ height:1, background:`linear-gradient(90deg,${a.iconColor}30,transparent)`, marginBottom:18 }} />
      <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 12px' }}>
        {svc.features.map((f,i) => (
          <li key={i} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:a.featColor }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:a.iconColor, flexShrink:0 }} />
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button style={{ background:hovered?a.iconColor:'transparent', border:`1.5px solid ${a.iconColor}`, color:hovered?(svc.accent==='light'||svc.accent==='soft'?'#fff':'#051a0b'):a.iconColor, borderRadius:11, padding:'12px 20px', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12.5, cursor:'pointer', transition:'all 0.3s ease', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
        {svc.cta}
        <i className="ti ti-arrow-right" style={{ fontSize:14, transform:hovered?'translateX(2px)':'translateX(0)', transition:'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} style={{ padding:'40px 28px', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:14, alignItems:'center' }}>
      <div style={{ width:52, height:52, background:'rgba(0,163,77,0.14)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:'#00a34d', fontSize:24, flexShrink:0, border:'1px solid rgba(0,163,77,0.22)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:32, fontWeight:900, lineHeight:1, letterSpacing:'-1px', background:'linear-gradient(135deg,#ffffff 0%,#b3f0cc 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {count}{suffix}
        </div>
        <div style={{ fontSize:10, color:T.textLighter, fontWeight:500, marginTop:4, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</div>
      </div>
    </div>
  );
}

function CaseStudyCard({ cs, index }) {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:20, overflow:'hidden', background:'#fff', border:`1px solid ${hov?'rgba(0,163,77,0.32)':T.border}`, boxShadow:hov?'0 20px 50px -12px rgba(0,163,77,0.18)':'0 2px 8px rgba(0,0,0,0.04)', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(28px)', transition:`opacity 0.5s ease ${index*100}ms, transform 0.5s ease ${index*100}ms, box-shadow 0.4s ease, border-color 0.4s ease` }}>
      <div style={{ position:'relative', height:160, overflow:'hidden' }}>
        <img src={cs.img} alt={cs.company} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.48) saturate(0.75)', transform:hov?'scale(1.04)':'scale(1)', transition:'transform 0.5s ease' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,64,26,0.75),rgba(0,0,0,0.45))' }} />
        <div style={{ position:'absolute', top:16, left:16 }}>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.6)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{cs.industry}</div>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:900, color:'#fff' }}>{cs.company}</div>
        </div>
        <div style={{ position:'absolute', bottom:16, right:16, background:'rgba(0,163,77,0.22)', border:'1px solid rgba(0,163,77,0.44)', borderRadius:8, padding:'6px 12px', backdropFilter:'blur(8px)' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, fontWeight:700, color:'#66d49a' }}>{cs.result}</div>
          <div style={{ fontSize:8, color:'rgba(255,255,255,0.55)', marginTop:1 }}>in {cs.timeframe}</div>
        </div>
      </div>
      <div style={{ padding:'20px 22px 22px' }}>
        <p style={{ fontFamily:'Playfair Display,serif', fontSize:14, fontWeight:700, color:T.text, lineHeight:1.6, marginBottom:16 }}>"{cs.quote}"</p>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src={cs.avatar} alt={cs.person} style={{ width:34, height:34, borderRadius:'50%', objectFit:'cover', border:`2px solid ${T.primaryLight}` }} />
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{cs.person}</div>
            <div style={{ fontSize:10.5, color:T.textLighter }}>{cs.role}, {cs.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ textAlign:'center', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:`opacity 0.5s ease ${index*100}ms, transform 0.5s ease ${index*100}ms` }}>
      <div style={{ width:72, height:72, background:'rgba(0,163,77,0.14)', border:'1px solid rgba(0,163,77,0.25)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', color:'#00a34d', fontSize:28, margin:'0 auto 18px' }}>
        <i className={step.icon} aria-hidden="true" />
      </div>
      <div style={{ fontFamily:'Playfair Display,serif', fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#33c972', opacity:0.6, marginBottom:8 }}>Step {index+1}</div>
      <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:800, color:'#fff', marginBottom:10 }}>{step.title}</h4>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:220, margin:'0 auto' }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:`1px solid ${T.border}`, padding:'20px 0' }}>
      <button onClick={()=>setOpen(!open)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:15, fontWeight:600, color:T.text, textAlign:'left', gap:16 }}>
        {item.q}
        <span style={{ width:28, height:28, borderRadius:'50%', background:open?T.text:T.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', color:open?'#33c972':T.primaryDark, fontSize:16, flexShrink:0, transition:'all 0.25s ease', transform:open?'rotate(180deg)':'rotate(0)' }}>{open?'−':'+'}</span>
      </button>
      <div style={{ maxHeight:open?220:0, overflow:'hidden', transition:'max-height 0.35s ease' }}>
        <p style={{ marginTop:12, fontSize:14, color:T.textLight, lineHeight:1.8, paddingRight:44 }}>{item.a}</p>
      </div>
    </div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:enquiryTypes[0], budget:'', message:'' });
  const [status, setStatus] = useState('idle');
  const update = (k,v) => setForm(p=>({...p,[k]:v}));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim()||!form.email.trim()||!form.message.trim()) return;
    setStatus('sending');
    setTimeout(()=>setStatus('sent'),1100);
  };
  if (status==='sent') return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:14, minHeight:320, justifyContent:'center' }}>
      <div style={{ width:52, height:52, borderRadius:14, background:'rgba(0,163,77,0.16)', border:'1.5px solid rgba(0,163,77,0.34)', display:'flex', alignItems:'center', justifyContent:'center', color:'#33c972', fontSize:24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:800, color:'#fff' }}>Audit request sent!</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:320 }}>Thanks{form.name.trim()?`, ${form.name.trim().split(' ')[0]}`:''} — your free PPC audit request is in. We reply within 4 hours with a full account teardown.</p>
      <button onClick={()=>{setStatus('idle');setForm({name:'',email:'',phone:'',type:enquiryTypes[0],budget:'',message:''}); }} style={{ background:'transparent', border:'1.5px solid rgba(0,163,77,0.42)', color:'#33c972', borderRadius:10, padding:'10px 18px', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer' }}>Send another</button>
    </div>
  );
  return (
    <div>
      <div style={{ width:52, height:52, background:'rgba(0,163,77,0.16)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:'#33c972', fontSize:22, marginBottom:20, border:'1.5px solid rgba(0,163,77,0.3)' }}><i className="ti ti-target" /></div>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:800, color:'#fff', marginBottom:8, letterSpacing:'-0.4px' }}>Get a Free PPC Audit</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:22, maxWidth:360 }}>Share your current ad account or goals — we'll audit your campaigns and show you exactly where budget is leaking.</p>
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <div className="ppc-row">
          <input className="ppc-input" type="text" placeholder="Full name" value={form.name} onChange={e=>update('name',e.target.value)} required />
          <input className="ppc-input" type="email" placeholder="Email address" value={form.email} onChange={e=>update('email',e.target.value)} required />
        </div>
        <div className="ppc-row">
          <input className="ppc-input" type="text" placeholder="Company / website URL" value={form.phone} onChange={e=>update('phone',e.target.value)} />
          <div className="ppc-select-wrap">
            <i className="ti ti-list-details ppc-select-icon" aria-hidden="true" />
            <select className="ppc-input ppc-select" value={form.type} onChange={e=>update('type',e.target.value)}>
              {enquiryTypes.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down ppc-select-chevron" aria-hidden="true" />
          </div>
        </div>
        <input className="ppc-input" type="text" placeholder="Monthly ad budget (e.g. ₹50,000)" value={form.budget} onChange={e=>update('budget',e.target.value)} />
        <textarea className="ppc-input" placeholder="Tell us your current campaigns, goals, and biggest challenges..." rows={4} value={form.message} onChange={e=>update('message',e.target.value)} required style={{ resize:'vertical', fontFamily:'Poppins,sans-serif' }} />
        <button type="submit" disabled={status==='sending'} style={{ background:T.primary, color:'#fff', padding:'13px 26px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, border:'none', cursor:status==='sending'?'default':'pointer', boxShadow:'0 6px 20px rgba(0,163,77,0.36)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, opacity:status==='sending'?0.75:1, marginTop:4 }}>
          {status==='sending'?'Sending…':'Get My Free Audit'}
          {status!=='sending'&&<i className="ti ti-arrow-right" style={{ fontSize:14 }} />}
        </button>
      </form>
    </div>
  );
}

function ROICalculator() {
  const [budget, setBudget] = useState(50000);
  const [cpc,    setCpc]    = useState(22);
  const [cvr,    setCvr]    = useState(5.5);
  const [aov,    setAov]    = useState(2400);
  const clicks  = Math.round(budget/cpc);
  const convs   = Math.round(clicks*(cvr/100));
  const revenue = convs*aov;
  const roas    = revenue/budget;
  const profit  = revenue-budget;
  return (
    <div style={{ background:'linear-gradient(165deg,#0a1610,#06100a)', border:'1px solid rgba(0,163,77,0.26)', borderRadius:20, padding:'28px 24px 24px', boxShadow:'0 24px 56px rgba(0,0,0,0.22)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, background:'radial-gradient(circle,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, background:'rgba(0,163,77,0.16)', border:'1px solid rgba(0,163,77,0.3)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <i className="ti ti-calculator" style={{ fontSize:16, color:'#33c972' }} />
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>PPC ROI Calculator</div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Estimate returns before you spend</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px 20px', marginBottom:20 }}>
        {[
          { label:'Monthly budget', val:budget, set:setBudget, min:10000, max:500000, step:5000, fmt:v=>`₹${(v/1000).toFixed(0)}K` },
          { label:'Avg. CPC', val:cpc, set:setCpc, min:5, max:200, step:1, fmt:v=>`₹${v}` },
          { label:'Conv. rate', val:cvr, set:setCvr, min:0.5, max:20, step:0.5, fmt:v=>`${v}%` },
          { label:'Avg. order value', val:aov, set:setAov, min:500, max:20000, step:100, fmt:v=>`₹${v.toLocaleString()}` },
        ].map(s => (
          <div key={s.label}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <span style={{ fontSize:9.5, color:'rgba(255,255,255,0.45)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</span>
              <span style={{ fontSize:11, fontWeight:700, color:'#33c972' }}>{s.fmt(s.val)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e=>s.set(Number(e.target.value))} style={{ width:'100%', accentColor:'#00a34d', height:3, cursor:'pointer' }} />
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
        {[
          { label:'Clicks', val:clicks.toLocaleString(), icon:'ti ti-click', hi:false },
          { label:'Conversions', val:convs, icon:'ti ti-check', hi:false },
          { label:'Revenue', val:`₹${(revenue/1000).toFixed(1)}K`, icon:'ti ti-currency-rupee', hi:true },
          { label:'ROAS', val:`${roas.toFixed(1)}x`, icon:'ti ti-trending-up', hi:true },
        ].map(r => (
          <div key={r.label} style={{ padding:'10px 8px', background:r.hi?'rgba(0,163,77,0.16)':'rgba(255,255,255,0.04)', border:`1px solid ${r.hi?'rgba(0,163,77,0.36)':'rgba(255,255,255,0.07)'}`, borderRadius:10, textAlign:'center' }}>
            <i className={r.icon} style={{ fontSize:14, color:r.hi?'#33c972':'rgba(255,255,255,0.4)', marginBottom:4, display:'block' }} />
            <div style={{ fontSize:r.hi?15:13, fontWeight:800, color:r.hi?'#33c972':'#fff', lineHeight:1 }}>{r.val}</div>
            <div style={{ fontSize:8, color:'rgba(255,255,255,0.35)', marginTop:3, textTransform:'uppercase' }}>{r.label}</div>
          </div>
        ))}
      </div>
      {profit>0&&(
        <div style={{ marginTop:12, padding:'9px 14px', background:'rgba(0,163,77,0.12)', border:'1px solid rgba(0,163,77,0.28)', borderRadius:10, display:'flex', alignItems:'center', gap:8 }}>
          <i className="ti ti-sparkles" style={{ fontSize:14, color:'#33c972' }} />
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.7)' }}>Estimated profit: <strong style={{ color:'#33c972' }}>₹{profit.toLocaleString()}</strong> after ad spend</span>
        </div>
      )}
    </div>
  );
}

/* ══ SECTIONS ══ */
function Hero() {
  return (
    <div style={{ position:'relative', overflow:'hidden', background:T.bgLight }}>
      <AnimatedBg />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(230,247,238,0.65) 0%,transparent 60%)', pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:`linear-gradient(to top,${T.bgLight},transparent)`, pointerEvents:'none', zIndex:1 }} />
      <div className="ppc-hero-grid" style={{ maxWidth:1320, margin:'0 auto', padding:'80px 64px 72px', display:'grid', gridTemplateColumns:'1fr 1.05fr', gap:48, alignItems:'center', position:'relative', zIndex:2 }}>
        <div>
          <div className="ppc-reveal" style={{ display:'inline-flex', alignItems:'center', gap:8, background:T.text, color:'#fff', fontSize:11, fontWeight:600, padding:'7px 16px 7px 10px', borderRadius:30, marginBottom:26, letterSpacing:'0.06em', textTransform:'uppercase' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:T.primary, boxShadow:'0 0 0 3px rgba(0,163,77,0.25)', display:'inline-block', animation:'pulsePPC 2s ease-in-out infinite' }} />
            💰 Pay Per Click Marketing
          </div>
          <h1 className="ppc-reveal" style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,5vw,54px)', fontWeight:900, lineHeight:1.06, color:T.text, letterSpacing:'-1.2px', marginBottom:20, animationDelay:'0.1s' }}>
            Every Rupee Spent.<br />
            <span style={{ background:`linear-gradient(135deg,${T.primaryDark} 0%,${T.primary} 55%,#33c972 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Every Click Earned.</span>
          </h1>
          <p className="ppc-reveal" style={{ fontSize:15, color:T.textLight, lineHeight:1.8, maxWidth:460, marginBottom:34, animationDelay:'0.18s' }}>
            PPC campaigns built to maximise ROAS — not just clicks. From Google Search to Meta Shopping, we turn ad spend into measurable, scalable revenue.
          </p>
          <div className="ppc-reveal" style={{ display:'flex', gap:12, marginBottom:32, flexWrap:'wrap', animationDelay:'0.26s' }}>
            <a href="#contact" style={{ textDecoration:'none' }}>
              <button className="magnetic-btn" style={{ background:T.primary, color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(0,163,77,0.36)' }}>Get Free PPC Audit →</button>
            </a>
            <a href="#calculator" style={{ textDecoration:'none' }}>
              <button className="magnetic-btn-outline" style={{ background:'#fff', color:T.text, padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, border:`1.5px solid ${T.border}`, cursor:'pointer' }}>Calculate My ROI</button>
            </a>
          </div>
          <div className="ppc-reveal" style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:28, animationDelay:'0.30s' }}>
            {[
              { icon:'ti-trending-up',    value:'6.8x', label:'Avg. ROAS delivered' },
              { icon:'ti-currency-rupee', value:'₹22',  label:'Avg. cost per click' },
              { icon:'ti-users',          value:'200+', label:'Campaigns managed'   },
            ].map(m => (
              <div key={m.label} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:12, background:'rgba(255,255,255,0.72)', border:`1px solid ${T.border}`, backdropFilter:'blur(8px)' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:T.primaryLight, border:'1px solid #b3f0cc', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <i className={`ti ${m.icon}`} style={{ fontSize:15, color:T.primaryDark }} />
                </div>
                <div>
                  <div style={{ fontFamily:'Playfair Display,serif', fontSize:16, fontWeight:900, color:T.text, lineHeight:1 }}>{m.value}</div>
                  <div style={{ fontSize:10, color:T.textLighter, marginTop:1 }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ppc-reveal" style={{ display:'flex', alignItems:'center', gap:10, paddingTop:24, borderTop:`1px solid ${T.border}`, animationDelay:'0.38s' }}>
            <div style={{ display:'flex' }}>
              {[IMAGES.av1,IMAGES.av2].map((src,i)=>(
                <img key={i} src={src} alt="" style={{ width:28, height:28, borderRadius:'50%', objectFit:'cover', border:`2px solid ${T.bgLight}`, marginLeft:i===0?0:-8 }} />
              ))}
            </div>
            <span style={{ fontSize:12, color:T.textLight }}>Trusted by <strong style={{ color:T.text }}>50+ businesses</strong> to manage their ad spend</span>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <PPCIllustration />
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    { icon:'ti ti-trending-up',    num:68,  suffix:'x', label:'Peak ROAS achieved'  },
    { icon:'ti ti-currency-rupee', num:22,  suffix:'',  label:'Avg. cost per click' },
    { icon:'ti ti-users',          num:200, suffix:'+', label:'Campaigns managed'   },
    { icon:'ti ti-chart-bar',      num:64,  suffix:'%', label:'Avg. CPL reduction'  },
  ];
  return (
    <div style={{ background:T.text, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${T.primaryDark},${T.primary},#33c972,${T.primary},${T.primaryDark},transparent)`, backgroundSize:'200% 100%', animation:'gradientMovePPC 3s linear infinite' }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(0,163,77,0.16) 1px,transparent 1px)', backgroundSize:'28px 28px', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents:'none' }} />
      <div className="ppc-stats-grid" style={{ maxWidth:1320, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', position:'relative', zIndex:1 }}>
        {stats.map((s,i)=><StatCell key={i} {...s} />)}
      </div>
    </div>
  );
}

function PlatformBand() {
  return (
    <div style={{ background:'#fff', padding:'36px 40px', borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1320, margin:'0 auto' }}>
        <div style={{ fontSize:10, color:T.textLighter, textTransform:'uppercase', letterSpacing:'0.1em', textAlign:'center', marginBottom:18, fontWeight:600 }}>Platforms we run ads on</div>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:32, flexWrap:'wrap' }}>
          {platforms.map(p=>(
            <span key={p.label} style={{ display:'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:700, color:T.textLighter }}>
              <i className={p.icon} style={{ fontSize:18 }} />{p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div id="services" style={{ maxWidth:1320, margin:'80px auto', padding:'0 40px' }}>
      <div style={{ display:'inline-block', background:T.primaryLight, color:T.primaryDark, fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #b3f0cc' }}>What We Run</div>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:T.text, marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>PPC That Actually Pays Back</h2>
      <p style={{ fontSize:15, color:T.textLight, lineHeight:1.7, maxWidth:480, marginBottom:48 }}>Six campaign types, one goal: your ad spend generates more revenue than it costs.</p>
      <div className="ppc-services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
        {ppcServices.map((svc,i)=><ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function CalculatorSection() {
  const { ref, visible } = useReveal();
  return (
    <div id="calculator" style={{ background:T.bgLight, padding:'80px 40px', borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1320, margin:'0 auto' }}>
        <div style={{ display:'inline-block', background:T.primaryLight, color:T.primaryDark, fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #b3f0cc' }}>ROI Calculator</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:T.text, marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Know Your Numbers Before You Spend</h2>
        <p style={{ fontSize:15, color:T.textLight, lineHeight:1.7, maxWidth:480, marginBottom:48 }}>Adjust the sliders to estimate clicks, conversions, revenue, and ROAS for your campaign.</p>
        <div ref={ref} className="ppc-calc-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'opacity 0.6s ease,transform 0.6s ease' }}>
          <div><ROICalculator /></div>
          <div>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:28, fontWeight:800, color:T.text, marginBottom:16, letterSpacing:'-0.5px' }}>What these numbers mean for your business</h3>
            <p style={{ fontSize:14, color:T.textLight, lineHeight:1.8, marginBottom:20 }}>ROAS (Return On Ad Spend) is the single most important PPC metric. A 3x ROAS means every ₹1 you spend returns ₹3 in revenue. We typically target 5–8x for e-commerce and 4–6x for lead generation.</p>
            {[
              { icon:'ti ti-target',     label:'Target ROAS',           val:'We set campaign-level ROAS targets so Google Smart Bidding optimises for revenue, not just clicks.' },
              { icon:'ti ti-chart-line', label:'Cost Per Acquisition',   val:'Every campaign is mapped to a CPA cap. If a keyword breaches the cap, we pause or restructure — not just flag it.' },
              { icon:'ti ti-test-pipe',  label:'Creative Testing',       val:'We run minimum 3 ad variants per ad group and rotate on statistical significance, not gut feel.' },
            ].map(b=>(
              <div key={b.label} style={{ display:'flex', gap:14, marginBottom:16 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:T.primaryLight, border:'1px solid #b3f0cc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                  <i className={b.icon} style={{ fontSize:16, color:T.primaryDark }} />
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:3 }}>{b.label}</div>
                  <div style={{ fontSize:13, color:T.textLight, lineHeight:1.7 }}>{b.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <div id="work" style={{ maxWidth:1320, margin:'80px auto', padding:'0 40px' }}>
      <div style={{ display:'inline-block', background:T.primaryLight, color:T.primaryDark, fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #b3f0cc' }}>Case Studies</div>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:T.text, marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Ad Spend That Worked</h2>
      <p style={{ fontSize:15, color:T.textLight, lineHeight:1.7, maxWidth:480, marginBottom:48 }}>Three accounts, three industries, three outcomes that changed how these businesses think about paid traffic.</p>
      <div className="ppc-cases-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
        {caseStudies.map((cs,i)=><CaseStudyCard key={i} cs={cs} index={i} />)}
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div id="process" style={{ background:T.text, padding:'80px 40px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-40%', right:'-10%', width:'55%', height:'180%', background:'radial-gradient(ellipse,rgba(0,163,77,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1320, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-block', background:'rgba(0,163,77,0.16)', color:'#33c972', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid rgba(0,163,77,0.28)' }}>How We Work</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#fff', marginBottom:56, lineHeight:1.1, letterSpacing:'-1px' }}>From Zero to Profitable in 4 Steps</h2>
        <div className="ppc-process-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40, position:'relative' }}>
          <div style={{ position:'absolute', top:36, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,rgba(0,163,77,0.32),rgba(0,163,77,0.32),transparent)' }} />
          {processSteps.map((step,i)=><ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  return (
    <div id="contact" style={{ maxWidth:1320, margin:'80px auto', padding:'0 40px' }}>
      <div style={{ display:'inline-block', background:T.primaryLight, color:T.primaryDark, fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #b3f0cc' }}>Get In Touch</div>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:T.text, marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Start With a Free PPC Audit</h2>
      <p style={{ fontSize:15, color:T.textLight, lineHeight:1.7, maxWidth:460, marginBottom:48 }}>We'll analyse your current campaigns — or build a launch plan from scratch — and show you exactly where the opportunity is.</p>
      <div ref={ref} className="ppc-contact-grid" style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:0, background:T.text, borderRadius:24, overflow:'hidden', border:'1.5px solid rgba(0,163,77,0.28)', boxShadow:'0 24px 64px rgba(0,163,77,0.14)', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding:'44px 40px', borderRight:'1px solid rgba(255,255,255,0.07)', position:'relative' }}>
          <div style={{ position:'absolute', top:'-30%', left:'-20%', width:'70%', height:'160%', background:'radial-gradient(ellipse,rgba(0,163,77,0.16) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}><EnquiryForm /></div>
        </div>
        <div style={{ padding:'40px 32px', background:'linear-gradient(165deg,#0a1410,#060e09)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-20%', right:'-30%', width:'80%', height:'80%', background:'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', fontWeight:600, letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:20 }}>What happens next</div>
            {[
              { icon:'ti ti-mail',   num:'01', title:'We confirm your request',       desc:'You\'ll get an email confirmation within 30 minutes.' },
              { icon:'ti ti-search', num:'02', title:'We audit your account',         desc:'Our team analyses your campaigns, keyword structure, Quality Scores, and landing pages.' },
              { icon:'ti ti-video',  num:'03', title:'You get a video walkthrough',   desc:'Within 48 hours: a 10-min recorded audit with specific recommendations and a launch plan.' },
              { icon:'ti ti-rocket', num:'04', title:'We start (if you\'re happy)',   desc:'No long contracts. We earn trust month by month with results.' },
            ].map((s,i)=>(
              <div key={i} style={{ display:'flex', gap:14, marginBottom:20 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:'rgba(0,163,77,0.14)', border:'1px solid rgba(0,163,77,0.26)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                  <i className={s.icon} style={{ fontSize:15, color:'#33c972' }} />
                </div>
                <div>
                  <div style={{ fontSize:8, color:'#33c972', fontWeight:700, letterSpacing:'0.1em', marginBottom:3 }}>{s.num}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#fff', marginBottom:3 }}>{s.title}</div>
                  <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>{s.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.07)', fontSize:12, color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center', gap:8 }}>
              <i className="ti ti-shield-check" style={{ fontSize:14, color:'#33c972' }} />
              No lock-in contracts · You own the ad account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div id="faq" style={{ background:T.bgLight, padding:'80px 40px', borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <div style={{ display:'inline-block', background:T.primaryLight, color:T.primaryDark, fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #b3f0cc' }}>FAQ</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:T.text, marginBottom:40, lineHeight:1.1, letterSpacing:'-1px' }}>Common Questions</h2>
        {faqs.map((item,i)=><FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background:T.text, borderTop:'1px solid rgba(255,255,255,0.06)', padding:'72px 40px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-50%', right:'-15%', width:'55%', height:'200%', background:'radial-gradient(ellipse,rgba(0,163,77,0.16) 0%,transparent 70%)' }} />
      <div className="ppc-cta-inner" style={{ maxWidth:1320, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:22 }}>
          <div style={{ width:70, height:70, background:'rgba(0,163,77,0.16)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#33c972', fontSize:30, flexShrink:0, border:'1.5px solid rgba(0,163,77,0.32)' }}>
            <i className="ti ti-target" />
          </div>
          <div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(22px,3vw,32px)', fontWeight:900, color:'#fff', marginBottom:8, letterSpacing:'-0.8px' }}>Ready to make your budget work harder?</h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15 }}>Get a free audit — we'll show you the exact changes that will improve your ROAS.</p>
          </div>
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', flexShrink:0 }}>
          <a href="#contact" style={{ textDecoration:'none' }}>
            <button className="magnetic-btn" style={{ background:T.primary, color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(0,163,77,0.38)' }}>Get My Free PPC Audit →</button>
          </a>
          <a href="#calculator" style={{ textDecoration:'none' }}>
            <button className="magnetic-btn-outline" style={{ background:'transparent', color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, border:'1.5px solid rgba(255,255,255,0.22)', cursor:'pointer' }}>Calculate My ROI →</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PPCPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Poppins',sans-serif;background:${T.bgLight};color:${T.text};line-height:1.6;font-size:14px;}
        #services,#work,#process,#faq,#contact,#calculator{scroll-margin-top:80px;}
        @keyframes pulsePPC{0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,0.25)}50%{box-shadow:0 0 0 6px rgba(0,163,77,0.1)}}
        @keyframes fadeUpPPC{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradientMovePPC{0%{background-position:0%}100%{background-position:200%}}
        .ppc-reveal{animation:fadeUpPPC 0.7s cubic-bezier(0.22,1,0.36,1) both;}
        .magnetic-btn{transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.25s ease;}
        .magnetic-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 30px rgba(0,163,77,0.32);}
        .magnetic-btn-outline{transition:transform 0.25s ease,border-color 0.25s ease,color 0.25s ease;}
        .magnetic-btn-outline:hover{transform:translateY(-3px);border-color:${T.primary}!important;color:${T.primary}!important;}
        .ppc-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .ppc-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:12px 14px;color:#fff;font-size:13px;font-family:'Poppins',sans-serif;outline:none;transition:border-color 0.25s ease,background 0.25s ease;}
        .ppc-input::placeholder{color:rgba(255,255,255,0.32);}
        .ppc-input:focus{border-color:${T.primary};background:rgba(0,163,77,0.08);}
        .ppc-select-wrap{position:relative;display:flex;align-items:center;}
        .ppc-select-icon{position:absolute;left:14px;font-size:14px;color:rgba(255,255,255,0.4);pointer-events:none;z-index:1;}
        .ppc-select{appearance:none;-webkit-appearance:none;padding-left:36px;padding-right:30px;cursor:pointer;color-scheme:dark;}
        .ppc-select-chevron{position:absolute;right:12px;font-size:14px;color:rgba(255,255,255,0.45);pointer-events:none;transition:transform 0.2s ease;}
        .ppc-select-wrap:focus-within .ppc-select-chevron{color:${T.primary};transform:rotate(180deg);}
        .ppc-select option{background:#071209;color:#fff;}
        input[type=range]{accent-color:${T.primary};}
        @media(max-width:1100px){
          .ppc-hero-grid{grid-template-columns:1fr!important;padding:56px 32px 48px!important;gap:36px!important;}
          .ppc-stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .ppc-services-grid{grid-template-columns:repeat(2,1fr)!important;}
          .ppc-process-grid{grid-template-columns:repeat(2,1fr)!important;gap:32px!important;}
          .ppc-contact-grid{grid-template-columns:1fr!important;}
          .ppc-cases-grid{grid-template-columns:repeat(2,1fr)!important;}
          .ppc-calc-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:768px){
          .ppc-hero-grid{padding:40px 20px 36px!important;gap:24px!important;}
          .ppc-services-grid{grid-template-columns:repeat(2,1fr)!important;}
          .ppc-process-grid{grid-template-columns:1fr 1fr!important;gap:24px!important;}
          .ppc-cases-grid{grid-template-columns:1fr!important;}
          .ppc-stats-grid{grid-template-columns:1fr 1fr!important;}
          .ppc-contact-grid{grid-template-columns:1fr!important;}
          .ppc-cta-inner{flex-direction:column!important;align-items:flex-start!important;}
          .ppc-row{grid-template-columns:1fr!important;}
        }
        @media(max-width:600px){
          .ppc-services-grid{grid-template-columns:1fr!important;padding:0 4px;}
        }
        @media(max-width:480px){
          .ppc-stats-grid{grid-template-columns:1fr 1fr!important;}
          .ppc-process-grid{grid-template-columns:1fr!important;}
        }
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
      `}</style>
      <div style={{ fontFamily:'Poppins,sans-serif', background:T.bgLight, color:T.text, lineHeight:1.6, fontSize:14 }}>
        <Hero />
        <StatsBand />
        <PlatformBand />
        <ServicesGrid />
        <CalculatorSection />
        <CaseStudies />
        <HowWeWork />
        <Contact />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}