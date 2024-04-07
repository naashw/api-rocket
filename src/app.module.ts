import { Module } from '@nestjs/common';
import { VirtualTourModule } from '@virtualTour/virtualTour.module';
import { ServiceModule } from './services/service.module';
import { AppController } from './app.controller';
import { NotifyModule } from './context/notify/notify.module';
import { PicturesModule } from './context/pictures/pictures.module';
import { ConfigModule } from '@nestjs/config';
import securityConfig from './config/security.config';

@Module({
	imports: [
		VirtualTourModule,
		ServiceModule,
		NotifyModule,
		PicturesModule,
		ConfigModule.forRoot({
			load: [securityConfig],
		}),
	],
	providers: [],
	controllers: [AppController],
})
export class AppModule {}
