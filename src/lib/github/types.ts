
export interface PullRequestData {
    title: string
    author: string
    filesChanged: number
    additions: number
    deletions: number
}

export interface PullRequestFileData {
    filename: string
    additions: number
    deletions: number
    status: string
}
