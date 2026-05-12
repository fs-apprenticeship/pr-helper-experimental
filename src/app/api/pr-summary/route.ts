import { NextRequest, NextResponse } from "next/server";
import { fetchPullRequest } from "@/lib/github/fetchPullRequest";
import { fetchPullRequestFiles } from "@/lib/github/fetchPullRequestFiles";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const owner = searchParams.get("owner")
        const repo = searchParams.get("repo")
        const pr = searchParams.get("pr")

        if (!owner || !repo || !pr) {
            return NextResponse.json(
                { error: "Missing required query parameters" },
                { status: 400 }
            )
        }

        const prNumber = parseInt(pr, 10);

        const prData = await fetchPullRequest(owner, repo, prNumber);
        const files = await fetchPullRequestFiles(owner, repo, prNumber);

        return NextResponse.json({
            ...prData,
            files,
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch PR data" },
            { status: 500 }
        );
    }
}
