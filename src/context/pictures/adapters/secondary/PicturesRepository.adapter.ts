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

	async savePictures(
		files: Express.Multer.File[],
		virtualTourIdParams: { key: string; checksum: string },
	): Promise<string[]> {
		const isValid = ValidateId(virtualTourIdParams);
		if (!isValid) {
			throw new Error('Invalid virtual tour id');
		}
		const { key } = virtualTourIdParams;
		const virtualTour = await this.prisma.virtualTour.upsert({
			where: {
				virtualTourId: key,
			},
			update: {},
			create: {
				virtualTourId: key,
			},
		});

		for (const file of files) {
			const { filename } = file;
			const filePath =
				this.storageService.getFilePath(filename) || 'null';
			const virtualTourRoom = await this.prisma.virtualTourRoom.create({
				data: {
					name: filename, // Add the required 'name' property
					virtualTourId: virtualTour.id,
				},
			});

			await this.prisma.virtualTourRoomPicture.create({
				data: {
					filename,
					filePath,
					virtualTourRoomId: virtualTourRoom.id,
				},
			});
		}
		return [];
		// const filesUploaded = this.uploadFilesService.uploadFiles(data);
	}

	fetch(virtualTourId: string): Promise<PicturesDto> {
		throw new Error('Method not implemented.');
	}
}
