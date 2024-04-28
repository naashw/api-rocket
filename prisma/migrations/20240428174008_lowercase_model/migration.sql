/*
  Warnings:

  - You are about to drop the `VirtualTour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VirtualTourPosition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VirtualTourRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VirtualTourRoomPicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VirtualTourPosition" DROP CONSTRAINT "VirtualTourPosition_virtualTourRoomId_fkey";

-- DropForeignKey
ALTER TABLE "VirtualTourRoom" DROP CONSTRAINT "VirtualTourRoom_virtualTourId_fkey";

-- DropForeignKey
ALTER TABLE "VirtualTourRoomPicture" DROP CONSTRAINT "VirtualTourRoomPicture_VirtualTourRoomId_fkey";

-- DropTable
DROP TABLE "VirtualTour";

-- DropTable
DROP TABLE "VirtualTourPosition";

-- DropTable
DROP TABLE "VirtualTourRoom";

-- DropTable
DROP TABLE "VirtualTourRoomPicture";

-- CreateTable
CREATE TABLE "virtualTour" (
    "id" TEXT NOT NULL,
    "virtualTourId" TEXT NOT NULL,

    CONSTRAINT "virtualTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtualTourRoom" (
    "id" TEXT NOT NULL,
    "virtualTourId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "virtualTourRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtualTourRoomPicture" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "virtualTourRoomId" TEXT NOT NULL,

    CONSTRAINT "virtualTourRoomPicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "virtualTourPosition" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "virtualTourRoomId" TEXT NOT NULL,
    "yaw" DOUBLE PRECISION NOT NULL,
    "pitch" DOUBLE PRECISION NOT NULL,
    "zoom" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "virtualTourPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "virtualTour_virtualTourId_key" ON "virtualTour"("virtualTourId");

-- AddForeignKey
ALTER TABLE "virtualTourRoom" ADD CONSTRAINT "virtualTourRoom_virtualTourId_fkey" FOREIGN KEY ("virtualTourId") REFERENCES "virtualTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtualTourRoomPicture" ADD CONSTRAINT "virtualTourRoomPicture_virtualTourRoomId_fkey" FOREIGN KEY ("virtualTourRoomId") REFERENCES "virtualTourRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtualTourPosition" ADD CONSTRAINT "virtualTourPosition_virtualTourRoomId_fkey" FOREIGN KEY ("virtualTourRoomId") REFERENCES "virtualTourRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
