import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';

@Entity({name: 'account_month'})
export class AccountMonth extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'year', length: 4 })
    public year: string;

    @IsNotEmpty()
    @Column({ name: 'mm', length: 2 })
    public mm: string;

    @IsNotEmpty()
    @Column({ name: 'in_price' })
    public inPrice: number;

    @IsNotEmpty()
    @Column({ name: 'ex_price' })
    public exPrice: number;

    @IsNotEmpty()
    @Column({ name: 'sum_price' })
    public sumPrice: number;

    @ManyToOne(() => Club, club => club.accountMonths)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.sumPrice}`;
    }

}
