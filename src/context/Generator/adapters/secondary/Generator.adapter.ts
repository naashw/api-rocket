import {
	GeneratedId,
	GeneratorRepositoryPort,
} from '../../ports/Generator.port';
import { GenerateId } from '@common/idGenerator.service';

export class GeneratorRepositoryAdapter implements GeneratorRepositoryPort {
	fetch(): GeneratedId {
		return GenerateId();
	}
}
