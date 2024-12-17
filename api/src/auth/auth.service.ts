import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EPermission, IResponse } from 'src/shared/shared.model';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterUserDto } from 'src/user/dto/create-user.dto';
import { IRole } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
            private userRepo: Repository<User>,
        private userSvc: UserService,
        private readonly mailService: MailerService
    ) {
        
    }

    async register(data: RegisterUserDto): Promise<IResponse<any>> {
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
        const role: IRole = {
            id: '2', 
            name: 'user',
            description: 'simple',
            permissions: [
              EPermission.CREATE,
              EPermission.READ,
              EPermission.UPDATE,
              EPermission.DELETE,
            ], 
        };
        
        if(!data.roles) {
          data.roles = role;
        }
        
        const user = this.userRepo.create({
          ...data,
          roles: data.roles,
        });
        
        await this.userRepo.save<User>(user);

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
