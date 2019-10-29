import * as jwt from 'jsonwebtoken';
import { Body, JsonController, Post, Res } from 'routing-controllers';

import { AuthService } from '../../auth/AuthService';
import { env } from '../../env';
import { User } from '../models/User';

@JsonController('/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post()
    public async login(@Body() user: User, @Res() res: Response): Promise<User> {

        // 1. email, password 받아서 회원이 있는지 여부 확인.
        const authUser: User|undefined = await this.authService.validateUser(user.email, user.password);

        if (authUser) {
            // 2. access token 생성
            const payload = {
                _id: authUser.idx,
                email: authUser.email,
                name: authUser.name,
            };
            const options = {
                algorithm: 'RS256',
                exp: Math.floor(Date.now() / 1000) + (60),
            };
            const accessToken = jwt.sign(payload, env.jwt.secret, options);
            res.headers.set('x-access-token', accessToken);

            // 3. refresh token 생성
            // const refreshToken = jwt.sign(payload, env.jwt.secret, options);

            // 4. refresh token db 저장
        }

        return authUser;
    }
}
