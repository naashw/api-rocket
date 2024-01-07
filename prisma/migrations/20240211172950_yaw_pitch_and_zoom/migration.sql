/*
  Warnings:

  - You are about to drop the column `posX` on the `VirtualTourPosition` table. All the data in the column will be lost.
  - You are about to drop the column `posY` on the `VirtualTourPosition` table. All the data in the column will be lost.
  - You are about to drop the column `posZ` on the `VirtualTourPosition` table. All the data in the column will be lost.
  - Added the required column `pitch` to the `VirtualTourPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw` to the `VirtualTourPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoom` to the `VirtualTourPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VirtualTourPosition" DROP COLUMN "posX",
DROP COLUMN "posY",
DROP COLUMN "posZ",
ADD COLUMN     "pitch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "zoom" DOUBLE PRECISION NOT NULL;
