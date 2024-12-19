// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { AppConstant } from 'src/shared/app.constant';
// import { JwtPayload } from './types';

// @Injectable()
// export class TokenService {
//   constructor(private jwtService: JwtService, private config: ConfigService) {}
//   generateRefreshToken(payLoad: JwtPayload) {
//     const refreshToken = this.jwtService.sign(payLoad, {
//       expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION,
//       secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
//     });

//     return refreshToken;
//   }

//   generateAccessToken(payLoad: JwtPayload) {
//     const accessToken = this.jwtService.sign(payLoad, {
//       expiresIn: AppConstant.DEFAULT_JWT_ACCESS_TOKEN_EXPIRATION,
//       secret: this.config.get<string>('ACCESS_TOKEN_KEY'),
//     });
//     return accessToken;
//   }
// }
