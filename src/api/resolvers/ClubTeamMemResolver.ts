import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { ClubTeam as ClubTeamModel } from '../models/ClubTeam';
import { ClubTeamMem as ClubTeamMemModel } from '../models/ClubTeamMem';
import { ClubUser as ClubUserModel } from '../models/ClubUser';
import { ClubTeamRepository } from '../repositories/ClubTeamRepository';
import { ClubUserRepository } from '../repositories/ClubUserRepository';
import { ClubTeamMemService } from '../services/ClubTeamMemService';
import { ClubTeamMem } from '../types/ClubTeamMem';
import { ClubTeamMemInput } from '../types/input/ClubTeamMemInput';

import DataLoader = require('dataloader');

@Service()
@Resolver(of => ClubTeamMem)
export class ClubTeamMemResolver {

    constructor(
        private clubTeamMemService: ClubTeamMemService,
        @DLoader(ClubTeamRepository, {key: 'idx'}) private clubTeamLoader: DataLoader<string, ClubTeamModel>,
        @DLoader(ClubUserRepository, {key: 'idx'}) private clubUserLoader: DataLoader<string, ClubUserModel>
    ) {}

    @Query(returns => [ClubTeamMem])
    public clubTeamMems(): Promise<any> {
      return this.clubTeamMemService.find();
    }

    @Query(returns => ClubTeamMem)
    public clubTeamMem(@Arg('idx') idx: string): Promise<ClubTeamMemModel | undefined> {
      return this.clubTeamMemService.findOne(idx);
    }

    @FieldResolver()
    public async clubTeam(@Root() clubTeamMem: ClubTeamMemModel): Promise<any> {
        return this.clubTeamLoader.load(clubTeamMem.clubTeamIdx);
        // return this.petService.findByUser(user);
    }

    @FieldResolver()
    public async clubUser(@Root() clubTeamMem: ClubTeamMemModel): Promise<any> {
        return this.clubUserLoader.load(clubTeamMem.clubUserIdx);
        // return this.petService.findByUser(user);
    }

    @Mutation(returns => ClubTeamMem)
    public async addClubTeamMem(@Arg('clubTeamMem') clubTeamMem: ClubTeamMemInput): Promise<ClubTeamMemModel> {
        return this.clubTeamMemService.create(new ClubTeamMemModel().trasforToModel(clubTeamMem));
    }

    @Mutation(returns => ClubTeamMem)
    public async editClubTeamMem(@Arg('clubTeamMem') clubTeamMem: ClubTeamMemInput): Promise<ClubTeamMemModel> {
        return this.clubTeamMemService.update(clubTeamMem.idx, new ClubTeamMemModel().trasforToModel(clubTeamMem));
    }
}
