import { GeneratedId } from '@virtualTour/ports/VirtualTourRepository.port';
import { customAlphabet } from 'nanoid';
import { createHash } from 'crypto';

export function GenerateNanoid(length = 12): string {
	const nanoid = customAlphabet(
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	);
	return nanoid(length);
}

export function GenerateId(length = 12): GeneratedId {
	const key = GenerateNanoid(length);
	const keySalted = key + process.env.VIRTUAL_ID_SALT;
	const checksum = createHash('md5').update(keySalted).digest('hex');
	return {
		key,
		checksum: checksum,
	};
}

export function ValidateId(generatedId: GeneratedId): boolean {
	const keySalted = generatedId.key + process.env.VIRTUAL_ID_SALT;
	const checksum = createHash('md5').update(keySalted).digest('hex');
	return checksum === generatedId.checksum;
}
