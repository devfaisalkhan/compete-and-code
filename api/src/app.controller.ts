import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/decorators/user.decorator';
import { Public } from './auth/decorators/public.decorator';

@Controller('app')
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  async getHello(@User() user): Promise<string> {
    return  this.appService.getHello(user);
  }
}
