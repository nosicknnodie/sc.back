import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { ClubInput } from '../types/input/ClubInput';
import { AccountAll } from './AccountAll';
import { AccountMonth } from './AccountMonth';
import { AccountRealTime } from './AccountRealTime';
import { BaseModel } from './BaseModel';
import { ClubTeam } from './ClubTeam';
import { ClubUser } from './ClubUser';
import { Match } from './Match';
import { Purchase } from './Purchase';
import { Schedule } from './Schedule';
import { Stuff } from './Stuff';

@Entity({name: 'club'})
export class Club extends BaseModel {

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'area' })
    public area: string;

    @OneToMany(type => ClubUser, clubUser => clubUser.club)
    public clubUsers: ClubUser[];

    @OneToMany(type => ClubTeam, clubTeam => clubTeam.club)
    public clubTeams: ClubTeam[];

    @OneToMany(type => Stuff, stuff => stuff.club)
    public stuffs: Stuff[];

    @OneToMany(type => AccountRealTime, accountRealTime => accountRealTime.club)
    public accountRealTimes: AccountRealTime[];

    @OneToMany(type => AccountMonth, accountMonth => accountMonth.club)
    public accountMonths: AccountMonth[];

    @OneToMany(type => AccountAll, accountAll => accountAll.club)
    public accountAlls: AccountAll[];

    @OneToMany(type => Purchase, purchase => purchase.club)
    public purchases: Purchase[];

    @OneToMany(type => Schedule, schedule => schedule.club)
    public schedules: Schedule[];

    @OneToMany(type => Match, match => match.club)
    public matchs: Match[];

    public toString(): string {
        return `${this.name}, ${this.title}, ${this.area}, ${this.description}, ${this.edtDt}, ${this.regDt}`;
    }

    public trasforToModel(t: ClubInput): any {
        this.name = t.name;
        this.title = t.title;
        this.area = t.area;
        this.description = t.description;
        return this;
    }

}
