import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
	VirtualTourAutomaticDto,
	VirtualTourDto,
	VirtualTourRepositoryPort,
} from '@virtualTour/ports/VirtualTourRepository.port';
import { PrismaService } from 'prisma/prisma.service';
import { customAlphabet } from 'nanoid';

@Injectable()
export class VirtualTourRepositoryAdapter implements VirtualTourRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	/* TODO : Ajouter un hash (code chiffrer) pour valider l'id recu et éviter qu'un client crée son propre id dans le header */
	generateId(): string {
		const nanoid = customAlphabet(
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		);
		return nanoid(12);
	}

	async save(data: VirtualTourDto[]): Promise<number> {
		const virtualTourPositionData: Prisma.VirtualTourPositionCreateManyInput[] =
			data;

		const virtualTourPosition: Prisma.BatchPayload =
			await this.prisma.virtualTourPosition.createMany({
				data: virtualTourPositionData,
				skipDuplicates: true,
			});

		return virtualTourPosition.count;
	}

	async fetch(virtualTourId: string): Promise<VirtualTourAutomaticDto[]> {
		const virtualTourPosition: VirtualTourDto[] =
			await this.prisma.virtualTourPosition.findMany({
				where: {
					virtualTourId,
				},
				orderBy: {
					time: 'asc',
				},
			});

		console.log('fetch virtualTour ', virtualTourId);
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
	objects: VirtualTourDto[],
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
