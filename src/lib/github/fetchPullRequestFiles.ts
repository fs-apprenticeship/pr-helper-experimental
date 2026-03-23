import { PullRequestFileData } from "./types";

export async function fetchPullRequestFiles(
    owner: string,
    repo: string,
    prNumber: number
): Promise<PullRequestFileData[]> {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        throw new Error('Missing GITHUB_TOKEN')
    }

    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=100`,
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

    const dataList: PullRequestFileData[] = []
    for (let i = 0; i < data.length; i++) {
        dataList.push({
            filename: data[i].filename,
            additions: data[i].additions,
            deletions: data[i].deletions,
            status: data[i].status
        })
    }

    return dataList
}
