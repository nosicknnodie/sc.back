import { Service } from 'typedi';
import { Like } from 'typeorm';
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

    public findOne(idx: string): Promise<Club | undefined> {
        this.log.info('Find one club');
        return this.clubRepository.findOne({ idx });
    }

    public finds(qr: string): Promise<[Club[], number]> {
        this.log.info('Find Search Club');
        return this.clubRepository.findAndCount({ where : [{name: Like(`%${qr}%`)}, {area: Like(`%${qr}%`)}]});
    }

    public async create(club: Club): Promise<Club> {
        club.idx = uuid.v1();
        this.log.info('Create a new club => ', club.toString());
        const newClub = await this.clubRepository.save(club);
        this.eventDispatcher.dispatch(events.club.created, newClub);
        return newClub;
    }

    public update(idx: string, club: Club): Promise<Club> {
        this.log.info('Update a club');
        club.idx = idx;
        // club.edtDt = new Date(Date.now());
        return this.clubRepository.save(club);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a club');
        await this.clubRepository.delete(idx);
        return;
    }

}
