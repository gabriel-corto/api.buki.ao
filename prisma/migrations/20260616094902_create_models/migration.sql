-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MANAGER', 'COMMON');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('TEACHER', 'CUSTOMER', 'MANAGER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "SharedStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SubjectName" AS ENUM ('MATHEMATICS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY', 'GEOGRAPHY', 'PORTUGUESE', 'ENGLISH', 'FRENCH', 'PHILOSOPHY', 'SOCIOLOGY', 'ECONOMICS', 'LAW', 'PSYCHOLOGY', 'COMPUTER_SCIENCE', 'DESCRIPTIVE_GEOMETRY', 'VISUAL_ARTS', 'MUSIC', 'ANTHROPOLOGY', 'LITERATURE', 'PROGRAMMING');

-- CreateEnum
CREATE TYPE "WeekDayName" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "GradeLevelName" AS ENUM ('PRIMARY', 'CYCLE_1', 'CYCLE_2', 'UNIVERSITY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'COMMON',
    "accountType" "AccountType" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "pricePolicyId" TEXT,
    "status" "TeacherStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" "SubjectName" NOT NULL,
    "status" "SharedStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekdays" (
    "id" TEXT NOT NULL,
    "name" "WeekDayName" NOT NULL,
    "status" "SharedStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "weekdays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradelevels" (
    "id" TEXT NOT NULL,
    "name" "GradeLevelName" NOT NULL,
    "status" "SharedStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "gradelevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "SharedStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricepolicy" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" "SharedStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "pricepolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeacherToWeekDay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeacherToWeekDay_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TeacherToZone" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeacherToZone_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SubjectToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SubjectToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GradeLevelToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GradeLevelToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "customers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userId_key" ON "teachers"("userId");

-- CreateIndex
CREATE INDEX "_TeacherToWeekDay_B_index" ON "_TeacherToWeekDay"("B");

-- CreateIndex
CREATE INDEX "_TeacherToZone_B_index" ON "_TeacherToZone"("B");

-- CreateIndex
CREATE INDEX "_SubjectToTeacher_B_index" ON "_SubjectToTeacher"("B");

-- CreateIndex
CREATE INDEX "_GradeLevelToTeacher_B_index" ON "_GradeLevelToTeacher"("B");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_pricePolicyId_fkey" FOREIGN KEY ("pricePolicyId") REFERENCES "pricepolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToWeekDay" ADD CONSTRAINT "_TeacherToWeekDay_A_fkey" FOREIGN KEY ("A") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToWeekDay" ADD CONSTRAINT "_TeacherToWeekDay_B_fkey" FOREIGN KEY ("B") REFERENCES "weekdays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToZone" ADD CONSTRAINT "_TeacherToZone_A_fkey" FOREIGN KEY ("A") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToZone" ADD CONSTRAINT "_TeacherToZone_B_fkey" FOREIGN KEY ("B") REFERENCES "zones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "gradelevels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
