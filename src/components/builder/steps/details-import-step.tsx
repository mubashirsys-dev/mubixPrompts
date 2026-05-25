"use client";

import { useState, useCallback, useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { ResumeData } from "@/types/builder";
import { Upload, Check, Trash2, FileText, Sparkles, User, Building2, UtensilsCrossed, ArrowRight, ArrowLeft, Plus, X } from "lucide-react";

export function DetailsImportStep() {
  const {
    selectedCategory,
    resumeData,
    setResumeData,
    projectDetails,
    setProjectDetails,
    websiteContent,
    setWebsiteContent,
    nextStep,
    prevStep,
    brandBuilder,
    setBrandBuilder
  } = useBuilderStore();

  const isPortfolioOrResume = selectedCategory?.id === "portfolio" || selectedCategory?.id === "resume-builder";
  const isRestaurant = selectedCategory?.id === "restaurant";

  // Mode determines what forms we display
  const mode = isPortfolioOrResume ? "personal" : isRestaurant ? "restaurant" : "business";

  // Local file upload states (simulated scanning)
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Auto-fill defaults if not already present
  useEffect(() => {
    if (!projectDetails.projectName && selectedCategory) {
      if (mode === "personal") {
        setProjectDetails({
          projectName: "Mohammed Mubashir",
          businessName: "Frontend Engineer",
          tagline: "High-performance frontend engineer specializing in responsive React systems.",
        });
      } else if (mode === "restaurant") {
        setProjectDetails({
          projectName: "Mubix Bistro",
          businessName: "Restaurant",
          tagline: "Vibrant Mediterranean dining, custom curated menus, and tableside reservation systems.",
        });
      } else {
        setProjectDetails({
          projectName: selectedCategory.name + " Hub",
          businessName: selectedCategory.name,
          tagline: selectedCategory.description,
        });
      }
    }
  }, [mode, selectedCategory, projectDetails.projectName, setProjectDetails]);

  // Handler to compile placeholder personal profile
  const handleLoadPersonalPlaceholder = useCallback(() => {
    const placeholderResume: ResumeData = {
      name: "Mohammed Mubashir",
      bio: "High-performance Frontend Engineer and UI/UX Developer specializing in responsive React systems, interactive visual dashboards, and custom Neobrutalist design structures.",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "Node.js", "GraphQL", "REST APIs", "UI/UX Prototyping"],
      projects: [
        { title: "Mubix Term Portfolio", description: "Interactive retro-brutalist shell CLI developer portfolio with live theme compilation.", tech: ["Next.js", "TypeScript", "Tailwind CSS", "Xterm.js"] },
        { title: "Adaptive Planning Engine", description: "Category-driven and complexity-aware AI website design blueprint OS.", tech: ["React", "Zustand", "Framer Motion", "Tailwind CSS"] }
      ],
      companies: [
        { name: "Mubix Dev Labs", role: "Senior UX Architect & Engineer", duration: "2024 - Present", description: "Spearheaded frontend design systems and accelerated visual component assembly timelines by 40%." },
        { name: "SaaS Builders Inc", role: "Frontend Developer", duration: "2022 - 2024", description: "Integrated Stripe subscription paywalls and analytics charting layers into next-gen client portals." }
      ],
      achievements: [
        "First place winner at the 2025 Global Brutalist UI Hackathon",
        "Open-source contributor to core animations framework (1.5k+ GitHub stars)"
      ],
      education: [
        { institution: "Tech University", degree: "B.S. in Computer Science & Engineering", year: "2022" }
      ],
      certifications: [
        "Advanced Web Systems & Performance Optimizer",
        "UX Design Specialist Certification"
      ],
      socialLinks: [
        { platform: "GitHub", url: "https://github.com/mubashir" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/mubashir" }
      ]
    };

    setResumeData(placeholderResume);
    setProjectDetails({
      projectName: placeholderResume.name,
      businessName: "Frontend Engineer",
      tagline: placeholderResume.bio,
    });
  }, [setResumeData, setProjectDetails]);

  // Parse resume simulation
  const handleResumeUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            
            const extractedName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
            const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
            const name = capitalize(extractedName.split(" ")[0]) + (extractedName.split(" ")[1] ? " " + capitalize(extractedName.split(" ")[1]) : " Mubashir");

            const aiExtractedData: ResumeData = {
              name,
              bio: `Seasoned professional developer specializing in modern responsive systems, clean code architectures, and fluid UI interfaces. Highly experienced in client side optimization.`,
              skills: ["React", "TypeScript", "CSS3", "Next.js", "Node.js", "Responsive Design", "Git", "API Integration"],
              projects: [
                { title: "Responsive Web Project", description: "Successfully created and launched a high-performance personal web platform.", tech: ["React", "TypeScript", "Vite"] },
                { title: "Dynamic Client Dashboard", description: "Engineered responsive data views and interactive UI components.", tech: ["React", "Next.js", "Tailwind CSS"] }
              ],
              companies: [
                { name: "Innovative Dev Group", role: "Systems Engineer", duration: "2023 - Present", description: "Pioneered lightweight core component libraries." },
                { name: "Creative Web Agency", role: "Junior Web Developer", duration: "2021 - 2023", description: "Coded standard SEO pages and fluid scroll animations." }
              ],
              achievements: [
                "Boosted mobile Lighthouse loading speed to a clean 99 rating",
                "Delivered over 25 responsive developer portfolios successfully"
              ],
              education: [
                { institution: "Regional Institute of Science & Technology", degree: "B.Tech in Computer Engineering", year: "2021" }
              ],
              certifications: [
                "Responsive Frontend Design & Architecture Certified"
              ],
              socialLinks: [
                { platform: "GitHub", url: "https://github.com" },
                { platform: "LinkedIn", url: "https://linkedin.com" }
              ]
            };

            setResumeData(aiExtractedData);
            setProjectDetails({
              projectName: aiExtractedData.name,
              businessName: "Software Engineer",
              tagline: aiExtractedData.bio,
            });
          }, 350);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  }, [setResumeData, setProjectDetails]);

  // Profile image upload simulation
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setBrandBuilder({ avatarUrl: imageUrl });
    setProjectDetails({
      country: file.name
    });
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeData(null);
  };

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 2: SMART DETAILS IMPORT
        </span>
        <h2 className="text-3xl font-black uppercase text-black flex items-center justify-center gap-2">
          {mode === "personal" && <User className="w-7 h-7" />}
          {mode === "restaurant" && <UtensilsCrossed className="w-7 h-7" />}
          {mode === "business" && <Building2 className="w-7 h-7" />}
          {mode === "personal" ? "Import Your Professional Profile" : "Import Website Details"}
        </h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          {mode === "personal"
            ? "Upload your resume PDF/TXT or profile image to auto-fill your custom sections, or load a high-quality preset."
            : "Complete standard questions about your business, menu, or products to auto-fill core structures."
          }
        </p>
      </div>

      {/* Mode 1: Personal Profile Flow */}
      {mode === "personal" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Upload Container */}
            <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] flex flex-col justify-center items-center text-center min-h-[200px]">
              {isScanning ? (
                <div className="space-y-3 w-full px-2">
                  <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center mx-auto animate-bounce shadow-[2px_2px_0px_0px_#000]">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-black block">AI SCANNING & EXTRACTING RESUME...</span>
                  <div className="w-full bg-white border-2 border-black h-4 overflow-hidden p-0.5 shadow-[1.5px_1.5px_0px_0px_#000]">
                    <div
                      className="bg-[#C4B5FD] h-full border-r border-black transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              ) : resumeData ? (
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#4ade80] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
                    <FileText className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-green-600 block">✓ RESUME EXTRACTED</span>
                    <span className="text-[11px] font-black text-black block mt-1 truncate max-w-[200px]">{resumeFile?.name || "ExtractedProfile.pdf"}</span>
                  </div>
                  <button
                    onClick={handleRemoveResume}
                    className="neo-btn bg-[#FF6B6B] hover:bg-[#ff5252] text-[9px] font-black uppercase px-3 py-1 text-white flex items-center gap-1 mx-auto"
                  >
                    <Trash2 className="w-3 h-3" /> Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <Upload className="w-8 h-8 text-black/50 mx-auto" />
                  <span className="text-xs font-black uppercase text-black block">Upload Resume PDF/TXT/DOCX</span>
                  <label className="inline-block cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                    <span className="neo-btn bg-[#FFD93D] hover:bg-[#ffe270] text-[10px] font-black uppercase px-4 py-2 border-2 border-black inline-block">
                      Select Resume
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Profile Image & Quick Preset */}
            <div className="border-4 border-black p-5 bg-zinc-950 text-white shadow-[4px_4px_0px_0px_#000] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="neo-sticker bg-[#FF6B6B] text-white text-[8px] font-black uppercase tracking-wide">
                  PROFILE IMAGE
                </span>
                <h3 className="text-sm font-black uppercase text-[#FFD93D] flex items-center gap-1">
                  <User className="w-4 h-4" /> Upload Avatar (Optional)
                </h3>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  Upload your avatar image. Previews will crop it and adapt colors. <strong className="text-[#FFD93D]">Helper:</strong> Save image as "me.jpg" for best results.
                </p>

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <span className="px-3 py-1.5 border-2 border-white bg-white text-black hover:bg-neutral-100 text-[10px] font-black uppercase inline-block shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]">
                      {profileImageFile ? "✓ Selected" : "Upload Photo"}
                    </span>
                  </label>
                  {profileImageFile && (
                    <span className="text-[10px] text-white/60 truncate max-w-[150px]">
                      {profileImageFile.name}
                    </span>
                  )}
                </div>
                <div className="text-[9px] font-bold text-[#FFD93D] italic mt-1.5">
                  “Upload profile image for real-time theme previews.”
                </div>
              </div>

              <button
                onClick={handleLoadPersonalPlaceholder}
                className="neo-btn bg-[#C4B5FD] hover:bg-[#b09ffd] text-[10px] font-black uppercase py-2 text-black border-2 border-white shadow-[3px_3px_0px_0px_#fff] mt-4 flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> ⚡ Load Smart Preset Profile
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-4">
            <h3 className="text-xs font-black uppercase text-black border-b-2 border-black pb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
              Basic Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({ projectName: e.target.value })}
                  placeholder="e.g. Mohammed Mubashir"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Professional Title</label>
                <input
                  type="text"
                  value={projectDetails.businessName}
                  onChange={(e) => setProjectDetails({ businessName: e.target.value })}
                  placeholder="e.g. Frontend Engineer & Designer"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Short Intro / Bio</label>
                <textarea
                  value={projectDetails.tagline}
                  onChange={(e) => setProjectDetails({ tagline: e.target.value })}
                  placeholder="e.g. Building clean, high-performance web systems with Neobrutalist design."
                  rows={2}
                  className="w-full neo-input text-xs resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={resumeData?.skills.join(", ") || "React, TypeScript, CSS, Next.js, Framer Motion"}
                  onChange={(e) => {
                    const skillArr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                    setResumeData({
                      name: projectDetails.projectName || "Name",
                      bio: projectDetails.tagline || "Bio",
                      skills: skillArr,
                      projects: resumeData?.projects || [],
                      companies: resumeData?.companies || [],
                      achievements: resumeData?.achievements || [],
                      education: resumeData?.education || [],
                      certifications: resumeData?.certifications || [],
                      socialLinks: resumeData?.socialLinks || [],
                    });
                  }}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">GitHub URL</label>
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={websiteContent.socials.github}
                  onChange={(e) => setWebsiteContent({
                    socials: { ...websiteContent.socials, github: e.target.value }
                  })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                  value={websiteContent.socials.linkedin}
                  onChange={(e) => setWebsiteContent({
                    socials: { ...websiteContent.socials, linkedin: e.target.value }
                  })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Restaurant Profile Flow */}
      {mode === "restaurant" && (
        <div className="space-y-6">
          <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-4">
            <h3 className="text-xs font-black uppercase text-black border-b-2 border-black pb-1.5 flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-[#FF6B6B]" />
              Restaurant Particulars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Restaurant Name</label>
                <input
                  type="text"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({ projectName: e.target.value })}
                  placeholder="e.g. Mubix Bistro"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Cuisine / Theme</label>
                <input
                  type="text"
                  value={projectDetails.businessName}
                  onChange={(e) => setProjectDetails({ businessName: e.target.value })}
                  placeholder="e.g. Mediterranean, Italian Fine Dining"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Menu Items Summary</label>
                <textarea
                  value={projectDetails.tagline}
                  onChange={(e) => setProjectDetails({ tagline: e.target.value })}
                  placeholder="e.g. Signature Woodfired Pizzas, Handmade Ravioli, Organic Salads, Fine Cocktails"
                  rows={2}
                  className="w-full neo-input text-xs resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Operating Hours</label>
                <input
                  type="text"
                  placeholder="e.g. 11:00 AM - 10:00 PM Daily"
                  value={projectDetails.country}
                  onChange={(e) => setProjectDetails({ country: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Reservation Booking Link / Email</label>
                <input
                  type="text"
                  placeholder="e.g. reservations@mubixbistro.com"
                  value={projectDetails.targetAudience}
                  onChange={(e) => setProjectDetails({ targetAudience: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 742 Bistro Lane, New York, NY"
                  value={websiteContent.footer.addressText}
                  onChange={(e) => setWebsiteContent({
                    footer: { ...websiteContent.footer, addressText: e.target.value }
                  })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Generic Business / SaaS / Services Flow */}
      {mode === "business" && (
        <div className="space-y-6">
          <div className="border-4 border-black p-5 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-4">
            <h3 className="text-xs font-black uppercase text-black border-b-2 border-black pb-1.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#C4B5FD]" />
              Business Info & Blueprint Context
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Brand / Product Name</label>
                <input
                  type="text"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({ projectName: e.target.value })}
                  placeholder="e.g. AgencyX"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Niche / Services Categories</label>
                <input
                  type="text"
                  value={projectDetails.businessName}
                  onChange={(e) => setProjectDetails({ businessName: e.target.value })}
                  placeholder="e.g. Creative Development, AI Integrations, Design Systems"
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Short Description / Product Vision</label>
                <textarea
                  value={projectDetails.tagline}
                  onChange={(e) => setProjectDetails({ tagline: e.target.value })}
                  placeholder="e.g. High-converting creative experiences and full-stack software solutions tailored for forward-thinking startups."
                  rows={2.5}
                  className="w-full neo-input text-xs resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Primary Contact Email</label>
                <input
                  type="text"
                  placeholder="e.g. contact@agencyx.com"
                  value={websiteContent.footer.emailAddress}
                  onChange={(e) => setWebsiteContent({
                    footer: { ...websiteContent.footer, emailAddress: e.target.value }
                  })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-1">Company Location (City/Country)</label>
                <input
                  type="text"
                  placeholder="e.g. London, UK"
                  value={projectDetails.country}
                  onChange={(e) => setProjectDetails({ country: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-black mb-1">Social Profile Links (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Twitter: https://twitter.com/agency, YouTube: https://youtube.com/agency"
                  value={projectDetails.targetAudience}
                  onChange={(e) => setProjectDetails({ targetAudience: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
          disabled={!projectDetails.projectName || !projectDetails.businessName}
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue Planning
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
