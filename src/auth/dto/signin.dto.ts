import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {
        message: 'The Password must consist of at least 6 characters'
    })
    password: string
}