/*
  Warnings:

  - Added the required column `rating` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "rating" INTEGER NOT NULL;
