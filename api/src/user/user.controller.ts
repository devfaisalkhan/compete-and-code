import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/decorators/public.decorator';

@Controller(`user`)
export class UserController {
  constructor(
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  @Post('sendMail')
  async sendMail(@Body() args: { to; subject }) {
    const resp = await this.authSvc._sendMail(args.to, args.subject);
    if (resp.accepted) {
      return {
        message: `Email has been sent to ${args.to}`,
      };
    }
  }

  @Get('getAllUsersCount')
  async getAllUsersCount() {
    const users = await this.userSvc.getAllUsersCount();
    return users;
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.userSvc.getAllUsers();
  }

  // @Get('getCurrentUser')
  // async getCurrentUser(@Request() req, @Query('id') id: number) {
  //   const user = await this.userSvc.getCurrentUser(id);
  //   return user;
  // }

 

  @Post('delete')
  async delete(@Body() args) {
    return this.authSvc.delete(args);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }
 

  // @Post('updateTourStatus')
  // async updateTourStatus(@Body() args: IUser) {
  //   console.log(args);

  //   await this.userSvc.updateTourStatus(args);
  // }
}
