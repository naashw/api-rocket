export const VirtualTourRoomPositionRepositoryKey =
	'VirtualTourRoomPositionRepositoryPort';

export interface VirtualTourRoomPositionDto {
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

export interface VirtualTourRoomPositionRepositoryPort {
	save(data: VirtualTourRoomPositionDto[]): Promise<number>;
	fetch(virtualTourRoomId: string): Promise<VirtualTourAutomaticDto[]>;
}
