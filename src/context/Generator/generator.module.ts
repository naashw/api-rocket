import { Module } from '@nestjs/common';
import { ServiceModule } from '@common/services/service.module';
import { GeneratorRepositoryAdapter } from './adapters/secondary/Generator.adapter';
import { GeneratorController } from './adapters/primary/controllers/generator.controller';

@Module({
	imports: [ServiceModule],
	providers: [
		{
			provide: 'GeneratorRepositoryPort',
			useClass: GeneratorRepositoryAdapter,
		},
	],
	controllers: [GeneratorController],
})
export class GeneratorModule {}
