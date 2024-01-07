import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
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

	@Get()
	async get(
		@Body() body: { virtualTourId: string },
	): Promise<VirtualTourAutomaticDto[]> {
		return await this.virtualTour.fetch(body.virtualTourId);
	}

	@Get('id')
	generateId(): string {
		return this.virtualTour.generateId();
	}
}
