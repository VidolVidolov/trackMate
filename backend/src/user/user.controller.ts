import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RequestWithUser } from 'src/auth/types/RequestWithUser';
import { LocationService } from 'src/location/location.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private locationService: LocationService,
  ) {}

  @Get('profile')
  getProfile(@Req() request: RequestWithUser) {
    const userId = request.user.id;
    return this.userService.getProfile(userId);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }

  @Post('/update-location')
  async updateUserLocation(@Req() request: RequestWithUser) {
    const { id } = request.user;
    const body = request.body;
    //TODO: sanitize inputs
    try {
      const location = await this.locationService.updateLocationForUser(
        id,
        body,
      );

      return location;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('party')
  async getUserParty(@Req() request: RequestWithUser) {
    const { id } = request.user;
    return await this.userService.getUserParty(id);
  }
}
