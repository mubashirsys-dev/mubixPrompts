// ============================================================
// MubixPrompts — SMART ADAPTIVE PROMPT ENGINE
// Category-driven, complexity-gated generation
// ============================================================

import { BuilderState, ResumeData } from "@/types/builder";
import { features } from "./features";
import { techStackItems } from "./tech-stacks";
import { getCategoryContentStrategy, getCategoryPromptRules, getAutoTechStack } from "./category-intelligence";

export function generateMasterPrompt(state: BuilderState): string {
  const {
    selectedCategory,
    categoryAnswers,
    websiteGoals,
    projectDetails,
    selectedDesignStyle,
    selectedFeatures,
    selectedAIModel,
    selectedTechStack,
    codingLevel,
    complexityTier,
    brandBuilder,
    setupApis,
    apiCredentials,
    customThemePrompt,
    selectedSections,
    resumeData,
    websiteContent,
    activeSecurityRules,
    deploymentConfig,
  } = state;

  const selectedFeatureObjects = features.filter(f => selectedFeatures.includes(f.id));
  const autoTech = getAutoTechStack(selectedCategory?.id || null, complexityTier);
  const mergedTechIds = [...new Set([...autoTech, ...selectedTechStack])];
  const selectedTechObjects = techStackItems.filter(t => mergedTechIds.includes(t.id));

  const cat = selectedCategory;
  const det = projectDetails;
  const design = selectedDesignStyle;
  const brand = brandBuilder;

  // Get category-specific DO/DON'T rules
  const { doRules, dontRules } = getCategoryPromptRules(cat?.id || "", complexityTier);

  // Feature & tech list strings
  const featuresList = selectedFeatureObjects.map(f => `- **${f.name}** (${f.complexity}): ${f.description}`).join("\n");
  const techList = selectedTechObjects.map(t => `- **${t.name}**: ${t.description}`).join("\n");

  // ============================================================
  // BLOCK: Resume Data (Portfolio only)
  // ============================================================
  let resumeSnippet = "";
  if (cat?.id === "portfolio" && resumeData) {
    resumeSnippet = `
### 📄 UPLOADED RESUME DATA (USE AS SOURCE OF TRUTH)
- **Full Name**: ${resumeData.name}
- **Professional Bio**: ${resumeData.bio}
- **Skills**: ${resumeData.skills.join(", ")}
- **Projects**:
${resumeData.projects.map(p => `  - **${p.title}**: ${p.description} (Tech: ${p.tech.join(", ")}${p.url ? `, URL: ${p.url}` : ""})`).join("\n")}
- **Work Experience**:
${resumeData.companies.map(c => `  - **${c.role}** at ${c.name} (${c.duration}): ${c.description || ""}`).join("\n")}
- **Achievements**: ${resumeData.achievements.map(a => `  - ${a}`).join("\n")}
- **Education**: ${resumeData.education.map(e => `  - ${e.degree} from ${e.institution} (${e.year})`).join("\n")}
- **Certifications**: ${resumeData.certifications.join(", ")}
- **Social Links**: ${resumeData.socialLinks.map(s => `${s.platform}: ${s.url}`).join(", ")}

**CRITICAL:** Use the actual resume data above. Do NOT invent fake or placeholder data.
`;
  } else if (cat?.id === "portfolio") {
    resumeSnippet = `
### 📄 PORTFOLIO DATA POPULATION
- Generate realistic placeholder data for a professional developer
- Include modern tech stack skills, 3-4 real-looking projects, and work experience
- Make the portfolio feel authentic and personal
`;
  }

  // ============================================================
  // BLOCK: Coder Level Instructions
  // ============================================================
  let coderLevelInstructions = "";
  switch (codingLevel) {
    case "non-technical":
      coderLevelInstructions = `
> **CODER LEVEL: NON-TECHNICAL**
> Explain every step: which file to create, where to paste code, which commands to run.
> Include terminal commands for installations. Explain API key setup step-by-step.
`;
      break;
    case "beginner":
      coderLevelInstructions = `
> **CODER LEVEL: BEGINNER**
> Provide clear explanations with complete copy-paste code blocks.
> Explain imports and configurations clearly.
`;
      break;
    case "junior":
      coderLevelInstructions = `
> **CODER LEVEL: JUNIOR DEVELOPER**
> Focus on clean component structures, React hooks, and TypeScript types.
> Skip basic setup explanations.
`;
      break;
    case "senior":
      coderLevelInstructions = `
> **CODER LEVEL: SENIOR DEVELOPER**
> Architecture-first. Skip verbose explanations.
> Deliver optimized, type-safe code with proper patterns.
`;
      break;
  }

  // ============================================================
  // BLOCK: Brand & Design
  // ============================================================
  let brandBlock = `
### 🏷️ BRAND IDENTITY
- **Name**: ${det.businessName || det.projectName || "My Project"}
- **Tagline**: ${det.tagline || ""}
- **Logo Style**: ${brand.logoType}
- **Brand Personality**: ${brand.brandPersonality}
`;

  if (brand.logoUrl) {
    brandBlock += `- **Logo File**: Provided at \`/public/${brand.logoUrl}\`. Use Next.js Image component.\n`;
  }
  if (brand.faviconUrl) {
    brandBlock += `- **Favicon**: Provided at \`/public/${brand.faviconUrl}\`.\n`;
  }
  if (brand.heroMockupUrl) {
    brandBlock += `- **Hero Graphic**: Provided at \`/public/${brand.heroMockupUrl}\`.\n`;
  }

  brandBlock += `
### 🎨 DESIGN SYSTEM
- **Style**: ${design?.name || "Clean Modern"}
- **Primary Color**: ${design?.colors?.primary || "#000000"}
- **Secondary Color**: ${design?.colors?.secondary || "#525252"}
- **Accent Color**: ${design?.colors?.accent || "#FF6B6B"}
- **Background**: ${design?.colors?.background || "#FFFFFF"}
- **Heading Font**: ${design?.typography?.heading || "Inter"}
- **Body Font**: ${design?.typography?.body || "Inter"}
`;

  // Design DNA (if available)
  if (customThemePrompt.trim()) {
    brandBlock += `
> **CUSTOM DESIGN OVERRIDE:**
> ${customThemePrompt}
`;
  } else if (design?.designDna) {
    const dna = design.designDna;
    brandBlock += `
**Design DNA Parameters:**
- Typography: Heading "${dna.typography?.heading || "font-bold"}", Body "${dna.typography?.body || "font-medium"}"
- Spacing: ${dna.spacing?.padding || "p-6"}, ${dna.spacing?.gap || "gap-6"}, ${dna.spacing?.sectionPadding || "py-16"}
- Buttons: ${dna.buttons?.style || "rounded border"}
- Cards: ${dna.cards?.style || "border rounded-lg bg-white"}
- Hover Effects: ${dna.hoverEffects?.card || "translate-y-[-2px]"}
`;
  }

  // ============================================================
  // BLOCK: Section Architecture
  // ============================================================
  let sectionBlock = `
### 📐 HOMEPAGE SECTION ARCHITECTURE
Build the homepage sections in this exact order. Each section is a React component under \`src/components/sections/\`:
`;

  if (selectedSections.length > 0) {
    selectedSections.forEach((sec, i) => {
      sectionBlock += `
${i + 1}. **${sec}** → \`src/components/sections/${sec.toLowerCase().replace(/\s+/g, "-")}-section.tsx\`
   - Responsive: Mobile (375px+) → Tablet (768px+) → Desktop (1200px+)
   - Include scroll animations and hover states
`;
    });
  } else {
    sectionBlock += `Use default sections: Hero, About, Contact, Footer.\n`;
  }

  // ============================================================
  // BLOCK: Content Blueprint
  // ============================================================
  const contentStrategyText = getCategoryContentStrategy(cat?.id || "");
  let contentBlock = `
### 📝 CONTENT BLUEPRINT
**Category Strategy**: ${contentStrategyText}

**Hero Section:**
- Headline: ${websiteContent.hero.headline || "(generate contextually appropriate headline)"}
- Subheadline: ${websiteContent.hero.subheadline || "(generate contextually appropriate subheadline)"}
- Primary CTA: ${websiteContent.hero.ctaText}
- Secondary CTA: ${websiteContent.hero.secondaryCtaText}
- Layout: ${websiteContent.hero.layoutType}
${websiteContent.hero.includeTrustBadges ? "- Include trust badges\n" : ""}${websiteContent.hero.includeStats ? "- Include stats section\n" : ""}
**About Section:**
- Title: ${websiteContent.about.title}
${websiteContent.about.story ? `- Story: ${websiteContent.about.story}\n` : ""}${websiteContent.about.mission ? `- Mission: ${websiteContent.about.mission}\n` : ""}
**Dynamic Sections:**
- Testimonials: ${websiteContent.features.enableTestimonials ? "YES" : "NO"}
- FAQ: ${websiteContent.features.enableFAQ ? "YES" : "NO"}
- Blog: ${websiteContent.features.enableBlog ? "YES" : "NO"}

**Navbar:** ${websiteContent.navbar.links.join(", ")}
`;

  // Pricing only if relevant
  if (websiteContent.pricing && (complexityTier === "advanced" || complexityTier === "enterprise")) {
    contentBlock += `
**Pricing:**
- ${websiteContent.pricing.starterName}: ${websiteContent.pricing.starterPrice}
- ${websiteContent.pricing.proName}: ${websiteContent.pricing.proPrice} (highlighted)
- ${websiteContent.pricing.enterpriseName}: ${websiteContent.pricing.enterprisePrice}
- Billing: ${websiteContent.pricing.billingType}
`;
  }

  // Footer & Social
  contentBlock += `
**Footer:**
- Email: ${websiteContent.footer.showEmail ? (websiteContent.footer.emailAddress || "YES") : "NO"}
- Phone: ${websiteContent.footer.showPhone ? (websiteContent.footer.phoneNumber || "YES") : "NO"}
- Copyright: ${websiteContent.footer.showCopyright ? "YES" : "NO"}
- Newsletter: ${websiteContent.footer.showNewsletter ? "YES" : "NO"}

**Social Links:**
${Object.entries(websiteContent.socials).filter(([, v]) => v).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "- (none provided)"}
`;

  contentBlock += resumeSnippet;

  // ============================================================
  // BLOCK: Features Implementation
  // ============================================================
  let featureBlock = "";
  if (selectedFeatureObjects.length > 0) {
    featureBlock = `
### ⚡ SELECTED FEATURES
${featuresList}
`;
  }

  // ============================================================
  // BLOCK: Folder Structure (complexity-aware)
  // ============================================================
  let folderBlock = `
### 📁 PROJECT STRUCTURE
\`\`\`
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
`;

  if (complexityTier === "advanced" || complexityTier === "enterprise") {
    folderBlock += `│   ├── api/                      # API route handlers
│   └── (routes)/                 # Dynamic page subfolders
`;
  }

  folderBlock += `├── components/
│   ├── ui/                       # UI primitives
│   ├── layout/                   # Navbar, Footer
│   └── sections/                 # Page sections
`;

  if (complexityTier === "advanced" || complexityTier === "enterprise") {
    folderBlock += `│   └── features/                 # Feature-specific components
`;
  }

  folderBlock += `├── lib/
│   └── utils.ts
`;

  if (complexityTier === "advanced" || complexityTier === "enterprise") {
    folderBlock += `│   ├── supabase.ts               # Database client
│   └── validation.ts             # Zod schemas
├── store/
│   └── index.ts                  # Zustand store
`;
  }

  folderBlock += `└── types/
    └── index.ts
\`\`\`
`;

  // ============================================================
  // BLOCK: Database (Advanced+ only)
  // ============================================================
  let databaseBlock = "";
  if (complexityTier === "advanced" || complexityTier === "enterprise") {
    databaseBlock = `
### 🗄️ DATABASE SYSTEM
`;
    if (setupApis.includes("supabase") || setupApis.includes("firebase")) {
      let categoryTables = "";
      if (cat?.id === "portfolio") {
        categoryTables = `
-- Projects Table
create table public.portfolio_projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  tech_stack text[] not null,
  project_url text,
  image_url text,
  created_at timestamp with time zone default now() not null
);
`;
      } else if (cat?.id === "saas-dashboard") {
        categoryTables = `
-- Subscriptions Table
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_customer_id text,
  status text not null default 'free',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now() not null
);
`;
      } else if (cat?.id === "ecommerce") {
        categoryTables = `
-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  category text,
  stock integer default 0,
  created_at timestamp with time zone default now() not null
);

-- Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  status text default 'pending',
  total decimal(10,2) not null,
  created_at timestamp with time zone default now() not null
);
`;
      } else {
        categoryTables = `
-- App Data Table (customize for ${cat?.name || "your project"})
create table public.app_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null
);
`;
      }

      databaseBlock += `
Generate PostgreSQL tables with proper RLS policies:
\`\`\`sql
create extension if not exists "uuid-ossp";

-- User Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default now() not null
);

${categoryTables}

-- Enable RLS
alter table public.profiles enable row level security;
create policy "Public read profiles" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
\`\`\`
`;
    } else {
      databaseBlock += `Use Zustand store with localStorage for client-side data persistence.\n`;
    }
  }

  // ============================================================
  // BLOCK: API Configuration (Advanced+ only)
  // ============================================================
  let apiBlock = "";
  if ((complexityTier === "advanced" || complexityTier === "enterprise") && setupApis.length > 0) {
    apiBlock = `
### 🔌 API & SERVICES CONFIGURATION
`;
    setupApis.forEach(api => {
      switch (api) {
        case "supabase":
          apiBlock += `
**Supabase:**
- \`NEXT_PUBLIC_SUPABASE_URL=${apiCredentials.supabaseUrl || "https://your-project.supabase.co"}\`
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY=${apiCredentials.supabaseAnonKey || "your-anon-key"}\`
`;
          break;
        case "stripe":
          apiBlock += `
**Stripe Payments:**
- \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${apiCredentials.stripePublishableKey || "pk_test_..."}\`
- \`STRIPE_SECRET_KEY=${apiCredentials.stripeSecretKey || "sk_test_..."}\`
`;
          break;
        case "clerk":
          apiBlock += `
**Clerk Authentication:**
- \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${apiCredentials.clerkPublishableKey || "pk_test_..."}\`
- \`CLERK_SECRET_KEY=${apiCredentials.clerkSecretKey || "sk_test_..."}\`
`;
          break;
        case "razorpay":
          apiBlock += `
**Razorpay:**
- \`NEXT_PUBLIC_RAZORPAY_KEY_ID=${apiCredentials.razorpayKeyId || "rzp_test_..."}\`
- \`RAZORPAY_KEY_SECRET=${apiCredentials.razorpayKeySecret || "secret_..."}\`
`;
          break;
      }
    });
  }

  // ============================================================
  // BLOCK: Security (simple protection layer)
  // ============================================================
  let securityBlock = `
### 🛡️ SECURITY PROTECTION LAYER
`;
  if (complexityTier === "simple" || complexityTier === "standard") {
    securityBlock += `Apply basic client-side protections:
- Sanitize all form inputs
- Use semantic HTML for accessibility
- Add honeypot fields to contact forms for spam protection
`;
  } else {
    securityBlock += `Apply the following protections:\n`;
    if (activeSecurityRules.includes("xss")) securityBlock += `- **XSS Prevention**: Sanitize all rendered user content\n`;
    if (activeSecurityRules.includes("csrf")) securityBlock += `- **CSRF Protection**: Enforce tokens on state-mutating requests\n`;
    if (activeSecurityRules.includes("headers")) securityBlock += `- **Secure Headers**: CSP, X-Frame-Options, X-Content-Type-Options\n`;
    if (activeSecurityRules.includes("api")) securityBlock += `- **API Validation**: Type-check all inputs with Zod\n`;
    if (activeSecurityRules.includes("spam")) securityBlock += `- **Spam Protection**: Honeypot fields on forms\n`;
  }

  // ============================================================
  // BLOCK: SEO (always included)
  // ============================================================
  const seoBlock = `
### 🔍 SEO & METADATA
Implement on every page:
1. **Title Tags**: \`${det.businessName || det.projectName || "Project"} - ${det.tagline || "Website"}\`
2. **Meta Description**: Compelling 160-character description
3. **robots.txt**: Allow indexing, block /admin/ and /dashboard/
4. **sitemap.xml**: Dynamic routes
5. **JSON-LD Schema**: ${cat?.id === "portfolio" ? "Person schema" : cat?.id === "saas-dashboard" ? "Organization + WebSite schema" : "WebSite schema"}
6. **OpenGraph & Twitter Cards**: Title, description, OG image
7. **Semantic HTML**: Proper heading hierarchy, landmarks, ARIA labels
`;

  // ============================================================
  // BLOCK: Deployment
  // ============================================================
  let deployBlock = "";
  if (deploymentConfig.deployTarget !== "none" || deploymentConfig.githubRepoUrl) {
    deployBlock = `
### 🚀 DEPLOYMENT CONFIGURATION
`;
    if (deploymentConfig.githubRepoUrl) {
      deployBlock += `- **GitHub Repository**: ${deploymentConfig.githubRepoUrl}\n`;
    }
    if (deploymentConfig.deployTarget !== "none") {
      deployBlock += `- **Deploy Target**: ${deploymentConfig.deployTarget}\n`;
    }
    deployBlock += `
Include deployment instructions:
- Production build command: \`npm run build\`
- Environment variables setup guide
- Verify: No TypeScript errors, no console errors, responsive on all devices
`;
  }

  // ============================================================
  // BLOCK: Website Goals & Category Strategy Answers
  // ============================================================
  let goalsListSnippet = "";
  if (websiteGoals && websiteGoals.length > 0) {
    goalsListSnippet = `\n- **Primary Objectives**: ${websiteGoals.join(", ")}`;
  }

  let planningAnswersSnippet = "";
  if (categoryAnswers && Object.keys(categoryAnswers).length > 0) {
    planningAnswersSnippet = `
### 🧩 CATEGORY PLANNING STRATEGY ANSWERS
These domain-specific strategy parameters were captured during template configuration:
${Object.entries(categoryAnswers).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}
`;
  }

  // ============================================================
  // ASSEMBLE MASTER PROMPT
  // ============================================================
  let prompt = `# ============================================================
# MASTER AI CODING PROMPT — ${cat?.name?.toUpperCase() || "WEB PROJECT"}
# Complexity: ${complexityTier.toUpperCase()} | Category: ${cat?.name || "General"}
# ============================================================

## 🎯 PROJECT OVERVIEW
Build a ${complexityTier === "simple" ? "clean, static, single-page" : complexityTier === "standard" ? "multi-section, responsive" : complexityTier === "advanced" ? "full-stack" : "enterprise-grade"} **${cat?.name || "website"}**.
- **Project Name**: ${det.projectName || "my-project"}
- **Business/Brand**: ${det.businessName || det.projectName || "My Brand"}
- **Tagline**: ${det.tagline || ""}
- **Target Audience**: ${det.targetAudience || "General audience"}
- **Language**: ${det.language || "English"}
- **Country**: ${det.country || "Global"}${goalsListSnippet}
${det.projectGoals ? `- **Goals**: ${det.projectGoals}` : ""}

---

${planningAnswersSnippet}

---

## 🚨 CRITICAL GENERATION RULES

### ✅ DO:
${doRules.map(r => `${r}`).join("\n")}

### ❌ DO NOT:
${dontRules.map(r => `${r}`).join("\n")}

---

## 🧑‍💻 CODER LEVEL
${coderLevelInstructions}

---

## 🛠️ TECH STACK
${techList}

Optimize for **${selectedAIModel?.name || "AI code generation tools"}**.

---

${brandBlock}

---

## ⚡ ANIMATIONS & INTERACTIONS
- Button hover: scale + shadow shift
- Card hover: translateY(-4px) with shadow expand
- Skeleton loading states with shimmer
- Smooth scroll-triggered fade-ins
- Page transitions with slide-up animation

---

${folderBlock}

---

${sectionBlock}

---

${contentBlock}

---

${featureBlock ? `${featureBlock}\n---\n` : ""}
${databaseBlock ? `${databaseBlock}\n---\n` : ""}
${apiBlock ? `${apiBlock}\n---\n` : ""}
${securityBlock}

---

${seoBlock}

---

## ⚡ PERFORMANCE
- Use next/image with lazy loading and WebP
- Dynamic imports for large components
- Minimize bundle size

---

## 🐛 QUALITY RULES
- No hydration bugs (use useEffect for dynamic content)
- No TypeScript errors in strict mode
- No console errors or warnings
- Responsive on all breakpoints (375px, 768px, 1200px)
- Proper loading, error, and empty states

${deployBlock ? `\n---\n\n${deployBlock}` : ""}

---

## ✅ FINAL CHECKLIST
- [ ] All pages responsive and visually polished
- [ ] TypeScript compiles with zero errors
- [ ] No hardcoded keys or secrets
- [ ] Proper SEO tags on every page
- [ ] Smooth animations and transitions
- [ ] Accessible (keyboard nav, screen reader, ARIA)
${cat?.id === "portfolio" && resumeData ? "- [ ] Resume data used for all bio/skills/projects sections" : ""}
`;

  return prompt.trim();
}
