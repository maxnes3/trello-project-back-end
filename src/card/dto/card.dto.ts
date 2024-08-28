import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class InsertCardDto {
    @ApiProperty({
        description: 'Title of the card',
        example: 'My New Card',
    })
    @IsString()
    @MinLength(1, { message: 'Title should not be empty' })
    title: string;

    @ApiPropertyOptional({
        description: 'Description of the card',
        example: 'This is a detailed description of the card.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'ID of the column where the card is placed',
        example: 'column-id',
    })
    @IsString()
    columnId: string;
}

export class UpdateCardDto extends PartialType(InsertCardDto) {
    @ApiProperty({
        description: 'ID of the card',
        example: 'card-id',
    })
    @IsString()
    id: string;

    @ApiPropertyOptional({
        description: 'Position of the card within the column',
        example: 1,
    })
    @IsOptional()
    @IsInt()
    position?: number;

    @ApiPropertyOptional({
        description: '',
        example: true
    })
    @IsBoolean()
    isCompleted?: boolean;
}
