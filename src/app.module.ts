import { Module } from '@nestjs/common';
import { VirtualTourModule } from '@virtualTour/virtualTour.module';
import { ServiceModule } from './services/service.module';
import { AppController } from './app.controller';
import { NotifyModule } from './context/notify/notify.module';

@Module({
	imports: [VirtualTourModule, ServiceModule, NotifyModule],
	providers: [],
	controllers: [AppController],
})
export class AppModule {}
