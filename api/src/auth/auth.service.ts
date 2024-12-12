import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/shared/shared.model';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
            private userRepo: Repository<User>,
        private userSvc: UserService,
        private readonly mailService: MailerService
    ) {
        
    }

    async register(data: any): Promise<IResponse<any>> {
        let result = {
          userStatus: null,
          alreadyExist: false,
          alreadyRegisteredWithNormalAuth: false,
          mobileRequired: true,
          mobileVerified: false,
          emailVerified: true,
        };
    
    
        let existingUser = await this.userSvc.getUserByEmail(data.email);
    
    
        let newOrUpdated: any = Object.assign({}, data);
    
        if (newOrUpdated.id) {
          const user = await this.userSvc.getUserByEmail(data.email);
          if (!user) {
            return {
              status: false,
              message: 'User not found',
            };
          }
    
          newOrUpdated.name = data.name;
          // newOrUpdated.institution = {...institution};
    
          await this.userRepo.save(newOrUpdated, { reload: true });
    
          return {
            status: true,
            message: 'User updated successfully',
            data: newOrUpdated,
          };
        }
    
      
        const user = await this.userSvc.getUserByEmail(newOrUpdated.email);
    
        if (user) {
          throw new ConflictException({
            alreadyExist: HttpStatus.CONFLICT,
            message: 'User already exists.'
          });
        }
    
        let password = newOrUpdated.password;
        password = password.toString();
    
        const hashPassword = await argon.hash(password);
        newOrUpdated.password = hashPassword;
    
        await this.userRepo.save<User>(newOrUpdated);
    
        return {
          status: HttpStatus.OK,
          message: 'User registered successfully',
        };
    }
    
    async login(params: any): Promise<IResponse<any>> {
        const user = await this.vaildateUserByEmail({
          email: params.email,
          password: params.password,
        });
    
        // const payLoad: JwtPayload = {
        //   userId: user.id,
        //   email: user.email,
        // };
    
        return {
          // access_token: this.generateAccessToken(payLoad),
          // refresh_token: this.generateRefreshToken(payLoad),
          data: user,
          status: HttpStatus.OK,
        };
    }

    async vaildateUserByEmail(args: { email; password }) {
        const user = await this.userSvc.getUserByEmail(args.email);
        if (!user) {
            throw new BadRequestException({ userNotFound: HttpStatus.NOT_FOUND });
        }

        const match = await argon.verify(user.password, args.password);

        if (!match) {
            return null;
        }

        return user;
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
