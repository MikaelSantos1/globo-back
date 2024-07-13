/*
  Warnings:

  - You are about to drop the column `description` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "description" TEXT NOT NULL;
