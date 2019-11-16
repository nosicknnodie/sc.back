import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { UploadFile } from '../models/UploadFile';
import { UploadFileRepository } from '../repositories/UploadFileRepository';
import { events } from '../subscribers/events';

@Service()
export class UploadFileService {

    constructor(
        @OrmRepository() private uploadFileRepository: UploadFileRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<UploadFile[]> {
        this.log.info('Find all uploadFiles');
        return this.uploadFileRepository.find();
    }

    public findOne(idx: string): Promise<UploadFile | undefined> {
        this.log.info('Find one uploadFile');
        return this.uploadFileRepository.findOne({ idx });
    }

    public finds(qr: string): Promise<[UploadFile[], number]> {
        this.log.info('Find Search UploadFile');
        return this.uploadFileRepository.findAndCount({ where : [{name: Like(`%${qr}%`)}, {area: Like(`%${qr}%`)}]});
    }

    public async create(uploadFile: UploadFile): Promise<UploadFile> {
        uploadFile.idx = uuid.v1();
        this.log.info('Create a new uploadFile => ', uploadFile.toString());
        const newUploadFile = await this.uploadFileRepository.save(uploadFile);
        this.eventDispatcher.dispatch(events.uploadFile.created, newUploadFile);
        return newUploadFile;
    }

    public update(idx: string, uploadFile: UploadFile): Promise<UploadFile> {
        this.log.info('Update a uploadFile');
        uploadFile.idx = idx;
        // uploadFile.edtDt = new Date(Date.now());
        return this.uploadFileRepository.save(uploadFile);
    }

    public async delete(idx: string): Promise<void> {
        this.log.info('Delete a uploadFile');
        await this.uploadFileRepository.delete(idx);
        return;
    }

}
