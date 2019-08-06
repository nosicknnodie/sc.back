import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'clubs_tb'})
export class Club {

    // public static hashPassword(password: string): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.hash(password, 10, (err, hash) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(hash);
    //         });
    //     });
    // }

    // public static comparePassword(club: Club, password: string): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.compare(password, club.password, (err, res) => {
    //             resolve(res === true);
    //         });
    //     });
    // }

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column({name: 'main_place'})
    public mainPlace: string;

    @Column()
    public description: string;

    public toString(): string {
        return `${this.name}`;
    }

}
