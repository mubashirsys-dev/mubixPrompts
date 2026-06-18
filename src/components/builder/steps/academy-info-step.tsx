"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Shield, MapPin, Trophy, Target } from "lucide-react";

export function AcademyInfoStep() {
  const { projectDetails, setProjectDetails, categoryAnswers, setCategoryAnswers } = useBuilderStore();

  const info = categoryAnswers.academyInfo || {
    trainingGrounds: "",
    ageRange: "Under 6 to Under 18",
    foundedYear: "2026",
    accreditation: "National Association Accredited"
  };

  const handleUpdateInfo = (fields: Partial<typeof info>) => {
    setCategoryAnswers({
      ...categoryAnswers,
      academyInfo: {
        ...info,
        ...fields
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#A78BFA] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Shield className="w-5 h-5 text-black animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Academy Info</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Set up your football academy profile, facilities, and core credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Naming & Tagline */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Academy Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Football Academy, Mubix FC"
              value={projectDetails.projectName || ""}
              onChange={(e) => setProjectDetails({ projectName: e.target.value, businessName: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Tagline / Motto*</label>
            <input
              type="text"
              required
              placeholder="e.g. Nurturing the next generation of football champions."
              value={projectDetails.tagline || ""}
              onChange={(e) => setProjectDetails({ tagline: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Academy Mission / Bio</label>
            <textarea
              placeholder="Detail your coaching philosophy, youth development values, and academy vision..."
              value={projectDetails.projectGoals || ""}
              onChange={(e) => setProjectDetails({ projectGoals: e.target.value })}
              rows={4}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000] resize-none"
            />
          </div>
        </div>

        {/* Right Column: Training facilities & Ages */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Training Grounds & Facilities
            </label>
            <input
              type="text"
              placeholder="e.g. Olympic Stadium Annex, Field 4 AstroTurf"
              value={info.trainingGrounds}
              onChange={(e) => handleUpdateInfo({ trainingGrounds: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              Target Age Cohorts
            </label>
            <input
              type="text"
              placeholder="e.g. Under-8 (U8) to Under-18 (U18)"
              value={info.ageRange}
              onChange={(e) => handleUpdateInfo({ ageRange: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[#FFD93D]" />
                Founded Year
              </label>
              <input
                type="text"
                placeholder="2018"
                value={info.foundedYear}
                onChange={(e) => handleUpdateInfo({ foundedYear: e.target.value })}
                className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Affiliation / Accreditation</label>
              <input
                type="text"
                placeholder="e.g. UEFA Elite Partner"
                value={info.accreditation}
                onChange={(e) => handleUpdateInfo({ accreditation: e.target.value })}
                className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
