import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'dev.faisalk@gmail.com',
      subject: `Email from ${process.env.APP_NAME}`,
      text: message,
    });

    console.log('mail sent');
    
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
