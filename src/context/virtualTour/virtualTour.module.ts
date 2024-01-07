import { Module } from '@nestjs/common';
import { VirtualTourController } from './adapters/primary/controllers/virtualTour.controller';
import { VirtualTourRepositoryAdapter } from './adapters/secondary/database/VirtualTourRepository.adapter';
import { VirtualTourRepositoryKey } from './ports/VirtualTourRepository.port';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
	controllers: [VirtualTourController],
	imports: [PrismaModule],
	providers: [
		PrismaService,
		{
			provide: VirtualTourRepositoryKey,
			useClass: VirtualTourRepositoryAdapter,
		},
	],
	exports: [],
})
export class VirtualTourModule {}
