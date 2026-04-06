"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal as GithubIcon, Users, Zap, LayoutDashboard, Sparkles } from "lucide-react";

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 bg-transparent"
        >
            <nav className="glass px-8 py-4 rounded-full flex items-center justify-between w-full max-w-7xl animate-in fade-in slide-in-from-top-4 duration-1000 border-white/5 shimmer-border overflow-hidden">
                <Link href="/" className="flex items-center gap-2 group relative z-10">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/40 group-hover:bg-primary/30 transition-all shadow-glow">
                        <Zap className="w-6 h-6 text-primary fill-primary/20" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-glow uppercase italic">DevMatch</span>
                </Link>

                <div className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest text-white/50 relative z-10">
                    <Link href="/matches" className="hover:text-primary transition-colors flex items-center gap-2 active:scale-95 transition-transform">
                        <Users className="w-3.5 h-3.5" />
                        Teammates
                    </Link>
                    <Link href="/analyzer" className="hover:text-primary transition-colors flex items-center gap-2 active:scale-95 transition-transform">
                        <GithubIcon className="w-3.5 h-3.5" />
                        Analyzer
                    </Link>
                    <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2 active:scale-95 transition-transform">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Arena
                    </Link>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <a
                        href="https://workstack-ai.vercel.app/"
                        target="_blank"
                        className="hidden lg:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 h-12 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shimmer-border overflow-hidden transition-all group/prod active:scale-95"
                    >
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Increase Productivity
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    </a>
                    <Button variant="ghost" className="hover:bg-white/5 text-xs font-black uppercase tracking-widest px-6 h-10 rounded-full">Sign In</Button>
                    <Button className="bg-primary hover:bg-white hover:text-black text-xs font-black uppercase tracking-widest px-8 h-12 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95">
                        Build Now
                    </Button>
                </div>
            </nav>
        </motion.header>
    );
}
