"use client";

import { motion } from "framer-motion";
import Hero3D from "@/components/ui/3d/hero-3d";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Users, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Hero3D />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass text-primary border-primary/20">
              The Ultimate Hackathon Companion
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Match <span className="text-glow text-primary">Teammates</span>.<br />
              Build <span className="text-white/40">Magic</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
              DevMatch uses AI to analyze your skills and GitHub history to find the perfect squad for your next big win.
            </p>

            <div className="flex flex-col sm:row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95 group">
                Find Your Match
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl glass hover:bg-white/5 transition-all">
                Analyze Repository
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        </motion.div>
      </section>

      {/* Feature Section Preview */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Smart Matching", desc: "Our AI considers skill overlap, experience level, and personality types." },
            { icon: Code, title: "Repo Intelligence", desc: "Paste any GitHub link and get an instant architectural breakdown." },
            { icon: Shield, title: "Verified Skills", desc: "We analyze real code to verify expertise, not just self-claimed tags." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] flex flex-col items-start gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
