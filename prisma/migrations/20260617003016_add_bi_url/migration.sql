-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "biUrl" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
