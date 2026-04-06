"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, Code2, Rocket, Brain, Palette, Briefcase, Globe, Zap, Users, MessageSquare, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: "basic", title: "The Basics", icon: User },
    { id: "role", title: "Your Role", icon: Briefcase },
    { id: "skills", title: "Tech Stack", icon: Code2 },
    { id: "style", title: "Work Style", icon: Rocket }
];

interface ProfileFormProps {
    onComplete?: () => void;
}

export function ProfileForm({ onComplete }: ProfileFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        githubUsername: "",
        role: "",
        workStyle: ""
    });
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const handleComplete = async () => {
        setIsCompleting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (onComplete) {
            onComplete();
        } else {
            router.push("/matches");
        }
    };

    const isStepValid = () => {
        if (step === 0) return formData.fullName.length > 2 && formData.githubUsername.length > 2;
        if (step === 1) return formData.role !== "";
        if (step === 2) return skills.length > 0;
        if (step === 3) return formData.workStyle !== "";
        return true;
    };

    return (
        <Card className="max-w-xl mx-auto glass border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-8">
                <div className="flex justify-between items-center mb-6">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${i <= step ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-white/5 text-muted-foreground"}`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s.title}</span>
                        </div>
                    ))}
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight">Step {step + 1}: {STEPS[step].title}</CardTitle>
                <CardDescription>Tell us a bit about yourself to find the best match.</CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {step === 0 && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/70">Full Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="h-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/70">GitHub Username</label>
                                    <Input
                                        placeholder="johndoe"
                                        value={formData.githubUsername}
                                        onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                                        className="h-12 bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20"
                                    />
                                </div>
                            </>
                        )}

                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: "frontend", label: "Frontend", icon: Palette },
                                    { id: "backend", label: "Backend", icon: Brain },
                                    { id: "fullstack", label: "Fullstack", icon: Code2 },
                                    { id: "designer", label: "Designer", icon: Briefcase }
                                ].map((role) => (
                                    <Button
                                        key={role.id}
                                        variant="ghost"
                                        className={cn(
                                            "flex flex-col items-center gap-4 p-8 h-auto rounded-3xl transition-all active:scale-95 border",
                                            formData.role === role.id
                                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                                                : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                        )}
                                        onClick={() => setFormData({ ...formData, role: role.id })}
                                    >
                                        <role.icon className={cn("w-8 h-8", formData.role === role.id ? "text-primary" : "text-white/40")} />
                                        <span className={cn("font-bold", formData.role === role.id ? "text-white" : "text-white/60")}>{role.label}</span>
                                    </Button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add a skill (e.g. React, Python)"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                                        className="h-12 bg-white/[0.03] border-white/10 focus:border-primary/50 placeholder:text-white/20"
                                    />
                                    <Button onClick={addSkill} variant="secondary" className="h-12 px-6">Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((s) => (
                                        <Badge key={s} variant="secondary" className="px-4 py-2 bg-primary/10 border-primary/20 text-primary rounded-xl flex items-center gap-2">
                                            <span className="font-bold">{s}</span>
                                            <button
                                                onClick={() => setSkills(skills.filter(sk => sk !== s))}
                                                className="hover:text-white transition-colors active:scale-90 opacity-60 hover:opacity-100"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { id: "remote", label: "Remote-First", icon: Globe, desc: "Prefer distributed squads" },
                                    { id: "fast", label: "High Velocity", icon: Zap, desc: "Swift, iteration-driven" },
                                    { id: "collab", label: "Collaborative", icon: Users, desc: "Pair-programming depth" },
                                    { id: "expr", label: "Experimental", icon: MessageSquare, desc: "Bold, blue-sky ideas" }
                                ].map((style) => (
                                    <Button
                                        key={style.id}
                                        variant="outline"
                                        className={cn(
                                            "flex items-center gap-4 p-5 h-auto rounded-2xl transition-all active:scale-98 border text-left justify-start",
                                            formData.workStyle === style.id
                                                ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                                : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                        )}
                                        onClick={() => setFormData({ ...formData, workStyle: style.id })}
                                    >
                                        <div className={cn("p-2.5 rounded-lg", formData.workStyle === style.id ? "bg-primary/20 text-primary" : "bg-white/5 text-white/30")}>
                                            <style.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className={cn("font-bold text-sm", formData.workStyle === style.id ? "text-white" : "text-white/60")}>{style.label}</div>
                                            <div className="text-[10px] text-white/30">{style.desc}</div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-12">
                    <Button
                        variant="ghost"
                        disabled={step === 0}
                        onClick={() => setStep(step - 1)}
                        className="active:scale-95 transition-all"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : handleComplete()}
                        disabled={!isStepValid() || isCompleting}
                        className="bg-primary hover:bg-primary/90 px-8 active:scale-95 transition-all min-w-[140px]"
                    >
                        {isCompleting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </div>
                        ) : (
                            step === STEPS.length - 1 ? "Complete Profile" : "Continue"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
