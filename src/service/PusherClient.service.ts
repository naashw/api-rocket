import { OnModuleInit } from '@nestjs/common';
import Pusher, { Channel } from 'pusher-js';

export class PusherClientService implements OnModuleInit {
	private pusherListener: Pusher;
	private connection: Channel;

	public async onModuleInit(): Promise<void> {
		if (this.pusherListener) return;
		this.pusherListener = new Pusher('app-key', {
			cluster: 'visiteici',
		});
		console.log('PusherListeningService initialized');

		this.connection = this.pusherListener.subscribe('test-channel');

		this.pusherListener.bind_global((event, data) => {
			console.log('PusherListeningService event: ', event, data);
		});
		console.log('PusherListeningService subscribed to test-channel');
	}

	public async getInstance(): Promise<Pusher> {
		if (!this.pusherListener)
			throw new Error('PusherListeningService not initialized');
		return this.pusherListener;
	}

	public async getChannels(): Promise<string[]> {
		if (!this.pusherListener)
			throw new Error('PusherListeningService not initialized');

		return this.pusherListener.allChannels().map((channel) => {
			return channel.name;
		});
	}

	public async logTest(message?: string): Promise<void> {
		console.log('PusherListeningService test: ', message);
	}
}
