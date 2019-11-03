import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { BodyParam, JsonController, Post, Res } from 'routing-controllers';

import { AuthService } from '../../auth/AuthService';
import { env } from '../../env';
import { User } from '../models/User';
import { UserToken } from '../models/UserToken';
import { UserTokenService } from '../services/UserTokenService';

@JsonController('/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userTokenService: UserTokenService
    ) { }

    /**
     * 로그인 (토큰 생성 및 저장)
     * @param user 로그인 정보
     * @param res 헤더저장
     */
    @Post()
    public async login(@BodyParam('email') email: string, @BodyParam('password') password: string, @BodyParam('hostName') hostName: string, @Res() res: Response): Promise<User> {

        // 1. email, password 받아서 회원이 있는지 여부 확인.
        const authUser: User|undefined = await this.authService.validateUser(email, password);
        if (authUser) {
            // 2. access token 생성
            const payload = {
                _id: authUser.idx,
                email: authUser.email,
                name: authUser.name,
            };
            const accessToken = jwt.sign(payload, env.jwt.secret, {
                expiresIn: '1h',
            });
            // res.header.set('x-access-token', accessToken);

            // 3. refresh token 생성
            const refreshToken = jwt.sign(payload, env.jwt.secret, {
                algorithm: 'HS256',
                expiresIn: '14d',   // 기간 2주
            });

            // 4. refresh token db 저장
            const userToken = new UserToken();
            userToken.userIdx = authUser.idx;
            userToken.hostName = hostName;
            userToken.token = refreshToken;
            await this.userTokenService.create(userToken);
            // await this.userTokenService.findToken(authUser.idx, hostName, refreshToken);

            // 5. cookie access token 저장
            res.cookie(env.jwt.accessName, accessToken, {
                expires: new Date(Date.now() + (60 * 60 * 1000)),
                httpOnly: true,
            });
            // 6. cookie refresh token 저장
            res.cookie(env.jwt.refreshName, refreshToken, {
                expires: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)),
                httpOnly: true,
            });
        }

        return authUser;
    }
}
