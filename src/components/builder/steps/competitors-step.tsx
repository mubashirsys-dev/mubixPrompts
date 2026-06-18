"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Swords, Plus, Trash2, ShieldAlert, Sparkles } from "lucide-react";
import { useState } from "react";

interface Competitor {
  name: string;
  website?: string;
  strengths: string;
  positioning: string;
}

export function CompetitorsStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [compName, setCompName] = useState("");
  const [compWeb, setCompWeb] = useState("");
  const [compStr, setCompStr] = useState("");
  const [compPos, setCompPos] = useState("");

  const list: Competitor[] = categoryAnswers.competitors || [];

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim()) return;

    const updatedList = [
      ...list,
      {
        name: compName.trim(),
        website: compWeb.trim() || undefined,
        strengths: compStr.trim(),
        positioning: compPos.trim()
      }
    ];

    setCategoryAnswers({
      ...categoryAnswers,
      competitors: updatedList
    });

    setCompName("");
    setCompWeb("");
    setCompStr("");
    setCompPos("");
  };

  const handleDeleteCompetitor = (idx: number) => {
    const updatedList = list.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      competitors: updatedList
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Swords className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Competitor Intelligence</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Identify competitors and outline your strategic positioning advantage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form panel */}
        <form onSubmit={handleAddCompetitor} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#FF6B6B] stroke-[3px]" />
            Register Competitor
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Competitor Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Asana, Jira"
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Website (Optional)</label>
            <input
              type="url"
              placeholder="e.g. https://asana.com"
              value={compWeb}
              onChange={(e) => setCompWeb(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Their Strengths</label>
            <input
              type="text"
              placeholder="e.g. Robust reporting, legacy user adoption"
              value={compStr}
              onChange={(e) => setCompStr(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Your Positioning / Advantage</label>
            <textarea
              placeholder="e.g. 10x faster speed, keyboard-first navigation, cleaner modern neobrutalist UX..."
              value={compPos}
              onChange={(e) => setCompPos(e.target.value)}
              rows={2}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors shadow-[2px_2px_0px_0px_#FFD93D]"
          >
            Save Competitor Info
          </button>
        </form>

        {/* Competitors List */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
            Strategic Comparison Matrix ({list.length})
          </h3>

          {list.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-2">
              <ShieldAlert className="w-6 h-6 text-neutral-400" />
              <p className="text-xs font-bold text-neutral-500 uppercase">No competitors registered.</p>
              <p className="text-[9px] text-neutral-400 font-semibold max-w-[200px]">Define competing platforms to shape AI differentiation rules.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {list.map((c, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs uppercase text-black">{c.name}</span>
                      {c.website && (
                        <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono font-bold text-blue-500 hover:underline">
                          {c.website.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      )}
                    </div>
                    {c.strengths && (
                      <p className="text-[9.5px] font-bold text-neutral-500">
                        ⚡ <strong className="text-black uppercase text-[8px] font-black">Strengths:</strong> {c.strengths}
                      </p>
                    )}
                    {c.positioning && (
                      <p className="text-[9.5px] font-bold text-neutral-600 bg-neutral-50 border border-neutral-100 p-1.5 rounded">
                        💡 <strong className="text-emerald-600 uppercase text-[8px] font-black">Your Angle:</strong> {c.positioning}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCompetitor(idx)}
                    className="p-1 border border-black hover:bg-[#FF6B6B] text-black hover:text-white transition-all shadow-[1px_1px_0px_0px_#000] active:translate-y-0.5 active:shadow-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
