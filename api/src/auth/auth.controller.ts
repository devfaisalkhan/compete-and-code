import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
  async register(@Body() args: any) {
    return this.authSvc.register(args);
  }
}
