/*
  Warnings:

  - The `embedding` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "coverUrl" DROP NOT NULL,
DROP COLUMN "embedding",
ADD COLUMN     "embedding" DOUBLE PRECISION[];
