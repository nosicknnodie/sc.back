import { EntityRepository, Repository } from 'typeorm';

import { Club } from '../models/Club';

@EntityRepository(Club)
export class ClubRepository extends Repository<Club>  {
}
