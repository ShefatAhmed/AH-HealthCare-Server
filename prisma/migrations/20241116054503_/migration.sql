/*
  Warnings:

  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctor_specialties" DROP CONSTRAINT "doctor_specialties_specialtiesId_fkey";

-- DropTable
DROP TABLE "specialties";

-- CreateTable
CREATE TABLE "aa" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "aa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtiesId_fkey" FOREIGN KEY ("specialtiesId") REFERENCES "aa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
