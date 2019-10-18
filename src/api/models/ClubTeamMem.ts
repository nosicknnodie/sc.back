import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { ClubTeam } from './ClubTeam';
import { ClubUser } from './ClubUser';

@Entity({name: 'club_team_mem'})
export class ClubTeamMem extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_team_idx' })
    public clubTeamIdx: string;

    @IsNotEmpty()
    @Column({ name: 'club_user_idx' })
    public clubUserIdx: string;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'num' })
    public num: number;

    @Column({ name: 'position_x' })
    public positionX: number;

    @Column({ name: 'position_y' })
    public positionY: number;

    @ManyToOne(type => ClubTeam, clubTeam => clubTeam.clubTeamMems)
    @JoinColumn({ name: 'club_team_idx' })
    public clubTeam: ClubTeam;

    @ManyToOne(type => ClubUser, clubUser => clubUser.clubTeamMems)
    @JoinColumn({ name: 'club_user_idx' })
    public clubUser: ClubUser;

    public toString(): string {
        return `${this.name}`;
    }

}
