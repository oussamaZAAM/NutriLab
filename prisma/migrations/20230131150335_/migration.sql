/*
  Warnings:

  - You are about to drop the column `calories` on the `Nutrients` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Nutrients` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Nutrients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nutrients" DROP COLUMN "calories",
DROP COLUMN "fat",
DROP COLUMN "protein",
ADD COLUMN     "fats" INTEGER,
ADD COLUMN     "iron" INTEGER,
ADD COLUMN     "kCalories" INTEGER,
ADD COLUMN     "proteins" INTEGER;
