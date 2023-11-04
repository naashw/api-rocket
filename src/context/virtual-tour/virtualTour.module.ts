import { Module } from '@nestjs/common';
import { VirtualTourController } from './adapters/primary/controllers/virtualTour.controller';
import { VirtualTourService } from './application/virtualTour.service';

@Module({
	controllers: [VirtualTourController],
	providers: [VirtualTourService],
	exports: [],
})
export class VirtualTourModule {}
