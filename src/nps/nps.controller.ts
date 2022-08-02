import { Body, Controller, Post } from '@nestjs/common';
import { NpsService } from './nps.service';

@Controller('nps')
export class NpsController {
    constructor (private npsService: NpsService) {}

    @Post('/new')
    createNps(@Body() score: number) {
        return this.npsService.createNps(score)
    }
}
