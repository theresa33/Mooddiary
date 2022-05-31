/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { type } from 'os';
import { User } from 'src/users/entity/User.entity';

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

  // @Column()
  // userId: string;

  @ManyToOne(type => User, user => user.entries)
  user: User;

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

