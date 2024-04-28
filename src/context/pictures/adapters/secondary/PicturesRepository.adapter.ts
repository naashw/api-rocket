import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PicturesDto, PicturesRepositoryPort } from '../../ports/pictures.port';
import { ValidateId } from '@common/idGenerator.service';

@Injectable()
export class PicturesRepositoryAdapter implements PicturesRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async uploadFiles(
		data: PicturesDto,
		virtualTourId: { key: string; checksum: string },
	): Promise<string> {
		console.log(data);
		console.log(virtualTourId);
		console.log('is validated ? =', ValidateId(virtualTourId));

		return `is validated ? ${ValidateId(virtualTourId)}`;
	}
	fetch(virtualTourId: string): Promise<PicturesDto> {
		throw new Error('Method not implemented.');
	}
}
