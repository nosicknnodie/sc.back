import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany, Unique } from 'typeorm';

import { UserInput as Input } from '../types/input/UserInput';
import { BaseModel } from './BaseModel';
import { ClubUser } from './ClubUser';
import { Pet } from './Pet';

@Unique('unique_user_email', ['email'])
@Entity({ name : 'user' })
export class User extends BaseModel {

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

    public trasforToModel(t: Input): any {
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
