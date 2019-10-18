import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { NotFoundError } from '../errors/NotFoundError';
import { Club } from '../models/Club';
import { ClubService } from '../services/ClubService';

@Authorized()
@JsonController('/clubs')
export class ClubController {

    constructor(
        private clubService: ClubService
    ) { }

    @Get()
    public find(): Promise<Club[]> {
        return this.clubService.find();
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
