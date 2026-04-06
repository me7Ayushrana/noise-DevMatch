export interface UserProfile {
    name: string;
    github: string;
    role: string;
    skills: string[];
    style: string;
}

export interface MatchResult {
    user: UserProfile;
    score: number;
    reasons: string[];
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

    // 1. Skill Overlap (40%)
    const overlap = current.skills.filter(s => target.skills.includes(s));
    const skillScore = Math.min((overlap.length / Math.max(current.skills.length, 1)) * 40, 40);
    if (overlap.length > 0) reasons.push(`Both proficient in ${overlap.slice(0, 2).join(", ")}`);

    // 2. Complementary Roles (40%)
    let roleScore = 0;
    if (current.role !== target.role) {
        roleScore = 40;
        reasons.push(`Complementary roles: ${current.role} + ${target.role}`);
    } else {
        roleScore = 15; // Shared role is still good but less "magical" for a team build
    }

    // 3. Work Style (20%)
    let styleScore = 0;
    if (current.style !== target.style) {
        styleScore = 20;
        reasons.push("Diverse work styles for balanced team dynamic");
    } else {
        styleScore = 10;
    }

    score = skillScore + roleScore + styleScore;

    return {
        user: target,
        score: Math.round(score),
        reasons,
        radar: {
            technical: Math.round((skillScore / 40) * 100),
            complementary: Math.round((roleScore / 40) * 100),
            experience: 85, // Mocked for now
            style: Math.round((styleScore / 20) * 100),
            velocity: 90 // Mocked for now
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
    }
];
