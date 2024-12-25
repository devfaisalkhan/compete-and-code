import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { permission } from 'process';
import { IRole } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { EPermission } from '../shared.model';
import { AuthService } from 'src/user/auth/auth.service';
import { RoleService } from 'src/role/role.service';
import { log } from 'console';

@Injectable()
export class SeedDataMiddleware implements NestMiddleware {
  constructor(
    private userSvc: UserService,
    private authSvc: AuthService, 
    private roleSvc: RoleService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    const usersCount = await this.userSvc.getAllUsersCount();
    const rolesCount = await this.roleSvc.countAll();

    if (rolesCount === 0) {
      const adminRole: IRole = {
        name: 'admin',
        description: 'Administrator role with full access to the system',
        permissions: [
          EPermission.CREATE,
          EPermission.READ,
          EPermission.UPDATE,
          EPermission.DELETE,
        ], 
      };
      const userRole: IRole = {
        name: 'user',
        description: 'User role with limited access to the system',
        permissions: [
          EPermission.CREATE
        ], 
      };

      await this.roleSvc.create(adminRole);
      await this.roleSvc.create(userRole);

    }

    // Fetch roles after seeding
    const [roleEntities, totalRoles] = await this.roleSvc.findAndCount();
    
    if (usersCount === 0) {
      const role = roleEntities[0]; 
      await this.authSvc.register({
        email: 'dev.faisalK@gmail.com',
        name: 'faisal khan',
        password: 'password',
        roles: [role]
      });
    }

    next();
  }
}

