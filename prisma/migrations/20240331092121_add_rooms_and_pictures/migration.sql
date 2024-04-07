/*
  Warnings:

  - You are about to drop the column `virtualTourId` on the `VirtualTourPosition` table. All the data in the column will be lost.
  - Added the required column `virtualTourRoomId` to the `VirtualTourPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VirtualTourPosition" DROP COLUMN "virtualTourId",
ADD COLUMN     "virtualTourRoomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VirtualTour" (
    "id" TEXT NOT NULL,
    "virtualTourId" TEXT NOT NULL,

    CONSTRAINT "VirtualTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualTourRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VirtualTourRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualTourRoomPicture" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "VirtualTourRoomPicture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VirtualTourRoomPicture" ADD CONSTRAINT "VirtualTourRoomPicture_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "VirtualTourRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualTourPosition" ADD CONSTRAINT "VirtualTourPosition_virtualTourRoomId_fkey" FOREIGN KEY ("virtualTourRoomId") REFERENCES "VirtualTourRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
