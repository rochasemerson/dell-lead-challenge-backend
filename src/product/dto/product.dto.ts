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

export class EditProductDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsString()
    description: string

    @IsString()
    imgUrl: string
}