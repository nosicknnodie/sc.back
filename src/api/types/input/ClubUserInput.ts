import { Field, InputType } from 'type-graphql';

import { ClubUser } from '../ClubUser';

@InputType()
export class ClubUserInput implements Partial<ClubUser> {

    @Field({ nullable: true })
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

    @Field({
        description: '클럽ID',
        nullable: true,
    })
    public clubIdx: string;

    @Field({
        description: '회원ID',
        nullable: true,
    })
    public userIdx: string;

}
