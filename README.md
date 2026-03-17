# Vishakha Roy — Portfolio (React + Tailwind)

A modern, animated developer portfolio built with React, Tailwind CSS, and a touch of Three.js (@react-three/fiber + @react-three/drei).
Includes smooth reveal animations, a starfield theme, a Project Details modal with carousel, and a 3D desk scene in the contact section.

## Problem Statement

Developers need a single place to showcase skills, projects, and achievements—clearly and beautifully—while keeping the site fast, responsive, and easy to maintain.

## Feasible Solution

Create a responsive portfolio web app that:

- Highlights skills, experience, education, hackathons, certifications.
- Presents projects in a grid with a detailed Project Details modal (carousel, live demo & code links).
- Uses subtle motion (reveal, flip, slide-in) to guide attention without hurting performance.
- Incorporates a 3D desk scene to add personality while keeping the UI accessible.

## Features

- 🖤 Dark theme with starfield background & glass cards
- 📱 Responsive layout (desktop → tablet → mobile)
- 🧠 Hero with rotating skill headline + avatar tilt effect
- 🏷 Marquee skills strip (same background as hero; no visual gaps)
- 🧩 Sections: Skills, Experience, Education, Projects, Hackathons, Certifications
- 🗂 Projects Grid → click to open Project Details modal
- 🖼 Carousel with arrows + dots (auto-slide)
- ❌ Mobile top Close (X) always visible in modal
- 📌 Sticky bottom CTA ("View Code", "View Live") on mobile
- 📨 Contact with a 3D desk scene (height matches form)
- ♿ Accessibility: focus states, aria labels, Esc to close modal
- 🛠 Config-driven data: update projectsData and section lists easily

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Hooks, functional components) |
| Styling | Tailwind CSS (utility-first) + custom CSS tokens |
| Icons | lucide-react |
| 3D | @react-three/fiber, @react-three/drei |
| Bundler/Dev | Vite |

## Folder Structure

```
portfolio/
├─ public/
│  ├─ Vishu.jpeg                # avatar
│  ├─ WebDeveloper.pdf          # CV 1 (optional)
│  └─ MLresume.pdf              # CV 2 (optional)
├─ src/
│  ├─ components/
│  │  └─ ProjectDetails.tsx     # modal with carousel + mobile sticky CTA
│  ├─ App.jsx                   # main landing page (all sections)
│  ├─ main.jsx                  # React entry
│  └─ index.css                 # Tailwind + custom styles (animations, glass, etc.)
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
└─ package.json
```

> Using JavaScript? Rename `ProjectDetails.tsx` → `ProjectDetails.jsx` and remove TypeScript interfaces.

## Prerequisites

- Node.js 18+ and npm
- (Optional) Git for version control
- (Optional) Place image/PDF assets in `/public`

## Setup & Run

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server (Vite)
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Build & Preview

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Tailwind Setup (Quick Check)

**src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* Your custom CSS (animations, cards, starfield, etc.) */
```

**tailwind.config.js**

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
