import React, { useState, useEffect, useRef } from 'react';

const seoServices = [
  { icon: 'ti ti-search', accent: 'dark', tag: '01', title: 'Technical SEO', subtitle: 'Foundation First', desc: 'We audit and fix every crawlability issue, Core Web Vital, schema gap, and indexing error holding your site back from rankings it deserves.', features: ['Site speed & CWV', 'Schema markup', 'Crawl optimisation', 'Index health'], cta: 'Fix My Foundation' },
  { icon: 'ti ti-file-text', accent: 'mid', tag: '02', title: 'Content Strategy', subtitle: 'Rank-Ready Writing', desc: 'Keyword clusters, topical authority maps, and human-first content that search engines reward. We write, publish, and iterate — you own the traffic.', features: ['Keyword clustering', 'Topical authority', 'Content briefs', 'On-page optimisation'], cta: 'Build My Content Engine' },
  { icon: 'ti ti-link', accent: 'light', tag: '03', title: 'Link Building', subtitle: 'Authority at Scale', desc: 'White-hat outreach, digital PR, and HARO responses that earn links from real publications — compounding domain authority month after month.', features: ['Digital PR', 'HARO responses', 'Niche edits', 'Competitor backlinks'], cta: 'Earn My Authority' },
  { icon: 'ti ti-map-pin', accent: 'soft', tag: '04', title: 'Local SEO', subtitle: 'Dominate Your City', desc: 'Google Business Profile optimisation, local citations, and review management that puts your startup on the map — literally.', features: ['GBP optimisation', 'Citation building', 'Review strategy', 'Local schema'], cta: 'Own My Area' },
  { icon: 'ti ti-chart-line', accent: 'dark', tag: '05', title: 'SEO Analytics', subtitle: 'Data That Decides', desc: 'Custom GA4 + GSC dashboards, rank-tracking, and monthly reporting that shows exactly what moved and what to do next.', features: ['GA4 setup', 'GSC integration', 'Rank tracking', 'Monthly reports'], cta: 'See My Data' },
  { icon: 'ti ti-device-mobile', accent: 'mid', tag: '06', title: 'E-commerce SEO', subtitle: 'Product Page Wins', desc: 'Category architecture, product schema, faceted navigation fixes, and conversion-focused optimisation that turns organic clicks into revenue.', features: ['Category SEO', 'Product schema', 'Faceted nav fix', 'PDPs optimised'], cta: 'Grow My Store' },
];

const processSteps = [
  { icon: 'ti ti-radar', title: 'Audit', desc: 'Full technical + content audit. We find every gap between you and page 1 before writing a single line of copy.' },
  { icon: 'ti ti-map', title: 'Strategy', desc: 'Keyword clusters, topical authority maps, and a 90-day roadmap built around your business goals — not vanity metrics.' },
  { icon: 'ti ti-rocket', title: 'Execute', desc: 'On-page fixes, content publishing, and link outreach happen in parallel so momentum compounds fast.' },
  { icon: 'ti ti-trending-up', title: 'Scale', desc: 'Monthly reporting, rank tracking, and continuous iteration. We optimise what works and double down on winners.' },
];

const faqs = [
  { q: 'How long before I see results?', a: 'Most clients see measurable ranking improvements within 60–90 days. Significant traffic lifts typically occur at the 4–6 month mark. SEO is a compounding investment — the longer you run it, the better the return.' },
  { q: 'Do you write the content or just advise?', a: 'We do both — full done-for-you content production including keyword research, briefs, writing, editing, and on-page publishing. You own every asset we create.' },
  { q: 'Will you work with my existing dev team?', a: 'Absolutely. We integrate with your stack via PRs, Notion, Linear, or however your team works. Technical fixes get implemented your way.' },
  { q: 'How is this different from hiring an SEO agency?', a: "We're a product studio — not a 50-person agency reselling white-label work. Your account is managed by the same team that builds your features. No hand-offs, no account managers, no fluff." },
  { q: 'Do you guarantee rankings?', a: 'No ethical SEO company guarantees specific rankings — Google controls that. What we guarantee is transparent reporting, proven process, and measurable traffic growth within 6 months or we work for free until we deliver.' },
];

const caseStudies = [
  { company: 'Nimbus', industry: 'SaaS / Project Management', result: '+430% organic traffic', timeframe: '6 months', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format', quote: 'They took us from invisible to ranking #1 for our core keyword in under 5 months.', person: 'Reema Sharma', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&q=75&auto=format' },
  { company: 'Forge', industry: 'Dev Tools / API Platform', result: '#1 for 12 keywords', timeframe: '4 months', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format', quote: 'Our inbound pipeline went from zero to £80k MRR — mostly from organic search.', person: 'Aaron Kim', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=75&auto=format' },
  { company: 'Quanta', industry: 'FinTech / Analytics', result: '2.4M monthly impressions', timeframe: '8 months', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80&auto=format', quote: 'The content strategy alone cut our CAC by 60%. SEO is now our primary growth lever.', person: 'Priya Mehta', role: 'Head of Growth', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&q=75&auto=format' },
];

const IMAGES = {
  founder1: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&q=75&auto=format',
  founder2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=75&auto=format',
};

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
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

function useSceneScale(baseWidth = 560) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / baseWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);
  return { ref, scale };
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
    const orbs = Array.from({ length: 6 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 80 + Math.random() * 140, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, opacity: 0.04 + Math.random() * 0.08, hue: 130 + Math.random() * 40 }));
    const particles = Array.from({ length: 55 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.8, vx: (Math.random() - 0.5) * 0.18, vy: -0.05 - Math.random() * 0.2, opacity: 0.15 + Math.random() * 0.4, life: Math.random() }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},80%,55%,${o.opacity})`); g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      });
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += 0.004;
        if (p.y < -4 || p.life > 1) { p.x = Math.random() * W; p.y = H + 4; p.life = 0; p.opacity = 0.15 + Math.random() * 0.4; }
        const fade = Math.sin(p.life * Math.PI);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${p.opacity * fade})`; ctx.fill();
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

/* ══════════════════════════════════════════════════
   SPEEDOMETER — rebuilt as a realistic automotive-style
   performance gauge: brushed-metal bezel, glass highlight,
   printed tick marks with numerals, a weighted two-tone
   needle with a metal hub, and a small digital readout
   strip underneath the dial (the way a real dashboard
   pairs an analog gauge with a digital trip computer).

   NEEDLE FIX: the needle polygon is now drawn pointing
   straight UP from the hub (130,130) toward (130,32) in
   its own local coordinate space — i.e. before rotation.
   Because the rotation convention used by toRad()/ptOn()
   treats 0deg as "up" (12 o'clock) and increases clockwise,
   a needle that points up locally will land exactly on the
   tick matching needleDeg once rotated. The old polygon ran
   sideways (along the X axis) instead of up, so the visible
   needle was ~90° off from the score it was meant to show.
══════════════════════════════════════════════════ */
function Speedometer() {
  const [score, setScore] = useState(0);
  const [needleDeg, setNeedleDeg] = useState(-120);
  const [phase, setPhase] = useState('spin');
  const [glowPulse, setGlowPulse] = useState(false);
  const TARGET = 93;
  const START_DEG = -120;
  const END_DEG = 120;
  const TARGET_DEG = START_DEG + (TARGET / 100) * (END_DEG - START_DEG);

  useEffect(() => {
    const SPIN_DURATION = 950, SPIN_END_DEG = START_DEG + 360 * 1.4;
    const t0 = performance.now() + 200;
    const easeIn = t => t * t * t;
    let raf;
    const spinStep = now => {
      const p = Math.min(Math.max((now - t0) / SPIN_DURATION, 0), 1);
      const deg = START_DEG + easeIn(p) * (SPIN_END_DEG - START_DEG);
      setNeedleDeg(deg);
      if (p < 1) { raf = requestAnimationFrame(spinStep); } else {
        setPhase('settle');
        const t1 = performance.now();
        const easeOut = t => 1 - Math.pow(-2 * t + 2, 3) / 8;
        const startDeg = deg;
        const settleStep = now2 => {
          const p2 = Math.min((now2 - t1) / 1700, 1);
          const e = easeOut(p2);
          setNeedleDeg(startDeg + (TARGET_DEG - startDeg) * e);
          setScore(Math.round(e * TARGET));
          if (p2 < 1) raf = requestAnimationFrame(settleStep);
          else { setGlowPulse(true); setTimeout(() => setGlowPulse(false), 650); }
        };
        raf = requestAnimationFrame(settleStep);
      }
    };
    raf = requestAnimationFrame(spinStep);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cx = 130, cy = 130, R = 102;
  const toRad = d => (d - 90) * Math.PI / 180; // 0deg = top
  const ptOn = (r, deg) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
  const arcPath = (r, d1, d2) => {
    const [x1, y1] = ptOn(r, d1), [x2, y2] = ptOn(r, d2);
    const large = d2 - d1 > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`;
  };
  // colour zones across the 240° sweep (-120..120)
  const zones = [
    { from: -120, to: -64, color: '#dc2626' },
    { from: -64, to: -8, color: '#f59e0b' },
    { from: -8, to: 48, color: '#eab308' },
    { from: 48, to: 120, color: '#22c55e' },
  ];
  const ticks = Array.from({ length: 13 }, (_, i) => START_DEG + (i / 12) * (END_DEG - START_DEG));
  const innerR = 78;
  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 264, flexShrink: 0 }}>
      {/* outer brushed bezel */}
      <div style={{
        position: 'relative', width: 252, height: 252, borderRadius: '50%',
        background: 'conic-gradient(from 0deg,#3a4a3f,#0e1410,#3a4a3f,#1a221c,#3a4a3f,#0e1410,#3a4a3f)',
        boxShadow: glowPulse
          ? '0 0 0 1px rgba(74,222,128,0.5),0 0 36px rgba(34,197,94,0.55),0 18px 36px rgba(0,0,0,0.5),inset 0 2px 4px rgba(255,255,255,0.18)'
          : '0 0 0 1px rgba(34,197,94,0.18),0 18px 36px rgba(0,0,0,0.45),inset 0 2px 4px rgba(255,255,255,0.14)',
        padding: 10, transition: 'box-shadow 0.4s ease',
      }}>
        {/* inner dark face */}
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%,#15201a 0%,#0a0f0c 62%,#060907 100%)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.7), inset 0 -1px 2px rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <svg width="100%" height="100%" viewBox="0 0 260 260" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <filter id="needleShadow"><feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.55" /></filter>
              <radialGradient id="hubGrad" cx="38%" cy="32%" r="70%"><stop offset="0%" stopColor="#e8f5ea" /><stop offset="55%" stopColor="#8fae97" /><stop offset="100%" stopColor="#34433a" /></radialGradient>
              <linearGradient id="needleMain" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff5c4d" /><stop offset="100%" stopColor="#e23b2e" /></linearGradient>
              <linearGradient id="needleCounter" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a9690" /><stop offset="100%" stopColor="#cfd8d2" /></linearGradient>
            </defs>
            {/* zones, centered properly at 130,130 */}
            {zones.map((z, i) => {
              const a = (d, r) => { const rad = (d - 90) * Math.PI / 180; return [130 + r * Math.cos(rad), 130 + r * Math.sin(rad)]; };
              const [x1, y1] = a(z.from, 102), [x2, y2] = a(z.to, 102);
              const large = z.to - z.from > 180 ? 1 : 0;
              return <path key={`z${i}`} d={`M${x1},${y1} A102,102 0 ${large} 1 ${x2},${y2}`} fill="none" stroke={z.color} strokeWidth="9" strokeLinecap="butt" opacity="0.95" />;
            })}
            {/* fine recessed groove just inside the band */}
            <circle cx="130" cy="130" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* tick marks + numerals (0–100 scale, but printed as plain ticks) */}
            {ticks.map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              const major = i % 3 === 0;
              const r1 = major ? 90 : 93;
              const r2 = 98;
              const x1 = 130 + r1 * Math.cos(rad), y1 = 130 + r1 * Math.sin(rad);
              const x2 = 130 + r2 * Math.cos(rad), y2 = 130 + r2 * Math.sin(rad);
              const lx = 130 + 76 * Math.cos(rad), ly = 130 + 76 * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.75)" strokeWidth={major ? 1.6 : 1} strokeLinecap="round" />
                  {major && <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="rgba(255,255,255,0.55)">{Math.round(i * (100 / 12))}</text>}
                </g>
              );
            })}
            {/* PERFORMANCE legend, printed dial style */}
            <text x="130" y="64" textAnchor="middle" fontSize="7" fontFamily="Poppins, sans-serif" fontWeight="700" letterSpacing="2.5" fill="rgba(187,247,208,0.55)">PERFORMANCE</text>

            {/* inner recessed disc behind needle */}
            <circle cx="130" cy="130" r={innerR} fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* digital score readout, embedded in dial */}
            <text x="130" y="139" textAnchor="middle" dominantBaseline="middle" fontFamily="'Playfair Display', serif" fontWeight="900" fontSize="40" fill={phase === 'spin' ? 'rgba(187,247,208,0.5)' : '#eafff1'} style={{ transition: 'fill 0.3s' }}>
              {phase === 'spin' ? '–' : score}
            </text>
            <text x="130" y="163" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fill="#4ade80">
              {phase === 'spin' ? 'SCANNING' : `GRADE ${grade}`}
            </text>

            {/* needle group — points straight UP locally; rotation places the tip on the correct tick */}
            <g style={{ transformOrigin: '130px 130px', transform: `rotate(${needleDeg}deg)`, transition: phase === 'spin' ? 'none' : 'transform 0.02s linear' }} filter="url(#needleShadow)">
              {/* counterweight tail (short, points down/opposite the tip) */}
              <polygon points="130,130 125,130 124,152 130,158 136,152 135,130" fill="url(#needleCounter)" />
              {/* main pointer (long, tapered, points up toward the tip) */}
              <polygon points="130,130 127,128 124,42 130,32 136,42 133,128" fill="url(#needleMain)" />
            </g>

            {/* hub */}
            <circle cx="130" cy="130" r="11" fill="url(#hubGrad)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" />
            <circle cx="130" cy="130" r="4.5" fill="#1c2620" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />

            {glowPulse && <circle cx="130" cy="130" r={innerR + 6} fill="none" stroke="rgba(34,197,94,0.55)" strokeWidth="3" style={{ animation: 'burstRing 0.65s ease-out forwards' }} />}
          </svg>
          {/* glass highlight overlay */}
          <div style={{ position: 'absolute', top: '4%', left: '10%', width: '55%', height: '38%', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.02) 60%,transparent 100%)', pointerEvents: 'none', transform: 'rotate(-18deg)' }} />
        </div>
      </div>

      {/* digital readout strip below the dial, like a trip computer */}
      <div style={{ marginTop: 14, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: 'rgba(8,20,12,0.85)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: 10, padding: '8px 12px', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'spin' ? '#fbbf24' : '#4ade80', animation: 'pulse 1.6s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>{phase === 'spin' ? 'RUNNING LIGHTHOUSE…' : 'PAGESPEED INSIGHTS'}</span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, fontWeight: 700, color: phase === 'spin' ? 'rgba(255,255,255,0.4)' : '#4ade80' }}>{phase === 'spin' ? '···' : '0.9s LCP'}</span>
      </div>
    </div>
  );
}

function SeoChip({ icon, label, sub, style, animClass, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={animClass} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 10, background: hov ? 'rgba(8,20,12,0.97)' : 'rgba(8,20,12,0.90)', border: `1.5px solid ${hov ? 'rgba(34,197,94,0.6)' : 'rgba(34,197,94,0.22)'}`, borderRadius: 50, padding: '10px 18px 10px 10px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: hov ? '0 0 24px rgba(34,197,94,0.3),0 8px 28px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.5)', cursor: 'default', transition: 'all 0.3s ease', transform: hov ? 'scale(1.06) translateY(-2px)' : 'scale(1)', zIndex: 8, whiteSpace: 'nowrap', ...style }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: danger ? 'rgba(220,38,38,0.25)' : 'rgba(34,197,94,0.15)', border: `1.5px solid ${danger ? 'rgba(220,38,38,0.5)' : 'rgba(34,197,94,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, color: danger ? '#f87171' : '#4ade80' }}>
        <i className={icon} aria-hidden="true" />
      </div>
      <div>
        <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12.5, fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{label}</div>
        {sub && <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function TrafficPill() {
  const [val, setVal] = useState(14896);
  useEffect(() => {
    const id = setInterval(() => setVal(v => v + Math.floor(Math.random() * 35) + 5), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ position: 'absolute', top: 90, left: 20, zIndex: 9, background: 'rgba(8,20,12,0.92)', border: '1.5px solid rgba(34,197,94,0.25)', borderRadius: 16, padding: '14px 18px', backdropFilter: 'blur(16px)', boxShadow: '0 6px 28px rgba(0,0,0,0.55)', animation: 'chipFloat2 5s ease-in-out infinite', minWidth: 160 }}>
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700, marginBottom: 5 }}>Organic Traffic</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 20, fontWeight: 800, color: '#ffffff' }}>{val.toLocaleString()}</span>
        <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 700 }}>↑312%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
        {[30, 44, 36, 58, 48, 70, 82, 95].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i === 7 ? '#22c55e' : `rgba(74,222,128,${0.12 + i * 0.1})` }} />
        ))}
      </div>
    </div>
  );
}

function RankBadge() {
  const [rank, setRank] = useState(47);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (rank <= 1) return;
    const delay = rank > 20 ? 85 : rank > 5 ? 160 : 380;
    const t = setTimeout(() => { setRank(r => r - 1); setFlash(true); setTimeout(() => setFlash(false), 120); }, delay);
    return () => clearTimeout(t);
  }, [rank]);
  return (
    <div style={{ position: 'absolute', bottom: 30, right: 68, zIndex: 10, width: 72, height: 72, borderRadius: '50%', background: rank === 1 ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'rgba(8,20,12,0.92)', border: `2.5px solid ${rank === 1 ? '#4ade80' : 'rgba(34,197,94,0.45)'}`, boxShadow: rank === 1 ? '0 0 28px rgba(34,197,94,0.7),0 0 8px rgba(34,197,94,0.4)' : '0 4px 20px rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, backdropFilter: 'blur(12px)', transition: 'all 0.5s ease', animation: 'chipFloat3 5.5s ease-in-out infinite' }}>
      <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: rank > 9 ? 16 : 20, fontWeight: 900, lineHeight: 1, color: rank === 1 ? '#fff' : (flash ? '#4ade80' : '#22c55e'), transition: 'color 0.1s' }}>#{rank}</div>
      <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: rank === 1 ? 'rgba(255,255,255,0.9)' : 'rgba(74,222,128,0.85)' }}>{rank === 1 ? 'TOP!' : 'Rank'}</div>
    </div>
  );
}

function WebLines() {
  const cx = 450, cy = 385;
  const pts = [[200, 72], [400, 52], [100, 200], [115, 295], [100, 415], [390, 490]];
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 560 540" preserveAspectRatio="none">
      {pts.map(([x, y], i) => (<line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(34,197,94,0.18)" strokeWidth="1" strokeDasharray="5 4" style={{ animation: `dashFlow 2s linear infinite`, animationDelay: `${i * 0.3}s` }} />))}
      {[[0, 1], [1, 5], [5, 4], [4, 2], [2, 3], [3, 0], [0, 5], [1, 4]].map(([a, b], i) => (<line key={`x${i}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(34,197,94,0.07)" strokeWidth="0.8" strokeDasharray="4 5" />))}
      {pts.map(([x, y], i) => (<circle key={`d${i}`} r="2.5" fill="#22c55e" opacity="0.55"><animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" path={`M${cx},${cy} L${x},${y}`} /></circle>))}
      {pts.map(([x, y], i) => (<circle key={`id${i}`} cx={x} cy={y} r="3.5" fill="rgba(34,197,94,0.25)" stroke="rgba(34,197,94,0.5)" strokeWidth="1" />))}
      <circle cx={cx} cy={cy} r="5" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" />
    </svg>
  );
}

// KEY FIX: useSceneScale with baseWidth=560 means the scene scales
// proportionally on any container width — laptop gets 1:1, mobile gets ~0.6x etc.
function SeoDeviceScene() {
  const { ref: wrapRef, scale } = useSceneScale(560);
  const { ref: tiltRef, tilt } = useParallax(3);
  return (
    <div ref={wrapRef} style={{ width: '100%', maxWidth: 560 }}>
      <div style={{ width: '100%', height: 540 * scale, overflow: 'hidden', position: 'relative' }}>
        <div ref={tiltRef} style={{ width: 560, height: 540, transformOrigin: 'top left', transform: `scale(${scale}) perspective(1400px) rotateX(${-tilt.y * 0.12}deg) rotateY(${tilt.x * 0.12}deg)`, transition: 'transform 0.25s ease-out', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20%', left: '30%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,0.13) 0%,rgba(34,197,94,0.05) 50%,transparent 75%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0, animation: 'sceneGlow 4s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '50%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(74,222,128,0.1) 0%,transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0, animation: 'sceneGlow2 5.5s ease-in-out infinite 1.5s' }} />
          <WebLines />
          <SeoChip icon="ti ti-devices" label="SEO Scanner" sub="Automated scans" animClass="chipFloat1" style={{ top: 48, left: 140 }} />
          <SeoChip icon="ti ti-sitemap" label="HTML Site Map" sub="Auto-generated" animClass="chipFloat2" style={{ top: 28, right: 60 }} />
          <TrafficPill />
          <SeoChip icon="ti ti-alert-square" label="404 Error" sub="Detection & fix" animClass="chipFloat3" danger style={{ top: 272, left: 22 }} />
          <SeoChip icon="ti ti-shield-check" label="Site Verification" sub="Google & Bing" animClass="chipFloat1" style={{ top: 400, left: 18 }} />
          <SeoChip icon="ti ti-search" label="Search Appearance" sub="SERP preview" animClass="chipFloat2" style={{ bottom: 20, left: '38%' }} />
          <div style={{ position: 'absolute', bottom: 170, right: 50, zIndex: 6, animation: 'chipFloat3 6s ease-in-out infinite' }}>
            <Speedometer />
          </div>
          <RankBadge />
        </div>
      </div>
    </div>
  );
}

const accentMap = {
  dark: { bg: '#0e1411', border: 'rgba(34,197,94,0.16)', bar: 'linear-gradient(90deg,#16a34a,#22c55e,#4ade80)', iconBg: 'rgba(34,197,94,0.12)', iconColor: '#4ade80', tagColor: '#4ade80', titleColor: '#fff', descColor: 'rgba(255,255,255,0.6)', featColor: 'rgba(255,255,255,0.52)', hoverBorder: 'rgba(34,197,94,0.45)', hoverShadow: '0 24px 60px -12px rgba(22,163,74,0.35)' },
  mid: { bg: '#06150c', border: 'rgba(34,197,94,0.14)', bar: 'linear-gradient(90deg,#14532d,#16a34a,#22c55e)', iconBg: 'rgba(22,163,74,0.18)', iconColor: '#86efac', tagColor: '#86efac', titleColor: '#f0fdf4', descColor: 'rgba(187,247,208,0.68)', featColor: 'rgba(187,247,208,0.56)', hoverBorder: 'rgba(34,197,94,0.4)', hoverShadow: '0 24px 60px -12px rgba(5,46,22,0.55)' },
  light: { bg: '#ffffff', border: 'rgba(15,23,42,0.07)', bar: 'linear-gradient(90deg,#22c55e,#4ade80,#86efac)', iconBg: '#f0fdf4', iconColor: '#15803d', tagColor: '#16a34a', titleColor: '#0f1c14', descColor: '#586b5d', featColor: '#3f5345', hoverBorder: 'rgba(22,163,74,0.32)', hoverShadow: '0 24px 60px -16px rgba(15,23,42,0.16)' },
  soft: { bg: '#ffffff', border: 'rgba(15,23,42,0.07)', bar: 'linear-gradient(90deg,#4ade80,#86efac,#bbf7d0)', iconBg: '#f0fdf4', iconColor: '#16a34a', tagColor: '#22c55e', titleColor: '#0a0a0a', descColor: '#5b6470', featColor: '#586474', hoverBorder: 'rgba(22,163,74,0.28)', hoverShadow: '0 24px 60px -16px rgba(15,23,42,0.14)' },
};

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const a = accentMap[svc.accent];
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: a.bg, border: `1px solid ${hovered ? a.hoverBorder : a.border}`, borderRadius: 24, padding: '28px 26px 30px', position: 'relative', overflow: 'hidden', cursor: 'default', opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)', transition: `opacity 0.5s ease ${index * 80}ms,transform 0.4s cubic-bezier(0.22,1,0.36,1),box-shadow 0.4s ease,border-color 0.4s ease`, boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(15,23,42,0.04)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%,${a.iconColor}14 0%,transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: a.tagColor, opacity: 0.55, display: 'block', marginBottom: 6 }}>{svc.tag}</span>
          <div style={{ fontSize: 10.5, color: a.tagColor, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width: 46, height: 46, background: a.iconBg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.iconColor, fontSize: 21, flexShrink: 0, border: `1px solid ${a.iconColor}33`, boxShadow: hovered ? `0 8px 20px -6px ${a.iconColor}55` : 'none', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.4s ease', transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)' }}>
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
      <button style={{ background: hovered ? a.iconColor : 'transparent', border: `1.5px solid ${a.iconColor}`, color: hovered ? (svc.accent === 'light' || svc.accent === 'soft' ? '#fff' : '#06140c') : a.iconColor, borderRadius: 11, padding: '12px 20px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.3s ease', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} className="stat-cell">
      <div className="stat-icon-wrap"><i className={icon} /></div>
      <div>
        <div className="stat-number">{suffix === '%' || suffix === '+' ? `${count}${suffix}` : num === null ? suffix : `${count}${suffix}`}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function CaseStudyCard({ cs, index }) {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', border: `1px solid ${hov ? 'rgba(22,163,74,0.3)' : 'rgba(0,0,0,0.07)'}`, boxShadow: hov ? '0 20px 50px -12px rgba(22,163,74,0.18)' : '0 2px 8px rgba(0,0,0,0.04)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.5s ease ${index * 100}ms,transform 0.5s ease ${index * 100}ms,box-shadow 0.4s ease,border-color 0.4s ease` }}>
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img src={cs.img} alt={cs.company} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.8)', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(5,46,22,0.75),rgba(0,0,0,0.45))' }} />
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{cs.industry}</div>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, fontWeight: 900, color: '#fff' }}>{cs.company}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{cs.result}</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>in {cs.timeframe}</div>
        </div>
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <p style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, fontWeight: 700, color: '#0a0a0a', lineHeight: 1.6, marginBottom: 16 }}>"{cs.quote}"</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={cs.avatar} alt={cs.person} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #bbf7d0' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>{cs.person}</div>
            <div style={{ fontSize: 10.5, color: '#9ca3af' }}>{cs.role}, {cs.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${index * 100}ms,transform 0.5s ease ${index * 100}ms` }}>
      <div style={{ width: 72, height: 72, background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: 30, margin: '0 auto 20px' }}>
        <i className={step.icon} aria-hidden="true" />
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80', opacity: 0.6, marginBottom: 8 }}>0{index + 1}</div>
      <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{step.title}</h4>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 220, margin: '0 auto' }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ece9e2', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, color: '#0a0a0a', textAlign: 'left', gap: 16 }}>
        {item.q}
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? '#0a0a0a' : '#f0fdf4', border: `1.5px solid ${open ? '#0a0a0a' : '#bbf7d0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? '#22c55e' : '#15803d', fontSize: 16, flexShrink: 0, transition: 'all 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ marginTop: 12, fontSize: 14, color: '#6b7280', lineHeight: 1.8, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

const enquiryTypes = ['Technical SEO', 'Content Strategy', 'Link Building', 'Local SEO', 'E-commerce SEO', 'Full SEO Package', 'Quick audit'];

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
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(34,197,94,0.15)', border: '1.5px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 800, color: '#fff' }}>Enquiry sent!</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 320 }}>Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''} — your SEO audit request is in. We reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(34,197,94,0.4)', color: '#4ade80', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
    </div>
  );
  return (
    <div>
      <div style={{ width: 52, height: 52, background: 'rgba(22,163,74,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-search" /></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Request a Free SEO Audit</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>Tell us your URL and goals — we'll send a full technical + content audit within 48 hours.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} required />
          <input className="enq-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} required />
        </div>
        <div className="enq-row">
          <input className="enq-input" type="url" placeholder="Your website URL" value={form.phone} onChange={e => update('phone', e.target.value)} />
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" aria-hidden="true" />
            <select className="enq-input enq-select" value={form.type} onChange={e => update('type', e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" aria-hidden="true" />
          </div>
        </div>
        <textarea className="enq-input" placeholder="Tell us your current traffic situation and goals..." rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins,sans-serif' }} />
        <button type="submit" disabled={status === 'sending'} style={{ background: '#22c55e', color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(34,197,94,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Get My Free Audit'}
          {status !== 'sending' && <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

function LiveDashboard() {
  const { ref, tilt } = useParallax(6);
  const [impressions, setImpressions] = useState(48220);
  useEffect(() => {
    const id = setInterval(() => setImpressions(v => v + Math.floor(Math.random() * 22) + 3), 1800);
    return () => clearInterval(id);
  }, []);
  const bars = [46, 68, 38, 82, 58, 94, 72];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ width: '100%', maxWidth: 260, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div style={{ background: 'linear-gradient(165deg,#0d1611,#0a120d)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: 16, padding: 16, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(34,197,94,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>search.google.com/search-console</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Total Impressions</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{impressions.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: '3px 8px', height: 'fit-content' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite' }} /><span style={{ fontSize: 7.5, color: '#4ade80', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 14 }}>
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#4ade80,#16a34a)' : 'rgba(74,222,128,0.2)' }} />)}
          </div>
          {[{ kw: 'MVP dev studio', pos: '#1', delta: '↑3' }, { kw: 'startup AI agency', pos: '#2', delta: '↑7' }, { kw: 'react native dev', pos: '#1', delta: '↑1' }].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 5 }}>
              <div style={{ flex: 1, fontSize: 9, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.kw}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: row.pos === '#1' ? '#4ade80' : 'rgba(255,255,255,0.6)', flexShrink: 0 }}>{row.pos}</div>
              <div style={{ fontSize: 8, color: '#4ade80', flexShrink: 0 }}>{row.delta}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, height: 28, borderRadius: 8, background: 'linear-gradient(90deg,#16a34a,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="ti ti-chart-bar" style={{ fontSize: 12, color: '#fff' }} /><span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>Full Report Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactBlock() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="contact-grid" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
      <div className="contact-form-col">
        <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
      </div>
      <div className="contact-dashboard-col">
        <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Search Console</span>
          </div>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 32, maxWidth: 240 }}>This is what your dashboard looks like after we take over your SEO.</p>
          <LiveDashboard />
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-clock" style={{ fontSize: 14, color: '#4ade80' }} />
            Audit delivered within 48 hours
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Poppins',sans-serif;background:#fafaf8;color:#0a0a0a;line-height:1.6;font-size:14px;}
        @keyframes pulseDot{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.25)}50%{box-shadow:0 0 0 6px rgba(34,197,94,0.1)}}
        @keyframes gradientMove{0%{background-position:0%}100%{background-position:200%}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.1);opacity:1}}
        @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dashFlow{to{stroke-dashoffset:-18}}
        @keyframes chipFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes chipFloat2{0%,100%{transform:translateY(0) rotate(-0.4deg)}50%{transform:translateY(-9px) rotate(0.4deg)}}
        @keyframes chipFloat3{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .chipFloat1{animation:chipFloat1 4.4s ease-in-out infinite;}
        .chipFloat2{animation:chipFloat2 5.2s ease-in-out infinite 0.6s;}
        .chipFloat3{animation:chipFloat3 4.8s ease-in-out infinite 1.1s;}
        @keyframes sceneGlow{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes sceneGlow2{0%,100%{opacity:0.4;transform:scale(1) translateY(0)}50%{opacity:0.9;transform:scale(1.12) translateY(-10px)}}
        @keyframes burstRing{0%{r:78;opacity:0.8;stroke-width:4}100%{r:118;opacity:0;stroke-width:1}}
        .seo-reveal{animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;}
        .section-pad{padding:88px 64px;}
        .eyebrow{display:inline-block;background:#f0fdf4;color:#15803d;font-size:11px;font-weight:600;padding:5px 16px;border-radius:30px;margin-bottom:12px;letter-spacing:0.07em;text-transform:uppercase;border:1px solid #bbf7d0;}
        .dark-eyebrow{background:rgba(22,163,74,0.14);color:#4ade80;border-color:rgba(22,163,74,0.25);}
        .section-h2{font-family:'Playfair Display',serif;font-size:clamp(26px,3.5vw,38px);font-weight:900;color:#0a0a0a;margin-bottom:8px;line-height:1.1;letter-spacing:-1px;}
        .white-h2{color:#fff;margin-bottom:56px;}
        .section-sub{font-size:15px;color:#6b7280;line-height:1.7;max-width:480px;margin-bottom:48px;}

        /* Desktop: side-by-side */
        .hero-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center;padding:80px 64px 72px;}
        /* The scene column — ALWAYS shown, never hidden at any breakpoint */
        .hero-right{display:flex;justify-content:center;align-items:center;overflow:hidden;min-width:0;width:100%;}

        .hero-btns{display:flex;gap:12px;margin-bottom:44px;flex-wrap:wrap;}
        .hero-metrics{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px;}
        .metric-chip{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,0.65);border:1px solid rgba(0,0,0,0.07);backdrop-filter:blur(8px);}
        .metric-icon{width:32px;height:32px;border-radius:8px;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;align-items:center;justify-content:center;}
        .hero-trust{display:flex;align-items:center;gap:10px;padding-top:24px;border-top:1px solid #ece9e2;}
        .btn-dark{background:#0a0a0a;color:#fff;padding:14px 28px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.18);white-space:nowrap;transition:transform 0.25s ease,box-shadow 0.25s ease;}
        .btn-dark:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 30px rgba(34,197,94,0.3);}
        .btn-outline{background:#fff;color:#0a0a0a;padding:14px 28px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;border:1.5px solid #e2e8f0;cursor:pointer;white-space:nowrap;transition:transform 0.25s ease,border-color 0.25s ease;}
        .btn-outline:hover{transform:translateY(-3px);border-color:#16a34a;color:#16a34a;}
        .btn-green{background:#22c55e;color:#fff;padding:14px 28px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:700;font-size:13px;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(34,197,94,0.35);transition:transform 0.25s ease;}
        .btn-green:hover{transform:translateY(-2px);}
        .btn-ghost{background:transparent;color:#fff;padding:14px 28px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;transition:border-color 0.25s ease;}
        .btn-ghost:hover{border-color:rgba(255,255,255,0.5);}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);}
        .stat-cell{padding:44px 36px;border-right:1px solid rgba(255,255,255,0.06);display:flex;gap:18px;align-items:center;}
        .stat-cell:last-child{border-right:none;}
        .stat-icon-wrap{width:56px;height:56px;background:rgba(22,163,74,0.12);border-radius:16px;display:flex;align-items:center;justify-content:center;color:#22c55e;font-size:26px;flex-shrink:0;border:1px solid rgba(34,197,94,0.18);}
        .stat-number{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;line-height:1;letter-spacing:-1px;background:linear-gradient(135deg,#ffffff 0%,#bbf7d0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-label{font-size:11px;color:#6b7280;font-weight:500;margin-top:5px;text-transform:uppercase;letter-spacing:0.5px;}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .cases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;position:relative;}
        .process-connector{position:absolute;top:36px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,rgba(22,163,74,0.3),rgba(22,163,74,0.3),transparent);}
        .dark-section{background:#0a0a0a;position:relative;overflow:hidden;}
        .contact-grid{display:grid;grid-template-columns:1.15fr 1fr;gap:0;background:#0a0a0a;border-radius:24px;overflow:hidden;border:1.5px solid rgba(22,163,74,0.25);box-shadow:0 24px 64px rgba(22,163,74,0.14);}
        .contact-form-col{padding:44px 40px;border-right:1px solid rgba(255,255,255,0.07);position:relative;}
        .contact-dashboard-col{padding:40px 36px;background:linear-gradient(165deg,#0d1410,#0a100c);display:flex;flex-direction:column;position:relative;overflow:hidden;}
        .cta-section{background:#0a0a0a;border-top:1px solid #1a1a1a;padding:72px 64px;position:relative;overflow:hidden;}
        .cta-inner{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;position:relative;z-index:1;}
        .cta-btns{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0;}
        .enq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .enq-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:12px 14px;color:#fff;font-size:13px;font-family:'Poppins',sans-serif;outline:none;transition:border-color 0.25s ease,background 0.25s ease;}
        .enq-input::placeholder{color:rgba(255,255,255,0.32);}
        .enq-input:focus{border-color:#22c55e;background:rgba(34,197,94,0.07);}
        .enq-select-wrap{position:relative;display:flex;align-items:center;}
        .enq-select-icon{position:absolute;left:14px;font-size:14px;color:rgba(255,255,255,0.4);pointer-events:none;z-index:1;}
        .enq-select{appearance:none;-webkit-appearance:none;padding-left:36px;padding-right:30px;cursor:pointer;color-scheme:dark;}
        .enq-select-chevron{position:absolute;right:12px;font-size:14px;color:rgba(255,255,255,0.45);pointer-events:none;transition:transform 0.2s ease;}
        .enq-select-wrap:focus-within .enq-select-chevron{color:#4ade80;transform:rotate(180deg);}
        .enq-select option{background:#0d1410;color:#fff;}

        @media(max-width:1280px){
          .hero-grid{padding:72px 48px 64px;gap:40px;}
          .section-pad{padding:80px 48px;}
          .cta-section{padding:64px 48px;}
        }
        @media(max-width:1024px){
          /* Stack hero vertically on tablet */
          .hero-grid{grid-template-columns:1fr !important;padding:60px 40px 52px !important;gap:32px !important;}
          .hero-right{max-width:560px;margin-left:auto;margin-right:auto;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .stat-cell{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);}
          .stat-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,0.06) !important;}
          .stat-cell:last-child,.stat-cell:nth-last-child(2):nth-child(odd){border-bottom:none;}
          .services-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cases-grid{grid-template-columns:repeat(2,1fr) !important;}
          .process-grid{grid-template-columns:repeat(2,1fr) !important;gap:32px !important;}
          .process-connector{display:none;}
          .contact-grid{grid-template-columns:1fr !important;}
          .contact-form-col{border-right:none;border-bottom:1px solid rgba(255,255,255,0.07);}
          .section-pad{padding:72px 40px;}
          .cta-section{padding:56px 40px;}
        }
        @media(max-width:768px){
          .hero-grid{padding:48px 24px 40px !important;}
          .services-grid{grid-template-columns:1fr !important;}
          .cases-grid{grid-template-columns:1fr !important;}
          .section-pad{padding:60px 24px;}
          .cta-section{padding:48px 24px;}
          .cta-inner{flex-direction:column;align-items:flex-start;}
          .stat-cell{padding:28px 24px !important;}
          .stat-icon-wrap{width:44px !important;height:44px !important;font-size:20px !important;}
          .stat-number{font-size:28px !important;}
          .hero-btns{gap:10px;}
        }
        @media(max-width:640px){
          .hero-grid{padding:36px 16px 32px !important;gap:24px !important;}
          /* Scene is always shown — useSceneScale handles scaling down automatically */
          .hero-right{max-width:100%;margin-left:0;margin-right:0;}
          .hero-btns{flex-direction:column;align-items:stretch;}
          .hero-btns button,.hero-btns a,.hero-btns a button{width:100% !important;text-align:center;}
          .hero-metrics{gap:8px;}
          .metric-chip{flex:1 1 calc(50% - 4px);}
          .stats-grid{grid-template-columns:1fr 1fr !important;}
          .stat-cell{padding:20px 16px !important;gap:12px !important;}
          .stat-icon-wrap{width:36px !important;height:36px !important;font-size:17px !important;border-radius:10px !important;}
          .stat-number{font-size:22px !important;}
          .stat-label{font-size:9px !important;}
          .section-pad{padding:52px 16px;}
          .cta-section{padding:40px 16px;}
          .cta-btns{width:100%;}
          .cta-btns a,.cta-btns button{width:100% !important;text-align:center;}
          .process-grid{grid-template-columns:1fr !important;}
          .enq-row{grid-template-columns:1fr !important;}
          .contact-form-col{padding:28px 20px !important;}
          .contact-dashboard-col{padding:28px 20px !important;}
          .section-h2{letter-spacing:-0.5px;}
        }
        @media(max-width:400px){
          .hero-grid{padding:28px 12px 24px !important;}
          .metric-chip{flex:1 1 100%;}
          .section-pad{padding:44px 12px;}
          .cta-section{padding:36px 12px;}
        }
        @media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important;}}
      `}</style>

      <div style={{ fontFamily: 'Poppins,sans-serif', background: '#fafaf8', color: '#0a0a0a', lineHeight: 1.6, fontSize: 14 }}>

        {/* HERO */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#fafaf8' }}>
          <AnimatedBg />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(240,253,244,0.6) 0%,transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top,#fafaf8,transparent)', pointerEvents: 'none', zIndex: 1 }} />
          <div className="hero-grid" style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div className="hero-left">
              <div className="seo-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0a0a0a', color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, border: '1px solid #222', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)', display: 'inline-block', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }} />
                SEO &amp; Search Growth
              </div>
              <h1 className="seo-reveal" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, lineHeight: 1.06, color: '#0a0a0a', letterSpacing: '-1.2px', marginBottom: 20, animationDelay: '0.1s' }}>
                Rank #1.<br />
                <span style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stay There.</span>
              </h1>
              <p className="seo-reveal" style={{ fontSize: 15, color: '#1f2937', lineHeight: 1.8, maxWidth: 440, marginBottom: 34, animationDelay: '0.18s' }}>
                We engineer search dominance for startups — technical SEO, content architecture, and link strategies that compound month over month.
              </p>
              <div className="seo-reveal hero-btns" style={{ animationDelay: '0.26s' }}>
                <button className="btn-dark">Audit My Site →</button>
                <a href="#contact" style={{ textDecoration: 'none' }}><button className="btn-outline">See Case Studies</button></a>
              </div>
              <div className="seo-reveal hero-metrics" style={{ animationDelay: '0.32s' }}>
                {[{ icon: 'ti-trending-up', value: '312%', label: 'Avg. traffic lift' }, { icon: 'ti-clock', value: '90 days', label: 'To page 1' }, { icon: 'ti-award', value: '38+', label: 'Sites ranked #1' }].map(m => (
                  <div key={m.label} className="metric-chip">
                    <div className="metric-icon"><i className={`ti ${m.icon}`} style={{ fontSize: 15, color: '#16a34a' }} /></div>
                    <div>
                      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 900, color: '#0a0a0a', lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="seo-reveal hero-trust" style={{ animationDelay: '0.38s', marginTop: 24 }}>
                <div style={{ display: 'flex' }}>
                  {[IMAGES.founder1, IMAGES.founder2].map((src, i) => (<img key={i} src={src} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fafaf8', marginLeft: i === 0 ? 0 : -8 }} />))}
                </div>
                <span style={{ fontSize: 12, color: '#6b7280' }}>Trusted by <strong style={{ color: '#0a0a0a' }}>40+ startup founders</strong> to own their search traffic</span>
              </div>
            </div>

            {/* ✅ Scene always shown — auto-scales via useSceneScale hook */}
            <div className="hero-right">
              <SeoDeviceScene />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a,transparent)', backgroundSize: '200% 100%', animation: 'gradientMove 3s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(34,197,94,0.18) 1px,transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
          <div className="stats-grid" style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {[{ icon: 'ti ti-trending-up', num: 312, suffix: '%', label: 'Avg. organic traffic lift' }, { icon: 'ti ti-clock', num: 90, suffix: ' days', label: 'To first page-1 result' }, { icon: 'ti ti-award', num: 38, suffix: '+', label: 'Keywords ranked #1' }, { icon: 'ti ti-eye', num: 40, suffix: '+', label: 'Startups served' }].map((s, i) => <StatCell key={i} {...s} />)}
          </div>
        </div>

        {/* TRUST */}
        <div style={{ background: '#fff', padding: '40px 24px', borderBottom: '1px solid #ece9e2' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>Trusted by founders at</div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              {['Nimbus', 'Forge', 'Quanta', 'Halo', 'Brisk'].map(n => (<span key={n} style={{ fontSize: 14, fontWeight: 800, color: '#c9c9c9', letterSpacing: '-0.3px' }}>{n}</span>))}
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="section-pad" style={{ background: '#fafaf8' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div className="eyebrow">What We Do</div>
            <h2 className="section-h2">SEO That Actually Compounds</h2>
            <p className="section-sub">Every service is designed to stack on the last. Start with one. End up owning your category.</p>
            <div className="services-grid">{seoServices.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}</div>
          </div>
        </div>

        {/* CASE STUDIES */}
        <div className="section-pad" style={{ background: '#f4f4f0', borderTop: '1px solid #ece9e2', borderBottom: '1px solid #ece9e2' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div className="eyebrow">Case Studies</div>
            <h2 className="section-h2">Results Speak Louder</h2>
            <p className="section-sub">Three startups, three different categories — one outcome: search dominance.</p>
            <div className="cases-grid">{caseStudies.map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i} />)}</div>
          </div>
        </div>

        {/* PROCESS */}
        <div className="section-pad dark-section">
          <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.13) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="eyebrow dark-eyebrow">How We Work</div>
            <h2 className="section-h2 white-h2">Four Steps, Zero Guesswork</h2>
            <div className="process-grid">
              <div className="process-connector" />
              {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" className="section-pad" style={{ background: '#fafaf8' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div className="eyebrow">Get In Touch</div>
            <h2 className="section-h2">Get Your Free SEO Audit</h2>
            <p className="section-sub">No sales pitch, no fluff — just a real audit of your site's search performance and a clear plan to fix it.</p>
            <ContactBlock />
          </div>
        </div>

        {/* FAQ */}
        <div className="section-pad" style={{ background: '#f4f4f0' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div className="eyebrow">FAQ</div>
            <h2 className="section-h2">Common Questions</h2>
            {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', animation: 'pulse 5s ease-in-out infinite' }} />
          <div className="cta-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ width: 70, height: 70, background: 'rgba(22,163,74,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(22,163,74,0.3)', animation: 'floatIcon 3s ease-in-out infinite' }}>
                <i className="ti ti-search" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Ready to Rank?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Get your free audit — we'll map exactly what it takes to hit page 1.</p>
              </div>
            </div>
            <div className="cta-btns">
              <a href="#contact" style={{ textDecoration: 'none' }}><button className="btn-green">Get My Free Audit →</button></a>
              <button className="btn-ghost">View Case Studies →</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}