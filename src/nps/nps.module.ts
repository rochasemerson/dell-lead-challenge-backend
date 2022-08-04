import { Module } from '@nestjs/common';
import { NpsService } from './nps.service';
import { NpsController } from './nps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetPromoterScore } from 'src/model/nps.entity';
import { User } from 'src/model/user.entity';
import { Product } from 'src/model/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NetPromoterScore, User, Product])],
  providers: [NpsService],
  controllers: [NpsController]
})
export class NpsModule {}
