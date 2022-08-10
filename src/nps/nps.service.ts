import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetPromoterScore } from 'src/model/nps.entity';
import { Product } from 'src/model/product.entity';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NpsDto, NpsEditDto } from './dto';

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
                    label = 'neutral'
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
        try {
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
            delete score.user
            return score
        } catch (error) {
            return null
        }
    }

    async editScore(id: string, npsEditDto: NpsEditDto) {
        let label: string

        switch(true) {
            case npsEditDto.score >= 9:
                label = 'promoter'
                break
            case npsEditDto.score >=7:
                label = 'neutral'
                break
            case npsEditDto.score >=1:
                label = 'detractor'
                break
        }
        await this.repo.update(
            id,
            {
                score: npsEditDto.score,
                label: label
            }
        )

        const newScore = await this.repo.findOne({where:{id}})
        delete newScore.user
        return newScore
    }

    async calculateNps() {
        const productList = await this.repo.find({
            where: {
                product: true
            }
        })
        let promoters = 0
        let detractors = 0
        productList.map((product) => {
            if (product.label === 'promoter') promoters++
            else if (product.label === 'detractor') detractors++
        })
        
        return ((promoters - detractors) / productList.length).toFixed(1)
    }
}
