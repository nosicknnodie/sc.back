import { Action } from 'routing-controllers';
import Container from 'typedi';
import { Connection } from 'typeorm';

import { User } from '../api/models/User';
import { UserService } from '../api/services/UserService';
import { Logger } from '../lib/logger';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = new Logger(__filename);
    const userService = Container.get<UserService>(UserService);
    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        const _id = action.request.payload._id;
        log.debug(`_id - ${_id}`);
        return _id ? userService.findOne(_id) : undefined;
    };
}
