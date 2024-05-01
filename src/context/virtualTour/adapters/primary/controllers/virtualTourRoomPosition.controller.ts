import { Body, Controller, Inject, Post } from '@nestjs/common';
import {} from '@virtualTour/ports/VirtualTourRepository.port';
import {
	VirtualTourRoomPositionDto,
	VirtualTourRoomPositionRepositoryKey,
	VirtualTourRoomPositionRepositoryPort,
} from '@virtualTour/ports/VirtualTourRoomPositionRepository.port';
import { error } from 'console';

@Controller('virtualTourRoom/:id/positions')
export class VirtualTourControllerPosition {
	constructor(
		@Inject(VirtualTourRoomPositionRepositoryKey)
		private readonly virtualTourRoomPosition: VirtualTourRoomPositionRepositoryPort,
	) {}

	@Post()
	save(@Body() data: VirtualTourRoomPositionDto[]): void {
		try {
			this.virtualTourRoomPosition.save(data);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
	}
}
