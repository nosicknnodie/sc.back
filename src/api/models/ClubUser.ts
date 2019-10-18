import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AccountRealTime } from './AccountRealTime';
import { BaseModel } from './BaseModel';
import { Club } from './Club';
import { ClubTeamMem } from './ClubTeamMem';
import { User } from './User';

@Entity({name: 'club_user'})
export class ClubUser extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'user_idx' })
    public userIdx: string;

    @IsNotEmpty()
    @Column({ name: 'user_name' })
    public userName: string;

    @IsNotEmpty()
    @Column({ name: 'job_title' })
    public jobTitle: string;

    @Column({ name: 'hb_position' })
    public hbPosition: string;

    @Column({ name: 'sb_position' })
    public sbPosition: string;

    @ManyToOne(type => User, user => user.clubUsers)
    @JoinColumn({ name: 'user_idx' })
    public user: User;

    @ManyToOne(type => Club, club => club.clubUsers)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    @OneToMany(type => ClubTeamMem, clubTeamMem => clubTeamMem.clubUser)
    public clubTeamMems: ClubTeamMem[];

    @OneToMany(type => AccountRealTime, accountRealTime => accountRealTime.clubUser)
    public accountRealTimes: AccountRealTime[];

    public toString(): string {
        return `${this.idx}`;
    }

}
