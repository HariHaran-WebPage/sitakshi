import React, { useRef, useEffect, useState } from "react";
import "../../../Style/HomeCss/Contact.css";

const contactInfo = [
  {
    icon: "ti-mail",
    label: "Email Us",
    value: "hello@yoursite.com",
    href: "mailto:hello@yoursite.com",
    delay: 0,
  },
  {
    icon: "ti-phone",
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    delay: 80,
  },
  {
    icon: "ti-map-pin",
    label: "Our Office",
    value: "Chennai, Tamil Nadu, India",
    href: "https://maps.google.com/?q=Chennai,Tamil+Nadu",
    delay: 160,
  },
  {
    icon: "ti-clock",
    label: "Working Hours",
    value: "Mon – Sat, 9am – 6pm IST",
    href: null,
    delay: 240,
  },
];

const services = [
  "Web Design & Development",
  "React / Next.js App",
  "Node.js Backend",
  "Python / Django",
  "MongoDB Database",
  "AI / ML Integration",
  "Other",
];

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contactInfo.forEach((_, i) => {
            setTimeout(() => {
              setCardsVisible((prev) => [...prev, i]);
            }, contactInfo[i].delay);
          });
          setTimeout(() => setFormVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Valid email is required";
    if (!formData.service) e.service = "Please select a service";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
      }, 4000);
    }, 1200);
  };

  return (
    <section
      className="ct-section"
      ref={sectionRef}
      aria-label="Contact Us"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* SEO-friendly hidden metadata */}
      <meta itemProp="name" content="Contact Our Development Team" />
      <meta itemProp="description" content="Get in touch with our expert web development team in Chennai, Tamil Nadu. We specialize in React, Node.js, Python, and AI/ML integration." />

      {/* Decorative background */}
      <div className="ct-bg" aria-hidden="true">
        <div className="ct-bg-grid" />
        <div className="ct-bg-blob ct-bg-blob-1" />
        <div className="ct-bg-blob ct-bg-blob-2" />
        <div className="ct-bg-accent-line" />
      </div>

      <div className="container position-relative">

        {/* ── Section Header ── */}
        <header className="ct-header">
          <div className="ct-eyebrow-wrap">
            <span className="ct-eyebrow-line" aria-hidden="true" />
            <span className="ct-eyebrow">Contact Us</span>
            <span className="ct-eyebrow-line" aria-hidden="true" />
          </div>
          <h2 className="ct-heading">
            Start Your <span className="ct-accent-text">Next Project</span><br />
            With Our Expert Team
          </h2>
          <p className="ct-sub">
            We're a Chennai-based software development studio specializing in modern web apps,
            AI integration, and scalable cloud solutions. Let's build something remarkable together.
          </p>

          {/* Trust signals */}
          <div className="ct-trust-row" aria-label="Trust indicators">
            {[
              { icon: "ti-shield-check", text: "100% Confidential" },
              { icon: "ti-bolt", text: "Response in 2hrs" },
              { icon: "ti-star", text: "5★ Client Rating" },
              { icon: "ti-certificate", text: "5+ Years Experience" },
            ].map((t, i) => (
              <div className="ct-trust-item" key={i}>
                <i className={`ti ${t.icon}`} aria-hidden="true" />
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── Two-column body ── */}
        <div className="ct-body">

          {/* LEFT — Contact info + map CTA */}
          <aside className="ct-sidebar" aria-label="Contact information">

            <h3 className="ct-sidebar-title">Get In Touch</h3>
            <p className="ct-sidebar-desc">
              Reach out through any channel. We're always happy to discuss your ideas.
            </p>

            <div className="ct-cards">
              {contactInfo.map((item, i) => {
                const Tag = item.href ? "a" : "div";
                const linkProps = item.href
                  ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined }
                  : {};
                return (
                  <Tag
                    key={i}
                    className={`ct-card ${cardsVisible.includes(i) ? "ct-card--in" : ""}`}
                    style={{ transitionDelay: `${item.delay}ms` }}
                    {...linkProps}
                    itemProp={item.label === "Email Us" ? "email" : item.label === "Call Us" ? "telephone" : undefined}
                    content={item.value}
                  >
                    <div className="ct-card-icon" aria-hidden="true">
                      <i className={`ti ${item.icon}`} />
                    </div>
                    <div className="ct-card-body">
                      <span className="ct-card-label">{item.label}</span>
                      <span className="ct-card-value">{item.value}</span>
                    </div>
                    {item.href && (
                      <i className="ti ti-arrow-up-right ct-card-arrow" aria-hidden="true" />
                    )}
                  </Tag>
                );
              })}
            </div>

            {/* Social links */}
            <div className="ct-socials">
              <span className="ct-socials-label">Follow Us</span>
              <div className="ct-socials-icons">
                {[
                  { icon: "ti-brand-linkedin", href: "#", label: "LinkedIn" },
                  { icon: "ti-brand-github", href: "#", label: "GitHub" },
                  { icon: "ti-brand-twitter", href: "#", label: "Twitter / X" },
                  { icon: "ti-brand-instagram", href: "#", label: "Instagram" },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="ct-social-icon" rel="noopener noreferrer">
                    <i className={`ti ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT — Contact form */}
          <div className={`ct-form-card ${formVisible ? "ct-form-card--in" : ""}`}>

            {submitted ? (
              <div className="ct-success" role="alert" aria-live="polite">
                <div className="ct-success-icon">
                  <i className="ti ti-circle-check" aria-hidden="true" />
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

                <div className="ct-form-header">
                  <h3>Send Us a Message</h3>
                  <p>Fill in your details and we'll be in touch shortly.</p>
                </div>

                {/* Row: Name + Email */}
                <div className="ct-form-row">
                  <div className={`ct-field ${errors.name ? "ct-field--error" : ""}`}>
                    <label htmlFor="ct-name">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <div className="ct-input-wrap">
                      <i className="ti ti-user" aria-hidden="true" />
                      <input
                        id="ct-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? "err-name" : undefined}
                      />
                    </div>
                    {errors.name && <span className="ct-error" id="err-name" role="alert">{errors.name}</span>}
                  </div>

                  <div className={`ct-field ${errors.email ? "ct-field--error" : ""}`}>
                    <label htmlFor="ct-email">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <div className="ct-input-wrap">
                      <i className="ti ti-mail" aria-hidden="true" />
                      <input
                        id="ct-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? "err-email" : undefined}
                      />
                    </div>
                    {errors.email && <span className="ct-error" id="err-email" role="alert">{errors.email}</span>}
                  </div>
                </div>

                {/* Row: Phone + Company */}
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label htmlFor="ct-phone">Phone Number</label>
                    <div className="ct-input-wrap">
                      <i className="ti ti-phone" aria-hidden="true" />
                      <input
                        id="ct-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-company">Company / Organisation</label>
                    <div className="ct-input-wrap">
                      <i className="ti ti-building" aria-hidden="true" />
                      <input
                        id="ct-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        autoComplete="organization"
                      />
                    </div>
                  </div>
                </div>

                {/* Row: Service + Budget */}
                <div className="ct-form-row">
                  <div className={`ct-field ${errors.service ? "ct-field--error" : ""}`}>
                    <label htmlFor="ct-service">
                      Service Required <span aria-hidden="true">*</span>
                    </label>
                    <div className="ct-input-wrap ct-select-wrap">
                      <i className="ti ti-tools" aria-hidden="true" />
                      <select
                        id="ct-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        aria-required="true"
                        aria-describedby={errors.service ? "err-service" : undefined}
                      >
                        <option value="" disabled>Select a service…</option>
                        {services.map((s, i) => (
                          <option key={i} value={s}>{s}</option>
                        ))}
                      </select>
                      <i className="ti ti-chevron-down ct-select-arrow" aria-hidden="true" />
                    </div>
                    {errors.service && <span className="ct-error" id="err-service" role="alert">{errors.service}</span>}
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-budget">Estimated Budget</label>
                    <div className="ct-input-wrap ct-select-wrap">
                      <i className="ti ti-currency-rupee" aria-hidden="true" />
                      <select
                        id="ct-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select budget range…</option>
                        <option value="under-50k">Under ₹50,000</option>
                        <option value="50k-2l">₹50,000 – ₹2,00,000</option>
                        <option value="2l-5l">₹2,00,000 – ₹5,00,000</option>
                        <option value="5l+">₹5,00,000+</option>
                        <option value="discuss">Let's Discuss</option>
                      </select>
                      <i className="ti ti-chevron-down ct-select-arrow" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className={`ct-field ${errors.message ? "ct-field--error" : ""}`}>
                  <label htmlFor="ct-message">
                    Project Details <span aria-hidden="true">*</span>
                  </label>
                  <div className="ct-input-wrap ct-textarea-wrap">
                    <i className="ti ti-message" aria-hidden="true" />
                    <textarea
                      id="ct-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, timeline, and any specific requirements…"
                      aria-required="true"
                      aria-describedby={errors.message ? "err-message" : undefined}
                    />
                  </div>
                  {errors.message && <span className="ct-error" id="err-message" role="alert">{errors.message}</span>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`ct-btn ${loading ? "ct-btn--loading" : ""}`}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <i className="ti ti-loader-2 ct-spin" aria-hidden="true" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="ti ti-send" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="ct-privacy">
                  <i className="ti ti-lock" aria-hidden="true" />
                  Your information is secure and will never be shared with third parties.
                </p>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;