import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedinIn,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'; // replace with Sitakshi logo path
import '../../Style/Footer/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home',       path: '/' },
    { label: 'About Us',   path: '/about' },
    { label: 'Portfolio',  path: '/portfolio' },
    { label: 'Blog',       path: '/blog' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const serviceCategories = [
    {
      title: 'Web Development',
      items: [
        { name: 'Frontend Development',  path: '/services/frontend-development' },
        { name: 'Backend Development',   path: '/services/backend-development' },
        { name: 'Full Stack Development',path: '/services/full-stack' },
      ],
    },
    {
      title: 'Digital Marketing',
      items: [
        { name: 'SEO Optimization',      path: '/services/seo' },
        { name: 'Social Media Marketing',path: '/services/social-media' },
        { name: 'Pay-Per-Click Ads',     path: '/services/ppc' },
        { name: 'Email Marketing',       path: '/services/email-marketing' },
        { name: 'Content Marketing',     path: '/services/content-marketing' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__container">
          <div className="footer__grid">

            {/* Column 1 – Logo & Social */}
            <div className="footer__column">
              <div className="footer__widget">
                <div className="footer__logo">
                  <Link to="/">
                    <img src={logo} alt="Sitakshi Software Solutions" className="footer__logo-img" />
                  </Link>
                </div>
                <p className="footer__description">
                  Sitakshi Software Solutions delivers cutting-edge web development and
                  digital marketing services, empowering businesses to grow and thrive in
                  the digital landscape.
                </p>
                <div className="footer__social">
                  <h4 className="footer__subtitle">Follow Us</h4>
                  <ul className="footer__social-links">
                    <li className="footer__social-item">
                      <a href="https://www.facebook.com/share/1BmryXmvem/" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer__social-link footer__social-link--facebook">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li className="footer__social-item">
                      <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social-link footer__social-link--instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                    <li className="footer__social-item">
                      <a href="https://www.linkedin.com/company/zelton-solutions/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer__social-link footer__social-link--linkedin">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2 – Quick Links */}
            <div className="footer__column">
              <div className="footer__widget">
                <h4 className="footer__subtitle">Quick Links</h4>
                <ul className="footer__menu-list">
                  {quickLinks.map(({ label, path }) => (
                    <li key={label} className="footer__menu-item">
                      <Link to={path} className="footer__menu-link">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3 – Services */}
            <div className="footer__column">
              <div className="footer__widget">
                {serviceCategories.map((category) => (
                  <div key={category.title} className="footer__service-group">
                    <h4 className="footer__subtitle">{category.title}</h4>
                    <ul className="footer__menu-list">
                      {category.items.map(({ name, path }) => (
                        <li key={name} className="footer__menu-item">
                          <Link to={path} className="footer__menu-link">{name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4 – Contact Info */}
            <div className="footer__column">
              <div className="footer__widget">
                <h4 className="footer__subtitle">Contact Info</h4>
                <ul className="footer__contact-list">
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                    <div className="footer__contact-info">
                      <h5 className="footer__contact-label">Our Location</h5>
                      <a
                        href="https://maps.google.com/?q=87+Mettupalayam+Rd+Karamadai+Tamil+Nadu+641104"
                        target="_blank"
                        rel="noreferrer"
                        className="footer__contact-link"
                      >
                        Door No. 87, Mettupalayam Rd, Karamadai, Tamil Nadu 641104
                      </a>
                    </div>
                  </li>
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><FontAwesomeIcon icon={faPhoneVolume} /></span>
                    <div className="footer__contact-info">
                      <h5 className="footer__contact-label">Phone Number</h5>
                      <a href="tel:8098914008" className="footer__contact-link">8098914008</a>
                    </div>
                  </li>
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                    <div className="footer__contact-info">
                      <h5 className="footer__contact-label">Email Address</h5>
                      <a href="mailto:sitakshi@gmail.com" className="footer__contact-link">sitakshi@gmail.com</a>
                    </div>
                  </li>
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><FontAwesomeIcon icon={faClock} /></span>
                    <div className="footer__contact-info">
                      <h5 className="footer__contact-label">Working Hours</h5>
                      <p className="footer__contact-text">India: 9am to 6pm</p>
                      <p className="footer__contact-text">US: 7pm to 5am</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__copyright">
            <p className="footer__copyright-text">
              © {currentYear} <Link to="/" className="footer__copyright-link">Sitakshi Software Solutions</Link>. All Rights Reserved.
            </p>
            <ul className="footer__legal-list">
              <li className="footer__legal-item"><a href="#" className="footer__legal-link">Privacy Policy</a></li>
              <li className="footer__legal-item"><a href="#" className="footer__legal-link">Terms of Service</a></li>
              <li className="footer__legal-item"><a href="#" className="footer__legal-link">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;