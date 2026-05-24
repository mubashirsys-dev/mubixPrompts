"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, MessageSquare } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Wizard" },
  { href: "/design-studio", label: "Design Studio" },
  { href: "/presets", label: "Presets" },
  { href: "/features", label: "Features" },
  { href: "/assistant", label: "AI Assistant" },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF5] border-b-4 border-black"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden border-4 border-black shadow-[3px_3px_0px_0px_#000]">
            <Image
              src="/logo.jpeg"
              alt="MubixPrompts Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-black flex items-center gap-1">
            <span className="bg-[#FFD93D] px-2 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]">Mubix</span>
            <span className="text-black">Prompts</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 border-2 transition-all duration-100 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  isActive
                    ? "bg-[#C4B5FD] border-black shadow-[3px_3px_0px_0px_#000] text-black"
                    : "bg-white border-black hover:bg-neutral-50 text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/assistant">
            <button className="neo-btn bg-[#FFD93D] hover:bg-[#ffe366] text-xs font-black uppercase flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 stroke-[3px]" />
              AI Chat
            </button>
          </Link>
          <Link href="/builder">
            <button className="neo-btn neo-btn-accent text-xs font-black uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 stroke-[3px]" />
              Start Building
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 border-4 border-black bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          {isMobileOpen ? <X className="w-6 h-6 stroke-[3px]" /> : <Menu className="w-6 h-6 stroke-[3px]" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-4 border-black bg-[#FFFDF5] px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block text-lg font-black uppercase border-2 border-black p-3 shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    isActive ? "bg-[#C4B5FD] text-black" : "bg-white text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/assistant" onClick={() => setIsMobileOpen(false)}>
                <button className="w-full neo-btn bg-[#FFD93D] py-3 text-sm flex items-center justify-center gap-1.5 font-black uppercase">
                  <MessageSquare className="w-4 h-4 stroke-[3px]" />
                  AI Chat
                </button>
              </Link>
              <Link href="/builder" onClick={() => setIsMobileOpen(false)}>
                <button className="w-full neo-btn neo-btn-accent py-3 text-sm flex items-center justify-center gap-1.5 font-black uppercase">
                  <Sparkles className="w-4 h-4 stroke-[3px]" />
                  Build
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
