import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BoardController],
  providers: [BoardService, PrismaService],
})
export class BoardModule {}
