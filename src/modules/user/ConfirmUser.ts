import { Resolver, Mutation, Arg } from 'type-graphql';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { confirmPrefixes } from '../constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {
	@Mutation(() => Boolean, { nullable: true })
	async confirmUser(@Arg('token') token: string): Promise<Boolean> {
		const userId = await redis.get(confirmPrefixes + token);

		if (!userId) {
			return false;
		}

		await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
		await redis.del(token);

		return true;
	}
}
