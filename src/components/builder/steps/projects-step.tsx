"use client";

import { useBuilderStore } from "@/store/builder-store";
import { FolderGit2, Plus, Trash2, Link, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";

export function ProjectsStep() {
  const { resumeData, setResumeData } = useBuilderStore();
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newUrl, setNewUrl] = useState("");

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

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const techArray = newTech
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updatedProjects = [
      ...data.projects,
      {
        title: newTitle.trim(),
        description: newDesc.trim(),
        tech: techArray,
        url: newUrl.trim() || undefined
      }
    ];

    setResumeData({
      ...data,
      projects: updatedProjects
    });

    setNewTitle("");
    setNewDesc("");
    setNewTech("");
    setNewUrl("");
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== index);
    setResumeData({
      ...data,
      projects: updatedProjects
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#A78BFA] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <FolderGit2 className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Portfolio Projects</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Showcase your coding achievements and personal apps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Add Project Form */}
        <form onSubmit={handleAddProject} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#A78BFA] stroke-[3px]" />
            Add New Project
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Project Title*</label>
            <input
              type="text"
              required
              placeholder="e.g. Mubix OS Lite"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Description</label>
            <textarea
              placeholder="e.g. Minimalist personal workspace with neobrutalist design..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={3}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Tech Stack (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Tailwind CSS, Zustand"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Project URL (Optional)</label>
            <input
              type="url"
              placeholder="e.g. https://github.com/mubix"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#A78BFA] border-2 border-black text-xs font-black uppercase text-black hover:bg-[#9075e3] shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all"
          >
            Add Project
          </button>
        </form>

        {/* Right Side: Projects List */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <Sparkles className="w-4 h-4 text-[#FFD93D]" />
            Showcase List ({data.projects.length})
          </h3>

          {data.projects.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-neutral-400" />
              <p className="text-xs font-bold text-neutral-500 uppercase">No projects added yet.</p>
              <p className="text-[9px] text-neutral-400 font-semibold max-w-[200px]">Use the left panel to insert your portfolio project items.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {data.projects.map((project, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm uppercase text-black">{project.title}</span>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors">
                          <Link className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-[10px] font-bold text-neutral-600 leading-normal">{project.description}</p>
                    )}
                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-neutral-100 border border-black/10 text-neutral-500 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(idx)}
                    className="p-1.5 border border-black hover:bg-[#FF6B6B] text-black hover:text-white transition-all shadow-[1px_1px_0px_0px_#000] active:translate-y-0.5 active:shadow-none"
                    title="Delete project"
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
