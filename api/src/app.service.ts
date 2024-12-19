import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  
  getHello(data): string {
    return data;
  }
}
