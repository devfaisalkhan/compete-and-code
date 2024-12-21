import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from 'src/shared/base.entity';
import { IRole } from '../user.model';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string; 

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' }) 
  roles: Role[];

  @Column({ default: true }) 
  isActive: boolean;
}
