"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Award, Plus, Trash2, Calendar, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface Program {
  title: string;
  ageGroup: string;
  sessionsPerWeek: string;
  fee: string;
  description: string;
}

export function ProgramsStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [title, setTitle] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [sessions, setSessions] = useState("2 sessions / week");
  const [fee, setFee] = useState("");
  const [desc, setDesc] = useState("");

  const programs: Program[] = categoryAnswers.programs || [
    { title: "Junior Development Program", ageGroup: "U6 to U10", sessionsPerWeek: "2 sessions / week", fee: "$150 / term", description: "Fun, game-centered sessions focused on primary motor skills, agility, and fundamental ball control." },
    { title: "Elite Academy Squad", ageGroup: "U14 to U18", sessionsPerWeek: "4 sessions / week", fee: "$350 / term", description: "High-intensity tactical drills, competitive leagues participation, strength conditioning and match analysis." }
  ];

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !ageGroup.trim() || !fee.trim()) return;

    const newProgram: Program = {
      title: title.trim(),
      ageGroup: ageGroup.trim(),
      sessionsPerWeek: sessions,
      fee: fee.trim(),
      description: desc.trim()
    };

    setCategoryAnswers({
      ...categoryAnswers,
      programs: [...programs, newProgram]
    });

    setTitle("");
    setAgeGroup("");
    setSessions("2 sessions / week");
    setFee("");
    setDesc("");
  };

  const handleDeleteProgram = (idx: number) => {
    const updatedPrograms = programs.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      programs: updatedPrograms
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Award className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Training Programs</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure Academy coaching tiers, schedules, fees, and age cohorts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <form onSubmit={handleAddProgram} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
            Insert Training Program
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Program Title*</label>
            <input
              type="text"
              required
              placeholder="e.g. Grassroots Skills Academy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Age Cohort*</label>
              <input
                type="text"
                required
                placeholder="e.g. U11 - U13"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Term Fee / Rate*</label>
              <input
                type="text"
                required
                placeholder="e.g. $200 / term"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Frequency</label>
            <select
              value={sessions}
              onChange={(e) => setSessions(e.target.value)}
              className="w-full px-2 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            >
              <option value="1 session / week">1 session / week</option>
              <option value="2 sessions / week">2 sessions / week</option>
              <option value="3 sessions / week">3 sessions / week</option>
              <option value="4+ sessions / week">4+ sessions / week (Elite)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Program Description</label>
            <textarea
              placeholder="Core focus areas (dribbling, conditioning, agility), training goals..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
          >
            Create Program Tier
          </button>
        </form>

        {/* Right Programs Viewer Panel */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Academy Program Syllabus ({programs.length})
          </h3>

          {programs.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-bold text-neutral-500 uppercase">No programs configured.</p>
              <p className="text-[9px] text-neutral-400">Fill in the fields on the left to set up training courses.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {programs.map((prog, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-xs uppercase text-black">{prog.title}</span>
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-1 border border-emerald-200">{prog.fee}</span>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-[#C4B5FD] border border-black flex items-center gap-0.5 shadow-[0.5px_0.5px_0px_0px_#000]">
                        <Calendar className="w-2.5 h-2.5" />
                        {prog.sessionsPerWeek}
                      </span>
                      <span className="text-[8px] font-black uppercase px-1 py-0.2 bg-neutral-100 border border-neutral-300 text-neutral-500 rounded">
                        {prog.ageGroup}
                      </span>
                    </div>
                    {prog.description && (
                      <p className="text-[9.5px] font-bold text-neutral-500 leading-normal">{prog.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteProgram(idx)}
                    className="p-1 border border-black hover:bg-[#FF6B6B] hover:text-white transition-colors"
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
