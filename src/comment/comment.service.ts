import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  insert(userId: string, dto: InsertCommentDto) {
    return this.prismaService.comment.create({
      data: {
        userId,
        cardId: dto.cardId,
        text: dto.text
      }
    });
  }

  async update(userId: string, dto: UpdateCommentDto) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: dto.id,
        userId
      }
    });

    if (!comment) {
      throw new NotFoundException(
        'Comment not found or you do not have permission to edit it'
      );
    }

    return this.prismaService.comment.update({
      where: { id: dto.id },
      data: { text: dto.text.trim() ?? comment.text }
    });
  }

  delete(userId: string, commentId: string) {
    return this.prismaService.comment.delete({
      where: {
        id: commentId,
        userId
      }
    });
  }
}
