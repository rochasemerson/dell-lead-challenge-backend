import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { NpsDto } from './dto';
import { NpsService } from './nps.service';

@Controller('nps')
export class NpsController {
    constructor (private npsService: NpsService) {}

    @Post('/new')
    createNps(@Body() npsDto: NpsDto) {
        return this.npsService.createNps(npsDto)
    }

    @Get('/:params')
    getScore(@Param('userId') userId: string, @Param('productId') productId: string) {
        return this.npsService.getScore(userId, productId)
    }
}
