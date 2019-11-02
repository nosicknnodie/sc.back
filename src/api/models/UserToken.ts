import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { User } from './User';

@Entity({name: 'user_token'})
export class UserToken extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'user_idx' })
    public userIdx: string;

    @IsNotEmpty()
    @Column({ name: 'host_name' })
    public hostName: string;

    @IsNotEmpty()
    @Column({ name: 'token' })
    public token: string;

    @ManyToOne(type => User, user => user.userTokens)
    @JoinColumn({ name: 'user_idx' })
    public user: User;

    public toString(): string {
        return `{idx: ${this.idx}, userIdx: ${this.userIdx}, hostName: ${this.hostName}, token: ${this.token}}`;
    }

}
