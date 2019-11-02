import { EntityRepository, Repository } from 'typeorm';

import { UserToken } from '../models/UserToken';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken>  {

}
