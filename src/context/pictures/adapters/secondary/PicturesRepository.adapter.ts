import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PicturesDto, PicturesRepositoryPort } from '../../ports/pictures.port';
import { ValidateId } from '@common/idGenerator.service';
import { StorageService } from '@services/storage.service';

@Injectable()
export class PicturesRepositoryAdapter implements PicturesRepositoryPort {
	constructor(
		private readonly prisma: PrismaService,
		@Inject(StorageService)
		private readonly storageService: StorageService,
	) {}

	async uploadFiles(
		data: Express.Multer.File[],
		virtualTourId: { key: string; checksum: string },
	): Promise<string[]> {
		console.log(data);
		console.log(virtualTourId);
		console.log('is validated ? =', ValidateId(virtualTourId));

		return [];
		// const filesUploaded = this.uploadFilesService.uploadFiles(data);
	}

	fetch(virtualTourId: string): Promise<PicturesDto> {
		throw new Error('Method not implemented.');
	}
}
