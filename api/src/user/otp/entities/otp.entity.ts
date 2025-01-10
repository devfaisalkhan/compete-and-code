import { Base } from "src/shared/base.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";

@Entity()
export class Otp extends Base {
  @Column()
  otp: number;

  @Column()
  expiry: Date;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  user: User;
}
