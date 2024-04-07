import { GenerateId } from '@common/idGenerator.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
	GeneratedId,
	VirtualTourAutomaticDto,
	VirtualTourDto,
	VirtualTourRepositoryKey,
	VirtualTourRepositoryPort,
} from '@virtualTour/ports/VirtualTourRepository.port';
import { error } from 'console';

@Controller('virtualTour')
export class VirtualTourController {
	constructor(
		@Inject(VirtualTourRepositoryKey)
		private readonly virtualTour: VirtualTourRepositoryPort,
	) {}

	@Post()
	save(@Body() data: VirtualTourDto[]): void {
		try {
			this.virtualTour.save(data);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
	}

	@Get('fetch/:id')
	async get(
		@Param('id') virtualTourId: string,
	): Promise<VirtualTourAutomaticDto[]> {
		return await this.virtualTour.fetch(virtualTourId);
	}

	@Get('id')
	generateId(): GeneratedId {
		return GenerateId();
	}
}
