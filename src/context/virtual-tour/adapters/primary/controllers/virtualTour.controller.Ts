import { Body, Controller, Post } from '@nestjs/common';
import { VirtualTourService } from 'src/context/virtual-tour/application/virtualTour.service';

@Controller('virtualTour')
export class VirtualTourController {
	constructor(private readonly virtualTourService: VirtualTourService) {}

	@Post()
	logInformations(@Body() data: string): void {
		return this.virtualTourService.logInformations(data);
	}
}
