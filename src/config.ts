import { registerAs } from '@nestjs/config'; // Importación del método registerAs desde el módulo @nestjs/config

// Definición de una función anónima exportada como valor predeterminado
export default registerAs('config', () => {

  return {
    // Definición de un objeto 'mongo' que contiene la configuración de conexión a MongoDB
    mongo: {
      // Asignación del valor de la variable de entorno DB_PROTOCOL a la propiedad 'protocol'
      protocol: process.env.DB_PROTOCOL,
      // Asignación del valor de la variable de entorno DB_USERNAME a la propiedad 'username'
      username: process.env.DB_USERNAME,
      // Asignación del valor de la variable de entorno DB_PASSWORD a la propiedad 'password'
      password: process.env.DB_PASSWORD,
      // Asignación del valor de la variable de entorno DB_HOST a la propiedad 'host'
      host: process.env.DB_HOST,
      // Asignación del valor de la variable de entorno DB_NAME a la propiedad 'name'
      name: process.env.DB_NAME,
      // Asignación del valor de la variable de entorno DB_OPTIONS a la propiedad 'options'
      options: process.env.DB_OPTIONS,
    },
  };
});
