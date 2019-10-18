import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Pet {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public age: number;

    @Column({
        name: 'user_idx',
        nullable: true,
    })
    public userIdx: string;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'user_idx', referencedColumnName: 'idx' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
