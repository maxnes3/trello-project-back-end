import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async findById(id: string){
        return this.prismaService.user.findUnique({
            where: {
                id
            }
        });
    }
}
