import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find();
    }

    public findOne(idx: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ idx });
    }

    public async create(user: User): Promise<User | undefined> {
        user.idx = uuid.v1();
        this.log.info('Create a new user => ', user.toString());
        const usered = await this.userRepository.findOne({ email: user.email });
        if (usered === undefined) {
            const newUser = await this.userRepository.save(user);
            this.eventDispatcher.dispatch(events.user.created, newUser);
            return newUser;
        }
        return usered;
    }

    public update(idx: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.idx = idx;
        return this.userRepository.save(user);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(idx);
        return;
    }

}
