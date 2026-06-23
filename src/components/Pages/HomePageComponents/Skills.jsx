import React, { useRef, useEffect, useState } from "react";
import "../../../Style/HomeCss/Skills.css";

// SVG icon components — no external image files needed
const icons = {
  advancedWeb: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="56" height="38" rx="4" stroke="#0ea5e9" strokeWidth="3" fill="none"/>
      <path d="M4 18h56" stroke="#0ea5e9" strokeWidth="2.5"/>
      <circle cx="12" cy="14" r="2" fill="#0ea5e9"/>
      <circle cx="20" cy="14" r="2" fill="#0ea5e9" opacity=".6"/>
      <circle cx="28" cy="14" r="2" fill="#0ea5e9" opacity=".3"/>
      <path d="M14 30l8-6 6 4 8-8 8 10" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 54h28M32 48v6" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="28" ry="11" stroke="#61DAFB" strokeWidth="2.5" fill="none"/>
      <ellipse cx="32" cy="32" rx="28" ry="11" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(60 32 32)"/>
      <ellipse cx="32" cy="32" rx="28" ry="11" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(120 32 32)"/>
      <circle cx="32" cy="32" r="4" fill="#61DAFB"/>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" stroke="#888" strokeWidth="2.5" fill="none"/>
      <path d="M22 20v24M22 20l20 24V20" stroke="#888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6l22 12.5v25L32 56 10 43.5v-25z" stroke="#68A063" strokeWidth="2.5" fill="none" opacity=".3"/>
      <path d="M32 6l22 12.5v25L32 56 10 43.5v-25z" stroke="#68A063" strokeWidth="2.5" fill="none"/>
      <path d="M32 20v14l10 6" stroke="#68A063" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8c-6 10-12 18-12 26a12 12 0 0024 0C44 26 38 18 32 8z" stroke="#47A248" strokeWidth="2.5" fill="none" opacity=".3"/>
      <path d="M32 8c-6 10-12 18-12 26a12 12 0 0024 0C44 26 38 18 32 8z" stroke="#47A248" strokeWidth="2.5" fill="none"/>
      <line x1="32" y1="34" x2="32" y2="56" stroke="#47A248" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6C20 6 21 11 21 11v10h22V24H16s-10-1-10 14 9 14 9 14h5v-7s0-9 9-9h16s8 1 8-8V16s1-10-21-10z" fill="#3776AB" opacity=".85"/>
      <path d="M32 58c12 0 11-5 11-5V43H21v-3h27s10 1 10-14-9-14-9-14h-5v7s0 9-9 9H19s-8-1-8 8v12s-1 10 21 10z" fill="#FFD43B" opacity=".85"/>
      <circle cx="27" cy="17" r="2.5" fill="white"/>
      <circle cx="37" cy="47" r="2.5" fill="white"/>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" fill="#092E20" opacity=".12"/>
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#092E20" strokeWidth="2.5"/>
      <path d="M22 16h6v22c0 6-3 9-8 10l-2-4c3-1 4-3 4-6V16zM25 10h6v5h-6zM36 16h6v10h4c0 8-2 16-10 20l-2-4c5-3 6-8 6-14V16zM36 10h6v5h-6z" fill="#092E20" opacity=".8"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="14" stroke="#9333EA" strokeWidth="2.5" fill="none" opacity=".3"/>
      <circle cx="32" cy="32" r="6" fill="#9333EA" opacity=".8"/>
      <path d="M32 10v8M32 46v8M10 32h8M46 32h8" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M17 17l5.6 5.6M41.4 41.4L47 47M47 17l-5.6 5.6M22.6 41.4L17 47" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="10" r="3" fill="#9333EA"/>
      <circle cx="32" cy="54" r="3" fill="#9333EA"/>
      <circle cx="10" cy="32" r="3" fill="#9333EA"/>
      <circle cx="54" cy="32" r="3" fill="#9333EA"/>
    </svg>
  ),
};

const skills = [
  { name: "Advanced Web", icon: icons.advancedWeb, delay: 0,   accent: "#0ea5e9", tag: "Full-Stack" },
  { name: "React",        icon: icons.react,       delay: 70,  accent: "#61DAFB", tag: "Frontend"  },
  { name: "Next.js",      icon: icons.nextjs,      delay: 140, accent: "#555555", tag: "Framework" },
  { name: "Node.js",      icon: icons.nodejs,      delay: 210, accent: "#68A063", tag: "Backend"   },
  { name: "MongoDB",      icon: icons.mongodb,     delay: 280, accent: "#47A248", tag: "Database"  },
  { name: "Python",       icon: icons.python,      delay: 350, accent: "#3776AB", tag: "Backend"   },
  { name: "Django",       icon: icons.django,      delay: 420, accent: "#092E20", tag: "Framework" },
  { name: "AI / ML",      icon: icons.ai,          delay: 490, accent: "#9333EA", tag: "Intelligent"},
];

const SkillsSection = () => {
  const [visible, setVisible] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          skills.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => [...prev, i]);
            }, skills[i].delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section py-5" ref={sectionRef}>
      {/* decorative blobs */}
      <span className="sk-blob sk-blob-1" aria-hidden="true" />
      <span className="sk-blob sk-blob-2" aria-hidden="true" />

      <div className="container position-relative">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <span className="sk-eyebrow">Works Can Contribute</span>
            <h2 className="sk-heading">
              Topics Will <span className="sk-heading-accent">Enhance</span> Your Skills
            </h2>
            <p className="sk-sub">
              A curated stack of technologies powering modern web, AI, and product development.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="sk-grid">
          {skills.map((skill, i) => (
            <div
              key={i}
              className={`sk-card ${visible.includes(i) ? "sk-card--visible" : ""}`}
              style={{ "--accent": skill.accent, transitionDelay: `${skill.delay}ms` }}
            >
              {/* rotating dashed ring */}
              <span className="sk-ring" aria-hidden="true" />

              {/* glow spot */}
              <span className="sk-glow" aria-hidden="true" />

              {/* icon */}
              <div className="sk-icon-wrap">
                <div className="sk-icon-bg" />
                <div className="sk-icon">{skill.icon}</div>
              </div>

              {/* tag pill */}
              <span className="sk-tag">{skill.tag}</span>

              {/* name */}
              <h4 className="sk-name">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;