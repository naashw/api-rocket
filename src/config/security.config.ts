import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
	virtualtourIdSalt: process.env.VIRTUAL_ID_SALT,
}));
