"use client";

import { useState } from "react";
import PullRequestSummary from "./pr-summary";
import { tempData } from "../temp-data";
import { Repo } from "@/features/pull-request/types/repo";
import { PullRequest } from "@/features/pull-request/types/pull-request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitPullRequest } from "lucide-react";

export default function PullRequestViewer() {
  const [currentRepo, setCurrentRepo] = useState<Repo | undefined>();
  const [currentPR, setCurrentPR] = useState<PullRequest | null | undefined>(
    null,
  );
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [prNumber, setPrNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will replace with API call in the future
    const repo = tempData.find(
      (r) => r.owner === repoOwner && r.name === repoName,
    );
    if (repo) {
      setCurrentRepo(repo);
      const pullRequest = repo["pull-requests"].find(
        (pr) => pr.id.toString() === prNumber,
      );
      setCurrentPR(pullRequest);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center bg-background px-4 pt-36">
      <div className="animate-in fade-in slide-in-from-bottom-3 w-full max-w-[360px] space-y-3 duration-500 ease-out">
        <Card>
          <CardHeader className="pb-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <GitPullRequest className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-[15px] font-semibold tracking-tight text-foreground">
              PR Review Assistant
            </CardTitle>
            <CardDescription className="text-[13px] leading-5 text-muted-foreground">
              Enter a GitHub repository and PR number to load details for
              review.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="repo-owner"
                  className="text-[13px] font-medium text-foreground/70"
                >
                  Repo owner
                </Label>
                <Input
                  id="repo-owner"
                  name="repo-owner"
                  type="text"
                  value={repoOwner}
                  required
                  placeholder="fs-apprenticeship"
                  onChange={(e) => setRepoOwner(e.target.value)}
                  className="h-8 text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="repo-name"
                  className="text-[13px] font-medium text-foreground/70"
                >
                  Repo name
                </Label>
                <Input
                  id="repo-name"
                  name="repo-name"
                  type="text"
                  value={repoName}
                  required
                  placeholder="pr-helper-experimental"
                  onChange={(e) => setRepoName(e.target.value)}
                  className="h-8 text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="pr-number"
                  className="text-[13px] font-medium text-foreground/70"
                >
                  PR number
                </Label>
                <Input
                  id="pr-number"
                  name="pr-number"
                  type="text"
                  value={prNumber}
                  required
                  placeholder="5"
                  onChange={(e) => setPrNumber(e.target.value)}
                  className="h-8 text-[13px]"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="mt-1 w-full h-8 text-[13px] font-medium hover:opacity-90"
              >
                Analyze PR
              </Button>
            </form>
          </CardContent>
        </Card>
        {currentRepo !== undefined && currentPR !== null && (
          <PullRequestSummary repo={currentRepo} pr={currentPR} />
        )}
      </div>
    </div>
  );
}
