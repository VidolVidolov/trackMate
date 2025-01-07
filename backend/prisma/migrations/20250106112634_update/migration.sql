/*
  Warnings:

  - You are about to drop the column `partyEndingLocationId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `partyStartingLocationId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PartyToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_partyEndingLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_partyStartingLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PartyToUser" DROP CONSTRAINT "_PartyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartyToUser" DROP CONSTRAINT "_PartyToUser_B_fkey";

-- DropIndex
DROP INDEX "Location_partyEndingLocationId_key";

-- DropIndex
DROP INDEX "Location_partyStartingLocationId_key";

-- DropIndex
DROP INDEX "Location_userId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "partyEndingLocationId",
DROP COLUMN "partyStartingLocationId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "locationId" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Party";

-- DropTable
DROP TABLE "_PartyToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
