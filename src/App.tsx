import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu, X, Code, Mail, Phone, MapPin, Trophy, Award,
  CaseSensitive as University, GraduationCap, School,
  Github, Linkedin, ExternalLink, Shield, Building2,
  Heart, Bug, Briefcase, ShoppingCart, HelpCircle, CloudLightning
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SoftShadows } from "@react-three/drei";
import ProjectDetails from "./components/ProjectDetails";

/* ================= Small reveal helper ================= */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null) as any;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const Reveal = ({ effect = "up", className = "", children }) => {
  const [ref, inView] = useInView(0.2);
  const map = {
    up: "reveal-up",
    left: "reveal-left",
    right: "reveal-right",
    flip: "reveal-flip",
  } as Record<string, string>;
  return (
    <div ref={ref as any} className={`${map[effect] ?? "reveal-up"} ${inView ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
};

/* ================= Simple 3D Desktop Room ================= */
function DeskSet() {
  const wood = { color: "#cfa36c" };
  const plastic = { color: "#222" };
  const offwhite = { color: "#e9e7e4" };

  return (
    <group position={[0, 0, 0]}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2ea0ff" />
      </mesh>

      {/* table */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.1, 1.8]} />
        <meshStandardMaterial {...wood} />
      </mesh>
      {[
        [-1.4, 0.4, 0.7],
        [1.4, 0.4, 0.7],
        [-1.4, 0.4, -0.7],
        [1.4, 0.4, -0.7],
      ].map((p, i) => (
        <mesh key={i} position={p as any} castShadow>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <meshStandardMaterial {...plastic} />
        </mesh>
      ))}

      {/* monitor + keyboard */}
      <group position={[0.4, 1.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.5, 0.07]} />
          <meshStandardMaterial {...offwhite} />
        </mesh>
        <mesh position={[0, 0, 0.0375]}>
          <planeGeometry args={[0.7, 0.42]} />
          <meshStandardMaterial color="#2b2b2b" emissive="#1b1b1b" />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.25, 0.08, 0.12]} />
          <meshStandardMaterial {...offwhite} />
        </mesh>
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.35]} />
          <meshStandardMaterial {...offwhite} />
        </mesh>
        <mesh position={[0, -0.61, 0.32]} castShadow>
          <boxGeometry args={[0.9, 0.04, 0.25]} />
          <meshStandardMaterial color="#e7e5e2" />
        </mesh>
      </group>

      {/* pc tower */}
      <mesh position={[-0.9, 1.05, -0.55]} castShadow>
        <boxGeometry args={[0.45, 0.9, 0.45]} />
        <meshStandardMaterial {...offwhite} />
      </mesh>

      {/* phone */}
      <mesh position={[1.2, 0.88, -0.2]} castShadow>
        <boxGeometry args={[0.22, 0.07, 0.12]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>

      {/* notebook */}
      <mesh position={[1, 0.86, 0.6]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.45, 0.04, 0.32]} />
        <meshStandardMaterial color="#f2efe9" />
      </mesh>

      {/* chair */}
      <group position={[1.4, 0.45, 1.2]} rotation={[0, -0.8, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.5, 0.06, 0.5]} />
          <meshStandardMaterial {...plastic} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.52, 0.08, 0.52]} />
          <meshStandardMaterial color="#ece7e0" />
        </mesh>
        <mesh position={[0, 0.65, -0.2]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.06]} />
          <meshStandardMaterial color="#ece7e0" />
        </mesh>
        {[0, 72, 144, 216, 288].map((deg) => (
          <mesh key={deg} rotation={[0, (deg * Math.PI) / 180, 0]} castShadow>
            <boxGeometry args={[0.6, 0.05, 0.08]} />
            <meshStandardMaterial {...plastic} />
          </mesh>
        ))}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.3, 12]} />
          <meshStandardMaterial {...plastic} />
        </mesh>
      </group>

      {/* lights */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    </group>
  );
}

function DesktopRoom() {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden canvas-wrap">
      <Canvas shadows camera={{ position: [4, 3, 5], fov: 45 }}>
        <color attach="background" args={["#2ea0ff"]} />
        <SoftShadows size={18} />
        <DeskSet />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}

/* ================= Logos ================= */
const logo = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  sklearn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  tf: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  matplotlib: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  vercel: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
};

const groups = [
  {
    title: "Web Development",
    items: [
      { name: "HTML/CSS", src: logo.html },
      { name: "CSS", src: logo.css },
      { name: "JavaScript", src: logo.js },
      { name: "React.js", src: logo.react },
      { name: "Node.js", src: logo.node },
      { name: "Flask/Python", src: logo.flask },
    ],
  },
  {
    title: "Machine Learning",
    items: [
      { name: "Python", src: logo.python },
      { name: "Scikit-learn", src: logo.sklearn },
      { name: "TensorFlow", src: logo.tf },
      { name: "Deep Learning", src: logo.tf },
      { name: "Computer Vision", src: logo.python },
      { name: "NLP", src: logo.python },
    ],
  },
  {
    title: "Data Science",
    items: [
      { name: "Pandas", src: logo.pandas },
      { name: "NumPy", src: logo.numpy },
      { name: "Matplotlib/Seaborn", src: logo.matplotlib },
      { name: "SQL", src: logo.sql },
      { name: "Statistical Analysis", src: logo.numpy },
      { name: "Data Visualization", src: logo.matplotlib },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", src: logo.git },
      { name: "GitHub", src: logo.github },
      { name: "VS Code", src: logo.vscode },
      { name: "Postman", src: logo.postman },
      { name: "Figma", src: logo.figma },
      { name: "Vercel", src: logo.vercel },
    ],
  },
];

const courses = [
  { provider: "NPTEL", title: "Data Analytics with Python", description: "Pandas, NumPy, visualization, stats, and end-to-end analysis workflow.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1715750046593/single-media-viewer/?type=DOCUMENT&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
  { provider: "Coursera", title: "Google Data Analytics", description: "Data cleaning, SQL, dashboards, stakeholder storytelling, capstone projects.", link: "https://www.coursera.org/account/accomplishments/specialization/certificate/122ZQC58OFRM" },
  { provider: "NPTEL", title: "Cloud Computing", description: "Virtualization, distributed systems, deployment patterns, cost/perf trade-offs.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1732726133210/single-media-viewer/?type=IMAGE&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
  { provider: "Udemy", title: "Microsoft Excel Advanced", description: "Power Query, Pivot mastery, formulas, automation, and VBA foundations.", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-54a260a2-9c7e-4bf9-a554-39c8c8fe525a.pdf" },
  { provider: "IIT Madras", title: "Foundation Certificate (BS Program)", description: "DS & programming fundamentals, problem solving.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1717583278079/single-media-viewer/?type=DOCUMENT&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
  { provider: "IBM", title: "Machine Learning for Data Science Projects", description: "Modeling workflow, evaluation, MLOps basics, and deployment patterns.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1723969336560/single-media-viewer/?type=DOCUMENT&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
];

const SkillGroup = ({ title, items }) => {
  return (
    <div className="perspective">
      <div
        className="glass rounded-2xl p-6 text-white will-change-transform transition-all skill-card"
        onMouseMove={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          (e.currentTarget as HTMLDivElement).style.setProperty("--rx", `${-y * 6}deg`);
          (e.currentTarget as HTMLDivElement).style.setProperty("--ry", `${x * 10}deg`);
          (e.currentTarget as HTMLDivElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
          (e.currentTarget as HTMLDivElement).style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.setProperty("--rx", `0deg`);
          (e.currentTarget as HTMLDivElement).style.setProperty("--ry", `0deg`);
        }}
      >
        <h3 className="text-2xl font-bold mb-5">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div
              key={it.name + i}
              className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-4 border border-white/10 transition-all hover:-translate-y-1 hover:border-white/25"
              title={it.name}
            >
              <img src={it.src} alt={it.name} className="h-8 w-8 object-contain" />
              <span className="text-sm opacity-90">{it.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const words = useMemo(() => ["HTML", "CSS", "JavaScript", "React"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const marqueeWords = useMemo(
    () => [
      "HTML", "CSS", "JavaScript", "React", "Node.js", "Flask",
      "Python", "Scikit-learn", "TensorFlow", "Deep Learning",
      "Computer Vision", "NLP", "Pandas", "NumPy", "Matplotlib/Seaborn",
      "SQL", "Statistical Analysis", "Data Visualization", "Git", "GitHub",
      "VS Code", "Postman", "Figma", "Vercel"
    ], []
  );

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(id);
  }, [words.length]);

  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector(".navbar");
      if (window.scrollY > 80) nav?.classList.add("scrolled-dark");
      else nav?.classList.remove("scrolled-dark");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${-y * 10}deg`);
      el.style.setProperty("--ry", `${x * 16}deg`);
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const [expRef, expInView] = useInView(0.15);
  const [eduRef] = useInView(0.15);
  const [hackRef] = useInView(0.15);
  const [courseRef] = useInView(0.15);

  const projects = [
    { id: "smart-parking", title: "Smart Parking Management System", description: "Full-stack Vehicle Parking Management System with real-time booking, admin analytics, and dynamic pricing features.", tech: ["Flask", "SQLite", "HTML", "Bootstrap"], icon: "🅿️", onClick: () => setSelectedProject("smart-parking") },
    { id: "phishing-detection", title: "AI-Powered Phishing Detection", description: "Advanced email security with Random Forest & Gemini AI for real-time phishing detection.", tech: ["React", "Flask", "Random Forest", "OAuth2"], icon: <Shield className="w-16 h-16" />, onClick: () => setSelectedProject("phishing-detection") },
    { id: "smart-city", title: "Smart City Dashboard", description: "Urban monitoring with interactive maps, role-based access, and alert systems with real time updates.", tech: ["React", "TypeScript", "Node.js","MongoDb", "Maps API"], icon: <Building2 className="w-16 h-16" />, onClick: () => setSelectedProject("smart-city") },
    { id: "disease-prediction", title: "Disease Prediction System", description: "ML-powered health assessment tool for multiple diseases, Streamlit UI.", tech: ["Streamlit", "ML", "Python"], icon: <Heart className="w-16 h-16" />, onClick: () => setSelectedProject("disease-prediction") },
    { id: "malware-prediction", title: "Malware Prediction App", description: "Telemetry-based malware risk prediction with SHAP and dashboards.", tech: ["React", "ML Models"], icon: <Bug className="w-16 h-16" />, onClick: () => setSelectedProject("malware-prediction") },
    { id: "disaster-management", title: "Disaster Management System", description: "Centralized platform for climate/disaster monitoring, prediction, response.", tech: ["Next.js", "Flask", "SQLite"], icon: <CloudLightning className="w-16 h-16" />, onClick: () => setSelectedProject("disaster-management") },
    { id: "ai-job-screening", title: "AI-Powered Job Screening", description: "Resume screening, JD matching, scheduling.", tech: ["Python","Machine Learning","Flask", "Scikit-learn"], icon: <Briefcase className="w-16 h-16" />, onClick: () => setSelectedProject("ai-job-screening") },
    { id: "ecommerce-website", title: "E-Commerce Website", description: "Secure checkout with cards, UPI, wallets, and COD.", tech: ["Next.js", "Tailwind", "Node.js", "MongoDB"], icon: <ShoppingCart className="w-16 h-16" />, onClick: () => setSelectedProject("ecommerce-website") },
    { id: "quiz-app", title: "Quiz App", description: "Create and share custom quizzes in minutes.", tech: ["HTML","CSS","Javascript", "Tailwind"], icon: <HelpCircle className="w-16 h-16" />, onClick: () => setSelectedProject("quiz-app") },
  ];

  return (
    <>
      {selectedProject && (
        <ProjectDetails projectId={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <div className="starfield" />

      {/* NAVBAR */}
      <nav className="navbar fixed top-0 w-full z-[60] transition-all duration-300 bg-transparent">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
          <button onClick={() => scrollToSection("home")} className="text-2xl font-extrabold text-white">
            VR
          </button>
          <ul className="hidden md:flex space-x-7">
            {["home", "skills", "experience", "education", "projects", "hackathons", "courses"].map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollToSection(s)}
                  className="nav-link text-white/80 hover:text-white transition-colors capitalize font-medium"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollToSection("projects")} className="btn-solid">
              <Code size={18} /> See my work
            </button>
            <button onClick={() => scrollToSection("contact")} className="btn-solid">Contact me</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10">
            <ul className="flex flex-col space-y-2 px-4 py-4">
              {["home", "skills", "experience", "education", "projects", "hackathons", "courses"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection(s)}
                    className="text-white/90 hover:text-white transition-colors capitalize font-medium w-full text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-[100vh] flex items-start pt-24">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
          {/* Avatar + Name */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
            <div
              ref={avatarRef}
              className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] perspective"
              style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
              title="Hover me"
            >
              <div className="avatar-3d">
                <img src="/Vishu.jpeg" alt="Vishakha Roy" className="w-full h-full object-cover rounded-full" />
                <div className="ring-glow"></div>
              </div>
            </div>
            <h2 className="text-white text-[42px] md:text-6xl font-extrabold mt-5 text-center">Vishakha Roy</h2>
          </div>

          {/* Headline + Intro */}
          <div className="order-2 lg:order-1 text-white">
            <h1 className="text-[38px] md:text-6xl font-extrabold leading-[1.1] mb-5 tracking-tight">
              Shaping <span className="headline-chip">{words[wordIndex]}</span><br />
              into Real Projects<br />that Deliver Results
            </h1>

            <p className="text-white/85 text-lg md:text-xl mb-6 max-w-2xl">
              Dedicated and enthusiastic Web Developer skilled in HTML, CSS, JavaScript, and React,
              seeking to contribute to innovative and user-friendly web projects.  Aspiring Data Scientist with a strong
              foundation in Python, machine learning, and SQL, eager to apply data-driven techniques
              to solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-3 mb-5">
              <a href="WebDeveloper.pdf" download className="btn-outline">Download Web Dev CV</a>
              <a href="MLresume.pdf" download className="btn-outline">Download ML CV</a>
            </div>

            <div className="flex gap-6 mt-5">
              <a href="https://www.linkedin.com/in/vishakha-roy-52924b1b6/" target="_blank" rel="noopener noreferrer" className="social">
                <Linkedin size={28} />
              </a>
              <a href="https://github.com/23f1000356" target="_blank" rel="noopener noreferrer" className="social">
                <Github size={28} />
              </a>
            </div>
          </div>
        </div>
        <div className="stars-layer pointer-events-none" />
      </section>

      {/* MARQUEE — TEXT */}
      <section className="py-8 bg-black">
        <div className="overflow-hidden relative marquee">
          <div className="flex whitespace-nowrap marquee-track" style={{ animationDuration: "70s" }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={w + i} className="marquee-chip">{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Skills</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {groups.map((g) => (
              <Reveal key={g.title} effect="up">
                <SkillGroup title={g.title} items={g.items} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-6">Professional Experience</h2>
          </Reveal>

          <div ref={expRef as any} className="relative mt-6">
            {/* center line (hidden on mobile) */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[4px] rounded-full bg-gradient-to-b from-[#6d5efc] to-[#2ea0ff]"
              style={{
                height: (expInView as boolean) ? "100%" : "0px",
                opacity: (expInView as boolean) ? 1 : 0,
                transition: "height .9s ease, opacity .5s ease",
              }}
            />
            <div className="space-y-10">
              <Reveal effect="left">
                <div className="md:w-1/2 md:pr-8">
                  <div className="glass p-7 rounded-2xl shadow-lg exp-card">
                    <h3 className="text-xl font-bold mb-2">Python Full Stack Developer Intern</h3>
                    <h4 className="text-blue-300 font-semibold mb-2">CodeHub Technologies India Pvt. Ltd.</h4>
                    <p className="text-white/70 mb-4">May 2025 - July 2025</p>
                    <p className="text-white/85">
                      Contributed to full-stack web development using Python, enhancing both frontend and backend
                      components. Assisted in building responsive UIs and integrating RESTful APIs.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal effect="right">
                <div className="md:w-1/2 md:pl-8 md:ml-auto">
                  <div className="glass p-7 rounded-2xl shadow-lg exp-card">
                    <h3 className="text-xl font-bold mb-2">AI ML Intern</h3>
                    <h4 className="text-blue-300 font-semibold mb-2">Edunet Foundation (Virtual Internship)</h4>
                    <p className="text-white/70 mb-4">July 2024 - August 2024</p>
                    <p className="text-white/85">
                      Focused on Cloud Computing, AI/GenAI and analytics with IBM Cloud & Watson; hands-on
                      project-based learning with expert-led sessions.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4" ref={eduRef as any}>
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Educational Journey</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <Reveal effect="left">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><University size={48} /></div>
                <h3 className="text-xl font-bold mb-2 text-center">B.E. Computer Science</h3>
                <h4 className="text-blue-300 font-semibold mb-2 text-center">St. John College of Engineering and Management</h4>
                <p className="text-white/70 mb-2 text-center">May 2022 - May 2026</p>
                <p className="font-bold text-center">CGPA: 7.5</p>
              </div>
            </Reveal>
            <Reveal effect="up">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><GraduationCap size={48} /></div>
                <h3 className="text-xl font-bold mb-2 text-center">BS Data Science & Programming</h3>
                <h4 className="text-blue-300 font-semibold mb-2 text-center">IIT Madras (Online)</h4>
                <p className="text-white/70 mb-2 text-center">Jan 2023 - Dec 2025</p>
                <p className="font-bold text-center">CGPA: 7.8</p>
              </div>
            </Reveal>
            <Reveal effect="right">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><School size={48} /></div>
                <h3 className="text-xl font-bold mb-2 text-center">Higher Secondary Certificate</h3>
                <h4 className="text-blue-300 font-semibold mb-2 text-center">Delhi Public School, Sushant Lok</h4>
                <p className="text-white/70 mb-2 text-center">Mar 2020 - Feb 2022</p>
                <p className="font-bold text-center">Percentage: 75%</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Featured Projects</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, index) => (
              <Reveal key={index} effect="up">
                <div
                  className="project-card-enhanced bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden cursor-pointer"
                  onClick={project.onClick || (() => {})}
                >
                  <div className="h-44 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl">
                    {typeof project.icon === "string" ? project.icon : project.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-white/90 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HACKATHONS */}
      <section id="hackathons" className="py-16 bg-black text-white" ref={hackRef as any}>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Hackathon Achievements</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <Reveal effect="right">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><Trophy className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-2 text-center">Vartak Coherence 2025</h3>
                <p className="text-white/80 text-center">
                  Excelled in a 36-hour hack, building an MVP under pressure with strong teamwork,
                  version control discipline, and iterative user testing loops.
                </p>
              </div>
            </Reveal>

            <Reveal effect="up">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><Award className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-2 text-center">SJCEM MegaHack 2025</h3>
                <p className="text-white/80 text-center">
                  Built an email phishing detection app with real-time analysis, URL heuristics,
                  and classification dashboards; presented live demo to judges.
                </p>
              </div>
            </Reveal>

            <Reveal effect="left">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><Trophy className="w-12 h-12" /></div>
                <h3 className="text-xl font-bold mb-2 text-center">TechFest 2024</h3>
                <p className="text-white/80 text-center">
                  Prototyped an IoT smart-home controller with voice control, live telemetry,
                  and energy optimization rules using simple automations.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & COURSES */}
      <section id="courses" className="py-16 bg-black text-white" ref={courseRef as any}>
        <div className="max-w-6xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Certifications & Courses</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {courses.map((c) => (
              <Reveal key={c.title} effect="flip">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-white/20 transition">
                  <div className="inline-block bg-gradient-to-r from-[#6d5efc] to-[#2ea0ff] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                    {c.provider}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                  <p className="text-white/80 mb-5">{c.description}</p>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold">
                    View Certificate <ExternalLink size={16} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal effect="up">
            <h2 className="text-5xl font-bold text-center mb-12">Get In Touch</h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT */}
            <Reveal effect="left">
              <div className="bg-[#0f1116] border border-white/10 rounded-2xl p-6">
                <div className="space-y-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#6d5efc] to-[#2ea0ff]">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-white/80">122vishakha2092@sjcem.edu.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#6d5efc] to-[#2ea0ff]">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Location</h4>
                      <p className="text-white/80">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-white/90 font-semibold">Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="What's your good name?"
                      className="w-full bg-[#1a1d26] border border-white/10 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white/90 font-semibold">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="What's your email address?"
                      className="w-full bg-[#1a1d26] border border-white/10 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white/90 font-semibold">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="How can I help you?"
                      rows={5}
                      className="w-full bg-[#1a1d26] border border-white/10 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#cfe5ff] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </Reveal>

            {/* RIGHT */}
            <Reveal effect="right">
              <div className="rounded-3xl overflow-hidden">
                <div className="aspect-[4/3] w-full canvas-rounded">
                  <DesktopRoom />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.linkedin.com/in/vishakha-roy-52924b1b6/" target="_blank" rel="noopener noreferrer" className="social"><Linkedin size={26} /></a>
            <a href="https://github.com/23f1000356" target="_blank" rel="noopener noreferrer" className="social"><Github size={26} /></a>
            <a href="mailto:122vishakha2092@sjcem.edu.in" className="social"><Mail size={26} /></a>
            <a href="tel:+919354565648" className="social"><Phone size={26} /></a>
          </div>
          <p className="text-white/70">&copy; {new Date().getFullYear()} Vishakha Roy. Crafted with 💜 and lots of ☕</p>
        </div>
      </footer>
    </>
  );
};

export default App;
