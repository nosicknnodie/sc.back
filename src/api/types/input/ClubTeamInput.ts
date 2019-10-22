import { Field, InputType, Int } from 'type-graphql';

import { ClubTeam } from '../ClubTeam';

@InputType()
export class ClubTeamInput implements Partial<ClubTeam> {

    @Field({ nullable: true })
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

    @Field({
        description: '클럽ID',
        nullable: true,
    })
    public clubIdx: string;

}
