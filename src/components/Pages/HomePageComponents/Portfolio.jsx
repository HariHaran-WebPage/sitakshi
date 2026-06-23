import React, { useState } from "react";
import "../../../Style/HomeCss/Portfolio.css";

// Import portfolio images
import portfolio1 from "../../../assets/images/portfolio-1.jpg";
import portfolio2 from "../../../assets/images/portfolio-1.jpg";
import portfolio3 from "../../../assets/images/portfolio-1.jpg";
import portfolio4 from "../../../assets/images/portfolio-1.jpg";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("*");

  const portfolioItems = [
    {
      id: 1,
      category: "marketing",
      title: "Digital Marketing",
      subtitle: "Marketing/Solution",
      image: portfolio1,
      color: "#FF6B6B",
    },
    {
      id: 2,
      category: "development",
      title: "Web Development",
      subtitle: "Marketing/Consulting",
      image: portfolio2,
      color: "#4ECDC4",
    },
    {
      id: 3,
      category: "design",
      title: "UX/UI Design",
      subtitle: "Marketing/Solution",
      image: portfolio4,
      color: "#FFBE0B",
    },
    {
      id: 4,
      category: "seo",
      title: "Branding & SEO",
      subtitle: "Marketing/Design Solution",
      image: portfolio3,
      color: "#8338EC",
    },
  ];

  const filteredItems =
    activeFilter === "*"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section className="portfolio-section">

      {/* ── Background Layer ── */}
      <div className="portfolio-bg-layer" aria-hidden="true">

        {/* Top green ribbon */}
        <div className="bg-ribbon" />

        {/* Soft blurred orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        {/* Dot grid overlay */}
        <div className="bg-dot-grid" />

        {/* Diagonal stripe lines */}
        <div className="bg-stripe bg-stripe-1" />
        <div className="bg-stripe bg-stripe-2" />

        {/* Corner brackets */}
        <div className="bg-corner bg-corner-tl" />
        <div className="bg-corner bg-corner-tr" />
        <div className="bg-corner bg-corner-bl" />
        <div className="bg-corner bg-corner-br" />

        {/* Geometric outline shapes */}
        <div className="bg-geo bg-geo-circle-lg" />
        <div className="bg-geo bg-geo-circle-sm" />
        <div className="bg-geo bg-geo-square" />
        <div className="bg-geo bg-geo-ring" />

        {/* Bottom wave */}
        <svg className="bg-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(0,163,77,0.05)" />
        </svg>
      </div>

      {/* ── Main Content ── */}
      <div className="container">
        <div className="portfolio-header">
          <div className="header-content">
            <span className="section-subtitle">Our Creative Works</span>
            <h2 className="section-title">
              Discover Our <span className="highlight">Portfolio</span> Excellence
            </h2>
            <p className="section-description">
              We craft digital experiences that inspire and transform businesses
            </p>
          </div>

          <div className="filter-buttons">
            {["*", "development", "marketing", "design", "seo"].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                <span className="btn-text">
                  {filter === "*"
                    ? "All Projects"
                    : filter === "seo"
                    ? "SEO"
                    : filter.replace(/^\w/, (c) => c.toUpperCase()).replace("-", " ")}
                </span>
                <span className="btn-underline"></span>
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className={`portfolio-item ${item.category}`}>
              <div className="portfolio-card">
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                  <div
                    className="image-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}00 0%, ${item.color}cc 100%)`,
                    }}
                  />
                  <div className="card-badge" style={{ backgroundColor: item.color }}>
                    {item.category}
                  </div>
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <button className="view-btn">
                    <span>View Project</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default PortfolioSection;