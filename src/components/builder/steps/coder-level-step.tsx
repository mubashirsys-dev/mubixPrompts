"use client";

import { useBuilderStore } from "@/store/builder-store";
import { CodingLevel } from "@/types/builder";
import { Sparkles, GraduationCap, Code, ShieldCheck, HelpCircle, ToggleLeft, ToggleRight } from "lucide-react";

export function CoderLevelStep() {
  const { codingLevel, setCodingLevel, builderMode, setBuilderMode, showOptionalServices, setShowOptionalServices, nextStep, prevStep } = useBuilderStore();

  const levels = [
    {
      id: "non-technical" as CodingLevel,
      name: "Non-Technical",
      desc: "I cannot code. AI needs to spoonfeed me setup instructions step-by-step.",
      icon: HelpCircle,
      color: "bg-[#FF6B6B] text-white",
    },
    {
      id: "beginner" as CodingLevel,
      name: "Beginner",
      desc: "I know basic coding. I need clear explanations, complete copy-paste files, and API helper guides.",
      icon: GraduationCap,
      color: "bg-[#FFD93D] text-black",
    },
    {
      id: "junior" as CodingLevel,
      name: "Junior Developer",
      desc: "I can edit projects. Focus on hooks, clean files, state, and standard dependencies.",
      icon: Code,
      color: "bg-[#C4B5FD] text-black",
    },
    {
      id: "senior" as CodingLevel,
      name: "Senior Developer",
      desc: "Architecture-first. No spoonfeeding. Give me database schemas, protected route triggers, and core state setups.",
      icon: ShieldCheck,
      color: "bg-black text-white",
    },
  ];

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      {/* Dynamic Mode Switch & Services Toggle */}
      <div className="border-4 border-black p-6 bg-[#FFFDF5] text-center space-y-6 shadow-[4px_4px_0px_0px_#000]">
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase text-black">
            SELECT YOUR WIZARD MODE
          </h3>
          <p className="text-sm font-bold text-black/75 max-w-xl mx-auto">
            Choose **Simple Mode** for a fast 6-step prompt, or **Advanced Mode** to configure custom APIs, branding guides, tech stacks, and more.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setBuilderMode("simple")}
            className={`px-6 py-2.5 border-4 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_#000] transition-all ${
              builderMode === "simple"
                ? "bg-[#FFD93D] text-black translate-x-[1px] translate-y-[1px]"
                : "bg-white text-black hover:bg-neutral-50"
            }`}
          >
            🟢 Simple Mode (7 steps)
          </button>
          <button
            onClick={() => setBuilderMode("advanced")}
            className={`px-6 py-2.5 border-4 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_#000] transition-all ${
              builderMode === "advanced"
                ? "bg-[#FF6B6B] text-white translate-x-[1px] translate-y-[1px]"
                : "bg-white text-black hover:bg-neutral-50"
            }`}
          >
            🔥 Advanced Mode (11 steps)
          </button>
        </div>

        {/* Optional Services only Toggle */}
        <div className="border-t-2 border-dashed border-black/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
          <div className="text-left">
            <span className="text-xs font-black uppercase text-black block">🔒 REQUIRE SECURE API BACKENDS?</span>
            <span className="text-[10px] font-bold text-black/60">If turned off, auth, storage, database and billing step sections are skipped for absolute speed.</span>
          </div>
          <button
            onClick={() => setShowOptionalServices(!showOptionalServices)}
            className={`py-2 px-4 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 ${
              showOptionalServices ? "bg-[#C4B5FD] text-black" : "bg-white text-black/50"
            }`}
          >
            {showOptionalServices ? (
              <>
                <ToggleRight className="w-5 h-5 text-black stroke-[2.5px]" />
                APIs Active
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-black/40 stroke-[2.5px]" />
                APIs Hidden
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-black uppercase tracking-tight text-black text-center">
          WHAT IS YOUR CODING LEVEL?
        </h3>
        <p className="text-sm font-bold text-black/70 text-center max-w-lg mx-auto">
          We customize the generated prompts based on your skillset. Beginners get click-by-click environment guides, seniors get raw architecture schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((level) => {
          const isSelected = codingLevel === level.id;
          const Icon = level.icon;

          return (
            <div
              key={level.id}
              onClick={() => setCodingLevel(level.id)}
              className={`border-4 border-black p-6 cursor-pointer transition-all duration-100 flex items-start gap-4 select-none ${
                isSelected
                  ? "bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              <div className={`p-3 border-2 border-black ${level.color} shadow-[2px_2px_0px_0px_#000]`}>
                <Icon className="w-6 h-6 stroke-[3px]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black uppercase text-black flex items-center gap-2">
                  {level.name}
                  {isSelected && (
                    <span className="bg-[#FFD93D] text-[10px] font-black uppercase px-2 py-0.5 border border-black rotate-[2deg]">
                      Active
                    </span>
                  )}
                </h4>
                <p className="text-sm font-bold text-black/70 leading-relaxed">
                  {level.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-black">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2 px-6 font-black uppercase flex items-center gap-2"
        >
          Continue
          <Sparkles className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
