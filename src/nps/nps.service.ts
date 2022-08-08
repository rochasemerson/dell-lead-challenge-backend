import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetPromoterScore } from 'src/model/nps.entity';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NpsDto } from './dto';

@Injectable()
export class NpsService {
    constructor (
        @InjectRepository(NetPromoterScore) private readonly repo: Repository<NetPromoterScore>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>
    ) {}

    async createNps(npsDto: NpsDto, npsUser: User) {
                
        const user = await this.userRepo.findOne({
            where: {id: npsUser.id}
        })
        const product = await this.productRepo.findOne({
            where: {id: npsDto.productId}
        })

        if (!user || !product) {
            throw new Error('User or Product Not Found')
        } else {
            let label: string
            
            switch(true) {
                case npsDto.score >= 9:
                    label = 'promoter'
                    break
                case npsDto.score >=7:
                    label = 'neutro'
                    break
                case npsDto.score >=1:
                    label = 'detractor'
                    break
            }
            const nps = await this.repo.create({
                score: npsDto.score,
                label,
                user,
                product
            })
            
            this.repo.save(nps)
            return nps
        }
    }

    async getScore(productId: string, user: User) {
        const product = await this.productRepo.findOne({
            where: {
                id: productId
            }
        })

        const score = await this.repo.findOne({
            where: {
                user: user,
                product: product
            }
        })
        return score
    }
}
