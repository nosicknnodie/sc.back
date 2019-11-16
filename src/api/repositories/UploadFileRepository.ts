import { EntityRepository, Repository } from 'typeorm';

import { UploadFile } from '../models/UploadFile';

@EntityRepository(UploadFile)
export class UploadFileRepository extends Repository<UploadFile>  {
}
