import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class InsertBoardDto {
    @IsString()
    @MinLength(4, {
        message: 'The Name of board must consist of at least 4 characters'
    })
    name: string
}

export class UpdateBoardDto {
    @IsInt()
    id: Number

    @IsOptional()
    @IsString()
    @MinLength(4, {
        message: 'The Name of board must consist of at least 4 characters'
    })
    name: string
}