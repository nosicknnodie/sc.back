import { EntityRepository, Repository } from 'typeorm';

import { ClubTeamMem } from '../models/ClubTeamMem';

@EntityRepository(ClubTeamMem)
export class ClubTeamMemRepository extends Repository<ClubTeamMem>  {

}
