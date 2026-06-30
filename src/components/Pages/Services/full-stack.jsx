import React, { useState, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════════ */
const services = [
  {
    icon: 'ti ti-layout-dashboard', accent: 'dark', tag: 'WEB',
    title: 'Frontend Engineering', subtitle: 'React, UI & State',
    desc: 'Interfaces built on a component system, not one-off pages — typed, tested, and wired straight into your API contracts.',
    features: ['React / Next.js builds', 'Design system components', 'State management', 'Accessibility pass'],
    cta: 'Build the Frontend', mock: 'ui',
  },
  {
    icon: 'ti ti-api', accent: 'mid', tag: 'API',
    title: 'Backend & API Layer', subtitle: 'REST, GraphQL & Services',
    desc: 'Contract-first APIs that the frontend can build against from day one, with the business logic and validation living where it belongs.',
    features: ['OpenAPI / GraphQL schema', 'Auth & permissions', 'Rate limiting', 'Versioning strategy'],
    cta: 'Design the API', mock: 'api',
  },
  {
    icon: 'ti ti-database', accent: 'light', tag: 'DB',
    title: 'Database & Data Layer', subtitle: 'Schema, Migrations & Scale',
    desc: 'Schemas modelled around real query patterns — from the form that captures the data to the index that serves it back fast.',
    features: ['Schema modelling', 'Migration tooling', 'Query optimisation', 'Read replicas'],
    cta: 'Model the Data', mock: 'db',
  },
  {
    icon: 'ti ti-device-mobile', accent: 'soft', tag: 'APP',
    title: 'Mobile & Cross-Platform', subtitle: 'iOS, Android & PWA',
    desc: 'One codebase, native feel — React Native or an installable PWA, sharing the same API and auth as your web product.',
    features: ['Cross-platform builds', 'Offline-first sync', 'Push notifications', 'App store submission'],
    cta: 'Build the App', mock: 'queue',
  },
  {
    icon: 'ti ti-lock', accent: 'dark', tag: 'AUTH',
    title: 'Auth, Payments & Security', subtitle: 'Identity Across the Stack',
    desc: 'One auth system shared by web, mobile, and API — plus the payment, role, and secrets handling that has to hold up end to end.',
    features: ['OAuth2 / SSO', 'Stripe / billing', 'RBAC & permissions', 'Secrets management'],
    cta: 'Secure the Stack', mock: 'auth',
  },
  {
    icon: 'ti ti-server-2', accent: 'mid', tag: 'OPS',
    title: 'Infra & Deployment', subtitle: 'CI/CD for the Whole App',
    desc: 'One pipeline that builds, tests, and ships frontend, backend, and infra together — so a release is one click, not five.',
    features: ['IaC (Terraform)', 'CI/CD pipelines', 'Preview environments', 'Monitoring & alerting'],
    cta: 'Ship End to End', mock: 'uptime',
  },
];

const processSteps = [
  { icon: 'ti ti-bulb',       title: 'Discover',  desc: 'We map the product, the data it needs, and the user flows before any layer gets designed.' },
  { icon: 'ti ti-schema',     title: 'Architect', desc: 'Schema, API contracts, and component structure get specced together so no layer blocks another.' },
  { icon: 'ti ti-terminal-2', title: 'Build',     desc: 'Frontend and backend move in parallel against the same contract, with CI on every commit.' },
  { icon: 'ti ti-rocket',     title: 'Ship',      desc: 'Deployed with monitoring from day one, and a handover your team can actually run with.' },
];

const faqs = [
  { q: 'Do you handle both frontend and backend, or just one?', a: "Both, by default — we find most products move faster with one team owning the full contract between the two, but we're happy to plug into just one side if that's what you need." },
  { q: 'Which stacks do you build in?', a: 'Typically React/Next.js on the frontend with Node/TypeScript, Go, or Python on the backend, on Postgres — but we adapt to whatever your team already runs.' },
  { q: 'Can you take over an existing app?', a: 'Yes. We start with a full-stack audit — frontend, API, and data layer — and propose an incremental plan rather than a rewrite.' },
  { q: 'What does an engagement look like?', a: "Fixed-scope builds for a defined product, or a dedicated full-stack team on retainer — we'll recommend whichever fits your roadmap." },
];

const enquiryTypes = [
  'Frontend Engineering', 'Backend & API Layer', 'Database & Data Layer',
  'Mobile & Cross-Platform', 'Auth, Payments & Security', 'Infra & Deployment', 'Something else',
];

/* ══════════════════════════════════════════════════
   HOW IT'S BUILT — the hero's signature element.
   A plain-language walk-through of the six layers that
   make a product work, written for someone who has never
   touched code: what each layer is, in their own words,
   connected as one continuous hand-off from tap to server.
══════════════════════════════════════════════════ */
const BUILD_LAYERS = [
  { type: 'frontend', title: 'Web & Mobile',  detail: 'Same site, every screen size' },
  { type: 'api',       title: 'API Gateway',  detail: 'Routes every request safely' },
  { type: 'server',    title: 'Backend Server', detail: 'Runs the business logic' },
  { type: 'database',  title: 'Database',     detail: 'Stores every record safely' },
  { type: 'ai',         title: 'AI Engine',    detail: 'Scores, predicts, generates' },
  { type: 'cloud',      title: 'Cloud Deploy', detail: 'Ships it live, watches uptime' },
];

/* Realistic, type-specific glyphs — each one reads as the actual
   thing (a browser window, a server rack, a database cylinder...)
   instead of a generic icon-in-a-circle. Drawn centered at 0,0,
   so callers just translate(x,y). Each has its own idle motion. */
function ComponentGlyph({ type, delay }) {
  const stroke = '#4ade80';
  const dim = 'rgba(74,222,128,0.35)';
  switch (type) {
    case 'frontend':
      return (
        <g>
          {/* device frame */}
          <rect x="-22" y="-17" width="44" height="34" rx="4" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          {/* browser chrome bar */}
          <rect x="-22" y="-17" width="44" height="8" rx="4" fill="rgba(74,222,128,0.05)" />
          <line x1="-22" y1="-9" x2="22" y2="-9" stroke={dim} strokeWidth="0.7" />
          <circle cx="-18" cy="-13" r="1" fill="#f87171" />
          <circle cx="-14.5" cy="-13" r="1" fill="#fbbf24" />
          <circle cx="-11" cy="-13" r="1" fill="#4ade80" />
          <rect x="-4" y="-15" width="22" height="4" rx="2" fill="none" stroke={dim} strokeWidth="0.8" />
          <circle cx="-1.3" cy="-13" r="0.7" fill={dim} />
          {/* nav row */}
          <rect x="-18" y="-6.5" width="9" height="1.8" rx="0.9" fill={dim} />
          <rect x="-7" y="-6.5" width="9" height="1.8" rx="0.9" fill={dim} />
          <rect x="4" y="-6.5" width="9" height="1.8" rx="0.9" fill={dim} />
          {/* hero banner */}
          <rect x="-18" y="-3.2" width="36" height="6.6" rx="1.4" fill={stroke} opacity="0.5">
            <animate attributeName="opacity" values="0.35;0.65;0.35" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
          </rect>
          {/* content cards */}
          <rect x="-18" y="4.2" width="16" height="6.4" rx="1.2" fill="none" stroke={dim} strokeWidth="0.8" />
          <rect x="-16" y="6.2" width="9" height="1.4" rx="0.7" fill={dim} />
          <rect x="2" y="4.2" width="16" height="6.4" rx="1.2" fill="none" stroke={dim} strokeWidth="0.8" />
          <rect x="4" y="6.2" width="9" height="1.4" rx="0.7" fill={dim} />
          {/* CTA button */}
          <rect x="-7" y="11.6" width="14" height="3.6" rx="1.8" fill={stroke}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
          </rect>
          {/* tapping cursor */}
          <path d="M 9,17 L 9,24.5 L 10.6,22.9 L 12.1,26.2 L 13.4,25.6 L 11.9,22.3 L 14.3,21.9 Z"
            fill="#e5fbe9" stroke="#0d1410" strokeWidth="0.5" transform="translate(-9,-8) scale(0.85)">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.65;0.9;1" dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
          </path>
        </g>
      );
    case 'api':
      return (
        <g>
          <rect x="-16" y="-16" width="32" height="32" rx="9" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          <text x="0" y="6" textAnchor="middle" fontSize="17" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill={stroke}>{'{ }'}</text>
          <line x1="-16" y1="0" x2="-23" y2="0" stroke={dim} strokeWidth="1.3" />
          <line x1="16" y1="0" x2="23" y2="0" stroke={dim} strokeWidth="1.3" />
          <circle cx="-23" cy="0" r="2.1" fill={dim} />
          <circle cx="23" cy="0" r="2.1" fill={stroke}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
          <path d="M 18,-19 a4,4 0 0 1 4,4" fill="none" stroke={dim} strokeWidth="1.1" strokeLinecap="round" />
          <path d="M 18,-22 a7,7 0 0 1 7,7" fill="none" stroke={dim} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        </g>
      );
    case 'server':
      return (
        <g>
          <rect x="-16" y="-16" width="32" height="32" rx="3" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          {[-9, -1, 7].map((y, i) => (
            <g key={i}>
              <rect x="-12" y={y} width="24" height="6" rx="1.2" fill="none" stroke={dim} strokeWidth="1" />
              <circle cx="-8.5" cy={y + 3} r="1.1" fill={i === 1 ? stroke : dim}>
                {i === 1 && <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" begin={`${delay}s`} repeatCount="indefinite" />}
              </circle>
            </g>
          ))}
        </g>
      );
    case 'database':
      return (
        <g>
          <ellipse cx="0" cy="-11" rx="15" ry="5" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          <path d="M -15,-11 L -15,9 A 15,5 0 0 0 15,9 L 15,-11" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          <path d="M -15,-2 A 15,5 0 0 0 15,-2" fill="none" stroke={dim} strokeWidth="1" />
          <ellipse cx="0" cy="9" rx="15" ry="5" fill="none" stroke={dim} strokeWidth="1">
            <animate attributeName="ry" values="5;5.6;5" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      );
    case 'ai':
      return (
        <g>
          <rect x="-14" y="-14" width="28" height="28" rx="5" fill="#0d1410" stroke={stroke} strokeWidth="1.4" />
          {[-9, 0, 9].map(p => (
            <g key={p}>
              <line x1={p} y1="-14" x2={p} y2="-18" stroke={dim} strokeWidth="1.2" />
              <line x1={p} y1="14" x2={p} y2="18" stroke={dim} strokeWidth="1.2" />
              <line x1="-14" y1={p} x2="-18" y2={p} stroke={dim} strokeWidth="1.2" />
              <line x1="14" y1={p} x2="18" y2={p} stroke={dim} strokeWidth="1.2" />
            </g>
          ))}
          <circle cx="0" cy="0" r="6" fill="none" stroke={stroke} strokeWidth="1.4">
            <animate attributeName="r" values="5;7;5" dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      );
    case 'cloud':
      return (
        <g>
          <path d="M -14,6 a7,7 0 0 1 1,-13.9 a9,9 0 0 1 17,-1.5 a6.5,6.5 0 0 1 2,14.4 z"
            fill="#0d1410" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="-5" cy="1" r="1.1" fill={dim} />
          <circle cx="2" cy="1" r="1.1" fill={dim}>
            <animate attributeName="fill" values={`${dim};${stroke};${dim}`} dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
          <circle cx="9" cy="1" r="1.1" fill={dim} />
        </g>
      );
    default:
      return null;
  }
}

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* Animated signal-through-the-stack illustration.
   A pulse drops from a phone at the top, travels down a winding
   path through 6 glowing nodes (one per layer), lighting each
   node up as it passes, then loops. Pure SVG + CSS animation —
   no text-heavy list, the motion itself tells the story. */
function BuildAnimation() {
  const { ref, visible } = useReveal();
  const n = BUILD_LAYERS.length;
  const vw = 780;
  const vh = 260;
  const centerY = 132;
  const leftPad = 78;
  const rightPad = 78;
  const stepX = (vw - leftPad - rightPad) / (n - 1);
  const amp = 46; // vertical wiggle of the path

  const nodeX = i => leftPad + i * stepX;
  const nodeY = i => centerY + (i % 2 === 0 ? -amp : amp);
  // frontend (first node) gets a bigger glyph, so give it more ring radius
  const ringR = i => (BUILD_LAYERS[i].type === 'frontend' ? 30 : 22);

  // build a smooth horizontal path, weaving up/down through every node
  let d = `M 14 ${centerY} L ${nodeX(0)} ${nodeY(0)}`;
  for (let i = 1; i < n; i++) {
    const px = nodeX(i - 1), py = nodeY(i - 1);
    const x = nodeX(i), y = nodeY(i);
    const midX = (px + x) / 2;
    d += ` C ${midX} ${py}, ${midX} ${y}, ${x} ${y}`;
  }
  d += ` L ${vw - 14} ${centerY}`;

  const cycle = n * 1.1;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        background: 'linear-gradient(180deg,#0a0f0c 0%,#070a08 100%)',
        borderRadius: 22,
        border: '1px solid rgba(34,197,94,0.16)',
        boxShadow: '0 24px 60px -16px rgba(0,0,0,0.55)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '70%', height: '45%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* header */}
      <div style={{ padding: '22px 24px 4px', position: 'relative', zIndex: 2 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(34,197,94,0.12)', color: '#4ade80', fontSize: 10.5, fontWeight: 700, padding: '5px 12px', borderRadius: 20, letterSpacing: '0.06em', textTransform: 'uppercase', border: '1px solid rgba(34,197,94,0.28)', marginBottom: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: visible ? 'pulseDot 2s ease-in-out infinite' : 'none' }} />
          How It's Built
        </span>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
          Watch It Move, Layer by Layer
        </h3>
      </div>

      {/* the animated stack */}
      <svg viewBox={`0 0 ${vw} ${vh}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="1" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pathFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* connecting path */}
        <path d={d} fill="none" stroke="url(#pathFade)" strokeWidth="2" strokeLinecap="round" />

        {/* tap-to-start glyph */}
        <g transform={`translate(14, ${centerY})`} opacity="0.8">
          <circle r="9" fill="none" stroke="#4ade80" strokeWidth="1.3" />
          <circle r="2.4" fill="#4ade80" />
        </g>

        {/* nodes */}
        {BUILD_LAYERS.map((layer, i) => {
          const x = nodeX(i), y = nodeY(i);
          const delay = (i / n) * cycle;
          const above = y < centerY;
          return (
            <g key={layer.title}>
              <circle
                cx={x} cy={y} r={ringR(i) + 8}
                fill="url(#pulseGlow)"
                opacity="0"
                style={{ animation: visible ? `nodeFlash ${cycle}s ease-in-out infinite` : 'none', animationDelay: `${delay}s` }}
              />
              <circle
                cx={x} cy={y} r={ringR(i)}
                fill="#0a0f0c" stroke="#22c55e" strokeWidth="1.4" strokeOpacity="0.5"
                style={{ animation: visible ? `nodeRing ${cycle}s ease-in-out infinite` : 'none', animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }}
              />
              <g transform={`translate(${x}, ${y})`}>
                <ComponentGlyph type={layer.type} delay={visible ? delay : -1} />
              </g>
              <text
                x={x} y={above ? y - ringR(i) - 16 : y + ringR(i) + 22}
                textAnchor="middle"
                fill="#e5fbe9" fontSize="12.5" fontFamily="Poppins, sans-serif" fontWeight="700"
              >
                {layer.title}
              </text>
              <text
                x={x} y={above ? y - ringR(i) - 4 : y + ringR(i) + 35}
                textAnchor="middle"
                fill="rgba(229,251,233,0.42)" fontSize="8.7" fontFamily="Poppins, sans-serif"
              >
                {layer.detail.length > 26 ? layer.detail.slice(0, 24) + '…' : layer.detail}
              </text>
            </g>
          );
        })}

        {/* live / done glyph */}
        <g transform={`translate(${vw - 14}, ${centerY})`} opacity="0.85">
          <circle r="9" fill="none" stroke="#4ade80" strokeWidth="1.3" />
          <path d="M -3.4,0 L -0.8,3 L 3.6,-3.4" fill="none" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* travelling pulse dot */}
        {visible && (
          <circle r="5" fill="#bbf7d0" style={{ filter: 'drop-shadow(0 0 6px #4ade80)' }}>
            <animateMotion path={d} dur={`${cycle}s`} repeatCount="indefinite" rotate="auto" />
          </circle>
        )}
      </svg>

      {/* footer */}
      <div style={{ padding: '14px 24px 20px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          One signal, six layers, zero handoffs.
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MOCK VISUALS
══════════════════════════════════════════════════ */
function MockThumb({ type, color }) {
  const wrap = { width:'100%', height:92, borderRadius:12, background:'rgba(255,255,255,0.035)', border:'1px solid rgba(255,255,255,0.07)', position:'relative', overflow:'hidden', marginBottom:18 };
  const wrapLight = { width:'100%', height:92, borderRadius:12, background:'rgba(0,0,0,0.025)', border:'1px solid rgba(0,0,0,0.06)', position:'relative', overflow:'hidden', marginBottom:18 };
  const isLight = color === '#15803d' || color === '#16a34a';
  const base = isLight ? wrapLight : wrap;
  const lineColor = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.09)';
  const mono = { fontFamily: 'JetBrains Mono, monospace' };

  if (type === 'ui') return (
    <div style={{ ...base, padding:'10px 12px' }}>
      <div style={{ height:7, width:'55%', borderRadius:3, background:color, opacity:0.7, marginBottom:8 }} />
      <div style={{ height:5, width:'80%', borderRadius:3, background:lineColor, marginBottom:12 }} />
      <div style={{ display:'flex', gap:6 }}>
        {[0,1,2].map(i => <div key={i} style={{ flex:1, height:30, borderRadius:6, border:`1.2px solid ${color}`, opacity:0.4+i*0.15 }} />)}
      </div>
    </div>
  );
  if (type === 'api') return (
    <div style={{ ...base, padding:'10px 12px', ...mono }}>
      <div style={{ fontSize:9, color, marginBottom:4 }}>POST /v1/orders</div>
      <div style={{ fontSize:8.5, color:lineColor.replace('0.09','0.5') }}>{'{'}</div>
      <div style={{ fontSize:8.5, color:isLight?'#586b5d':'rgba(255,255,255,0.4)', paddingLeft:10 }}>"status": <span style={{ color }}>"201 Created"</span></div>
      <div style={{ fontSize:8.5, color:lineColor.replace('0.09','0.5') }}>{'}'}</div>
      <div style={{ position:'absolute', bottom:10, right:12, fontSize:7.5, color, opacity:0.7 }}>23ms</div>
    </div>
  );
  if (type === 'db') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%">
        {[18,40,62].map((y,i) => <ellipse key={i} cx="110" cy={y} rx="46" ry="8" fill="none" stroke={color} strokeWidth="1.4" opacity={0.7-i*0.15} />)}
        <line x1="64" y1="18" x2="64" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <line x1="156" y1="18" x2="156" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
      </svg>
    </div>
  );
  if (type === 'queue') return (
    <div style={{ ...base, display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
      {[0,1,2,3,4].map(i => <div key={i} className="mock-bar" style={{ width:22, height:36, borderRadius:4, background:color, opacity:i===4?0.9:0.25+i*0.1, animationDelay:`${i*0.15}s` }} />)}
    </div>
  );
  if (type === 'auth') return (
    <div style={{ ...base, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="mock-shield-ring" style={{ width:50, height:50, borderRadius:'50%', border:`1.5px solid ${color}`, opacity:0.3, position:'absolute' }} />
      <i className="ti ti-key" style={{ color, fontSize:28, position:'relative', zIndex:1 }} />
    </div>
  );
  if (type === 'uptime') return (
    <div style={{ ...base, display:'flex', alignItems:'center', padding:'0 14px', gap:3 }}>
      {Array.from({ length:28 }).map((_,i) => <div key={i} style={{ flex:1, height:i===24?14:26, borderRadius:2, background:i===24?'#f87171':color, opacity:i===24?0.9:0.3+(i%5)*0.1 }} />)}
    </div>
  );
  return <div style={base} />;
}

/* ══════════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════════ */
function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const accentMap = {
    dark:  { bg:'#0e1411', border:'rgba(34,197,94,0.16)', bar:'linear-gradient(90deg,#16a34a,#22c55e,#4ade80)', iconBg:'rgba(34,197,94,0.12)', iconColor:'#4ade80', tagColor:'#4ade80', titleColor:'#fff', descColor:'rgba(255,255,255,0.6)', featColor:'rgba(255,255,255,0.52)', hoverBorder:'rgba(34,197,94,0.45)', hoverShadow:'0 24px 60px -12px rgba(22,163,74,0.35)' },
    mid:   { bg:'#06150c', border:'rgba(34,197,94,0.14)', bar:'linear-gradient(90deg,#14532d,#16a34a,#22c55e)', iconBg:'rgba(22,163,74,0.18)', iconColor:'#86efac', tagColor:'#86efac', titleColor:'#f0fdf4', descColor:'rgba(187,247,208,0.68)', featColor:'rgba(187,247,208,0.56)', hoverBorder:'rgba(34,197,94,0.4)', hoverShadow:'0 24px 60px -12px rgba(5,46,22,0.55)' },
    light: { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#22c55e,#4ade80,#86efac)', iconBg:'#f0fdf4', iconColor:'#15803d', tagColor:'#16a34a', titleColor:'#0f1c14', descColor:'#586b5d', featColor:'#3f5345', hoverBorder:'rgba(22,163,74,0.32)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.16)' },
    soft:  { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#4ade80,#86efac,#bbf7d0)', iconBg:'#f0fdf4', iconColor:'#16a34a', tagColor:'#22c55e', titleColor:'#0a0a0a', descColor:'#5b6470', featColor:'#586474', hoverBorder:'rgba(22,163,74,0.28)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.14)' },
  };
  const a = accentMap[svc.accent];
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:a.bg, border:`1px solid ${hovered?a.hoverBorder:a.border}`,
        borderRadius:24, padding:'30px 28px 32px', position:'relative', overflow:'hidden', cursor:'default',
        opacity:visible?1:0, transform:visible?(hovered?'translateY(-8px)':'translateY(0)'):'translateY(28px)',
        transition:`opacity 0.5s ease ${index*80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s, border-color 0.4s`,
        boxShadow:hovered?a.hoverShadow:'0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle at 100% 0%, ${a.iconColor}14 0%, transparent 55%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:hovered?3:2.5, background:a.bar, transition:'height 0.35s' }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, position:'relative' }}>
        <div>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:a.tagColor, opacity:0.6, display:'block', marginBottom:6 }}>{svc.tag}</span>
          <div style={{ fontSize:10.5, color:a.tagColor, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width:46, height:46, background:a.iconBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:a.iconColor, fontSize:21, flexShrink:0, border:`1px solid ${a.iconColor}33`, boxShadow:hovered?`0 8px 20px -6px ${a.iconColor}55`:'none', transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s', transform:hovered?'scale(1.1) rotate(-4deg)':'scale(1)' }}>
          <i className={svc.icon} />
        </div>
      </div>
      <MockThumb type={svc.mock} color={a.iconColor} />
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:23, fontWeight:800, color:a.titleColor, marginBottom:12, lineHeight:1.2, letterSpacing:'-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize:13.5, color:a.descColor, lineHeight:1.8, marginBottom:22 }}>{svc.desc}</p>
      <div style={{ height:1, background:`linear-gradient(90deg, ${a.iconColor}30, transparent)`, marginBottom:20 }} />
      <ul style={{ listStyle:'none', padding:0, margin:'0 0 26px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 12px' }}>
        {svc.features.map((f,i) => (
          <li key={i} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:a.featColor }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:a.iconColor, flexShrink:0 }} />
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button style={{ background:hovered?a.iconColor:'transparent', border:`1.5px solid ${a.iconColor}`, color:hovered?(svc.accent==='light'||svc.accent==='soft'?'#fff':'#06140c'):a.iconColor, borderRadius:11, padding:'12px 20px', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12.5, cursor:'pointer', transition:'all 0.3s', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize:14, transform:hovered?'translateX(2px)':'translateX(0)', transition:'transform 0.3s' }} />
      </button>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ textAlign:'center', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:`opacity 0.5s ease ${index*100}ms, transform 0.5s ease ${index*100}ms` }}>
      <div style={{ width:72, height:72, background:'rgba(22,163,74,0.12)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', fontSize:30, margin:'0 auto 20px' }}>
        <i className={step.icon} />
      </div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#4ade80', opacity:0.6, marginBottom:8 }}>step 0{index+1}</div>
      <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:20, fontWeight:800, color:'#fff', marginBottom:10 }}>{step.title}</h4>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:220, margin:'0 auto' }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:'1px solid #ece9e2', padding:'20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:15, fontWeight:600, color:'#0a0a0a', textAlign:'left', gap:16 }}>
        {item.q}
        <span style={{ width:28, height:28, borderRadius:'50%', background:open?'#0a0a0a':'#f0fdf4', border:`1.5px solid ${open?'#0a0a0a':'#bbf7d0'}`, display:'flex', alignItems:'center', justifyContent:'center', color:open?'#22c55e':'#15803d', fontSize:16, flexShrink:0, transition:'all 0.25s', transform:open?'rotate(180deg)':'rotate(0deg)' }}>{open?'−':'+'}</span>
      </button>
      <div style={{ maxHeight:open?200:0, overflow:'hidden', transition:'max-height 0.35s' }}>
        <p style={{ marginTop:12, fontSize:14, color:'#6b7280', lineHeight:1.8, paddingRight:44 }}>{item.a}</p>
      </div>
    </div>
  );
}

function StatCell({ icon, num, suffix, label, isLast }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started || num === null) return;
    const duration = 1800;
    const start = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(ease(p) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, num]);
  return (
    <div ref={ref} style={{ padding:'44px 36px', borderRight:isLast?'none':'1px solid rgba(255,255,255,0.06)', display:'flex', gap:18, alignItems:'center' }}>
      <div style={{ width:56, height:56, background:'rgba(22,163,74,0.12)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', fontSize:26, flexShrink:0, border:'1px solid rgba(34,197,94,0.18)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:36, fontWeight:900, lineHeight:1, letterSpacing:'-1px', background:'linear-gradient(135deg,#ffffff 0%,#bbf7d0 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {num===null?suffix:`${count}${suffix}`}
        </div>
        <div style={{ fontSize:11, color:'#6b7280', fontWeight:500, marginTop:5, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</div>
      </div>
    </div>
  );
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

function DeviceShowcase() {
  const { ref, tilt } = useParallax(6);
  const [liveVal, setLiveVal] = useState(2412);
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v + Math.floor(Math.random()*30)-4), 1600);
    return () => clearInterval(id);
  }, []);
  const bars = [46,68,38,82,58,94];
  return (
    <div style={{ position:'relative', width:'100%', display:'flex', justifyContent:'center' }}>
      <div ref={ref} style={{ position:'relative', width:'100%', maxWidth:280, transform:`perspective(900px) rotateX(${-tilt.y*0.5}deg) rotateY(${tilt.x*0.5}deg)`, transition:'transform 0.2s ease-out' }}>
        <div className="device-laptop-float" style={{ background:'linear-gradient(165deg,#0d1611 0%,#0a120d 100%)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:16, padding:14, boxShadow:'0 28px 56px -16px rgba(0,0,0,0.55)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-30, right:-30, width:110, height:110, background:'radial-gradient(circle,rgba(34,197,94,0.16) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:12 }}>
            {['#ff5f56','#ffbd2e','#27c93f'].map((c,i) => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:c }} />)}
            <div style={{ marginLeft:6, flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:5, padding:'3px 8px', fontSize:8.5, color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace', display:'flex', alignItems:'center', gap:4 }}>
              <i className="ti ti-lock" style={{ fontSize:8, color:'#4ade80' }} /> POST /v1/enquiries
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
            <div>
              <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:4, fontWeight:600 }}>Requests Today</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:19, fontWeight:700, color:'#fff', letterSpacing:'-0.3px' }}>{liveVal.toLocaleString()}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4, background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.25)', borderRadius:20, padding:'3px 8px' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80' }} className="mock-pulse-dot" />
              <span style={{ fontSize:7.5, color:'#4ade80', fontWeight:700 }}>200 OK</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:42, marginBottom:14 }}>
            {bars.map((h,i) => <div key={i} className="mock-bar-grow" style={{ flex:1, height:`${h}%`, borderRadius:'3px 3px 0 0', background:i===bars.length-1?'linear-gradient(180deg,#4ade80,#16a34a)':'rgba(74,222,128,0.2)', animationDelay:`${i*0.07}s` }} />)}
          </div>
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'10px 12px', fontFamily:'JetBrains Mono,monospace', fontSize:9.5, lineHeight:1.7 }}>
            <div style={{ color:'rgba(255,255,255,0.4)' }}>{'{'}</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"id": <span style={{ color:'#4ade80' }}>"enq_9f2a"</span>,</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"status": <span style={{ color:'#4ade80' }}>"queued"</span>,</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"eta": <span style={{ color:'#86efac' }}>"4h"</span></div>
            <div style={{ color:'rgba(255,255,255,0.4)' }}>{'}'}</div>
          </div>
        </div>
        <div style={{ width:'108%', marginLeft:'-4%', height:9, background:'linear-gradient(180deg,#1a2420,#0a0f0c)', clipPath:'polygon(6% 0,94% 0,100% 100%,0% 100%)', borderRadius:'0 0 4px 4px' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ENQUIRY FORM
══════════════════════════════════════════════════ */
function EnquiryForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:enquiryTypes[0], message:'' });
  const [status, setStatus] = useState('idle');
  const update = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim()||!form.email.trim()||!form.message.trim()) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1100);
  };
  if (status==='sent') return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:14, minHeight:320, justifyContent:'center' }}>
      <div style={{ width:52, height:52, borderRadius:14, background:'rgba(34,197,94,0.15)', border:'1.5px solid rgba(34,197,94,0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:800, color:'#fff' }}>Enquiry sent</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:320 }}>Thanks{form.name.trim()?`, ${form.name.trim().split(' ')[0]}`:''} — we've got your message and usually reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name:'', email:'', phone:'', type:enquiryTypes[0], message:'' }); }} style={{ background:'transparent', border:'1.5px solid rgba(34,197,94,0.4)', color:'#4ade80', borderRadius:10, padding:'10px 18px', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer' }}>Send another enquiry</button>
    </div>
  );
  return (
    <div>
      <div className="float-icon" style={{ width:52, height:52, background:'rgba(22,163,74,0.15)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:24, marginBottom:20, border:'1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-server-2" /></div>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:800, color:'#fff', marginBottom:8, letterSpacing:'-0.4px' }}>Tell Us About Your Product</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:22, maxWidth:360 }}>New product, existing app, or a stack that's outgrown itself — tell us what you're running and we'll route it to the right team.</p>
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Full name" value={form.name} onChange={e => update('name',e.target.value)} required />
          <input className="enq-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email',e.target.value)} required />
        </div>
        <div className="enq-row">
          <input className="enq-input" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => update('phone',e.target.value)} />
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" />
            <select className="enq-input enq-select" value={form.type} onChange={e => update('type',e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" />
          </div>
        </div>
        <textarea className="enq-input" placeholder="What's the product, and what's it doing wrong (or about to do right)?" rows={4} value={form.message} onChange={e => update('message',e.target.value)} required style={{ resize:'vertical', fontFamily:'Poppins,sans-serif' }} />
        <button type="submit" disabled={status==='sending'} className="magnetic-btn" style={{ background:'#22c55e', color:'#fff', padding:'13px 26px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, border:'none', cursor:status==='sending'?'default':'pointer', boxShadow:'0 6px 20px rgba(34,197,94,0.35)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, opacity:status==='sending'?0.75:1, marginTop:4 }}>
          {status==='sending'?'Sending…':'Send Enquiry'}
          {status!=='sending'&&<i className="ti ti-send" style={{ fontSize:14 }} />}
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HERO — fully responsive, layer card never clips
══════════════════════════════════════════════════ */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setW(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return w;
}

function Hero() {
  const winW = useWindowWidth();
  const isMobile = winW < 768;
  const isTablet = winW >= 768 && winW < 1024;

  return (
    <div style={{
      maxWidth: 1320,
      margin: '0 auto',
      padding: isMobile ? '40px 16px 36px' : isTablet ? '64px 40px 56px' : '88px 64px 80px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
      gap: isMobile ? 32 : isTablet ? 44 : 56,
      alignItems: 'center',
    }}>
      {/* LEFT — copy */}
      <div>
        <div className="reveal-up" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'#0a0a0a', color:'#fff',
          fontSize: isMobile ? 10 : 11, fontWeight:600,
          padding: isMobile ? '6px 14px 6px 8px' : '7px 16px 7px 10px',
          borderRadius:30, marginBottom: isMobile ? 18 : 28,
          border:'1px solid #222', letterSpacing:'0.06em', textTransform:'uppercase',
          animationDelay:'0.05s',
        }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 0 3px rgba(34,197,94,0.25)', display:'inline-block', flexShrink:0, animation:'pulseDot 2s ease-in-out infinite' }} />
          Full-Stack Development
        </div>

        <h1 className="reveal-up" style={{
          fontFamily:'Playfair Display,serif',
          fontSize: isMobile ? 'clamp(30px,9vw,42px)' : isTablet ? 'clamp(38px,5vw,50px)' : 'clamp(36px,5vw,58px)',
          fontWeight:900, lineHeight:1.06,
          marginBottom: isMobile ? 14 : 22,
          color:'#0a0a0a', letterSpacing:'-1.5px',
          animationDelay:'0.12s',
        }}>
          One Team,<br />
          Every{' '}
          <span style={{ background:'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Layer</span>
        </h1>

        <p className="reveal-up" style={{
          color:'#374151', fontSize: isMobile ? 13.5 : 15.5, lineHeight:1.8,
          marginBottom: isMobile ? 20 : 36,
          maxWidth: isMobile ? '100%' : 440,
          animationDelay:'0.2s',
        }}>
          Frontend, backend, database, and infra — built against one contract by one team, so nothing gets lost in the handoff.
        </p>

        <div className="reveal-up" style={{ display:'flex', gap: isMobile ? 6 : 10, marginBottom: isMobile ? 20 : 36, flexWrap:'wrap', animationDelay:'0.24s' }}>
          {['90+ Products Shipped','99.9% Uptime','48hr Response'].map(chip => (
            <span key={chip} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize: isMobile ? 10 : 11.5, fontWeight:600, color:'#15803d', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:20, padding: isMobile ? '4px 10px' : '5px 13px' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e', flexShrink:0 }} />{chip}
            </span>
          ))}
        </div>

        <div className="reveal-up" style={{ display:'flex', gap:12, flexWrap:'wrap', animationDelay:'0.3s' }}>
          <button className="magnetic-btn" style={{ background:'#0a0a0a', color:'#fff', padding: isMobile ? '12px 22px' : '14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize: isMobile ? 12 : 13, border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(0,0,0,0.18)', display:'inline-flex', alignItems:'center', gap:8, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            Explore Services <i className="ti ti-arrow-right" style={{ fontSize:14 }} />
          </button>
          <a href="#contact" style={{ textDecoration:'none', width: isMobile ? '100%' : 'auto' }}>
            <button className="magnetic-btn-outline" style={{ background:'#fff', color:'#0a0a0a', padding: isMobile ? '12px 22px' : '14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize: isMobile ? 12 : 13, border:'1.5px solid #e2e8f0', cursor:'pointer', width: isMobile ? '100%' : 'auto', display:'block', textAlign:'center' }}>
              Send an Enquiry
            </button>
          </a>
        </div>
      </div>

      {/* RIGHT — How It's Built: always full width of its column, never clips */}
      <div className="reveal-up" style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? 620 : 540,
        margin: isMobile ? '0 auto' : isTablet ? '0 auto' : '0 0 0 auto',
        animationDelay: '0.18s',
        overflow: 'visible',
      }}>
        <BuildAnimation />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STATS BAND
══════════════════════════════════════════════════ */
function StatsBand() {
  const stats = [
    { icon:'ti ti-stack-2', num:90,  suffix:'+',  label:'Products Shipped' },
    { icon:'ti ti-clock',   num:48,  suffix:'hr', label:'Avg. Response Time' },
    { icon:'ti ti-bolt',    num:99,  suffix:'.9%',label:'Avg. Client Uptime' },
    { icon:'ti ti-users',   num:50,  suffix:'+',  label:'Startups Served' },
  ];
  return (
    <div style={{ background:'#0a0a0a', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a,transparent)', backgroundSize:'200% 100%', animation:'gradientMove 3s linear infinite', zIndex:2 }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(34,197,94,0.18) 1px,transparent 1px)', backgroundSize:'28px 28px', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents:'none' }} />
      <div className="srv-stats-grid" style={{ maxWidth:1320, margin:'0 auto', position:'relative', zIndex:1 }}>
        {stats.map((s,i) => <StatCell key={i} {...s} isLast={i===stats.length-1} />)}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div className="srv-section-pad">
      <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>Our Services</div>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#0a0a0a', marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Every Layer, One Team</h2>
      <p style={{ fontSize:15, color:'#6b7280', lineHeight:1.7, maxWidth:480, marginBottom:48 }}>Pick the layer that needs work — or hand us the whole product and we'll own it end to end.</p>
      <div className="srv-services-grid">
        {services.map((svc,i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div className="srv-band-pad" style={{ background:'#0a0a0a', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-40%', right:'-10%', width:'55%', height:'180%', background:'radial-gradient(ellipse,rgba(22,163,74,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1320, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-block', background:'rgba(22,163,74,0.14)', color:'#4ade80', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid rgba(22,163,74,0.25)' }}>How We Work</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#fff', marginBottom:56, lineHeight:1.1, letterSpacing:'-1px' }}>From Mockup to Monitoring</h2>
        <div className="srv-process-grid" style={{ position:'relative' }}>
          <div className="srv-process-line" />
          {processSteps.map((step,i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  return (
    <div id="contact" className="srv-section-pad">
      <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>Get In Touch</div>
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#0a0a0a', marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Send Us an Enquiry</h2>
      <p style={{ fontSize:15, color:'#6b7280', lineHeight:1.7, maxWidth:460, marginBottom:48 }}>No pricing sheets, no sales pressure — describe the system and we'll get back to you fast.</p>
      <div ref={ref} className="srv-contact-grid" style={{ background:'#0a0a0a', borderRadius:24, overflow:'hidden', border:'1.5px solid rgba(22,163,74,0.25)', boxShadow:'0 24px 64px rgba(22,163,74,0.14)', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'opacity 0.6s, transform 0.6s' }}>
        <div style={{ padding:'44px 40px', position:'relative' }} className="srv-contact-form-col">
          <div style={{ position:'absolute', top:'-30%', left:'-20%', width:'70%', height:'160%', background:'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}><EnquiryForm /></div>
        </div>
        <div className="srv-contact-showcase-col" style={{ padding:'34px 32px 30px', background:'linear-gradient(165deg,#0d1410 0%,#0a100c 100%)', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-20%', right:'-30%', width:'80%', height:'80%', background:'radial-gradient(ellipse,rgba(22,163,74,0.14) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80' }} className="mock-pulse-dot" />
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)', fontWeight:600, letterSpacing:'0.09em', textTransform:'uppercase' }}>Live Endpoint</span>
          </div>
          <p style={{ position:'relative', zIndex:1, fontSize:12.5, color:'rgba(255,255,255,0.45)', lineHeight:1.6, marginBottom:28, maxWidth:240 }}>Your enquiry flows through the same frontend-to-API path we'll build for you.</p>
          <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', alignItems:'center' }}><DeviceShowcase /></div>
          <div style={{ position:'relative', zIndex:1, marginTop:30, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.07)', fontSize:12, color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center', gap:8 }}>
            <i className="ti ti-clock" style={{ fontSize:14, color:'#4ade80' }} /> Usually responds within 4 hours
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div className="srv-band-pad" style={{ background:'#fafaf8' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'0.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>FAQ</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,38px)', fontWeight:900, color:'#0a0a0a', marginBottom:40, lineHeight:1.1, letterSpacing:'-1px' }}>Common Questions</h2>
        {faqs.map((item,i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="srv-band-pad" style={{ background:'#0a0a0a', borderTop:'1px solid #1a1a1a', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-50%', right:'-15%', width:'55%', height:'200%', background:'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', animation:'pulse 5s ease-in-out infinite' }} />
      <div className="srv-cta-inner" style={{ maxWidth:1320, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:22 }}>
          <div className="float-icon" style={{ width:70, height:70, background:'rgba(22,163,74,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:32, flexShrink:0, border:'1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-bolt" /></div>
          <div>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(22px,3vw,32px)', fontWeight:900, color:'#fff', marginBottom:8, letterSpacing:'-0.8px' }}>Not Sure What's Slowing You Down?</h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15 }}>Send a quick enquiry — we'll diagnose it before we quote it.</p>
          </div>
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', flexShrink:0 }}>
          <a href="#contact" style={{ textDecoration:'none' }}>
            <button className="magnetic-btn" style={{ background:'#22c55e', color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(34,197,94,0.35)' }}>Send Your Enquiry →</button>
          </a>
          <button className="magnetic-btn-outline" style={{ background:'transparent', color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, border:'1.5px solid rgba(255,255,255,0.2)', cursor:'pointer' }}>View Our Work →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export default function FullStackServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; background: #fafaf8; color: #0a0a0a; line-height: 1.6; font-size: 14px; }

        @keyframes pulseDot     { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.25)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0.12)} }
        @keyframes nodeFlash    { 0%,92%,100%{opacity:0} 4%,8%{opacity:0.9} }
        @keyframes nodeRing     { 0%,92%,100%{stroke:#22c55e; transform:scale(1)} 4%{stroke:#bbf7d0; transform:scale(1.18)} 10%{stroke:#22c55e; transform:scale(1)} }
        @keyframes gradientMove { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes pulse        { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.12);opacity:1} }
        @keyframes floatIcon    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barGrow      { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes barShimmer   { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes deviceFloatLaptop { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes shieldRing   { 0%{transform:scale(.9);opacity:.5} 100%{transform:scale(1.5);opacity:0} }

        .reveal-up           { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .float-icon           { animation: floatIcon 3s ease-in-out infinite; }
        .mock-bar             { animation: barShimmer 2.2s ease-in-out infinite; }
        .mock-bar-grow        { transform-origin: bottom; animation: barGrow 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .mock-pulse-dot       { animation: pulse 2s ease-in-out infinite; }
        .mock-shield-ring     { animation: shieldRing 2.4s ease-out infinite; }
        .device-laptop-float  { animation: deviceFloatLaptop 4.4s ease-in-out infinite; }

        .magnetic-btn, .magnetic-btn-outline {
          transition: transform .25s cubic-bezier(0.34,1.56,0.64,1), box-shadow .25s ease, background .25s ease, color .25s ease, border-color .25s ease;
        }
        .magnetic-btn:hover         { transform:translateY(-3px) scale(1.02); box-shadow:0 10px 30px rgba(34,197,94,0.3); }
        .magnetic-btn-outline:hover { transform:translateY(-3px); border-color:#16a34a!important; color:#16a34a!important; }

        /* Form */
        .enq-row          { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .enq-input        { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:12px 14px; color:#fff; font-size:13px; font-family:'Poppins',sans-serif; outline:none; transition:border-color .25s,background .25s; }
        .enq-input::placeholder { color:rgba(255,255,255,0.32); }
        .enq-input:focus  { border-color:#22c55e; background:rgba(34,197,94,0.07); }
        .enq-select-wrap  { position:relative; display:flex; align-items:center; }
        .enq-select-icon  { position:absolute; left:14px; font-size:14px; color:rgba(255,255,255,0.4); pointer-events:none; z-index:1; }
        .enq-select       { appearance:none; -webkit-appearance:none; padding-left:36px; padding-right:30px; cursor:pointer; color-scheme:dark; }
        .enq-select-chevron { position:absolute; right:12px; font-size:14px; color:rgba(255,255,255,0.45); pointer-events:none; transition:transform .2s; }
        .enq-select-wrap:hover .enq-select-chevron { color:#4ade80; }
        .enq-select-wrap:focus-within .enq-select-chevron { color:#4ade80; transform:rotate(180deg); }
        .enq-select option { background:#0d1410; color:#fff; }

        /* Stats */
        .srv-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }

        /* Services */
        .srv-section-pad  { max-width:1320px; margin:96px auto; padding:0 64px; }
        .srv-services-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }

        /* Process */
        .srv-band-pad     { padding:88px 64px; }
        .srv-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:40px; }
        .srv-process-line { position:absolute; top:36px; left:12.5%; right:12.5%; height:1px; background:linear-gradient(90deg,transparent,rgba(22,163,74,0.3),rgba(22,163,94,0.3),transparent); z-index:0; }

        /* Contact */
        .srv-contact-grid      { display:grid; grid-template-columns:1.15fr 1fr; }
        .srv-contact-form-col  { border-right:1px solid rgba(255,255,255,0.07); }

        /* CTA */
        .srv-cta-inner { display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; }

        /* ── 1024px ── */
        @media (max-width:1024px) {
          .srv-services-grid     { grid-template-columns:repeat(2,1fr); }
          .srv-process-grid      { grid-template-columns:repeat(2,1fr); }
          .srv-process-line      { display:none; }
          .srv-contact-grid      { grid-template-columns:1fr; }
          .srv-contact-form-col  { border-right:none; border-bottom:1px solid rgba(255,255,255,0.07); }
          .srv-contact-showcase-col { display:none; }
          .srv-stats-grid        { grid-template-columns:repeat(2,1fr); }
          .srv-section-pad       { padding:0 40px; }
          .srv-band-pad          { padding:72px 40px; }
        }

        /* ── 768px ── */
        @media (max-width:768px) {
          .srv-services-grid { grid-template-columns:1fr; }
          .srv-process-grid  { grid-template-columns:1fr 1fr; gap:28px; }
          .srv-section-pad   { padding:0 16px; margin:64px auto; }
          .srv-band-pad      { padding:56px 16px; }
          .srv-cta-inner     { flex-direction:column; align-items:flex-start; }
          .srv-stats-grid    { grid-template-columns:repeat(2,1fr); }
          .enq-row           { grid-template-columns:1fr; }
        }

        /* ── 480px ── */
        @media (max-width:480px) {
          .srv-process-grid { grid-template-columns:1fr; }
          .srv-stats-grid   { grid-template-columns:1fr; }
          .srv-section-pad  { padding:0 12px; }
          .srv-band-pad     { padding:48px 12px; }
        }

        @media (prefers-reduced-motion:reduce) {
          .reveal-up,.float-icon,.mock-bar,.mock-bar-grow,.mock-pulse-dot,
          .mock-shield-ring,.device-laptop-float { animation:none!important; }
        }
      `}</style>

      <div style={{ fontFamily:'Poppins,sans-serif', background:'#fafaf8', color:'#0a0a0a', lineHeight:1.6, fontSize:14 }}>
        <Hero />
        <StatsBand />
        <ServicesGrid />
        <HowWeWork />
        <Contact />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}