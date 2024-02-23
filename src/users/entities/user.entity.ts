import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; // Importación de decoradores y fábrica de esquemas desde "@nestjs/mongoose"
import { Document } from "mongoose"; // Importación de la interfaz Document desde "mongoose"

// Definición de un esquema de usuario utilizando la decoración @Schema
@Schema({timestamps: true}) // Decorador @Schema con opciones para habilitar timestamps
export class User extends Document { // Clase User que extiende la interfaz Document

    // Definición de propiedades con el decorador @Prop
    @Prop({unique: true, index: true, trim: true}) // Decorador @Prop con opciones para email
    email: string; // Propiedad para almacenar el email

    @Prop({trim: true}) // Decorador @Prop con opciones para password
    password: string; // Propiedad para almacenar el password

    @Prop({trim: true}) // Decorador @Prop con opciones para firstName
    firstName: string; // Propiedad para almacenar el nombre

    @Prop({trim: true}) // Decorador @Prop con opciones para lastName
    lastName: string; // Propiedad para almacenar el apellido
}

// Creación del esquema de usuario utilizando la fábrica de esquemas SchemaFactory
export const UserSchema = SchemaFactory.createForClass(User);

// Definición de método toJSON para el esquema de usuario
UserSchema.methods.toJSON = function () {
    const {__V, password, ...record} = this.toObject(); // Elimina __v y password del objeto y crea un nuevo objeto record
    return record; // Retorna el objeto sin __v y password
}

// Middleware post-save para el esquema de usuario
UserSchema.post("save", function (error, doc, next){
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new Error(`El ${Object.keys(error.KeyValue)} ya existe`)) // Si hay un error de duplicado, pasa un nuevo error al siguiente middleware
    } else {
        next(); // Si no hay errores, continúa
    }
})
