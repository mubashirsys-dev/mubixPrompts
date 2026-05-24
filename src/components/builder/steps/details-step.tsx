"use client";

import { useBuilderStore } from "@/store/builder-store";
import { ProjectDetails } from "@/types/builder";
import { ArrowRight, ArrowLeft } from "lucide-react";

const fields = [
  { key: "projectName", label: "Project Name", placeholder: "e.g., FitTrack Pro, ShopEasy, LearnHub", type: "input", hint: "The name of your website or app" },
  { key: "businessName", label: "Business / Brand Name", placeholder: "e.g., Mubix Technologies, FitLife Inc.", type: "input", hint: "Your company or brand name" },
  { key: "tagline", label: "Tagline / Slogan", placeholder: "e.g., Build faster with AI, Your fitness journey starts here", type: "input", hint: "A short catchy phrase that describes your product" },
  { key: "targetAudience", label: "Target Audience", placeholder: "e.g., Startup founders, gym owners, students aged 18-25", type: "input", hint: "Who will use this product?" },
  { key: "country", label: "Country / Region", placeholder: "e.g., India, United States, Global", type: "input", hint: "Primary country or region for your users" },
  { key: "language", label: "Primary Language", placeholder: "e.g., English, Hindi, Arabic", type: "input", hint: "The main language for your website" },
  { key: "monetizationModel", label: "How will you make money?", placeholder: "e.g., Freemium, subscription, one-time purchase, ads, commission", type: "input", hint: "How you plan to generate revenue" },
  { key: "subscriptionModel", label: "Subscription Plans (if any)", placeholder: "e.g., Free + Pro ($19/mo) + Enterprise ($49/mo)", type: "input", hint: "Describe your pricing tiers" },
  { key: "projectGoals", label: "Project Goals", placeholder: "e.g., Launch MVP in 2 weeks, get 1000 users in first month, build a scalable platform...", type: "textarea", hint: "What do you want to achieve with this project?" },
];

export function DetailsStep() {
  const { projectDetails, setProjectDetails, nextStep, prevStep } = useBuilderStore();

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-[#FFD93D] border-2 border-black font-black uppercase text-xs rotate-[1deg] mb-4">
          STEP 3: PROJECT SPECS
        </span>
        <h2 className="text-2xl font-black uppercase text-black">Tell us about your project</h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          Fill in the specifications below. Don&apos;t worry &mdash; empty fields will use smart defaults!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label htmlFor={field.key} className="text-xs font-black uppercase text-black block">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.key}
                placeholder={field.placeholder}
                value={projectDetails[field.key as keyof ProjectDetails] || ""}
                onChange={(e) => setProjectDetails({ [field.key]: e.target.value })}
                className="w-full border-4 border-black p-3 font-bold text-sm bg-white focus:outline-none focus:bg-[#FFFDF5] min-h-[100px] resize-none shadow-[2px_2px_0px_0px_#000]"
              />
            ) : (
              <input
                type="text"
                id={field.key}
                placeholder={field.placeholder}
                value={projectDetails[field.key as keyof ProjectDetails] || ""}
                onChange={(e) => setProjectDetails({ [field.key]: e.target.value })}
                className="w-full border-4 border-black p-3 font-bold text-sm bg-white focus:outline-none focus:bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#000]"
              />
            )}
            <p className="text-[10px] font-bold text-black/60">{field.hint}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-2xl mx-auto border-t-4 border-black pt-6">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase"
        >
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
  );
}
