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
			const { originalname, filename, size, destination } = file;
			const virtualTourRoom = await this.prisma.virtualTourRoom.create({
				data: {
					name: filename, // Add the required 'name' property
					virtualTourId: virtualTour.id,
				},
			});

			await this.prisma.virtualTourRoomPicture.create({
				data: {
					filename,
					virtualTourRoomId: virtualTourRoom.id,
				},
			});
		}
		console.log(files);
		console.log(virtualTourIdParams);
		console.log('is validated ? =', ValidateId(virtualTourIdParams));

		return [];
		// const filesUploaded = this.uploadFilesService.uploadFiles(data);
	}

	fetch(virtualTourId: string): Promise<PicturesDto> {
		throw new Error('Method not implemented.');
	}
}
