import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetPromoterScore } from 'src/model/nps.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class NpsService {
    constructor (
        @InjectRepository(NetPromoterScore) private readonly repo: Repository<NetPromoterScore>
    ) {}

    async createNps(score: number) {
        let label: string
        if (score > 8) {label = 'promoter'} 
        else if (score < 6) {label = 'detractor'}
        else {label = 'neutral'}
        const nps = await this.repo.create({
            score: score,
            label: label
        })
        this.repo.save(nps)
        return nps
    }
}
