"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Sparkles, Database, Shield, CreditCard, Cloud, Lock, ShieldAlert } from "lucide-react";

export function ApiSetupStep() {
  const { setupApis, toggleApiSetup, apiCredentials, setApiCredentials, showOptionalServices, nextStep, prevStep } = useBuilderStore();

  const apis = [
    { id: "supabase", name: "Supabase Backend", icon: Database, color: "bg-[#4ade80]/20 text-[#22c55e]" },
    { id: "firebase", name: "Firebase Service", icon: Shield, color: "bg-[#fde68a]/20 text-[#eab308]" },
    { id: "stripe", name: "Stripe Billing", icon: CreditCard, color: "bg-[#a78bfa]/20 text-[#8b5cf6]" },
    { id: "clerk", name: "Clerk Auth", icon: Lock, color: "bg-[#93c5fd]/20 text-[#3b82f6]" },
    { id: "cloudinary", name: "Cloudinary Media", icon: Cloud, color: "bg-[#fda4af]/20 text-[#f43f5e]" },
  ];

  if (!showOptionalServices) {
    return (
      <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#FF6B6B] border-2 border-black font-black uppercase text-xs text-white rotate-[-1deg] mb-2">
            🔒 INTEGRATIONS DISABLED
          </span>
          <h3 className="text-2xl font-black uppercase text-black">
            Service Integrations are Disabled
          </h3>
          <p className="text-sm font-bold text-black/75 max-w-lg mx-auto">
            You turned off Service Integrations in Step 2. We will compile your project as a clean, high-performance static client application utilizing <strong>localStorage</strong>.
          </p>
        </div>

        <div className="border-4 border-black bg-[#FFFDF5] p-6 max-w-xl mx-auto flex gap-4 items-start shadow-[4px_4px_0px_0px_#000]">
          <ShieldAlert className="w-8 h-8 text-[#FF6B6B] shrink-0 stroke-[2.5px]" />
          <div>
            <h4 className="text-sm font-black uppercase text-black">FRONT-END ONLY MODE</h4>
            <p className="text-xs font-bold text-black/60 leading-relaxed mt-1">
              Perfect for portfolios, business portals, or marketing landing pages that do not require external auth/billing accounts. You can click &ldquo;Continue&rdquo; below directly.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t-4 border-black">
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
            <Sparkles className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tight text-black text-center">
          🔌 SERVICES & API CREDENTIAL BUILDER
        </h3>
        <p className="text-sm font-bold text-black/70 text-center max-w-xl mx-auto">
          Toggle the backend API systems you want to use. We will inject detailed setup instructions, environment variables, and client wrappers directly into the master prompt.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {apis.map((api) => {
          const isSelected = setupApis.includes(api.id);
          const Icon = api.icon;

          return (
            <div
              key={api.id}
              onClick={() => toggleApiSetup(api.id)}
              className={`border-4 border-black p-4 cursor-pointer text-center select-none transition-all flex flex-col items-center justify-center gap-2 ${
                isSelected
                  ? "bg-[#FFFDF5] shadow-[4px_4px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              <div className={`p-2 border-2 border-black ${api.color}`}>
                <Icon className="w-6 h-6 stroke-[3px]" />
              </div>
              <span className="text-xs font-black uppercase text-black leading-tight">
                {api.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic API credential forms */}
      <div className="space-y-6 pt-4">
        {setupApis.includes("supabase") && (
          <div className="border-4 border-black p-6 bg-[#FFFDF5] space-y-4 shadow-[4px_4px_0px_0px_#000]">
            <h4 className="text-md font-black uppercase text-black flex items-center gap-2">
              🟢 SUPABASE CREDENTIALS
              <span className="text-xs font-bold text-black/50 normal-case">(Optional - defaults will apply if empty)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Project URL</label>
                <input
                  type="text"
                  placeholder="https://your-proj.supabase.co"
                  value={apiCredentials.supabaseUrl || ""}
                  onChange={(e) => setApiCredentials({ supabaseUrl: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Anon Public Key</label>
                <input
                  type="text"
                  placeholder="eyJhbGciOi..."
                  value={apiCredentials.supabaseAnonKey || ""}
                  onChange={(e) => setApiCredentials({ supabaseAnonKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Service Role Key</label>
                <input
                  type="text"
                  placeholder="eyJhbGciOi..."
                  value={apiCredentials.supabaseServiceRoleKey || ""}
                  onChange={(e) => setApiCredentials({ supabaseServiceRoleKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
            <p className="text-[11px] font-bold text-black/60">
              💡 Help: You can retrieve this from Supabase Dashboard &rarr; Project Settings &rarr; API.
            </p>
          </div>
        )}

        {setupApis.includes("firebase") && (
          <div className="border-4 border-black p-6 bg-[#FFFDF5] space-y-4 shadow-[4px_4px_0px_0px_#000]">
            <h4 className="text-md font-black uppercase text-black">🟡 FIREBASE WEB CREDENTIALS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">API Key</label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiCredentials.firebaseApiKey || ""}
                  onChange={(e) => setApiCredentials({ firebaseApiKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Auth Domain</label>
                <input
                  type="text"
                  placeholder="project.firebaseapp.com"
                  value={apiCredentials.firebaseAuthDomain || ""}
                  onChange={(e) => setApiCredentials({ firebaseAuthDomain: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Project ID</label>
                <input
                  type="text"
                  placeholder="project-id"
                  value={apiCredentials.firebaseProjectId || ""}
                  onChange={(e) => setApiCredentials({ firebaseProjectId: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Storage Bucket</label>
                <input
                  type="text"
                  placeholder="project.appspot.com"
                  value={apiCredentials.firebaseStorageBucket || ""}
                  onChange={(e) => setApiCredentials({ firebaseStorageBucket: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {setupApis.includes("stripe") && (
          <div className="border-4 border-black p-6 bg-[#FFFDF5] space-y-4 shadow-[4px_4px_0px_0px_#000]">
            <h4 className="text-md font-black uppercase text-black">🟣 STRIPE BILLING TOKENS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Publishable Key</label>
                <input
                  type="text"
                  placeholder="pk_test_..."
                  value={apiCredentials.stripePublishableKey || ""}
                  onChange={(e) => setApiCredentials({ stripePublishableKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Secret Key</label>
                <input
                  type="text"
                  placeholder="sk_test_..."
                  value={apiCredentials.stripeSecretKey || ""}
                  onChange={(e) => setApiCredentials({ stripeSecretKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {setupApis.includes("clerk") && (
          <div className="border-4 border-black p-6 bg-[#FFFDF5] space-y-4 shadow-[4px_4px_0px_0px_#000]">
            <h4 className="text-md font-black uppercase text-black">🔵 CLERK AUTHENTICATION KEYS</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Publishable Key</label>
                <input
                  type="text"
                  placeholder="pk_test_..."
                  value={apiCredentials.clerkPublishableKey || ""}
                  onChange={(e) => setApiCredentials({ clerkPublishableKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Secret Key</label>
                <input
                  type="text"
                  placeholder="sk_test_..."
                  value={apiCredentials.clerkSecretKey || ""}
                  onChange={(e) => setApiCredentials({ clerkSecretKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {setupApis.includes("cloudinary") && (
          <div className="border-4 border-black p-6 bg-[#FFFDF5] space-y-4 shadow-[4px_4px_0px_0px_#000]">
            <h4 className="text-md font-black uppercase text-black">🔴 CLOUDINARY FILE STORAGE API</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">Cloud Name</label>
                <input
                  type="text"
                  placeholder="your-cloud-name"
                  value={apiCredentials.cloudinaryCloudName || ""}
                  onChange={(e) => setApiCredentials({ cloudinaryCloudName: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-black">API Key</label>
                <input
                  type="text"
                  placeholder="your-cloudinary-api-key"
                  value={apiCredentials.cloudinaryApiKey || ""}
                  onChange={(e) => setApiCredentials({ cloudinaryApiKey: e.target.value })}
                  className="w-full neo-input text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-black">
        <button
          onClick={prevStep}
          className="neo-btn text-sm py-2 px-6 font-black uppercase"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="neo-btn neo-btn-accent text-sm py-2 px-6 font-black uppercase flex items-center gap-2"
        >
          Continue
          <Sparkles className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
}
