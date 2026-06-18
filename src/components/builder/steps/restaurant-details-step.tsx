"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Utensils, Clock, MapPin, Phone } from "lucide-react";

export function RestaurantDetailsStep() {
  const { projectDetails, setProjectDetails, websiteContent, setWebsiteContent } = useBuilderStore();

  const handleFooterChange = (field: string, value: string) => {
    setWebsiteContent({
      footer: {
        ...websiteContent.footer,
        [field]: value
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Utensils className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Restaurant Profile</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Configure operating schedules, location, contact, and culinary style</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Basic Details & Cuisine */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Restaurant Name*</label>
            <input
              type="text"
              required
              placeholder="e.g. Gusto Italiano, Sakura Sushi"
              value={projectDetails.projectName || ""}
              onChange={(e) => setProjectDetails({ projectName: e.target.value, businessName: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Cuisine Type / Restaurant Tagline*</label>
            <input
              type="text"
              required
              placeholder="e.g. Authentic Woodfired Neapolitan Pizza & Wine Bar"
              value={projectDetails.tagline || ""}
              onChange={(e) => setProjectDetails({ tagline: e.target.value })}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Restaurant Description / Story</label>
            <textarea
              placeholder="Describe your culinary philosophy, chef's vision, or background history..."
              value={projectDetails.projectGoals || ""}
              onChange={(e) => setProjectDetails({ projectGoals: e.target.value })}
              rows={4}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000] resize-none"
            />
          </div>
        </div>

        {/* Right Column: Schedule & Contact details */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Operating Hours
            </label>
            <input
              type="text"
              placeholder="e.g. Mon-Fri: 12PM - 10PM, Sat-Sun: 11AM - 11PM"
              value={websiteContent.footer.addressText || ""}
              onChange={(e) => handleFooterChange("addressText", e.target.value)}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              Street Address
            </label>
            <input
              type="text"
              placeholder="e.g. 123 Gourmet Blvd, New York, NY 10001"
              value={websiteContent.footer.phoneNumber || ""}
              onChange={(e) => handleFooterChange("phoneNumber", e.target.value)}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              Contact Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="e.g. hello@gustoitaliano.com | +1 (555) 019-2831"
              value={websiteContent.footer.emailAddress || ""}
              onChange={(e) => handleFooterChange("emailAddress", e.target.value)}
              className="w-full px-2.5 py-2 border-2 border-black bg-white text-xs font-bold outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
