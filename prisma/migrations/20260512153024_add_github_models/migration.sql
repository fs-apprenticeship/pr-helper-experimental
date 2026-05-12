/*
  Notes:

  - This migration assumes the existing "User" table can be evolved in place from
    the initial schema that only contained "id" UUID PRIMARY KEY.
  - Renaming "id" to "userId" preserves existing identifiers instead of dropping them.
  - The new required user profile columns still require the table to be empty or
    backfilled before applying this migration if rows already exist.
*/

-- CreateEnum
CREATE TYPE "PullRequestState" AS ENUM ('OPEN', 'CLOSED', 'MERGED');

-- CreateEnum
CREATE TYPE "FileDiffStatus" AS ENUM ('ADDED', 'MODIFIED', 'DELETED', 'RENAMED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReviewIssueSeverity" AS ENUM ('INFO', 'WARNING', 'ERROR');

-- AlterTable
ALTER TABLE "User" RENAME COLUMN "id" TO "userId";

ALTER TABLE "User"
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "githubId" TEXT NOT NULL,
ADD COLUMN     "githubUsername" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Repository" (
    "repo_id" UUID NOT NULL,
    "github_id" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("repo_id")
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" UUID NOT NULL,
    "githubPrId" TEXT NOT NULL,
    "repository_id" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "state" "PullRequestState" NOT NULL,
    "author" TEXT NOT NULL,
    "baseBranch" TEXT NOT NULL,
    "headBranch" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mergedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileDiff" (
    "id" UUID NOT NULL,
    "pull_request_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "status" "FileDiffStatus" NOT NULL,
    "additions" TEXT[],
    "deletions" TEXT[],
    "patch" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileDiff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "pull_request_id" UUID NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "filesChanged" TEXT[],
    "linesAdded" INTEGER NOT NULL,
    "linesRemoved" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewIssue" (
    "id" UUID NOT NULL,
    "review_id" UUID NOT NULL,
    "severity" "ReviewIssueSeverity" NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT,
    "suggestion" TEXT,
    "filename" TEXT,

    CONSTRAINT "ReviewIssue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubUsername_key" ON "User"("githubUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_github_id_key" ON "Repository"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_fullName_key" ON "Repository"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_url_key" ON "Repository"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_githubPrId_key" ON "PullRequest"("githubPrId");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_url_key" ON "PullRequest"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_repository_id_number_key" ON "PullRequest"("repository_id", "number");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "Repository"("repo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileDiff" ADD CONSTRAINT "FileDiff_pull_request_id_fkey" FOREIGN KEY ("pull_request_id") REFERENCES "PullRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_pull_request_id_fkey" FOREIGN KEY ("pull_request_id") REFERENCES "PullRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewIssue" ADD CONSTRAINT "ReviewIssue_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
