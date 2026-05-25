"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { getComplexityGatedSections } from "@/lib/category-intelligence";
import { ArrowUp, ArrowDown, Trash2, Plus, Copy, Sparkles, Layout, Lock } from "lucide-react";

export function SectionStep() {
  const { selectedSections, setSectionsSequence, selectedCategory, complexityTier, nextStep, prevStep } = useBuilderStore();
  const [newSection, setNewSection] = useState("");

  // Get complexity-gated defaults for reset
  const defaultSections = getComplexityGatedSections(selectedCategory?.id || null, complexityTier);

  // Locked sections that can't be removed
  const lockedSections = new Set(["Hero", "Footer"]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSeq = [...selectedSections];
    const temp = newSeq[index];
    newSeq[index] = newSeq[index - 1];
    newSeq[index - 1] = temp;
    setSectionsSequence(newSeq);
  };

  const moveDown = (index: number) => {
    if (index === selectedSections.length - 1) return;
    const newSeq = [...selectedSections];
    const temp = newSeq[index];
    newSeq[index] = newSeq[index + 1];
    newSeq[index + 1] = temp;
    setSectionsSequence(newSeq);
  };

  const removeSection = (index: number) => {
    if (lockedSections.has(selectedSections[index])) return;
    const newSeq = selectedSections.filter((_, i) => i !== index);
    setSectionsSequence(newSeq);
  };

  const duplicateSection = (index: number) => {
    const newSeq = [...selectedSections];
    newSeq.splice(index + 1, 0, `${newSeq[index]} (Copy)`);
    setSectionsSequence(newSeq);
  };

  const addCustomSection = () => {
    if (!newSection.trim()) return;
    setSectionsSequence([...selectedSections, newSection.trim()]);
    setNewSection("");
  };

  const complexityLabel = {
    simple: "Max 6 sections • Static landing page",
    standard: "Multi-section layout • No pricing/dashboards",
    advanced: "Full layout • Auth & API sections unlocked",
    enterprise: "All sections • Dashboards & admin included",
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 5: SECTION BUILDER
        </span>
        <h2 className="text-2xl font-black uppercase text-black">Website Section Sequence</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Arrange your homepage sections. The prompt will respect this exact order.
        </p>
        <p className="text-[10px] font-black uppercase text-[#C4B5FD] mt-1">
          {complexityLabel[complexityTier]}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Custom Section Adder */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a custom section (e.g. Gallery, Case Studies)..."
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            className="flex-1 neo-input text-xs sm:text-sm"
            onKeyDown={(e) => e.key === "Enter" && addCustomSection()}
          />
          <button
            onClick={addCustomSection}
            className="py-2.5 px-4 border-2 border-black bg-[#C4B5FD] hover:bg-[#b09ffd] font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            Add
          </button>
        </div>

        {/* Section List */}
        <div className="border-4 border-black bg-[#FFFDF5] p-4 space-y-3 shadow-[4px_4px_0px_0px_#000] max-h-[450px] overflow-y-auto">
          {selectedSections.length === 0 ? (
            <p className="text-center py-6 font-bold text-black/50 text-xs uppercase">No sections added yet!</p>
          ) : (
            selectedSections.map((section, idx) => {
              const isLocked = lockedSections.has(section);
              return (
                <div
                  key={`${section}-${idx}`}
                  className="flex items-center justify-between border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_#000]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 border-2 border-black bg-[#FFD93D] flex items-center justify-center text-[10px] font-black text-black">
                      {idx + 1}
                    </span>
                    <span className="font-black uppercase text-xs sm:text-sm text-black flex items-center gap-1.5">
                      <Layout className="w-4 h-4 text-black/60" />
                      {section}
                      {isLocked && <Lock className="w-3 h-3 text-black/30" />}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 border border-black bg-white hover:bg-neutral-50 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === selectedSections.length - 1}
                      className="p-1.5 border border-black bg-white hover:bg-neutral-50 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                    <button
                      onClick={() => duplicateSection(idx)}
                      className="p-1.5 border border-black bg-[#C4B5FD] hover:bg-[#b09ffd]"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                    <button
                      onClick={() => removeSection(idx)}
                      disabled={isLocked}
                      className={`p-1.5 border border-black ${isLocked ? "bg-neutral-200 opacity-30 cursor-not-allowed" : "bg-[#FF6B6B] hover:bg-red-500 text-white"}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={() => setSectionsSequence(defaultSections)}
            className="text-xs font-black uppercase text-black hover:underline"
          >
            [ Reset to Category Defaults ]
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-black">
        <button onClick={prevStep} className="neo-btn text-sm py-2 px-6 font-black uppercase">
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
        >
          Continue
          <Sparkles className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
