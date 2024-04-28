import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { PicturesController } from './adapters/primary/pictures.controller';
import { PicturesRepositoryKey } from './ports/pictures.port';
import { PicturesRepositoryAdapter } from './adapters/secondary/PicturesRepository.adapter';
import { StorageService } from '@services/storage.service';

@Module({
	controllers: [PicturesController],
	imports: [PrismaModule],
	providers: [
		PrismaService,
		StorageService,
		{
			provide: PicturesRepositoryKey,
			useClass: PicturesRepositoryAdapter,
		},
	],
	exports: [],
})
export class PicturesModule {}
