import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertCardDto, UpdateCardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor(
        private prismaService: PrismaService
    ) {}

    stringToDate(stringDate: string): Date {
        const [day, month, year] = stringDate.split('-').map(Number);

        if (
            isNaN(day) || isNaN(month) || isNaN(year) ||
            day < 1 || month < 1 || month > 12 || year < 1
        ) {
            throw new BadRequestException('Invalid date format or value');
        }
        
        const newDate = new Date(year, month - 1, day);

        if (
            newDate.getFullYear() !== year ||
            newDate.getMonth() !== month - 1 ||
            newDate.getDate() !== day
        ) {
            throw new BadRequestException('Invalid date value');
        }

        return newDate;
    }

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

        const deadlineDate = this.stringToDate(dto.deadline);

        return this.prismaService.card.create({
            data: {
                columnId: dto.columnId,
                title: dto.title.trim(),
                position: newPosition,
                deadline: deadlineDate,
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

        const deadlineDate = this.stringToDate(dto.deadline);

        return this.prismaService.card.update({
            where: { id: dto.id },
            data: {
                title: dto.title ?? card.title,
                position: dto.position ?? card.position,
                isCompleted: dto.isCompleted ?? card.isCompleted,
                deadline: deadlineDate ?? card.deadline
            },
        });
    }
    
    delete(cardId: string) {
        return this.prismaService.card.delete({
            where: { id: cardId }
        });
    }
}
