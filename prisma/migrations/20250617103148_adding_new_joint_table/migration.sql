/*
  Warnings:

  - You are about to drop the `_BranchSubjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BranchSubjects" DROP CONSTRAINT "_BranchSubjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_BranchSubjects" DROP CONSTRAINT "_BranchSubjects_B_fkey";

-- DropTable
DROP TABLE "_BranchSubjects";

-- CreateTable
CREATE TABLE "BranchSubject" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "BranchSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BranchSubject_branchId_subjectId_key" ON "BranchSubject"("branchId", "subjectId");

-- AddForeignKey
ALTER TABLE "BranchSubject" ADD CONSTRAINT "BranchSubject_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchSubject" ADD CONSTRAINT "BranchSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
