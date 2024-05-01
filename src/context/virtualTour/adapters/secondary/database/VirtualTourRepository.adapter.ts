import { Injectable } from '@nestjs/common';
import {
	VirtualTourRepositoryPort,
	VirtualTourDto,
} from '@virtualTour/ports/VirtualTourRepository.port';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VirtualTourRepositoryAdapter implements VirtualTourRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async save(): Promise<number> {
		return 0;
	}

	async fetch(virtualTourId: string): Promise<VirtualTourDto> {
		const virtualTour: VirtualTourDto =
			await this.prisma.virtualTour.findUnique({
				where: {
					virtualTourId,
				},
				include: {
					virtualTourRoom: {
						include: {
							positions: {},
							pictures: {},
						},
					},
				},
			});
		return virtualTour;
	}
}
