"use client";

import { useBuilderStore } from "@/store/builder-store";
import { ComplexityTier } from "@/types/builder";
import { ArrowLeft, ArrowRight, Check, Target, Zap } from "lucide-react";

interface GoalOption {
  id: string;
  label: string;
  desc: string;
}

const GOALS_LIST: GoalOption[] = [
  { id: "get-clients", label: "Get Clients", desc: "Attract inbound inquiries and customer bookings" },
  { id: "showcase-portfolio", label: "Showcase Portfolio", desc: "Display projects and achievements visually" },
  { id: "sell-products", label: "Sell Products", desc: "Enable direct sales of physical or digital items" },
  { id: "generate-leads", label: "Generate Leads", desc: "Capture emails and requests through forms" },
  { id: "book-appointments", label: "Book Appointments", desc: "Enable clients to schedule slots directly" },
  { id: "build-brand", label: "Build Brand", desc: "Create a modern presence to establish trust" },
  { id: "share-content", label: "Share Content", desc: "Publish educational posts, articles, and newsletters" },
];

export function WebsiteGoalsStep() {
  const {
    websiteGoals,
    setWebsiteGoals,
    nextStep,
    prevStep
  } = useBuilderStore();

  const handleToggleGoal = (goalId: string) => {
    if (websiteGoals.includes(goalId)) {
      setWebsiteGoals(websiteGoals.filter(id => id !== goalId));
    } else {
      setWebsiteGoals([...websiteGoals, goalId]);
    }
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 3: BLUEPRINT GOALS
        </span>
        <h2 className="text-3xl font-black uppercase text-black">
          Define Your Objectives
        </h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Select what you want this website to achieve.
        </p>
      </div>

      {/* Section 1: Main Goals Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase text-black flex items-center gap-2 border-b-2 border-black pb-2">
          <Target className="w-4 h-4 text-[#FF6B6B]" />
          What is your primary website goal? (Multi-select)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOALS_LIST.map((goal) => {
            const isSelected = websiteGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleToggleGoal(goal.id)}
                className={`text-left p-4 border-2 border-black transition-all flex items-start gap-3.5 shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                  isSelected ? "bg-[#C4B5FD]/20 border-[#C4B5FD] shadow-[3px_3px_0px_0px_#C4B5FD]" : "bg-white hover:bg-neutral-50"
                }`}
              >
                <div className={`w-7 h-7 shrink-0 border-2 border-black flex items-center justify-center ${
                  isSelected ? "bg-[#C4B5FD] text-black" : "bg-neutral-100 text-black/50"
                }`}>
                  {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : <Target className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs text-black">{goal.label}</h4>
                  <p className="text-[10px] font-bold text-black/60 leading-relaxed mt-0.5">{goal.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6 border-t-4 border-black">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={websiteGoals.length === 0}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
