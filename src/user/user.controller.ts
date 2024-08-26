import { Body, Controller, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/user.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateUser(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateUserDto
  ){
    return this.userService.update(id, dto);
  }
}
