import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { UsersWithBoardsModule } from './users-with-boards/users-with-boards.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, BoardModule, ColumnModule, CardModule, CommentModule, UsersWithBoardsModule],
})
export class AppModule {}
