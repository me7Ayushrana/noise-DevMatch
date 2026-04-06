"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { RepoNode } from "@/lib/utils/github";
import { useState } from "react";

function FileIcon({ name }: { name: string }) {
    if (name.endsWith(".js") || name.endsWith(".tsx") || name.endsWith(".ts")) return <File className="w-4 h-4 text-blue-400" />;
    if (name.endsWith(".css") || name.endsWith(".scss")) return <File className="w-4 h-4 text-pink-400" />;
    if (name.endsWith(".json")) return <File className="w-4 h-4 text-yellow-400" />;
    if (name.endsWith(".md")) return <File className="w-4 h-4 text-gray-400" />;
    return <File className="w-4 h-4 text-indigo-400" />;
}

export function RepoTree({ nodes, level = 0 }: { nodes: RepoNode[], level?: number }) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggle = (path: string) => {
        setExpanded(prev => ({ ...prev, [path]: !prev[path] }));
    };

    return (
        <div className="space-y-1">
            {nodes.map((node) => (
                <div key={node.path} style={{ paddingLeft: `${level * 16}px` }}>
                    <div
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors ${node.type === 'dir' ? 'font-bold' : ''}`}
                        onClick={() => node.type === 'dir' && toggle(node.path)}
                    >
                        {node.type === "dir" ? (
                            <>
                                {expanded[node.path] ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                <Folder className="w-4 h-4 text-primary fill-primary/20" />
                            </>
                        ) : (
                            <FileIcon name={node.name} />
                        )}
                        <span className="text-sm truncate">{node.name}</span>
                    </div>

                    <AnimatePresence>
                        {node.type === "dir" && expanded[node.path] && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                {/* For demo, recursive fetching is skipped unless we have children, 
                    but in a real app we'd fetch on demand */}
                                {node.children && <RepoTree nodes={node.children} level={level + 1} />}
                                {!node.children && <div className="pl-6 text-[10px] text-muted-foreground italic">Contents hidden for preview</div>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
