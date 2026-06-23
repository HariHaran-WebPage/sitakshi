import { useState, useRef, useEffect } from 'react';

const colors = {
  primary: '#00a34d',
  primaryDark: '#008040',
  primaryLight: '#e6f7ee',
  secondary: '#ffffff',
  text: '#2a2a2a',
  textLight: '#6c757d',
  textLighter: '#a0a8b0',
  border: '#e9ecef',
};

const botResponses = {
  default: "Thanks for reaching out! Our team will get back to you shortly. You can also call us or send an email.",
  services: "We offer Frontend Development, Backend Development, Full Stack, SEO, Social Media, PPC, Email Marketing, and Content Marketing. Which interests you?",
  pricing: "Our pricing depends on the project scope. Please visit our Contact page or WhatsApp us for a custom quote!",
  contact: "You can reach us via our Contact page, WhatsApp, or email. We typically respond within 24 hours.",
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('service') || lower.includes('offer') || lower.includes('do you')) return botResponses.services;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) return botResponses.pricing;
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('call')) return botResponses.contact;
  return botResponses.default;
}

function FloatingChatbot({ agentName = 'Support', agentAvatar = null }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 How can we help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(trimmed) }]);
    }, 1000);
  };

  const sendQuick = (q) => {
    setMessages(prev => [...prev, { from: 'user', text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(q) }]);
    }, 800);
  };

  const handleKey = e => { if (e.key === 'Enter') sendMessage(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        .fchat-wrap * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        @keyframes fchat-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes fchat-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        @keyframes fchat-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,163,77,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(0,163,77,0);  }
        }

        .fchat-window {
          animation: fchat-slideUp 0.25s ease;
        }

        .fchat-toggle {
          animation: fchat-pulse 2.5s ease-in-out infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }

        .fchat-toggle:hover {
          transform: scale(1.1) !important;
        }

        .fchat-quick-btn {
          transition: background 0.15s, color 0.15s;
        }

        .fchat-quick-btn:hover {
          background: #00a34d !important;
          color: #fff !important;
          border-color: #00a34d !important;
        }

        .fchat-send:hover {
          background: #008040 !important;
        }

        .fchat-input-wrap input::placeholder {
          color: #a0a8b0;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
        }

        .fchat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .fchat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .fchat-messages::-webkit-scrollbar-thumb {
          background: #e9ecef;
          border-radius: 4px;
        }
      `}</style>

      <div className="fchat-wrap">

        {/* ── Chat Window ── */}
        {open && (
          <div className="fchat-window" style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '340px',
            borderRadius: '20px',
            backgroundColor: colors.secondary,
            boxShadow: '0 12px 48px rgba(0,0,0,0.16)',
            zIndex: 1001,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${colors.border}`,
          }}>

            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative',
            }}>
              {/* Avatar */}
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                {agentAvatar || (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>

              {/* Name + status */}
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: 0,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '15px',
                  letterSpacing: '0.01em',
                }}>{agentName}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#7dffb3',
                    display: 'inline-block',
                  }} />
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '11px' }}>Online — typically replies instantly</p>
                </div>
              </div>

              {/* Close */}
              <button onClick={() => setOpen(false)} style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>✕</button>
            </div>

            {/* Greeting banner */}
            <div style={{
              background: colors.primaryLight,
              padding: '10px 18px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '16px' }}>💬</span>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: colors.primaryDark,
                fontWeight: 500,
              }}>Ask us anything — we're here to help!</p>
            </div>

            {/* Messages */}
            <div className="fchat-messages" style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '260px',
              backgroundColor: '#f8faf9',
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '6px',
                }}>
                  {/* Bot avatar dot */}
                  {msg.from === 'bot' && (
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: colors.primaryLight,
                      border: `1px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      flexShrink: 0,
                    }}>🤖</div>
                  )}
                  <div style={{
                    maxWidth: '75%',
                    padding: '10px 13px',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: '13px',
                    lineHeight: 1.55,
                    fontWeight: 400,
                    backgroundColor: msg.from === 'user' ? colors.primary : colors.secondary,
                    color: msg.from === 'user' ? '#fff' : colors.text,
                    boxShadow: msg.from === 'user'
                      ? '0 2px 8px rgba(0,163,77,0.25)'
                      : '0 1px 4px rgba(0,0,0,0.07)',
                    border: msg.from === 'bot' ? `1px solid ${colors.border}` : 'none',
                  }}>{msg.text}</div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: colors.primaryLight,
                    border: `1px solid ${colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px',
                  }}>🤖</div>
                  <div style={{
                    background: colors.secondary,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '16px 16px 16px 4px',
                    padding: '10px 14px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                  }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        backgroundColor: colors.primary,
                        animation: `fchat-bounce 1s ease-in-out ${i * 0.18}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div style={{
              padding: '10px 14px',
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              borderTop: `1px solid ${colors.border}`,
              backgroundColor: colors.secondary,
            }}>
              {['Services', 'Pricing', 'Contact'].map(q => (
                <button key={q} className="fchat-quick-btn" onClick={() => sendQuick(q)} style={{
                  padding: '5px 13px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  border: `1.5px solid ${colors.primary}`,
                  background: colors.primaryLight,
                  color: colors.primary,
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                }}>{q}</button>
              ))}
            </div>

            {/* Input */}
            <div className="fchat-input-wrap" style={{
              display: 'flex',
              borderTop: `1px solid ${colors.border}`,
              backgroundColor: colors.secondary,
              alignItems: 'center',
              padding: '6px 6px 6px 14px',
              gap: '8px',
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                  color: colors.text,
                  fontFamily: 'Poppins, sans-serif',
                  padding: '6px 0',
                }}
              />
              <button className="fchat-send" onClick={sendMessage} style={{
                background: colors.primary,
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                width: '38px',
                height: '38px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div style={{
              padding: '6px',
              textAlign: 'center',
              backgroundColor: colors.secondary,
              borderTop: `1px solid ${colors.border}`,
            }}>
              <p style={{
                margin: 0,
                fontSize: '10px',
                color: colors.textLighter,
                fontFamily: 'Poppins, sans-serif',
              }}>Powered by <span style={{ color: colors.primary, fontWeight: 600 }}>YourBrand</span></p>
            </div>
          </div>
        )}

        {/* ── Toggle Button ── */}
        <button
          className="fchat-toggle"
          onClick={() => setOpen(o => !o)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          aria-label="Open chat"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          )}
        </button>

      </div>
    </>
  );
}

export default FloatingChatbot;