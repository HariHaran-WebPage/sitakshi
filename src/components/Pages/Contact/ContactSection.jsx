import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, resetContactState } from "../../../redux/contactSlice";
import validator from "validator";

/* ── inline styles match About page: Poppins + Playfair Display, #0a0a0a / #16a34a palette ── */

const S = {
  section: {
    background: "#fff",
    padding: "96px 64px",
    fontFamily: "'Poppins', sans-serif",
    color: "#0a0a0a",
  },
  inner: {
    maxWidth: 1320,
    margin: "0 auto",
  },
  /* ── header ── */
  tag: {
    display: "inline-block",
    background: "#f0fdf4",
    color: "#15803d",
    fontSize: 11,
    fontWeight: 600,
    padding: "5px 16px",
    borderRadius: 30,
    marginBottom: 18,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    border: "1px solid #bbf7d0",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 42,
    fontWeight: 900,
    color: "#0a0a0a",
    lineHeight: 1.1,
    marginBottom: 16,
    letterSpacing: "-0.5px",
  },
  headingAccent: {
    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 55%, #4ade80 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subheading: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 1.75,
    marginBottom: 0,
    maxWidth: 520,
  },
  headerBlock: {
    marginBottom: 60,
  },
  /* ── grid ── */
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.1fr",
    gap: 32,
    alignItems: "start",
  },
  /* ── info card (dark) ── */
  infoCard: {
    background: "#0a0a0a",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    position: "relative",
  },
  infoCardBar: {
    height: 4,
    background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
    width: "100%",
  },
  infoInner: {
    padding: "40px 40px 0",
  },
  infoTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 8,
    letterSpacing: "-0.3px",
  },
  infoDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
    marginBottom: 36,
  },
  method: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "16px 18px",
    borderRadius: 14,
    marginBottom: 12,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "rgba(34,197,94,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4ade80",
    fontSize: 20,
    flexShrink: 0,
  },
  methodLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 3,
  },
  methodValue: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.5,
  },
  methodValueLink: {
    fontSize: 14,
    fontWeight: 600,
    color: "#4ade80",
    textDecoration: "none",
    lineHeight: 1.5,
  },
  /* social row */
  socialRow: {
    display: "flex",
    gap: 12,
    padding: "28px 40px 40px",
  },
  socialBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.6)",
    fontSize: 18,
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  /* map */
  mapWrap: {
    margin: "0 0 0",
    borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  /* ── form card ── */
  formCard: {
    background: "#fff",
    borderRadius: 24,
    border: "1px solid #f1f5f9",
    overflow: "hidden",
    boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
  },
  formCardBar: {
    height: 4,
    background: "linear-gradient(90deg, #22c55e, #4ade80, #bbf7d0)",
    width: "100%",
  },
  formInner: {
    padding: "40px 40px 40px",
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    fontWeight: 900,
    color: "#0a0a0a",
    marginBottom: 28,
    letterSpacing: "-0.3px",
    position: "relative",
    paddingBottom: 16,
    borderBottom: "1px solid #f1f5f9",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 8,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    color: "#0a0a0a",
    background: "#fafafa",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.10)",
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    color: "#0a0a0a",
    background: "#fafafa",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    color: "#0a0a0a",
    background: "#fafafa",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    outline: "none",
    resize: "vertical",
    minHeight: 120,
    lineHeight: 1.65,
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  errMsg: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontWeight: 500,
  },
  submitBtn: {
    width: "100%",
    padding: "14px 24px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    background: "#16a34a",
    border: "none",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 6px 20px rgba(22,163,74,0.30)",
    letterSpacing: "0.02em",
  },
  submitBtnHover: {
    background: "#15803d",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 28px rgba(22,163,74,0.40)",
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite",
  },
  /* modal */
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalBox: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 440,
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
    margin: "0 20px",
  },
  modalTop: {
    height: 4,
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
  },
  modalTopError: {
    height: 4,
    background: "linear-gradient(90deg, #ef4444, #fca5a5)",
  },
  modalBody: {
    padding: "36px 36px 28px",
    textAlign: "center",
  },
  modalIconWrap: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  modalIconSuccess: {
    background: "#f0fdf4",
    color: "#16a34a",
    fontSize: 28,
  },
  modalIconError: {
    background: "#fef2f2",
    color: "#ef4444",
    fontSize: 28,
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 900,
    color: "#0a0a0a",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 1.75,
  },
  modalFooter: {
    padding: "0 36px 36px",
    display: "flex",
    justifyContent: "center",
  },
  modalBtn: {
    padding: "12px 40px",
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    border: "none",
    borderRadius: 50,
    cursor: "pointer",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  modalBtnSuccess: {
    background: "#16a34a",
    boxShadow: "0 6px 20px rgba(22,163,74,0.3)",
  },
  modalBtnError: {
    background: "#ef4444",
    boxShadow: "0 6px 20px rgba(239,68,68,0.3)",
  },
};

const serviceTypes = [
  "consultation",
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Content Management System",
  "AI Software Development",
  "Web Maintenance",
  "Search Engine Optimization",
  "Social Media Optimization",
  "Domain Registration",
  "Business Email",
  "Payment Gateway",
  "PowerPoint Presentation",
  "other",
];

const SOCIALS = [
  { icon: "ti ti-brand-facebook", href: "https://www.facebook.com/share/1BmryXmvem/", label: "Facebook" },
  { icon: "ti ti-brand-instagram", href: "https://www.instagram.com", label: "Instagram" },
  { icon: "ti ti-brand-linkedin", href: "https://www.linkedin.com/company/zelton-solutions/", label: "LinkedIn" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    serviceType: "consultation",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [btnHover, setBtnHover] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.contact);
  const isSubmitting = status === "loading";

  const validateName = (v) => {
    if (!v.trim()) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(v)) return "Letters only please";
    return "";
  };
  const validateEmail = (v) => {
    if (!v.trim()) return "Email is required";
    if (!validator.isEmail(v)) return "Enter a valid email address";
    return "";
  };
  const validateMessage = (v) => {
    if (!v.trim()) return "Message is required";
    if (v.length < 10) return "At least 10 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = name === "name" ? value.replace(/[^A-Za-z\s]/g, "") : value;
    setFormData((p) => ({ ...p, [name]: next }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    dispatch(submitContactForm(formData))
      .unwrap()
      .then(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phoneNo: "", serviceType: "consultation", message: "" });
      })
      .catch(() => setSubmitStatus("error"));
  };

  const closeModal = () => {
    setSubmitStatus(null);
    dispatch(resetContactState());
  };

  const focusStyle = (field) =>
    focusedField === field
      ? { borderColor: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.12)", background: "#fff" }
      : {};

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/dist/tabler-icons.min.css"
        rel="stylesheet"
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <section style={S.section} id="contact">
        <div style={S.inner}>

          {/* Header */}
          <div style={S.headerBlock}>
            <div style={S.tag}>Get in Touch</div>
            <h2 style={S.heading}>
              Let's Build Something <span style={S.headingAccent}>Great</span>
            </h2>
            <p style={S.subheading}>
              Have a project in mind? Share your vision and we'll help bring it to life — fast, focused, and built to scale.
            </p>
          </div>

          {/* Grid */}
          <div style={S.grid}>

            {/* ── Info card ── */}
            <div style={S.infoCard}>
              <div style={S.infoCardBar} />
              <div style={S.infoInner}>
                <div style={S.infoTitle}>Contact Information</div>
                <div style={S.infoDesc}>Reach us directly or drop a message — we respond within 24 hours.</div>

                {/* Phone 1 */}
                <a href="tel:+918098914008" style={{ ...S.method, textDecoration: "none" }}>
                  <div style={S.methodIcon}><i className="ti ti-phone" aria-hidden="true" /></div>
                  <div>
                    <div style={S.methodLabel}>Call us</div>
                    <div style={S.methodValueLink}>+91 80989 14008</div>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:sitakshi@gmail.com" style={{ ...S.method, textDecoration: "none" }}>
                  <div style={S.methodIcon}><i className="ti ti-mail" aria-hidden="true" /></div>
                  <div>
                    <div style={S.methodLabel}>Email us</div>
                    <div style={S.methodValueLink}>sitakshi@gmail.com</div>
                  </div>
                </a>

                {/* Address */}
                <div style={S.method}>
                  <div style={S.methodIcon}><i className="ti ti-map-pin" aria-hidden="true" /></div>
                  <div>
                    <div style={S.methodLabel}>Visit us</div>
                    <div style={{ ...S.methodValue, fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                      Door No. 87, Mettupalayam Rd,<br />
                      Karamadai, Tamil Nadu 641104
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div style={S.socialRow}>
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label} style={S.socialBtn}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,197,94,0.15)"; e.currentTarget.style.color = "#4ade80"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}>
                    <i className={s.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>

              {/* Map */}
              <div style={S.mapWrap}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.4812!2d76.9456!3d11.2456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7c5c5c5c5c5%3A0x0!2sMettupalayam+Rd%2C+Karamadai%2C+Tamil+Nadu+641104!5e0!3m2!1sen!2sin!4v1716012185986!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location"
                />
              </div>
            </div>

            {/* ── Form card ── */}
            <div style={S.formCard}>
              <div style={S.formCardBar} />
              <div style={S.formInner}>
                <div style={S.formTitle}>Send us a message</div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name + Email row */}
                  <div style={S.row2}>
                    <div style={S.formGroup}>
                      <label style={S.label}>Your Name</label>
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Full name"
                        style={{ ...S.input, ...(errors.name ? S.inputError : focusStyle("name")) }}
                      />
                      {errors.name && <div style={S.errMsg}><i className="ti ti-alert-circle" style={{ fontSize: 14 }} aria-hidden="true" />{errors.name}</div>}
                    </div>
                    <div style={S.formGroup}>
                      <label style={S.label}>Email Address</label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@company.com"
                        style={{ ...S.input, ...(errors.email ? S.inputError : focusStyle("email")) }}
                      />
                      {errors.email && <div style={S.errMsg}><i className="ti ti-alert-circle" style={{ fontSize: 14 }} aria-hidden="true" />{errors.email}</div>}
                    </div>
                  </div>

                  {/* Phone + Service row */}
                  <div style={S.row2}>
                    <div style={S.formGroup}>
                      <label style={S.label}>Phone (optional)</label>
                      <input
                        type="tel" name="phoneNo" value={formData.phoneNo}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phoneNo")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+91 xxxxxxxxxx"
                        style={{ ...S.input, ...focusStyle("phoneNo") }}
                      />
                    </div>
                    <div style={S.formGroup}>
                      <label style={S.label}>Service Type</label>
                      <div style={{ position: "relative" }}>
                        <select
                          name="serviceType" value={formData.serviceType}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("serviceType")}
                          onBlur={() => setFocusedField(null)}
                          style={{ ...S.select, ...focusStyle("serviceType") }}
                        >
                          {serviceTypes.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        <i className="ti ti-chevron-down" aria-hidden="true" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#9ca3af", pointerEvents: "none" }} />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={S.formGroup}>
                    <label style={S.label}>Message</label>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project goals and requirements..."
                      style={{ ...S.textarea, ...(errors.message ? S.inputError : focusStyle("message")) }}
                    />
                    {errors.message && <div style={S.errMsg}><i className="ti ti-alert-circle" style={{ fontSize: 14 }} aria-hidden="true" />{errors.message}</div>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ ...S.submitBtn, ...(btnHover && !isSubmitting ? S.submitBtnHover : {}), ...(isSubmitting ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                  >
                    {isSubmitting ? (
                      <><div style={S.spinner} />Sending...</>
                    ) : (
                      <><i className="ti ti-send" aria-hidden="true" style={{ fontSize: 18 }} />Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ── Modal ── */}
        {submitStatus && (
          <div style={S.modalBackdrop} onClick={closeModal}>
            <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
              <div style={submitStatus === "success" ? S.modalTop : S.modalTopError} />
              <div style={S.modalBody}>
                <div style={{ ...S.modalIconWrap, ...(submitStatus === "success" ? S.modalIconSuccess : S.modalIconError) }}>
                  <i className={submitStatus === "success" ? "ti ti-check" : "ti ti-x"} aria-hidden="true" />
                </div>
                <div style={S.modalTitle}>{submitStatus === "success" ? "Message Sent!" : "Submission Failed"}</div>
                <div style={S.modalText}>
                  {submitStatus === "success"
                    ? "Thank you! We've received your inquiry and will respond within 24 hours."
                    : error || "Please check your connection and try again."}
                </div>
              </div>
              <div style={S.modalFooter}>
                <button
                  style={{ ...S.modalBtn, ...(submitStatus === "success" ? S.modalBtnSuccess : S.modalBtnError) }}
                  onClick={closeModal}
                >
                  {submitStatus === "success" ? "Close" : "Try Again"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}