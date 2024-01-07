import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
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

	@Post('/save')
	save(@Body() data: VirtualTourDto[]): void {
		try {
			this.virtualTour.save(data);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
	}
}
