import {
    Authorized, Body, Delete, JsonController, Param, Post, Put, UploadedFile, UploadedFiles
} from 'routing-controllers';

import { Logger } from '../../decorators/Logger';
import { LoggerInterface } from '../../lib/logger';
import { fileOptions } from '../../lib/multer/utils';
import { UploadFile } from '../models/UploadFile';
import { UploadFileService } from '../services/UploadFileService';

@Authorized()
@JsonController('/upload')
export class UploadFileController {

    constructor(
        private uploadFileService: UploadFileService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    @Post('/file')
    public upload(@UploadedFile('files', {options: fileOptions}) file: Express.Multer.File): any {
        this.log.debug(``);
        this.log.debug(`fileName : ${file && file.filename}`);
        return { result: 'ok' };
    }

    @Post('/files')
    public uploads(@UploadedFiles('files', {options: fileOptions}) files: Express.Multer.File[]): any {
        this.log.debug(``);
        this.log.debug(`fileName[0] : ${files && files[0].filename}`);
        this.log.debug(`fileName[1] : ${files && files[1].filename}`);
        return { result: 'ok' };
    }

    @Put('/:idx')
    public update(@Param('idx') idx: string, @Body() uploadFile: UploadFile): Promise<UploadFile> {
        return this.uploadFileService.update(idx, uploadFile);
    }

    @Delete('/:idx')
    public delete(@Param('idx') idx: string): Promise<void> {
        return this.uploadFileService.delete(idx);
    }

}
