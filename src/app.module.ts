import { Module } from '@nestjs/common';
import { VirtualTourModule } from '@virtualTour/virtualTour.module';
import { ServiceModule } from './common/services/service.module';
import { AppController } from './app.controller';
import { NotifyModule } from './context/notify/notify.module';
import { PicturesModule } from './context/pictures/pictures.module';
import { ConfigModule } from '@nestjs/config';
import securityConfig from './config/security.config';
import { GeneratorModule } from './context/Generator/generator.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
	imports: [
		VirtualTourModule,
		ServiceModule,
		GeneratorModule,
		NotifyModule,
		PicturesModule,
		ConfigModule.forRoot({
			load: [securityConfig],
		}),
		BullModule.forRoot({
			connection: {
				host: process.env.REDIS_HOST,
				port: parseInt(process.env.REDIS_PORT),
			},
		}),
	],
	providers: [],
	controllers: [AppController],
})
export class AppModule {}
