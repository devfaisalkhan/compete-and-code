import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('otp')
@Public()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('sendOtp')
  sendOtp(@Body() email: string) {
    return this.otpService.sendOtp(email);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() data: {otp: number, email: string}) {
    return this.otpService.verifyOtp(data);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
