import { Field, ID, Int, ObjectType } from 'type-graphql';

import { Club } from './Club';

@ObjectType({
    description: 'ClubTeam object.',
})
export class ClubTeam {

    @Field(type => ID)
    public idx: string;

    @Field(type => Int, {
        description: '시퀀스',
    })
    public seq: number;

    @Field({
        description: '팀명',
        nullable: true,
    })
    public name: string;

    @Field(type => Date, {
        description: '생성시간',
        nullable: true,
    })
    public regDt: Date;

    @Field(type => Date, {
        description: '수정시간',
        nullable: true,
    })
    public edtDt: Date;

    @Field(type => Club, {
        description: '클럽',
        nullable: true,
    })
    public club: Club;

    public clubIdx: string;

}
