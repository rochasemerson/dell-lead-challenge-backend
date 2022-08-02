import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { skip } from 'rxjs';
import { EditProductDto, ProductDto} from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor (private productService: ProductService) {}

    @Post('new')
    createProduct(@Body() dto: ProductDto) {
        return this.productService.createProduct(dto)
    }

    @Get('')
    getAllProducts(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number = 1) {
        return this.productService.getAllProducts(page, limit)
    }
   
    @Get('search/:id')
    getSingleProduct(@Param('id') id: string) {
        return this.productService.getSingleProduct(id)
    }

    @Get('filter/:filter')
    filterProducts(@Param('filter') filter: string) {
        return this.productService.filterProducts(filter)
    }

    @Patch('edit/:id')
    editProduct(@Param('id') id: string, @Body() dto: EditProductDto) {
        return this.productService.editProduct(id, dto)
    }

    @Delete('/delete/:id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id)
    }
}
