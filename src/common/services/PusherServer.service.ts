import { Injectable, OnModuleInit } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherServerService implements OnModuleInit {
	private pusher: Pusher;

	public async onModuleInit(): Promise<void> {
		if (this.pusher) return;

		this.pusher = new Pusher({
			appId: 'app-id',
			key: 'app-key',
			secret: 'app-secret',
			host: '127.0.0.1',
			port: '6001',
			cluster: 'visiteici',
		});

		console.log('PusherService initialized');
	}

	public async createInstance(port: string): Promise<Pusher> {
		return new Pusher({
			appId: 'app-id',
			key: 'app-key',
			secret: 'app-secret',
			host: '127.0.0.1',
			port: port,
			cluster: 'visiteici',
		});
	}

	public async getInstance(): Promise<Pusher> {
		if (!this.pusher) throw new Error('PusherService not initialized');
		return this.pusher;
	}

	public async test(): Promise<void> {
		if (!this.pusher) throw new Error('PusherService not initialized');
		try {
			await this.pusher.trigger('test-channel', 'test-event', {
				message: 'hello world',
			});
		} catch (e) {
			console.log(e);
		}
	}
}
