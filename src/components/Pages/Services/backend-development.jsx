import React, { useState, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════════ */
const services = [
  { icon:'ti ti-api', accent:'dark', tag:'API', title:'API Design & Development', subtitle:'REST, GraphQL & gRPC', desc:'Versioned, documented, contract-first APIs your frontend and partners can build on without surprises. We design the schema before we write a single handler.', features:['OpenAPI / GraphQL schema','Versioning strategy','Rate limiting','SDK generation'], cta:'Design an API', mock:'api' },
  { icon:'ti ti-database', accent:'mid', tag:'DB', title:'Database Architecture', subtitle:'Schema, Indexing & Scale', desc:'Schemas modelled around your real query patterns, not guesswork. We tune indexes, plan partitioning, and pick the right store for each workload.', features:['Schema modelling','Query optimisation','Read replicas','Migration tooling'], cta:'Model Your Data', mock:'db' },
  { icon:'ti ti-topology-star-3', accent:'light', tag:'SVC', title:'Microservices & Messaging', subtitle:'Decoupled by Design', desc:'We split monoliths along real seams, wire services together with event queues, and keep failure domains small so one outage stays one outage.', features:['Service boundaries','Event-driven design','Queue infrastructure','Saga / retry logic'], cta:'Plan My Services', mock:'queue' },
  { icon:'ti ti-bolt', accent:'soft', tag:'PERF', title:'Caching & Performance', subtitle:'Sub-100ms Response Times', desc:'We profile real traffic, add caching layers where they earn their keep, and cut p99 latency without papering over the underlying query.', features:['Redis / CDN caching','Load testing','Query profiling','Horizontal scaling'], cta:'Speed Things Up', mock:'latency' },
  { icon:'ti ti-lock', accent:'dark', tag:'AUTH', title:'Auth & Security', subtitle:'Identity Done Right', desc:'OAuth2, JWT rotation, role-based access, and secrets management — implemented so it holds up under a real pen test, not just a demo.', features:['OAuth2 / SSO','RBAC & permissions','Secrets management','Audit logging'], cta:'Secure My Backend', mock:'auth' },
  { icon:'ti ti-server-2', accent:'mid', tag:'OPS', title:'Infra & Observability', subtitle:'CI/CD, Logs & Alerts', desc:'Infrastructure as code, deploy pipelines that run themselves, and dashboards that tell you something broke before your users do.', features:['IaC (Terraform)','CI/CD pipelines','Metrics & tracing','On-call alerting'], cta:'Harden My Infra', mock:'uptime' },
];

const processSteps = [
  { icon:'ti ti-route', title:'Map', desc:'We trace your data flows and access patterns end to end before designing a single table or endpoint.' },
  { icon:'ti ti-schema', title:'Architect', desc:'Service boundaries, schemas, and contracts get specced and reviewed before any code ships.' },
  { icon:'ti ti-terminal-2', title:'Build', desc:'Typed, tested, code-reviewed services with CI on every commit — nothing reaches main untested.' },
  { icon:'ti ti-chart-dots', title:'Operate', desc:'Deployed with monitoring and alerting from day one, with a runbook your team can actually follow.' },
];

const faqs = [
  { q:'Which stacks do you build in?', a:'Mostly Node/TypeScript, Go, and Python, on Postgres or DynamoDB depending on access patterns — but we adapt to whatever your team already runs.' },
  { q:'Can you work inside our existing backend?', a:"Yes. We start with an architecture audit, flag bottlenecks and risk areas, and propose an incremental plan rather than a rewrite." },
  { q:'Do you handle infrastructure too, or just code?', a:'Both. We can own the full path from schema design to Terraform-managed infra and the CI/CD pipeline that deploys it.' },
  { q:'What does an engagement look like?', a:"Fixed-scope builds for a defined service, or a dedicated-retainer model for ongoing backend work — we'll recommend whichever fits your roadmap." },
];

const enquiryTypes = ['API Design & Development','Database Architecture','Microservices & Messaging','Caching & Performance','Auth & Security','Infra & Observability','Something else'];

/* ══════════════════════════════════════════════════
   API FLOWS
══════════════════════════════════════════════════ */
const API_FLOWS = [
  { method:'POST', path:'/v1/orders', status:201, statusText:'Created', ms:23,
    requestHeaders:[{ key:'Content-Type', val:'application/json' },{ key:'Authorization', val:'Bearer sk_live_••••••••' }],
    requestBody:`{\n  "item": "Wireless Headphones",\n  "qty": 2,\n  "userId": "usr_441",\n  "shipping": "express"\n}`,
    responseBody:`{\n  "orderId": "ord_8841",\n  "status": "confirmed",\n  "total": "$198.00",\n  "eta": "2025-02-14"\n}` },
  { method:'GET', path:'/v1/users/me', status:200, statusText:'OK', ms:8,
    requestHeaders:[{ key:'Authorization', val:'Bearer sk_live_••••••••' },{ key:'Accept', val:'application/json' }],
    requestBody:null,
    responseBody:`{\n  "id": "usr_441",\n  "name": "Alex Chen",\n  "plan": "pro",\n  "createdAt": "2024-01-08"\n}` },
  { method:'PATCH', path:'/v1/inventory/sku-22', status:200, statusText:'OK', ms:31,
    requestHeaders:[{ key:'Content-Type', val:'application/json' },{ key:'Authorization', val:'Bearer sk_live_••••••••' }],
    requestBody:`{\n  "delta": -2,\n  "reason": "order_8841",\n  "warehouse": "UK-1"\n}`,
    responseBody:`{\n  "sku": "sku-22",\n  "remaining": 147,\n  "reserved": 2,\n  "updated": true\n}` },
];

const METHOD_STYLE = {
  GET:   { bg:'#e6f9ef', color:'#166534', dot:'#22c55e' },
  POST:  { bg:'#eff6ff', color:'#1d4ed8', dot:'#3b82f6' },
  PATCH: { bg:'#fffbeb', color:'#92400e', dot:'#f59e0b' },
};
const STATUS_COLOR = { 2:'#22c55e', 4:'#f87171', 5:'#f97316' };

/* ── JSON syntax highlighter ── */
function HighlightJSON({ text }) {
  if (!text) return <span style={{ color:'rgba(255,255,255,0.3)', fontStyle:'italic' }}>No body</span>;
  return (
    <>
      {text.split('\n').map((line, i) => {
        const m = line.match(/^(\s*)("[\w]+")(\s*:\s*)(.+?)(,?)$/);
        if (m) {
          const [, indent, key, colon, value, comma] = m;
          const isStr = value.startsWith('"');
          const isBool = value === 'true' || value === 'false';
          const isNum = !isStr && !isBool && !isNaN(value.replace(',',''));
          const vc = isStr ? '#86efac' : isBool ? '#f9a8d4' : isNum ? '#7dd3fc' : 'rgba(255,255,255,0.7)';
          return (
            <div key={i} style={{ paddingLeft: indent.length * 8 }}>
              <span style={{ color:'#c084fc' }}>{key}</span>
              <span style={{ color:'rgba(255,255,255,0.4)' }}>{colon}</span>
              <span style={{ color:vc }}>{value}</span>
              <span style={{ color:'rgba(255,255,255,0.4)' }}>{comma}</span>
            </div>
          );
        }
        return <div key={i} style={{ color:'rgba(255,255,255,0.35)' }}>{line}</div>;
      })}
    </>
  );
}

/* ══════════════════════════════════════════════════
   POSTMAN PANEL
══════════════════════════════════════════════════ */
function PostmanPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tab, setTab] = useState('body');
  const [resTab, setResTab] = useState('body');
  const [phase, setPhase] = useState('request');
  const timers = useRef([]);
  const ct = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  useEffect(() => {
    const cycle = () => {
      setPhase('request');
      ct(() => setPhase('loading'), 1200);
      ct(() => setPhase('response'), 2100);
      ct(() => { setActiveIdx(i => (i + 1) % API_FLOWS.length); cycle(); }, 4200);
    };
    cycle();
    return clearAll;
  }, []);

  const flow = API_FLOWS[activeIdx];
  const mStyle = METHOD_STYLE[flow.method] || METHOD_STYLE.GET;
  const statusColor = STATUS_COLOR[Math.floor(flow.status / 100)] || '#fff';

  const tabBtn = (active) => ({
    background:'none', border:'none', cursor:'pointer',
    fontFamily:"'Poppins',sans-serif", fontSize:9, fontWeight:500,
    color: active ? '#fff' : 'rgba(255,255,255,0.35)',
    borderBottom: active ? '1.5px solid #4ade80' : '1.5px solid transparent',
    padding:'5px 8px', transition:'color 0.2s',
  });

  return (
    <div style={{ width:'100%', height:'100%', background:'#1a1f2e', fontFamily:"'Poppins',sans-serif", display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Title bar */}
      <div style={{ background:'#151921', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'5px 12px', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
        <div style={{ display:'flex', gap:5 }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map((c,i) => <span key={i} style={{ width:8,height:8,borderRadius:'50%',background:c,display:'block' }} />)}
        </div>
        <div style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, padding:'2px 8px', display:'flex', alignItems:'center', gap:5, minWidth:0 }}>
          <i className="ti ti-api" style={{ fontSize:9, color:'#4ade80', flexShrink:0 }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:'rgba(255,255,255,0.4)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>api.yourbackend.com</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:20, padding:'2px 7px', flexShrink:0 }}>
          <span style={{ width:4,height:4,borderRadius:'50%',background:'#4ade80',display:'block',animation:'pmPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize:7.5, color:'#4ade80', fontWeight:600, letterSpacing:'.04em' }}>LIVE</span>
        </div>
      </div>

      {/* Sidebar + main */}
      <div style={{ display:'flex', flex:1, overflow:'hidden', minHeight:0 }}>
        {/* Sidebar */}
        <div style={{ width:96, background:'#12171f', borderRight:'1px solid rgba(255,255,255,0.05)', padding:'8px 0', flexShrink:0, overflow:'hidden' }}>
          <div style={{ padding:'0 7px 6px', fontSize:7, color:'rgba(255,255,255,0.25)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600 }}>Collections</div>
          {['Orders','Users','Inventory','Payments'].map((name, i) => (
            <div key={i} onClick={() => { clearAll(); setActiveIdx(i % API_FLOWS.length); setPhase('request'); }}
              style={{ padding:'4px 7px', fontSize:8.5, color: i===activeIdx ? '#4ade80' : 'rgba(255,255,255,0.4)', background: i===activeIdx ? 'rgba(74,222,128,0.08)' : 'transparent', borderLeft: i===activeIdx ? '2px solid #4ade80' : '2px solid transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:4, transition:'all 0.2s', overflow:'hidden' }}>
              <i className="ti ti-folder" style={{ fontSize:8, flexShrink:0 }} />{name}
            </div>
          ))}
          <div style={{ margin:'8px 7px 5px', height:1, background:'rgba(255,255,255,0.05)' }} />
          {['/v1/orders','/v1/users/me','/v1/inventory'].map((ep,i) => (
            <div key={i} style={{ padding:'3px 7px 3px 13px', fontSize:7.5, color: i===activeIdx ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:6.5, fontWeight:700, color:Object.values(METHOD_STYLE)[i]?.color||'#fff', marginRight:3 }}>{['POST','GET','PATCH'][i]}</span>
              {ep.split('/').pop()}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
          {/* URL bar */}
          <div style={{ padding:'6px 10px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:5, alignItems:'center', flexShrink:0 }}>
            <span style={{ fontSize:8, fontWeight:700, padding:'4px 7px', borderRadius:4, background:mStyle.bg, color:mStyle.color, border:`1px solid ${mStyle.dot}44`, flexShrink:0, fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.04em' }}>{flow.method}</span>
            <div style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, padding:'4px 7px', fontSize:8.5, fontFamily:"'JetBrains Mono',monospace", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', minWidth:0 }}>
              <span style={{ color:'rgba(255,255,255,0.3)' }}>https://api.yourbackend.com</span>
              <span style={{ color:'#c084fc' }}>{flow.path}</span>
            </div>
            <button style={{ background: phase==='loading' ? 'rgba(74,222,128,0.2)' : '#22c55e', border:'none', borderRadius:5, padding:'4px 10px', color:'#fff', fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:9, cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', gap:3, transition:'background 0.3s' }}>
              {phase==='loading' ? <><i className="ti ti-loader" style={{ fontSize:9, animation:'pmSpin 0.8s linear infinite' }} />Sending</> : <><i className="ti ti-send" style={{ fontSize:9 }} />Send</>}
            </button>
          </div>

          {/* Request tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'0 10px', flexShrink:0 }}>
            {['body','headers','auth'].map(t => (
              <button key={t} style={tabBtn(tab===t)} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
                {t==='headers' && <span style={{ marginLeft:3, background:'rgba(255,255,255,0.1)', borderRadius:8, padding:'0 3px', fontSize:7 }}>{flow.requestHeaders.length}</span>}
              </button>
            ))}
          </div>

          {/* Request body */}
          <div style={{ flex:'0 0 auto', minHeight:70, maxHeight:95, padding:'6px 10px', overflow:'hidden', fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, lineHeight:1.7 }}>
            {tab==='body' && (flow.requestBody ? <HighlightJSON text={flow.requestBody} /> : <span style={{ color:'rgba(255,255,255,0.25)', fontStyle:'italic', fontSize:8 }}>GET request — no body required</span>)}
            {tab==='headers' && flow.requestHeaders.map((h,i) => (
              <div key={i} style={{ display:'flex', gap:5, marginBottom:2, overflow:'hidden' }}>
                <span style={{ color:'#c084fc', flexShrink:0, minWidth:72 }}>{h.key}</span>
                <span style={{ color:'rgba(255,255,255,0.4)' }}>:</span>
                <span style={{ color:'#86efac', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.val}</span>
              </div>
            ))}
            {tab==='auth' && (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <div style={{ fontSize:7.5, color:'rgba(255,255,255,0.3)' }}>Type: Bearer Token</div>
                <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:4, padding:'4px 7px', fontSize:8.5, color:'rgba(255,255,255,0.6)', fontFamily:"'JetBrains Mono',monospace" }}>sk_live_••••••••••••••••••••••••</div>
              </div>
            )}
          </div>

          {/* Response divider */}
          <div style={{ background:'#12171f', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'3px 10px', display:'flex', alignItems:'center', gap:6, flexShrink:0, flexWrap:'wrap' }}>
            <span style={{ fontSize:8, fontWeight:600, color:'rgba(255,255,255,0.4)' }}>Response</span>
            {phase==='response' && (<>
              <span style={{ fontSize:8, fontWeight:700, color:statusColor, background:`${statusColor}18`, border:`1px solid ${statusColor}44`, borderRadius:3, padding:'1px 5px' }}>{flow.status} {flow.statusText}</span>
              <span style={{ fontSize:7.5, color:'rgba(255,255,255,0.3)' }}>{flow.ms}ms</span>
            </>)}
            {phase==='loading' && <span style={{ fontSize:7.5, color:'#f9a8d4', display:'flex', alignItems:'center', gap:3 }}><i className="ti ti-loader" style={{ animation:'pmSpin 0.8s linear infinite' }} />Waiting…</span>}
            <div style={{ marginLeft:'auto', display:'flex' }}>
              {['body','headers'].map(t => <button key={t} style={tabBtn(resTab===t)} onClick={() => setResTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
            </div>
          </div>

          {/* Response body */}
          <div style={{ flex:1, padding:'6px 10px', overflow:'hidden', fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, lineHeight:1.7, opacity: phase==='response' ? 1 : 0.25, transition:'opacity 0.5s ease', minHeight:0 }}>
            {resTab==='body' && <HighlightJSON text={flow.responseBody} />}
            {resTab==='headers' && [['Content-Type','application/json'],['X-Request-Id','req_9f2a441'],['X-RateLimit-Remaining','4998'],['Cache-Control','no-store']].map(([k,v],i) => (
              <div key={i} style={{ display:'flex', gap:5, marginBottom:2 }}>
                <span style={{ color:'#c084fc', minWidth:88, flexShrink:0 }}>{k}</span>
                <span style={{ color:'rgba(255,255,255,0.4)' }}>:</span>
                <span style={{ color:'#86efac' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   REALISTIC MACBOOK PRO FRAME
══════════════════════════════════════════════════ */
function MacBookMockup() {
  return (
    <div style={{ width:'100%', maxWidth:580, position:'relative', transform:'perspective(1600px) rotateY(-8deg) rotateX(4deg)', transformOrigin:'center center' }}>
      <div style={{
        background:'linear-gradient(175deg, #3d4047 0%, #2c2f36 18%, #23262d 50%, #1c1f26 80%, #18191f 100%)',
        borderRadius:'14px 14px 4px 4px',
        padding:'0',
        position:'relative',
        boxShadow:`inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.07), inset -1px 0 0 rgba(255,255,255,0.07), 0 2px 6px rgba(0,0,0,0.4)`,
      }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'45%', background:'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)', borderRadius:'14px 14px 0 0', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:24, height:24, opacity:0.12 }}>
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </div>
        <div style={{ margin:'7px 7px 0', background:'#0a0b0f', borderRadius:'9px 9px 0 0', padding:'10px 10px 0', position:'relative', boxShadow:'inset 0 0 0 1px rgba(0,0,0,0.8), inset 0 2px 4px rgba(0,0,0,0.6)' }}>
          <div style={{ textAlign:'center', marginBottom:6, position:'relative' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'#1a1d22', border:'0.5px solid rgba(255,255,255,0.06)' }} />
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#252830', border:'0.5px solid rgba(255,255,255,0.08)', position:'relative' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:2, height:2, borderRadius:'50%', background:'rgba(255,255,255,0.07)' }} />
              </div>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'#1a1d22', border:'0.5px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>
          <div style={{ background:'#0a0c10', borderRadius:'4px 4px 0 0', overflow:'hidden', aspectRatio:'16/10', position:'relative', border:'1px solid rgba(0,0,0,0.9)' }}>
            <div style={{ position:'absolute', inset:0, zIndex:10, pointerEvents:'none', background:'linear-gradient(140deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 55%)', borderRadius:4 }} />
            <PostmanPanel />
          </div>
        </div>
      </div>
      <div style={{ position:'relative', height:5, background:'linear-gradient(180deg, #1a1d23 0%, #252830 40%, #1e2128 100%)', overflow:'visible' }}>
        <div style={{ position:'absolute', top:0, left:'5%', right:'5%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(0,0,0,0.8),rgba(0,0,0,0.8),transparent)' }} />
        <div style={{ position:'absolute', top:1, left:'50%', transform:'translateX(-50%)', width:48, height:3, background:'rgba(0,0,0,0.3)', borderRadius:'0 0 3px 3px' }} />
      </div>
      <div style={{
        background:'linear-gradient(180deg, #2c2f37 0%, #252830 30%, #1e2028 70%, #191b22 100%)',
        borderRadius:'0 0 12px 12px',
        height:28,
        position:'relative',
        boxShadow:`inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(255,255,255,0.06)`,
        overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:5, left:'8%', right:'8%', display:'flex', flexDirection:'column', gap:2.5 }}>
          {[{ w:'100%', h:3 },{ w:'96%', h:3 },{ w:'92%', h:3 }].map((row,i) => (
            <div key={i} style={{ width:row.w, margin:'0 auto', height:row.h, borderRadius:1.5, background:'rgba(255,255,255,0.045)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)' }}>
              <div style={{ display:'flex', gap:2, padding:'0 4px', height:'100%', alignItems:'center' }}>
                {Array.from({ length: i===0?14:i===1?12:11 }).map((_,j) => (
                  <div key={j} style={{ flex:1, height:'80%', borderRadius:1, background:'rgba(255,255,255,0.06)', boxShadow:'inset 0 0.5px 0 rgba(255,255,255,0.08)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ position:'absolute', bottom:5, left:'50%', transform:'translateX(-50%)', width:'35%', height:3, borderRadius:1.5, background:'rgba(255,255,255,0.06)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)' }} />
        <div style={{ position:'absolute', bottom:3, left:'50%', transform:'translateX(-50%)', width:52, height:11, borderRadius:3, background:'rgba(255,255,255,0.035)', border:'0.5px solid rgba(255,255,255,0.05)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.2)' }} />
      </div>
      <div style={{ height:4, background:'linear-gradient(180deg, #14161c 0%, transparent 100%)', borderRadius:'0 0 6px 6px', opacity:0.7 }} />
      <div style={{ height:5, background:'linear-gradient(180deg, #1a1c22 0%, #131519 100%)', borderRadius:'0 0 14px 14px', position:'relative', boxShadow:'0 4px 16px rgba(0,0,0,0.45)' }}>
        <div style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', left:'8%', width:16, height:2, borderRadius:2, background:'rgba(0,0,0,0.5)' }} />
        <div style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', right:'8%', width:16, height:2, borderRadius:2, background:'rgba(0,0,0,0.5)' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════ */
function useCountUp(target, duration=1800) {
  const [count,setCount]=useState(0);
  const [started,setStarted]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setStarted(true);obs.disconnect();} },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  useEffect(()=>{
    if(!started||target===null) return;
    const start=performance.now();
    const ease=t=>t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    const step=now=>{
      const p=Math.min((now-start)/duration,1);
      setCount(Math.round(ease(p)*target));
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[started,target,duration]);
  return {ref,count};
}

function useReveal() {
  const [visible,setVisible]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVisible(true);obs.disconnect();} },{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return {ref,visible};
}

/* ══════════════════════════════════════════════════
   MOCK THUMBNAILS
══════════════════════════════════════════════════ */
function MockThumb({ type, color }) {
  const wrap = { width:'100%', height:92, borderRadius:12, background:'rgba(255,255,255,0.035)', border:'1px solid rgba(255,255,255,0.07)', position:'relative', overflow:'hidden', marginBottom:18 };
  const wrapLight = { width:'100%', height:92, borderRadius:12, background:'rgba(0,0,0,0.025)', border:'1px solid rgba(0,0,0,0.06)', position:'relative', overflow:'hidden', marginBottom:18 };
  const isLight = color==='#15803d'||color==='#16a34a';
  const base = isLight ? wrapLight : wrap;
  if (type==='api') return (
    <div style={{ ...base, padding:'10px 12px', fontFamily:"'JetBrains Mono',monospace" }}>
      <div style={{ fontSize:9, color, marginBottom:4 }}>POST /v1/orders</div>
      <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.5)' }}>{'{'}</div>
      <div style={{ fontSize:8.5, color: isLight?'#586b5d':'rgba(255,255,255,0.4)', paddingLeft:10 }}>"status": <span style={{ color }}>&#34;201 Created&#34;</span></div>
      <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.5)' }}>{'}'}</div>
      <div style={{ position:'absolute', bottom:10, right:12, fontSize:7.5, color, opacity:0.7 }}>23ms</div>
    </div>
  );
  if (type==='db') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%">
        {[18,40,62].map((y,idx)=>(<g key={idx}><ellipse cx="110" cy={y} rx="46" ry="8" fill="none" stroke={color} strokeWidth="1.4" opacity={0.7-idx*0.15} /></g>))}
        <line x1="64" y1="18" x2="64" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <line x1="156" y1="18" x2="156" y2="62" stroke={color} strokeWidth="1.2" opacity="0.3" />
      </svg>
    </div>
  );
  if (type==='queue') return (
    <div style={{ ...base, display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
      {[0,1,2,3,4].map(idx=>(
        <div key={idx} className="mock-bar" style={{ width:22, height:36, borderRadius:4, background:color, opacity:idx===4?0.9:0.25+idx*0.1, animationDelay:`${idx*0.15}s` }} />
      ))}
    </div>
  );
  if (type==='latency') return (
    <div style={base}>
      <svg viewBox="0 0 220 92" width="100%" height="100%" preserveAspectRatio="none">
        <polyline className="mock-pulse-line" points="0,70 30,68 60,40 90,58 120,22 150,34 180,16 220,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (type==='auth') return (
    <div style={{ ...base, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="mock-shield-ring" style={{ width:50, height:50, borderRadius:'50%', border:`1.5px solid ${color}`, opacity:0.3, position:'absolute' }} />
      <i className="ti ti-key" style={{ color, fontSize:28, position:'relative', zIndex:1 }} />
    </div>
  );
  if (type==='uptime') return (
    <div style={{ ...base, display:'flex', alignItems:'center', padding:'0 14px', gap:3 }}>
      {Array.from({length:28}).map((_,idx)=>(
        <div key={idx} style={{ flex:1, height:idx===24?14:26, borderRadius:2, background:idx===24?'#f87171':color, opacity:idx===24?0.9:0.3+(idx%5)*0.1 }} />
      ))}
    </div>
  );
  return <div style={base} />;
}

/* ══════════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════════ */
function ServiceCard({ svc, index }) {
  const {ref,visible}=useReveal();
  const [hovered,setHovered]=useState(false);
  const accentMap = {
    dark:  { bg:'#0e1411', border:'rgba(34,197,94,0.16)', bar:'linear-gradient(90deg,#16a34a,#22c55e,#4ade80)', iconBg:'rgba(34,197,94,0.12)', iconColor:'#4ade80', tagColor:'#4ade80', titleColor:'#fff', descColor:'rgba(255,255,255,0.6)', featColor:'rgba(255,255,255,0.52)', hoverBorder:'rgba(34,197,94,0.45)', hoverShadow:'0 24px 60px -12px rgba(22,163,74,0.35)' },
    mid:   { bg:'#06150c', border:'rgba(34,197,94,0.14)', bar:'linear-gradient(90deg,#14532d,#16a34a,#22c55e)', iconBg:'rgba(22,163,74,0.18)', iconColor:'#86efac', tagColor:'#86efac', titleColor:'#f0fdf4', descColor:'rgba(187,247,208,0.68)', featColor:'rgba(187,247,208,0.56)', hoverBorder:'rgba(34,197,94,0.4)', hoverShadow:'0 24px 60px -12px rgba(5,46,22,0.55)' },
    light: { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#22c55e,#4ade80,#86efac)', iconBg:'#f0fdf4', iconColor:'#15803d', tagColor:'#16a34a', titleColor:'#0f1c14', descColor:'#586b5d', featColor:'#3f5345', hoverBorder:'rgba(22,163,74,0.32)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.16)' },
    soft:  { bg:'#ffffff', border:'rgba(15,23,42,0.07)', bar:'linear-gradient(90deg,#4ade80,#86efac,#bbf7d0)', iconBg:'#f0fdf4', iconColor:'#16a34a', tagColor:'#22c55e', titleColor:'#0a0a0a', descColor:'#5b6470', featColor:'#586474', hoverBorder:'rgba(22,163,74,0.28)', hoverShadow:'0 24px 60px -16px rgba(15,23,42,0.14)' },
  };
  const a=accentMap[svc.accent];
  return (
    <div ref={ref} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ background:a.bg, border:`1px solid ${hovered?a.hoverBorder:a.border}`, borderRadius:24, padding:'30px 28px 32px', position:'relative', overflow:'hidden', cursor:'default', opacity:visible?1:0, transform:visible?(hovered?'translateY(-8px)':'translateY(0)'):'translateY(28px)', transition:`opacity 0.5s ease ${index*80}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease`, boxShadow:hovered?a.hoverShadow:'0 1px 2px rgba(15,23,42,0.04)' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle at 100% 0%,${a.iconColor}14 0%,transparent 55%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:hovered?3:2.5, background:a.bar, transition:'height 0.35s ease' }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, position:'relative' }}>
        <div>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:'.1em', color:a.tagColor, opacity:0.6, display:'block', marginBottom:6 }}>{svc.tag}</span>
          <div style={{ fontSize:10.5, color:a.tagColor, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' }}>{svc.subtitle}</div>
        </div>
        <div style={{ width:46, height:46, background:a.iconBg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:a.iconColor, fontSize:21, flexShrink:0, border:`1px solid ${a.iconColor}33`, boxShadow:hovered?`0 8px 20px -6px ${a.iconColor}55`:'none', transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.4s ease', transform:hovered?'scale(1.1) rotate(-4deg)':'scale(1)' }}>
          <i className={svc.icon} />
        </div>
      </div>
      <MockThumb type={svc.mock} color={a.iconColor} />
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:23, fontWeight:800, color:a.titleColor, marginBottom:12, lineHeight:1.2, letterSpacing:'-0.4px' }}>{svc.title}</h3>
      <p style={{ fontSize:13.5, color:a.descColor, lineHeight:1.8, marginBottom:22 }}>{svc.desc}</p>
      <div style={{ height:1, background:`linear-gradient(90deg,${a.iconColor}30,transparent)`, marginBottom:20 }} />
      <ul style={{ listStyle:'none', padding:0, margin:'0 0 26px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 12px' }}>
        {svc.features.map((f,i)=>(
          <li key={i} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:a.featColor }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:a.iconColor, flexShrink:0 }} />{f}
          </li>
        ))}
      </ul>
      <button style={{ background:hovered?a.iconColor:'transparent', border:`1.5px solid ${a.iconColor}`, color:hovered?(svc.accent==='light'||svc.accent==='soft'?'#fff':'#06140c'):a.iconColor, borderRadius:11, padding:'12px 20px', fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:12.5, cursor:'pointer', transition:'all 0.3s ease', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
        {svc.cta}<i className="ti ti-arrow-right" style={{ fontSize:14, transform:hovered?'translateX(2px)':'translateX(0)', transition:'transform 0.3s ease' }} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROCESS STEP
══════════════════════════════════════════════════ */
function ProcessStep({ step, index }) {
  const {ref,visible}=useReveal();
  return (
    <div ref={ref} style={{ textAlign:'center', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:`opacity 0.5s ease ${index*100}ms,transform 0.5s ease ${index*100}ms` }}>
      <div style={{ width:72, height:72, background:'rgba(22,163,74,0.12)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', fontSize:30, margin:'0 auto 20px' }}>
        <i className={step.icon} />
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#4ade80', opacity:0.6, marginBottom:8 }}>step 0{index+1}</div>
      <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:800, color:'#fff', marginBottom:10 }}>{step.title}</h4>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:220, margin:'0 auto' }}>{step.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FAQ ITEM
══════════════════════════════════════════════════ */
function FaqItem({ item }) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{ borderBottom:'1px solid #ece9e2', padding:'20px 0' }}>
      <button onClick={()=>setOpen(!open)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', fontFamily:"'Poppins',sans-serif", fontSize:15, fontWeight:600, color:'#0a0a0a', textAlign:'left', gap:16 }}>
        {item.q}
        <span style={{ width:28, height:28, borderRadius:'50%', background:open?'#0a0a0a':'#f0fdf4', border:`1.5px solid ${open?'#0a0a0a':'#bbf7d0'}`, display:'flex', alignItems:'center', justifyContent:'center', color:open?'#22c55e':'#15803d', fontSize:16, flexShrink:0, transition:'all 0.25s ease', transform:open?'rotate(180deg)':'rotate(0deg)' }}>{open?'−':'+'}</span>
      </button>
      <div style={{ maxHeight:open?200:0, overflow:'hidden', transition:'max-height 0.35s ease' }}>
        <p style={{ marginTop:12, fontSize:14, color:'#6b7280', lineHeight:1.8, paddingRight:44 }}>{item.a}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STAT CELL
══════════════════════════════════════════════════ */
function StatCell({ icon, num, suffix, label }) {
  const {ref,count}=useCountUp(num);
  return (
    <div ref={ref} style={{ padding:'44px 36px', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:18, alignItems:'center' }}>
      <div style={{ width:56, height:56, background:'rgba(22,163,74,0.12)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', fontSize:26, flexShrink:0, border:'1px solid rgba(34,197,94,0.18)' }}>
        <i className={icon} />
      </div>
      <div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, lineHeight:1, letterSpacing:'-1px', background:'linear-gradient(135deg,#ffffff 0%,#bbf7d0 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {num===null?suffix:`${count}${suffix}`}
        </div>
        <div style={{ fontSize:11, color:'#6b7280', fontWeight:500, marginTop:5, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DEVICE SHOWCASE
══════════════════════════════════════════════════ */
function DeviceShowcase() {
  const [liveVal,setLiveVal]=useState(2412);
  useEffect(()=>{
    const id=setInterval(()=>setLiveVal(v=>v+Math.floor(Math.random()*30)-4),1600);
    return ()=>clearInterval(id);
  },[]);
  const bars=[46,68,38,82,58,94];
  return (
    <div style={{ position:'relative', width:'100%', display:'flex', justifyContent:'center' }}>
      <div style={{ position:'relative', width:'100%', maxWidth:280 }}>
        <div className="device-laptop-float" style={{ background:'linear-gradient(165deg,#0d1611 0%,#0a120d 100%)', border:'1px solid rgba(34,197,94,0.22)', borderRadius:16, padding:14, boxShadow:'0 28px 56px -16px rgba(0,0,0,0.55)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-30, right:-30, width:110, height:110, background:'radial-gradient(circle,rgba(34,197,94,0.16) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:12, position:'relative' }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#ff5f56' }} />
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#ffbd2e' }} />
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#27c93f' }} />
            <div style={{ marginLeft:6, flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:5, padding:'3px 8px', fontSize:8.5, color:'rgba(255,255,255,0.35)', fontFamily:"'JetBrains Mono',monospace", display:'flex', alignItems:'center', gap:4 }}>
              <i className="ti ti-lock" style={{ fontSize:8, color:'#4ade80' }} />POST /v1/enquiries
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
            <div>
              <div style={{ fontSize:8, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:4, fontWeight:600 }}>Requests Today</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:19, fontWeight:700, color:'#fff', letterSpacing:'-0.3px' }}>{liveVal.toLocaleString()}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4, background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.25)', borderRadius:20, padding:'3px 8px' }}>
              <span style={{ width:5,height:5,borderRadius:'50%',background:'#4ade80' }} className="mock-pulse-dot" />
              <span style={{ fontSize:7.5, color:'#4ade80', fontWeight:700 }}>200 OK</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:42, marginBottom:14 }}>
            {bars.map((h,i)=><div key={i} className="mock-bar-grow" style={{ flex:1, height:`${h}%`, borderRadius:'3px 3px 0 0', background:i===bars.length-1?'linear-gradient(180deg,#4ade80,#16a34a)':'rgba(74,222,128,0.2)', animationDelay:`${i*0.07}s` }} />)}
          </div>
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'10px 12px', fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, lineHeight:1.7 }}>
            <div style={{ color:'rgba(255,255,255,0.4)' }}>{'{'}</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"id": <span style={{ color:'#4ade80' }}>"enq_9f2a"</span>,</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"status": <span style={{ color:'#4ade80' }}>"queued"</span>,</div>
            <div style={{ paddingLeft:10, color:'rgba(255,255,255,0.55)' }}>"eta": <span style={{ color:'#86efac' }}>"4h"</span></div>
            <div style={{ color:'rgba(255,255,255,0.4)' }}>{'}'}</div>
          </div>
        </div>
        <div style={{ width:'108%', marginLeft:'-4%', height:9, background:'linear-gradient(180deg,#1a2420,#0a0f0c)', clipPath:'polygon(6% 0,94% 0,100% 100%,0% 100%)', borderRadius:'0 0 4px 4px' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ENQUIRY FORM
══════════════════════════════════════════════════ */
function EnquiryForm() {
  const [form,setForm]=useState({name:'',email:'',phone:'',type:enquiryTypes[0],message:''});
  const [status,setStatus]=useState('idle');
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const handleSubmit=e=>{
    e.preventDefault();
    if(!form.name.trim()||!form.email.trim()||!form.message.trim()) return;
    setStatus('sending');
    setTimeout(()=>setStatus('sent'),1100);
  };
  if (status==='sent') return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:14, minHeight:320, justifyContent:'center' }}>
      <div style={{ width:52, height:52, borderRadius:14, background:'rgba(34,197,94,0.15)', border:'1.5px solid rgba(34,197,94,0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:24 }}><i className="ti ti-check" /></div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:800, color:'#fff' }}>Enquiry sent</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:320 }}>Thanks{form.name.trim()?`, ${form.name.trim().split(' ')[0]}`:''} — we've got your message and usually reply within 4 hours.</p>
      <button onClick={()=>{setStatus('idle');setForm({name:'',email:'',phone:'',type:enquiryTypes[0],message:''}); }} style={{ background:'transparent', border:'1.5px solid rgba(34,197,94,0.4)', color:'#4ade80', borderRadius:10, padding:'10px 18px', fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:12, cursor:'pointer' }}>Send another enquiry</button>
    </div>
  );
  return (
    <div>
      <div style={{ width:52, height:52, background:'rgba(22,163,74,0.15)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:24, marginBottom:20, border:'1.5px solid rgba(22,163,74,0.3)', animation:'floatIcon 3s ease-in-out infinite' }}><i className="ti ti-server-2" /></div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:800, color:'#fff', marginBottom:8, letterSpacing:'-0.4px' }}>Tell Us About Your Backend</h3>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:22, maxWidth:360 }}>New service, existing system, or something on fire — tell us what you're running and we'll route it to the right engineer.</p>
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <div className="enq-row">
          <input className="enq-input" type="text" placeholder="Full name" value={form.name} onChange={e=>update('name',e.target.value)} required />
          <input className="enq-input" type="email" placeholder="Email address" value={form.email} onChange={e=>update('email',e.target.value)} required />
        </div>
        <div className="enq-row">
          <input className="enq-input" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e=>update('phone',e.target.value)} />
          <div className="enq-select-wrap">
            <i className="ti ti-list-details enq-select-icon" />
            <select className="enq-input enq-select" value={form.type} onChange={e=>update('type',e.target.value)}>
              {enquiryTypes.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <i className="ti ti-chevron-down enq-select-chevron" />
          </div>
        </div>
        <textarea className="enq-input" placeholder="What's the system, and what's it doing wrong (or about to do right)?" rows={4} value={form.message} onChange={e=>update('message',e.target.value)} required style={{ resize:'vertical', fontFamily:"'Poppins',sans-serif" }} />
        <button type="submit" disabled={status==='sending'} style={{ background:'#22c55e', color:'#fff', padding:'13px 26px', borderRadius:12, fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, border:'none', cursor:status==='sending'?'default':'pointer', boxShadow:'0 6px 20px rgba(34,197,94,0.35)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, opacity:status==='sending'?0.75:1, marginTop:4, transition:'transform 0.25s,box-shadow 0.25s' }}>
          {status==='sending'?'Sending…':'Send Enquiry'}{status!=='sending'&&<i className="ti ti-send" style={{ fontSize:14 }} />}
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ background:'#fafaf8', overflow:'hidden' }}>
      <div className="hero-grid" style={{ maxWidth:1280, margin:'0 auto', padding:'72px 56px 80px', display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:56, alignItems:'center' }}>
        <div>
          <div className="hero-item" style={{ animationDelay:'0.04s', marginBottom:24 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff', border:'1px solid #e2e8f0', borderRadius:100, padding:'6px 14px 6px 8px', fontSize:11, fontWeight:600, color:'#374151', letterSpacing:'.05em', textTransform:'uppercase' }}>
              <span style={{ width:8,height:8,borderRadius:'50%',background:'#22c55e',display:'block',flexShrink:0,animation:'dotPulse 2s ease-in-out infinite' }} />
              Backend Development
            </div>
          </div>
          <h1 className="hero-item hero-h1" style={{ animationDelay:'0.12s', fontFamily:"'Playfair Display',serif", fontSize:52, fontWeight:900, lineHeight:1.07, color:'#0a0a0a', letterSpacing:'-1.2px', marginBottom:18 }}>
            Systems Built<br />to <span style={{ background:'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stay Up</span>
          </h1>
          <p className="hero-item" style={{ animationDelay:'0.20s', fontSize:14.5, color:'#374151', lineHeight:1.85, maxWidth:420, marginBottom:28 }}>
            APIs, databases, and infrastructure engineered for real traffic — not just a demo. We build the backend, then make sure it holds.
          </p>
          <div className="hero-item" style={{ animationDelay:'0.26s', display:'flex', gap:8, flexWrap:'wrap', marginBottom:32, alignItems:'center' }}>
            {[{icon:'ti-send',label:'Your app sends a request',light:false},{icon:'ti-cpu',label:'We process it',light:true},{icon:'ti-package-import',label:'Clean data back',light:false}].map((chip,i)=>(
              <React.Fragment key={i}>
                {i>0 && <i className="ti ti-arrow-right" style={{ fontSize:12, color:'#9ca3af' }} />}
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:chip.light?'#f0fdf4':'#fff', border:`1px solid ${chip.light?'#bbf7d0':'#e2e8f0'}`, borderRadius:100, padding:'6px 12px 6px 8px', fontSize:12, fontWeight:500, color:chip.light?'#15803d':'#374151' }}>
                  <i className={`ti ${chip.icon}`} style={{ fontSize:13, color:chip.light?'#16a34a':'#6b7280' }} />{chip.label}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="hero-item" style={{ animationDelay:'0.32s', display:'flex', gap:12, flexWrap:'wrap' }}>
            <button className="hero-btn-primary">Explore Services <i className="ti ti-arrow-right" style={{ fontSize:14 }} /></button>
            <a href="#contact" style={{ textDecoration:'none' }}><button className="hero-btn-outline">Send an Enquiry</button></a>
          </div>
          <div className="hero-item" style={{ animationDelay:'0.36s', display:'flex', alignItems:'center', gap:20, marginTop:28, paddingTop:24, borderTop:'1px solid #f0ede6', flexWrap:'wrap' }}>
            {['No lock-in','Fixed-scope or retainer','Reply within 4 hours'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#6b7280' }}>
                <i className="ti ti-check" style={{ fontSize:13, color:'#22c55e' }} />{t}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-device-col" style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', position:'relative' }}>
          <div style={{ position:'absolute', top:'5%', left:'0%', right:'0%', bottom:'0%', background:'radial-gradient(ellipse at 55% 55%, rgba(34,197,94,0.13) 0%, rgba(59,130,246,0.06) 40%, transparent 72%)', filter:'blur(40px)', pointerEvents:'none', zIndex:0 }} />
          <div style={{ position:'absolute', bottom:'-4%', left:'10%', right:'10%', height:40, background:'radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 70%)', filter:'blur(16px)', zIndex:0 }} />
          <div style={{ position:'relative', zIndex:1, width:'100%' }}>
            <div className="hero-badge-a" style={{ position:'absolute', top:-22, right:4, zIndex:20, background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 12px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
              <div style={{ display:'flex', gap:4 }}>
                {[{icon:'ti-brand-nodejs',bg:'#f0fdf4',border:'#bbf7d0',color:'#16a34a'},{icon:'ti-brand-typescript',bg:'#eff6ff',border:'#bfdbfe',color:'#1d4ed8'},{icon:'ti-database',bg:'#f5f3ff',border:'#ddd6fe',color:'#7c3aed'}].map((tech,i)=>(
                  <span key={i} style={{ width:18,height:18,borderRadius:4,background:tech.bg,border:`1px solid ${tech.border}`,display:'inline-flex',alignItems:'center',justifyContent:'center' }}>
                    <i className={`ti ${tech.icon}`} style={{ fontSize:10, color:tech.color }} />
                  </span>
                ))}
              </div>
              <span style={{ fontSize:11, fontWeight:600, color:'#374151', whiteSpace:'nowrap' }}>Node · TS · Postgres</span>
            </div>
            <div className="hero-badge-b" style={{ position:'absolute', bottom:32, left:-8, zIndex:20, background:'#0f1a12', border:'1px solid rgba(34,197,94,0.3)', borderRadius:10, padding:'8px 14px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 20px rgba(0,0,0,0.25)' }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',display:'block',flexShrink:0,animation:'dotPulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize:11, fontWeight:600, color:'#4ade80', fontFamily:"'JetBrains Mono',monospace", whiteSpace:'nowrap' }}>201 Created · 23ms</span>
            </div>
            <div className="hero-device-float" style={{ filter:'drop-shadow(0 40px 70px rgba(0,0,0,0.28)) drop-shadow(0 8px 18px rgba(0,0,0,0.18))' }}>
              <MacBookMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STATS BAND
══════════════════════════════════════════════════ */
function StatsBand() {
  const stats=[
    {icon:'ti ti-server-2',num:120,suffix:'+',label:'Services Shipped'},
    {icon:'ti ti-clock',num:48,suffix:'hr',label:'Avg. Response Time'},
    {icon:'ti ti-bolt',num:99,suffix:'.9%',label:'Avg. Client Uptime'},
    {icon:'ti ti-gauge',num:142,suffix:'ms',label:'Typical p99 Latency'},
  ];
  return (
    <div style={{ background:'#0a0a0a', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#16a34a,#22c55e,#4ade80,#22c55e,#16a34a,transparent)', backgroundSize:'200% 100%', animation:'gradientMove 3s linear infinite', zIndex:2 }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(34,197,94,0.18) 1px,transparent 1px)', backgroundSize:'28px 28px', maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)', pointerEvents:'none' }} />
      <div className="stats-grid" style={{ maxWidth:1320, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', position:'relative', zIndex:1 }}>
        {stats.map((s,i)=><StatCell key={i} {...s} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SERVICES GRID
══════════════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <div className="section-pad" style={{ maxWidth:1320, margin:'96px auto', padding:'0 64px' }}>
      <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>Our Services</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:900, color:'#0a0a0a', marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Everything Behind the Curtain</h2>
      <p style={{ fontSize:15, color:'#6b7280', lineHeight:1.7, maxWidth:480, marginBottom:48 }}>Pick the layer that needs work — or hand us the whole backend and we'll own it end to end.</p>
      <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
        {services.map((svc,i)=><ServiceCard key={i} svc={svc} index={i} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOW WE WORK
══════════════════════════════════════════════════ */
function HowWeWork() {
  return (
    <div className="band-pad" style={{ background:'#0a0a0a', padding:'88px 64px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-40%', right:'-10%', width:'55%', height:'180%', background:'radial-gradient(ellipse,rgba(22,163,74,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1320, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-block', background:'rgba(22,163,74,0.14)', color:'#4ade80', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'.07em', textTransform:'uppercase', border:'1px solid rgba(22,163,74,0.25)' }}>How We Work</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:900, color:'#fff', marginBottom:56, lineHeight:1.1, letterSpacing:'-1px' }}>From Schema to On-Call</h2>
        <div className="process-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40, position:'relative' }}>
          <div style={{ position:'absolute', top:36, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,rgba(22,163,74,0.3),rgba(22,163,74,0.3),transparent)', zIndex:0 }} />
          {processSteps.map((step,i)=><ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
function Contact() {
  const {ref,visible}=useReveal();
  return (
    <div id="contact" className="section-pad" style={{ maxWidth:1320, margin:'96px auto', padding:'0 64px' }}>
      <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>Get In Touch</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:900, color:'#0a0a0a', marginBottom:8, lineHeight:1.1, letterSpacing:'-1px' }}>Send Us an Enquiry</h2>
      <p style={{ fontSize:15, color:'#6b7280', lineHeight:1.7, maxWidth:460, marginBottom:48 }}>No pricing sheets, no sales pressure — describe the system and we'll get back to you fast.</p>
      <div ref={ref} className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:0, background:'#0a0a0a', borderRadius:24, overflow:'hidden', border:'1.5px solid rgba(22,163,74,0.25)', boxShadow:'0 24px 64px rgba(22,163,74,0.14)', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'opacity 0.6s ease,transform 0.6s ease' }}>
        <div style={{ padding:'44px 40px', borderRight:'1px solid rgba(255,255,255,0.07)', position:'relative' }}>
          <div style={{ position:'absolute', top:'-30%', left:'-20%', width:'70%', height:'160%', background:'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}><EnquiryForm /></div>
        </div>
        <div style={{ padding:'34px 32px 30px', background:'linear-gradient(165deg,#0d1410 0%,#0a100c 100%)', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-20%', right:'-30%', width:'80%', height:'80%', background:'radial-gradient(ellipse,rgba(22,163,74,0.14) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ width:7,height:7,borderRadius:'50%',background:'#4ade80',animation:'dotPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.45)', fontWeight:600, letterSpacing:'.09em', textTransform:'uppercase' }}>Live Endpoint</span>
          </div>
          <p style={{ position:'relative', zIndex:1, fontSize:12.5, color:'rgba(255,255,255,0.45)', lineHeight:1.6, marginBottom:28, maxWidth:240 }}>Your enquiry hits the same kind of API we'll build for you.</p>
          <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', alignItems:'center' }}><DeviceShowcase /></div>
          <div style={{ position:'relative', zIndex:1, marginTop:30, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.07)', fontSize:12, color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center', gap:8 }}>
            <i className="ti ti-clock" style={{ fontSize:14, color:'#4ade80' }} />Usually responds within 4 hours
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════ */
function FAQ() {
  return (
    <div className="band-pad" style={{ background:'#fafaf8', padding:'88px 64px' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <div style={{ display:'inline-block', background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:600, padding:'5px 16px', borderRadius:30, marginBottom:12, letterSpacing:'.07em', textTransform:'uppercase', border:'1px solid #bbf7d0' }}>FAQ</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:900, color:'#0a0a0a', marginBottom:40, lineHeight:1.1, letterSpacing:'-1px' }}>Common Questions</h2>
        {faqs.map((item,i)=><FaqItem key={i} item={item} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════ */
function CTA() {
  return (
    <div className="band-pad" style={{ background:'#0a0a0a', borderTop:'1px solid #1a1a1a', padding:'72px 64px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-50%', right:'-15%', width:'55%', height:'200%', background:'radial-gradient(ellipse,rgba(22,163,74,0.16) 0%,transparent 70%)', animation:'pulse 5s ease-in-out infinite' }} />
      <div className="cta-inner" style={{ maxWidth:1320, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:22 }}>
          <div style={{ width:70, height:70, background:'rgba(22,163,74,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#4ade80', fontSize:32, flexShrink:0, border:'1.5px solid rgba(22,163,74,0.3)', animation:'floatIcon 3s ease-in-out infinite' }}><i className="ti ti-bolt" /></div>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:900, color:'#fff', marginBottom:8, letterSpacing:'-0.8px' }}>Not Sure What's Slowing You Down?</h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15 }}>Send a quick enquiry — we'll diagnose it before we quote it.</p>
          </div>
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', flexShrink:0 }}>
          <a href="#contact" style={{ textDecoration:'none' }}>
            <button style={{ background:'#22c55e', color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:13, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(34,197,94,0.35)' }}>Send Your Enquiry →</button>
          </a>
          <button style={{ background:'transparent', color:'#fff', padding:'14px 28px', borderRadius:12, fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:13, border:'1.5px solid rgba(255,255,255,0.2)', cursor:'pointer' }}>View Our Work →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export default function BackendServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body { overflow-x: hidden; max-width: 100vw; }
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }

        body { font-family: 'Poppins', sans-serif; background: #fafaf8; color: #0a0a0a; line-height: 1.6; font-size: 14px; }

        @keyframes dotPulse      { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.22)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0.08)} }
        @keyframes pmPulse       { 0%,100%{box-shadow:0 0 0 2px rgba(34,197,94,0.25)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0.08)} }
        @keyframes pmSpin        { to{transform:rotate(360deg)} }
        @keyframes gradientMove  { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes pulse         { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.12);opacity:1} }
        @keyframes floatIcon     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes heroFadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes deviceFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes badgeFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes barGrow       { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes barShimmer    { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes deviceLaptop  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes shieldRing    { 0%{transform:scale(0.9);opacity:0.5} 100%{transform:scale(1.5);opacity:0} }
        @keyframes dashFlow      { to{stroke-dashoffset:-40} }

        .hero-item         { animation: heroFadeUp 0.65s cubic-bezier(.22,1,.36,1) both; }
        .hero-device-float { animation: deviceFloat 6s ease-in-out infinite; }
        .hero-badge-a      { animation: badgeFloat 3.5s ease-in-out infinite; }
        .hero-badge-b      { animation: badgeFloat 3.5s ease-in-out 1.8s infinite; }

        .hero-btn-primary {
          background:#0a0a0a; color:#fff; padding:13px 26px; border-radius:11px;
          font-family:'Poppins',sans-serif; font-weight:600; font-size:13px;
          border:none; cursor:pointer; display:inline-flex; align-items:center; gap:7px;
          transition:transform 0.25s cubic-bezier(.34,1.56,.64,1),box-shadow 0.25s ease;
        }
        .hero-btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 10px 28px rgba(0,0,0,0.22); }
        .hero-btn-outline {
          background:#fff; color:#0a0a0a; padding:13px 26px; border-radius:11px;
          font-family:'Poppins',sans-serif; font-weight:600; font-size:13px;
          border:1.5px solid #e2e8f0; cursor:pointer;
          transition:transform 0.25s cubic-bezier(.34,1.56,.64,1),border-color 0.25s,color 0.25s;
        }
        .hero-btn-outline:hover { transform:translateY(-3px); border-color:#16a34a; color:#16a34a; }

        .mock-bar           { animation: barShimmer 2.2s ease-in-out infinite; }
        .mock-bar-grow      { transform-origin:bottom; animation:barGrow 0.7s cubic-bezier(.22,1,.36,1) both; }
        .mock-pulse-dot     { animation: pulse 2s ease-in-out infinite; }
        .mock-shield-ring   { animation: shieldRing 2.4s ease-out infinite; }
        .mock-pulse-line    { stroke-dasharray:6 4; animation:dashFlow 1.2s linear infinite; }
        .device-laptop-float{ animation: deviceLaptop 4.4s ease-in-out infinite; }

        .enq-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .enq-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:12px 14px; color:#fff; font-size:13px; font-family:'Poppins',sans-serif; outline:none; transition:border-color 0.25s,background 0.25s; }
        .enq-input::placeholder { color:rgba(255,255,255,0.32); }
        .enq-input:focus { border-color:#22c55e; background:rgba(34,197,94,0.07); }
        .enq-select-wrap { position:relative; display:flex; align-items:center; }
        .enq-select-icon { position:absolute; left:14px; font-size:14px; color:rgba(255,255,255,0.4); pointer-events:none; z-index:1; }
        .enq-select { appearance:none; -webkit-appearance:none; padding-left:36px; padding-right:30px; cursor:pointer; color-scheme:dark; }
        .enq-select-chevron { position:absolute; right:12px; font-size:14px; color:rgba(255,255,255,0.45); pointer-events:none; transition:transform 0.2s; }
        .enq-select-wrap:focus-within .enq-select-chevron { color:#4ade80; transform:rotate(180deg); }
        .enq-select option { background:#0d1410; color:#fff; }

        /* ══════════════════════════════════
           RESPONSIVE — 1100px (tablet)
        ══════════════════════════════════ */
        @media (max-width: 1100px) {
          .hero-grid       { grid-template-columns:1fr !important; padding:48px 32px 40px !important; gap:48px !important; }
          .hero-device-col { justify-content:center !important; }
          .stats-grid      { grid-template-columns:repeat(2,1fr) !important; }
          .services-grid   { grid-template-columns:repeat(2,1fr) !important; }
          .process-grid    { grid-template-columns:repeat(2,1fr) !important; }
          .contact-grid    { grid-template-columns:1fr !important; }
          .contact-grid > div:first-child { border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.07); }
        }

        /* ══════════════════════════════════
           RESPONSIVE — 768px (large mobile)
        ══════════════════════════════════ */
        @media (max-width: 768px) {
          .hero-grid       { padding:40px 20px 36px !important; gap:36px !important; }
          .hero-h1         { font-size:36px !important; letter-spacing:-0.6px !important; }
          .stats-grid      { grid-template-columns:repeat(2,1fr) !important; }
          .services-grid   { grid-template-columns:1fr !important; }
          .process-grid    { grid-template-columns:1fr !important; gap:32px !important; }
          .section-pad     { padding:0 20px !important; margin:64px auto !important; }
          .band-pad        { padding:56px 20px !important; }
          .enq-row         { grid-template-columns:1fr !important; }
          .cta-inner       { flex-direction:column !important; align-items:flex-start !important; }
          .hero-badge-a,
          .hero-badge-b    { display:none !important; }
          .contact-grid    { border-radius:16px !important; }
        }

        /* ══════════════════════════════════
           RESPONSIVE — 480px (small mobile)
        ══════════════════════════════════ */
        @media (max-width: 480px) {
          .hero-h1         { font-size:28px !important; }
          .stats-grid      { grid-template-columns:1fr !important; }
          .stats-grid > div{ border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.06); }
          .stats-grid > div:last-child { border-bottom:none; }
          .hero-btn-primary,
          .hero-btn-outline { width:100%; justify-content:center; }
          .hero-item > div[style*="display:'flex'"]{ flex-direction:column !important; }
          .section-pad > h2,
          .band-pad h2     { font-size:28px !important; }
          .contact-grid > div { padding:28px 20px !important; }
          .enq-input       { font-size:16px !important; }
        }

        /* ══════════════════════════════════
           RESPONSIVE — 360px (extra small)
        ══════════════════════════════════ */
        @media (max-width: 360px) {
          .hero-h1         { font-size:24px !important; }
          .hero-btn-primary,
          .hero-btn-outline { font-size:12px !important; padding:11px 18px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-item, .hero-device-float, .hero-badge-a, .hero-badge-b,
          .mock-bar, .mock-bar-grow, .mock-pulse-dot, .mock-shield-ring,
          .mock-pulse-line, .device-laptop-float { animation:none !important; }
        }
      `}</style>

      <div style={{ fontFamily:"'Poppins',sans-serif", background:'#fafaf8', color:'#0a0a0a', lineHeight:1.6, fontSize:14, overflowX:'hidden' }}>
        <Hero />
        <StatsBand />
        <ServicesGrid />
        <HowWeWork />
        <Contact />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}