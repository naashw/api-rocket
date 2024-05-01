import { VirtualTourRoomPositionDto } from './VirtualTourRoomPositionRepository.port';

export const VirtualTourRepositoryKey = 'VirtualTourRepositoryPort';

export interface VirtualTourDto {
	id: string;
	virtualTourId: string;
	virtualTourRoom: VirtualTourRoom[];
}

interface VirtualTourRoom {
	id: string;
	virtualTourId: string;
	name: string;
	positions: VirtualTourRoomPositionDto[];
}

export interface VirtualTourRepositoryPort {
	save(data: VirtualTourRoomPositionDto[]): Promise<number>;
	fetch(virtualTourId: string): Promise<VirtualTourDto>;
}

export interface GeneratedId {
	key: string;
	checksum: string;
}
