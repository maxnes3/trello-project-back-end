import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class InsertCommentDto {
  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a comment.'
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The ID of the card to which the comment belongs',
    example: 'abc123def456ghi789'
  })
  @IsString()
  cardId: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The ID of the comment to update',
    example: '1234567890abcdef'
  })
  @IsString()
  id: string;

  @ApiPropertyOptional({
    description: 'The new text of the comment (optional)',
    example: 'Updated comment text.'
  })
  @IsOptional()
  @IsString()
  text?: string;
}
