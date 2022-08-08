import { Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/model/user.entity';
import { NpsDto } from './dto';
import { NpsService } from './nps.service';

@UseGuards(JwtGuard)
@Controller('nps')
export class NpsController {
    constructor (private npsService: NpsService) {}

    @Post('/new')
    createNps(@GetUser() user: User, @Body() npsDto: NpsDto) {
        return this.npsService.createNps(npsDto, user)
    }

    @Get('/:productId')
    getScore(@GetUser() user:User, @Param('productId') productId: string) {
        return this.npsService.getScore(productId, user)
    }
}
