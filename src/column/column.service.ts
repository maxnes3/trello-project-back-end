import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertColumnDto, UpdateColumnDto } from './dto/column.dto';
import { BoardService } from '../board/board.service';

@Injectable()
export class ColumnService {
    constructor(
        private prismaService: PrismaService
    ) {}

    findColumnsByBoard(boardId: string) {
        const boardColunms = this.prismaService.column.findMany({
            where: { id: boardId },
            include: { cards: true },
            orderBy: { position: 'asc' }
        });

        return boardColunms;
    }

    async insert(dto: InsertColumnDto) {
        const maxPosition = await this.prismaService.column.aggregate({
            _max: {
              position: true,
            },
            where: {
              boardId: dto.boardId,
            },
        });

        const newPosition = maxPosition._max.position ? maxPosition._max.position + 1 : 1;

        return this.prismaService.column.create({
            data: {
                boardId: dto.boardId,
                name: dto.name,
                position: newPosition,
            },
        });
    }

    async update(dto: UpdateColumnDto) {
        const column = await this.prismaService.column.findUnique({
            where: { id: dto.id },
        });
      
        if (!column) {
            throw new NotFoundException('Column not found');
        }

        if (dto.position) {
            await this.prismaService.column.updateMany({
                where: {
                    boardId: column.boardId,
                    position: {
                        gte: dto.position,
                    },
                },
                data: {
                    position: {
                        increment: 1,
                    },
                },
            });
        }

        return this.prismaService.column.update({
            where: { id: dto.id },
            data: {
              name: dto.name ?? column.name,
              position: dto.position ?? column.position,
            },
        });
    }

    delete(columnId: string) {
        return this.prismaService.column.delete({
            where: { id: columnId }
        });
    }
}
