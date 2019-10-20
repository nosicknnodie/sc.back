import { EntityRepository, Repository } from 'typeorm';

import { ClubUser } from '../models/ClubUser';

@EntityRepository(ClubUser)
export class ClubUserRepository extends Repository<ClubUser>  {

    public findByUserIds(idxs: string[]): Promise<ClubUser[]> {
        return this.createQueryBuilder()
            .select()
            .where(`"ClubUser"."user_idx" IN (${idxs.map(idx => `'${idx}'`).join(', ')})`)
            .getMany();
    }

    public findByClubIds(idxs: string[]): Promise<ClubUser[]> {
        return this.createQueryBuilder()
            .select()
            .where(`"ClubUser"."club_idx" IN (${idxs.map(idx => `'${idx}'`).join(', ')})`)
            .getMany();
    }
}
