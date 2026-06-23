import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import {
  FaHome, FaInfoCircle, FaCogs, FaBriefcase, FaBlog, FaEnvelope,
  FaBolt, FaServer, FaCloud, FaNetworkWired, FaCode, FaMobileAlt,
  FaChartLine, FaChevronDown, FaLaptopCode, FaChevronRight,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Style/Header/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);

  const location = useLocation();
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setActiveDropdown(null); setIsOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) { setActiveDropdown(null); setMobServicesOpen(false); }
  };

  const handleDropdownToggle = useCallback((name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }, []);

  const handleMouseEnter = useCallback((name) => {
    if (window.innerWidth > 991.98) {
      clearTimeout(timeoutRef.current);
      setActiveDropdown(name);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth > 991.98) {
      timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    }
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (window.innerWidth > 991.98) clearTimeout(timeoutRef.current);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= 991.98) {
      setIsOpen(false);
      setActiveDropdown(null);
      setMobServicesOpen(false);
    }
  };

  const isServicesActive = location.pathname.startsWith('/services');
  const isActive = (path) => location.pathname === path;

  const serviceCategories = [
    {
      title: 'Web Development',
      icon: <FaLaptopCode className="service-icon" />,
      items: [
        { name: 'Frontend Development', path: '/services/frontend-development', icon: <FaCode /> },
        { name: 'Backend Development',  path: '/services/backend-development',  icon: <FaServer /> },
        { name: 'Full Stack Development', path: '/services/full-stack',         icon: <FaNetworkWired /> },
      ],
    },
    {
      title: 'Digital Marketing',
      icon: <FaChartLine className="service-icon" />,
      items: [
        { name: 'SEO Optimization',       path: '/services/seo',               icon: <FaBolt /> },
        { name: 'Social Media Marketing', path: '/services/social-media',      icon: <FaMobileAlt /> },
        { name: 'Pay-Per-Click Ads',      path: '/services/ppc',               icon: <FaCloud /> },
        { name: 'Email Marketing',        path: '/services/email-marketing',   icon: <FaEnvelope /> },
        { name: 'Content Marketing',      path: '/services/content-marketing', icon: <FaBlog /> },
      ],
    },
  ];

  return (
    <nav
      ref={navbarRef}
      className={`navbar navbar-expand-lg custom-navbar fixed-top ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">

        {/* Logo */}
        <a className="navbar-brand" href="/" onClick={handleLinkClick}>
          <img src={Logo} alt="Company Logo" className="navbar-logo" />
        </a>

        {/* Mobile hamburger */}
        <div className="mobile-right-controls">
          <button
            className={`navbar-toggler ${isOpen ? 'open' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            aria-controls="navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* Nav links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">

            {/* Home */}
            <li className="nav-item">
               <a 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                href="/"
                onClick={handleLinkClick}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <FaHome className="nav-icon" />
                <span>Home</span>
              </a>
            </li>

            {/* About */}
            <li className="nav-item">
               <a 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                href="/about"
                onClick={handleLinkClick}
              >
                <FaInfoCircle className="nav-icon" />
                <span>About Us</span>
              </a>
            </li>

            {/* Services */}
            <li
              className={`nav-item dropdown mega-dropdown ${activeDropdown === 'services' ? 'show' : ''}`}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <a  
                className={`nav-link dropdown-toggle ${isServicesActive ? 'active' : ''}`}
                href="#services"
                id="servicesDropdown"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.innerWidth <= 991.98) {
                    setMobServicesOpen((p) => !p);
                  } else {
                    handleDropdownToggle('services');
                  }
                }}
                aria-expanded={activeDropdown === 'services' || mobServicesOpen}
                aria-haspopup="true"
              >
                <FaCogs className="nav-icon" />
                <span>Services</span>
                <FaChevronDown
                  className={`dropdown-arrow ${activeDropdown === 'services' || mobServicesOpen ? 'rotated' : ''}`}
                />
              </a>

              {/* Desktop mega menu */}
              <div
                className={`dropdown-menu mega-menu ${activeDropdown === 'services' ? 'show' : ''}`}
                aria-labelledby="servicesDropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mega-menu-container">
                  {serviceCategories.map((category, idx) => (
                    <div className="mega-menu-col" key={idx}>
                      <div className="mega-menu-header">
                        {category.icon}
                        <h6>{category.title}</h6>
                      </div>
                      <div className="mega-menu-items">
                        {category.items.map((item, itemIdx) => (
                          <a
                            key={itemIdx}
                            className={`dropdown-item ${isActive(item.path) ? 'active' : ''}`}
                            href={item.path}
                            onClick={handleLinkClick}
                          >
                            <span className="item-icon">{item.icon}</span>
                            <span className="item-text">{item.name}</span>
                            <FaChevronRight className="item-arrow" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile services sub-menu */}
              {mobServicesOpen && (
                <div className="mobile-services-sub">
                  {serviceCategories.map((category, idx) => (
                    <div key={idx} className="mob-cat-block">
                      <div className="mob-cat-title">
                        {category.icon}
                        <span>{category.title}</span>
                      </div>
                      {category.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          className={`mob-sub-item ${isActive(item.path) ? 'active' : ''}`}
                          href={item.path}
                          onClick={handleLinkClick}
                        >
                          <span className="item-icon">{item.icon}</span>
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* Portfolio */}
            <li className="nav-item">
               <a 
                className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}
                href="/portfolio"
                onClick={handleLinkClick}
              >
                <FaBriefcase className="nav-icon" />
                <span>Portfolio</span>
              </a>
            </li>

            {/* Blog */}
            <li className="nav-item">
               <a 
                className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                href="/blog"
                onClick={handleLinkClick}
              >
                <FaBlog className="nav-icon" />
                <span>Blog</span>
              </a>
            </li>

          </ul>

          {/* Contact button */}
          <div className="navbar-right-group">
            <div className="navbar-contact">
               <a 
                className={`contact-link ${isActive('/contact') ? 'active' : ''}`}
                href="/contact"
                onClick={handleLinkClick}
              >
                <FaEnvelope className="contact-icon" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;