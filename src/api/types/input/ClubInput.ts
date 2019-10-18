import { Field, InputType } from 'type-graphql';

import { Club } from '../Club';

@InputType()
export class ClubInput implements Partial<Club> {

    @Field({ nullable: true })
    public idx: string;

    @Field()
    public name: string;

    @Field({
        description: '클럽 지역',
        nullable: true,
    })
    public area?: string;

    @Field({
        description: '클럽 소개 제목',
        nullable: true,
    })
    public title: string;

    @Field({
        description: '클럽에 대한 설명',
        nullable: true,
    })
    public description: string;

}
