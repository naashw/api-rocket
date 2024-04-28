/*
  Warnings:

  - You are about to drop the column `VirtualTourId` on the `VirtualTourRoom` table. All the data in the column will be lost.
  - Added the required column `virtualTourId` to the `VirtualTourRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VirtualTourRoom" DROP CONSTRAINT "VirtualTourRoom_VirtualTourId_fkey";

-- AlterTable
ALTER TABLE "VirtualTourRoom" DROP COLUMN "VirtualTourId",
ADD COLUMN     "virtualTourId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VirtualTourRoom" ADD CONSTRAINT "VirtualTourRoom_virtualTourId_fkey" FOREIGN KEY ("virtualTourId") REFERENCES "VirtualTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
