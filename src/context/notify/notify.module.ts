import { Module } from '@nestjs/common';
import { NotifyController } from './adapters/primary/notify.controller';
import { ServiceModule } from 'src/services/service.module';

@Module({
	imports: [ServiceModule],
	controllers: [NotifyController],
	exports: [],
})
export class NotifyModule {}
