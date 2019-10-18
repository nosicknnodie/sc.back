import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
    BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Unique,
    UpdateDateColumn
} from 'typeorm';

import { UserInput } from '../types/input/UserInput';
import { ClubUser } from './ClubUser';
import { Pet } from './Pet';

@Unique('unique_user_email', ['email'])
@Entity({ name : 'user' })
export class User {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @PrimaryColumn('uuid')
    public idx: string;

    @IsNotEmpty()
    @Column()
    @IsEmail({}, {message: '이메일이 아닙니다.'})
    public email: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'en_name' })
    public enName: string;

    @Column({ name: 'cl_name' })
    public clName: string;

    @Column({ name: 'cl_top_size' })
    public clTopSize: string;

    @Column({ name: 'cl_btm_size' })
    public clBtmSize: string;

    @Column({ name: 'pf_position' })
    public pfPosition: string;

    @IsNotEmpty()
    @Column({ name: 'both_dt' })
    public bothDt: Date;

    @CreateDateColumn({ name: 'reg_dt' })
    public regDt: Date;

    @UpdateDateColumn({ name: 'edt_dt' })
    public edtDt: Date;

    @OneToMany(type => Pet, pet => pet.user)
    public pets: Pet[];

    @OneToMany(type => ClubUser, clubUser => clubUser.user)
    public clubUsers: ClubUser[];

    public toString(): string {
        return `${this.name} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

    public trasforToModel(t: UserInput): any {
        this.name = t.name;
        this.email = t.email;
        this.enName = t.enName;
        this.bothDt = t.bothDt;
        this.clTopSize = t.clTopSize;
        this.clBtmSize = t.clBtmSize;
        this.clName = t.clName;
        this.password = t.password;
        return this;
    }
}
