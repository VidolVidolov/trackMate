/*
  Warnings:

  - A unique constraint covering the columns `[startLocationId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[endLocationId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "endLocationId" INTEGER,
ADD COLUMN     "startLocationId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "partyId" INTEGER;

-- CreateTable
CREATE TABLE "Party" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "timeCreated" TIMESTAMP(3) NOT NULL,
    "timeClosed" TIMESTAMP(3),
    "partyDismissed" BOOLEAN NOT NULL DEFAULT false,
    "distanceTravelled" DECIMAL(65,30),
    "timeTaken" DECIMAL(65,30),

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Party_userId_key" ON "Party"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_startLocationId_key" ON "Location"("startLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_endLocationId_key" ON "Location"("endLocationId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_startLocationId_fkey" FOREIGN KEY ("startLocationId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_endLocationId_fkey" FOREIGN KEY ("endLocationId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;
