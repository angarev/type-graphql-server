// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {Length,	IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

@InputType()
export class RegisterInput {
	@Field()
	@Length(1, 255)
	firstName: string;

	@Field()
	@Length(1, 255)
	lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message: 'This email already exists.'})
	email: string;

	@Field()
	password: string;
}