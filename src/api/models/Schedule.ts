import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';

@Entity({name: 'schedule'})
export class Schedule extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'title'})
    public title: string;

    @IsNotEmpty()
    @Column({ name: 'description'})
    public description: string;

    @IsNotEmpty()
    @Column({ name: 'st_dt' })
    public stDt: Date;

    @IsNotEmpty()
    @Column({ name: 'ed_dt' })
    public edDt: Date;

    @ManyToOne(type => Club, club => club.schedules)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.title}`;
    }

}
