import { Module } from '@nestjs/common';
import { NpsService } from './nps.service';
import { NpsController } from './nps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetPromoterScore } from 'src/model/nps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NetPromoterScore])],
  providers: [NpsService],
  controllers: [NpsController]
})
export class NpsModule {}
