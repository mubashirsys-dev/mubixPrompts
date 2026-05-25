import { create } from "zustand";
import { BuilderState, ProjectDetails, Category, DesignStyle, AIModel, BrandBuilder, ApiCredentials, PresetPack, ResumeData, WebsiteContent, ComplexityTier, DeploymentConfig } from "@/types/builder";
import { categoryComplexityDefaults, getComplexityGatedSections, getComplexityGatedFeatures, getCategoryNavLinks } from "@/lib/category-intelligence";

const initialProjectDetails: ProjectDetails = {
  projectName: "",
  businessName: "",
  tagline: "",
  targetAudience: "",
  country: "",
  language: "English",
  projectGoals: "",
};

const initialBrandBuilder: BrandBuilder = {
  logoType: "Minimal",
  brandPersonality: "Futuristic",
  logoUrl: "",
  faviconUrl: "",
  heroMockupUrl: "",
  themeReferenceUrl: "",
  avatarUrl: "",
};

const initialApiCredentials: ApiCredentials = {
  supabaseUrl: "",
  supabaseAnonKey: "",
  supabaseServiceRoleKey: "",
  firebaseApiKey: "",
  firebaseAuthDomain: "",
  firebaseProjectId: "",
  firebaseStorageBucket: "",
  stripePublishableKey: "",
  stripeSecretKey: "",
  clerkPublishableKey: "",
  clerkSecretKey: "",
  cloudinaryCloudName: "",
  cloudinaryApiKey: "",
};

const initialDeploymentConfig: DeploymentConfig = {
  githubRepoUrl: "",
  deployTarget: "none",
  autoDeploy: false,
};

const initialWebsiteContent: WebsiteContent = {
  hero: {
    headline: "",
    subheadline: "",
    ctaText: "Get Started",
    secondaryCtaText: "Learn More",
    layoutType: "minimal",
    includeTrustBadges: false,
    includeStats: false,
    includeAnnouncement: false,
  },
  about: {
    title: "About",
    description: "",
    story: "",
    mission: "",
    vision: "",
    coreValues: "",
  },
  features: {
    enableBlog: false,
    enableFAQ: true,
    enableTestimonials: true,
  },
  footer: {
    showEmail: true,
    showPhone: false,
    showAddress: false,
    showCopyright: true,
    showNavLinks: true,
    showNewsletter: false,
    showPrivacyPolicy: true,
    showTerms: true,
    emailAddress: "",
    phoneNumber: "",
    addressText: "",
  },
  socials: {
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    dribbble: "",
    behance: "",
    facebook: "",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  navbar: {
    links: ["Home", "About", "Contact"],
  },
};

function saveStoreToLocalStorage(state: any) {
  if (typeof window === "undefined" || !state.rememberProject) return;
  try {
    const dataToSave = {
      currentStep: state.currentStep,
      complexityTier: state.complexityTier,
      codingLevel: state.codingLevel,
      selectedCategory: state.selectedCategory,
      categoryAnswers: state.categoryAnswers,
      websiteGoals: state.websiteGoals,
      projectDetails: state.projectDetails,
      brandBuilder: state.brandBuilder,
      selectedDesignStyle: state.selectedDesignStyle,
      selectedSections: state.selectedSections,
      selectedFeatures: state.selectedFeatures,
      websiteContent: state.websiteContent,
      activeSocials: state.activeSocials,
      setupApis: state.setupApis,
      apiCredentials: state.apiCredentials,
      activeSecurityRules: state.activeSecurityRules,
      selectedAIModel: state.selectedAIModel,
      selectedTechStack: state.selectedTechStack,
      deploymentConfig: state.deploymentConfig,
      customThemePrompt: state.customThemePrompt,
      resumeData: state.resumeData,
      generatedPrompt: state.generatedPrompt,
      rememberProject: state.rememberProject,
    };
    localStorage.setItem("mubix_builder_project_data", JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Failed to save builder state to localStorage", err);
  }
}

export const useBuilderStore = create<BuilderState>((set) => ({
  // Navigation
  currentStep: 1,
  totalSteps: 10,

  // Complexity Tier (replaces builderMode)
  complexityTier: "simple",

  // Coder Level
  codingLevel: "beginner",

  // Step Data
  selectedCategory: null,
  categoryAnswers: {},
  websiteGoals: [],
  projectDetails: initialProjectDetails,
  brandBuilder: initialBrandBuilder,
  selectedDesignStyle: null,
  selectedFeatures: [],
  selectedSections: [],
  websiteContent: initialWebsiteContent,
  activeSocials: {
    instagram: false,
    twitter: false,
    linkedin: false,
    github: false,
    youtube: false,
    discord: false,
    behance: false,
    dribbble: false,
    facebook: false,
    whatsapp: false,
    telegram: false,
  },
  setupApis: [],
  apiCredentials: initialApiCredentials,
  activeSecurityRules: ["xss", "csrf", "headers", "api", "spam"],
  selectedAIModel: null,
  selectedTechStack: [],
  deploymentConfig: initialDeploymentConfig,
  customThemePrompt: "",
  resumeData: null,

  // Prompt Output
  generatedPrompt: "",
  isGenerating: false,

  // Smart State Management
  rememberProject: false,

  // Actions
  setStep: (step: number) => set({ currentStep: step }),

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 11) })),

  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  setComplexityTier: (tier: ComplexityTier) => set((state) => {
    // When complexity changes, re-gate sections and features
    const gatedSections = getComplexityGatedSections(state.selectedCategory?.id || null, tier);
    const gatedFeatures = getComplexityGatedFeatures(state.selectedCategory?.id || null, tier);
    return {
      complexityTier: tier,
      selectedSections: gatedSections,
      selectedFeatures: gatedFeatures,
    };
  }),

  setCodingLevel: (level) => set({ codingLevel: level }),

  setCategory: (category: Category) => {
    let isChanged = false;
    set((state) => {
      if (state.selectedCategory?.id && state.selectedCategory.id !== category.id) {
        isChanged = true;
      }
      return {};
    });

    if (isChanged && typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      // Restore remember status if enabled
      if (useBuilderStore.getState().rememberProject) {
        localStorage.setItem("mubix_remember_project", "true");
      }
    }

    // Use category intelligence engine for section/feature mapping
    const defaultComplexity = categoryComplexityDefaults[category.id] || "standard";
    const recommended = getComplexityGatedSections(category.id, defaultComplexity);
    const autoFeatures = getComplexityGatedFeatures(category.id, defaultComplexity);
    const navLinks = getCategoryNavLinks(category.id);

    // Set hero layout type based on category
    const heroLayout = category.id === "portfolio" ? "portfolio" :
      category.id === "agency" ? "agency" :
      category.id === "startup-landing" || category.id === "mobile-app-landing" ? "split" :
      "minimal";

    set((state) => {
      const baseDetails = isChanged ? initialProjectDetails : state.projectDetails;
      const baseBrand = isChanged ? initialBrandBuilder : state.brandBuilder;
      const baseContent = isChanged ? initialWebsiteContent : state.websiteContent;
      const baseSocials = isChanged ? {
        instagram: false,
        twitter: false,
        linkedin: false,
        github: false,
        youtube: false,
        discord: false,
        behance: false,
        dribbble: false,
        facebook: false,
        whatsapp: false,
        telegram: false,
      } : state.activeSocials;

      return {
        selectedCategory: category,
        complexityTier: defaultComplexity,
        selectedSections: recommended,
        selectedFeatures: autoFeatures,
        categoryAnswers: isChanged ? {} : state.categoryAnswers,
        websiteGoals: isChanged ? [] : state.websiteGoals,
        projectDetails: baseDetails,
        brandBuilder: baseBrand,
        selectedDesignStyle: isChanged ? null : state.selectedDesignStyle,
        setupApis: isChanged ? [] : state.setupApis,
        apiCredentials: isChanged ? initialApiCredentials : state.apiCredentials,
        activeSecurityRules: isChanged ? ["xss", "csrf", "headers", "api", "spam"] : state.activeSecurityRules,
        selectedAIModel: isChanged ? null : state.selectedAIModel,
        selectedTechStack: isChanged ? [] : state.selectedTechStack,
        deploymentConfig: isChanged ? initialDeploymentConfig : state.deploymentConfig,
        customThemePrompt: isChanged ? "" : state.customThemePrompt,
        resumeData: isChanged ? null : state.resumeData,
        generatedPrompt: isChanged ? "" : state.generatedPrompt,
        websiteContent: {
          ...baseContent,
          hero: { ...baseContent.hero, layoutType: heroLayout },
          navbar: { links: navLinks },
        },
        activeSocials: baseSocials,
      };
    });
  },

  setCategoryAnswers: (answers: Record<string, any>) => set({ categoryAnswers: answers }),

  setWebsiteGoals: (goals: string[]) => set({ websiteGoals: goals }),

  setProjectDetails: (details: Partial<ProjectDetails>) =>
    set((state) => ({
      projectDetails: { ...state.projectDetails, ...details },
    })),

  setBrandBuilder: (brand: Partial<BrandBuilder>) =>
    set((state) => ({
      brandBuilder: { ...state.brandBuilder, ...brand },
    })),

  setDesignStyle: (style: DesignStyle | null) => set({ selectedDesignStyle: style }),

  setSectionsSequence: (sections: string[]) => set({ selectedSections: sections }),

  setWebsiteContent: (data: Partial<WebsiteContent>) =>
    set((state) => ({
      websiteContent: { ...state.websiteContent, ...data }
    })),

  toggleSocial: (platformId: string) =>
    set((state) => ({
      activeSocials: {
        ...state.activeSocials,
        [platformId]: !state.activeSocials[platformId],
      },
    })),

  setActiveSocials: (socials: Record<string, boolean>) => set({ activeSocials: socials }),

  toggleFeature: (featureId: string) =>
    set((state) => ({
      selectedFeatures: state.selectedFeatures.includes(featureId)
        ? state.selectedFeatures.filter((id) => id !== featureId)
        : [...state.selectedFeatures, featureId],
    })),

  setSelectedFeatures: (featureIds: string[]) => set({ selectedFeatures: featureIds }),

  toggleApiSetup: (apiId: string) =>
    set((state) => ({
      setupApis: state.setupApis.includes(apiId)
        ? state.setupApis.filter((id) => id !== apiId)
        : [...state.setupApis, apiId],
    })),

  setApiCredentials: (credentials: Partial<ApiCredentials>) =>
    set((state) => ({
      apiCredentials: { ...state.apiCredentials, ...credentials },
    })),

  toggleSecurityRule: (ruleId: string) =>
    set((state) => ({
      activeSecurityRules: state.activeSecurityRules.includes(ruleId)
        ? state.activeSecurityRules.filter((id) => id !== ruleId)
        : [...state.activeSecurityRules, ruleId],
    })),

  setAIModel: (model: AIModel) => set({ selectedAIModel: model }),

  toggleTechStack: (itemId: string) =>
    set((state) => ({
      selectedTechStack: state.selectedTechStack.includes(itemId)
        ? state.selectedTechStack.filter((id) => id !== itemId)
        : [...state.selectedTechStack, itemId],
    })),

  setSelectedTechStack: (itemIds: string[]) => set({ selectedTechStack: itemIds }),

  setDeploymentConfig: (config: Partial<DeploymentConfig>) =>
    set((state) => ({
      deploymentConfig: { ...state.deploymentConfig, ...config },
    })),

  setCustomThemePrompt: (prompt: string) => set({ customThemePrompt: prompt }),
  setResumeData: (data: ResumeData | null) => set({ resumeData: data }),

  setGeneratedPrompt: (prompt: string) => set({ generatedPrompt: prompt }),
  setIsGenerating: (generating: boolean) => set({ isGenerating: generating }),

  applyPreset: (preset: PresetPack) =>
    set((state) => {
      const complexity = preset.complexity || categoryComplexityDefaults[preset.category] || "standard";
      const recommended = getComplexityGatedSections(preset.category, complexity);

      return {
        selectedCategory: {
          id: preset.category,
          name: preset.category.toUpperCase().replace("_", " "),
          description: preset.description,
          icon: "Globe",
          tags: [],
        },
        complexityTier: complexity,
        selectedFeatures: preset.features,
        selectedTechStack: preset.techStack,
        codingLevel: preset.codingLevel,
        brandBuilder: preset.brand,
        setupApis: preset.apis,
        selectedSections: recommended,
        projectDetails: {
          ...state.projectDetails,
          projectName: preset.name,
          businessName: preset.name,
        },
      };
    }),

  resetBuilder: (preserveGeneratedPrompt = false) =>
    set((state) => ({
      currentStep: preserveGeneratedPrompt ? state.currentStep : 1,
      complexityTier: "simple",
      codingLevel: "beginner",
      selectedCategory: preserveGeneratedPrompt ? state.selectedCategory : null,
      categoryAnswers: {},
      websiteGoals: [],
      projectDetails: initialProjectDetails,
      brandBuilder: initialBrandBuilder,
      selectedDesignStyle: null,
      selectedFeatures: [],
      selectedSections: [],
      websiteContent: initialWebsiteContent,
      activeSocials: {
        instagram: false,
        twitter: false,
        linkedin: false,
        github: false,
        youtube: false,
        discord: false,
        behance: false,
        dribbble: false,
        facebook: false,
        whatsapp: false,
        telegram: false,
      },
      setupApis: [],
      apiCredentials: initialApiCredentials,
      activeSecurityRules: ["xss", "csrf", "headers", "api", "spam"],
      selectedAIModel: null,
      selectedTechStack: [],
      deploymentConfig: initialDeploymentConfig,
      customThemePrompt: "",
      resumeData: null,
      generatedPrompt: preserveGeneratedPrompt ? state.generatedPrompt : "",
      isGenerating: false,
    })),

  setRememberProject: (remember: boolean) => {
    set({ rememberProject: remember });
    if (typeof window !== "undefined") {
      if (remember) {
        localStorage.setItem("mubix_remember_project", "true");
        saveStoreToLocalStorage(useBuilderStore.getState());
      } else {
        localStorage.removeItem("mubix_remember_project");
        localStorage.removeItem("mubix_builder_project_data");
        localStorage.clear();
        sessionStorage.clear();
      }
    }
  },

  hydrateStore: () => {
    if (typeof window === "undefined") return;
    try {
      const remember = localStorage.getItem("mubix_remember_project") === "true";
      set({ rememberProject: remember });
      
      if (remember) {
        const savedData = localStorage.getItem("mubix_builder_project_data");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          set({
            currentStep: parsed.currentStep ?? 1,
            complexityTier: parsed.complexityTier ?? "simple",
            codingLevel: parsed.codingLevel ?? "beginner",
            selectedCategory: parsed.selectedCategory ?? null,
            categoryAnswers: parsed.categoryAnswers ?? {},
            websiteGoals: parsed.websiteGoals ?? [],
            projectDetails: parsed.projectDetails ?? initialProjectDetails,
            brandBuilder: parsed.brandBuilder ?? initialBrandBuilder,
            selectedDesignStyle: parsed.selectedDesignStyle ?? null,
            selectedSections: parsed.selectedSections ?? [],
            selectedFeatures: parsed.selectedFeatures ?? [],
            websiteContent: parsed.websiteContent ?? initialWebsiteContent,
            activeSocials: parsed.activeSocials ?? {},
            setupApis: parsed.setupApis ?? [],
            apiCredentials: parsed.apiCredentials ?? initialApiCredentials,
            activeSecurityRules: parsed.activeSecurityRules ?? ["xss", "csrf", "headers", "api", "spam"],
            selectedAIModel: parsed.selectedAIModel ?? null,
            selectedTechStack: parsed.selectedTechStack ?? [],
            deploymentConfig: parsed.deploymentConfig ?? initialDeploymentConfig,
            customThemePrompt: parsed.customThemePrompt ?? "",
            resumeData: parsed.resumeData ?? null,
            generatedPrompt: parsed.generatedPrompt ?? "",
          });
        }
      } else {
        // Start fresh: wipe local storage caches
        localStorage.removeItem("mubix_builder_project_data");
      }
    } catch (err) {
      console.error("Failed to hydrate builder state from localStorage", err);
    }
  },
}));

// Subscribe to store changes for automatic persistence
if (typeof window !== "undefined") {
  useBuilderStore.subscribe((state) => {
    if (state.rememberProject) {
      saveStoreToLocalStorage(state);
    }
  });
}
