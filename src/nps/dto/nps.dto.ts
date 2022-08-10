import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class NpsDto {
    @IsNumber()
    @IsNotEmpty()
    score: number
    
    @IsString()
    @IsNotEmpty()
    productId: string
}

export class NpsEditDto {
    @IsNumber()
    @IsNotEmpty()
    score: number
    
    @IsString()
    @IsOptional()
    label?: string
}