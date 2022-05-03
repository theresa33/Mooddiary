import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsNotEmpty()
    @Column()
    username: string;

    @Column({unique: true})
    email: string;


    @IsNotEmpty()
    @Column()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

/*     @BeforeInsert() async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    } */

    @BeforeInsert()
    emailToLowerCase() {
      this.email = this.email.toLowerCase();
    }


    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}


