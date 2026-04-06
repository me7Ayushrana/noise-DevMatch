"use client";

import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Terminal as GithubIcon, Send, Zap } from "lucide-react";
import { MatchResult } from "@/lib/utils/matching";
import Tilt from "react-parallax-tilt";

export function MatchCard({ match }: { match: MatchResult }) {
    const data = [
        { subject: "Technical", A: match.radar.technical },
        { subject: "Complement", A: match.radar.complementary },
        { subject: "Experience", A: match.radar.experience },
        { subject: "Style", A: match.radar.style },
        { subject: "Velocity", A: match.radar.velocity }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full"
        >
            <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                gyroscope={true}
                className="h-full"
            >
                <Card className="glass-card h-full flex flex-col overflow-hidden group relative">
                    <div className="absolute top-0 right-0 p-4 z-10">
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/30 flex items-center gap-1 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <Zap className="w-4 h-4 fill-primary" />
                            {match.score}% Match
                        </div>
                    </div>

                    <CardHeader className="flex flex-row items-center gap-4 pt-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-2xl font-bold border border-white/20 shadow-xl">
                            {match.user.name[0]}
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold">{match.user.name}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <GithubIcon className="w-3 h-3" />
                                @{match.user.github}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-6">
                        <div className="h-48 w-full -mx-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
                                    <PolarGrid stroke="#ffffff10" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                                    <Radar
                                        dataKey="A"
                                        stroke="#6366f1"
                                        fill="#6366f1"
                                        fillOpacity={0.5}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {match.user.skills.map((s) => (
                                    <Badge key={s} variant="outline" className="bg-white/5 border-white/10">{s}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Why it works</h4>
                            <ul className="space-y-1">
                                {match.reasons.map((r, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl gap-2 shadow-lg shadow-primary/20">
                            <Send className="w-4 h-4" />
                            Connect on GitHub
                        </Button>
                    </CardContent>
                </Card>
            </Tilt>
        </motion.div>
    );
}
