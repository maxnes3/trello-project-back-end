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
import { CardService } from './card.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { InsertCardDto, UpdateCardDto } from './dto/card.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('find/:id')
  @Auth()
  @ApiOperation({ summary: 'Get all card by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved card.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getById(@Param('id') cardId: string) {
    return this.cardService.findById(cardId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  @Auth()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({
    type: InsertCardDto,
    description: 'Data for creating a new card'
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully created.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createCard(@Body() dto: InsertCardDto) {
    return this.cardService.insert(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update')
  @Auth()
  @ApiOperation({ summary: 'Update a card' })
  @ApiBody({
    type: UpdateCardDto,
    description: 'Data for updating an existing card'
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated.'
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateCard(@Body() dto: UpdateCardDto) {
    return this.cardService.update(dto);
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
  async deleteCard(@Param('id') cardId: string) {
    return this.cardService.delete(cardId);
  }
}
