import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertCardDto, UpdateCardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor(
        private prismaService: PrismaService
    ) {}

    findById(cardId: string){
        return this.prismaService.card.findUnique({
            where: { id: cardId },
            include: { 
                comments: {
                    orderBy: { createdAt: 'asc' }
                }
            }
        });
    }

    async insert(dto: InsertCardDto) {
        const maxPosition = await this.prismaService.card.aggregate({
            _max: {
                position: true,
            },
            where: {
                columnId: dto.columnId,
            },
        });

        const newPosition = maxPosition._max.position ? maxPosition._max.position + 1 : 1;

        return this.prismaService.card.create({
            data: {
                columnId: dto.columnId,
                title: dto.title.trim(),
                position: newPosition,
            },
        });
    }

    async update(dto: UpdateCardDto) {
        const card = await this.prismaService.card.findUnique({
            where: { id: dto.id },
        });
      
        if (!card) {
            throw new NotFoundException('Card not found');
        }

        if (dto.position) {
            await this.prismaService.card.updateMany({
                where: {
                    columnId: card.columnId,
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

        return this.prismaService.card.update({
            where: { id: dto.id },
            data: {
                title: dto.title ?? card.title,
                position: dto.position ?? card.position,
                isCompleted: dto.isCompleted ?? card.isCompleted
            },
        });
    }
    
    delete(cardId: string) {
        return this.prismaService.card.delete({
            where: { id: cardId }
        });
    }
}
