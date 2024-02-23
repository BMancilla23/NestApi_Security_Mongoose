import { Inject, Injectable } from "@nestjs/common"; // Importaciones necesarias

import { ConfigType } from "@nestjs/config"; // Importación para manejar la configuración
import { MongooseOptionsFactory } from "@nestjs/mongoose"; // Importación de la interfaz de la fábrica de opciones de Mongoose
import { MongooseModuleOptions } from "@nestjs/mongoose/dist"; // Importación de las opciones de Mongoose
import config from "src/config"; // Importación de la configuración global

@Injectable() // Marca la clase como un servicio inyectable en NestJS
export class MongooseConfigService implements MongooseOptionsFactory { // Definición de la clase

    constructor(@Inject(config.KEY) private readonly configService: ConfigType<typeof config>) {} 
    // Constructor que utiliza la inyección de dependencias para obtener la configuración global

    createMongooseOptions(): MongooseModuleOptions { // Método para crear opciones de Mongoose

        // Desestructuración de las propiedades de configuración necesarias
        const { protocol, username, password, host, name, options } = this.configService.mongo;

        // Construcción de la URI de conexión a la base de datos MongoDB
        const uri = process.env.NODE_ENV === 'dev' ?
            `${protocol}://${username}:${password}@${host}/${name}?${options}` : `${protocol}://${username}:${password}@${host}/${name}?${options}`;

        return {
            uri // Retorno de las opciones de configuración para Mongoose
        };
    }
}
