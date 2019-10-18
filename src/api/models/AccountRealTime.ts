import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';
import { ClubUser } from './ClubUser';

@Entity({name: 'account_realtime'})
export class AccountRealTime extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ type: 'char', name: 'type_ie', length: 1 })
    public typeIe: string;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'club_user_idx' })
    public clubUserIdx: string;

    @Column({ name: 'description' })
    public decription: string;

    @IsNotEmpty()
    @Column({ name: 'ie_dt' })
    public ieDt: Date;

    @Column({ type: 'char', name: 'use_yn', length: 1 })
    public useYn: string;

    @ManyToOne(() => ClubUser, clubUser => clubUser.accountRealTimes)
    @JoinColumn({ name: 'club_user_idx' })
    public clubUser: ClubUser;

    @ManyToOne(() => Club, club => club.accountRealTimes)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.name}`;
    }

}
