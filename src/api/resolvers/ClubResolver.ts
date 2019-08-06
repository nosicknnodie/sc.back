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
    ) {}

    @Query(returns => [Club])
    public clubs(): Promise<any> {
      return this.clubService.find();
    }

    @Mutation(returns => Club)
    public async addClub(@Arg('club') club: ClubInput): Promise<ClubModel> {
        const newClub = new ClubModel();
        newClub.name = club.name;
        newClub.mainPlace = club.mainPlace;
        newClub.description = club.description;
        return this.clubService.create(newClub);
    }
}
