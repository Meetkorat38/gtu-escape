/*
  Warnings:

  - Added the required column `season` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('WINTER', 'SUMMER');

-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "season" "Season" NOT NULL;
