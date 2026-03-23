import { Repo } from "@/types/repo";

export const tempData: Repo[] = [
  {
    id: 0,
    name: "pr-helper-experimental",
    owner: "fs-apprenticeship",
    "pull-requests": [
      {
        id: 5,
        title: "created fetch for PR metadata",
        description:
          "PR for issue 1: Create GitHub Client to Fetch PR Metadata",
        author: "flaniyanjr",
        reviewers: ["cernanb", "bcheung98"],
        isOpen: true,
      },
      {
        id: 6,
        title: "Issue 2: retrieve changed files",
        description:
          "PR for issue 2: Retrieve changed files for a pull request",
        author: "flaniyanjr",
        reviewers: ["cernanb", "bcheung98"],
        isOpen: true,
      },
    ],
  },
];
