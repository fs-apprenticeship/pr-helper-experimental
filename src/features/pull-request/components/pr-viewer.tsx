"use client";

import { useState } from "react";
import PullRequestSummary from "./pr-summary";
import { tempData } from "../temp-data";
import { Repo } from "@/features/pull-request/types/repo";
import { PullRequest } from "@/features/pull-request/types/pull-request";

export default function PullRequestViewer() {
  const labelTextStyle = "font-semibold";
  const inputTextStyle = "bg-white text-black px-2 rounded-sm";

  const [currentRepo, setCurrentRepo] = useState<Repo | undefined>();
  const [currentPR, setCurrentPR] = useState<PullRequest | null | undefined>(
    null,
  );

  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [prNumber, setPrNumber] = useState("");

  const handleSubmit = () => {
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            View a Pull Request
          </h1>
          <form className="flex flex-col gap-4" action={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="repo-owner" className={labelTextStyle}>
                Repo Owner
              </label>
              <input
                type="text"
                id="repo-owner"
                name="repo-owner"
                value={repoOwner}
                required
                onChange={(value) => setRepoOwner(value.target.value)}
                className={inputTextStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="repo-name" className={labelTextStyle}>
                Repo Name
              </label>
              <input
                type="text"
                id="repo-name"
                name="repo-name"
                value={repoName}
                required
                onChange={(value) => setRepoName(value.target.value)}
                className={inputTextStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="pr-number" className={labelTextStyle}>
                Pull Request Number
              </label>
              <input
                type="text"
                id="pr-number"
                name="pr-number"
                value={prNumber}
                required
                onChange={(value) => setPrNumber(value.target.value)}
                className={inputTextStyle}
              />
            </div>
            <input
              type="submit"
              value="Analyze PR"
              className="bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white font-semibold rounded-lg mt-2"
            />
          </form>
        </div>
        {currentRepo !== undefined && currentPR !== null && (
          <PullRequestSummary repo={currentRepo} pr={currentPR} />
        )}
      </main>
    </div>
  );
}
