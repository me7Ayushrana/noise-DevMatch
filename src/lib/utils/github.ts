export interface RepoNode {
    name: string;
    type: "file" | "dir";
    path: string;
    children?: RepoNode[];
}

export async function fetchRepoTree(owner: string, repo: string, path: string = ""): Promise<RepoNode[]> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        if (!response.ok) throw new Error("Failed to fetch repo content");

        const data = await response.json();

        const nodes: RepoNode[] = data.map((item: any) => ({
            name: item.name,
            type: item.type === "dir" ? "dir" : "file",
            path: item.path
        }));

        return nodes;
    } catch (error) {
        console.error("Error fetching repo tree:", error);
        return [];
    }
}

export function identifyTechStack(nodes: RepoNode[]): string[] {
    const stack: string[] = [];
    const fileNames = nodes.map(n => n.name);

    if (fileNames.includes("package.json")) stack.push("Node.js / JavaScript");
    if (fileNames.includes("tsconfig.json")) stack.push("TypeScript");
    if (fileNames.includes("requirements.txt") || fileNames.includes("manage.py")) stack.push("Python / Django");
    if (fileNames.includes("go.mod")) stack.push("Go");
    if (fileNames.includes("pom.xml")) stack.push("Java / Spring");
    if (fileNames.includes("Cargo.toml")) stack.push("Rust");
    if (fileNames.includes("composer.json")) stack.push("PHP");

    return stack;
}
