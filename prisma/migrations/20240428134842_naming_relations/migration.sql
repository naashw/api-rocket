/*
  Warnings:

  - You are about to drop the column `tourId` on the `VirtualTourRoom` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `VirtualTourRoomPicture` table. All the data in the column will be lost.
  - Added the required column `VirtualTourId` to the `VirtualTourRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VirtualTourRoomId` to the `VirtualTourRoomPicture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VirtualTourRoom" DROP CONSTRAINT "VirtualTourRoom_tourId_fkey";

-- DropForeignKey
ALTER TABLE "VirtualTourRoomPicture" DROP CONSTRAINT "VirtualTourRoomPicture_roomId_fkey";

-- AlterTable
ALTER TABLE "VirtualTourRoom" DROP COLUMN "tourId",
ADD COLUMN     "VirtualTourId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VirtualTourRoomPicture" DROP COLUMN "roomId",
ADD COLUMN     "VirtualTourRoomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VirtualTourRoom" ADD CONSTRAINT "VirtualTourRoom_VirtualTourId_fkey" FOREIGN KEY ("VirtualTourId") REFERENCES "VirtualTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualTourRoomPicture" ADD CONSTRAINT "VirtualTourRoomPicture_VirtualTourRoomId_fkey" FOREIGN KEY ("VirtualTourRoomId") REFERENCES "VirtualTourRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
