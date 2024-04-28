import { Injectable } from '@nestjs/common';
import multer, { StorageEngine } from 'multer';
import { GenerateNanoid } from '@common/idGenerator.service';

@Injectable()
export class StorageService {
	private readonly uploadPath = '/home/node/app/static/images/';
	public getStorage(): StorageEngine {
		return multer.diskStorage({
			destination: (req, file, cb) => {
				const fileDestination = this.uploadPath;
				cb(null, fileDestination);
			},
			filename: (req, file, cb) => {
				const cuid = GenerateNanoid(5);
				const filename = file.originalname || file.filename;
				cb(null, String(`${Date.now()}-${cuid}-${filename}`));
			},
		});
	}
}
