/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `Game` table. All the data in the column will be lost.
  - The `platforms` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "backgroundImage",
DROP COLUMN "platforms",
ADD COLUMN     "platforms" INTEGER[];
