"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Hero3D from "@/components/ui/3d/hero-3d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap, Shield, Users, Code, Sparkles, Terminal, Rocket } from "lucide-react";
import { FeatureRoadmap } from "@/components/ui/feature-roadmap";


export default function Home() {
  const [demoUrl, setDemoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const router = useRouter();


  const loadingSteps = [
    "Decrypting codebase DNA...",
    "Mapping architectural flow...",
    "Synthesizing optimal squad...",
  ];

  const handleDemo = async () => {
    setIsAnalyzing(true);
    for (let i = 0; i < loadingSteps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (demoUrl) {
      router.push(`/analyzer?url=${encodeURIComponent(demoUrl)}&demo=true`);
    } else {
      router.push(`/analyzer?demo=true`);
    }
  };

  const getBlueprint = (url: string) => {
    if (!url) return null;
    return {
      stack: ["React", "Next.js", "TypeScript"],
      type: "Fullstack SaaS",
      roles: ["Frontend Lead", "Backend / DevOps", "Product Designer"]
    };
  };

  const blueprint = getBlueprint(demoUrl);

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[900px] w-full flex items-center justify-center overflow-hidden">
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
              <span className="gold-shimmer">Match</span> <span className="text-glass-shimmer">Teammates</span>.<br />
              <span className="gold-shimmer">Build</span> <span className="text-white/40">Magic</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
              DevMatch uses AI to analyze your skills and GitHub history to find the perfect squad for your next big win.
            </p>

            {/* Instant Demo Input */}
            <div className="relative max-w-2xl mx-auto mb-10 group/input">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                className="p-1.5 glass-premium rounded-[2.5rem] gold-shimmer-border flex items-center gap-2 focus-within:shadow-[0_0_80px_rgba(99,102,241,0.15)] transition-all duration-700 shadow-2xl relative z-20"
              >
                <div className="flex-1 flex items-center px-8 gap-4">
                  <div className="relative flex items-center justify-center">
                    <Terminal className={`w-5 h-5 text-primary/30 group-focus-within/input:text-primary transition-all duration-500 ${demoUrl ? 'scale-110' : ''}`} />
                    {demoUrl && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </div>
                  <Input
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="Paste GitHub Repository URL..."
                    className="bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-white/10 h-16 text-base font-light tracking-tight selection:bg-primary/30"
                    onKeyDown={(e) => e.key === 'Enter' && handleDemo()}
                  />
                </div>
                <Button
                  onClick={handleDemo}
                  disabled={isAnalyzing}
                  className="rounded-[1.8rem] h-16 px-10 bg-primary hover:bg-white hover:text-black gap-3 transition-all active:scale-95 hover:scale-[1.02] shadow-glow font-black uppercase text-[10px] tracking-[0.2em] shrink-0 shimmer-border overflow-hidden group/btn"
                >
                  {isAnalyzing ? (
                    <Zap className="w-4 h-4 animate-spin text-white group-hover/btn:text-black" />
                  ) : (
                    <>
                      Try Demo
                      <Sparkles className="w-3.5 h-3.5 animate-pulse text-white/70 group-hover/btn:text-black" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                </Button>
              </motion.div>


              {/* Live Intelligence Preview */}
              <AnimatePresence>
                {demoUrl && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-4 p-6 glass-card rounded-3xl border border-primary/20 shadow-2xl z-10 text-left overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Code className="w-24 h-24 text-primary" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Live Context Analysis</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[9px] uppercase font-bold text-white/30 mb-1">Tech Stack</div>
                        <div className="flex flex-wrap gap-1">
                          {blueprint?.stack.map(s => (
                            <span key={s} className="text-[10px] font-bold text-white/70">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase font-bold text-white/30 mb-1">Project Type</div>
                        <div className="text-[10px] font-bold text-primary">{blueprint?.type}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase font-bold text-white/30 mb-1">Suggested Squad</div>
                        <div className="text-[10px] font-bold text-white/70">{blueprint?.roles.length} Roles Identified</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Loading Overlay */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
                >
                  <div className="text-center space-y-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 border-t-2 border-primary rounded-full mx-auto shadow-glow"
                    />
                    <div className="space-y-4">
                      <motion.h4
                        key={analysisStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-2xl font-black tracking-tighter text-glow"
                      >
                        {loadingSteps[analysisStep]}
                      </motion.h4>
                      <div className="flex items-center justify-center gap-2">
                        {loadingSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= analysisStep ? 'bg-primary shadow-glow scale-125' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:row items-center justify-center gap-4">
              <Link href="/matches">
                <Button size="lg" className="h-14 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95 group">
                  Find Your Match
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/analyzer">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl glass hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
                  Analyze Repository
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12"
            >
              <Button
                variant="ghost"
                onClick={() => setShowRoadmap(true)}
                className="h-10 px-6 rounded-full glass-premium border-white/5 hover:border-primary/30 transition-all group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary active:scale-95 shadow-2xl"
              >
                <Rocket className="w-3.5 h-3.5 text-primary group-hover:animate-bounce" />
                Features & Roadmap
              </Button>
            </motion.div>

            <FeatureRoadmap
              isOpen={showRoadmap}
              onClose={() => setShowRoadmap(false)}
            />
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
