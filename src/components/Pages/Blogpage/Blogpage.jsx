import React, { useState, useEffect, useRef } from 'react';

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const POSTS = [
  {
    id: 1, slug: 'healthtech-mvp-in-6-weeks', category: 'Case Study',
    accent: '#16a34a', accentLight: '#f0fdf4', accentBorder: '#bbf7d0',
    tags: ['HealthTech', 'MVP', 'Agile', 'Startup'],
    title: 'How We Took a HealthTech Idea to MVP in 6 Weeks',
    excerpt: "A founder's napkin sketch to a working product investors could actually click through — inside the 42-day sprint that closed a $1.2M round.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    date: 'June 2, 2026', readTime: '6 min read', views: '2.4K',
    author: { name: 'Ananya Rao', role: 'Lead Product Strategist', avatar: 'https://i.pravatar.cc/120?img=47', bio: 'Helping teams turn ideas into impactful products users love. 8 years shipping B2B SaaS.' },
    toc: ['Introduction', 'The Challenge', 'Week-by-Week Breakdown', 'Key Outcomes', 'Lessons Learned'],
    blocks: [
      { type: 'intro', text: 'When the founder walked in with a napkin sketch and a hard deadline, the brief was simple to say and hard to do: a working product investors could click through in six weeks, not a deck about one.' },
      { type: 'stats', items: [{ value: '6', label: 'Weeks to demo' }, { value: '3', label: 'Engineers' }, { value: '42', label: 'User interviews' }, { value: '$1.2M', label: 'Raised post-demo' }] },
      { type: 'h2', text: 'The Challenge' },
      { type: 'p', text: "The founders had a strong problem statement but no product, no tech architecture, and a tight investor deadline. The original concept covered booking, billing, triage, and a patient portal — far too much for six weeks. We sat with the founder and crossed out everything that wasn't the actual bet being tested." },
      { type: 'quote', text: 'The moment we stopped designing for every future user and started designing for the next forty, the whole sprint sped up.', attr: 'Founder, on the week-two pivot' },
      { type: 'h2', text: 'Week-by-Week Breakdown' },
      { type: 'timeline', items: [
        { label: 'W1', heading: 'Scope cut to one flow', text: 'Booking, billing, and the patient portal were shelved. Only symptom-to-specialist matching survived.' },
        { label: 'W2', heading: 'First clickable prototype', text: 'Rough, embarrassing, and real enough to put in front of an actual patient.' },
        { label: 'W3', heading: 'Matching screen rebuilt twice', text: 'Real users hesitated in the same spot both times — that told us exactly what to fix.' },
        { label: 'W4', heading: 'Specialist matching logic finalized', text: 'Ninety seconds, start to confirmed booking, across forty test patients.' },
        { label: 'W5', heading: 'Investor demo script locked', text: 'No slides walked through — the founder handed people a phone instead.' },
        { label: 'W6', heading: 'Demo day', text: 'Round closed on the strength of a product people could use themselves.' },
      ]},
      { type: 'image', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop', caption: 'The team mapping flows on day 3 of the sprint.' },
      { type: 'h2', text: 'Key Outcomes' },
      { type: 'outcomeCards', items: [
        { icon: '⚡', value: '40%', label: 'Faster time to market' },
        { icon: '📈', value: '2.3x', label: 'Higher user engagement' },
        { icon: '🛠', value: '35%', label: 'Reduced dev overhead' },
        { icon: '✅', value: '100%', label: 'Investor-ready MVP' },
      ]},
      { type: 'h2', text: 'Lessons Learned' },
      { type: 'p', text: "Six weeks after the first sketch, the founder closed a round on the strength of a demo that took ninety seconds to run. The lesson wasn't speed for its own sake — it was that cutting scope ruthlessly enough is what makes speed possible at all." },
      { type: 'callout', title: 'Why it worked', text: "Investors weren't shown a roadmap. They were handed a phone and asked to book an appointment themselves. The product argued its own case." },
    ],
  },
  {
    id: 2, slug: 'choosing-a-tech-stack', category: 'Tech',
    accent: '#2563eb', accentLight: '#eff6ff', accentBorder: '#bfdbfe',
    tags: ['Architecture', 'Engineering', 'Best Practices'],
    title: "Choosing a Tech Stack That Won't Hurt You Later",
    excerpt: 'The framework we use with every new client before a single line of code gets written — and the three questions that actually matter.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    date: 'May 24, 2026', readTime: '8 min read', views: '1.8K',
    author: { name: 'Marcus Chen', role: 'Principal Engineer', avatar: 'https://i.pravatar.cc/120?img=12', bio: 'Systems thinker. Has survived three major migrations and refuses to repeat them.' },
    toc: ['Why Stack Decisions Are Hard', 'The Three Questions', 'Framework vs Language', 'The Rule of Thumb'],
    blocks: [
      { type: 'intro', text: "Every stack decision is really a bet on what will be hard to change later. Teams rarely regret a slow API as much as they regret a data model they can't safely migrate, or a framework with no path off it." },
      { type: 'list', title: 'The three questions we always ask first', items: ['What will this team still be maintaining in three years?', 'Where does the data actually live, and how hard is it to move?', 'What happens the day the lead engineer leaves?'] },
      { type: 'h2', text: 'The Framework over the Language' },
      { type: 'p', text: "Language choice gets most of the debate and deserves the least of it. Two competent teams can ship the same product in Python or in Go. What actually compounds over time is the framework's opinionatedness — how much it decides for you versus how much it leaves open." },
      { type: 'table', title: 'How we score a framework before committing', cols: ['Criteria', 'Loosely opinionated', 'Strongly opinionated'], rows: [['Initial velocity', '🟢 Fast', '🟡 Moderate'], ['Velocity at month 12', '🔴 Slows sharply', '🟢 Stays steady'], ['Onboarding a new hire', '🔴 Tribal knowledge', '🟢 Documented conventions'], ['Migration risk later', '🔴 High', '🟡 Low to moderate']] },
      { type: 'quote', text: 'The best migration is the one you never have to run.', attr: 'Marcus Chen, Principal Engineer' },
      { type: 'callout', title: 'Rule of thumb', text: "If you can't explain the data model to a new hire in under ten minutes, the stack is already working against you." },
    ],
  },
  {
    id: 3, slug: 'growth-loops-no-ad-spend', category: 'Growth',
    accent: '#9333ea', accentLight: '#faf5ff', accentBorder: '#e9d5ff',
    tags: ['Growth', 'Product-Led', 'Retention'],
    title: "Growth Loops That Don't Rely on Ad Spend",
    excerpt: 'Three early-stage products that grew almost entirely through product mechanics — and why that compounding effect holds up far longer.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    date: 'May 14, 2026', readTime: '5 min read', views: '2.1K',
    author: { name: 'Priya Nair', role: 'Growth Lead', avatar: 'https://i.pravatar.cc/120?img=32', bio: 'Product-led growth practitioner. Believes the best marketing is a product worth talking about.' },
    toc: ['The Problem with Paid Ads', 'What Makes a Real Loop', 'Three Case Studies', 'The Pattern Worth Stealing'],
    blocks: [
      { type: 'intro', text: "Ad spend buys attention, not durability. The products we've watched compound fastest over a year or more share something in common: their growth was built into the product itself." },
      { type: 'stats', items: [{ value: '0%', label: 'From paid ads' }, { value: '4.2x', label: 'Referral signups' }, { value: '11mo', label: 'To first 100K users' }, { value: '92%', label: 'Organic growth' }] },
      { type: 'h2', text: 'The Loop Has to Be a Byproduct' },
      { type: 'p', text: "The weakest growth loops are the ones bolted on as a separate 'invite friends' screen nobody opens. The strongest ones happen because using the product correctly produces something the next person needs to see." },
      { type: 'callout', title: 'A pattern worth stealing', text: "Ask: what does a satisfied user naturally produce that a new user would need? If the answer is 'nothing,' the loop has to be designed, not assumed." },
      { type: 'bigStat', value: '92%', label: "Of new signups came through someone else's account", context: 'Across the three products we studied, almost none of that sharing was incentivized — it was just what using the product correctly looked like.' },
      { type: 'p', text: "None of this means paid acquisition is wrong — it means it should accelerate a loop that already works, not substitute for one that doesn't exist yet." },
    ],
  },
  {
    id: 4, slug: 'design-reviews', category: 'Product',
    accent: '#ea580c', accentLight: '#fff7ed', accentBorder: '#fed7aa',
    tags: ['Design', 'Process', 'Collaboration'],
    title: "Design Reviews That Don't Waste Everyone's Time",
    excerpt: 'A four-part structure for critique sessions that actually move work forward, instead of turning into a thirty-minute opinion swap.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    date: 'April 30, 2026', readTime: '4 min read', views: '1.2K',
    author: { name: 'Ananya Rao', role: 'Lead Product Strategist', avatar: 'https://i.pravatar.cc/120?img=47', bio: 'Helping teams turn ideas into impactful products users love. 8 years shipping B2B SaaS.' },
    toc: ['Why Reviews Fail', 'The Four-Part Structure', 'Write Before You Speak', 'Who Runs the Room'],
    blocks: [
      { type: 'intro', text: "Most design reviews fail for the same reason: everyone in the room is reacting to the screen, not to the problem the screen is trying to solve. Fix the order of operations and the meeting fixes itself." },
      { type: 'list', title: 'The four-part structure we use', items: ['State the problem out loud before showing anything', 'Show the work without narrating or defending it', 'Collect reactions silently in writing first', 'Discuss only after everyone has already written something down'] },
      { type: 'quote', text: 'Silence before discussion is the single highest-leverage change you can make to a critique session.', attr: 'Ananya Rao' },
      { type: 'p', text: "Writing first means the loudest person in the room doesn't set the frame for everyone else's feedback. It sounds small. It changes the entire texture of the meeting." },
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
      <style>{CSS}</style>

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
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop" alt="dashboard" className="bl-hero-img"/>
              <div className="bl-hero-badge"><span className="bl-badge-dot"/><span>4 new posts this month</span></div>
            </div>
          </div>
        </div>
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
        <div className="bl-filter-row">
          {CATS.map(c=>(
            <button key={c} className={`bl-filter${cat===c?' bl-filter-on':''}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>

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
              <div className="bl-featured-tags">{featured.tags.map(t=><span key={t} className="bl-tag">{t}</span>)}</div>
              <div className="bl-featured-meta">
                <img src={featured.author.avatar} alt={featured.author.name} className="bl-av-sm"/>
                <div><div className="bl-meta-name">{featured.author.name}</div><div className="bl-meta-role">{featured.author.role}</div></div>
                <span className="bl-meta-pill">{featured.date}</span>
                <span className="bl-meta-pill">{featured.readTime}</span>
              </div>
              <button className="bl-read-btn" style={{borderColor:featured.accent,color:featured.accent}}>Read article <span className="bl-arrow">→</span></button>
            </div>
          </article>
        )}

        <div className="bl-main">
          <div className="bl-grid-section">
            <div className="bl-section-hdr">
              <h2 className="bl-section-title">Latest Articles</h2>
              <span className="bl-view-all">View all →</span>
            </div>
            <div className="bl-grid">
              {grid.map(post=>(
                <article key={post.id} className="bl-card" onClick={()=>onOpen(post)}>
                  <div className="bl-card-img-wrap">
                    <img src={post.image} alt={post.title} className="bl-card-img"/>
                    <span className="bl-cat-pill bl-cat-pill-card" style={{background:post.accent}}>{post.category}</span>
                  </div>
                  <div className="bl-card-body">
                    <h3 className="bl-card-title">{post.title}</h3>
                    <p className="bl-card-excerpt">{post.excerpt}</p>
                    <div className="bl-card-tags">{post.tags.slice(0,2).map(t=><span key={t} className="bl-tag-sm">{t}</span>)}</div>
                    <div className="bl-card-footer">
                      <img src={post.author.avatar} alt={post.author.name} className="bl-av-xs"/>
                      <span className="bl-meta-name">{post.author.name}</span>
                      <span className="bl-dot">·</span>
                      <span className="bl-meta-role">{post.readTime}</span>
                      <span className="bl-card-arrow" style={{color:post.accent}}>→</span>
                    </div>
                  </div>
                  <div className="bl-card-accent" style={{background:post.accent}}/>
                </article>
              ))}
            </div>
          </div>

          <aside className="bl-sidebar">
            <div className="bl-side-box">
              <h3 className="bl-side-title">Popular Posts</h3>
              {POPULAR.map((p,i)=>(
                <div key={i} className="bl-pop-item">
                  <img src={p.img} alt={p.title} className="bl-pop-img"/>
                  <div><div className="bl-pop-title">{p.title}</div><div className="bl-pop-meta">{p.time} read</div></div>
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
              <div className="bl-nl-icon">✉</div>
              <h3 className="bl-nl-title">Stay in the loop</h3>
              <p className="bl-nl-sub">Weekly insights on product, tech, and growth.</p>
              <input type="email" placeholder="you@company.com" className="bl-nl-input"/>
              <button className="bl-btn-green" style={{width:'100%'}}>Subscribe →</button>
              <p className="bl-no-spam">No spam, ever.</p>
            </div>
          </aside>
        </div>

        {/* Mobile newsletter — visible only below 900px */}
        <div className="bl-mob-nl">
          <div className="bl-side-box" style={{textAlign:'center'}}>
            <div style={{fontSize:28,marginBottom:8}}>✉</div>
            <h3 className="bl-side-title">Stay in the loop</h3>
            <p style={{fontSize:13,color:'var(--muted)',marginBottom:12,lineHeight:1.6}}>Weekly insights on product, tech, and growth.</p>
            <input type="email" placeholder="you@company.com" className="bl-nl-input-light"/>
            <button className="bl-btn-green" style={{width:'100%',marginTop:8}}>Subscribe →</button>
            <p style={{fontSize:11,color:'var(--muted)',marginTop:8}}>No spam, ever.</p>
          </div>
        </div>

        <div className="bl-cta">
          <div className="bl-cta-glow"/>
          <div className="bl-cta-content">
            <div>
              <h2 className="bl-cta-title">Have a project in mind?</h2>
              <p className="bl-cta-sub">Let's build something impactful together.</p>
            </div>
            <div className="bl-cta-btns">
              <button className="bl-btn-green">Work With Us →</button>
              <button className="bl-btn-ghost">Book a Call</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   BLOG DETAIL — FULLY RESPONSIVE
════════════════════════════════════════ */
function BlogDetail({ post, onBack }) {
  const [scrollPct, setScrollPct]     = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [tocOpen, setTocOpen]         = useState(false);

  const { accent, accentLight, accentBorder } = post;
  const related = POSTS.filter(p => p.id !== post.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setScrollPct(pct);
      const secs = document.querySelectorAll('.bd-anchor');
      let active = 0;
      secs.forEach((s,i)=>{ if(s.getBoundingClientRect().top < 180) active = i; });
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bd-root">
      <style>{CSS}</style>

      {/* ── PROGRESS BAR ── */}
      <div className="bd-progress" style={{width:`${scrollPct}%`,background:accent}}/>

      {/* ── TOPBAR ── */}
      <div className="bd-topbar">
        <button className="bd-back-btn" onClick={onBack}>
          <span className="bd-back-arrow">←</span>
          <span className="bd-back-txt">Back to Blog</span>
        </button>
        <span className="bd-topbar-title">{post.title}</span>
        <div className="bd-topbar-right">
          <span className="bd-topbar-time">{post.readTime}</span>
          {post.toc?.length > 0 && (
            <button className="bd-toc-btn" onClick={()=>setTocOpen(o=>!o)} aria-label="Contents">
              {tocOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE TOC DRAWER ── */}
      {tocOpen && (
        <div className="bd-toc-drawer">
          <p className="bd-toc-drawer-label">On This Page</p>
          {post.toc.map((item,i)=>(
            <div key={i}
              className={`bd-toc-row${activeSection===i?' active':''}`}
              style={activeSection===i?{borderLeftColor:accent,color:accent}:{}}
              onClick={()=>setTocOpen(false)}
            >
              <span className="bd-toc-dot" style={activeSection===i?{background:accent}:{}}/>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <div className="bd-hero" style={{background:`linear-gradient(150deg,${accentLight} 0%,#fff 55%)`}}>
        <div className="bd-hero-inner">

          {/* LEFT — text */}
          <div className="bd-hero-left">
            <div className="bd-breadcrumb">
              <span className="bd-breadlink" onClick={onBack}>Blog</span>
              <span className="bd-breadsep">›</span>
              <span style={{color:accent,fontWeight:700}}>{post.category}</span>
            </div>
            <span className="bd-cat-badge" style={{background:accent}}>{post.category}</span>
            <h1 className="bd-hero-title">{post.title}</h1>
            <p className="bd-hero-excerpt">{post.excerpt}</p>
            <div className="bd-hero-tags">
              {post.tags.map(t=>(
                <span key={t} className="bd-hero-tag" style={{borderColor:accentBorder,color:accent,background:accentLight}}>{t}</span>
              ))}
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
                <span className="bd-meta-pill">👁 {post.views}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — image (desktop only) */}
          <div className="bd-hero-right">
            <div className="bd-hero-img-frame" style={{borderColor:accentBorder}}>
              <img src={post.image} alt={post.title} className="bd-hero-img"/>
              <span className="bd-hero-img-badge" style={{background:accent}}>{post.category}</span>
            </div>
          </div>
        </div>

        {/* MOBILE — hero image shown under text */}
        <div className="bd-hero-img-mobile">
          <img src={post.image} alt={post.title}/>
        </div>
      </div>

      {/* ── BODY GRID ── */}
      <div className="bd-body-wrap">

        {/* Share sidebar */}
        <div className="bd-share-col">
          <div className="bd-share-sticky">
            <p className="bd-share-lbl">Share</p>
            {['𝕏','in','f','🔗'].map((s,i)=>(
              <button key={i} className="bd-share-btn" title={['Twitter','LinkedIn','Facebook','Copy'][i]}>{s}</button>
            ))}
          </div>
        </div>

        {/* Main article */}
        <main className="bd-main">

          {/* Mobile share row */}
          <div className="bd-mobile-share">
            <span className="bd-mobile-share-lbl">Share:</span>
            {['𝕏','in','f','🔗'].map((s,i)=>(
              <button key={i} className="bd-share-btn sm">{s}</button>
            ))}
          </div>

          {/* Content blocks */}
          {post.blocks.map((block,i)=>(
            <ContentBlock key={i} block={block} accent={accent} accentLight={accentLight} accentBorder={accentBorder}/>
          ))}

          {/* Mobile inline author card */}
          <div className="bd-mob-author" style={{borderLeftColor:accent}}>
            <img src={post.author.avatar} alt={post.author.name} className="bd-mob-av"/>
            <div>
              <p className="bd-mob-author-lbl" style={{color:accent}}>Written by</p>
              <p className="bd-mob-author-name">{post.author.name}</p>
              <p className="bd-mob-author-role">{post.author.role}</p>
              <p className="bd-mob-author-bio">{post.author.bio}</p>
            </div>
          </div>

          {/* Mobile inline newsletter */}
          <div className="bd-mob-nl" style={{background:accentLight,borderColor:accentBorder}}>
            <div className="bd-mob-nl-icon">✉</div>
            <h4 className="bd-mob-nl-title">Get more insights like this</h4>
            <p className="bd-mob-nl-sub">Join 12,000+ leaders reading our newsletter.</p>
            <input type="email" placeholder="your@email.com" className="bd-mob-nl-input"/>
            <button className="bd-mob-nl-btn" style={{background:accent}}>Subscribe Now</button>
            <p className="bd-mob-nl-spam">✅ No spam. Unsubscribe anytime.</p>
          </div>

          {/* Desktop author box */}
          <div className="bd-author-box" style={{borderLeftColor:accent}}>
            <img src={post.author.avatar} alt={post.author.name} className="bd-author-av"/>
            <div>
              <p className="bd-author-lbl" style={{color:accent}}>Written By</p>
              <p className="bd-author-name">{post.author.name}</p>
              <p className="bd-author-role">{post.author.role}</p>
              <p className="bd-author-bio">{post.author.bio}</p>
            </div>
          </div>

          {/* Related posts */}
          <div className="bd-related">
            <span className="bd-related-eye" style={{color:accent}}>✦ Keep Reading</span>
            <h2 className="bd-related-title">More From the Blog</h2>
            <div className="bd-related-grid">
              {related.map(r=>(
                <div key={r.id} className="bd-rcard" onClick={onBack}>
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
                      <span>{r.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bd-cta-block">
            <div className="bd-cta-icon" style={{background:accentLight,borderColor:accentBorder}}>💡</div>
            <div className="bd-cta-copy">
              <h3 className="bd-cta-title">Have a product idea?</h3>
              <p className="bd-cta-sub">Let's turn your idea into a real product.</p>
            </div>
            <div className="bd-cta-btns">
              <button className="bd-cta-btn" style={{background:accent}}>Work With Us →</button>
              <button className="bd-cta-ghost">Book a Call</button>
            </div>
          </div>

        </main>

        {/* Right sidebar — desktop only */}
        <aside className="bd-sidebar">

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

          {post.toc?.length > 0 && (
            <div className="bd-side-card">
              <h4 className="bd-side-title">On This Page</h4>
              {post.toc.map((item,i)=>(
                <div key={i}
                  className={`bd-toc-row${activeSection===i?' active':''}`}
                  style={activeSection===i?{borderLeftColor:accent,color:accent}:{}}
                >
                  <span className="bd-toc-dot" style={activeSection===i?{background:accent}:{}}/>
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className="bd-side-nl" style={{background:accentLight,borderColor:accentBorder}}>
            <div style={{fontSize:26,marginBottom:4}}>✉</div>
            <h4 className="bd-side-nl-title">Get more insights</h4>
            <p className="bd-side-nl-sub">Join 12,000+ leaders.</p>
            <input type="email" placeholder="your@email.com" className="bd-side-nl-input"/>
            <button className="bd-side-nl-btn" style={{background:accent}}>Subscribe Now</button>
            <p className="bd-no-spam">✅ No spam. Unsubscribe anytime.</p>
          </div>

          <div className="bd-side-card">
            <h4 className="bd-side-title">Popular Posts</h4>
            {POPULAR.map((p,i)=>(
              <div key={i} className="bd-pop-item">
                <img src={p.img} alt={p.title} className="bd-pop-img"/>
                <div><div className="bd-pop-title">{p.title}</div><div className="bd-pop-meta">{p.time} read</div></div>
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
      return <h2 className="bd-h2 bd-anchor">{block.text}</h2>;
    case 'quote':
      return (
        <blockquote className="bd-quote" style={{borderLeftColor:accent}}>
          <span className="bd-quote-mark" style={{color:accent}}>"</span>
          <p className="bd-quote-text">{block.text}</p>
          {block.attr && <cite className="bd-quote-attr" style={{color:accent}}>— {block.attr}</cite>}
        </blockquote>
      );
    case 'callout':
      return (
        <div className="bd-callout" style={{background:accentLight,borderColor:accentBorder}}>
          <span className="bd-callout-icon" style={{color:accent}}>💡</span>
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
            <div key={i} className="bd-stat-cell">
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
            <div key={i} className="bd-tl-row">
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
        <figure className="bd-figure">
          <img src={block.src} alt={block.caption||''} className="bd-fig-img"/>
          {block.caption && <figcaption className="bd-fig-cap">{block.caption}</figcaption>}
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
                <tr>{block.cols.map((c,i)=><th key={i} style={i>0?{textAlign:'center'}:{}}>{c}</th>)}</tr>
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
          {block.context && <p className="bd-big-ctx">{block.context}</p>}
        </div>
      );
    default: return null;
  }
}

/* ════════════════════════════════════════
   APP ROOT
════════════════════════════════════════ */
export default function App() {
  const [post, setPost] = useState(null);
  return post
    ? <BlogDetail post={post} onBack={()=>setPost(null)}/>
    : <BlogPage onOpen={setPost}/>;
}

/* ════════════════════════════════════════
   CSS — COMPLETE RESPONSIVE STYLES
════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
img{max-width:100%;display:block}

:root{
  --ink:#0a0a0a; --ink2:#374151; --muted:#6b7280; --light:#9ca3af;
  --border:#e5e7eb; --surface:#f9fafb; --white:#fff;
  --serif:'Playfair Display',Georgia,serif;
  --sans:'Sora',system-ui,sans-serif;
  --r:16px; --rsm:10px;
}

/* ══ LISTING ══ */
.bl-root{font-family:var(--sans);background:var(--white);color:var(--ink);min-height:100vh;overflow-x:hidden}

.bl-hero{background:#fff;border-bottom:1px solid var(--border)}
.bl-hero-inner{max-width:1320px;margin:0 auto;padding:64px 48px 0;display:grid;grid-template-columns:1fr 1.1fr;gap:52px;align-items:center}
.bl-hero-left{display:flex;flex-direction:column;gap:18px}
.bl-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#16a34a}
.bl-hero-h{font-family:var(--serif);font-size:clamp(28px,4.5vw,56px);font-weight:900;line-height:1.05;letter-spacing:-1px;color:var(--ink)}
.bl-hero-sub{font-size:15px;color:var(--muted);line-height:1.8;max-width:420px}
.bl-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.bl-hero-right{display:flex;justify-content:flex-end}
.bl-hero-card{width:100%;border-radius:20px;overflow:hidden;border:1.5px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.08);position:relative}
.bl-hero-img{width:100%;height:280px;object-fit:cover;display:block}
.bl-hero-badge{position:absolute;bottom:14px;left:14px;background:rgba(255,255,255,.95);border:1px solid var(--border);border-radius:30px;padding:6px 14px;font-size:12px;font-weight:600;color:var(--ink);display:flex;align-items:center;gap:7px;backdrop-filter:blur(4px)}
.bl-badge-dot{width:8px;height:8px;border-radius:50%;background:#16a34a;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}
.bl-stat-strip{max-width:1320px;margin:36px auto 0;padding:0 48px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border)}
.bl-stat-item{padding:20px 0;display:flex;flex-direction:column;align-items:center;gap:4px;border-right:1px solid var(--border)}
.bl-stat-item:last-child{border-right:none}
.bl-stat-val{font-family:var(--serif);font-size:26px;font-weight:900;color:var(--ink);letter-spacing:-.5px}
.bl-stat-lbl{font-size:12px;color:var(--muted);font-weight:500}

.bl-container{max-width:1320px;margin:0 auto;padding:0 48px 80px}
.bl-filter-row{display:flex;flex-wrap:wrap;gap:8px;padding:30px 0 22px}
.bl-filter{padding:7px 18px;border-radius:30px;border:1.5px solid var(--border);background:var(--white);font-family:var(--sans);font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s}
.bl-filter:hover{border-color:#16a34a;color:#16a34a}
.bl-filter-on{background:var(--ink)!important;border-color:var(--ink)!important;color:#fff!important}

.bl-featured{display:grid;grid-template-columns:1.3fr 1fr;border-radius:20px;border:1.5px solid var(--border);overflow:hidden;margin-bottom:32px;cursor:pointer;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.05)}
.bl-featured:hover{border-color:#16a34a;box-shadow:0 20px 60px rgba(22,163,74,.12);transform:translateY(-2px)}
.bl-featured-img-wrap{position:relative;overflow:hidden;min-height:340px}
.bl-featured-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
.bl-featured:hover .bl-featured-img{transform:scale(1.05)}
.bl-featured-overlay{position:absolute;bottom:14px;left:14px}
.bl-cat-pill{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff;border-radius:30px;padding:5px 14px}
.bl-featured-body{padding:36px 32px;display:flex;flex-direction:column;gap:13px;justify-content:center;border-left:1px solid var(--border)}
.bl-featured-top-label{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#16a34a}
.bl-featured-title{font-family:var(--serif);font-size:clamp(18px,2.2vw,26px);font-weight:900;color:var(--ink);line-height:1.2;letter-spacing:-.3px}
.bl-featured-excerpt{font-size:14px;color:var(--muted);line-height:1.8}
.bl-featured-tags{display:flex;flex-wrap:wrap;gap:6px}
.bl-tag{font-size:10px;font-weight:600;color:#374151;background:var(--surface);border:1px solid var(--border);border-radius:30px;padding:3px 10px}
.bl-featured-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.bl-meta-name{font-size:13px;font-weight:700;color:var(--ink)}
.bl-meta-role{font-size:11px;color:var(--muted);margin-top:1px}
.bl-meta-pill{font-size:11px;color:var(--muted);background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:3px 10px}
.bl-read-btn{display:inline-flex;align-items:center;gap:8px;font-family:var(--sans);font-size:13px;font-weight:700;background:transparent;border:1.5px solid;border-radius:var(--rsm);padding:10px 20px;cursor:pointer;transition:all .2s;width:fit-content}
.bl-read-btn:hover{opacity:.8}
.bl-arrow{transition:transform .2s}
.bl-read-btn:hover .bl-arrow{transform:translateX(4px)}

.bl-main{display:grid;grid-template-columns:1fr 290px;gap:36px;align-items:start}
.bl-grid-section{}
.bl-section-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.bl-section-title{font-family:var(--serif);font-size:20px;font-weight:900;color:var(--ink)}
.bl-view-all{font-size:13px;font-weight:700;color:#16a34a;cursor:pointer}
.bl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

.bl-card{background:var(--white);border:1.5px solid var(--border);border-radius:18px;overflow:hidden;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;position:relative;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.bl-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:transparent}
.bl-card-accent{position:absolute;bottom:0;left:0;right:0;height:3px;transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.bl-card:hover .bl-card-accent{transform:scaleX(1)}
.bl-card-img-wrap{height:175px;overflow:hidden;position:relative}
.bl-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease}
.bl-card:hover .bl-card-img{transform:scale(1.07)}
.bl-cat-pill-card{position:absolute;top:10px;left:10px}
.bl-card-body{padding:18px;flex:1;display:flex;flex-direction:column;gap:9px}
.bl-card-title{font-family:var(--serif);font-size:15px;font-weight:800;color:var(--ink);line-height:1.35}
.bl-card-excerpt{font-size:12.5px;color:var(--muted);line-height:1.7;flex:1}
.bl-card-tags{display:flex;gap:5px;flex-wrap:wrap}
.bl-tag-sm{font-size:10px;font-weight:600;color:var(--muted);border:1px solid var(--border);border-radius:20px;padding:2px 8px}
.bl-card-footer{display:flex;align-items:center;gap:6px;padding-top:10px;border-top:1px solid var(--border);font-size:11.5px;color:var(--muted)}
.bl-card-arrow{margin-left:auto;font-size:14px;font-weight:700;transition:transform .2s}
.bl-card:hover .bl-card-arrow{transform:translateX(4px)}
.bl-dot{color:#d1d5db}
.bl-av-xs{width:20px;height:20px;border-radius:50%;object-fit:cover}
.bl-av-sm{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--border)}

/* Sidebar (desktop) */
.bl-sidebar{display:flex;flex-direction:column;gap:16px;position:sticky;top:24px}
.bl-side-box{background:var(--white);border:1.5px solid var(--border);border-radius:16px;padding:20px 18px}
.bl-side-title{font-size:13px;font-weight:800;color:var(--ink);margin-bottom:14px}
.bl-pop-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:12px}
.bl-pop-img{width:48px;height:48px;border-radius:9px;object-fit:cover;flex-shrink:0}
.bl-pop-title{font-size:12.5px;font-weight:600;color:var(--ink);line-height:1.4}
.bl-pop-meta{font-size:11px;color:var(--muted);margin-top:3px}
.bl-view-all-link{font-size:12px;font-weight:700;color:#16a34a;cursor:pointer;display:inline-block;margin-top:4px}
.bl-tags-cloud{display:flex;flex-wrap:wrap;gap:6px}
.bl-cloud-tag{font-size:11px;font-weight:600;color:var(--ink2);background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:4px 10px;cursor:pointer;transition:all .15s}
.bl-cloud-tag:hover{border-color:#16a34a;color:#16a34a;background:#f0fdf4}
.bl-side-newsletter{background:#0a0a0a;border-radius:16px;padding:20px 18px;display:flex;flex-direction:column;gap:10px;overflow:hidden;position:relative}
.bl-side-newsletter::before{content:'';position:absolute;top:-30%;right:-20%;width:60%;height:160%;background:radial-gradient(ellipse,rgba(22,163,74,.25) 0%,transparent 70%);pointer-events:none}
.bl-nl-icon{font-size:22px;position:relative}
.bl-nl-title{font-size:13px;font-weight:700;color:#fff;line-height:1.4;position:relative}
.bl-nl-sub{font-size:12px;color:rgba(255,255,255,.55);line-height:1.6;position:relative}
.bl-nl-input{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:#fff;font-family:var(--sans);font-size:12px;border-radius:8px;padding:9px 12px;outline:none;width:100%;position:relative}
.bl-nl-input::placeholder{color:rgba(255,255,255,.35)}
.bl-no-spam{font-size:10px;color:rgba(255,255,255,.4);text-align:center;position:relative}

/* Mobile newsletter block (below grid on mobile) */
.bl-mob-nl{display:none;margin-top:28px}
.bl-nl-input-light{width:100%;border:1.5px solid var(--border);background:var(--white);font-family:var(--sans);font-size:13px;border-radius:8px;padding:10px 14px;outline:none;color:var(--ink);margin-bottom:0}
.bl-nl-input-light::placeholder{color:var(--light)}

/* Buttons */
.bl-btn-green{background:#16a34a;color:#fff;border:none;padding:12px 24px;border-radius:var(--rsm);font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.bl-btn-green:hover{background:#15803d;transform:translateY(-1px)}
.bl-btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--border);padding:11px 20px;border-radius:var(--rsm);font-family:var(--sans);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}
.bl-btn-outline:hover{border-color:#16a34a;color:#16a34a}
.bl-btn-ghost{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.25);padding:12px 20px;border-radius:var(--rsm);font-family:var(--sans);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}
.bl-btn-ghost:hover{border-color:rgba(255,255,255,.5)}

.bl-cta{margin-top:44px;background:var(--ink);border-radius:20px;overflow:hidden;position:relative}
.bl-cta-glow{position:absolute;top:-40%;right:-10%;width:50%;height:180%;background:radial-gradient(ellipse,rgba(22,163,74,.2) 0%,transparent 70%);pointer-events:none}
.bl-cta-content{padding:40px 48px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;position:relative;z-index:1}
.bl-cta-title{font-family:var(--serif);font-size:clamp(20px,2.5vw,28px);font-weight:900;color:#fff;margin-bottom:6px}
.bl-cta-sub{font-size:14px;color:rgba(255,255,255,.55)}
.bl-cta-btns{display:flex;gap:10px;flex-wrap:wrap}

/* ══ DETAIL ══ */
.bd-root{font-family:var(--sans);background:var(--white);color:var(--ink);overflow-x:hidden}

.bd-progress{position:fixed;top:0;left:0;height:3px;z-index:1000;transition:width .1s linear;border-radius:0 2px 2px 0}

.bd-topbar{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.95);border-bottom:1px solid var(--border);backdrop-filter:blur(12px);padding:0 40px;display:flex;align-items:center;height:56px;gap:12px}
.bd-back-btn{display:flex;align-items:center;gap:8px;font-family:var(--sans);font-size:13px;font-weight:700;color:var(--ink);background:transparent;border:none;cursor:pointer;transition:all .2s;padding:0;flex-shrink:0;white-space:nowrap}
.bd-back-btn:hover{color:#16a34a}
.bd-back-arrow{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--surface);border:1px solid var(--border);font-size:14px;transition:all .2s;flex-shrink:0}
.bd-back-btn:hover .bd-back-arrow{background:#f0fdf4;border-color:#bbf7d0;color:#16a34a;transform:translateX(-2px)}
.bd-back-txt{display:inline}
.bd-topbar-title{flex:1;font-size:13px;font-weight:600;color:var(--muted);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0}
.bd-topbar-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.bd-topbar-time{font-size:12px;color:var(--muted);white-space:nowrap}
.bd-toc-btn{display:none;width:32px;height:32px;border-radius:8px;background:var(--surface);border:1.5px solid var(--border);font-size:15px;cursor:pointer;color:var(--ink);align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.bd-toc-btn:hover{border-color:#16a34a;color:#16a34a}

.bd-toc-drawer{position:sticky;top:56px;z-index:90;background:var(--white);border-bottom:1.5px solid var(--border);padding:14px 20px;box-shadow:0 4px 16px rgba(0,0,0,.07)}
.bd-toc-drawer-label{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}

.bd-toc-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-left:2px solid transparent;font-size:12.5px;color:var(--muted);cursor:pointer;transition:all .2s;border-radius:0 6px 6px 0;margin-left:-10px}
.bd-toc-row:hover{color:var(--ink);background:var(--surface)}
.bd-toc-row.active{font-weight:700}
.bd-toc-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;background:var(--border);transition:background .2s}

/* Hero */
.bd-hero{padding:52px 0 0}
.bd-hero-inner{max-width:1320px;margin:0 auto;padding:0 48px 52px;display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
.bd-hero-left{display:flex;flex-direction:column;gap:16px}
.bd-breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)}
.bd-breadlink{cursor:pointer;transition:color .15s}
.bd-breadlink:hover{color:#16a34a}
.bd-breadsep{color:#d1d5db}
.bd-cat-badge{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff;border-radius:30px;padding:5px 16px;width:fit-content}
.bd-hero-title{font-family:var(--serif);font-size:clamp(24px,3.5vw,46px);font-weight:900;line-height:1.1;letter-spacing:-1px;color:var(--ink)}
.bd-hero-excerpt{font-size:15px;color:var(--muted);line-height:1.8}
.bd-hero-tags{display:flex;flex-wrap:wrap;gap:6px}
.bd-hero-tag{font-size:11px;font-weight:600;border:1px solid;border-radius:30px;padding:4px 12px}
.bd-hero-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.bd-av-lg{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2.5px solid var(--border);flex-shrink:0}
.bd-av-md{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--border);flex-shrink:0}
.bd-av-xs{width:20px;height:20px;border-radius:50%;object-fit:cover}
.bd-meta-name{font-size:14px;font-weight:700;color:var(--ink)}
.bd-meta-role{font-size:12px;color:var(--muted);margin-top:2px}
.bd-meta-pills{display:flex;gap:6px;flex-wrap:wrap}
.bd-meta-pill{font-size:11px;color:var(--muted);background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:4px 10px}
.bd-hero-right{}
.bd-hero-img-frame{border-radius:18px;overflow:hidden;border:2px solid;box-shadow:0 24px 64px rgba(0,0,0,.1);position:relative}
.bd-hero-img{width:100%;height:320px;object-fit:cover;display:block}
.bd-hero-img-badge{position:absolute;bottom:14px;right:14px;color:#fff;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:20px;padding:5px 14px}
/* Mobile hero image — hidden on desktop */
.bd-hero-img-mobile{display:none;padding:0 20px 28px;max-width:1320px;margin:0 auto}
.bd-hero-img-mobile img{width:100%;height:220px;object-fit:cover;border-radius:14px;border:1.5px solid var(--border)}

/* Body layout */
.bd-body-wrap{max-width:1320px;margin:0 auto;padding:0 48px 80px;display:grid;grid-template-columns:48px 1fr 310px;gap:0 32px;align-items:start}

/* Share col */
.bd-share-col{position:sticky;top:80px;padding-top:8px}
.bd-share-sticky{display:flex;flex-direction:column;align-items:center;gap:10px}
.bd-share-lbl{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.bd-share-btn{width:36px;height:36px;border-radius:50%;background:var(--surface);border:1.5px solid var(--border);font-size:12px;font-weight:700;color:var(--ink);cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center}
.bd-share-btn.sm{width:32px;height:32px;font-size:11px}
.bd-share-btn:hover{border-color:#16a34a;color:#16a34a;background:#f0fdf4}

/* Mobile share row (shown inside main on mobile) */
.bd-mobile-share{display:none;align-items:center;gap:8px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.bd-mobile-share-lbl{font-size:11px;font-weight:700;color:var(--muted);margin-right:4px}

/* Main */
.bd-main{padding:8px 0;min-width:0}

/* Mobile inline blocks (hidden on desktop) */
.bd-mob-author{display:none}
.bd-mob-nl{display:none}

/* Content blocks */
.bd-intro{font-size:17px;font-weight:500;color:var(--ink2);line-height:1.9;margin-bottom:28px;border-left:3px solid var(--border);padding-left:18px}
.bd-p{font-size:16px;color:var(--ink2);line-height:1.9;margin-bottom:22px}
.bd-h2{font-family:var(--serif);font-size:clamp(20px,2.5vw,26px);font-weight:800;color:var(--ink);letter-spacing:-.3px;margin:40px 0 16px;line-height:1.25}
.bd-anchor{}
.bd-quote{margin:32px 0;padding:24px 28px;background:var(--surface);border-left:4px solid;border-radius:0 14px 14px 0}
.bd-quote-mark{font-family:var(--serif);font-size:56px;line-height:.6;margin-bottom:12px;display:block;opacity:.35}
.bd-quote-text{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--ink);line-height:1.5;margin-bottom:10px}
.bd-quote-attr{font-size:13px;font-weight:600;color:var(--muted)}
.bd-callout{margin:28px 0;padding:22px 24px;border:1.5px solid;border-radius:14px;display:flex;align-items:flex-start;gap:14px}
.bd-callout-icon{font-size:20px;flex-shrink:0;margin-top:2px}
.bd-callout-title{font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
.bd-callout-text{font-size:14px;color:var(--ink2);line-height:1.7}
.bd-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);margin:28px 0;border:1.5px solid;border-radius:16px;overflow:hidden}
.bd-stat-cell{text-align:center;padding:24px 14px;border-right:1px solid rgba(0,0,0,.08)}
.bd-stat-cell:last-child{border-right:none}
.bd-stat-val{font-family:var(--serif);font-size:30px;font-weight:900;letter-spacing:-.5px;line-height:1;margin-bottom:8px}
.bd-stat-lbl{font-size:11px;color:var(--muted);font-weight:600;line-height:1.4}
.bd-outcome-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:28px 0}
.bd-outcome-card{background:var(--white);border:1.5px solid var(--border);border-top:3px solid;border-radius:14px;padding:20px 14px;text-align:center;transition:all .25s}
.bd-outcome-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
.bd-outcome-icon{font-size:24px;margin-bottom:10px}
.bd-outcome-val{font-family:var(--serif);font-size:26px;font-weight:900;letter-spacing:-.5px;margin-bottom:6px}
.bd-outcome-lbl{font-size:11.5px;color:var(--muted);font-weight:600;line-height:1.4}
.bd-timeline{display:flex;flex-direction:column;margin:28px 0;position:relative}
.bd-timeline::before{content:'';position:absolute;left:21px;top:22px;bottom:22px;width:1.5px;background:var(--border)}
.bd-tl-row{display:flex;gap:18px;padding:6px 0;position:relative}
.bd-tl-marker{width:44px;height:44px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
.bd-tl-label{font-size:11px;font-weight:800;color:#fff;letter-spacing:.03em}
.bd-tl-body{padding-top:4px;padding-bottom:14px}
.bd-tl-heading{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:4px}
.bd-tl-text{font-size:13px;color:var(--muted);line-height:1.65}
.bd-figure{margin:28px 0}
.bd-fig-img{width:100%;border-radius:14px;object-fit:cover;max-height:400px;border:1px solid var(--border)}
.bd-fig-cap{font-size:12px;color:var(--muted);text-align:center;margin-top:8px;font-style:italic}
.bd-list-box{margin:28px 0;padding:24px 26px;background:var(--white);border:1.5px solid var(--border);border-radius:14px}
.bd-list-title{font-family:var(--serif);font-size:17px;font-weight:800;color:var(--ink);margin-bottom:14px}
.bd-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.bd-list-item{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:var(--ink2);line-height:1.6}
.bd-list-check{font-size:13px;font-weight:800;flex-shrink:0;margin-top:2px}
.bd-table-wrap{margin:28px 0}
.bd-table-title{font-family:var(--serif);font-size:17px;font-weight:800;color:var(--ink);margin-bottom:12px}
.bd-table-scroll{border:1.5px solid var(--border);border-radius:14px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.bd-table{width:100%;border-collapse:collapse;font-size:13px}
.bd-table thead tr{background:#0f172a}
.bd-table th{text-align:left;color:#fff;font-weight:700;font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:12px 18px;white-space:nowrap}
.bd-table td{padding:12px 18px;color:var(--ink2);border-bottom:1px solid var(--border)}
.bd-table tbody tr:last-child td{border-bottom:none}
.bd-table tbody tr:nth-child(even){background:var(--surface)}
.bd-big-stat{margin:36px 0;padding:48px 28px;text-align:center;background:var(--ink);border-radius:18px}
.bd-big-val{font-family:var(--serif);font-size:clamp(52px,10vw,90px);font-weight:900;line-height:1;letter-spacing:-2px}
.bd-big-label{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#4ade80;margin-top:14px}
.bd-big-ctx{font-size:14px;color:rgba(255,255,255,.5);margin:14px auto 0;max-width:440px;line-height:1.75}

/* Author box (desktop only) */
.bd-author-box{margin:44px 0 36px;padding:24px 28px;background:var(--surface);border:1.5px solid var(--border);border-left:4px solid;border-radius:0 14px 14px 0;display:flex;gap:20px;align-items:flex-start}
.bd-author-av{width:64px;height:64px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2.5px solid var(--border)}
.bd-author-lbl{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
.bd-author-name{font-family:var(--serif);font-size:18px;font-weight:800;color:var(--ink);margin-bottom:2px}
.bd-author-role{font-size:12px;color:var(--muted);margin-bottom:8px}
.bd-author-bio{font-size:13.5px;color:var(--ink2);line-height:1.65}

/* Mobile author card */
.bd-mob-author{padding:20px;background:var(--surface);border:1.5px solid var(--border);border-left:4px solid;border-radius:0 12px 12px 0;display:flex;gap:14px;align-items:flex-start;margin:28px 0 20px}
.bd-mob-av{width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid var(--border)}
.bd-mob-author-lbl{font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}
.bd-mob-author-name{font-family:var(--serif);font-size:16px;font-weight:800;color:var(--ink);margin-bottom:1px}
.bd-mob-author-role{font-size:11px;color:var(--muted);margin-bottom:7px}
.bd-mob-author-bio{font-size:13px;color:var(--ink2);line-height:1.6}

/* Mobile newsletter */
.bd-mob-nl{border:1.5px solid;border-radius:14px;padding:20px 18px;display:flex;flex-direction:column;gap:10px;margin:0 0 28px}
.bd-mob-nl-icon{font-size:26px}
.bd-mob-nl-title{font-size:15px;font-weight:800;color:var(--ink);line-height:1.3}
.bd-mob-nl-sub{font-size:13px;color:var(--muted);line-height:1.6}
.bd-mob-nl-input{width:100%;border:1.5px solid var(--border);background:var(--white);font-family:var(--sans);font-size:13px;border-radius:8px;padding:10px 14px;outline:none;color:var(--ink)}
.bd-mob-nl-input::placeholder{color:var(--light)}
.bd-mob-nl-btn{width:100%;color:#fff;border:none;padding:12px;border-radius:8px;font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.bd-mob-nl-btn:hover{opacity:.85}
.bd-mob-nl-spam{font-size:11px;color:var(--muted);text-align:center}

/* Related */
.bd-related{margin-bottom:36px}
.bd-related-eye{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:5px}
.bd-related-title{font-family:var(--serif);font-size:clamp(20px,2.5vw,26px);font-weight:900;color:var(--ink);letter-spacing:-.3px;margin-bottom:18px}
.bd-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.bd-rcard{background:var(--white);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:all .25s}
.bd-rcard:hover{border-color:#16a34a;transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.1)}
.bd-rcard-img-wrap{height:150px;overflow:hidden;position:relative}
.bd-rcard-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}
.bd-rcard:hover .bd-rcard-img{transform:scale(1.06)}
.bd-rcard-cat{position:absolute;top:8px;left:8px;font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#fff;border-radius:20px;padding:4px 10px}
.bd-rcard-body{padding:14px 16px 18px}
.bd-rcard-title{font-family:var(--serif);font-size:13.5px;font-weight:800;color:var(--ink);line-height:1.4;margin-bottom:8px}
.bd-rcard-meta{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted)}
.bd-rcard-author{font-weight:600}

/* Detail CTA */
.bd-cta-block{background:var(--ink);border-radius:16px;padding:28px 32px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.bd-cta-icon{width:48px;height:48px;border-radius:50%;border:1.5px solid;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.bd-cta-copy{flex:1;min-width:140px}
.bd-cta-title{font-family:var(--serif);font-size:18px;font-weight:900;color:#fff;margin-bottom:4px}
.bd-cta-sub{font-size:13px;color:rgba(255,255,255,.55)}
.bd-cta-btns{display:flex;gap:8px;flex-wrap:wrap}
.bd-cta-btn{color:#fff;border:none;padding:11px 22px;border-radius:var(--rsm);font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.bd-cta-btn:hover{opacity:.85;transform:translateY(-1px)}
.bd-cta-ghost{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.25);padding:10px 18px;border-radius:var(--rsm);font-family:var(--sans);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}
.bd-cta-ghost:hover{border-color:rgba(255,255,255,.5)}

/* Right sidebar */
.bd-sidebar{display:flex;flex-direction:column;gap:18px;position:sticky;top:72px}
.bd-side-card{background:var(--white);border:1.5px solid var(--border);border-radius:14px;padding:18px 16px}
.bd-side-title{font-size:13px;font-weight:800;color:var(--ink);margin-bottom:14px}
.bd-side-author-row{display:flex;gap:10px;align-items:center;margin-bottom:10px}
.bd-side-author-name{font-size:13px;font-weight:700;color:var(--ink)}
.bd-side-author-role{font-size:11px;color:var(--muted);margin-top:2px}
.bd-side-author-bio{font-size:12px;color:var(--muted);line-height:1.65;margin-bottom:12px}
.bd-social-row{display:flex;gap:8px}
.bd-social-btn{width:30px;height:30px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;font-weight:700;color:var(--ink);background:var(--surface);transition:all .15s}
.bd-social-btn:hover{border-color:#16a34a;color:#16a34a;background:#f0fdf4}
.bd-side-nl{border:1.5px solid;border-radius:14px;padding:18px 16px;display:flex;flex-direction:column;gap:10px}
.bd-side-nl-title{font-size:13px;font-weight:800;color:var(--ink);line-height:1.4}
.bd-side-nl-sub{font-size:12px;color:var(--muted);line-height:1.6}
.bd-side-nl-input{width:100%;border:1.5px solid var(--border);background:var(--white);font-family:var(--sans);font-size:12px;border-radius:8px;padding:9px 12px;outline:none;color:var(--ink)}
.bd-side-nl-btn{width:100%;color:#fff;border:none;padding:10px;border-radius:8px;font-family:var(--sans);font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}
.bd-side-nl-btn:hover{opacity:.85}
.bd-no-spam{font-size:10px;color:var(--muted);text-align:center}
.bd-pop-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:12px}
.bd-pop-img{width:48px;height:48px;border-radius:8px;object-fit:cover;flex-shrink:0}
.bd-pop-title{font-size:12px;font-weight:600;color:var(--ink);line-height:1.4}
.bd-pop-meta{font-size:10px;color:var(--muted);margin-top:3px}

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */

/* 1200px */
@media(max-width:1200px){
  .bl-grid{grid-template-columns:repeat(2,1fr)}
  .bl-main{grid-template-columns:1fr 260px;gap:28px}
  .bl-hero-inner{padding:52px 32px 0;gap:36px}
  .bl-stat-strip{padding:0 32px}
  .bl-container{padding:0 32px 70px}
  .bd-hero-inner{padding:0 32px 44px;gap:36px}
  .bd-body-wrap{grid-template-columns:44px 1fr 260px;gap:0 24px;padding:0 32px 60px}
}

/* 1024px — hide share col, keep sidebar */
@media(max-width:1024px){
  .bd-body-wrap{grid-template-columns:0 1fr 240px;gap:0 24px}
  .bd-share-col{display:none}
  .bd-mobile-share{display:flex}
}

/* 900px — single column */
@media(max-width:900px){
  /* Listing */
  .bl-hero-inner{grid-template-columns:1fr;padding:44px 24px 0;gap:24px}
  .bl-hero-right{display:none}
  .bl-hero-sub{max-width:100%}
  .bl-stat-strip{grid-template-columns:repeat(2,1fr);padding:0 24px;margin-top:24px}
  .bl-stat-item{padding:16px 0}
  .bl-container{padding:0 24px 56px}
  .bl-featured{grid-template-columns:1fr}
  .bl-featured-img-wrap{min-height:200px;height:200px}
  .bl-featured-body{border-left:none;border-top:1px solid var(--border);padding:22px 18px;gap:11px}
  .bl-main{grid-template-columns:1fr}
  .bl-sidebar{display:none}
  .bl-mob-nl{display:block}
  .bl-grid{grid-template-columns:repeat(2,1fr);gap:12px}
  .bl-cta-content{padding:28px 24px;flex-direction:column;align-items:flex-start}
  .bl-cta-btns{width:100%}
  .bl-btn-green,.bl-btn-ghost{flex:1;text-align:center}

  /* Detail topbar */
  .bd-topbar{padding:0 20px}
  .bd-back-txt{display:none}
  .bd-toc-btn{display:flex}
  .bd-topbar-time{display:none}

  /* Detail hero */
  .bd-hero{padding:28px 0 0}
  .bd-hero-inner{grid-template-columns:1fr;padding:0 20px 20px;gap:22px}
  .bd-hero-right{display:none}
  .bd-hero-img-mobile{display:block}
  .bd-hero-meta{flex-direction:column;align-items:flex-start;gap:10px}
  .bd-meta-pills{gap:5px}

  /* Detail body */
  .bd-body-wrap{grid-template-columns:1fr;padding:0 20px 56px}
  .bd-share-col{display:none}
  .bd-mobile-share{display:flex}
  .bd-sidebar{display:none}

  /* Show mobile inline blocks */
  .bd-mob-author{display:flex}
  .bd-mob-nl{display:flex}
  /* Hide desktop-only author box */
  .bd-author-box{display:none}

  .bd-related-grid{grid-template-columns:repeat(2,1fr);gap:12px}
  .bd-stats-grid{grid-template-columns:repeat(2,1fr)}
  .bd-outcome-grid{grid-template-columns:repeat(2,1fr)}
  .bd-cta-block{flex-direction:column;align-items:flex-start;padding:22px 20px}
  .bd-cta-icon{width:40px;height:40px;font-size:18px}
  .bd-cta-btns{width:100%}
  .bd-cta-btn,.bd-cta-ghost{flex:1;text-align:center}
}

/* 640px */
@media(max-width:640px){
  .bl-hero-inner{padding:36px 16px 0;gap:18px}
  .bl-stat-strip{padding:0 16px}
  .bl-stat-val{font-size:22px}
  .bl-container{padding:0 16px 44px}
  .bl-filter-row{padding:20px 0 16px}
  .bl-grid{grid-template-columns:1fr}
  .bl-featured-body{padding:18px 14px}
  .bl-featured-title{font-size:17px}

  .bd-hero-inner{padding:0 16px 16px}
  .bd-hero-img-mobile{padding:0 16px 20px}
  .bd-hero-img-mobile img{height:190px}
  .bd-body-wrap{padding:0 16px 44px}

  .bd-h2{margin:28px 0 14px}
  .bd-quote{padding:18px 20px}
  .bd-quote-text{font-size:16px}
  .bd-stats-grid{grid-template-columns:1fr 1fr}
  .bd-outcome-grid{grid-template-columns:1fr 1fr}
  .bd-related-grid{grid-template-columns:1fr}
  .bd-big-stat{padding:36px 18px}
  .bd-tl-marker{width:38px;height:38px;border-radius:9px}
  .bd-tl-label{font-size:10px}
}

/* 400px */
@media(max-width:400px){
  .bl-hero-inner{padding:28px 12px 0}
  .bl-container{padding:0 12px 36px}
  .bl-stat-strip{padding:0 12px}
  .bd-hero-inner{padding:0 12px 14px}
  .bd-hero-img-mobile{padding:0 12px 16px}
  .bd-body-wrap{padding:0 12px 36px}
  .bd-hero-title{font-size:clamp(20px,7vw,28px)}
  .bd-stats-grid{grid-template-columns:1fr 1fr}
  .bd-outcome-grid{grid-template-columns:1fr 1fr}
  .bd-mob-author{flex-direction:column}
}

@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
`;

export { BlogPage, BlogDetail, App };