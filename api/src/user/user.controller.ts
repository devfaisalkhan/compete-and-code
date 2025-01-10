import { Controller, Get, Post, Body, UseGuards, Request, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller(`user`)
export class UserController {
  constructor(
    private userSvc: UserService
  ) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }


  @Post('sendMail')
  async sendMail(@Body() args: { to; subject }) {
    const resp = await this.userSvc._sendMail(args.to, args.subject);
    if (resp.accepted) {
      return {
        message: `Email has been sent to ${args.to}`,
      };
    }
  }

  @Post('update')
  async update(@Body() args: UpdateUserDto) {
    return this.userSvc.update(args);
  }

  @Get('getAllUsersCount')
  async getAllUsersCount() {
    const users = await this.userSvc.getAllUsersCount();
    return users;
  }

  @Get('getAllUsers')
  async getAllUsers( @Query('pageNumber') pageNumber: number, @Query('pageSize') pageSize: number) {
    return this.userSvc.getAllUsers(pageNumber, pageSize);
  }

  // @Get('getCurrentUser')
  // async getCurrentUser(@Request() req, @Query('id') id: number) {
  //   const user = await this.userSvc.getCurrentUser(id);
  //   return user;
  // }

  @Get(':id')
  async getUserById(@Param('id') id: any) {
    return this.userSvc.getUserById(id)
  }


  @Post('delete')
  async delete(@Body() args) {
    return this.userSvc.delete(args);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }
 
}
