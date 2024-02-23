import { NestFactory } from '@nestjs/core'; // Importación del módulo NestFactory para crear la aplicación Nest
import { AppModule } from './app.module'; // Importación del módulo principal de la aplicación
import { ValidationPipe } from '@nestjs/common'; // Importación del ValidatioPipe de NestJS para la validación de datos

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Creación de la aplicación NestJS
  app.setGlobalPrefix("api/v1/authc-authz"); // Establecimiento del prefijo global para todas las rutas

  app.useGlobalPipes( // Configuración del uso de un ValidationPipe global para validar todas las solicitudes entrantes
    new ValidationPipe({
      whitelist: true, // Activación de la opción para eliminar campos no definidos en los DTOs
      forbidNonWhitelisted: true, // Activación de la opción para rechazar solicitudes con propiedades no definidas en los DTOs
      transformOptions: { // Opciones de transformación para el ValidationPipe
        enableImplicitConversion: true, // Habilitación de la conversión implícita de tipos de datos
      }
    })
  );

  app.enableCors(); // Habilitación de CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde cualquier origen
  await app.listen(4000); // Inicio del servidor en el puerto 4000
}
bootstrap(); // Llamada a la función bootstrap para iniciar la aplicación
