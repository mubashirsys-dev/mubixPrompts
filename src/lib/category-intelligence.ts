// ============================================================
// MubixPrompts — Category Intelligence Engine
// SMART ADAPTIVE: Dynamic section/feature/content injection
// ============================================================

import { ComplexityTier } from "@/types/builder";

// ============================================
// CATEGORY → DEFAULT COMPLEXITY TIER
// ============================================
export const categoryComplexityDefaults: Record<string, ComplexityTier> = {
  // Simple by default — static landing pages
  "portfolio": "simple",
  "resume-builder": "simple",
  "startup-landing": "simple",
  "mobile-app-landing": "simple",
  "barber-shop": "simple",

  // Standard by default — multi-section responsive sites
  "business": "standard",
  "agency": "standard",
  "college": "standard",
  "coaching-class": "standard",
  "restaurant": "standard",
  "gym": "standard",
  "football-academy": "standard",
  "hotel-booking": "standard",
  "hospital": "standard",
  "travel-agency": "standard",
  "car-rental": "standard",
  "event-management": "standard",
  "blogging": "standard",
  "islamic-website": "standard",
  "mosque": "standard",
  "ngo": "standard",
  "anime": "standard",
  "real-estate": "standard",

  // Advanced by default — auth + APIs + database
  "ai-startup": "advanced",
  "ai-tool": "advanced",
  "ai-automation": "advanced",
  "ecommerce": "advanced",
  "online-course": "advanced",
  "appointment-booking": "advanced",
  "job-portal": "advanced",
  "music-streaming": "advanced",
  "dating-app": "advanced",
  "nft-website": "advanced",
  "crypto-dashboard": "advanced",
  "pos-billing": "advanced",
  "prompt-generator": "advanced",

  // Enterprise by default — full SaaS architecture
  "saas-dashboard": "enterprise",
  "admin-panel": "enterprise",
  "school-erp": "enterprise",
  "lms": "enterprise",
  "crm": "enterprise",
  "hrm": "enterprise",
  "attendance-system": "enterprise",
  "qr-code-system": "enterprise",
  "social-media": "enterprise",
  "ott-platform": "enterprise",
};

// ============================================
// CATEGORY → SECTION SEQUENCE MAP (full list)
// ============================================
export const categorySectionsMap: Record<string, string[]> = {
  // === PERSONAL / PORTFOLIO ===
  "portfolio": ["Hero", "About Me", "Skills", "Featured Projects", "Experience", "Testimonials", "Contact", "Footer"],
  "resume-builder": ["Profile Info", "Experience Timeline", "Skills Details", "Education", "Certificates", "Projects Details", "Contact Card"],

  // === BUSINESS ===
  "business": ["Hero", "Services", "About Company", "Team", "Pricing", "Testimonials", "FAQ", "Contact", "Footer"],
  "startup-landing": ["Hero", "Problem Statement", "Solution", "Features Grid", "How It Works", "Social Proof", "Pricing", "FAQ", "CTA Section", "Footer"],
  "agency": ["Hero", "Services", "Case Studies", "Team", "Process", "Testimonials", "Clients", "Contact", "Footer"],
  "mobile-app-landing": ["Hero", "App Screenshots", "Features", "How It Works", "Testimonials", "Download CTA", "Pricing", "FAQ", "Footer"],

  // === SAAS / TECH ===
  "saas-dashboard": ["Hero", "Features Grid", "Dashboard Preview", "Pricing", "Integrations", "Testimonials", "FAQ", "CTA Section", "Footer"],
  "ai-startup": ["Hero", "AI Demo", "Features Grid", "Use Cases", "Pricing", "Testimonials", "FAQ", "CTA Section", "Footer"],
  "ai-tool": ["Hero", "Playground Preview", "Features", "API Docs Preview", "Pricing", "Testimonials", "FAQ", "Footer"],
  "ai-automation": ["Hero", "Workflow Builder Preview", "Integrations", "Features", "Pricing", "Use Cases", "FAQ", "Footer"],
  "prompt-generator": ["Hero", "Generator Preview", "Templates", "Features", "Pricing", "FAQ", "Footer"],
  "admin-panel": ["Hero", "Dashboard Preview", "Features Grid", "Modules", "Pricing", "FAQ", "Footer"],

  // === ECOMMERCE ===
  "ecommerce": ["Hero", "Featured Products", "Categories Grid", "Deals & Offers", "Testimonials", "Newsletter", "Footer"],
  "pos-billing": ["Hero", "Features Grid", "Dashboard Preview", "Pricing", "Testimonials", "FAQ", "Footer"],

  // === EDUCATION ===
  "school-erp": ["Hero", "Modules Overview", "Dashboard Preview", "Features", "Pricing", "Testimonials", "FAQ", "Footer"],
  "college": ["Hero", "About", "Courses", "Faculty", "Campus Gallery", "Admissions", "Events", "Contact", "Footer"],
  "coaching-class": ["Hero", "About", "Batches", "Results", "Faculty", "Testimonials", "Fee Structure", "Contact", "Footer"],
  "online-course": ["Hero", "Featured Courses", "Categories", "Instructor Spotlight", "Testimonials", "Pricing", "FAQ", "Footer"],
  "lms": ["Hero", "Features Grid", "Course Preview", "Dashboard Preview", "Pricing", "Testimonials", "FAQ", "Footer"],

  // === SPORTS & FITNESS ===
  "football-academy": ["Hero", "About", "Programs", "Coaches", "Gallery", "Schedule", "Fees", "Testimonials", "Contact", "Footer"],
  "gym": ["Hero", "About", "Plans & Pricing", "Trainers", "Schedule", "Gallery", "Testimonials", "Contact", "Footer"],

  // === FOOD & HOSPITALITY ===
  "restaurant": ["Hero", "Menu", "Chef Specials", "Reservation", "Gallery", "Reviews", "Location", "Contact"],
  "hotel-booking": ["Hero", "Rooms & Suites", "Amenities", "Gallery", "Booking Widget", "Testimonials", "Contact", "Footer"],

  // === HEALTH ===
  "hospital": ["Hero", "Departments", "Doctors", "Services", "Patient Portal Preview", "Testimonials", "Contact", "Footer"],
  "appointment-booking": ["Hero", "How It Works", "Features", "Calendar Preview", "Pricing", "Testimonials", "FAQ", "Footer"],

  // === SERVICES ===
  "barber-shop": ["Hero", "Services & Pricing", "Barbers", "Gallery", "Booking", "Testimonials", "Contact", "Footer"],
  "real-estate": ["Hero", "Featured Listings", "Search & Filters", "Agent Profiles", "Testimonials", "Contact", "Footer"],
  "travel-agency": ["Hero", "Popular Destinations", "Tour Packages", "Gallery", "Reviews", "Booking", "Contact", "Footer"],
  "car-rental": ["Hero", "Vehicle Fleet", "How It Works", "Pricing", "Testimonials", "FAQ", "Contact", "Footer"],
  "event-management": ["Hero", "Services", "Past Events Gallery", "How It Works", "Testimonials", "Booking", "Contact", "Footer"],

  // === COMMUNITY & SOCIAL ===
  "blogging": ["Featured Post", "Latest Articles", "Categories", "Author Section", "Newsletter", "Footer"],
  "social-media": ["Hero", "Features Grid", "App Preview", "How It Works", "Download CTA", "Footer"],
  "dating-app": ["Hero", "How It Works", "Features", "Success Stories", "Download CTA", "FAQ", "Footer"],
  "job-portal": ["Hero", "Featured Jobs", "Categories", "For Employers", "For Job Seekers", "Testimonials", "Footer"],

  // === CRM / HRM ===
  "crm": ["Hero", "Features Grid", "Dashboard Preview", "Integrations", "Pricing", "Testimonials", "FAQ", "Footer"],
  "hrm": ["Hero", "Modules Overview", "Dashboard Preview", "Features", "Pricing", "FAQ", "Footer"],
  "attendance-system": ["Hero", "How It Works", "Features", "Dashboard Preview", "Pricing", "FAQ", "Footer"],
  "qr-code-system": ["Hero", "How It Works", "Use Cases", "Features", "Pricing", "FAQ", "Footer"],

  // === RELIGIOUS / NGO ===
  "islamic-website": ["Hero", "Prayer Times", "Quran Section", "Articles", "Events", "Donation", "Contact", "Footer"],
  "mosque": ["Hero", "Prayer Schedule", "About", "Events", "Donation", "Volunteer Signup", "Contact", "Footer"],
  "ngo": ["Hero", "Our Cause", "Impact Stats", "Programs", "Donation", "Volunteer Signup", "Gallery", "Contact", "Footer"],

  // === ENTERTAINMENT ===
  "music-streaming": ["Hero", "Trending Tracks", "Playlists", "Artists", "Pricing", "Download CTA", "Footer"],
  "anime": ["Hero", "Trending Anime", "Categories", "Community", "Newsletter", "Footer"],
  "ott-platform": ["Hero", "Trending Shows", "Categories", "Pricing Plans", "Device Support", "FAQ", "Footer"],

  // === CRYPTO / WEB3 ===
  "nft-website": ["Hero", "Featured Collections", "Marketplace Preview", "How It Works", "Artists", "FAQ", "Footer"],
  "crypto-dashboard": ["Hero", "Market Overview", "Portfolio Preview", "Features", "Pricing", "FAQ", "Footer"],
};

// ============================================
// CATEGORY → AUTO-ENABLED FEATURES (full list)
// ============================================
export const categoryAutoFeatures: Record<string, string[]> = {
  "portfolio": ["contact-forms", "testimonials", "seo", "dark-mode", "analytics"],
  "resume-builder": ["email-login", "google-login", "user-dashboard", "file-upload", "seo", "dark-mode"],
  "business": ["contact-forms", "testimonials", "seo", "blog-system", "newsletter", "analytics"],
  "startup-landing": ["contact-forms", "seo", "newsletter", "analytics"],
  "agency": ["contact-forms", "testimonials", "seo", "blog-system", "newsletter", "analytics", "file-upload"],
  "mobile-app-landing": ["contact-forms", "seo", "newsletter", "analytics"],
  "saas-dashboard": ["clerk-auth", "google-login", "stripe", "subscription-billing", "user-dashboard", "admin-panel", "analytics", "seo", "dark-mode", "role-access"],
  "ai-startup": ["contact-forms", "seo", "newsletter", "analytics", "dark-mode"],
  "ai-tool": ["clerk-auth", "stripe", "user-dashboard", "analytics", "seo", "dark-mode", "ai-chatbot"],
  "ai-automation": ["clerk-auth", "stripe", "user-dashboard", "analytics", "seo", "dark-mode"],
  "prompt-generator": ["clerk-auth", "user-dashboard", "seo", "dark-mode", "analytics"],
  "admin-panel": ["email-login", "admin-panel", "role-access", "analytics", "dark-mode"],
  "ecommerce": ["email-login", "google-login", "razorpay", "stripe", "user-dashboard", "admin-panel", "file-upload", "seo", "analytics", "newsletter"],
  "pos-billing": ["email-login", "admin-panel", "razorpay", "analytics"],
  "school-erp": ["email-login", "admin-panel", "user-dashboard", "role-access", "analytics", "push-notifications"],
  "college": ["contact-forms", "seo", "blog-system", "newsletter", "analytics"],
  "coaching-class": ["contact-forms", "testimonials", "seo", "whatsapp", "analytics"],
  "online-course": ["clerk-auth", "stripe", "user-dashboard", "admin-panel", "file-upload", "seo", "analytics"],
  "lms": ["email-login", "user-dashboard", "admin-panel", "file-upload", "seo", "analytics", "role-access"],
  "football-academy": ["contact-forms", "testimonials", "seo", "whatsapp", "analytics"],
  "gym": ["contact-forms", "booking-system", "testimonials", "seo", "razorpay"],
  "restaurant": ["contact-forms", "booking-system", "testimonials", "seo", "whatsapp"],
  "hotel-booking": ["booking-system", "stripe", "razorpay", "seo", "analytics", "testimonials"],
  "hospital": ["contact-forms", "booking-system", "seo", "analytics"],
  "appointment-booking": ["booking-system", "push-notifications", "seo", "analytics", "whatsapp"],
  "barber-shop": ["booking-system", "contact-forms", "testimonials", "seo", "dark-mode"],
  "real-estate": ["contact-forms", "seo", "analytics", "file-upload", "newsletter"],
  "travel-agency": ["booking-system", "contact-forms", "testimonials", "seo", "analytics"],
  "car-rental": ["booking-system", "stripe", "razorpay", "seo", "analytics"],
  "event-management": ["booking-system", "stripe", "razorpay", "file-upload", "seo", "analytics"],
  "blogging": ["seo", "blog-system", "cms", "newsletter", "analytics", "dark-mode"],
  "social-media": ["email-login", "google-login", "user-dashboard", "file-upload", "push-notifications", "analytics"],
  "dating-app": ["email-login", "google-login", "user-dashboard", "push-notifications", "file-upload"],
  "job-portal": ["email-login", "google-login", "user-dashboard", "admin-panel", "seo", "analytics", "newsletter"],
  "crm": ["email-login", "admin-panel", "user-dashboard", "role-access", "analytics", "dark-mode"],
  "hrm": ["email-login", "admin-panel", "user-dashboard", "role-access", "analytics"],
  "attendance-system": ["email-login", "qr-attendance", "admin-panel", "analytics"],
  "qr-code-system": ["email-login", "qr-attendance", "admin-panel", "analytics"],
  "islamic-website": ["seo", "dark-mode", "blog-system", "cms", "analytics", "newsletter"],
  "mosque": ["razorpay", "seo", "blog-system", "cms", "newsletter", "contact-forms"],
  "ngo": ["razorpay", "stripe", "seo", "blog-system", "newsletter", "contact-forms", "analytics"],
  "music-streaming": ["clerk-auth", "stripe", "user-dashboard", "dark-mode", "analytics"],
  "anime": ["seo", "dark-mode", "newsletter", "analytics", "blog-system"],
  "ott-platform": ["clerk-auth", "stripe", "subscription-billing", "user-dashboard", "admin-panel", "dark-mode", "analytics"],
  "nft-website": ["clerk-auth", "dark-mode", "seo", "analytics"],
  "crypto-dashboard": ["clerk-auth", "user-dashboard", "dark-mode", "analytics", "seo"],
};

// ============================================
// COMPLEXITY-GATED SECTIONS
// Returns only sections appropriate for the complexity tier
// ============================================
const enterpriseOnlySections = new Set([
  "Dashboard Preview", "Admin Panel", "Modules Overview", "Integrations",
  "API Docs Preview", "Workflow Builder Preview"
]);

const advancedOnlySections = new Set([
  "Pricing", "Pricing Plans", "Plans & Pricing", "Fee Structure",
  "Fees", "Builder Preview", "Generator Preview",
  "Calendar Preview", "Patient Portal Preview", "Booking Widget",
  "Course Preview", "Marketplace Preview", "Portfolio Preview",
  ...enterpriseOnlySections
]);

const standardExcludeSections = new Set([
  ...advancedOnlySections,
]);

export function getComplexityGatedSections(categoryId: string | null, complexity: string): string[] {
  if (!categoryId) return ["Hero", "About", "Contact", "Footer"];
  const full = categorySectionsMap[categoryId] || ["Hero", "About", "Services", "Testimonials", "Contact", "Footer"];

  switch (complexity) {
    case "simple":
      // Only essential landing page sections (max ~6)
      if (categoryId === "portfolio") return full;
      return full.filter(s =>
        !standardExcludeSections.has(s) &&
        !["Stats Counter", "Newsletter", "Case Studies", "Resume Timeline", "Tech Stack"].includes(s)
      ).slice(0, 6);

    case "standard":
      // Full section list minus advanced/enterprise features
      return full.filter(s => !advancedOnlySections.has(s));

    case "advanced":
      // Everything except enterprise-only
      return full.filter(s => !enterpriseOnlySections.has(s));

    case "enterprise":
    default:
      return full;
  }
}

// ============================================
// COMPLEXITY-GATED FEATURES
// Returns only features available at a given tier
// ============================================
const simpleFeatures = new Set([
  "contact-forms", "testimonials", "seo", "dark-mode", "analytics", "newsletter"
]);

const standardFeatures = new Set([
  ...simpleFeatures,
  "blog-system", "cms", "file-upload", "booking-system", "whatsapp",
  "push-notifications", "github-integration", "waitlist"
]);

const advancedFeatures = new Set([
  ...standardFeatures,
  "email-login", "google-login", "clerk-auth", "firebase-auth", "otp-login",
  "razorpay", "stripe", "phonepe", "subscription-billing",
  "user-dashboard", "ai-chatbot", "api-docs", "resume-upload"
]);

// Enterprise = everything
const enterpriseFeatures = new Set([
  ...advancedFeatures,
  "admin-panel", "coach-panel", "player-panel", "parent-dashboard",
  "qr-attendance", "role-access"
]);

export function getComplexityGatedFeatures(categoryId: string | null, complexity: string): string[] {
  const autoFeatures = categoryId ? (categoryAutoFeatures[categoryId] || []) : [];

  let allowedSet: Set<string>;
  switch (complexity) {
    case "simple": allowedSet = simpleFeatures; break;
    case "standard": allowedSet = standardFeatures; break;
    case "advanced": allowedSet = advancedFeatures; break;
    case "enterprise": default: allowedSet = enterpriseFeatures; break;
  }

  // Return category auto-features that are within the complexity tier
  return autoFeatures.filter(f => allowedSet.has(f));
}

export function getAllAllowedFeatureIds(complexity: string): Set<string> {
  switch (complexity) {
    case "simple": return simpleFeatures;
    case "standard": return standardFeatures;
    case "advanced": return advancedFeatures;
    case "enterprise": default: return enterpriseFeatures;
  }
}

// ============================================
// SMART RECOMMENDATIONS ENGINE
// ============================================
export interface SmartRecommendation {
  label: string;
  featureIds: string[];
  reason: string;
}

export function getSmartRecommendations(
  categoryId: string | null | undefined,
  codingLevel: string,
  selectedFeatures: string[],
  complexity: string
): SmartRecommendation[] {
  const recs: SmartRecommendation[] = [];
  if (!categoryId) return recs;

  const catRecs: Record<string, SmartRecommendation> = {
    "portfolio": { label: "Portfolio Essentials", featureIds: ["contact-forms", "seo", "dark-mode", "testimonials", "analytics"], reason: "Core features for attracting clients and showcasing work" },
    "saas-dashboard": { label: "SaaS Launch Stack", featureIds: ["clerk-auth", "stripe", "subscription-billing", "admin-panel", "analytics", "role-access"], reason: "Complete billing + auth + admin for SaaS launches" },
    "football-academy": { label: "Academy Showcase", featureIds: ["contact-forms", "testimonials", "seo", "whatsapp", "analytics"], reason: "Attract new students with professional online presence" },
    "ecommerce": { label: "Ecommerce Ready", featureIds: ["stripe", "razorpay", "admin-panel", "user-dashboard", "seo", "analytics"], reason: "Complete store with payments, inventory, and analytics" },
    "agency": { label: "Agency Showcase", featureIds: ["contact-forms", "testimonials", "blog-system", "seo", "analytics", "file-upload"], reason: "Portfolio + content marketing for agencies" },
    "restaurant": { label: "Restaurant Online", featureIds: ["booking-system", "contact-forms", "testimonials", "seo", "whatsapp"], reason: "Online ordering, reservations, and social proof" },
  };

  if (catRecs[categoryId]) {
    // Filter recommendations by complexity tier
    const allowed = getAllAllowedFeatureIds(complexity);
    const rec = catRecs[categoryId];
    const filtered = rec.featureIds.filter(id => allowed.has(id) && !selectedFeatures.includes(id));
    if (filtered.length > 0) {
      recs.push({ ...rec, featureIds: filtered });
    }
  }

  return recs;
}

// ============================================
// CATEGORY → PROMPT RULES (DO/DON'T)
// This is the CRITICAL anti-bloat system
// ============================================
export function getCategoryPromptRules(categoryId: string, complexity: string): { doRules: string[]; dontRules: string[] } {
  const doRules: string[] = [];
  const dontRules: string[] = [];

  // Universal DO NOT rules for Simple/Standard
  if (complexity === "simple" || complexity === "standard") {
    dontRules.push(
      "DO NOT generate any authentication or login systems",
      "DO NOT generate any payment processing, billing, or subscription systems",
      "DO NOT generate any admin panels or admin dashboards",
      "DO NOT generate any database schemas or SQL tables",
      "DO NOT generate any API endpoints or route handlers",
      "DO NOT generate any middleware or JWT/session handling",
      "DO NOT generate any user dashboards or account management",
      "DO NOT generate any fake metrics, analytics dashboards, or telemetry",
      "DO NOT generate any enterprise features, monitoring, or diagnostics",
      "DO NOT generate any role-based access control systems"
    );
    doRules.push(
      "DO generate a clean, static, responsive website",
      "DO use localStorage for any simple client-side state if needed",
      "DO focus on visual quality, animations, and responsive design"
    );
  }

  // Category-specific rules
  switch (categoryId) {
    case "portfolio":
      doRules.push(
        "DO generate a personal brand narrative with real professional sections",
        "DO include: Hero with name/title, About/Bio, Skills grid, Projects showcase, Resume timeline, Contact form, Social links",
        "DO make the portfolio feel personal, creative, and visually striking",
        "DO generate realistic placeholder data for a professional developer if no resume is uploaded"
      );
      dontRules.push(
        "DO NOT generate pricing tables or subscription plans",
        "DO NOT generate SaaS-style feature comparison grids",
        "DO NOT generate company/business focused content — this is PERSONAL",
        "DO NOT generate fake enterprise credentials or API key fields"
      );
      break;

    case "business":
    case "agency":
      doRules.push(
        "DO generate professional company/agency narrative",
        "DO include: Services, Team, Process, Client testimonials, Contact"
      );
      if (complexity !== "enterprise") {
        dontRules.push(
          "DO NOT generate SaaS subscription systems",
          "DO NOT generate user dashboards or account management"
        );
      }
      break;

    case "startup-landing":
    case "mobile-app-landing":
      doRules.push(
        "DO generate a high-conversion landing page",
        "DO focus on clear value proposition, social proof, and CTA",
        "DO include waitlist/signup form"
      );
      dontRules.push(
        "DO NOT generate a full application — this is a LANDING PAGE",
        "DO NOT generate admin panels or complex backend systems"
      );
      break;

    case "restaurant":
      doRules.push(
        "DO generate a restaurant-specific website with menu, hours, and ambiance",
        "DO include: Menu with categories and prices, Gallery, Reservations form, Location/Map",
        "DO make the food photography and ambiance feel premium"
      );
      dontRules.push(
        "DO NOT generate SaaS features, dashboards, or subscription billing",
        "DO NOT generate fake analytics or enterprise metrics"
      );
      break;

    case "ecommerce":
      doRules.push(
        "DO generate e-commerce specific UI: Product cards, Cart, Categories, Deals",
        "DO include product filtering, sorting, and search"
      );
      break;

    case "saas-dashboard":
      doRules.push(
        "DO generate a complete SaaS product website",
        "DO include: Feature showcase, Pricing table with tier comparison, Dashboard preview, Integrations"
      );
      break;

    case "football-academy":
    case "gym":
      doRules.push(
        "DO generate a sports/fitness focused website",
        "DO include: Programs/Plans, Coaches/Trainers, Schedule, Gallery",
        "DO make it feel energetic and dynamic"
      );
      if (complexity === "simple" || complexity === "standard") {
        dontRules.push(
          "DO NOT generate QR attendance systems, player panels, or parent dashboards",
          "DO NOT generate complex ERP features"
        );
      }
      break;
  }

  return { doRules, dontRules };
}

// ============================================
// CATEGORY CONTENT STRATEGY (for prompt compiler)
// ============================================
export function getCategoryContentStrategy(categoryId: string): string {
  const strategies: Record<string, string> = {
    "portfolio": "Generate a personal brand narrative: professional bio highlighting expertise, skills cards with proficiency levels, project showcases with live links and tech stacks, work experience timeline, education and certifications, downloadable CV button, social media links grid, and client testimonials.",
    "saas-dashboard": "Generate a product-led narrative: clear value proposition headline, feature bento grid with icons, interactive dashboard preview mockup, tiered pricing table with feature comparison, integration logos carousel, customer testimonials with company names, FAQ accordion.",
    "agency": "Generate a service-led narrative: agency mission statement, service cards with deliverables, client logo wall, case study showcases with metrics, team member cards with roles, process timeline, testimonials from named clients, and booking CTA.",
    "football-academy": "Generate a sports showcase narrative: dynamic hero with action imagery, program cards (U-12, U-16, Senior), coach profiles with credentials, training schedule, photo gallery grid, fee structure table, parent testimonials, WhatsApp contact CTA.",
    "ecommerce": "Generate a commerce narrative: featured products carousel, category grid with images, deals/offers banner, product cards with ratings and prices, trust badges (secure payment, free shipping), customer reviews, newsletter signup.",
    "restaurant": "Generate a hospitality narrative: hero with signature dish imagery, about the chef section, interactive menu with categories and prices, gallery of ambiance and dishes, reservation form with date/time picker, customer reviews, location map.",
    "business": "Generate a corporate narrative: company mission and values, services grid with descriptions, team leadership cards, client testimonials with company logos, stats counter (years, projects, clients), CTA for consultation.",
    "startup-landing": "Generate a conversion-focused narrative: problem statement, solution showcase, feature highlights, social proof with logos and testimonials, clear pricing, FAQ addressing objections, strong CTA.",
    "barber-shop": "Generate a service-oriented narrative: hero with shop ambiance, services with pricing, barber profiles, gallery of cuts and styles, online booking integration, testimonials, location and hours.",
    "blogging": "Generate a content-focused narrative: featured posts grid, category navigation, author spotlight, newsletter signup, reading time indicators, tag system.",
    "gym": "Generate a fitness-focused narrative: hero with gym imagery, membership plans with pricing, trainer profiles, class schedule, gallery, testimonials from members, contact and location.",
  };
  return strategies[categoryId] || "Generate a professional narrative with clear value proposition, feature highlights, social proof, and compelling calls-to-action tailored to the target audience.";
}

// ============================================
// AUTO TECH STACK INFERENCE
// Returns recommended tech stack IDs based on category + complexity
// ============================================
export function getAutoTechStack(categoryId: string | null, complexity: string): string[] {
  const base = ["nextjs", "tailwindcss", "framer-motion", "zod"];

  switch (complexity) {
    case "simple":
      return base;

    case "standard":
      return [...base, "react-hook-form", "zustand"];

    case "advanced":
      return [...base, "shadcn", "react-hook-form", "zustand", "supabase", "postgresql"];

    case "enterprise":
      return [...base, "shadcn", "react-hook-form", "zustand", "supabase", "postgresql", "recharts", "cloudinary"];

    default:
      return base;
  }
}

// ============================================
// CATEGORY → DEFAULT NAVBAR LINKS
// ============================================
export function getCategoryNavLinks(categoryId: string): string[] {
  const map: Record<string, string[]> = {
    "portfolio": ["Home", "About", "Skills", "Projects", "Contact"],
    "business": ["Home", "About", "Services", "Team", "Contact"],
    "agency": ["Home", "Services", "Portfolio", "Team", "Contact"],
    "startup-landing": ["Home", "Features", "Pricing", "FAQ", "Contact"],
    "saas-dashboard": ["Home", "Features", "Pricing", "Docs", "Contact"],
    "ecommerce": ["Home", "Shop", "Categories", "Deals", "Contact"],
    "restaurant": ["Home", "Menu", "About", "Reservations", "Contact"],
    "football-academy": ["Home", "Programs", "Coaches", "Gallery", "Contact"],
    "gym": ["Home", "Plans", "Trainers", "Schedule", "Contact"],
    "blogging": ["Home", "Blog", "Categories", "About", "Contact"],
  };
  return map[categoryId] || ["Home", "About", "Features", "Contact"];
}
