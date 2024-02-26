import { Module } from '@nestjs/common'; // Importaciones necesarias
import { AppController } from './app.controller'; // Importación del controlador de la aplicación
import { AppService } from './app.service'; // Importación del servicio de la aplicación
import { DatabaseModule } from './database/database.module'; // Importación del módulo de la base de datos
import { ConfigModule } from '@nestjs/config'; // Importación del módulo de configuración
import { environments } from './common/environments'; // Importación de las configuraciones de entorno
import { UsersModule } from './users/users.module';
import { ErrorsModule } from './errors/errors.module';
import config from './config'; // Importación de la configuración global
import * as Joi from 'joi'; // Importación de la biblioteca Joi para la validación de esquemas

@Module({ // Decorador de módulo para definir un módulo de NestJS
  imports: [
    ConfigModule.forRoot({ // Configuración del módulo de configuración global
      envFilePath: environments[process.env.NODE_ENV ?? "prod"], // Ruta al archivo de configuración de entorno
      load: [config], // Carga de la configuración global
      isGlobal: true, // Indica que la configuración es global en toda la aplicación
      validationSchema: Joi.object({ // Esquema de validación para las variables de entorno
        DB_PROTOCOL: Joi.string().required(), // Protocolo de la base de datos MongoDB
        DB_USERNAME: Joi.string().required(), // Nombre de usuario de la base de datos MongoDB
        DB_PASSWORD: Joi.string().required(), // Contraseña de la base de datos MongoDB
        DB_HOST: Joi.string().required(), // Host de la base de datos MongoDB
        DB_NAME: Joi.string().required(), // Nombre de la base de datos MongoDB
        DB_OPTIONS: Joi.string().required(), // Opciones de configuración de la base de datos MongoDB
      }),
    }),
    DatabaseModule, // Importación del módulo de la base de datos
    UsersModule, ErrorsModule, 
  ],
  controllers: [AppController], // Controladores utilizados en el módulo
  providers: [AppService], // Servicios proporcionados por el módulo
})
export class AppModule { // Definición de la clase del módulo
  constructor(){ // Constructor del módulo
    console.log("Using environment file:", environments[process.env.NODE_ENV ?? "prod" ]); // Mensaje de registro para mostrar el archivo de entorno utilizado
  }
}
