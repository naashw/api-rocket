import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function Bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ origin: '*' });
	await app.listen(3001);
}
Bootstrap();
