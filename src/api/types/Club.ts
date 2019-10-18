import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'Club object.',
})
export class Club {

    @Field(type => ID)
    public idx: string;

    @Field({
        description: '클럽명',
    })
    public name: string;

    @Field({
        description: 'The main area of the club.',
        nullable: true,
    })
    public area: string;

    @Field({
        description: 'The title of the club.',
        nullable: true,
    })
    public title: string;

    @Field({
        description: 'The title of the club.',
        nullable: true,
    })
    public description: string;

}
