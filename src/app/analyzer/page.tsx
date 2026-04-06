"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RepoTree } from "@/components/analyzer/repo-tree";
import { RepoGraph } from "@/components/analyzer/repo-graph";
import { RepoNode } from "@/lib/utils/github";
import { Terminal as GithubIcon, Search, BookOpen, Layers, Terminal as TerminalIcon, Sparkles, Code2, Layout, Database, Network } from "lucide-react";

const MOCK_FILES: RepoNode[] = [
    {
        name: "src", type: "dir", path: "src",
        children: [
            {
                name: "app", type: "dir", path: "src/app",
                children: [
                    { name: "page.tsx", type: "file", path: "src/app/page.tsx" },
                    { name: "layout.tsx", type: "file", path: "src/app/layout.tsx" }
                ]
            },
            {
                name: "components", type: "dir", path: "src/components",
                children: [
                    { name: "navbar.tsx", type: "file", path: "src/components/navbar.tsx" }
                ]
            }
        ]
    },
    {
        name: "public", type: "dir", path: "public",
        children: [
            { name: "logo.png", type: "file", path: "public/logo.png" }
        ]
    },
    { name: "package.json", type: "file", path: "package.json" },
    { name: "README.md", type: "file", path: "README.md" }
];

export default function AnalyzerPage() {
    const [url, setUrl] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<boolean>(false);

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setResults(true);
        }, 2000);
    };

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-16 relative z-10">
                <header className="text-center space-y-6">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase py-1.5 px-4 rounded-full shimmer-border overflow-hidden">
                        Intelligence Protocol V2.0
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Neural <span className="text-primary text-glow">Repo</span><br />
                        <span className="italic text-white/20">Architecture</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Deconstructing codebase DNA in real-time. Paste a GitHub URL to start the sequence.
                    </p>
                </header>

                <div className="flex gap-4 p-3 glass-premium rounded-[2.5rem] border-white/5 max-w-3xl mx-auto shadow-2xl group transition-all duration-700 hover:border-primary/30">
                    <div className="flex-1 flex items-center px-6 gap-4 bg-white/[0.02] rounded-[1.8rem] border border-white/5 group-focus-within:border-primary/40 transition-all">
                        <GithubIcon className="w-6 h-6 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="https://github.com/facebook/react"
                            className="border-none bg-transparent focus-visible:ring-0 text-lg h-16 placeholder:text-white/20 font-medium"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={!url || isAnalyzing}
                        onClick={startAnalysis}
                        className="h-16 px-12 bg-primary hover:bg-white hover:text-black text-xs font-black uppercase tracking-widest rounded-[1.5rem] shadow-glow active:scale-95 transition-all"
                    >
                        {isAnalyzing ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                        ) : "Analyze Repository"}
                    </Button>
                </div>

                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                        >
                            {/* File Tree Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                <Card className="glass-premium border-white/5 rounded-[2.5rem]">
                                    <CardHeader className="px-8 pt-8">
                                        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/40">
                                                <Layers className="w-4 h-4 text-primary" />
                                            </div>
                                            Skeleton View
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-8">
                                        <RepoTree nodes={MOCK_FILES} />
                                    </CardContent>
                                </Card>

                                <Card className="glass-premium border-white/5 rounded-[2.5rem]">
                                    <CardHeader className="px-8 pt-8">
                                        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40">
                                                <TerminalIcon className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            Tech Stack
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8 flex flex-wrap gap-2">
                                        {["React 18", "Next.js 14", "TypeScript", "TailwindCSS"].map(t => (
                                            <Badge key={t} variant="secondary" className="bg-white/5 border-white/10 text-[10px] font-bold uppercase tracking-tighter hover:bg-primary/20 hover:text-primary transition-colors cursor-default">{t}</Badge>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Main Analysis Results */}
                            <div className="lg:col-span-8 space-y-10">
                                {/* Workflow Visualization */}
                                <Card className="glass-premium border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                        <Sparkles className="w-40 h-40 text-primary" />
                                    </div>
                                    <CardHeader className="p-0 mb-10">
                                        <CardTitle className="text-3xl font-black tracking-tighter">Workflow <span className="text-primary text-glow">Visualization</span></CardTitle>
                                        <CardDescription className="text-white/40 font-mono text-xs uppercase tracking-widest mt-2">Inferred Data Orchestration</CardDescription>
                                    </CardHeader>

                                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 py-8">
                                        <div className="flex flex-col items-center gap-4 group">
                                            <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                                <Layout className="w-10 h-10 text-indigo-400" />
                                            </div>
                                            <span className="text-sm font-bold font-mono tracking-tighter uppercase">Frontend</span>
                                        </div>

                                        <div className="w-full md:w-20 h-px bg-gradient-to-r from-indigo-500 to-primary relative">
                                            <motion.div
                                                animate={{ left: ["0%", "100%"] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                className="absolute -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-4 group">
                                            <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                                <Code2 className="w-10 h-10 text-primary" />
                                            </div>
                                            <span className="text-sm font-bold font-mono tracking-tighter uppercase">API Layer</span>
                                        </div>

                                        <div className="w-full md:w-20 h-px bg-gradient-to-r from-primary to-emerald-500 relative">
                                            <motion.div
                                                animate={{ left: ["0%", "100%"] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                                                className="absolute -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-4 group">
                                            <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                                <Database className="w-10 h-10 text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-bold font-mono tracking-tighter uppercase">Database</span>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="glass-premium border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="space-y-2">
                                            <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-glow">
                                                    <Network className="w-7 h-7 text-primary" />
                                                </div>
                                                Architecture <span className="text-primary text-glow">Graph</span>
                                            </CardTitle>
                                            <CardDescription className="text-white/40 font-mono text-xs uppercase tracking-widest pl-16">Recursive Structural Mapping</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 animate-pulse px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)]">Live Data Stream</Badge>
                                    </div>
                                    <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-slate-950/40 p-4 shadow-inner relative shimmer-border">
                                        <RepoGraph nodes={MOCK_FILES} repoUrl={url || "https://github.com/facebook/react"} />
                                    </div>
                                </Card>

                                <Card className="glass-premium border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                                    <CardHeader className="p-0 mb-10">
                                        <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                                <BookOpen className="w-7 h-7 text-emerald-400" />
                                            </div>
                                            Beginner <span className="text-emerald-400 text-glow">Guide</span>
                                        </CardTitle>
                                        <CardDescription className="text-white/40 font-mono text-xs uppercase tracking-widest pl-16">Synthesized Onboarding Protocol</CardDescription>
                                    </CardHeader>
                                    <div className="space-y-8 relative z-10">
                                        {[
                                            { id: 1, text: "Start by exploring the `/app` directory for page layouts and routing logic.", color: "primary" },
                                            { id: 2, text: "The main application state and providers are defined in the `layout.tsx` file.", color: "primary" },
                                            { id: 3, text: "Custom UI components like the Hero and Navbar live in the `/components` directory.", color: "primary" }
                                        ].map((step) => (
                                            <div key={step.id} className="flex gap-6 group/step">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-white border border-white/10 group-hover/step:bg-primary group-hover/step:border-primary group-hover/step:shadow-glow transition-all duration-500 shrink-0">
                                                    {step.id}
                                                </div>
                                                <p className="text-white/60 leading-relaxed font-medium group-hover/step:text-white transition-colors">
                                                    {step.text.split('`').map((part, i) => i % 2 === 1 ? <code key={i} className="text-primary font-black bg-primary/10 px-2 py-0.5 rounded-md mx-1">{part}</code> : part)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
