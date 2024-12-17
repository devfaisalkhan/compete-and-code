import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
 
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    
  }

  async getUserByEmail(email): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { email: email }
    });
    
    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  }

  async updateTourStatus(user: any) {
    if (!user) {
      return;
    }

    await this.userRepo.update(user.id, user);
    return user;
  }

  async getAllUsersCount() {
    return this.userRepo.count();
  }

 

  // generateAccessToken(payLoad: JwtPayload) {
  //   return this.jwtService.sign(payLoad, {
  //     expiresIn: AppConstant.DEFAULT_JWT_TOKEN_EXPIRATION,
  //     secret: this.config.get<string>('ACCESS_TOKEN_KEY'),
  //   });
  // }

  // generateRefreshToken(payLoad: JwtPayload) {
  //   return this.jwtService.sign(payLoad, {
  //     expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION,
  //     secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
  //   });
  // }

  // async changeRole(data: IUser, role: IRole) {
  //   let user = await this.getUserByEmail(data.email);

  //   // if(role) {
  //   //     user.role = role;
  //   // }

  //   await this.userRepo.update(user.id, user);
  //   return user;
  // }

  // async changeStatus(data: IUser, status: UserStatus) {
  //   let user = await this.getUserByEmail(data.email);

  //   if (status) {
  //     user.status = status;
  //   }

  //   await this.userRepo.update(user.id, user);
  //   return user;
  // }

  // async getCurrentUser(id): Promise<IUser> {
  //   const user = await this.userRepo.findOne({
  //     where: { id: id },
  //     relations: ['institution', 'roles'],
  //   });

  //   if (!user) {
  //     return null;
  //   }

  //   return user;
  // }




}

