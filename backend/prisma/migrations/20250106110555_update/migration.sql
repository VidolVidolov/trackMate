/*
  Warnings:

  - You are about to drop the column `endLocationId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `startLocationId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[partyStartingLocationId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[partyEndingLocationId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_endLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_startLocationId_fkey";

-- DropIndex
DROP INDEX "Location_endLocationId_key";

-- DropIndex
DROP INDEX "Location_startLocationId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "endLocationId",
DROP COLUMN "startLocationId",
ADD COLUMN     "partyEndingLocationId" INTEGER,
ADD COLUMN     "partyStartingLocationId" INTEGER;

-- AlterTable
ALTER TABLE "Party" ALTER COLUMN "locationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_partyStartingLocationId_key" ON "Location"("partyStartingLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_partyEndingLocationId_key" ON "Location"("partyEndingLocationId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_partyStartingLocationId_fkey" FOREIGN KEY ("partyStartingLocationId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_partyEndingLocationId_fkey" FOREIGN KEY ("partyEndingLocationId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;
