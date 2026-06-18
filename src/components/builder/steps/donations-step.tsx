"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Landmark, Plus, Trash2, Heart, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface DonationCause {
  title: string;
  targetAmount: string;
  paymentGateway: string;
  description: string;
}

export function DonationsStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [gateway, setGateway] = useState("Stripe Credit Card");
  const [description, setDescription] = useState("");

  const donations: DonationCause[] = categoryAnswers.donations || [
    { title: "Masjid Carpeting Renewal", targetAmount: "$12,000", paymentGateway: "Stripe Credit Card", description: "Replacing the main prayer hall carpeting with premium, durable Turkish carpets." },
    { title: "Ramadan Iftar Fund", targetAmount: "$8,000", paymentGateway: "PayPal or Bank Transfer", description: "Providing complimentary sunset Iftar meals to over 150 community members daily during Ramadan." }
  ];

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !target.trim()) return;

    const newCause: DonationCause = {
      title: title.trim(),
      targetAmount: target.trim(),
      paymentGateway: gateway,
      description: description.trim()
    };

    setCategoryAnswers({
      ...categoryAnswers,
      donations: [...donations, newCause]
    });

    setTitle("");
    setTarget("");
    setGateway("Stripe Credit Card");
    setDescription("");
  };

  const handleDeleteDonation = (idx: number) => {
    const updatedDonations = donations.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      donations: updatedDonations
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Landmark className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Donation & Charitable Programs</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure donation campaign causes, targets, and payment portal choices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <form onSubmit={handleAddDonation} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
            Insert Donation Cause
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Cause Title*</label>
            <input
              type="text"
              required
              placeholder="e.g. Mosque Construction Fund"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Target Amount*</label>
              <input
                type="text"
                required
                placeholder="e.g. $15,000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black">Payment Portal</label>
              <select
                value={gateway}
                onChange={(e) => setGateway(e.target.value)}
                className="w-full px-2 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
              >
                <option value="Stripe Credit Card">Stripe Credit Card</option>
                <option value="PayPal Link">PayPal Link</option>
                <option value="Bank Direct Deposit">Bank Direct Deposit</option>
                <option value="Offline Cash Box">Offline Cash Box Only</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Cause Description</label>
            <textarea
              placeholder="Why is this fund being raised? How will it support the congregation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
          >
            Create Donation Cause
          </button>
        </form>

        {/* Right Active Campaigns Panel */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Active Charitable Programs ({donations.length})
          </h3>

          {donations.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-bold text-neutral-500 uppercase">No donation causes.</p>
              <p className="text-[9px] text-neutral-400">Fill in the fields on the left to add a donation drive.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {donations.map((cause, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-xs uppercase text-black">{cause.title}</span>
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-1 border border-emerald-200">Goal: {cause.targetAmount}</span>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-[#FFFDF5] border border-black flex items-center gap-0.5 shadow-[0.5px_0.5px_0px_0px_#000]">
                        <Heart className="w-2.5 h-2.5 text-[#FF6B6B] fill-current" />
                        {cause.paymentGateway}
                      </span>
                    </div>
                    {cause.description && (
                      <p className="text-[9.5px] font-bold text-neutral-500 leading-normal">{cause.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteDonation(idx)}
                    className="p-1 border border-black hover:bg-[#FF6B6B] hover:text-white transition-colors"
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
