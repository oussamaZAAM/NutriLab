-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activity" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "weight" INTEGER;

-- CreateTable
CREATE TABLE "Nutrients" (
    "id" SERIAL NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "salt" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "fiber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Nutrients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nutrients_userId_key" ON "Nutrients"("userId");

-- AddForeignKey
ALTER TABLE "Nutrients" ADD CONSTRAINT "Nutrients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
