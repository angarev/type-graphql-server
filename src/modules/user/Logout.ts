import { Resolver, Ctx, Mutation } from 'type-graphql';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
		return new Promise((res, rej) =>
			ctx.req.session!.destroy((err: any) => {
				if (err) {
					console.log(err);
					return rej(false);
				}

				ctx.res.clearCookie('qid');
				return res(true);
			})
		);
	}
}