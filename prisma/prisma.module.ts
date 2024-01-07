import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
	providers: [PrismaService],
	exports: [PrismaService], // Exportez le service Prisma pour qu'il puisse être utilisé dans d'autres modules
})
export class PrismaModule {}
