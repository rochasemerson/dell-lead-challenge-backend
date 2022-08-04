import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class NpsDto {
    @IsNumber()
    @IsNotEmpty()
    score: number

    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    productId: string
}