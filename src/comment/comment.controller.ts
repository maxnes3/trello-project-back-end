import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { InsertCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(200)
  @Post('create')
  @Auth()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({
    type: InsertCommentDto,
    description: 'Data for creating a new comment'
  })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createComment(
    @CurrentUser('id') userId: string,
    @Body() dto: InsertCommentDto
  ) {
    return this.commentService.insert(userId, dto);
  }

  @HttpCode(200)
  @Put('update')
  @Auth()
  @ApiOperation({ summary: 'Update a comment' })
  @ApiBody({
    type: UpdateCommentDto,
    description: 'Data for updating an existing comment'
  })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateComment(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateCommentDto
  ) {
    return this.commentService.update(userId, dto);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the comment to delete'
  })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async deleteComment(
    @CurrentUser('id') userId: string,
    @Param('id') commentId: string
  ) {
    return this.commentService.delete(userId, commentId);
  }
}
