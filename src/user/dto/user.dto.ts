import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    @MinLength(6, {
        message: 'The Password must consist of at least 6 characters'
    })
    password: string

    @IsOptional()
    @IsString()
    @MinLength(4, {
        message: 'The Username must consist of at least 4 characters'
    })
    username: string
}