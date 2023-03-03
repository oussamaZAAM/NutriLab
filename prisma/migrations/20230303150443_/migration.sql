/*
  Warnings:

  - You are about to drop the column `weight` on the `Food` table. All the data in the column will be lost.
  - Added the required column `size` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "weight",
ADD COLUMN     "size" INTEGER NOT NULL;
