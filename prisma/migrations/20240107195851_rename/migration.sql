/*
  Warnings:

  - You are about to drop the column `virtualtourId` on the `VirtualTourPosition` table. All the data in the column will be lost.
  - Added the required column `virtualTourId` to the `VirtualTourPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VirtualTourPosition" DROP COLUMN "virtualtourId",
ADD COLUMN     "virtualTourId" TEXT NOT NULL;
