import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';

export interface IpayLoad {
    _id: string;
    email: string;
    name: string;
    hostName?: string;
}

@Service()
export class AuthService {
    // access options
    private accessOptions = {
        expiresIn: '1h',
    };
    // refresh options
    private refreshOptions = {
        expiresIn: '14d',   // 기간 2주
    };

    private accessCookieOptions = {
        expires: new Date(Date.now() + (60 * 60 * 1000)),
        httpOnly: true,
    };

    private refreshCookieOptions = {
        expires: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)),
        httpOnly: true,
    };

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository
    ) {
    }

    /**
     * [access token 발급 로직]
     */
    public createAccessToken(payload: IpayLoad): string {
        return jwt.sign(payload, env.jwt.secret, this.accessOptions);
    }

    /**
     * [refresh token 발급]
     * @param payload 토큰정보
     */
    public createRefreshToken(payload: IpayLoad): string {
        return jwt.sign(payload, env.jwt.secret, this.refreshOptions);
    }

    /**
     * [access token 검증]
     * @param token accesstoken
     */
    public verifyAccessToken(token: string): IpayLoad {
        return jwt.verify(token, env.jwt.secret) as IpayLoad;
    }

    /**
     * [refresh token 검증]
     * @param token refreshtoken
     */
    public verifyRefreshToken(token: string): IpayLoad {
        return jwt.verify(token, env.jwt.secret) as IpayLoad;
    }

    /**
     * [access cookie 생성]
     * @param res response
     * @param token access token
     */
    public createAccessCookie(res: express.Response, token: string): void {
        res.cookie(env.jwt.accessName, token, this.accessCookieOptions);
    }

    /**
     * [refresh cookie 생성]
     * @param res response
     * @param token refresh token
     */
    public createRefreshCookie(res: express.Response, token: string): void {
        res.cookie(env.jwt.refreshName, token, this.refreshCookieOptions);
    }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async validateUser(email: string, password: string): Promise<User> {
        const findUser = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (findUser && await User.comparePassword(findUser, password)) {
            return findUser;
        }

        return undefined;
    }

}
