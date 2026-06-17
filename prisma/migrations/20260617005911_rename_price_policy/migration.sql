/*
  Warnings:

  - You are about to drop the column `pricePolicyId` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the `pricepolicy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `priceTier` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriceTier" AS ENUM ('TIER_10K_30K', 'TIER_30K_60K', 'TIER_60K_90K', 'TIER_90K_120K', 'TIER_120K_150K', 'TIER_150K_180K', 'TIER_180K_200K');

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pricePolicyId_fkey";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "pricePolicyId",
ADD COLUMN     "priceTier" "PriceTier" NOT NULL;

-- DropTable
DROP TABLE "pricepolicy";
