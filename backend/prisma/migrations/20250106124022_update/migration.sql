/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Party` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ownedPartyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Party_userId_key" ON "Party"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_locationId_key" ON "User"("locationId");
