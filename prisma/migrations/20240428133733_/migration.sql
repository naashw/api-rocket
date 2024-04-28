/*
  Warnings:

  - A unique constraint covering the columns `[virtualTourId]` on the table `VirtualTour` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VirtualTour_virtualTourId_key" ON "VirtualTour"("virtualTourId");
