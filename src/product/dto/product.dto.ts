import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsString()
    description: string

    @IsString()
    imgUrl: string
}

export class PriceDto {
    @IsNotEmpty()
    @IsNumber()
    price: number
}

export class MixedDto {
    @Type(() => PriceDto)
    params: PriceDto

    @Type(() => ProductDto)
    body: ProductDto
}