import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Club as ClubModel } from '../models/Club';
import { ClubService } from '../services/ClubService';
import { Club } from '../types/Club';
import { ClubInput } from '../types/input/ClubInput';

@Service()
@Resolver(of => Club)
export class ClubResolver {

    constructor(
        private clubService: ClubService
        // @Logger(__filename) private log: LoggerInterface
    ) {}

    @Query(returns => [Club])
    public clubs(): Promise<any> {
      return this.clubService.find();
    }

    @Query(returns => Club)
    public club(@Arg('idx') idx: string): Promise<ClubModel | undefined> {
      return this.clubService.findOne(idx);
    }

    @Mutation(returns => Club)
    public async addClub(@Arg('club') club: ClubInput): Promise<ClubModel> {
        return this.clubService.create(new ClubModel().trasforToModel(club));
    }

    @Mutation(returns => Club)
    public async editClub(@Arg('club') club: ClubInput): Promise<ClubModel> {
        return this.clubService.update(club.idx, new ClubModel().trasforToModel(club));
    }
}
