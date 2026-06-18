"use client";

import { useBuilderStore } from "@/store/builder-store";
import { CalendarCheck, ShieldAlert, Sparkles, Clock, Check } from "lucide-react";

export function ReservationStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();

  const reservation = categoryAnswers.reservation || {
    bookingPhone: "",
    bookingEmail: "",
    maxGroupSize: "8 guests",
    lunchSlots: true,
    dinnerSlots: true,
    weekendBrunch: false,
    requireCreditCard: false
  };

  const handleUpdate = (fields: Partial<typeof reservation>) => {
    setCategoryAnswers({
      ...categoryAnswers,
      reservation: {
        ...reservation,
        ...fields
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <CalendarCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Reservation Settings</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure table booking slots, capacities, and reservation rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Contact & Group Size */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Reservation Hotline Phone</label>
            <input
              type="text"
              placeholder="e.g. +1 (555) 123-4567"
              value={reservation.bookingPhone}
              onChange={(e) => handleUpdate({ bookingPhone: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Reservation Inquiries Email</label>
            <input
              type="email"
              placeholder="e.g. bookings@gustoitaliano.com"
              value={reservation.bookingEmail}
              onChange={(e) => handleUpdate({ bookingEmail: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Max Online Group Capacity</label>
            <select
              value={reservation.maxGroupSize}
              onChange={(e) => handleUpdate({ maxGroupSize: e.target.value })}
              className="w-full px-2 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="4 guests">Up to 4 guests</option>
              <option value="6 guests">Up to 6 guests</option>
              <option value="8 guests">Up to 8 guests</option>
              <option value="12 guests">Up to 12 guests</option>
              <option value="custom">Larger/Custom Events Only</option>
            </select>
          </div>
        </div>

        {/* Right Column: Time slots and Policies */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A78BFA]" />
              Active Booking Shifts
            </label>
            
            <div className="space-y-2">
              {[
                { key: "lunchSlots", label: "Lunch Shift", desc: "Enable online slots from 11:30 AM to 3:00 PM" },
                { key: "dinnerSlots", label: "Dinner Shift", desc: "Enable online slots from 5:30 PM to 10:00 PM" },
                { key: "weekendBrunch", label: "Weekend Brunch", desc: "Enable Saturday & Sunday slots from 9:30 AM to 2:00 PM" }
              ].map((shift) => {
                const isActive = (reservation as any)[shift.key];
                return (
                  <div
                    key={shift.key}
                    onClick={() => handleUpdate({ [shift.key]: !isActive })}
                    className={`border-2 border-black p-3 cursor-pointer select-none transition-all flex items-center justify-between ${
                      isActive ? "bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#000] translate-y-[-1px]" : "bg-white text-neutral-400 border-neutral-200"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black uppercase text-black block">{shift.label}</span>
                      <span className="text-[9px] text-neutral-400 font-semibold block">{shift.desc}</span>
                    </div>
                    {isActive ? (
                      <span className="w-5 h-5 rounded-full bg-[#4ade80] border border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                        <Check className="w-3 h-3 text-black stroke-[3.5px]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-neutral-200 bg-neutral-50 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policy Toggle */}
          <div
            onClick={() => handleUpdate({ requireCreditCard: !reservation.requireCreditCard })}
            className={`border-2 border-black p-3 cursor-pointer select-none transition-all flex items-center justify-between ${
              reservation.requireCreditCard ? "bg-[#FFEB3B]/10 shadow-[2px_2px_0px_0px_#000]" : "bg-white text-neutral-400 border-neutral-200"
            }`}
          >
            <div className="flex gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-black block">Credit Card hold Policy</span>
                <span className="text-[9px] text-neutral-400 font-semibold block">Require card credentials to secure reservation (prevents no-shows)</span>
              </div>
            </div>
            {reservation.requireCreditCard ? (
              <span className="w-5 h-5 rounded-full bg-[#4ade80] border border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                <Check className="w-3 h-3 text-black stroke-[3.5px]" />
              </span>
            ) : (
              <span className="w-4 h-4 rounded-full border border-neutral-200 bg-neutral-50 shrink-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
