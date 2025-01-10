import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './user/auth/decorators/user.decorator';
import { Public } from './user/auth/decorators/public.decorator';

@Controller('app')
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  async getHello(@CurrentUser() user): Promise<string> {
    return  this.appService.getHello(user);
  }
}
