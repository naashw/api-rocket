import { Controller, Get, Inject } from '@nestjs/common';
import { GeneratedId } from '@virtualTour/ports/VirtualTourRepository.port';
import {
	GeneratorRepositoryKey,
	GeneratorRepositoryPort,
} from 'src/context/Generator/ports/Generator.port';

@Controller('generator')
export class GeneratorController {
	constructor(
		@Inject(GeneratorRepositoryKey)
		private readonly generator: GeneratorRepositoryPort,
	) {}

	@Get('/id')
	generateId(): GeneratedId {
		return this.generator.fetch();
	}
}
