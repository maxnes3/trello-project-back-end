import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InsertBoardDto {
    @ApiProperty({
        example: 'My Awesome Board',
        description: 'The name of the board',
        minLength: 4,
    })
    @IsString()
    @MinLength(4, {
        message: 'The Name of board must consist of at least 4 characters'
    })
    name: string
}

export class UpdateBoardDto {
    @ApiProperty({
        example: '1234567890abcdef',
        description: 'The ID of the board to be updated',
    })
    @IsString()
    id: string

    @ApiPropertyOptional({
        example: 'Updated Board Name',
        description: 'The new name for the board',
        minLength: 4,
    })
    @IsOptional()
    @IsString()
    @MinLength(4, {
        message: 'The Name of board must consist of at least 4 characters'
    })
    name?: string

    @ApiPropertyOptional({
        example: 'inviteuser@example.com',
        description: 'The email of the user to invite to the board',
    })
    @IsOptional()
    @IsEmail()
    inviteuser?: string
}