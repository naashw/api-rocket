export const VirtualTourRepositoryKey = 'VirtualTourRepositoryPort';

export interface VirtualTourDto {
	id: string;
	virtualTourId: string;
	time: Date;
	posX: number;
	posY: number;
	posZ: number;
}

export interface VirtualTourRepositoryPort {
	save(data: VirtualTourDto[]): Promise<number>;
}
