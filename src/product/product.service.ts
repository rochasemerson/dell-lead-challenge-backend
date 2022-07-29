import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/model/product.entity';
import { Like } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { EditProductDto, ProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor (
        @InjectRepository(Product) private readonly repo: Repository<Product>
    ) {}

    async createProduct(dto: ProductDto) {
        const newProduct = await this.repo.create({
            name: dto.name,
            price: dto.price,
            description: dto.description,
            imgUrl: dto.imgUrl
        })
        this.repo.save(newProduct)
        return newProduct
    }

    async getSingleProduct(id: string) {
        const singleProduct = await this.repo.findOneOrFail({
            where: {id}
        })
        return singleProduct
    }

    async filterProducts(tag: string) {
        const products = await this.repo.find({
            where: {
                name: Like(`%${tag}%`)
            }
        })
        return products
    }

    async getAllProducts(page: number, limit: number) {
        const productList = await this.repo.find({
            take: limit,
            skip: (page * limit) - limit
        })
        return productList
    }
    
    async editProduct(id: string, dto: EditProductDto) {
        await this.repo.update(
            id,
            dto
        )
        const newProduct = await this.repo.findOne({
            where: {id}
        })
        return newProduct
    }

    async deleteProduct(id: string) {
        await this.repo.delete(id)
    }
}
