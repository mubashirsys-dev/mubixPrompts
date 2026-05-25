"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { Shield, Key, Bot, Lock, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Database } from "lucide-react";

interface CollapsiblePanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsiblePanel({ title, icon, children, defaultOpen = false }: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 font-black uppercase text-xs hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="p-5 border-t-2 border-black bg-[#FFFDF5] space-y-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export function SecurityStep() {
  const {
    setupApis, toggleApiSetup, apiCredentials, setApiCredentials,
    activeSecurityRules, toggleSecurityRule, selectedFeatures,
    nextStep, prevStep, selectedCategory
  } = useBuilderStore();

  const isPortfolio = selectedCategory?.id === "portfolio";

  // Determine relevant services based on selected features
  const hasAuth = selectedFeatures.some(f => ["clerk-auth", "email-login", "google-login", "firebase-auth"].includes(f));
  const hasPayments = selectedFeatures.some(f => ["stripe", "razorpay", "phonepe", "subscription-billing"].includes(f));
  const hasDatabase = selectedFeatures.some(f => ["admin-panel", "user-dashboard", "blog-system", "booking-system"].includes(f));
  const hasAI = selectedFeatures.some(f => ["ai-chatbot"].includes(f));

  const apiServices = [
    {
      id: "supabase",
      name: "Supabase Database",
      desc: "Cloud database + secure Row Level Security (RLS) policies",
      show: true, // Always show as an option in security step
      fields: [
        { key: "supabaseUrl" as const, label: "Project URL", placeholder: "https://xxx.supabase.co" },
        { key: "supabaseAnonKey" as const, label: "Anon Key", placeholder: "eyJhbGciOiJI..." },
      ],
    },
    {
      id: "clerk",
      name: "Clerk Auth API",
      desc: "Secure user authentication & credentials",
      show: true,
      fields: [
        { key: "clerkPublishableKey" as const, label: "Publishable Key", placeholder: "pk_test_..." },
        { key: "clerkSecretKey" as const, label: "Secret Key", placeholder: "sk_test_..." },
      ],
    },
    {
      id: "stripe",
      name: "Stripe Gateway",
      desc: "Subscription billing and shopping checkout integrations",
      show: true,
      fields: [
        { key: "stripePublishableKey" as const, label: "Publishable Key", placeholder: "pk_test_..." },
        { key: "stripeSecretKey" as const, label: "Secret Key", placeholder: "sk_test_..." },
      ],
    },
    {
      id: "razorpay",
      name: "Razorpay Checkout",
      desc: "Accept UPI, Cards, and Netbanking locally",
      show: true,
      fields: [
        { key: "razorpayKeyId" as const, label: "Key ID", placeholder: "rzp_test_..." },
        { key: "razorpayKeySecret" as const, label: "Key Secret", placeholder: "secret_..." },
      ],
    },
  ];

  const securityRules = [
    { id: "xss", name: "XSS Protection Layer", desc: "Sanitize and escape all user outputs automatically" },
    { id: "csrf", name: "CSRF Form Tokens", desc: "Enforce strict state-mutation token checks" },
    { id: "headers", name: "CSP & HTTP Security Headers", desc: "Strict Content-Security-Policy & frame gating" },
    { id: "api", name: "Zod Schema Type Validation", desc: "Validate all API route parameters strict Zod schema checking" },
    { id: "spam", name: "Anti-Spam Form Honeypot", desc: "Honeypot form inputs to capture and block bot inquiries" },
  ].filter(rule => !isPortfolio || ["xss", "headers", "spam"].includes(rule.id));

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-[#C4B5FD] border-2 border-black font-black uppercase text-xs rotate-[-1deg] mb-4">
          STEP 10: SECURITY CONFIGURATION
        </span>
        <h2 className="text-3xl font-black uppercase text-black">
          {isPortfolio ? "Portfolio Security Policies" : "Security & API Keys"}
        </h2>
        <p className="text-sm font-bold text-black/70 mt-2">
          {isPortfolio
            ? "Configure client-side defenses, header policies, and anti-spam protection for your personal website."
            : "Toggle robust client/server security defenses and securely structure database integration variables."
          }
        </p>
      </div>

      <div className="space-y-4">
        {/* Panel 1: Security Toggles */}
        <CollapsiblePanel
          title={isPortfolio ? "Active Website Defenses" : "Strict Security Defense Policies"}
          icon={<Shield className="w-4 h-4 text-[#FF6B6B]" />}
          defaultOpen={true}
        >
          <div className="space-y-3">
            {securityRules.map(rule => {
              const isActive = activeSecurityRules.includes(rule.id);
              return (
                <button
                  key={rule.id}
                  onClick={() => toggleSecurityRule(rule.id)}
                  className={`w-full flex items-center justify-between p-3.5 border-2 border-black transition-all text-left shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                    isActive
                      ? "bg-[#C4B5FD]/20 border-[#C4B5FD]"
                      : "bg-white text-black hover:bg-neutral-50"
                  }`}
                >
                  <div>
                    <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#FFD93D]" />
                      {rule.name}
                    </span>
                    <span className="text-[9px] font-bold text-black/60 block mt-1 leading-normal">{rule.desc}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase border border-black px-2 py-0.5 ${
                    isActive ? "bg-black text-white" : "bg-neutral-100 text-black/40"
                  }`}>
                    {isActive ? "ACTIVE" : "DISABLED"}
                  </span>
                </button>
              );
            })}
          </div>
        </CollapsiblePanel>

        {/* Panel 2 & 3: Database & AI - Conditionally render for SaaS only */}
        {!isPortfolio && (
          <>
            {/* Panel 2: Database & API Integrations */}
            <CollapsiblePanel
              title="Cloud Services & Database API Config"
              icon={<Database className="w-4 h-4 text-[#4ade80]" />}
            >
              <div className="space-y-4">
                {apiServices.map(api => {
                  const isActive = setupApis.includes(api.id);
                  return (
                    <div key={api.id} className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_#000]">
                      <div className="flex items-center justify-between mb-3 border-b border-black/10 pb-2">
                        <div>
                          <h4 className="text-xs font-black uppercase text-black flex items-center gap-1">
                            {api.name}
                            {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] inline-block ml-1 animate-pulse" />}
                          </h4>
                          <p className="text-[10px] font-bold text-black/60 mt-0.5 leading-normal">{api.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleApiSetup(api.id)}
                          className={`px-3 py-1 border-2 border-black text-[10px] font-black uppercase transition-all shadow-[1px_1px_0px_0px_#000] active:translate-y-[1px] active:shadow-none ${
                            isActive ? "bg-[#4ade80] text-black" : "bg-white text-black/50 hover:bg-neutral-50"
                          }`}
                        >
                          {isActive ? "✓ Enabled" : "Enable"}
                        </button>
                      </div>
                      {isActive && (
                        <div className="space-y-3 pt-1 animate-fadeIn">
                          {api.fields.map(field => (
                            <div key={field.key}>
                              <label className="text-[9px] font-black uppercase text-black/65 block mb-1 flex items-center gap-1">
                                <Key className="w-3 h-3 text-[#FFD93D]" />
                                {field.label}
                              </label>
                              <input
                                type="text"
                                value={(apiCredentials[field.key] as string) || ""}
                                onChange={(e) => setApiCredentials({ [field.key]: e.target.value })}
                                placeholder={field.placeholder}
                                className="w-full neo-input text-xs py-2 font-mono"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CollapsiblePanel>

            {/* Panel 3: LLM AI Model API Keys */}
            <CollapsiblePanel
              title="Third Party AI LLM Providers API Keys"
              icon={<Bot className="w-4 h-4 text-[#FFD93D]" />}
            >
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-black/60 leading-normal border-b border-black/10 pb-2">
                  If your features include automated chatbots or custom AI content generating helpers, enter LLM keys below. Kept fully local.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "openaiApiKey" as const, label: "OpenAI API Key", placeholder: "sk-proj-..." },
                    { key: "anthropicApiKey" as const, label: "Anthropic Claude Key", placeholder: "sk-ant-..." },
                    { key: "geminiApiKey" as const, label: "Gemini API Key", placeholder: "AIzaSy..." },
                  ].map(ai => (
                    <div key={ai.key} className="border border-black p-3 bg-white space-y-1.5 shadow-[1.5px_1.5px_0px_0px_#000]">
                      <span className="text-[9px] font-black uppercase text-black/75 block">{ai.label}</span>
                      <input
                        type="password"
                        value={apiCredentials[ai.key] || ""}
                        onChange={(e) => setApiCredentials({ [ai.key]: e.target.value })}
                        placeholder={ai.placeholder}
                        className="w-full neo-input text-[10px] py-1.5 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CollapsiblePanel>
          </>
        )}
      </div>

      {/* Navigation */}
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
          className="neo-btn neo-btn-accent text-sm py-2.5 px-8 font-black uppercase flex items-center gap-2"
        >
          Continue to Compile
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
