import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github, X } from "lucide-react";

interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}
interface ProjectData {
  title: string;
  overview: string;
  features: string[];
  tech: string[];
  prerequisites?: string[];
  githubUrl: string;
  demoUrl?: string;
  images: string[];
}

/* ----------- your data (unchanged) ----------- */
const projectsData: Record<string, ProjectData> = {
  "smart-parking": {
    title: "Smart Parking Management System",
    overview:
      "This was my App Dev 1 project in MAD 1. The aim is to create a Vehicle Parking Management System for booking parking spots with real-time availability and management features.",
    features: [
      "User Management: Multiple users and admin roles with authentication.",
      "Parking Management: Create lots, manage spots, dynamic pricing, real-time tracking.",
      "Booking System: Spot booking, vehicle type support, duration-based cost.",
      "Search & Filter: Search by location, vehicle type, user ID, address.",
      "Analytics: Real-time availability, revenue, peak hours, vehicle distribution.",
      "Extras: Auto spot assignment, reservation tracking, booking history, support.",
    ],
    tech: [
      "Flask web framework",
      "SQLite database",
      "SQLAlchemy ORM",
      "Secure password hashing with bcrypt",
      "Interactive charts and analytics",
      "Responsive web design",
    ],
    githubUrl: "https://github.com/23f1000356/Smart-Parking-Management-System",
    images: [
      "https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "phishing-detection": {
    title: "PhishDeezNuts - AI-Powered Phishing Email Detection",
    overview:
      "PhishDeezNuts is an email security app using machine learning, rule-based analysis, and Google's Gemini AI to detect phishing in Gmail.",
    features: [
      "Multi-layered Detection: Random Forest, rule-based, Gemini AI analysis.",
      "Gmail Integration: OAuth2, real-time scanning, inbox monitoring.",
      "Advanced Analysis: URL/domain checks, sender credibility, SPF/DKIM/DMARC, attachment scan.",
      "Detailed Reporting: Phishing scores, threat analysis, false positive management, history.",
    ],
    tech: ["Python 3.8+", "Node.js 14.x+", "Google Cloud Platform", "Gemini API", "React and Flask"],
    prerequisites: [
      "Python 3.8 or higher",
      "Node.js 14.x or higher",
      "Gmail account",
      "Google Cloud Platform account",
      "Gemini API key",
    ],
    githubUrl: "https://github.com/23f1000356/PhishDeezNuts",
    demoUrl: "https://youtu.be/C7EZDW05sXw",
    images: [
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "smart-city": {
    title: "Smart City Dashboard - India 🌆",
    overview:
      "A web app for real-time monitoring of urban parameters across Indian cities, including air quality, traffic, water levels, and energy usage.",
    features: [
      "Real-time Monitoring",
      "User Authentication",
      "Interactive Visuals",
      "Map Integration",
      "Search & Alerts",
      "Admin Panel",
      "Responsive Design",
    ],
    tech: ["React", "TypeScript", "Node.js", "Maps API", "Real-time Data Processing", "Chart.js"],
    githubUrl: "https://github.com/23f1000356/Smart-City-Dashboard",
    images: [
      "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "disease-prediction": {
    title: "Disease Outbreak Prediction System",
    overview:
      "A Streamlit-based machine learning app that predicts risks of Diabetes, Heart Disease, and Parkinson's Disease based on user inputs.",
    features: [
      "Multi-Disease Prediction: Supports Diabetes, Heart Disease, Parkinson’s.",
      "Interactive Interface: Simple and user-friendly Streamlit UI.",
      "Real-time Results: Instant predictions on inputs.",
      "Input Validation: Handles missing or invalid inputs.",
      "Responsive Design: Works seamlessly on all devices.",
    ],
    tech: ["Python", "Streamlit", "Scikit-learn", "Pandas & NumPy", "Responsive UI design"],
    githubUrl: "https://github.com/23f1000356/Prediction-of-Disease-outbreaks",
    images: [
      "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6129502/pexels-photo-6129502.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "malware-prediction": {
    title: "Microsoft Malware Prediction Application",
    overview:
      "A web application predicting malware infection probability using antivirus telemetry data and machine learning.",
    features: [
      "Dashboard: Malware stats, risk maps, and trends.",
      "Upload Page: CSV drag-and-drop with preview and validation.",
      "Predictions Page: Table view with filtering, color-coded risks, and export.",
      "Feature Summary: Device info, security analysis, SHAP explanations.",
      "Settings Page: Model metrics, threshold adjustment, feature importance.",
    ],
    tech: ["React + TypeScript", "Tailwind CSS", "Recharts", "AG Grid", "PapaParse", "Machine Learning backend"],
    prerequisites: ["Node.js 16.x+", "npm 8.x+"],
    githubUrl: "https://github.com/23f1000356/Malware-prediction-ml-project",
    images: [
      "https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "disaster-management": {
    title: "Climate Disaster Management System",
    overview:
      "A centralized climate and disaster management platform built with React/Next.js and Python backend. It provides dashboards for users, admins, and agents to monitor climate data, predict disasters, and manage responses efficiently.",
    features: [
      "User Authentication: Secure login and signup system for different roles.",
      "User Dashboard: Personalized climate data and alerts.",
      "Admin Dashboard: Tools to manage users, monitor climate events, and oversee agents.",
      "Disaster Prediction Agents: Analyze climate data and provide early warnings.",
      "Data Visualization: Charts, graphs, and real-time updates for climate events.",
      "Database Management: Stores climate and disaster data locally for quick analysis.",
      "Responsive UI: Works smoothly across devices.",
    ],
    tech: [
      "Frontend: React (Next.js), CSS Modules",
      "Backend: Python (Flask)",
      "Database: SQLite (acms.db)",
      "Node.js (for Next.js app)",
      "REST API for backend communication",
    ],
    githubUrl: "https://github.com/23f1000356/Disaster-Management",
    images: [
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1305761/pexels-photo-1305761.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/954473/pexels-photo-954473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "ai-job-screening": {
    title: "AI-Powered Job Screening Application",
    overview:
      "An intelligent recruitment assistant that automates resume screening, candidate shortlisting, and interview scheduling using AI matching algorithms.",
    features: [
      "JD Summarization: Automatically extracts key elements from job descriptions",
      "CV-JD Matching: Uses AI to match candidate resumes with job descriptions",
      "Candidate Shortlisting: Automatically shortlists candidates based on match scores",
      "Interview Scheduling: Sends interview invitations to shortlisted candidates",
      "Bulk Resume Processing: Upload and process multiple resumes at once",
      "Dashboard Analytics: Visualize recruitment metrics with interactive charts",
    ],
    tech: ["Backend: Flask, SQLAlchemy", "Frontend: Bootstrap 5, Chart.js", "ML/NLP: Scikit-learn, NLTK", "Database: SQLite (default)"],
    prerequisites: [
      "Python 3.8+",
      "Virtual environment (recommended)",
      "pip install -r requirements.txt",
      "Initialize database with: python app.py",
    ],
    githubUrl: "https://github.com/23f1000356/Job_screening",
    images: [
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "ecommerce-website": {
    title: "E-Commerce Website",
    overview:
      "A full-stack e-commerce platform that provides product browsing, cart management, checkout, and order tracking with a modern responsive UI.",
    features: [
      "User Authentication: Secure signup/login with session handling",
      "Product Management: Browse, search, and filter products",
      "Shopping Cart: Add, update, and remove items",
      "Order Management: Place orders and track order history",
      "Admin Dashboard: Manage products, inventory, and users",
      "Responsive UI: Optimized for desktop and mobile",
      "Deployment: Live hosted on Vercel",
    ],
    tech: ["Frontend: React (Next.js), Tailwind CSS", "Backend: Node.js / Express.js", "Database: MongoDB / SQLite (based on setup)", "Deployment: Vercel"],
    githubUrl: "https://github.com/23f1000356/E-commerce",
    demoUrl: "https://e-commerce-nine-umber.vercel.app/",
    images: [
      "https://images.pexels.com/photos/5632403/pexels-photo-5632403.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5632387/pexels-photo-5632387.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  "quiz-app": {
    title: "Quiz App for Students",
    overview:
      "An interactive quiz application for students covering GK and multiple subjects. Users can take quizzes, create their own, or generate quizzes dynamically for practice and learning.",
    features: [
      "Multi-Subject Quizzes: General Knowledge and subject-wise quizzes",
      "Quiz Creation: Teachers or students can create custom quizzes",
      "Quiz Generation: Auto-generate quizzes dynamically",
      "Score Tracking: Instant feedback and results after quiz completion",
      "User-Friendly UI: Clean and responsive interface for all devices",
      "Deployed and accessible online",
    ],
    tech: ["Frontend: React (Next.js)", "Styling: Tailwind CSS", "Backend: Node.js / Express (if extended)", "Deployment: Vercel"],
    githubUrl: "https://github.com/23f1000356/Quiz-App",
    demoUrl: "https://task3-quiz.vercel.app/",
    images: [
      "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5905712/pexels-photo-5905712.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3184646/pexels-photo-3184646.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
};

/* ---------------- component ---------------- */
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onClose }) => {
  const [idx, setIdx] = useState(0);
  const project = projectsData[projectId];
  const cardRef = useRef<HTMLDivElement>(null);

  // autoplay
  useEffect(() => {
    if (!project) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % project.images.length), 3500);
    return () => clearInterval(id);
  }, [project?.images.length]);

  // esc to close
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!project) return null;

  const next = () => setIdx((p) => (p + 1) % project.images.length);
  const prev = () => setIdx((p) => (p - 1 + project.images.length) % project.images.length);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={cardRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-4xl
          rounded-3xl overflow-hidden
          border border-white/5
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          bg-[linear-gradient(180deg,#0b1220_0%,#0f1830_100%)]
          text-white
          flex flex-col max-h-[90vh]
        "
      >
        {/* Close – always on top */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 hover:bg-black/70 border border-white/15 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Banner / carousel */}
        <div className="relative shrink-0">
          <img
            src={project.images[idx]}
            alt={`${project.title} - image ${idx + 1}`}
            className="w-full h-[230px] sm:h-[280px] md:h-[320px] object-cover"
          />

          {/* arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Previous image"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Next image"
          >
            <ArrowRight size={18} />
          </button>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === idx ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{project.title}</h1>
          <p className="mt-3 text-white/80 leading-relaxed">{project.overview}</p>

          {/* chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm font-semibold text-white/90 bg-white/10 border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Features (optional – keep collapsed visually similar to your reference) */}
          {project.features?.length > 0 && (
            <div className="mt-5 space-y-2">
              {project.features.map((f, i) => (
                <div key={i} className="text-white/80 text-sm sm:text-[0.95rem]">
                  • {f}
                </div>
              ))}
            </div>
          )}

          {/* Desktop CTAs (inside content) */}
          <div className="hidden sm:flex gap-3 pt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#141d35] hover:bg-[#192345] border border-white/12 text-white font-semibold transition"
            >
              <Github size={18} /> View Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[linear-gradient(135deg,#7c3aed,#5b21b6)] hover:opacity-95 text-white font-semibold transition"
              >
                <ExternalLink size={18} /> View Live
              </a>
            )}
          </div>
        </div>

        {/* Sticky mobile action bar – guarantees buttons are visible */}
        <div className="sm:hidden sticky bottom-0 inset-x-0 p-3 bg-[#0f1830]/95 backdrop-blur border-t border-white/10">
          <div className={`grid gap-3 ${project.demoUrl ? "grid-cols-2" : "grid-cols-1"}`}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141d35] hover:bg-[#192345] border border-white/12 text-white font-semibold transition"
            >
              <Github size={18} /> View Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[linear-gradient(135deg,#7c3aed,#5b21b6)] hover:opacity-95 text-white font-semibold transition"
              >
                <ExternalLink size={18} /> View Live
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
