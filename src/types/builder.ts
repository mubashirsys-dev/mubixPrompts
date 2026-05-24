// ============================================================
// MubixPrompts — TypeScript Interfaces for the Prompt Builder
// ============================================================

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
  monetizationModel: string;
  subscriptionModel: string;
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
export type BuilderMode = 'simple' | 'advanced';

export interface BrandBuilder {
  logoType: string;
  brandPersonality: string;
  logoUrl?: string;
  faviconUrl?: string;
  heroMockupUrl?: string;
  themeReferenceUrl?: string;
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
  brand: BrandBuilder;
  apis: string[];
}

export interface BuilderState {
  // Navigation
  currentStep: number;
  totalSteps: number;
  
  // Builder Configuration
  builderMode: BuilderMode;
  codingLevel: CodingLevel;
  
  // Step 1 — Category
  selectedCategory: Category | null;
  
  // Step 2 — Details
  projectDetails: ProjectDetails;
  
  // Step 3 — Brand & Logo Settings
  brandBuilder: BrandBuilder;
  
  // Step 4 — Design Style
  selectedDesignStyle: DesignStyle | null;
  
  // Step 5 — Features
  selectedFeatures: string[]; // feature IDs
  
  // Step 6 — API Setup
  setupApis: string[]; // selected APIs
  apiCredentials: ApiCredentials;
  
  // Step 7 — AI Model
  selectedAIModel: AIModel | null;
  
  // Step 8 — Tech Stack
  selectedTechStack: string[]; // tech stack item IDs
  
  // New Upgraded SaaS Options
  customThemePrompt: string;
  showOptionalServices: boolean;
  selectedSections: string[];
  
  // Prompt Output
  generatedPrompt: string;
  isGenerating: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setBuilderMode: (mode: BuilderMode) => void;
  setCodingLevel: (level: CodingLevel) => void;
  setCategory: (category: Category) => void;
  setProjectDetails: (details: Partial<ProjectDetails>) => void;
  setBrandBuilder: (brand: Partial<BrandBuilder>) => void;
  setDesignStyle: (style: DesignStyle | null) => void;
  toggleFeature: (featureId: string) => void;
  setSelectedFeatures: (featureIds: string[]) => void;
  toggleApiSetup: (apiId: string) => void;
  setApiCredentials: (credentials: Partial<ApiCredentials>) => void;
  setAIModel: (model: AIModel) => void;
  toggleTechStack: (itemId: string) => void;
  setSelectedTechStack: (itemIds: string[]) => void;
  setCustomThemePrompt: (prompt: string) => void;
  setShowOptionalServices: (show: boolean) => void;
  setSectionsSequence: (sections: string[]) => void;
  setGeneratedPrompt: (prompt: string) => void;
  setIsGenerating: (generating: boolean) => void;
  applyPreset: (preset: PresetPack) => void;
  resetBuilder: () => void;
}
