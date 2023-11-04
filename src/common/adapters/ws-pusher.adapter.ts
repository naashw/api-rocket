import { WebSocketAdapter } from '@nestjs/common';
import Pusher from 'pusher';
import pusherJs from 'pusher-js';

export class PusherWebSocketAdapter implements WebSocketAdapter {
	private wsServer: Pusher;
	private wsClient: pusherJs;

	public create(): void {
		console.log('init pusher server');

		if (!this.wsServer) {
			this.wsServer = new Pusher({
				appId: 'app-id',
				key: 'app-key',
				secret: 'app-secret',
				host: '127.0.0.1',
				port: '6001',
				cluster: 'visiteici',
			});

			console.log('Pusher server created');
		}

		if (!this.wsClient) {
			this.wsClient = new pusherJs('app-key', {
				cluster: 'visiteici',
			});

			console.log('Pusher client created');
		}
	}

	public bindClientConnect(callback) {
		this.wsClient.bind('pusher:connection_established', (data) => {
			console.log('PusherWebSocketAdapter bindClientConnect: ', data);
			callback(data);
		});
	}

	public bindClientDisconnect(callback) {
		this.wsClient.bind('pusher:connection_disconnected', (data) => {
			console.log('PusherWebSocketAdapter bindClientDisconnect: ', data);
			callback(data);
		});
	}

	public bindMessageHandlers(callback) {
		this.wsClient.bind_global((event, data) => {
			console.log(
				'PusherWebSocketAdapter bindMessageHandlers: ',
				event,
				data,
			);
			callback(event, data);
		});
	}

	public close() {
		this.wsClient.disconnect();
	}
}
