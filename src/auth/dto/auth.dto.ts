import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the user',
        format: 'email',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
        minLength: 6,
    })
    @IsString()
    @MinLength(6, {
        message: 'The Password must consist of at least 6 characters'
    })
    password: string
}


export class SignUpDto extends SignInDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user',
        minLength: 4,
    })
    @IsString()
    @MinLength(4, {
        message: 'The Username must consist of at least 4 characters'
    })
    username: string
}