import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private authSvc: AuthService,
  ) {}

  @Post('authenticate')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return this.authSvc.login(req.user);
  }

  @Post('register')
  async register(@Body() args: CreateUserDto) {
    return this.authSvc.register(args);
  }

  @Post('getNewAccessToken')
  async getNewAccessToken(@Body() args: any) {
    return this.authSvc.getNewAccessToken(args.refreshToken);
  }
}
