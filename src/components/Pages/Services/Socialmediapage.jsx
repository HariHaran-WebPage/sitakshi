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
const smServices = [
  { icon: 'ti ti-calendar-event', accent: 'dark', tag: '01', title: 'Content Strategy', subtitle: 'Plan With Purpose', desc: 'Platform-native content calendars built around your brand voice — not generic templates. Every post earns its place in the feed.', features: ['Content calendars', 'Brand voice guides', 'Trend mapping', 'Hook frameworks'], cta: 'Build My Calendar' },
  { icon: 'ti ti-video', accent: 'mid', tag: '02', title: 'Content Production', subtitle: 'Scroll-Stopping Creative', desc: 'Short-form video, carousels, and static posts shot, edited, and captioned for the algorithm — and for actual humans.', features: ['Reels & TikToks', 'Carousel design', 'Caption writing', 'Editing & motion'], cta: 'Start Producing' },
  { icon: 'ti ti-users', accent: 'light', tag: '03', title: 'Community Management', subtitle: 'Real Conversations', desc: 'Comments answered, DMs handled, and community built in your tone of voice — turning followers into people who actually buy.', features: ['Daily moderation', 'DM response', 'Crisis handling', 'Community growth'], cta: 'Grow My Community' },
  { icon: 'ti ti-speakerphone', accent: 'soft', tag: '04', title: 'Influencer & UGC', subtitle: 'Borrowed Trust', desc: 'Creator partnerships and user-generated content campaigns that put your product in front of audiences who already trust the voice.', features: ['Creator sourcing', 'UGC campaigns', 'Whitelisting', 'Contract & briefs'], cta: 'Find My Creators' },
  { icon: 'ti ti-target-arrow', accent: 'dark', tag: '05', title: 'Paid Social', subtitle: 'Spend That Performs', desc: 'Meta, TikTok, and LinkedIn ad campaigns built on real creative testing — not guesswork. We scale what the data proves works.', features: ['Creative testing', 'Audience targeting', 'Budget pacing', 'ROAS reporting'], cta: 'Scale My Spend' },
  { icon: 'ti ti-chart-arrows', accent: 'mid', tag: '06', title: 'Social Analytics', subtitle: 'Numbers That Tell A Story', desc: 'Custom reporting dashboards, engagement benchmarking, and monthly insight reviews that show what to make next — and why.', features: ['Engagement tracking', 'Benchmark reports', 'Audience insights', 'Monthly reviews'], cta: 'See My Numbers' },
];

const processSteps = [
  { icon: 'ti ti-telescope', title: 'Discover', desc: "Audience research, competitor teardown, and platform audit — we learn who you're actually talking to before posting anything." },
  { icon: 'ti ti-bulb', title: 'Create', desc: 'Content calendars, scripts, and visual systems built around hooks that earn the first three seconds of attention.' },
  { icon: 'ti ti-send', title: 'Publish', desc: 'Native posting, captioning, and community response across every platform — timed for when your audience is actually online.' },
  { icon: 'ti ti-chart-dots', title: 'Optimise', desc: "Weekly performance reviews and creative iteration. We double down on formats that hit and retire the ones that don't." },
];

const faqs = [
  { q: 'How many posts do I get per month?', a: 'Packages typically range from 12–30 pieces of content monthly across platforms, scaled to your goals.' },
  { q: 'Do you film and edit, or just strategise?', a: 'Full production — we script, shoot or source footage, edit, caption, and schedule.' },
  { q: 'Which platforms do you manage?', a: 'Instagram, TikTok, LinkedIn, X, YouTube Shorts, and Pinterest.' },
  { q: 'Will you reply to comments and DMs as us?', a: 'Yes — community management is built into every retainer. We train on your brand voice.' },
  { q: 'How do you measure success?', a: 'Engagement rate, follower growth quality, and — for paid work — ROAS and cost per result.' },
];

const caseStudies = [
  { company: 'Lumio', industry: 'D2C / Skincare', result: '+580% engagement', timeframe: '5 months', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format', quote: 'Our TikTok went from 800 followers to 92K and actual sales started showing up in the same quarter.', person: 'Tara Singh', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&q=75&auto=format' },
  { company: 'Pace', industry: 'Fitness / Wearables', result: '3.1M monthly reach', timeframe: '6 months', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format', quote: "They turned our community into our biggest acquisition channel — cheaper than any ad we've run.", person: 'Marcus Webb', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75&auto=format' },
  { company: 'Hearth', industry: 'Home / Lifestyle', result: '4.2% avg. engagement rate', timeframe: '4 months', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80&auto=format', quote: 'The content finally sounds like us. Our DMs are full of people asking where to buy.', person: 'Naomi Cole', role: 'Head of Brand', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format' },
];

const IMAGES = {
  founder1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&q=75&auto=format',
  founder2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75&auto=format',
};

const platforms = [
  { icon: 'ti ti-brand-instagram', label: 'Instagram' },
  { icon: 'ti ti-brand-tiktok',    label: 'TikTok' },
  { icon: 'ti ti-brand-linkedin',  label: 'LinkedIn' },
  { icon: 'ti ti-brand-x',         label: 'X' },
  { icon: 'ti ti-brand-youtube',   label: 'YouTube' },
];

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ══════════════════════════════════════════════
   ANIMATED BACKGROUND CANVAS
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
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

/* ══════════════════════════════════════════════
   MOBILE HERO VISUAL — globe + stat cards, fits on-screen
══════════════════════════════════════════════ */
function MobileHeroVisual() {
  const globeRef  = useRef(null);
  const angleRef  = useRef(0);
  const frameRef  = useRef(null);
  const [reach, setReach]     = useState(214382);
  const [likeVis, setLikeVis] = useState(true);

  useEffect(() => {
    let last = null;
    const animate = ts => {
      if (last !== null) {
        angleRef.current = (angleRef.current + (ts - last) * 0.014) % 360;
        if (globeRef.current) globeRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      last = ts;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setReach(v => v + Math.floor(Math.random() * 38 + 4)), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLikeVis(v => !v), 4500);
    return () => clearInterval(id);
  }, []);

  const S = 140; // globe diameter for mobile

  const socialIcons = [
    { bg: '#1877F2',  top: 10,  left: 10,  size: 34, delay: '0s',   dur: '3.4s', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { bg: '#25D366',  top: 60,  left: 2,   size: 30, delay: '0.4s', dur: '4.5s', svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
    { bg: '#2AABEE',  top: 115, left: 8,   size: 30, delay: '1.2s', dur: '4.1s', svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
    { bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', top: 10,  right: 10, size: 34, delay: '0.5s', dur: '3.9s', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { bg: '#000',     top: 60,  right: 2,  size: 30, delay: '0.7s', dur: '3.8s', svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 4h3L13 10.5 20 20h-3L12 13.5 7 20H4l7-7L4 4h3l5.5 7L17.5 4z"/></svg> },
    { bg: '#0A66C2',  top: 115, right: 8,  size: 30, delay: '0.9s', dur: '4.2s', svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
    { bg: '#FF0000',  top: -4,  left: '50%', mleft: -17, size: 34, delay: '1.0s', dur: '3.6s', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg> },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* ── Top stat strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
        {[
          { label: 'Followers', value: '+12K', sub: '▲ this month' },
          { label: 'Engagement', value: '+85%', sub: '▲ rate increase' },
        ].map(card => (
          <div key={card.label} style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 12, padding: '10px 12px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{card.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, lineHeight: 1.1, marginTop: 2 }}>{card.value}</div>
            <div style={{ fontSize: 9, color: T.primary, fontWeight: 600, marginTop: 2 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Globe section (scaled for mobile) ── */}
      <div style={{ position: 'relative', width: '100%', height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* connection lines SVG — scaled to container */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 320 190" preserveAspectRatio="xMidYMid meet">
          <line x1="44" y1="35"  x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="44" y1="85"  x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="44" y1="130" x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="276" y1="35"  x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="276" y1="85"  x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="276" y1="130" x2="160" y2="95" stroke="rgba(0,163,77,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="160" y1="5"   x2="160" y2="95" stroke="rgba(0,163,77,0.10)" strokeWidth="1" strokeDasharray="4 5"/>
        </svg>

        {/* Social icon buttons — absolutely placed around globe */}
        {socialIcons.map((ic, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: ic.top,
            left: ic.left !== undefined ? ic.left : undefined,
            right: ic.right !== undefined ? ic.right : undefined,
            marginLeft: ic.mleft || 0,
            width: ic.size, height: ic.size,
            borderRadius: '50%',
            background: ic.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
            animation: `floatUp ${ic.dur} ease-in-out infinite ${ic.delay}`,
            zIndex: 5,
          }}>
            {ic.svg}
          </div>
        ))}

        {/* Glow */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.18) 0%,rgba(0,163,77,0.06) 52%,transparent 75%)', animation: 'glowPulse 2.8s ease-in-out infinite', pointerEvents: 'none', zIndex: 1 }} />

        {/* Orbital rings */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, zIndex: 2, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(0,163,77,0.38)', transform: 'rotateX(70deg)', animation: 'spinRing 9s linear infinite', transformStyle: 'preserve-3d' }} />
          <div style={{ position: 'absolute', inset: '6px', borderRadius: '50%', border: '1.5px dashed rgba(0,180,80,0.28)', transform: 'rotateX(50deg) rotateY(20deg)', animation: 'spinRing2 13s linear infinite reverse', transformStyle: 'preserve-3d' }} />
          <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', border: '1px solid rgba(0,200,100,0.18)', transform: 'rotateX(82deg) rotateZ(45deg)', animation: 'spinRing 18s linear infinite reverse', transformStyle: 'preserve-3d' }} />
        </div>

        {/* Globe sphere */}
        <div style={{ position: 'relative', zIndex: 3, width: S, height: S, borderRadius: '50%', background: 'radial-gradient(ellipse at 34% 27%,#fff 0%,#e4f8ef 26%,#aadfc5 56%,#5db88a 78%,#268c52 100%)', boxShadow: '6px 10px 32px rgba(0,100,40,0.34),inset -8px -6px 20px rgba(0,80,30,0.16),inset 6px 5px 16px rgba(255,255,255,0.55)', flexShrink: 0 }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${S} ${S}`} style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', opacity: 0.22, pointerEvents: 'none' }}>
            <ellipse cx={S/2} cy={S*0.3}  rx={S*0.43} ry={S*0.08} fill="none" stroke="#003d1a" strokeWidth="0.8"/>
            <ellipse cx={S/2} cy={S*0.43} rx={S*0.49} ry={S*0.05} fill="none" stroke="#003d1a" strokeWidth="0.8"/>
            <ellipse cx={S/2} cy={S*0.57} rx={S*0.50} ry={S*0.035} fill="none" stroke="#003d1a" strokeWidth="0.8"/>
            <ellipse cx={S/2} cy={S*0.69} rx={S*0.48} ry={S*0.05} fill="none" stroke="#003d1a" strokeWidth="0.8"/>
            <ellipse cx={S/2} cy={S*0.80} rx={S*0.43} ry={S*0.08} fill="none" stroke="#003d1a" strokeWidth="0.8"/>
            <g ref={globeRef} style={{ transformOrigin: `${S/2}px ${S/2}px`, transformBox: 'fill-box' }} fill="none" stroke="#003d1a" strokeWidth="0.8">
              <ellipse cx={S/2} cy={S/2} rx={S*0.08}  ry={S/2}/>
              <ellipse cx={S/2} cy={S/2} rx={S*0.24}  ry={S/2}/>
              <ellipse cx={S/2} cy={S/2} rx={S*0.40}  ry={S/2}/>
              <ellipse cx={S/2} cy={S/2} rx={S*0.48}  ry={S/2}/>
            </g>
          </svg>
          {/* Specular highlight */}
          <div style={{ position: 'absolute', top: '13%', left: '15%', width: '42%', height: '33%', borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 40%,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.18) 60%,transparent 100%)', pointerEvents: 'none' }} />
          {/* Label */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2 }}>
            <span style={{ fontFamily: "'Arial Black',Arial,sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: 1, color: '#00a34d', textShadow: '0 0 12px rgba(0,163,77,0.55)', lineHeight: 1.15 }}>SOCIAL<br/>MEDIA</span>
            <span style={{ fontFamily: "'Arial Black',Arial,sans-serif", fontSize: 6, fontWeight: 800, letterSpacing: 2, color: '#006b30', marginTop: 2 }}>MARKETING</span>
          </div>
        </div>

        {/* Like notification */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,80,80,0.22)', borderRadius: 16, padding: '5px 9px', zIndex: 7, display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 4px 14px rgba(0,0,0,0.10)', opacity: likeVis ? 1 : 0, transform: likeVis ? 'translateY(-2px)' : 'translateY(2px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
          <span style={{ fontSize: 13, color: '#e03e3e' }}>♥</span>
          <div>
            <div style={{ fontSize: 8.5, color: T.textLight, whiteSpace: 'nowrap' }}>Sarah & 2.1K others</div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: T.text }}>liked your post</div>
          </div>
        </div>

        {/* DM notification */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 10, padding: '6px 9px', zIndex: 7, boxShadow: '0 4px 14px rgba(0,0,0,0.10)', maxWidth: 120 }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: T.primary }}>🟢 New DM</div>
          <div style={{ fontSize: 8.5, color: '#4a4a4a', marginTop: 2, lineHeight: 1.4 }}>"Let's collab on your next campaign!"</div>
        </div>
      </div>

      {/* ── Bottom cards row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {/* Live Reach */}
        <div style={{ background: 'rgba(10,20,14,0.94)', border: '1px solid rgba(0,163,77,0.32)', borderRadius: 12, padding: '10px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.28)' }}>
          <div style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.7px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#33c972', display: 'inline-block', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
            Live Reach
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{reach.toLocaleString()}</div>
          <div style={{ fontSize: 8.5, color: '#33c972', fontWeight: 700, marginTop: 1 }}>↑ 38% vs last week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 22, marginTop: 6 }}>
            {[40,62,48,76,54,100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i === 5 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.25)' }} />
            ))}
          </div>
        </div>

        {/* Weekly Growth */}
        <div style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 12, padding: '10px 12px', boxShadow: '0 5px 18px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 8.5, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Weekly Growth</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.primary }}>+1.2K</div>
          <div style={{ fontSize: 8.5, color: T.textLighter, marginTop: 1 }}>new followers</div>
          <div style={{ marginTop: 6, height: 4, background: T.border, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg,#00a34d,#33c972)', borderRadius: 99 }} />
          </div>
          <div style={{ marginTop: 6, fontSize: 8.5, color: T.textLighter }}>Engagement: <span style={{ color: T.primary, fontWeight: 700 }}>5.2%</span></div>
        </div>
      </div>

      {/* ── Badge strip ── */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
        {[{ val: '580%', label: 'Engagement Lift' }, { val: '30d', label: 'First Viral Post' }, { val: '2.4M+', label: 'Followers Grown' }].map(b => (
          <div key={b.label} style={{ flex: 1, background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 10, padding: '7px 4px', textAlign: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.primary }}>{b.val}</div>
            <div style={{ fontSize: 8, color: T.textLighter, fontWeight: 600, lineHeight: 1.3 }}>{b.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════
   HERO RIGHT VISUAL (desktop only)
══════════════════════════════════════════════ */
function HeroRight() {
  const globeRef  = useRef(null);
  const angleRef  = useRef(0);
  const frameRef  = useRef(null);
  const [reach, setReach]     = useState(214382);
  const [likeVis, setLikeVis] = useState(true);

  useEffect(() => {
    let last = null;
    const animate = ts => {
      if (last !== null) {
        angleRef.current = (angleRef.current + (ts - last) * 0.014) % 360;
        if (globeRef.current) globeRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      last = ts;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setReach(v => v + Math.floor(Math.random() * 38 + 4)), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLikeVis(v => !v), 4500);
    return () => clearInterval(id);
  }, []);

  const leftIcons = [
    { label: 'Facebook',  bg: '#1877F2', size: 48, delay: '0s',   dur: '3.4s', dir:  1, svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { label: 'WhatsApp',  bg: '#25D366', size: 44, delay: '0.3s', dur: '4.5s', dir: -1, svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
    { label: 'Telegram',  bg: '#2AABEE', size: 42, delay: '1.4s', dur: '4.1s', dir:  1, svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  ];
  const rightIcons = [
    { label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', size: 50, delay: '0.5s', dur: '3.9s', dir:  1, svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { label: 'X',         bg: '#000',    size: 44, delay: '0.7s', dur: '3.8s', dir: -1, svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 4h3L13 10.5 20 20h-3L12 13.5 7 20H4l7-7L4 4h3l5.5 7L17.5 4z"/></svg> },
    { label: 'Pinterest', bg: '#E60023', size: 42, delay: '1.0s', dur: '4.3s', dir:  1, svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.79 0-2.51-1.8-4.26-4.37-4.26-2.98 0-4.73 2.23-4.73 4.54 0 .9.35 1.86.78 2.39.09.1.1.19.07.29-.08.33-.26 1.04-.29 1.18-.05.19-.16.23-.38.14-1.39-.65-2.26-2.68-2.26-4.31 0-3.51 2.55-6.74 7.35-6.74 3.86 0 6.86 2.75 6.86 6.42 0 3.83-2.41 6.91-5.76 6.91-1.13 0-2.19-.59-2.55-1.28l-.69 2.6c-.25.97-.93 2.18-1.39 2.92A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg> },
  ];
  const topIcons = [
    { label: 'LinkedIn', bg: '#0A66C2', size: 46, delay: '0.8s', dur: '4.2s', dir: -1, svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
    { label: 'YouTube',  bg: '#FF0000', size: 46, delay: '1.1s', dur: '3.6s', dir:  1, svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg> },
  ];

  const miniBarHeights = [35, 52, 44, 68, 56, 90, 78];

  return (
    <div style={{ position: 'relative', width: 600, height: 560 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 600 560" xmlns="http://www.w3.org/2000/svg">
        <line x1="76"  y1="140" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="76"  y1="230" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="76"  y1="320" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="524" y1="140" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="524" y1="230" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="524" y1="320" x2="300" y2="240" stroke="rgba(0,163,77,0.13)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="245" y1="32"  x2="300" y2="240" stroke="rgba(0,163,77,0.10)" strokeWidth="1" strokeDasharray="5 7"/>
        <line x1="355" y1="32"  x2="300" y2="240" stroke="rgba(0,163,77,0.10)" strokeWidth="1" strokeDasharray="5 7"/>
      </svg>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', gap: 8, zIndex: 8, animation: 'slideInL 0.7s ease 0.2s both' }}>
        {[
          { label: 'Followers',   value: '+12K', sub: '▲ this month',   bars: true },
          { label: 'Engagement',  value: '+85%', sub: '▲ rate increase', bars: false },
          { label: 'Leads',       value: '+350', sub: '▲ new leads',     bars: false },
          { label: 'Conversion',  value: '+42%', sub: '▲ rate boost',    bars: false },
        ].map(card => (
          <div key={card.label} style={{ flex: 1, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 12, padding: '10px 12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{card.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, lineHeight: 1.1, marginTop: 2 }}>{card.value}</div>
            <div style={{ fontSize: 9, color: T.primary, fontWeight: 600, marginTop: 2 }}>{card.sub}</div>
            {card.bars && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 24, marginTop: 5 }}>
                {miniBarHeights.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i === miniBarHeights.length - 1 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.22)' }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 14, zIndex: 5, alignItems: 'center' }}>
        {topIcons.map(ic => (
          <div key={ic.label} title={ic.label} style={{ width: ic.size, height: ic.size, borderRadius: '50%', background: ic.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', animation: `${ic.dir > 0 ? 'floatUp' : 'floatDn'} ${ic.dur} ease-in-out infinite ${ic.delay}` }}>
            {ic.svg}
          </div>
        ))}
      </div>

      {leftIcons.map((ic, i) => (
        <div key={ic.label} title={ic.label} style={{ position: 'absolute', top: 130 + i * 92, left: 8, width: ic.size, height: ic.size, borderRadius: '50%', background: ic.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.18)', zIndex: 5, animation: `${ic.dir > 0 ? 'floatUp' : 'floatDn'} ${ic.dur} ease-in-out infinite ${ic.delay}` }}>
          {ic.svg}
        </div>
      ))}

      {rightIcons.map((ic, i) => (
        <div key={ic.label} title={ic.label} style={{ position: 'absolute', top: 130 + i * 92, right: 8, width: ic.size, height: ic.size, borderRadius: '50%', background: ic.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.18)', zIndex: 5, animation: `${ic.dir > 0 ? 'floatUp' : 'floatDn'} ${ic.dur} ease-in-out infinite ${ic.delay}` }}>
          {ic.svg}
        </div>
      ))}

      <div style={{ position: 'absolute', left: '50%', top: 255, transform: 'translate(-50%,-50%)', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.18) 0%,rgba(0,163,77,0.06) 52%,transparent 75%)', animation: 'glowPulse 2.8s ease-in-out infinite', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', left: '50%', top: 255, transform: 'translate(-50%,-50%)', width: 300, height: 300, zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0,   borderRadius: '50%', border: '1.5px solid rgba(0,163,77,0.38)',  transform: 'rotateX(70deg)', animation: 'spinRing 9s linear infinite',  transformStyle: 'preserve-3d' }} />
        <div style={{ position: 'absolute', inset: '8px',  borderRadius: '50%', border: '1.5px dashed rgba(0,180,80,0.28)', transform: 'rotateX(50deg) rotateY(20deg)', animation: 'spinRing2 13s linear infinite reverse', transformStyle: 'preserve-3d' }} />
        <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', border: '1px solid rgba(0,200,100,0.18)',  transform: 'rotateX(82deg) rotateZ(45deg)', animation: 'spinRing 18s linear infinite reverse', transformStyle: 'preserve-3d' }} />
      </div>

      <div style={{ position: 'absolute', left: '50%', top: 255, transform: 'translate(-50%,-50%)', width: 230, height: 230, borderRadius: '50%', background: 'radial-gradient(ellipse at 34% 27%,#fff 0%,#e4f8ef 26%,#aadfc5 56%,#5db88a 78%,#268c52 100%)', boxShadow: '10px 16px 48px rgba(0,100,40,0.34),inset -14px -10px 30px rgba(0,80,30,0.16),inset 10px 8px 24px rgba(255,255,255,0.55)', zIndex: 3 }}>
        <svg width="100%" height="100%" viewBox="0 0 230 230" style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', opacity: 0.22, pointerEvents: 'none' }}>
          <ellipse cx="115" cy="68"  rx="99"  ry="18"  fill="none" stroke="#003d1a" strokeWidth="0.9"/>
          <ellipse cx="115" cy="99"  rx="112" ry="12"  fill="none" stroke="#003d1a" strokeWidth="0.9"/>
          <ellipse cx="115" cy="130" rx="115" ry="8"   fill="none" stroke="#003d1a" strokeWidth="0.9"/>
          <ellipse cx="115" cy="158" rx="110" ry="12"  fill="none" stroke="#003d1a" strokeWidth="0.9"/>
          <ellipse cx="115" cy="184" rx="99"  ry="18"  fill="none" stroke="#003d1a" strokeWidth="0.9"/>
          <g ref={globeRef} style={{ transformOrigin: '115px 115px', transformBox: 'fill-box' }} fill="none" stroke="#003d1a" strokeWidth="0.9">
            <ellipse cx="115" cy="115" rx="18"  ry="115"/>
            <ellipse cx="115" cy="115" rx="55"  ry="115"/>
            <ellipse cx="115" cy="115" rx="92"  ry="115"/>
            <ellipse cx="115" cy="115" rx="110" ry="115"/>
          </g>
        </svg>
        <div style={{ position: 'absolute', top: '13%', left: '15%', width: '42%', height: '33%', borderRadius: '50%', background: 'radial-gradient(ellipse at 40% 40%,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.18) 60%,transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2 }}>
          <span style={{ fontFamily: "'Arial Black',Arial,sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: 1.5, color: '#00a34d', textShadow: '0 0 16px rgba(0,163,77,0.55)', lineHeight: 1.15 }}>SOCIAL<br/>MEDIA</span>
          <span style={{ fontFamily: "'Arial Black',Arial,sans-serif", fontSize: 8, fontWeight: 800, letterSpacing: 3, color: '#006b30', textShadow: '0 0 10px rgba(0,163,77,0.35)', marginTop: 3 }}>MARKETING</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 310, left: '50%', marginLeft: -200, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,80,80,0.22)', borderRadius: 22, padding: '7px 12px', zIndex: 7, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', opacity: likeVis ? 1 : 0, transform: likeVis ? 'translateY(-4px)' : 'translateY(4px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
        <span style={{ fontSize: 16, color: '#e03e3e' }}>♥</span>
        <div>
          <div style={{ fontSize: 10, color: T.textLight, whiteSpace: 'nowrap' }}>Sarah & 2.1K others</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text }}>liked your post</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 310, left: '50%', marginLeft: 30, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 14, padding: '8px 12px', zIndex: 7, boxShadow: '0 4px 18px rgba(0,0,0,0.10)', maxWidth: 158, animation: 'slideInR 0.7s ease 1.1s both' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.primary }}>🟢 New DM</div>
        <div style={{ fontSize: 10, color: '#4a4a4a', marginTop: 2, lineHeight: 1.5 }}>"Let's collaborate on your next campaign!"</div>
      </div>

      <div style={{ position: 'absolute', top: 388, left: 0, right: 0, display: 'flex', gap: 10, zIndex: 8 }}>
        <div style={{ flex: 1, background: 'rgba(10,20,14,0.94)', backdropFilter: 'blur(14px)', border: '1px solid rgba(0,163,77,0.32)', borderRadius: 14, padding: '11px 13px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', animation: 'slideInL 0.7s ease 0.6s both' }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#33c972', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
            Live Reach
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#fff' }}>{reach.toLocaleString()}</div>
          <div style={{ fontSize: 9, color: '#33c972', fontWeight: 700, marginTop: 1 }}>↑ 38% vs last week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28, marginTop: 7 }}>
            {[40,62,48,76,54,100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i === 5 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.25)' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 14, padding: '11px 13px', boxShadow: '0 5px 20px rgba(0,0,0,0.10)', animation: 'slideInR 0.7s ease 0.8s both' }}>
          <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Weekly Growth</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: T.primary }}>+1.2K</div>
          <div style={{ fontSize: 9, color: T.textLighter, marginTop: 1 }}>new followers</div>
          <div style={{ marginTop: 8, height: 5, background: T.border, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg,#00a34d,#33c972)', borderRadius: 99 }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 9, color: T.textLighter }}>Engagement: <span style={{ color: T.primary, fontWeight: 700 }}>5.2%</span> · Reach: <span style={{ color: T.primary, fontWeight: 700 }}>↑38%</span></div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 14, padding: '11px 13px', boxShadow: '0 5px 20px rgba(0,0,0,0.10)', animation: 'slideInR 0.7s ease 1.0s both' }}>
          <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Performance</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#005c24' }}>98%</div>
          <div style={{ fontSize: 9, color: T.textLighter, marginTop: 1 }}>success rate</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {['500+ Campaigns','100+ Clients'].map(b => (
              <span key={b} style={{ fontSize: 8.5, background: T.primaryLight, color: T.primaryDark, borderRadius: 6, padding: '2px 7px', fontWeight: 600, border: '1px solid #b3f0cc' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 8, animation: 'slideInL 0.7s ease 1s both', whiteSpace: 'nowrap' }}>
        {[{ val: '580%', label: 'Avg. Engagement Lift' }, { val: '30d', label: 'To First Viral Post' }, { val: '2.4M+', label: 'Followers Grown' }].map(b => (
          <div key={b.label} style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,163,77,0.2)', borderRadius: 10, padding: '6px 12px', textAlign: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.primary }}>{b.val}</div>
            <div style={{ fontSize: 9, color: T.textLighter, fontWeight: 600 }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ACCENT MAP
══════════════════════════════════════════════ */
const accentMap = {
  dark:  { bg: '#0a140e', border: 'rgba(0,163,77,0.18)', bar: 'linear-gradient(90deg,#008040,#00a34d,#33c972)',       iconBg: 'rgba(0,163,77,0.14)',  iconColor: '#33c972', tagColor: '#33c972', titleColor: '#fff',    descColor: 'rgba(255,255,255,0.58)', featColor: 'rgba(255,255,255,0.5)',  hoverBorder: 'rgba(0,163,77,0.48)', hoverShadow: '0 24px 60px -12px rgba(0,128,64,0.38)', ctaBg: '#051a0b' },
  mid:   { bg: '#061209', border: 'rgba(0,163,77,0.15)', bar: 'linear-gradient(90deg,#004d26,#008040,#00a34d)',       iconBg: 'rgba(0,128,64,0.2)',   iconColor: '#66d49a', tagColor: '#66d49a', titleColor: '#edfaf3', descColor: 'rgba(180,240,210,0.68)', featColor: 'rgba(180,240,210,0.54)', hoverBorder: 'rgba(0,163,77,0.42)', hoverShadow: '0 24px 60px -12px rgba(0,64,26,0.58)',  ctaBg: '#051a0b' },
  light: { bg: '#ffffff', border: '#e9ecef',             bar: 'linear-gradient(90deg,#00a34d,#33c972,#80e0aa)',       iconBg: '#e6f7ee',              iconColor: '#008040', tagColor: '#00a34d', titleColor: '#2a2a2a', descColor: '#6c757d',               featColor: '#6c757d',               hoverBorder: 'rgba(0,163,77,0.35)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.12)',   ctaBg: '#fff' },
  soft:  { bg: '#ffffff', border: '#e9ecef',             bar: 'linear-gradient(90deg,#33c972,#80e0aa,#b3f0cc)',       iconBg: '#e6f7ee',              iconColor: '#00a34d', tagColor: '#00a34d', titleColor: '#2a2a2a', descColor: '#6c757d',               featColor: '#a0a8b0',               hoverBorder: 'rgba(0,163,77,0.3)',  hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.10)',  ctaBg: '#fff' },
};

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const a = accentMap[svc.accent];
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: a.bg,
        border: `1px solid ${hovered ? a.hoverBorder : a.border}`,
        borderRadius: 24, padding: '28px 26px 30px',
        position: 'relative', overflow: 'hidden', cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`,
        boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%,${a.iconColor}16 0%,transparent 55%)`, pointerEvents: 'none' }} />
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
      <button style={{ background: hovered ? a.iconColor : 'transparent', border: `1.5px solid ${a.iconColor}`, color: hovered ? a.ctaBg : a.iconColor, borderRadius: 11, padding: '12px 20px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.3s ease', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
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
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#fff 0%,#b3f0cc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', border: `1px solid ${hov ? 'rgba(0,163,77,0.32)' : T.border}`, boxShadow: hov ? '0 20px 50px -12px rgba(0,163,77,0.18)' : '0 2px 8px rgba(0,0,0,0.04)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.4s ease, border-color 0.4s ease` }}
    >
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
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, color: T.text, textAlign: 'left', gap: 16 }}
      >
        {item.q}
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? T.text : T.primaryLight, border: `1.5px solid ${open ? T.text : T.primaryLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? T.primary : T.primaryDark, fontSize: 16, flexShrink: 0, transition: 'all 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ marginTop: 12, fontSize: 14, color: T.textLight, lineHeight: 1.8, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

const enquiryTypes = ['Content Strategy', 'Content Production', 'Community Management', 'Influencer & UGC', 'Paid Social', 'Full Social Package', 'Quick audit'];

function EnquiryForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' });
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
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 320 }}>Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''} — your social audit request is in. We reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,163,77,0.42)', color: '#33c972', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
    </div>
  );

  return (
    <div>
      <div style={{ width: 52, height: 52, background: 'rgba(0,163,77,0.16)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(0,163,77,0.3)' }}><i className="ti ti-brand-instagram" /></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Request a Free Social Audit</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>Tell us your handles and goals — we'll send a full content + growth audit within 48 hours.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text"  placeholder="Full name"      value={form.name}    onChange={e => update('name', e.target.value)}    required />
          <input className="enq-input" type="email" placeholder="Email address"  value={form.email}   onChange={e => update('email', e.target.value)}   required />
        </div>
        <div className="enq-row">
          <input className="enq-input" type="text"  placeholder="@handle or profile URL" value={form.phone} onChange={e => update('phone', e.target.value)} />
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" aria-hidden="true" />
            <select className="enq-input enq-select" value={form.type} onChange={e => update('type', e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" aria-hidden="true" />
          </div>
        </div>
        <textarea className="enq-input" placeholder="Tell us your current following and goals..." rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins,sans-serif' }} />
        <button type="submit" disabled={status === 'sending'} style={{ background: T.primary, color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Get My Free Audit'}
          {status !== 'sending' && <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

function LiveDashboard() {
  const { ref, tilt } = useParallax(6);
  const [impressions, setImpressions] = useState(214300);
  useEffect(() => {
    const id = setInterval(() => setImpressions(v => v + Math.floor(Math.random() * 40) + 5), 1800);
    return () => clearInterval(id);
  }, []);
  const bars = [40, 62, 48, 76, 54, 90, 70];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ width: 260, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div style={{ background: 'linear-gradient(165deg,#0a1610,#06100a)', border: '1px solid rgba(0,163,77,0.24)', borderRadius: 16, padding: 16, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(0,163,77,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono,monospace' }}>business.instagram.com/insights</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Total Reach</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{impressions.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.28)', borderRadius: 20, padding: '3px 8px', height: 'fit-content' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#33c972' }} />
              <span style={{ fontSize: 7.5, color: '#33c972', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 14 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.22)' }} />
            ))}
          </div>
          {[{ kw: 'Reels avg. watch time', pos: '4.8s',  delta: '↑22%' },
            { kw: 'Engagement rate',       pos: '5.2%',  delta: '↑1.4%' },
            { kw: 'Follower growth/wk',    pos: '+1.2K', delta: '↑38%' }].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 5 }}>
              <div style={{ flex: 1, fontSize: 9, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.kw}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#33c972', flexShrink: 0 }}>{row.pos}</div>
              <div style={{ fontSize: 8, color: '#33c972', flexShrink: 0 }}>{row.delta}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, height: 28, borderRadius: 8, background: 'linear-gradient(90deg,#008040,#00a34d)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="ti ti-chart-bar" style={{ fontSize: 12, color: '#fff' }} />
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>Full Report Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════ */
function Hero() {
  const isMobile = useIsMobile();
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: T.bgLight }}>
      <AnimatedBg />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(230,247,238,0.65) 0%,transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top,${T.bgLight},transparent)`, pointerEvents: 'none', zIndex: 1 }} />
      <div className="sm-hero-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 64px 72px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        {/* Left copy */}
        <div>
          <div className="sm-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.text, color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, border: `1px solid ${T.text}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.primary, boxShadow: '0 0 0 3px rgba(0,163,77,0.25)', display: 'inline-block', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }} />
            🚀 Digital Growth Agency
          </div>
          <h1 className="sm-reveal" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, lineHeight: 1.06, color: T.text, letterSpacing: '-1.2px', marginBottom: 20, animationDelay: '0.1s' }}>
            Grow Your Brand Through<br />
            <span style={{ background: `linear-gradient(135deg,${T.primaryDark} 0%,${T.primary} 55%,#33c972 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Social Media Marketing</span>
          </h1>
          <p className="sm-reveal" style={{ fontSize: 15, color: T.textLight, lineHeight: 1.8, maxWidth: 460, marginBottom: 34, animationDelay: '0.18s' }}>
            Increase engagement, generate quality leads, build brand awareness, and drive measurable business growth through strategic social media campaigns.
          </p>
          <div className="sm-reveal" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', animationDelay: '0.26s' }}>
            <button className="magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)' }}>
              Get Free Consultation →
            </button>
            <a href="#work" style={{ textDecoration: 'none' }}>
              <button className="magnetic-btn-outline" style={{ background: '#fff', color: T.text, padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
                View Portfolio
              </button>
            </a>
          </div>
          <div className="sm-reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32, animationDelay: '0.30s' }}>
            {['500+ Campaigns', '100+ Clients', '98% Success Rate'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.text, fontWeight: 600 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: T.primaryLight, border: '1.5px solid #b3f0cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: T.primaryDark, flexShrink: 0 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
          <div className="sm-reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, animationDelay: '0.32s' }}>
            {[
              { icon: 'ti-trending-up', value: '580%',    label: 'Avg. engagement lift' },
              { icon: 'ti-clock',       value: '30 days', label: 'To first viral post' },
              { icon: 'ti-users',       value: '2.4M+',   label: 'Followers grown' },
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
          <div className="sm-reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24, borderTop: `1px solid ${T.border}`, animationDelay: '0.38s' }}>
            <div style={{ display: 'flex' }}>
              {[IMAGES.founder1, IMAGES.founder2].map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.bgLight}`, marginLeft: i === 0 ? 0 : -8 }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: T.textLight }}>Trusted by <strong style={{ color: T.text }}>35+ founders</strong> to own their social presence</span>
          </div>
        </div>
        {/* Right visual — desktop shows full globe, mobile shows compact cards */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isMobile ? <MobileHeroVisual /> : <HeroRight />}
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    { icon: 'ti ti-trending-up', num: 580, suffix: '%',   label: 'Avg. engagement lift' },
    { icon: 'ti ti-clock',       num: 30,  suffix: ' days',label: 'To first viral post' },
    { icon: 'ti ti-users',       num: 35,  suffix: '+',   label: 'Startups served' },
    { icon: 'ti ti-heart',       num: 24,  suffix: 'M+',  label: 'Total impressions driven' },
  ];
  return (
    <div style={{ background: T.text, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#008040,#00a34d,#33c972,#00a34d,#008040,transparent)', backgroundSize: '200% 100%', animation: 'gradientMove 3s linear infinite' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,163,77,0.16) 1px,transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div className="sm-stats-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => <StatCell key={i} {...s} />)}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div id="services" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 64px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>What We Do</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Social That Actually Converts</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Every service is designed to stack on the last. Start with content. End up owning the conversation.</p>
      <div className="sm-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {smServices.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <div id="work" style={{ background: T.bgLight, padding: '88px 64px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>Case Studies</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Results Speak Louder</h2>
        <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Three brands, three different audiences — one outcome: a community that actually shows up.</p>
        <div className="sm-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {caseStudies.map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div id="process" style={{ background: T.text, padding: '88px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.13) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,163,77,0.16)', color: '#33c972', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(0,163,77,0.28)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: '#fff', marginBottom: 56, lineHeight: 1.1, letterSpacing: '-1px' }}>Four Steps, Zero Guesswork</h2>
        <div className="sm-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,163,77,0.32),rgba(0,163,77,0.32),transparent)' }} />
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function PlatformBand() {
  return (
    <div style={{ background: '#fff', padding: '40px 64px', borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: T.textLighter, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>Platforms we manage</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {platforms.map(p => (
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
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Get Your Free Social Audit</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No sales pitch, no fluff — just a real audit of your social presence and a clear plan to grow it.</p>
      <div ref={ref} className="sm-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, background: T.text, borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(0,163,77,0.28)', boxShadow: '0 24px 64px rgba(0,163,77,0.14)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        <div style={{ padding: '40px 36px', background: 'linear-gradient(165deg,#0a1410,#060e09)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#33c972' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Insights</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 32, maxWidth: 240 }}>This is what your dashboard looks like after we take over your socials.</p>
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
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 900, color: T.text, marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: T.text, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.16) 0%,transparent 70%)' }} />
      <div className="sm-cta-inner" style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 70, height: 70, background: 'rgba(0,163,77,0.16)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(0,163,77,0.32)' }}>
            <i className="ti ti-brand-instagram" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Ready to Grow?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Get your free audit — we'll map exactly what it takes to build a presence that converts.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.38)' }}>Get My Free Audit →</button>
          </a>
          <button className="magnetic-btn-outline" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.22)', cursor: 'pointer' }}>View Case Studies →</button>
        </div>
      </div>
    </div>
  );
}

export default function SocialMediaPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Poppins', sans-serif; background: #f8f9fa; color: #2a2a2a; line-height: 1.6; font-size: 14px; }
        #services, #work, #process, #faq { scroll-margin-top: 90px; }

        @keyframes glowPulse    { 0%,100%{opacity:.55} 50%{opacity:.88} }
        @keyframes spinRing     { from{transform:rotateX(70deg) rotateZ(0)} to{transform:rotateX(70deg) rotateZ(360deg)} }
        @keyframes spinRing2    { from{transform:rotateX(50deg) rotateY(20deg) rotateZ(0)} to{transform:rotateX(50deg) rotateY(20deg) rotateZ(-360deg)} }
        @keyframes floatUp      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatDn      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
        @keyframes slideInL     { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInR     { from{opacity:0;transform:translateX(18px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes pulseDot     { 0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,.25)} 50%{box-shadow:0 0 0 6px rgba(0,163,77,.10)} }
        @keyframes gradientMove { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        .sm-reveal { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        .magnetic-btn { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease; }
        .magnetic-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 30px rgba(0,163,77,.32); }
        .magnetic-btn-outline { transition: transform .25s ease, border-color .25s ease, color .25s ease; }
        .magnetic-btn-outline:hover { transform: translateY(-3px); border-color: #00a34d !important; color: #00a34d !important; }

        .enq-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .enq-input { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.13); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 13px; font-family: 'Poppins', sans-serif; outline: none; transition: border-color .25s ease, background .25s ease; }
        .enq-input::placeholder { color: rgba(255,255,255,.32); }
        .enq-input:focus { border-color: #00a34d; background: rgba(0,163,77,.08); }
        .enq-select-wrap { position: relative; display: flex; align-items: center; }
        .enq-select-icon { position: absolute; left: 14px; font-size: 14px; color: rgba(255,255,255,.4); pointer-events: none; z-index: 1; }
        .enq-select { appearance: none; -webkit-appearance: none; padding-left: 36px; padding-right: 30px; cursor: pointer; color-scheme: dark; }
        .enq-select-chevron { position: absolute; right: 12px; font-size: 14px; color: rgba(255,255,255,.45); pointer-events: none; transition: transform .2s ease; }
        .enq-select-wrap:focus-within .enq-select-chevron { color: #00a34d; transform: rotate(180deg); }
        .enq-select option { background: #071209; color: #fff; }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .sm-hero-grid    { grid-template-columns: 1fr !important; padding: 56px 32px 48px !important; gap: 40px !important; }
          .sm-stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .sm-services-grid{ grid-template-columns: repeat(2,1fr) !important; }
          .sm-process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sm-contact-grid { grid-template-columns: 1fr !important; }
          .sm-cases-grid   { grid-template-columns: repeat(2,1fr) !important; }
          #services, #work { padding-left: 32px !important; padding-right: 32px !important; }
          #process, #faq   { padding-left: 32px !important; padding-right: 32px !important; }
          #contact         { padding-left: 32px !important; padding-right: 32px !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .sm-hero-grid {
            padding: 32px 16px 32px !important;
            gap: 24px !important;
          }
          .sm-services-grid { grid-template-columns: 1fr !important; }
          .sm-process-grid  { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .sm-cases-grid    { grid-template-columns: 1fr !important; }
          .sm-stats-grid    { grid-template-columns: 1fr 1fr !important; }
          .sm-contact-grid  { grid-template-columns: 1fr !important; }
          .sm-cta-inner     { flex-direction: column !important; align-items: flex-start !important; }
          .enq-row          { grid-template-columns: 1fr !important; }

          /* Section padding overrides */
          #services  { margin: 48px auto !important; padding: 0 16px !important; }
          #work      { padding: 56px 16px !important; }
          #process   { padding: 56px 16px !important; }
          #faq       { padding: 56px 16px !important; }
          #contact   { margin: 48px auto !important; padding: 0 16px !important; }

          /* Stats band tighter on mobile */
          .sm-stats-grid > div { padding: 28px 16px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }

          /* Platform band */
          .sm-platform-inner { gap: 24px !important; }

          /* CTA footer */
          .sm-cta-footer { padding: 48px 16px !important; }

          /* Contact grid panels */
          .sm-contact-left  { padding: 28px 20px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .sm-contact-right { padding: 28px 20px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div id="top" style={{ fontFamily: 'Poppins,sans-serif', background: T.bgLight, color: T.text, lineHeight: 1.6, fontSize: 14 }}>
        <Hero />
        <StatsBand />
        <PlatformBand />
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