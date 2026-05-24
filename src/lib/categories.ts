import { Category } from "@/types/builder";

export const categories: Category[] = [
  // === PERSONAL / PORTFOLIO ===
  { id: "portfolio", name: "Portfolio Website", description: "A personal showcase website to display your work, skills, and achievements", icon: "User", tags: ["personal", "showcase"] },
  { id: "resume-builder", name: "Resume Builder", description: "A tool that helps people create professional resumes and CVs online", icon: "FileText", tags: ["tool", "personal"] },

  // === BUSINESS ===
  { id: "business", name: "Business Website", description: "A professional company website with services, team, and contact pages", icon: "Building2", tags: ["business", "company"] },
  { id: "startup-landing", name: "Startup Landing Page", description: "A high-converting landing page for startups to showcase their product", icon: "Rocket", tags: ["startup", "landing"] },
  { id: "agency", name: "Agency Website", description: "A creative agency website with portfolio, services, and client showcase", icon: "Palette", tags: ["agency", "creative"] },
  { id: "mobile-app-landing", name: "Mobile App Landing Page", description: "A beautiful landing page to promote and showcase a mobile app", icon: "Smartphone", tags: ["mobile", "landing"] },

  // === SAAS / TECH ===
  { id: "saas-dashboard", name: "SaaS Dashboard", description: "A complete SaaS application with user dashboard, analytics, and settings", icon: "LayoutDashboard", tags: ["saas", "dashboard"] },
  { id: "ai-startup", name: "AI Startup Website", description: "A futuristic website for AI companies with demos and pricing", icon: "Brain", tags: ["ai", "startup"] },
  { id: "ai-tool", name: "AI Tool Website", description: "A website for an AI-powered tool with playground and documentation", icon: "Sparkles", tags: ["ai", "tool"] },
  { id: "ai-automation", name: "AI Automation Tool", description: "A platform that automates tasks using artificial intelligence", icon: "Zap", tags: ["ai", "automation"] },
  { id: "prompt-generator", name: "Prompt Generator", description: "A tool that helps users create optimized prompts for AI models", icon: "MessageSquare", tags: ["ai", "tool"] },
  { id: "admin-panel", name: "Admin Panel", description: "A powerful admin dashboard to manage users, content, and settings", icon: "Settings", tags: ["admin", "dashboard"] },

  // === ECOMMERCE ===
  { id: "ecommerce", name: "Ecommerce Store", description: "An online store with products, cart, checkout, and payment system", icon: "ShoppingCart", tags: ["ecommerce", "store"] },
  { id: "pos-billing", name: "POS Billing System", description: "A point-of-sale billing system for shops and retail businesses", icon: "CreditCard", tags: ["pos", "billing"] },

  // === EDUCATION ===
  { id: "school-erp", name: "School ERP System", description: "A complete school management system with students, teachers, and attendance", icon: "GraduationCap", tags: ["education", "erp"] },
  { id: "college", name: "College Website", description: "A college or university website with courses, faculty, and admissions", icon: "BookOpen", tags: ["education", "college"] },
  { id: "coaching-class", name: "Coaching Class Website", description: "A website for coaching centers and tuition classes with batches and results", icon: "PenTool", tags: ["education", "coaching"] },
  { id: "online-course", name: "Online Course Platform", description: "A platform to sell and deliver online courses with video lessons", icon: "PlayCircle", tags: ["education", "courses"] },
  { id: "lms", name: "Learning Management System", description: "A complete learning platform with courses, quizzes, and certificates", icon: "Library", tags: ["education", "lms"] },

  // === SPORTS & FITNESS ===
  { id: "football-academy", name: "Football Academy", description: "A website for football academies with training programs, coaches, and schedules", icon: "Trophy", tags: ["sports", "academy"] },
  { id: "gym", name: "Gym Website", description: "A fitness center website with plans, trainers, schedules, and memberships", icon: "Dumbbell", tags: ["fitness", "gym"] },

  // === FOOD & HOSPITALITY ===
  { id: "restaurant", name: "Restaurant Website", description: "A restaurant website with menu, online ordering, and table reservations", icon: "UtensilsCrossed", tags: ["food", "restaurant"] },
  { id: "hotel-booking", name: "Hotel Booking Platform", description: "A hotel booking website with rooms, pricing, and reservation system", icon: "Hotel", tags: ["hospitality", "booking"] },

  // === HEALTH ===
  { id: "hospital", name: "Hospital Website", description: "A hospital or clinic website with doctors, departments, and patient portal", icon: "Heart", tags: ["health", "hospital"] },
  { id: "appointment-booking", name: "Appointment Booking App", description: "A booking system for appointments with calendar and notifications", icon: "CalendarCheck", tags: ["booking", "health"] },

  // === SERVICES ===
  { id: "barber-shop", name: "Barber Shop Website", description: "A barber shop website with services, pricing, and online booking", icon: "Scissors", tags: ["services", "booking"] },
  { id: "real-estate", name: "Real Estate Platform", description: "A property listing website with search, filters, and agent profiles", icon: "Home", tags: ["real-estate", "listing"] },
  { id: "travel-agency", name: "Travel Agency Website", description: "A travel agency website with tour packages, bookings, and reviews", icon: "Plane", tags: ["travel", "agency"] },
  { id: "car-rental", name: "Car Rental Platform", description: "A car rental website with vehicles, pricing, and booking system", icon: "Car", tags: ["rental", "booking"] },
  { id: "event-management", name: "Event Management Platform", description: "A platform to create, manage, and sell tickets for events", icon: "PartyPopper", tags: ["events", "management"] },

  // === COMMUNITY & SOCIAL ===
  { id: "blogging", name: "Blogging Platform", description: "A modern blogging platform with rich editor, comments, and SEO", icon: "Newspaper", tags: ["blog", "content"] },
  { id: "social-media", name: "Social Media App", description: "A social networking application with profiles, posts, and messaging", icon: "Users", tags: ["social", "app"] },
  { id: "dating-app", name: "Dating App", description: "A matchmaking app with profiles, swiping, and messaging features", icon: "HeartHandshake", tags: ["social", "dating"] },
  { id: "job-portal", name: "Job Portal", description: "A job listing and recruitment platform for employers and job seekers", icon: "Briefcase", tags: ["jobs", "recruitment"] },

  // === CRM / HRM ===
  { id: "crm", name: "CRM System", description: "A customer relationship management system to track leads and sales", icon: "Contact", tags: ["crm", "business"] },
  { id: "hrm", name: "HRM Dashboard", description: "A human resource management system with employees, payroll, and leave", icon: "UserCog", tags: ["hrm", "business"] },
  { id: "attendance-system", name: "Attendance System", description: "A digital attendance tracking system with reports and analytics", icon: "ClipboardCheck", tags: ["attendance", "system"] },
  { id: "qr-code-system", name: "QR Code System", description: "A QR code based system for attendance, payments, or access control", icon: "QrCode", tags: ["qr", "system"] },

  // === RELIGIOUS / NGO ===
  { id: "islamic-website", name: "Islamic Website", description: "A website for Islamic content with prayer times, Quran, and events", icon: "Moon", tags: ["islamic", "religious"] },
  { id: "mosque", name: "Mosque Website", description: "A mosque website with prayer schedules, events, and donation system", icon: "Landmark", tags: ["mosque", "religious"] },
  { id: "ngo", name: "NGO Website", description: "A non-profit organization website with causes, donations, and volunteer signup", icon: "HandHeart", tags: ["ngo", "nonprofit"] },

  // === ENTERTAINMENT ===
  { id: "music-streaming", name: "Music Streaming App", description: "A music streaming platform with playlists, artists, and audio player", icon: "Music", tags: ["music", "streaming"] },
  { id: "anime", name: "Anime Website", description: "An anime streaming or community website with catalogs and reviews", icon: "Tv", tags: ["anime", "entertainment"] },
  { id: "ott-platform", name: "OTT Platform", description: "A video streaming platform like Netflix with shows, movies, and subscriptions", icon: "Film", tags: ["ott", "streaming"] },

  // === CRYPTO / WEB3 ===
  { id: "nft-website", name: "NFT Website", description: "An NFT showcase or marketplace with collections and minting features", icon: "Gem", tags: ["nft", "crypto"] },
  { id: "crypto-dashboard", name: "Crypto Dashboard", description: "A cryptocurrency portfolio tracker with charts and market data", icon: "TrendingUp", tags: ["crypto", "dashboard"] },
];
