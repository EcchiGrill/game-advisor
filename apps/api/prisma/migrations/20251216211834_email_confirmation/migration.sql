-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailConfirmToken" TEXT,
ADD COLUMN     "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false;
