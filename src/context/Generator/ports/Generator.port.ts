export const GeneratorRepositoryKey = 'GeneratorRepositoryPort';

export interface GeneratorRepositoryPort {
	fetch(): GeneratedId;
}

export interface GeneratedId {
	key: string;
	checksum: string;
}
