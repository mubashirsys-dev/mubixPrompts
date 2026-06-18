"use client";

import { useBuilderStore } from "@/store/builder-store";
import { DollarSign, Check, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

export function PricingStep() {
  const { websiteContent, setWebsiteContent } = useBuilderStore();

  const pricing = websiteContent.pricing || {
    starterName: "Starter",
    starterPrice: "$19/mo",
    proName: "Pro",
    proPrice: "$49/mo",
    enterpriseName: "Enterprise",
    enterprisePrice: "Custom",
    billingType: "monthly"
  };

  const handleUpdatePricing = (fields: Partial<typeof pricing>) => {
    setWebsiteContent({
      pricing: {
        ...pricing,
        ...fields
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4ade80] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
            <DollarSign className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-black">Subscription Plans</h2>
            <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Set up plans, pricing, and billing structures for your customers</p>
          </div>
        </div>

        {/* Billing Type Toggle */}
        <div className="flex items-center gap-2 border-2 border-black bg-[#FFFDF5] px-3 py-1.5 shadow-[2px_2px_0px_0px_#000]">
          <span className="text-[10px] font-black uppercase text-black">Billing Cycle:</span>
          <button
            type="button"
            onClick={() => handleUpdatePricing({ billingType: pricing.billingType === "monthly" ? "yearly" : "monthly" })}
            className="flex items-center text-black"
          >
            {pricing.billingType === "monthly" ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 uppercase">
                Monthly <ToggleLeft className="w-6 h-6 text-neutral-400 stroke-[1.5px]" />
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase">
                Yearly <ToggleRight className="w-6 h-6 text-emerald-500 stroke-[2px]" />
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Starter Plan */}
        <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_#000] space-y-4">
          <div className="border-b border-black/10 pb-2">
            <span className="text-[9px] font-black uppercase text-neutral-400">Tier 1</span>
            <input
              type="text"
              value={pricing.starterName}
              onChange={(e) => handleUpdatePricing({ starterName: e.target.value })}
              className="w-full text-md font-black uppercase text-black outline-none bg-transparent"
              placeholder="Starter Plan"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-neutral-500">Price tag</label>
            <input
              type="text"
              value={pricing.starterPrice}
              onChange={(e) => handleUpdatePricing({ starterPrice: e.target.value })}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-[#FFFDF5] text-xs font-mono font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              placeholder="$19 / month"
            />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[9px] font-black uppercase text-neutral-500 block">Default Inclusions:</span>
            <ul className="text-[10px] font-bold text-neutral-600 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Core features access</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 1 seat included</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Standard community support</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="border-4 border-black bg-[#FFFDF5] p-4 shadow-[4px_4px_0px_0px_#000] space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FFD93D] border-b border-l border-black px-2 py-0.5 text-[7px] font-black uppercase tracking-wider">
            RECOMMENDED
          </div>

          <div className="border-b border-black/10 pb-2">
            <span className="text-[9px] font-black uppercase text-[#A78BFA] flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" /> Tier 2 (Pro)
            </span>
            <input
              type="text"
              value={pricing.proName}
              onChange={(e) => handleUpdatePricing({ proName: e.target.value })}
              className="w-full text-md font-black uppercase text-black outline-none bg-transparent"
              placeholder="Pro Plan"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-neutral-500">Price tag</label>
            <input
              type="text"
              value={pricing.proPrice}
              onChange={(e) => handleUpdatePricing({ proPrice: e.target.value })}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-mono font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              placeholder="$49 / month"
            />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[9px] font-black uppercase text-neutral-500 block">Default Inclusions:</span>
            <ul className="text-[10px] font-bold text-neutral-600 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Full analytics & metrics</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Up to 5 team seats</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Prioritized 24/7 Email support</li>
            </ul>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_#000] space-y-4">
          <div className="border-b border-black/10 pb-2">
            <span className="text-[9px] font-black uppercase text-neutral-400">Tier 3</span>
            <input
              type="text"
              value={pricing.enterpriseName}
              onChange={(e) => handleUpdatePricing({ enterpriseName: e.target.value })}
              className="w-full text-md font-black uppercase text-black outline-none bg-transparent"
              placeholder="Enterprise Plan"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-neutral-500">Price tag</label>
            <input
              type="text"
              value={pricing.enterprisePrice}
              onChange={(e) => handleUpdatePricing({ enterprisePrice: e.target.value })}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-[#FFFDF5] text-xs font-mono font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              placeholder="Custom Pricing"
            />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[9px] font-black uppercase text-neutral-500 block">Default Inclusions:</span>
            <ul className="text-[10px] font-bold text-neutral-600 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Infinite/Unlimited seats</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Custom integrations & SLAs</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Dedicated success engineer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
