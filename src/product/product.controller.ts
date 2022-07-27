import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BodyAndParam } from './decorator';
import { MixedDto} from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor (private productService: ProductService) {}

    @Post('new')
    createProduct(@BodyAndParam() dto: MixedDto) {
        return this.productService.createProduct(dto)
    }

}
