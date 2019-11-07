import { Response } from 'express';
import {
    Authorized, BodyParam, CurrentUser, Get, JsonController, OnUndefined, Post, Res
} from 'routing-controllers';

import { AuthService } from '../../auth/AuthService';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { NotFoundError } from '../errors/NotFoundError';
import { User } from '../models/User';
import { UserToken } from '../models/UserToken';
import { UserTokenService } from '../services/UserTokenService';

@JsonController('/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        // private userService: UserService,
        private userTokenService: UserTokenService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    @Authorized()
    @Get('/login')
    public checkLogin(@CurrentUser({ required: true }) user: User): User {
        return user;
    }

    /**
     * 로그인 (토큰 생성 및 저장)
     * @param user 로그인 정보
     * @param res 헤더저장
     */
    @Post('/login')
    @OnUndefined(NotFoundError)
    public async login(@BodyParam('email') email: string, @BodyParam('password') password: string, @BodyParam('hostName') hostName: string, @Res() res: Response): Promise<User | undefined> {

        // 1. email, password 받아서 회원이 있는지 여부 확인.
        const authUser: User|undefined = await this.authService.validateUser(email, password);
        if (authUser) {
            // 2. access token 생성
            const accessPayload = {
                _id: authUser.idx,
                email: authUser.email,
                name: authUser.name,
            };
            const accessToken = this.authService.createAccessToken(accessPayload);

            const refreshPayload = {
                _id: authUser.idx,
                email: authUser.email,
                name: authUser.name,
                hostName,
            };
            // 3. refresh token 생성
            const refreshToken = this.authService.createRefreshToken(refreshPayload);

            // 4. refresh token db 저장
            // this.log.debug('login 1');
            const userToken = new UserToken();
            userToken.userIdx = authUser.idx;
            userToken.hostName = hostName;
            userToken.token = refreshToken;
            // this.log.debug('login 2');
            try {
                await this.userTokenService.create(userToken);
                // this.log.debug('login 3');
                // await this.userTokenService.findToken(authUser.idx, hostName, refreshToken);
                // 5. cookie access token 저장
                this.authService.createAccessCookie(res, accessToken);
                // this.log.debug('login 4');
                // 6. cookie refresh token 저장
                this.authService.createRefreshCookie(res, refreshToken);
                // this.log.debug('login 5');
            } catch (err) {
                this.log.error(err);
            }
        }

        return authUser;
    }
}
