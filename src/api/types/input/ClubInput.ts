import { Field, InputType } from 'type-graphql';

import { Club } from '../Club';

@InputType()
export class ClubInput implements Partial<Club> {

    @Field()
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
