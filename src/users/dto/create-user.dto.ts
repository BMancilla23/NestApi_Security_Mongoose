import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"; // Importación de decoradores de validación desde "class-validator"

export class CreateUserDto { // Definición de la clase CreateUserDto

    @ApiProperty({description: 'Correo electrónico del usuario'})
    @IsNotEmpty({message: "El email es requerido"}) // Decorador @IsNotEmpty para validar que el campo no esté vacío
    @IsEmail({}, {message: "Este campo debe ser un email válido"}) // Decorador @IsEmail para validar que el campo sea un email válido
    readonly email: string; // Propiedad para almacenar el email

    @ApiProperty({description: 'Contraseña del usuario'})
    @IsString({message: "La contraseña debe contener caracteres válidos"}) // Decorador @IsString para validar que el campo sea una cadena de texto
    @MinLength(6) // Decorador @MinLength para validar la longitud mínima de la contraseña
    @MaxLength(12) // Decorador @MaxLength para validar la longitud máxima de la contraseña
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { // Expresiones regulares para validación
        message: "La contraseña debe tener letras mayúsculas, minúsculas y números",
      })
    password: string; // Propiedad para almacenar la contraseña

    @ApiProperty({description: 'Nombre del usuario'})
    @IsString() // Decorador @IsString para validar que el campo sea una cadena de texto
    @IsNotEmpty({message: "Los nombres son requeridos"}) // Decorador @IsNotEmpty para validar que el campo no esté vacío
    readonly firstName: string; // Propiedad para almacenar el primer nombre

    @ApiProperty({description: 'Apellido del usuario'})
    @IsString() // Decorador @IsString para validar que el campo sea una cadena de texto
    @IsNotEmpty({message: "Los apellidos son requeridos"}) // Decorador @IsNotEmpty para validar que el campo no esté vacío
    readonly lastName: string; // Propiedad para almacenar el apellido

    @IsOptional()
    @ApiProperty()
    readonly idDeleted: boolean;
}
