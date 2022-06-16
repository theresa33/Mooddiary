import { User } from "src/users/entity/User.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity()
export class Date {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    takenDate: string;

    @Column()
    isTaken: boolean;

    @ManyToOne(type => User, user => user.dates)
    user: User;

    @CreateDateColumn()
    created_at: Date; 
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  
    @VersionColumn()
    version: number;
}