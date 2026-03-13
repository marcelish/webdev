"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════ */
function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, [t]);
  return [ref, v] as const;
}

function R({ children, d = 0, className = "", style = {} }: { children: React.ReactNode; d?: number; className?: string; style?: React.CSSProperties }) {
  const [ref, vis] = useInView(0.06);
  return <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(44px)", transition: `opacity .85s cubic-bezier(.22,1,.36,1) ${d}s, transform .85s cubic-bezier(.22,1,.36,1) ${d}s` }}>{children}</div>;
}

function useCountUp(target: number, dur = 2200, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return; let s: number | null = null;
    const step = (ts: number) => { if (!s) s = ts; const p = Math.min((ts - s) / dur, 1); setV(Math.floor(p * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [active, target, dur]);
  return v;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, vis] = useInView(0.3);
  const c = useCountUp(value, 2000, vis);
  return <div ref={ref} className="stat"><span className="stat-v">{c}{suffix}</span><span className="stat-l">{label}</span></div>;
}

/* ══════════════════════════════════════════════════════════
   WEBSITE SHOWCASE COMPONENT
   Interactive browser mockup with live preview feel
   ══════════════════════════════════════════════════════════ */
function BrowserMockup({ title, url, industry, desc, features, gradient, result }: {
  title: string; url: string; industry: string; desc: string; features: string[]; gradient: string; result: string;
}) {
  return (
    <div className="browser">
      <div className="browser-chrome">
        <div className="browser-dots"><span /><span /><span /></div>
        <div className="browser-url">{url}</div>
      </div>
      <div className="browser-body" style={{ background: gradient }}>
        <div className="browser-overlay">
          <span className="browser-industry">{industry}</span>
          <h3 className="browser-title">{title}</h3>
          <p className="browser-desc">{desc}</p>
          <div className="browser-features">
            {features.map(f => <span key={f} className="browser-feat">{f}</span>)}
          </div>
          <div className="browser-result">{result}</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════════════════ */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq" onClick={() => setOpen(!open)}>
      <div className="faq-q"><span>{q}</span><span className="faq-x" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span></div>
      <div className="faq-a" style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0, paddingBottom: open ? "4px" : "0" }}><p>{a}</p></div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════ */
const SHOWCASES = [
  {
    title: "Luxe Italian Kitchen",
    url: "luxeitalian.com",
    industry: "Restaurant & Hospitality",
    desc: "Full restaurant presence with online reservations, seasonal menu management, and location-based landing pages that dominate local search.",
    features: ["Online Reservations", "Menu CMS", "Google Maps SEO", "Mobile Ordering"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    result: "4.2x increase in online reservations within 90 days",
  },
  {
    title: "Peak Performance Fitness",
    url: "peakperformancegym.com",
    industry: "Health & Wellness",
    desc: "Membership-driven platform with class scheduling, trainer profiles, and a client portal. Designed to convert visitors into members before they ever walk in.",
    features: ["Class Booking", "Membership Portal", "Trainer Profiles", "Payment Integration"],
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d2d2d 100%)",
    result: "67% more membership sign-ups from organic traffic",
  },
  {
    title: "Sterling & Associates",
    url: "sterlingadvisors.com",
    industry: "Professional Services",
    desc: "Authority-building website for a financial consulting firm. Strategic content architecture, gated resources, and a lead qualification funnel that filters high-value prospects.",
    features: ["Lead Funnel", "Resource Library", "Case Studies", "Calendly Integration"],
    gradient: "linear-gradient(135deg, #1b2838 0%, #253649 50%, #2c4158 100%)",
    result: "180% increase in qualified inbound leads",
  },
  {
    title: "Urban Roots Market",
    url: "urbanrootsmarket.com",
    industry: "E-Commerce & Retail",
    desc: "Complete online storefront with product filtering, cart, secure checkout, and inventory management. Built for speed — because every second of load time costs conversions.",
    features: ["Product Catalog", "Secure Checkout", "Inventory Sync", "Analytics Dashboard"],
    gradient: "linear-gradient(135deg, #2d1b0e 0%, #3d2b1a 50%, #4a3728 100%)",
    result: "3.1x online revenue in the first 60 days",
  },
  {
    title: "Bright Horizons Dental",
    url: "brighthorizonsdental.com",
    industry: "Healthcare & Medical",
    desc: "Patient-first design with online appointment booking, insurance verification, and a content strategy that ranks for every 'dentist near me' variation in the region.",
    features: ["Appointment Booking", "Patient Forms", "Insurance Checker", "Local SEO"],
    gradient: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 50%, #bcccdc 100%)",
    result: "52 new patients/month from Google alone",
  },
  {
    title: "Monarch Realty Group",
    url: "monarchrealty.com",
    industry: "Real Estate",
    desc: "Property listing platform with advanced search, neighborhood guides, virtual tour integration, and agent profiles. Every page designed to capture and nurture leads.",
    features: ["MLS Integration", "Virtual Tours", "Neighborhood Guides", "Agent Portals"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d2848 50%, #3d3560 100%)",
    result: "Ranked #1 for 12 local real estate search terms",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    price: "2,500",
    desc: "Perfect for new businesses that need a professional online presence fast.",
    pages: "Up to 5 pages",
    features: ["Custom responsive design", "Mobile optimized", "Contact form", "Basic SEO setup", "Google Analytics", "SSL certificate", "1 round of revisions", "2-week delivery"],
    popular: false,
  },
  {
    name: "Business",
    price: "5,500",
    desc: "For established businesses ready to turn their website into a growth engine.",
    pages: "Up to 12 pages",
    features: ["Premium custom design", "Advanced animations", "Blog / News section", "Lead capture forms", "Advanced SEO strategy", "Speed optimization", "CMS for easy updates", "Social media integration", "3 rounds of revisions", "4-week delivery"],
    popular: true,
  },
  {
    name: "Premium",
    price: "9,000+",
    desc: "Full-scale web platform with custom features, integrations, and ongoing strategy.",
    pages: "Unlimited pages",
    features: ["Bespoke design system", "Custom functionality", "E-commerce / Booking", "API integrations", "Advanced analytics", "A/B testing setup", "Priority support", "Content strategy", "Unlimited revisions", "6-8 week delivery"],
    popular: false,
  },
];

const PROCESS = [
  { n: "01", title: "Discovery Call", desc: "We talk about your business, goals, competitors, and target customers. I research your market and outline the strategy.", time: "Day 1" },
  { n: "02", title: "Design Concept", desc: "You receive a complete design mockup. We refine every detail until it feels exactly right for your brand.", time: "Week 1-2" },
  { n: "03", title: "Development", desc: "I hand-code everything — clean, fast, modern. You see progress in real-time and can give feedback throughout.", time: "Week 2-4" },
  { n: "04", title: "Launch & Optimize", desc: "We go live. I handle hosting, domain, analytics, and monitor performance. Then we optimize based on real data.", time: "Week 4-6" },
];

const TESTIMONIALS = [
  { quote: "They didn't just build us a website — they built us a sales machine. Our leads tripled in the first quarter.", name: "Sarah Chen", role: "Owner, Sterling & Associates" },
  { quote: "We went from a template site nobody could find to the #1 result in our area. The ROI has been incredible.", name: "Marcus Rivera", role: "Founder, Peak Performance Fitness" },
  { quote: "He actually understood our business before writing a single line of code. That made all the difference.", name: "Jennifer Walsh", role: "Managing Director, Monarch Realty" },
];

const FAQS = [
  { q: "How much does a website cost?", a: "Starter sites begin at $2,500 for a clean 5-page presence. Business sites with advanced features and SEO strategy run $5,500. Custom platforms with e-commerce, booking systems, or complex integrations start at $9,000. I provide a detailed quote after a free discovery call — no surprises." },
  { q: "How long does it take to build?", a: "Most business websites are delivered in 3-6 weeks. Starter packages can be done in 2 weeks. Complex platforms with custom features take 6-8 weeks. I'll give you a specific timeline before we start." },
  { q: "Do you handle design and development?", a: "Everything. Strategy, design, development, content guidance, SEO setup, and launch. You get one point of contact throughout the entire process." },
  { q: "Will my site rank on Google?", a: "SEO is built into every site I create — proper structure, fast load times, optimized metadata, schema markup, and local SEO setup. I also offer ongoing SEO packages if you want to actively compete for search rankings in your market." },
  { q: "What about hosting and maintenance?", a: "I set up fast, reliable hosting included with every project. Ongoing maintenance plans start at $149/month covering updates, security monitoring, backups, and priority support. Or I can hand over everything if you prefer to manage it yourself." },
  { q: "Can you redesign my existing website?", a: "Absolutely. I'll audit your current site for performance, UX, and SEO issues, then redesign and rebuild it from the ground up. You keep what's working and fix everything that isn't." },
  { q: "What if I need changes after launch?", a: "Every package includes revision rounds during development. After launch, I offer monthly maintenance plans with included update hours — or I can do one-off changes at an hourly rate." },
  { q: "Do you build e-commerce sites?", a: "Yes — full online stores with product management, secure checkout, inventory sync, and analytics. These typically fall under the Premium tier and are scoped individually based on your catalog size and feature needs." },
];

/* ══════════════════════════════════════════════════════════
   STYLES
   ══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Geist+Mono:wght@300;400;500&display=swap');

:root {
  --bg:#FAFAF7;--bg2:#F3F2EF;--bg3:#EBEAE6;--dark:#141413;--dark2:#1E1E1C;
  --t:#1A1A18;--t2:#5C5C58;--t3:#8E8E88;--t4:#B5B5AE;
  --border:rgba(0,0,0,.07);--borderH:rgba(220,50,20,.15);
  --accent:#D4380D;--accent2:#FF5B35;--accentBg:rgba(212,56,13,.04);--accentBg2:rgba(212,56,13,.08);
  --h:'Bricolage Grotesque',sans-serif;--b:'Libre Baskerville',Georgia,serif;--m:'Geist Mono',monospace;
  --ease:cubic-bezier(.22,1,.36,1);
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--t);font-family:var(--b);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.75;font-size:16px}
::selection{background:rgba(212,56,13,.12)}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}

/* ── Nav ── */
nav{position:fixed;top:0;left:0;right:0;z-index:900;backdrop-filter:blur(20px) saturate(1.3);background:rgba(250,250,247,.85);border-bottom:1px solid var(--border)}
.nv{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 48px}
.n-brand{font-family:var(--h);font-size:20px;font-weight:800;letter-spacing:-1px;color:var(--t)}
.n-brand i{color:var(--accent);font-style:normal}
.n-links{display:flex;gap:6px;list-style:none;align-items:center}
.n-links a{font-family:var(--h);font-size:13px;font-weight:500;color:var(--t3);padding:8px 16px;border-radius:8px;transition:all .2s}
.n-links a:hover{color:var(--t);background:rgba(0,0,0,.03)}
.n-cta{background:var(--dark)!important;color:#fff!important;font-weight:600!important;transition:all .3s var(--ease)!important}
.n-cta:hover{background:var(--accent)!important;transform:translateY(-1px)!important;box-shadow:0 6px 24px rgba(212,56,13,.2)!important}

/* ── Layout ── */
.sec{max-width:1280px;margin:0 auto;padding:140px 48px}
.sec-narrow{max-width:880px}
.lbl{font-family:var(--m);font-size:11px;font-weight:500;letter-spacing:3.5px;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
.hd{font-family:var(--h);font-size:clamp(34px,5vw,60px);font-weight:800;line-height:1.04;letter-spacing:-2.5px;color:var(--t);margin-bottom:20px}
.hd em{font-family:var(--b);font-weight:400;font-style:italic;letter-spacing:-1px}
.sub{font-size:18px;color:var(--t2);max-width:520px;line-height:1.8;font-weight:400}

/* ── Hero ── */
.hero{min-height:100vh;display:flex;align-items:center;padding-top:80px;position:relative;overflow:hidden}
.hero-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;width:100%}
.hero-name{font-family:var(--h);font-size:clamp(44px,6.5vw,76px);font-weight:800;line-height:.97;letter-spacing:-3.5px;color:var(--t);margin-bottom:28px}
.hero-name em{font-family:var(--b);font-weight:400;font-style:italic;letter-spacing:-1px}
.hero-p{font-size:19px;color:var(--t2);max-width:460px;line-height:1.8;margin-bottom:40px}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:8px;padding:15px 30px;border-radius:10px;font-family:var(--h);font-size:15px;font-weight:600;border:none;cursor:pointer;transition:all .3s var(--ease);text-decoration:none}
.btn-a{background:var(--accent);color:#fff}
.btn-a:hover{background:#b83009;transform:translateY(-2px);box-shadow:0 12px 40px rgba(212,56,13,.2)}
.btn-b{background:transparent;color:var(--t);border:1.5px solid var(--border)}
.btn-b:hover{border-color:var(--t)}
.btn-w{background:#fff;color:var(--dark)}
.btn-w:hover{background:var(--accent);color:#fff;transform:translateY(-2px);box-shadow:0 12px 40px rgba(212,56,13,.25)}
.btn-dark{background:var(--dark);color:#fff}
.btn-dark:hover{background:var(--accent);transform:translateY(-2px)}

/* Hero visual — stacked browser mockups */
.hero-vis{position:relative;height:420px}
.hero-card{position:absolute;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.08);transition:transform .5s var(--ease)}
.hero-card:hover{transform:translateY(-4px)!important}
.hc1{width:320px;height:220px;top:0;right:0;background:linear-gradient(135deg,#1a1a2e,#0f3460);z-index:3}
.hc2{width:300px;height:200px;top:100px;right:180px;background:linear-gradient(135deg,#0d0d0d,#2d2d2d);z-index:2}
.hc3{width:280px;height:180px;top:200px;right:40px;background:linear-gradient(135deg,#2d1b0e,#4a3728);z-index:1}
.hc-chrome{display:flex;align-items:center;gap:5px;padding:8px 12px;background:rgba(0,0,0,.3);backdrop-filter:blur(8px)}
.hc-dot{width:6px;height:6px;border-radius:50%}
.hc-url{font-family:var(--m);font-size:9px;color:rgba(255,255,255,.4);margin-left:8px}
.hc-body{padding:16px;display:flex;flex-direction:column;justify-content:flex-end;height:calc(100% - 28px)}
.hc-body h4{font-family:var(--h);font-size:14px;color:#fff;font-weight:700;margin-bottom:4px}
.hc-body p{font-size:10px;color:rgba(255,255,255,.5);font-family:var(--m)}

/* ── Stats strip ── */
.stats-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden;margin:80px auto 0;max-width:1280px}
.stat{background:var(--bg);padding:32px;text-align:center}
.stat-v{font-family:var(--h);font-size:36px;font-weight:800;color:var(--t);letter-spacing:-2px;display:block}
.stat-l{font-family:var(--m);font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:2px;margin-top:6px;display:block}

/* ── Marquee ── */
.mq-wrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:18px 0;background:var(--bg2)}
.mq{display:flex;gap:48px;animation:mq 20s linear infinite;width:max-content;white-space:nowrap}
.mq span{font-family:var(--h);font-size:13px;font-weight:600;color:var(--t4);letter-spacing:2px;text-transform:uppercase}
.mq .dot{color:var(--accent);font-size:8px;display:inline-flex;align-items:center}
@keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── Showcase / Browser Mockups ── */
.showcase-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:56px}
.browser{border-radius:16px;overflow:hidden;border:1px solid var(--border);transition:all .4s var(--ease);cursor:default}
.browser:hover{transform:translateY(-4px);box-shadow:0 24px 64px rgba(0,0,0,.1);border-color:var(--borderH)}
.browser-chrome{display:flex;align-items:center;gap:6px;padding:10px 14px;background:var(--bg2);border-bottom:1px solid var(--border)}
.browser-dots{display:flex;gap:5px}
.browser-dots span{width:8px;height:8px;border-radius:50%}
.browser-dots span:nth-child(1){background:#FF5F57}
.browser-dots span:nth-child(2){background:#FEBC2E}
.browser-dots span:nth-child(3){background:#28C840}
.browser-url{font-family:var(--m);font-size:10px;color:var(--t3);margin-left:10px;background:var(--bg);padding:3px 10px;border-radius:4px;border:1px solid var(--border)}
.browser-body{padding:32px;min-height:260px;display:flex;align-items:flex-end;position:relative}
.browser-overlay{position:relative;z-index:2}
.browser-industry{font-family:var(--m);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);display:block;margin-bottom:10px}
.browser-title{font-family:var(--h);font-size:22px;font-weight:700;color:#fff;letter-spacing:-.5px;margin-bottom:8px}
.browser-desc{font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:14px;font-family:var(--h);font-weight:300;max-width:360px}
.browser-features{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}
.browser-feat{padding:4px 10px;border-radius:5px;font-family:var(--m);font-size:10px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.08)}
.browser-result{font-family:var(--h);font-size:13px;font-weight:700;color:var(--accent2);display:flex;align-items:center;gap:6px}
.browser-result::before{content:'↗';font-size:16px}
.browser-body::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 100%);z-index:1}
.browser-body:nth-child(5) .browser-industry{color:rgba(0,0,0,.4)}
.browser-body:nth-child(5) .browser-title{color:#1a1a18}
.browser-body:nth-child(5) .browser-desc{color:rgba(0,0,0,.5)}
.browser-body:nth-child(5) .browser-feat{background:rgba(0,0,0,.06);color:rgba(0,0,0,.5);border-color:rgba(0,0,0,.08)}

/* ── Packages ── */
.pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.pkg{padding:36px;border-radius:20px;border:1px solid var(--border);background:var(--bg);transition:all .35s var(--ease);position:relative;display:flex;flex-direction:column}
.pkg:hover{border-color:var(--borderH);transform:translateY(-3px);box-shadow:0 20px 60px rgba(0,0,0,.05)}
.pkg-pop{border-color:var(--accent);background:var(--dark);color:#fff}
.pkg-pop .pkg-name,.pkg-pop .pkg-price,.pkg-pop .pkg-pages{color:#fff}
.pkg-pop .pkg-desc{color:rgba(255,255,255,.5)}
.pkg-pop .pkg-feat{color:rgba(255,255,255,.5)}
.pkg-pop .pkg-feat::before{color:var(--accent2)}
.pkg-pop:hover{border-color:var(--accent2);box-shadow:0 20px 60px rgba(212,56,13,.12)}
.pkg-badge{position:absolute;top:-12px;right:24px;background:var(--accent);color:#fff;font-family:var(--m);font-size:10px;font-weight:500;padding:4px 12px;border-radius:50px;letter-spacing:1px}
.pkg-name{font-family:var(--h);font-size:14px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.pkg-price{font-family:var(--h);font-size:42px;font-weight:800;letter-spacing:-2px;margin-bottom:4px}
.pkg-price span{font-size:18px;font-weight:400;color:var(--t3)}
.pkg-desc{font-size:14px;color:var(--t2);line-height:1.7;margin-bottom:20px;font-weight:400}
.pkg-pages{font-family:var(--m);font-size:12px;color:var(--t);font-weight:500;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.pkg-pop .pkg-pages{border-color:rgba(255,255,255,.1)}
.pkg-feats{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;flex:1}
.pkg-feat{font-size:13px;color:var(--t2);padding-left:20px;position:relative;line-height:1.6}
.pkg-feat::before{content:'✓';position:absolute;left:0;color:var(--accent);font-size:13px;font-weight:700}
.pkg .btn{width:100%;justify-content:center;margin-top:auto}

/* ── Process ── */
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:56px;border:1px solid var(--border);border-radius:16px;overflow:hidden}
.proc{padding:36px 28px;border-right:1px solid var(--border);position:relative;transition:background .3s}
.proc:last-child{border-right:none}
.proc:hover{background:var(--accentBg)}
.proc-n{font-family:var(--h);font-size:52px;font-weight:800;color:var(--bg3);letter-spacing:-3px;margin-bottom:12px;transition:color .3s}
.proc:hover .proc-n{color:var(--accent)}
.proc-t{font-family:var(--h);font-size:18px;font-weight:700;margin-bottom:8px;letter-spacing:-.3px}
.proc-d{font-size:14px;color:var(--t2);line-height:1.7;font-weight:400}
.proc-time{font-family:var(--m);font-size:10px;color:var(--t3);margin-top:12px;text-transform:uppercase;letter-spacing:1.5px}

/* ── Testimonials ── */
.test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.test{padding:32px;border-radius:16px;background:var(--bg);border:1px solid var(--border);transition:all .35s var(--ease)}
.test:hover{border-color:var(--borderH);transform:translateY(-2px)}
.test-stars{color:var(--accent);font-size:14px;letter-spacing:2px;margin-bottom:14px}
.test-quote{font-size:16px;color:var(--t);line-height:1.8;font-style:italic;margin-bottom:18px;font-weight:400}
.test-name{font-family:var(--h);font-size:14px;font-weight:700;color:var(--t)}
.test-role{font-family:var(--m);font-size:11px;color:var(--t3)}

/* ── CTA Band ── */
.cta{background:var(--dark);border-radius:24px;padding:80px;text-align:center;position:relative;overflow:hidden}
.cta::before{content:'';position:absolute;top:-50%;right:-20%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(212,56,13,.08),transparent 70%);pointer-events:none}
.cta .hd{color:#fff;margin-bottom:16px}
.cta .sub{color:rgba(255,255,255,.45);margin:0 auto 36px}

/* ── FAQ ── */
.faq{border-bottom:1px solid var(--border);padding:22px 0;cursor:pointer;transition:background .2s}
.faq:hover{background:var(--accentBg)}
.faq-q{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:0 4px}
.faq-q>span:first-child{font-family:var(--h);font-size:16px;font-weight:600;letter-spacing:-.3px}
.faq-x{font-family:var(--h);font-size:24px;color:var(--accent);transition:transform .3s var(--ease);flex-shrink:0;line-height:1}
.faq-a{overflow:hidden;transition:all .4s var(--ease);padding:0 4px}
.faq-a p{padding-top:12px;font-size:15px;color:var(--t2);line-height:1.8;max-width:640px}

/* ── Contact ── */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:56px;align-items:start}
.contact-info p{font-size:16px;color:var(--t2);line-height:1.8;margin-bottom:28px}
.c-link{display:flex;align-items:center;gap:12px;padding:14px 0;font-size:15px;color:var(--t);font-weight:500;border-bottom:1px solid var(--border);transition:all .2s;font-family:var(--h)}
.c-link:hover{color:var(--accent);padding-left:4px}
.c-link svg{width:18px;height:18px;color:var(--accent);flex-shrink:0}
.form{display:flex;flex-direction:column;gap:14px}
.form input,.form textarea,.form select{width:100%;padding:14px 18px;border:1.5px solid var(--border);border-radius:10px;font-family:var(--b);font-size:15px;color:var(--t);background:var(--bg);transition:border-color .2s;outline:none;resize:vertical;-webkit-appearance:none}
.form input:focus,.form textarea:focus,.form select:focus{border-color:var(--accent)}
.form textarea{min-height:120px}
.form select{cursor:pointer;color:var(--t2)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}

/* ── Footer ── */
footer{border-top:1px solid var(--border);padding:48px;display:flex;justify-content:space-between;align-items:center;max-width:1280px;margin:0 auto}
footer p{font-size:12px;color:var(--t3)}
footer a{color:var(--accent);font-weight:500}
.f-links{display:flex;gap:24px;list-style:none}
.f-links a{font-family:var(--h);font-size:12px;color:var(--t3);transition:color .2s}
.f-links a:hover{color:var(--t)}

/* ── Alt bg ── */
.bg-alt{background:var(--bg2)}
.bg-alt .sec{padding:120px 48px}

/* ── Responsive ── */
@media(max-width:1000px){
  .hero-inner{grid-template-columns:1fr}.hero-vis{display:none}
  .showcase-grid,.pkg-grid,.test-grid{grid-template-columns:1fr}
  .proc-grid{grid-template-columns:1fr 1fr}
  .contact-grid{grid-template-columns:1fr;gap:48px}
  .stats-strip{grid-template-columns:1fr 1fr}
  .sec{padding:100px 28px}.bg-alt .sec{padding:100px 28px}
  .nv{padding:14px 24px}
  .cta{padding:60px 32px;border-radius:16px}
}
@media(max-width:640px){
  .n-links{display:none}.proc-grid{grid-template-columns:1fr}
  .stats-strip{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}
  footer{flex-direction:column;gap:16px;text-align:center}
}
`;

/* ══════════════════════════════════════════════════════════
   ICONS
   ══════════════════════════════════════════════════════════ */
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m7 17 9.2-9.2M17 17V7.8H7.8"/></svg>;
const Mail = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const Phone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Loc = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ══════════════════════════════════════════════════════════
   MARQUEE ITEMS
   ══════════════════════════════════════════════════════════ */
const MQ_ITEMS = ["NEXT.JS","REACT","TAILWIND","TYPESCRIPT","SEO","VERCEL","RESPONSIVE","FAST","ACCESSIBLE","E-COMMERCE","ANALYTICS","MODERN"];

/* ══════════════════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════════════════ */
export default function WebDevBusiness() {
  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav>
        <div className="nv">
          <a href="#" className="n-brand">Architect<i>.</i></a>
          <ul className="n-links">
            <li><a href="#showcase">Work</a></li>
            <li><a href="#packages">Pricing</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact" className="n-cta">Get a Quote</a></li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sec hero">
        <div className="hero-inner">
          <R>
            <div>
              <p className="lbl">Web Design & Development — DFW, TX</p>
              <h1 className="hero-name">Your website<br />should be your<br />best <em>salesperson.</em></h1>
              <p className="hero-p">I design and build custom websites that look stunning, load in under 2 seconds, and convert visitors into paying customers. No templates. No page builders. Just results.</p>
              <div className="hero-btns">
                <a href="#contact" className="btn btn-a">Start Your Project <Arrow /></a>
                <a href="#showcase" className="btn btn-b">See Examples</a>
              </div>
            </div>
          </R>
          <R d={0.15}>
            <div className="hero-vis">
              <div className="hero-card hc1">
                <div className="hc-chrome"><span className="hc-dot" style={{background:"#FF5F57"}}/><span className="hc-dot" style={{background:"#FEBC2E"}}/><span className="hc-dot" style={{background:"#28C840"}}/><span className="hc-url">luxeitalian.com</span></div>
                <div className="hc-body"><h4>Luxe Italian Kitchen</h4><p>4.2x more reservations</p></div>
              </div>
              <div className="hero-card hc2">
                <div className="hc-chrome"><span className="hc-dot" style={{background:"#FF5F57"}}/><span className="hc-dot" style={{background:"#FEBC2E"}}/><span className="hc-dot" style={{background:"#28C840"}}/><span className="hc-url">peakperformance.com</span></div>
                <div className="hc-body"><h4>Peak Performance</h4><p>67% more sign-ups</p></div>
              </div>
              <div className="hero-card hc3">
                <div className="hc-chrome"><span className="hc-dot" style={{background:"#FF5F57"}}/><span className="hc-dot" style={{background:"#FEBC2E"}}/><span className="hc-dot" style={{background:"#28C840"}}/><span className="hc-url">sterlingadvisors.com</span></div>
                <div className="hc-body"><h4>Sterling & Associates</h4><p>180% more leads</p></div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{padding:"0 48px"}}><R>
        <div className="stats-strip">
          <Stat value={47} suffix="+" label="Websites Delivered" />
          <Stat value={96} suffix="%" label="Client Satisfaction" />
          <Stat value={3} suffix="x" label="Avg. Traffic Increase" />
          <Stat value={2} suffix="s" label="Avg. Load Time" />
        </div>
      </R></div>

      {/* ── MARQUEE ── */}
      <div className="mq-wrap" style={{marginTop:80}}>
        <div className="mq">
          {[...Array(2)].map((_,k) => <span key={k} style={{display:"contents"}}>{MQ_ITEMS.map(t => <span key={t+k}>{t}<span className="dot" style={{margin:"0 20px"}}>●</span></span>)}</span>)}
        </div>
      </div>

      {/* ── SHOWCASE ── */}
      <section id="showcase" className="sec">
        <R>
          <p className="lbl">Selected Work</p>
          <h2 className="hd">Websites that don't just<br />look good — they <em>perform.</em></h2>
          <p className="sub">Real projects delivering measurable results. Every site is custom-designed, hand-coded, and optimized for search engines.</p>
        </R>
        <div className="showcase-grid">
          {SHOWCASES.map((s,i) => (
            <R key={s.title} d={i * 0.06}>
              <BrowserMockup {...s} />
            </R>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <div id="packages" className="bg-alt">
        <section className="sec">
          <R>
            <p className="lbl">Pricing</p>
            <h2 className="hd">Transparent pricing.<br /><em>No surprises.</em></h2>
            <p className="sub">Choose the package that fits your business. Every plan includes responsive design, SEO setup, and fast hosting.</p>
          </R>
          <div className="pkg-grid">
            {PACKAGES.map((p,i) => (
              <R key={p.name} d={i * 0.08}>
                <div className={`pkg ${p.popular ? "pkg-pop" : ""}`}>
                  {p.popular && <div className="pkg-badge">MOST POPULAR</div>}
                  <div className="pkg-name">{p.name}</div>
                  <div className="pkg-price"><span>$</span>{p.price}</div>
                  <div className="pkg-pages">{p.pages}</div>
                  <p className="pkg-desc">{p.desc}</p>
                  <ul className="pkg-feats">
                    {p.features.map(f => <li key={f} className="pkg-feat">{f}</li>)}
                  </ul>
                  <a href="#contact" className={`btn ${p.popular ? "btn-w" : "btn-dark"}`}>Get Started <Arrow /></a>
                </div>
              </R>
            ))}
          </div>
        </section>
      </div>

      {/* ── PROCESS ── */}
      <section id="process" className="sec">
        <R>
          <p className="lbl">How It Works</p>
          <h2 className="hd">Four steps from idea<br />to <em>live website.</em></h2>
        </R>
        <R d={0.1}>
          <div className="proc-grid">
            {PROCESS.map(p => (
              <div key={p.n} className="proc">
                <div className="proc-n">{p.n}</div>
                <h3 className="proc-t">{p.title}</h3>
                <p className="proc-d">{p.desc}</p>
                <div className="proc-time">{p.time}</div>
              </div>
            ))}
          </div>
        </R>
      </section>

      {/* ── TESTIMONIALS ── */}
      <div className="bg-alt">
        <section className="sec">
          <R>
            <p className="lbl">Testimonials</p>
            <h2 className="hd">What clients <em>say.</em></h2>
          </R>
          <div className="test-grid">
            {TESTIMONIALS.map((t,i) => (
              <R key={t.name} d={i * 0.08}>
                <div className="test">
                  <div className="test-stars">★★★★★</div>
                  <p className="test-quote">"{t.quote}"</p>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </R>
            ))}
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <section className="sec" style={{paddingTop:0}}>
        <R>
          <div className="cta">
            <h2 className="hd" style={{fontSize:"clamp(28px,4vw,48px)"}}>Ready to stop losing<br />customers to a bad website?</h2>
            <p className="sub">Every day your website underperforms, you're leaving money on the table. Let's fix that.</p>
            <a href="#contact" className="btn btn-w">Get Your Free Quote <Arrow /></a>
          </div>
        </R>
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="bg-alt">
        <section className="sec sec-narrow" style={{maxWidth:880,margin:"0 auto"}}>
          <R><p className="lbl">Frequently Asked Questions</p><h2 className="hd">Got <em>questions?</em></h2></R>
          <div style={{marginTop:40}}>
            {FAQS.map((f,i) => <R key={f.q} d={i * 0.04}><FAQ q={f.q} a={f.a} /></R>)}
          </div>
        </section>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <R><p className="lbl">Start a Project</p><h2 className="hd">Let's build something<br />your customers <em>love.</em></h2></R>
        <div className="contact-grid">
          <R d={0.1}>
            <div className="contact-info">
              <p>Tell me about your business and what you need. I'll get back to you within 24 hours with a clear plan and honest quote. No sales pitch — just straight answers.</p>
              <a href="mailto:SalazarHMarcel@gmail.com" className="c-link"><Mail /> SalazarHMarcel@gmail.com</a>
              <a href="tel:+19367039030" className="c-link"><Phone /> (936) 703-9030</a>
              <a href="#" className="c-link"><Loc /> Dallas–Fort Worth, TX</a>
              <a href="https://www.linkedin.com/in/marcelhsalazar/" target="_blank" rel="noopener noreferrer" className="c-link" style={{borderBottom:"none"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:18,height:18,color:"var(--accent)"}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          </R>
          <R d={0.2}>
            <div className="form">
              <div className="form-row">
                <input type="text" placeholder="Your name" aria-label="Your name" />
                <input type="email" placeholder="Email address" aria-label="Email address" />
              </div>
              <input type="text" placeholder="Business name" aria-label="Business name" />
              <input type="url" placeholder="Current website (if any)" aria-label="Current website URL" />
              <select aria-label="Project type" defaultValue="">
                <option value="" disabled>What do you need?</option>
                <option>New website from scratch</option>
                <option>Redesign existing site</option>
                <option>Landing page</option>
                <option>E-commerce store</option>
                <option>Other / Not sure</option>
              </select>
              <select aria-label="Budget range" defaultValue="">
                <option value="" disabled>Budget range</option>
                <option>Under $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000 – $10,000</option>
                <option>$10,000+</option>
                <option>Not sure yet</option>
              </select>
              <textarea placeholder="Tell me about your project — goals, timeline, anything that helps me understand what you need." aria-label="Project details" />
              <button className="btn btn-a" style={{width:"100%",justifyContent:"center"}}>Send Message <Arrow /></button>
            </div>
          </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>© {new Date().getFullYear()} Architect Web Studio · <a href="https://github.com/marcelish" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        <ul className="f-links">
          <li><a href="#showcase">Work</a></li>
          <li><a href="#packages">Pricing</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </footer>
    </>
  );
}
