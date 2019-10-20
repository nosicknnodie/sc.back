import { Field, ID, ObjectType } from 'type-graphql';

import { Club } from './Club';
import { User } from './User';

@ObjectType({
    description: 'ClubUser object.',
})
export class ClubUser {

    @Field(type => ID)
    public idx: string;

    @Field({
        description: '회원명',
    })
    public userName: string;

    @Field({
        description: '직책/직급',
    })
    public jobTitle: string;

    @Field({
        description: '잘하는포지션',
        nullable: true,
    })
    public hbPosition: string;

    @Field({
        description: '보조포지션',
        nullable: true,
    })
    public sbPosition: string;

    @Field(type => User, {
        description: '유저',
        nullable: true,
    })
    public user: User;

    @Field(type => Club, {
        description: '클럽',
        nullable: true,
    })
    public club: Club;

    public userIdx: string;
    public clubIdx: string;

}
