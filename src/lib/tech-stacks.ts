import { TechStackItem } from "@/types/builder";

export const techStackItems: TechStackItem[] = [
  // Frontend
  { id: "nextjs", name: "Next.js", description: "The best modern framework for fast websites and AI projects — used by Vercel, Netflix, and more", category: "frontend", recommended: true, icon: "Globe" },
  { id: "react", name: "React", description: "The most popular library for building user interfaces — created by Facebook", category: "frontend", recommended: false, icon: "Code" },
  { id: "vue", name: "Vue.js", description: "A beginner-friendly framework that's easy to learn and powerful", category: "frontend", recommended: false, icon: "Hexagon" },
  { id: "astro", name: "Astro", description: "Super fast framework for content-heavy websites and blogs", category: "frontend", recommended: false, icon: "Rocket" },

  // Styling
  { id: "tailwindcss", name: "Tailwind CSS", description: "Easy modern styling system — write styles directly in your HTML using utility classes", category: "styling", recommended: true, icon: "Paintbrush" },
  { id: "css-modules", name: "CSS Modules", description: "Traditional CSS with automatic scoping — each component gets its own styles", category: "styling", recommended: false, icon: "FileCode" },

  // UI Libraries
  { id: "shadcn", name: "Shadcn/UI", description: "Beautiful, reusable components that you own — copy-paste into your project", category: "ui", recommended: true, icon: "Component" },
  { id: "material-ui", name: "Material UI", description: "Google's design system with pre-built components — great for dashboards", category: "ui", recommended: false, icon: "Layers" },
  { id: "chakra-ui", name: "Chakra UI", description: "Simple and accessible component library with great developer experience", category: "ui", recommended: false, icon: "Box" },

  // Animations
  { id: "framer-motion", name: "Framer Motion", description: "The best animation library for React — smooth, professional animations", category: "animations", recommended: true, icon: "Sparkles" },
  { id: "gsap", name: "GSAP", description: "Professional animation library used by top agencies for complex animations", category: "animations", recommended: false, icon: "Wand2" },

  // Backend
  { id: "supabase", name: "Supabase", description: "Easy backend system with database + login + storage — like Firebase but open source", category: "backend", recommended: true, icon: "Database" },
  { id: "firebase", name: "Firebase", description: "Google's backend platform with real-time database, auth, and hosting", category: "backend", recommended: false, icon: "Flame" },
  { id: "appwrite", name: "Appwrite", description: "Open-source backend platform with auth, database, and file storage", category: "backend", recommended: false, icon: "Server" },
  { id: "convex", name: "Convex", description: "Real-time backend that automatically syncs data — great for collaborative apps", category: "backend", recommended: false, icon: "RefreshCw" },

  // Database
  { id: "postgresql", name: "PostgreSQL", description: "The most reliable and powerful database — handles any type of data", category: "database", recommended: true, icon: "Database" },
  { id: "mongodb", name: "MongoDB", description: "Flexible database that stores data like JSON — easy to learn", category: "database", recommended: false, icon: "Leaf" },
  { id: "mysql", name: "MySQL", description: "Classic database used by millions of websites worldwide", category: "database", recommended: false, icon: "Cylinder" },

  // Hosting
  { id: "vercel", name: "Vercel", description: "The best hosting platform for Next.js — deploy with one click", category: "hosting", recommended: true, icon: "Triangle" },
  { id: "netlify", name: "Netlify", description: "Easy hosting with automatic deployments from GitHub", category: "hosting", recommended: false, icon: "Globe" },
  { id: "railway", name: "Railway", description: "Simple cloud hosting for full-stack apps with databases", category: "hosting", recommended: false, icon: "Train" },

  // Storage
  { id: "cloudinary", name: "Cloudinary", description: "Cloud storage for images and videos with automatic optimization", category: "storage", recommended: true, icon: "Cloud" },
  { id: "uploadthing", name: "UploadThing", description: "Simple file uploads for Next.js — easy to set up and use", category: "storage", recommended: false, icon: "Upload" },

  // State Management
  { id: "zustand", name: "Zustand", description: "Simple and fast state management — stores your app's data in memory", category: "state", recommended: true, icon: "Package" },
  { id: "redux", name: "Redux Toolkit", description: "Powerful state management for large apps — industry standard", category: "state", recommended: false, icon: "GitBranch" },

  // Forms
  { id: "react-hook-form", name: "React Hook Form", description: "The fastest way to build forms in React — handles validation and errors", category: "forms", recommended: true, icon: "FormInput" },

  // Validation
  { id: "zod", name: "Zod", description: "TypeScript-first data validation — makes sure data is correct before using it", category: "validation", recommended: true, icon: "Shield" },

  // Charts
  { id: "recharts", name: "Recharts", description: "Beautiful charts and graphs for dashboards — easy to customize", category: "charts", recommended: true, icon: "BarChart" },
  { id: "chart-js", name: "Chart.js", description: "Popular chart library with many chart types — flexible and lightweight", category: "charts", recommended: false, icon: "PieChart" },
];

export const techStackCategoryLabels: Record<string, string> = {
  frontend: "🖥️ Frontend Framework",
  styling: "🎨 Styling System",
  ui: "🧩 UI Component Library",
  animations: "✨ Animation Library",
  backend: "⚙️ Backend / BaaS",
  database: "🗄️ Database",
  hosting: "🚀 Hosting Platform",
  storage: "☁️ File Storage",
  state: "📦 State Management",
  forms: "📝 Form Library",
  validation: "🛡️ Validation",
  charts: "📊 Charts & Graphs",
};
