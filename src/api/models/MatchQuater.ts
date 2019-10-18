import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Match } from './Match';

@Entity({name: 'match_quater'})
export class MatchQuater extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'match_idx' })
    public matchIdx: string;

    @IsNotEmpty()
    @Column({ name: 'match_dt' })
    public matchDt: Date;

    @IsNotEmpty()
    @Column({ name: 'seq'})
    public seq: number;

    @IsNotEmpty()
    @Column({ name: 'l_team_idx' })
    public lTeamIdx: string;

    @IsNotEmpty()
    @Column({ name: 'l_team_name' })
    public lTeamName: string;

    @IsNotEmpty()
    @Column({ name: 'r_team_idx' })
    public rTeamIdx: string;

    @IsNotEmpty()
    @Column({ name: 'r_team_name' })
    public rTeamName: string;

    @Column({ name: 'referee' })
    public referee: string;

    @ManyToOne(type => Match, match => match.matchQuaters)
    @JoinColumn({ name: 'match_idx' })
    public match: Match;

    public toString(): string {
        return `${this.seq}`;
    }

}
