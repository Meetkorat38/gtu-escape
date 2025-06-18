/*
  Warnings:

  - You are about to drop the column `semester` on the `Paper` table. All the data in the column will be lost.
  - You are about to drop the `BranchSubject` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subjectId,branchId,courseId,year,season]` on the table `Paper` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,courseId,branchId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BranchSubject" DROP CONSTRAINT "BranchSubject_branchId_fkey";

-- DropForeignKey
ALTER TABLE "BranchSubject" DROP CONSTRAINT "BranchSubject_subjectId_fkey";

-- DropIndex
DROP INDEX "Paper_subjectId_branchId_courseId_year_key";

-- DropIndex
DROP INDEX "Subject_name_courseId_key";

-- AlterTable
ALTER TABLE "Paper" DROP COLUMN "semester";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "semester" TEXT NOT NULL;

-- DropTable
DROP TABLE "BranchSubject";

-- CreateIndex
CREATE UNIQUE INDEX "Paper_subjectId_branchId_courseId_year_season_key" ON "Paper"("subjectId", "branchId", "courseId", "year", "season");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_courseId_branchId_key" ON "Subject"("name", "courseId", "branchId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
