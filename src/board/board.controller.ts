import { Controller, Delete, Get, HttpCode, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('getbyuser')
  @Auth()
  async getBoardsByUser(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @Auth()
  async createBoard(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('inviteuser')
  @Auth()
  async invitUserToBoard(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('removeuser')
  @Auth()
  async removeUserFromBoard(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update')
  @Auth()
  async updateBoard(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete')
  @Auth()
  async deleteBoard(
    @CurrentUser('id') id: string,
    @Req() req: Request
  ) {
    return;
  }
}
