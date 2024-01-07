-- CreateTable
CREATE TABLE "VirtualTourPosition" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "virtualtourId" TEXT NOT NULL,
    "posX" DOUBLE PRECISION NOT NULL,
    "posY" DOUBLE PRECISION NOT NULL,
    "posZ" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VirtualTourPosition_pkey" PRIMARY KEY ("id")
);
