import { Base } from "src/shared/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, ManyToMany } from "typeorm";

export class Course extends Base {
    @Column()
    title: string;
  
    @ManyToMany(() => User)
    teachers: User[];
}
