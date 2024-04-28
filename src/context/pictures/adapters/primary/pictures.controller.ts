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
import { StorageService } from '@services/storage.service';

const storage = new StorageService();
@Controller('pictures')
export class PicturesController {
	constructor(
		@Inject(PicturesRepositoryKey)
		private readonly picturesRepository: PicturesRepositoryPort,
	) {}

	@Post()
	@UseInterceptors(
		FilesInterceptor('files', 50, {
			storage: storage.getStorage(),
		}),
	)
	async uploadFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Headers() headers: ParameterDecorator,
	): Promise<{ originalName: string; filename: string }[]> {
		try {
			const response = [];
			files.forEach((file) => {
				const fileResponse = {
					originalName: file.originalname,
					filename: file.filename,
				};
				response.push(fileResponse);
			});
			const virtualTourId = {
				key: headers['virtual-tour-id'],
				checksum: headers['virtual-tour-id-checksum'],
			};
			console.log(virtualTourId);
			console.log(response);
			return response;
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
