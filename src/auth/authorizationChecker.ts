import cookie from 'cookie';
import * as jwt from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import Container from 'typedi';
import { Connection } from 'typeorm';

import { UserToken } from '../api/models/UserToken';
import { UserTokenService } from '../api/services/UserTokenService';
import { env } from '../env';
import { Logger } from '../lib/logger';
import { AuthService, IpayLoad } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);
    const userTokenService = Container.get<UserTokenService>(UserTokenService);
    /**
     * [로그인 방식]
     * 1. 비밀번호 패스워드 DB 체크
     * 2. 1번 success 후 Access token, refresh token 생성
     * 3. Access token, refresh token 클라이언트 발송
     * 4. refresh token 인증 DB 저장
     */
    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        // 토큰
        if (!action.request.headers.cookie) { return false; }
        const cookies = cookie.parse(action.request.headers.cookie);
        const accessToken: string | undefined = cookies[env.jwt.accessName];
        // const token: string|undefined = action.request.cookies;
        let payload: IpayLoad;
        if (!accessToken) {
            // access token 이 없을 경우 refresh token 을 찾아본다.
            const refreshToken: string | undefined = cookies[env.jwt.refreshName];
            if (refreshToken) {
                try {
                    // refresh token 검증
                    payload = authService.verifyRefreshToken(refreshToken);
                    // db 검증
                    // log.debug('로그 1');
                    const token: UserToken = await userTokenService.findToken(payload._id, payload.hostName, refreshToken);
                    // log.debug('로그 2');
                    if (token) {    // 검증 완료
                        const _accessToken = authService.createAccessToken({
                            _id: payload._id,
                            email: payload.email,
                            name: payload.name,
                        });
                        // access cookie 생성
                        // log.debug('log 1');
                        authService.createAccessCookie(action.response, _accessToken);
                        // log.debug('log 2');
                    }
                } catch (err) {
                    log.error(err);
                    return false;
                }
            } else {
                return false;
            }
        } else {
            try {
                payload = jwt.verify(accessToken, env.jwt.secret) as IpayLoad;
            } catch (err) {
                log.error(err);
                return false;
            }
        }
        log.info('Successfully checked credentials');
        action.request.payload = payload;
        return true;
    };
}
