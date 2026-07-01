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
  accent:       '#33c972',
  accentGold:   '#ffb700',
};

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const emServices = [
  { icon: 'ti ti-mail', accent: 'dark', tag: '01', title: 'Email Strategy', subtitle: 'Plan That Prints Money', desc: 'Full-funnel email strategy mapped to your customer journey — from first open to repeat purchase. Every send has a job.', features: ['Funnel mapping', 'Audience segmentation', 'Send-time optimisation', 'Revenue forecasting'], cta: 'Build My Strategy' },
  { icon: 'ti ti-pencil', accent: 'mid', tag: '02', title: 'Copywriting & Design', subtitle: 'Emails People Actually Read', desc: 'Subject lines that earn the open. Body copy that earns the click. Templates that look custom, not template-y.', features: ['Subject line testing', 'Email copywriting', 'HTML template design', 'Mobile optimisation'], cta: 'Start Writing' },
  { icon: 'ti ti-filter', accent: 'light', tag: '03', title: 'Automation & Flows', subtitle: 'Revenue While You Sleep', desc: 'Welcome series, abandoned cart, post-purchase, win-back — the flows that compound quietly and pay the bills.', features: ['Welcome sequences', 'Abandoned cart flows', 'Post-purchase series', 'Win-back campaigns'], cta: 'Automate My Revenue' },
  { icon: 'ti ti-users', accent: 'soft', tag: '04', title: 'List Management', subtitle: 'Quality Over Quantity', desc: 'List cleaning, segmentation, and growth strategies that protect deliverability and increase lifetime value per subscriber.', features: ['List hygiene', 'Segment building', 'Lead magnet setup', 'Pop-up strategy'], cta: 'Clean My List' },
  { icon: 'ti ti-test-pipe', accent: 'dark', tag: '05', title: 'A/B Testing & CRO', subtitle: 'Data Beats Opinions', desc: 'Systematic creative and copy testing so every campaign teaches us something and your average order value only moves one direction.', features: ['Subject line tests', 'CTA experiments', 'Layout variation', 'Multivariate testing'], cta: 'Start Testing' },
  { icon: 'ti ti-chart-line', accent: 'mid', tag: '06', title: 'Analytics & Reporting', subtitle: 'Numbers With Context', desc: 'Open rates, click rates, revenue-per-send — reported with the story behind the numbers and a clear next action every time.', features: ['Revenue attribution', 'Deliverability reports', 'Cohort analysis', 'Monthly reviews'], cta: 'See My Numbers' },
];

const processSteps = [
  { icon: 'ti ti-database', title: 'Audit', desc: 'We tear apart your current email programme — deliverability, list health, flow logic, revenue leaks. Nothing gets missed.' },
  { icon: 'ti ti-writing', title: 'Build', desc: 'Flows written, templates designed, segments structured. Everything tested in every inbox before a single send goes live.' },
  { icon: 'ti ti-send', title: 'Send', desc: 'Campaign calendar executed on schedule — the right message, the right list, the right moment. Always.' },
  { icon: 'ti ti-chart-arrows', title: 'Optimise', desc: 'Weekly reporting, monthly strategy calls, and continuous creative testing. The programme keeps getting smarter.' },
];

const faqs = [
  { q: 'Which email platforms do you work with?', a: 'Klaviyo, Mailchimp, ActiveCampaign, HubSpot, and Brevo. We adapt to your stack.' },
  { q: 'How long before we see results?', a: 'Most clients see improved open rates and revenue-per-send within the first 30 days. Automation revenue builds over 60–90 days.' },
  { q: 'Do you write the copy or just set up the flows?', a: 'Both — full-service includes strategy, copywriting, design, build, and reporting. We can also support in-house teams.' },
  { q: 'What if my list is cold or messy?', a: 'List rehab is part of the audit. We clean, segment, and re-engage before ramping sends to protect deliverability.' },
  { q: 'How do you measure ROI?', a: 'Revenue per email sent, flow-attributed revenue, and list growth rate. We tie every send to actual money.' },
];

const caseStudies = [
  { company: 'Brewed', industry: 'D2C / Coffee', result: '42% open rate', timeframe: '3 months', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format', quote: 'Email went from our most ignored channel to our highest-revenue one in a single quarter.', person: 'James Okafor', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=75&auto=format' },
  { company: 'Vita', industry: 'Health / Supplements', result: '$180K email revenue', timeframe: '4 months', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80&auto=format', quote: 'The abandoned cart flow alone paid for six months of retainer in its first week.', person: 'Priya Nair', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format' },
  { company: 'Deck', industry: 'SaaS / Productivity', result: '3.8× ROI', timeframe: '5 months', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&auto=format', quote: 'Our onboarding flow now activates 60% of new users within 7 days. It used to be 22%.', person: 'Lena Schmidt', role: 'Head of Growth', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=75&auto=format' },
];

const IMAGES = {
  a1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=75&auto=format',
  a2: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format',
};

const platforms = [
  { icon: 'ti ti-brand-mailchimp', label: 'Mailchimp' },
  { icon: 'ti ti-mail-forward', label: 'Klaviyo' },
  { icon: 'ti ti-activity', label: 'ActiveCampaign' },
  { icon: 'ti ti-brand-google', label: 'HubSpot' },
  { icon: 'ti ti-send', label: 'Brevo' },
];

const enquiryTypes = ['Email Strategy', 'Copywriting & Design', 'Automation & Flows', 'List Management', 'A/B Testing', 'Full Email Package', 'Quick Audit'];

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
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
      opacity: 0.03 + Math.random() * 0.06, hue: 210 + Math.random() * 40,
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
        g.addColorStop(0, `hsla(${o.hue},80%,60%,${o.opacity})`);
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
   HERO RIGHT — Idea-to-Strategy Concept Web
   (Central glowing bulb radiating into the
   levers of an email marketing programme)

   Scaling strategy: everything below is positioned
   with PERCENTAGES (of the 700×600 design space) and
   sized with container-query units (cqw), inside an
   outer box locked to a 700:600 aspect-ratio. That
   means the whole graphic resizes purely through CSS
   layout — no transform math, no ResizeObserver, no
   breakpoint-specific scale values to keep in sync.
   It can't clip or overlap at any viewport width.
══════════════════════════════════════════════ */
const conceptItems = [
  { icon: 'ti ti-clipboard-list', label: 'Strategy',        angle: -100, desc: 'Full-funnel planning that maps every email to a stage in your customer journey.' },
  { icon: 'ti ti-gift',           label: 'Prizes',          angle: -55,  desc: 'Giveaways and incentives that turn casual subscribers into engaged, loyal fans.' },
  { icon: 'ti ti-share-3',        label: 'Social Media',    angle: -18,  desc: 'Cross-channel campaigns that turn your social audience into email subscribers.' },
  { icon: 'ti ti-users',          label: 'Subscriber List', angle: 18,   desc: 'Clean, segmented lists that keep every send relevant and your sender reputation strong.' },
  { icon: 'ti ti-chart-histogram',label: 'Analysis',        angle: 60,   desc: 'Deep dives into opens, clicks and revenue that reveal exactly what is working.' },
  { icon: 'ti ti-coin',           label: 'ROI',              angle: 105, desc: 'Every campaign tracked back to real revenue, so you know the return on each send.' },
  { icon: 'ti ti-align-left',     label: 'Content',         angle: 148,  desc: 'Copy and design crafted to earn the open, the click, and the conversion.' },
  { icon: 'ti ti-shield-check',   label: 'Reliability',     angle: -148, desc: 'Consistent, on-time sends with deliverability safeguards built into every flow.' },
];

const labelCycle = ['Strategy', 'Prizes', 'Social Media', 'Subscriber List', 'Analysis', 'ROI', 'Content', 'Reliability'];

// Design-space reference: 700 wide × 600 tall (trimmed from 640 and
// re-centered so the ring sits with even breathing room top and bottom,
// which is what pulls the whole graphic up visually).
const SPACE_W = 700, SPACE_H = 600;
const wp = v => `${(v / SPACE_W) * 100}%`;   // horizontal position / width
const hp = v => `${(v / SPACE_H) * 100}%`;   // vertical position / height
const cq = v => `${(v / SPACE_W) * 100}cqw`; // uniform size (font, radius, gap) via container-query units

function ConceptWeb() {
  const { ref, visible } = useReveal();
  const cx = 350, cy = 300, R = 220, bulbR = 76;
  const toXY = (angleDeg, radius) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const [activeLabel, setActiveLabel] = useState(0);
  const cycleRef = useRef(null);
  useEffect(() => {
    if (!visible) return;
    const kick = setTimeout(() => {
      cycleRef.current = setInterval(() => setActiveLabel(v => (v + 1) % labelCycle.length), 1500);
    }, 1600);
    return () => { clearTimeout(kick); if (cycleRef.current) clearInterval(cycleRef.current); };
  }, [visible]);

  const activeItem = conceptItems.find(c => c.label === labelCycle[activeLabel]) || conceptItems[0];
  const [popupItem, setPopupItem] = useState(null);

  return (
    <div ref={ref} className="hero-right-outer">
      <div className="hero-right-inner" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {/* connecting spokes */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} viewBox={`0 0 ${SPACE_W} ${SPACE_H}`} preserveAspectRatio="none">
          <defs>
            <marker id="cwArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={T.primary} opacity="0.55" />
            </marker>
          </defs>
          {conceptItems.map((item, i) => {
            const from = toXY(item.angle, bulbR * 1.32 + 8);
            const to = toXY(item.angle, R - 40);
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={T.primary} strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round"
                opacity={visible ? 0.5 : 0}
                style={{ transition: `opacity 0.5s ease ${i * 90 + 650}ms` }}
                markerEnd="url(#cwArrow)" />
            );
          })}
        </svg>

        {/* faint orbit ring */}
        <div style={{ position: 'absolute', left: wp(cx), top: hp(cy), width: wp((R - 10) * 2), height: hp((R - 10) * 2), transform: 'translate(-50%,-50%)', borderRadius: '50%', border: `1px dashed rgba(0,163,77,0.16)`, zIndex: 0 }} />

        {/* concept nodes */}
        {conceptItems.map((item, i) => {
          const pos = toXY(item.angle, R);
          const dx = cx - pos.x, dy = cy - pos.y;
          const delay = i * 90 + 700;
          return (
            <div key={item.label} style={{
              position: 'absolute', left: wp(pos.x), top: hp(pos.y),
              zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: cq(7),
              width: wp(118), textAlign: 'center',
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translate(-50%,-50%) translate(0,0) scale(1)'
                : `translate(-50%,-50%) translate(${wp(dx)},${hp(dy)}) scale(0.15)`,
              transition: `opacity 0.45s ease ${delay}ms, transform 0.6s cubic-bezier(0.3,1.4,0.4,1) ${delay}ms`,
            }}>
              <div
                onClick={() => setPopupItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setPopupItem(item); }}
                style={{
                  width: cq(50), height: cq(50), borderRadius: cq(14),
                  background: 'linear-gradient(160deg, #ffffff 0%, #eef6f1 100%)',
                  border: `1px solid rgba(0,163,77,0.24)`,
                  boxShadow: '0 8px 18px rgba(0,60,20,0.12), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,60,20,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.primaryDark, fontSize: cq(22), flexShrink: 0,
                  cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <i className={item.icon} aria-hidden="true" />
              </div>
              <span style={{ fontSize: cq(12.5), fontWeight: 700, color: T.text, letterSpacing: '0.01em', lineHeight: 1.2 }}>{item.label}</span>
            </div>
          );
        })}

        {/* outer glow behind envelope */}
        <div style={{ position: 'absolute', left: wp(cx), top: hp(cy), width: wp(310), height: hp(280), transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,163,77,0.22) 0%, rgba(0,163,77,0.08) 55%, transparent 75%)', animation: 'glowPulseEM 2.8s ease-in-out infinite', zIndex: 1, pointerEvents: 'none' }} />

        {/* orbit accent ring */}
        <div style={{ position: 'absolute', left: wp(cx), top: hp(cy), width: wp((bulbR + 26) * 2), height: hp((bulbR + 26) * 2), transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px dashed rgba(0,163,77,0.3)', animation: 'spinRingEM 16s linear infinite', zIndex: 2 }} />

        {/* center: realistic 3D mail / envelope hub */}
        <div style={{ position: 'absolute', left: wp(cx), top: hp(cy), width: wp(bulbR * 2.55), height: hp(bulbR * 2.1), transform: 'translate(-50%,-50%)', zIndex: 3, filter: 'drop-shadow(0 18px 30px rgba(0,60,20,0.28))' }}>
          <svg width="100%" height="100%" viewBox="0 0 180 148" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e7ede9" />
              </linearGradient>
              <linearGradient id="envFlapL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d7e3da" />
              </linearGradient>
              <linearGradient id="envFlapR" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c9dad0" />
              </linearGradient>
              <linearGradient id="envFlapTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4f8f5" />
                <stop offset="100%" stopColor="#dbe7e0" />
              </linearGradient>
              <linearGradient id="stampGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#33c972" />
                <stop offset="100%" stopColor="#008040" />
              </linearGradient>
            </defs>

            {/* envelope back / body */}
            <rect x="6" y="20" width="168" height="118" rx="12" fill="url(#envBody)" stroke="rgba(0,80,40,0.12)" strokeWidth="1.5" />

            {/* inner side flaps (perspective) */}
            <path d="M6 32 L90 78 L6 132 Z" fill="url(#envFlapL)" opacity="0.9" />
            <path d="M174 32 L90 78 L174 132 Z" fill="url(#envFlapR)" opacity="0.9" />

            {/* bottom pocket */}
            <path d="M6 132 L90 82 L174 132 L174 138 A12 12 0 0 1 162 150 L18 150 A12 12 0 0 1 6 138 Z" fill="url(#envBody)" stroke="rgba(0,80,40,0.12)" strokeWidth="1.5" />

            {/* top flap (unfolds open) */}
            <g style={{
              transformBox: 'fill-box', transformOrigin: '50% 0%',
              transform: visible ? 'scaleY(1) rotate(0deg)' : 'scaleY(0.06) rotate(1deg)',
              opacity: visible ? 1 : 0.85,
              transition: 'transform 0.55s cubic-bezier(0.32,1.5,0.4,1) 0.05s, opacity 0.35s ease 0.05s',
            }}>
              <path d="M6 32 A12 12 0 0 1 18 20 L162 20 A12 12 0 0 1 174 32 L90 84 Z" fill="url(#envFlapTop)" stroke="rgba(0,80,40,0.14)" strokeWidth="1.5" />
              <path d="M20 24 L90 76 L160 24" fill="none" stroke="rgba(0,120,60,0.18)" strokeWidth="1.4" />
            </g>

            {/* subtle sheen */}
            <path d="M14 26 L90 80" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

            {/* wax-style seal / stamp — pops in once the flap has opened */}
            <g style={{
              transformBox: 'fill-box', transformOrigin: '50% 50%',
              transform: visible ? 'scale(1)' : 'scale(0)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.3,1.6,0.4,1) 0.5s, opacity 0.3s ease 0.5s',
            }}>
              <circle cx="90" cy="80" r="20" fill="url(#stampGrad)" stroke="#ffffff" strokeWidth="3" />
              <path d="M81 80 l6 6 12-13" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        {/* spinning letter — pulls out of the envelope and flips through each concept */}
        <div style={{
          position: 'absolute', left: wp(cx), top: hp(cy - bulbR * 0.98), transform: 'translate(-50%,-50%)',
          zIndex: 5, perspective: 900,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 1.55s',
        }}>
          <div key={activeLabel} style={{
            display: 'flex', alignItems: 'center', gap: cq(9),
            background: '#ffffff', borderRadius: cq(12), padding: `${cq(9)} ${cq(16)} ${cq(9)} ${cq(12)}`,
            border: `1px solid rgba(0,163,77,0.28)`, boxShadow: '0 10px 26px rgba(0,60,20,0.22)',
            transformStyle: 'preserve-3d', whiteSpace: 'nowrap',
            animation: 'letterSpinCard 0.65s cubic-bezier(0.32,1.4,0.4,1) both',
          }}>
            <span style={{
              width: cq(26), height: cq(26), borderRadius: cq(8), background: T.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.primaryDark, fontSize: cq(14), flexShrink: 0,
            }}>
              <i className={activeItem.icon} aria-hidden="true" />
            </span>
            <span style={{ fontSize: cq(13), fontWeight: 700, color: T.text }}>{activeItem.label}</span>
          </div>
        </div>

        {/* wordmark chip under bulb */}
        <div style={{
          position: 'absolute', left: wp(cx), top: hp(cy + bulbR * 1.05 + 20), transform: 'translate(-50%,0)', zIndex: 4,
          background: T.text, color: '#fff', borderRadius: cq(30), padding: `${cq(7)} ${cq(18)}`,
          fontFamily: 'Playfair Display,serif', fontSize: cq(13), fontWeight: 800, letterSpacing: '0.06em',
          textTransform: 'uppercase', boxShadow: '0 8px 22px rgba(0,0,0,0.18)', whiteSpace: 'nowrap',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 1.5s',
        }}>
          Email Marketing
        </div>

        {/* click pop-up: detail card for the tapped concept icon */}
        {popupItem && (
          <div
            onClick={() => setPopupItem(null)}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              background: 'rgba(6,20,12,0.42)', backdropFilter: 'blur(2px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'popBackdropIn 0.25s ease both', cursor: 'pointer',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: '82%', maxWidth: 280, background: '#ffffff', borderRadius: 20, padding: '26px 24px 22px',
                boxShadow: '0 30px 70px rgba(0,20,10,0.35)', border: '1px solid rgba(0,163,77,0.2)',
                position: 'relative', cursor: 'default',
                animation: 'popCardIn 0.4s cubic-bezier(0.3,1.6,0.4,1) both',
              }}
            >
              <button
                onClick={() => setPopupItem(null)}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderRadius: '50%',
                  border: 'none', background: T.bgLight, color: T.textLight, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
              <div style={{
                width: 54, height: 54, borderRadius: 16, background: T.primaryLight,
                border: `1px solid #b3f0cc`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: T.primaryDark, fontSize: 24, marginBottom: 16,
              }}>
                <i className={popupItem.icon} aria-hidden="true" />
              </div>
              <h4 style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 800, color: T.text, marginBottom: 8 }}>{popupItem.label}</h4>
              <p style={{ fontSize: 13, color: T.textLight, lineHeight: 1.7 }}>{popupItem.desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════ */
const accentMap = {
  dark: {
    bg: '#060d1c', border: 'rgba(0,163,77,0.18)',
    bar: `linear-gradient(90deg,#006b30,#00a34d,#33c972)`,
    iconBg: 'rgba(0,163,77,0.14)', iconColor: '#33c972',
    tagColor: '#33c972', titleColor: '#fff',
    descColor: 'rgba(255,255,255,0.58)', featColor: 'rgba(255,255,255,0.5)',
    hoverBorder: 'rgba(0,163,77,0.48)', hoverShadow: '0 24px 60px -12px rgba(0,128,64,0.38)',
  },
  mid: {
    bg: '#061209', border: 'rgba(0,163,77,0.14)',
    bar: `linear-gradient(90deg,#004d26,#008040,#00a34d)`,
    iconBg: 'rgba(0,128,64,0.2)', iconColor: '#66d49a',
    tagColor: '#66d49a', titleColor: '#eaf0ff',
    descColor: 'rgba(180,200,255,0.68)', featColor: 'rgba(180,200,255,0.54)',
    hoverBorder: 'rgba(0,163,77,0.42)', hoverShadow: '0 24px 60px -12px rgba(0,64,26,0.55)',
  },
  light: {
    bg: '#ffffff', border: T.border,
    bar: `linear-gradient(90deg,#00a34d,#33c972,#80e0aa)`,
    iconBg: T.primaryLight, iconColor: T.primaryDark,
    tagColor: T.primary, titleColor: T.text,
    descColor: T.textLight, featColor: T.textLight,
    hoverBorder: 'rgba(0,163,77,0.3)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.1)',
  },
  soft: {
    bg: '#ffffff', border: T.border,
    bar: `linear-gradient(90deg,#33c972,#80e0aa,#b3f0cc)`,
    iconBg: T.primaryLight, iconColor: T.primary,
    tagColor: T.primary, titleColor: T.text,
    descColor: T.textLight, featColor: T.textLighter,
    hoverBorder: 'rgba(0,163,77,0.28)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.09)',
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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%,${a.iconColor}16 0%,transparent 55%)`, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }}/>
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
          <i className={svc.icon} aria-hidden="true"/>
        </div>
      </div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 800, color: a.titleColor, marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize: 13.5, color: a.descColor, lineHeight: 1.8, marginBottom: 20 }}>{svc.desc}</p>
      <div style={{ height: 1, background: `linear-gradient(90deg,${a.iconColor}30,transparent)`, marginBottom: 18 }}/>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
        {svc.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: a.featColor }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.iconColor, flexShrink: 0 }}/>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button style={{
        background: hovered ? a.iconColor : 'transparent',
        border: `1.5px solid ${a.iconColor}`,
        color: hovered ? (svc.accent === 'light' || svc.accent === 'soft' ? '#fff' : '#040c1c') : a.iconColor,
        borderRadius: 11, padding: '12px 20px',
        fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12.5,
        cursor: 'pointer', transition: 'all 0.3s ease',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}/>
      </button>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} className="stat-cell">
      <div style={{ width: 56, height: 56, background: 'rgba(0,163,77,0.14)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 26, flexShrink: 0, border: '1px solid rgba(0,163,77,0.22)' }}>
        <i className={icon}/>
      </div>
      <div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#ffffff 0%,#b3ccff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
        border: `1px solid ${hov ? 'rgba(0,163,77,0.3)' : T.border}`,
        boxShadow: hov ? '0 20px 50px -12px rgba(0,163,77,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms, box-shadow 0.4s ease, border-color 0.4s ease`,
      }}>
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img src={cs.img} alt={cs.company} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.8)', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(0,20,40,0.75),rgba(0,0,0,0.45))' }}/>
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
          <img src={cs.avatar} alt={cs.person} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.primaryLight}` }}/>
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
      <div style={{ width: 72, height: 72, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.25)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 30, margin: '0 auto 20px' }}>
        <i className={step.icon} aria-hidden="true"/>
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#66d49a', opacity: 0.7, marginBottom: 8 }}>0{index + 1}</div>
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
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? T.text : T.primaryLight, border: `1.5px solid ${open ? T.text : T.primaryLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? '#33c972' : T.primaryDark, fontSize: 16, flexShrink: 0, transition: 'all 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ marginTop: 12, fontSize: 14, color: T.textLight, lineHeight: 1.8, paddingRight: 44 }}>{item.a}</p>
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
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(0,163,77,0.16)', border: '1.5px solid rgba(0,163,77,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 24 }}><i className="ti ti-check"/></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 800, color: '#fff' }}>Audit request sent!</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 320 }}>Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''} — your email audit is in. We reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,163,77,0.42)', color: '#33c972', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
    </div>
  );
  return (
    <div>
      <div style={{ width: 52, height: 52, background: 'rgba(0,163,77,0.16)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(0,163,77,0.3)' }}><i className="ti ti-mail"/></div>
      <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Request a Free Email Audit</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>Share your platform and goals — we'll send a full deliverability + revenue audit within 48 hours.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} required/>
          <input className="enq-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} required/>
        </div>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Email platform (e.g. Klaviyo)" value={form.phone} onChange={e => update('phone', e.target.value)}/>
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" aria-hidden="true"/>
            <select className="enq-input enq-select" value={form.type} onChange={e => update('type', e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" aria-hidden="true"/>
          </div>
        </div>
        <textarea className="enq-input" placeholder="Tell us your list size, goals, and biggest email pain points..." rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins,sans-serif' }}/>
        <button type="submit" disabled={status === 'sending'} style={{ background: T.primary, color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Get My Free Audit'}
          {status !== 'sending' && <i className="ti ti-arrow-right" style={{ fontSize: 14 }}/>}
        </button>
      </form>
    </div>
  );
}

function LiveDashboard() {
  const { ref, tilt } = useParallax(6);
  const [openCount, setOpenCount] = useState(8420);
  useEffect(() => {
    const id = setInterval(() => setOpenCount(v => v + Math.floor(Math.random() * 8) + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const bars = [38, 55, 42, 70, 58, 85, 72];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ width: '100%', maxWidth: 260, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div style={{ background: 'linear-gradient(165deg,#0a140e,#040b14)', border: '1px solid rgba(0,163,77,0.22)', borderRadius: 16, padding: 16, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(0,163,77,0.16) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }}/><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }}/><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }}/>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono,monospace' }}>business.klaviyo.com/campaigns</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Opens Today</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{openCount.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.28)', borderRadius: 20, padding: '3px 8px', height: 'fit-content' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#33c972' }}/><span style={{ fontSize: 7.5, color: '#33c972', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 14 }}>
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? `linear-gradient(180deg,#33c972,#00a34d)` : 'rgba(0,163,77,0.22)' }}/>)}
          </div>
          {[{ kw: 'Open rate', pos: '42%', delta: '↑18%' }, { kw: 'Click rate', pos: '8.3%', delta: '↑3.1%' }, { kw: 'Revenue/send', pos: '$4.20', delta: '↑$0.80' }].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 5 }}>
              <div style={{ flex: 1, fontSize: 9, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.kw}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#33c972', flexShrink: 0 }}>{row.pos}</div>
              <div style={{ fontSize: 8, color: '#33c972', flexShrink: 0 }}>{row.delta}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, height: 28, borderRadius: 8, background: `linear-gradient(90deg,${T.primaryDark},${T.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <i className="ti ti-chart-bar" style={{ fontSize: 12, color: '#fff' }}/><span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>Full Report Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: T.bgLight }}>
      <AnimatedBg/>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,rgba(230,240,255,0.65) 0%,transparent 60%)`, pointerEvents: 'none', zIndex: 1 }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to top,${T.bgLight},transparent)`, pointerEvents: 'none', zIndex: 1 }}/>
      <div className="em-hero-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 64px 72px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        {/* LEFT */}
        <div>
          <div className="em-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.text, color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, border: `1px solid ${T.text}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.primary, boxShadow: `0 0 0 3px rgba(0,163,77,0.25)`, display: 'inline-block', flexShrink: 0, animation: 'pulseDotEM 2s ease-in-out infinite' }}/>
            ✉️ Email Marketing Agency
          </div>
          <h1 className="em-reveal" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.06, color: T.text, letterSpacing: '-1.2px', marginBottom: 20, animationDelay: '0.1s' }}>
            Turn Your Email List Into<br/>
            <span style={{ background: `linear-gradient(135deg,${T.primaryDark} 0%,${T.primary} 55%,#33c972 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your Best Sales Channel</span>
          </h1>
          <p className="em-reveal" style={{ fontSize: 15, color: T.textLight, lineHeight: 1.8, maxWidth: 460, marginBottom: 34, animationDelay: '0.18s' }}>
            We build email programmes that consistently open, click, and convert — from welcome flows to full lifecycle automation that compounds every month.
          </p>
          <div className="em-reveal" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', animationDelay: '0.26s' }}>
            <button className="em-magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)' }}>
              Get Free Email Audit →
            </button>
            <a href="#work" style={{ textDecoration: 'none' }}>
              <button className="em-magnetic-btn-outline" style={{ background: '#fff', color: T.text, padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>
                View Results
              </button>
            </a>
          </div>
          <div className="em-reveal" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32, animationDelay: '0.30s' }}>
            {['300+ Campaigns', '80+ Clients', '3.8× Avg. ROI'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.text, fontWeight: 600 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: T.primaryLight, border: `1.5px solid #b3f0cc`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: T.primaryDark, flexShrink: 0 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
          <div className="em-reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, animationDelay: '0.32s' }}>
            {[
              { icon: 'ti-trending-up', value: '42%', label: 'Avg. open rate' },
              { icon: 'ti-clock',       value: '30 days', label: 'To first revenue flow' },
              { icon: 'ti-coin',        value: '3.8×', label: 'Average ROI' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.72)', border: `1px solid ${T.border}`, backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.primaryLight, border: `1px solid #b3f0cc`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`ti ${m.icon}`} style={{ fontSize: 15, color: T.primaryDark }}/>
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 16, fontWeight: 900, color: T.text, lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: T.textLighter, marginTop: 1 }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="em-reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24, borderTop: `1px solid ${T.border}`, animationDelay: '0.38s' }}>
            <div style={{ display: 'flex' }}>
              {[IMAGES.a1, IMAGES.a2].map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.bgLight}`, marginLeft: i === 0 ? 0 : -8 }}/>
              ))}
            </div>
            <span style={{ fontSize: 12, color: T.textLight }}>Trusted by <strong style={{ color: T.text }}>80+ brands</strong> to own their inbox</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="em-hero-right-wrap">
          <ConceptWeb />
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    { icon: 'ti ti-mail-opened', num: 42, suffix: '%', label: 'Avg. open rate' },
    { icon: 'ti ti-click', num: 8, suffix: '.3%', label: 'Avg. click-through rate' },
    { icon: 'ti ti-users', num: 80, suffix: '+', label: 'Clients served' },
    { icon: 'ti ti-coin', num: 38, suffix: '×', label: 'Average email ROI' },
  ];
  return (
    <div style={{ background: T.text, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${T.primaryDark},${T.primary},#33c972,${T.primary},${T.primaryDark},transparent)`, backgroundSize: '200% 100%', animation: 'gradientMoveEM 3s linear infinite' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle,rgba(0,163,77,0.14) 1px,transparent 1px)`, backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }}/>
      <div className="em-stats-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => <StatCell key={i} {...s}/>)}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div id="services" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 24px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid #b3f0cc` }}>What We Do</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Email That Actually Earns</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Every service is built to stack. Start with strategy, end with an email programme that runs and earns on its own.</p>
      <div className="em-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {emServices.map((svc, i) => <ServiceCard key={i} svc={svc} index={i}/>)}
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <div id="work" style={{ background: T.bgLight, padding: '88px 24px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid #b3f0cc` }}>Case Studies</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Inboxes Into Revenue</h2>
        <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Three brands, three different problems — one outcome: email that generates real, attributable money.</p>
        <div className="em-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {caseStudies.map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i}/>)}
        </div>
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div id="process" style={{ background: T.text, padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: `radial-gradient(ellipse,rgba(0,163,77,0.11) 0%,transparent 70%)`, pointerEvents: 'none' }}/>
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,163,77,0.16)', color: '#33c972', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(0,163,77,0.28)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: '#fff', marginBottom: 56, lineHeight: 1.1, letterSpacing: '-1px' }}>Four Steps, Zero Guesswork</h2>
        <div className="em-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: `linear-gradient(90deg,transparent,rgba(0,163,77,0.28),rgba(0,163,77,0.28),transparent)` }}/>
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i}/>)}
        </div>
      </div>
    </div>
  );
}

function PlatformBand() {
  return (
    <div style={{ background: '#fff', padding: '40px 24px', borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: T.textLighter, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>Platforms we work with</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {platforms.map(p => (
            <span key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: T.textLighter, letterSpacing: '-0.3px' }}>
              <i className={p.icon} style={{ fontSize: 18 }}/>{p.label}
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
    <div id="contact" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 24px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid #b3f0cc` }}>Get In Touch</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Get Your Free Email Audit</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No pitch, no fluff — just a real audit of your deliverability and revenue opportunity, delivered in 48 hours.</p>
      <div ref={ref} className="em-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, background: T.text, borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(0,163,77,0.28)', boxShadow: '0 24px 64px rgba(0,163,77,0.12)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm/></div>
        </div>
        <div style={{ padding: '40px 36px', background: 'linear-gradient(165deg,#0a140e,#06100a)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.12) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#33c972' }}/>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Insights</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 32, maxWidth: 240 }}>This is what your email dashboard looks like after we take over.</p>
            <LiveDashboard/>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-clock" style={{ fontSize: 14, color: '#33c972' }}/>
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
    <div id="faq" style={{ background: T.bgLight, padding: '88px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid #b3f0cc` }}>FAQ</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item}/>)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: T.text, borderTop: `1px solid rgba(255,255,255,0.06)`, padding: '72px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: `radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)` }}/>
      <div className="em-cta-inner" style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 70, height: 70, background: 'rgba(0,163,77,0.16)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(0,163,77,0.32)' }}>
            <i className="ti ti-mail"/>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Ready to Own Your Inbox?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Get your free audit — we'll map exactly what it takes to turn your list into your best revenue channel.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="em-magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: `0 6px 20px rgba(0,163,77,0.36)` }}>Get My Free Audit →</button>
          </a>
          <button className="em-magnetic-btn-outline" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.22)', cursor: 'pointer' }}>View Case Studies →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export default function EmailMarketingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Poppins',sans-serif;background:#f8f9fa;color:#2a2a2a;line-height:1.6;font-size:14px;overflow-x:hidden;}
        #services,#work,#process,#faq{scroll-margin-top:90px;}

        /* ── HeroRight responsive wrapper ──
           Pure CSS scaling: the outer box is locked to a 700:600
           aspect-ratio and capped with max-width per breakpoint below.
           Every element inside ConceptWeb is positioned/sized with
           percentages and container-query (cqw) units relative to that
           box, so the whole diagram resizes automatically with zero
           JavaScript measurement — it cannot clip or overlap at any
           screen width, and there's no scale value to keep in sync. */
        .em-hero-right-wrap {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .hero-right-outer {
          position: relative;
          width: 100%;
          max-width: 700px;
          aspect-ratio: 700 / 600;
          overflow: hidden;
          container-type: inline-size;
          margin-top: -18px; /* nudges the graphic up so it sits level with the headline, compensating for the ring's built-in top padding */
        }
        .hero-right-inner {
          position: absolute;
          inset: 0;
        }

        /* ── Stat cell base ── */
        .stat-cell {
          padding: 44px 36px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .stat-cell:last-child { border-right: none; }

        @keyframes glowPulseEM{0%,100%{opacity:0.55}50%{opacity:0.88}}
        @keyframes spinRingEM{from{transform:rotateZ(0deg)}to{transform:rotateZ(360deg)}}
        @keyframes letterSpinCard{0%{transform:rotateY(-110deg) scale(0.7);opacity:0;}55%{transform:rotateY(18deg) scale(1.05);opacity:1;}100%{transform:rotateY(0deg) scale(1);opacity:1;}}
        @keyframes popBackdropIn{from{opacity:0}to{opacity:1}}
        @keyframes popCardIn{0%{transform:scale(0.4) translateY(18px);opacity:0;}60%{transform:scale(1.06) translateY(-4px);opacity:1;}100%{transform:scale(1) translateY(0);opacity:1;}}
        @keyframes floatEnv{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-10px) rotate(4deg)}}
        @keyframes slideInLeftEM{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRightEM{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulseDotEM{0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,0.22)}50%{box-shadow:0 0 0 6px rgba(0,163,77,0.08)}}
        @keyframes gradientMoveEM{0%{background-position:0%}100%{background-position:200%}}
        @keyframes fadeUpEM{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        .em-reveal{animation:fadeUpEM 0.7s cubic-bezier(0.22,1,0.36,1) both;}
        .em-magnetic-btn{transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.25s ease;}
        .em-magnetic-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 30px rgba(0,163,77,0.30);}
        .em-magnetic-btn-outline{transition:transform 0.25s ease,border-color 0.25s ease,color 0.25s ease;}
        .em-magnetic-btn-outline:hover{transform:translateY(-3px);border-color:#00a34d !important;color:#33c972 !important;}

        .enq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .enq-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:12px 14px;color:#fff;font-size:13px;font-family:'Poppins',sans-serif;outline:none;transition:border-color 0.25s ease,background 0.25s ease;}
        .enq-input::placeholder{color:rgba(255,255,255,0.32);}
        .enq-input:focus{border-color:#00a34d;background:rgba(0,163,77,0.08);}
        .enq-select-wrap{position:relative;display:flex;align-items:center;}
        .enq-select-icon{position:absolute;left:14px;font-size:14px;color:rgba(255,255,255,0.4);pointer-events:none;z-index:1;}
        .enq-select{appearance:none;-webkit-appearance:none;padding-left:36px;padding-right:30px;cursor:pointer;color-scheme:dark;}
        .enq-select-chevron{position:absolute;right:12px;font-size:14px;color:rgba(255,255,255,0.45);pointer-events:none;transition:transform 0.2s ease;}
        .enq-select-wrap:focus-within .enq-select-chevron{color:#00a34d;transform:rotate(180deg);}
        .enq-select option{background:#0a140e;color:#fff;}

        /* ══ 1100–1280px ══ */
        @media(max-width:1280px){
          .hero-right-outer{max-width:600px;}
          .em-hero-grid{padding:64px 40px 56px !important;gap:32px !important;}
        }

        /* ══ 1025–1100px ══ */
        @media(max-width:1100px){
          .hero-right-outer{max-width:530px;}
        }

        /* ══ LAPTOP (1025–1440px): nudge hero content upward ══ */
        @media(min-width:1025px) and (max-width:1440px){
          .em-hero-grid{padding:32px 56px 40px !important;align-items:flex-start !important;}
          .hero-right-outer{margin-top:-30px;}
        }

        /* ══ TABLET (769–1024px): switch hero to single column ══ */
        @media(max-width:1024px){
          .em-hero-grid{grid-template-columns:1fr !important;padding:56px 32px 48px !important;gap:40px !important;}
          .em-hero-right-wrap{justify-content:center;}
          .hero-right-outer{max-width:640px;margin:12px auto 0;}
          .em-stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .stat-cell{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);padding:32px 28px;}
          .stat-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,0.06) !important;}
          .stat-cell:last-child,.stat-cell:nth-last-child(-n+2){border-bottom:none;}
          .em-services-grid{grid-template-columns:repeat(2,1fr) !important;}
          .em-process-grid{grid-template-columns:repeat(2,1fr) !important;}
          .em-contact-grid{grid-template-columns:1fr !important;}
          .em-cases-grid{grid-template-columns:repeat(2,1fr) !important;}
        }

        /* ══ MOBILE (481–768px) ══ */
        @media(max-width:768px){
          .em-hero-grid{padding:40px 20px 36px !important;gap:28px !important;}
          .hero-right-outer{max-width:460px;margin:8px auto 0;}
          .em-services-grid{grid-template-columns:1fr !important;}
          .em-cases-grid{grid-template-columns:1fr !important;}
          .em-cta-inner{flex-direction:column !important;align-items:flex-start !important;}
          .enq-row{grid-template-columns:1fr !important;}
          #work{padding:60px 20px !important;}
          #process{padding:60px 20px !important;}
          #faq{padding:60px 20px !important;}
        }

        /* ══ SMALL MOBILE (≤480px) ══ */
        @media(max-width:480px){
          .hero-right-outer{max-width:100%;margin:4px auto 0;}
          .em-stats-grid{grid-template-columns:1fr 1fr !important;}
          .stat-cell{padding:24px 16px !important;}
          .stat-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,0.06) !important;}
          .em-process-grid{grid-template-columns:1fr !important;gap:32px !important;}
          .em-contact-grid{grid-template-columns:1fr !important;}
          .em-hero-grid{padding:32px 16px 28px !important;}
        }

        @media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important;}}
      `}</style>
      <div id="top" style={{ fontFamily: 'Poppins,sans-serif', background: '#f8f9fa', color: T.text, lineHeight: 1.6, fontSize: 14, overflowX: 'hidden' }}>
        <Hero/>
        <StatsBand/>
        <PlatformBand/>
        <ServicesGrid/>
        <CaseStudies/>
        <HowWeWork/>
        <Contact/>
        <FAQ/>
        <CTA/>
      </div>
    </>
  );
}