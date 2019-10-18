import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';

@Entity({name: 'account_all'})
export class AccountAll extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @ManyToOne(type => Club, club => club.accountAlls)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.price}`;
    }

}
