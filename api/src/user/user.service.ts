import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { IResponse } from 'src/shared/shared.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private readonly mailService: MailerService,
  ) { }

  async getUserByEmail(email): Promise<any> {
    if (!email) {
      throw new NotFoundException('email not provided');
    }

    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['roles']
    });
    
    if (!user) {
      return null;
    }

    return user;
  }

  async getUserByEmailWithRole(email): Promise<any> {
    if (!email) {
      throw new NotFoundException('email not provided');
    }
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['roles']
    });
    
    if (!user) {
      return null;
    }

    return user;
  }

  async getUserById(id): Promise<IResponse<any>> {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['roles']
    });
    
    if (!user) {
      return null;
    }

    return {
      data: user,
      status: HttpStatus.OK
    };
  }

  async getAllUsersCount() {
    return this.userRepo.count();
  }

  async getAllUsers(pageNumber?: number, pageSize?: number):  Promise<IResponse<any>> {
    const users = await this.userRepo.find({
      relations: ['roles'],
      take: pageSize,
      skip: (pageNumber - 1) * pageSize
    });

    const totalUsers = await this.userRepo.count();
    
    if(!users) {
      return null
    }

    return {
      data: users,
      status: HttpStatus.OK,
      totalItems: totalUsers
    };
  }

  async update(data: UpdateUserDto): Promise<IResponse<any>> {
    const user = await this.getUserByEmail(data.email);    
    
    if(!user) {
      throw new NotFoundException('user not found');
    }

    const {roles, ...updateUser} = data;
    
    const result = await this.userRepo.update({ email: data.email }, updateUser);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
        
    if (roles) {
      // const roleEntities = await this.roleRepo.findByIds(roles); // Assuming `roles` is an array of role IDs
      // user.roles = roleEntities;
      // await this.userRepo.save(user);
    }

    return {
      status: HttpStatus.OK,
      message: 'User updated'
    }
  }

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
  
  async _sendMail(to, text?, subject?, template?, context?) {
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
        text: text,
      });
    } catch (e) {
      throw e;
    }

    return result;
  }
}

