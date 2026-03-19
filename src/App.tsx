import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import vishakhaImg from "./assets/Vshakha.png";
import pythonImg from "./assets/Python.png";
import reactImg from "./assets/React.png";
import jsImg from "./assets/Js.png";
import sqlImg from "./assets/Sql.png";
import angularImg from "./assets/Angular.png";
import figmaImg from "./assets/Figma.png";
import vsCodeImg from "./assets/Vs Code.png";
import githubImg from "./assets/Github.png";
import sihImg from "./assets/Sih.png";
import webImg1 from "./assets/image 1.jpeg";
import webImg2 from "./assets/image 2 (2).jpg";
import webImg3 from "./assets/image 3.jpg";
import webImg4 from "./assets/image 4.jpg";
import webImg5 from "./assets/image 5.jpg";
import webImg6 from "./assets/image 6.jpg";
import webImg7 from "./assets/image 7.jpg";
import webImg8 from "./assets/image 8.jpg";
import webImg9 from "./assets/image 9.jpg";
import webImg10 from "./assets/image 10.jpg";

import {
  Menu, X, Code, Mail, Phone, MapPin, Trophy, Award, Brain,
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
  { provider: "Udemy", title: "Microsoft Excel Advanced", description: "Power Query, Pivot mastery, formulas, automation, and VBA foundations.", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-54a260a2-9c7e-4bf9-a554-39c8c8fe525a.pdf" },
  { provider: "IIT Madras", title: "Foundation Certificate (BS Program)", description: "DS & programming fundamentals, problem solving.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1717583278079/single-media-viewer/?type=DOCUMENT&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
  { provider: "IBM", title: "Machine Learning for Data Science Projects", description: "Modeling workflow, evaluation, MLOps basics, and deployment patterns.", link: "https://www.linkedin.com/in/vishakha-roy-52924b1b6/details/certifications/1723969336560/single-media-viewer/?type=DOCUMENT&profileId=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
  { provider: "IIT Madras", title: "Diploma in Programming & Data Science", description: "Completed Diploma in Programming and Diploma in Data Science from IIT Madras.", link: "https://www.linkedin.com/posts/vishakha-roy-52924b1b6_datascience-programming-machinelearning-activity-7417532125354229760-viHy?utm_source=share&utm_medium=member_desktop&rcm=ACoAADI5yTEBKT42uhFuPhtuOA8VzrHTgmJePh8" },
];

const SkillGroup = ({ title, items, slideFrom = "left" }: { title: string; items: any[]; slideFrom?: "left" | "right" }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: slideFrom === "left" ? -80 : 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="perspective"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
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
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          variants={itemContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((it, i) => (
            <motion.div
              key={it.name + i}
              variants={itemVariants}
              className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-4 border border-white/10 transition-all hover:-translate-y-1 hover:border-white/25"
              title={it.name}
            >
              <img src={it.src} alt={it.name} className="h-8 w-8 object-contain" />
              <span className="text-sm opacity-90">{it.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SplitText = ({ text, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } }
      }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } }
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const dynamicWordsCount = ["React", "JavaScript", "HTML", "CSS", "Python"];

const SplitHeadline = ({ text, delay = 0, className = "" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    let intervalId;
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % dynamicWordsCount.length);
      }, 1000);
    }, delay * 1000 + 800); // start cycling very shortly after initial sweep
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [delay]);

  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } }
      }}
      className={className}
    >
      {words.map((word, wordIndex) => {
        if (word === "React") {
          return (
            <motion.span
              key={wordIndex}
              className="inline-block mr-[0.25em]"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.02 } }
              }}
            >
              <AnimatePresence mode="wait">
                {index === 0 ? (
                  <motion.span key="react-initial" className="inline-block">
                    {dynamicWordsCount[0].split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } }
                        }}
                        className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-shimmer"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                ) : (
                  <motion.span
                    key={dynamicWordsCount[index]}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-shimmer"
                  >
                    {dynamicWordsCount[index]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          );
        }

        return (
          <motion.span
            key={wordIndex}
            className="inline-block mr-[0.25em]"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.02 } }
            }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

const ScrollSplitText = ({ text, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.03 } }
      }}
      className={className}
      style={{ display: "block" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } }
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const WordStagger = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <motion.div
      variants={{
        visible: { transition: { staggerChildren: 0.03 } }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline-block"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
          }}
          className="inline-block mr-2 mt-1 drop-shadow-md"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-5 to 5 deg)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.setProperty('--rx', `${rotateX}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY}deg`);
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
    cardRef.current.style.setProperty('--mouse-x', `-1000px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group flex flex-col rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.04] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(100,100,255,0.25)] ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) text-shadow"
      }}
    >
      {/* Light Reflection glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: "radial-gradient(circle 600px at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(255,255,255,0.06), transparent 40%)"
        }}
      />
      {/* Decorative Shimmer Edge */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-[20px]" />
      {children}
    </div>
  );
};

const DraggablePlaceholder = ({ children, constraintsRef, style, y, rotate, duration, entryX = 0, entryY = 0 }: any) => {
  const [clicked, setClicked] = useState(false);
  return (
    <motion.div
      className="absolute z-40"
      style={style}
      variants={{
        hidden: { opacity: 0, scale: 0.5, x: entryX, y: entryY },
        visible: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 1, ease: "backOut" } }
      }}
    >
      <motion.div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={constraintsRef}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        onClick={() => setClicked(!clicked)}
      >
        <motion.div
          animate={{ y, rotate, scale: clicked ? 1.6 : 1 }}
          transition={{
            y: { duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotate: { duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            scale: { type: "spring", stiffness: 300, damping: 20 }
          }}
          className="w-full h-full flex items-center justify-center relative hover:scale-[1.05] transition-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const OutlineToFillHeading = ({ text, className = "mb-12" }: { text: string; className?: string }) => (
  <div className={`relative text-center ${className}`} style={{ height: "1.25em" }}>
    <span className="text-5xl font-bold uppercase invisible block leading-none" aria-hidden="true">{text}</span>
    <motion.h2
      initial={{ y: 60, opacity: 1 }}
      whileInView={{ y: [60, 0, 0, 0], opacity: [1, 1, 1, 0] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 2.3, times: [0, 0.35, 0.78, 1], ease: "easeOut" }}
      className="text-5xl font-bold uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.55)", color: "transparent" }}>{text}</span>
    </motion.h2>
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 0, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 2.3, times: [0, 0.78, 1], ease: "easeOut" }}
      className="text-5xl font-bold uppercase absolute inset-0 flex items-center justify-center text-white"
    >
      {text}
    </motion.h2>
  </div>
);

const AboutMeSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      id="about"
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-24 min-h-[100vh] flex flex-col justify-center items-center bg-[#0a0a0f] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-[#0a0a0f] opacity-80" />

      {/* Corner Elements (Draggable Placeholders) */}
      <DraggablePlaceholder
        constraintsRef={containerRef}
        style={{ top: "8%", left: "5%", width: 260, height: 260 }}
        y={[-15, 15]} rotate={[0, 8, 0]} duration={4.5}
        entryX={-300} entryY={-150}
      >
        <img src={reactImg} alt="React" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(100,200,255,0.8)] pointer-events-none" />
      </DraggablePlaceholder>

      <DraggablePlaceholder
        constraintsRef={containerRef}
        style={{ top: "15%", right: "5%", width: 240, height: 240 }}
        y={[10, -10]} rotate={[0, -5, 0]} duration={5}
        entryX={200} entryY={-100}
      >
        <img src={pythonImg} alt="Python" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,200,100,0.8)] pointer-events-none" />
      </DraggablePlaceholder>

      <DraggablePlaceholder
        constraintsRef={containerRef}
        style={{ bottom: "15%", left: "8%", width: 250, height: 250 }}
        y={[-15, 15]} rotate={[0, 8, 0]} duration={6}
        entryX={-200} entryY={150}
      >
        <img src={jsImg} alt="JavaScript" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] pointer-events-none" />
      </DraggablePlaceholder>

      <DraggablePlaceholder
        constraintsRef={containerRef}
        style={{ bottom: "10%", right: "8%", width: 220, height: 220 }}
        y={[15, -15]} rotate={[0, -8, 0]} duration={4.5}
        entryX={150} entryY={100}
      >
        <img src={githubImg} alt="GitHub" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] pointer-events-none" />
      </DraggablePlaceholder>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-4 relative z-10 w-full text-center"
      >
        {/* ABOUT ME Heading — outlined slides up then fills */}
        <div className="relative mb-10" style={{ height: "1.25em" }}>
          {/* Invisible sizer — keeps wrapper height constant */}
          <span
            className="text-5xl md:text-7xl font-extrabold tracking-wide uppercase invisible block leading-none"
            aria-hidden="true"
          >
            ABOUT ME
          </span>

          {/* Outlined version: y 60→0 over 0.8s, stays 2s, then fades out 0.5s */}
          <motion.h2
            initial={{ y: 60, opacity: 1 }}
            whileInView={{ y: [60, 0, 0, 0], opacity: [1, 1, 1, 0] }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 2.3,
              times: [0, 0.35, 0.78, 1],
              ease: "easeOut"
            }}
            className="text-5xl md:text-7xl font-extrabold tracking-wide uppercase absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.55)", color: "transparent" }}>
              ABOUT ME
            </span>
          </motion.h2>

          {/* Filled version: appears after 2.8s delay */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 2.3,
              times: [0, 0.78, 1],
              ease: "easeOut"
            }}
            className="text-5xl md:text-7xl font-extrabold tracking-wide uppercase absolute inset-0 flex items-center justify-center text-white"
          >
            ABOUT ME
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10" />
          </motion.h2>
        </div>

        <div className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 font-medium" style={{ textShadow: "0px 2px 20px rgba(0,0,0,0.8)" }}>
          <WordStagger text="Dedicated and enthusiastic Web Developer skilled in HTML, CSS, JavaScript, and React, seeking to contribute to innovative and user-friendly web projects. Aspiring Data Scientist with a strong foundation in Python, machine learning, and SQL, eager to apply data-driven techniques to solve real-world problems." />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a href="DataScientist.pdf" download className="btn-solid !bg-white/10 hover:!bg-white/20 !border !border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all relative overflow-hidden">
              Download ML CV
            </a>
            <a href="WebDeveloper.pdf" download className="btn-solid !bg-white/10 hover:!bg-white/20 !border !border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all relative overflow-hidden">
              Download Web Dev CV
            </a>
          </div>

          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(100,100,255,0.4)] transition-all border border-white/10 relative overflow-hidden">
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center gap-6 mt-12"
        >
          <a href="https://www.linkedin.com/in/vishakha-roy-52924b1b6/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 group">
            <Linkedin size={28} className="text-white/60 group-hover:text-white transition-colors" />
          </a>
          <a href="https://github.com/23f1000356" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 group">
            <Github size={28} className="text-white/60 group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </motion.div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-32 w-full max-w-6xl px-4 mx-auto relative z-20 group/cards">
        {[
          {
            id: 1,
            title: "Smart India Hackathon",
            bullets: ["National Winner – SIH 2025 (Punjab)", "Built a healthcare solution", "Participated in 10+ hackathons"],
            icon: <Trophy size={32} className="text-yellow-400 group-hover:drop-shadow-[0_0_15px_rgba(250,200,50,0.8)] transition-all duration-300" />
          },
          {
            id: 2,
            title: "Full Stack Developer",
            bullets: ["Building scalable web applications", "React, Node.js, MongoDB", "Fast and user-friendly interfaces"],
            icon: <Code size={32} className="text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(100,150,255,0.8)] transition-all duration-300" />
          },
          {
            id: 3,
            title: "AI / ML Engineer",
            bullets: ["Crafting and training AI models", "Python, Scikit-learn, TensorFlow", "Data-driven problem solving"],
            icon: <Brain size={32} className="text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(200,100,255,0.8)] transition-all duration-300" />
          }
        ].map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
            className="h-full flex flex-col transition-opacity duration-300 group-hover/cards:opacity-50 hover:!opacity-100"
          >
            <TiltCard className="flex flex-col h-full min-h-[340px] p-6 lg:p-8 cursor-pointer relative justify-start">
              {/* Icon */}
              <div className="mb-6 transform group-hover:scale-[1.15] transition-transform duration-300 origin-left">
                <span className="p-4 inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                  {card.icon}
                </span>
              </div>

              {/* Title & Divider */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors mb-4">{card.title}</h3>
                <div className="w-[50px] h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>

              {/* Bullets */}
              <ul className="text-left mt-auto transform group-hover:translate-y-[-5px] transition-all duration-300 relative z-10 flex flex-col gap-3">
                {card.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-white/60 group-hover:text-white/90 transition-colors">
                    <span className="w-[6px] h-[6px] rounded-full bg-white/30 mt-2 shrink-0 group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(100,200,255,0.8)] transition-all" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const App = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const heroY = useTransform(scrollY, [0, 1000], [0, 150]);
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
    return scrollY.onChange((latest) => {
      // Show navbar only after scrolling past the hero (e.g. into the About Me section)
      setIsScrolled(latest > window.innerHeight * 0.85);
    });
  }, [scrollY]);

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
    { id: "smart-city", title: "Smart City Dashboard", description: "Urban monitoring with interactive maps, role-based access, and alert systems with real time updates.", tech: ["React", "TypeScript", "Node.js", "MongoDb", "Maps API"], icon: <Building2 className="w-16 h-16" />, onClick: () => setSelectedProject("smart-city") },
    { id: "disease-prediction", title: "Disease Prediction System", description: "ML-powered health assessment tool for multiple diseases, Streamlit UI.", tech: ["Streamlit", "ML", "Python"], icon: <Heart className="w-16 h-16" />, onClick: () => setSelectedProject("disease-prediction") },
    { id: "malware-prediction", title: "Malware Prediction App", description: "Telemetry-based malware risk prediction with SHAP and dashboards.", tech: ["React", "ML Models"], icon: <Bug className="w-16 h-16" />, onClick: () => setSelectedProject("malware-prediction") },
    { id: "disaster-management", title: "Disaster Management System", description: "Centralized platform for climate/disaster monitoring, prediction, response.", tech: ["Next.js", "Flask", "SQLite"], icon: <CloudLightning className="w-16 h-16" />, onClick: () => setSelectedProject("disaster-management") },
    { id: "ai-job-screening", title: "AI-Powered Job Screening", description: "Resume screening, JD matching, scheduling.", tech: ["Python", "Machine Learning", "Flask", "Scikit-learn"], icon: <Briefcase className="w-16 h-16" />, onClick: () => setSelectedProject("ai-job-screening") },
    { id: "ecommerce-website", title: "E-Commerce Website", description: "Secure checkout with cards, UPI, wallets, and COD.", tech: ["Next.js", "Tailwind", "Node.js", "MongoDB"], icon: <ShoppingCart className="w-16 h-16" />, onClick: () => setSelectedProject("ecommerce-website") },
    { id: "quiz-app", title: "Quiz App", description: "Create and share custom quizzes in minutes.", tech: ["HTML", "CSS", "Javascript", "Tailwind"], icon: <HelpCircle className="w-16 h-16" />, onClick: () => setSelectedProject("quiz-app") },
  ];

  return (
    <>
      {selectedProject && (
        <ProjectDetails projectId={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <div className="starfield" />

      {/* NAVBAR */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="navbar fixed top-0 w-full z-[60] backdrop-blur-md bg-black/60 border-b border-white/10"
          >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
              <button onClick={() => scrollToSection("home")} className="text-2xl font-extrabold text-white">
                VR
              </button>
              <ul className="hidden md:flex space-x-7">
                {[
                  { id: "experience", label: "Experience" },
                  { id: "education", label: "Education" },
                  { id: "projects", label: "Projects" },
                  { id: "hackathons", label: "Achievements" }
                ].map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollToSection(s.id)}
                      className="nav-link text-white/80 hover:text-white transition-colors capitalize font-medium"
                    >
                      {s.label}
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
                  {[
                    { id: "experience", label: "Experience" },
                    { id: "education", label: "Education" },
                    { id: "projects", label: "Projects" },
                    { id: "hackathons", label: "Achievements" }
                  ].map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollToSection(s.id)}
                        className="text-white/90 hover:text-white transition-colors capitalize font-medium w-full text-left"
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0a0a0f]">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] bg-blue-600/20 mix-blend-screen rounded-full blur-[100px] -z-10" />

        {/* Image anchored to left/bottom covering left half */}
        <div className="absolute left-0 bottom-0 w-full lg:w-[50vw] h-[50vh] lg:h-[100vh] pointer-events-none z-10 flex justify-center lg:justify-start items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9, delay: 0 }}
            whileHover={{ scale: 1.02, filter: "brightness(1.05) drop-shadow(0px 10px 30px rgba(100,200,255,0.15))" }}
            style={{ y: heroY }}
            className="will-change-transform transform-gpu pointer-events-auto w-full h-full flex justify-center lg:justify-center items-end"
          >
            <img
              src={vishakhaImg}
              alt="Vishakha Roy"
              /* Scale forcefully bumps up the image size so it dominates the pane, anchoring to origin-bottom so it doesn't float up */
              className="w-full h-[120%] lg:h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] scale-[1.1] lg:scale-[1.6] origin-bottom lg:origin-bottom"
            />
          </motion.div>
        </div>

        {/* Text Container constrained to right side using grid offset */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20 w-full pt-[45vh] lg:pt-0">

          {/* Empty div reserves space for the left half on desktop layout */}
          <div className="hidden lg:block order-1" />

          {/* Right Side: Text Content */}
          <div className="order-2 text-white flex flex-col justify-center items-center lg:items-start lg:pl-10 xl:pl-16 relative z-20 text-center lg:text-left mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
              className="text-3xl md:text-5xl font-semibold text-white/90 mb-3 tracking-wide"
            >
              Hello, I am
            </motion.div>

            <SplitText text="Vishakha Roy" delay={0.6} className="text-[48px] md:text-7xl font-extrabold mb-4" />

            <SplitHeadline text="Shaping React into Real Projects that Deliver Results" delay={1.4} className="text-[28px] md:text-[42px] font-bold leading-[1.25] mb-8 tracking-tight max-w-lg" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8, delay: 2.5 }}
              className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start"
            >
              <button onClick={() => scrollToSection("contact")} className="btn-solid">Let's Talk</button>
              <a href="WebDeveloper.pdf" download className="btn-outline">Download Resume</a>
              <div className="flex gap-4 items-center ml-2">
                <a href="https://www.linkedin.com/in/vishakha-roy-52924b1b6/" target="_blank" rel="noopener noreferrer" className="social">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/23f1000356" target="_blank" rel="noopener noreferrer" className="social">
                  <Github size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE — SLIDING IMAGE */}
      <section className="bg-black">
        <div className="overflow-hidden relative marquee" style={{ padding: 0, border: "none", background: "transparent" }}>
          <div className="flex whitespace-nowrap marquee-track" style={{ animationDuration: "30s", gap: 0 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex shrink-0">
                <img src={pythonImg} alt="python moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={reactImg} alt="react moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={jsImg} alt="js moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={sqlImg} alt="sql moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={angularImg} alt="angular moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={figmaImg} alt="figma moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={vsCodeImg} alt="vs code moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
                <img src={githubImg} alt="github moving visual" className="h-[220px] md:h-[260px] w-auto object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <AboutMeSection />

      {/* WEBSITE DESIGNS — Two-row scroll parallax */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <OutlineToFillHeading text="Website Designs" />
        </div>
        {(() => {
          const designImages = [
            webImg1, webImg2, webImg3, webImg4, webImg5,
            webImg6, webImg7, webImg8, webImg9, webImg10,
          ];
          const dRow1 = designImages.slice(0, 5);
          const dRow2 = designImages.slice(5, 10);
          const designRef = useRef<HTMLDivElement>(null);
          const { scrollYProgress: designScroll } = useScroll({ target: designRef, offset: ["start end", "end start"] });
          const dRow1X = useTransform(designScroll, [0, 1], ["-5%", "5%"]);
          const dRow2X = useTransform(designScroll, [0, 1], ["5%", "-5%"]);

          return (
            <div ref={designRef} className="mt-8 space-y-6 px-4">
              {/* Row 1 slides right */}
              <motion.div style={{ x: dRow1X }} className="flex gap-5">
                {dRow1.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="min-w-[300px] max-w-[320px] shrink-0 group"
                  >
                    <div className="rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white/25 hover:shadow-[0_0_30px_rgba(100,100,255,0.12)] transition-all duration-300">
                      <img src={img} alt={`Website Design ${i + 1}`} className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              {/* Row 2 slides left */}
              <motion.div style={{ x: dRow2X }} className="flex gap-5">
                {dRow2.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="min-w-[300px] max-w-[320px] shrink-0 group"
                  >
                    <div className="rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white/25 hover:shadow-[0_0_30px_rgba(100,100,255,0.12)] transition-all duration-300">
                      <img src={img} alt={`Website Design ${i + 6}`} className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })()}
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <OutlineToFillHeading text="Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {groups.map((g, i) => (
              <SkillGroup
                key={g.title}
                title={g.title}
                items={g.items}
                slideFrom={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <OutlineToFillHeading text="Professional Experience" className="mb-6" />

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
          <OutlineToFillHeading text="Educational Journey" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <Reveal effect="left">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><University size={48} /></div>
                <h3 className="text-xl font-bold mb-2 text-center">B.E. Computer Science</h3>
                <h4 className="text-blue-300 font-semibold mb-2 text-center">St. John College of Engineering and Management</h4>
                <p className="text-white/70 mb-2 text-center">May 2022 - May 2026</p>
                <p className="font-bold text-center">CGPA: 8.5</p>
              </div>
            </Reveal>
            <Reveal effect="up">
              <div className="glass p-7 rounded-2xl">
                <div className="text-blue-300 mb-4 flex justify-center"><GraduationCap size={48} /></div>
                <h3 className="text-xl font-bold mb-2 text-center">BS Data Science & Programming</h3>
                <h4 className="text-blue-300 font-semibold mb-2 text-center">IIT Madras (Online)</h4>
                <p className="text-white/70 mb-2 text-center">Jan 2023 - May 2026</p>
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
          <OutlineToFillHeading text="Featured Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, index) => (
              <Reveal key={index} effect="up">
                <div
                  className="project-card-enhanced bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden cursor-pointer"
                  onClick={project.onClick || (() => { })}
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

      {/* HACKATHONS — Two-row scroll parallax */}
      <section id="hackathons" className="py-24 bg-black text-white overflow-hidden" ref={hackRef as any}>
        <div className="max-w-6xl mx-auto px-4">
          <OutlineToFillHeading text="Hackathon Achievements" />
        </div>
        {(() => {
          const hackCards = [
            { title: "\u{1F3C6} SIH Winner 2025", product: "Sehat Sathi", desc: "National Winner \u2014 Offline-first, multilingual telemedicine app for 173+ rural villages in Nabha, Punjab. AI symptom checker & Smart Health Kiosks." },
            { title: "\u{1F947} Tech Dominion \u2013 Margazhi\u201926", product: "AMEP", desc: "First Prize \u2014 Adaptive Mastery & Engagement Platform for real-time student understanding and personalized learning." },
            { title: "\u{1F51F} HackWithMumbai", product: "Student-Alumni Platform", desc: "Top 10 National Level \u2014 12-hour hackathon. Built Student\u2013Alumni\u2013Faculty networking platform with 3 dashboards." },
            { title: "\u{1F4AF} MAD II Project \u2013 S Grade", product: "Hospital Management System", desc: "100/100 at IIT Madras \u2014 Full-stack HMS with Flask, VueJS, Redis, Celery. Role-based access for Admins, Doctors & Patients." },
            { title: "\u{1F916} Mumbai Hacks 2025", product: "Agentic AI Misinfo Detector", desc: "Gen AI Hackathon \u2014 18hrs, 500+ teams. Multi-agent fact verification with Ollama, RAG, web scraping & LLM-driven analysis." },
            { title: "\u{1F30D} SJCEM Hackathon", product: "Disaster-Connect", desc: "AI-powered disaster management with NLP verification, citizen reporting, predictive analytics & real-time Socket.io updates." },
            { title: "\u{1F510} MegaHack 5.0", product: "Phishing Detection System", desc: "Cybersecurity domain \u2014 Random Forest ML + Gemini 2.0 AI for real-time email phishing detection with React dashboard." },
            { title: "\u{1F3E5} Vartak College Hackathon", product: "Clinical Trial Matcher", desc: "AI platform matching anonymized patient records with clinical trials using eligibility scoring, fairness monitoring & audit logs." },
            { title: "\u{1F30A} Hackathon Project", product: "Disaster-Connect v2", desc: "Enhanced AI disaster response with React 18, Node.js, MongoDB, NLP classification, image recognition & predictive analytics." },
            { title: "\u{1F3D9}\uFE0F Coherence 2025", product: "Smart City Dashboard", desc: "Real-time urban monitoring with Google Maps API, air quality index, traffic visualization & AI-driven alert systems." },
          ];
          const row1 = hackCards.slice(0, 5);
          const row2 = hackCards.slice(5, 10);
          const hackParallaxRef = useRef<HTMLDivElement>(null);
          const { scrollYProgress: hackScroll } = useScroll({ target: hackParallaxRef, offset: ["start end", "end start"] });
          const hackRow1X = useTransform(hackScroll, [0, 1], ["-5%", "5%"]);
          const hackRow2X = useTransform(hackScroll, [0, 1], ["5%", "-5%"]);

          return (
            <div ref={hackParallaxRef} className="mt-8 space-y-6 px-4">
              {/* Row 1 slides right */}
              <motion.div style={{ x: hackRow1X }} className="flex gap-5">
                {row1.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="min-w-[300px] max-w-[320px] shrink-0 group"
                  >
                    <div className="rounded-2xl p-5 border-2 border-white/10 bg-white/[0.03] hover:border-white/25 hover:shadow-[0_0_30px_rgba(100,100,255,0.12)] transition-all duration-300" style={{ backdropFilter: "blur(8px)" }}>
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{card.title}</h4>
                      <p className="text-sm font-semibold text-blue-400/80 mb-3">{card.product}</p>
                      <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              {/* Row 2 slides left */}
              <motion.div style={{ x: hackRow2X }} className="flex gap-5">
                {row2.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="min-w-[300px] max-w-[320px] shrink-0 group"
                  >
                    <div className="rounded-2xl p-5 border-2 border-white/10 bg-white/[0.03] hover:border-white/25 hover:shadow-[0_0_30px_rgba(100,100,255,0.12)] transition-all duration-300" style={{ backdropFilter: "blur(8px)" }}>
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{card.title}</h4>
                      <p className="text-sm font-semibold text-blue-400/80 mb-3">{card.product}</p>
                      <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })()}
      </section>

      {/* CERTIFICATIONS & COURSES — Cinematic Carousel */}
      <section id="courses" className="py-24 bg-black text-white overflow-hidden" ref={courseRef as any}>
        <div className="max-w-6xl mx-auto px-4">
          <OutlineToFillHeading text="Certifications & Courses" />
        </div>
        {(() => {
          const [activeIdx, setActiveIdx] = useState(Math.floor(courses.length / 2));
          const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
          const [sectionInView, setSectionInView] = useState(false);
          const carouselRef = useRef<HTMLDivElement>(null);

          useEffect(() => {
            const el = carouselRef.current;
            if (!el) return;
            const io = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) setSectionInView(true);
            }, { threshold: 0.2 });
            io.observe(el);
            return () => io.disconnect();
          }, []);

          const goTo = (idx: number) => {
            if (idx >= 0 && idx < courses.length) setActiveIdx(idx);
          };

          return (
            <div ref={carouselRef} className="relative mt-8">
              {/* Carousel Track */}
              <div className="flex items-center justify-center relative" style={{ height: 420, perspective: 1200 }}>
                {courses.map((c, i) => {
                  const offset = i - activeIdx;
                  const absOffset = Math.abs(offset);
                  const isCenter = offset === 0;
                  const isExpanded = expandedIdx === i;

                  return (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 80, scale: 0.8 }}
                      animate={sectionInView ? {
                        opacity: absOffset > 2 ? 0 : isCenter ? 1 : 0.5 + (1 - absOffset * 0.15),
                        y: 0,
                        x: offset * 280,
                        scale: isExpanded ? 1.15 : isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.12),
                        rotateY: offset * -4,
                        zIndex: isExpanded ? 100 : isCenter ? 50 : 50 - absOffset * 10,
                        filter: "blur(0px)",
                      } : {}}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: sectionInView && !isCenter ? absOffset * 0.1 : 0,
                      }}
                      onClick={() => {
                        if (isCenter) {
                          setExpandedIdx(isExpanded ? null : i);
                        } else {
                          setExpandedIdx(null);
                          goTo(i);
                        }
                      }}
                      className="absolute cursor-pointer"
                      style={{
                        width: 320,
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity, filter",
                      }}
                    >
                      <div
                        className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
                          isCenter
                            ? "bg-white/[0.07] border-white/30 shadow-[0_0_40px_rgba(100,100,255,0.15)]"
                            : "bg-white/[0.03] border-white/15"
                        }`}
                        style={{ backdropFilter: "blur(12px)" }}
                      >
                        {/* Provider Badge */}
                        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 transition-all ${
                          isCenter
                            ? "bg-gradient-to-r from-[#6d5efc] to-[#2ea0ff] text-white shadow-[0_0_20px_rgba(100,100,255,0.3)]"
                            : "bg-white/10 text-white/70"
                        }`}>
                          {c.provider}
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-2 transition-colors ${isCenter ? "text-white" : "text-white/60"}`}>
                          {c.title}
                        </h3>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-4" />
                              <p className="text-white/80 text-sm leading-relaxed mb-5">{c.description}</p>
                              <a
                                href={c.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(100,100,255,0.4)] transition-all"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Certificate <ExternalLink size={14} />
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Hint for center card */}
                        {isCenter && !isExpanded && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="text-xs mt-3 text-white/40"
                          >
                            Click to expand
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={() => { setExpandedIdx(null); goTo(activeIdx - 1); }}
                  disabled={activeIdx === 0}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all disabled:opacity-20 disabled:pointer-events-none"
                >
                  ←
                </button>
                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {courses.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setExpandedIdx(null); goTo(i); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeIdx
                          ? "w-8 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500"
                          : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => { setExpandedIdx(null); goTo(activeIdx + 1); }}
                  disabled={activeIdx === courses.length - 1}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all disabled:opacity-20 disabled:pointer-events-none"
                >
                  →
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <OutlineToFillHeading text="Get In Touch" />

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
