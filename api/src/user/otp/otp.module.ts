import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { AuthService } from '../auth/auth.service';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp, User]),
  ],
  controllers: [OtpController],
  providers: [OtpService, UserService],
})
export class OtpModule {}
