import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity()
export class Date {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    isTaken: boolean;

    @Column()
    takenDate: string;

    @CreateDateColumn()
    created_at: Date; 
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  
    @VersionColumn()
    version: number;
}