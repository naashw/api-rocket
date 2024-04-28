import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function Bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({ origin: '*' });
	console.log(process.env.STATIC_IMAGES_PATH);
	app.useStaticAssets(process.env.STATIC_IMAGES_PATH, {
		prefix: '/static/',
	});
	await app.listen(process.env.API_PORT || 3001);
}
Bootstrap();
