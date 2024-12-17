import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: UUID; 

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date; 

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
