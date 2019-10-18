import { Field, InputType } from 'type-graphql';

import { User } from '../User';

@InputType()
export class UserInput implements Partial<User> {

    @Field({ nullable: true })
    public idx: string;

    @Field({
        description: '이름을 적어주세요.',
        nullable: true,
    })
    public name: string;

    @Field({
        description: '암호를 적어주세요',
        nullable: true,
    })
    public password: string;

    @Field({
        description: '이메일을 적어주세요',
        nullable: true,
    })
    public email: string;

    @Field({
        description: '영문이름을 적어주세요',
        nullable: true,
    })
    public enName: string;

    @Field({
        description: '옷에 적힐 이름을 적어주세요',
        nullable: true,
    })
    public clName: string;

    @Field({
        description: '옷 상의 사이즈를 입력해주세요',
        nullable: true,
    })
    public clTopSize: string;

    @Field({
        description: '하의 사이즈를 입력해주세요',
        nullable: true,
    })
    public clBtmSize: string;

    @Field({
        description: '생년월일을 입력해주세요',
        nullable: true,
    })
    public bothDt: Date;

    @Field({
        description: '선호포지션을 적어주세요 필수항목아님',
        nullable: true,
    })
    public pfPosition: string;
}
