import React, { useEffect, useRef } from 'react';
import '../../../Style/HomeCss/BlogSection.css';
import blog1 from '../../../assets/images/blog-1.jpg';
import blog2 from '../../../assets/images/blog-1.jpg';
import blog3 from '../../../assets/images/blog-1.jpg';
import blog4 from '../../../assets/images/blog-1.jpg';
import blog5 from '../../../assets/images/blog-1.jpg';
import blog6 from '../../../assets/images/blog-1.jpg';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const blogPosts = [
  { id: 1, image: blog1, date: '18 Dec 2022', author: 'Daniel Leo', title: 'Tackling Data Annotation Problems In Healthcare With AI', tag: 'AI & Health', link: '/blog-details' },
  { id: 2, image: blog2, date: '20 Dec 2022', author: 'Daniel Leo', title: 'Cybersecurity Best Practices For Modern Enterprise Businesses', tag: 'Security', link: '/blog-details' },
  { id: 3, image: blog3, date: '22 Dec 2022', author: 'Daniel Leo', title: 'Building Scalable Cloud Infrastructure For Enterprise Apps', tag: 'Cloud', link: '/blog-details' },
  { id: 4, image: blog4, date: '25 Dec 2022', author: 'Daniel Leo', title: 'Top 10 Data Science Trends Every Developer Should Know', tag: 'Data Science', link: '/blog-details' },
  { id: 5, image: blog5, date: '28 Dec 2022', author: 'Daniel Leo', title: 'How Artificial Intelligence Is Transforming The Future Of Healthcare', tag: 'AI / ML', link: '/blog-details' },
  { id: 6, image: blog6, date: '30 Dec 2022', author: 'Daniel Leo', title: 'Automating CI/CD Pipelines For High-Performance Software Delivery', tag: 'DevOps', link: '/blog-details' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const BlogSection = () => {
  const controls = useAnimation();
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = Math.max(0, scrollLeftRef.current - walk);
  };
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = scrollRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    const walk = (touchStartX.current - e.touches[0].pageX) * 1.2;
    scrollRef.current.scrollLeft = Math.max(0, touchScrollLeft.current + walk);
  };

  return (
    <section className="tj-blog-section" ref={ref}>

      {/* Background Layer */}
      <div className="tj-blog-bg-layer" aria-hidden="true">
        <div className="tj-bg-ribbon" />
        <div className="tj-bg-orb tj-bg-orb-1" />
        <div className="tj-bg-orb tj-bg-orb-2" />
        <div className="tj-bg-orb tj-bg-orb-3" />
        <div className="tj-bg-dot-grid" />
        <div className="tj-bg-stripe tj-bg-stripe-1" />
        <div className="tj-bg-stripe tj-bg-stripe-2" />
        <div className="tj-bg-corner tj-bg-corner-tl" />
        <div className="tj-bg-corner tj-bg-corner-tr" />
        <div className="tj-bg-corner tj-bg-corner-bl" />
        <div className="tj-bg-corner tj-bg-corner-br" />
        <div className="tj-bg-geo tj-bg-geo-circle-lg" />
        <div className="tj-bg-geo tj-bg-geo-circle-sm" />
        <div className="tj-bg-geo tj-bg-geo-square" />
        <div className="tj-bg-geo tj-bg-geo-ring" />
        <svg className="tj-bg-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(0,163,77,0.05)" />
        </svg>
      </div>

      {/* ── Split layout: left heading pinned | right cards scroll ── */}
      <motion.div
        className="tj-blog-split"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >

        {/* LEFT — fixed heading panel */}
        <div className="tj-blog-left">
          <span className="sub-title">Latest Blog</span>
          <h2 className="sec-title">Latest<br />Blog Posts</h2>
          <p className="sec-desc">Insights, ideas and updates from our team.</p>
          <a href="/blog" className="tj-view-all-btn">View All</a>
        </div>

        {/* RIGHT — horizontally scrollable cards only */}
        <div className="tj-blog-right">
          <div
            className="tj-scroll-wrapper"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            <div className="tj-scroll-track">
              {blogPosts.map((post) => (
                <a href={post.link} key={post.id} className="tj-blog-card">
                  <div className="tj-photo-frame">
                    <div className="tj-photo-frame-inner">
                      <img src={post.image} alt={post.title} className="tj-blog-img" draggable="false" />
                    </div>
                    <span className="tj-read-more-btn" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="tj-blog-body">
                    <div className="tj-blog-meta">
                      <span className="meta-author">{post.author}</span>
                      <span className="meta-dot" />
                      <span className="meta-date">{post.date}</span>
                    </div>
                    <h4 className="tj-blog-title">{post.title}</h4>
                    <span className="tj-blog-tag">{post.tag}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </motion.div>

    </section>
  );
};

export default BlogSection;