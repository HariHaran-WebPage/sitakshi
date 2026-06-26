import { useEffect, useState, useRef } from "react";
import logo from "../../public/logo.png";

// ─────────────────────────────────────────────────────────────────
//  Sitakshi Software Solutions — Page Loader  (Fast Wipe Reveal)
// ─────────────────────────────────────────────────────────────────

const CSS = `
  .ssl-overlay *, .ssl-overlay *::before, .ssl-overlay *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  .ssl-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #060f06;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1),
                visibility 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .ssl-overlay.ssl-done {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* grid */
  .ssl-grid {
    position: absolute;
    inset: -10px;
    background-image:
      linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: ssl-grid-breathe 4s ease-in-out infinite;
  }
  @keyframes ssl-grid-breathe {
    0%,100% { opacity:0.5; } 50% { opacity:1; }
  }

  /* vignette */
  .ssl-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 70% at 50% 50%,
      transparent 40%, rgba(6,15,6,0.9) 100%);
    pointer-events: none;
  }

  /* corner brackets */
  .ssl-corner {
    position: absolute;
    width: 52px; height: 52px;
    border-color: rgba(34,197,94,0.35);
    border-style: solid;
    animation: ssl-corner-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ssl-corner.tl { top:20px;    left:20px;   border-width:2px 0 0 2px; animation-delay:.05s }
  .ssl-corner.tr { top:20px;    right:20px;  border-width:2px 2px 0 0; animation-delay:.1s  }
  .ssl-corner.bl { bottom:20px; left:20px;   border-width:0 0 2px 2px; animation-delay:.15s }
  .ssl-corner.br { bottom:20px; right:20px;  border-width:0 2px 2px 0; animation-delay:.2s  }
  @keyframes ssl-corner-in {
    from { opacity:0; transform:scale(0.6); }
    to   { opacity:1; transform:scale(1);   }
  }

  /* particles */
  .ssl-particle {
    position: absolute;
    border-radius: 50%;
    background: #4ade80;
    opacity: 0;
    animation: ssl-particle-up var(--pdur) ease-in-out var(--pdel) infinite;
  }
  @keyframes ssl-particle-up {
    0%   { opacity:0;   transform:translateY(0)      scale(0.4); }
    25%  { opacity:0.7; }
    75%  { opacity:0.2; }
    100% { opacity:0;   transform:translateY(-220px) scale(1.3); }
  }

  /* sweeping beam behind logo */
  .ssl-beam-track {
    position: absolute;
    top: 50%; left: 0; right: 0;
    height: 130px;
    transform: translateY(-65px);
    pointer-events: none;
    overflow: hidden;
  }
  .ssl-beam {
    position: absolute;
    top: 0; left: -35%;
    width: 35%; height: 100%;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(74,222,128,0.05) 35%,
      rgba(74,222,128,0.15) 55%,
      rgba(74,222,128,0.05) 75%,
      transparent 100%
    );
    /* beam sweeps every 1.2s — matches wipe cycle */
    animation: ssl-beam-sweep 1.2s cubic-bezier(0.4,0,0.6,1) infinite;
  }
  @keyframes ssl-beam-sweep {
    0%   { left:-35%; }
    100% { left:110%; }
  }

  /* ── LOGO WIPE ──
     Cycle: 1.2 s total
       0   → 0.35s  : mask slides LEFT (logo reveals fast)
       0.35→ 0.9s   : logo fully visible
       0.9 → 1.2s   : logo hides instantly (mask snaps back)
  */
  .ssl-logo-wrap {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 44px;
  }

  .ssl-logo-mask {
    position: relative;
    overflow: hidden;
    display: block;
  }

  /* Dark mask that wipes away LEFT → revealing logo */
  .ssl-logo-mask::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #060f06;
    transform-origin: left;           /* anchored at LEFT */
    z-index: 2;
    animation: ssl-mask-wipe 1.2s cubic-bezier(0.77,0,0.18,1) infinite;
  }
  @keyframes ssl-mask-wipe {
    /* mask starts FULL width (hiding logo) */
    0%    { transform: scaleX(1);  transform-origin: left;  }
    /* fast wipe: mask shrinks from right → left (logo appears left→right) */
    29%   { transform: scaleX(0);  transform-origin: right; }
    /* logo fully visible – hold */
    75%   { transform: scaleX(0);  transform-origin: right; }
    /* snap mask back instantly from left */
    76%   { transform: scaleX(1);  transform-origin: left;  }
    100%  { transform: scaleX(1);  transform-origin: left;  }
  }

  /* Glowing edge line that races across during wipe */
  .ssl-logo-mask::after {
    content: '';
    position: absolute;
    top: -4px; bottom: -4px;
    width: 4px;
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(134,239,172,0.6) 15%,
      #4ade80 50%,
      rgba(134,239,172,0.6) 85%,
      transparent 100%
    );
    box-shadow: 0 0 10px 3px rgba(74,222,128,0.9),
                0 0 20px 6px rgba(74,222,128,0.4);
    z-index: 3;
    border-radius: 99px;
    animation: ssl-edge-line 1.2s cubic-bezier(0.77,0,0.18,1) infinite;
  }
  @keyframes ssl-edge-line {
    0%    { left: 0%;    opacity: 1; }
    29%   { left: 100%;  opacity: 1; }
    30%   { left: 100%;  opacity: 0; }
    75%   { left: 100%;  opacity: 0; }
    76%   { left: 0%;    opacity: 0; }
    100%  { left: 0%;    opacity: 0; }
  }

  /* Logo image */
  .ssl-logo-img {
    display: block;
    width: clamp(200px, 36vw, 320px);
    height: auto;
    animation: ssl-logo-glow 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  @keyframes ssl-logo-glow {
    0%,28%  { filter: drop-shadow(0 0 0px  rgba(74,222,128,0));    }
    40%     { filter: drop-shadow(0 0 20px rgba(74,222,128,0.65)); }
    70%     { filter: drop-shadow(0 0 12px rgba(74,222,128,0.35)); }
    76%     { filter: drop-shadow(0 0 0px  rgba(74,222,128,0));    }
    100%    { filter: drop-shadow(0 0 0px  rgba(74,222,128,0));    }
  }

  /* tagline */
  .ssl-tagline {
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: clamp(8px, 1.1vw, 10px);
    font-weight: 500;
    letter-spacing: 0.42em;
    color: rgba(74,222,128,0.65);
    text-transform: uppercase;
    margin-top: 12px;
    animation: ssl-tagline-in 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  @keyframes ssl-tagline-in {
    0%,25%  { opacity:0; transform:translateY(5px);  }
    40%     { opacity:1; transform:translateY(0);    }
    70%     { opacity:1; }
    76%     { opacity:0; }
    100%    { opacity:0; }
  }

  /* progress */
  .ssl-progress-wrap {
    position: relative; z-index: 2;
    width: clamp(200px, 36vw, 320px);
    display: flex; flex-direction: column;
    align-items: stretch; gap: 8px;
  }
  .ssl-bar-row {
    display: flex; align-items: center;
    justify-content: space-between; gap: 12px;
  }
  .ssl-bar-track {
    flex: 1; height: 2px;
    background: rgba(34,197,94,0.12);
    border-radius: 99px; overflow: hidden; position: relative;
  }
  .ssl-bar-track::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%);
    animation: ssl-shimmer 1s ease-in-out infinite;
  }
  @keyframes ssl-shimmer {
    from { transform:translateX(-100%); }
    to   { transform:translateX(100%);  }
  }
  .ssl-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #166534, #4ade80, #86efac);
    border-radius: 99px;
    transition: width 0.22s ease;
    box-shadow: 0 0 6px rgba(74,222,128,0.75);
  }
  .ssl-pct {
    font-family: 'Courier New', monospace;
    font-size: 11px; font-weight: 600;
    color: rgba(74,222,128,0.65);
    min-width: 36px; text-align: right;
    letter-spacing: 0.05em;
  }
  .ssl-status {
    font-family: 'Courier New', monospace;
    font-size: 10px;
    color: rgba(34,197,94,0.4);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    min-height: 14px;
    transition: opacity 0.25s ease;
  }
`;

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left:   `${6  + Math.random() * 88}%`,
  bottom: `${2  + Math.random() * 28}%`,
  size:   `${2.5 + Math.random() * 3.5}px`,
  pdur:   `${2  + Math.random() * 3}s`,
  pdel:   `${Math.random() * 3}s`,
}));

const STATUSES = [
  "Initializing modules...",
  "Loading assets...",
  "Compiling components...",
  "Almost ready...",
  "Launching...",
];

export default function PageLoader({ children }) {
  const [progress, setProgress] = useState(0);
  const [done,     setDone]     = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [status,   setStatus]   = useState(STATUSES[0]);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    let si = 0;
    const statusTimer = setInterval(() => {
      si = (si + 1) % STATUSES.length;
      setStatus(STATUSES[si]);
    }, 900);

    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 80) { clearInterval(intervalRef.current); return p; }
        return Math.min(p + Math.random() * 9 + 2, 80);
      });
    }, 100);

    const finish = () => {
      clearInterval(intervalRef.current);
      clearInterval(statusTimer);
      setStatus("Ready!");
      setProgress(100);
      setTimeout(() => setDone(true), 700);
    };

    if (document.readyState === "complete") {
      setTimeout(finish, 500);
    } else {
      window.addEventListener("load", finish, { once: true });
      const safety = setTimeout(finish, 5000);
      return () => {
        clearInterval(intervalRef.current);
        clearInterval(statusTimer);
        clearTimeout(safety);
      };
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <>
      {mounted && <style>{CSS}</style>}
      {children}

      <div className={`ssl-overlay${done ? " ssl-done" : ""}`}>
        <div className="ssl-grid" />
        <div className="ssl-vignette" />

        <div className="ssl-beam-track">
          <div className="ssl-beam" />
        </div>

        <div className="ssl-corner tl" />
        <div className="ssl-corner tr" />
        <div className="ssl-corner bl" />
        <div className="ssl-corner br" />

        {PARTICLES.map(p => (
          <div key={p.id} className="ssl-particle" style={{
            left: p.left, bottom: p.bottom,
            width: p.size, height: p.size,
            "--pdur": p.pdur, "--pdel": p.pdel,
          }} />
        ))}

        <div className="ssl-logo-wrap">
          <div className="ssl-logo-mask">
            <img
              src={logo}
              alt="Sitakshi Software Solutions"
              className="ssl-logo-img"
              draggable={false}
            />
          </div>
          <div className="ssl-tagline">Software Solutions</div>
        </div>

        <div className="ssl-progress-wrap">
          <div className="ssl-bar-row">
            <div className="ssl-bar-track">
              <div className="ssl-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <div className="ssl-pct">{Math.min(Math.round(progress), 100)}%</div>
          </div>
          <div className="ssl-status">{status}</div>
        </div>
      </div>
    </>
  );
}