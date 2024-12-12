import {
  Column,
  Entity,
} from 'typeorm';
import { Base } from 'src/shared/base.entity';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;
}
