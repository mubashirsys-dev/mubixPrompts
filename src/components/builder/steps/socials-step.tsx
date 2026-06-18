"use client";

import { useBuilderStore } from "@/store/builder-store";
import { Link2, Globe, Code, Briefcase, Play, Camera, MessageSquare, Phone, Send, Users, Palette } from "lucide-react";

const SOCIAL_PLATFORMS = [
  { id: "github" as const, label: "GitHub", placeholder: "github.com/username", icon: Code, color: "text-black" },
  { id: "linkedin" as const, label: "LinkedIn", placeholder: "linkedin.com/in/username", icon: Briefcase, color: "text-blue-600" },
  { id: "twitter" as const, label: "Twitter / X", placeholder: "x.com/username", icon: MessageSquare, color: "text-neutral-900" },
  { id: "youtube" as const, label: "YouTube", placeholder: "youtube.com/@channel", icon: Play, color: "text-red-600" },
  { id: "instagram" as const, label: "Instagram", placeholder: "instagram.com/username", icon: Camera, color: "text-pink-600" },
  { id: "behance" as const, label: "Behance", placeholder: "behance.net/username", icon: Globe, color: "text-blue-500" },
  { id: "dribbble" as const, label: "Dribbble", placeholder: "dribbble.com/username", icon: Palette, color: "text-rose-500" },
  { id: "facebook" as const, label: "Facebook", placeholder: "facebook.com/username", icon: Users, color: "text-blue-700" },
  { id: "discord" as const, label: "Discord", placeholder: "discord.gg/invite", icon: MessageSquare, color: "text-indigo-600" },
  { id: "whatsapp" as const, label: "WhatsApp", placeholder: "wa.me/number", icon: Phone, color: "text-emerald-500" },
  { id: "telegram" as const, label: "Telegram", placeholder: "t.me/username", icon: Send, color: "text-sky-500" }
];

export function SocialsStep() {
  const { websiteContent, setWebsiteContent } = useBuilderStore();

  const handleSocialChange = (platform: string, value: string) => {
    setWebsiteContent({
      socials: {
        ...websiteContent.socials,
        [platform]: value
      }
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <Link2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Social Connections</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Provide URLs to your profiles across the developer and social networks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SOCIAL_PLATFORMS.map((platform) => {
          const IconComp = platform.icon;
          const currentVal = (websiteContent.socials as any)[platform.id] || "";
          const isFilled = currentVal.trim().length > 0;

          return (
            <div
              key={platform.id}
              className={`border-2 border-black p-4 space-y-2 transition-all ${
                isFilled
                  ? "bg-[#FFFDF5] shadow-[2.5px_2.5px_0px_0px_#000]"
                  : "bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 border border-black bg-white rounded shadow-[1px_1px_0px_0px_#000] ${platform.color}`}>
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black uppercase text-black">
                  {platform.label}
                </span>
              </div>
              <input
                type="text"
                placeholder={platform.placeholder}
                value={currentVal}
                onChange={(e) => handleSocialChange(platform.id, e.target.value)}
                className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-[11px] font-mono font-bold outline-none shadow-[1px_1px_0px_0px_#000] focus:shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
