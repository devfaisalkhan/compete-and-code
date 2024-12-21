import { Base } from 'src/shared/base.entity';
import { EPermission } from 'src/shared/shared.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({array: true}) 
  permissions: EPermission;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
