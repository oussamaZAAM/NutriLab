/*
  Warnings:

  - Added the required column `Calories` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Carbs` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fat` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fiber` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Protein` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Salt` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sugar` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "Calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Salt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Sugar" DOUBLE PRECISION NOT NULL;
