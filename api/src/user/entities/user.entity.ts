import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from 'src/shared/base.entity';
import { IRole } from '../user.model';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/entities/role.entity';
import { Otp } from '../otp/entities/otp.entity';

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

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Otp, (otp) => otp.user, { cascade: true })
  otps: Otp[];

  @Column({nullable: true})
  avatarUrl: string;
}
