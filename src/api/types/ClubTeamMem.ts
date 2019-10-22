import { Field, ID, Int, ObjectType } from 'type-graphql';

import { ClubTeam } from './ClubTeam';
import { ClubUser } from './ClubUser';

@ObjectType({
    description: 'ClubTeamMem object.',
})
export class ClubTeamMem {

    @Field(type => ID)
    public idx: string;

    @Field({
        description: '이름',
    })
    public name: string;

    @Field(type => Int, {
        description: '등번호',
        nullable: true,
    })
    public num: number;

    @Field(type => Int, {
        description: 'X좌표',
        nullable: true,
    })
    public positionX: number;

    @Field(type => Int, {
        description: 'Y좌표',
        nullable: true,
    })
    public positionY: number;

    @Field(type => ClubTeam, {
        description: '클럽팀',
        nullable: true,
    })
    public clubTeam: ClubTeam;

    @Field(type => ClubUser, {
        description: '클럽회원',
        nullable: true,
    })
    public clubUser: ClubUser;

    public clubTeamIdx: string;
    public clubUserIdx: string;

}
