import { Controller, Get } from '@nestjs/common';

@Controller('/notify')
export class NotifyController {
	@Get('/')
	async getChannels(): Promise<string> {
		return 'await this.pusherNotifyService.getChannels();';
	}

	@Get('/nb')
	async getNbUsers(): Promise<void> {
		return;
	}
}
