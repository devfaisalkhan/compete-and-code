import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { text } from 'stream/consumers';
import { use } from 'passport';
import { IResponse } from 'src/shared/shared.model';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private otpRepo: Repository<Otp>,
    private userSvc: UserService,
  ) {}

  async sendOtp(email: any) {
    const user = await this.userSvc.getUserByEmail(email.email);
    
    if(!user) {
      throw new NotFoundException('User not found');
    }

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 2);
    const otp = this.generateOtp();
    const otpData = {
      otp,
      expiry,
      user
    }
    
    const otpEntity = await this.otpRepo.create(otpData);

    await this.otpRepo.save(otpEntity);
    await this.userSvc._sendMail(email, otp.toString());
    return 'Otp sent successfully';
  }

  async verifyOtp(data): Promise<IResponse<any>> {
    const user = await this.userSvc.getUserByEmail(data.email);
    const otp = await this.otpRepo.findOne({
      where: {
        otp: data.otp,
        user: {
          email: user.email
        }
      }
    });

    if(!otp) {
      throw new NotFoundException('Invalid otp');
    }
    console.log(otp.expiry , new Date());
    
    if(otp.expiry < new Date()) {
      throw new NotFoundException('Otp expired');
    }

    return {
      message: 'Otp verified',
      status: HttpStatus.OK
    }
  }

  generateOtp() { 
    return Math.floor(100000 + Math.random() * 900000);
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
