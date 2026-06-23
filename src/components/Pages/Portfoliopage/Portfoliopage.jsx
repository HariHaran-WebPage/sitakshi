import React, { useState, useEffect, useRef } from 'react';
import '../../../Style/Portfoliopage/Portfoliopage.css';

/* ── DATA ── */
const stats = [
  { icon: 'ti ti-briefcase', num: 85, suffix: '+',   label: 'Projects Delivered' },
  { icon: 'ti ti-heart',     num: 98, suffix: '%',   label: 'Client Satisfaction' },
  { icon: 'ti ti-building',  num: 12, suffix: '+',   label: 'Industries Served' },
  { icon: 'ti ti-star',      num: null, suffix: '4.9/5', label: 'Average Rating' },
];

const filters = ['All', 'Web Apps', 'Mobile Apps', 'E-commerce', 'AI & Data'];

const projects = [
  {
    name: 'NeoBank',
    category: 'Mobile Apps',
    desc: 'Digital banking app that brought modern UX to community banking — now serving 50K+ users.',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'MedTrack',
    category: 'Web Apps',
    desc: 'Patient management dashboard helping clinics cut admin time by 40%.',
    tech: ['React', 'Python', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'ShopWave',
    category: 'E-commerce',
    desc: 'Headless storefront that took a DTC brand from launch to seven figures in year one.',
    tech: ['Next.js', 'Stripe', 'Supabase'],
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'EduSphere',
    category: 'Web Apps',
    desc: 'Cohort-based learning platform built for a fast-growing edtech startup.',
    tech: ['Vue.js', 'Firebase', 'AWS'],
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'VisionAI',
    category: 'AI & Data',
    desc: 'Computer-vision analytics tool that turns retail camera feeds into real-time insight.',
    tech: ['Python', 'TensorFlow', 'AWS'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'TravelMate',
    category: 'Mobile Apps',
    desc: 'Trip-planning app that pairs AI itineraries with real-time booking.',
    tech: ['React Native', 'Go', 'Docker'],
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
  },
];

const approachCards = [
  {
    icon: 'ti ti-bulb',
    title: 'Discovery & Strategy',
    desc: 'We dig into your market, users, and goals before a single line of code gets written.',
    accent: 'green-dark',
  },
  {
    icon: 'ti ti-pencil',
    title: 'Design & Prototype',
    desc: 'Clickable prototypes let you test ideas with real users before committing engineering time.',
    accent: 'green-mid',
  },
  {
    icon: 'ti ti-code',
    title: 'Build & Iterate',
    desc: 'Agile sprints with weekly demos keep you in the loop and the product moving forward.',
    accent: 'green-light',
  },
  {
    icon: 'ti ti-headset',
    title: 'Launch & Support',
    desc: 'We stay on after launch — monitoring, fixing, and helping you scale with confidence.',
    accent: 'green-soft',
  },
];

const testimonials = [
  {
    text: 'The NeoBank team felt like an extension of our own. They shipped our MVP in six weeks and it never felt rushed.',
    name: 'Maya Singh',
    company: 'Founder, NeoBank',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
  {
    text: "ShopWave nailed our brand and our checkout flow converts better than anything we'd tried before.",
    name: 'Daniel Cho',
    company: 'Co-founder, ShopWave',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
  {
    text: "VisionAI's dashboard turned a pile of camera footage into decisions our ops team could actually use.",
    name: 'Priya Nair',
    company: 'COO, VisionAI',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
];

const avatarPhotos = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&auto=format&fit=crop&crop=face&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&auto=format&fit=crop&crop=face&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&auto=format&fit=crop&crop=face&q=80',
];

/* ── COUNT UP HOOK ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === null) return;
    const start = performance.now();
    const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count };
}

/* ── STAT CELL ── */
function StatCell({ stat }) {
  const { ref, count } = useCountUp(stat.num);
  return (
    <div className="port-stat-cell" ref={ref}>
      <div className="port-stat-icon"><i className={stat.icon} aria-hidden="true" /></div>
      <div className="port-stat-text">
        <div className="port-stat-num">
          {stat.num === null ? stat.suffix : `${count}${stat.suffix}`}
        </div>
        <div className="port-stat-label">{stat.label}</div>
      </div>
    </div>
  );
}

/* ── PROJECT CARD ── */
function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`port-card${visible ? ' port-card--visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <div className="port-card-img-wrap">
        <img className="port-card-img" src={project.img} alt={project.name} loading="lazy" />
        <span className="port-card-badge">{project.category}</span>
      </div>
      <div className="port-card-body">
        <h3 className="port-card-title">{project.name}</h3>
        <p className="port-card-desc">{project.desc}</p>
        <div className="port-card-tech">
          {project.tech.map((t, i) => (
            <span key={i} className="port-tech-chip">{t}</span>
          ))}
        </div>
        <a className="port-card-link" href="#">
          View Case Study <i className="ti ti-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/* ── APPROACH CARD ── */
function ApproachCard({ card, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`port-app-card port-app-card--${card.accent}${visible ? ' port-app-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="port-app-card__bar" />
      <div className="port-app-card__icon-wrap">
        <i className={card.icon} aria-hidden="true" />
      </div>
      <div className="port-app-card__num">0{index + 1}</div>
      <h3 className="port-app-card__title">{card.title}</h3>
      <p className="port-app-card__desc">{card.desc}</p>
      <div className="port-app-card__circle" aria-hidden="true" />
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <div className="port-hero">
      <div className="port-hero-content">
        <div className="port-hero-badge">
          <span className="port-badge-dot" />
          Startup Project Portfolio
        </div>
        <h1>
          Projects That <span>Define</span><br />Startup Success
        </h1>
        <p className="port-hero-sub">
          A selection of products we've designed, built, and shipped with founders —
          from first prototype to scaled platform.
        </p>
        <div className="port-hero-btns">
          <button className="port-btn-primary">Start Your Project →</button>
          <button className="port-btn-outline">
            <i className="ti ti-player-play" aria-hidden="true" /> View Case Studies
          </button>
        </div>
        <div className="port-trusted">
          <p>Shipped across 12+ industries worldwide</p>
          <div className="port-logos">
            {['FinTech', 'HealthTech', 'EdTech', 'E-commerce'].map((l, i) => (
              <div key={i} className="port-logo-pill">{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="port-hero-visual">
        <div className="port-badge-projects">
          <div className="port-badge-label">Projects Launched</div>
          <div className="port-badge-row">
            <div className="port-badge-num">85+</div>
            <div className="port-badge-chg">↑ 32%</div>
          </div>
          <svg className="port-badge-mini-chart" width="120" height="32" viewBox="0 0 120 32">
            <polyline points="0,26 18,22 36,17 54,20 72,11 90,6 105,9 120,3"
              fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
            <polygon points="0,26 18,22 36,17 54,20 72,11 90,6 105,9 120,3 120,32 0,32"
              fill="rgba(22,163,74,0.07)"/>
            <circle cx="120" cy="3" r="3.5" fill="#16a34a"/>
          </svg>
        </div>

        <div className="port-hero-img-wrap">
          <img
            className="port-hero-real-img"
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&auto=format&fit=crop&q=80"
            alt="Product showcase"
            loading="eager"
          />
        </div>

        <div className="port-badge-rating">
          <div className="port-badge-label">Average Rating</div>
          <div className="port-badge-row">
            <div className="port-badge-num">4.9/5</div>
            <div className="port-badge-chg">↑ 12%</div>
          </div>
          <svg className="port-badge-mini-chart" width="120" height="32" viewBox="0 0 120 32">
            <polyline points="0,24 22,20 44,22 66,13 88,8 120,3"
              fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
            <polygon points="0,24 22,20 44,22 66,13 88,8 120,3 120,32 0,32"
              fill="rgba(22,163,74,0.07)"/>
            <circle cx="120" cy="3" r="3.5" fill="#16a34a"/>
          </svg>
        </div>

        <div className="port-badge-clients">
          <div className="port-badge-avatars">
            {avatarPhotos.map((src, i) => (
              <img key={i} className="port-badge-avatar-img" src={src} alt={`Client ${i + 1}`} />
            ))}
          </div>
          <div>
            <div className="port-badge-clients-num">40+ Startups</div>
            <div className="port-badge-clients-label">Built With</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── STATS BAND ── */
function StatsBand() {
  return (
    <div className="port-stats-band">
      <div className="port-stats-band-pattern" aria-hidden="true" />
      <div className="port-stats-band-glow port-stats-band-glow--left"  aria-hidden="true" />
      <div className="port-stats-band-glow port-stats-band-glow--right" aria-hidden="true" />
      <div className="port-stats-inner">
        {stats.map((s, i) => (
          <StatCell key={i} stat={s} />
        ))}
      </div>
    </div>
  );
}

/* ── WORK / FILTERABLE GRID ── */
function Work() {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="port-work">
      <div className="port-tag">Our Work</div>
      <h2 className="port-section-h">Selected Case Studies</h2>
      <p className="port-work-sub">
        From MVPs to scaled platforms — a snapshot of what we've shipped for founders across industries.
      </p>

      <div className="port-filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`port-filter-tab${active === f ? ' port-filter-tab--active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="port-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── FEATURED CASE STUDY ── */
function FeaturedCase() {
  return (
    <div className="port-case">
      <div className="port-case-inner">
        <div className="port-case-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80"
            alt="NeoBank case study"
            loading="lazy"
          />
        </div>
        <div className="port-case-copy">
          <div className="port-case-tag">Featured Case Study</div>
          <h2 className="port-case-title">NeoBank — Digital Banking, Reimagined</h2>
          <p className="port-case-desc">
            We partnered with NeoBank from a napkin sketch to a fully licensed digital
            banking app, designing an onboarding flow simple enough for first-time users
            and a backend resilient enough for real money. Six weeks after kickoff, the
            MVP was in beta with its first 500 users.
          </p>
          <div className="port-case-stats">
            <div className="port-case-stat">
              <div className="port-case-stat-num">50K+</div>
              <div className="port-case-stat-label">Active Users</div>
            </div>
            <div className="port-case-stat">
              <div className="port-case-stat-num">4.8★</div>
              <div className="port-case-stat-label">App Store Rating</div>
            </div>
            <div className="port-case-stat">
              <div className="port-case-stat-num">6 wks</div>
              <div className="port-case-stat-label">To First MVP</div>
            </div>
          </div>
          <button className="port-case-btn">Read the Full Story →</button>
        </div>
      </div>
    </div>
  );
}

/* ── APPROACH ── */
function Approach() {
  return (
    <div className="port-approach">
      <div className="port-tag">Our Process</div>
      <h2 className="port-section-h">From First Sketch to Scale</h2>
      <p className="port-approach-sub">
        A repeatable process that's helped founders ship fast without breaking things later.
      </p>
      <div className="port-approach-grid">
        {approachCards.map((card, i) => (
          <ApproachCard key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  return (
    <div className="port-testi">
      <div className="port-testi-inner">
        <div className="port-testi-header">
          <div className="port-tag port-testi-tag">Client Stories</div>
          <h2 className="port-section-h port-testi-heading">What Founders Say</h2>
        </div>
        <div className="port-testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="port-testi-card">
              <div className="port-stars">★★★★★</div>
              <p className="port-testi-text">{t.text}</p>
              <div className="port-testi-author">
                <img className="port-testi-photo" src={t.photo} alt={t.name} />
                <div>
                  <div className="port-testi-name">{t.name}</div>
                  <div className="port-testi-co">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <div className="port-cta">
      <div className="port-cta-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div className="port-cta-icon-wrap">
            <i className="ti ti-rocket" aria-hidden="true" />
          </div>
          <div className="port-cta-copy">
            <h2>Ready to Build Your Next Case Study?</h2>
            <p>Let's turn your idea into the project we feature next.</p>
          </div>
        </div>
        <div className="port-cta-btns">
          <button className="port-btn-cta-primary">Start Your Project →</button>
          <button className="port-btn-cta-outline">Book a Call →</button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="port-pg">
      <Hero />
      <StatsBand />
      <Work />
      <FeaturedCase />
      <Approach />
      <Testimonials />
      <CTA />
    </div>
  );
}