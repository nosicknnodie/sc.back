import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Club } from '../models/Club';
import { ClubRepository } from '../repositories/ClubRepository';
import { events } from '../subscribers/events';

@Service()
export class ClubService {

    constructor(
        @OrmRepository() private clubRepository: ClubRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Club[]> {
        this.log.info('Find all clubs');
        return this.clubRepository.find();
    }

    public findOne(id: string): Promise<Club | undefined> {
        this.log.info('Find one club');
        return this.clubRepository.findOne({ id });
    }

    public async create(club: Club): Promise<Club> {
        this.log.info('Create a new club => ', club.toString());
        club.id = uuid.v1();
        const newClub = await this.clubRepository.save(club);
        this.eventDispatcher.dispatch(events.club.created, newClub);
        return newClub;
    }

    public update(id: string, club: Club): Promise<Club> {
        this.log.info('Update a club');
        club.id = id;
        return this.clubRepository.save(club);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a club');
        await this.clubRepository.delete(id);
        return;
    }

}
