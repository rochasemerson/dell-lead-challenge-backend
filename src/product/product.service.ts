import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/model/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { MixedDto } from './dto';

@Injectable()
export class ProductService {
    constructor (
        @InjectRepository(Product) private readonly repo: Repository<Product>
    ) {}

    async createProduct(dto: MixedDto) {
        const newProduct = await this.repo.create({
            name: dto.body.name,
            price: dto.body.price,
            description: dto.body.description,
            imgUrl: dto.body.imgUrl
        })
        this.repo.save(newProduct)
        return newProduct
    }
}
