/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `FoodList` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `FoodList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FoodList" DROP CONSTRAINT "FoodList_userId_fkey";

-- AlterTable
ALTER TABLE "FoodList" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FoodList_userId_key" ON "FoodList"("userId");

-- AddForeignKey
ALTER TABLE "FoodList" ADD CONSTRAINT "FoodList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
