import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { UserToken } from '../models/UserToken';
import { UserTokenRepository } from '../repositories/UserTokenRepository';

@Service()
export class UserTokenService {

    constructor(
        @OrmRepository() private userTokenRepository: UserTokenRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(idx: string): Promise<UserToken | undefined> {
        this.log.info('Find one userToken');
        return this.userTokenRepository.findOne({ idx });
    }

    public findToken(userIdx: string, hostName: string, token: string): Promise<UserToken | undefined> {
        return this.userTokenRepository.findOneOrFail({ userIdx, hostName, token});
    }

    public async create(userToken: UserToken): Promise<UserToken | undefined> {
        // user_idx, hostName 비교하여 있으면 수정 없으면 생성
        const currentToken = await this.userTokenRepository.findOneOrFail({ userIdx: userToken.userIdx, hostName: userToken.hostName });
        if (currentToken) { userToken.idx = currentToken.idx; } else { userToken.idx = uuid.v1(); }
        this.log.info('Create a new userToken => ', userToken.toString());
        return this.userTokenRepository.save(userToken);
    }

    public update(idx: string, userToken: UserToken): Promise<UserToken> {
        this.log.info('Update a userToken');
        userToken.idx = idx;
        return this.userTokenRepository.save(userToken);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a userToken');
        await this.userTokenRepository.delete(idx);
        return;
    }

}
