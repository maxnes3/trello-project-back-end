import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InsertBoardDto, UpdateBoardDto } from './dto/board.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  private async findUserBoardRelation(
    userId: string,
    boardId: string,
    creator: boolean = false
  ) {
    const relation = await this.prismaService.usersWithBoards.findFirst({
      where: {
        boardId,
        userId,
        isCreator: creator
      }
    });

    if (!relation) {
      throw new ForbiddenException(
        'User does not have permission to manage this board'
      );
    }

    return relation;
  }

  async findBoardsByUser(userId: string) {
    const userBoards = await this.prismaService.usersWithBoards.findMany({
      where: { userId },
      include: { board: true },
      orderBy: {
        board: {
          createdAt: 'desc'
        }
      }
    });

    return userBoards.map((userBoard) => userBoard.board);
  }

  async insert(userId: string, dto: InsertBoardDto) {
    const board = await this.prismaService.board.create({
      data: {
        name: dto.name,
        usersWithBoards: {
          create: {
            userId,
            isCreator: true
          }
        }
      },
      include: { usersWithBoards: true }
    });

    return board;
  }

  async update(creatorId: string, dto: UpdateBoardDto) {
    await this.findUserBoardRelation(creatorId, dto.id);

    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Board name must not be empty');
    }

    return this.prismaService.board.update({
      where: { id: dto.id },
      data: { name: dto.name }
    });
  }

  async delete(creatorId: string, boardId: string) {
    await this.findUserBoardRelation(creatorId, boardId, true);

    return this.prismaService.board.delete({
      where: { id: boardId }
    });
  }

  async inviteUserToBoard(creatorId: string, dto: UpdateBoardDto) {
    await this.findUserBoardRelation(creatorId, dto.id, true);

    const invitedUser = await this.userService.findByEmail(dto.inviteuser);
    if (!invitedUser) {
      throw new NotFoundException('Invited user does not exist');
    }

    const existingRelation =
      await this.prismaService.usersWithBoards.findUnique({
        where: {
          userId_boardId: {
            userId: invitedUser.id,
            boardId: dto.id
          }
        }
      });

    if (existingRelation) {
      throw new ForbiddenException('User is already a member of the board');
    }

    return this.prismaService.usersWithBoards.create({
      data: {
        userId: invitedUser.id,
        boardId: dto.id
      }
    });
  }

  async removeUserFromBoard(creatorId: string, dto: UpdateBoardDto) {
    await this.findUserBoardRelation(creatorId, dto.id, true);

    const invitedUser = await this.userService.findByEmail(dto.inviteuser);
    if (!invitedUser) {
      throw new NotFoundException('Invited user does not exist');
    }

    return this.prismaService.usersWithBoards.delete({
      where: {
        userId_boardId: {
          userId: invitedUser.id,
          boardId: dto.id
        }
      }
    });
  }
}
