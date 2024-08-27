import { Controller } from '@nestjs/common';
import { UsersWithBoardsService } from './users-with-boards.service';

@Controller('users-with-boards')
export class UsersWithBoardsController {
  constructor(private readonly usersWithBoardsService: UsersWithBoardsService) {}
}
