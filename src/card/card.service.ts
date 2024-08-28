import { Injectable } from '@nestjs/common';
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

    insert(dto: InsertCardDto) {
        
    }

    update(dto: UpdateCardDto) {

    }
    
    delete(cardId: string) {
        return this.prismaService.card.delete({
            where: { id: cardId }
        });
    }
}
