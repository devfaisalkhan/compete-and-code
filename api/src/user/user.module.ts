import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService]
})
export class UserModule {}
