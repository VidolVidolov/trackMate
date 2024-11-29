/*
  Warnings:

  - You are about to drop the column `type_of_vehicle` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "type_of_vehicle",
ADD COLUMN     "typeOfVehicle" TEXT;
