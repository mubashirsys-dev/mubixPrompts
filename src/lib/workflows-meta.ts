// ============================================================
// MubixPrompts — CATEGORY WORKFLOWS METADATA
// ============================================================

export interface WorkflowStepMeta {
  id: string;
  label: string;
}

export function getCategoryWorkflowMeta(categoryId: string | null): WorkflowStepMeta[] {
  if (!categoryId) {
    return [
      { id: "category", label: "Category" }
    ];
  }

  switch (categoryId) {
    case "portfolio":
      return [
        { id: "category", label: "Category" },
        { id: "goals", label: "Goals" },
        { id: "brand", label: "Brand" },
        { id: "theme", label: "Portfolio Style" },
        { id: "features", label: "Portfolio Sections" },
        { id: "content", label: "Content" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "resume-builder":
      return [
        { id: "category", label: "Category" },
        { id: "goals", label: "Goals" },
        { id: "resume", label: "Profile Info" },
        { id: "skills", label: "Skills Details" },
        { id: "projects", label: "Projects Details" },
        { id: "theme", label: "Resume Style" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "agency":
      return [
        { id: "category", label: "Category" },
        { id: "goals", label: "Goals" },
        { id: "brand", label: "Agency Brand" },
        { id: "features", label: "Agency Sections" },
        { id: "theme", label: "Agency Style" },
        { id: "content", label: "Agency Content" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "blogging":
      return [
        { id: "category", label: "Category" },
        { id: "goals", label: "Goals" },
        { id: "brand", label: "Blog Brand" },
        { id: "features", label: "Blog Sections" },
        { id: "theme", label: "Blog Style" },
        { id: "content", label: "Blog Content" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "saas-dashboard":
      return [
        { id: "category", label: "Category" },
        { id: "product", label: "Product" },
        { id: "features", label: "Features" },
        { id: "pricing", label: "Pricing" },
        { id: "competitors", label: "Competitors" },
        { id: "theme", label: "Theme" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "restaurant":
      return [
        { id: "category", label: "Category" },
        { id: "restaurant-details", label: "Restaurant Details" },
        { id: "menu", label: "Menu" },
        { id: "reservation", label: "Reservation" },
        { id: "theme", label: "Theme" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "football-academy":
      return [
        { id: "category", label: "Category" },
        { id: "academy-info", label: "Academy Info" },
        { id: "coaches", label: "Coaches" },
        { id: "programs", label: "Programs" },
        { id: "theme", label: "Theme" },
        { id: "ai-model", label: "AI Model" }
      ];

    case "mosque":
      return [
        { id: "category", label: "Category" },
        { id: "prayer-timings", label: "Prayer Timings" },
        { id: "events", label: "Events" },
        { id: "donations", label: "Donations" },
        { id: "theme", label: "Theme" },
        { id: "ai-model", label: "AI Model" }
      ];

    default:
      // Default fallback workflow for any other category
      return [
        { id: "category", label: "Category" },
        { id: "goals", label: "Goals" },
        { id: "brand", label: "Brand" },
        { id: "theme", label: "Theme" },
        { id: "ai-model", label: "AI Model" }
      ];
  }
}
