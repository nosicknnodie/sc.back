import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ClubUser } from '../models/ClubUser';
import { ClubUserRepository } from '../repositories/ClubUserRepository';
import { events } from '../subscribers/events';

@Service()
export class ClubUserService {

    constructor(
        @OrmRepository() private clubUserRepository: ClubUserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<ClubUser[]> {
        this.log.info('Find all clubUsers');
        return this.clubUserRepository.find();
    }

    public findOne(idx: string): Promise<ClubUser | undefined> {
        this.log.info('Find one clubUser');
        return this.clubUserRepository.findOne({ idx });
    }

    public async create(clubUser: ClubUser): Promise<ClubUser> {
        clubUser.idx = uuid.v1();
        this.log.info('Create a new clubUser => ', clubUser.toString());
        const newClubUser = await this.clubUserRepository.save(clubUser);
        this.eventDispatcher.dispatch(events.clubUser.created, newClubUser);
        return newClubUser;
    }

    public update(idx: string, clubUser: ClubUser): Promise<ClubUser> {
        this.log.info('Update a clubUser');
        clubUser.idx = idx;
        return this.clubUserRepository.save(clubUser);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a clubUser');
        await this.clubUserRepository.delete(idx);
        return;
    }

}
