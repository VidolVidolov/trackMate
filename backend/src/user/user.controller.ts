import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

import { Request } from 'express';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Req() request: Request) {
    //TODO: Find a way to fix it
    //@ts-ignore
    const userId = request.user.id;
    return this.userService.getProfile(userId);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
