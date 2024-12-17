import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { permission } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { IRole } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { EPermission } from '../shared.model';

@Injectable()
export class SeedDataMiddleware implements NestMiddleware {
  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,

    // private roleSvc: RoleService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    let users = await this.userSvc.getAllUsersCount();

    const adminRole: IRole = {
        id: '1', 
        name: 'admin',
        description: 'Administrator role with full access to the system',
        permissions: [
            EPermission.CREATE,
            EPermission.READ,
            EPermission.UPDATE,
            EPermission.DELETE,
            EPermission.MANAGE_USERS,
            EPermission.VIEW_REPORTS,
            EPermission.CONFIGURE_SETTINGS,
        ], 
    };

    if (users == 0) {
      await this.authSvc.register({
        email: 'dev.faisalK@gmail.com',
        name: 'faisal khan',
        password: 'password',
        roles: adminRole    
      });
    }
    next();
  }
}
