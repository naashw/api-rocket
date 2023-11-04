import { Module } from '@nestjs/common';
import { VirtualTourModule } from './context/virtual-tour/virtualTour.module';
import { ServiceModule } from './service/service.module';
import { AppController } from './app.controller';
import { NotifyModule } from './context/notify/notify.module';

@Module({
  imports: [VirtualTourModule, ServiceModule, NotifyModule],
  controllers: [AppController],
})
export class AppModule {}
