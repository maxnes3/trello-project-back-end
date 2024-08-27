import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
    constructor (
        private prismaService: PrismaService
    ) {}
}
