import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t-4 border-black bg-[#FFFDF5]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 overflow-hidden border-4 border-black shadow-[3px_3px_0px_0px_#000]">
                <Image src="/logo.jpeg" alt="MubixPrompts" fill className="object-cover" />
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-black">
                MUBIX<span className="text-[#FF6B6B]">PROMPTS</span>
              </span>
            </Link>
            <p className="text-sm font-bold text-black/80 leading-relaxed">
              The premium Neo-brutalist Prompt Operating System. Compile master prompts that bring AI designs to life with zero manual configuration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-md font-black uppercase mb-4 text-black bg-[#FFD93D] inline-block px-2 border-2 border-black rotate-[-1deg]">Product</h4>
            <ul className="space-y-3">
              {["Builder", "Features", "Pricing"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === "builder" ? "builder" : ""}`} className="text-sm font-bold text-black/70 hover:text-black hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-md font-black uppercase mb-4 text-black bg-[#C4B5FD] inline-block px-2 border-2 border-black rotate-[2deg]">Resources</h4>
            <ul className="space-y-3">
              {["Documentation", "Blog", "Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-black/70 hover:text-black hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-md font-black uppercase mb-4 text-black bg-[#FF6B6B] text-white inline-block px-2 border-2 border-black rotate-[-2deg]">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-black/70 hover:text-black hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-4 border-black flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-black text-black">
            © {new Date().getFullYear()} MUBIXPROMPTS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="p-2 border-2 border-black bg-white hover:bg-[#FFD93D] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="#" className="p-2 border-2 border-black bg-white hover:bg-[#C4B5FD] shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </Link>
            <div className="flex items-center gap-1.5 text-sm font-black uppercase text-black border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_0px_#000]">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              OPERATED BY ANTIGRAVITY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
