import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';

@Entity({name: 'stuff'})
export class Stuff extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'amount' })
    public amount: number;

    @ManyToOne(type => Club, club => club.stuffs)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.name}`;
    }

}
