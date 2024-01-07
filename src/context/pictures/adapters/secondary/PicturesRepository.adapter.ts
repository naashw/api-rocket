import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PicturesDto, PicturesRepositoryPort } from '../../ports/pictures.port';

@Injectable()
export class PicturesRepositoryAdapter implements PicturesRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async uploadFiles(
		data: PicturesDto,
		virtualTourId: string,
	): Promise<string> {
		console.log(data);
		console.log(virtualTourId);
		return 'toto';
	}
	fetch(virtualTourId: string): Promise<PicturesDto> {
		throw new Error('Method not implemented.');
	}
}
