/*
  Warnings:

  - You are about to drop the column `priceTier` on the `teachers` table. All the data in the column will be lost.
  - Changed the type of `name` on the `gradelevels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `subjects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `weekdays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "gradelevels" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "priceTier",
ADD COLUMN     "pricingTierId" TEXT;

-- AlterTable
ALTER TABLE "weekdays" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "GradeLevelName";

-- DropEnum
DROP TYPE "PriceTier";

-- DropEnum
DROP TYPE "SubjectName";

-- DropEnum
DROP TYPE "WeekDayName";

-- CreateTable
CREATE TABLE "teacher_pricing_tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "SharedStatus" NOT NULL,

    CONSTRAINT "teacher_pricing_tiers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_pricingTierId_fkey" FOREIGN KEY ("pricingTierId") REFERENCES "teacher_pricing_tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
