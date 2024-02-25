import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isMongoId } from "class-validator";

@Injectable()
export class MongoIdPipe implements PipeTransform {
    // Implementación del método transform de la interfaz PipeTransform
    transform(value: any, metadata: ArgumentMetadata) {
        // Verificar si el valor no es un ID válido de MongoDB
        if (!isMongoId(value)) {
            // Lanzar una excepción BadRequest con un mensaje descriptivo
            throw new BadRequestException(`El ID: ${value} no es válido para MongoDB`);
        }
        // Si el valor es un ID válido, retornarlo sin cambios
        return value;
    }
}
