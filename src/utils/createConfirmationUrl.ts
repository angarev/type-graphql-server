import { confirmPrefixes } from '../modules/constants/redisPrefixes';
import { v4 } from 'uuid';
import { redis } from '../redis';

export const createConfirmationUrl = async (userId: number) => {
	const token = v4();
	await redis.set(confirmPrefixes + token, userId, 'ex', 60 * 60 * 24); //1 day expitation

	return `http://localhost:3000/user/confirm/${token}`;
};
