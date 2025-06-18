/*
  Warnings:

  - You are about to drop the column `code` on the `Subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[branchCode]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,courseId]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectCode]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchCode` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectCode` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subject_code_key";

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branchCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "code",
ADD COLUMN     "subjectCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_branchCode_key" ON "Branch"("branchCode");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_courseId_key" ON "Branch"("name", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectCode_key" ON "Subject"("subjectCode");
