import React, { useState, useEffect, useRef } from 'react';

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const POSTS = [
  {
    id: 1,
    slug: 'healthtech-mvp-in-6-weeks',
    category: 'Case Study',
    accent: '#16a34a',
    accentLight: '#f0fdf4',
    accentBorder: '#bbf7d0',
    tags: ['HealthTech', 'MVP', 'Agile', 'Startup'],
    title: 'How We Took a HealthTech Idea to MVP in 6 Weeks',
    excerpt: "A founder's napkin sketch to a working product investors could actually click through — inside the 42-day sprint that closed a $1.2M round.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    date: 'June 2, 2026',
    readTime: '6 min read',
    views: '2.4K',
    author: { name: 'Ananya Rao', role: 'Lead Product Strategist', avatar: 'https://i.pravatar.cc/120?img=47', bio: 'Helping teams turn ideas into impactful products users love. 8 years shipping B2B SaaS.' },
    toc: ['Introduction', 'The Challenge', 'Week-by-Week Breakdown', 'Key Outcomes', 'Lessons Learned'],
    blocks: [
      { type: 'intro', text: 'When the founder walked in with a napkin sketch and a hard deadline, the brief was simple to say and hard to do: a working product investors could click through in six weeks, not a deck about one.' },
      { type: 'stats', items: [{ value: '6', label: 'Weeks to demo' }, { value: '3', label: 'Engineers' }, { value: '42', label: 'User interviews' }, { value: '$1.2M', label: 'Raised post-demo' }] },
      { type: 'h2', text: 'The Challenge', id: 'challenge' },
      { type: 'p', text: 'The founders had a strong problem statement but no product, no tech architecture, and a tight investor deadline. The original concept covered booking, billing, triage, and a patient portal — far too much for six weeks. We sat with the founder and crossed out everything that wasn\'t the actual bet being tested.' },
      { type: 'quote', text: 'The moment we stopped designing for every future user and started designing for the next forty, the whole sprint sped up.', attr: 'Founder, on the week-two pivot' },
      { type: 'h2', text: 'Week-by-Week Breakdown', id: 'timeline' },
      { type: 'timeline', items: [
        { label: 'W1', heading: 'Scope cut to one flow', text: 'Booking, billing, and the patient portal were shelved. Only symptom-to-specialist matching survived.' },
        { label: 'W2', heading: 'First clickable prototype', text: 'Rough, embarrassing, and real enough to put in front of an actual patient.' },
        { label: 'W3', heading: 'Matching screen rebuilt twice', text: 'Real users hesitated in the same spot both times — that told us exactly what to fix.' },
        { label: 'W4', heading: 'Specialist matching logic finalized', text: 'Ninety seconds, start to confirmed booking, across forty test patients.' },
        { label: 'W5', heading: 'Investor demo script locked', text: 'No slides walked through — the founder handed people a phone instead.' },
        { label: 'W6', heading: 'Demo day', text: 'Round closed on the strength of a product people could use themselves.' },
      ]},
      { type: 'image', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop', caption: 'The team mapping flows on day 3 of the sprint.' },
      { type: 'h2', text: 'Key Outcomes', id: 'outcomes' },
      { type: 'outcomeCards', items: [
        { icon: '⚡', value: '40%', label: 'Faster time to market' },
        { icon: '📈', value: '2.3x', label: 'Higher user engagement' },
        { icon: '🛠', value: '35%', label: 'Reduced dev overhead' },
        { icon: '✅', value: '100%', label: 'Investor-ready MVP' },
      ]},
      { type: 'h2', text: 'Lessons Learned', id: 'lessons' },
      { type: 'p', text: 'Six weeks after the first sketch, the founder closed a round on the strength of a demo that took ninety seconds to run. The lesson wasn\'t speed for its own sake — it was that cutting scope ruthlessly enough is what makes speed possible at all. Investors weren\'t shown a roadmap. They were handed a phone and asked to book an appointment themselves.' },
      { type: 'callout', title: 'Why it worked', text: 'Investors weren\'t shown a roadmap. They were handed a phone and asked to book an appointment themselves. The product argued its own case.' },
    ],
  },
  {
    id: 2,
    slug: 'choosing-a-tech-stack',
    category: 'Tech',
    accent: '#2563eb',
    accentLight: '#eff6ff',
    accentBorder: '#bfdbfe',
    tags: ['Architecture', 'Engineering', 'Best Practices'],
    title: "Choosing a Tech Stack That Won't Hurt You Later",
    excerpt: 'The framework we use with every new client before a single line of code gets written — and the three questions that actually matter.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    date: 'May 24, 2026',
    readTime: '8 min read',
    views: '1.8K',
    author: { name: 'Marcus Chen', role: 'Principal Engineer', avatar: 'https://i.pravatar.cc/120?img=12', bio: 'Systems thinker. Has survived three major migrations and refuses to repeat them.' },
    toc: ['Why Stack Decisions Are Hard', 'The Three Questions', 'Framework vs Language', 'The Rule of Thumb'],
    blocks: [
      { type: 'intro', text: 'Every stack decision is really a bet on what will be hard to change later. Teams rarely regret a slow API as much as they regret a data model they can\'t safely migrate, or a framework with no path off it.' },
      { type: 'list', title: 'The three questions we always ask first', items: ['What will this team still be maintaining in three years?', 'Where does the data actually live, and how hard is it to move?', 'What happens the day the lead engineer leaves?'] },
      { type: 'h2', text: 'The Framework over the Language', id: 'framework' },
      { type: 'p', text: 'Language choice gets most of the debate and deserves the least of it. Two competent teams can ship the same product in Python or in Go. What actually compounds over time is the framework\'s opinionatedness — how much it decides for you versus how much it leaves open.' },
      { type: 'table', title: 'How we score a framework before committing', cols: ['Criteria', 'Loosely opinionated', 'Strongly opinionated'], rows: [['Initial velocity', '🟢 Fast', '🟡 Moderate'], ['Velocity at month 12', '🔴 Slows sharply', '🟢 Stays steady'], ['Onboarding a new hire', '🔴 Tribal knowledge', '🟢 Documented conventions'], ['Migration risk later', '🔴 High', '🟡 Low to moderate']] },
      { type: 'quote', text: 'The best migration is the one you never have to run.', attr: 'Marcus Chen, Principal Engineer' },
      { type: 'callout', title: 'Rule of thumb', text: "If you can't explain the data model to a new hire in under ten minutes, the stack is already working against you." },
    ],
  },
  {
    id: 3,
    slug: 'growth-loops-no-ad-spend',
    category: 'Growth',
    accent: '#9333ea',
    accentLight: '#faf5ff',
    accentBorder: '#e9d5ff',
    tags: ['Growth', 'Product-Led', 'Retention'],
    title: "Growth Loops That Don't Rely on Ad Spend",
    excerpt: 'Three early-stage products that grew almost entirely through product mechanics — and why that compounding effect holds up far longer.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    date: 'May 14, 2026',
    readTime: '5 min read',
    views: '2.1K',
    author: { name: 'Priya Nair', role: 'Growth Lead', avatar: 'https://i.pravatar.cc/120?img=32', bio: 'Product-led growth practitioner. Believes the best marketing is a product worth talking about.' },
    toc: ['The Problem with Paid Ads', 'What Makes a Real Loop', 'Three Case Studies', 'The Pattern Worth Stealing'],
    blocks: [
      { type: 'intro', text: 'Ad spend buys attention, not durability. The products we\'ve watched compound fastest over a year or more share something in common: their growth was built into the product itself.' },
      { type: 'stats', items: [{ value: '0%', label: 'From paid ads' }, { value: '4.2x', label: 'Referral signups' }, { value: '11mo', label: 'To first 100K users' }, { value: '92%', label: 'Organic growth' }] },
      { type: 'h2', text: 'The Loop Has to Be a Byproduct', id: 'loop' },
      { type: 'p', text: 'The weakest growth loops are the ones bolted on as a separate "invite friends" screen nobody opens. The strongest ones happen because using the product correctly produces something the next person needs to see — a shared doc, a public profile, a result worth showing someone else.' },
      { type: 'callout', title: 'A pattern worth stealing', text: 'Ask: what does a satisfied user naturally produce that a new user would need? If the answer is "nothing," the loop has to be designed, not assumed.' },
      { type: 'bigStat', value: '92%', label: 'Of new signups came through someone else\'s account', context: 'Across the three products we studied, almost none of that sharing was incentivized — it was just what using the product correctly looked like.' },
      { type: 'p', text: 'None of this means paid acquisition is wrong — it means it should accelerate a loop that already works, not substitute for one that doesn\'t exist yet.' },
    ],
  },
  {
    id: 4,
    slug: 'design-reviews',
    category: 'Product',
    accent: '#ea580c',
    accentLight: '#fff7ed',
    accentBorder: '#fed7aa',
    tags: ['Design', 'Process', 'Collaboration'],
    title: "Design Reviews That Don't Waste Everyone's Time",
    excerpt: 'A four-part structure for critique sessions that actually move work forward, instead of turning into a thirty-minute opinion swap.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    date: 'April 30, 2026',
    readTime: '4 min read',
    views: '1.2K',
    author: { name: 'Ananya Rao', role: 'Lead Product Strategist', avatar: 'https://i.pravatar.cc/120?img=47', bio: 'Helping teams turn ideas into impactful products users love. 8 years shipping B2B SaaS.' },
    toc: ['Why Reviews Fail', 'The Four-Part Structure', 'Write Before You Speak', 'Who Runs the Room'],
    blocks: [
      { type: 'intro', text: 'Most design reviews fail for the same reason: everyone in the room is reacting to the screen, not to the problem the screen is trying to solve. Fix the order of operations and the meeting fixes itself.' },
      { type: 'list', title: 'The four-part structure we use', items: ['State the problem out loud before showing anything', 'Show the work without narrating or defending it', 'Collect reactions silently in writing first', 'Discuss only after everyone has already written something down'] },
      { type: 'quote', text: 'Silence before discussion is the single highest-leverage change you can make to a critique session.', attr: 'Ananya Rao' },
      { type: 'p', text: 'Writing first means the loudest person in the room doesn\'t set the frame for everyone else\'s feedback. It sounds small. It changes the entire texture of the meeting.' },
      { type: 'callout', title: 'The rule nobody follows', text: 'Never show the work and explain it at the same time. Separate them by at least two minutes of silent looking.' },
    ],
  },
];

const POPULAR = [
  { title: 'Top 10 Tech Trends to Watch in 2026', time: '6 min', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop' },
  { title: 'Microservices vs Monolith Architecture', time: '7 min', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200&auto=format&fit=crop' },
  { title: 'The Future of Cloud Computing', time: '5 min', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=200&auto=format&fit=crop' },
  { title: "Cybersecurity Trends You Can't Ignore", time: '6 min', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop' },
];

const CATS = ['All', 'Case Study', 'Tech', 'Growth', 'Product'];

/* ════════════════════════════════════════
   BLOG LISTING
════════════════════════════════════════ */
function BlogPage({ onOpen }) {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat);
  const featured = cat === 'All' ? POSTS[0] : null;
  const grid = cat === 'All' ? filtered.slice(1) : filtered;

  return (
    <div className="bl-root">
      <style>{GLOBAL_CSS}</style>

      {/* HERO */}
      <section className="bl-hero">
        <div className="bl-hero-inner">
          <div className="bl-hero-left">
            <span className="bl-eyebrow">✦ Our Blog</span>
            <h1 className="bl-hero-h">Insights &amp; Stories<br/>That Drive Innovation</h1>
            <p className="bl-hero-sub">Practical thinking on building products, choosing tech, and shipping fast — from people who actually do the work.</p>
            <div className="bl-hero-actions">
              <button className="bl-btn-green">Explore Articles →</button>
              <button className="bl-btn-outline">Subscribe ✉</button>
            </div>
          </div>
          <div className="bl-hero-right">
            <div className="bl-hero-card">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop" alt="analytics dashboard" className="bl-hero-img"/>
              <div className="bl-hero-badge">
                <span className="bl-badge-dot"></span>
                <span>4 new posts this month</span>
              </div>
            </div>
          </div>
        </div>
        {/* Stat strip */}
        <div className="bl-stat-strip">
          {[['120+','Projects Delivered'],['85+','Happy Clients'],['98%','Client Satisfaction'],['10+','Years of Impact']].map(([v,l],i)=>(
            <div key={i} className="bl-stat-item">
              <span className="bl-stat-val">{v}</span>
              <span className="bl-stat-lbl">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bl-container">
        {/* FILTER */}
        <div className="bl-filter-row">
          {CATS.map(c => (
            <button key={c} className={`bl-filter${cat===c?' bl-filter-on':''}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>

        {/* FEATURED */}
        {featured && (
          <article className="bl-featured" onClick={()=>onOpen(featured)}>
            <div className="bl-featured-img-wrap">
              <img src={featured.image} alt={featured.title} className="bl-featured-img"/>
              <div className="bl-featured-overlay">
                <span className="bl-cat-pill" style={{background:featured.accent}}>{featured.category}</span>
              </div>
            </div>
            <div className="bl-featured-body">
              <div className="bl-featured-top-label">✦ Featured Article</div>
              <h2 className="bl-featured-title">{featured.title}</h2>
              <p className="bl-featured-excerpt">{featured.excerpt}</p>
              <div className="bl-featured-tags">
                {featured.tags.map(t=><span key={t} className="bl-tag">{t}</span>)}
              </div>
              <div className="bl-featured-meta">
                <img src={featured.author.avatar} alt={featured.author.name} className="bl-av-sm"/>
                <div>
                  <div className="bl-meta-name">{featured.author.name}</div>
                  <div className="bl-meta-role">{featured.author.role}</div>
                </div>
                <span className="bl-meta-pill">{featured.date}</span>
                <span className="bl-meta-pill">{featured.readTime}</span>
              </div>
              <button className="bl-read-btn" style={{borderColor:featured.accent,color:featured.accent}}>
                Read article <span className="bl-arrow">→</span>
              </button>
            </div>
          </article>
        )}

        {/* GRID + SIDEBAR */}
        <div className="bl-main">
          <div className="bl-grid-section">
            <div className="bl-section-hdr">
              <h2 className="bl-section-title">Latest Articles</h2>
              <span className="bl-view-all">View all →</span>
            </div>
            <div className="bl-grid">
              {grid.map(post => (
                <article key={post.id} className="bl-card" onClick={()=>onOpen(post)}>
                  <div className="bl-card-img-wrap">
                    <img src={post.image} alt={post.title} className="bl-card-img"/>
                    <span className="bl-cat-pill bl-cat-pill-card" style={{background:post.accent}}>{post.category}</span>
                  </div>
                  <div className="bl-card-body">
                    <h3 className="bl-card-title">{post.title}</h3>
                    <p className="bl-card-excerpt">{post.excerpt}</p>
                    <div className="bl-card-tags">
                      {post.tags.slice(0,2).map(t=><span key={t} className="bl-tag-sm">{t}</span>)}
                    </div>
                    <div className="bl-card-footer">
                      <img src={post.author.avatar} alt={post.author.name} className="bl-av-xs"/>
                      <span className="bl-meta-name">{post.author.name}</span>
                      <span className="bl-dot">·</span>
                      <span className="bl-meta-role">{post.readTime}</span>
                      <span className="bl-card-arrow" style={{color:post.accent}}>→</span>
                    </div>
                  </div>
                  <div className="bl-card-accent" style={{background:post.accent}}></div>
                </article>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="bl-sidebar">
            <div className="bl-side-box">
              <h3 className="bl-side-title">Popular Posts</h3>
              {POPULAR.map((p,i)=>(
                <div key={i} className="bl-pop-item">
                  <img src={p.img} alt={p.title} className="bl-pop-img"/>
                  <div>
                    <div className="bl-pop-title">{p.title}</div>
                    <div className="bl-pop-meta">{p.time} read</div>
                  </div>
                </div>
              ))}
              <span className="bl-view-all-link">View all posts →</span>
            </div>

            <div className="bl-side-box">
              <h3 className="bl-side-title">Popular Tags</h3>
              <div className="bl-tags-cloud">
                {['#Tech','#Growth','#Product','#Design','#Engineering','#Leadership','#AI','#Startups','#MVP'].map(t=>(
                  <span key={t} className="bl-cloud-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="bl-side-newsletter">
              <div className="bl-side-nl-icon">✉</div>
              <h3 className="bl-side-nl-title">Stay in the loop</h3>
              <p className="bl-side-nl-sub">Weekly insights on product, tech, and growth.</p>
              <input type="email" placeholder="you@company.com" className="bl-side-input"/>
              <button className="bl-btn-green bl-btn-full">Subscribe →</button>
              <p className="bl-no-spam">No spam, ever. Unsubscribe anytime.</p>
            </div>
          </aside>
        </div>

        {/* BOTTOM CTA */}
        <div className="bl-cta">
          <div className="bl-cta-glow"></div>
          <div className="bl-cta-content">
            <div>
              <h2 className="bl-cta-title">Have a project in mind?</h2>
              <p className="bl-cta-sub">Let's build something impactful together.</p>
            </div>
            <div className="bl-cta-btns">
              <button className="bl-btn-green">Work With Us →</button>
              <button className="bl-btn-ghost-light">Book a Call</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   BLOG DETAIL
════════════════════════════════════════ */
function BlogDetail({ post, onBack }) {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setScrollPct(pct);
      // active toc section
      const secs = document.querySelectorAll('.bd-section-anchor');
      let active = 0;
      secs.forEach((s, i) => {
        if (s.getBoundingClientRect().top < 200) active = i;
      });
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const related = POSTS.filter(p => p.id !== post.id).slice(0, 3);
  const { accent, accentLight, accentBorder } = post;

  return (
    <div className="bd-root">
      <style>{GLOBAL_CSS}</style>

      {/* PROGRESS BAR */}
      <div className="bd-progress" style={{width:`${scrollPct}%`, background:accent}}></div>

      {/* STICKY BACK NAV */}
      <div className="bd-topbar">
        <button className="bd-back-btn" onClick={onBack}>
          <span className="bd-back-arrow">←</span>
          <span>Back to Blog</span>
        </button>
        <div className="bd-topbar-center">
          <span className="bd-topbar-title">{post.title}</span>
        </div>
        <div className="bd-topbar-right">
          <span className="bd-topbar-meta">{post.readTime}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="bd-hero" style={{background:`linear-gradient(135deg, ${accentLight} 0%, #fff 60%)`}}>
        <div className="bd-hero-inner">
          <div className="bd-hero-left">
            <div className="bd-breadcrumb">
              <span className="bd-breadlink" onClick={onBack}>Blog</span>
              <span className="bd-breadsep">›</span>
              <span className="bd-breadcat" style={{color:accent}}>{post.category}</span>
            </div>
            <span className="bd-category-badge" style={{background:accent}}>{post.category}</span>
            <h1 className="bd-hero-title">{post.title}</h1>
            <p className="bd-hero-excerpt">{post.excerpt}</p>
            <div className="bd-hero-tags">
              {post.tags.map(t=><span key={t} className="bd-tag" style={{borderColor:accentBorder,color:accent,background:accentLight}}>{t}</span>)}
            </div>
            <div className="bd-hero-meta">
              <img src={post.author.avatar} alt={post.author.name} className="bd-av-lg"/>
              <div>
                <div className="bd-meta-name">{post.author.name}</div>
                <div className="bd-meta-role">{post.author.role}</div>
              </div>
              <div className="bd-meta-pills">
                <span className="bd-meta-pill">📅 {post.date}</span>
                <span className="bd-meta-pill">⏱ {post.readTime}</span>
                <span className="bd-meta-pill">👁 {post.views} views</span>
              </div>
            </div>
          </div>
          <div className="bd-hero-right">
            <div className="bd-hero-img-frame" style={{borderColor:accentBorder}}>
              <img src={post.image} alt={post.title} className="bd-hero-img"/>
              <div className="bd-hero-img-badge" style={{background:accent}}>
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="bd-layout">
        {/* SHARE COL */}
        <div className="bd-share-col">
          <div className="bd-share-sticky">
            <p className="bd-share-label">Share</p>
            {['𝕏','in','f','🔗'].map((s,i)=>(
              <button key={i} className="bd-share-btn" title={['Twitter','LinkedIn','Facebook','Copy link'][i]}>{s}</button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="bd-main" ref={bodyRef}>
          {post.blocks.map((block, i) => (
            <ContentBlock key={i} block={block} accent={accent} accentLight={accentLight} accentBorder={accentBorder}/>
          ))}

          {/* AUTHOR BOX */}
          <div className="bd-author-box" style={{borderLeftColor:accent}}>
            <img src={post.author.avatar} alt={post.author.name} className="bd-author-av"/>
            <div>
              <p className="bd-author-label" style={{color:accent}}>Written By</p>
              <p className="bd-author-name">{post.author.name}</p>
              <p className="bd-author-role">{post.author.role}</p>
              <p className="bd-author-bio">{post.author.bio}</p>
            </div>
          </div>

          {/* RELATED */}
          <div className="bd-related">
            <div className="bd-related-hdr">
              <span className="bd-related-eyebrow" style={{color:accent}}>✦ Keep Reading</span>
              <h2 className="bd-related-title">More From the Blog</h2>
            </div>
            <div className="bd-related-grid">
              {related.map(r=>(
                <div key={r.id} className="bd-rcard" onClick={()=>{ onBack(); setTimeout(()=>{},10); }}>
                  <div className="bd-rcard-img-wrap">
                    <img src={r.image} alt={r.title} className="bd-rcard-img"/>
                    <span className="bd-rcard-cat" style={{background:r.accent}}>{r.category}</span>
                  </div>
                  <div className="bd-rcard-body">
                    <h3 className="bd-rcard-title">{r.title}</h3>
                    <div className="bd-rcard-meta">
                      <img src={r.author.avatar} alt={r.author.name} className="bd-av-xs"/>
                      <span className="bd-rcard-author">{r.author.name}</span>
                      <span className="bd-dot">·</span>
                      <span className="bd-rcard-time">{r.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bd-cta">
            <div className="bd-cta-icon" style={{background:accentLight,borderColor:accentBorder}}>💡</div>
            <div className="bd-cta-copy">
              <h3 className="bd-cta-title">Have a product idea?</h3>
              <p className="bd-cta-sub">Let's turn your idea into a real product that makes an impact.</p>
            </div>
            <button className="bd-cta-btn" style={{background:accent}}>Work With Us →</button>
            <button className="bd-cta-ghost">Book a Call</button>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="bd-sidebar">
          {/* Author */}
          <div className="bd-side-card">
            <h4 className="bd-side-title">About the Author</h4>
            <div className="bd-side-author-row">
              <img src={post.author.avatar} alt={post.author.name} className="bd-av-md"/>
              <div>
                <div className="bd-side-author-name">{post.author.name}</div>
                <div className="bd-side-author-role">{post.author.role}</div>
              </div>
            </div>
            <p className="bd-side-author-bio">{post.author.bio}</p>
            <div className="bd-social-row">
              {['in','𝕏'].map((s,i)=><button key={i} className="bd-social-btn">{s}</button>)}
            </div>
          </div>

          {/* TOC */}
          {post.toc?.length > 0 && (
            <div className="bd-side-card">
              <h4 className="bd-side-title">On This Page</h4>
              {post.toc.map((item,i)=>(
                <div key={i} className={`bd-toc-item${activeSection===i?' bd-toc-active':''}`} style={activeSection===i?{borderLeftColor:accent,color:accent}:{}}>
                  <span className="bd-toc-dot" style={activeSection===i?{background:accent}:{}}></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="bd-side-nl" style={{background:accentLight,borderColor:accentBorder}}>
            <div className="bd-side-nl-icon">✉</div>
            <h4 className="bd-side-nl-title">Get more insights like this</h4>
            <p className="bd-side-nl-sub">Join 12,000+ leaders reading Bloo Insights.</p>
            <input type="email" placeholder="your@email.com" className="bd-side-input"/>
            <button className="bd-side-nl-btn" style={{background:accent}}>Subscribe Now</button>
            <p className="bd-no-spam">✅ No spam. Unsubscribe anytime.</p>
          </div>

          {/* Popular */}
          <div className="bd-side-card">
            <h4 className="bd-side-title">Popular Posts</h4>
            {POPULAR.map((p,i)=>(
              <div key={i} className="bd-pop-item">
                <img src={p.img} alt={p.title} className="bd-pop-img"/>
                <div>
                  <div className="bd-pop-title">{p.title}</div>
                  <div className="bd-pop-meta">{p.time} read</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   CONTENT BLOCKS
════════════════════════════════════════ */
function ContentBlock({ block, accent, accentLight, accentBorder }) {
  switch (block.type) {
    case 'intro':
      return <p className="bd-intro">{block.text}</p>;
    case 'p':
      return <p className="bd-p">{block.text}</p>;
    case 'h2':
      return <h2 className="bd-h2 bd-section-anchor">{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="bd-quote" style={{borderLeftColor:accent}}>
          <div className="bd-quote-mark" style={{color:accent}}>"</div>
          <p className="bd-quote-text">{block.text}</p>
          {block.attr && <cite className="bd-quote-attr" style={{color:accent}}>— {block.attr}</cite>}
        </blockquote>
      );
    case 'callout':
      return (
        <div className="bd-callout" style={{background:accentLight,borderColor:accentBorder}}>
          <div className="bd-callout-icon" style={{color:accent}}>💡</div>
          <div>
            <div className="bd-callout-title" style={{color:accent}}>{block.title}</div>
            <p className="bd-callout-text">{block.text}</p>
          </div>
        </div>
      );
    case 'stats':
      return (
        <div className="bd-stats-grid" style={{background:accentLight,borderColor:accentBorder}}>
          {block.items.map((s,i)=>(
            <div key={i} className="bd-stat-card">
              <div className="bd-stat-val" style={{color:accent}}>{s.value}</div>
              <div className="bd-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case 'outcomeCards':
      return (
        <div className="bd-outcome-grid">
          {block.items.map((s,i)=>(
            <div key={i} className="bd-outcome-card" style={{borderTopColor:accent}}>
              <div className="bd-outcome-icon">{s.icon}</div>
              <div className="bd-outcome-val" style={{color:accent}}>{s.value}</div>
              <div className="bd-outcome-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case 'timeline':
      return (
        <div className="bd-timeline">
          {block.items.map((item,i)=>(
            <div key={i} className="bd-tl-item">
              <div className="bd-tl-marker" style={{background:accent}}>
                <span className="bd-tl-label">{item.label}</span>
              </div>
              <div className="bd-tl-body">
                <div className="bd-tl-heading">{item.heading}</div>
                <p className="bd-tl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'image':
      return (
        <figure className="bd-image">
          <img src={block.src} alt={block.caption||''} className="bd-image-img"/>
          {block.caption && <figcaption className="bd-image-cap">{block.caption}</figcaption>}
        </figure>
      );
    case 'list':
      return (
        <div className="bd-list-box">
          {block.title && <h3 className="bd-list-title">{block.title}</h3>}
          <ul className="bd-list">
            {block.items.map((item,i)=>(
              <li key={i} className="bd-list-item">
                <span className="bd-list-check" style={{color:accent}}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'table':
      return (
        <div className="bd-table-wrap">
          {block.title && <h3 className="bd-table-title">{block.title}</h3>}
          <div className="bd-table-scroll">
            <table className="bd-table">
              <thead>
                <tr>{block.cols.map((c,i)=><th key={i} style={i===0?{}:{textAlign:'center'}}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row,i)=>(
                  <tr key={i}>{row.map((cell,j)=><td key={j} style={j===0?{fontWeight:600}:{textAlign:'center'}}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'bigStat':
      return (
        <div className="bd-big-stat">
          <div className="bd-big-val" style={{color:accent}}>{block.value}</div>
          <div className="bd-big-label">{block.label}</div>
          {block.context && <p className="bd-big-context">{block.context}</p>}
        </div>
      );
    default:
      return null;
  }
}

/* ════════════════════════════════════════
   APP ROOT
════════════════════════════════════════ */
export default function App() {
  const [currentPost, setCurrentPost] = useState(null);

  return currentPost
    ? <BlogDetail post={currentPost} onBack={() => setCurrentPost(null)} />
    : <BlogPage onOpen={setCurrentPost} />;
}

/* ════════════════════════════════════════
   GLOBAL CSS
════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

/* ─── TOKENS ─── */
:root {
  --ink: #0a0a0a;
  --ink2: #374151;
  --muted: #6b7280;
  --lighter: #9ca3af;
  --border: #e5e7eb;
  --surface: #f9fafb;
  --white: #fff;
  --serif: 'Playfair Display', Georgia, serif;
  --sans: 'Sora', system-ui, sans-serif;
  --radius: 16px;
  --radius-sm: 10px;
}

/* ─── LISTING ROOT ─── */
.bl-root {
  font-family: var(--sans);
  background: var(--white);
  color: var(--ink);
  min-height: 100vh;
}

/* HERO */
.bl-hero {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0;
}
.bl-hero-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 72px 48px 0;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 56px;
  align-items: center;
}
.bl-hero-left { display: flex; flex-direction: column; gap: 20px; }
.bl-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: #16a34a;
}
.bl-hero-h {
  font-family: var(--serif);
  font-size: clamp(36px, 4.5vw, 58px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: var(--ink);
}
.bl-hero-sub { font-size: 16px; color: var(--muted); line-height: 1.8; max-width: 400px; }
.bl-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.bl-hero-right { display: flex; justify-content: flex-end; }
.bl-hero-card {
  width: 100%; border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid var(--border);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  position: relative;
}
.bl-hero-img { width: 100%; display: block; height: 300px; object-fit: cover; }
.bl-hero-badge {
  position: absolute; bottom: 16px; left: 16px;
  background: rgba(255,255,255,0.95);
  border: 1px solid var(--border);
  border-radius: 30px;
  padding: 6px 14px;
  font-size: 12px; font-weight: 600; color: var(--ink);
  display: flex; align-items: center; gap: 7px;
  backdrop-filter: blur(4px);
}
.bl-badge-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #16a34a;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
.bl-stat-strip {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border-top: 1px solid var(--border);
  margin-top: 40px;
}
.bl-stat-item {
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-right: 1px solid var(--border);
}
.bl-stat-item:last-child { border-right: none; }
.bl-stat-val {
  font-family: var(--serif); font-size: 28px; font-weight: 900;
  color: var(--ink); letter-spacing: -0.5px;
}
.bl-stat-lbl { font-size: 12px; color: var(--muted); font-weight: 500; }

/* CONTAINER */
.bl-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 48px 100px;
}

/* FILTER */
.bl-filter-row {
  display: flex; flex-wrap: wrap; gap: 8px;
  padding: 36px 0 28px;
}
.bl-filter {
  padding: 8px 20px;
  border-radius: 30px;
  border: 1.5px solid var(--border);
  background: var(--white);
  font-family: var(--sans);
  font-size: 12px; font-weight: 600; color: var(--muted);
  cursor: pointer; transition: all 0.2s;
}
.bl-filter:hover { border-color: #16a34a; color: #16a34a; }
.bl-filter-on { background: var(--ink) !important; border-color: var(--ink) !important; color: #fff !important; }

/* FEATURED */
.bl-featured {
  display: grid; grid-template-columns: 1.3fr 1fr;
  border-radius: 20px;
  border: 1.5px solid var(--border);
  overflow: hidden;
  margin-bottom: 36px;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
}
.bl-featured:hover {
  border-color: #16a34a;
  box-shadow: 0 20px 60px rgba(22,163,74,0.12);
  transform: translateY(-2px);
}
.bl-featured-img-wrap { position: relative; overflow: hidden; min-height: 380px; }
.bl-featured-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
.bl-featured:hover .bl-featured-img { transform: scale(1.05); }
.bl-featured-overlay { position: absolute; bottom: 16px; left: 16px; }
.bl-cat-pill {
  display: inline-block;
  font-size: 10px; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase; color: #fff;
  border-radius: 30px; padding: 5px 14px;
}
.bl-featured-body {
  padding: 44px 40px;
  display: flex; flex-direction: column; gap: 16px;
  justify-content: center;
  border-left: 1px solid var(--border);
}
.bl-featured-top-label {
  font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
  text-transform: uppercase; color: #16a34a;
}
.bl-featured-title {
  font-family: var(--serif);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 900; color: var(--ink);
  line-height: 1.2; letter-spacing: -0.3px;
}
.bl-featured-excerpt { font-size: 14px; color: var(--muted); line-height: 1.8; }
.bl-featured-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.bl-tag {
  font-size: 10px; font-weight: 600; color: #374151;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 30px; padding: 3px 10px;
}
.bl-featured-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.bl-meta-name { font-size: 13px; font-weight: 700; color: var(--ink); }
.bl-meta-role { font-size: 11px; color: var(--muted); margin-top: 1px; }
.bl-meta-pill {
  font-size: 11px; color: var(--muted);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 3px 10px;
}
.bl-read-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--sans); font-size: 13px; font-weight: 700;
  background: transparent;
  border: 1.5px solid;
  border-radius: var(--radius-sm);
  padding: 10px 20px;
  cursor: pointer; transition: all 0.2s;
  width: fit-content;
}
.bl-read-btn:hover { opacity: 0.8; }
.bl-arrow { transition: transform 0.2s; }
.bl-read-btn:hover .bl-arrow { transform: translateX(4px); }

/* MAIN GRID + SIDEBAR */
.bl-main { display: grid; grid-template-columns: 1fr 300px; gap: 44px; align-items: start; }
.bl-grid-section {}
.bl-section-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.bl-section-title {
  font-family: var(--serif); font-size: 22px;
  font-weight: 900; color: var(--ink); letter-spacing: -0.3px;
}
.bl-view-all { font-size: 13px; font-weight: 700; color: #16a34a; cursor: pointer; }
.bl-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }

/* CARD */
.bl-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  display: flex; flex-direction: column;
  position: relative;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.bl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  border-color: transparent;
}
.bl-card-accent {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.bl-card:hover .bl-card-accent { transform: scaleX(1); }
.bl-card-img-wrap { height: 190px; overflow: hidden; position: relative; }
.bl-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.bl-card:hover .bl-card-img { transform: scale(1.07); }
.bl-cat-pill-card { position: absolute; top: 12px; left: 12px; }
.bl-card-body { padding: 20px 20px 20px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
.bl-card-title {
  font-family: var(--serif);
  font-size: 16px; font-weight: 800; color: var(--ink);
  line-height: 1.35; letter-spacing: -0.2px;
}
.bl-card-excerpt { font-size: 13px; color: var(--muted); line-height: 1.7; flex: 1; }
.bl-card-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.bl-tag-sm {
  font-size: 10px; font-weight: 600; color: var(--muted);
  border: 1px solid var(--border); border-radius: 20px; padding: 2px 8px;
}
.bl-card-footer {
  display: flex; align-items: center; gap: 7px;
  padding-top: 12px; border-top: 1px solid var(--border);
  font-size: 12px; color: var(--muted);
}
.bl-card-arrow { margin-left: auto; font-size: 14px; font-weight: 700; transition: transform 0.2s; }
.bl-card:hover .bl-card-arrow { transform: translateX(4px); }
.bl-dot { color: #d1d5db; }

/* AVATARS */
.bl-av-xs { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }
.bl-av-sm { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }

/* SIDEBAR */
.bl-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 24px; }
.bl-side-box {
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 16px; padding: 22px 20px;
}
.bl-side-title {
  font-size: 14px; font-weight: 800; color: var(--ink);
  margin-bottom: 16px; letter-spacing: -0.1px;
}
.bl-pop-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
.bl-pop-img { width: 52px; height: 52px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.bl-pop-title { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.4; }
.bl-pop-meta { font-size: 11px; color: var(--muted); margin-top: 3px; }
.bl-view-all-link { font-size: 12px; font-weight: 700; color: #16a34a; cursor: pointer; display: inline-block; margin-top: 4px; }
.bl-tags-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
.bl-cloud-tag {
  font-size: 11px; font-weight: 600; color: var(--ink2);
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 4px 10px; cursor: pointer;
  transition: all 0.15s;
}
.bl-cloud-tag:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
.bl-side-newsletter {
  background: #0a0a0a; border-radius: 16px; padding: 22px 20px;
  display: flex; flex-direction: column; gap: 10px; overflow: hidden; position: relative;
}
.bl-side-newsletter::before {
  content: ''; position: absolute; top: -30%; right: -20%;
  width: 60%; height: 160%;
  background: radial-gradient(ellipse, rgba(22,163,74,0.25) 0%, transparent 70%);
  pointer-events: none;
}
.bl-side-nl-icon { font-size: 24px; }
.bl-side-nl-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.4; }
.bl-side-nl-sub { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.6; }
.bl-side-input {
  border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.07);
  color: #fff; font-family: var(--sans); font-size: 12px;
  border-radius: 8px; padding: 9px 12px; outline: none; width: 100%;
}
.bl-side-input::placeholder { color: rgba(255,255,255,0.35); }
.bl-no-spam { font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; }

/* BUTTONS */
.bl-btn-green {
  background: #16a34a; color: #fff; border: none;
  padding: 12px 26px; border-radius: var(--radius-sm);
  font-family: var(--sans); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
}
.bl-btn-green:hover { background: #15803d; transform: translateY(-1px); }
.bl-btn-full { width: 100%; text-align: center; }
.bl-btn-outline {
  background: transparent; color: var(--ink);
  border: 1.5px solid var(--border);
  padding: 11px 22px; border-radius: var(--radius-sm);
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.bl-btn-outline:hover { border-color: #16a34a; color: #16a34a; }
.bl-btn-ghost-light {
  background: transparent; color: #fff;
  border: 1.5px solid rgba(255,255,255,0.25);
  padding: 12px 22px; border-radius: var(--radius-sm);
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.bl-btn-ghost-light:hover { border-color: rgba(255,255,255,0.5); }

/* BOTTOM CTA */
.bl-cta {
  margin-top: 44px; background: var(--ink);
  border-radius: 20px; overflow: hidden; position: relative;
}
.bl-cta-glow {
  position: absolute; top: -40%; right: -10%;
  width: 50%; height: 180%;
  background: radial-gradient(ellipse, rgba(22,163,74,0.2) 0%, transparent 70%);
  pointer-events: none;
}
.bl-cta-content {
  padding: 44px 52px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap; position: relative; z-index: 1;
}
.bl-cta-title {
  font-family: var(--serif); font-size: 26px; font-weight: 900;
  color: #fff; margin-bottom: 6px; letter-spacing: -0.3px;
}
.bl-cta-sub { font-size: 14px; color: rgba(255,255,255,0.55); }
.bl-cta-btns { display: flex; gap: 10px; flex-shrink: 0; }

/* ═══════════════════════════════════
   DETAIL PAGE
═══════════════════════════════════ */
.bd-root { font-family: var(--sans); background: var(--white); color: var(--ink); }

/* Progress bar */
.bd-progress {
  position: fixed; top: 0; left: 0; height: 3px;
  z-index: 1000; transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

/* Sticky topbar */
.bd-topbar {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.95);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
  padding: 0 40px;
  display: grid; grid-template-columns: 180px 1fr 180px;
  align-items: center; height: 56px;
}
.bd-back-btn {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--sans); font-size: 13px; font-weight: 700;
  color: var(--ink); background: transparent; border: none;
  cursor: pointer; transition: all 0.2s; padding: 0;
}
.bd-back-btn:hover { color: #16a34a; }
.bd-back-arrow {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--surface); border: 1px solid var(--border);
  font-size: 14px; transition: all 0.2s; flex-shrink: 0;
}
.bd-back-btn:hover .bd-back-arrow {
  background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; transform: translateX(-2px);
}
.bd-topbar-center {
  font-size: 13px; font-weight: 600; color: var(--muted);
  text-align: center; overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis; padding: 0 20px;
}
.bd-topbar-right { text-align: right; font-size: 12px; color: var(--muted); }

/* HERO */
.bd-hero { padding: 60px 0 0; }
.bd-hero-inner {
  max-width: 1320px; margin: 0 auto; padding: 0 48px 60px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;
}
.bd-hero-left { display: flex; flex-direction: column; gap: 18px; }
.bd-breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--muted);
}
.bd-breadlink { cursor: pointer; transition: color 0.15s; }
.bd-breadlink:hover { color: #16a34a; }
.bd-breadsep { color: #d1d5db; }
.bd-breadcat { font-weight: 700; }
.bd-category-badge {
  display: inline-block;
  font-size: 10px; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase; color: #fff;
  border-radius: 30px; padding: 5px 16px; width: fit-content;
}
.bd-hero-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900; line-height: 1.1;
  letter-spacing: -1px; color: var(--ink);
}
.bd-hero-excerpt { font-size: 16px; color: var(--muted); line-height: 1.8; }
.bd-hero-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.bd-tag {
  font-size: 11px; font-weight: 600;
  border: 1px solid; border-radius: 30px; padding: 4px 12px;
}
.bd-hero-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.bd-av-lg { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--border); flex-shrink: 0; }
.bd-av-md { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); flex-shrink: 0; }
.bd-av-xs { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }
.bd-meta-name { font-size: 14px; font-weight: 700; color: var(--ink); }
.bd-meta-role { font-size: 12px; color: var(--muted); margin-top: 2px; }
.bd-meta-pills { display: flex; gap: 8px; flex-wrap: wrap; }
.bd-meta-pill {
  font-size: 11px; color: var(--muted); background: var(--surface);
  border: 1px solid var(--border); border-radius: 20px; padding: 4px 10px;
}
.bd-hero-right {}
.bd-hero-img-frame {
  border-radius: 20px; overflow: hidden; border: 2px solid;
  box-shadow: 0 24px 64px rgba(0,0,0,0.1); position: relative;
}
.bd-hero-img { width: 100%; height: 340px; object-fit: cover; display: block; }
.bd-hero-img-badge {
  position: absolute; bottom: 16px; right: 16px;
  color: #fff; font-size: 10px; font-weight: 800;
  letter-spacing: 0.08em; text-transform: uppercase;
  border-radius: 20px; padding: 5px 14px;
}

/* BODY LAYOUT */
.bd-layout {
  max-width: 1320px; margin: 0 auto; padding: 0 48px 80px;
  display: grid; grid-template-columns: 48px 1fr 320px; gap: 0 36px;
  align-items: start;
}

/* Share */
.bd-share-col { position: sticky; top: 80px; padding-top: 8px; }
.bd-share-sticky { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.bd-share-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.bd-share-btn {
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--surface); border: 1.5px solid var(--border);
  font-size: 13px; font-weight: 700; color: var(--ink);
  cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
}
.bd-share-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }

/* Main Content */
.bd-main { padding: 8px 0; min-width: 0; }

/* CONTENT BLOCKS */
.bd-intro {
  font-size: 18px; font-weight: 500; color: var(--ink2);
  line-height: 1.9; margin-bottom: 32px;
  border-left: 3px solid var(--border);
  padding-left: 20px;
}
.bd-p { font-size: 16.5px; color: var(--ink2); line-height: 1.9; margin-bottom: 24px; }
.bd-h2 {
  font-family: var(--serif); font-size: 26px; font-weight: 800;
  color: var(--ink); letter-spacing: -0.3px;
  margin: 44px 0 18px; line-height: 1.25;
}
.bd-section-anchor {}
.bd-quote {
  margin: 36px 0; padding: 28px 32px;
  background: var(--surface); border-left: 4px solid;
  border-radius: 0 14px 14px 0; position: relative;
}
.bd-quote-mark {
  font-family: var(--serif); font-size: 64px;
  line-height: 0.6; margin-bottom: 12px; display: block; opacity: 0.35;
}
.bd-quote-text {
  font-family: var(--serif); font-size: 20px; font-weight: 700;
  color: var(--ink); line-height: 1.5; margin-bottom: 12px;
}
.bd-quote-attr { font-size: 13px; font-weight: 600; color: var(--muted); }
.bd-callout {
  margin: 32px 0; padding: 24px 28px;
  border: 1.5px solid; border-radius: 14px;
  display: flex; align-items: flex-start; gap: 16px;
}
.bd-callout-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
.bd-callout-title { font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
.bd-callout-text { font-size: 14.5px; color: var(--ink2); line-height: 1.7; }
.bd-stats-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 0; margin: 32px 0;
  border: 1.5px solid; border-radius: 16px; overflow: hidden;
}
.bd-stat-card {
  text-align: center; padding: 28px 16px;
  border-right: 1px solid rgba(0,0,0,0.08);
}
.bd-stat-card:last-child { border-right: none; }
.bd-stat-val {
  font-family: var(--serif); font-size: 34px; font-weight: 900;
  letter-spacing: -0.5px; line-height: 1; margin-bottom: 8px;
}
.bd-stat-lbl { font-size: 11.5px; color: var(--muted); font-weight: 600; line-height: 1.4; }
.bd-outcome-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 14px; margin: 32px 0;
}
.bd-outcome-card {
  background: var(--white); border: 1.5px solid var(--border);
  border-top: 3px solid; border-radius: 14px;
  padding: 24px 18px; text-align: center;
  transition: all 0.25s;
}
.bd-outcome-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.bd-outcome-icon { font-size: 28px; margin-bottom: 12px; }
.bd-outcome-val { font-family: var(--serif); font-size: 30px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px; }
.bd-outcome-lbl { font-size: 12px; color: var(--muted); font-weight: 600; line-height: 1.4; }
.bd-timeline { display: flex; flex-direction: column; gap: 0; margin: 32px 0; position: relative; }
.bd-timeline::before {
  content: ''; position: absolute; left: 21px; top: 22px; bottom: 22px;
  width: 1.5px; background: var(--border);
}
.bd-tl-item { display: flex; gap: 20px; padding: 8px 0; position: relative; }
.bd-tl-marker {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; z-index: 1;
}
.bd-tl-label { font-size: 11px; font-weight: 800; color: #fff; letter-spacing: 0.03em; }
.bd-tl-body { padding-top: 6px; padding-bottom: 14px; }
.bd-tl-heading { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.bd-tl-text { font-size: 13.5px; color: var(--muted); line-height: 1.65; }
.bd-image { margin: 32px 0; }
.bd-image-img { width: 100%; border-radius: 16px; object-fit: cover; max-height: 420px; border: 1px solid var(--border); display: block; }
.bd-image-cap { font-size: 12px; color: var(--muted); text-align: center; margin-top: 10px; font-style: italic; }
.bd-list-box {
  margin: 32px 0; padding: 28px 30px;
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 14px;
}
.bd-list-title {
  font-family: var(--serif); font-size: 18px; font-weight: 800;
  color: var(--ink); margin-bottom: 16px;
}
.bd-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.bd-list-item { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; color: var(--ink2); line-height: 1.6; }
.bd-list-check { font-size: 14px; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
.bd-table-wrap { margin: 32px 0; }
.bd-table-title {
  font-family: var(--serif); font-size: 18px; font-weight: 800;
  color: var(--ink); margin-bottom: 14px;
}
.bd-table-scroll { border: 1.5px solid var(--border); border-radius: 14px; overflow-x: auto; }
.bd-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.bd-table thead tr { background: #0f172a; }
.bd-table th {
  text-align: left; color: #fff; font-weight: 700; font-size: 11px;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 14px 20px; white-space: nowrap;
}
.bd-table td {
  padding: 14px 20px; color: var(--ink2);
  border-bottom: 1px solid var(--border);
}
.bd-table tbody tr:last-child td { border-bottom: none; }
.bd-table tbody tr:nth-child(even) { background: var(--surface); }
.bd-big-stat {
  margin: 40px 0; padding: 52px 32px; text-align: center;
  background: var(--ink); border-radius: 18px;
}
.bd-big-val {
  font-family: var(--serif); font-size: clamp(56px, 10vw, 96px);
  font-weight: 900; line-height: 1; letter-spacing: -2px;
}
.bd-big-label {
  font-size: 12px; font-weight: 800; letter-spacing: 0.1em;
  text-transform: uppercase; color: #4ade80; margin-top: 14px;
}
.bd-big-context { font-size: 14px; color: rgba(255,255,255,0.5); margin: 14px auto 0; max-width: 460px; line-height: 1.75; }

/* Author box */
.bd-author-box {
  margin: 52px 0 40px; padding: 28px 32px;
  background: var(--surface); border: 1.5px solid var(--border);
  border-left: 4px solid; border-radius: 0 16px 16px 0;
  display: flex; gap: 22px; align-items: flex-start;
}
.bd-author-av { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2.5px solid var(--border); }
.bd-author-label { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
.bd-author-name { font-family: var(--serif); font-size: 20px; font-weight: 800; color: var(--ink); margin-bottom: 2px; }
.bd-author-role { font-size: 13px; color: var(--muted); margin-bottom: 10px; }
.bd-author-bio { font-size: 14px; color: var(--ink2); line-height: 1.65; }

/* Related */
.bd-related { margin-bottom: 44px; }
.bd-related-hdr { margin-bottom: 22px; }
.bd-related-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-bottom: 6px; }
.bd-related-title { font-family: var(--serif); font-size: 26px; font-weight: 900; color: var(--ink); letter-spacing: -0.3px; }
.bd-related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.bd-rcard {
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 16px; overflow: hidden; cursor: pointer;
  transition: all 0.25s;
}
.bd-rcard:hover { border-color: #16a34a; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(22,163,74,0.1); }
.bd-rcard-img-wrap { height: 160px; overflow: hidden; position: relative; }
.bd-rcard-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s ease; }
.bd-rcard:hover .bd-rcard-img { transform: scale(1.06); }
.bd-rcard-cat { position: absolute; top: 10px; left: 10px; font-size: 9px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: #fff; border-radius: 20px; padding: 4px 10px; }
.bd-rcard-body { padding: 16px 18px 20px; }
.bd-rcard-title { font-family: var(--serif); font-size: 14px; font-weight: 800; color: var(--ink); line-height: 1.4; margin-bottom: 10px; }
.bd-rcard-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted); }
.bd-rcard-author { font-weight: 600; }
.bd-rcard-time {}

/* Detail CTA */
.bd-cta {
  background: var(--ink); border-radius: 18px;
  padding: 32px 36px; display: flex; align-items: center;
  gap: 18px; flex-wrap: wrap;
}
.bd-cta-icon {
  width: 52px; height: 52px; border-radius: 50%;
  border: 1.5px solid; display: flex; align-items: center;
  justify-content: center; font-size: 22px; flex-shrink: 0;
}
.bd-cta-copy { flex: 1; }
.bd-cta-title { font-family: var(--serif); font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 4px; }
.bd-cta-sub { font-size: 13px; color: rgba(255,255,255,0.55); }
.bd-cta-btn {
  color: #fff; border: none; padding: 12px 26px;
  border-radius: var(--radius-sm); font-family: var(--sans);
  font-size: 13px; font-weight: 700; cursor: pointer;
  transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
}
.bd-cta-btn:hover { opacity: 0.85; transform: translateY(-1px); }
.bd-cta-ghost {
  background: transparent; color: #fff;
  border: 1.5px solid rgba(255,255,255,0.25);
  padding: 11px 22px; border-radius: var(--radius-sm);
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
}
.bd-cta-ghost:hover { border-color: rgba(255,255,255,0.5); }

/* Right sidebar */
.bd-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 72px; }
.bd-side-card {
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 16px; padding: 22px 20px;
}
.bd-side-title { font-size: 14px; font-weight: 800; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.1px; }
.bd-side-author-row { display: flex; gap: 12px; align-items: center; margin-bottom: 10px; }
.bd-side-author-name { font-size: 14px; font-weight: 700; color: var(--ink); }
.bd-side-author-role { font-size: 12px; color: var(--muted); margin-top: 2px; }
.bd-side-author-bio { font-size: 12.5px; color: var(--muted); line-height: 1.65; margin-bottom: 12px; }
.bd-social-row { display: flex; gap: 8px; }
.bd-social-btn {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; cursor: pointer; font-weight: 700;
  color: var(--ink); background: var(--surface);
  transition: all 0.15s;
}
.bd-social-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
.bd-toc-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px 8px 0; border-left: 2px solid transparent;
  font-size: 13px; color: var(--muted); cursor: pointer;
  transition: all 0.2s; padding-left: 10px; margin-left: -10px;
  border-radius: 0 6px 6px 0;
}
.bd-toc-item:hover { color: var(--ink); background: var(--surface); }
.bd-toc-active { font-weight: 700; background: #f0fdf4; }
.bd-toc-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  background: var(--border); transition: background 0.2s;
}
.bd-side-nl {
  border: 1.5px solid; border-radius: 16px;
  padding: 22px 20px; display: flex; flex-direction: column; gap: 10px;
}
.bd-side-nl-icon { font-size: 28px; }
.bd-side-nl-title { font-size: 14px; font-weight: 800; color: var(--ink); line-height: 1.4; }
.bd-side-nl-sub { font-size: 12px; color: var(--muted); line-height: 1.6; }
.bd-side-input {
  width: 100%; border: 1.5px solid var(--border); background: var(--white);
  font-family: var(--sans); font-size: 12px;
  border-radius: 8px; padding: 9px 12px; outline: none; color: var(--ink);
}
.bd-side-nl-btn {
  width: 100%; color: #fff; border: none;
  padding: 11px; border-radius: 8px;
  font-family: var(--sans); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
}
.bd-side-nl-btn:hover { opacity: 0.85; }
.bd-no-spam { font-size: 10px; color: var(--muted); text-align: center; }
.bd-pop-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
.bd-pop-img { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
.bd-pop-title { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.4; }
.bd-pop-meta { font-size: 11px; color: var(--muted); margin-top: 3px; }

/* RESPONSIVE */
@media (max-width: 1200px) {
  .bl-grid { grid-template-columns: repeat(2,1fr); }
  .bl-main { grid-template-columns: 1fr 280px; }
  .bd-layout { grid-template-columns: 40px 1fr 280px; }
}
@media (max-width: 900px) {
  .bl-hero-inner { grid-template-columns: 1fr; }
  .bl-hero-right { display: none; }
  .bl-featured { grid-template-columns: 1fr; }
  .bl-featured-img-wrap { min-height: 220px; height: 220px; }
  .bl-featured-body { border-left: none; border-top: 1px solid var(--border); }
  .bl-main { grid-template-columns: 1fr; }
  .bl-sidebar { display: none; }
  .bd-hero-inner { grid-template-columns: 1fr; }
  .bd-hero-right { display: none; }
  .bd-layout { grid-template-columns: 0 1fr 0; gap: 0; }
  .bd-share-col { display: none; }
  .bd-sidebar { display: none; }
  .bd-related-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .bl-hero-inner, .bl-container { padding-left: 20px; padding-right: 20px; }
  .bl-grid { grid-template-columns: 1fr; }
  .bl-stat-strip { grid-template-columns: repeat(2,1fr); padding: 0 20px; }
  .bd-layout { padding: 0 20px 60px; }
  .bd-stats-grid { grid-template-columns: repeat(2,1fr); }
  .bd-outcome-grid { grid-template-columns: repeat(2,1fr); }
  .bd-topbar { padding: 0 20px; grid-template-columns: auto 1fr auto; }
  .bd-topbar-center { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
`;