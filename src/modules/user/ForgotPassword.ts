import { Resolver, Mutation, Arg } from 'type-graphql';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { sendEmail } from '../../utils/sendEmail';
import { v4 } from 'uuid';
import { forgotPasswordPrefixes } from '../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return false;
		}

		const token = v4();
		await redis.set(
			forgotPasswordPrefixes + token,
			user.id,
			'ex',
			60 * 60 * 24
		); //1 day expitation

		const url = `http://localhost:3000/user/change-password/${token}`;

		await sendEmail(email, url);

		return true;
	}
}
