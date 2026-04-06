"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileForm } from "@/components/profile/profile-form";
import { MatchCard } from "@/components/matches/match-card";
import { calculateMatch, MOCK_USERS, UserProfile } from "@/lib/utils/matching";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function MatchesPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [showResults, setShowResults] = useState(false);

    // Simulation: When profile is "complete"
    const handleComplete = () => {
        // For demo, we just use a mock profile if they click complete
        setProfile({
            name: "Ayush Rana",
            github: "ayushrana",
            role: "Frontend",
            skills: ["React", "Three.js", "TailwindCSS"],
            style: "Builder"
        });
        setShowResults(true);
    };

    const matches = profile
        ? MOCK_USERS.map(u => calculateMatch(profile, u)).sort((a, b) => b.score - a.score)
        : [];

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                                Setup your <span className="text-primary text-glow">Builder Profile</span>
                            </h1>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                We'll use your GitHub and skills to find the perfect technical match.
                            </p>
                        </div>
                        {/* For demo purposes, we added a wrapper to handle the "Complete" state */}
                        <div className="relative">
                            <ProfileForm />
                            <div className="mt-8 flex justify-center">
                                <Button
                                    onClick={handleComplete}
                                    variant="outline"
                                    className="glass border-primary/20 text-primary hover:bg-primary/10 gap-2 active:scale-95 hover:scale-105 transition-all"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Fast Track Demo: View Matches
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowResults(false)}
                                    className="mb-6 -ml-4 text-muted-foreground hover:text-white gap-2 active:scale-95 transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Edit Profile
                                </Button>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                                    Your <span className="text-primary text-glow">Perfect Matches</span>
                                </h1>
                                <p className="text-muted-foreground mt-4">
                                    Based on your tech stack and hackathon work style.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 p-4 glass rounded-2xl border-primary/20">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">AI Team Builder</div>
                                    <div className="text-xs text-muted-foreground">Optimal balance found</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {matches.map((match, i) => (
                                <MatchCard key={i} match={match} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
