import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

// Project images — imported so Vite can hash & cache them
import phishImg    from "./assets/image 2 (2).jpg";
import malwareImg  from "./assets/image 5.jpg";
import railwayImg  from "./assets/image 3.jpg";
import parkingImg  from "./assets/image 6.jpg";
import mrStudioImg from "./assets/WebData.jpg";
import hospitalImg from "./assets/Hospital.jpg";
import flaskImg    from "./assets/image 7.jpg";
import cipherImg   from "./assets/image 8.jpg";
import cogniImg    from "./assets/image 9.jpg";
import skillImg    from "./assets/Skillintel.jpg";
import floodImg    from "./assets/Flood.jpg";
import missinfoImg from "./assets/missinfo.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─── tiny hook: is mobile ─── */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
};

/* ─── Scramble title only on desktop (skip on mobile for perf) ─── */
const ScrambleText = ({ text, skip = false }: { text: string; skip?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#";
  useEffect(() => {
    if (skip) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((_, idx) =>
          idx < iteration ? text[idx] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 50);
    return () => clearInterval(interval);
  }, [text, skip]);
  return <span className="font-mono">{displayText}</span>;
};

/* ─── All 12 projects data ─── */
const allProjectsData = [
  { id: "01", title: "PHISHDEEZNUTS", githubLink: "https://github.com/susybegula/PhishDeezNuts.git", liveLink: "https://phish-deez-nuts.vercel.app/", quote: "A sophisticated email security app using machine learning and Gemini AI.", solution: "AI-Powered Phishing Email Detection that stops threats before they reach your inbox.", features: ["Machine Learning (Random Forest)", "Rule-based pattern detection", "Google Gemini AI analysis", "Secure OAuth2 Gmail integration"], mainImg: phishImg },
  { id: "02", title: "MICROSOFT MALWARE PREDICTION", githubLink: "#", liveLink: "#", quote: "Telemetry-based malware risk prediction with interactive dashboards.", solution: "Visualises device telemetry data through ML models to flag high-risk machines in real time.", features: ["React + Vite Frontend", "Tailwind CSS styling", "Interactive Charts via Recharts", "Real-time API integrations"], mainImg: malwareImg },
  { id: "03", title: "RAIL-PRAVAH (RAILWAY APP)", githubLink: "#", liveLink: "#", quote: "A comprehensive vehicle & railway control dashboard.", solution: "Centralised rail management covering scheduling, monitoring and role-based operational control.", features: ["Interactive Control Dashboard", "Real-time Train Monitoring", "Role-based Access Control", "Automated Alert Systems"], mainImg: railwayImg },
  { id: "04", title: "VEHICLE PARKING SYSTEM", githubLink: "#", liveLink: "https://vehicle-parking-x9dt.onrender.com/", quote: "Full-stack vehicle parking system with real-time slot booking.", solution: "Streamlines urban parking operations through dynamic pricing and live availability.", features: ["Real-time Slot Booking", "Admin Analytics Dashboard", "Dynamic Pricing Engine", "Flask + SQLite backend"], mainImg: parkingImg },
  { id: "05", title: "MRSTUDIO DATA ANALYTICS", githubLink: "#", liveLink: "#", quote: "Data Analytics Web Application for comprehensive business intelligence.", solution: "Deep-dive data intelligence through custom queries, live charts and exportable reports.", features: ["Custom Dashboard Reports", "Interactive Visualizations", "Analytics Query Builder", "CSV / PDF Export"], mainImg: mrStudioImg },
  { id: "06", title: "HOSPITAL MANAGEMENT", githubLink: "#", liveLink: "#", quote: "A full-stack hospital management system with role-based dashboards.", solution: "Digitises patient care tracking, inventory and scheduling for medical teams.", features: ["Role-based Access Control (RBAC)", "Real-time Bed Availability", "Redis Caching & Background Jobs", "Automated Scheduled Emails"], mainImg: hospitalImg },
  { id: "07", title: "FLASK AMEP", githubLink: "#", liveLink: "#", quote: "Academic Monitoring and Engagement Platform built with Flask.", solution: "Predictive insights and automated nudges to help students maintain academic engagement.", features: ["Student Progress Tracking", "Attendance Management", "Grade Analytics & Trends", "Automated Feedback Reports"], mainImg: flaskImg },
  { id: "08", title: "CIPHER: ASHFORD CONSPIRACY", githubLink: "#", liveLink: "#", quote: "An immersive multiplayer mystery and conspiracy-tracking experience.", solution: "Real-time clue propagation engine with persistent room state and narrative branching.", features: ["Interactive Storyline Engine", "Real-time updates via Socket.io", "React + Vite Frontend", "Node.js Backend"], mainImg: cipherImg },
  { id: "09", title: "COGNIHEALTH", githubLink: "#", liveLink: "#", quote: "AI Cognitive Health Platform for tracking and analysing neuro-health.", solution: "Preliminary cognitive health insights through adaptive ML assessments and longitudinal dashboards.", features: ["AI-based Cognitive Analysis", "Progress Tracking Reports", "Interactive Assessments", "Flask + Express microservices"], mainImg: cogniImg },
  { id: "10", title: "KILLINTEL (SKILLINTEL)", githubLink: "#", liveLink: "https://syntax-syndicate-seven.vercel.app/", quote: "Career intelligence platform analysing skills and role-fit gaps.", solution: "Upload your résumé to instantly receive an Employability Score and personalised roadmap.", features: ["AI Résumé Parser & Integrations", "Target Role Skill Gap Analysis", "Interactive AI Career Mentor", "Live Market Job Feeds"], mainImg: skillImg },
  { id: "11", title: "FLOOD MANAGEMENT DASHBOARD", githubLink: "https://github.com/23f1000356/Flood-Management-dashboard", liveLink: "https://github.com/23f1000356/Flood-Management-dashboard", quote: "An intelligent, AI-powered platform for real-time flood monitoring.", solution: "Autonomous satellite-integrated ML platform for flood prediction and disaster analytics.", features: ["Real-Time Satellite Tracking", "ML Disaster Prediction Models", "Intelligent Resource Allocation", "Post-disaster Recovery Analytics"], mainImg: floodImg },
  { id: "12", title: "MISSINFO PLATFORM", githubLink: "https://github.com/23f1000356/Missinformation", liveLink: "https://github.com/23f1000356/Missinformation", quote: "A multi-agent AI system for detecting and verifying misinformation.", solution: "Chrome extension front-line paired with Node/Express backend for fast in-context claim interventions.", features: ["In-browser Claim Verification", "Automated NLP/ML Triage", "Provenance & Transparency Checks", "Multilingual Support"], mainImg: missinfoImg },
];

/* ─── Desktop Parallax Gallery (3 rows × 4) ─── */
const DesktopGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const row1X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const row3X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const rowMotions = [row1X, row2X, row3X];
  const rows = [allProjectsData.slice(0, 4), allProjectsData.slice(4, 8), allProjectsData.slice(8, 12)];

  return (
    <div ref={sectionRef} className="mt-4 space-y-5 px-2">
      {rows.map((row, rowIdx) => (
        <motion.div key={rowIdx} style={{ x: rowMotions[rowIdx] }} className="flex gap-5">
          {row.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="min-w-[280px] md:min-w-[300px] max-w-[340px] shrink-0 group cursor-pointer"
            >
              <a href={proj.liveLink !== "#" ? proj.liveLink : proj.githubLink !== "#" ? proj.githubLink : undefined} target="_blank" rel="noopener noreferrer">
                <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-[0_0_30px_rgba(100,100,255,0.12)] transition-all duration-300 relative bg-black">
                  <img src={proj.mainImg} alt={proj.title} loading="lazy" decoding="async" className="w-full h-[210px] object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">{proj.id}</span>
                    <h3 className="text-white text-sm font-bold uppercase tracking-wide leading-tight mt-0.5 line-clamp-1">{proj.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {proj.liveLink !== "#" && <span className="text-blue-400 text-[10px] font-semibold flex items-center gap-1"><ExternalLink size={10} /> Live</span>}
                      {proj.githubLink !== "#" && <span className="text-white/50 text-[10px] font-semibold flex items-center gap-1"><Github size={10} /> GitHub</span>}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Mobile Gallery — simple 2-column grid, NO parallax ─── */
const MobileGallery = () => (
  <div className="grid grid-cols-2 gap-3 px-4 mt-4">
    {allProjectsData.map((proj, i) => (
      <motion.div
        key={proj.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.35, delay: i % 2 === 0 ? 0 : 0.08 }}
        className="group"
      >
        <a href={proj.liveLink !== "#" ? proj.liveLink : proj.githubLink !== "#" ? proj.githubLink : undefined} target="_blank" rel="noopener noreferrer">
          <div className="rounded-xl overflow-hidden border border-white/10 relative bg-black">
            <img src={proj.mainImg} alt={proj.title} loading="lazy" decoding="async" className="w-full h-[110px] object-cover opacity-85" />
            <div className="p-2">
              <span className="text-white/30 text-[9px] font-black tracking-widest">{proj.id}</span>
              <p className="text-white text-[10px] font-bold uppercase leading-tight line-clamp-2 mt-0.5">{proj.title}</p>
            </div>
          </div>
        </a>
      </motion.div>
    ))}
  </div>
);

/* ─── Desktop GSAP Stacked Cards (only rendered on desktop) ─── */
const StackedCards = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".proj-stack-card");
    if (!cards.length) return;

    const stackOffset = 55;

    // Kill any existing ScrollTriggers to avoid duplication on HMR
    ScrollTrigger.getAll().forEach(st => st.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".proj-pin-area",
        start: "top 80px",
        end: `+=${cards.length * 100}%`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, index) => {
      const img  = card.querySelector<HTMLElement>(".proj-img");
      const text = card.querySelector<HTMLElement>(".proj-txt");

      if (index === 0) {
        gsap.set(card, { y: 0, opacity: 1, scale: 1 });
        // Entrance animation for visible first card
        gsap.fromTo(img,  { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
        gsap.fromTo(text, { x:  60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
        return;
      }

      gsap.set(card, { y: "100%", scale: 0.94, opacity: 0 });
      gsap.set(img,  { x: -60, opacity: 0 });
      gsap.set(text, { x:  60, opacity: 0 });

      const label = `card${index}`;
      tl.to(card, { y: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power2.inOut" }, label);
      tl.to(img,  { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, `${label}+=0.8`);
      tl.to(text, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, `${label}+=0.8`);

      for (let j = 0; j < index; j++) {
        tl.to(cards[j], {
          y: -(index - j) * stackOffset,
          scale: 1 - (index - j) * 0.03,
          opacity: 1 - (index - j) * 0.18,
          duration: 1.5,
          ease: "power2.inOut",
        }, label);
      }
    });

    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, { scope: container });

  return (
    <div ref={container} className="w-full">
      <section className="proj-pin-area w-full h-[100vh] relative flex items-start justify-center pt-2 md:pt-4 z-10">
        <div className="w-[96%] xl:max-w-[1400px] h-[76vh] md:h-[80vh] relative">
          {allProjectsData.map((proj, i) => (
            <div
              key={proj.id}
              className="proj-stack-card absolute inset-0 h-full rounded-[28px] overflow-hidden border border-white/10 bg-[#0a0a0f] flex flex-col p-5 md:p-10"
              style={{ zIndex: i, top: 0 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/[0.08] pb-4 md:pb-5 flex-shrink-0">
                <div className="flex items-center gap-3 md:gap-5 min-w-0">
                  <span className="text-3xl md:text-5xl font-black text-white/20 tracking-tighter shrink-0">{proj.id}</span>
                  <a href={proj.githubLink !== "#" ? proj.githubLink : undefined} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2 group min-w-0">
                    <h3 className="text-sm md:text-2xl lg:text-3xl font-extrabold uppercase tracking-widest leading-none truncate group-hover:drop-shadow-[0_0_10px_rgba(100,150,255,0.8)]">{proj.title}</h3>
                    {proj.githubLink !== "#" && <Github size={16} className="opacity-40 group-hover:opacity-100 shrink-0" />}
                  </a>
                </div>
                {proj.liveLink !== "#" && (
                  <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="shrink-0 ml-2 px-3 py-1.5 md:px-6 md:py-2.5 flex items-center gap-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-200 text-[9px] md:text-xs font-bold tracking-[0.15em] uppercase hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <span className="hidden md:inline">Live Preview</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row flex-1 gap-5 md:gap-10 overflow-hidden min-h-0">
                {/* Image — left, slides in from left */}
                <div className="proj-img w-full md:w-[58%] lg:w-[62%] min-h-[130px] md:min-h-0 rounded-2xl overflow-hidden relative group shrink-0 bg-[#050505] border border-white/[0.06]">
                  <img src={proj.mainImg} alt={proj.title} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Text — right, slides in from right */}
                <div className="proj-txt w-full md:w-[42%] lg:w-[38%] flex flex-col gap-3 md:gap-5 overflow-y-auto pr-1 pb-2 md:pb-0 justify-center" style={{ scrollbarWidth: "none" }}>
                  <p className="text-xs md:text-base lg:text-lg font-medium text-white/85 italic border-l-4 border-blue-500/50 pl-4 py-1.5 leading-relaxed bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-xl">"{proj.quote}"</p>
                  <div>
                    <h4 className="text-blue-400 text-[9px] md:text-[11px] tracking-[0.3em] font-black uppercase mb-2">Solution Overview</h4>
                    <p className="text-[11px] md:text-sm text-white/65 leading-relaxed font-light">{proj.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-400 text-[9px] md:text-[11px] tracking-[0.3em] font-black uppercase mb-2">Key Features</h4>
                    <ul className="space-y-1 md:space-y-2">
                      {proj.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] md:text-sm text-white/75 font-light">
                          <span className="text-blue-500/50 mt-0.5 shrink-0">◈</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ─── Mobile detail list — simple accordion style, no GSAP ─── */
const MobileDetailList = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="px-4 space-y-3 pb-8">
      {allProjectsData.map((proj, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={proj.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0 }}>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d12]">
              {/* Thumbnail + header */}
              <button className="w-full flex items-center gap-3 p-3 text-left" onClick={() => setOpen(isOpen ? null : i)}>
                <img src={proj.mainImg} alt={proj.title} loading="lazy" decoding="async" className="w-16 h-12 rounded-lg object-cover shrink-0 opacity-80" />
                <div className="flex-1 min-w-0">
                  <span className="text-white/30 text-[9px] font-black tracking-widest block">{proj.id}</span>
                  <p className="text-white text-xs font-bold uppercase leading-tight truncate">{proj.title}</p>
                </div>
                <span className="text-white/40 text-lg shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-3 pb-4 border-t border-white/[0.06]">
                  <p className="text-white/70 text-xs italic mt-3 mb-2 border-l-2 border-blue-500/50 pl-3">"{proj.quote}"</p>
                  <p className="text-white/55 text-[11px] leading-relaxed mb-3">{proj.solution}</p>
                  <ul className="space-y-1 mb-3">
                    {proj.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-[11px] text-white/65">
                        <span className="text-blue-500/50 shrink-0 mt-0.5">◈</span>{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    {proj.liveLink !== "#" && <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="text-[10px] px-3 py-1.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold flex items-center gap-1"><ExternalLink size={10} /> Live</a>}
                    {proj.githubLink !== "#" && <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/60 font-bold flex items-center gap-1"><Github size={10} /> GitHub</a>}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── Main Page ─── */
const ProjectsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-[#050508] min-h-screen text-white font-sans" style={{ overflowX: "hidden" }}>
      {/* Background glows — lighter on mobile */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] rounded-full bg-blue-700/8 blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-600/6 blur-[110px]" />
        </div>
      )}

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-[#050508]/90 border-b border-white/5 py-3 md:py-4 px-5 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-white hover:text-blue-400 flex items-center gap-2 transition-colors duration-300">
          <ArrowLeft size={20} />
          <span className="font-bold tracking-widest uppercase text-xs">Back Home</span>
        </Link>
        <div className="text-xl md:text-2xl font-black tracking-widest uppercase text-white/90">VR</div>
      </header>

      {/* ── Title ── */}
      <div className="pt-24 md:pt-32 pb-5 md:pb-6 relative z-10 w-full text-center px-4">
        <h1
          className="text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em]"
          style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          {isMobile ? "All Projects Archive" : <ScrambleText text="All Projects Archive" />}
        </h1>
        <p className="mt-2 text-white/40 text-[11px] md:text-sm max-w-xl mx-auto uppercase tracking-widest">
          Complete portfolio · 12 projects · Web Dev &amp; AI/ML
        </p>
      </div>

      {/* ── Section 1: Gallery ── */}
      {isMobile ? (
        <section className="relative z-10 pb-2">
          <MobileGallery />
        </section>
      ) : (
        <section className="relative z-10 pb-4 overflow-hidden">
          <DesktopGallery />
        </section>
      )}

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em] shrink-0">Detailed View</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* ── Section 2: Detail cards ── */}
      {isMobile ? (
        <section className="relative z-10">
          <MobileDetailList />
        </section>
      ) : (
        <section className="relative z-10">
          <StackedCards />
        </section>
      )}

      {!isMobile && <div className="h-12" />}
    </div>
  );
};

export default ProjectsPage;
