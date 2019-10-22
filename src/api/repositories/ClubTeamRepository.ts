import { EntityRepository, Repository } from 'typeorm';

import { ClubTeam } from '../models/ClubTeam';

@EntityRepository(ClubTeam)
export class ClubTeamRepository extends Repository<ClubTeam>  {
    public findByClubIds(idxs: string[]): Promise<ClubTeam[]> {
        return this.createQueryBuilder()
            .select()
            .where(`"ClubTeam"."club_idx" IN (${idxs.map(idx => `'${idx}'`).join(', ')})`)
            .getMany();
    }

    public findByClubCheckId(clubIdx: string): Promise<ClubTeam> {
        return this.createQueryBuilder()
            .select()
            .where({ clubIdx })
            .orderBy('seq', 'DESC')
            .getOne();
    }

}
