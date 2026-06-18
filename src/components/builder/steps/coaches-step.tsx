"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Users, Plus, Trash2, Shield, Sparkles } from "lucide-react";
import { useState } from "react";

interface Coach {
  name: string;
  role: string;
  license: string;
  experience: string;
}

export function CoachesStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");

  const coaches: Coach[] = categoryAnswers.coaches || [
    { name: "Coach Marcus Vance", role: "Head of Youth Development", license: "UEFA Pro License", experience: "12+ years experience in European youth setups" },
    { name: "Coach Sarah Lin", role: "Tactical & Skills Specialist", license: "UEFA A License", experience: "Former national player, specialist in tactical intelligence" }
  ];

  const handleAddCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    const newCoach: Coach = {
      name: name.trim(),
      role: role.trim(),
      license: license.trim(),
      experience: experience.trim()
    };

    setCategoryAnswers({
      ...categoryAnswers,
      coaches: [...coaches, newCoach]
    });

    setName("");
    setRole("");
    setLicense("");
    setExperience("");
  };

  const handleDeleteCoach = (idx: number) => {
    const updatedCoaches = coaches.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      coaches: updatedCoaches
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Users className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Coaching Staff</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Add details about your licensed coaches, trainers, and specialists</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <form onSubmit={handleAddCoach} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
            Register Trainer / Coach
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Full Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Coach David Beckham"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Role / Specialization*</label>
            <input
              type="text"
              required
              placeholder="e.g. Head Goalkeeper Trainer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">License / Certification</label>
            <input
              type="text"
              placeholder="e.g. UEFA B, USSF National C"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Bio / Experience</label>
            <textarea
              placeholder="Brief professional background, coaching years, previous clubs..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={2}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
          >
            Add Coach to Roster
          </button>
        </form>

        {/* Right Staff Viewer Panel */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            Staff Roster Directory ({coaches.length})
          </h3>

          {coaches.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-bold text-neutral-500 uppercase">Roster is empty.</p>
              <p className="text-[9px] text-neutral-400">Fill in the fields on the left to register your coaches.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {coaches.map((coach, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-xs uppercase text-black">{coach.name}</span>
                      <span className="text-[9px] font-black uppercase text-[#FF6B6B]">{coach.role}</span>
                      {coach.license && (
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-neutral-100 border border-black/10 text-neutral-500 flex items-center gap-0.5 rounded">
                          <Shield className="w-2.5 h-2.5" />
                          {coach.license}
                        </span>
                      )}
                    </div>
                    {coach.experience && (
                      <p className="text-[9.5px] font-bold text-neutral-500 leading-normal">{coach.experience}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteCoach(idx)}
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
