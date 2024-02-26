import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto{

    @IsNotEmpty({message: "Por favor ingrese un email válido"})
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty({message: "Por favor ingrese una contraseña válida"})
    @ApiProperty()
    readonly password: string;
}