"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, Code2, Rocket, Brain, Palette, Briefcase } from "lucide-react";

const STEPS = [
    { id: "basic", title: "The Basics", icon: User },
    { id: "role", title: "Your Role", icon: Briefcase },
    { id: "skills", title: "Tech Stack", icon: Code2 },
    { id: "style", title: "Work Style", icon: Rocket }
];

export function ProfileForm() {
    const [step, setStep] = useState(0);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
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
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input placeholder="John Doe" className="h-12 bg-white/5 border-white/10 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">GitHub Username</label>
                                    <Input placeholder="johndoe" className="h-12 bg-white/5 border-white/10 focus:ring-primary" />
                                </div>
                            </>
                        )}

                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: "frontend", label: "Frontend", icon: Palette },
                                    { id: "backend", label: "Backend", icon: Brain },
                                    { id: "fullstack", label: "Fullstack", icon: Code2 },
                                    { id: "designer", label: "Designer", icon: Palette }
                                ].map((role) => (
                                    <Button
                                        key={role.id}
                                        variant="ghost"
                                        className="flex flex-col items-center gap-4 p-8 h-auto rounded-3xl glass border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
                                        onClick={() => { }}
                                    >
                                        <role.icon className="w-8 h-8 text-primary" />
                                        <span className="font-bold">{role.label}</span>
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
                                        className="h-12 bg-white/5 border-white/10"
                                    />
                                    <Button onClick={addSkill} variant="secondary">Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((s) => (
                                        <Badge key={s} variant="secondary" className="px-3 py-1 bg-primary/10 border-primary/20 text-primary">
                                            {s}
                                            <button
                                                onClick={() => setSkills(skills.filter(sk => sk !== s))}
                                                className="ml-2 hover:text-white transition-colors active:scale-75"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
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
                        onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : null}
                        className="bg-primary hover:bg-primary/90 px-8 active:scale-95 transition-all"
                    >
                        {step === STEPS.length - 1 ? "Complete Profile" : "Continue"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
