/*
  Warnings:

  - You are about to drop the column `url` on the `virtualTourRoomPicture` table. All the data in the column will be lost.
  - Added the required column `filename` to the `virtualTourRoomPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "virtualTourRoomPicture" DROP COLUMN "url",
ADD COLUMN     "filename" TEXT NOT NULL;
