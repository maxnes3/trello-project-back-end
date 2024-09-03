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
import { ColumnService } from './column.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { InsertColumnDto, UpdateColumnDto } from './dto/column.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Column')
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('find/:boardid')
  @Auth()
  @ApiOperation({ summary: 'Get columns by board ID' })
  @ApiParam({
    name: 'boardid',
    type: String,
    description: 'ID of the board to get columns for'
  })
  @ApiResponse({
    status: 200,
    description: 'List of columns for the specified board'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findColumnsByBoard(@Param('boardid') boardId: string) {
    return this.columnService.findColumnsByBoard(boardId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @Auth()
  @ApiOperation({ summary: 'Create a new column' })
  @ApiBody({
    type: InsertColumnDto,
    description: 'Data for creating a new column'
  })
  @ApiResponse({ status: 200, description: 'The created column' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createColumn(@Body() dto: InsertColumnDto) {
    return this.columnService.insert(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update')
  @Auth()
  @ApiOperation({ summary: 'Update an existing column' })
  @ApiBody({
    type: UpdateColumnDto,
    description: 'Data for updating an existing column'
  })
  @ApiResponse({
    status: 200,
    description: 'The updated column',
    type: UpdateColumnDto
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateColumn(@Body() dto: UpdateColumnDto) {
    return this.updateColumn(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  @ApiOperation({ summary: 'Delete a column by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the column to delete'
  })
  @ApiResponse({ status: 200, description: 'Column successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteColumn(@Param('id') id: string) {
    return this.columnService.delete(id);
  }
}
