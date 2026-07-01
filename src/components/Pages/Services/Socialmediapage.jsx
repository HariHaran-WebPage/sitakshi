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

/* Data for the radial "orbit" hero scene: platform icons that spin
   around the hub, and service petals arranged around them. */
const radialPlatforms = [
  { icon: 'ti-brand-facebook',  color: '#1877F2' },
  { icon: 'ti-brand-instagram', color: '#E4405F' },
  { icon: 'ti-brand-tiktok',    color: '#111111' },
  { icon: 'ti-brand-linkedin',  color: '#0A66C2' },
  { icon: 'ti-brand-x',         color: '#111111' },
  { icon: 'ti-brand-youtube',   color: '#FF0000' },
  { icon: 'ti-brand-whatsapp',  color: '#25D366' },
  { icon: 'ti-brand-pinterest', color: '#E60023' },
];
const radialServices = [
  { icon: 'ti-calendar-event', title: 'Content Strategy',     bg: '#0a140e' },
  { icon: 'ti-video',          title: 'Content Production',   bg: '#00a34d' },
  { icon: 'ti-users',          title: 'Community Management', bg: '#008040' },
  { icon: 'ti-speakerphone',   title: 'Influencer & UGC',      bg: '#00a34d' },
  { icon: 'ti-target-arrow',   title: 'Paid Social',           bg: '#008040' },
  { icon: 'ti-chart-arrows',   title: 'Social Analytics',      bg: '#00a34d' },
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

// Scales a fixed-size scene proportionally to its container width, so the
// SAME markup renders correctly from desktop down to small mobile screens
// without needing a separate mobile-only component.
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
   DASH CHIP — floating label badge around a scene
══════════════════════════════════════════════ */
function DashChip({ icon, label, sub, style, animClass }) {
  return (
    <div className={animClass} style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(8,18,12,0.94)', border: '1.5px solid rgba(0,163,77,0.32)', borderRadius: 50, padding: '9px 16px 9px 9px', backdropFilter: 'blur(14px)', boxShadow: '0 8px 26px rgba(0,0,0,0.32)', zIndex: 9, whiteSpace: 'nowrap', ...style }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,163,77,0.18)', border: '1.5px solid rgba(0,163,77,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, color: '#33c972' }}>
        <i className={icon} aria-hidden="true" />
      </div>
      <div>
        <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 11.5, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{label}</div>
        {sub && <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   RADIAL SERVICES SCENE — hero visual
   A spinning "orbit" illustration: platform icons
   continuously rotate around a central hub while
   staying upright, surrounded by six service petals.
   Layered glow, dotted texture and dashed orbit rings
   give the outer frame more depth than a flat card.
══════════════════════════════════════════════ */
function RadialServicesScene() {
  const { ref: wrapRef, scale } = useSceneScale(560);
  const { ref: tiltRef, tilt } = useParallax(4);

  const SCENE_W = 560, SCENE_H = 560;
  const cx = SCENE_W / 2, cy = SCENE_H / 2;
  const iconRadius = 108, iconSize = 44;
  const petalRadius = 198, petalW = 138, petalH = 98;
  const hubSize = 148;

  const polar = (r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div ref={wrapRef} style={{ width: '100%', maxWidth: SCENE_W }}>
      <div style={{ width: '100%', height: SCENE_H * scale, overflow: 'hidden', position: 'relative' }}>
        <div
          ref={tiltRef}
          style={{
            width: SCENE_W, height: SCENE_H, transformOrigin: 'top left',
            transform: `scale(${scale}) perspective(1400px) rotateX(${-tilt.y * 0.06}deg) rotateY(${tilt.x * 0.06}deg)`,
            transition: 'transform 0.25s ease-out', position: 'relative',
          }}
        >
          {/* layered ambient glow */}
          <div style={{ position: 'absolute', top: '4%', left: '6%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,163,77,0.16) 0%,rgba(0,163,77,0.05) 50%,transparent 75%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '2%', right: '4%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(51,201,114,0.14) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0 }} />

          {/* dotted texture, masked into a soft circle for depth */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,163,77,0.22) 1px,transparent 1px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(circle at center,black 0%,black 40%,transparent 72%)', WebkitMaskImage: 'radial-gradient(circle at center,black 0%,black 40%,transparent 72%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* decorative dashed orbit rings */}
          <div style={{ position: 'absolute', left: cx - (petalRadius + 34), top: cy - (petalRadius + 34), width: (petalRadius + 34) * 2, height: (petalRadius + 34) * 2, borderRadius: '50%', border: '1.5px dashed rgba(0,163,77,0.16)', zIndex: 1 }} />
          <div style={{ position: 'absolute', left: cx - (iconRadius + 24), top: cy - (iconRadius + 24), width: (iconRadius + 24) * 2, height: (iconRadius + 24) * 2, borderRadius: '50%', border: '1.5px dashed rgba(0,163,77,0.3)', zIndex: 1 }} />

          {/* spinning platform ring — icons orbit while staying upright */}
          <div className="orbit-ring" style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            {radialPlatforms.map((p, i) => {
              const pos = polar(iconRadius, i * (360 / radialPlatforms.length));
              return (
                <div key={i} style={{ position: 'absolute', left: pos.x - iconSize / 2, top: pos.y - iconSize / 2, width: iconSize, height: iconSize }}>
                  <div className="orbit-counter" style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, color: p.color }}>
                    <i className={`ti ${p.icon}`} aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* center hub */}
          <div style={{
            position: 'absolute', left: cx - hubSize / 2, top: cy - hubSize / 2, width: hubSize, height: hubSize,
            borderRadius: '50%', background: 'radial-gradient(circle at 32% 28%,#123a22,#061209 72%)',
            border: '1px solid rgba(51,201,114,0.35)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            boxShadow: '0 16px 36px -8px rgba(0,40,18,0.45), 0 0 0 8px rgba(0,163,77,0.06)', zIndex: 5,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#33c972', marginBottom: 8, animation: 'pulseDot 1.8s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>Full-service</span>
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 800, color: '#33c972', lineHeight: 1.25 }}>social</span>
          </div>

          {/* service petals */}
          {radialServices.map((s, i) => {
            const pos = polar(petalRadius, i * (360 / radialServices.length));
            const floatClass = ['chipFloat1', 'chipFloat2', 'chipFloat3'][i % 3];
            return (
              <div key={i} className={floatClass} style={{
                position: 'absolute', left: pos.x - petalW / 2, top: pos.y - petalH / 2, width: petalW, height: petalH,
                borderRadius: '42% 42% 40% 40% / 52% 52% 38% 38%', background: s.bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', padding: '0 12px',
                boxShadow: '0 12px 26px -6px rgba(0,40,18,0.3)', zIndex: 4,
              }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 17, color: '#33c972' }} aria-hidden="true" />
                <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{s.title}</span>
              </div>
            );
          })}

          {/* floating credibility chips */}
          <DashChip icon="ti ti-apps" label="8+ Platforms" sub="Managed in one place" animClass="chipFloat2" style={{ top: 2, right: -6 }} />
          <DashChip icon="ti ti-clock-hour-4" label="Always On" sub="Community covered daily" animClass="chipFloat3" style={{ bottom: 0, left: -10 }} />
        </div>
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
        {/* Right visual — single responsive spinning "orbit" mockup, scales for all screens */}
        <div className="sm-hero-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minWidth: 0 }}>
          <RadialServicesScene />
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
        <div className="sm-contact-left" style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        <div className="sm-contact-right" style={{ padding: '40px 36px', background: 'linear-gradient(165deg,#0a1410,#060e09)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
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

        @keyframes chipFloat1   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes chipFloat2   { 0%,100%{transform:translateY(0) rotate(-0.4deg)} 50%{transform:translateY(-9px) rotate(0.4deg)} }
        @keyframes chipFloat3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulseDot     { 0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,.25)} 50%{box-shadow:0 0 0 6px rgba(0,163,77,.10)} }
        @keyframes gradientMove { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ringSpin        { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ringSpinReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        .sm-reveal { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .orbit-ring    { animation: ringSpin 34s linear infinite; transform-origin: 50% 50%; }
        .orbit-counter { animation: ringSpinReverse 34s linear infinite; transform-origin: 50% 50%; }

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
          .sm-hero-right   { max-width: 560px; margin-left: auto; margin-right: auto; }
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
          .sm-hero-right    { max-width: 100%; margin-left: 0; margin-right: 0; }
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