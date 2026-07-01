import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users, Newspaper, Mic, Video, Camera, PenLine, Mail, Lightbulb,
  Sparkles, Share2, Play, Pause,
} from 'lucide-react';

const T = {
  primary:      '#00a34d',
  primaryDark:  '#008040',
  primaryLight: '#e6f7ee',
  secondary:    '#ffffff',
  ink:          '#1f2a22',
  paper:        '#fdfdfb',
  paperLine:    'rgba(0,0,0,0.05)',
  text:         '#2a2a2a',
  textLight:    '#6c757d',
  textLighter:  '#a0a8b0',
  border:       '#e9ecef',
  bgLight:      '#f8f9fa',
};

/* ════════════════════════════════════════════════════════════
   FLIPBOOK — hero-right visual. Every page carries a real photo
   background (Unsplash), including the closing "merge" page.
════════════════════════════════════════════════════════════ */
const PAGES = [
    {
    key: 'merge',
    kind: 'merge',
    icon: Share2,
    label: 'It All Connects',
    tag: 'The System',
    desc: 'Eight formats. One system. Each piece feeds the next, compounding into an audience that grows a little more with every single publish.',
    color: '#008040',
    anim: 'anim-pulse',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format',
  },
  {
    key: 'cover',
    kind: 'cover',
    icon: Sparkles,
    eyebrow: 'A NOTEBOOK GUIDE',
    title: 'Content\nMarketing',
    desc: 'One strategy, eight formats. Every piece of content is built to earn attention, build trust, and drive a real business outcome — turn the page to see how each one works.',
    color: '#008040',
    anim: 'anim-pulse',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format',
  },
  {
    key: 'audience',
    kind: 'node',
    icon: Users,
    label: 'Audience',
    tag: '01 · Foundation',
    desc: 'Before a single word is written, we map exactly who you\u2019re talking to — their questions, objections, and buying triggers. Every format below starts from this map, not a guess.',
    color: '#0f5132',
    anim: 'anim-bob',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format',
  },
  {
    key: 'news',
    kind: 'node',
    icon: Newspaper,
    label: 'News',
    tag: '02 · Timeliness',
    desc: 'Newsjacking and real-time commentary place your brand inside conversations that are already happening, riding the search and social spikes right as they peak.',
    color: T.primary,
    anim: 'anim-tilt',
    img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=900&q=80&auto=format',
  },
  {
    key: 'podcasts',
    kind: 'node',
    icon: Mic,
    label: 'Podcasts',
    tag: '03 · Authority',
    desc: 'Long-form audio builds trust in a way text never can. Interviews and narrative episodes turn casual listeners into a loyal, returning audience.',
    color: '#33c972',
    anim: 'anim-wiggle',
    img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=80&auto=format',
  },
  {
    key: 'video',
    kind: 'node',
    icon: Video,
    label: 'Video',
    tag: '04 · Attention',
    desc: 'Explainers, demos, and brand stories stop the scroll and hold attention longer than any other format — turning curiosity into conversion.',
    color: '#0f5132',
    anim: 'anim-pop',
    img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&q=80&auto=format',
  },
  {
    key: 'photos',
    kind: 'node',
    icon: Camera,
    label: 'Photos',
    tag: '05 · Clarity',
    desc: 'Infographics and branded visuals turn complex data into a story that\u2019s easy to share — the kind that earns backlinks instead of a scroll-past.',
    color: T.primary,
    anim: 'anim-float',
    img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=80&auto=format',
  },
  {
    key: 'blogs',
    kind: 'node',
    icon: PenLine,
    label: 'Blogs',
    tag: '06 · Compounding',
    desc: 'SEO-driven articles keep working long after they\u2019re published, capturing search intent and turning organic traffic into a channel that pays you back monthly.',
    color: '#0f5132',
    anim: 'anim-write',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format',
  },
  {
    key: 'newsletters',
    kind: 'node',
    icon: Mail,
    label: 'Newsletters',
    tag: '07 · Relationship',
    desc: 'A direct line into the inbox, no algorithm in between. Newsletters turn one-time readers into a recurring, first-party relationship.',
    color: '#33c972',
    anim: 'anim-swing',
    img: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=900&q=80&auto=format',
  },
  {
    key: 'strategy',
    kind: 'node',
    icon: Lightbulb,
    label: 'Strategy',
    tag: '08 · The Plan',
    desc: 'The plan that ties every format to a buyer stage, a keyword, and a goal. Nothing gets published without a specific job to do.',
    color: '#008040',
    anim: 'anim-glow',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format',
  },

];

const MERGE_NODES = [
  { key: 'audience', icon: Users, label: 'Audience', x: 26, y: 22, color: '#0f5132' },
  { key: 'news', icon: Newspaper, label: 'News', x: 55, y: 15, color: T.primary },
  { key: 'podcasts', icon: Mic, label: 'Podcasts', x: 82, y: 25, color: '#33c972' },
  { key: 'video', icon: Video, label: 'Video', x: 87, y: 55, color: '#0f5132' },
  { key: 'photos', icon: Camera, label: 'Photos', x: 78, y: 82, color: T.primary },
  { key: 'blogs', icon: PenLine, label: 'Blogs', x: 50, y: 90, color: '#0f5132' },
  { key: 'newsletters', icon: Mail, label: 'Newsletters', x: 20, y: 78, color: '#33c972' },
  { key: 'strategy', icon: Lightbulb, label: 'Strategy', x: 13, y: 48, color: '#008040' },
];

function IconMedallion({ Icon, color, anim, size = 88 }) {
  return (
    <div
      className={`cf-medallion ${anim}`}
      style={{ width: size, height: size, background: `linear-gradient(150deg, ${color}, ${color}dd)` }}
    >
      <Icon size={size * 0.42} strokeWidth={1.8} color="#fff" />
    </div>
  );
}

function MergePage({ active }) {
  const center = { x: 50, y: 50 };
  return (
    <div className="cf-merge-wrap">
      <svg className="cf-merge-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="cfArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#7CFCB0" />
          </marker>
        </defs>
        {MERGE_NODES.map((n, i) => {
          const dx = center.x - n.x, dy = center.y - n.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len, uy = dy / len;
          const sx = n.x + ux * 8, sy = n.y + uy * 8;
          const ex = center.x - ux * 14, ey = center.y - uy * 14;
          return (
            <path
              key={n.key}
              d={`M${sx},${sy} L${ex},${ey}`}
              className={active ? 'cf-merge-line cf-merge-line-active' : 'cf-merge-line'}
              style={{ animationDelay: `${i * 90 + 200}ms` }}
              stroke="#7CFCB0" strokeWidth="0.5" strokeDasharray="2 2" fill="none"
              markerEnd="url(#cfArrow)"
            />
          );
        })}
      </svg>

      <div className="cf-merge-center" style={{ left: `${center.x}%`, top: `${center.y}%` }}>
        <Share2 size={20} color="#fff" />
      </div>

      {MERGE_NODES.map((n, i) => (
        <div
          key={n.key}
          className={active ? 'cf-merge-node cf-merge-node-active' : 'cf-merge-node'}
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 90}ms` }}
        >
          <div className="cf-merge-node-icon" style={{ background: n.color }}>
            <n.icon size={15} color="#fff" />
          </div>
          <span className="cf-merge-node-label">{n.label}</span>
        </div>
      ))}
    </div>
  );
}

/* every page (cover / node / merge) now sits on top of a real photo */
function PageContent({ page, index, total, active }) {
  const Icon = page.icon;

  if (page.kind === 'merge') {
    return (
      <div className="cf-page-inner cf-page-merge">
        <img className="cf-page-photo" src={page.img} alt="" aria-hidden="true" />
        <div className="cf-page-overlay cf-page-overlay-strong" />
        <div className="cf-page-content">
          <div className="cf-page-tag cf-page-tag-photo">{page.tag}</div>
          <MergePage active={active} />
          <h3 className="cf-page-title cf-page-title-photo">{page.label}</h3>
          <p className="cf-page-desc cf-page-desc-photo">{page.desc}</p>
        </div>
      </div>
    );
  }

  if (page.kind === 'cover') {
    return (
      <div className="cf-page-inner cf-page-cover">
        <img className="cf-page-photo" src={page.img} alt="" aria-hidden="true" />
        <div className="cf-page-overlay cf-page-overlay-strong" />
        <div className="cf-page-content">
          <div className="cf-page-eyebrow cf-page-eyebrow-photo">{page.eyebrow}</div>
          <IconMedallion Icon={Icon} color={page.color} anim={active ? page.anim : ''} size={92} />
          <h1 className="cf-cover-title cf-page-title-photo">
            {page.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
          </h1>
          <p className="cf-page-desc cf-page-desc-photo" style={{ maxWidth: 340 }}>{page.desc}</p>
          <div className="cf-page-hint">Tap the arrows or dots to turn the page →</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cf-page-inner cf-page-node">
      <img className="cf-page-photo" src={page.img} alt="" aria-hidden="true" />
      <div className="cf-page-overlay" />
      <div className="cf-page-content">
        <div className="cf-page-tag cf-page-tag-photo">{page.tag}</div>
        <IconMedallion Icon={Icon} color={page.color} anim={active ? page.anim : ''} />
        <h3 className="cf-page-title cf-page-title-photo">{page.label}</h3>
        <p className="cf-page-desc cf-page-desc-photo">{page.desc}</p>
        <div className="cf-page-count">{String(index).padStart(2, '0')} / {String(total - 1).padStart(2, '0')}</div>
      </div>
    </div>
  );
}

function HeroFlipbook() {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [dir, setDir] = useState('next');
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutsRef = useRef([]);
  const intervalRef = useRef(null);
  const total = PAGES.length;

  const clearTimers = () => { 
    timeoutsRef.current.forEach(clearTimeout); 
    timeoutsRef.current = []; 
  };

  const goTo = useCallback((newIndex, direction) => {
    if (phase !== 'idle') return;
    clearTimers();
    setDir(direction);
    setPhase('out');
    const t1 = setTimeout(() => {
      setDisplayIndex(newIndex);
      setIndex(newIndex);
      setPhase('in');
      const t2 = setTimeout(() => setPhase('idle'), 340);
      timeoutsRef.current.push(t2);
    }, 300);
    timeoutsRef.current.push(t1);
  }, [phase]);

  const next = useCallback(() => goTo((index + 1) % total, 'next'), [index, goTo, total]);

  // Auto-flip functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        next();
      }, 4000); // Flip every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, next]);

  useEffect(() => () => clearTimers(), []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const page = PAGES[displayIndex];
  const animClass = phase === 'out'
    ? (dir === 'next' ? 'cf-flip-out-next' : 'cf-flip-out-prev')
    : phase === 'in'
      ? (dir === 'next' ? 'cf-flip-in-next' : 'cf-flip-in-prev')
      : '';

  return (
    <div className="cf-root">
      <div className="cf-book-wrap">
        <div className="cf-book">
          <div className="cf-spiral" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
          </div>
          <div key={displayIndex + phase} className={`cf-page-shell ${animClass}`}>
            <PageContent page={page} index={displayIndex} total={total} active={phase !== 'out'} />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE DATA — services / process / faq / case studies
════════════════════════════════════════════════════════════ */
const cmServices = [
  { icon: 'ti ti-pencil', accent: 'dark', tag: '01', title: 'Blog Writing & SEO Content', subtitle: 'Rank. Be Read. Convert.', desc: 'Long-form articles, pillar pages, and cluster content engineered for search intent — written by humans who understand your industry, not just your keywords.', features: ['Keyword research', 'Pillar & cluster content', 'On-page SEO', 'Internal linking strategy'], cta: 'Start Ranking' },
  { icon: 'ti ti-video', accent: 'mid', tag: '02', title: 'Video Content Production', subtitle: 'Stories That Stop Thumbs', desc: 'Explainer videos, brand documentaries, testimonials, and product demos — scripted, shot, and edited to move people from curious to convinced.', features: ['Script & storyboard', 'Full production', 'Motion graphics', 'YouTube optimisation'], cta: 'Start Filming' },
  { icon: 'ti ti-microphone', accent: 'light', tag: '03', title: 'Podcast Production', subtitle: 'Authority In Their Ears', desc: 'End-to-end podcast management — from concept and guest booking to recording, editing, and distribution across every major platform.', features: ['Show concept & format', 'Guest sourcing', 'Audio editing', 'Multi-platform publish'], cta: 'Launch My Podcast' },
  { icon: 'ti ti-chart-pie', accent: 'soft', tag: '04', title: 'Infographics & Visual Content', subtitle: 'Data Made Beautiful', desc: 'Complex ideas distilled into shareable visual stories — infographics, data visualisations, and branded illustration that earn backlinks and social shares.', features: ['Data visualisation', 'Brand illustration', 'Shareable assets', 'White-label reports'], cta: 'Design My Content' },
  { icon: 'ti ti-map', accent: 'dark', tag: '05', title: 'Content Strategy & Planning', subtitle: 'Every Piece Has a Job', desc: 'Full-funnel content architecture that maps every asset to a buyer stage, a keyword cluster, and a business goal. Strategy before a single word is written.', features: ['Audience research', 'Content audit', 'Editorial calendar', 'Funnel mapping'], cta: 'Build My Strategy' },
  { icon: 'ti ti-broadcast', accent: 'mid', tag: '06', title: 'Distribution & Amplification', subtitle: 'Content That Gets Seen', desc: 'Email newsletters, social repurposing, PR outreach, and paid amplification — so the content you invested in actually reaches the audience it deserves.', features: ['Newsletter syndication', 'Social repurposing', 'Link building', 'Paid amplification'], cta: 'Amplify My Content' },
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
  { q: 'Can you repurpose content we already have?', a: "Yes — content audits and repurposing are part of every engagement. Good ideas shouldn't live in one format." },
  { q: 'Do you handle distribution or just production?', a: 'We handle the full chain — strategy, creation, and multi-channel distribution including newsletter, social, and PR outreach.' },
  { q: 'How do you measure content ROI?', a: 'Organic traffic, keyword rankings, backlinks earned, and — for bottom-funnel content — pipeline and conversion attribution.' },
];

const caseStudies = [
  { company: 'Northleaf', industry: 'B2B / SaaS', result: '310% organic traffic', timeframe: '6 months', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&auto=format', quote: 'Our blog went from 800 monthly visitors to over 32K in six months. Pipeline from organic is now our highest-converting channel.', person: 'David Chen', role: 'Head of Marketing', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=75&auto=format' },
  { company: 'Fable', industry: 'D2C / Education', result: '48K podcast listeners', timeframe: '4 months', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80&auto=format', quote: "We went from zero podcast presence to 48K monthly listeners. It's now our biggest brand-building channel by a wide margin.", person: 'Amara Osei', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=75&auto=format' },
  { company: 'Stratum', industry: 'Fintech / B2B', result: '2.4M content impressions', timeframe: '5 months', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format', quote: 'The infographic series earned 180 backlinks in three months and moved us from page 4 to page 1 for our core terms.', person: 'Lena Park', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=75&auto=format' },
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

/* ── HOOKS ── */
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

/* ── ANIMATED BG ── */
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

/* ── SERVICE CARD ── */
const accentMap = {
  dark: { bg: '#0a140e', border: 'rgba(0,163,77,0.18)', bar: 'linear-gradient(90deg,#008040,#00a34d,#33c972)', iconBg: 'rgba(0,163,77,0.14)', iconColor: '#33c972', tagColor: '#33c972', titleColor: '#fff', descColor: 'rgba(255,255,255,0.58)', featColor: 'rgba(255,255,255,0.5)', hoverBorder: 'rgba(0,163,77,0.48)', hoverShadow: '0 24px 60px -12px rgba(0,128,64,0.38)' },
  mid:  { bg: '#061209', border: 'rgba(0,163,77,0.15)', bar: 'linear-gradient(90deg,#004d26,#008040,#00a34d)', iconBg: 'rgba(0,128,64,0.2)', iconColor: '#66d49a', tagColor: '#66d49a', titleColor: '#edfaf3', descColor: 'rgba(180,240,210,0.68)', featColor: 'rgba(180,240,210,0.54)', hoverBorder: 'rgba(0,163,77,0.42)', hoverShadow: '0 24px 60px -12px rgba(0,64,26,0.58)' },
  light:{ bg: '#ffffff', border: T.border, bar: 'linear-gradient(90deg,#00a34d,#33c972,#80e0aa)', iconBg: T.primaryLight, iconColor: T.primaryDark, tagColor: T.primary, titleColor: T.text, descColor: T.textLight, featColor: T.textLight, hoverBorder: 'rgba(0,163,77,0.35)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.12)' },
  soft: { bg: '#ffffff', border: T.border, bar: 'linear-gradient(90deg,#33c972,#80e0aa,#b3f0cc)', iconBg: T.primaryLight, iconColor: T.primary, tagColor: T.primary, titleColor: T.text, descColor: T.textLight, featColor: T.textLighter, hoverBorder: 'rgba(0,163,77,0.3)', hoverShadow: '0 24px 60px -16px rgba(0,0,0,0.10)' },
};

function ServiceCard({ svc, index }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const a = accentMap[svc.accent];
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: a.bg, border: `1px solid ${hovered ? a.hoverBorder : a.border}`, borderRadius: 24, padding: '28px 26px 30px', position: 'relative', overflow: 'hidden', cursor: 'default', opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(28px)', transition: `opacity 0.5s ease ${index*80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`, boxShadow: hovered ? a.hoverShadow : '0 1px 2px rgba(0,0,0,0.04)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 100% 0%,${a.iconColor}16 0%,transparent 55%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: hovered ? 3 : 2.5, background: a.bar, transition: 'height 0.35s ease' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: a.tagColor, opacity: 0.55, display: 'block', marginBottom: 6 }}>{svc.tag}</span>
          <div style={{ fontSize: 10.5, color: a.tagColor, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width: 46, height: 46, background: a.iconBg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.iconColor, fontSize: 21, flexShrink: 0, border: `1px solid ${a.iconColor}33`, boxShadow: hovered ? `0 8px 20px -6px ${a.iconColor}55` : 'none', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease', transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)' }}>
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
      <button style={{ background: hovered ? a.iconColor : 'transparent', border: `1.5px solid ${a.iconColor}`, color: hovered ? (svc.accent === 'light' || svc.accent === 'soft' ? '#fff' : '#051a0b') : a.iconColor, borderRadius: 11, padding: '12px 20px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.3s ease', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize: 14, transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

function StatCell({ icon, num, suffix, label }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref} className="cm-stat-cell">
      <div style={{ width: 56, height: 56, background: 'rgba(0,163,77,0.14)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a34d', fontSize: 26, flexShrink: 0, border: '1px solid rgba(0,163,77,0.22)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', background: 'linear-gradient(135deg,#ffffff 0%,#b3f0cc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{count}{suffix}</div>
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
      style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', border: `1px solid ${hov ? 'rgba(0,163,77,0.32)' : T.border}`, boxShadow: hov ? '0 20px 50px -12px rgba(0,163,77,0.18)' : '0 2px 8px rgba(0,0,0,0.04)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.5s ease ${index*100}ms, transform 0.5s ease ${index*100}ms, box-shadow 0.4s ease, border-color 0.4s ease` }}>
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
    <div ref={ref} style={{ textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${index*100}ms, transform 0.5s ease ${index*100}ms` }}>
      <div style={{ width: 72, height: 72, background: 'rgba(0,163,77,0.14)', border: '1px solid rgba(0,163,77,0.25)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a34d', fontSize: 30, margin: '0 auto 20px' }}>
        <i className={step.icon} aria-hidden="true" />
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#33c972', opacity: 0.6, marginBottom: 8 }}>0{index+1}</div>
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function LiveDashboard() {
  const { ref, tilt } = useParallax(6);
  const isMobile = useIsMobile();
  const [pageViews, setPageViews] = useState(31240);
  useEffect(() => {
    const id = setInterval(() => setPageViews(v => v + Math.floor(Math.random() * 18) + 2), 1800);
    return () => clearInterval(id);
  }, []);
  const bars = [38, 52, 44, 70, 56, 88, 74];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} style={{ width: '100%', maxWidth: isMobile ? '100%' : 260, transform: isMobile ? 'none' : `perspective(900px) rotateX(${-tilt.y*0.5}deg) rotateY(${tilt.x*0.5}deg)`, transition: 'transform 0.2s ease-out' }}>
        <div style={{ background: 'linear-gradient(165deg,#0a1610,#06100a)', border: '1px solid rgba(0,163,77,0.24)', borderRadius: 16, padding: 16, boxShadow: '0 28px 56px -16px rgba(0,0,0,0.55)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(0,163,77,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} /><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 8px', fontSize: 8.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>analytics.google.com</div>
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
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i===bars.length-1 ? 'linear-gradient(180deg,#33c972,#00a34d)' : 'rgba(0,163,77,0.22)' }} />)}
          </div>
          {[{kw:'Organic traffic',pos:'+310%',delta:'↑82pts'},{kw:'Keywords ranking',pos:'142',delta:'↑38 new'},{kw:'Avg. time on page',pos:'4.8m',delta:'↑1.2m'}].map((row, i) => (
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
      <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',type:enquiryTypes[0],message:'' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,163,77,0.42)', color: '#33c972', borderRadius: 10, padding: '10px 18px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
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
        <button type="submit" disabled={status === 'sending'} style={{ background: T.primary, color: '#fff', padding: '13px 26px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: status==='sending'?'default':'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status==='sending'?0.75:1, marginTop: 4 }}>
          {status === 'sending' ? 'Sending…' : 'Get My Free Audit'}
          {status !== 'sending' && <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />}
        </button>
      </form>
    </div>
  );
}

/* ── HERO ── */
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
          <h1 className="cm-reveal" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.06, color: T.text, letterSpacing: '-1.2px', marginBottom: 20, animationDelay: '0.1s' }}>
            Content That Ranks,<br />
            <span style={{ background: `linear-gradient(135deg,${T.primaryDark} 0%,${T.primary} 55%,#33c972 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Builds Trust & Converts</span>
          </h1>
          <p className="cm-reveal" style={{ fontSize: 15, color: T.textLight, lineHeight: 1.8, maxWidth: 460, marginBottom: 34, animationDelay: '0.18s' }}>
            From SEO blogs and podcast shows to viral infographics and video — we build content programmes that compound in value every single month.
          </p>
          <div className="cm-reveal" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', animationDelay: '0.26s' }}>
            <button className="cm-magnetic-btn" style={{ background: T.primary, color: '#fff', padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,163,77,0.36)' }}>Get Free Content Audit →</button>
            <a href="#work" style={{ textDecoration: 'none' }}>
              <button className="cm-magnetic-btn-outline" style={{ background: '#fff', color: T.text, padding: '14px 28px', borderRadius: 12, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 13, border: `1.5px solid ${T.border}`, cursor: 'pointer' }}>View Results</button>
            </a>
          </div>
          <div className="cm-reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, animationDelay: '0.32s' }}>
            {[{icon:'ti-trending-up',value:'+310%',label:'Avg. traffic growth'},{icon:'ti-clock',value:'4.8m',label:'Avg. time on page'},{icon:'ti-link',value:'180+',label:'Backlinks/month'}].map(m => (
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
                <img key={i} src={src} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.bgLight}`, marginLeft: i===0?0:-8 }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: T.textLight }}>Trusted by <strong style={{ color: T.text }}>300+ brands</strong> to build content that compounds</span>
          </div>
        </div>
        {/* Right side: the flipbook — merged in from the notebook-flip component */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HeroFlipbook />
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
    <div id="services" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 24px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>What We Do</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Content That Actually Works</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>Six formats, one strategy. Every piece earns attention, builds authority, and drives a measurable outcome.</p>
      <div className="cm-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {cmServices.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <div id="work" style={{ background: T.bgLight, padding: '88px 24px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>Case Studies</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Proof Is In The Traffic</h2>
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
    <div id="process" style={{ background: T.text, padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '55%', height: '180%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,163,77,0.16)', color: '#33c972', fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid rgba(0,163,77,0.28)' }}>How We Work</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: '#fff', marginBottom: 56, lineHeight: 1.1, letterSpacing: '-1px' }}>Four Steps, Zero Filler</h2>
        <div className="cm-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, position: 'relative' }}>
          <div className="cm-process-connector" style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,163,77,0.32),rgba(0,163,77,0.32),transparent)' }} />
          {processSteps.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function FormatsBand() {
  return (
    <div style={{ background: '#fff', padding: '40px 24px', borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: T.textLighter, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>Content formats we produce</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
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
    <div id="contact" style={{ maxWidth: 1320, margin: '96px auto', padding: '0 24px' }}>
      <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>Get In Touch</div>
      <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 8, lineHeight: 1.1, letterSpacing: '-1px' }}>Get Your Free Content Audit</h2>
      <p style={{ fontSize: 15, color: T.textLight, lineHeight: 1.7, maxWidth: 460, marginBottom: 48 }}>No pitch, no fluff — just a real audit of your content gaps and a clear growth plan, delivered in 48 hours.</p>
      <div ref={ref} className="cm-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, background: T.text, borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(0,163,77,0.28)', boxShadow: '0 24px 64px rgba(0,163,77,0.14)', opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(24px)', transition: 'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '160%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}><EnquiryForm /></div>
        </div>
        <div className="cm-contact-right" style={{ padding: '40px 36px', background: 'linear-gradient(165deg,#0a1410,#060e09)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
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
    <div id="faq" style={{ background: T.bgLight, padding: '88px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: T.primaryLight, color: T.primaryDark, fontSize: 11, fontWeight: 600, padding: '5px 16px', borderRadius: 30, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', border: '1px solid #b3f0cc' }}>FAQ</div>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 900, color: T.text, marginBottom: 40, lineHeight: 1.1, letterSpacing: '-1px' }}>Common Questions</h2>
        {faqs.map((item, i) => <FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ background: T.text, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '72px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-15%', width: '55%', height: '200%', background: 'radial-gradient(ellipse,rgba(0,163,77,0.14) 0%,transparent 70%)' }} />
      <div className="cm-cta-inner" style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 70, height: 70, background: 'rgba(0,163,77,0.16)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#33c972', fontSize: 32, flexShrink: 0, border: '1.5px solid rgba(0,163,77,0.32)' }}>
            <i className="ti ti-pencil" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.8px' }}>Ready to Build Content That Compounds?</h2>
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

/* ══ ROOT ══ */
export default function ContentMarketingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@500;600;700&family=Kalam:wght@400;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Poppins',sans-serif;background:#f8f9fa;color:#2a2a2a;line-height:1.6;font-size:14px;overflow-x:hidden;}
        #services,#work,#process,#faq{scroll-margin-top:80px;}

        /* Stat band */
        .cm-stat-cell{padding:44px 36px;border-right:1px solid rgba(255,255,255,0.06);display:flex;gap:18px;align-items:center;}
        .cm-stat-cell:last-child{border-right:none;}

        /* ══ FLIPBOOK ══ */
        .cf-root{ font-family:'Poppins',sans-serif; display:flex; flex-direction:column; align-items:center; gap:18px; width:100%; }
        .cf-book-wrap{ position:relative; width:100%; max-width:420px; perspective:1600px; }
        .cf-book{
          position:relative; width:100%; aspect-ratio:4/5; border-radius:16px; overflow:hidden;
          background-color:${T.paper};
          border:1px solid rgba(0,0,0,0.08);
          box-shadow:0 30px 70px -20px rgba(0,64,26,0.32), 0 4px 14px rgba(0,0,0,0.08);
          padding-left:26px;
          transform:rotate(-0.8deg);
        }
        .cf-spiral{ position:absolute; top:4%; bottom:4%; left:5px; width:14px; display:flex; flex-direction:column; justify-content:space-between; z-index:6; }
        .cf-spiral span{ display:block; width:12px; height:12px; border-radius:50%; background:radial-gradient(circle at 35% 30%,#5a5a5a,#1c1c1c); box-shadow:0 1px 2px rgba(0,0,0,0.4); }
        .cf-page-shell{
          position:absolute; inset:0; left:26px; transform-style:preserve-3d; transform-origin:left center;
          backface-visibility:hidden; will-change:transform,opacity;
        }
        .cf-page-inner{ position:relative; height:100%; width:100%; overflow:hidden; }
        .cf-page-photo{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .cf-page-overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(6,20,12,0.42) 0%, rgba(6,20,12,0.62) 55%, rgba(4,14,8,0.82) 100%); }
        .cf-page-overlay-strong{ background:linear-gradient(180deg, rgba(6,20,12,0.58) 0%, rgba(6,20,12,0.74) 55%, rgba(4,14,8,0.9) 100%); }
        .cf-page-content{ position:relative; z-index:2; height:100%; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:32px 24px; gap:12px; }

        .cf-page-eyebrow-photo{ font-size:10.5px; font-weight:700; letter-spacing:0.16em; color:#b3f0cc; text-transform:uppercase; }
        .cf-page-tag-photo{ font-family:'Kalam',cursive; font-weight:700; font-size:12.5px; color:#0a2c17; background:rgba(255,255,255,0.88); border:1px solid rgba(0,163,77,0.4); padding:4px 12px; border-radius:20px; margin-bottom:2px; }
        .cf-cover-title{ font-family:'Playfair Display',serif; font-weight:900; font-size:clamp(28px,7vw,38px); line-height:1.08; letter-spacing:-1px; margin:4px 0 2px; }
        .cf-page-title-photo{ font-family:'Playfair Display',serif; font-weight:800; font-size:clamp(22px,5.5vw,28px); color:#fff; letter-spacing:-0.5px; margin:2px 0 0; text-shadow:0 4px 18px rgba(0,0,0,0.4); }
        .cf-page-desc-photo{ font-size:13px; line-height:1.7; color:rgba(255,255,255,0.86); max-width:300px; }
        .cf-page-count{ font-family:'Kalam',cursive; font-size:11.5px; color:rgba(255,255,255,0.65); margin-top:4px; }
        .cf-page-hint{ font-family:'Kalam',cursive; font-size:12px; color:#7CFCB0; margin-top:6px; }

        .cf-medallion{ border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px -8px rgba(0,0,0,0.4), 0 0 0 5px rgba(255,255,255,0.9), 0 0 0 6px rgba(0,163,77,0.25); }
        .anim-pulse{ animation:cfPulse 2.2s ease-in-out infinite; }
        .anim-bob{ animation:cfBob 2.4s ease-in-out infinite; }
        .anim-tilt{ animation:cfTilt 2.6s ease-in-out infinite; }
        .anim-wiggle{ animation:cfWiggle 1.8s ease-in-out infinite; }
        .anim-pop{ animation:cfPop 2s cubic-bezier(.34,1.56,.64,1) infinite; }
        .anim-float{ animation:cfFloat 3s ease-in-out infinite; }
        .anim-write{ animation:cfWrite 2.4s ease-in-out infinite; }
        .anim-swing{ animation:cfSwing 2.4s ease-in-out infinite; transform-origin:top center; }
        .anim-glow{ animation:cfGlow 2s ease-in-out infinite; }
        @keyframes cfPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
        @keyframes cfBob{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
        @keyframes cfTilt{0%,100%{transform:rotate(-6deg);}50%{transform:rotate(6deg);}}
        @keyframes cfWiggle{0%,100%{transform:rotate(0deg) scale(1);}25%{transform:rotate(-8deg) scale(1.03);}75%{transform:rotate(8deg) scale(1.03);}}
        @keyframes cfPop{0%,100%{transform:scale(1);}50%{transform:scale(1.12);}}
        @keyframes cfFloat{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-7px) rotate(-3deg);}}
        @keyframes cfWrite{0%,100%{transform:rotate(0deg) translateX(0);}50%{transform:rotate(-10deg) translateX(-3px);}}
        @keyframes cfSwing{0%,100%{transform:rotate(-5deg);}50%{transform:rotate(5deg);}}
        @keyframes cfGlow{0%,100%{box-shadow:0 10px 26px -8px rgba(0,0,0,0.4),0 0 0 5px rgba(255,255,255,0.9),0 0 0 6px rgba(0,163,77,0.25);}50%{box-shadow:0 10px 34px -6px rgba(0,163,77,0.6),0 0 0 5px rgba(255,255,255,0.9),0 0 0 10px rgba(0,163,77,0.35);}}

        @keyframes cfFlipOutNext{ from{transform:rotateY(0deg);opacity:1;} to{transform:rotateY(-95deg);opacity:0;} }
        @keyframes cfFlipInNext{ from{transform:rotateY(95deg);opacity:0;} to{transform:rotateY(0deg);opacity:1;} }
        @keyframes cfFlipOutPrev{ from{transform:rotateY(0deg);opacity:1;} to{transform:rotateY(95deg);opacity:0;} }
        @keyframes cfFlipInPrev{ from{transform:rotateY(-95deg);opacity:0;} to{transform:rotateY(0deg);opacity:1;} }
        .cf-flip-out-next{ animation:cfFlipOutNext 0.3s ease-in forwards; }
        .cf-flip-in-next{ animation:cfFlipInNext 0.34s ease-out forwards; }
        .cf-flip-out-prev{ animation:cfFlipOutPrev 0.3s ease-in forwards; }
        .cf-flip-in-prev{ animation:cfFlipInPrev 0.34s ease-out forwards; }

        .cf-page-merge{ }
        .cf-merge-wrap{ position:relative; width:100%; max-width:230px; aspect-ratio:1/1; margin:2px 0; }
        .cf-merge-svg{ position:absolute; inset:0; width:100%; height:100%; }
        .cf-merge-line{ stroke-dasharray:2 2; opacity:0; }
        .cf-merge-line-active{ animation:cfLineIn 0.4s ease forwards; }
        @keyframes cfLineIn{ from{opacity:0;} to{opacity:1;} }
        .cf-merge-center{ position:absolute; width:32px; height:32px; margin:-16px; border-radius:50%; background:linear-gradient(150deg,#008040,#00a34d); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px -4px rgba(0,64,26,0.5), 0 0 0 4px rgba(255,255,255,0.9); z-index:3; }
        .cf-merge-node{ position:absolute; transform:translate(-50%,-50%) scale(0.5); opacity:0; display:flex; flex-direction:column; align-items:center; gap:3px; width:56px; z-index:2; }
        .cf-merge-node-active{ animation:cfNodeIn 0.45s cubic-bezier(.34,1.56,.64,1) forwards; }
        @keyframes cfNodeIn{ from{transform:translate(-50%,-50%) scale(0.4); opacity:0;} to{transform:translate(-50%,-50%) scale(1); opacity:1;} }
        .cf-merge-node-icon{ width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px -2px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.9); }
        .cf-merge-node-label{ font-family:'Kalam',cursive; font-weight:700; font-size:9px; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,0.6); white-space:nowrap; }

        .cf-controls{ display:flex; align-items:center; gap:14px; }
        .cf-play-btn{ width:36px; height:36px; border-radius:50%; border:1.5px solid ${T.primary}; background:#fff; color:${T.primaryDark}; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s ease; }
        .cf-play-btn:hover{ background:${T.primary}; color:#fff; transform:translateY(-2px); }

        /* Animations (page-level) */
        @keyframes floatUpCM{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes floatDnCM{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
        @keyframes pulseDotCM{0%,100%{box-shadow:0 0 0 3px rgba(0,163,77,0.25)}50%{box-shadow:0 0 0 6px rgba(0,163,77,0.1)}}
        @keyframes gradientMoveCM{0%{background-position:0%}100%{background-position:200%}}
        @keyframes fadeUpCM{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        .cm-reveal{animation:fadeUpCM 0.7s cubic-bezier(0.22,1,0.36,1) both;}
        .cm-magnetic-btn{transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.25s ease;}
        .cm-magnetic-btn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 30px rgba(0,163,77,0.32);}
        .cm-magnetic-btn-outline{transition:transform 0.25s ease,border-color 0.25s ease,color 0.25s ease;}
        .cm-magnetic-btn-outline:hover{transform:translateY(-3px);border-color:#00a34d !important;color:#00a34d !important;}

        /* Form */
        .cm-enq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .cm-enq-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:12px 14px;color:#fff;font-size:13px;font-family:'Poppins',sans-serif;outline:none;transition:border-color 0.25s ease,background 0.25s ease;}
        .cm-enq-input::placeholder{color:rgba(255,255,255,0.32);}
        .cm-enq-input:focus{border-color:#00a34d;background:rgba(0,163,77,0.08);}
        .cm-enq-select-wrap{position:relative;display:flex;align-items:center;}
        .cm-enq-select-icon{position:absolute;left:14px;font-size:14px;color:rgba(255,255,255,0.4);pointer-events:none;z-index:1;}
        .cm-enq-select{appearance:none;-webkit-appearance:none;padding-left:36px;padding-right:30px;cursor:pointer;color-scheme:dark;}
        .cm-enq-select-chevron{position:absolute;right:12px;font-size:14px;color:rgba(255,255,255,0.45);pointer-events:none;transition:transform 0.2s ease;}
        .cm-enq-select-wrap:focus-within .cm-enq-select-chevron{color:#00a34d;transform:rotate(180deg);}
        .cm-enq-select option{background:#071209;color:#fff;}

        /* ── TABLET 1025–1280 ── */
        @media(max-width:1280px){
          .cm-hero-grid{padding:64px 40px 56px !important;gap:32px !important;}
        }

        /* ── TABLET 769–1024 ── */
        @media(max-width:1024px){
          .cm-hero-grid{grid-template-columns:1fr !important;padding:56px 32px 48px !important;gap:40px !important;}
          .cf-book-wrap{max-width:380px;margin:0 auto;}
          .cm-stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-stat-cell{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);padding:32px 28px;}
          .cm-stat-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,0.06) !important;}
          .cm-stat-cell:last-child,.cm-stat-cell:nth-last-child(-n+2):nth-child(odd){border-bottom:none !important;}
          .cm-stat-cell:nth-last-child(-n+2){border-bottom:none;}
          .cm-services-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-process-grid{grid-template-columns:repeat(2,1fr) !important;gap:48px 40px !important;}
          .cm-process-connector{display:none !important;}
          .cm-contact-grid{grid-template-columns:1fr !important;}
          .cm-contact-right{border-top:1px solid rgba(255,255,255,0.07) !important;border-right:none !important;}
          .cm-cases-grid{grid-template-columns:repeat(2,1fr) !important;}
        }

        /* ── MOBILE 481–768 ── */
        @media(max-width:768px){
          .cm-hero-grid{grid-template-columns:1fr !important;padding:36px 16px 32px !important;gap:32px !important;}
          .cf-book-wrap{max-width:340px;}
          .cm-services-grid{grid-template-columns:1fr !important;}
          .cm-cases-grid{grid-template-columns:1fr !important;}
          .cm-cta-inner{flex-direction:column !important;align-items:flex-start !important;}
          .cm-enq-row{grid-template-columns:1fr !important;}
          .cm-stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cm-stat-cell{padding:24px 20px !important;}
          #services,#work,#faq{padding-left:16px !important;padding-right:16px !important;margin-top:64px !important;margin-bottom:0 !important;}
          #work,#faq{padding-top:64px !important;padding-bottom:64px !important;}
          #process{padding:64px 16px !important;}
          #contact{margin:64px auto !important;padding:0 16px !important;}
          .cm-process-grid{grid-template-columns:1fr !important;gap:36px !important;}
          .cm-process-connector{display:none !important;}
          .cm-contact-grid{border-radius:16px !important;}
          .cm-contact-grid > div:first-child{padding:28px 20px !important;}
          .cm-contact-right{padding:28px 20px !important;}
          .cm-cta-inner > div:last-child{width:100% !important;}
          .cm-cta-inner > div:last-child button,.cm-cta-inner > div:last-child a{width:100% !important;}
          .cm-cta-inner > div:last-child a button{width:100% !important;}
        }

        /* ── SMALL MOBILE ≤480 ── */
        @media(max-width:480px){
          .cm-hero-grid{padding:28px 14px 24px !important;}
          .cf-book-wrap{max-width:300px;}
          .cm-stats-grid{grid-template-columns:1fr 1fr !important;}
          .cm-stat-cell{padding:20px 14px !important;}
          .cm-stat-cell > div:first-child{width:44px !important;height:44px !important;font-size:20px !important;border-radius:12px !important;}
          .cm-stat-cell > div:last-child > div:first-child{font-size:28px !important;}
          #services,#work,#faq{padding-left:14px !important;padding-right:14px !important;}
          #process,#contact{padding-left:14px !important;padding-right:14px !important;}
          .cm-contact-grid > div:first-child{padding:24px 16px !important;}
          .cm-contact-right{padding:24px 16px !important;}
        }

        /* ── VERY SMALL ≤360 ── */
        @media(max-width:360px){
          .cm-hero-grid{padding:24px 12px !important;}
          .cm-stat-cell{padding:16px 10px !important;}
          .cf-book-wrap{max-width:260px;}
        }

        @media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important;}}
      `}</style>
      <div id="top" style={{ fontFamily: 'Poppins,sans-serif', background: T.bgLight, color: T.text, lineHeight: 1.6, fontSize: 14, overflowX: 'hidden' }}>
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