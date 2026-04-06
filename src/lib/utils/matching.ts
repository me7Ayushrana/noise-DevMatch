export interface UserProfile {
    name: string;
    github: string;
    role: "Frontend" | "Backend" | "Fullstack" | "Designer" | "DevOps" | "Product";
    skills: string[];
    style: "Builder" | "Designer" | "Thinker" | "Hustler";
}

export interface MatchResult {
    user: UserProfile;
    score: number;
    reasons: string[];
    dna: {
        type: string;
        strength: string;
    };
    radar: {
        technical: number;
        complementary: number;
        experience: number;
        style: number;
        velocity: number;
    };
}

export function calculateMatch(current: UserProfile, target: UserProfile): MatchResult {
    let score = 0;
    const reasons: string[] = [];

    // 1. Skill Overlap (30%)
    const overlap = current.skills.filter(s => target.skills.includes(s));
    const skillScore = Math.min((overlap.length / Math.max(current.skills.length, 1)) * 30, 30);
    if (overlap.length > 0) reasons.push(`Shared technical DNA: ${overlap.slice(0, 2).join(", ")}`);

    // 2. Role Synergy (40%) - Crucial for Hackathons
    let roleScore = 0;
    const rolePairs: Record<string, string[]> = {
        "Frontend": ["Backend", "Designer", "DevOps"],
        "Backend": ["Frontend", "DevOps", "Designer"],
        "Designer": ["Frontend", "Fullstack"],
        "DevOps": ["Backend", "Fullstack"]
    };

    if (rolePairs[current.role]?.includes(target.role)) {
        roleScore = 40;
        reasons.push(`High Synergy: ${current.role} + ${target.role} duo`);
    } else if (current.role === target.role) {
        roleScore = 15;
        reasons.push(`Double ${current.role} power for high velocity`);
    } else {
        roleScore = 25;
    }

    // 3. Work Style Balance (30%)
    let styleScore = 0;
    if (current.style !== target.style) {
        styleScore = 30;
        reasons.push(`${target.style} perspective balances your ${current.style} approach`);
    } else {
        styleScore = 15;
        reasons.push(`Synchronized ${current.style} alignment`);
    }

    score = skillScore + roleScore + styleScore;

    // DNA Inference (Mocked based on role/skills)
    const dnaType = target.role === "Backend" || target.role === "DevOps" ? "System Architect" : "UX Visionary";
    const dnaStrength = target.skills.length > 3 ? "High-Density" : "Focused";

    return {
        user: target,
        score: Math.round(score),
        reasons,
        dna: {
            type: dnaType,
            strength: dnaStrength
        },
        radar: {
            technical: Math.round((skillScore / 30) * 100),
            complementary: Math.round((roleScore / 40) * 100),
            experience: 85 + Math.floor(Math.random() * 10),
            style: Math.round((styleScore / 30) * 100),
            velocity: 90
        }
    };
}

export const MOCK_USERS: UserProfile[] = [
    {
        name: "Alex River",
        github: "ariver_dev",
        role: "Backend",
        skills: ["Node.js", "Python", "PostgreSQL", "Redis"],
        style: "Builder"
    },
    {
        name: "Sarah Chen",
        github: "schen_design",
        role: "Designer",
        skills: ["Figma", "React", "TailwindCSS", "Framer Motion"],
        style: "Designer"
    },
    {
        name: "Marcus Thorne",
        github: "mthorne_lead",
        role: "Fullstack",
        skills: ["React", "Go", "Kubernetes", "AWS"],
        style: "Thinker"
    },
    {
        name: "Jasmine Lee",
        github: "jlee_hustle",
        role: "Product",
        skills: ["Strategy", "Market Analysis", "User Research", "Agile"],
        style: "Hustler"
    }
];
