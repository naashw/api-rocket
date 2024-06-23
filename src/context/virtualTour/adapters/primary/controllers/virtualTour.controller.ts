import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
	VirtualTourRepositoryKey,
	VirtualTourRepositoryPort,
	VirtualTourDto,
} from '@virtualTour/ports/VirtualTourRepository.port';
import { VirtualTourRoomPositionDto } from '@virtualTour/ports/VirtualTourRoomPositionRepository.port';
import { error } from 'console';

@Controller('virtualTour')
export class VirtualTourController {
	constructor(
		@Inject(VirtualTourRepositoryKey)
		private readonly virtualTour: VirtualTourRepositoryPort,
	) {}

	@Post()
	save(@Body() data: VirtualTourRoomPositionDto[]): void {
		try {
			this.virtualTour.save(data);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
	}

	@Get('/:id')
	async get(@Param('id') virtualTourId: string): Promise<VirtualTourDto> {
		return await this.virtualTour.fetch(virtualTourId);
	}
}
