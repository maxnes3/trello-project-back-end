import { Module } from '@nestjs/common';
import { UsersWithBoardsService } from './users-with-boards.service';
import { UsersWithBoardsController } from './users-with-boards.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersWithBoardsController],
  providers: [UsersWithBoardsService, PrismaService],
})
export class UsersWithBoardsModule {}
