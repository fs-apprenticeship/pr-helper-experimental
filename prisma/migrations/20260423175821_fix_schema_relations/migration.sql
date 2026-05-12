/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `githubUsername` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `linesAdded` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linesRemoved` to the `Review` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_ownerId_fkey";

-- DropIndex
DROP INDEX "User_githubUsername_key";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "linesAdded" INTEGER NOT NULL,
ADD COLUMN     "linesRemoved" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReviewIssue" ALTER COLUMN "filename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "githubUsername",
DROP COLUMN "userId",
ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
