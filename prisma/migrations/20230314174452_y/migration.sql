/*
  Warnings:

  - You are about to drop the column `Calories` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Carbs` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Fat` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Fiber` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Protein` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Salt` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Sugar` on the `Food` table. All the data in the column will be lost.
  - Added the required column `Calories` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Carbs` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fat` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fiber` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Protein` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Salt` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sugar` to the `FoodList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "Calories",
DROP COLUMN "Carbs",
DROP COLUMN "Fat",
DROP COLUMN "Fiber",
DROP COLUMN "Protein",
DROP COLUMN "Salt",
DROP COLUMN "Sugar";

-- AlterTable
ALTER TABLE "FoodList" ADD COLUMN     "Calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Salt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Sugar" DOUBLE PRECISION NOT NULL;
