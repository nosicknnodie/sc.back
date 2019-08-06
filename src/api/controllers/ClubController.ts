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

    @Get('/:id')
    @OnUndefined(NotFoundError)
    public one(@Param('id') id: string): Promise<Club | undefined> {
        return this.clubService.findOne(id);
    }

    @Post()
    public create(@Body() club: Club): Promise<Club> {
        return this.clubService.create(club);
    }

    @Put('/:id')
    public update(@Param('id') id: string, @Body() club: Club): Promise<Club> {
        return this.clubService.update(id, club);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.clubService.delete(id);
    }

}
