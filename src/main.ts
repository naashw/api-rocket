import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PusherWebSocketAdapter } from './common/adapters/ws-pusher.adapter';

async function Bootstrap() {
	const app = await NestFactory.create(AppModule);
	const ws = app.useWebSocketAdapter(new PusherWebSocketAdapter());
	ws.init();
	await app.listen(3001);
}
Bootstrap();
