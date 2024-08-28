import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class InsertColumnDto {
    @ApiProperty({
        description: 'The name of the column',
        example: 'To Do',
    })
    @IsString()
    @MinLength(4, {
        message: 'The name of the column must not be empty',
    })
    name: string;

    @ApiProperty({
        description: 'The ID of the board to which the column belongs',
        example: 'board-id-123',
    })
    @IsString()
    boardId: string;
}

export class UpdateColumnDto {
    @ApiProperty({
        description: 'The ID of the column to update',
        example: '1234567890abcdef',
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The name of the column',
        example: 'To Do',
    })
    @IsString()
    @MinLength(4, {
        message: 'The name of the column must not be empty',
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'The new position of the column on the board (optional)',
        example: 2,
    })
    @IsOptional()
    @IsInt()
    position?: number;
}
