import { Base } from 'src/shared/base.entity';
import { EPermission } from 'src/shared/shared.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';

@Entity()
export class Role extends Base {

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({array: true}) // Storing an array of permissions
  permissions: EPermission;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'parentRoleId' })
  parentRole?: Role; // Self-referential relationship for parent roles

  @Column({ nullable: true })
  parentRoleId?: string; // Foreign key for parent role
}
