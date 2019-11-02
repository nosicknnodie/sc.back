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
        const token = action.request.headers['x-access-token'];
        let payload;

        if (!token) {
            log.warn('No token');
            return false;
        } else {
            try {
                payload = jwt.verify(token, env.jwt.secret);
            } catch (err) {
                log.error(err);
                return false;
            }
        }
        log.info('Successfully checked credentials');
        action.request.user = payload;
        return true;
        // const credentials = authService.parseBasicAuthFromRequest(action.request);

        // if (credentials === undefined) {
        //     log.warn('No credentials given');
        //     return false;
        // }

        // action.request.user = await authService.validateUser(credentials.username, credentials.password);
        // if (action.request.user === undefined) {
        //     log.warn('Invalid credentials given');
        //     return false;
        // }
    };
}
