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
        desc: "Started December 2025, solid traction from February 2026. Product managers were making decisions from Excel files trying to represent a region → project → product → item hierarchy — with wasted cells, no cross-region visibility, and no what-if capability. Built a simulation UI from scratch: first a static prototype using a graph library, then a full React frontend when filter and search complexity demanded it. Graph, nodes, edges, search-filter, and details panel all have their own JSX files, currently being refactored into TypeScript. Next stage: standardised Excel extraction pipeline → Postgres database → JSON to frontend. The details panel lets product managers simulate What-If scenarios — what happens to other regions if I increase allocation here? Deployment planned on intranet via Kubernetes or VM.",
        tags: ["React", "TypeScript", "Graph UI", "Simulation", "Postgres"],
      },
      {
        id: "26-2",
        title: "Cloud Dashboard",
        desc: "March–June 2026. Team of 5 delivering a fleet analytics dashboard. Users can drag and drop widgets freely onto a canvas and explore data through histograms, line charts, cumulative curves, normal distributions, matrix tables, and raw JSON views — no data science background needed. Frontend in React and TypeScript. Backend split between Java Spring Boot and Python. Data transferred via GraphQL. Deployment with Terraform is secondary priority — the primary focus is test-driven development at every stage.",
        tags: ["React", "TypeScript", "GraphQL", "Java", "Python", "TDD"],
      },
      {
        id: "26-3",
        title: "Praxisprojekt & Bachelorarbeit ZUB Knowledge Graph",
        desc: "Foundation laid in March 2026 at Hochschule Ostfalia. Praxisprojekt: building a Knowledge Graph of ZUB (Zugbeeinflussung) — the signalling system used in city train networks across Europe. Bachelorarbeit extends this by setting a fine-tuned LLM as the standard — the model already performs 20% better than the existing RAG baseline. The core problem: LLM hallucination in railway system security, where the margin of error is near zero and every answer must be trusted.",
        tags: ["Knowledge Graph", "LLM", "Fine-tuning", "RAG", "Railway"],
      },
    ],
  },
  {
    year: "2025",
    type: "year",
    items: [
      {
        id: "25-0",
        title: "Werkstudent First Industry Role",
        desc: "Started July 2025 in Braunschweig. First industry role as a working student — a significant step up from retail. The work was real, the stakes were real.",
        tags: ["Work", "Werkstudent", "Industry"],
        isWork: true,
      },
      {
        id: "25-1",
        title: "Job Crawler",
        desc: "July–December 2025. Built a live competitor intelligence dashboard. Six containerised scrapers — one per competitor — engineered to be robust against captcha and pagination. Each scraper generated current, historical, and combined CSV files daily. CSVs loaded into a Postgres database with a defined schema, managed by Kubernetes in enterprise cloud. Scrapers run as daily cronjobs, database auto-refreshes a PowerBI dashboard. Fully in production.",
        tags: ["Web Scraping", "Docker", "Kubernetes", "Postgres", "PowerBI"],
      },
      {
        id: "25-2",
        title: "AI Agents for C#",
        desc: "Team of six. Two defined standard rules and process sketch. Two — including me — worked on prompting techniques and evaluated which prompts performed best. Made the case that LLM integration outperforms industry-standard C# tools like Roslyn extractors. Built an AI integration into the repo: when new code is pushed, the LLM reviews it and opens a pull request with suggested improvements — so developers jump straight into fixing, not finding. Two others modelled token economics and cost. Documented and handed to the company, who offered to extend it into a Bachelorarbeit.",
        tags: ["AI Agents", "C#", "LLM", "Prompting", "Code Review"],
      },
      {
        id: "25-3",
        title: "Camunda Workflow System",
        desc: "Built frontend forms using Camunda BPM and Java backend logic with MySQL Workbench database. Modelled complete registration flows for project work, bachelor thesis, and master thesis submissions. Wrote the Java backend and established the database layer to persist form submissions. Project delivered successfully.",
        tags: ["Camunda", "BPM", "Java", "MySQL"],
      },
      {
        id: "25-4",
        title: "NLP Food Classification Gradio App",
        desc: "End-to-end NLP classification pipeline: tokenisation, label encoding, and hyperparameter tuning to classify image captions as food or not food. Optimised inference speed by benchmarking single vs batch inference to analyse latency. Deployed as an interactive Gradio web demo hosted on Hugging Face Spaces. Full training metrics visualised and analysed.",
        tags: ["NLP", "Transfer Learning", "Gradio", "Hugging Face", "Classification"],
      },
      {
        id: "25-5",
        title: "PowerBI Oodles Noodles Dashboard",
        desc: "Advanced data transformation with Power Query (M-Language), merging and appending multiple CSV sources, and dynamic calendar tables. Star schema relational model with 1:n and 2-way relationships. Complex DAX measures using CALCULATE, Time Intelligence (DATEADD, DATESINPERIOD), ALL, RANKX, and TOPN. Interactive dashboard with KPI Cards, Gauge Charts, Combo Charts, What-if Parameters, Bookmarks, and Drillthrough. Performance-optimised with measure tables and mobile view.",
        tags: ["PowerBI", "DAX", "Power Query", "Data Modelling"],
      },
      {
        id: "25-6",
        title: "QLoRA on AWS SageMaker Open Source",
        desc: "Open-source contribution fine-tuning large language models using Quantized Low-Rank Adaptation (QLoRA) on AWS SageMaker — making efficient LLM training accessible at scale without requiring full-precision compute.",
        tags: ["QLoRA", "AWS SageMaker", "Open Source", "Fine-tuning", "LLM"],
      },
      {
        id: "25-7",
        title: "University Transfer TU Braunschweig → Hochschule Ostfalia",
        desc: "A calculated decision. The part-time job at the supermarket took at least 20 hours a week plus commute — not enough time left to do justice to TU Braunschweig Informatik. Transferred to Hochschule Ostfalia, Wirtschaftsinformatik B.Sc. from February 2025. The goal didn't change — just the path.",
        tags: ["Education", "Ostfalia", "Wirtschaftsinformatik"],
        isWork: true,
      },
      {
        id: "25-8",
        title: "Werkstudent Edeka Supermarket",
        desc: "Worked as cashier, shelf filler, and at the Sonderstand selling Berliner, Fischbrötchen (Matjes, Lachs, Bismark), and Krustenbraten. Till end of June 2025. Funded the studies. No complaints.",
        tags: ["Work", "Edeka", "Part-time"],
        isWork: true,
      },
    ],
  },
  {
    year: "2024",
    type: "year",
    items: [
      {
        id: "24-4",
        title: "PowerBI Dashboards UFO, Yeti, Southern Prefecture",
        desc: "Three analytics dashboards: UFO Sightings, Yeti Sightings, and Southern Prefecture Restaurant — turning raw data into clear visual narratives.",
        tags: ["PowerBI", "Data Viz", "Analytics"],
      },
      {
        id: "24-5",
        title: "Linux × Raspberry Pi Project Failure",
        desc: "Attempted to pull real-time data from farming fields using a Raspberry Pi. Didn't ship. Hard lessons in embedded Linux, hardware constraints, and knowing when to stop. Logged honestly.",
        tags: ["Linux", "Raspberry Pi", "IoT", "Learning"],
        isFail: true,
      },
      {
        id: "24-6",
        title: "Werkstudent Burger King → Edeka",
        desc: "Burger King March–August 2024: the stress-to-pay ratio made no sense. Moved to Edeka from September 2024. Also did short-term contracts via Zenjob, including travel to Berlin for work. Simultaneously solved IT problems at university — password resets, system updates, email backups.",
        tags: ["Work", "Part-time", "Burger King", "Edeka"],
        isWork: true,
      },
    ],
  },
  {
    year: "2023",
    type: "year",
    items: [
      {
        id: "23-1",
        title: "HackZurich Sika AG Prototype",
        desc: "Went to HackZurich and built a prototype for Sika AG (Switzerland). Their problem: thousands of product documents, no easy way to recommend the right product to customers. Solution: a chatbot trained on Sika's documents, integrated into their website. The prototype handled document upload and LLM interaction — full document-LLM integration wasn't achieved in the hackathon window, but the concept was proven and the direction was clear.",
        tags: ["Hackathon", "LLM", "Prototype", "Zurich"],
      },
      {
        id: "23-2",
        title: "ML Projects",
        desc: "Three end-to-end machine learning projects: Dog Breed Classifier using transfer learning on 10,000 images, Bulldozer Price Prediction with linear regression on historical auction data, and Heart Disease Prediction — a binary classification model on clinical patient data. Full pipelines from feature engineering to evaluation.",
        tags: ["ML", "CV", "Transfer Learning", "Regression", "Classification", "Scikit-learn"],
      },
      {
        id: "23-3",
        title: "Travels Netherlands & Belgium",
        desc: "Two days, two countries. Netherlands one day, Belgium the next. First time crossing borders just to explore — a reminder that there's more outside the code editor.",
        tags: ["Personal", "Travel"],
        isWork: true,
      },
      {
        id: "23-4",
        title: "Werkstudent Edeka",
        desc: "Continued supermarket work through 2023 till August, funding studies and keeping the engine running.",
        tags: ["Work", "Edeka", "Part-time"],
        isWork: true,
      },
    ],
  },
  {
    year: "2022",
    type: "year",
    items: [
      {
        id: "22-1",
        title: "Smartbrain React Face Recognition App",
        desc: "The majority of 2022 went into building Smartbrain and making it production-ready. React frontend, Node.js backend, PostgreSQL database storing user login data. Users submit an image URL and the app detects human faces via API call. Deployed on Render.io.",
        tags: ["React", "Node.js", "PostgreSQL", "Face Recognition", "Full Stack"],
        link: "https://github.com/yashviradia/face_recognition_smartbrain",
      },
      {
        id: "22-2",
        title: "B.Sc. Informatik TU Braunschweig",
        desc: "Completed Studienkolleg at Leibniz Universität Hannover in February 2022. Started Bachelor's in Informatik at TU Braunschweig. A new chapter, a harder one.",
        tags: ["Education", "TU Braunschweig", "Informatik"],
        isWork: true,
      },
      {
        id: "22-3",
        title: "Werkstudent Edeka",
        desc: "Started at Edeka supermarket alongside the bachelor's degree. The funding mechanism for everything that followed.",
        tags: ["Work", "Edeka", "Part-time"],
        isWork: true,
      },
    ],
  },
  {
    year: "2021",
    type: "year",
    items: [
      {
        id: "21-1",
        title: "Studienkolleg Leibniz Universität Hannover",
        desc: "Started Studienkolleg in February 2021 — the gateway to German university. Studied hard, passed, cleared the path to the Bachelor's.",
        tags: ["Education", "Studienkolleg", "Hannover"],
        isWork: true,
      },
      {
        id: "21-2",
        title: "Foundations JavaScript, HTML, CSS, Java, DSA",
        desc: "While studying, built the technical foundation: JavaScript, HTML, CSS, Java, Data Structures and Algorithms. First React project — a to-do list. Every line written was a brick.",
        tags: ["JavaScript", "HTML", "CSS", "Java", "React", "DSA"],
      },
      {
        id: "21-3",
        title: "UPS Logistics → Water Filter Factory → Netto",
        desc: "January 2021: loading and unloading trucks at UPS. Then a stint at a water filter manufacturing facility. October 2021–February 2022: Netto supermarket. Corona times. Shelves to fill, hours to grind, studies to pass. It all ran in parallel.",
        tags: ["Work", "UPS", "Netto", "Logistics", "Part-time"],
        isWork: true,
      },
    ],
  },
  {
    year: "2018 — 2020",
    type: "year",
    items: [
      {
        id: "18-1",
        title: "Self-Teaching Computer Science",
        desc: "Before any formal education — learned programming independently. Computer science fundamentals, logic, problem solving. The curiosity came first, the degree came later.",
        tags: ["Self-taught", "CS Fundamentals", "Programming"],
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

  /* ── BINARY RAIN ── */
  #binary-canvas {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.18;
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
    animation: flicker 6s infinite;
  }
  @keyframes flicker {
    0%   { opacity: 1; }
    92%  { opacity: 1; }
    93%  { opacity: 0.1; }
    94%  { opacity: 1; }
    96%  { opacity: 0.3; }
    97%  { opacity: 1; }
    98%  { opacity: 0.05; }
    99%  { opacity: 1; }
    100% { opacity: 1; }
  }
  .hero-meta {
    display: flex; gap: 32px; justify-content: center;
    font-size: 0.68rem; letter-spacing: 0.25em; color: var(--grey); margin-bottom: 72px;
  }
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

// ── Binary Rain ──
function BinaryRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const fontSize = 13;
    let cols, drops, speeds;

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
      speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.7);
    }

    function draw() {
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        // bright white lead character
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, y);
        // dimmer trail character slightly above
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.font = `${fontSize}px 'Courier New', monospace`;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, y - fontSize * 2);
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, y - fontSize * 4);

        drops[i] += speeds[i];
        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
          speeds[i] = 0.3 + Math.random() * 0.7;
        }
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);
  return <canvas ref={canvasRef} id="binary-canvas" />;
}

// ── Navbar ──
function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">Yash <em>Viradia</em></div>
      <div className="nav-status">
        <span className="status-dot" />
        <span>EST. 2018</span>
      </div>
    </nav>
  );
}

// ── Hero ──
function Hero() {
  const typed = useTypewriter("YASH VIRADIA", 80, true);
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-eye">EST. 2018 . STILL COMPILING</p>
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
        <div className="card-title">{item.title}</div>
        <div className="card-desc">{item.desc}</div>
        {item.link && (
          <a className="card-link" href={item.link} target="_blank" rel="noopener noreferrer">
            VIEW ON GITHUB
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
        2018 — {new Date().getFullYear()} &nbsp;·&nbsp; ALL ENTRIES LOGGED
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <BinaryRain />
      <div id="noise" />
      <div id="scan" />
      <Navbar />
      <Hero />
      <Timeline />
      <Footer />
    </>
  );
}