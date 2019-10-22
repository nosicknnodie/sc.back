import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Club as ClubModel } from '../models/Club';
import { ClubTeam as ClubTeamModel } from '../models/ClubTeam';
import { ClubRepository } from '../repositories/ClubRepository';
import { ClubTeamService } from '../services/ClubTeamService';
import { ClubTeam } from '../types/ClubTeam';
import { ClubTeamInput } from '../types/input/ClubTeamInput';

import DataLoader = require('dataloader');

@Service()
@Resolver(of => ClubTeam)
export class ClubTeamResolver {

    constructor(
        private clubTeamService: ClubTeamService,
        @DLoader(ClubRepository, {key: 'idx'}) private clubLoader: DataLoader<string, ClubModel>
    ) {}

    @Query(returns => [ClubTeam])
    public clubTeams(): Promise<any> {
      return this.clubTeamService.find();
    }

    @Query(returns => ClubTeam)
    public clubTeam(@Arg('idx') idx: string): Promise<ClubTeamModel | undefined> {
      return this.clubTeamService.findOne(idx);
    }

    @FieldResolver()
    public async club(@Root() club: ClubModel): Promise<any> {
        return this.clubLoader.load(club.idx);
        // return this.petService.findByUser(user);
    }

    @Mutation(returns => ClubTeam)
    public async addClubTeam(@Arg('clubTeam') clubTeam: ClubTeamInput): Promise<ClubTeamModel> {
        return this.clubTeamService.create(new ClubTeamModel().trasforToModel(clubTeam));
    }

    @Mutation(returns => ClubTeam)
    public async editClubTeam(@Arg('clubTeam') clubTeam: ClubTeamInput): Promise<ClubTeamModel> {
        return this.clubTeamService.update(clubTeam.idx, new ClubTeamModel().trasforToModel(clubTeam));
    }
}
