/*
  Warnings:

  - You are about to drop the column `userId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_userId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "userId",
ADD COLUMN     "foodListId" INTEGER;

-- CreateTable
CREATE TABLE "FoodList" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,

    CONSTRAINT "FoodList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodListId_fkey" FOREIGN KEY ("foodListId") REFERENCES "FoodList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodList" ADD CONSTRAINT "FoodList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
