import { ClubTeamMem } from 'src/api/models/ClubTeamMem';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ClubTeamMemInput implements Partial<ClubTeamMem> {

    @Field({ nullable: true })
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

    @Field({
        description: '클럽팀ID',
        nullable: true,
    })
    public clubTeamIdx: string;

    @Field({
        description: '클럽회원ID',
        nullable: true,
    })
    public clubUserIdx: string;

}
