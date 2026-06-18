"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Clock, ShieldAlert, Sparkles } from "lucide-react";

export function PrayerTimingsStep() {
  const { categoryAnswers, setCategoryAnswers, projectDetails, setProjectDetails } = useBuilderStore();

  const timings = categoryAnswers.prayerTimings || {
    fajr: "04:30 AM",
    sunrise: "06:00 AM",
    dhuhr: "12:30 PM",
    asr: "03:45 PM",
    maghrib: "07:15 PM",
    isha: "08:45 PM",
    jummah: "01:30 PM",
    calculationMethod: "Islamic Society of North America (ISNA)"
  };

  const handleUpdateTimings = (fields: Partial<typeof timings>) => {
    setCategoryAnswers({
      ...categoryAnswers,
      prayerTimings: {
        ...timings,
        ...fields
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#4ade80] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Clock className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Mosque Profile & Prayer Timings</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure daily congregational (Iqamah) timings and Friday Jummah services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form: Mosque Details */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Mosque Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Masjid Al-Noor, Islamic Center of Mubix"
              value={projectDetails.projectName || ""}
              onChange={(e) => setProjectDetails({ projectName: e.target.value, businessName: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Motto / Tagline*</label>
            <input
              type="text"
              required
              placeholder="e.g. Serving the community, fostering unity and spiritual growth."
              value={projectDetails.tagline || ""}
              onChange={(e) => setProjectDetails({ tagline: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Calculation Method / Authority</label>
            <select
              value={timings.calculationMethod}
              onChange={(e) => handleUpdateTimings({ calculationMethod: e.target.value })}
              className="w-full px-2 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="Umm Al-Qura University, Makkah">Umm Al-Qura University, Makkah</option>
              <option value="Muslim World League (MWL)">Muslim World League (MWL)</option>
              <option value="Islamic Society of North America (ISNA)">Islamic Society of North America (ISNA)</option>
              <option value="Egyptian General Authority of Survey">Egyptian General Authority of Survey</option>
              <option value="University of Islamic Sciences, Karachi">University of Islamic Sciences, Karachi</option>
            </select>
          </div>
        </div>

        {/* Right Form: Prayer timings grid */}
        <div className="md:col-span-7 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FFD93D] fill-current" />
            Set Congregational Iqamah Times
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "fajr", label: "Fajr" },
              { id: "sunrise", label: "Sunrise" },
              { id: "dhuhr", label: "Dhuhr" },
              { id: "asr", label: "Asr" },
              { id: "maghrib", label: "Maghrib" },
              { id: "isha", label: "Isha" },
              { id: "jummah", label: "Jummah" }
            ].map((p) => (
              <div key={p.id} className="space-y-1">
                <label className="text-[9px] font-black uppercase text-neutral-500 block">{p.label}</label>
                <input
                  type="text"
                  value={(timings as any)[p.id] || ""}
                  onChange={(e) => handleUpdateTimings({ [p.id]: e.target.value })}
                  className="w-full px-2 py-1 border-2 border-black bg-white text-xs font-mono font-bold outline-none shadow-[1px_1px_0px_0px_#000] text-center"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#FFEB3B]/20 border border-black text-[9.5px] font-bold text-amber-900 leading-normal uppercase">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Timings represent local congregational Iqamah times (when prayer starts after Adhan).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
