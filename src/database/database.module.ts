import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose.service';

// El decorador @Global() indica que este módulo debe ser global y disponible para toda la aplicación.
@Global()
@Module({
    // Importamos el módulo MongooseModule y lo configuramos de forma asíncrona utilizando MongooseModule.forRootAsync().
    // Pasamos una configuración a MongooseModule.forRootAsync(), que incluye la opción useClass para utilizar nuestra clase MongooseConfigService.
    imports: [MongooseModule.forRootAsync({useClass: MongooseConfigService})],
    // Exportamos MongooseModule para que pueda ser utilizado por otros módulos que lo importen.
    exports: [MongooseModule]
})
export class DatabaseModule {}
