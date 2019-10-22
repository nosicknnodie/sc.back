import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ClubTeamInput } from '../types/input/ClubTeamInput';
import { BaseModel } from './BaseModel';
import { Club } from './Club';
import { ClubTeamMem } from './ClubTeamMem';

@Entity({name: 'club_team'})
export class ClubTeam extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'seq' })
    public seq: number;

    @Column({ name: 'name' })
    public name: string;

    @ManyToOne(() => Club, club => club.clubTeams)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    @OneToMany(() => ClubTeamMem, clubTeamMem => clubTeamMem.clubTeam)
    public clubTeamMems: ClubTeamMem[];

    public toString(): string {
        return `${this.name}`;
    }

    public trasforToModel(t: ClubTeamInput): any {
        this.clubIdx = t.clubIdx;
        this.name = t.name;
        return this;
    }

}
