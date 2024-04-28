-- DropForeignKey
ALTER TABLE "VirtualTourRoom" DROP CONSTRAINT "VirtualTourRoom_VirtualTourId_fkey";

-- AddForeignKey
ALTER TABLE "VirtualTourRoom" ADD CONSTRAINT "VirtualTourRoom_VirtualTourId_fkey" FOREIGN KEY ("VirtualTourId") REFERENCES "VirtualTour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
