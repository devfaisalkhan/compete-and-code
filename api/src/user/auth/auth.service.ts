import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EPermission, IResponse } from 'src/shared/shared.model';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { AppConstant } from 'src/shared/app.constant';
import { ConfigService } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(User)
      private userRepo: Repository<User>,
      private userSvc: UserService,
      private readonly mailService: MailerService,
      private jwtService: JwtService,
      private configSvc: ConfigService,
      private roleSvc: RoleService

    ) {
        
    }

    async register(data: CreateUserDto): Promise<IResponse<any>> {
        const isUserFound = await this.userSvc.getUserByEmail(data.email);
          
        if (isUserFound) {
          throw new ConflictException({
            alreadyExist: HttpStatus.CONFLICT,
            message: 'User already exists.'
          });
        }
        
        let password = data.password;
        password = password.toString();
    
        const hashPassword = await argon.hash(password);
        data.password = hashPassword;

        if(!data.roles) {
          const role = await this.roleSvc.getRoleByName('user');
          if(role)  {
            data.roles = [role];
          }  
        }
        const user = this.userRepo.create(data);
        await this.userRepo.save<User>(user);
        return {
          status: HttpStatus.OK,
          message: 'User registered successfully',
        };
    }
    
    async login(params: any): Promise<IResponse<any>> {
      const payLoad: JwtPayload = {
        userId: params.id,
        email: params.email,
      };
  
      return {
        access_token: await this.generateAccessToken(payLoad),
        refresh_token: await this.generateRefreshToken(payLoad),
        data: params,
        status: HttpStatus.OK,
      };
    }

    async delete(data): Promise<IResponse<any>> {
      const user = await this.userRepo.findOne({where: {id: data.id}});
      
      if(!user) {
        throw new NotFoundException();
      }

      const resp = await this.userRepo.delete({id: data.id});
    
      if(resp.affected === 0) {
        throw new BadRequestException();
      } 

      return {
        status: HttpStatus.OK,
        message: 'User Deleted successfully',
      };
    }

    async vaildateUserByEmail(args: { email; password }) {
      const user = await this.userSvc.getUserByEmail(args.email);
        
      if (!user) {
        throw new NotFoundException();
      }
      
      const match = await argon.verify(user.password, args.password);
      
      if (!match) {
        throw new UnauthorizedException();
      }

      return user;
    }

    async getNewAccessToken(refreshToken: string) {
      try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.configSvc.get<string>('refreshTokenSecret'),
        });
        
        const accessToken = await this.generateAccessToken({
          userId: payload.userId,
          email: payload.email,
        });
        const refresh_Token = await this.generateRefreshToken({
          userId: payload.userId,
          email: payload.email,
        });
  
        return {
          access_token: accessToken,
          refresh_token: refresh_Token,
        };
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    generateAccessToken(payLoad: JwtPayload) {
      return this.jwtService.sign(payLoad);
    }
  
    generateRefreshToken(payLoad: JwtPayload) {
      return this.jwtService.sign(payLoad, {
        secret: this.configSvc.get<string>('refreshTokenSecret'),
        expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION
      });
    }

    
    async _sendMail(to, subject, template?, context?) {
        let result: {
          response;
          messageId;
          accepted: string[];
          rejected: string[];
          envelopeTime;
          messageTime;
        };
        try {
          result = await  this.mailService.sendMail({
            from: process.env.EMAIL_FROM,
            to: 'dev.faisalk@gmail.com',
            subject: `Email from ${process.env.APP_NAME}`,
            text: 'message',
          });
        } catch (e) {
          throw e;
        }
    
        return result;
      }
}
