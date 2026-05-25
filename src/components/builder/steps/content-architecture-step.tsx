"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { ThemePreview } from "@/components/builder/theme-preview";
import { designStyles } from "@/lib/design-styles";
import { 
  LayoutTemplate, AlignLeft, Info, DollarSign, LayoutPanelTop, ArrowRight, ArrowLeft,
  Camera, Briefcase, Code, Play, Globe, Palette, Users, Send, Phone, MessageSquare, Check, X, ShieldAlert
} from "lucide-react";
import { WebsiteContent } from "@/types/builder";

export function ContentArchitectureStep() {
  const { 
    websiteContent, setWebsiteContent, 
    activeSocials, toggleSocial,
    complexityTier, selectedCategory, 
    selectedSections, prevStep, nextStep,
    resumeData, setResumeData,
    selectedDesignStyle
  } = useBuilderStore();

  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Pricing is only available for Advanced/Enterprise with relevant categories
  const showPricing = (complexityTier === "advanced" || complexityTier === "enterprise") &&
    ["saas-dashboard", "ai-tool", "ai-startup", "online-course", "gym", "ott-platform", "lms", "music-streaming", "ecommerce", "startup-landing", "mobile-app-landing"].includes(selectedCategory?.id || "");

  const handleHeroChange = (field: keyof WebsiteContent['hero'], value: string | boolean) => {
    setWebsiteContent({ hero: { ...websiteContent.hero, [field]: value } });
  };

  const handleAboutChange = (field: keyof WebsiteContent['about'], value: string) => {
    setWebsiteContent({ about: { ...websiteContent.about, [field]: value } });
  };

  const handlePricingChange = (field: string, value: string) => {
    const currentPricing = websiteContent.pricing || {
      starterName: "Starter", starterPrice: "$9/mo",
      proName: "Pro", proPrice: "$29/mo",
      enterpriseName: "Enterprise", enterprisePrice: "$99/mo",
      billingType: "monthly" as const
    };
    setWebsiteContent({ pricing: { ...currentPricing, [field]: value } });
  };

  const handleFooterChange = (field: keyof WebsiteContent['footer'], value: string | boolean) => {
    setWebsiteContent({ footer: { ...websiteContent.footer, [field]: value } });
  };

  const handleSocialChange = (field: keyof WebsiteContent['socials'], value: string) => {
    setWebsiteContent({ socials: { ...websiteContent.socials, [field]: value } });
  };

  const handleFeatureToggle = (field: keyof WebsiteContent['features']) => {
    setWebsiteContent({ features: { ...websiteContent.features, [field]: !websiteContent.features[field] } });
  };

  const isPortfolio = selectedCategory?.id === "portfolio";

  // List of all 11 platforms for the social planner
  const socialPlatforms = [
    { id: "instagram", label: "Instagram", icon: Camera, color: "text-pink-600 bg-pink-50 border-pink-200" },
    { id: "twitter", label: "X / Twitter", icon: MessageSquare, color: "text-neutral-900 bg-neutral-50 border-neutral-200" },
    { id: "linkedin", label: "LinkedIn", icon: Briefcase, color: "text-blue-700 bg-blue-50 border-blue-200" },
    { id: "github", label: "GitHub", icon: Code, color: "text-neutral-800 bg-neutral-100 border-neutral-300" },
    { id: "youtube", label: "YouTube", icon: Play, color: "text-red-600 bg-red-50 border-red-200" },
    { id: "behance", label: "Behance", icon: Globe, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "dribbble", label: "Dribbble", icon: Palette, color: "text-rose-500 bg-rose-50 border-rose-200" },
    { id: "facebook", label: "Facebook", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "discord", label: "Discord", icon: MessageSquare, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { id: "whatsapp", label: "WhatsApp", icon: Phone, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "telegram", label: "Telegram", icon: Send, color: "text-sky-500 bg-sky-50 border-sky-200" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[95rem] mx-auto px-4">
      {/* LEFT COLUMN: Input Forms (40% width) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] space-y-6">
          
          {/* Title */}
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-[#FF6B6B] text-white border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
              STEP 7: CONTENT & ARCHITECTURE
            </span>
            <h2 className="text-3xl font-black uppercase text-black">
              {isPortfolio ? "Your Portfolio Content Details" : "Plan Layout & Content"}
            </h2>
            <p className="text-xs font-bold text-black/70 mt-2">
              {isPortfolio
                ? "Configure section-wise descriptions, copy details, skills and project highlights for your portfolio."
                : "Design your visual timeline and customize copy details. The AI compiler will bind these parameters contextually."
              }
            </p>
          </div>

          {/* Visual Section Sequence Roadmap */}
          <div className="border-4 border-black p-4 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-3">
            <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <LayoutTemplate className="w-4 h-4 text-[#C4B5FD]" />
              Visual Section Sequence Pipeline
            </h3>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {selectedSections.length > 0 ? (
                selectedSections.map((sec, idx) => (
                  <div key={sec} className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 border-2 border-black bg-white font-black uppercase text-[9px] text-black shadow-[1.5px_1.5px_0px_0px_#000]">
                      {sec}
                    </span>
                    {idx < selectedSections.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-black stroke-[3px]" />
                    )}
                  </div>
                ))
              ) : (
                <span className="text-[10px] font-bold text-black/45">No sections configured.</span>
              )}
            </div>
          </div>

          {/* HERO CONFIGURATOR */}
          <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
              <LayoutPanelTop className="w-4 h-4 text-[#FFD93D]" />
              Hero Section Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-black/60 uppercase">Hero Main Headline</label>
                <input
                  type="text"
                  value={websiteContent.hero.headline}
                  onChange={(e) => handleHeroChange("headline", e.target.value)}
                  placeholder={isPortfolio ? "e.g. Hi, I'm Mohammed Mubashir — UI/UX Architect" : "e.g. Build faster with intelligent AI"}
                  className="w-full neo-input text-sm"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-black/60 uppercase">Hero Subheadline</label>
                <textarea
                  value={websiteContent.hero.subheadline}
                  onChange={(e) => handleHeroChange("subheadline", e.target.value)}
                  placeholder={isPortfolio ? "e.g. Crafting premium, blazing-fast neobrutalist frontends and highly visual responsive user interfaces." : "e.g. The premier platform for generating full-stack applications in seconds."}
                  className="w-full neo-input text-sm min-h-[70px] resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-black/60 uppercase">Primary Button Label</label>
                <input
                  type="text"
                  value={websiteContent.hero.ctaText}
                  onChange={(e) => handleHeroChange("ctaText", e.target.value)}
                  placeholder={isPortfolio ? "View My Work" : "Get Started"}
                  className="w-full neo-input text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-black/60 uppercase">Secondary Button Label</label>
                <input
                  type="text"
                  value={websiteContent.hero.secondaryCtaText}
                  onChange={(e) => handleHeroChange("secondaryCtaText", e.target.value)}
                  placeholder={isPortfolio ? "Get In Touch" : "Learn More"}
                  className="w-full neo-input text-sm"
                />
              </div>
            </div>

            {!isPortfolio && (
              <div className="flex flex-wrap gap-4 pt-3 border-t border-black/10">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input type="checkbox" checked={websiteContent.hero.includeTrustBadges} onChange={(e) => handleHeroChange("includeTrustBadges", e.target.checked)} className="w-4 h-4 accent-black" />
                  Trust Badges
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input type="checkbox" checked={websiteContent.hero.includeStats} onChange={(e) => handleHeroChange("includeStats", e.target.checked)} className="w-4 h-4 accent-black" />
                  Stats Grid
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input type="checkbox" checked={websiteContent.hero.includeAnnouncement} onChange={(e) => handleHeroChange("includeAnnouncement", e.target.checked)} className="w-4 h-4 accent-black" />
                  Announcement Bar
                </label>
              </div>
            )}
          </div>

          {/* ABOUT & CORE BIO */}
          <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
              <Info className="w-4 h-4 text-[#C4B5FD]" />
              About & Core Bio Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-black/60 uppercase">Section Title</label>
                <input
                  type="text"
                  value={websiteContent.about.title}
                  onChange={(e) => handleAboutChange("title", e.target.value)}
                  placeholder="About Me"
                  className="w-full neo-input text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-black/60 uppercase">Your Professional Bio / Pitch</label>
                <textarea
                  value={websiteContent.about.story}
                  onChange={(e) => handleAboutChange("story", e.target.value)}
                  placeholder="Describe your design and engineering philosophies, experience, and what makes you unique..."
                  className="w-full neo-input text-sm min-h-[90px] resize-none"
                />
              </div>

              {isPortfolio && resumeData && (
                <div className="space-y-1.5 pt-2 border-t border-black/10">
                  <label className="text-[10px] font-black text-black/60 uppercase">Core Skills Grid (comma-separated)</label>
                  <input
                    type="text"
                    value={resumeData.skills.join(", ")}
                    onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    placeholder="React.js, Next.js, Tailwind CSS, Frame Motion..."
                    className="w-full neo-input text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* INTERACTIVE RESUME & PROJECTS EDITOR */}
          {isPortfolio && resumeData && (
            <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] space-y-6 animate-fadeIn">
              <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3">
                <Briefcase className="w-4 h-4 text-green-600" />
                Extracted Resume Details & Projects
              </h3>

              {/* Experience timeline */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-black/50 uppercase block">Work Experience Timeline</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeData.companies.map((comp: any, idx: number) => (
                    <div key={idx} className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_#000] space-y-2">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-1">
                        <span className="text-[9px] font-black text-black/40">EXPERIENCE #{idx+1}</span>
                        <button 
                          onClick={() => {
                            const updated = resumeData.companies.filter((_: any, i: number) => i !== idx);
                            setResumeData({ ...resumeData, companies: updated });
                          }}
                          className="text-[9px] font-black text-red-500 hover:underline uppercase"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          value={comp.name} 
                          onChange={(e) => {
                            const updated = [...resumeData.companies];
                            updated[idx] = { ...comp, name: e.target.value };
                            setResumeData({ ...resumeData, companies: updated });
                          }}
                          placeholder="Company Name" 
                          className="w-full neo-input text-xs" 
                        />
                        <input 
                          type="text" 
                          value={comp.role} 
                          onChange={(e) => {
                            const updated = [...resumeData.companies];
                            updated[idx] = { ...comp, role: e.target.value };
                            setResumeData({ ...resumeData, companies: updated });
                          }}
                          placeholder="Role / Title" 
                          className="w-full neo-input text-xs" 
                        />
                      </div>
                      <input 
                        type="text" 
                        value={comp.duration} 
                        onChange={(e) => {
                          const updated = [...resumeData.companies];
                          updated[idx] = { ...comp, duration: e.target.value };
                          setResumeData({ ...resumeData, companies: updated });
                        }}
                        placeholder="Duration (e.g. 2024 - Present)" 
                        className="w-full neo-input text-xs" 
                      />
                      <textarea 
                        value={comp.description} 
                        onChange={(e) => {
                          const updated = [...resumeData.companies];
                          updated[idx] = { ...comp, description: e.target.value };
                          setResumeData({ ...resumeData, companies: updated });
                        }}
                        placeholder="Brief work description..." 
                        rows={2} 
                        className="w-full neo-input text-xs resize-none" 
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      companies: [...resumeData.companies, { name: "", role: "", duration: "", description: "" }]
                    });
                  }}
                  className="neo-btn text-[9px] font-black uppercase px-3 py-1.5 bg-[#C4B5FD] text-black border border-black"
                >
                  + Add Experience Milestone
                </button>
              </div>

              {/* Projects list */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <span className="text-[10px] font-black text-black/50 uppercase block">Projects Showcase</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeData.projects.map((proj: any, idx: number) => (
                    <div key={idx} className="border-2 border-black p-3 bg-white shadow-[2px_2px_0px_0px_#000] space-y-2">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-1">
                        <span className="text-[9px] font-black text-black/40">PROJECT #{idx+1}</span>
                        <button 
                          onClick={() => {
                            const updated = resumeData.projects.filter((_: any, i: number) => i !== idx);
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          className="text-[9px] font-black text-red-500 hover:underline uppercase"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          value={proj.title} 
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx] = { ...proj, title: e.target.value };
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          placeholder="Project Title" 
                          className="w-full neo-input text-xs" 
                        />
                        <input 
                          type="text" 
                          value={proj.tech.join(", ")} 
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx] = { ...proj, tech: e.target.value.split(",").map(t => t.trim()) };
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          placeholder="Technologies" 
                          className="w-full neo-input text-xs" 
                        />
                      </div>
                      <textarea 
                        value={proj.description} 
                        onChange={(e) => {
                          const updated = [...resumeData.projects];
                          updated[idx] = { ...proj, description: e.target.value };
                          setResumeData({ ...resumeData, projects: updated });
                        }}
                        placeholder="Brief project details..." 
                        rows={2} 
                        className="w-full neo-input text-xs resize-none" 
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      projects: [...resumeData.projects, { title: "", description: "", tech: [], url: "" }]
                    });
                  }}
                  className="neo-btn text-[9px] font-black uppercase px-3 py-1.5 bg-[#FFD93D] text-black border border-black"
                >
                  + Add Project Highlight
                </button>
              </div>
            </div>
          )}

          {/* PRICING */}
          {!isPortfolio && showPricing && (
            <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
                <DollarSign className="w-4 h-4 text-[#4ade80]" />
                Pricing Tiers Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Tier 1", nameField: "starterName", priceField: "starterPrice", highlight: false },
                  { label: "Tier 2 (Highlighted)", nameField: "proName", priceField: "proPrice", highlight: true },
                  { label: "Tier 3", nameField: "enterpriseName", priceField: "enterprisePrice", highlight: false },
                ].map((tier) => (
                  <div key={tier.label} className={`p-4 border-2 border-black space-y-2 ${tier.highlight ? "bg-[#FFD93D]/20 shadow-[3px_3px_0px_0px_#000]" : "bg-white"}`}>
                    <div className="text-[10px] font-black uppercase text-black/50">{tier.label}</div>
                    <div>
                      <label className="text-[10px] font-bold text-black/60 uppercase block mb-1">Plan Name</label>
                      <input
                        type="text"
                        value={(websiteContent.pricing as any)?.[tier.nameField] || ""}
                        onChange={(e) => handlePricingChange(tier.nameField, e.target.value)}
                        className="w-full neo-input text-xs py-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-black/60 uppercase block mb-1">Price</label>
                      <input
                        type="text"
                        value={(websiteContent.pricing as any)?.[tier.priceField] || ""}
                        onChange={(e) => handlePricingChange(tier.priceField, e.target.value)}
                        className="w-full neo-input text-xs py-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DYNAMIC CONTENT TOGGLES */}
          {!isPortfolio && (
            <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
                <LayoutTemplate className="w-4 h-4 text-[#FF6B6B]" />
                Feature Content Blocks
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "enableTestimonials" as const, label: "Testimonials Grid" },
                  { key: "enableFAQ" as const, label: "FAQ / Accordions" },
                  { key: "enableBlog" as const, label: "Blog System" },
                ].map(toggle => (
                  <button 
                    key={toggle.key}
                    onClick={() => handleFeatureToggle(toggle.key)}
                    className={`px-4 py-2.5 border-2 border-black font-black text-xs uppercase transition-all shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                      websiteContent.features[toggle.key] 
                        ? "bg-black text-white" 
                        : "bg-white text-black hover:bg-neutral-50"
                    }`}
                  >
                    {toggle.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER & SOCIAL SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Footer settings */}
            <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
                <AlignLeft className="w-4 h-4 text-black" />
                {isPortfolio ? "Contact Form Info" : "Footer Structure"}
              </h3>
              
              <div className="space-y-4">
                {!isPortfolio && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "showEmail" as const, label: "Display Email" },
                      { key: "showPhone" as const, label: "Display Phone" },
                      { key: "showAddress" as const, label: "Display Address" },
                      { key: "showNewsletter" as const, label: "Newsletter Capture" },
                      { key: "showNavLinks" as const, label: "Quick Navigation" },
                      { key: "showCopyright" as const, label: "Copyright Bar" },
                      { key: "showPrivacyPolicy" as const, label: "Legal Policies Links" },
                    ].map(item => (
                      <label key={item.key} className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                        <input type="checkbox" checked={websiteContent.footer[item.key] as boolean} onChange={(e) => handleFooterChange(item.key, e.target.checked)} className="w-3.5 h-3.5 accent-black" />
                        {item.label}
                      </label>
                    ))}
                  </div>
                )}

                <div className={`${isPortfolio ? "" : "pt-3 border-t border-black/10"} space-y-2`}>
                  <span className="text-[10px] font-black text-black/45 uppercase block mb-1">
                    {isPortfolio ? "Enter Your Contact Information" : "Footer Contact Details"}
                  </span>
                  <input type="text" value={websiteContent.footer.emailAddress} onChange={(e) => handleFooterChange("emailAddress", e.target.value)} placeholder="e.g. contact@domain.com" className="w-full neo-input text-xs py-2" />
                  <input type="text" value={websiteContent.footer.phoneNumber} onChange={(e) => handleFooterChange("phoneNumber", e.target.value)} placeholder="e.g. +91 98765 43210 (optional)" className="w-full neo-input text-xs py-2" />
                  <input type="text" value={websiteContent.footer.addressText} onChange={(e) => handleFooterChange("addressText", e.target.value)} placeholder="e.g. Mumbai, India (optional)" className="w-full neo-input text-xs py-2" />
                </div>
              </div>
            </div>

            {/* Social Planner */}
            <div className="p-5 border-4 border-black bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-black text-sm uppercase flex items-center gap-2 border-b-2 border-black pb-3 mb-5">
                <Send className="w-4 h-4 text-[#C4B5FD]" />
                11-Channel Social Matrix
              </h3>

              <div className="space-y-4">
                <span className="text-[10px] font-black text-black/45 uppercase block mb-1">
                  Toggle channels to capture URL links:
                </span>
                
                <div className="flex flex-wrap gap-2 pb-3 border-b border-black/10">
                  {socialPlatforms.map((platform) => {
                    const isActive = activeSocials[platform.id] ?? false;
                    const Icon = platform.icon;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleSocial(platform.id)}
                        className={`px-2 py-1 border-2 border-black font-black uppercase text-[8px] flex items-center gap-1 transition-all shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                          isActive 
                            ? "bg-black text-white" 
                            : "bg-white text-black hover:bg-neutral-50"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {platform.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Social URL Inputs */}
                <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                  {socialPlatforms.map((platform) => {
                    const isActive = activeSocials[platform.id] ?? false;
                    if (!isActive) return null;
                    const Icon = platform.icon;
                    return (
                      <div key={platform.id} className={`p-2 border-2 border-black shadow-[1px_1px_0px_0px_#000] flex items-center gap-2 ${platform.color}`}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <div className="flex-1">
                          <input
                            type="url"
                            value={websiteContent.socials[platform.id as keyof WebsiteContent['socials']] || ""}
                            onChange={(e) => handleSocialChange(platform.id as keyof WebsiteContent['socials'], e.target.value)}
                            placeholder={`https://${platform.id}.com/username`}
                            className="w-full neo-input text-[10px] py-1 bg-white border border-black/20"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t-4 border-black">
            <button onClick={prevStep} className="neo-btn text-sm py-2 px-6 font-black uppercase flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 stroke-[3px]" />
              Back
            </button>
            <button
              onClick={nextStep}
              className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Live Responsive Preview Sandbox (60% width) */}
      <div className="lg:col-span-7 lg:sticky lg:top-24 w-full">
        <ThemePreview 
          style={selectedDesignStyle || designStyles[0]} 
          device={device} 
          setDevice={setDevice} 
        />
      </div>
    </div>
  );
}
