import {
	Headers,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { error } from 'console';
import {
	PicturesDto,
	PicturesRepositoryKey,
	PicturesRepositoryPort,
} from '../../ports/pictures.port';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('pictures')
export class PicturesController {
	constructor(
		@Inject(PicturesRepositoryKey)
		private readonly picturesRepository: PicturesRepositoryPort,
	) {}

	@Post()
	@UseInterceptors(FilesInterceptor('files'))
	async save(
		@UploadedFiles() files: Express.Multer.File[],
		@Headers() headers: any,
	): Promise<string> {
		try {
			console.log(files, headers);
			const virtualTourId = headers['virtual-tour-id'];
			return await this.picturesRepository.uploadFiles(
				files,
				virtualTourId,
			);
		} catch (e) {
			console.log(e);
			throw error(e);
		}
	}

	@Get('/:virtualTourId')
	async get(@Param() params: any): Promise<PicturesDto> {
		return params.virtualTourId;
	}
}
