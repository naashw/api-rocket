import { GeneratedId } from '@virtualTour/ports/VirtualTourRepository.port';
import { customAlphabet } from 'nanoid';
import { createHash } from 'crypto';

export function GenerateId(): GeneratedId {
	const nanoid = customAlphabet(
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	);
	const key = nanoid(12);
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
