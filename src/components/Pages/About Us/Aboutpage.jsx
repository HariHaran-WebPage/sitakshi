import React, { useState, useEffect, useRef } from 'react';
import '../../../Style/Aboutus/Aboutpage.css';
import DashboardImg from '../../../assets/images/Aboutus.png';

/* ── DATA ── */
const stats = [
  { icon: 'ti ti-clock',   num: 48,   suffix: 'hr', label: 'Avg. Turnaround' },
  { icon: 'ti ti-heart',   num: 98,   suffix: '%',  label: 'Client Satisfaction' },
  { icon: 'ti ti-code',    num: 15,   suffix: '+',  label: 'Tech Experts' },
  { icon: 'ti ti-headset', num: null, suffix: '24/7', label: 'Support Available' },
];

const miniStats = [
  { num: 48,   suffix: 'hr', label: 'Avg. Turnaround' },
  { num: 98,   suffix: '%',  label: 'Client Satisfaction' },
  { num: 15,   suffix: '+',  label: 'Tech Experts' },
  { num: null, suffix: '24/7', label: 'Support Available' },
];

const vmCards = [
  {
    icon: 'ti ti-eye',
    label: 'Our Vision',
    title: 'Empower Startup Innovation',
    desc: 'To become the go-to technology partner for startups and innovators, helping them build groundbreaking solutions that disrupt industries and create lasting impact.',
  },
  {
    icon: 'ti ti-rocket',
    label: 'Our Mission',
    title: 'Fuel Startup Growth',
    desc: 'Empower startups with cutting-edge technology, agile development, and strategic guidance to accelerate their journey from idea to market leader.',
  },
];

const whyCards = [
  {
    icon: 'ti ti-users',
    title: 'Startup-Focused Team',
    desc: 'Our team understands startup culture and works with the speed and agility that early-stage companies need to succeed.',
    accent: 'green-dark',
  },
  {
    icon: 'ti ti-refresh',
    title: 'Rapid Prototyping',
    desc: 'We help you validate ideas quickly with MVPs and prototypes, saving time and resources in your product development journey.',
    accent: 'green-mid',
  },
  {
    icon: 'ti ti-stack-2',
    title: 'Scale-Ready Solutions',
    desc: 'We build technology that grows with you — from your first 100 users to millions, our solutions are designed for scale.',
    accent: 'green-light',
  },
  {
    icon: 'ti ti-headset',
    title: 'Startup Support System',
    desc: 'Beyond development, we provide strategic guidance, mentorship, and connections to help your startup thrive.',
    accent: 'green-soft',
  },
];

const techGroups = [
  {
    icon: 'ti ti-layout',
    label: 'Frontend',
    cls: 'fe',
    pills: [
      { name: 'React',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue.js',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Svelte',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
    ],
  },
  {
    icon: 'ti ti-server',
    label: 'Backend',
    cls: 'be',
    pills: [
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Go',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
      { name: 'Ruby',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
    ],
  },
  {
    icon: 'ti ti-database',
    label: 'Database',
    cls: 'db',
    pills: [
      { name: 'MongoDB',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Supabase',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    ],
  },
  {
    icon: 'ti ti-cloud',
    label: 'Cloud',
    cls: 'cl',
    pills: [
      { name: 'AWS',          logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
      { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Vercel',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      { name: 'Docker',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
  },
];

const testimonials = [
  {
    text: 'They helped us go from idea to MVP in just 6 weeks. Their startup-first approach and technical expertise made all the difference in our launch.',
    name: 'Rahul Sharma',
    company: 'Founder, HealthTech Startup',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
  {
    text: 'Working with them feels like having a technical co-founder. They understand startup dynamics and deliver exceptional quality at startup speed.',
    name: 'Sneha Patel',
    company: 'CEO, FinTech Venture',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
  {
    text: 'They built our platform that scaled from 100 to 10,000 users without any hiccups. Truly a partner that grows with you.',
    name: 'Amit Kumar',
    company: 'CTO, EdTech Startup',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&auto=format&fit=crop&crop=face&q=80',
  },
];

/* ── Real avatar photos for the 40+ Startups badge ── */
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
    <div className="stat-cell" ref={ref}>
      <div className="stat-icon"><i className={stat.icon} aria-hidden="true" /></div>
      <div className="stat-text">
        <div className="stat-num">
          {stat.num === null ? stat.suffix : `${count}${stat.suffix}`}
        </div>
        <div className="stat-label">{stat.label}</div>
      </div>
    </div>
  );
}

/* ── TECH PILL ── */
function TechPill({ pill }) {
  const [spinning, setSpinning] = useState(false);
  const handleClick = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 620);
  };
  return (
    <div className="tech-pill" onClick={handleClick} title={pill.name}>
      <div className={`tech-pill-circle${spinning ? ' spinning' : ''}`}>
        <img src={pill.logo} alt={pill.name} />
      </div>
      <span className="tech-pill-name">{pill.name}</span>
    </div>
  );
}

/* ── MINI STAT ── */
function MiniStat({ stat }) {
  const { ref, count } = useCountUp(stat.num);
  return (
    <div className="mini-stat" ref={ref}>
      <div className="mini-stat-num">
        {stat.num === null ? stat.suffix : `${count}${stat.suffix}`}
      </div>
      <div className="mini-stat-label">{stat.label}</div>
    </div>
  );
}

/* ── WHY CARD ── */
function WhyCard({ card, index }) {
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
      className={`wcu-card wcu-card--${card.accent}${visible ? ' wcu-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="wcu-card__bar" />
      <div className="wcu-card__icon-wrap">
        <i className={card.icon} aria-hidden="true" />
      </div>
      <div className="wcu-card__num">0{index + 1}</div>
      <h3 className="wcu-card__title">{card.title}</h3>
      <p className="wcu-card__desc">{card.desc}</p>
      <div className="wcu-card__circle" aria-hidden="true" />
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Startup Tech Partner
        </div>
        <h1>
          Building Startup <span>Innovation</span><br />From Day One
        </h1>
        <p className="hero-sub">
          We help startups and innovative companies transform breakthrough ideas into
          scalable digital solutions with speed, quality, and entrepreneurial spirit.
        </p>
        <div className="hero-btns">
          <button className="btn-primary">Launch Your Idea →</button>
          <button className="btn-outline">
            <i className="ti ti-player-play" aria-hidden="true" /> See Our Work
          </button>
        </div>
        <div className="trusted">
          <p>Trusted by 40+ innovative startups worldwide</p>
          <div className="logos">
            {['StartupX', 'InnovateLab', 'TechSpark', 'VentureHub'].map((l, i) => (
              <div key={i} className="logo-pill">{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="badge-projects">
          <div className="badge-projects-label">Projects Launched</div>
          <div className="badge-projects-row">
            <div className="badge-projects-num">85+</div>
            <div className="badge-projects-chg">↑ 32%</div>
          </div>
          <svg className="badge-mini-chart" width="120" height="32" viewBox="0 0 120 32">
            <polyline points="0,26 18,22 36,17 54,20 72,11 90,6 105,9 120,3"
              fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
            <polygon points="0,26 18,22 36,17 54,20 72,11 90,6 105,9 120,3 120,32 0,32"
              fill="rgba(22,163,74,0.07)"/>
            <circle cx="120" cy="3" r="3.5" fill="#16a34a"/>
          </svg>
        </div>

        <div className="hero-img-wrap">
          <img className="hero-real-img" src={DashboardImg} alt="Sitakshi dashboard" loading="eager" />
        </div>

        <div className="badge-satisfaction">
          <div className="badge-satisfaction-label">Client Satisfaction</div>
          <div className="badge-satisfaction-row">
            <div className="badge-satisfaction-num">4.9/5</div>
            <div className="badge-satisfaction-chg">↑ 12%</div>
          </div>
          <svg className="badge-mini-chart" width="120" height="32" viewBox="0 0 120 32">
            <polyline points="0,24 22,20 44,22 66,13 88,8 120,3"
              fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
            <polygon points="0,24 22,20 44,22 66,13 88,8 120,3 120,32 0,32"
              fill="rgba(22,163,74,0.07)"/>
            <circle cx="120" cy="3" r="3.5" fill="#16a34a"/>
          </svg>
        </div>

        {/* 40+ Startups badge with REAL avatar photos */}
        <div className="badge-clients">
          <div className="badge-avatars">
            {avatarPhotos.map((src, i) => (
              <img
                key={i}
                className="badge-avatar-img"
                src={src}
                alt={`Client ${i + 1}`}
              />
            ))}
          </div>
          <div>
            <div className="badge-clients-num">40+ Startups</div>
            <div className="badge-clients-label">Global Reach</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── STATS BAND ── */
function StatsBand() {
  return (
    <div className="stats-band">
      <div className="stats-band-pattern" aria-hidden="true" />
      <div className="stats-band-glow stats-band-glow--left"  aria-hidden="true" />
      <div className="stats-band-glow stats-band-glow--right" aria-hidden="true" />
      <div className="stats-inner">
        {stats.map((s, i) => (
          <StatCell key={i} stat={s} />
        ))}
      </div>
    </div>
  );
}

function WhoWeAre() {
  return (
    <div className="who">
      <div className="who-mosaic">
        <div className="mosaic-ring" />
        <div className="mosaic-dot mosaic-dot-1" />
        <div className="mosaic-dot mosaic-dot-2" />
        <div className="mosaic-main">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80" alt="Team collaborating" loading="lazy" />
        </div>
        <div className="mosaic-top-right">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" alt="Developer working" loading="lazy" />
        </div>
        <div className="mosaic-bottom-left">
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=80" alt="Startup meeting" loading="lazy" />
        </div>
        <div className="mosaic-bottom-right">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop&q=80" alt="Office workspace" loading="lazy" />
        </div>
      </div>

      <div>
        <div className="tag">Who We Are</div>
        <h2 className="who-h">Your Startup's<br />Technology Partner</h2>
        <p className="who-p">
          We're a passionate team of innovators, developers, and startup enthusiasts
          dedicated to building the next generation of digital products. We specialize in
          helping startups go from idea to launch with speed and precision.
        </p>
        <p className="who-p">
          Our mission is to democratize technology for startups, making enterprise-grade
          solutions accessible to early-stage companies.
        </p>
        <div className="who-mini-stats">
          {miniStats.map((s, i) => (
            <MiniStat key={i} stat={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionMission() {
  return (
    <div className="vm">
      <div className="vm-inner">
        <div className="vm-header">
          <div className="section-tag vm-tag">Our Direction</div>
          <h2 className="section-h vm-heading">Vision &amp; Mission</h2>
        </div>
        <div className="vm-cards">
          {vmCards.map((card, i) => (
            <div key={i} className="vm-card">
              <div className="vm-icon-wrap">
                <i className={card.icon} aria-hidden="true" />
              </div>
              <div className="vm-label">{card.label}</div>
              <div className="vm-title">{card.title}</div>
              <p className="vm-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyChooseUs() {
  return (
    <div className="why">
      <div className="section-tag">Why Choose Us</div>
      <h2 className="section-h">Built for Startup Success</h2>
      <p className="why-sub">
        Everything you need to go from idea to launch — and keep scaling from there.
      </p>
      <div className="why-grid">
        {whyCards.map((card, i) => (
          <WhyCard key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <div className="tech">
      <div className="section-tag">Technologies</div>
      <h2 className="section-h">Our Tech Stack for Startups</h2>
      <div className="tech-groups">
        {techGroups.map((group, i) => (
          <div key={i} className={`tech-group tech-group-${group.cls}`}>
            <div className="tech-group-header">
              <div className="tech-group-icon">
                <i className={group.icon} aria-hidden="true" />
              </div>
              <div className="tech-group-label">{group.label}</div>
            </div>
            <div className="tech-pills">
              {group.pills.map((pill, j) => (
                <TechPill key={j} pill={pill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="testi">
      <div className="testi-inner">
        <div className="testi-header">
          <div className="section-tag testi-tag">Testimonials</div>
          <h2 className="section-h testi-heading">Startup Success Stories</h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <img className="testi-photo" src={t.photo} alt={t.name} />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-co">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="cta">
      <div className="cta-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div className="cta-icon-wrap">
            <i className="ti ti-rocket" aria-hidden="true" />
          </div>
          <div className="cta-copy">
            <h2>Ready to Launch Your Startup?</h2>
            <p>Let's turn your vision into reality. Get started with your MVP today.</p>
          </div>
        </div>
        <div className="cta-btns">
          <button className="btn-cta-primary">Start Your MVP →</button>
          <button className="btn-cta-outline">Book a Call →</button>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pg">
      <Hero />
      <StatsBand />
      <WhoWeAre />
      <VisionMission />
      <WhyChooseUs />
      <TechStack />
      <Testimonials />
      <CTA />
    </div>
  );
}