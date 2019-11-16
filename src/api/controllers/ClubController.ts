import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam
} from 'routing-controllers';

import { Logger } from '../../decorators/Logger';
import { LoggerInterface } from '../../lib/logger';
import { NotFoundError } from '../errors/NotFoundError';
import { Club } from '../models/Club';
import { ClubService } from '../services/ClubService';

@Authorized()
@JsonController('/clubs')
export class ClubController {

    constructor(
        private clubService: ClubService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    @Get()
    public find(@QueryParam('qr') qr: string): Promise<[Club[], number]> {
        this.log.debug('finded ! ');
        return this.clubService.finds(qr);
    }

    @Get('/:idx')
    @OnUndefined(NotFoundError)
    public one(@Param('idx') idx: string): Promise<Club | undefined> {
        return this.clubService.findOne(idx);
    }

    @Post()
    public create(@Body() club: Club): Promise<Club> {
        return this.clubService.create(club);
    }

    @Put('/:idx')
    public update(@Param('idx') idx: string, @Body() club: Club): Promise<Club> {
        return this.clubService.update(idx, club);
    }

    @Delete('/:idx')
    public delete(@Param('idx') idx: string): Promise<void> {
        return this.clubService.delete(idx);
    }

}
