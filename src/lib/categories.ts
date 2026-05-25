import { Category } from "@/types/builder";

export const categories: Category[] = [
  // === PERSONAL ===
  { id: "portfolio", name: "Portfolio Website", description: "A personal showcase website to display your work, skills, and achievements", icon: "User", tags: ["personal", "showcase"] },
  { id: "resume-builder", name: "Resume Builder", description: "A tool that helps people create professional resumes and CVs online", icon: "FileText", tags: ["tool", "personal"] },

  // === BUSINESS ===
  { id: "business", name: "Business Website", description: "A professional company website with services, team, and contact pages", icon: "Building2", tags: ["business", "company"] },
  { id: "startup-landing", name: "Startup Landing Page", description: "A high-converting landing page for startups to showcase their product", icon: "Rocket", tags: ["startup", "landing"] },
  { id: "agency", name: "Agency Website", description: "A creative agency website with portfolio, services, and client showcase", icon: "Palette", tags: ["agency", "creative"] },

  // === SAAS & AI ===
  { id: "saas-dashboard", name: "SaaS Dashboard", description: "A complete SaaS application with user dashboard, analytics, and settings", icon: "LayoutDashboard", tags: ["saas", "dashboard"] },
  { id: "ai-tool", name: "AI Tool Website", description: "A website for an AI-powered tool with playground and documentation", icon: "Sparkles", tags: ["ai", "tool"] },
  { id: "prompt-generator", name: "Prompt Generator", description: "A tool that helps users create optimized prompts for AI models", icon: "MessageSquare", tags: ["ai", "tool"] },

  // === ECOMMERCE ===
  { id: "ecommerce", name: "Ecommerce Store", description: "An online store with products, cart, checkout, and payment system", icon: "ShoppingCart", tags: ["ecommerce", "store"] },

  // === EDUCATION ===
  { id: "coaching-class", name: "Coaching Class Website", description: "A website for coaching centers and tuition classes with batches and results", icon: "PenTool", tags: ["education", "coaching"] },
  { id: "college", name: "College Website", description: "A college or university website with courses, faculty, and admissions", icon: "BookOpen", tags: ["education", "college"] },

  // === SPORTS ===
  { id: "football-academy", name: "Football Academy", description: "A website for football academies with training programs, coaches, and schedules", icon: "Trophy", tags: ["sports", "academy"] },
  { id: "gym", name: "Gym Website", description: "A fitness center website with plans, trainers, schedules, and memberships", icon: "Dumbbell", tags: ["fitness", "gym"] },

  // === FOOD ===
  { id: "restaurant", name: "Restaurant Website", description: "A restaurant website with menu, online ordering, and table reservations", icon: "UtensilsCrossed", tags: ["food", "restaurant"] },

  // === HEALTH ===
  { id: "hospital", name: "Hospital Website", description: "A hospital or clinic website with doctors, departments, and patient portal", icon: "Heart", tags: ["health", "hospital"] },
  { id: "appointment-booking", name: "Appointment Booking App", description: "A booking system for appointments with calendar and notifications", icon: "CalendarCheck", tags: ["booking", "health"] },

  // === SERVICES ===
  { id: "real-estate", name: "Real Estate Platform", description: "A property listing website with search, filters, and agent profiles", icon: "Home", tags: ["real-estate", "listing"] },
  { id: "barber-shop", name: "Barber Shop Website", description: "A barber shop website with services, pricing, and online booking", icon: "Scissors", tags: ["services", "booking"] },
  { id: "travel-agency", name: "Travel Agency Website", description: "A travel agency website with tour packages, bookings, and reviews", icon: "Plane", tags: ["travel", "agency"] },

  // === COMMUNITY ===
  { id: "blogging", name: "Blogging Platform", description: "A modern blogging platform with rich editor, comments, and SEO", icon: "Newspaper", tags: ["blog", "content"] },
  { id: "job-portal", name: "Job Portal", description: "A job listing and recruitment platform for employers and job seekers", icon: "Briefcase", tags: ["jobs", "recruitment"] },

  // === RELIGIOUS & NGO ===
  { id: "islamic-website", name: "Islamic Website", description: "A website for Islamic content with prayer times, Quran, and events", icon: "Moon", tags: ["islamic", "religious"] },
  { id: "mosque", name: "Mosque Website", description: "A mosque website with prayer schedules, events, and donation system", icon: "Landmark", tags: ["mosque", "religious"] },
  { id: "ngo", name: "NGO Website", description: "A non-profit organization website with causes, donations, and volunteer signup", icon: "HandHeart", tags: ["ngo", "nonprofit"] },
];
