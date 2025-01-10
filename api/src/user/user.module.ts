import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Role } from 'src/role/entities/role.entity';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/entities/otp.entity';
import { OtpService } from './otp/otp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Otp]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
