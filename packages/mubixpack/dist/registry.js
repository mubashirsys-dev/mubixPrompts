"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRegistry = void 0;
exports.componentRegistry = {
    "brutalist": {
        id: "brutalist",
        name: "Neo Brutalism",
        tailwind: `module.exports = {
  theme: {
    extend: {
      colors: {
        neoYellow: '#FFD93D',
        neoRed: '#FF6B6B',
        neoPurple: '#C4B5FD',
        neoCanvas: '#FFFDF5',
      },
      borderWidth: { '4': '4px' },
      boxShadow: {
        'neo': '5px 5px 0px 0px #000000',
        'neo-lg': '8px 8px 0px 0px #000000',
      }
    }
  }
}`,
        css: `/* Neo Brutalism root values */
:root {
  --neo-yellow: #FFD93D;
  --neo-canvas: #FFFDF5;
}`,
        components: {
            "Hero.tsx": `"use client";
import React from 'react';

export function Hero() {
  return (
    <div className="border-4 border-black p-8 bg-[#FFFDF5] shadow-[8px_8px_0px_0px_#000] space-y-4 max-w-4xl mx-auto rotate-[0.5deg]">
      <span className="inline-block px-3 py-1 bg-[#FF6B6B] text-white border-2 border-black font-black uppercase text-xs rotate-[-2deg]">
        NEO-BRUTALISM STYLE ACTIVE
      </span>
      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
        THE REALM OF <span className="bg-[#FFD93D] px-2 border-2 border-black rotate-[1deg] inline-block shadow-[3px_3px_0px_0px_#000]">RAW DESIGN</span>
      </h1>
      <p className="text-sm font-bold text-black/80 leading-relaxed max-w-lg">
        This component is installed natively by MubixPack CLI. Modify classes dynamically as required.
      </p>
      <div className="flex gap-4 pt-2">
        <button className="px-5 py-2.5 border-4 border-black bg-[#FFD93D] text-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_#000]">
          Explore System
        </button>
      </div>
    </div>
  );
}`,
            "Button.tsx": `"use client";
import React from 'react';

export function Button({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border-2 border-black bg-[#FFD93D] text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all"
    >
      {children}
    </button>
  );
}`
        }
    },
    "cyberpunk": {
        id: "cyberpunk",
        name: "Cyberpunk",
        tailwind: `module.exports = {
  theme: {
    extend: {
      colors: {
        cyberCyan: '#00ffff',
        cyberMagenta: '#ff00ff',
      },
      boxShadow: { 'cyber': '0px 0px 15px 0px #00ffff' }
    }
  }
}`,
        css: `/* Cyberpunk root values */
:root {
  --cyber-cyan: #00ffff;
  --cyber-magenta: #ff00ff;
}`,
        components: {
            "Hero.tsx": `"use client";
import React from 'react';

export function Hero() {
  return (
    <div className="bg-black border-2 border-[#ff00ff] p-6 shadow-[5px_5px_0px_0px_#00ffff] font-mono text-[#e0e0e0] max-w-4xl mx-auto space-y-4">
      <div className="flex justify-between items-center text-[10px] text-[#00ffff] border-b border-[#00ffff]/30 pb-2">
        <span>SYSTEM_OVERRIDE_ACTIVE</span>
        <span className="animate-pulse">● LIVE_FEED</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest leading-none text-white">
        ENTER THE <span className="text-[#00ffff] block sm:inline">NEO MATRIX</span>
      </h1>
      <p className="text-xs text-white/70 max-w-md leading-relaxed">
        Premium modular HUD interface injected directly from the Mubix CLI packages compiler registry.
      </p>
      <div className="flex gap-4 pt-2">
        <button className="px-4 py-2 border border-[#ff00ff] bg-black text-[#ff00ff] font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#00ffff]">
          RUN COMPILER
        </button>
      </div>
    </div>
  );
}`
        }
    },
    "minimal-saas": {
        id: "minimal-saas",
        name: "Minimal SaaS",
        tailwind: `module.exports = {
  theme: {
    extend: {
      colors: {
        saasPrimary: '#0f172a',
      }
    }
  }
}`,
        css: `/* Minimal SaaS root values */
:root {
  --saas-primary: #0f172a;
}`,
        components: {
            "Hero.tsx": `"use client";
import React from 'react';

export function Hero() {
  return (
    <div className="text-center py-12 px-6 bg-neutral-50/50 border border-neutral-100 rounded-3xl shadow-sm max-w-4xl mx-auto space-y-4">
      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px]">
        Minimal SaaS Active
      </span>
      <h1 className="text-4xl font-extrabold text-black tracking-tight leading-tight">
        Modern UI systems <span className="text-blue-600">made effortless</span>
      </h1>
      <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
        Pristine modular layout components compiled natively by the local MubixPack downloader.
      </p>
    </div>
  );
}`
        }
    }
};
