import { BuilderState } from "@/types/builder";
import { features } from "./features";
import { techStackItems } from "./tech-stacks";

export function generateMasterPrompt(state: BuilderState): string {
  const { 
    selectedCategory, 
    projectDetails, 
    selectedDesignStyle, 
    selectedFeatures, 
    selectedAIModel, 
    selectedTechStack,
    codingLevel,
    builderMode,
    brandBuilder,
    setupApis,
    apiCredentials,
    customThemePrompt,
    showOptionalServices,
    selectedSections
  } = state;
  
  const selectedFeatureObjects = features.filter(f => selectedFeatures.includes(f.id));
  const selectedTechObjects = techStackItems.filter(t => selectedTechStack.includes(t.id));
  
  const cat = selectedCategory;
  const det = projectDetails;
  const design = selectedDesignStyle;
  const ai = selectedAIModel;
  const brand = brandBuilder;

  // Group items for template injection
  const featuresList = selectedFeatureObjects.map(f => `- **${f.name}** (${f.complexity}): ${f.description}`).join("\n");
  const techList = selectedTechObjects.map(t => `- **${t.name}**: ${t.description}`).join("\n");

  // Determine Coder-level specific instructions
  let coderLevelInstructions = "";
  if (codingLevel === "non-technical") {
    coderLevelInstructions = `
> [!IMPORTANT]
> **CODER LEVEL: NON-TECHNICAL (EXPLAIN EVERYTHING STEP-BY-STEP)**
> Do not assume I know how to install libraries, configure services, or write files.
> For every single step:
> 1. Tell me exactly which file to open.
> 2. Explain where to paste the code (e.g., "replace the entire contents of src/app/page.tsx with the following").
> 3. Give me the exact commands to run in the terminal (e.g., "npm i @clerk/nextjs").
> 4. For APIs like Supabase or Stripe, explain: "Open Supabase website -> click New Project -> wait for it to provision -> click Settings -> API -> copy Project URL".
> 5. Explain folder creation step-by-step: "Create a folder inside src named components, and inside components create layout...".
`;
  } else if (codingLevel === "beginner") {
    coderLevelInstructions = `
> [!NOTE]
> **CODER LEVEL: BEGINNER (GUIDE WITH EXPLANATIONS)**
> Provide clear explanations of file paths and dependencies.
> Keep code blocks complete so I can copy-paste them easily without needing to merge code.
> Explain the imports and custom configurations clearly.
`;
  } else if (codingLevel === "junior") {
    coderLevelInstructions = `
> [!NOTE]
> **CODER LEVEL: JUNIOR DEVELOPER (CLEAN IMPLEMENTATION)**
> Focus on solid component structures, clean React hooks, and proper TypeScript types.
> I understand how to create files, directories, and run npm installs.
> Highlight hook usage, state managers, and basic routing flows.
`;
  } else if (codingLevel === "senior") {
    coderLevelInstructions = `
> [!IMPORTANT]
> **CODER LEVEL: SENIOR DEVELOPER (NO SPOON-FEEDING. ARCHITECTURE-FIRST)**
> Skip verbose explanations, installation guides, and basic instructions.
> Deliver clean, highly optimized, type-safe architecture:
> - Full folder hierarchy, complete index files, barrel exports.
> - High-performance custom hooks with advanced caching.
> - Advanced middleware setup for protected routes and JWT/Session extraction.
> - Detailed Postgres schema utilizing row-level security (RLS) policies and triggers.
> - Scalable state managers (Zustand store with custom middleware).
`;
  }

  // Branding Prompt Block
  let brandBlock = `
### 🏷️ BRAND BUILDER SYSTEM & LOGO PROMPT
- **Brand Name / Business Name**: ${det.businessName || det.projectName || "Apex"}
- **Tagline**: ${det.tagline || "Built with Intelligent AI"}
- **Logo Style Requested**: ${brand.logoType}
- **Brand Personality**: ${brand.brandPersonality}
`;

  if (brand.logoUrl) {
    brandBlock += `- **Logo Image Asset**: An uploaded corporate logo file is provided at \`/public/logo.jpeg\` (or \`/public/${brand.logoUrl}\`). Render this image asset inside the navigation header utilizing Next.js \`Image\` or raw \`<img>\` elements. If the asset fails to load, gracefully fall back to a clean text representation of &ldquo;${det.businessName || det.projectName || "Apex"}&rdquo;.\n`;
  } else {
    brandBlock += `- **Logo AI Prompt**: "A premium ${brand.brandPersonality.toLowerCase()} ${brand.logoType.toLowerCase()} logo for a brand named '${det.businessName || det.projectName || "Apex"}', high resolution, scalable vector graphic, flat icon, modern graphic design, transparent background"\n`;
  }

  if (brand.faviconUrl) {
    brandBlock += `- **Favicon Asset**: An uploaded favicon file is provided at \`/public/${brand.faviconUrl}\`. Reference it cleanly inside the document meta tags.\n`;
  } else {
    brandBlock += `- **Favicon Prompt**: "A minimal geometric ${brand.logoType.toLowerCase()} flat icon version of the logo, 512x512, transparent background"\n`;
  }

  if (brand.heroMockupUrl) {
    brandBlock += `- **Hero Graphic Asset**: An uploaded visual mockup file is provided at \`/public/${brand.heroMockupUrl}\`. Render this image dynamically inside the primary layout block on the landing page.\n`;
  }

  brandBlock += `
- **Brand Typography System**: Set heading elements to uppercase with bold styling matching ${design?.typography?.heading || "Space Grotesk"}.
- **Brand Palette Tokens**:
  - Accent Color: ${design?.colors?.accent || "#FF6B6B"}
  - Secondary Highlight: ${design?.colors?.secondary || "#FFD93D"}
  - Base Canvas: ${design?.colors?.background || "#FFFDF5"}
  - Borders/Ink: ${design?.colors?.primary || "#000000"}
`;

  // API Config Block
  let apiConfigBlock = "### 🔌 SELECTED SERVICES & ENVIRONMENT CONFIGURATION\n";
  if (!showOptionalServices || setupApis.length === 0) {
    apiConfigBlock += "No external database or API integrations selected. Default to local client storage (localStorage) for front-end only implementation.\n";
  } else {
    setupApis.forEach(api => {
      if (api === "supabase") {
        apiConfigBlock += `
#### 🟢 SUPABASE INTEGRATION
- **Instructions**: Connect utilizing \`@supabase/supabase-js\` client wrapper.
- **Environment variables**:
  - \`NEXT_PUBLIC_SUPABASE_URL=${apiCredentials.supabaseUrl || "https://your-project.supabase.co"}\`
  - \`NEXT_PUBLIC_SUPABASE_ANON_KEY=${apiCredentials.supabaseAnonKey || "your-anon-key-here"}\`
  - \`SUPABASE_SERVICE_ROLE_KEY=${apiCredentials.supabaseServiceRoleKey || "your-service-role-key-here"}\`
- **How to retrieve Supabase key**: "1. Open Supabase.com -> Select your project -> Settings -> API -> Copy Project URL & anon public key."
`;
      }
      if (api === "firebase") {
        apiConfigBlock += `
#### 🔵 FIREBASE INTEGRATION
- **Instructions**: Set up SDK with client-side initializing.
- **Environment variables**:
  - \`NEXT_PUBLIC_FIREBASE_API_KEY=${apiCredentials.firebaseApiKey || "your-api-key"}\`
  - \`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${apiCredentials.firebaseAuthDomain || "your-auth-domain"}\`
  - \`NEXT_PUBLIC_FIREBASE_PROJECT_ID=${apiCredentials.firebaseProjectId || "your-project-id"}\`
  - \`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${apiCredentials.firebaseStorageBucket || "your-storage-bucket"}\`
- **How to retrieve Firebase key**: "1. Go to Firebase console -> Project settings -> General -> Under 'Your apps', find your Web app configuration."
`;
      }
      if (api === "stripe") {
        apiConfigBlock += `
#### 💳 STRIPE PAYMENTS
- **Instructions**: Integrate checkout sessions and dynamic webhooks.
- **Environment variables**:
  - \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${apiCredentials.stripePublishableKey || "pk_test_..."}\`
  - \`STRIPE_SECRET_KEY=${apiCredentials.stripeSecretKey || "sk_test_..."}\`
- **How to retrieve Stripe key**: "1. Go to Stripe Dashboard -> Developers -> API Keys -> Copy Publishable and Secret keys."
`;
      }
      if (api === "clerk") {
        apiConfigBlock += `
#### 🔐 CLERK AUTHENTICATION
- **Instructions**: Setup ClerkProvider wrapped around the layout.
- **Environment variables**:
  - \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${apiCredentials.clerkPublishableKey || "pk_test_..."}\`
  - \`CLERK_SECRET_KEY=${apiCredentials.clerkSecretKey || "sk_test_..."}\`
- **How to retrieve Clerk key**: "1. Go to Clerk Dashboard -> Select your app -> API Keys -> Copy Publishable and Secret keys."
`;
      }
      if (api === "cloudinary") {
        apiConfigBlock += `
#### ☁️ CLOUDINARY MEDIA
- **Instructions**: Set up direct upload signatures for image hosting.
- **Environment variables**:
  - \`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${apiCredentials.cloudinaryCloudName || "your-cloud-name"}\`
  - \`CLOUDINARY_API_KEY=${apiCredentials.cloudinaryApiKey || "your-api-key"}\`
- **How to retrieve Cloudinary key**: "1. Go to Cloudinary Console -> Dashboard -> Copy Cloud Name and API key."
`;
      }
    });
  }

  // Design DNA Block (Problem 9 - Injects structured Design DNA inside the prompt)
  let designDnaBlock = "### 🎨 DESIGN DNA SYSTEM GUIDELINES\n";
  if (customThemePrompt.trim()) {
    designDnaBlock += `
> [!IMPORTANT]
> **CUSTOM DESIGN DNA OVERRIDE (CRITICAL VISUAL CONSTRAINT)**
> ${customThemePrompt}
> Use this custom prompt as the primary styling template for layout, borders, buttons, and animations.
`;
  } else if (design && design.designDna) {
    const dna = design.designDna;
    designDnaBlock += `
Apply the following detailed **${design.name}** Design DNA parameters:
- **Typography DNA**: Heading style: "${dna.typography?.heading || "Space Grotesk Bold"}". Body style: "${dna.typography?.body || "Space Grotesk Regular"}". Special Text Stroke: "${dna.typography?.special || "None"}".
- **Spacing DNA**: Outer Padding scale: "${dna.spacing?.padding || "p-6"}". Inter-component gap: "${dna.spacing?.gap || "gap-6"}". Section Height bounds: "${dna.spacing?.sectionPadding || "py-16"}".
- **Interactive Buttons DNA**: Base structure: "${dna.buttons?.style || "rounded border"}". Hover scale: "${dna.buttons?.hover || "bg-neutral-50"}". Active interaction: "${dna.buttons?.active || "scale-95"}".
- **Cards DNA**: Structure style: "${dna.cards?.style || "border rounded-lg bg-white"}". Header divide accent: "${dna.cards?.header || "border-b"}".
- **Hover Physics DNA**: Card animation: "${dna.hoverEffects?.card || "translate-y-[-2px] transition"}". Badge animation: "${dna.hoverEffects?.badge || "scale-105"}".
- **Layout Architecture DNA**: Default layout style: "${dna.pageLayouts?.default || "Standard grid alignments"}".
`;
  } else {
    designDnaBlock += `
- **Typography DNA**: Inter font, bold headings (font-bold), medium body (font-medium).
- **Spacing DNA**: Strict 8px baseline grid (p-2, p-4, p-6, p-8, p-12).
- **Borders & Shadows**: Standard Vercel-like border-neutral-200 with soft shadows.
- **Active Interactions**: Smooth ease-in-out opacity transitions.
`;
  }

  // Dynamic homepage section sequence block
  let dynamicSequencingBlock = "";
  if (selectedSections.length > 0) {
    dynamicSequencingBlock = `
#### 🪵 HOMEPAGE SECTION SEQUENCE (CRITICAL ORDER REQUIREMENT)
You MUST layout and build the homepage sections in the exact sequential order listed below:
${selectedSections.map((sec, i) => `${i + 1}. **${sec}** (Structure as a distinct semantic component)`).join("\n")}
`;
  }

  // Smart Pages Structure based on selected category (Smart Feature Engine)
  let pagesBlock = "### 📄 TARGET PAGES & ROUTING STRUCTURE\n";
  pagesBlock += dynamicSequencingBlock;
  
  if (cat?.id === "portfolio") {
    pagesBlock += `
1. **Home Page (/)**:
   - Intro Section matching the sequenced order.
   - Interactive Project Showcase grid with detail overlays.
   - Dynamic custom Skills Cloud block.
   - Testimonial carousel with customer face placeholders.
   - Compact AJAX-powered Contact inquiry form.
2. **Resume Page (/resume)**:
   - Experience timeline with bold outline boxes.
   - Download PDF triggers.
3. **Blog Page (/blog)**:
   - Article index filtered by tags.
   - Full article view with dynamic metadata rendering.
`;
  } else if (cat?.id === "football-academy") {
    pagesBlock += `
1. **Landing Portal (/)**:
   - Massive hero banner matching the sequenced order.
   - Dynamic matches list widget.
   - Academy pricing structure table.
2. **Player Dashboard (/dashboard/player)**:
   - Training calendar, marked attendance logs, personal coach feedback cards.
   - Fee payment buttons.
3. **Coach Panel (/dashboard/coach)**:
   - Student list, attendance checkmarks grid, session scheduler.
4. **Admin Dashboard (/admin)**:
   - Fee transactions overview charts, user role registrations, batch controls.
`;
  } else if (cat?.id === "saas" || cat?.id === "saas-dashboard") {
    pagesBlock += `
1. **Landing Page (/)**:
   - Clean product header, features bento grid, Stripe subscription pricing blocks, FAQ list.
2. **User Dashboard (/dashboard)**:
   - API Keys manager credentials, daily usage analytics chart, user details settings.
3. **Admin Controls (/admin)**:
   - System metrics panel, dynamic user tier managers, API request logger.
`;
  } else {
    pagesBlock += `
1. **Home Page (/)**:
   - Hero banner, core features showcase, client testimonials, and final CTA blocks in selected sequence.
2. **Dashboard (/dashboard)**:
   - User profile metrics, recent activity table, and active service settings.
3. **Contact Page (/contact)**:
   - Interactive client submission forms and dynamic FAQ accordions.
`;
  }

  // Database SQL blocks
  let databaseBlock = "";
  if (showOptionalServices) {
    databaseBlock = `
### 🗄️ DATABASE SYSTEM & SQL SCHEMAS
Create these tables utilizing proper indexes, constraints, and triggers:
\`\`\`sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (User settings)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  avatar_url text,
  billing_tier text default 'free'
);

-- 2. Projects / Core category table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  status text default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row level security policies
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

create policy "Users can read own profiles" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profiles" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own projects" on public.projects for all using (auth.uid() = owner_id);
\`\`\`
`;
  } else {
    databaseBlock = `
### 🗄️ DATABASE SYSTEM (CLIENT STORAGE ONLY)
- Connect components to an active Zustand client store which reads and synchronizes records directly with **localStorage**.
- Deliver complete structural helper schemas inside the store to manage models easily on the client.
`;
  }

  const masterContent = `
# ============================================================
# MASTER AI CODING SYSTEM PROMPT — COMPILATION COMPLETE
# ============================================================
## TARGET TOOL ARCHITECTURE: ${ai?.name || "Antigravity AI / Claude"}
## TARGET PROJECT TYPE: ${cat?.name || "SaaS Website Builder"}
## GENERATED PROJECT ID: mubixprompts-${det.projectName?.toLowerCase().replace(/\s+/g, "-") || "app"}

---

## BLOCK 1 — 🎯 MISSION OBJECTIVE & SPECIFICATIONS
Build a high-fidelity, responsive, fully correct web application matching the following parameters:
- **Project Name**: ${det.projectName || "apex-project"}
- **Business Target**: ${det.businessName || "Apex Inc"}
- **Tagline**: ${det.tagline || "Next-gen intelligent SaaS system"}
- **Target Audience**: ${det.targetAudience || "Developers, SaaS creators, tech enthusiasts"}
- **Deployment Targets**: country: ${det.country || "Global"}, target language: ${det.language || "English"}
- **Monetization Structure**: Model: ${det.monetizationModel || "SaaS Subscription Billing"}

---

## BLOCK 2 — 🧑‍💻 CODER LEVEL INSTRUCTIONS
${coderLevelInstructions}

---

## BLOCK 3 — 🛠️ TECH STACK & ARCHITECTURE FRAMEWORK
You must use the following technologies without substitutions:
${techList}

**Special AI Tool Target Guidelines**:
- Optimize this codebase specifically for **${ai?.name || "Antigravity AI"}**.
- Ensure clean code imports, modular components, and type checks are strictly satisfied.

---

## BLOCK 4 — 🎨 DESIGN DNA SYSTEM
${designDnaBlock}
${brandBlock}

---

## BLOCK 5 — ⚡ RESPONSIVE PHYSICS & MICRO-ANIMATIONS
- **Button Physics**: Mechanical button click. Active scale/shadow compression shifts.
- **Card Physics**: Hover lift up (\`transform: translateY(-4px)\`) and solid offset shadow expand.
- **Loading Physics**: Skeleton placeholder boxes with linear moving gray shimmer bands.
- **Page Transitions**: Smooth slide-up fade on routing. Snappy spring timings.
- **Scroll Physics**: Staggered scroll fades inside grids.

---

## BLOCK 6 — 📁 TARGET FOLDER STRUCTURE & CORE FILE TREE
\`\`\`
src/
├── app/
│   ├── layout.tsx                # Wraps site with Provider setups
│   ├── page.tsx                  # High-fidelity homepage
│   ├── globals.css               # Core variables & utility styles
│   ├── api/                      # RESTful route handlers
│   └── (routes)/                 # Dynamic page subfolders
├── components/
│   ├── ui/                       # Shadcn basic components
│   ├── layout/                   # Navbar, Sidebar, Footer wrappers
│   └── shared/                   # Custom reusable elements
├── lib/
│   ├── utils.ts                  # Tailwind merger tools
│   ├── validation.ts             # Zod schema definitions
│   └── supabase.ts               # Supabase API initializer
├── types/
│   └── index.ts                  # Type definitions
└── store/
    └── index.ts                  # Zustand client-side store
\`\`\`

---

## BLOCK 7 — 📄 DYNAMIC PAGE ROUTING & SECTION CONTENT
${pagesBlock}

---

## BLOCK 8 — 🧩 REUSABLE COMPONENT TREE & SHARED UI PRIMITIVES
Ensure the following base components are created cleanly with full Tailwind customization:
- **Navbar**: Floating top header containing responsive logo box, links, auth triggers, mobile hamburger menu.
- **Footer**: Structured links grid with social custom SVG tags and email newsletter.
- **Card**: Box wrapper. In Brutalist, it utilizes \`border-4 border-black shadow-[8px_8px_0px_0px_#000]\`.
- **Button**: Custom primary, secondary, and ghost active templates.
- **Input**: Bold box with dynamic input taglines, placeholder styling, and error labels.
- **Toast**: Floating alert indicators for success, failure, and warning states.

---

## BLOCK 9 — 🗄️ DATABASE SYSTEM & SQL SCHEMAS
${databaseBlock}

---

## BLOCK 10 — 🧠 STATE MANAGEMENT STORE ARCHITECTURE
Configure a clean global store (Zustand) with the following structure:
- **Active State variables**:
  - \`user\`: Object containing profile info, roles, credentials.
  - \`notifications\`: Alert items queue.
  - \`isLoading\`: Global loading check.
- **Mutator Actions**:
  - \`setUser(user)\`: Session login setting.
  - \`clearUser()\`: Signout cleaning.
  - \`addNotification(msg)\`: Alert pushing.

---

## BLOCK 11 — 🔌 API ENDPOINT SPEC & PAYLOAD LAYOUTS
${showOptionalServices ? `
Implement secure api handlers under \`/api/\` matching the following guidelines:
1. **GET \`/api/user/profile\`**: Fetch user DB records matching the active JWT cookie.
2. **POST \`/api/auth/session\`**: Create cookies on successful authorization.
3. **POST \`/api/payments/checkout\`**: Generate payment session tokens (Stripe checkout url / Razorpay order details).
4. **POST \`/api/payments/webhook\`**: Secure signature verification handler to update subscription status.
` : `
Use local client mock storage handlers. API backend is disabled for this static implementation.
`}

---

## BLOCK 12 — 🔐 AUTHENTICATION & AUTHORIZATION LAYERS
${showOptionalServices ? `
- **Authorization Rule**: Read permissions before any database or route update.
- **Middleware Protected Routes**: \`/dashboard/*\`, \`/admin/*\` require active cookies. If missing, redirect to \`/login\`.
- **Role Control**: Admin routes verify user role equals 'admin'. Show un-auth modal if user is regular class.
` : `
Mock authorization checks inside local store. Dashboard navigation checks use client-only Zustand state flags.
`}

---

## BLOCK 13 — 📝 FORM HANDLING & VALIDATION SCHEMAS
Use **React Hook Form** + **Zod** schema validating for all data entry:
- **Contact Form Validation**: Email matches validation, message length must be greater than 20 characters.
- **Payment Billing inputs**: Validates country choice and coupon strings.
- **Dynamic Feedback**: Fields mark red border-4 on error, showing helper descriptive labels below inputs.

---

## BLOCK 14 — 💰 PAYMENTS, BILLS & SUBSCRIPTIONS SETUP
${showOptionalServices ? `
- **Checkout Flows**: Stripe/Razorpay inline frames.
- **Webhook Events**: Handle \`checkout.session.completed\` and \`customer.subscription.updated\` to create user subscription row in public table.
- **Grace periods**: Cancelled subscriptions remain active until current period end date.
` : `
Payments steps are disabled. Default all users to Premium Mock Billing Tier on client store initial setups.
`}

---

## BLOCK 15 — 🔍 SEO TAGS & STRUCTURED METADATA
- **Robots.txt**: Map search rules perfectly, allow index, link to Sitemap.
- **Sitemap.xml**: Dynamic XML endpoint generating tags for all static/dynamic routes.
- **JSON-LD Schema**: Inject WebPage & Person schemas inside layout wrapper.
- **OpenGraph**: Injects OG title, detailed description, site name, and static banner path.

---

## BLOCK 16 — 🛡️ APP SECURITY & XSS/CSRF PREVENTION
- **RLS**: Row-level policies enabled on every table. Users cannot modify rows matching different owner IDs.
- **XSS sanitizing**: Strip raw script inputs from strings.
- **Headers**: Setup secure CSP, X-Frame-Options to deny clickjacking.

---

## BLOCK 17 — ⚡ PERFORMANCE OPTIMIZATION RULES
- **Images**: Use next/image with placeholders, lazy loading, WebP compress.
- **Bundling**: Split large library widgets using dynamic lazy imports.
- **Caching**: Configure local stale-while-revalidate headers.

---

## BLOCK 18 — 🐛 HYDRATION AND COMPILATION RULES
- **No Hydration bugs**: Never render date/times or dynamic states directly on initial pass. Use \`useEffect\` or \`mounted\` client checks.
- **Strict Lint check**: No unused variables, clean interface tags, strict index exports.

---

## BLOCK 19 — 🔑 SERVICES CREDENTIALS SETUP & ENVIRONMENT VARIABLES
${apiConfigBlock}

---

## BLOCK 20 — 🤖 AI DEVELOPER CODING CONSTRAINTS & VALIDATION CHECKLIST
- [ ] All pages responsive, beautiful, matching the design style.
- [ ] TypeScript compiling cleanly with zero strict-mode errors.
- [ ] Database credentials, environment variables, APIs cleanly integrated.
- [ ] Proper loading, error, and dynamic state visualizations in place.
- [ ] No hardcoded keys or secrets.

---
`;

  return masterContent;
}
