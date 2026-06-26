import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

// ─────────────────────────────────────────────────────────────────
//  Sitakshi Software Solutions — 404 Not Found Page
//
//  Add to your router in PageRoute.jsx:
//    import NotFound from '../components/NotFound';
//    <Route path="*" element={<NotFound />} />
// ─────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .nf-page {
    min-height: 100vh;
    width: 100%;
    height: 100vh;
    background: #060f06;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 20px;
    margin: 0;
  }

  /* ── grid backdrop ── */
  .nf-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: nf-grid-breathe 4s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes nf-grid-breathe {
    0%,100% { opacity:0.5; } 50% { opacity:1; }
  }

  /* ── vignette ── */
  .nf-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%,
      transparent 30%, rgba(6,15,6,0.92) 100%);
    pointer-events: none;
  }

  /* ── corner brackets ── */
  .nf-corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border-color: rgba(34,197,94,0.25);
    border-style: solid;
    pointer-events: none;
  }
  .nf-corner.tl { top:20px;    left:20px;   border-width:2px 0 0 2px; }
  .nf-corner.tr { top:20px;    right:20px;  border-width:2px 2px 0 0; }
  .nf-corner.bl { bottom:20px; left:20px;   border-width:0 0 2px 2px; }
  .nf-corner.br { bottom:20px; right:20px;  border-width:0 2px 2px 0; }

  /* ── canvas for particles ── */
  .nf-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  /* ── content card ── */
  .nf-card {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    max-width: 600px;
    width: 100%;
    padding: 0 16px;
    margin: auto;
  }

  /* ── logo ── */
  .nf-logo {
    width: clamp(140px, 25vw, 200px);
    height: auto;
    display: block;
    margin-bottom: 20px;
    filter: drop-shadow(0 0 12px rgba(74,222,128,0.3));
    animation: nf-logo-float 4s ease-in-out infinite;
  }
  @keyframes nf-logo-float {
    0%,100% { transform:translateY(0);   filter:drop-shadow(0 0 12px rgba(74,222,128,0.3)); }
    50%      { transform:translateY(-8px); filter:drop-shadow(0 0 22px rgba(74,222,128,0.55)); }
  }

  /* ── 404 big number ── */
  .nf-code {
    font-family: 'Rajdhani', monospace;
    font-size: clamp(80px, 16vw, 140px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    color: transparent;
    background: linear-gradient(135deg, #166534 0%, #22c55e 40%, #86efac 60%, #22c55e 80%, #166534 100%);
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 200%;
    animation: nf-gradient-shift 3s ease-in-out infinite;
    position: relative;
    margin-bottom: 0;
  }
  @keyframes nf-gradient-shift {
    0%,100% { background-position: 0% 50%;   }
    50%      { background-position: 100% 50%; }
  }

  /* glitch layers on 404 */
  .nf-code::before,
  .nf-code::after {
    content: '404';
    position: absolute;
    top: 0; left: 0; right: 0;
    font-family: 'Rajdhani', monospace;
    font-size: inherit;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    pointer-events: none;
  }
  .nf-code::before {
    color: rgba(74,222,128,0.2);
    animation: nf-glitch-a 4s infinite;
    clip-path: inset(0 0 60% 0);
  }
  .nf-code::after {
    color: rgba(34,197,94,0.15);
    animation: nf-glitch-b 4s infinite;
    clip-path: inset(55% 0 0 0);
  }
  @keyframes nf-glitch-a {
    0%,89%,100% { transform:none; }
    90% { transform:translateX(-4px) skewX(-2deg); }
    93% { transform:translateX(4px); }
    96% { transform:none; }
  }
  @keyframes nf-glitch-b {
    0%,91%,100% { transform:none; }
    92% { transform:translateX(4px) skewX(2deg); }
    95% { transform:translateX(-3px); }
    98% { transform:none; }
  }

  /* ── divider line ── */
  .nf-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #22c55e, transparent);
    border-radius: 99px;
    margin: 10px auto 16px;
    animation: nf-divider-pulse 2s ease-in-out infinite;
  }
  @keyframes nf-divider-pulse {
    0%,100% { opacity:0.5; width:50px;  }
    50%      { opacity:1;   width:80px; }
  }

  /* ── headline ── */
  .nf-headline {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(18px, 3.5vw, 28px);
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  .nf-headline span { color: #4ade80; }

  /* ── subtext ── */
  .nf-sub {
    font-size: clamp(12px, 1.6vw, 14px);
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    max-width: 380px;
    line-height: 1.6;
    margin-bottom: 24px;
    letter-spacing: 0.01em;
  }

  /* ── button group ── */
  .nf-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  /* primary CTA */
  .nf-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 26px;
    background: linear-gradient(135deg, #15803d, #22c55e);
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 0 0 0 0 rgba(34,197,94,0);
  }
  .nf-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
      transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }
  .nf-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(34,197,94,0.35);
  }
  .nf-btn-primary:hover::before {
    transform: translateX(100%);
  }
  .nf-btn-primary:active { transform: translateY(0) scale(0.98); }

  /* secondary CTA */
  .nf-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    background: transparent;
    color: rgba(74,222,128,0.85);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    border: 1.5px solid rgba(34,197,94,0.4);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.18s ease, background 0.18s ease,
                color 0.18s ease, transform 0.18s ease;
  }
  .nf-btn-secondary:hover {
    border-color: rgba(74,222,128,0.8);
    background: rgba(34,197,94,0.08);
    color: #4ade80;
    transform: translateY(-2px);
  }
  .nf-btn-secondary:active { transform: translateY(0) scale(0.98); }

  /* ── scan line ── */
  .nf-scanline {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg,
      transparent, rgba(74,222,128,0.15) 30%,
      rgba(74,222,128,0.35) 50%,
      rgba(74,222,128,0.15) 70%, transparent);
    animation: nf-scan 5s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  @keyframes nf-scan {
    0%   { top:-2px;    opacity:0; }
    5%   { opacity:1; }
    95%  { opacity:1; }
    100% { top:100vh;   opacity:0; }
  }

  /* ── counter badge ── */
  .nf-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 99px;
    padding: 4px 12px;
    margin-bottom: 16px;
    font-size: 10px;
    font-weight: 500;
    color: rgba(74,222,128,0.7);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .nf-badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    animation: nf-dot-blink 1.2s ease-in-out infinite;
  }
  @keyframes nf-dot-blink {
    0%,100% { opacity:1; transform:scale(1);   }
    50%      { opacity:0.3; transform:scale(0.7); }
  }
`;

export default function NotFound() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // particle system on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.3 + Math.random() * 0.5),
      alpha: Math.random(),
      decay: 0.004 + Math.random() * 0.006,
    }));

    const reset = p => {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 10;
      p.r = 1 + Math.random() * 2.5;
      p.vx = (Math.random() - 0.5) * 0.35;
      p.vy = -(0.3 + Math.random() * 0.5);
      p.alpha = 0.6 + Math.random() * 0.4;
      p.decay = 0.004 + Math.random() * 0.006;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0 || p.y < -10) reset(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${Math.max(0, p.alpha)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="nf-page">
        {/* Backgrounds */}
        <div className="nf-grid" />
        <div className="nf-vignette" />
        <canvas ref={canvasRef} className="nf-canvas" />
        <div className="nf-scanline" />

        {/* Corners */}
        <div className="nf-corner tl" />
        <div className="nf-corner tr" />
        <div className="nf-corner bl" />
        <div className="nf-corner br" />

        {/* Main content */}
        <div className="nf-card">
          {/* Logo */}
          <img src={logo} alt="Sitakshi Software Solutions" className="nf-logo" draggable={false} />

          {/* Status badge */}
          <div className="nf-badge">
            <div className="nf-badge-dot" />
            Error 404 — Page not found
          </div>

          {/* 404 */}
          <div className="nf-code">404</div>

          {/* Divider */}
          <div className="nf-divider" />

          {/* Headline */}
          <h1 className="nf-headline">
            Oops! <span>Lost in</span> Space
          </h1>

          {/* Sub */}
          <p className="nf-sub">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Buttons */}
          <div className="nf-actions">
            <button className="nf-btn-primary" onClick={() => navigate("/")}>
              ← Go Back Home
            </button>
            <button className="nf-btn-secondary" onClick={() => navigate(-1)}>
              ↩ Previous Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}