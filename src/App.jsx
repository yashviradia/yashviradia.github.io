import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TIMELINE_DATA = [
  {
    year: "2026",
    type: "year",
    items: [
      {
        id: "26-1",
        title: "Obsolescence Tool",
        desc: "Enterprise-grade tool to detect and manage hardware and software obsolescence, flagging end-of-life components across complex industrial systems.",
        tags: ["Enterprise", "Tooling", "Analysis"],
      },
      {
        id: "26-2",
        title: "Cloud Dashboard — IAV GmbH",
        desc: "Analytics dashboard built for IAV GmbH (Ingenieurgesellschaft Auto und Verkehr) to make complex automotive engineering data intuitively accessible. The platform lets end users explore datasets through multiple lenses without any data science background: dynamic curves for signal analysis, normal distribution overlays, histograms for frequency inspection, matrix tables for multi-dimensional comparison, and raw JSON structure views for full data transparency. Built to bridge the gap between raw measurement data and actionable insight.",
        tags: ["IAV GmbH", "Data Analytics", "Dashboard", "Visualisation", "Cloud"],
      },
      {
        id: "26-3",
        title: "Computer Vision",
        desc: "Advanced CV pipeline for real-time image recognition and object detection, built on deep learning architectures with transfer learning.",
        tags: ["CV", "PyTorch", "Deep Learning"],
      },
    ],
  },
  {
    year: "2025",
    type: "year",
    items: [
      {
        id: "25-1",
        title: "QLoRA on AWS SageMaker — Open Source",
        desc: "Open-source contribution fine-tuning large language models using Quantized Low-Rank Adaptation (QLoRA) on AWS SageMaker, making efficient LLM training accessible at scale.",
        tags: ["QLoRA", "AWS SageMaker", "Open Source", "Fine-tuning"],
      },
      {
        id: "25-2",
        title: "NLP Food Classification — Gradio App",
        desc: "Transfer learning model paired with a Gradio web app: the user types an image caption and the model classifies whether the described image is food or not food.",
        tags: ["NLP", "Transfer Learning", "Gradio", "Classification"],
      },
      {
        id: "25-3",
        title: "PowerBI Data Dashboards",
        desc: "Four distinct analytics dashboards: Oodles Noodles, Southern Prefecture Restaurant, UFO Sightings, and Yeti Sightings — transforming raw CSV and database data into interactive visual stories.",
        tags: ["PowerBI", "Data Viz", "Analytics"],
      },
      {
        id: "25-4",
        title: "Camunda Workflow System",
        desc: "Workflow automation platform using Camunda BPM — Java backend, MySQL Workbench database, and a custom frontend. Models full registration flows for project work, bachelor thesis, and master thesis submissions.",
        tags: ["Camunda", "BPM", "Java", "MySQL"],
      },
      {
        id: "25-5",
        title: "AI Agents for C# — Brose Sitech",
        desc: "Proof-of-concept for Brose Sitech: autonomous AI agents integrated into their C# codebase to improve code structure, boost developer productivity, and onboard new team members faster.",
        tags: ["AI Agents", "C#", ".NET", "Enterprise"],
      },
      {
        id: "25-6",
        title: "Job Crawler — Siemens Mobility",
        desc: "Containerised competitor job-listing scrapers built to be robust against captcha and pagination. Raw CSV output is loaded into a Postgres database, managed via Kubernetes in enterprise cloud. Docker images for each scraper, fully orchestrated — with a PowerBI dashboard as the live frontend.",
        tags: ["Web Scraping", "Docker", "Kubernetes", "Postgres", "PowerBI"],
      },
    ],
  },
  {
    year: "2024",
    type: "year",
    items: [
      {
        id: "24-1",
        title: "Dog Breed Classifier — Computer Vision",
        desc: "Transfer learning deep learning model trained on 10,000 sample images to predict the breed of a dog. Achieved strong accuracy by leveraging a pre-trained backbone and fine-tuning on the custom dataset.",
        tags: ["CV", "Transfer Learning", "Deep Learning", "PyTorch"],
      },
      {
        id: "24-2",
        title: "Bulldozer Price Prediction",
        desc: "Linear regression machine learning model predicting heavy machinery auction prices by learning patterns from historical sales features — a classic end-to-end ML pipeline.",
        tags: ["ML", "Regression", "Scikit-learn"],
      },
      {
        id: "24-3",
        title: "Heart Disease Prediction",
        desc: "Binary classification model built to predict cardiovascular disease risk from clinical patient data — full pipeline from feature engineering to evaluation.",
        tags: ["ML", "Classification", "Healthcare"],
      },
      {
        id: "24-4",
        title: "Linux × Raspberry Pi — Project Failure",
        desc: "An honest entry. A Raspberry Pi project intended to pull real-time data from farming fields. It didn't ship — but it delivered hard lessons in embedded Linux, hardware constraints, and knowing when to pivot.",
        tags: ["Linux", "Raspberry Pi", "IoT", "Learning"],
        isFail: true,
      },
    ],
  },
  {
    year: "2023",
    type: "year",
    items: [
      {
        id: "23-1",
        title: "HackZurich — Sika LLM Integration",
        desc: "Built a working prototype at HackZurich for Sika AG — integrating LLM capabilities into their existing enterprise knowledge infrastructure to unlock intelligent document search and automated workflows.",
        tags: ["Hackathon", "LLM", "Sika", "Prototype"],
      },
      {
        id: "23-2",
        title: "Smartbrain — React Face Recognition App",
        desc: "Full-stack React web application with face recognition features. Built with component-driven architecture, state management, and a Node.js backend.",
        tags: ["React", "Face Recognition", "Full Stack"],
        link: "https://github.com/yashviradia/face_recognition_smartbrain",
      },
    ],
  },
  {
    year: "≤ 2022",
    type: "year",
    items: [
      {
        id: "22-1",
        title: "React To-Do List",
        desc: "The first React project. A classic to-do list app — the beginning of a frontend journey and the foundation for everything that followed.",
        tags: ["React", "JavaScript", "Beginner"],
      },
      {
        id: "22-2",
        title: "Foundations Stack",
        desc: "The stack that built everything: JavaScript, HTML, CSS, Java, and the fundamentals of Data Structures & Algorithms. Every line written was a brick in the wall.",
        tags: ["JavaScript", "HTML", "CSS", "Java", "DSA"],
      },
      {
        id: "22-3",
        title: "Part-time at Netto",
        desc: "Oct 2021 – Apr 2022. Part-time retail work — building discipline, time management, and the ability to operate under pressure alongside studies.",
        tags: ["Work", "Retail", "Part-time"],
        isWork: true,
      },
      {
        id: "22-4",
        title: "UPS Logistics",
        desc: "January 2021. Part-time logistics work at UPS — loading and unloading trucks with parcels, gaining first-hand experience in large-scale supply chain operations.",
        tags: ["Work", "Logistics", "Part-time"],
        isWork: true,
      },
    ],
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px", ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(text, speed = 60, start = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return displayed;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #050505;
    --white: #f0f0f0;
    --grey: #666;
    --mid: #999;
    --dim: #222;
    --border: #2a2a2a;
    --mono: 'Share Tech Mono', 'Courier New', monospace;
    --serif: 'Courier Prime', 'Courier New', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--mono);
    overflow-x: hidden;
    cursor: crosshair;
  }

  ::selection { background: var(--white); color: var(--black); }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--grey); }

  /* noise */
  #noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  }

  /* scanlines */
  #scan {
    position: fixed; inset: 0; pointer-events: none; z-index: 9998;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px);
  }

  /* ── NAVBAR ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 18px 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--border);
    background: rgba(5,5,5,0.9);
    backdrop-filter: blur(12px);
    transition: padding 0.3s;
  }
  .nav-logo {
    font-family: var(--serif); font-weight: 700;
    font-size: 1rem; letter-spacing: 0.18em; text-transform: uppercase;
  }
  .nav-logo em { font-style: normal; color: var(--grey); font-weight: 400; }
  .nav-status {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.65rem; letter-spacing: 0.15em; color: var(--grey);
  }
  .status-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--white);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.2; } }

  /* ── HERO ── */
  .hero {
    height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    position: relative; overflow: hidden;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    transition: transform 0.1s linear;
  }
  .hero-inner { position: relative; z-index: 2; padding: 0 24px; }
  .hero-eye {
    font-size: 0.68rem; letter-spacing: 0.5em; color: var(--grey);
    margin-bottom: 32px; text-transform: uppercase;
  }
  .hero-title {
    font-family: var(--serif); font-weight: 700;
    font-size: clamp(3.2rem, 11vw, 9rem);
    line-height: 0.95; margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  .hero-title-outline {
    font-family: var(--serif); font-weight: 700;
    font-size: clamp(3.2rem, 11vw, 9rem);
    line-height: 0.95; margin-bottom: 48px;
    letter-spacing: -0.02em;
    -webkit-text-stroke: 1px var(--white); color: transparent;
  }
  .hero-meta {
    display: flex; gap: 32px; justify-content: center;
    font-size: 0.68rem; letter-spacing: 0.25em; color: var(--grey); margin-bottom: 72px;
  }
  .hero-meta span::before { content: "// "; }
  .hero-scroll {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    animation: bob 2s ease-in-out infinite;
  }
  .hero-scroll-label { font-size: 0.6rem; letter-spacing: 0.35em; color: var(--grey); }
  .hero-scroll-line { width: 1px; height: 48px; background: linear-gradient(var(--white), transparent); }
  @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }

  /* ── TIMELINE SECTION ── */
  .timeline { position: relative; padding: 80px 0 200px; }

  /* spine */
  .spine {
    position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(transparent 0%, var(--border) 3%, var(--border) 97%, transparent 100%);
    transform: translateX(-50%);
  }

  /* ── YEAR LABEL ── */
  .year-label {
    position: relative; display: flex; justify-content: center; align-items: center;
    margin: 72px 0 48px; z-index: 10;
  }
  .year-pill {
    background: var(--black); border: 1px solid var(--white);
    padding: 10px 32px;
    font-family: var(--serif); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.2em;
    opacity: 0; transform: scale(0.85);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .year-pill.show { opacity: 1; transform: scale(1); }
  .year-pill::before, .year-pill::after {
    content: ''; position: absolute; top: 50%; height: 1px; background: var(--border);
    width: clamp(40px, 6vw, 100px);
  }
  .year-pill::before { right: 100%; }
  .year-pill::after  { left: 100%; }

  /* ── CARD ROW ── */
  .card-row {
    display: flex; align-items: flex-start; position: relative; margin: 28px 0;
  }
  .card-row.r { flex-direction: row; }
  .card-row.l { flex-direction: row-reverse; }

  /* spine dot */
  .dot {
    position: absolute; left: calc(50% - 5px); top: 28px;
    width: 10px; height: 10px;
    border: 1px solid var(--grey); background: var(--black);
    transform: rotate(45deg);
    transition: border-color 0.25s, background 0.25s;
    z-index: 5;
  }
  .card-row:hover .dot { border-color: var(--white); background: var(--white); }

  /* card */
  .card {
    width: calc(50% - 64px);
    border: 1px solid var(--border);
    padding: 22px 26px; background: var(--black);
    position: relative; cursor: default;
    opacity: 0; transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.25s, background 0.25s;
  }
  .card-row.r .card { margin-left: 64px; transform: translateX(32px); }
  .card-row.l .card { margin-right: 64px; transform: translateX(-32px); }
  .card.show { opacity: 1; transform: translateX(0) !important; }
  .card:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.025); }

  /* connector */
  .card-row.r .card::before {
    content: ''; position: absolute; top: 32px; left: -64px;
    width: 64px; height: 1px; background: var(--border); transition: background 0.25s;
  }
  .card-row.l .card::before {
    content: ''; position: absolute; top: 32px; right: -64px;
    width: 64px; height: 1px; background: var(--border); transition: background 0.25s;
  }
  .card-row:hover .card::before { background: rgba(255,255,255,0.3); }

  .card-num { font-size: 0.58rem; color: var(--grey); letter-spacing: 0.2em; margin-bottom: 10px; }
  .card-title {
    font-family: var(--serif); font-size: 0.95rem; font-weight: 700;
    letter-spacing: 0.04em; line-height: 1.3; margin-bottom: 10px;
  }
  .card-desc { font-size: 0.7rem; color: #aaa; line-height: 1.7; letter-spacing: 0.02em; }
  .card-link {
    display: inline-block; margin-top: 10px;
    font-size: 0.62rem; letter-spacing: 0.15em; color: var(--mid);
    text-decoration: none; border-bottom: 1px solid var(--border);
    transition: color 0.2s, border-color 0.2s;
  }
  .card-link:hover { color: var(--white); border-color: var(--white); }

  .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
  .tag {
    font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--dim); padding: 2px 9px; color: var(--grey);
    transition: all 0.2s;
  }
  .card:hover .tag { border-color: var(--border); color: var(--mid); }
  .tag.work { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); }
  .tag.fail { border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); }

  /* ── FOOTER ── */
  .footer {
    text-align: center; padding: 64px 40px;
    border-top: 1px solid var(--border);
    font-size: 0.68rem; letter-spacing: 0.2em; color: var(--grey);
    line-height: 2;
  }
  .blink { animation: blink 1s step-end infinite; display: inline-block; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── RESPONSIVE ── */
  @media (max-width: 760px) {
    .nav { padding: 16px 20px; }
    .spine { left: 28px; }
    .dot { left: 23px; }
    .card-row.r, .card-row.l { flex-direction: column; }
    .card-row.r .card, .card-row.l .card {
      width: calc(100% - 64px); margin-left: 64px !important; margin-right: 0 !important;
      transform: translateX(16px) !important;
    }
    .card-row.r .card::before, .card-row.l .card::before {
      left: -36px; right: auto; width: 36px;
    }
    .year-label { justify-content: flex-start; padding-left: 64px; }
    .year-pill::before { display: none; }
    .hero-meta { flex-direction: column; gap: 8px; }
  }
`;

// ── Navbar ──
function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">Yash <em>Viradia</em></div>
      <div className="nav-status">
        <span className="status-dot" />
        <span>PORTFOLIO_ACTIVE</span>
      </div>
    </nav>
  );
}

// ── Hero ──
function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const typed = useTypewriter("YASH VIRADIA", 80, true);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <section className="hero">
      <div className="hero-grid" style={{ transform: `translateY(${scrollY * 0.28}px)` }} />
      <div className="hero-inner">
        <p className="hero-eye">// PORTFOLIO_TIMELINE.LOG — EST. 2021</p>
        <div className="hero-title">{typed}<span className="blink">_</span></div>
        <div className="hero-title-outline">BUILD LOG</div>
        <div className="hero-meta">
          <span>ENGINEER</span>
          <span>BUILDER</span>
          <span>ML & SYSTEMS</span>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-label">SCROLL TO EXPLORE</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}

// ── Year Label ──
function YearLabel({ year }) {
  const [ref, inView] = useInView();
  return (
    <div className="year-label">
      <div ref={ref} className={`year-pill ${inView ? "show" : ""}`}>{year}</div>
    </div>
  );
}

// ── Project Card ──
function ProjectCard({ item, index, side }) {
  const [ref, inView] = useInView();
  const tagStyle = item.isWork ? "work" : item.isFail ? "fail" : "";
  return (
    <div className={`card-row ${side}`}>
      <div className="dot" />
      <div ref={ref} className={`card ${inView ? "show" : ""}`}>
        <div className="card-num">// {String(index).padStart(3, "0")}</div>
        <div className="card-title">{item.title}</div>
        <div className="card-desc">{item.desc}</div>
        {item.link && (
          <a className="card-link" href={item.link} target="_blank" rel="noopener noreferrer">
            VIEW ON GITHUB →
          </a>
        )}
        <div className="card-tags">
          {item.tags.map((t) => (
            <span key={t} className={`tag ${tagStyle}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Year Group ──
function YearGroup({ group, startIndex }) {
  return (
    <div>
      <YearLabel year={group.year} />
      {group.items.map((item, i) => (
        <ProjectCard
          key={item.id}
          item={item}
          index={startIndex + i}
          side={i % 2 === 0 ? "r" : "l"}
        />
      ))}
    </div>
  );
}

// ── Timeline ──
function Timeline() {
  let counter = 1;
  const groups = TIMELINE_DATA.map((group) => {
    const start = counter;
    counter += group.items.length;
    return { group, start };
  });
  return (
    <section className="timeline">
      <div className="spine" />
      {groups.map(({ group, start }) => (
        <YearGroup key={group.year} group={group} startIndex={start} />
      ))}
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer className="footer">
      <div>YASH_VIRADIA // BUILD_LOG // END_OF_RECORD<span className="blink">█</span></div>
      <div style={{ marginTop: 12, fontSize: "0.6rem", opacity: 0.4 }}>
        2021 — {new Date().getFullYear()} &nbsp;·&nbsp; ALL ENTRIES LOGGED
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div id="noise" />
      <div id="scan" />
      <Navbar />
      <Hero />
      <Timeline />
      <Footer />
    </>
  );
}