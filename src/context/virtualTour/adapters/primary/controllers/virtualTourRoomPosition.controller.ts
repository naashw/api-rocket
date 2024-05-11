import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import {
	VirtualTourRoomPositionDto,
	VirtualTourRoomPositionRepositoryKey,
	VirtualTourRoomPositionRepositoryPort,
} from '@virtualTour/ports/VirtualTourRoomPositionRepository.port';
import { error } from 'console';
import { Response } from 'express';

@Controller('virtualTourRoom/:id/positions')
export class VirtualTourControllerPosition {
	constructor(
		@Inject(VirtualTourRoomPositionRepositoryKey)
		private readonly virtualTourRoomPosition: VirtualTourRoomPositionRepositoryPort,
	) {}

	@Post()
	async save(
		@Body() data: VirtualTourRoomPositionDto[],
		@Res() res: Response,
	) {
		try {
			await this.virtualTourRoomPosition.save(data);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
		const numberOfPositions = data.length;
		return res
			.status(200)
			.send(`${numberOfPositions} positions saved successfully.`);
	}
}
