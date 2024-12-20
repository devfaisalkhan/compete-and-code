// import {
//   Injectable,
//   UnauthorizedException,
//   ExecutionContext,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly config: ConfigService,
//   ) {
//     super();
//   }

//   generateRefreshToken(userId: string, email: string) {
//     const payLoad: JwtPayload = {
//       userId: userId,
//       email: email,
//     };

//     const refreshToken = this.jwtService.sign(payLoad, {
//       expiresIn: AppConstant.DEFAULT_JWT_REFRESH_TOKEN_EXPIRATION,
//       secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
//     });

//     return refreshToken;
//   }
// }
