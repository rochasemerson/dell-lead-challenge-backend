import { Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/model/user.entity';
import { NpsDto, NpsEditDto } from './dto';
import { NpsService } from './nps.service';

@Controller('nps')
export class NpsController {
    constructor (private npsService: NpsService) {}
    @Get('/all/:productId')
    calculateNps() {
        return this.npsService.calculateNps()
    }

    @UseGuards(JwtGuard)
    @Post('/new')
    createNps(@GetUser() user: User, @Body() npsDto: NpsDto) {
        return this.npsService.createNps(npsDto, user)
    }

    @UseGuards(JwtGuard)
    @Get('/:productId')
    getScore(@GetUser() user:User, @Param('productId') productId: string) {
        return this.npsService.getScore(productId, user)
    }

    @UseGuards(JwtGuard)
    @Patch('/edit/:id')
    editScore(@Param('id') id: string, @Body() npsEditDto: NpsEditDto) {
        return this.npsService.editScore(id, npsEditDto)
    }
}
