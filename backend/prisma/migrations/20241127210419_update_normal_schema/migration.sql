-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
