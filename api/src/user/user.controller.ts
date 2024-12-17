import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from './dto/create-user.dto';

@Controller(`user`)
export class UserController {
  
  constructor(
    private config: ConfigService,
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

  // @Get('getCurrentUser')
  // async getCurrentUser(@Request() req, @Query('id') id: number) {
  //   const user = await this.userSvc.getCurrentUser(id);
  //   return user;
  // }

  // @Post('generateAccessToken')
  // async generateAccessToken(@Body() args) {
  //   try {
  //     const payload = await this.jwtSvc.verifyAsync(args.args, {
  //       secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
  //     });

  //     const accessToken = await this.tokenSvc.generateAccessToken({
  //       userId: payload.userId,
  //       email: payload.email,
  //     });
  //     const refresh_Token = await this.tokenSvc.generateRefreshToken({
  //       userId: payload.userId,
  //       email: payload.email,
  //     });

  //     return {
  //       access_token: accessToken,
  //       refresh_token: refresh_Token,
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException();
  //   }
  // }

  @Post('authenticate')
  async login(@Body() args) {
    return this.authSvc.login(args);
  }

  @Post('register')
  async register(@Body() args: RegisterUserDto) {
    return this.authSvc.register(args);
  }

  // @Post('updateTourStatus')
  // async updateTourStatus(@Body() args: IUser) {
  //   console.log(args);

  //   await this.userSvc.updateTourStatus(args);
  // }
}
