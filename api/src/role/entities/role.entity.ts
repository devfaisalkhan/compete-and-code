import { Base } from "src/shared/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Role extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('json', { nullable: true })
  permissions: string;
}
