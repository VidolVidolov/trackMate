-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedRefreshToken" DROP NOT NULL,
ALTER COLUMN "hashedRefreshToken" DROP DEFAULT;
