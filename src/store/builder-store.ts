import { create } from "zustand";
import { BuilderState, ProjectDetails, Category, DesignStyle, AIModel, BrandBuilder, ApiCredentials, PresetPack } from "@/types/builder";

const initialProjectDetails: ProjectDetails = {
  projectName: "",
  businessName: "",
  tagline: "",
  targetAudience: "",
  country: "",
  language: "English",
  monetizationModel: "",
  subscriptionModel: "",
  projectGoals: "",
};

const initialBrandBuilder: BrandBuilder = {
  logoType: "Minimal",
  brandPersonality: "Futuristic",
  logoUrl: "",
  faviconUrl: "",
  heroMockupUrl: "",
  themeReferenceUrl: "",
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

export const useBuilderStore = create<BuilderState>((set) => ({
  // Navigation
  currentStep: 1,
  totalSteps: 10,

  // Builder Configuration
  builderMode: "simple",
  codingLevel: "beginner",

  // Step Data
  selectedCategory: null,
  projectDetails: initialProjectDetails,
  brandBuilder: initialBrandBuilder,
  selectedDesignStyle: null,
  selectedFeatures: [],
  setupApis: [],
  apiCredentials: initialApiCredentials,
  selectedAIModel: null,
  selectedTechStack: [],

  // New Upgraded SaaS Options
  customThemePrompt: "",
  showOptionalServices: true,
  selectedSections: [],

  // Prompt Output
  generatedPrompt: "",
  isGenerating: false,

  // Actions
  setStep: (step: number) => set({ currentStep: step }),
  nextStep: () => set((state) => {
    const maxSteps = state.builderMode === "simple" ? 7 : 11;
    return { currentStep: Math.min(state.currentStep + 1, maxSteps) };
  }),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  setBuilderMode: (mode) => set({ builderMode: mode }),
  setCodingLevel: (level) => set({ codingLevel: level }),
  
  setCategory: (category: Category) => {
    // Determine prebuilt recommended section sequence based on category
    let recommended: string[] = ["Hero", "About", "Services", "Testimonials", "Contact", "Footer"];
    if (category.id === "portfolio") {
      recommended = ["Hero", "About", "Skills", "Projects", "Testimonials", "Contact", "Footer"];
    } else if (category.id === "football-academy" || category.id === "sports-academy") {
      recommended = ["Hero", "About", "Programs", "Coaches", "Gallery", "Schedule", "Fees", "Testimonials", "Contact", "Footer"];
    } else if (category.id === "saas" || category.id === "dashboard") {
      recommended = ["Hero", "About", "SaaS Core Features", "Usage Tracking Dashboard", "Pricing Grid", "Testimonials", "Contact Form", "Footer"];
    }

    set({
      selectedCategory: category,
      selectedSections: recommended,
    });
  },
  
  setProjectDetails: (details: Partial<ProjectDetails>) =>
    set((state) => ({
      projectDetails: { ...state.projectDetails, ...details },
    })),

  setBrandBuilder: (brand: Partial<BrandBuilder>) =>
    set((state) => ({
      brandBuilder: { ...state.brandBuilder, ...brand },
    })),

  setDesignStyle: (style: DesignStyle | null) => set({ selectedDesignStyle: style }),

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

  setAIModel: (model: AIModel) => set({ selectedAIModel: model }),

  toggleTechStack: (itemId: string) =>
    set((state) => ({
      selectedTechStack: state.selectedTechStack.includes(itemId)
        ? state.selectedTechStack.filter((id) => id !== itemId)
        : [...state.selectedTechStack, itemId],
    })),

  setSelectedTechStack: (itemIds: string[]) => set({ selectedTechStack: itemIds }),

  setCustomThemePrompt: (prompt: string) => set({ customThemePrompt: prompt }),
  setShowOptionalServices: (show: boolean) => set({ showOptionalServices: show }),
  setSectionsSequence: (sections: string[]) => set({ selectedSections: sections }),

  setGeneratedPrompt: (prompt: string) => set({ generatedPrompt: prompt }),
  setIsGenerating: (generating: boolean) => set({ isGenerating: generating }),

  applyPreset: (preset: PresetPack) =>
    set((state) => {
      let recommended: string[] = ["Hero", "About", "Services", "Testimonials", "Contact", "Footer"];
      if (preset.category === "portfolio") {
        recommended = ["Hero", "About", "Skills", "Projects", "Testimonials", "Contact", "Footer"];
      } else if (preset.category === "football-academy") {
        recommended = ["Hero", "About", "Programs", "Coaches", "Gallery", "Schedule", "Fees", "Testimonials", "Contact", "Footer"];
      } else if (preset.category === "saas") {
        recommended = ["Hero", "About", "SaaS Core Features", "Usage Tracking Dashboard", "Pricing Grid", "Testimonials", "Contact Form", "Footer"];
      }

      return {
        selectedCategory: {
          id: preset.category,
          name: preset.category.toUpperCase().replace("_", " "),
          description: preset.description,
          icon: "Globe",
          tags: [],
        },
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

  resetBuilder: () =>
    set({
      currentStep: 1,
      builderMode: "simple",
      codingLevel: "beginner",
      selectedCategory: null,
      projectDetails: initialProjectDetails,
      brandBuilder: initialBrandBuilder,
      selectedDesignStyle: null,
      selectedFeatures: [],
      setupApis: [],
      apiCredentials: initialApiCredentials,
      selectedAIModel: null,
      selectedTechStack: [],
      customThemePrompt: "",
      showOptionalServices: true,
      selectedSections: [],
      generatedPrompt: "",
      isGenerating: false,
    }),
}));
