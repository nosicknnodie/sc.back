import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'Club object.',
})
export class Club {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the club.',
    })
    public name: string;

    @Field({
        description: 'The main place of the club.',
    })
    public mainPlace: string;

    @Field({
        description: 'The description of the club.',
    })
    public description: string;

}
