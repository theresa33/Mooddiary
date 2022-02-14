/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Entry {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ length: 100 })
  title: string;

  @IsNotEmpty()
  @Column()
  mood: string;

  @IsNotEmpty()
  @Column()
  intensity: number;

  @IsNotEmpty()
  @Column()
  situation: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

}

