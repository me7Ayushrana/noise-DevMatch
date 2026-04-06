"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Calendar,
    Users,
    Plus,
    CheckCircle2,
    XCircle,
    Search,
    LayoutGrid,
    ShieldCheck,
    Send,
    Sparkles,
    ArrowRight,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Hackathon {
    id: string;
    title: string;
    date: string;
    prize: string;
    participants: number;
    status: 'approved' | 'pending';
    category: string;
    image?: string;
}

const INITIAL_HACKATHONS: Hackathon[] = [
    {
        id: "1",
        title: "Global AI Challenge",
        date: "April 15-17",
        prize: "$50,000",
        participants: 1200,
        status: "approved",
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "2",
        title: "Web3 Infinity",
        date: "May 2-4",
        prize: "$30,000",
        participants: 850,
        status: "approved",
        category: "Blockchain",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "3",
        title: "Sustain-a-Thon",
        date: "June 10-12",
        prize: "$20,000",
        participants: 500,
        status: "approved",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
    }
];

export default function DashboardPage() {
    const [hackathons, setHackathons] = useState<Hackathon[]>(INITIAL_HACKATHONS);
    const [activeTab, setActiveTab] = useState("explorer");
    const [newHackathon, setNewHackathon] = useState({ title: "", date: "", prize: "", category: "", image: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [joinedIds, setJoinedIds] = useState<string[]>([]);

    const handleJoin = (id: string) => {
        if (joinedIds.includes(id)) return;
        setJoinedIds([...joinedIds, id]);
    };

    const pendingCount = hackathons.filter(h => h.status === 'pending').length;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            const submission: Hackathon = {
                id: Math.random().toString(36).substr(2, 9),
                ...newHackathon,
                participants: 0,
                status: 'pending'
            };
            setHackathons([submission, ...hackathons]);
            setNewHackathon({ title: "", date: "", prize: "", category: "", image: "" });
            setIsSubmitting(false);
            setActiveTab("explorer");
        }, 1500);
    };

    const handleApprove = (id: string) => {
        setHackathons(prev => prev.map(h =>
            h.id === id ? { ...h, status: 'approved' } : h
        ));
    };

    const handleReject = (id: string) => {
        setHackathons(prev => prev.filter(h => h.id !== id));
    };

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 max-w-7xl relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
                <div className="space-y-4">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-xs font-mono tracking-widest text-primary animate-shimmer-fast overflow-hidden relative">
                        <span className="relative z-10">COMMUNITY HUB</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Nexus <span className="text-white/20 italic">Dev</span><br />
                        <span className="text-primary text-glow">Dashboard</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md leading-relaxed">Curated high-stakes hackathons. Reviewed by the community, approved by architects.</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white/[0.03] p-1.5 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                    <TabsList className="bg-transparent gap-2 h-14">
                        <TabsTrigger value="explorer" className="rounded-2xl px-8 gap-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-500">
                            <LayoutGrid className="w-5 h-5" /> Explorer
                        </TabsTrigger>
                        <TabsTrigger value="submit" className="rounded-2xl px-8 gap-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-500">
                            <Plus className="w-5 h-5" /> Propose
                        </TabsTrigger>
                        <TabsTrigger value="admin" className="rounded-2xl px-8 gap-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-500 relative">
                            <ShieldCheck className="w-5 h-5" /> Admin
                            {pendingCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-xs flex items-center justify-center rounded-full font-black shadow-lg shadow-primary">
                                    {pendingCount}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                >
                    {activeTab === "explorer" && (
                        <div className="space-y-12">
                            {/* WorkstackAI Promotion */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-premium p-8 rounded-[3rem] border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/40 transition-all duration-700"
                            >
                                <div className="flex items-center gap-8 text-center md:text-left flex-col md:flex-row">
                                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-glow shrink-0">
                                        <Zap className="w-10 h-10 text-primary animate-pulse" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tighter">Ready to <span className="text-primary text-glow text-xl">Skyrocket</span> your <span className="italic text-white/20">Productivity?</span></h2>
                                        <p className="text-white/40 max-w-xl mt-1">Create your dedicated workspace and work with better focus on <span className="text-primary font-black">WorkstackAI</span>.</p>
                                    </div>
                                </div>
                                <a
                                    href="https://workstack-ai.vercel.app/"
                                    target="_blank"
                                    className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3 shrink-0"
                                >
                                    Create Workspace <ArrowRight className="w-5 h-5" />
                                </a>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {hackathons.filter(h => h.status === 'approved').map((hack) => (
                                    <Card key={hack.id} className="glass-premium group border-white/5 hover:border-primary/50 transition-all duration-700 rounded-[2.5rem] shadow-none overflow-visible">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] blur-xl -z-10" />
                                        <div className="relative h-60 overflow-hidden rounded-[2rem] m-2 shadow-2xl shimmer-border">
                                            <img
                                                src={hack.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"}
                                                alt={hack.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                        </div>
                                        <CardHeader className="space-y-4 px-8 pb-4 relative z-10 -mt-12">
                                            <CardTitle className="text-2xl font-black tracking-tighter text-white drop-shadow-2xl line-clamp-1">{hack.title}</CardTitle>
                                            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                                                <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {hack.date}</span>
                                                <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-indigo-400" /> {hack.participants} devs</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6 px-8 pb-8 pt-2">
                                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            <div className="text-lg font-black text-white flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                                    <Trophy className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                {hack.prize} Pool
                                            </div>
                                            <Button
                                                onClick={() => handleJoin(hack.id)}
                                                variant={joinedIds.includes(hack.id) ? "secondary" : "outline"}
                                                className={`w-full h-14 rounded-2xl gap-3 text-sm font-bold uppercase tracking-widest group/btn active:scale-95 transition-all ${joinedIds.includes(hack.id) ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-white/5 border-white/10 hover:bg-white hover:text-black"}`}
                                            >
                                                {joinedIds.includes(hack.id) ? (
                                                    <>Joined Arena <CheckCircle2 className="w-4 h-4" /></>
                                                ) : (
                                                    <>Explore Arena <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" /></>
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "submit" && (
                        <div className="max-w-3xl mx-auto pb-20">
                            <Card className="glass-premium border-white/10 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors" />
                                <CardHeader className="p-0 mb-10 space-y-6">
                                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_30px_rgba(99,102,241,0.3)] animate-pulse-slow">
                                        <Plus className="w-10 h-10 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-4xl font-black tracking-tighter">Propose a <span className="text-primary text-glow">Hackathon</span></CardTitle>
                                        <CardDescription className="text-lg text-white/50">Your vision, the community's next big stage.</CardDescription>
                                    </div>
                                </CardHeader>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Event Title</label>
                                            <Input
                                                placeholder="Nexus Dev Summit"
                                                className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-lg focus:border-primary/50 transition-all outline-none"
                                                value={newHackathon.title}
                                                onChange={e => setNewHackathon({ ...newHackathon, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Category</label>
                                            <Input
                                                placeholder="Open Source"
                                                className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-lg focus:border-primary/50 transition-all outline-none"
                                                value={newHackathon.category}
                                                onChange={e => setNewHackathon({ ...newHackathon, category: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Timeline</label>
                                            <Input
                                                placeholder="July 20-22"
                                                className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-lg focus:border-primary/50 transition-all outline-none"
                                                value={newHackathon.date}
                                                onChange={e => setNewHackathon({ ...newHackathon, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Prize Pool</label>
                                            <Input
                                                placeholder="$10,000"
                                                className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-lg focus:border-primary/50 transition-all outline-none"
                                                value={newHackathon.prize}
                                                onChange={e => setNewHackathon({ ...newHackathon, prize: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Poster Image URL</label>
                                        <Input
                                            placeholder="https://images.unsplash.com/..."
                                            className="h-16 bg-white/[0.03] border-white/10 rounded-2xl px-6 text-lg focus:border-primary/50 transition-all outline-none"
                                            value={newHackathon.image}
                                            onChange={e => setNewHackathon({ ...newHackathon, image: e.target.value })}
                                        />
                                        <p className="text-[10px] text-muted-foreground opacity-40 italic mt-2 ml-1 items-center flex gap-2">
                                            <Sparkles className="w-3 h-3 text-primary" /> Protip: High-resolution posters get 2x more dev signups.
                                        </p>
                                    </div>
                                    <Button disabled={isSubmitting} className="w-full h-20 bg-primary hover:bg-white hover:text-black text-xl font-black rounded-3xl gap-4 shadow-2xl shadow-primary/20 active:scale-[0.98] transition-all duration-500 group/submit">
                                        {isSubmitting ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                <Sparkles className="w-6 h-6" />
                                            </motion.div>
                                        ) : (
                                            <Send className="w-6 h-6 group-hover/submit:translate-x-2 group-hover/submit:-translate-y-2 transition-transform" />
                                        )}
                                        {isSubmitting ? "BROADCASTING TO NETWORK..." : "SUBMIT PROPOSAL"}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    )}

                    {activeTab === "admin" && (
                        <div className="space-y-12 max-w-5xl mx-auto pb-20">
                            <div className="flex items-center gap-6 p-8 glass-premium rounded-[2.5rem] border-primary/20">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40 shadow-glow">
                                    <ShieldCheck className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight">Security & <span className="text-primary text-glow">Governance</span></h2>
                                    <p className="text-white/40 font-mono text-xs uppercase tracking-widest mt-1">Reviewing {pendingCount} pending requests</p>
                                </div>
                            </div>

                            {pendingCount === 0 ? (
                                <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-30 space-y-6">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                                    <p className="text-xl font-black uppercase tracking-widest">Protocol Synchronized</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {hackathons.filter(h => h.status === 'pending').map((node) => (
                                        <motion.div
                                            layout
                                            key={node.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="glass-premium p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-primary/40 transition-all duration-500"
                                        >
                                            <div className="flex items-center gap-8 w-full md:w-auto">
                                                <div className="w-32 h-20 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                                                    {node.image ? (
                                                        <img src={node.image} alt={node.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                            <Trophy className="w-8 h-8 text-primary/40" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-black tracking-tight leading-none">{node.title}</h3>
                                                    <div className="flex flex-wrap gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                                                        <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {node.date}</span>
                                                        <span className="flex items-center gap-2 font-bold text-emerald-400"><Trophy className="w-3.5 h-3.5" /> {node.prize}</span>
                                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] text-white/50">{node.category}</Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 w-full md:w-auto">
                                                <Button
                                                    onClick={() => handleReject(node.id)}
                                                    variant="ghost"
                                                    className="h-16 px-8 rounded-2xl hover:bg-destructive/10 hover:text-destructive gap-2 flex-1 md:flex-none border border-white/5 hover:border-destructive/20 font-black uppercase text-xs tracking-widest transition-all active:scale-95"
                                                >
                                                    <XCircle className="w-5 h-5" /> REJECT
                                                </Button>
                                                <Button
                                                    onClick={() => handleApprove(node.id)}
                                                    className="h-16 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black flex items-center justify-center gap-3 flex-1 md:flex-none shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all uppercase text-xs tracking-widest"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" /> APPROVE REQUEST
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
