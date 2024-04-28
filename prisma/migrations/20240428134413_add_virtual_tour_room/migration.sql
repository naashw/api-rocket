/*
  Warnings:

  - Added the required column `tourId` to the `VirtualTourRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VirtualTourRoom" ADD COLUMN     "tourId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VirtualTourRoom" ADD CONSTRAINT "VirtualTourRoom_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "VirtualTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
