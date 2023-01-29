-- CreateTable
CREATE TABLE "NutriInfo" (
    "id" SERIAL NOT NULL,
    "age" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "sex" TEXT,
    "activity" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "NutriInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutriInfo_userId_key" ON "NutriInfo"("userId");

-- AddForeignKey
ALTER TABLE "NutriInfo" ADD CONSTRAINT "NutriInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
