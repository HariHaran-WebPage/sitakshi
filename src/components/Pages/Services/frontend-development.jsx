import React, { useState, useEffect, useRef } from 'react';

const services = [
  { icon: 'ti ti-layout-dashboard', accent: 'dark', tag: '01', title: 'MVP Development', subtitle: 'From Idea to Launch', desc: 'We turn your validated concept into a working product — fast. Our lean, iterative process gets your MVP in front of real users within weeks, not months.', features: ['Rapid prototyping', 'User story mapping', 'Agile sprints', 'Launch-ready deployment'], cta: 'Start Your MVP', mock: 'wireframe' },
  { icon: 'ti ti-device-mobile', accent: 'mid', tag: '02', title: 'Mobile App Development', subtitle: 'iOS & Android', desc: 'Native-quality experiences built with React Native or Flutter. We design for delight, build for performance, and ship apps that users keep coming back to.', features: ['Cross-platform builds', 'Offline-first design', 'Push notifications', 'App Store submission'], cta: 'Build Your App', mock: 'mobile' },
  { icon: 'ti ti-cloud-upload', accent: 'light', tag: '03', title: 'Cloud & DevOps', subtitle: 'Scale Without Limits', desc: 'From zero to production-grade infrastructure. We set up CI/CD pipelines, containerised services, and cloud architecture that grows as you grow.', features: ['AWS / GCP setup', 'Docker & Kubernetes', 'CI/CD pipelines', '99.9% uptime SLA'], cta: 'Scale My Stack', mock: 'nodes' },
  { icon: 'ti ti-chart-line', accent: 'soft', tag: '04', title: 'Growth Engineering', subtitle: 'Data-Driven Iteration', desc: 'We instrument your product, analyse the funnel, and run experiments that compound. Engineering meets growth-hacking to move your key metrics.', features: ['Analytics & tracking', 'A/B testing infra', 'Funnel optimisation', 'Retention loops'], cta: 'Grow Faster', mock: 'chart' },
  { icon: 'ti ti-shield-check', accent: 'dark', tag: '05', title: 'Security & Compliance', subtitle: 'Ship With Confidence', desc: 'Pen testing, OWASP hardening, GDPR / SOC 2 readiness — we bake security in from day one so you can close enterprise deals without scrambling later.', features: ['Pen testing', 'OWASP hardening', 'GDPR readiness', 'SOC 2 prep'], cta: 'Secure My Product', mock: 'shield' },
  { icon: 'ti ti-robot', accent: 'mid', tag: '06', title: 'AI & Automation', subtitle: 'Intelligent Workflows', desc: 'LLM integrations, custom ML pipelines, and smart automations that give your startup a force-multiplier advantage over slower-moving competitors.', features: ['LLM integrations', 'Custom ML models', 'Workflow automation', 'RAG pipelines'], cta: 'Add AI Power', mock: 'pulse' },
];

const processSteps = [
  { icon: 'ti ti-bulb', title: 'Discover', desc: "We deep-dive into your idea, market, and users to define the right problem before we write a single line of code." },
  { icon: 'ti ti-pencil', title: 'Design', desc: 'Wireframes, prototypes, and design systems — validated with real users before development begins.' },
  { icon: 'ti ti-code', title: 'Build', desc: "Agile sprints with daily updates. You always know what's shipping and why." },
  { icon: 'ti ti-rocket', title: 'Launch', desc: 'Production deploy, monitoring setup, and a post-launch growth plan handed over to your team.' },
];

const faqs = [
  { q: 'How quickly can you start?', a: 'We can kick off a discovery call within 24 hours and begin development within the same week for most engagements.' },
  { q: 'Do you work with non-technical founders?', a: 'Absolutely — the majority of our clients are non-technical. We translate business goals into tech decisions and keep you informed every step of the way.' },
  { q: "What's your typical engagement model?", a: "We work on fixed-scope MVPs, dedicated-team retainers, and sprint-based contracts. We'll recommend whichever fits your stage best." },
  { q: 'Can you take over an existing codebase?', a: "Yes. We'll run a technical audit first, flag the risks, and give you an honest migration or refactor roadmap before committing." },
];

const enquiryTypes = ['MVP Development', 'Mobile App Development', 'Cloud & DevOps', 'Growth Engineering', 'Security & Compliance', 'AI & Automation', 'Something else'];

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format',
  team: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80&auto=format',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&q=75&auto=format',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=75&auto=format',
  ai: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&q=75&auto=format',
  cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=75&auto=format',
  security: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=75&auto=format',
  mvp: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&q=75&auto=format',
  founder1: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=75&auto=format',
  founder2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=75&auto=format',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=75&auto=format',
};

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

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const SERVICE_IMAGES = [
  { img: IMAGES.mvp, label: 'MVP Dev', sub: 'Idea → Launch' },
  { img: IMAGES.mobile, label: 'Mobile App', sub: 'iOS & Android' },
  { img: IMAGES.ai, label: 'AI & Auto', sub: 'Smart Workflows' },
  { img: IMAGES.cloud, label: 'Cloud', sub: 'Scale Limits' },
  { img: IMAGES.dashboard, label: 'Growth', sub: 'Data-Driven' },
  { img: IMAGES.security, label: 'Security', sub: 'Ship Confident' },
];

function WebsiteContent() {
  const bars = [42, 65, 38, 78, 55, 90, 68];
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#fafaf8', width: '100%' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontWeight: 800, fontSize: 11, color: '#0a0a0a', letterSpacing: 1 }}>STUDIO</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['Services', 'Work', 'About'].map(n => <span key={n} style={{ fontSize: 9, color: '#6b7280', fontWeight: 500 }}>{n}</span>)}
        </div>
        <div style={{ background: '#0a0a0a', color: '#fff', fontSize: 8, padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>Contact →</div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={IMAGES.hero} alt="Team working" style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block', filter: 'brightness(0.45)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,46,22,0.85) 0%, rgba(10,10,10,0.7) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(34,197,94,0.2)', borderRadius: 20, padding: '2px 8px', marginBottom: 6, width: 'fit-content', border: '1px solid rgba(34,197,94,0.4)' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: 7, color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em' }}>WHAT WE BUILD</span>
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>Services Built for<br /><span style={{ color: '#4ade80' }}>Startup Speed</span></div>
          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 10, maxWidth: 200 }}>From MVP to scale — the exact services growing startups need.</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ background: '#22c55e', color: '#fff', fontSize: 8, padding: '5px 10px', borderRadius: 6, fontWeight: 600 }}>Explore →</div>
            <div style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 8, padding: '5px 10px', borderRadius: 6, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>Enquiry</div>
          </div>
        </div>
      </div>
      <div style={{ background: '#0a0a0a', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[['85+','Projects'],['48h','Response'],['40+','Startups'],['98%','Happy']].map(([n,l]) => (
          <div key={l} style={{ padding: '10px 6px', borderRight: '1px solid #1a1a1a', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 13, fontWeight: 900, color: '#fff' }}>{n}</div>
            <div style={{ fontSize: 7, color: '#6b7280', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Our Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {SERVICE_IMAGES.map((s, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
              <img src={s.img} alt={s.label} style={{ width: '100%', height: 50, objectFit: 'cover', display: 'block', filter: 'brightness(0.42)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,46,22,0.68)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5px 6px' }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: '#4ade80' }}>{s.label}</div>
                <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: '0 16px 16px', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
        <img src={IMAGES.office} alt="Office" style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block', filter: 'brightness(0.6) saturate(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,46,22,0.8) 0%, transparent 70%)', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
          <div>
            <div style={{ fontSize: 8, color: '#4ade80', fontWeight: 700, marginBottom: 2 }}>Our Studio</div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)' }}>Built for builders.</div>
          </div>
        </div>
      </div>
      <div style={{ margin: '0 16px 16px', background: '#0a0a0a', borderRadius: 10, padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Monthly Revenue</div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 16, fontWeight: 700, color: '#fff' }}>$128,450</div>
          </div>
          <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 700 }}>↑ 12.4%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
          {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#4ade80,#16a34a)' : 'rgba(74,222,128,0.22)' }} />)}
        </div>
      </div>
      <div style={{ background: '#0a0a0a', padding: '16px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>How We Work</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[['ti ti-bulb','Discover'],['ti ti-pencil','Design'],['ti ti-code','Build'],['ti ti-rocket','Launch']].map(([icon,label],i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 28, height: 28, background: 'rgba(34,197,94,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
                <i className={icon} style={{ fontSize: 14, color: '#22c55e' }} />
              </div>
              <div style={{ fontSize: 7, fontWeight: 600, color: '#fff' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 16px', marginTop: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            <img src={IMAGES.dashboard} alt="Dashboard" style={{ width: '100%', height: 60, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.75), transparent)', padding: '10px 7px 5px' }}>
              <div style={{ fontSize: 7, color: '#fff', fontWeight: 600 }}>Analytics</div>
            </div>
          </div>
          <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            <img src={IMAGES.mobile} alt="Mobile" style={{ width: '100%', height: 60, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(5,46,22,0.85), transparent)', padding: '10px 7px 5px' }}>
              <div style={{ fontSize: 7, color: '#4ade80', fontWeight: 600 }}>Mobile</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 16px', borderTop: '1px solid #ece9e2', borderBottom: '1px solid #ece9e2' }}>
        <div style={{ fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8, fontWeight: 600 }}>Trusted by founders at</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {['Nimbus','Forge','Quanta','Halo','Brisk'].map(n => <span key={n} style={{ fontSize: 8.5, fontWeight: 700, color: '#9ca3af', letterSpacing: '-0.2px' }}>{n}</span>)}
        </div>
      </div>
      <div style={{ padding: '18px 16px', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
          {[0,1,2,3,4].map(i => <i key={i} className="ti ti-star-filled" style={{ fontSize: 9, color: '#facc15' }} />)}
        </div>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11.5, fontWeight: 700, color: '#0a0a0a', lineHeight: 1.5, marginBottom: 10 }}>"They shipped our MVP in five weeks and it hasn't needed a rewrite since."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={IMAGES.founder1} alt="Reema" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #16a34a' }} />
          <div>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: '#0a0a0a' }}>Reema Sharma</div>
            <div style={{ fontSize: 7.5, color: '#9ca3af' }}>Founder, Nimbus</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 16px', background: '#f0fdf4', borderTop: '1px solid #dcfce7' }}>
        <p style={{ fontSize: 9, fontStyle: 'italic', color: '#166534', lineHeight: 1.6, marginBottom: 8 }}>"The cloud architecture they built scaled us from 0 to 50k users without a single outage."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={IMAGES.founder2} alt="Aaron" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #16a34a' }} />
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: '#166534' }}>Aaron Kim</div>
            <div style={{ fontSize: 7, color: '#4ade80' }}>CTO, Forge</div>
          </div>
        </div>
      </div>
      <div style={{ margin: '16px 16px 0', borderRadius: 10, overflow: 'hidden' }}>
        <img src={IMAGES.team} alt="Startup team" style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block', filter: 'saturate(0.9)' }} />
      </div>
      <div style={{ padding: '18px 16px 22px', background: 'linear-gradient(135deg,#f0fdf4,#fafaf8)', textAlign: 'center', marginTop: 16 }}>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, fontWeight: 900, color: '#0a0a0a', marginBottom: 6 }}>Not Sure Where to Start?</div>
        <p style={{ fontSize: 8, color: '#6b7280', marginBottom: 10 }}>Send a quick enquiry — we'll map the right service to your stage.</p>
        <div style={{ display: 'inline-block', background: '#22c55e', color: '#fff', fontSize: 9, padding: '8px 16px', borderRadius: 8, fontWeight: 700 }}>Send Your Enquiry →</div>
      </div>
      <div style={{ padding: '16px', background: '#0a0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontWeight: 800, fontSize: 8, color: '#fff', letterSpacing: 0.5 }}>STUDIO</span>
        </div>
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>© 2026 All rights reserved</span>
      </div>
    </div>
  );
}

// ─── FIXED HeroDevices ────────────────────────────────────────────────────────
// Natural width of the device group (laptop 440 + phone overlap -26 + phone 158 - 26 = ~546px)
// We render at natural size and let the parent scale the whole group uniformly.
// The parent uses a padding-bottom aspect trick so height adjusts automatically.

function HeroDevices() {
  const { ref, tilt } = useParallax(5);
  const laptopScrollRef = useRef(null);
  const phoneScrollRef = useRef(null);

  useEffect(() => {
    const el = laptopScrollRef.current;
    if (!el) return;
    let pos = 0, animId;
    const tick = () => { pos += 0.4; if (pos >= el.scrollHeight - el.clientHeight) pos = 0; el.scrollTop = pos; animId = requestAnimationFrame(tick); };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const el = phoneScrollRef.current;
    if (!el) return;
    let pos = 0, animId;
    const tick = () => { pos += 0.55; if (pos >= el.scrollHeight - el.clientHeight) pos = 0; el.scrollTop = pos; animId = requestAnimationFrame(tick); };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Natural dimensions of the device group
  // Laptop: 440px wide, ~360px tall (lid + base + foot)
  // Phone: 158px wide, overlaps laptop by 26px on left, extends 14px below laptop bottom
  // Total natural width ≈ 440 + 158 - 26 = 572px
  // Total natural height ≈ 374px (laptop height + phone bottom offset)
  const NATURAL_W = 572;
  const NATURAL_H = 374;

  return (
    // Outer: fills its parent column, maintains aspect ratio, clips nothing
    <div style={{ width: '100%', position: 'relative', paddingBottom: `${(NATURAL_H / NATURAL_W) * 100}%` }}>
      {/* Scaler: absolutely fills the outer box, scales inner content */}
      <div
        ref={ref}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          overflow: 'visible',
        }}
      >
        {/* Inner natural-size group, scaled to fit */}
        <div style={{
          width: NATURAL_W,
          height: NATURAL_H,
          position: 'relative',
          transformOrigin: 'bottom left',
          // Scale is applied via CSS custom property set by the wrapper below
          transform: `scale(var(--device-scale, 1)) perspective(1400px) rotateX(${-tilt.y * 0.22}deg) rotateY(${tilt.x * 0.22}deg)`,
          transition: 'transform 0.2s ease-out',
          flexShrink: 0,
        }}>
          {/* MacBook */}
          <div className="device-laptop-float" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', left: 0, bottom: 0 }}>
            <div style={{ width: 440, background: 'linear-gradient(100deg,#f1f1ef 0%,#dcdcd9 18%,#c9c9c6 38%,#dadad7 55%,#cacac7 75%,#e6e6e3 100%)', borderRadius: '14px 14px 4px 4px', padding: '11px 11px 8px', boxShadow: '0 0 0 1px rgba(120,120,118,0.7),0 1px 0 rgba(255,255,255,0.9) inset,0 36px 80px -12px rgba(0,0,0,0.32),0 14px 28px -8px rgba(0,0,0,0.18)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #2a2a2a, #050505 70%)', border: '0.5px solid #444' }} />
              </div>
              <div style={{ background: '#040404', borderRadius: 8, overflow: 'hidden', border: '1px solid #000', position: 'relative' }}>
                <div style={{ background: 'linear-gradient(180deg,#19191d,#131316)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '0.5px solid #2a2a2e' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ff8a80, #ff5f56)' }} />
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ffd479, #febc30)' }} />
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #6fe583, #28ca42)' }} />
                  </div>
                  <div style={{ flex: 1, background: '#1e1e24', borderRadius: 6, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="none"><rect x="1" y="4" width="6" height="5" rx="1" fill="#22c55e" opacity="0.75" /><path d="M2 4V2.5a2 2 0 1 1 4 0V4" stroke="#22c55e" strokeWidth="1" opacity="0.75" fill="none" /></svg>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', fontFamily: 'monospace' }}>yourstudio.io</span>
                  </div>
                </div>
                <div ref={laptopScrollRef} className="hide-scrollbar" style={{ height: 280, overflowY: 'scroll', background: '#fafaf8' }}>
                  <WebsiteContent />
                </div>
              </div>
            </div>
            <div style={{ width: 440, height: 9, background: 'linear-gradient(180deg,#9a9a97 0%,#6c6c69 35%,#4a4a47 60%,#7c7c79 100%)' }} />
            <div style={{ width: 472, marginLeft: -16, height: 26, background: 'linear-gradient(180deg,#e4e4e1 0%,#cfcfcc 45%,#b9b9b6 100%)', clipPath: 'polygon(2.5% 0%, 97.5% 0%, 100% 100%, 0% 100%)', borderRadius: '0 0 7px 7px', boxShadow: '0 18px 36px -8px rgba(0,0,0,0.32)' }} />
          </div>

          {/* iPhone — positioned absolutely relative to the group */}
          <div className="device-phone-float" style={{ position: 'absolute', right: 0, bottom: 14, zIndex: 3 }}>
            <div style={{ width: 158, background: 'linear-gradient(135deg,#9b9690 0%,#85807a 16%,#716c66 34%,#86817b 52%,#736e68 70%,#544f4a 88%,#403c38 100%)', borderRadius: 38, position: 'relative', overflow: 'visible', boxShadow: '0 0 0 1.5px #2a2722,0 0 0 3px rgba(170,164,150,0.35),0 30px 64px -10px rgba(10,9,7,0.55)' }}>
              <div style={{ position: 'absolute', right: -3, top: 88, width: 4, height: 36, background: 'linear-gradient(180deg,#aba59a,#7a756a)', borderRadius: '0 2.5px 2.5px 0' }} />
              <div style={{ position: 'absolute', left: -3, top: 70, width: 4, height: 18, background: 'linear-gradient(180deg,#aba59a,#7a756a)', borderRadius: '2.5px 0 0 2.5px' }} />
              <div style={{ position: 'absolute', left: -3, top: 100, width: 4, height: 30, background: 'linear-gradient(180deg,#aba59a,#7a756a)', borderRadius: '2.5px 0 0 2.5px' }} />
              <div style={{ position: 'absolute', left: -3, top: 138, width: 4, height: 30, background: 'linear-gradient(180deg,#aba59a,#7a756a)', borderRadius: '2.5px 0 0 2.5px' }} />
              <div style={{ margin: '4px', borderRadius: 34, overflow: 'hidden', background: '#000', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 52, height: 14, background: '#000', borderRadius: 11, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0d0d0d', border: '0.5px solid #222' }} />
                  <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#1a1815' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 10, padding: '34px 15px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.92)', fontWeight: 700, letterSpacing: '-0.3px' }}>9:41</span>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <svg width="15" height="11" viewBox="0 0 20 14" fill="none">
                      <rect x="0" y="9" width="3" height="5" rx="0.5" fill="rgba(255,255,255,0.95)" />
                      <rect x="4.5" y="6" width="3" height="8" rx="0.5" fill="rgba(255,255,255,0.95)" />
                      <rect x="9" y="3" width="3" height="11" rx="0.5" fill="rgba(255,255,255,0.95)" />
                      <rect x="13.5" y="0" width="3" height="14" rx="0.5" fill="rgba(255,255,255,0.95)" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <div style={{ width: 24, height: 11, border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: 3, padding: '1.5px 2px' }}>
                        <div style={{ width: '82%', height: '100%', background: 'rgba(255,255,255,0.92)', borderRadius: 1 }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={phoneScrollRef} className="hide-scrollbar" style={{ height: 248, position: 'relative', zIndex: 5, overflowY: 'scroll', overflowX: 'hidden', background: '#fafaf8' }}>
                  <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: `${100 / 0.6}%` }}>
                    <WebsiteContent />
                  </div>
                </div>
                <div style={{ position: 'relative', zIndex: 10, background: 'rgba(250,250,248,0.95)', padding: '7px 0 12px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 4.5, background: 'rgba(10,10,10,0.25)', borderRadius: 3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible CSS variable injector — sets --device-scale based on container width */}
      <DeviceScaleInjector naturalWidth={NATURAL_W} />
    </div>
  );
}

// Measures the container and writes --device-scale so the CSS transform picks it up
function DeviceScaleInjector({ naturalWidth }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const containerW = el.parentElement?.offsetWidth || naturalWidth;
      const scale = Math.min(1, containerW / naturalWidth);
      el.parentElement?.style.setProperty('--device-scale', scale);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [naturalWidth]);
  return <div ref={ref} style={{ display: 'none' }} />;
}
// ─────────────────────────────────────────────────────────────────────────────

function MockThumb({ type, color }) {
  const wrap = { width: '100%', height: 92, borderRadius: 12, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden', marginBottom: 18 };
  const wrapLight = { width: '100%', height: 92, borderRadius: 12, background: 'rgba(0,0,0,0.025)', border: '1px solid rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden', marginBottom: 18 };
  const isLight = color === '#15803d' || color === '#16a34a';
  const base = isLight ? wrapLight : wrap;
  const lineColor = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.09)';
  if (type === 'wireframe') return (
    <div style={base}>
      <div style={{ position: 'absolute', top: 10, left: 10, right: 10, height: 8, borderRadius: 4, background: lineColor }} />
      <div style={{ position: 'absolute', top: 26, left: 10, width: '60%', height: 6, borderRadius: 3, background: lineColor }} />
      <div style={{ position: 'absolute', top: 40, left: 10, right: 10, bottom: 10, display: 'flex', gap: 6 }}>
        {[0,1,2].map(i => <div key={i} className="mock-bar" style={{ flex: 1, borderRadius: 6, background: color, opacity: 0.18 + i * 0.08, animationDelay: `${i * 0.3}s` }} />)}
      </div>
    </div>
  );
  if (type === 'mobile') return (
    <div style={{ ...base, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 44, height: 74, borderRadius: 8, border: `1.5px solid ${color}`, position: 'relative', background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)' }}>
        <div style={{ position: 'absolute', top: 6, left: 6, right: 6, height: 4, borderRadius: 2, background: color, opacity: 0.5 }} />
        <div className="mock-pulse-dot" style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: color }} />
      </div>
      <i className="ti ti-arrow-right" style={{ color, opacity: 0.4, fontSize: 14 }} />
      <div style={{ width: 44, height: 74, borderRadius: 8, border: `1.5px solid ${color}`, position: 'relative', background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)' }}>
        <div style={{ position: 'absolute', top: 10, left: 6, right: 6, bottom: 10, borderRadius: 4, background: color, opacity: 0.12 }} />
      </div>
    </div>
  );
  if (type === 'nodes') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%">
        <line x1="40" y1="46" x2="110" y2="20" stroke={lineColor} strokeWidth="1.5" />
        <line x1="40" y1="46" x2="110" y2="72" stroke={lineColor} strokeWidth="1.5" />
        <line x1="110" y1="20" x2="180" y2="46" stroke={lineColor} strokeWidth="1.5" />
        <line x1="110" y1="72" x2="180" y2="46" stroke={lineColor} strokeWidth="1.5" />
        <circle cx="40" cy="46" r="7" fill={color} opacity="0.85" />
        <circle cx="110" cy="20" r="5" fill={color} opacity="0.5" />
        <circle cx="110" cy="72" r="5" fill={color} opacity="0.5" />
        <circle className="mock-node-pulse" cx="180" cy="46" r="7" fill={color} />
      </svg>
    </div>
  );
  if (type === 'chart') return (
    <div style={{ ...base, display: 'flex', alignItems: 'flex-end', gap: 5, padding: '14px 14px 12px' }}>
      {[38,58,32,70,50,82,64].map((h,i) => <div key={i} className="mock-bar-grow" style={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: color, opacity: 0.35 + i/10, animationDelay: `${i*0.08}s` }} />)}
    </div>
  );
  if (type === 'shield') return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mock-shield-ring" style={{ width: 50, height: 50, borderRadius: '50%', border: `1.5px solid ${color}`, opacity: 0.3, position: 'absolute' }} />
      <i className="ti ti-shield-check" style={{ color, fontSize: 30, position: 'relative', zIndex: 1 }} />
    </div>
  );
  if (type === 'pulse') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%" preserveAspectRatio="none">
        <polyline className="mock-pulse-line" points="0,46 30,46 42,20 54,70 66,46 96,46 108,12 120,80 132,46 220,46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  return <div style={base} />;
}

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
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: a.bg, border: `1px solid ${hovered ? a.hoverBorder : a.border}`, borderRadius: 24, padding: '30px 28px 32px', position: 'relative', overflow: 'hidden', cursor: 'default', opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)', transition: `opacity 0.5s ease ${index * 80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`, boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(15,23,42,0.04)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: a.tagColor, opacity: 0.55, display: 'block', marginBottom: 6 }}>{svc.tag}</span>
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
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80', opacity: 0.6, marginBottom: 8 }}>0{index + 1}</div>
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

function StatNumber({ num, suffix, isMobile }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 26 : 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#ffffff 0%,#bbf7d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {num === null ? suffix : `${count}${suffix}`}
    </div>
  );
}

function DeviceShowcase() {
  const { ref, tilt } = useParallax(6);
  const [liveVal, setLiveVal] = useState(48200);
  useEffect(() => {
    const id = setInterval(() => setLiveVal(v => v + Math.floor(Math.random() * 30) - 4), 1600);
    return () => clearInterval(id);
  }, []);
  const bars = [46, 68, 38, 82, 58, 94];
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ position: 'relative', width: 252, transform: `perspective(900px) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div className="device-laptop-float" style={{ background: 'linear-gradient(165deg,#0d1611 0%,#0a120d 100%)', border: '1px solid rgba(34,197,94,0.22)', borderRadius: '16px 16px 6px 6px', padding: 10, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ marginLeft: 6, flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="ti ti-lock" style={{ fontSize: 8, color: '#4ade80' }} />
              yourstudio.dev
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, fontWeight: 600 }}>New Enquiries</div>
              <div style={{ fontFamily: 'monospace', fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>{liveVal.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 20, padding: '3px 8px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} className="mock-pulse-dot" />
              <span style={{ fontSize: 7.5, color: '#4ade80', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 42, marginBottom: 12 }}>
            {bars.map((h, i) => <div key={i} className="mock-bar-grow" style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === bars.length - 1 ? 'linear-gradient(180deg,#4ade80,#16a34a)' : 'rgba(74,222,128,0.2)', animationDelay: `${i * 0.07}s` }} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[{ name: 'Priya M.', type: 'MVP Development', t: '2m ago', img: IMAGES.founder1 }, { name: 'Aaron K.', type: 'Cloud & DevOps', t: '14m ago', img: IMAGES.founder2 }].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <img src={row.img} alt={row.name} style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>
                  <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.type}</div>
                </div>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.32)', flexShrink: 0 }}>{row.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '108%', marginLeft: '-4%', height: 9, background: 'linear-gradient(180deg,#1a2420,#0a0f0c)', clipPath: 'polygon(6% 0,94% 0,100% 100%,0% 100%)', borderRadius: '0 0 4px 4px' }} />
        <div className="device-phone-float" style={{ position: 'absolute', right: -18, bottom: -22, width: 70, background: 'linear-gradient(165deg,#0d1611 0%,#0a120d 100%)', border: '1px solid rgba(34,197,94,0.28)', borderRadius: 16, padding: '11px 7px 9px', boxShadow: '0 18px 36px -10px rgba(0,0,0,0.55), 0 0 0 4px #fafaf8' }}>
          <div style={{ width: 18, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '0 auto 9px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 9 }}>
            <div style={{ height: 5, width: '70%', borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
            <div style={{ height: 5, width: '45%', borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[0,1,2].map(i => <div key={i} style={{ height: 8, borderRadius: 3, background: 'rgba(74,222,128,0.18)' }} />)}
          </div>
          <div style={{ marginTop: 9, height: 11, borderRadius: 6, background: 'linear-gradient(90deg,#16a34a,#4ade80)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-check" style={{ fontSize: 7, color: '#fff' }} />
          </div>
        </div>
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
      <div className="float-icon" style={{ width: 52, height: 52, background: 'rgba(22,163,74,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: 24, marginBottom: 20, border: '1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-clipboard-text" /></div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>Send Us an Enquiry</h3>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 22, maxWidth: 360 }}>Tell us what you're building and what you need — we'll route it to the right person and reply within 4 hours.</p>
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
        <textarea className="enq-input" placeholder="What are you trying to build?" rows={4} value={form.message} onChange={e => update('message', e.target.value)} required style={{ resize: 'vertical', fontFamily: 'Poppins, sans-serif' }} />
        <button type="submit" disabled={status === 'sending'} className="magnetic-btn" style={{ background: '#22c55e', color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', boxShadow: '0 6px 20px rgba(34,197,94,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.75 : 1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          {status !== 'sending' && <i className="ti ti-send" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

// ─── FIXED Hero ───────────────────────────────────────────────────────────────
function Hero() {
  const w = useWindowWidth();
  const isMobile = w <= 768;
  const isSmall = w <= 480;

  return (
    <div style={{
      maxWidth: 1320,
      margin: '0 auto',
      padding: isMobile
        ? (isSmall ? '40px 16px 32px' : '48px 20px 32px')
        : w <= 1024 ? '60px 32px 56px' : '80px 64px 72px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : w <= 1024 ? '1fr 1fr' : '1fr 1.1fr',
      gap: isMobile ? 40 : w <= 1024 ? 32 : 60,
      alignItems: 'center',
    }}>
      {/* Left: copy */}
      <div className="reveal-up" style={{ animationDelay: '0s' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0a0a0a', color: '#fff', fontSize: 11, fontWeight: 600, padding: '7px 16px 7px 10px', borderRadius: 30, marginBottom: 26, border: '1px solid #222', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)', display: 'inline-block', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }} />
          What We Build
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, lineHeight: 1.06, marginBottom: 20, color: '#0a0a0a', letterSpacing: '-1px' }}>
          Services Built<br />for <span style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Startup Speed</span>
        </h1>
        <p style={{ color: '#1f2937', fontSize: isSmall ? 14 : 15, lineHeight: 1.8, marginBottom: 34, maxWidth: 440 }}>From MVP to scale — we offer the exact services growing startups need, without the agency bloat. Pick what fits your stage and move fast.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="magnetic-btn" style={{ background: '#0a0a0a', color: '#fff', padding: isSmall ? '12px 20px' : '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>Explore Services →</button>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="magnetic-btn-outline" style={{ background: '#fff', color: '#0a0a0a', padding: isSmall ? '12px 20px' : '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid #e2e8f0', cursor: 'pointer' }}>Send an Enquiry</button>
          </a>
        </div>
      </div>

      {/* Right: devices — always fully visible, scales to fit column */}
      <div
        className="reveal-up"
        style={{
          animationDelay: '0.18s',
          // On mobile, give it a fixed reasonable height; on desktop let it be natural
          width: '100%',
          // Prevent the column from being too narrow to show devices
          minWidth: 0,
        }}
      >
        <HeroDevices />
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function StatsBand() {
  const w = useWindowWidth();
  const isMobile = w <= 480;
  const isTablet = w <= 1024;

  const stats = [
    { icon: 'ti ti-package', num: 85, suffix: '+', label: 'Projects Shipped' },
    { icon: 'ti ti-clock', num: 48, suffix: 'hr', label: 'Avg. Response Time' },
    { icon: 'ti ti-users', num: 40, suffix: '+', label: 'Startups Served' },
    { icon: 'ti ti-heart', num: 98, suffix: '%', label: 'Satisfaction Rate' },
  ];

  const cols = isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4,1fr)';

  return (
    <div style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a,transparent)', backgroundSize: '200% 100%', animation: 'gradientMove 3s linear infinite', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(34,197,94,0.18) 1px,transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: cols, position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: isMobile ? '28px 20px' : '44px 36px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: isMobile ? 40 : 56, height: isMobile ? 40 : 56, background: 'rgba(22,163,74,0.12)', borderRadius: isMobile ? 12 : 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: isMobile ? 20 : 26, flexShrink: 0, border: '1px solid rgba(34,197,94,0.18)' }}>
              <i className={s.icon} />
            </div>
            <div>
              <StatNumber num={s.num} suffix={s.suffix} isMobile={isMobile} />
              <div style={{ fontSize: isMobile ? 9 : 11, color: '#6b7280', fontWeight: 500, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  const w = useWindowWidth();
  const isMobile = w <= 768;
  const isTablet = w <= 1024;
  const pad = isMobile ? '0 16px' : isTablet ? '0 32px' : '0 64px';
  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)';

  return (
    <div style={{ maxWidth: 1320, margin: isMobile ? '60px auto' : '96px auto', padding: pad }}>
      <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>Our Services</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Everything Your Startup Needs</h2>
      <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Pick the service that fits your current stage — or stack them together for end-to-end ownership.</p>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 22 }}>
        {services.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function HowWeWork() {
  const w = useWindowWidth();
  const isMobile = w <= 480;
  const isTablet = w <= 768;
  const pad = isMobile ? '48px 16px' : isTablet ? '56px 24px' : w <= 1024 ? '64px 32px' : '88px 64px';
  const cols = isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4,1fr)';

  return (
    <div style={{ background: '#0a0a0a', padding: pad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.13) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(22,163,74,0.14)', color: '#4ade80', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(22,163,74,0.25)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, color: '#fff', marginBottom: isMobile ? 36 : 56, lineHeight: 1.1, letterSpacing: '-1px' }}>Four Steps, Zero Guesswork</h2>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 32 : 40, position: 'relative' }}>
          {!isMobile && !isTablet && (
            <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(22,163,74,0.3),rgba(22,163,74,0.3),transparent)', zIndex: 0 }} />
          )}
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const { ref, visible } = useReveal();
  const w = useWindowWidth();
  const isMobile = w <= 768;
  const isTablet = w <= 1024;
  const pad = isMobile ? '0 16px' : isTablet ? '0 32px' : '0 64px';
  const contactCols = isMobile ? '1fr' : '1.15fr 1fr';

  return (
    <div id="contact" style={{ maxWidth: 1320, margin: isMobile ? '60px auto' : '96px auto', padding: pad }}>
      <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>Get In Touch</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, color: '#0a0a0a', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Send Us an Enquiry</h2>
      <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No pricing sheets, no sales pressure — tell us about your project and we'll get back to you fast.</p>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: contactCols, gap: 0, background: '#0a0a0a', borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(22,163,74,0.25)', boxShadow: '0 24px 64px rgba(22,163,74,0.14)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <div style={{ padding: isMobile ? '28px 20px' : '44px 40px', borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.07)', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        {!isMobile && (
          <div style={{ padding: '34px 32px 30px', background: 'linear-gradient(165deg,#0d1410 0%,#0a100c 100%)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-30%', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} className="mock-pulse-dot" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Live Preview</span>
            </div>
            <p style={{ position: 'relative', zIndex: 1, fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 28, maxWidth: 240 }}>Your enquiry lands here — the same dashboard on laptop and mobile.</p>
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center' }}><DeviceShowcase /></div>
            <div style={{ position: 'relative', zIndex: 1, marginTop: 30, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-clock" style={{ fontSize: 14, color: '#4ade80' }} />
              Usually responds within 4 hours
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FAQ() {
  const w = useWindowWidth();
  const isMobile = w <= 768;
  const isTablet = w <= 1024;
  const pad = isMobile ? '48px 16px' : isTablet ? '64px 32px' : '88px 64px';

  return (
    <div style={{ background: '#fafaf8', padding: pad }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#15803d', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #bbf7d0' }}>FAQ</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, color: '#0a0a0a', marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  const w = useWindowWidth();
  const isMobile = w <= 768;
  const isTablet = w <= 1024;
  const pad = isMobile ? '48px 16px' : isTablet ? '64px 32px' : '72px 64px';

  return (
    <div style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: pad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', animation: 'pulse 5s ease-in-out infinite' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1, flexDirection: isMobile ? 'column' : 'row' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div className="float-icon" style={{ width: isMobile ? 54 : 70, height: isMobile ? 54 : 70, background: 'rgba(22,163,74,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: isMobile ? 24 : 32, flexShrink: 0, border: '1.5px solid rgba(22,163,74,0.3)' }}><i className="ti ti-bolt" /></div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Not Sure Where to Start?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 13 : 15 }}>Send a quick enquiry — we'll map the right service to your stage.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="magnetic-btn" style={{ background: '#22c55e', color: '#fff', padding: isMobile ? '12px 20px' : '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}>Send Your Enquiry →</button>
          </a>
          <button className="magnetic-btn-outline" style={{ background: 'transparent', color: '#fff', padding: isMobile ? '12px 20px' : '14px 28px', borderRadius: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>View Our Work →</button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; overflow-x: hidden; }
        body { font-family: 'Poppins', sans-serif; background: #fafaf8; color: #0a0a0a; line-height: 1.6; font-size: 14px; }

        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }

        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.12); } }
        @keyframes gradientMove { 0% { background-position: 0%; } 100% { background-position: 200%; } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.12); opacity: 1; } }
        @keyframes floatIcon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes nodePulse { 0%,100% { opacity: 0.85; } 50% { opacity: 0.4; } }
        @keyframes shieldRing { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes dashFlow { to { stroke-dashoffset: -40; } }
        @keyframes barShimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes deviceFloatLaptop { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes deviceFloatPhone { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-9px) rotate(0.5deg); } }

        .reveal-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .float-icon { animation: floatIcon 3s ease-in-out infinite; }
        .mock-bar { animation: barShimmer 2.2s ease-in-out infinite; }
        .mock-bar-grow { transform-origin: bottom; animation: barGrow 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .mock-pulse-dot { animation: pulse 2s ease-in-out infinite; }
        .mock-node-pulse { animation: nodePulse 1.8s ease-in-out infinite; }
        .mock-shield-ring { animation: shieldRing 2.4s ease-out infinite; }
        .mock-pulse-line { stroke-dasharray: 6 4; animation: dashFlow 1.2s linear infinite; }
        .device-laptop-float { animation: deviceFloatLaptop 4.4s ease-in-out infinite; }
        .device-phone-float { animation: deviceFloatPhone 3.4s ease-in-out infinite; }

        .magnetic-btn, .magnetic-btn-outline { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease; }
        .magnetic-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 30px rgba(34,197,94,0.3); }
        .magnetic-btn-outline:hover { transform: translateY(-3px); border-color: #16a34a !important; color: #16a34a !important; }

        .enq-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .enq-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 13px; font-family: 'Poppins', sans-serif; outline: none; transition: border-color 0.25s ease, background 0.25s ease; }
        .enq-input::placeholder { color: rgba(255,255,255,0.32); }
        .enq-input:focus { border-color: #22c55e; background: rgba(34,197,94,0.07); }
        .enq-select-wrap { position: relative; display: flex; align-items: center; }
        .enq-select-icon { position: absolute; left: 14px; font-size: 14px; color: rgba(255,255,255,0.4); pointer-events: none; z-index: 1; }
        .enq-select { appearance: none; -webkit-appearance: none; padding-left: 36px; padding-right: 30px; cursor: pointer; color-scheme: dark; }
        .enq-select-chevron { position: absolute; right: 12px; font-size: 14px; color: rgba(255,255,255,0.45); pointer-events: none; transition: transform 0.2s ease; }
        .enq-select-wrap:hover .enq-select-chevron { color: #4ade80; }
        .enq-select-wrap:focus-within .enq-select-chevron { color: #4ade80; transform: rotate(180deg); }
        .enq-select option { background: #0d1410; color: #fff; }

        @media (max-width: 480px) {
          .enq-row { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up, .float-icon, .mock-bar, .mock-bar-grow, .mock-pulse-dot, .mock-node-pulse, .mock-shield-ring, .mock-pulse-line, .device-laptop-float, .device-phone-float { animation: none !important; }
        }
      `}</style>
      <div style={{ fontFamily: 'Poppins, sans-serif', background: '#fafaf8', color: '#0a0a0a', lineHeight: 1.6, fontSize: 14, width: '100%', overflowX: 'hidden' }}>
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