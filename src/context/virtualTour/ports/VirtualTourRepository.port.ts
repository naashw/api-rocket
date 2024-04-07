export const VirtualTourRepositoryKey = 'VirtualTourRepositoryPort';

export interface VirtualTourDto {
	id: string;
	virtualTourRoomId: string;
	time: Date;
	yaw: number;
	pitch: number;
	zoom: number;
}

export interface VirtualTourAutomaticDto {
	time: number;
	position: {
		yaw: number;
		pitch: number;
		zoom: number;
	};
}

export interface VirtualTourRepositoryPort {
	save(data: VirtualTourDto[]): Promise<number>;
	fetch(virtualTourId: string): Promise<VirtualTourAutomaticDto[]>;
}

export interface GeneratedId {
	key: string;
	checksum: string;
}
