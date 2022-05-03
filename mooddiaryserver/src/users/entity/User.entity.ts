import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsNotEmpty()
    @Column()
    username: string;

    @IsNotEmpty()
    @Column()
    password: string;

    @Column()
    email: string;

    @BeforeInsert() async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
 }


    // @CreateDateColumn()
    // created_at: Date; 

    // @UpdateDateColumn()
    // updated_at: Date;

    // @DeleteDateColumn()
    // deleted_at: Date;

    // @VersionColumn()
    // version: number;

}


