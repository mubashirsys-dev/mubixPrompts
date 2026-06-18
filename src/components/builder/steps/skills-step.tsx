"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Award, Plus, X, Sparkles } from "lucide-react";
import { useState } from "react";

const CATEGORIZED_SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5/CSS3", "JavaScript"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "MongoDB", "Prisma", "Python", "Docker"]
  },
  {
    category: "Design / Motion",
    items: ["UI/UX Design", "Figma", "Framer Motion", "Shadcn UI", "Webflow", "Responsive Design"]
  },
  {
    category: "Tools & Testing",
    items: ["Git & GitHub", "Vercel", "Jest", "Playwright", "SEO Optimization", "REST APIs"]
  }
];

export function SkillsStep() {
  const { resumeData, setResumeData } = useBuilderStore();
  const [customSkill, setCustomSkill] = useState("");

  const data = resumeData || {
    name: "",
    bio: "",
    skills: [],
    projects: [],
    companies: [],
    achievements: [],
    education: [],
    certifications: [],
    socialLinks: []
  };

  const handleToggleSkill = (skill: string) => {
    const isSelected = data.skills.includes(skill);
    const updatedSkills = isSelected
      ? data.skills.filter(s => s !== skill)
      : [...data.skills, skill];

    setResumeData({
      ...data,
      skills: updatedSkills
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkill.trim()) return;

    const trimmed = customSkill.trim();
    if (!data.skills.includes(trimmed)) {
      setResumeData({
        ...data,
        skills: [...data.skills, trimmed]
      });
    }

    setCustomSkill("");
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Award className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Skills & Expertise</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Toggle your primary capabilities and register custom specialties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Columns: Preset Categorized Toggles */}
        <div className="md:col-span-2 space-y-5">
          {CATEGORIZED_SKILLS.map((cat, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-xs font-black uppercase text-neutral-500 tracking-wider font-mono">
                // {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => {
                  const isActive = data.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 border-2 border-black text-xs font-black uppercase transition-all duration-100 ${
                        isActive
                          ? "bg-[#FFD93D] text-black shadow-[2px_2px_0px_0px_#000] translate-y-[-1px]"
                          : "bg-white text-neutral-600 hover:bg-neutral-50 shadow-[1px_1px_0px_0px_#000] hover:translate-y-[-0.5px]"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right 1 Column: Custom Skills Register */}
        <div className="space-y-4 border-l-0 md:border-l-2 border-black/10 md:pl-6">
          <form onSubmit={handleAddCustomSkill} className="space-y-3 bg-[#FFFDF5] border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
            <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
              Add Custom Skill
            </h3>
            <input
              type="text"
              placeholder="e.g. Kubernetes, WebGL"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
            <button
              type="submit"
              className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
            >
              Add to Profile
            </button>
          </form>

          {/* Active Skills List */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase text-black flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              Selected Expertise ({data.skills.length})
            </h3>
            {data.skills.length === 0 ? (
              <p className="text-[9px] font-bold text-neutral-400 uppercase italic pl-1">No skills selected. Click presets above or register custom ones.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-1 bg-[#C4B5FD] border border-black shadow-[1px_1px_0px_0px_#000]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className="hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="w-3 h-3 stroke-[3px]" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
