import { Module } from '@nestjs/common';
import { VirtualTourController } from './adapters/primary/controllers/virtualTour.controller';
import { VirtualTourRepositoryAdapter } from './adapters/secondary/database/VirtualTourRepository.adapter';
import { VirtualTourRepositoryKey } from './ports/VirtualTourRepository.port';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { VirtualTourRoomPositionRepositoryKey } from './ports/VirtualTourRoomPositionRepository.port';
import { VirtualTourRoomPositionRepositoryAdapter } from './adapters/secondary/database/VirtualTourRoomPosition.adapter';
import { VirtualTourControllerPosition } from './adapters/primary/controllers/virtualTourRoomPosition.controller';

@Module({
	controllers: [VirtualTourController, VirtualTourControllerPosition],
	imports: [PrismaModule],
	providers: [
		PrismaService,
		{
			provide: VirtualTourRepositoryKey,
			useClass: VirtualTourRepositoryAdapter,
		},
		{
			provide: VirtualTourRoomPositionRepositoryKey,
			useClass: VirtualTourRoomPositionRepositoryAdapter,
		},
	],
	exports: [],
})
export class VirtualTourModule {}
