import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ClubTeamMem } from '../models/ClubTeamMem';
import { ClubTeamMemRepository } from '../repositories/ClubTeamMemRepository';
import { events } from '../subscribers/events';

@Service()
export class ClubTeamMemService {

    constructor(
        @OrmRepository() private clubTeamMemRepository: ClubTeamMemRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<ClubTeamMem[]> {
        this.log.info('Find all clubTeamMems');
        return this.clubTeamMemRepository.find();
    }

    public findOne(idx: string): Promise<ClubTeamMem | undefined> {
        this.log.info('Find one clubTeamMem');
        return this.clubTeamMemRepository.findOne({ idx });
    }

    public async create(clubTeamMem: ClubTeamMem): Promise<ClubTeamMem> {
        clubTeamMem.idx = uuid.v1();
        this.log.info('Create a new clubTeamMem => ', clubTeamMem.toString());
        const newClubTeamMem = await this.clubTeamMemRepository.save(clubTeamMem);
        this.eventDispatcher.dispatch(events.clubTeamMem.created, newClubTeamMem);
        return newClubTeamMem;
    }

    public update(idx: string, clubTeamMem: ClubTeamMem): Promise<ClubTeamMem> {
        this.log.info('Update a clubTeamMem');
        clubTeamMem.idx = idx;
        // clubTeamMem.edtDt = new Date(Date.now());
        return this.clubTeamMemRepository.save(clubTeamMem);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a clubTeamMem');
        await this.clubTeamMemRepository.delete(idx);
        return;
    }

}
