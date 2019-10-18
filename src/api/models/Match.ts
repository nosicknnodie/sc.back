import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';
import { MatchQuater } from './MatchQuater';

@Entity({name: 'match'})
export class Match extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'match_dt' })
    public matchDt: Date;

    @IsNotEmpty()
    @Column({ name: 'match_club_name'})
    public matchClubName: string;

    @IsNotEmpty()
    @Column({ name: 'self_yn', length: 1 })
    public selfYn: string;

    @ManyToOne(type => Club, club => club.matchs)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    @OneToMany(type => MatchQuater, matchQuater => matchQuater.match)
    public matchQuaters: MatchQuater[];

    public toString(): string {
        return `${this.matchClubName}`;
    }

}
