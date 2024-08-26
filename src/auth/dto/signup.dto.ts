import { IsEmail, IsString, MinLength } from "class-validator"

export class SignUpDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {
        message: 'The Password must consist of at least 6 characters'
    })
    password: string

    @IsString()
    @MinLength(4, {
        message: 'The Username must consist of at least 4 characters'
    })
    username: string
}