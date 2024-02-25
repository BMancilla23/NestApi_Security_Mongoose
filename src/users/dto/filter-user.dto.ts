import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";

export class FilterUserDto {
    @ApiProperty({required: false, default: 10}) // Establece el valor por defecto de "limit" como 10 
    @IsOptional()
    @IsPositive()
    @IsInt()
    @Min(1)
    @Max(100)
    limit? : number = 10;

    @ApiProperty({required: false, default: 0})// Establece el valor por defecto de 'offset' como 0
    @IsOptional()
    @IsInt()
    @Min(0)
    offset?: number = 0;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
}
