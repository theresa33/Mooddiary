import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsNotEmpty()
    @Column()
    username: string;

    // email: string;
    // @BeforeInsert() async hashPassword() {
    //     this.password = await bycrypt.hash(this.password, 10);
    // }

    @IsNotEmpty()
    @Column()
    email: string;

    @IsNotEmpty()
    @Column()
    password: string;

    // @CreateDateColumn()
    // created_at: Date; 

    // @UpdateDateColumn()
    // updated_at: Date;

    // @DeleteDateColumn()
    // deleted_at: Date;

    // @VersionColumn()
    // version: number;

}


