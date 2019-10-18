import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Club } from './Club';

@Entity({name: 'purchase'})
export class Purchase extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'club_idx' })
    public clubIdx: string;

    @IsNotEmpty()
    @Column({ name: 'stuff_type', length: 4 })
    public stuffType: string;

    @IsNotEmpty()
    @Column({ name: 'name'})
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @IsNotEmpty()
    @Column({ name: 'amount' })
    public amount: number;

    @IsNotEmpty()
    @Column({ name: 'all_price' })
    public allPrice: number;

    @IsNotEmpty()
    @Column({ name: 'pur_dt' })
    public purDt: Date;

    @ManyToOne(type => Club, club => club.purchases)
    @JoinColumn({ name: 'club_idx' })
    public club: Club;

    public toString(): string {
        return `${this.name}`;
    }

}
