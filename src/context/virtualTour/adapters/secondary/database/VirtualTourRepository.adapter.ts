import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
	VirtualTourDto,
	VirtualTourRepositoryPort,
} from '@virtualTour/ports/VirtualTourRepository.port';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VirtualTourRepositoryAdapter implements VirtualTourRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async save(data: VirtualTourDto[]): Promise<number> {
		const virtualTourPositionData: Prisma.VirtualTourPositionCreateManyInput[] =
			data;

		const virtualTourPosition: Prisma.BatchPayload =
			await this.prisma.virtualTourPosition.createMany({
				data: virtualTourPositionData,
				skipDuplicates: true,
			});

		console.log('Created virtualTourPosition:', virtualTourPosition);
		return virtualTourPosition.count;
	}
}
