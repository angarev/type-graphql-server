import { PasswordInput } from '../../../shered/PasswordInput';
import { InputType, Field } from 'type-graphql';

@InputType()
export class ChangePasswordInput extends PasswordInput {
	@Field()
	token: string;
}
