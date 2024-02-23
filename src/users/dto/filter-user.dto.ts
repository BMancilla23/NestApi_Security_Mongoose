import { IsOptional, IsPositive, Min } from "class-validator";

export class filterUserDto {
    @IsOptional()
    @IsPositive()
    limit : number;

    @IsOptional()
    @Min(0)
    ofset: number;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
}
