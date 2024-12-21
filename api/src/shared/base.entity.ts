import { Exclude } from "class-transformer";
import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: UUID; 

  @CreateDateColumn()
  @Exclude()
  createdAt: Date; 

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
