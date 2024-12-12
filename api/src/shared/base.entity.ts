import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base {
    @PrimaryGeneratedColumn('uuid')
    id: UUID
}