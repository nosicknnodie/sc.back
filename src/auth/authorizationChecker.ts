import cookie from 'cookie';
import * as jwt from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { env } from '../env';
import { Logger } from '../lib/logger';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    // const authService = Container.get<AuthService>(AuthService);
    /**
     * [로그인 방식]
     * 1. 비밀번호 패스워드 DB 체크
     * 2. 1번 success 후 Access token, refresh token 생성
     * 3. Access token, refresh token 클라이언트 발송
     * 4. refresh token 인증 DB 저장
     */

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        // 토큰
        const cookies = cookie.parse(action.request.headers.cookie);
        const accessToken: string|undefined = cookies[env.jwt.accessName];
        // const token: string|undefined = action.request.cookies;
        log.debug('token : ' + accessToken);
        let payload;

        if (!accessToken) {
            log.warn('No token');
            // const refreshToken: string | undefined = cookies[env.jwt.refreshName];
            return false;
        } else {
            try {
                payload = jwt.verify(accessToken, env.jwt.secret);
            } catch (err) {
                log.error(err);
                return false;
            }
        }
        log.info('Successfully checked credentials');
        action.request.user = payload;
        return true;
    };
}
