import DataLoader from 'dataloader';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Club as ClubModel } from '../models/Club';
import { ClubUser as ClubUserModel } from '../models/ClubUser';
import { User as UserModel } from '../models/User';
import { ClubUserService } from '../services/ClubUserService';
import { ClubUser } from '../types/ClubUser';
import { ClubUserInput } from '../types/input/ClubUserInput';

@Service()
@Resolver(of => ClubUser)
export class ClubUserResolver {

    constructor(
        private clubUserService: ClubUserService,
        @DLoader(UserModel, {key: 'idx'}) private userLoader: DataLoader<string, UserModel>,
        @DLoader(ClubModel, {key: 'idx'}) private clubLoader: DataLoader<string, ClubModel>
    ) {}

    @Query(returns => [ClubUser])
    public clubUsers(): Promise<any> {
      return this.clubUserService.find();
    }

    @Query(returns => ClubUser)
    public clubUser(@Arg('idx') idx: string): Promise<ClubUserModel | undefined> {
      return this.clubUserService.findOne(idx);
    }

    @Mutation(returns => ClubUser)
    public async addClubUser(@Arg('clubUser') clubUser: ClubUserInput): Promise<ClubUserModel> {
        return this.clubUserService.create(new ClubUserModel().trasforToModel(clubUser));
    }

    @Mutation(returns => ClubUser)
    public async editClubUser(@Arg('clubUser') clubUser: ClubUserInput): Promise<ClubUserModel> {
        return this.clubUserService.update(clubUser.idx, new ClubUserModel().trasforToModel(clubUser));
    }

    @FieldResolver()
    public async user(@Root() clubUser: ClubUserModel): Promise<any> {
        const idx = clubUser.userIdx;
        if (idx) {
            return this.userLoader.load(idx);
        }
    }

    @FieldResolver()
    public async club(@Root() clubUser: ClubUserModel): Promise<any> {
        const idx = clubUser.clubIdx;
        if (idx) {
            return this.clubLoader.load(idx);
        }
    }

}
