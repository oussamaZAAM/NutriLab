/*
  Warnings:

  - You are about to drop the column `Calories` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Carbs` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Fat` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Fiber` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Protein` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Salt` on the `FoodList` table. All the data in the column will be lost.
  - You are about to drop the column `Sugar` on the `FoodList` table. All the data in the column will be lost.
  - Added the required column `carbs` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fats` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiber` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kCalories` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteins` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `FoodList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugar` to the `FoodList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodList" DROP COLUMN "Calories",
DROP COLUMN "Carbs",
DROP COLUMN "Fat",
DROP COLUMN "Fiber",
DROP COLUMN "Protein",
DROP COLUMN "Salt",
DROP COLUMN "Sugar",
ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kCalories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteins" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "salt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sugar" DOUBLE PRECISION NOT NULL;
