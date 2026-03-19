import { PullRequestData } from "./types";

export async function fetchPullRequest(
    owner: string,
    repo: string,
    prNumber: number
): Promise<PullRequestData> {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        throw new Error('Missing GITHUB_TOKEN')
    }

    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    return {
        title: data.title,
        author: data.user.login,
        filesChanged: data.changed_files,
        additions: data.additions,
        deletions: data.deletions
    }
}
