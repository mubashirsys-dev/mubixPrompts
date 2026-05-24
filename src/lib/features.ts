import { Feature, PresetPack } from "@/types/builder";

export const features: Feature[] = [
  // === AUTHENTICATION ===
  { id: "google-login", name: "Google Login", description: "Let users sign in with their Google account (one-click login)", complexity: "easy", recommended: true, category: "authentication" },
  { id: "otp-login", name: "OTP Login", description: "Login using a one-time password sent to phone or email", complexity: "medium", recommended: false, category: "authentication" },
  { id: "email-login", name: "Email & Password Login", description: "Traditional login with email address and password", complexity: "easy", recommended: true, category: "authentication" },
  { id: "clerk-auth", name: "Clerk Authentication", description: "Complete authentication system with beautiful pre-built login pages", complexity: "easy", recommended: true, category: "authentication" },
  { id: "firebase-auth", name: "Firebase Auth", description: "Google's authentication system with multiple login options", complexity: "easy", recommended: false, category: "authentication" },

  // === PAYMENTS ===
  { id: "razorpay", name: "Razorpay Payments", description: "Best payment gateway for Indian businesses (UPI, cards, wallets)", complexity: "medium", recommended: true, category: "payments" },
  { id: "stripe", name: "Stripe Subscriptions", description: "International payment system for global businesses & SaaS products", complexity: "medium", recommended: true, category: "payments" },
  { id: "phonepe", name: "PhonePe / UPI", description: "Popular UPI payment integration for Indian users", complexity: "medium", recommended: false, category: "payments" },
  { id: "subscription-billing", name: "Subscription Billing", description: "Recurring billing system for monthly/yearly plans", complexity: "advanced", recommended: true, category: "payments" },

  // === DASHBOARDS ===
  { id: "admin-panel", name: "Admin Control Center", description: "A dashboard for site owners to manage everything", complexity: "advanced", recommended: true, category: "dashboards" },
  { id: "user-dashboard", name: "User Dashboard", description: "A personal area where users can manage their account and data", complexity: "medium", recommended: true, category: "dashboards" },
  { id: "coach-panel", name: "Coach / Instructor Panel", description: "A dashboard for coaches or teachers to manage schedules and material", complexity: "medium", recommended: false, category: "dashboards" },
  { id: "player-panel", name: "Player / Student Panel", description: "A dashboard for players or students to track sessions and training", complexity: "medium", recommended: false, category: "dashboards" },
  { id: "parent-dashboard", name: "Parent Monitor Panel", description: "A dashboard for parents to track progress and pay academy fees", complexity: "medium", recommended: false, category: "dashboards" },

  // === ADVANCED FEATURES ===
  { id: "qr-attendance", name: "QR Code Attendance System", description: "Scan dynamic QR codes to track attendance automatically", complexity: "advanced", recommended: false, category: "advanced" },
  { id: "ai-chatbot", name: "AI Chatbot Assistant", description: "An intelligent chatbot that answers questions automatically", complexity: "advanced", recommended: true, category: "advanced" },
  { id: "push-notifications", name: "Push Notifications System", description: "Send instant desktop alerts and notifications to users", complexity: "medium", recommended: true, category: "advanced" },
  { id: "cms", name: "CMS (Content Management)", description: "Easily publish and edit pages/sections without code", complexity: "advanced", recommended: true, category: "advanced" },
  { id: "blog-system", name: "Rich Blog System", description: "Publish articles with tags, categories, and SEO-meta settings", complexity: "medium", recommended: true, category: "advanced" },
  { id: "seo", name: "SEO Optimization Engine", description: "Comprehensive SEO, meta tags, OpenGraph, sitemaps, JSON-LD", complexity: "medium", recommended: true, category: "advanced" },
  { id: "analytics", name: "Analytics Dashboard", description: "Track visitors, page views, and user behavior with charts", complexity: "medium", recommended: true, category: "advanced" },
  { id: "booking-system", name: "Online Booking System", description: "Interactive appointment scheduling and reservation calendar", complexity: "advanced", recommended: false, category: "advanced" },
  { id: "whatsapp", name: "WhatsApp Notifications", description: "Send automated updates, alerts, and notifications through WhatsApp API", complexity: "easy", recommended: true, category: "advanced" },
  { id: "role-access", name: "Role-Based Access Control", description: "Strict permission levels for admins, editors, and regular users", complexity: "advanced", recommended: true, category: "advanced" },
  { id: "dark-mode", name: "Dark Mode Toggle", description: "Smooth transition between light and dark themes", complexity: "easy", recommended: true, category: "advanced" },
  { id: "file-upload", name: "Secure File Uploads", description: "Let users upload images and files safely into object storage", complexity: "medium", recommended: true, category: "advanced" },
  { id: "testimonials", name: "Testimonials Showcase", description: "Display positive ratings, comments, and reviews", complexity: "easy", recommended: true, category: "advanced" },
  { id: "contact-forms", name: "Contact Inquiry Forms", description: "Inquiry forms that send email alerts and store data in DB", complexity: "easy", recommended: true, category: "advanced" },
  { id: "newsletter", name: "Newsletter Subscription", description: "Collect email leads for marketing lists", complexity: "easy", recommended: true, category: "advanced" },
];

export const featureCategoryLabels: Record<string, string> = {
  authentication: "🔐 Authentication (Login & Signup)",
  payments: "💳 Payments & Billing",
  dashboards: "📊 Dashboards & Panels",
  advanced: "⚡ Advanced Features",
};

// ============================================
// SMART FEATURE FILTERING MAP
// ============================================
export const categoryFeaturesMap: Record<string, string[]> = {
  portfolio: [
    "contact-forms",
    "testimonials",
    "seo",
    "dark-mode",
    "blog-system",
    "file-upload",
    "analytics",
    "newsletter",
  ],
  "resume-builder": [
    "email-login",
    "google-login",
    "user-dashboard",
    "file-upload",
    "seo",
    "dark-mode",
  ],
  business: [
    "contact-forms",
    "testimonials",
    "seo",
    "blog-system",
    "newsletter",
    "analytics",
    "cms",
  ],
  "startup-landing": [
    "contact-forms",
    "testimonials",
    "seo",
    "newsletter",
    "analytics",
    "ai-chatbot",
    "push-notifications",
  ],
  agency: [
    "contact-forms",
    "testimonials",
    "seo",
    "blog-system",
    "newsletter",
    "analytics",
    "cms",
    "file-upload",
  ],
  "saas-dashboard": [
    "clerk-auth",
    "google-login",
    "email-login",
    "stripe",
    "subscription-billing",
    "user-dashboard",
    "admin-panel",
    "analytics",
    "seo",
    "dark-mode",
    "file-upload",
    "role-access",
    "ai-chatbot",
  ],
  "football-academy": [
    "email-login",
    "user-dashboard",
    "coach-panel",
    "player-panel",
    "parent-dashboard",
    "qr-attendance",
    "razorpay",
    "phonepe",
    "whatsapp",
    "booking-system",
    "testimonials",
    "contact-forms",
  ],
  ecommerce: [
    "email-login",
    "google-login",
    "razorpay",
    "stripe",
    "user-dashboard",
    "admin-panel",
    "file-upload",
    "seo",
    "analytics",
    "testimonials",
    "contact-forms",
    "newsletter",
  ],
  "islamic-website": [
    "seo",
    "dark-mode",
    "blog-system",
    "cms",
    "analytics",
    "newsletter",
    "contact-forms",
  ],
  mosque: [
    "razorpay",
    "phonepe",
    "seo",
    "blog-system",
    "cms",
    "newsletter",
    "contact-forms",
  ],
};

// Returns filtered features for category. Fallback to all if category has no explicit map.
export function getSmartFeatures(categoryId: string | null | undefined): Feature[] {
  if (!categoryId) return features;
  const allowedIds = categoryFeaturesMap[categoryId];
  if (!allowedIds) return features;
  return features.filter((f) => allowedIds.includes(f.id));
}

// ============================================
// COMMUNITY PROMPT PRESET PACKS
// ============================================
export const presetPacks: PresetPack[] = [
  {
    id: "netflix-clone",
    name: "Netflix Clone OTT Platform",
    description: "High-performance video streaming app with subscription layers",
    category: "ott-platform",
    designStyle: "ai-futuristic",
    features: ["clerk-auth", "stripe", "subscription-billing", "user-dashboard", "admin-panel", "dark-mode", "file-upload"],
    techStack: ["nextjs", "tailwindcss", "shadcn-ui", "framer-motion", "supabase", "stripe-sdk", "clerk-sdk", "zod", "zustand"],
    codingLevel: "junior",
    brand: { logoType: "Typography", brandPersonality: "Premium" },
    apis: ["stripe", "clerk", "supabase"],
  },
  {
    id: "modern-portfolio",
    name: "Elite Developer Portfolio",
    description: "Neo-brutalist custom portfolio website to attract premium remote clients",
    category: "portfolio",
    designStyle: "brutalist",
    features: ["contact-forms", "testimonials", "seo", "dark-mode", "blog-system", "analytics"],
    techStack: ["nextjs", "tailwindcss", "framer-motion", "zod"],
    codingLevel: "non-technical",
    brand: { logoType: "Minimal", brandPersonality: "Minimal" },
    apis: [],
  },
  {
    id: "ai-saas",
    name: "PromptCraft AI Tool SaaS",
    description: "AI-powered text generation platform with credits, usage statistics, and Stripe paywalls",
    category: "saas-dashboard",
    designStyle: "ai-futuristic",
    features: ["clerk-auth", "google-login", "stripe", "subscription-billing", "user-dashboard", "admin-panel", "analytics", "seo", "ai-chatbot", "file-upload"],
    techStack: ["nextjs", "tailwindcss", "shadcn-ui", "framer-motion", "supabase", "stripe-sdk", "clerk-sdk", "zod", "zustand"],
    codingLevel: "senior",
    brand: { logoType: "AI", brandPersonality: "Futuristic" },
    apis: ["supabase", "stripe", "clerk"],
  },
  {
    id: "football-erp",
    name: "Apex Football Academy ERP",
    description: "All-in-one management ERP with QR attendance, coach panel, player profile tracking, and WhatsApp notifications",
    category: "football-academy",
    designStyle: "sports-elite",
    features: ["email-login", "user-dashboard", "coach-panel", "player-panel", "parent-dashboard", "qr-attendance", "razorpay", "whatsapp", "booking-system"],
    techStack: ["nextjs", "tailwindcss", "shadcn-ui", "framer-motion", "supabase", "zod"],
    codingLevel: "senior",
    brand: { logoType: "Sports", brandPersonality: "Sports" },
    apis: ["supabase"],
  },
  {
    id: "barber-shop",
    name: "Gentlemens Cut Booking System",
    description: "High-conversion barber portal with custom stylist calendar, dynamic bookings, and testimonials",
    category: "barber-shop",
    designStyle: "luxury-black",
    features: ["booking-system", "contact-forms", "testimonials", "seo", "dark-mode"],
    techStack: ["nextjs", "tailwindcss", "framer-motion"],
    codingLevel: "beginner",
    brand: { logoType: "Monogram", brandPersonality: "Luxury" },
    apis: [],
  },
  {
    id: "islamic-center",
    name: "Al-Huda Mosque & NGO Center",
    description: "Mosque organization portal showing dynamic prayer timetables, NGO donations, and volunteer news feeds",
    category: "mosque",
    designStyle: "swiss-design",
    features: ["razorpay", "phonepe", "seo", "blog-system", "cms", "contact-forms"],
    techStack: ["nextjs", "tailwindcss", "framer-motion", "supabase"],
    codingLevel: "beginner",
    brand: { logoType: "Mascot", brandPersonality: "Islamic" },
    apis: ["supabase"],
  },
];
