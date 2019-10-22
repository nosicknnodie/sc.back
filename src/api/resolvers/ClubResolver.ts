import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Club as ClubModel } from '../models/Club';
import { ClubTeam as ClubTeamModel } from '../models/ClubTeam';
import { ClubUser as ClubUserModel } from '../models/ClubUser';
import { ClubTeamRepository } from '../repositories/ClubTeamRepository';
import { ClubUserRepository } from '../repositories/ClubUserRepository';
import { ClubService } from '../services/ClubService';
import { Club } from '../types/Club';
import { ClubInput } from '../types/input/ClubInput';

import DataLoader = require('dataloader');

@Service()
@Resolver(of => Club)
export class ClubResolver {

    constructor(
        private clubService: ClubService,
        @DLoader(ClubUserRepository, {key: 'clubIdx', multiple: true, method: 'findByClubIds'}) private clubUserLoader: DataLoader<string, ClubUserModel>,
        @DLoader(ClubTeamRepository, {key: 'clubIdx', multiple: true, method: 'findByClubIds'}) private clubTeamLoader: DataLoader<string, ClubTeamModel>
    ) {}

    @Query(returns => [Club])
    public clubs(): Promise<any> {
      return this.clubService.find();
    }

    @Query(returns => Club)
    public club(@Arg('idx') idx: string): Promise<ClubModel | undefined> {
      return this.clubService.findOne(idx);
    }

    @FieldResolver()
    public async clubUsers(@Root() club: ClubModel): Promise<any> {
        return this.clubUserLoader.load(club.idx);
        // return this.petService.findByUser(user);
    }
    @FieldResolver()
    public async clubTeams(@Root() club: ClubModel): Promise<any> {
        return this.clubTeamLoader.load(club.idx);
        // return this.petService.findByUser(user);
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
