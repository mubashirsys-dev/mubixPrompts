// ============================================================
// MubixPrompts — TypeScript Interfaces for the Prompt Builder
// SMART ADAPTIVE GENERATION ENGINE
// ============================================================

export interface ResumeData {
  name: string;
  bio: string;
  skills: string[];
  projects: { title: string; description: string; tech: string[]; url?: string }[];
  companies: { name: string; role: string; duration: string; description?: string }[];
  achievements: string[];
  education: { institution: string; degree: string; year: string }[];
  certifications: string[];
  socialLinks: { platform: string; url: string }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface ProjectDetails {
  projectName: string;
  businessName: string;
  tagline: string;
  targetAudience: string;
  country: string;
  language: string;
  projectGoals: string;
}

export interface DesignStyleColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  colors: DesignStyleColors;
  typography: {
    heading: string;
    body: string;
  };
  characteristics: string[];
  preview: string; // CSS gradient or visual preview
  designDna?: {
    typography: Record<string, string>;
    spacing: Record<string, string>;
    animations: Record<string, string>;
    buttons: Record<string, string>;
    cards: Record<string, string>;
    hoverEffects: Record<string, string>;
    pageLayouts: Record<string, string>;
  };
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  complexity: 'easy' | 'medium' | 'advanced';
  recommended: boolean;
  category: FeatureCategory;
}

export type FeatureCategory =
  | 'authentication'
  | 'payments'
  | 'dashboards'
  | 'advanced';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  strengths: string[];
  icon: string;
  recommended: boolean;
  color: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  description: string;
  category: TechStackCategory;
  recommended: boolean;
  icon: string;
}

export type TechStackCategory =
  | 'frontend'
  | 'styling'
  | 'ui'
  | 'animations'
  | 'backend'
  | 'database'
  | 'hosting'
  | 'storage'
  | 'state'
  | 'forms'
  | 'validation'
  | 'charts';

export type CodingLevel = 'non-technical' | 'beginner' | 'junior' | 'senior';

// ============================================================
// NEW: Complexity Tier — Controls the entire generation pipeline
// ============================================================
export type ComplexityTier = 'simple' | 'standard' | 'advanced' | 'enterprise';

// ============================================================
// NEW: Deployment Configuration
// ============================================================
export interface DeploymentConfig {
  githubRepoUrl: string;
  deployTarget: 'vercel' | 'netlify' | 'none';
  autoDeploy: boolean;
}

export interface BrandBuilder {
  logoType: string;
  brandPersonality: string;
  logoUrl?: string;
  faviconUrl?: string;
  heroMockupUrl?: string;
  themeReferenceUrl?: string;
  brandColorsUrl?: string;
  uiReferenceUrl?: string;
  avatarUrl?: string;
}

export interface ApiCredentials {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseServiceRoleKey?: string;
  firebaseApiKey?: string;
  firebaseAuthDomain?: string;
  firebaseProjectId?: string;
  firebaseStorageBucket?: string;
  stripePublishableKey?: string;
  stripeSecretKey?: string;
  clerkPublishableKey?: string;
  clerkSecretKey?: string;
  cloudinaryCloudName?: string;
  cloudinaryApiKey?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  resendApiKey?: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  geminiApiKey?: string;
  groqApiKey?: string;
}

export interface PresetPack {
  id: string;
  name: string;
  description: string;
  category: string;
  designStyle: string;
  features: string[];
  techStack: string[];
  codingLevel: CodingLevel;
  complexity: ComplexityTier;
  brand: BrandBuilder;
  apis: string[];
}

// ============================================================
// Website Content — Category-Adaptive
// ============================================================
export interface WebsiteContent {
  // Hero Architecture (universal)
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    secondaryCtaText: string;
    layoutType: "saas" | "portfolio" | "agency" | "minimal" | "split" | "bento";
    includeTrustBadges: boolean;
    includeStats: boolean;
    includeAnnouncement: boolean;
  };

  // About Architecture (universal)
  about: {
    title: string;
    description: string;
    story: string;
    mission: string;
    vision: string;
    coreValues: string;
  };

  // Pricing Architecture (SaaS/Enterprise ONLY)
  pricing?: {
    starterName: string;
    starterPrice: string;
    proName: string;
    proPrice: string;
    enterpriseName: string;
    enterprisePrice: string;
    billingType: "monthly" | "yearly" | "both";
  };

  // Features / Content Toggles
  features: {
    enableBlog: boolean;
    enableFAQ: boolean;
    enableTestimonials: boolean;
  };

  // Footer Architecture
  footer: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
    showCopyright: boolean;
    showNavLinks: boolean;
    showNewsletter: boolean;
    showPrivacyPolicy: boolean;
    showTerms: boolean;
    emailAddress: string;
    phoneNumber: string;
    addressText: string;
  };

  socials: {
    instagram: string;
    twitter: string;
    linkedin: string;
    github: string;
    youtube: string;
    dribbble: string;
    behance: string;
    facebook: string;
    discord: string;
    whatsapp: string;
    telegram: string;
  };

  // Navbar Architecture
  navbar: {
    links: string[];
  };
}

// ============================================================
// Builder State — Smart Adaptive Architecture
// ============================================================
export interface BuilderState {
  // Navigation
  currentStep: number;
  totalSteps: number;

  // Autosave Status
  saveStatus: 'saved' | 'saving' | 'unsaved';

  // Complexity Tier (NEW — controls everything)
  complexityTier: ComplexityTier;

  // Coder Level
  codingLevel: CodingLevel;

  // Step 1 — Category
  selectedCategory: Category | null;
  categoryAnswers: Record<string, any>;

  // Step 2 — Website Goals
  websiteGoals: string[];

  // Step 3 — Brand Builder (merged details + brand)
  projectDetails: ProjectDetails;
  brandBuilder: BrandBuilder;

  // Step 4 — Design Style
  selectedDesignStyle: DesignStyle | null;

  // Step 5 — Sections
  selectedSections: string[];

  // Step 6 — Content
  websiteContent: WebsiteContent;
  activeSocials: Record<string, boolean>;

  // Step 7 — Features
  selectedFeatures: string[];

  // Step 8 — Advanced Systems (complexity >= advanced)
  setupApis: string[];
  apiCredentials: ApiCredentials;
  activeSecurityRules: string[];

  // Step 9 — Generate
  selectedAIModel: AIModel | null;
  selectedTechStack: string[];
  deploymentConfig: DeploymentConfig;

  // Custom/Override Options
  customThemePrompt: string;

  // Resume Data (Portfolio category)
  resumeData: ResumeData | null;

  // Prompt Output
  generatedPrompt: string;
  isGenerating: boolean;

  // Smart State Management
  rememberProject: boolean;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setComplexityTier: (tier: ComplexityTier) => void;
  setCodingLevel: (level: CodingLevel) => void;
  setCategory: (category: Category) => void;
  setCategoryAnswers: (answers: Record<string, any>) => void;
  setWebsiteGoals: (goals: string[]) => void;
  setProjectDetails: (details: Partial<ProjectDetails>) => void;
  setBrandBuilder: (brand: Partial<BrandBuilder>) => void;
  setDesignStyle: (style: DesignStyle | null) => void;
  setSectionsSequence: (sections: string[]) => void;
  setWebsiteContent: (data: Partial<WebsiteContent>) => void;
  toggleSocial: (platformId: string) => void;
  setActiveSocials: (socials: Record<string, boolean>) => void;
  toggleFeature: (featureId: string) => void;
  setSelectedFeatures: (featureIds: string[]) => void;
  toggleApiSetup: (apiId: string) => void;
  setApiCredentials: (credentials: Partial<ApiCredentials>) => void;
  toggleSecurityRule: (ruleId: string) => void;
  setAIModel: (model: AIModel) => void;
  toggleTechStack: (itemId: string) => void;
  setSelectedTechStack: (itemIds: string[]) => void;
  setDeploymentConfig: (config: Partial<DeploymentConfig>) => void;
  setCustomThemePrompt: (prompt: string) => void;
  setResumeData: (data: ResumeData | null) => void;
  setGeneratedPrompt: (prompt: string) => void;
  setIsGenerating: (generating: boolean) => void;
  applyPreset: (preset: PresetPack) => void;
  resetBuilder: (preserveGeneratedPrompt?: boolean) => void;
  setRememberProject: (remember: boolean) => void;
  hydrateStore: () => void;
}
