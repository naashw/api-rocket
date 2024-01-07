export const PicturesRepositoryKey = 'PicturesRepositoryPort';

export type PicturesDto = Express.Multer.File[];

export interface PicturesRepositoryPort {
	uploadFiles(files: PicturesDto, virtualTourId: string): Promise<string>;
	fetch(virtualTourId: string): Promise<PicturesDto>;
}
