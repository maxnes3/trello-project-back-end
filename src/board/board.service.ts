import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertBoardDto, UpdateBoardDto } from './dto/board.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
  constructor (
      private prismaService: PrismaService,
      private userService: UserService,
  ) {}

  findCreatorBoardRelation(userId: string, boardId: string) {
    return this.prismaService.usersWithBoards.findFirst({
      where: {
        boardId: boardId,
        userId: userId,
        isCreator: true,
      },
    });
  }

  async findBoardsByUser(userId: string) {
    const userBoards = await this.prismaService.usersWithBoards.findMany({
      where: {
        userId: userId,
      },
      include: {
        board: true,
      },
    });
  
    const boards = userBoards.map(userBoard => userBoard.board);
  
    return boards;
  }

  insert(userId: string, dto: InsertBoardDto) {
    const board = this.prismaService.board.create({
      data: {
        name: dto.name,
        usersWithBoards: {
          create: {
            userId: userId,
            isCreator: true,
          },
        },
      },
      include: {
        usersWithBoards: true,
      },
    });
  
    return board;
  }

  update(creatorId: string, dto: UpdateBoardDto) {
    const boardWithCreator = this.findCreatorBoardRelation(creatorId, dto.id);

    if (!boardWithCreator) {
      throw new ForbiddenException('User dont have permission to update this board');
    }

    return this.prismaService.board.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
      },
    });
  }

  delete(creatorId: string, boardId: string) {
    const boardWithCreator = this.findCreatorBoardRelation(creatorId, boardId);

    if (!boardWithCreator) {
      throw new ForbiddenException('User dont have permission to update this board');
    }

    return this.prismaService.board.delete({
      where: { id: boardId }
    });
  }

  async inviteUserToBoard(creatorId: string, dto: UpdateBoardDto) {
    const boardWithCreator = this.findCreatorBoardRelation(creatorId, dto.id);

    if (!boardWithCreator) {
      throw new ForbiddenException('User dont have permission to remove others from the board');
    }

    const invitedUser = await this.userService.findByEmail(dto.inviteuser);

    if (!invitedUser) {
      throw new ForbiddenException('Invited user does not exist');
    }

    return this.prismaService.usersWithBoards.create({
      data: {
        userId: invitedUser.id,
        boardId: dto.id,
        isCreator: false
      }
    });
  }

  async removeUserFromBoard(creatorId: string, dto: UpdateBoardDto) {
    const boardWithCreator = this.findCreatorBoardRelation(creatorId, dto.id);

    if (!boardWithCreator) {
      throw new ForbiddenException('User dont have permission to remove others from the board');
    }

    const invitedUser = await this.userService.findByEmail(dto.inviteuser);

    if (!invitedUser) {
      throw new ForbiddenException('Invited user does not exist');
    }

    return this.prismaService.usersWithBoards.delete({
      where: {
        userId_boardId: { 
          userId: invitedUser.id,
          boardId: dto.id,
        },
      },
    });
  }
}
