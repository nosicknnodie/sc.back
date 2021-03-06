import { Field, ID, ObjectType } from 'type-graphql';

import { ClubUser } from './ClubUser';
import { Pet } from './Pet';

@ObjectType({
    description: 'User object.',
})
export class User {

    @Field(type => ID)
    public idx: string;

    @Field({
        description: '회원명',
    })
    public name: string;

    @Field({
        description: '이메일',
    })
    public email: string;
    @Field({
        description: '영문이름',
    })
    public enName: string;
    @Field({
        description: '유니폼이름',
        nullable: true,
    })
    public clName: string;
    @Field({
        description: '유니폼 상의 사이즈',
        nullable: true,
    })
    public clTopSize: string;
    @Field({
        description: '유니폼 하의 사이즈',
        nullable: true,
    })
    public clBtmSize: string;
    @Field({
        description: '생년월일',
    })
    public bothDt: Date;
    @Field({
        description: '선호포지션(필수아님)',
        nullable: true,
    })
    public pfPosition: string;

    @Field(type => [Pet], {
        description: '유저에 대한 펫리스트',
        // nullable: true,
    })
    public pets: Pet[];

    @Field(type => [ClubUser], {
        description: '유저에 대한 펫리스트',
        // nullable: true,
    })
    public clubUsers: ClubUser;

    public password: string;

}
