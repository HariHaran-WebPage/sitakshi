import React, { useState, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════
   CONTENT — backend-development oriented
══════════════════════════════════════════════════ */
const services = [
  {
    icon: 'ti ti-api',
    accent: 'dark',
    tag: 'API',
    title: 'API Design & Development',
    subtitle: 'REST, GraphQL & gRPC',
    desc: 'Versioned, documented, contract-first APIs your frontend and partners can build on without surprises. We design the schema before we write a single handler.',
    features: ['OpenAPI / GraphQL schema', 'Versioning strategy', 'Rate limiting', 'SDK generation'],
    cta: 'Design an API',
    mock: 'api',
  },
  {
    icon: 'ti ti-database',
    accent: 'mid',
    tag: 'DB',
    title: 'Database Architecture',
    subtitle: 'Schema, Indexing & Scale',
    desc: 'Schemas modelled around your real query patterns, not guesswork. We tune indexes, plan partitioning, and pick the right store for each workload.',
    features: ['Schema modelling', 'Query optimisation', 'Read replicas', 'Migration tooling'],
    cta: 'Model Your Data',
    mock: 'db',
  },
  {
    icon: 'ti ti-topology-star-3',
    accent: 'light',
    tag: 'SVC',
    title: 'Microservices & Messaging',
    subtitle: 'Decoupled by Design',
    desc: 'We split monoliths along real seams, wire services together with event queues, and keep failure domains small so one outage stays one outage.',
    features: ['Service boundaries', 'Event-driven design', 'Queue infrastructure', 'Saga / retry logic'],
    cta: 'Plan My Services',
    mock: 'queue',
  },
  {
    icon: 'ti ti-bolt',
    accent: 'soft',
    tag: 'PERF',
    title: 'Caching & Performance',
    subtitle: 'Sub-100ms Response Times',
    desc: 'We profile real traffic, add caching layers where they earn their keep, and cut p99 latency without papering over the underlying query.',
    features: ['Redis / CDN caching', 'Load testing', 'Query profiling', 'Horizontal scaling'],
    cta: 'Speed Things Up',
    mock: 'latency',
  },
  {
    icon: 'ti ti-lock',
    accent: 'dark',
    tag: 'AUTH',
    title: 'Auth & Security',
    subtitle: 'Identity Done Right',
    desc: 'OAuth2, JWT rotation, role-based access, and secrets management — implemented so it holds up under a real pen test, not just a demo.',
    features: ['OAuth2 / SSO', 'RBAC & permissions', 'Secrets management', 'Audit logging'],
    cta: 'Secure My Backend',
    mock: 'auth',
  },
  {
    icon: 'ti ti-server-2',
    accent: 'mid',
    tag: 'OPS',
    title: 'Infra & Observability',
    subtitle: 'CI/CD, Logs & Alerts',
    desc: 'Infrastructure as code, deploy pipelines that run themselves, and dashboards that tell you something broke before your users do.',
    features: ['IaC (Terraform)', 'CI/CD pipelines', 'Metrics & tracing', 'On-call alerting'],
    cta: 'Harden My Infra',
    mock: 'uptime',
  },
];

const processSteps = [
  { icon: 'ti ti-route', title: 'Map', desc: 'We trace your data flows and access patterns end to end before designing a single table or endpoint.' },
  { icon: 'ti ti-schema', title: 'Architect', desc: 'Service boundaries, schemas, and contracts get specced and reviewed before any code ships.' },
  { icon: 'ti ti-terminal-2', title: 'Build', desc: 'Typed, tested, code-reviewed services with CI on every commit — nothing reaches main untested.' },
  { icon: 'ti ti-chart-dots', title: 'Operate', desc: 'Deployed with monitoring and alerting from day one, with a runbook your team can actually follow.' },
];

const faqs = [
  { q: 'Which stacks do you build in?', a: 'Mostly Node/TypeScript, Go, and Python, on Postgres or DynamoDB depending on access patterns — but we adapt to whatever your team already runs.' },
  { q: 'Can you work inside our existing backend?', a: "Yes. We start with an architecture audit, flag bottlenecks and risk areas, and propose an incremental plan rather than a rewrite." },
  { q: 'Do you handle infrastructure too, or just code?', a: 'Both. We can own the full path from schema design to Terraform-managed infra and the CI/CD pipeline that deploys it.' },
  { q: 'What does an engagement look like?', a: "Fixed-scope builds for a defined service, or a dedicated-retainer model for ongoing backend work — we'll recommend whichever fits your roadmap." },
];

const enquiryTypes = [
  'API Design & Development', 'Database Architecture', 'Microservices & Messaging',
  'Caching & Performance', 'Auth & Security', 'Infra & Observability', 'Something else',
];

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

/* ══════════════════════════════════════════════════
   SIGNATURE ELEMENT — live request/response terminal
   (the backend equivalent of "screenshots of a website")
══════════════════════════════════════════════════ */
const REQUEST_LOG = [
  { method: 'GET',  path: '/v1/orders/8841',      status: 200, ms: 14 },
  { method: 'POST', path: '/v1/payments/intent',  status: 201, ms: 62 },
  { method: 'GET',  path: '/v1/users/me',         status: 200, ms: 8  },
  { method: 'PATCH',path: '/v1/inventory/sku-22', status: 200, ms: 31 },
  { method: 'POST', path: '/v1/webhooks/stripe',  status: 200, ms: 47 },
  { method: 'GET',  path: '/v1/orders?status=open',status: 200, ms: 19 },
];

const methodColor = { GET: '#4ade80', POST: '#86efac', PATCH: '#fbbf24', DELETE: '#f87171' };

function TerminalHero() {
  const { ref, tilt } = useParallax(5);
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(0);
  const i = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLines(prev => {
        const next = [...prev, REQUEST_LOG[i.current % REQUEST_LOG.length]];
        return next.slice(-7);
      });
      i.current += 1;
    }, 1100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursor(c => (c + 1) % 2), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: 520,
        transform: `perspective(1200px) rotateX(${-tilt.y * 0.3}deg) rotateY(${tilt.x * 0.3}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div style={{
        background: 'linear-gradient(165deg,#0c1410 0%,#080d0a 100%)',
        border: '1px solid rgba(34,197,94,0.22)',
        borderRadius: 16,
        boxShadow: '0 40px 90px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.05) inset',
        overflow: 'hidden',
      }}>
        {/* title bar */}
        <div style={{ background: 'linear-gradient(180deg,#141c17,#0f1612)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            api.yourstudio.dev — live
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: '3px 10px' }}>
            <span className="mock-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 700, letterSpacing: '0.04em' }}>HEALTHY</span>
          </span>
        </div>

        {/* metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[['p99', '142ms'], ['uptime', '99.98%'], ['req/s', '2.4k']].map(([l, v], idx) => (
            <div key={l} style={{ padding: '14px 16px', borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{l}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700, color: '#fff' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* request log */}
        <div style={{ padding: '14px 16px', minHeight: 220, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'JetBrains Mono, monospace' }}>
          {lines.length === 0 && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>$ tailing request log…</span>
          )}
          {lines.map((l, idx) => (
            <div key={idx} className="reveal-up" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, opacity: 0.4 + (idx / lines.length) * 0.6 }}>
              <span style={{ color: methodColor[l.method] || '#4ade80', fontWeight: 700, width: 44, flexShrink: 0 }}>{l.method}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.path}</span>
              <span style={{ color: l.status < 300 ? '#4ade80' : '#f87171', fontWeight: 600 }}>{l.status}</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', width: 42, textAlign: 'right' }}>{l.ms}ms</span>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
            ${cursor ? '▌' : ' '}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Per-service mock visuals
══════════════════════════════════════════════════ */
function MockThumb({ type, color }) {
  const wrap = { width: '100%', height: 92, borderRadius: 12, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden', marginBottom: 18 };
  const wrapLight = { width: '100%', height: 92, borderRadius: 12, background: 'rgba(0,0,0,0.025)', border: '1px solid rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden', marginBottom: 18 };
  const isLight = color === '#15803d' || color === '#16a34a';
  const base = isLight ? wrapLight : wrap;
  const lineColor = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.09)';
  const mono = { fontFamily: 'JetBrains Mono, monospace' };

  if (type === 'api') return (
    <div style={{ ...base, padding: '10px 12px', ...mono }}>
      <div style={{ fontSize: 9, color, marginBottom: 4 }}>POST /v1/orders</div>
      <div style={{ fontSize: 8.5, color: lineColor.replace('0.09', '0.5') }}>{'{'}</div>
      <div style={{ fontSize: 8.5, color: isLight ? '#586b5d' : 'rgba(255,255,255,0.4)', paddingLeft: 10 }}>"status": <span style={{ color }}>"201 Created"</span></div>
      <div style={{ fontSize: 8.5, color: lineColor.replace('0.09', '0.5') }}>{'}'}</div>
      <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 7.5, color, opacity: 0.7 }}>23ms</div>
    </div>
  );
  if (type === 'db') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%">
        {[18, 40, 62].map((y, idx) => (
          <g key={idx}>
            <ellipse cx="110" cy={y} rx="46" ry="8" fill="none" stroke={color} strokeWidth="1.4" opacity={0.7 - idx * 0.15} />
          </g>
        ))}
        <line x1="64" y1="18" x2="64" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <line x1="156" y1="18" x2="156" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
      </svg>
    </div>
  );
  if (type === 'queue') return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      {[0,1,2,3,4].map(idx => (
        <div key={idx} className="mock-bar" style={{ width: 22, height: 36, borderRadius: 4, background: color, opacity: idx === 4 ? 0.9 : 0.25 + idx * 0.1, animationDelay: `${idx * 0.15}s` }} />
      ))}
    </div>
  );
  if (type === 'latency') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%" preserveAspectRatio="none">
        <polyline className="mock-pulse-line" points="0,70 30,68 60,40 90,58 120,22 150,34 180,16 220,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (type === 'auth') return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mock-shield-ring" style={{ width: 50, height: 50, borderRadius: '50%', border: `1.5px solid ${color}`, opacity: 0.3, position: 'absolute' }} />
      <i className="ti ti-key" style={{ color, fontSize: 28, position: 'relative', zIndex: 1 }} />
    </div>
  );
  if (type === 'uptime') return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 3 }}>
      {Array.from({ length: 28 }).map((_, idx) => (
        <div key={idx} style={{ flex: 1, height: idx === 24 ? 14 : 26, borderRadius: 2, background: idx === 24 ? '#f87171' : color, opacity: idx === 24 ? 0.9 : 0.3 + (idx % 5) * 0.1 }} />
      ))}
    </div>
  );
  return <div style={base} />;
}

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const accentMap = {
    dark:  { bg:'#0e1411', border:'rgba(34,197,94,0.16)', bar:'linear-gradient(90deg,#16a34a,#22c55e,#4ade80)', iconBg:'rgba(34,197,94,0.12)', iconColor:'#4ade80', tagColor:'#4ade80', titleColor:'#fff', descColor:'rgba(255,255,255,0.6)', featColor:'rgba(255,255,255,0.52)', hoverBorder:'rgba(34,197,94,0.45)', hoverShadow:'0 24px 60px -12px rgba(22,163,74,0.35), 0 0 0 1px rgba(34,197,94,0.08)' },
    mid:   { bg:'#06150c', border:'rgba(34,197,94,0.14)', bar:'linear-gradient(90deg,#14532d,#16a34a,#22c55e)', iconBg:'rgba(22,163,74,0.18)', iconColor:'#86efac', tagColor:'#86efac', titleColor:'#f0fdf4', descColor:'rgba(187,247,208,0.68)', featColor:'rgba(187,247,208,0.56)', hoverBorder:'rgba(34,197,94,0.4)', hoverShadow:'0 24px 60px -12px rgba(5,46,22,0.55), 0 0 0 1px rgba(34,197,94,0.08)' },
    light: { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#22c55e,#4ade80,#86efac)', iconBg:'#f0fdf4', iconColor:'#15803d', tagColor:'#16a34a', titleColor:'#0f1c14', descColor:'#586b5d', featColor:'#3f5345', hoverBorder:'rgba(22,163,74,0.32)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.16), 0 0 0 1px rgba(22,163,74,0.06)' },
    soft:  { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#4ade80,#86efac,#bbf7d0)', iconBg:'#f0fdf4', iconColor:'#16a34a', tagColor:'#22c55e', titleColor:'#0a0a0a', descColor:'#5b6470', featColor:'#586474', hoverBorder:'rgba(22,163,74,0.28)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.14), 0 0 0 1px rgba(22,163,74,0.06)' },
  };
  const a = accentMap[svc.accent];
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: a.bg, border: `1px solid ${hovered ? a.hoverBorder : a.border}`,
        borderRadius: 24, padding: '30px 28px 32px', position: 'relative', overflow: 'hidden', cursor: 'default',
        opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`,
        boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%, ${a.iconColor}14 0%, transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, position: 'relative' }}>
        <div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: a.tagColor, opacity: 0.6, display: 'block', marginBottom: 6 }}>{svc.tag}</span>
          <div style={{ fontSize: 10.5, color: a.tagColor, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width: 46, height: 46, background: a.iconBg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.iconColor, fontSize: 21, flexShrink: 0, border: `1px solid ${a.iconColor}33`, boxShadow: hovered ? `0 8px 20px -6px ${a.iconColor}55` : 'none', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease', transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)' }}>
          <i className={svc.icon} aria-hidden="true" />
        </div>
      </div>
      <MockThumb type={svc.mock} color={a.iconColor} />
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 23, fontWeight: 800, color: a.titleColor, marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize: 13.5, color: a.descColor, lineHeight: 1.8, marginBottom: 22 }}>{svc.desc}</p>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${a.iconColor}30, transparent)`, marginBottom: 20 }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 26, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
        {svc.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: a.featColor }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.iconColor, flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
          </li>
        ))}
      </ul>
      <button style={{ background: hovered ? a.iconColor : 'transparent', border: `1.5px solid ${a.iconColor}`, color: hovered ? (svc.accent === 'light' || svc.accent === 'soft' ? '#fff' : '#06140c') : a.iconColor, borderRadius: 11, padding: '12px 20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.3s ease', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

function ProcessStep({ step, index }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms` }}>
      <div style={{ width: 72, height: 72, background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: 30, margin: '0 auto 20px' }}>
        <i className={step.icon} aria-hidden="true" />
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80', opacity: 0.6, marginBottom: 8 }}>step 0{index + 1}</div>
      <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{step.title}</h4>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 220, margin: '0 auto' }}>{step.desc}</p>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ece9e2', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: '#0a0a0a', textAlign: 'left', gap: 16 }}>
        {item.q}
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? '#0a0a0a' : '#f0fdf4', border: `1.5px solid ${open ? '#0a0a0a' : '#bbf7d0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: open ? '#22c55e' : '#15803d', fontSize: 16, flexShrink: 0, transition: 'all 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>{open ? '−' : '+'}</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ marginTop: 12, fontSize: 14, color: '#6b7280', lineHeight: 1.8, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} style={{ padding: '44px 36px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 18, alignItems: 'center' }}>
      <div style={{ width: 56, height: 56, background: 'rgba(22,163,74,0.12)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: 26, flexShrink: 0, border: '1px solid rgba(34,197,94,0.18)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#ffffff 0%,#bbf7d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {num === null ? suffix : `${count}${suffix}`}
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 500, marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Contact-side live panel — JSON response card
══════════════════════════════════════════════════ */
function DeviceShowcase() {
  const { ref, tilt } = useParallax(6);
  const [liveVal, setLiveVal] = useState(2412);
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v + Math.floor(Math.random() * 30) - 4), 1600);
    return () => clearInterval(id);
  }, []);
  const bars = [46, 68, 38, 82, 58, 94];
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ position: 'relative', width: 280, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div className="device-laptop-float" style={{ background: 'linear-gradient(165deg,#0d1611 0%,#0a120d 100%)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: 16, padding: 14, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,197,94,0.05) inset', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(34,197,94,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12, position: 'relative' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ marginLeft: 6, flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="ti ti-lock" style={{ fontSize: 8, color: '#4ade80' }} />
              POST /v1/enquiries
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, position: 'relative' }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, fontWeight: 600 }}>Requests Today</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>{liveVal.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: '3px 8px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} className="mock-pulse-dot" />
              <span style={{ fontSize: 7.5, color: '#4ade80', fontWeight: 700 }}>200 OK</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 42, marginBottom: 14, position: 'relative' }}>
            {bars.map((h, i) => <div key={i} className="mock-bar-grow" style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#4ade80,#16a34a)' : 'rgba(74,222,128,0.2)', animationDelay: `${i * 0.07}s` }} />)}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, lineHeight: 1.7, position: 'relative' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)' }}>{'{'}</div>
            <div style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.55)' }}>"id": <span style={{ color: '#4ade80' }}>"enq_9f2a"</span>,</div>
            <div style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.55)' }}>"status": <span style={{ color: '#4ade80' }}>"queued"</span>,</div>
            <div style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.55)' }}>"eta": <span style={{ color: '#86efac' }}>"4h"</span></div>
            <div style={{ color: 'rgba(255,255,255,0.4)' }}>{'}'}</div>
          </div>
        </div>
        <div style={{ width: '108%', marginLeft: '-4%', height: 9, background: 'linear-gradient(180deg,#1a2420,#0a0f0c)', clipPath: 'polygon(6% 0,94% 0,100% 100%,0% 100%)', borderRadius: '0 0 4px 4px' }} />
      </div>
    </div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: enquiryTypes[0], message: '' });
  const [status, setStatus] = useState('idle');
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1100);
  };
  if (status === 'sent') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, minHeight: 320, justifyContent: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(34,197,94,0.15)', border: '1.5px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: '#fff' }}>Enquiry sent</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 320 }}>Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''} — we've got your message and usually reply within 4 hours.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name:'', email:'', phone:'', type: enquiryTypes[0], message:'' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(34,197,94,0.4)', color: '#4ade80', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another enquiry</button>
    </div>
  );
  return (
    <div>
      <div className="float-icon" style={{ width: 52, height: 52, background: 'rgba(22,163,74,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-server-2" /></div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Tell Us About Your Backend</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>New service, existing system, or something on fire — tell us what you're running and we'll route it to the right engineer.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} required />
          <input className="enq-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} required />
        </div>
        <div className="enq-row">
          <input className="enq-input" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => update('phone', e.target.value)} />
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" aria-hidden="true" />
            <select className="enq-input enq-select" value={form.type} onChange={e => update('type', e.target.value)}>
              {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" aria-hidden="true" />
          </div>
        </div>
        <textarea className="enq-input" placeholder="What's the system, and what's it doing wrong (or about to do right)?" rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins, sans-serif' }} />
        <button type="submit" disabled={status === 'sending'} className="magnetic-btn" style={{ background: '#22c55e', color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(34,197,94,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          {status !== 'sending' && <i className="ti ti-send" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

function Hero() {
  return (
    <div className="srv-hero-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 64px 72px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60, alignItems: 'center' }}>
      <div className="reveal-up" style={{ animationDelay: '0s' }}>
        <div className="reveal-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0a0a0a', color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, border: '1px solid #222', letterSpacing: '0.06em', textTransform: 'uppercase', animationDelay: '0.05s' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)', display: 'inline-block', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }} />
          Backend Development
        </div>
        <h1 className="reveal-up" style={{ fontFamily: 'Playfair Display, serif', fontSize: 56, fontWeight: 900, lineHeight: 1.06, marginBottom: 20, color: '#0a0a0a', letterSpacing: '-1px', animationDelay: '0.12s' }}>
          Systems Built<br />to <span style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stay Up</span>
        </h1>
        <p className="reveal-up" style={{ color: '#1f2937', fontSize: 15, lineHeight: 1.8, marginBottom: 34, maxWidth: 440, animationDelay: '0.2s' }}>
          APIs, databases, and infrastructure engineered for real traffic — not just a demo. We build the backend, then we make sure it holds.
        </p>
        <div className="reveal-up" style={{ display: 'flex', gap: 12, animationDelay: '0.28s' }}>
          <button className="magnetic-btn" style={{ background: '#0a0a0a', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
            Explore Services →
          </button>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="magnetic-btn-outline" style={{ background: '#fff', color: '#0a0a0a', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid #e2e8f0', cursor: 'pointer' }}>
              Send an Enquiry
            </button>
          </a>
        </div>
      </div>
      <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animationDelay: '0.18s' }}>
        <TerminalHero />
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    { icon: 'ti ti-server-2', num: 120, suffix: '+', label: 'Services Shipped' },
    { icon: 'ti ti-clock', num: 48, suffix: 'hr', label: 'Avg. Response Time' },
    { icon: 'ti ti-bolt', num: 99, suffix: '.9%', label: 'Avg. Client Uptime' },
    { icon: 'ti ti-gauge', num: 142, suffix: 'ms', label: 'Typical p99 Latency' },
  ];
  return (
    <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a,transparent)', backgroundSize: '200% 100%', animation: 'gradientMove 3s linear infinite', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(34,197,94,0.18) 1px,transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div className="srv-stats-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => <StatCell key={i} {...s} />)}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <div className="srv-section-pad" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 64px' }}>
      <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>Our Services</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 900, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Everything Behind the Curtain</h2>
      <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Pick the layer that needs work — or hand us the whole backend and we'll own it end to end.</p>
      <div className="srv-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {services.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function HowWeWork() {
  return (
    <div className="srv-band-pad" style={{ background: '#0a0a0a', padding: '88px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.13) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(22,163,74,0.14)', color: '#4ade80', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(22,163,74,0.25)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 900, color: '#fff', marginBottom: 56, lineHeight: 1.1, letterSpacing: '-1px' }}>From Schema to On-Call</h2>
        <div className="srv-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(22,163,74,0.3),rgba(22,163,74,0.3),transparent)', zIndex: 0 }} />
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  return (
    <div id="contact" className="srv-section-pad" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 64px' }}>
      <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>Get In Touch</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 900, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Send Us an Enquiry</h2>
      <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No pricing sheets, no sales pressure — describe the system and we'll get back to you fast.</p>
      <div ref={ref} className="srv-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, background: '#0a0a0a', borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(22,163,74,0.25)', boxShadow: '0 24px 64px rgba(22,163,74,0.14)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <div style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        <div style={{ padding: '34px 32px 30px', background: 'linear-gradient(165deg,#0d1410 0%,#0a100c 100%)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} className="mock-pulse-dot" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Endpoint</span>
          </div>
          <p style={{ position: 'relative', zIndex: 1, fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 28, maxWidth: 240 }}>Your enquiry hits the same kind of API we'll build for you.</p>
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center' }}><DeviceShowcase /></div>
          <div style={{ position: 'relative', zIndex: 1, marginTop: 30, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-clock" style={{ fontSize: 14, color: '#4ade80' }} />
            Usually responds within 4 hours
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div className="srv-band-pad" style={{ background: '#fafaf8', padding: '88px 64px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>FAQ</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 900, color: '#0a0a0a', marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="srv-band-pad" style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '72px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', animation: 'pulse 5s ease-in-out infinite' }} />
      <div className="srv-cta-inner" style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div className="float-icon" style={{ width: 70, height: 70, background: 'rgba(22,163,74,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-bolt" /></div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Not Sure What's Slowing You Down?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Send a quick enquiry — we'll diagnose it before we quote it.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="magnetic-btn" style={{ background: '#22c55e', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}>Send Your Enquiry →</button>
          </a>
          <button className="magnetic-btn-outline" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>View Our Work →</button>
        </div>
      </div>
    </div>
  );
}

export default function BackendServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; background: #fafaf8; color: #0a0a0a; line-height: 1.6; font-size: 14px; }

        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.12); } }
        @keyframes gradientMove { 0% { background-position: 0%; } 100% { background-position: 200%; } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.12); opacity: 1; } }
        @keyframes floatIcon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes shieldRing { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes dashFlow { to { stroke-dashoffset: -40; } }
        @keyframes barShimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes deviceFloatLaptop { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

        .reveal-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .float-icon { animation: floatIcon 3s ease-in-out infinite; }
        .mock-bar { animation: barShimmer 2.2s ease-in-out infinite; }
        .mock-bar-grow { transform-origin: bottom; animation: barGrow 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .mock-pulse-dot { animation: pulse 2s ease-in-out infinite; }
        .mock-shield-ring { animation: shieldRing 2.4s ease-out infinite; }
        .mock-pulse-line { stroke-dasharray: 6 4; animation: dashFlow 1.2s linear infinite; }
        .device-laptop-float { animation: deviceFloatLaptop 4.4s ease-in-out infinite; }

        .magnetic-btn, .magnetic-btn-outline { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease; }
        .magnetic-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 30px rgba(34,197,94,0.3); }
        .magnetic-btn-outline:hover { transform: translateY(-3px); border-color: #16a34a !important; color: #16a34a !important; }

        .enq-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .enq-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 13px; font-family: 'Poppins', sans-serif; outline: none; transition: border-color 0.25s ease, background 0.25s ease; }
        .enq-input::placeholder { color: rgba(255,255,255,0.32); }
        .enq-input:focus { border-color: #22c55e; background: rgba(34,197,94,0.07); }

        .enq-select-wrap { position: relative; display: flex; align-items: center; }
        .enq-select-icon { position: absolute; left: 14px; font-size: 14px; color: rgba(255,255,255,0.4); pointer-events: none; z-index: 1; }
        .enq-select { appearance: none; -webkit-appearance: none; -moz-appearance: none; padding-left: 36px; padding-right: 30px; cursor: pointer; color-scheme: dark; }
        .enq-select-chevron { position: absolute; right: 12px; font-size: 14px; color: rgba(255,255,255,0.45); pointer-events: none; transition: transform 0.2s ease; }
        .enq-select-wrap:hover .enq-select-chevron { color: #4ade80; }
        .enq-select-wrap:focus-within .enq-select-chevron { color: #4ade80; transform: rotate(180deg); }
        .enq-select option { background: #0d1410; color: #fff; }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up, .float-icon, .mock-bar, .mock-bar-grow, .mock-pulse-dot, .mock-shield-ring, .mock-pulse-line, .device-laptop-float { animation: none !important; }
        }
        @media (max-width: 1024px) {
          .srv-hero-grid { grid-template-columns: 1fr !important; }
          .srv-services-grid { grid-template-columns: repeat(2,1fr) !important; }
          .srv-process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .srv-contact-grid { grid-template-columns: 1fr !important; }
          .srv-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .srv-services-grid { grid-template-columns: 1fr !important; }
          .srv-process-grid { grid-template-columns: 1fr !important; }
          .srv-section-pad { padding: 0 20px !important; }
          .srv-band-pad { padding: 64px 20px !important; }
          .srv-cta-inner { flex-direction: column !important; align-items: flex-start !important; }
          .srv-hero-grid { padding: 56px 20px !important; }
          .enq-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ fontFamily: 'Poppins, sans-serif', background: '#fafaf8', color: '#0a0a0a', lineHeight: 1.6, fontSize: 14 }}>
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