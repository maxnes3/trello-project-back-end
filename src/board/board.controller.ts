import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { InsertBoardDto, UpdateBoardDto } from './dto/board.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('getbyuser')
  @Auth()
  @ApiOperation({ summary: 'Get all boards by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user boards.'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getBoardsByUser(@CurrentUser('id') id: string) {
    return this.boardService.findBoardsByUser(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @Auth()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiBody({
    type: InsertBoardDto,
    description: 'Data for creating a new board'
  })
  @ApiResponse({
    status: 200,
    description: 'The board has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createBoard(
    @CurrentUser('id') id: string,
    @Body() dto: InsertBoardDto
  ) {
    return this.boardService.insert(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('inviteuser')
  @Auth()
  @ApiOperation({ summary: 'Invite a user to the board' })
  @ApiBody({
    type: UpdateBoardDto,
    description: 'Data for updating an existing board'
  })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully invited.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async invitUserToBoard(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateBoardDto
  ) {
    return this.boardService.inviteUserToBoard(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('removeuser')
  @Auth()
  @ApiOperation({ summary: 'Remove a user from the board' })
  @ApiBody({
    type: UpdateBoardDto,
    description: 'Data for updating an existing board'
  })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully removed.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async removeUserFromBoard(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateBoardDto
  ) {
    return this.boardService.removeUserFromBoard(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update')
  @Auth()
  @ApiOperation({ summary: 'Update a board' })
  @ApiBody({
    type: UpdateBoardDto,
    description: 'Data for updating an existing board'
  })
  @ApiResponse({
    status: 200,
    description: 'The board has been successfully updated.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateBoard(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateBoardDto
  ) {
    return this.boardService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  @ApiOperation({ summary: 'Delete a board by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the board to delete'
  })
  @ApiResponse({
    status: 200,
    description: 'The board has been successfully deleted.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async deleteBoard(
    @CurrentUser('id') id: string,
    @Param('id') boardId: string
  ) {
    return this.boardService.delete(id, boardId);
  }
}
