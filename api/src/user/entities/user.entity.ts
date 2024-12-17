import { Column, Entity } from 'typeorm';
import { Base } from 'src/shared/base.entity';
import { IRole } from '../user.model';

@Entity()
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string; 

  @Column('json', { nullable: true })
  roles: IRole;

  @Column({ default: true }) 
  isActive: boolean;

}
