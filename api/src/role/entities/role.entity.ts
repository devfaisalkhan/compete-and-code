import { Base } from "src/shared/base.entity";
import { EPermission } from "src/shared/shared.model";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Role extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('json', {nullable: false}) 
  permissions: EPermission;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
