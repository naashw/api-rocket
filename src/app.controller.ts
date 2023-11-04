import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
	@Get()
	async tryNotify(): Promise<string> {
		return 'heelloo';
	}
}
