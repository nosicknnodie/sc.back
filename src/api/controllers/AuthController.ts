import * as jwt from 'jsonwebtoken';
import { Body, BodyParam, JsonController, Post, Res } from 'routing-controllers';

import { AuthService } from '../../auth/AuthService';
import { env } from '../../env';
import { User } from '../models/User';
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
    public async login(@Body() user: User, @BodyParam('hostName') hostName: string, @Res() res: Response): Promise<User> {

        // 1. email, password 받아서 회원이 있는지 여부 확인.
        const authUser: User|undefined = await this.authService.validateUser(user.email, user.password);

        if (authUser) {
            // 2. access token 생성
            const payload = {
                _id: authUser.idx,
                email: authUser.email,
                name: authUser.name,
            };
            let options = {
                algorithm: 'RS256',
                exp: Math.floor(Date.now() / 1000) + (60),
            };
            const accessToken = jwt.sign(payload, env.jwt.secret, options);
            res.headers.set('x-access-token', accessToken);

            // 3. refresh token 생성
            options = {
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12 * 14),   // 기간 2주
            };
            const refreshToken = jwt.sign(payload, env.jwt.secret, options);

            // 4. refresh token db 저장
            await this.userTokenService.findToken(authUser.idx, hostName, refreshToken);
        }

        return authUser;
    }
}
