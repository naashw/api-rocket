import { Injectable } from '@nestjs/common';
import { Prisma, virtualTourPosition } from '@prisma/client';
import {
	VirtualTourAutomaticDto,
	VirtualTourRoomPositionDto,
	VirtualTourRoomPositionRepositoryPort,
} from '@virtualTour/ports/VirtualTourRoomPositionRepository.port';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VirtualTourRoomPositionRepositoryAdapter
	implements VirtualTourRoomPositionRepositoryPort
{
	constructor(private readonly prisma: PrismaService) {}

	async save(datas: VirtualTourRoomPositionDto[]): Promise<number> {
		const virtualTourPositionDataReceived: Prisma.virtualTourPositionCreateManyInput[] =
			datas;

		const virtualTourPosition: Prisma.BatchPayload =
			await this.prisma.virtualTourPosition.createMany({
				data: virtualTourPositionDataReceived,
				skipDuplicates: true,
			});

		return virtualTourPosition.count;
	}

	async fetch(virtualTourId: string): Promise<VirtualTourAutomaticDto[]> {
		const virtualTourPosition: virtualTourPosition[] =
			await this.prisma.virtualTourPosition.findMany({
				where: {
					id: virtualTourId,
				},
				orderBy: {
					time: 'asc',
				},
			});

		if (!virtualTourPosition.length) {
			console.log('no virtualTour found');
			return [];
		}

		const virtualTourAutomaticDto =
			CalculateAverageBySecond(virtualTourPosition);

		console.log(virtualTourAutomaticDto);

		return virtualTourAutomaticDto;
	}
}

function CalculateAverageBySecond(
	objects: VirtualTourRoomPositionDto[],
): VirtualTourAutomaticDto[] {
	const oldestTime = Math.round(objects[0].time.getTime() / 1000);
	const results = {};
	const counts = {};

	objects.forEach((obj) => {
		const time = Math.round(obj.time.getTime() / 1000) - oldestTime; // Récupère la partie de la date jusqu'à la seconde
		if (!results[time]) {
			results[time] = { position: { yaw: 0, pitch: 0, zoom: 0 } };
			counts[time] = 0;
		}
		results[time].position.yaw += obj.yaw;
		results[time].position.pitch += obj.pitch;
		results[time].position.zoom += obj.zoom;
		counts[time]++;
	});

	// Calculer la moyenne pour chaque seconde
	for (const time in results) {
		console.log(results[time].position.yaw, counts[time]);
		results[time].position.yaw /= counts[time];
		results[time].position.pitch /= counts[time];
		results[time].position.zoom /= counts[time];
	}

	const virtualTourAutomatic: VirtualTourAutomaticDto[] = [];

	for (const time in results) {
		virtualTourAutomatic.push({
			time: parseInt(time, 10),
			position: results[time].position,
		});
	}

	return virtualTourAutomatic;
}
