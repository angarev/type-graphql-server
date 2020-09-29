import { Length, IsEmail } from 'class-validator';
import { PasswordInput } from '../../../shered/PasswordInput';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordInput {
	@Field()
	@Length(1, 255)
	firstName: string;

	@Field()
	@Length(1, 255)
	lastName: string;

	@Field()
	@IsEmail()
	@IsEmailAlreadyExist({ message: 'This email already exists.' })
	email: string;
}
