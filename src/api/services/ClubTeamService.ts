import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ClubTeam } from '../models/ClubTeam';
import { ClubTeamRepository } from '../repositories/ClubTeamRepository';
import { events } from '../subscribers/events';

@Service()
export class ClubTeamService {

    constructor(
        @OrmRepository() private clubTeamRepository: ClubTeamRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<ClubTeam[]> {
        this.log.info('Find all clubTeams');
        return this.clubTeamRepository.find();
    }

    public findOne(idx: string): Promise<ClubTeam | undefined> {
        this.log.info('Find one clubTeam');
        return this.clubTeamRepository.findOne({ idx });
    }

    public async create(clubTeam: ClubTeam): Promise<ClubTeam> {
        clubTeam.idx = uuid.v1();
        this.log.info('Create a new clubTeam => ', clubTeam.toString());
        const chkClubTeam = await this.clubTeamRepository.findByClubCheckId(clubTeam.clubIdx);
        if (chkClubTeam) {
            clubTeam.seq = chkClubTeam.seq + 1;
        } else {
            clubTeam.seq = 1;
        }
        const newClubTeam = await this.clubTeamRepository.save(clubTeam);
        this.eventDispatcher.dispatch(events.clubTeam.created, newClubTeam);
        return newClubTeam;
    }

    public update(idx: string, clubTeam: ClubTeam): Promise<ClubTeam> {
        this.log.info('Update a clubTeam');
        clubTeam.idx = idx;
        // clubTeam.edtDt = new Date(Date.now());
        return this.clubTeamRepository.save(clubTeam);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a clubTeam');
        await this.clubTeamRepository.delete(idx);
        return;
    }

}
